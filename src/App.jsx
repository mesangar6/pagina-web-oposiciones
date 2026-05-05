import { useState, useEffect, useRef } from "react";

const SITE = {
  name: "Supuestos Prácticos",
  tagline: "Policía Local",
  heroTitle: "Domina los supuestos prácticos",
  heroSubtitle: "Prepárate para ser Policía Local",
  heroDescription:
    "Prepárate con un método profesional basado en casos reales. Domina los supuestos prácticos y llega al examen con ventaja gracias a nuestra plataforma online, actualizada y válida para toda España.",
  cta: "Prueba un supuesto GRATIS",
  features: [
    { icon: "📝", title: "3 supuestos prácticos cada semana", desc: "Penal, tráfico y administrativo" },
    { icon: "📋", title: "Simulacro de examen mensual", desc: "Condiciones reales de examen" },
    { icon: "📜", title: "Normativa adaptada a tu CCAA", desc: "Legislación autonómica incluida" },
    { icon: "✅", title: "Tipo test y desarrollo", desc: "Ambas modalidades de examen" },
    { icon: "🔄", title: "Resoluciones detalladas", desc: "Actualizadas con jurisprudencia" },
    { icon: "🎓", title: "PDF y vídeos explicativos", desc: "Normativa aplicada a casos prácticos" },
  ],
  steps: [
    { num: "01", title: "Suscríbete", desc: "Accede al aula virtual con tu usuario y contraseña." },
    { num: "02", title: "Recibe supuestos", desc: "Cada semana nuevos casos prácticos en tu bandeja." },
    { num: "03", title: "Corrige y analiza", desc: "Revisa las resoluciones detalladas de cada caso." },
    { num: "04", title: "Simulacro mensual", desc: "Pon a prueba tu nivel y mejora tu puntuación." },
  ],
  testimonials: [
    { name: "Carlos M.", role: "Aprobó en Sevilla", text: "Gracias a los supuestos semanales llegué al examen sin sorpresas. El método es brutal." },
    { name: "Laura G.", role: "Opositora en Madrid", text: "Los vídeos explicativos y las resoluciones detalladas marcan la diferencia frente a otras academias." },
    { name: "Pedro R.", role: "Aprobó en Valencia", text: "El simulacro mensual me ayudó a gestionar el tiempo. Aprobé a la primera convocatoria." },
  ],
  navLinks: [
    { label: "Supuesto gratis", href: "#hero" },
    { label: "Tarifas", href: "#tarifas" },
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Temario", href: "#temario" },
    { label: "Testimonios", href: "#testimonios" },
  ],
  stats: [
    { value: "300+", label: "Aspirantes activos" },
    { value: "150+", label: "Supuestos disponibles" },
    { value: "95%", label: "Tasa de satisfacción" },
    { value: "12", label: "Simulacros al año" },
  ],
};

