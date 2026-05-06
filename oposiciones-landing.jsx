import { useState, useEffect, useRef } from "react";

const SITE = {
  name: "Domina los Supuestos IP",
  tagline: "Inspección de Trabajo",
  heroTitle: "Domina los supuestos IP",
  heroSubtitle: "Prepárate para la Inspección de Trabajo",
  heroDescription:
    "Prepárate con un método profesional basado en casos reales. Domina los supuestos prácticos de Inspección de Trabajo y llega al examen con ventaja gracias a nuestra plataforma online, actualizada y válida para toda España.",
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

function AnimatedNumber({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const num = parseInt(target);
        const steps = 40; const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= num) { setVal(num); clearInterval(timer); }
          else setVal(Math.floor(current));
        }, 1600 / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function ShieldLogo({ size = 44 }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none">
      <path d="M50 4 L92 24 L92 66 Q92 97 50 116 Q8 97 8 66 L8 24 Z" fill="#6B1A2A" stroke="#C9A84C" strokeWidth="2.5"/>
      <path d="M50 18 L80 34 L80 64 Q80 88 50 104 Q20 88 20 64 L20 34 Z" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.45"/>
      <text x="50" y="72" textAnchor="middle" fontFamily="Georgia, serif" fontSize="30" fontWeight="bold" fill="#FAF7F2">IP</text>
      <circle cx="35" cy="28" r="2.5" fill="#C9A84C"/>
      <circle cx="50" cy="23" r="2.5" fill="#C9A84C"/>
      <circle cx="65" cy="28" r="2.5" fill="#C9A84C"/>
      <path d="M25 96 Q37 103 50 106 Q63 103 75 96" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function Star() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="#7D1F2E">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );
}

