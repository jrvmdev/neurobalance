import { randomUUID } from "node:crypto";
import { getProductBySlug } from "@/lib/site-data";
import { OrderRecord, PaymentProvider } from "@/lib/types";

export type CheckoutPayload = {
  provider: PaymentProvider;
  productSlug: string;
  customerName: string;
  customerEmail: string;
};

export function buildDraftOrder(payload: CheckoutPayload): OrderRecord {
  const product = getProductBySlug(payload.productSlug);
  if (!product) {
    throw new Error("Producto no reconocido.");
  }

  const currency =
    payload.provider === "mercadopago" || payload.provider === "transfer"
      ? "ARS"
      : "USD";
  const amount = currency === "ARS" ? product.arsAmount : product.usdAmount;

  return {
    id: `ord_${randomUUID().slice(0, 8)}`,
    customerEmail: payload.customerEmail.trim().toLowerCase(),
    customerName: payload.customerName.trim(),
    productSlug: payload.productSlug,
    provider: payload.provider,
    status: payload.provider === "transfer" ? "awaiting_transfer" : "pending",
    amount,
    currency,
    createdAt: new Date().toISOString(),
  };
}

export function isKnownProduct(slug: string) {
  return Boolean(getProductBySlug(slug));
}
