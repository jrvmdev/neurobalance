import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { mainProduct } from "@/lib/site-data";
import { DeliveryRecord, OrderRecord } from "@/lib/types";

type CommerceStore = {
  orders: OrderRecord[];
  deliveries: DeliveryRecord[];
};

const dataDir = path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "commerce-store.json");

async function ensureStore() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(storePath, "utf8");
  } catch {
    const seed: CommerceStore = {
      orders: [],
      deliveries: [],
    };
    await writeFile(storePath, JSON.stringify(seed, null, 2), "utf8");
  }
}

async function readStore(): Promise<CommerceStore> {
  await ensureStore();
  const raw = await readFile(storePath, "utf8");
  return JSON.parse(raw) as CommerceStore;
}

async function writeStore(store: CommerceStore) {
  await ensureStore();
  await writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

export async function createOrder(order: OrderRecord) {
  const store = await readStore();
  store.orders.unshift(order);
  await writeStore(store);
  return order;
}

export async function listOrders() {
  const store = await readStore();
  return store.orders;
}

export async function findOrderById(orderId: string) {
  const store = await readStore();
  return store.orders.find((order) => order.id === orderId);
}

export async function savePaidOrder(orderId: string, providerReference?: string) {
  const store = await readStore();
  const order = store.orders.find((entry) => entry.id === orderId);

  if (!order) {
    return null;
  }

  order.status = "paid";
  order.paidAt = new Date().toISOString();
  order.providerReference = providerReference;

  const existingDeliveries = store.deliveries.filter((delivery) => delivery.orderId === order.id);
  if (existingDeliveries.length === 0) {
    for (const volume of mainProduct.volumes) {
      store.deliveries.push({
        id: `dlv_${randomUUID().slice(0, 8)}`,
        orderId: order.id,
        volumeId: volume.id,
        scheduledFor: new Date(`${volume.releaseDate}T09:00:00.000Z`).toISOString(),
        status: "scheduled",
      });
    }
  }

  await writeStore(store);
  return order;
}

export async function listDeliveries() {
  const store = await readStore();
  return store.deliveries;
}

export async function listDeliveriesForOrder(orderId: string) {
  const store = await readStore();
  return store.deliveries.filter((delivery) => delivery.orderId === orderId);
}

export async function getDueDeliveries(referenceDate = new Date()) {
  const store = await readStore();
  return store.deliveries.filter(
    (delivery) =>
      delivery.status === "scheduled" &&
      Date.parse(delivery.scheduledFor) <= referenceDate.getTime(),
  );
}

export async function markDeliverySent(
  deliveryId: string,
  channel: DeliveryRecord["channel"],
  notes?: string,
) {
  const store = await readStore();
  const delivery = store.deliveries.find((entry) => entry.id === deliveryId);

  if (!delivery) {
    return null;
  }

  delivery.status = "sent";
  delivery.sentAt = new Date().toISOString();
  delivery.channel = channel;
  delivery.notes = notes;
  await writeStore(store);
  return delivery;
}

