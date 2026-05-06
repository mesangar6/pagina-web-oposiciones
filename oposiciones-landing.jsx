import { useState, useEffect, useRef } from "react";

const SITE = {
  name: "Prepárate IP",
  tagline: "Supuestos Prácticos Reales",
  heroTitle: "Prepárate IP: Supuestos Prácticos Reales",
  heroSub: "La plataforma de referencia para preparar tu oposición con casos reales, resoluciones detalladas y un método avalado por inspectores en activo.",
  cta: "Empieza gratis",
  features: [
    { num: "01", title: "3 supuestos prácticos cada semana", desc: "Casos reales de Inspección de Trabajo: laboral, seguridad social y sanciones." },
    { num: "02", title: "Simulacro de examen mensual", desc: "Condiciones idénticas al examen oficial. Cronometrado y corregido." },
    { num: "03", title: "Normativa adaptada a tu CCAA", desc: "Legislación autonómica incluida y actualizada cada trimestre." },
    { num: "04", title: "Tipo test y desarrollo", desc: "Ambas modalidades, con resoluciones razonadas artículo a artículo." },
    { num: "05", title: "Resoluciones detalladas", desc: "Actualizadas con jurisprudencia y criterios del ITSS." },
    { num: "06", title: "PDF y vídeos explicativos", desc: "Normativa aplicada a casos prácticos reales del cuerpo." },
  ],
  steps: [
    { num: "I",   title: "Suscríbete",       desc: "Accede al aula virtual con tu usuario y contraseña en menos de 2 minutos." },
    { num: "II",  title: "Recibe supuestos",  desc: "Cada semana nuevos casos prácticos llegan directamente a tu bandeja." },
    { num: "III", title: "Corrige y analiza", desc: "Revisa las resoluciones detalladas y aprende de cada error." },
    { num: "IV",  title: "Simulacro mensual", desc: "Pon a prueba tu nivel real y mejora semana a semana." },
  ],
  testimonials: [
    { name: "Carlos M.", city: "Sevilla",  text: "Llegué al examen sin sorpresas. El método es diferente a todo lo que había probado antes." },
    { name: "Laura G.",  city: "Madrid",   text: "Las resoluciones detalladas y los vídeos marcan una diferencia enorme frente a otras academias." },
    { name: "Pedro R.",  city: "Valencia", text: "El simulacro mensual me enseñó a gestionar el tiempo. Aprobé a la primera convocatoria." },
  ],
  stats: [
    { val: "300", suf: "+", label: "Aspirantes activos" },
    { val: "150", suf: "+", label: "Supuestos disponibles" },
    { val: "95",  suf: "%", label: "Tasa de satisfacción" },
    { val: "12",  suf: "",  label: "Simulacros al año" },
  ],
  nav: [
    { label: "Supuesto gratis", href: "#inicio" },
    { label: "Tarifas",         href: "#tarifas" },
    { label: "Cómo funciona",   href: "#como-funciona" },
    { label: "Temario",         href: "#temario" },
    { label: "Testimonios",     href: "#testimonios" },
  ],
};

