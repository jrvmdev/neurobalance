import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import postgres from "postgres";
import { getDatabaseUrl, hasBlobConfigured, hasDatabaseConfigured } from "@/lib/env";
import { getVolumesForProductSlug } from "@/lib/site-data";
import { DeliveryRecord, OrderRecord, VolumeAssetRecord } from "@/lib/types";

type CommerceStore = {
  orders: OrderRecord[];
  deliveries: DeliveryRecord[];
  volumeAssets: VolumeAssetRecord[];
};

declare global {
  var __NB_SQL__: ReturnType<typeof postgres> | undefined;
  var __NB_MEMORY_STORE__: CommerceStore | undefined;
}

const dataDir = path.join(process.cwd(), "data");
const storePath = path.join(dataDir, "commerce-store.json");

function emptyStore(): CommerceStore {
  return {
    orders: [],
    deliveries: [],
    volumeAssets: [],
  };
}

function getMemoryStore() {
  if (!globalThis.__NB_MEMORY_STORE__) {
    globalThis.__NB_MEMORY_STORE__ = emptyStore();
  }

  return globalThis.__NB_MEMORY_STORE__;
}

function getStoreMode(): "database" | "file" | "memory" {
  if (hasDatabaseConfigured()) {
    return "database";
  }

  if (process.env.VERCEL) {
    return "memory";
  }

  return "file";
}

export function getStoreDiagnostics() {
  const mode = getStoreMode();

  return {
    mode,
    persistent: mode === "database" || mode === "file",
    databaseConfigured: hasDatabaseConfigured(),
    blobConfigured: hasBlobConfigured(),
  };
}

function getSqlClient() {
  if (!hasDatabaseConfigured()) {
    return null;
  }

  if (!globalThis.__NB_SQL__) {
    globalThis.__NB_SQL__ = postgres(getDatabaseUrl()!, {
      prepare: false,
      ssl: "require",
      max: 1,
    });
  }

  return globalThis.__NB_SQL__;
}

async function ensureDatabaseSchema() {
  const sql = getSqlClient();
  if (!sql) {
    return null;
  }

  await sql`
    create table if not exists orders (
      id text primary key,
      customer_email text not null,
      customer_name text not null,
      product_slug text not null,
      provider text not null,
      status text not null,
      amount integer not null,
      currency text not null,
      created_at text not null,
      paid_at text,
      provider_reference text
    )
  `;

  await sql`
    create table if not exists deliveries (
      id text primary key,
      order_id text not null,
      volume_id text not null,
      scheduled_for text not null,
      status text not null,
      sent_at text,
      channel text,
      notes text
    )
  `;

  await sql`
    create table if not exists volume_assets (
      id text primary key,
      volume_id text not null unique,
      file_name text not null,
      file_url text not null,
      storage_path text,
      mime_type text,
      size_bytes integer,
      uploaded_at text not null
    )
  `;

  return sql;
}

async function ensureFileStore() {
  await mkdir(dataDir, { recursive: true });

  try {
    await readFile(storePath, "utf8");
  } catch {
    await writeFile(storePath, JSON.stringify(emptyStore(), null, 2), "utf8");
  }
}

async function readFileStore(): Promise<CommerceStore> {
  await ensureFileStore();
  const raw = await readFile(storePath, "utf8");
  const parsed = JSON.parse(raw) as Partial<CommerceStore>;

  return {
    orders: parsed.orders ?? [],
    deliveries: parsed.deliveries ?? [],
    volumeAssets: parsed.volumeAssets ?? [],
  };
}

