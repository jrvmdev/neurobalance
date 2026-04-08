import { Resend } from "resend";
import { getAppUrl, getResendApiKey, getResendFromEmail, hasEmailConfigured } from "@/lib/env";
import { collectionVolumes, getProductBySlug, mainProduct } from "@/lib/site-data";
import { DeliveryRecord, OrderRecord } from "@/lib/types";

let resendClient: Resend | null = null;

function getResendClient() {
  if (!resendClient) {
    const apiKey = getResendApiKey();
    if (!apiKey) {
      throw new Error("Falta RESEND_API_KEY.");
    }
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

export function buildDeliveryEmail(order: OrderRecord, deliveries: DeliveryRecord[]) {
  const product = getProductBySlug(order.productSlug) ?? mainProduct;
  const volumes = deliveries
    .map((delivery) => collectionVolumes.find((volume) => volume.id === delivery.volumeId))
    .filter(Boolean);

  const items = volumes
    .map(
      (volume) => `
        <li>
          <strong>Tomo ${volume!.number}: ${volume!.title}</strong><br />
          ${volume!.deliveryNote}
        </li>`,
    )
    .join("");

  return {
    subject:
      deliveries.length > 1
        ? `Tus nuevos tomos de ${product.name}`
        : `Tu acceso a ${product.name} ya esta disponible`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #1c1a17; line-height: 1.6;">
        <h1 style="font-size: 24px; margin-bottom: 12px;">Hola ${order.customerName}</h1>
        <p>Tu compra de <strong>${product.name}</strong> sigue avanzando.</p>
        <p>En esta entrega te corresponde:</p>
        <ul>${items}</ul>
        <p>Si no encuentras el material o necesitas reenvio, responde este email o escribinos por WhatsApp.</p>
        <p style="font-size: 12px; color: #6f6458;">Orden ${order.id} · ${getAppUrl()}</p>
      </div>
    `,
  };
}

export async function sendDeliveryEmail(order: OrderRecord, deliveries: DeliveryRecord[]) {
  if (!hasEmailConfigured()) {
    return { sent: false as const, reason: "email_not_configured" };
  }

  const message = buildDeliveryEmail(order, deliveries);
  await getResendClient().emails.send({
    from: getResendFromEmail(),
    to: order.customerEmail,
    subject: message.subject,
    html: message.html,
  });

  return { sent: true as const };
}
