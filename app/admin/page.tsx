import Link from "next/link";
import { getAdminEmail, hasEmailConfigured } from "@/lib/env";
import { collectionVolumes, launchChecklist } from "@/lib/site-data";
import { listDeliveries, listOrders } from "@/lib/store";

type AdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const success = typeof params.success === "string" ? params.success : null;
  const error = typeof params.error === "string" ? params.error : null;
  const orders = await listOrders();
  const deliveries = await listDeliveries();
  const publishedCount = collectionVolumes.filter(
    (volume) => volume.releaseStatus === "published",
  ).length;
  const scheduledCount = collectionVolumes.length - publishedCount;

  return (
    <main className="simple-page">
      <div className="container admin-layout">
        <section className="card admin-intro">
          <p className="eyebrow">Admin minimo</p>
          <h1 className="section-title">Operaciones simples para cobrar y reenviar.</h1>
          <p className="section-copy">
            Email administrativo esperado: <strong>{getAdminEmail()}</strong>. El foco es detectar pagos, disparar entregas semanales y tener reenvio simple si hace falta.
          </p>
          <p className="section-copy">
            Publicados: <strong>{publishedCount}</strong>. Programados: <strong>{scheduledCount}</strong>. Email automatico: <strong>{hasEmailConfigured() ? "listo" : "pendiente"}</strong>.
          </p>
          {success ? <p className="checkout-message">{success}</p> : null}
          {error ? <p className="checkout-message">{error}</p> : null}
          <div className="cta-row">
            <Link href="/" className="button-secondary">
              Ver landing
            </Link>
            <form action="/api/releases/process" method="POST">
              <button type="submit" className="button-primary">
                Procesar entregas de hoy
              </button>
            </form>
          </div>
        </section>

        <section className="card orders-table-card">
          <div className="orders-head">
            <h2>Ordenes</h2>
            <span>{orders.length} registros</span>
          </div>
          <div className="orders-table">
            <div className="orders-row orders-row-head">
              <span>Orden</span>
              <span>Cliente</span>
              <span>Proveedor</span>
              <span>Estado</span>
              <span>Accion</span>
            </div>
            {orders.map((order) => {
              const orderDeliveries = deliveries.filter((delivery) => delivery.orderId === order.id);
              const sent = orderDeliveries.filter((delivery) => delivery.status === "sent").length;

              return (
                <div key={order.id} className="orders-row">
                  <span>
                    {order.id}
                    <small>{order.createdAt.slice(0, 10)}</small>
                  </span>
                  <span>
                    {order.customerName}
                    <small>{order.customerEmail}</small>
                  </span>
                  <span>{order.provider}</span>
                  <span className={`status-badge status-${order.status}`}>{order.status}</span>
                  <span>
                    {sent}/7 entregas enviadas
                    {order.status !== "paid" ? (
                      <form action={`/api/admin/orders/${order.id}/mark-paid`} method="POST">
                        <button className="button-secondary" type="submit">
                          Marcar pagada
                        </button>
                      </form>
                    ) : (
                      <small>Pago confirmado</small>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="card">
          <p className="eyebrow">Liberacion semanal</p>
          <h2 className="section-title">Roadmap interno de entrega</h2>
          <div className="orders-table">
            <div className="orders-row orders-row-head">
              <span>Tomo</span>
              <span>Titulo</span>
              <span>Estado</span>
              <span>Fecha</span>
              <span>Entrega</span>
            </div>
            {collectionVolumes.map((volume) => (
              <div key={volume.id} className="orders-row">
                <span>{volume.number}</span>
                <span>{volume.title}</span>
                <span>{volume.releaseStatus}</span>
                <span>{volume.releaseDate}</span>
                <span>{volume.deliveryNote}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <p className="eyebrow">Operacion</p>
          <h2 className="section-title">Checklist corto para el equipo</h2>
          <ol>
            {launchChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}

