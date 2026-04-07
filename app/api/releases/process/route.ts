import { NextResponse } from "next/server";
import { getAppUrl } from "@/lib/env";
import { processDueReleases } from "@/lib/releases";

export async function POST() {
  const result = await processDueReleases();
  const url = new URL("/admin", getAppUrl());
  url.searchParams.set("success", `Procesadas ${result.processedOrders} ordenes con entregas pendientes.`);
  return NextResponse.redirect(url, { status: 303 });
}

export async function GET() {
  const result = await processDueReleases();
  return NextResponse.json({ ok: true, ...result });
}

