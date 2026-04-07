import Link from "next/link";

type ThanksPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const params = await searchParams;
  const provider = typeof params.provider === "string" ? params.provider : "compra";
  const status = typeof params.status === "string" ? params.status : "pendiente";
  const email = typeof params.email === "string" ? params.email : "tu email";
  const orderId = typeof params.orderId === "string" ? params.orderId : "orden generada";

  return (
    <main className="simple-page">
      <div className="container simple-card card">
        <p className="eyebrow">Confirmacion</p>
        <h1 className="section-title">Tu compra quedo iniciada.</h1>
        <p className="section-copy">
          Orden: <strong>{orderId}</strong>. Proveedor: <strong>{provider}</strong>. Estado actual: <strong>{status}</strong>.
        </p>
        <p className="section-copy">
          Cuando el pago quede confirmado, el sistema agenda las 7 entregas de la coleccion: 2 tomos en la semana 1 y luego 1 tomo por semana hasta completar la serie.
        </p>
        <p className="section-copy">
          Confirmacion y contacto principal: <strong>{email}</strong>.
        </p>
        <div className="cta-row">
          <Link href="/" className="button-primary">
            Volver a la landing
          </Link>
          <Link href="/admin" className="button-secondary">
            Ver admin
          </Link>
        </div>
      </div>
    </main>
  );
}

