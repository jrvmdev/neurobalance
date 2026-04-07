const optionalEnv = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  mercadopagoAccessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  resendApiKey: process.env.RESEND_API_KEY,
  resendFromEmail: process.env.RESEND_FROM_EMAIL,
  databaseUrl: process.env.DATABASE_URL,
  blobToken: process.env.BLOB_READ_WRITE_TOKEN,
  adminEmail: process.env.ADMIN_EMAIL,
};

export function getAppUrl() {
  return optionalEnv.appUrl ?? "http://localhost:3000";
}

export function hasStripeConfigured() {
  return Boolean(optionalEnv.stripeSecretKey);
}

export function getStripeSecretKey() {
  return optionalEnv.stripeSecretKey;
}

export function hasMercadoPagoConfigured() {
  return Boolean(optionalEnv.mercadopagoAccessToken);
}

export function getMercadoPagoAccessToken() {
  return optionalEnv.mercadopagoAccessToken;
}

export function hasEmailConfigured() {
  return Boolean(optionalEnv.resendApiKey && optionalEnv.resendFromEmail);
}

export function getResendApiKey() {
  return optionalEnv.resendApiKey;
}

export function getResendFromEmail() {
  return optionalEnv.resendFromEmail ?? "hola@neurobalance.local";
}

export function hasDatabaseConfigured() {
  return Boolean(optionalEnv.databaseUrl);
}

export function getAdminEmail() {
  return optionalEnv.adminEmail ?? "admin@neurobalance.local";
}

