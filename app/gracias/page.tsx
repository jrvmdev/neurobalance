import Link from "next/link";
import { getProductBySlug, mainProduct } from "@/lib/site-data";

type ThanksPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ThanksPage({ searchParams }: ThanksPageProps) {
  const params = await searchParams;
  const provider = typeof params.provider === "string" ? params.provider : "compra";
  const status = typeof params.status === "string" ? params.status : "pendiente";
  const email = typeof params.email === "string" ? params.email : "tu email";
  const orderId = typeof params.orderId === "string" ? params.orderId : "orden generada";
  const productSlug = typeof params.productSlug === "string" ? params.productSlug : mainProduct.slug;
  const product = getProductBySlug(productSlug) ?? mainProduct;
  const isCollection = product.purchaseMode === "collection";

  return (
    <main className="simple-page">
      <div className="container simple-card card">
        <p className="eyebrow">Confirmacion</p>
        <h1 className="section-title">Tu compra quedo iniciada.</h1>
        <p className="section-copy">
          Orden: <strong>{orderId}</strong>. Proveedor: <strong>{provider}</strong>. Estado actual: <strong>{status}</strong>.
        </p>
        <p className="section-copy">
          Producto: <strong>{product.name}</strong>.
        </p>
        <p className="section-copy">
          {isCollection
            ? "Cuando el pago quede confirmado, el sistema agenda las 4 etapas de la coleccion: tomos 1 y 2, luego 3 y 4, despues 5 y 6 y al final el tomo 7."
            : "Cuando el pago quede confirmado, el sistema agenda la entrega del tomo individual correspondiente segun su fecha de disponibilidad."}
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
