import { sendDeliveryEmail } from "@/lib/email";
import { findOrderById, getDueDeliveries, markDeliverySent } from "@/lib/store";

export async function processDueReleases(referenceDate = new Date()) {
  const dueDeliveries = await getDueDeliveries(referenceDate);
  const grouped = new Map<string, typeof dueDeliveries>();

  for (const delivery of dueDeliveries) {
    const list = grouped.get(delivery.orderId) ?? [];
    list.push(delivery);
    grouped.set(delivery.orderId, list);
  }

  const results: Array<{
    orderId: string;
    customerEmail?: string;
    sent: boolean;
    count: number;
    reason?: string;
  }> = [];

  for (const [orderId, deliveries] of grouped) {
    const order = await findOrderById(orderId);
    if (!order || order.status !== "paid") {
      results.push({ orderId, sent: false, count: deliveries.length, reason: "order_not_paid" });
      continue;
    }

    const emailResult = await sendDeliveryEmail(order, deliveries);
    const notes = emailResult.sent ? "Enviado automaticamente por email." : "Pendiente de envio manual.";
    const channel = emailResult.sent ? "email" : "manual";

    for (const delivery of deliveries) {
      await markDeliverySent(delivery.id, channel, notes);
    }

    results.push({
      orderId,
      customerEmail: order.customerEmail,
      sent: emailResult.sent,
      count: deliveries.length,
      reason: emailResult.sent ? undefined : emailResult.reason,
    });
  }

  return {
    processedAt: referenceDate.toISOString(),
    processedOrders: results.length,
    results,
  };
}

