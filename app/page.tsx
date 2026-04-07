import { CheckoutForm } from "@/components/checkout-form";
import { collectionVolumes, mainProduct, purchaseMethods } from "@/lib/site-data";

const experts = [
  ["Marian Rojas Estape", "Psiquiatria y gestion emocional"],
  ["Joe Dispenza", "Neuroplasticidad y meditacion"],
  ["Viktor Frankl", "Logoterapia y sentido de vida"],
  ["Carl Jung", "Psicologia analitica"],
  ["James Clear", "Formacion de habitos"],
  ["Martin Seligman", "Psicologia positiva"],
  ["Rafael Vidac", "Mentalidad de abundancia"],
  ["Y muchos mas", "Compendio de expertos reconocidos"],
];

const pillars = [
  ["Neuroplasticidad", "Tu cerebro cambia toda la vida. Aprende a dirigir ese cambio con intencion."],
  ["Regulacion Emocional", "Tecnicas validadas para gestionar tus emociones y alcanzar equilibrio duradero."],
  ["Psicologia Positiva", "Estrategias respaldadas por investigacion para desarrollar resiliencia y proposito vital."],
  ["Sistemas de Habitos", "Construye sistemas efectivos de mejora continua. No alcanzas tus metas, caes al nivel de tus sistemas."],
  ["Identidad y Cambio", "Cada accion es un voto por el tipo de persona que deseas ser. Transforma tu identidad."],
  ["Mejora del 1%", "Pequenas mejoras diarias se convierten en resultados extraordinarios."],
];

const benefits = [
  ["Claridad Mental", "Toma decisiones conscientes y alineadas con tus valores mas profundos."],
  ["Resiliencia Emocional", "Enfrenta los desafios de la vida con serenidad y fortaleza sostenida."],
  ["Paz Interior", "Cultiva un estado de calma profunda que permanece incluso en momentos dificiles."],
  ["Transformacion Real", "Cambios duraderos en tu forma de pensar, sentir y actuar en el mundo."],
];

