import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout-form";
import {
  checkoutProductOptions,
  collectionDiscountPct,
  collectionPriceArs,
  collectionSavingsArs,
  collectionVolumes,
  faqs,
  mainProduct,
  purchaseMethods,
  singleVolumePriceArs,
  trustPoints,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Conoce como piensas, cambia como vives",
  description:
    "NeuroBalance es una biblioteca digital sobre neuroplasticidad, regulacion emocional, habitos y bienestar mental con tomos individuales y coleccion anticipada.",
  keywords: [
    "neurobalance",
    "neuroplasticidad",
    "bienestar mental",
    "regulacion emocional",
    "psicologia positiva",
    "habitos",
    "desarrollo personal",
    "ebooks de bienestar",
  ],
  openGraph: {
    title: "NeuroBalance | Conoce como piensas, cambia como vives",
    description:
      "Biblioteca digital sobre neuroplasticidad, habitos, regulacion emocional y bienestar mental con tomos individuales y coleccion anticipada.",
    type: "website",
    locale: "es_ES",
    siteName: "NeuroBalance",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroBalance | Conoce como piensas, cambia como vives",
    description:
      "Biblioteca digital sobre neuroplasticidad, habitos, regulacion emocional y bienestar mental.",
  },
};

function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M30 30C30 22 40 18 50 18C60 18 70 22 70 30" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      <path d="M35 34C35 28 42 26 50 26C58 26 65 28 65 34" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <circle cx="50" cy="50" r="10" stroke="#D4AF37" strokeWidth="2" />
      <circle cx="50" cy="50" r="5" fill="#D4AF37" opacity="0.35" />
      <line x1="50" y1="36" x2="50" y2="40" stroke="#D4AF37" strokeWidth="1.5" />
      <line x1="50" y1="60" x2="50" y2="64" stroke="#D4AF37" strokeWidth="1.5" />
      <path
        d="M50 70C50 70 40 65 36 68C32 71 34 78 50 85C66 78 68 71 64 68C60 65 50 70 50 70Z"
        fill="#E8C4B8"
        stroke="#D4AF37"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const pillars = [
  ["Neuroplasticidad", "Aprende como tu cerebro puede cambiar y adaptarse a cualquier edad, creando nuevos patrones de pensamiento positivos."],
  ["Regulacion Emocional", "Tecnicas validadas para gestionar tus emociones y alcanzar un estado de equilibrio psicologico duradero."],
  ["Psicologia Positiva", "Estrategias respaldadas por la investigacion para desarrollar resiliencia, bienestar y proposito vital."],
  ["Sistemas de Habitos", "Construye sistemas efectivos de mejora continua, porque no alcanzas tus metas, caes al nivel de tus sistemas."],
  ["Identidad y Cambio", "Cada accion es un voto por el tipo de persona que deseas ser. Transforma tu identidad, no solo tu conducta."],
  ["Mejora del 1%", "Pequenas mejoras diarias se componen en resultados extraordinarios. El progreso es acumulativo, no instantaneo."],
] as const;

const benefits = [
  ["Claridad Mental", "Desarrolla la capacidad de tomar decisiones conscientes y alineadas con tus valores mas profundos."],
  ["Resiliencia Emocional", "Construye una base solida para enfrentar los desafios de la vida con serenidad y fortaleza."],
  ["Paz Interior", "Cultiva un estado de calma profunda que permanece contigo incluso en momentos dificiles."],
  ["Transformacion Real", "Experimenta cambios duraderos en tu forma de pensar, sentir y actuar en el mundo."],
] as const;

const experts = [
  ["Marian Rojas Estape", "Psiquiatria y gestion emocional"],
  ["Joe Dispenza", "Neuroplasticidad y meditacion"],
  ["Viktor Frankl", "Logoterapia y sentido de vida"],
  ["Carl Jung", "Psicologia analitica"],
  ["James Clear", "Formacion de habitos"],
  ["Martin Seligman", "Psicologia positiva"],
  ["Rafael Vidac", "Mentalidad de abundancia"],
  ["Y muchos mas...", "Compendio de expertos reconocidos"],
] as const;

