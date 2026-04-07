import { NextResponse } from "next/server";
import { savePaidOrder } from "@/lib/store";

export async function POST(request: Request) {
  const rawBody = await request.text();
  let orderId: string | undefined;

  try {
    const parsed = JSON.parse(rawBody) as { orderId?: string };
    orderId = parsed.orderId;
  } catch {
    orderId = undefined;
  }

  const order = orderId ? await savePaidOrder(orderId, "stripe-webhook") : null;

  return NextResponse.json({
    ok: true,
    provider: "stripe",
    received: rawBody.length > 0,
    orderId,
    markedPaid: Boolean(order),
    message:
      "Webhook listo para simular confirmacion de pago y activar entregas semanales.",
  });
}

