import { NextResponse } from "next/server";
import { buildDraftOrder, isKnownProduct } from "@/lib/orders";
import { createCheckoutRedirect } from "@/lib/payments";
import { createOrder } from "@/lib/store";

export async function POST(request: Request) {
  const payload = (await request.json()) as {
    provider?: string;
    productSlug?: string;
    customerName?: string;
    customerEmail?: string;
  };

  if (
    !payload.provider ||
    !payload.productSlug ||
    !payload.customerName ||
    !payload.customerEmail
  ) {
    return NextResponse.json(
      { ok: false, message: "Faltan datos para iniciar la compra." },
      { status: 400 },
    );
  }

  if (!isKnownProduct(payload.productSlug)) {
    return NextResponse.json(
      { ok: false, message: "Producto no reconocido." },
      { status: 404 },
    );
  }

  const draftOrder = buildDraftOrder({
    provider: payload.provider as "stripe" | "mercadopago" | "transfer",
    productSlug: payload.productSlug,
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
  });

  await createOrder(draftOrder);

  const checkout = await createCheckoutRedirect(draftOrder);

  if (!checkout.ok) {
    return NextResponse.json(
      { ok: false, message: checkout.message, draftOrder },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    draftOrder,
    redirectUrl: checkout.redirectUrl,
    mode: checkout.mode,
  });
}