const testimonials = [
  [
    "Estos tomos cambiaron completamente mi perspectiva sobre el estres y la ansiedad. Las herramientas son practicas y los resultados son reales. Me siento mas en paz conmigo misma que nunca.",
    "Maria L., Barcelona",
  ],
  [
    "Como profesional de la salud, aprecio el rigor cientifico detras de cada consejo. Es un puente perfecto entre la neurociencia y la aplicacion practica en la vida diaria.",
    "Dr. Carlos M., Madrid",
  ],
] as const;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NeuroBalance",
  description:
    "Proyecto editorial digital sobre neuroplasticidad, regulacion emocional, bienestar mental y transformacion personal con base cientifica.",
  brand: "NeuroBalance",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NeuroBalance",
  inLanguage: "es",
  description:
    "Biblioteca digital sobre neuroplasticidad, habitos, regulacion emocional y bienestar mental.",
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: mainProduct.name,
  description:
    "Coleccion digital anticipada de 7 tomos sobre neuroplasticidad, regulacion emocional, habitos, psicologia positiva, relaciones, proposito e integracion.",
  brand: {
    "@type": "Brand",
    name: "NeuroBalance",
  },
  offers: {
    "@type": "Offer",
    price: String(mainProduct.arsAmount),
    priceCurrency: "ARS",
    availability: "https://schema.org/InStock",
  },
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      <div className="zen-bg" aria-hidden="true">
        <div className="zen-blob zen-blob-1" />
        <div className="zen-blob zen-blob-2" />
        <div className="zen-blob zen-blob-3" />
        <div className="zen-blob zen-blob-4" />
        <div className="zen-grain" />
      </div>

      <nav className="site-nav">
        <div className="nav-inner">
          <a className="nav-brand" href="#top">
            <BrandMark />
            <span className="nav-brand-lockup">
              <strong className="nav-brand-name">NeuroBalance</strong>
              <span className="nav-brand-tag">Neurociencia aplicada y bienestar mental</span>
            </span>
          </a>
          <div className="nav-actions">
            <a className="nav-link" href="#fundamentos">
              Fundamentos
            </a>
            <a className="nav-cta" href="#adquirir">
              Comienza ahora
            </a>
          </div>
        </div>
      </nav>

      <main id="top">
        <section className="hero section-shell">
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="eyebrow">NeuroBalance</p>
              <h1>
                Conoce como piensas,
                <br />
                <em>cambia como vives</em>
              </h1>
              <p className="hero-subtitle">
                Descubre el poder de la neuroplasticidad y reprograma tu cerebro para alcanzar el bienestar emocional y mental que mereces.
              </p>

              <div className="hero-actions">
                <a className="btn-primary" href="#adquirir">
                  Comienza Tu Transformacion
                </a>
                <a className="btn-secondary" href="#biblioteca">
                  Ver biblioteca
                </a>
              </div>

              <div className="hero-trust">
                <div className="hero-trust-item">
                  <span className="hero-trust-kicker">Tomo individual</span>
                  <strong>ARS {singleVolumePriceArs.toLocaleString("es-AR")}</strong>
                </div>
                <div className="hero-trust-item">
                  <span className="hero-trust-kicker">Coleccion anticipada</span>
                  <strong>ARS {collectionPriceArs.toLocaleString("es-AR")}</strong>
                </div>
                <div className="hero-trust-item">
                  <span className="hero-trust-kicker">Ahorro</span>
                  <strong>{collectionDiscountPct}% sobre el total</strong>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-orbit" />
              <div className="hero-stack">
                <article className="hero-card hero-card-back">
                  <span className="hero-card-label">Tomo VII</span>
                  <h3>Plan de Integracion</h3>
                  <p>Un sistema claro para convertir teoria en practica diaria y sostener resultados reales.</p>
                </article>

                <article className="hero-card hero-card-mid">
                  <span className="hero-card-label">Entrega progresiva</span>
                  <h3>Tomos 1 y 2 primero</h3>
                  <p>Despues recibes 3 y 4, luego 5 y 6, y por ultimo el tomo 7.</p>
                </article>

                <article className="hero-card hero-card-front">
                  <div className="hero-card-brand">
                    <BrandMark className="hero-card-mark" />
                    <span>Coleccion NeuroBalance</span>
                  </div>
                  <h3>Compra tomos individuales o reserva la coleccion anticipada con descuento</h3>
                  <p>{mainProduct.releaseModel}</p>
                  <ul className="hero-card-list">
                    <li>Tomo individual: ARS {singleVolumePriceArs.toLocaleString("es-AR")}</li>
                    <li>Coleccion anticipada: ARS {collectionPriceArs.toLocaleString("es-AR")}</li>
                    <li>Ahorras ARS {collectionSavingsArs.toLocaleString("es-AR")} frente al total por separado</li>
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section-shell-soft" id="fundamentos">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Fundamentos cientificos del cambio mental</p>
              <h2 className="section-title">Fundamentos cientificos para transformar tu manera de pensar, sentir y vivir</h2>
              <p className="section-copy">
                Esta biblioteca integra principios de psicologia, neurociencia y desarrollo personal para ayudarte a construir bienestar real desde adentro.
              </p>
            </div>

            <div className="pillars-grid">
              {pillars.map(([title, copy]) => (
                <article key={title} className="zen-card pillar-card">
                  <span className="pillar-mark" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="biblioteca">
          <div className="container">
            <div className="section-heading split">
              <div>
                <p className="eyebrow">Biblioteca NeuroBalance</p>
                <h2 className="section-title">Titulos de la Coleccion I</h2>
              </div>
              <p className="section-copy">
                Puedes empezar por un tomo individual o reservar la coleccion anticipada completa. Aqui ves el mapa editorial inicial, sin mezclarlo con el detalle comercial.
              </p>
            </div>

            <div className="library-grid">
              {collectionVolumes.map((volume) => (
                <article key={volume.id} className="zen-card library-card">
                  <span className="volume-number">Tomo {volume.number}</span>
                  <h3>{volume.title}</h3>
                  <span className={`volume-status volume-status-${volume.releaseStatus}`}>
                    {volume.releaseStatus === "published" ? "Disponible" : `Se libera ${volume.releaseDate}`}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell section-shell-tint">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Conocimiento respaldado por expertos</p>
              <h2 className="section-title">Conocimiento respaldado por expertos en psicologia, neurociencia y desarrollo personal</h2>
              <p className="section-copy">
                Nuestros tomos integran los descubrimientos mas relevantes de reconocidos profesionales en psicologia, neurociencia y desarrollo personal. Cada pagina esta disenada para guiarte paso a paso en tu proceso de transformacion mental, con ejercicios practicos y reflexiones fundamentadas en la ciencia.
              </p>
            </div>

            <div className="experts-grid">
              {experts.map(([name, area]) => (
                <article key={name} className="zen-card expert-card">
                  <span className="expert-glyph">*</span>
                  <h3>{name}</h3>
                  <p>{area}</p>
                </article>
              ))}
            </div>

            <p className="section-footnote">
              Esta coleccion se basa en conceptos, estudios y metodologias de estos y otros expertos reconocidos en sus campos. No implica endorsement directo de los autores mencionados.
            </p>
          </div>
        </section>

        <section className="section-shell">
          <div className="container benefits-layout">
            <div>
              <p className="eyebrow">Lo Que Lograras</p>
              <h2 className="section-title">Lo que lograras cuando entrenes tu mente con mas claridad y constancia</h2>
              <div className="benefits-list">
                {benefits.map(([title, copy]) => (
                  <article key={title} className="benefit-row">
                    <div className="benefit-dot" />
                    <div>
                      <h3>{title}</h3>
                      <p>{copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="benefits-panel zen-card">
              <p className="benefits-panel-quote">
                "Tu mente es tu recurso mas valioso. Dale las herramientas que necesita para florecer."
              </p>
              <div className="benefits-stats">
                <div>
                  <strong>7</strong>
                  <span>titulos iniciales en la Coleccion I</span>
                </div>
                <div>
                  <strong>{collectionDiscountPct}%</strong>
                  <span>de ahorro en la coleccion anticipada</span>
                </div>
                <div>
                  <strong>4</strong>
                  <span>etapas de entrega para la reserva completa</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell section-shell-dark">
          <div className="container">
            <div className="section-heading centered section-heading-dark">
              <p className="eyebrow">Historias de Transformacion</p>
              <h2 className="section-title">Historias de transformacion que muestran el impacto de aplicar estas herramientas</h2>
            </div>

            <div className="testimonials-grid">
              {testimonials.map(([quote, author]) => (
                <article key={author} className="testimonial-card">
                  <p className="testimonial-copy">{quote}</p>
                  <p className="testimonial-author">- {author}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell pricing-section" id="adquirir">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Formas de acceso</p>
              <h2 className="section-title">Elige si quieres empezar por un tomo o reservar la coleccion anticipada</h2>
              <p className="section-copy">
                NeuroBalance no se compra de una sola manera. Puedes entrar por un titulo individual o asegurar la Coleccion I completa con precio preferencial.
              </p>
            </div>

            <div className="offer-grid">
              <article className="pricing-card offer-card">
                <div className="pricing-panels offer-panels">
                  <p className="pricing-overline">Tomo individual</p>
                  <h3 className="offer-title">Empieza por el titulo que mas resuene contigo</h3>
                  <div className="ppanel-price">ARS {singleVolumePriceArs.toLocaleString("es-AR")}</div>
                  <p className="offer-copy">Ideal para quien quiere entrar por un tema puntual y construir su propia biblioteca tomo por tomo.</p>
                  <ul className="offer-list">
                    <li>Acceso por tomo</li>
                    <li>Misma calidad editorial</li>
                    <li>Perfecto para compra puntual</li>
                  </ul>
                  <a className="btn-secondary offer-link" href="#biblioteca">
                    Ver titulos disponibles
                  </a>
                </div>
              </article>

              <article className="pricing-card offer-card offer-card-featured">
                <div className="pricing-card-glow" />
                <div className="pricing-panels offer-panels">
                  <p className="pricing-overline">Coleccion anticipada</p>
                  <h3 className="offer-title">Reserva los 7 tomos con precio preferencial</h3>
                  <div className="ppanel-price">ARS {collectionPriceArs.toLocaleString("es-AR")}</div>
                  <p className="offer-copy">Aseguras toda la Coleccion I desde hoy y entras al recorrido editorial completo con descuento real.</p>
                  <ul className="offer-list">
                    <li>Ahorro de ARS {collectionSavingsArs.toLocaleString("es-AR")}</li>
                    <li>Descuento del {collectionDiscountPct}% sobre el total individual</li>
                    <li>Entrega en 4 etapas: 1-2 / 3-4 / 5-6 / 7</li>
                  </ul>
                </div>
              </article>
            </div>

            <div className="trust-strip">
              {trustPoints.map((point) => (
                <div key={point} className="trust-pill">
                  {point}
                </div>
              ))}
            </div>

            <p className="pricing-note">La compra desde esta web ya permite elegir entre la coleccion anticipada completa o un tomo individual puntual.</p>

            <CheckoutForm
              methods={purchaseMethods}
              productOptions={checkoutProductOptions}
              initialProductSlug={mainProduct.slug}
            />

            <div className="faq-grid">
              {faqs.map((faq) => (
                <article key={faq.question} className="zen-card faq-card">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>

            <div className="disclaimer-wrap">
              <h3 className="disclaimer-title">Aviso Importante</h3>
              <p>
                Este material educativo complementa, pero no sustituye, la atencion profesional de psicologos, psiquiatras o terapeutas cualificados. Si experimentas sintomas de ansiedad, depresion u otras condiciones de salud mental, te recomendamos encarecidamente consultar con un profesional de la salud mental autorizado. En situaciones de crisis o emergencia, contacta inmediatamente con los servicios de emergencia de tu localidad.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <BrandMark className="footer-mark" />
            <span className="footer-brand-name">NeuroBalance</span>
          </div>
          <p className="footer-description">Transformando vidas a traves del conocimiento cientifico y la sabiduria practica.</p>
          <div className="footer-links">
            <a href="#">Politica de Privacidad</a>
            <a href="#">Terminos y Condiciones</a>
            <a href="#">Contacto</a>
            <a href="#">Preguntas Frecuentes</a>
          </div>
          <p className="footer-copy">2026 NeuroBalance. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}





