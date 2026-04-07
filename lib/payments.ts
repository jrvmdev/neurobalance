import { getAppUrl, hasMercadoPagoConfigured, hasStripeConfigured } from "@/lib/env";
import { OrderRecord, PaymentProvider } from "@/lib/types";

export type CheckoutResult =
  | {
      ok: true;
      provider: PaymentProvider;
      redirectUrl: string;
      mode: "hosted" | "manual";
    }
  | {
      ok: false;
      provider: PaymentProvider;
      message: string;
    };

export async function createCheckoutRedirect(order: OrderRecord): Promise<CheckoutResult> {
  switch (order.provider) {
    case "stripe":
      return createStripeRedirect(order);
    case "mercadopago":
      return createMercadoPagoRedirect(order);
    case "transfer":
      return {
        ok: true,
        provider: "transfer",
        redirectUrl: `${getAppUrl()}/gracias?provider=transfer&status=awaiting_transfer&email=${encodeURIComponent(order.customerEmail)}&orderId=${encodeURIComponent(order.id)}`,
        mode: "manual",
      };
  }
}

async function createStripeRedirect(order: OrderRecord): Promise<CheckoutResult> {
  if (!hasStripeConfigured()) {
    return {
      ok: false,
      provider: "stripe",
      message: "Falta configurar STRIPE_SECRET_KEY para crear sesiones reales de pago.",
    };
  }

  return {
    ok: true,
    provider: "stripe",
    redirectUrl: `${getAppUrl()}/gracias?provider=stripe&status=demo&email=${encodeURIComponent(order.customerEmail)}&orderId=${encodeURIComponent(order.id)}`,
    mode: "hosted",
  };
}

async function createMercadoPagoRedirect(order: OrderRecord): Promise<CheckoutResult> {
  if (!hasMercadoPagoConfigured()) {
    return {
      ok: false,
      provider: "mercadopago",
      message:
        "Falta configurar MERCADOPAGO_ACCESS_TOKEN para crear preferencias reales.",
    };
  }

  return {
    ok: true,
    provider: "mercadopago",
    redirectUrl: `${getAppUrl()}/gracias?provider=mercadopago&status=demo&email=${encodeURIComponent(order.customerEmail)}&orderId=${encodeURIComponent(order.id)}`,
    mode: "hosted",
  };
}

