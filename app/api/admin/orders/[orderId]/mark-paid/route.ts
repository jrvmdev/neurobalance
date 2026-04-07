import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/env";
import { savePaidOrder } from "@/lib/store";

type Params = {
  params: Promise<{ orderId: string }>;
};

export async function POST(_: Request, { params }: Params) {
  const { orderId } = await params;
  const order = await savePaidOrder(orderId, "manual-admin");

  const url = new URL("/admin", getAppUrl());
  if (!order) {
    url.searchParams.set("error", "No se encontro la orden.");
  } else {
    url.searchParams.set("success", `Orden ${orderId} marcada como pagada.`);
  }

  return NextResponse.redirect(url, { status: 303 });
}

