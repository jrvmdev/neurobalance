import Link from "next/link";
import { getAdminEmail, hasBlobConfigured, hasEmailConfigured } from "@/lib/env";
import { collectionVolumes, launchChecklist } from "@/lib/site-data";
import { getStoreDiagnostics, listDeliveries, listOrders, listVolumeAssets } from "@/lib/store";

type AdminPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const success = typeof params.success === "string" ? params.success : null;
  const error = typeof params.error === "string" ? params.error : null;
  const orders = await listOrders();
  const deliveries = await listDeliveries();
  const volumeAssets = await listVolumeAssets();
  const storeInfo = getStoreDiagnostics();
  const publishedCount = collectionVolumes.filter(
    (volume) => volume.releaseStatus === "published",
  ).length;
  const scheduledCount = collectionVolumes.length - publishedCount;

  return (
    <main className="simple-page">
      <div className="container admin-layout">
        <section className="card admin-intro">
          <p className="eyebrow">Admin minimo</p>
          <h1 className="section-title">Operaciones simples para cobrar, entregar y gestionar los PDF.</h1>
          <p className="section-copy">
            Email administrativo esperado: <strong>{getAdminEmail()}</strong>. El foco es detectar pagos, disparar entregas semanales y tener una gestion simple de los activos de cada tomo.
          </p>
          <p className="section-copy">
            Publicados: <strong>{publishedCount}</strong>. Programados: <strong>{scheduledCount}</strong>. Email automatico: <strong>{hasEmailConfigured() ? "listo" : "pendiente"}</strong>.
          </p>
          <p className="section-copy">
            Persistencia actual: <strong>{storeInfo.mode}</strong>. Base de datos: <strong>{storeInfo.databaseConfigured ? "configurada" : "pendiente"}</strong>. Blob: <strong>{hasBlobConfigured() ? "configurado" : "pendiente"}</strong>.
          </p>
          {!storeInfo.databaseConfigured ? (
            <p className="checkout-inline-error">
              El admin ya no deberia romper en produccion, pero hasta que no configures <strong>DATABASE_URL</strong> no tendras persistencia real en Vercel.
            </p>
          ) : null}
          {success ? <p className="checkout-message">{success}</p> : null}
          {error ? <p className="checkout-inline-error">{error}</p> : null}
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
          <p className="eyebrow">Biblioteca</p>
          <h2 className="section-title">PDF por tomo</h2>
          <p className="section-copy">
            Cada tomo puede tener un PDF principal. Al subir uno nuevo para el mismo tomo, reemplazamos la referencia guardada.
          </p>
          <div className="orders-table">
            <div className="orders-row orders-row-head">
              <span>Tomo</span>
              <span>Titulo</span>
              <span>Asset actual</span>
              <span>Subir PDF</span>
              <span>Entrega</span>
            </div>
            {collectionVolumes.map((volume) => {
              const asset = volumeAssets.find((entry) => entry.volumeId === volume.id);

              return (
                <div key={volume.id} className="orders-row">
                  <span>{volume.number}</span>
                  <span>{volume.title}</span>
                  <span>
                    {asset ? (
                      <>
                        <a href={asset.fileUrl} target="_blank" rel="noreferrer">
                          {asset.fileName}
                        </a>
                        <small>{asset.uploadedAt.slice(0, 10)}</small>
                      </>
                    ) : (
                      <small>Sin PDF cargado</small>
                    )}
                  </span>
                  <span>
                    <form action={`/api/admin/volumes/${volume.id}/asset`} method="POST" encType="multipart/form-data">
                      <input type="file" name="file" accept="application/pdf" required />
                      <button className="button-secondary" type="submit">
                        Subir PDF
                      </button>
                    </form>
                  </span>
                  <span>{volume.deliveryNote}</span>
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
