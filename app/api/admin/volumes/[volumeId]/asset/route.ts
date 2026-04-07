import { randomUUID } from "node:crypto";
import path from "node:path";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getAppUrl, hasBlobConfigured } from "@/lib/env";
import { collectionVolumes } from "@/lib/site-data";
import { saveVolumeAsset } from "@/lib/store";

function buildRedirect(messageKey: "success" | "error", message: string) {
  const url = new URL("/admin", getAppUrl());
  url.searchParams.set(messageKey, message);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: Request, context: { params: Promise<{ volumeId: string }> }) {
  const { volumeId } = await context.params;
  const volume = collectionVolumes.find((entry) => entry.id === volumeId);

  if (!volume) {
    return buildRedirect("error", "No se encontro el tomo seleccionado.");
  }

  if (!hasBlobConfigured()) {
    return buildRedirect("error", "Falta configurar BLOB_READ_WRITE_TOKEN para subir PDFs.");
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return buildRedirect("error", "Debes adjuntar un archivo PDF.");
  }

  if (file.type && file.type !== "application/pdf") {
    return buildRedirect("error", "Solo se permiten archivos PDF.");
  }

  const safeFileName = `${volumeId}-${randomUUID().slice(0, 8)}${path.extname(file.name || ".pdf") || ".pdf"}`;
  const blob = await put(`volumes/${volumeId}/${safeFileName}`, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type || "application/pdf",
  });

  await saveVolumeAsset({
    id: `asset_${randomUUID().slice(0, 8)}`,
    volumeId,
    fileName: file.name || safeFileName,
    fileUrl: blob.url,
    storagePath: blob.pathname,
    mimeType: file.type || "application/pdf",
    sizeBytes: file.size,
    uploadedAt: new Date().toISOString(),
  });

  return buildRedirect("success", `PDF cargado para Tomo ${volume.number}.`);
}
