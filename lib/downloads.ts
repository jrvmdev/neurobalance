import { createHash, randomBytes } from "node:crypto";

export function generateDownloadToken() {
  return randomBytes(24).toString("base64url");
}

export function hashDownloadToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function buildDownloadRecord(orderId: string) {
  const token = generateDownloadToken();

  return {
    plainToken: token,
    record: {
      orderId,
      tokenHash: hashDownloadToken(token),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 48).toISOString(),
      maxDownloads: 3,
      downloadCount: 0,
      createdAt: new Date().toISOString(),
    },
  };
}
