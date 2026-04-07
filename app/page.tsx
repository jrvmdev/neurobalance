import { CheckoutForm } from "@/components/checkout-form";
import { purchaseMethods } from "@/lib/site-data";

function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M50 18C38 18 30 25 30 34C30 28 36 24 42 26C40 22 44 18 50 18Z" fill="#D4AF37" />
      <path d="M50 18C62 18 70 25 70 34C70 28 64 24 58 26C60 22 56 18 50 18Z" fill="#C8A22E" />
      <ellipse cx="50" cy="38" rx="18" ry="14" stroke="#D4AF37" strokeWidth="2.5" />
      <path d="M42 34C42 34 44 30 50 30C56 30 58 34 58 34" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 40C34 42 34 45 36 47" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      <path d="M64 40C66 42 66 45 64 47" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 52L50 58" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      <path d="M44 62C44 62 40 60 38 63C36 66 38 71 50 77C62 71 64 66 62 63C60 60 56 62 56 62C53 60 50 62 50 62C47 60 44 62 44 62Z" fill="#E8C4B8" stroke="#D4AF37" strokeWidth="1.5" />
    </svg>
  );
}

const experts = [
  ["Marian Rojas Estapé", "Psiquiatría y gestión emocional"],
  ["Joe Dispenza", "Neuroplasticidad y meditación"],
  ["Viktor Frankl", "Logoterapia y sentido de vida"],
  ["Carl Jung", "Psicología analítica"],
  ["James Clear", "Formación de hábitos"],
  ["Martin Seligman", "Psicología positiva"],
  ["Rafael Vidac", "Mentalidad de abundancia"],
  ["Y muchos más", "Compendio de expertos reconocidos"],
] as const;

const pillars = [
  ["Neuroplasticidad", "Tu cerebro cambia toda la vida. Aprende a dirigir ese cambio con intención."],
  ["Regulación Emocional", "Técnicas validadas para gestionar tus emociones y alcanzar un equilibrio psicológico duradero."],
  ["Psicología Positiva", "Estrategias respaldadas por la investigación para desarrollar resiliencia y propósito vital."],
  ["Sistemas de Hábitos", "Construye sistemas efectivos de mejora continua. No alcanzas tus metas, caes al nivel de tus sistemas."],
  ["Identidad y Cambio", "Cada acción es un voto por el tipo de persona que deseas ser. Transforma tu identidad, no solo tu conducta."],
  ["Mejora del 1%", "Pequeñas mejoras diarias se componen en resultados extraordinarios. El progreso es acumulativo."],
] as const;

const benefits = [
  ["Claridad Mental", "Toma decisiones conscientes y alineadas con tus valores más profundos."],
  ["Resiliencia Emocional", "Enfrenta los desafíos de la vida con serenidad y fortaleza sostenida."],
  ["Paz Interior", "Cultiva un estado de calma profunda que permanece incluso en momentos difíciles."],
  ["Transformación Real", "Cambios duraderos en tu forma de pensar, sentir y actuar en el mundo."],
] as const;

const trustPoints = [
  "Garantía 30 días",
  "Semana 1 recibes tomos 1 y 2",
  "Luego 1 tomo por semana",
  "Pago 100% seguro",
] as const;

