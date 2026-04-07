import { CheckoutForm } from "@/components/checkout-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  faqs,
  launchChecklist,
  mainProduct,
  purchaseMethods,
  trustPoints,
} from "@/lib/site-data";

export default function HomePage() {
  const publishedVolumes = mainProduct.volumes.filter(
    (volume) => volume.releaseStatus === "published",
  );

  return (
    <div className="page-shell">
      <SiteHeader />

      <main>
        <section className="hero section">
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">Precio promocional anticipado</p>
              <h1 className="display-title">
                Compra la coleccion completa hoy y recibe 2 tomos en la semana 1.
              </h1>
              <p className="lede hero-lede">{mainProduct.shortDescription}</p>
              <div className="cta-row">
                <a href="#compra" className="button-primary">
                  Comprar ahora
                </a>
                <a href="#roadmap" className="button-secondary">
                  Ver calendario
                </a>
              </div>
              <div className="hero-trust">
                <span className="pill">{mainProduct.heroPrice}</span>
                <span className="pill">{mainProduct.delivery}</span>
                <span className="pill">{mainProduct.format}</span>
              </div>
            </div>

            <div className="hero-panel muted-card">
              <div className="hero-panel-top">
                <span>Oferta principal</span>
                <strong>{mainProduct.name}</strong>
              </div>
              <div className="hero-stack">
                {publishedVolumes.map((volume) => (
                  <article key={volume.id} className="hero-book">
                    <p>Tomo {volume.number} disponible</p>
                    <h2>{volume.title}</h2>
                    <span>{volume.deliveryNote}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <p className="eyebrow">Menos friccion</p>
            <h2 className="section-title">Checkout directo, soporte humano solo cuando hace falta.</h2>
            <p className="section-copy">
              El checkout no depende de WhatsApp. El soporte queda para reenvios, dudas y casos puntuales, no para sostener toda la venta.
            </p>

            <div className="grid-3 trust-grid">
              {trustPoints.map((point) => (
                <article key={point} className="muted-card trust-card">
                  <strong>{point}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="roadmap">
          <div className="container">
            <p className="eyebrow">Calendario de entrega</p>
            <h2 className="section-title">La coleccion se compra siempre y se completa por etapas.</h2>
            <p className="section-copy">
              El cliente entra con precio promocional anticipado, recibe 2 tomos en la semana 1 y luego 1 tomo por semana hasta completar los 7.
            </p>

            <div className="volumes-grid">
              {mainProduct.volumes.map((volume) => (
                <article key={volume.id} className="card volume-card">
                  <div className="volume-heading">
                    <span>Tomo {volume.number}</span>
                    <p>
                      {volume.releaseStatus === "published"
                        ? "Semana 1"
                        : `Programado ${volume.releaseDate}`}
                    </p>
                  </div>
                  <h3>{volume.title}</h3>
                  <p className="volume-promise">{volume.promise}</p>
                  <ul>
                    {volume.chapters.map((chapter) => (
                      <li key={chapter}>{chapter}</li>
                    ))}
                  </ul>
                  <strong>{volume.deliveryNote}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container grid-2">
            <article className="card offer-card">
              <p className="eyebrow">Que recibes</p>
              <h2 className="section-title">Una compra, toda la coleccion.</h2>
              <ul className="offer-list">
                <li>Semana 1 recibes los tomos 1 y 2.</li>
                <li>Desde la semana 2 recibes 1 tomo nuevo por semana.</li>
                <li>La coleccion sigue vendiendose tambien cuando ya esten los 7 completos.</li>
                <li>Soporte para reenvios por email, WhatsApp o Instagram.</li>
              </ul>
              <div className="bonus-block">
                {mainProduct.bonuses.map((bonus) => (
                  <span key={bonus} className="pill">
                    {bonus}
                  </span>
                ))}
              </div>
            </article>

            <article className="card flow-card">
              <p className="eyebrow">Operacion recomendada</p>
              <ol>
                {launchChecklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section className="section" id="compra">
          <div className="container purchase-layout">
            <div>
              <p className="eyebrow">Compra directa</p>
              <h2 className="section-title">Mercado Pago para Argentina, Stripe para internacional.</h2>
              <p className="section-copy">
                La coleccion completa se puede comprar siempre. El diferencial de esta etapa es el precio promocional anticipado.
              </p>
              <p className="section-copy">{mainProduct.releaseModel}</p>
            </div>
            <CheckoutForm methods={purchaseMethods} productSlug={mainProduct.slug} />
          </div>
        </section>

        <section className="section" id="faq">
          <div className="container">
            <p className="eyebrow">Preguntas frecuentes</p>
            <h2 className="section-title">Lo importante antes de comprar.</h2>
            <div className="faq-grid">
              {faqs.map((faq) => (
                <article key={faq.question} className="muted-card faq-card">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container card">
            <p className="eyebrow">Canales de soporte</p>
            <h2 className="section-title">Si algo falla, el soporte acompana pero no frena la venta.</h2>
            <p className="section-copy">
              Canales activos: {mainProduct.supportChannels.join(", ")}.
            </p>
            <p className="section-copy">
              La idea es aceitar al maximo el flujo automatico y usar soporte humano solo para reenvios o casos especiales.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