export default function HomePage() {
  return (
    <>
      <nav>
        <div className="nav-inner">
          <a className="nav-brand" href="#top">
            <span className="nav-brand-dot" />
            <span className="nav-brand-name">NeuroBalance</span>
          </a>
          <a className="nav-cta" href="#adquirir">
            Obtener los Tomos
          </a>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero-text reveal">
            <p className="hero-eyebrow">Coleccion de Bienestar Mental</p>
            <h1>
              Conoce como piensas,
              <br />
              <em>cambia como vives</em>
            </h1>
            <p className="hero-sub">{mainProduct.shortDescription}</p>
            <div>
              <a className="btn-primary" href="#adquirir">
                Comenzar ahora
              </a>
              <a className="btn-ghost" href="#fundamentos">
                Ver los contenidos
              </a>
            </div>
            <div className="hero-stats reveal reveal-delay-2">
              <div className="hero-stat">
                <strong>6</strong>
                <span>Pilares cientificos</span>
              </div>
              <div className="hero-stat">
                <strong>8+</strong>
                <span>Expertos integrados</span>
              </div>
              <div className="hero-stat">
                <strong>30d</strong>
                <span>Garantia total</span>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal reveal-delay-1">
            <div className="hero-card-stack">
              <div className="hcard hcard--back">
                <p className="hcard-label">Tomo III</p>
                <p className="hcard-title">Identidad y Cambio</p>
              </div>
              <div className="hcard hcard--mid">
                <p className="hcard-label">Tomo II</p>
                <p className="hcard-title">Regulacion Emocional</p>
              </div>
              <div className="hcard hcard--front">
                <p className="hcard-label">Tomo I</p>
                <p className="hcard-title">Neuroplasticidad y Cambio Mental</p>
                <p className="hcard-body">
                  La coleccion se compra completa con precio promocional anticipado. Semana 1 recibes los tomos 1 y 2, luego 1 por semana hasta completar los 7.
                </p>
                <div className="hcard-tags">
                  <span className="hcard-tag">7 tomos</span>
                  <span className="hcard-tag">Mercado Pago</span>
                  <span className="hcard-tag">Entrega semanal</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pillars" id="fundamentos">
          <div className="container">
            <div className="pillars-header">
              <div className="reveal">
                <p className="section-label">Fundamentos</p>
                <h2 className="section-title">
                  Una metodologia de cambio con base <em>real</em>
                </h2>
              </div>
              <div className="reveal reveal-delay-1">
                <p className="section-sub">
                  Cada pagina integra los descubrimientos mas relevantes de la psicologia moderna, la neurociencia y el desarrollo personal basado en evidencia.
                </p>
              </div>
            </div>
            <div className="pillars-grid">
              {pillars.map(([title, copy], index) => (
                <div key={title} className={`pillar reveal reveal-delay-${Math.min(index + 1, 5)}`}>
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
              <div className="reveal">
                <p className="section-label">Conocimiento</p>
                <h2 className="section-title">
                  Respaldado por los mejores <em>referentes</em>
                </h2>
                <p className="section-sub expert-copy">
                  Cada pagina integra los descubrimientos mas relevantes de reconocidos profesionales en psicologia, neurociencia y desarrollo personal.
                </p>
              </div>
              <div className="experts-quote reveal reveal-delay-1">
                "La mente que se abre a una nueva idea nunca vuelve a su tamano original."
              </div>
            </div>
            <div className="experts-list reveal">
              {experts.map(([name, area]) => (
                <div key={name} className="expert-item">
                  <div className="expert-diamond" />
                  <h3>{name}</h3>
                  <p>{area}</p>
                </div>
              ))}
            </div>
            <p className="experts-note">
              *Esta coleccion se basa en conceptos y metodologias de estos expertos. No implica endorsement directo de los autores mencionados.
            </p>
          </div>
        </section>

        <section className="benefits">
          <div className="container">
            <div className="benefits-layout">
              <div className="reveal">
                <p className="section-label">Lo que lograras</p>
                <h2 className="section-title benefits-title">
                  Resultados reales,<br />
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
              <div className="benefits-visual reveal reveal-delay-1">
                <div className="bv-row">
                  <div className="bv-card">
                    <div className="bv-card-num">30</div>
                    <div className="bv-card-label">dias de garantia sin preguntas</div>
                  </div>
                  <div className="bv-card bv-card-dark">
                    <div className="bv-card-num bv-card-num-light">100%</div>
                    <div className="bv-card-label bv-card-label-light">digital, acceso y entregas por email</div>
                  </div>
                </div>
                <div className="bv-card">
                  <div className="bv-card-num">7</div>
                  <div className="bv-card-label">tomos en una sola compra</div>
                </div>
                <div className="bv-card bv-card-soft">
                  <p className="bv-quote">"Disenado para quienes quieren entender la mente, no solo motivarse."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="container">
            <div className="reveal">
              <p className="section-label">Testimonios</p>
              <h2 className="section-title">
                Historias de <em>transformacion real</em>
              </h2>
            </div>
            <div className="testi-grid">
              <div className="testi-card reveal reveal-delay-1">
                <p className="testi-text">
                  Estos tomos cambiaron completamente mi perspectiva sobre el estres y la ansiedad. Las herramientas son practicas y los resultados son reales. Me siento mas en paz conmigo misma que nunca.
                </p>
                <p className="testi-author">Maria L., Barcelona</p>
              </div>
              <div className="testi-card reveal reveal-delay-2">
                <p className="testi-text">
                  Como profesional de la salud, aprecio el rigor cientifico detras de cada consejo. Es un puente perfecto entre la neurociencia y la aplicacion practica en la vida diaria.
                </p>
                <p className="testi-author">Dr. Carlos M., Madrid</p>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing" id="adquirir">
          <div className="container">
            <div className="pricing-header reveal">
              <p className="section-label">Adquirir</p>
              <h2 className="section-title">
                Tu mente es tu recurso<br />
                mas <em>valioso</em>
              </h2>
              <p className="section-sub pricing-sub">
                Elige tu metodo de pago. La compra principal se resuelve por Mercado Pago y la transferencia queda como respaldo.
              </p>
            </div>

            <div className="pricing-trust reveal reveal-delay-1">
              <div className="trust-item">Garantia 30 dias</div>
              <div className="trust-item">Compra unica de la coleccion</div>
              <div className="trust-item">Semana 1 recibes 2 tomos</div>
              <div className="trust-item">Pago 100% seguro</div>
            </div>

            <CheckoutForm methods={purchaseMethods} productSlug={mainProduct.slug} />

            <div className="disclaimer-wrap reveal">
              <h3 className="disclaimer-title">Aviso Importante</h3>
              <p>
                Este material educativo complementa, pero no sustituye, la atencion profesional de psicologos, psiquiatras o terapeutas cualificados. Si experimentas sintomas de ansiedad, depresion u otras condiciones de salud mental, te recomendamos consultar con un profesional autorizado.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <span className="nav-brand-dot" />
              <span className="footer-brand-name">NeuroBalance</span>
            </div>
            <p className="footer-description">
              Transformando vidas a traves del conocimiento cientifico y la sabiduria practica.
            </p>
            <div className="footer-links">
              <a href="#">Politica de Privacidad</a>
              <a href="#">Terminos y Condiciones</a>
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

