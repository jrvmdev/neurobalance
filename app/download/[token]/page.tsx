type DownloadPageProps = {
  params: Promise<{ token: string }>;
};

export default async function DownloadPage({ params }: DownloadPageProps) {
  const { token } = await params;

  return (
    <main className="simple-page">
      <div className="container simple-card card">
        <p className="eyebrow">Descarga protegida</p>
        <h1 className="section-title">Magic link listo para validación real.</h1>
        <p className="section-copy">
          Token recibido: <strong>{token}</strong>. Esta ruta está preparada para validar hash, expiración y cantidad máxima de descargas cuando la base de datos y storage estén conectados.
        </p>
      </div>
    </main>
  );
}