export default function HomePage() {
  return (
    <>
      <nav>
        <div className="nav-inner">
          <a className="nav-brand" href="#top">
            <BrandMark />
            <span className="nav-brand-name">NeuroBalance</span>
          </a>
          <a className="nav-cta" href="#adquirir">
            Obtener los Tomos
          </a>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero-text reveal is-visible">
            <p className="hero-eyebrow">Colección de Bienestar Mental</p>
            <h1>
              Conoce cómo piensas,
              <br />
              <em>cambia cómo vives</em>
            </h1>
            <p className="hero-sub">
              Guías digitales diseñadas con rigor científico para reprogramar tu mente, construir hábitos duraderos y alcanzar el equilibrio emocional que mereces.
            </p>
            <div>
              <a className="btn-primary" href="#adquirir">
                Comenzar ahora
                <span aria-hidden="true">→</span>
              </a>
              <a className="btn-ghost" href="#fundamentos">
                Ver los contenidos
              </a>
            </div>
            <div className="hero-stats reveal reveal-delay-2 is-visible">
              <div className="hero-stat">
                <strong>6</strong>
                <span>Pilares científicos</span>
              </div>
              <div className="hero-stat">
                <strong>8+</strong>
                <span>Expertos integrados</span>
              </div>
              <div className="hero-stat">
                <strong>30d</strong>
                <span>Garantía total</span>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal reveal-delay-1 is-visible">
            <div className="hero-card-stack">
              <div className="hcard hcard--back">
                <p className="hcard-label">Tomo III</p>
                <p className="hcard-title">Identidad y Cambio</p>
              </div>
              <div className="hcard hcard--mid">
                <p className="hcard-label">Tomo II</p>
                <p className="hcard-title">Regulación Emocional</p>
              </div>
              <div className="hcard hcard--front">
                <p className="hcard-label">Tomo I</p>
                <p className="hcard-title">Neuroplasticidad — La Ciencia del Cambio Mental</p>
                <p className="hcard-body">
                  Aprende cómo tu cerebro puede cambiar y adaptarse a cualquier edad, creando nuevos patrones de pensamiento.
                </p>
                <div className="hcard-tags">
                  <span className="hcard-tag">Joe Dispenza</span>
                  <span className="hcard-tag">James Clear</span>
                  <span className="hcard-tag">Neurociencia</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pillars" id="fundamentos">
          <div className="container">
            <div className="pillars-header">
              <div className="reveal is-visible">
                <p className="section-label">Fundamentos</p>
                <h2 className="section-title">
                  Una metodología de cambio con base <em>real</em>
                </h2>
              </div>
              <div className="reveal reveal-delay-1 is-visible">
                <p className="section-sub">
                  Cada página integra los descubrimientos más relevantes de la psicología moderna, la neurociencia y el desarrollo personal basado en evidencia.
                </p>
              </div>
            </div>
            <div className="pillars-grid">
              {pillars.map(([title, copy], index) => (
                <div key={title} className={`pillar reveal reveal-delay-${Math.min(index, 5)} is-visible`}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="experts">
          <div className="container">
            <div className="experts-intro">
              <div className="reveal is-visible">
                <p className="section-label">Conocimiento</p>
                <h2 className="section-title">
                  Respaldado por los
                  <br />
                  mejores <em>referentes</em>
                </h2>
                <p className="section-sub experts-subcopy">
                  Cada página integra los descubrimientos más relevantes de reconocidos profesionales en psicología, neurociencia y desarrollo personal.
                </p>
              </div>
              <div className="experts-quote reveal reveal-delay-1 is-visible">
                "La mente que se abre a una nueva idea nunca vuelve a su tamaño original."
              </div>
            </div>
            <div className="experts-list reveal is-visible">
              {experts.map(([name, area]) => (
                <div key={name} className="expert-item">
                  <div className="expert-diamond" />
                  <h3>{name}</h3>
                  <p>{area}</p>
                </div>
              ))}
            </div>
            <p className="experts-note">
              *Esta colección se basa en conceptos y metodologías de estos expertos. No implica endorsement directo de los autores mencionados.
            </p>
          </div>
        </section>

        <section className="benefits">
          <div className="container">
            <div className="benefits-layout">
              <div className="reveal is-visible">
                <p className="section-label">Lo que lograrás</p>
                <h2 className="section-title benefits-title">
                  Resultados reales,
                  <br />
                  <em>cambios duraderos</em>
                </h2>
                <div>
                  {benefits.map(([title, copy]) => (
                    <div key={title} className="benefit">
                      <div className="benefit-text">
                        <h3 className="benefit-title">{title}</h3>
                        <p>{copy}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="benefits-visual reveal reveal-delay-1 is-visible">
                <div className="bv-row">
                  <div className="bv-card">
                    <div className="bv-card-num">30</div>
                    <div className="bv-card-label">días de garantía sin preguntas</div>
                  </div>
                  <div className="bv-card bv-card-dark">
                    <div className="bv-card-num bv-card-num-light">100%</div>
                    <div className="bv-card-label bv-card-label-light">digital, entregas semanales por email</div>
                  </div>
                </div>
                <div className="bv-card">
                  <div className="bv-card-num">7</div>
                  <div className="bv-card-label">tomos en una sola compra</div>
                </div>
                <div className="bv-card bv-card-soft">
                  <p className="bv-quote">"Diseñado para quienes quieren entender la mente, no solo motivarse."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="container">
            <div className="reveal is-visible">
              <p className="section-label">Testimonios</p>
              <h2 className="section-title">
                Historias de
                <br />
                <em>transformación real</em>
              </h2>
            </div>
            <div className="testi-grid">
              <div className="testi-card reveal reveal-delay-1 is-visible">
                <p className="testi-text">
                  Estos tomos cambiaron completamente mi perspectiva sobre el estrés y la ansiedad. Las herramientas son prácticas y los resultados son reales. Me siento más en paz conmigo misma que nunca.
                </p>
                <p className="testi-author">— María L., Barcelona</p>
              </div>
              <div className="testi-card reveal reveal-delay-2 is-visible">
                <p className="testi-text">
                  Como profesional de la salud, aprecio el rigor científico detrás de cada consejo. Es un puente perfecto entre la neurociencia y la aplicación práctica en la vida diaria.
                </p>
                <p className="testi-author">— Dr. Carlos M., Madrid</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing" id="adquirir">
          <div className="container">
            <div className="pricing-header reveal is-visible">
              <p className="section-label">Adquirir</p>
              <h2 className="section-title">
                Tu mente es tu recurso
                <br />
                más <em>valioso</em>
              </h2>
              <p className="section-sub pricing-sub">
                Compra la colección completa con precio promocional anticipado. Semana 1 recibes los tomos 1 y 2; después recibes 1 tomo por semana hasta completar los 7.
              </p>
            </div>

            <div className="pricing-trust reveal reveal-delay-1 is-visible">
              {trustPoints.map((point) => (
                <div key={point} className="trust-item">
                  {point}
                </div>
              ))}
            </div>

            <CheckoutForm methods={purchaseMethods} productSlug="coleccion-7-tomos" />

            <div className="disclaimer-wrap reveal is-visible">
              <h3 className="disclaimer-title">Aviso Importante</h3>
              <p>
                Este material educativo complementa, pero no sustituye, la atención profesional de psicólogos, psiquiatras o terapeutas cualificados. Si experimentas síntomas de ansiedad, depresión u otras condiciones de salud mental, te recomendamos consultar con un profesional autorizado.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <BrandMark className="footer-mark" />
              <span className="footer-brand-name">NeuroBalance</span>
            </div>
            <p className="footer-description">Transformando vidas a través del conocimiento científico y la sabiduría práctica.</p>
            <div className="footer-links">
              <a href="#">Política de Privacidad</a>
              <a href="#">Términos y Condiciones</a>
              <a href="#">Contacto</a>
              <a href="#">Preguntas Frecuentes</a>
            </div>
            <p className="footer-copy">© 2026 NeuroBalance. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