/* ── hooks ── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

function Reveal({ children, delay = 0, y = 36 }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? "none" : `translateY(${y}px)`,
      transition: `opacity .75s cubic-bezier(.22,1,.36,1) ${delay}s, transform .75s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function CountUp({ val, suf, active }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const target = parseInt(val);
    let cur = 0; const step = target / 50;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setN(target); clearInterval(t); }
      else setN(Math.floor(cur));
    }, 28);
    return () => clearInterval(t);
  }, [active, val]);
  return <>{n}{suf}</>;
}

function StatBlock({ val, suf, label }) {
  const [ref, v] = useInView(0.3);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(44px,4vw,64px)", fontWeight: 900, color: "var(--crema)", letterSpacing: "-2px", lineHeight: 1 }}>
        <CountUp val={val} suf={suf} active={v} />
      </div>
      <div style={{ fontSize: "12px", color: "rgba(247,241,233,0.45)", marginTop: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function Logo({ size = 56 }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none">
      <path d="M50 4 L92 24 L92 66 Q92 97 50 116 Q8 97 8 66 L8 24 Z" fill="#7A1522" stroke="#C9A030" strokeWidth="2"/>
      <path d="M50 18 L78 32 L78 63 Q78 86 50 102 Q22 86 22 63 L22 32 Z" fill="none" stroke="#C9A030" strokeWidth="1" opacity="0.4"/>
      <text x="50" y="74" textAnchor="middle" fontFamily="Georgia,serif" fontSize="28" fontWeight="700" fill="#F7F1E9">IP</text>
      <circle cx="35" cy="27" r="2.2" fill="#C9A030"/>
      <circle cx="50" cy="22" r="2.2" fill="#C9A030"/>
      <circle cx="65" cy="27" r="2.2" fill="#C9A030"/>
      <path d="M26 94 Q38 102 50 105 Q62 102 74 94" stroke="#C9A030" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* ══════════════════════════
   APP
══════════════════════════ */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ fontFamily: "var(--body)", background: "var(--crema)", color: "var(--ink)", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;400;500;600&display=swap');

        :root {
          --serif: 'DM Serif Display', Georgia, serif;
          --body:  'DM Sans', 'Segoe UI', sans-serif;
          --ink:      #1C0A0E;
          --ink60:    rgba(28,10,14,.6);
          --ink25:    rgba(28,10,14,.15);
          --ink08:    rgba(28,10,14,.05);
          --red:      #7A1522;
          --red-d:    #500D17;
          --red-l:    #A02030;
          --gold:     #C9A030;
          --gold-l:   #E8C87A;
          --crema:    #F7F1E9;
          --crema-d:  #EDE5D8;
          --crema-dd: #E0D4C4;
          --dark-bg:  #180810;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}

        /* NAV */
        .nav{
          position:fixed;top:0;left:0;right:0;z-index:200;
          height:90px;padding:0 64px;
          display:flex;align-items:center;justify-content:space-between;
          transition:background .35s,box-shadow .35s;
        }
        .nav.up{ background:transparent; }
        .nav.down{
          background:rgba(247,241,233,0.97);
          backdrop-filter:blur(16px);
          box-shadow:0 1px 0 var(--ink25);
        }
        .nav-brand{ display:flex;align-items:center;gap:18px;text-decoration:none; }
        .nav-name{ font-family:var(--serif);font-size:26px;color:var(--ink);line-height:1.05;letter-spacing:-.5px; }
        .nav-sub{ font-size:11px;color:var(--red);letter-spacing:2.5px;text-transform:uppercase;font-weight:600;margin-top:4px; }

        .nav-links{ display:flex;gap:28px;align-items:center;list-style:none; }
        .nav-links a{ font-size:14px;font-weight:500;color:var(--ink60);text-decoration:none;transition:color .2s; }
        .nav-links a:hover{ color:var(--red); }
        .nav-cta{
          padding:11px 26px;background:var(--red);color:#fff;
          font-size:13px;font-weight:600;letter-spacing:.3px;
          border:none;border-radius:3px;cursor:pointer;text-decoration:none;
          transition:background .2s;
        }
        .nav-cta:hover{ background:var(--red-d); }

        /* HERO full-width */
        .hero{
          position:relative;
          min-height:100vh;
          background: var(--red-d);
          display:flex;align-items:center;
          overflow:hidden;
        }
        .hero-bg-text{
          position:absolute;right:-60px;bottom:-80px;
          font-family:var(--serif);font-size:clamp(320px,35vw,480px);font-weight:900;
          color:rgba(255,255,255,0.03);line-height:1;pointer-events:none;user-select:none;
          letter-spacing:-20px;
        }
        .hero-pattern{
          position:absolute;inset:0;
          background:url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23C9A030' opacity='0.08'/%3E%3C/svg%3E");
          pointer-events:none;
        }
        .hero-inner{
          position:relative;z-index:2;
          width:100%;
          padding:140px 80px 100px;
          display:grid;grid-template-columns:1.4fr 1fr;gap:64px;align-items:center;
        }
        .hero-eyebrow{
          display:inline-flex;align-items:center;gap:10px;
          font-size:12px;letter-spacing:3px;text-transform:uppercase;
          color:var(--gold-l);font-weight:500;margin-bottom:36px;
        }
        .hero-eyebrow::before{content:'';width:32px;height:1px;background:var(--gold);}
        .hero-h1{
          font-family:var(--serif);
          font-size:clamp(56px,7vw,108px);
          font-weight:900;color:#F7F1E9;
          line-height:1.02;letter-spacing:-3px;
          margin-bottom:36px;
        }
        .hero-h1 em{font-style:italic;color:var(--gold-l);}
        .hero-sub{
          font-size:clamp(18px,1.5vw,22px);
          color:rgba(247,241,233,0.7);
          line-height:1.65;font-weight:300;
          margin-bottom:48px;max-width:600px;
        }
        .hero-btns{display:flex;gap:14px;flex-wrap:wrap;}

        .btn-gold{
          padding:17px 40px;background:var(--gold);color:var(--ink);
          font-size:15px;font-weight:700;border:none;border-radius:3px;
          cursor:pointer;text-decoration:none;
          display:inline-flex;align-items:center;gap:8px;
          transition:background .2s,transform .2s;
          box-shadow:0 4px 24px rgba(201,160,48,.35);
        }
        .btn-gold:hover{background:var(--gold-l);transform:translateY(-2px);}

        .btn-ghost-light{
          padding:15px 36px;background:transparent;color:rgba(247,241,233,.8);
          font-size:15px;font-weight:500;
          border:1.5px solid rgba(247,241,233,.25);border-radius:3px;
          cursor:pointer;text-decoration:none;
          display:inline-flex;align-items:center;gap:8px;
          transition:border-color .2s,color .2s;
        }
        .btn-ghost-light:hover{border-color:rgba(247,241,233,.7);color:#F7F1E9;}

        /* hero right panel */
        .hero-card{
          background:rgba(247,241,233,0.07);
          border:1px solid rgba(247,241,233,0.12);
          border-radius:14px;padding:48px 44px;
          backdrop-filter:blur(8px);
        }
        .hero-card-tag{font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold-l);font-weight:600;margin-bottom:32px;}
        .hero-stat-row{display:flex;flex-direction:column;gap:0;}
        .hero-stat{display:flex;align-items:center;gap:24px;padding:22px 0;border-bottom:1px solid rgba(247,241,233,0.1);}
        .hero-stat:last-child{border-bottom:none;}
        .hero-stat-num{font-family:var(--serif);font-size:42px;font-weight:900;color:var(--gold-l);letter-spacing:-1.5px;min-width:90px;line-height:1;}
        .hero-stat-label{font-size:15px;color:rgba(247,241,233,0.65);font-weight:300;line-height:1.4;}

        /* TICKER */
        .ticker{background:var(--gold);padding:13px 0;overflow:hidden;white-space:nowrap;}
        .ticker-track{display:inline-flex;gap:40px;animation:ticker 28s linear infinite;}
        @keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .ticker-item{font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--ink);}
        .ticker-sep{color:rgba(28,10,14,0.3);}

        /* FEATURES */
        .features{padding:120px 56px;background:var(--crema);}
        .section-tag{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--red);font-weight:600;margin-bottom:16px;}
        .section-title{
          font-family:var(--serif);font-size:clamp(36px,4vw,58px);
          font-weight:900;color:var(--ink);line-height:1.05;letter-spacing:-2px;margin-bottom:72px;
        }
        .section-title em{font-style:italic;color:var(--red);}

        .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--ink25);}
        .feat-item{
          padding:44px 36px;border-right:1px solid var(--ink25);border-bottom:1px solid var(--ink25);
          transition:background .25s;cursor:default;
        }
        .feat-item:nth-child(3n){border-right:none;}
        .feat-item:hover{background:var(--ink08);}
        .feat-n{font-family:var(--serif);font-size:13px;font-style:italic;color:var(--red);margin-bottom:18px;}
        .feat-name{font-family:var(--serif);font-size:21px;font-weight:700;color:var(--ink);margin-bottom:12px;line-height:1.2;}
        .feat-desc{font-size:14px;color:var(--ink60);line-height:1.65;font-weight:300;}

        /* STATS */
        .stats-band{
          background:var(--dark-bg);
          padding:80px 56px;
          display:grid;grid-template-columns:repeat(4,1fr);
          position:relative;overflow:hidden;
        }
        .stats-band::before{
          content:'';position:absolute;inset:0;
          background:url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23C9A030' stroke-width='0.3' opacity='0.06'/%3E%3C/svg%3E");
        }
        .stat-item{position:relative;z-index:1;padding:32px;border-right:1px solid rgba(255,255,255,0.06);}
        .stat-item:last-child{border-right:none;}
        .stat-bar{width:28px;height:2px;background:var(--gold);margin-bottom:20px;}

        /* ABOUT */
        .about{display:grid;grid-template-columns:1fr 1fr;min-height:580px;}
        .about-img{
          background:linear-gradient(145deg,var(--red-d),#2A0510);
          display:flex;flex-direction:column;justify-content:flex-end;
          padding:64px;position:relative;overflow:hidden;
        }
        .about-img::before{
          content:'IP';
          position:absolute;top:-40px;right:-40px;
          font-family:var(--serif);font-size:280px;font-weight:900;
          color:rgba(255,255,255,0.04);line-height:1;letter-spacing:-10px;
          pointer-events:none;
        }
        .about-img-tag{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);font-weight:500;margin-bottom:20px;}
        .about-img-title{font-family:var(--serif);font-size:clamp(32px,3vw,48px);font-weight:900;color:#F7F1E9;line-height:1.1;position:relative;z-index:1;}
        .about-img-quote{font-family:var(--serif);font-size:16px;font-style:italic;color:rgba(247,241,233,0.5);margin-top:24px;padding-left:16px;border-left:2px solid var(--gold);position:relative;z-index:1;}

        .about-body{background:var(--crema-d);padding:80px 64px;display:flex;flex-direction:column;justify-content:center;}
        .about-body p{font-size:17px;color:var(--ink60);line-height:1.8;font-weight:300;margin-bottom:24px;}
        .about-body strong{color:var(--red);font-weight:600;}

        /* STEPS */
        .steps{padding:120px 56px;background:var(--crema);}
        .steps-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:2px solid var(--ink);margin-top:64px;}
        .step{
          padding:48px 36px 48px 0;border-right:1px solid var(--ink25);
          cursor:pointer;transition:background .2s;position:relative;
        }
        .step:last-child{border-right:none;}
        .step.on::after{content:'';position:absolute;top:-2px;left:0;right:0;height:3px;background:var(--red);}
        .step:hover{background:var(--ink08);}
        .step-r{font-family:var(--serif);font-size:14px;font-style:italic;color:var(--red);margin-bottom:20px;}
        .step-title{font-family:var(--serif);font-size:23px;font-weight:700;color:var(--ink);margin-bottom:14px;line-height:1.1;}
        .step-desc{font-size:14px;color:var(--ink60);line-height:1.65;font-weight:300;}

        /* CTA */
        .cta-sec{
          background:var(--red);padding:100px 56px;
          display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;
          position:relative;overflow:hidden;
        }
        .cta-sec::after{
          content:'';position:absolute;
          right:-120px;top:-120px;width:480px;height:480px;border-radius:50%;
          background:rgba(255,255,255,0.03);pointer-events:none;
        }
        .cta-eyebrow{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--gold-l);font-weight:500;margin-bottom:20px;}
        .cta-title{font-family:var(--serif);font-size:clamp(36px,3.8vw,56px);font-weight:900;color:#F7F1E9;line-height:1.05;letter-spacing:-2px;}
        .cta-desc{font-size:17px;color:rgba(247,241,233,0.65);line-height:1.75;font-weight:300;margin-bottom:36px;}
        .btn-fill-inv{
          padding:17px 40px;background:#F7F1E9;color:var(--red);
          font-size:15px;font-weight:700;border:none;border-radius:3px;
          cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;
          transition:background .2s,transform .2s;
        }
        .btn-fill-inv:hover{background:var(--gold-l);transform:translateY(-1px);}
        .btn-ghost-inv{
          padding:15px 36px;background:transparent;color:rgba(247,241,233,.7);
          font-size:15px;font-weight:500;border:1.5px solid rgba(247,241,233,.25);border-radius:3px;
          cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;
          transition:border-color .2s,color .2s;
        }
        .btn-ghost-inv:hover{border-color:rgba(247,241,233,.7);color:#F7F1E9;}

        /* TESTIMONIOS */
        .testi{padding:120px 56px;background:var(--crema-d);}
        .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:64px;}
        .t-card{
          background:var(--crema);padding:52px 44px;
          transition:background .25s;
        }
        .t-card:hover{background:#fff;}
        .t-stars{display:flex;gap:3px;margin-bottom:24px;}
        .t-quote{font-family:var(--serif);font-size:clamp(17px,1.7vw,21px);font-style:italic;color:var(--ink);line-height:1.5;margin-bottom:32px;}
        .t-author{display:flex;align-items:center;gap:14px;}
        .t-av{width:48px;height:48px;border-radius:50%;background:var(--red);display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:20px;font-style:italic;color:#F7F1E9;font-weight:700;flex-shrink:0;}
        .t-name{font-size:14px;font-weight:600;color:var(--ink);}
        .t-city{font-size:12px;color:var(--ink60);letter-spacing:1px;text-transform:uppercase;margin-top:3px;}

        /* FOOTER */
        .footer{background:var(--dark-bg);padding:80px 56px 40px;}
        .footer-top{display:grid;grid-template-columns:2.5fr 1fr 1fr;gap:64px;padding-bottom:56px;border-bottom:1px solid rgba(255,255,255,0.07);}
        .f-name{font-family:var(--serif);font-size:22px;color:#F7F1E9;margin-top:16px;}
        .f-sub{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);margin-top:4px;}
        .f-desc{font-size:14px;color:rgba(247,241,233,0.38);line-height:1.7;margin-top:20px;max-width:320px;font-weight:300;}
        .f-socials{display:flex;gap:8px;margin-top:28px;}
        .f-soc{width:38px;height:38px;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;color:rgba(247,241,233,0.35);font-size:11px;font-weight:600;text-decoration:none;transition:border-color .2s,color .2s;}
        .f-soc:hover{border-color:var(--gold);color:var(--gold);}
        .f-col-title{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(247,241,233,0.28);font-weight:600;margin-bottom:24px;}
        .f-link{display:block;font-size:14px;color:rgba(247,241,233,0.42);text-decoration:none;margin-bottom:12px;transition:color .2s;}
        .f-link:hover{color:#F7F1E9;}
        .footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;}
        .f-copy{font-size:12px;color:rgba(247,241,233,0.22);}

        /* MOB */
        .mob-btn{display:none;background:none;border:none;cursor:pointer;padding:6px;}
        .mob-btn span{display:block;width:22px;height:1.5px;background:var(--ink);margin:5px 0;transition:.3s;}

        @media(max-width:1024px){
          .hero-inner{grid-template-columns:1fr;gap:48px;padding:120px 40px 80px;}
          .about{grid-template-columns:1fr;}
          .cta-sec{grid-template-columns:1fr;gap:40px;}
          .feat-grid{grid-template-columns:repeat(2,1fr);}
          .feat-item:nth-child(3n){border-right:1px solid var(--ink25);}
          .feat-item:nth-child(2n){border-right:none;}
          .steps-grid{grid-template-columns:repeat(2,1fr);}
          .testi-grid{grid-template-columns:1fr;}
          .stats-band{grid-template-columns:repeat(2,1fr);}
          .footer-top{grid-template-columns:1fr 1fr;}
        }
        @media(max-width:768px){
          .nav{padding:0 20px;height:76px;}
          .nav-name{font-size:18px;}
          .nav-links{display:none;}
          .nav-links.open{
            display:flex;flex-direction:column;
            position:fixed;top:76px;left:0;right:0;bottom:0;
            background:var(--crema);padding:40px 24px;gap:20px;
            align-items:flex-start;
          }
          .nav-links.open a{font-family:var(--serif);font-size:26px;font-weight:700;color:var(--ink);}
          .mob-btn{display:block;}
          .features,.steps,.testi{padding:80px 24px;}
          .about-img,.about-body{padding:60px 24px;}
          .cta-sec{padding:80px 24px;}
          .footer{padding:60px 24px 32px;}
          .footer-top{grid-template-columns:1fr;gap:40px;}
          .hero-inner{padding:100px 24px 80px;}
          .feat-grid{grid-template-columns:1fr;}
          .steps-grid{grid-template-columns:1fr;}
          .stats-band{grid-template-columns:repeat(2,1fr);padding:60px 24px;}
          .stat-item{border-right:none;border-bottom:1px solid rgba(255,255,255,0.06);}
        }
      `}</style>

      {/* ══ NAV ══ */}
      <nav className={`nav ${scrolled ? "down" : "up"}`}>
        <a href="#inicio" className="nav-brand">
          <Logo size={68} />
          <div>
            <div className="nav-name">{SITE.name}</div>
            <div className="nav-sub">{SITE.tagline}</div>
          </div>
        </a>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {SITE.nav.map(l => (
            <li key={l.label}><a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a></li>
          ))}
          <li><a href="#tarifas" className="nav-cta" onClick={() => setMenuOpen(false)}>Acceso plataforma</a></li>
        </ul>

        <button className="mob-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          <span style={menuOpen ? { transform: "rotate(45deg) translate(4px,5px)" } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: "rotate(-45deg) translate(4px,-5px)" } : {}} />
        </button>
      </nav>

      {/* ══ HERO — full-width granate ══ */}
      <section className="hero" id="inicio">
        <div className="hero-bg-text">IP</div>
        <div className="hero-pattern" />
        <div className="hero-inner">
          {/* Izquierda — texto principal */}
          <div>
            <div className="hero-eyebrow">Oposiciones · Inspección de Trabajo · España</div>
            <h1 className="hero-h1">
              Prepárate IP:<br />
              <em>Supuestos Prácticos</em><br />
              Reales
            </h1>
            <p className="hero-sub">{SITE.heroSub}</p>
            <div className="hero-btns">
              <a href="#" className="btn-gold">{SITE.cta} →</a>
              <a href="#como-funciona" className="btn-ghost-light">Cómo funciona</a>
            </div>
          </div>

          {/* Derecha — card de stats */}
          <Reveal delay={0.2}>
            <div className="hero-card">
              <div className="hero-card-tag">Por qué elegirnos</div>
              <div className="hero-stat-row">
                {[
                  ["300+", "Aspirantes activos en toda España"],
                  ["150+", "Supuestos disponibles desde el primer día"],
                  ["95%",  "Tasa de satisfacción de nuestros alumnos"],
                  ["12",   "Simulacros de examen real al año"],
                ].map(([n, l]) => (
                  <div key={l} className="hero-stat">
                    <div className="hero-stat-num">{n}</div>
                    <div className="hero-stat-label">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ TICKER ══ */}
      <div className="ticker">
        <div className="ticker-track">
          {[...Array(2)].map((_, ri) =>
            ["Supuestos semanales","Resoluciones detalladas","Normativa actualizada","Simulacros reales","Inspección de Trabajo","Toda España","Aprueba con método"].map((t,i) => (
              <span key={`${ri}-${i}`} className="ticker-item">{t} <span className="ticker-sep">✦</span> </span>
            ))
          )}
        </div>
      </div>

      {/* ══ FEATURES ══ */}
      <section className="features" id="temario">
        <Reveal>
          <div className="section-tag">¿Qué incluye?</div>
          <h2 className="section-title">Todo lo que<br /><em>necesitas</em> para aprobar</h2>
        </Reveal>
        <div className="feat-grid">
          {SITE.features.map((f, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="feat-item">
                <div className="feat-n">{f.num}</div>
                <div className="feat-name">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="stats-band">
        {SITE.stats.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-bar" />
            <StatBlock val={s.val} suf={s.suf} label={s.label} />
          </div>
        ))}
      </section>

      {/* ══ ABOUT ══ */}
      <section className="about" id="temario-2">
        <div className="about-img">
          <Reveal>
            <div className="about-img-tag">¿Quiénes somos?</div>
            <h2 className="about-img-title">Formados por<br />inspectores.<br />Para inspectores.</h2>
            <p className="about-img-quote">"El método que yo hubiera querido tener cuando empecé a opositar."</p>
          </Reveal>
        </div>
        <div className="about-body">
          <Reveal delay={0.1}>
            <div className="section-tag" style={{ marginBottom: "24px" }}>Nuestra historia</div>
            <p>Somos una <strong>academia online especializada en la preparación de oposiciones a Inspección de Trabajo</strong>, creada y dirigida por inspectores en activo que conocen de primera mano qué se evalúa y cómo.</p>
            <p>Cada semana, <strong>más de 300 aspirantes confían en nuestro método</strong>: práctico, actualizado y centrado en lo que realmente importa en el examen. Sin relleno. Sin teoría innecesaria.</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "40px", flexWrap: "wrap" }}>
              <a href="#" style={{ padding:"15px 36px", background:"var(--red)", color:"#fff", fontWeight:700, fontSize:"15px", borderRadius:"3px", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"8px", transition:"background .2s" }}
                onMouseOver={e=>e.currentTarget.style.background="var(--red-d)"}
                onMouseOut={e=>e.currentTarget.style.background="var(--red)"}
              >Conoce el método →</a>
              <a href="#como-funciona" style={{ padding:"13px 32px", background:"transparent", color:"var(--red)", fontWeight:500, fontSize:"15px", border:"1.5px solid var(--red)", borderRadius:"3px", textDecoration:"none", transition:"background .2s,color .2s" }}
                onMouseOver={e=>{e.currentTarget.style.background="var(--red)";e.currentTarget.style.color="#fff";}}
                onMouseOut={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="var(--red)";}}
              >Cómo funciona</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ STEPS ══ */}
      <section className="steps" id="como-funciona">
        <Reveal>
          <div className="section-tag">¿Cómo funciona?</div>
          <h2 className="section-title">Tu camino hacia<br /><em>el aprobado</em></h2>
        </Reveal>
        <div className="steps-grid">
          {SITE.steps.map((s, i) => (
            <div key={i} className={`step ${activeStep === i ? "on" : ""}`}
              style={{ paddingLeft: i > 0 ? "36px" : 0 }}
              onMouseEnter={() => setActiveStep(i)}
            >
              <div className="step-r">{s.num}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta-sec" id="tarifas">
        <Reveal>
          <div>
            <div className="cta-eyebrow">¿A qué esperas?</div>
            <h2 className="cta-title">Empieza hoy.<br />Aprueba este año.</h2>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div>
            <p className="cta-desc">Da el paso y entrena con casos reales, resoluciones detalladas y un método avalado por profesionales en activo. Súmate a los opositores que ya están mejorando.</p>
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap" }}>
              <a href="#" className="btn-fill-inv">Ver tarifas →</a>
              <a href="#" className="btn-ghost-inv">Prueba gratis</a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ TESTIMONIOS ══ */}
      <section className="testi" id="testimonios">
        <Reveal>
          <div className="section-tag">Testimonios</div>
          <h2 className="section-title">Lo que dicen<br /><em>nuestros alumnos</em></h2>
        </Reveal>
        <div className="testi-grid">
          {SITE.testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="t-card">
                <div className="t-stars">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="#7A1522">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="t-quote">"{t.text}"</p>
                <div className="t-author">
                  <div className="t-av">{t.name.charAt(0)}</div>
                  <div>
                    <div className="t-name">{t.name}</div>
                    <div className="t-city">{t.city}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <Logo size={44} />
            <div className="f-name">{SITE.name}</div>
            <div className="f-sub">{SITE.tagline}</div>
            <p className="f-desc">Formación online especializada en oposiciones a Inspección de Trabajo. Prepárate con casos reales y un método avalado por profesionales en activo.</p>
            <div className="f-socials">
              {[["FB","Facebook"],["IG","Instagram"],["YT","YouTube"],["TK","TikTok"]].map(([s]) => (
                <a key={s} href="#" className="f-soc">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="f-col-title">Plataforma</div>
            {["Tarifas","Supuesto GRATIS","Cancelar suscripción","Acceso plataforma"].map(l => (
              <a key={l} href="#" className="f-link">{l}</a>
            ))}
          </div>
          <div>
            <div className="f-col-title">Legal</div>
            {["Política de Privacidad","Aviso Legal","Política de Cookies","Condiciones generales"].map(l => (
              <a key={l} href="#" className="f-link">{l}</a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span className="f-copy">© 2026 Prepárate IP — Todos los derechos reservados</span>
          <span className="f-copy">Hecho con ❤ para opositores</span>
        </div>
      </footer>
    </div>
  );
}