export type PaymentProvider = "stripe" | "mercadopago" | "transfer";

export type OrderStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded"
  | "awaiting_transfer"
  | "cancelled";

export type ReleaseStatus = "published" | "scheduled";
export type DeliveryStatus = "scheduled" | "sent" | "skipped";

export type EbookVolume = {
  id: string;
  number: number;
  title: string;
  authorFocus: string[];
  promise: string;
  chapters: string[];
  outcome: string;
  releaseStatus: ReleaseStatus;
  releaseDate: string;
  deliveryNote: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  heroPrice: string;
  arsAmount: number;
  usdAmount: number;
  format: string;
  delivery: string;
  releaseModel: string;
  supportChannels: string[];
  volumes: EbookVolume[];
  bonuses: string[];
};

export type PurchaseMethod = {
  provider: PaymentProvider;
  title: string;
  badge: string;
  summary: string;
  buttonLabel: string;
  helper: string;
};

export type OrderRecord = {
  id: string;
  customerEmail: string;
  customerName: string;
  productSlug: string;
  provider: PaymentProvider;
  status: OrderStatus;
  amount: number;
  currency: "ARS" | "USD";
  createdAt: string;
  paidAt?: string;
  providerReference?: string;
};

export type DeliveryRecord = {
  id: string;
  orderId: string;
  volumeId: string;
  scheduledFor: string;
  status: DeliveryStatus;
  sentAt?: string;
  channel?: "email" | "manual";
  notes?: string;
};

export type VolumeAssetRecord = {
  id: string;
  volumeId: string;
  fileName: string;
  fileUrl: string;
  storagePath?: string;
  mimeType?: string;
  sizeBytes?: number;
  uploadedAt: string;
};