/* ─── Animated counter ─── */
function AnimatedNumber({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const num = parseInt(target);
          const duration = 1600;
          const steps = 40;
          const increment = num / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              setVal(num);
              clearInterval(timer);
            } else {
              setVal(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Fade-in on scroll ─── */
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Shield SVG logo ─── */
function ShieldLogo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 120" fill="none">
      <path d="M50 5 L90 25 L90 65 Q90 95 50 115 Q10 95 10 65 L10 25 Z" fill="#1B3A5C" stroke="#C9A84C" strokeWidth="3"/>
      <path d="M50 20 L75 35 L75 60 Q75 82 50 100 Q25 82 25 60 L25 35 Z" fill="#243E6B"/>
      <text x="50" y="68" textAnchor="middle" fontFamily="Georgia, serif" fontSize="28" fontWeight="bold" fill="#C9A84C">SP</text>
      <path d="M30 42 L50 30 L70 42" stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M35 82 L50 90 L65 82" stroke="#C9A84C" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* ─── Star SVG ─── */
function Star() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#C9A84C">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

export default function OposicionesLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Libre Franklin', 'Segoe UI', sans-serif", color: "#E8E8E8", background: "#0A0F1A", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Libre+Franklin:wght@300;400;500;600;700&display=swap');

        :root {
          --navy-deep: #0A0F1A;
          --navy: #111B2E;
          --navy-light: #1B3A5C;
          --blue-accent: #243E6B;
          --gold: #C9A84C;
          --gold-light: #E0C872;
          --gold-dim: rgba(201,168,76,0.15);
          --white: #F5F0E8;
          --white-dim: #C4BFB5;
          --text: #D8D4CC;
          --serif: 'Playfair Display', Georgia, serif;
          --sans: 'Libre Franklin', 'Segoe UI', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .nav-fixed {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s;
        }
        .nav-scrolled {
          background: rgba(10,15,26,0.92) !important;
          backdrop-filter: blur(16px);
          box-shadow: 0 2px 24px rgba(0,0,0,0.4);
        }

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          background: radial-gradient(ellipse at 30% 20%, rgba(36,62,107,0.4) 0%, transparent 60%),
                      radial-gradient(ellipse at 80% 80%, rgba(27,58,92,0.3) 0%, transparent 50%),
                      var(--navy-deep);
          overflow: hidden;
        }
        .hero-section::before {
          content: '';
          position: absolute; inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23C9A84C' stroke-width='0.3' opacity='0.06'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .gold-line {
          width: 60px; height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-light));
          border-radius: 2px;
          margin-bottom: 16px;
        }

        .btn-gold {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 16px 36px;
          background: linear-gradient(135deg, var(--gold), #B8952E);
          color: var(--navy-deep);
          font-family: var(--sans);
          font-weight: 700; font-size: 16px; letter-spacing: 0.5px;
          border: none; border-radius: 6px; cursor: pointer;
          text-decoration: none;
          transition: transform 0.25s, box-shadow 0.25s;
          box-shadow: 0 4px 24px rgba(201,168,76,0.3);
        }
        .btn-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(201,168,76,0.45);
        }

        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 32px;
          background: transparent;
          color: var(--gold);
          font-family: var(--sans);
          font-weight: 600; font-size: 15px;
          border: 2px solid var(--gold); border-radius: 6px; cursor: pointer;
          text-decoration: none;
          transition: background 0.25s, color 0.25s;
        }
        .btn-outline:hover {
          background: var(--gold);
          color: var(--navy-deep);
        }

        .feature-card {
          background: linear-gradient(145deg, rgba(27,58,92,0.35), rgba(17,27,46,0.6));
          border: 1px solid rgba(201,168,76,0.12);
          border-radius: 12px;
          padding: 28px 24px;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(201,168,76,0.35);
          box-shadow: 0 8px 32px rgba(201,168,76,0.08);
        }

        .step-card {
          position: relative;
          background: var(--navy);
          border-radius: 16px;
          padding: 40px 32px 32px;
          border: 1px solid rgba(201,168,76,0.1);
          transition: border-color 0.3s;
        }
        .step-card:hover { border-color: rgba(201,168,76,0.3); }

        .step-num {
          position: absolute; top: -22px; left: 32px;
          width: 44px; height: 44px;
          background: linear-gradient(135deg, var(--gold), #B8952E);
          color: var(--navy-deep);
          font-family: var(--serif);
          font-size: 18px; font-weight: 700;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(201,168,76,0.3);
        }

        .testimonial-card {
          background: linear-gradient(160deg, rgba(27,58,92,0.3), rgba(17,27,46,0.5));
          border: 1px solid rgba(201,168,76,0.1);
          border-radius: 16px;
          padding: 32px 28px;
          transition: border-color 0.3s;
        }
        .testimonial-card:hover { border-color: rgba(201,168,76,0.3); }

        .stat-item {
          text-align: center;
          padding: 24px;
        }

        .section-pad { padding: 100px 24px; }
        .container { max-width: 1140px; margin: 0 auto; width: 100%; }

        .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

        .cta-section {
          background: linear-gradient(135deg, var(--navy-light), var(--blue-accent));
          border-top: 3px solid var(--gold);
          border-bottom: 3px solid var(--gold);
        }

        .footer-section {
          background: var(--navy);
          border-top: 1px solid rgba(201,168,76,0.15);
        }

        .mobile-menu-btn {
          display: none;
          background: none; border: none; cursor: pointer;
          padding: 8px;
        }
        .mobile-menu-btn span {
          display: block; width: 24px; height: 2px;
          background: var(--gold); margin: 6px 0;
          transition: transform 0.3s, opacity 0.3s;
        }

        .nav-links a {
          color: var(--white-dim);
          text-decoration: none;
          font-size: 14px; font-weight: 500;
          letter-spacing: 0.3px;
          transition: color 0.25s;
          position: relative;
        }
        .nav-links a:hover { color: var(--gold); }
        .nav-links a::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 2px; background: var(--gold);
          transition: width 0.25s;
        }
        .nav-links a:hover::after { width: 100%; }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .about-img-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 12px;
          height: 380px;
        }
        .about-img-grid > div:first-child {
          grid-row: 1 / 3;
          border-radius: 16px;
          background: linear-gradient(135deg, var(--navy-light), var(--blue-accent));
          display: flex; align-items: center; justify-content: center;
          font-size: 48px;
        }
        .about-img-grid > div:nth-child(2),
        .about-img-grid > div:nth-child(3) {
          border-radius: 16px;
          background: linear-gradient(145deg, var(--blue-accent), var(--navy-light));
          display: flex; align-items: center; justify-content: center;
          font-size: 36px;
        }

        @media (max-width: 900px) {
          .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); }
          .about-grid { grid-template-columns: 1fr; }
          .about-img-grid { height: 280px; }
          .nav-links { display: none; }
          .mobile-menu-btn { display: block; }
          .nav-links.open {
            display: flex; flex-direction: column;
            position: absolute; top: 100%; left: 0; right: 0;
            background: rgba(10,15,26,0.97);
            padding: 24px;
            gap: 16px;
            border-bottom: 1px solid rgba(201,168,76,0.15);
          }
        }
        @media (max-width: 600px) {
          .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
          .hero-content h1 { font-size: 36px !important; }
          .section-pad { padding: 60px 16px; }
        }
      `}</style>

      {/* ═══════ NAVIGATION ═══════ */}
      <nav className={`nav-fixed ${scrolled ? "nav-scrolled" : ""}`} style={{ background: "transparent" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ShieldLogo size={40} />
            <div>
              <div style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 700, color: "var(--white)", lineHeight: 1.1 }}>{SITE.name}</div>
              <div style={{ fontSize: "11px", color: "var(--gold)", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500 }}>{SITE.tagline}</div>
            </div>
          </div>

          <div className={`nav-links ${menuOpen ? "open" : ""}`} style={{ display: "flex", gap: "28px", alignItems: "center" }}>
            {SITE.navLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href="#hero" className="btn-gold" style={{ padding: "10px 24px", fontSize: "13px" }}>Acceso plataforma</a>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <span style={menuOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: "rotate(-45deg) translate(6px,-6px)" } : {}} />
          </button>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section className="hero-section" id="hero">
        <div className="container" style={{ textAlign: "center", padding: "120px 24px 80px", position: "relative", zIndex: 2 }}>
          <FadeIn>
            <div className="hero-content">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--gold-dim)", borderRadius: "24px", padding: "8px 20px", marginBottom: "28px", border: "1px solid rgba(201,168,76,0.2)" }}>
                <span style={{ fontSize: "13px", color: "var(--gold)", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase" }}>
                  {SITE.heroSubtitle}
                </span>
              </div>

              <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 800, color: "var(--white)", lineHeight: 1.1, marginBottom: "24px" }}>
                {SITE.heroTitle.split(" ").map((w, i) =>
                  i === SITE.heroTitle.split(" ").length - 1
                    ? <span key={i} style={{ color: "var(--gold)" }}>{w}</span>
                    : <span key={i}>{w} </span>
                )}
              </h1>

              <p style={{ fontSize: "18px", color: "var(--white-dim)", maxWidth: "640px", margin: "0 auto 40px", lineHeight: 1.7, fontWeight: 300 }}>
                {SITE.heroDescription}
              </p>

              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href="#" className="btn-gold">{SITE.cta} →</a>
                <a href="#como-funciona" className="btn-outline">Cómo funciona</a>
              </div>
            </div>
          </FadeIn>

          {/* Features grid */}
          <div className="grid-3" style={{ marginTop: "80px" }}>
            {SITE.features.map((f, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="feature-card">
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>{f.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--white)", marginBottom: "6px" }}>{f.title}</div>
                  <div style={{ fontSize: "13px", color: "var(--white-dim)", fontWeight: 300 }}>{f.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Decorative bottom wave */}
        <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "80px" }} viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 Q360,80 720,40 T1440,40 L1440,80 L0,80 Z" fill="#111B2E"/>
        </svg>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section style={{ background: "var(--navy)", padding: "60px 24px", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <div className="container grid-4">
          {SITE.stats.map((s, i) => (
            <div key={i} className="stat-item">
              <div style={{ fontFamily: "var(--serif)", fontSize: "42px", fontWeight: 700, color: "var(--gold)" }}>
                <AnimatedNumber target={s.value.replace(/[^0-9]/g, "")} suffix={s.value.replace(/[0-9]/g, "")} />
              </div>
              <div style={{ fontSize: "14px", color: "var(--white-dim)", marginTop: "8px", fontWeight: 400 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ QUIÉNES SOMOS ═══════ */}
      <section className="section-pad" style={{ background: "var(--navy-deep)" }} id="temario">
        <div className="container about-grid">
          <FadeIn>
            <div>
              <div className="gold-line" />
              <h3 style={{ fontSize: "14px", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 600, marginBottom: "12px" }}>¿Quiénes somos?</h3>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "var(--white)", lineHeight: 1.2, marginBottom: "24px" }}>
                Tu academia online especializada en oposiciones
              </h2>
              <p style={{ fontSize: "16px", color: "var(--white-dim)", lineHeight: 1.8, marginBottom: "20px", fontWeight: 300 }}>
                Somos una <strong style={{ color: "var(--white)", fontWeight: 600 }}>academia online especializada en la preparación de oposiciones a Policía Local</strong>, formada por un equipo de policías en activo que conocen de primera mano las exigencias del proceso selectivo.
              </p>
              <p style={{ fontSize: "16px", color: "var(--white-dim)", lineHeight: 1.8, fontWeight: 300 }}>
                Cada semana, <strong style={{ color: "var(--gold)", fontWeight: 600 }}>más de 300 aspirantes confían en nuestro método</strong>, un sistema práctico, actualizado y centrado en lo que realmente se evalúa en el examen.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="about-img-grid">
              <div>🛡️</div>
              <div>📚</div>
              <div>⚖️</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ CÓMO FUNCIONA ═══════ */}
      <section className="section-pad" style={{ background: "var(--navy-deep)" }} id="como-funciona">
        <div className="container">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div className="gold-line" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: "14px", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 600, marginBottom: "12px" }}>¿Cómo funciona?</h3>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "var(--white)" }}>
                Tu preparación paso a paso
              </h2>
            </div>
          </FadeIn>

          <div className="grid-4">
            {SITE.steps.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="step-card">
                  <div className="step-num">{s.num}</div>
                  <h4 style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 700, color: "var(--white)", marginBottom: "10px" }}>{s.title}</h4>
                  <p style={{ fontSize: "14px", color: "var(--white-dim)", lineHeight: 1.7, fontWeight: 300 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA SECTION ═══════ */}
      <section className="cta-section section-pad" id="tarifas">
        <div className="container" style={{ textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "var(--white)", marginBottom: "20px" }}>
              Entrena con casos reales y llega preparado
            </h2>
            <p style={{ fontSize: "17px", color: "var(--white-dim)", maxWidth: "580px", margin: "0 auto 36px", lineHeight: 1.7, fontWeight: 300 }}>
              Da el paso y empieza a entrenar con un método práctico, actualizado y guiado por profesionales en activo. Súmate a los opositores que ya están mejorando sus resultados.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#" className="btn-gold">Ver tarifas →</a>
              <a href="#" className="btn-outline">Prueba gratis</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ TESTIMONIOS ═══════ */}
      <section className="section-pad" style={{ background: "var(--navy-deep)" }} id="testimonios">
        <div className="container">
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="gold-line" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: "14px", color: "var(--gold)", textTransform: "uppercase", letterSpacing: "2px", fontWeight: 600, marginBottom: "12px" }}>Testimonios</h3>
              <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, color: "var(--white)" }}>
                Lo que dicen nuestros alumnos
              </h2>
            </div>
          </FadeIn>

          <div className="grid-3">
            {SITE.testimonials.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="testimonial-card">
                  <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                    {[...Array(5)].map((_, j) => <Star key={j} />)}
                  </div>
                  <p style={{ fontSize: "15px", color: "var(--white-dim)", lineHeight: 1.7, marginBottom: "20px", fontStyle: "italic", fontWeight: 300 }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg, var(--gold), #B8952E)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--navy-deep)", fontSize: "16px" }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "15px", color: "var(--white)" }}>{t.name}</div>
                      <div style={{ fontSize: "13px", color: "var(--gold)", fontWeight: 400 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="footer-section" style={{ padding: "64px 24px 32px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <ShieldLogo size={36} />
                <div>
                  <div style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 700, color: "var(--white)" }}>{SITE.name}</div>
                  <div style={{ fontSize: "11px", color: "var(--gold)", letterSpacing: "2px", textTransform: "uppercase" }}>{SITE.tagline}</div>
                </div>
              </div>
              <p style={{ fontSize: "14px", color: "var(--white-dim)", lineHeight: 1.7, maxWidth: "340px", fontWeight: 300 }}>
                Formación online especializada en oposiciones a Policía Local. Prepárate con casos reales y un método avalado por profesionales en activo.
              </p>
              <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
                {["Facebook", "Instagram", "YouTube", "TikTok"].map((s) => (
                  <a key={s} href="#" style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", fontSize: "12px", textDecoration: "none", fontWeight: 600, transition: "background 0.25s" }}>
                    {s.charAt(0)}
                  </a>
                ))}
              </div>
            </div>

            {/* Plataforma */}
            <div>
              <h4 style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 700, color: "var(--white)", marginBottom: "20px" }}>Plataforma</h4>
              {["Tarifas", "Supuesto práctico GRATIS", "Cancelar suscripción", "Acceso plataforma"].map((l) => (
                <a key={l} href="#" style={{ display: "block", color: "var(--white-dim)", textDecoration: "none", fontSize: "14px", marginBottom: "12px", fontWeight: 400, transition: "color 0.25s" }}
                  onMouseOver={(e) => e.target.style.color = "#C9A84C"}
                  onMouseOut={(e) => e.target.style.color = "#C4BFB5"}
                >{l}</a>
              ))}
            </div>

            {/* Legal */}
            <div>
              <h4 style={{ fontFamily: "var(--serif)", fontSize: "16px", fontWeight: 700, color: "var(--white)", marginBottom: "20px" }}>Legal</h4>
              {["Política de Privacidad", "Aviso Legal", "Política de Cookies", "Condiciones generales"].map((l) => (
                <a key={l} href="#" style={{ display: "block", color: "var(--white-dim)", textDecoration: "none", fontSize: "14px", marginBottom: "12px", fontWeight: 400, transition: "color 0.25s" }}
                  onMouseOver={(e) => e.target.style.color = "#C9A84C"}
                  onMouseOut={(e) => e.target.style.color = "#C4BFB5"}
                >{l}</a>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "var(--white-dim)", fontWeight: 300 }}>
              © 2026 Supuestos Prácticos Policía Local — Todos los derechos reservados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