export default function OposicionesLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ fontFamily: "'Libre Franklin','Segoe UI',sans-serif", color: "#2C1A1D", background: "#FAF7F2", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Libre+Franklin:wght@300;400;500;600;700&display=swap');
        :root {
          --g-deep: #3D0A12;
          --g: #6B1A2A;
          --g-mid: #8B2438;
          --g-light: #A8354A;
          --gold: #C9A84C;
          --gold-l: #E0C872;
          --crema: #FAF7F2;
          --crema-d: #F0E9DF;
          --crema-dd: #E4D9CC;
          --text: #2C1A1D;
          --text-m: #5C3A40;
          --text-l: #8C6A70;
          --serif: 'Playfair Display',Georgia,serif;
          --sans: 'Libre Franklin','Segoe UI',sans-serif;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}

        .nav-fixed{position:fixed;top:0;left:0;right:0;z-index:100;transition:background .3s,box-shadow .3s;}
        .nav-scrolled{background:rgba(61,10,18,0.97)!important;backdrop-filter:blur(16px);box-shadow:0 2px 24px rgba(61,10,18,.3);}

        .hero-section{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;
          background:radial-gradient(ellipse at 25% 30%,rgba(139,36,56,.5) 0%,transparent 55%),
                     radial-gradient(ellipse at 80% 75%,rgba(107,26,42,.35) 0%,transparent 50%),
                     var(--g-deep);overflow:hidden;}
        .hero-section::before{content:'';position:absolute;inset:0;
          background:url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23C9A84C' stroke-width='0.3' opacity='0.07'/%3E%3C/svg%3E");
          pointer-events:none;}

        .btn-primary{display:inline-flex;align-items:center;gap:8px;padding:16px 36px;
          background:var(--gold);color:var(--g-deep);font-family:var(--sans);font-weight:700;font-size:16px;
          border:none;border-radius:6px;cursor:pointer;text-decoration:none;
          transition:transform .25s,box-shadow .25s;box-shadow:0 4px 24px rgba(201,168,76,.35);}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(201,168,76,.5);}

        .btn-ol-light{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;
          background:transparent;color:var(--crema);font-family:var(--sans);font-weight:600;font-size:15px;
          border:2px solid rgba(250,247,242,.45);border-radius:6px;cursor:pointer;text-decoration:none;
          transition:background .25s,border-color .25s;}
        .btn-ol-light:hover{background:rgba(250,247,242,.1);border-color:var(--crema);}

        .btn-ol-dark{display:inline-flex;align-items:center;gap:8px;padding:14px 32px;
          background:transparent;color:var(--g);font-family:var(--sans);font-weight:600;font-size:15px;
          border:2px solid var(--g);border-radius:6px;cursor:pointer;text-decoration:none;
          transition:background .25s,color .25s;}
        .btn-ol-dark:hover{background:var(--g);color:var(--crema);}

        .fcard-dark{background:rgba(250,247,242,.07);border:1px solid rgba(250,247,242,.11);
          border-radius:12px;padding:28px 24px;transition:transform .3s,border-color .3s;}
        .fcard-dark:hover{transform:translateY(-4px);border-color:rgba(201,168,76,.4);}

        .fcard-light{background:#fff;border:1px solid var(--crema-dd);border-radius:12px;padding:28px 24px;
          box-shadow:0 2px 12px rgba(61,10,18,.06);transition:transform .3s,box-shadow .3s,border-color .3s;}
        .fcard-light:hover{transform:translateY(-4px);border-color:var(--g-light);box-shadow:0 8px 28px rgba(107,26,42,.12);}

        .step-card{position:relative;background:#fff;border-radius:16px;padding:44px 28px 32px;
          border:1px solid var(--crema-dd);box-shadow:0 2px 16px rgba(61,10,18,.07);
          transition:box-shadow .3s,border-color .3s;}
        .step-card:hover{border-color:var(--g-light);box-shadow:0 8px 32px rgba(107,26,42,.13);}
        .step-num{position:absolute;top:-20px;left:28px;width:44px;height:44px;
          background:var(--g);color:var(--crema);font-family:var(--serif);font-size:17px;font-weight:700;
          border-radius:50%;display:flex;align-items:center;justify-content:center;
          box-shadow:0 4px 16px rgba(107,26,42,.3);}

        .t-card{background:#fff;border:1px solid var(--crema-dd);border-radius:16px;padding:32px 28px;
          box-shadow:0 2px 16px rgba(61,10,18,.07);transition:box-shadow .3s,border-color .3s;}
        .t-card:hover{border-color:var(--g-light);box-shadow:0 8px 28px rgba(107,26,42,.13);}

        .accent-line{width:56px;height:3px;background:var(--g);border-radius:2px;margin-bottom:16px;}
        .accent-line-gold{width:56px;height:3px;background:var(--gold);border-radius:2px;margin-bottom:16px;}

        .cta-band{background:var(--g);border-top:3px solid var(--gold);border-bottom:3px solid var(--gold);}
        .footer-sec{background:var(--g-deep);border-top:1px solid rgba(201,168,76,.2);}

        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;}
        .about-imgs{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;height:380px;}
        .about-imgs>div:first-child{grid-row:1/3;border-radius:16px;background:linear-gradient(135deg,var(--g),var(--g-deep));display:flex;align-items:center;justify-content:center;font-size:52px;}
        .about-imgs>div:nth-child(2),.about-imgs>div:nth-child(3){border-radius:16px;background:var(--crema-dd);display:flex;align-items:center;justify-content:center;font-size:36px;}

        .sp { padding:100px 24px; }
        .ctr { max-width:1140px;margin:0 auto;width:100%; }
        .g3 { display:grid;grid-template-columns:repeat(3,1fr);gap:24px; }
        .g4 { display:grid;grid-template-columns:repeat(4,1fr);gap:24px; }

        .nav-links a{color:rgba(250,247,242,.78);text-decoration:none;font-size:14px;font-weight:500;
          letter-spacing:.3px;transition:color .25s;position:relative;}
        .nav-links a:hover{color:var(--gold);}
        .nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;
          background:var(--gold);transition:width .25s;}
        .nav-links a:hover::after{width:100%;}

        .mob-btn{display:none;background:none;border:none;cursor:pointer;padding:8px;}
        .mob-btn span{display:block;width:24px;height:2px;background:var(--gold);margin:6px 0;transition:transform .3s,opacity .3s;}

        @media(max-width:900px){
          .g3,.g4{grid-template-columns:repeat(2,1fr);}
          .about-grid{grid-template-columns:1fr;}
          .about-imgs{height:260px;}
          .nav-links{display:none;}
          .mob-btn{display:block;}
          .nav-links.open{display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;
            background:var(--g-deep);padding:24px;gap:16px;border-bottom:2px solid var(--gold);}
        }
        @media(max-width:600px){
          .g3,.g4{grid-template-columns:1fr;}
          .sp{padding:60px 16px;}
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav-fixed ${scrolled ? "nav-scrolled" : ""}`} style={{ background: "rgba(61,10,18,0.88)", backdropFilter: "blur(8px)" }}>
        <div className="ctr" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 24px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <ShieldLogo size={38}/>
            <div>
              <div style={{ fontFamily:"var(--serif)", fontSize:"15px", fontWeight:700, color:"var(--crema)", lineHeight:1.1 }}>{SITE.name}</div>
              <div style={{ fontSize:"10px", color:"var(--gold)", letterSpacing:"2px", textTransform:"uppercase", fontWeight:500 }}>{SITE.tagline}</div>
            </div>
          </div>
          <div className={`nav-links ${menuOpen ? "open" : ""}`} style={{ display:"flex", gap:"28px", alignItems:"center" }}>
            {SITE.navLinks.map(l => <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>)}
            <a href="#hero" className="btn-primary" style={{ padding:"10px 22px", fontSize:"13px" }}>Acceso plataforma</a>
          </div>
          <button className="mob-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <span style={menuOpen ? { transform:"rotate(45deg) translate(5px,5px)" } : {}}/>
            <span style={menuOpen ? { opacity:0 } : {}}/>
            <span style={menuOpen ? { transform:"rotate(-45deg) translate(6px,-6px)" } : {}}/>
          </button>
        </div>
      </nav>

      {/* HERO — oscuro granate */}
      <section className="hero-section" id="hero">
        <div className="ctr" style={{ textAlign:"center", padding:"120px 24px 80px", position:"relative", zIndex:2 }}>
          <FadeIn>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:"rgba(201,168,76,.12)", borderRadius:"24px", padding:"8px 20px", marginBottom:"28px", border:"1px solid rgba(201,168,76,.25)" }}>
                <span style={{ fontSize:"13px", color:"var(--gold)", fontWeight:600, letterSpacing:"1px", textTransform:"uppercase" }}>{SITE.heroSubtitle}</span>
              </div>
              <h1 style={{ fontFamily:"var(--serif)", fontSize:"clamp(36px,5vw,64px)", fontWeight:800, color:"var(--crema)", lineHeight:1.1, marginBottom:"24px" }}>
                {SITE.heroTitle.split(" ").map((w,i) =>
                  i === SITE.heroTitle.split(" ").length - 1
                    ? <span key={i} style={{ color:"var(--gold)" }}>{w}</span>
                    : <span key={i}>{w} </span>
                )}
              </h1>
              <p style={{ fontSize:"18px", color:"rgba(250,247,242,.72)", maxWidth:"640px", margin:"0 auto 40px", lineHeight:1.7, fontWeight:300 }}>{SITE.heroDescription}</p>
              <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
                <a href="#" className="btn-primary">{SITE.cta} →</a>
                <a href="#como-funciona" className="btn-ol-light">Cómo funciona</a>
              </div>
            </div>
          </FadeIn>

          <div className="g3" style={{ marginTop:"80px" }}>
            {SITE.features.map((f,i) => (
              <FadeIn key={i} delay={i*0.08}>
                <div className="fcard-dark">
                  <div style={{ fontSize:"30px", marginBottom:"12px" }}>{f.icon}</div>
                  <div style={{ fontWeight:600, fontSize:"15px", color:"var(--crema)", marginBottom:"6px" }}>{f.title}</div>
                  <div style={{ fontSize:"13px", color:"rgba(250,247,242,.52)", fontWeight:300 }}>{f.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <svg style={{ position:"absolute", bottom:0, left:0, width:"100%", height:"80px" }} viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 Q360,80 720,40 T1440,40 L1440,80 L0,80 Z" fill="#F0E9DF"/>
        </svg>
      </section>

      {/* STATS — crema oscuro */}
      <section style={{ background:"var(--crema-d)", padding:"60px 24px", borderBottom:"1px solid var(--crema-dd)" }}>
        <div className="ctr g4">
          {SITE.stats.map((s,i) => (
            <div key={i} style={{ textAlign:"center", padding:"20px" }}>
              <div style={{ fontFamily:"var(--serif)", fontSize:"42px", fontWeight:700, color:"var(--g)" }}>
                <AnimatedNumber target={s.value.replace(/[^0-9]/g,"")} suffix={s.value.replace(/[0-9]/g,"")}/>
              </div>
              <div style={{ fontSize:"14px", color:"var(--text-m)", marginTop:"8px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* QUIÉNES SOMOS — crema claro */}
      <section className="sp" style={{ background:"var(--crema)" }} id="temario">
        <div className="ctr about-grid">
          <FadeIn>
            <div>
              <div className="accent-line"/>
              <h3 style={{ fontSize:"13px", color:"var(--g)", textTransform:"uppercase", letterSpacing:"2px", fontWeight:600, marginBottom:"12px" }}>¿Quiénes somos?</h3>
              <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3vw,40px)", fontWeight:700, color:"var(--g-deep)", lineHeight:1.2, marginBottom:"24px" }}>Tu academia online especializada en oposiciones</h2>
              <p style={{ fontSize:"16px", color:"var(--text-m)", lineHeight:1.8, marginBottom:"20px" }}>
                Somos una <strong style={{ color:"var(--g)", fontWeight:600 }}>academia online especializada en la preparación de oposiciones a Inspección de Trabajo</strong>, formada por inspectores en activo que conocen de primera mano las exigencias del proceso selectivo.
              </p>
              <p style={{ fontSize:"16px", color:"var(--text-m)", lineHeight:1.8 }}>
                Cada semana, <strong style={{ color:"var(--g)", fontWeight:600 }}>más de 300 aspirantes confían en nuestro método</strong>, un sistema práctico, actualizado y centrado en lo que realmente se evalúa en el examen.
              </p>
              <div style={{ marginTop:"32px" }}>
                <a href="#" className="btn-ol-dark">Conoce el método</a>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="about-imgs">
              <div>⚖️</div>
              <div>📚</div>
              <div>🏛️</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CÓMO FUNCIONA — granate oscuro */}
      <section className="sp" style={{ background:"var(--g-deep)", paddingBottom:"40px" }} id="como-funciona">
        <div className="ctr">
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:"64px" }}>
              <div className="accent-line-gold" style={{ margin:"0 auto 16px" }}/>
              <h3 style={{ fontSize:"13px", color:"var(--gold)", textTransform:"uppercase", letterSpacing:"2px", fontWeight:600, marginBottom:"12px" }}>¿Cómo funciona?</h3>
              <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3vw,40px)", fontWeight:700, color:"var(--crema)" }}>Tu preparación paso a paso</h2>
            </div>
          </FadeIn>
          <div className="g4">
            {SITE.steps.map((s,i) => (
              <FadeIn key={i} delay={i*0.1}>
                <div className="step-card">
                  <div className="step-num">{s.num}</div>
                  <h4 style={{ fontFamily:"var(--serif)", fontSize:"19px", fontWeight:700, color:"var(--g-deep)", marginBottom:"10px" }}>{s.title}</h4>
                  <p style={{ fontSize:"14px", color:"var(--text-m)", lineHeight:1.7 }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <svg style={{ display:"block", marginTop:"80px", width:"100%", height:"60px" }} viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 Q360,60 720,30 T1440,30 L1440,60 L0,60 Z" fill="var(--g)"/>
        </svg>
      </section>

      {/* CTA — granate medio */}
      <section className="cta-band sp" id="tarifas">
        <div className="ctr" style={{ textAlign:"center" }}>
          <FadeIn>
            <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3vw,40px)", fontWeight:700, color:"var(--crema)", marginBottom:"20px" }}>Entrena con casos reales y llega preparado</h2>
            <p style={{ fontSize:"17px", color:"rgba(250,247,242,.72)", maxWidth:"580px", margin:"0 auto 36px", lineHeight:1.7, fontWeight:300 }}>
              Da el paso y empieza a entrenar con un método práctico, actualizado y guiado por profesionales en activo. Súmate a los opositores que ya están mejorando sus resultados.
            </p>
            <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
              <a href="#" className="btn-primary">Ver tarifas →</a>
              <a href="#" className="btn-ol-light">Prueba gratis</a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TESTIMONIOS — crema oscuro */}
      <section className="sp" style={{ background:"var(--crema-d)" }} id="testimonios">
        <div className="ctr">
          <FadeIn>
            <div style={{ textAlign:"center", marginBottom:"56px" }}>
              <div className="accent-line" style={{ margin:"0 auto 16px" }}/>
              <h3 style={{ fontSize:"13px", color:"var(--g)", textTransform:"uppercase", letterSpacing:"2px", fontWeight:600, marginBottom:"12px" }}>Testimonios</h3>
              <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(28px,3vw,40px)", fontWeight:700, color:"var(--g-deep)" }}>Lo que dicen nuestros alumnos</h2>
            </div>
          </FadeIn>
          <div className="g3">
            {SITE.testimonials.map((t,i) => (
              <FadeIn key={i} delay={i*0.1}>
                <div className="t-card">
                  <div style={{ display:"flex", gap:"2px", marginBottom:"16px" }}>
                    {[...Array(5)].map((_,j) => <Star key={j}/>)}
                  </div>
                  <p style={{ fontSize:"15px", color:"var(--text-m)", lineHeight:1.7, marginBottom:"20px", fontStyle:"italic" }}>"{t.text}"</p>
                  <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                    <div style={{ width:"44px", height:"44px", borderRadius:"50%", background:"var(--g)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, color:"var(--crema)", fontSize:"16px" }}>{t.name.charAt(0)}</div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:"15px", color:"var(--g-deep)" }}>{t.name}</div>
                      <div style={{ fontSize:"13px", color:"var(--g)", fontWeight:500 }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-sec" style={{ padding:"64px 24px 32px" }}>
        <div className="ctr">
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:"48px", marginBottom:"48px" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"20px" }}>
                <ShieldLogo size={36}/>
                <div>
                  <div style={{ fontFamily:"var(--serif)", fontSize:"15px", fontWeight:700, color:"var(--crema)" }}>{SITE.name}</div>
                  <div style={{ fontSize:"10px", color:"var(--gold)", letterSpacing:"2px", textTransform:"uppercase" }}>{SITE.tagline}</div>
                </div>
              </div>
              <p style={{ fontSize:"14px", color:"rgba(250,247,242,.5)", lineHeight:1.7, maxWidth:"340px", fontWeight:300 }}>
                Formación online especializada en oposiciones a Inspección de Trabajo. Prepárate con casos reales y un método avalado por profesionales en activo.
              </p>
              <div style={{ display:"flex", gap:"12px", marginTop:"20px" }}>
                {["Facebook","Instagram","YouTube","TikTok"].map(s => (
                  <a key={s} href="#" style={{ width:"36px", height:"36px", borderRadius:"8px", background:"rgba(201,168,76,.1)", border:"1px solid rgba(201,168,76,.2)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--gold)", fontSize:"12px", textDecoration:"none", fontWeight:600 }}>{s.charAt(0)}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontFamily:"var(--serif)", fontSize:"16px", fontWeight:700, color:"var(--crema)", marginBottom:"20px" }}>Plataforma</h4>
              {["Tarifas","Supuesto práctico GRATIS","Cancelar suscripción","Acceso plataforma"].map(l => (
                <a key={l} href="#" style={{ display:"block", color:"rgba(250,247,242,.45)", textDecoration:"none", fontSize:"14px", marginBottom:"12px", transition:"color .25s" }}
                  onMouseOver={e => e.target.style.color="#C9A84C"}
                  onMouseOut={e => e.target.style.color="rgba(250,247,242,.45)"}
                >{l}</a>
              ))}
            </div>
            <div>
              <h4 style={{ fontFamily:"var(--serif)", fontSize:"16px", fontWeight:700, color:"var(--crema)", marginBottom:"20px" }}>Legal</h4>
              {["Política de Privacidad","Aviso Legal","Política de Cookies","Condiciones generales"].map(l => (
                <a key={l} href="#" style={{ display:"block", color:"rgba(250,247,242,.45)", textDecoration:"none", fontSize:"14px", marginBottom:"12px", transition:"color .25s" }}
                  onMouseOver={e => e.target.style.color="#C9A84C"}
                  onMouseOut={e => e.target.style.color="rgba(250,247,242,.45)"}
                >{l}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(201,168,76,.15)", paddingTop:"24px", textAlign:"center" }}>
            <p style={{ fontSize:"13px", color:"rgba(250,247,242,.35)", fontWeight:300 }}>© 2026 Domina los Supuestos IP — Todos los derechos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