async function writeFileStore(store: CommerceStore) {
  await ensureFileStore();
  await writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

function normalizeOrder(row: Record<string, unknown>): OrderRecord {
  return {
    id: String(row.id),
    customerEmail: String(row.customer_email),
    customerName: String(row.customer_name),
    productSlug: String(row.product_slug),
    provider: row.provider as OrderRecord["provider"],
    status: row.status as OrderRecord["status"],
    amount: Number(row.amount),
    currency: row.currency as OrderRecord["currency"],
    createdAt: String(row.created_at),
    paidAt: row.paid_at ? String(row.paid_at) : undefined,
    providerReference: row.provider_reference ? String(row.provider_reference) : undefined,
  };
}

function normalizeDelivery(row: Record<string, unknown>): DeliveryRecord {
  return {
    id: String(row.id),
    orderId: String(row.order_id),
    volumeId: String(row.volume_id),
    scheduledFor: String(row.scheduled_for),
    status: row.status as DeliveryRecord["status"],
    sentAt: row.sent_at ? String(row.sent_at) : undefined,
    channel: row.channel ? (String(row.channel) as DeliveryRecord["channel"]) : undefined,
    notes: row.notes ? String(row.notes) : undefined,
  };
}

function normalizeVolumeAsset(row: Record<string, unknown>): VolumeAssetRecord {
  return {
    id: String(row.id),
    volumeId: String(row.volume_id),
    fileName: String(row.file_name),
    fileUrl: String(row.file_url),
    storagePath: row.storage_path ? String(row.storage_path) : undefined,
    mimeType: row.mime_type ? String(row.mime_type) : undefined,
    sizeBytes: row.size_bytes ? Number(row.size_bytes) : undefined,
    uploadedAt: String(row.uploaded_at),
  };
}

export async function createOrder(order: OrderRecord) {
  const mode = getStoreMode();

  if (mode === "database") {
    const sql = await ensureDatabaseSchema();
    await sql!`
      insert into orders (
        id, customer_email, customer_name, product_slug, provider, status, amount, currency, created_at, paid_at, provider_reference
      ) values (
        ${order.id}, ${order.customerEmail}, ${order.customerName}, ${order.productSlug}, ${order.provider}, ${order.status}, ${order.amount}, ${order.currency}, ${order.createdAt}, ${order.paidAt ?? null}, ${order.providerReference ?? null}
      )
    `;

    return order;
  }

  if (mode === "file") {
    const store = await readFileStore();
    store.orders.unshift(order);
    await writeFileStore(store);
    return order;
  }

  const store = getMemoryStore();
  store.orders.unshift(order);
  return order;
}

export async function listOrders() {
  const mode = getStoreMode();

  if (mode === "database") {
    const sql = await ensureDatabaseSchema();
    const rows = await sql!`select * from orders order by created_at desc`;
    return rows.map((row) => normalizeOrder(row as Record<string, unknown>));
  }

  if (mode === "file") {
    const store = await readFileStore();
    return store.orders;
  }

  return getMemoryStore().orders;
}

export async function findOrderById(orderId: string) {
  const mode = getStoreMode();

  if (mode === "database") {
    const sql = await ensureDatabaseSchema();
    const rows = await sql!`select * from orders where id = ${orderId} limit 1`;
    return rows[0] ? normalizeOrder(rows[0] as Record<string, unknown>) : undefined;
  }

  if (mode === "file") {
    const store = await readFileStore();
    return store.orders.find((order) => order.id === orderId);
  }

  return getMemoryStore().orders.find((order) => order.id === orderId);
}

export async function savePaidOrder(orderId: string, providerReference?: string) {
  const mode = getStoreMode();

  if (mode === "database") {
    const sql = await ensureDatabaseSchema();
    const paidAt = new Date().toISOString();

    const updatedRows = await sql!`
      update orders
      set status = 'paid', paid_at = ${paidAt}, provider_reference = ${providerReference ?? null}
      where id = ${orderId}
      returning *
    `;

    const updatedOrder = updatedRows[0]
      ? normalizeOrder(updatedRows[0] as Record<string, unknown>)
      : null;

    if (!updatedOrder) {
      return null;
    }

    const existing = await sql!`select id from deliveries where order_id = ${orderId} limit 1`;
    if (existing.length === 0) {
      const volumes = getVolumesForProductSlug(updatedOrder.productSlug);
      for (const volume of volumes) {
        await sql!`
          insert into deliveries (id, order_id, volume_id, scheduled_for, status, sent_at, channel, notes)
          values (
            ${`dlv_${randomUUID().slice(0, 8)}`},
            ${orderId},
            ${volume.id},
            ${new Date(`${volume.releaseDate}T09:00:00.000Z`).toISOString()},
            ${"scheduled"},
            ${null},
            ${null},
            ${null}
          )
        `;
      }
    }

    return updatedOrder;
  }

  const store = mode === "file" ? await readFileStore() : getMemoryStore();
  const order = store.orders.find((entry) => entry.id === orderId);

  if (!order) {
    return null;
  }

  order.status = "paid";
  order.paidAt = new Date().toISOString();
  order.providerReference = providerReference;

  const existingDeliveries = store.deliveries.filter((delivery) => delivery.orderId === order.id);
  if (existingDeliveries.length === 0) {
    const volumes = getVolumesForProductSlug(order.productSlug);
    for (const volume of volumes) {
      store.deliveries.push({
        id: `dlv_${randomUUID().slice(0, 8)}`,
        orderId: order.id,
        volumeId: volume.id,
        scheduledFor: new Date(`${volume.releaseDate}T09:00:00.000Z`).toISOString(),
        status: "scheduled",
      });
    }
  }

  if (mode === "file") {
    await writeFileStore(store);
  }

  return order;
}

export async function listDeliveries() {
  const mode = getStoreMode();

  if (mode === "database") {
    const sql = await ensureDatabaseSchema();
    const rows = await sql!`select * from deliveries order by scheduled_for asc`;
    return rows.map((row) => normalizeDelivery(row as Record<string, unknown>));
  }

  if (mode === "file") {
    const store = await readFileStore();
    return store.deliveries;
  }

  return getMemoryStore().deliveries;
}

export async function listDeliveriesForOrder(orderId: string) {
  const deliveries = await listDeliveries();
  return deliveries.filter((delivery) => delivery.orderId === orderId);
}

export async function getDueDeliveries(referenceDate = new Date()) {
  const deliveries = await listDeliveries();
  return deliveries.filter(
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
  const mode = getStoreMode();

  if (mode === "database") {
    const sql = await ensureDatabaseSchema();
    const rows = await sql!`
      update deliveries
      set status = 'sent', sent_at = ${new Date().toISOString()}, channel = ${channel ?? null}, notes = ${notes ?? null}
      where id = ${deliveryId}
      returning *
    `;

    return rows[0] ? normalizeDelivery(rows[0] as Record<string, unknown>) : null;
  }

  const store = mode === "file" ? await readFileStore() : getMemoryStore();
  const delivery = store.deliveries.find((entry) => entry.id === deliveryId);

  if (!delivery) {
    return null;
  }

  delivery.status = "sent";
  delivery.sentAt = new Date().toISOString();
  delivery.channel = channel;
  delivery.notes = notes;

  if (mode === "file") {
    await writeFileStore(store);
  }

  return delivery;
}

export async function listVolumeAssets() {
  const mode = getStoreMode();

  if (mode === "database") {
    const sql = await ensureDatabaseSchema();
    const rows = await sql!`select * from volume_assets order by uploaded_at desc`;
    return rows.map((row) => normalizeVolumeAsset(row as Record<string, unknown>));
  }

  if (mode === "file") {
    const store = await readFileStore();
    return store.volumeAssets;
  }

  return getMemoryStore().volumeAssets;
}

export async function saveVolumeAsset(asset: VolumeAssetRecord) {
  const mode = getStoreMode();

  if (mode === "database") {
    const sql = await ensureDatabaseSchema();
    const rows = await sql!`
      insert into volume_assets (id, volume_id, file_name, file_url, storage_path, mime_type, size_bytes, uploaded_at)
      values (${asset.id}, ${asset.volumeId}, ${asset.fileName}, ${asset.fileUrl}, ${asset.storagePath ?? null}, ${asset.mimeType ?? null}, ${asset.sizeBytes ?? null}, ${asset.uploadedAt})
      on conflict (volume_id)
      do update set
        id = excluded.id,
        file_name = excluded.file_name,
        file_url = excluded.file_url,
        storage_path = excluded.storage_path,
        mime_type = excluded.mime_type,
        size_bytes = excluded.size_bytes,
        uploaded_at = excluded.uploaded_at
      returning *
    `;

    return normalizeVolumeAsset(rows[0] as Record<string, unknown>);
  }

  const store = mode === "file" ? await readFileStore() : getMemoryStore();
  store.volumeAssets = store.volumeAssets.filter((entry) => entry.volumeId !== asset.volumeId);
  store.volumeAssets.unshift(asset);

  if (mode === "file") {
    await writeFileStore(store);
  }

  return asset;
}

