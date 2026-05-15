import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://vsagqtaqnpjxedzisxam.supabase.co",
  "sb_publishable_E-Jv0XqC6qmGDgGCnfvg_A_mnPYxNGG"
);

/* ── Hook: carga contenido dinámico de Supabase ── */
function useSiteData() {
  const [contenido, setContenido] = useState({});
  const [planes, setPlanes] = useState([]);
  const [stats, setStats] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [{ data: cont }, { data: pl }, { data: alumnos }] = await Promise.all([
        supabase.from("contenido_web").select("*"),
        supabase.from("planes").select("*").eq("activo", true).order("precio"),
        supabase.from("alumnos").select("estado, plan"),
      ]);

      const contObj = {};
      cont?.forEach(c => { contObj[c.clave] = c.valor; });
      setContenido(contObj);

      // Aplicar colores dinámicos a las variables CSS
      if (contObj.color_primario || contObj.color_acento || contObj.color_secundario) {
        const root = document.documentElement;
        if (contObj.color_primario) {
          root.style.setProperty("--blue",   contObj.color_primario);
          root.style.setProperty("--blue-l", contObj.color_primario + "CC");
        }
        if (contObj.color_secundario) {
          root.style.setProperty("--blue-d", contObj.color_secundario);
        }
        if (contObj.color_acento) {
          root.style.setProperty("--gold",   contObj.color_acento);
          root.style.setProperty("--gold-l", contObj.color_acento + "CC");
        }
      }

      const activos = alumnos?.filter(a => a.estado === "activo").length || 0;
      setStats({
        aspirantes: activos > 0 ? `${activos}+` : "300+",
        supuestos: contObj.stats_supuestos ? `${contObj.stats_supuestos}+` : "150+",
        satisfaccion: contObj.stats_satisfaccion ? `${contObj.stats_satisfaccion}%` : "95%",
        simulacros: contObj.stats_simulacros || "12",
      });

      if (pl && pl.length > 0) {
        setPlanes(pl.map((p, i) => ({
          id: p.id,
          name: p.nombre,
          period: p.periodo,
          price: p.precio,
          original: p.precio_original,
          perMonth: p.precio_mes,
          saving: p.precio_original ? p.precio_original - p.precio : null,
          badge: i === 1 ? "Más elegido" : i === 3 ? "Máximo ahorro" : null,
          features: [
            "Acceso completo al aula virtual",
            "Material para estudiar y practicar cada semana",
            "Resoluciones detalladas",
            "Simulacro de examen mensual",
            "PDFs y vídeos explicativos",
            "Normativa actualizada",
            ...(i === 3 ? ["Acceso prioritario a novedades"] : []),
          ],
        })));
      }

      setLoaded(true);
    }
    fetchData();
  }, []);

  return { contenido, planes, stats, loaded };
}

/* ═══════════════════════════════════════════
   DATOS
═══════════════════════════════════════════ */
const SITE = {
  name: "Preparador IIPP",
  tagline: "Oposiciones IIPP · Formación Profesional",
  heroTitle: "Prepárate IP:",
  heroTitleItalic: "Supuestos Prácticos Reales",
  heroSub: "La plataforma de referencia para preparar tu oposición a Instituciones Penitenciarias con casos reales, resoluciones detalladas y un método avalado por funcionarios en activo.",
  cta: "Empieza gratis",
  features: [
    { num: "01", title: "Material para estudiar y practicar cada semana", desc: "Casos reales de IIPP: régimen penitenciario, derecho penal y normativa interna." },
    { num: "02", title: "Simulacro de examen mensual", desc: "Condiciones idénticas al examen oficial. Cronometrado y corregido." },
    { num: "03", title: "Normativa actualizada", desc: "La normativa esta en constantes cambios y nosotros la actualizamos." },
    { num: "04", title: "Tipo test y desarrollo", desc: "Ambas modalidades, con resoluciones razonadas artículo a artículo." },
    { num: "05", title: "Resoluciones detalladas", desc: "Actualizadas con jurisprudencia y criterios del cuerpo." },
    { num: "06", title: "PDF y vídeos explicativos", desc: "Normativa aplicada a casos prácticos reales de IIPP." },
  ],
  steps: [
    { num: "I",   title: "Suscríbete",       desc: "Accede al aula virtual con tu usuario y contraseña en menos de 2 minutos." },
    { num: "II",  title: "Recibe material",  desc: "Cada semana nuevos casos prácticos llegan directamente a tu bandeja." },
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
    { label: "Supuesto gratis", href: "supuesto-gratis" },
    { label: "Tarifas",         href: "tarifas" },
    { label: "Cómo funciona",   href: "#como-funciona" },
    { label: "Temario",         href: "#temario" },
    { label: "Testimonios",     href: "#testimonios" },
  ],
  plans: [
    {
      id: "mensual",
      name: "Mensual",
      period: "al mes",
      price: 49,
      original: null,
      perMonth: 49,
      saving: null,
      badge: null,
      features: [
        "Acceso completo al aula virtual",
        "Material para estudiar y practicar cada semana",
        "Resoluciones detalladas",
        "Simulacro de examen mensual",
        "PDFs y vídeos explicativos",
        "Normativa actualizada",
      ],
    },
    {
      id: "trimestral",
      name: "Trimestral",
      period: "cada 3 meses",
      price: 119,
      original: 147,
      perMonth: 39,
      saving: 28,
      badge: "Más elegido",
      features: [
        "Todo lo del plan mensual",
        "Material para estudiar y practicar cada semana",
        "Resoluciones detalladas",
        "Simulacro de examen mensual",
        "PDFs y vídeos explicativos",
        "Normativa actualizada",
      ],
    },
    {
      id: "semestral",
      name: "Semestral",
      period: "cada 6 meses",
      price: 199,
      original: 294,
      perMonth: 33,
      saving: 95,
      badge: "Mayor ahorro",
      features: [
        "Todo lo del plan mensual",
        "Material para estudiar y practicar cada semana",
        "Resoluciones detalladas",
        "Simulacro de examen mensual",
        "PDFs y vídeos explicativos",
        "Normativa actualizada",
      ],
    },
    {
      id: "anual",
      name: "Anual",
      period: "cada 12 meses",
      price: 349,
      original: 588,
      perMonth: 29,
      saving: 239,
      badge: "Máximo ahorro",
      features: [
        "Todo lo del plan mensual",
        "Material para estudiar y practicar cada semana",
        "Resoluciones detalladas",
        "Simulacro de examen mensual",
        "PDFs y vídeos explicativos",
        "Normativa actualizada",
        "Acceso prioritario a novedades",
      ],
    },
  ],
};

/* ═══════════════════════════════════════════
   HOOKS & UTILS
═══════════════════════════════════════════ */
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

function Reveal({ children, delay = 0 }) {
  const [ref, v] = useInView();
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0, transform: v ? "none" : "translateY(32px)",
      transition: `opacity .75s cubic-bezier(.22,1,.36,1) ${delay}s, transform .75s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>{children}</div>
  );
}

function CountUp({ val, suf, active }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const target = parseInt(val); let cur = 0; const step = target / 50;
    const t = setInterval(() => { cur += step; if (cur >= target) { setN(target); clearInterval(t); } else setN(Math.floor(cur)); }, 28);
    return () => clearInterval(t);
  }, [active, val]);
  return <>{n}{suf}</>;
}

function StatBlock({ val, suf, label }) {
  const [ref, v] = useInView(0.3);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "var(--serif)", fontSize: "clamp(44px,4vw,64px)", fontWeight: 900, color: "var(--blue-d)", letterSpacing: "-2px", lineHeight: 1 }}><CountUp val={val} suf={suf} active={v} /></div>
      <div style={{ fontSize: "12px", color: "var(--ink60)", marginTop: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function Logo({ size = 56 }) {
  return (
    <img
      src="/logo-iipp.jpeg"
      alt="Preparador IIPP"
      style={{
        width: size,
        height: "auto",
        objectFit: "contain",
        borderRadius: "4px",
      }}
    />
  );
}

const STRIPE_LINKS = [
  "https://buy.stripe.com/eVq14o6xD5vS0T1fXb00000",
  "https://buy.stripe.com/fZu7sM3lr9M8cBJ12h00001",
  "https://buy.stripe.com/eVq00k09f1fCatB5ix00002",
  "https://buy.stripe.com/3cIfZie05e2ogRZ9yN00003",
];

function CheckIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2A7A30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
}

/* ── NavBar reutilizable ── */
function NavBar({ links, scrolled = true }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Bloquea el scroll del body cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Overlay que bloquea el contenido cuando el menú está abierto */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 9998,
          }}
        />
      )}

      <nav className={`nav ${scrolled ? "down" : ""}`}>
        <a href="#" onClick={(e) => { e.preventDefault(); links.onHome(); }} className="nav-brand">
          <Logo size={52} />
          <div>
            <div className="nav-name">{SITE.name}</div>
            <div className="nav-sub">{SITE.tagline}</div>
          </div>
        </a>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.items.map((item, i) => (
            <li key={i}>
              <a
                href={item.href || "#"}
                className={item.cta ? "nav-cta" : ""}
                onClick={(e) => {
                  if (item.onClick) { e.preventDefault(); item.onClick(); }
                  setMenuOpen(false);
                }}
                download={item.download || undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button className="mob-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
          <span style={menuOpen ? { transform: "rotate(45deg) translate(4px,5px)" } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: "rotate(-45deg) translate(4px,-5px)" } : {}} />
        </button>
      </nav>
    </>
  );
}

/* ═══════════════════════════════════════════
   PRICING PAGE
═══════════════════════════════════════════ */
function PricingPage({ onBack, onSupuestoGratis }) {
  const { planes, loaded } = useSiteData();
  const planesData = planes.length > 0 ? planes : SITE.plans;
  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <NavBar links={{
        onHome: onBack,
        items: [
          { label: "Inicio", onClick: onBack },
          { label: "Supuesto gratis", onClick: onSupuestoGratis },
          { label: "Tarifas" },
          { label: "Acceso plataforma", onClick: onBack, cta: true },
        ]
      }} />

      {/* HERO */}
      <div className="pricing-hero" style={{ paddingTop: "108px" }}>
        <Reveal>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "16px" }}>Sin matrícula · Sin permanencia</div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(34px,4vw,56px)", fontWeight: 900, color: "var(--blue-d)", lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "20px" }}>
            Elige tu plan y empieza <em style={{ fontStyle: "italic", color: "var(--blue)" }}>hoy</em>
          </h1>
          <p style={{ fontSize: "17px", color: "var(--ink60)", maxWidth: "600px", margin: "0 auto 16px", lineHeight: 1.65, fontWeight: 300 }}>
            Todos los planes incluyen acceso completo al aula virtual con supuestos prácticos reales de Instituciones Penitenciarias. Cancela cuando quieras.
          </p>
        </Reveal>
      </div>

      {/* PLANS */}
      <div className="pricing-grid">
        {planesData.map((plan, i) => {
          const isPopular = plan.badge === "Más elegido";
          const isBest = plan.badge === "Máximo ahorro";
          const highlighted = isPopular || isBest;
          return (
            <Reveal key={plan.id} delay={i * 0.08}>
              <div style={{
                background: highlighted ? "var(--blue-d)" : "#fff",
                color: highlighted ? "#fff" : "var(--ink)",
                border: highlighted ? "2px solid var(--gold)" : "1px solid var(--ink25)",
                borderRadius: "12px",
                padding: "36px 28px",
                position: "relative",
                transition: "transform .25s, box-shadow .25s",
                cursor: "default",
              }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(30,58,110,0.15)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)",
                    background: isPopular ? "var(--gold)" : "var(--blue)",
                    color: isPopular ? "var(--blue-d)" : "#fff",
                    fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase",
                    padding: "5px 16px", borderRadius: "20px", whiteSpace: "nowrap",
                  }}>{plan.badge}</div>
                )}

                {/* Plan name */}
                <div style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 700, marginBottom: "8px", marginTop: plan.badge ? "8px" : 0 }}>{plan.name}</div>

                {/* Original price (struck) */}
                {plan.original && (
                  <div style={{ fontSize: "16px", color: highlighted ? "rgba(255,255,255,0.45)" : "var(--ink60)", textDecoration: "line-through", marginBottom: "4px" }}>{plan.original}€</div>
                )}

                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "var(--serif)", fontSize: "52px", fontWeight: 900, letterSpacing: "-2px", lineHeight: 1, color: highlighted ? "var(--gold-l)" : "var(--blue-d)" }}>{plan.price}</span>
                  <span style={{ fontSize: "22px", fontWeight: 700, color: highlighted ? "var(--gold-l)" : "var(--blue-d)" }}>€</span>
                </div>

                {/* Period */}
                <div style={{ fontSize: "14px", color: highlighted ? "rgba(255,255,255,0.6)" : "var(--ink60)", marginBottom: "4px" }}>{plan.period}</div>

                {/* Per month */}
                <div style={{ fontSize: "15px", fontWeight: 600, color: highlighted ? "#fff" : "var(--blue)", marginBottom: "4px" }}>{plan.perMonth}€/mes</div>

                {/* Saving */}
                {plan.saving && (
                  <div style={{
                    display: "inline-block",
                    fontSize: "12px", fontWeight: 600,
                    color: highlighted ? "#2A7A30" : "#2A7A30",
                    background: highlighted ? "rgba(42,122,48,0.15)" : "rgba(42,122,48,0.1)",
                    padding: "3px 10px", borderRadius: "12px", marginBottom: "4px",
                  }}>Ahorras {plan.saving}€</div>
                )}

                {/* Divider */}
                <div style={{ width: "100%", height: "1px", background: highlighted ? "rgba(255,255,255,0.12)" : "var(--ink25)", margin: "20px 0" }} />

                {/* Features */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                  {plan.features.map((f, fi) => (
                    <div key={fi} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div style={{ flexShrink: 0, marginTop: "2px" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={highlighted ? "#4ADE80" : "#2A7A30"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      <span style={{ fontSize: "13px", color: highlighted ? "rgba(255,255,255,0.75)" : "var(--ink60)", lineHeight: 1.4 }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA → Stripe */}
                <a
                  href={STRIPE_LINKS[i] || "#"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => { e.stopPropagation(); window.open(STRIPE_LINKS[i], '_blank'); }}
                  style={{
                    display: "block", width: "100%", padding: "15px 0",
                    background: highlighted ? "var(--gold)" : "var(--blue)",
                    color: highlighted ? "var(--blue-d)" : "#fff",
                    fontFamily: "var(--body)", fontSize: "15px", fontWeight: 700,
                    border: "none", borderRadius: "4px", cursor: "pointer",
                    textAlign: "center", textDecoration: "none",
                    transition: "background .2s, transform .15s",
                    position: "relative", zIndex: 10,
                  }}
                  onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
                  onMouseOut={e => { e.currentTarget.style.transform = "none"; }}
                >Me apunto →</a>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* TRUST LINE */}
      <div style={{ textAlign: "center", padding: "0 40px 40px" }}>
        <p style={{ fontSize: "14px", color: "var(--ink60)", fontWeight: 300 }}>
          Acceso inmediato tras el pago · Puedes cancelar cuando quieras desde tu panel · Pago seguro con SSL
        </p>
      </div>

      {/* FAQ */}
      <div style={{ background: "var(--offwhite)", padding: "80px 40px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--blue)", fontWeight: 600, marginBottom: "14px" }}>Preguntas frecuentes</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,3vw,42px)", fontWeight: 900, color: "var(--blue-d)", letterSpacing: "-1px", marginBottom: "48px" }}>¿Tienes dudas?</h2>
          </Reveal>

          {[
            ["¿Puedo cancelar cuando quiera?", "Sí, no hay permanencia. Puedes cancelar tu suscripción en cualquier momento desde tu panel de usuario. Seguirás teniendo acceso hasta el final del periodo pagado."],
            ["¿Qué incluye exactamente cada plan?", "Todos los planes incluyen acceso completo al aula virtual con un tema de estudio semanal, con resumen, test, audio y video explicativos, mapa conceptual, flashcards para el estudio y supuestos prácticos con resoluciones detalladas."],
            ["¿Cómo recibo los supuestos?", "Cada semana se publica nuevo contenido en el aula virtual. Recibirás una notificación por email cada vez que haya material nuevo disponible."],
            ["¿Hay matrícula o costes adicionales?", "No, el precio que ves es el precio final. Sin matrícula, sin costes ocultos, sin sorpresas."],
            ["¿Puedo cambiar de plan?", "Sí, puedes cambiar de plan en cualquier momento. El cambio se aplica en tu siguiente ciclo de facturación."],
          ].map(([q, a], i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div style={{ borderBottom: "1px solid var(--ink25)", paddingBottom: "24px", marginBottom: "24px" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "18px", fontWeight: 700, color: "var(--blue-d)", marginBottom: "10px" }}>{q}</h3>
                <p style={{ fontSize: "15px", color: "var(--ink60)", lineHeight: 1.65, fontWeight: 300 }}>{a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* FOOTER mini */}
      <div style={{ background: "var(--blue-d)", padding: "28px 64px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px" }}>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>© 2026 Preparador IIPP — Todos los derechos reservados</p>
        <a href="https://wa.me/34641198743" target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:"8px", color:"rgba(255,255,255,0.5)", textDecoration:"none", fontSize:"13px", fontWeight:500 }}
          onMouseOver={e=>e.currentTarget.style.color="#25D366"}
          onMouseOut={e=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          641 198 743
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */
function HomePage({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const { contenido, planes, stats, loaded } = useSiteData();

  // Datos dinámicos con fallback a los estáticos
  const heroTitle    = contenido.hero_titulo    || SITE.heroTitle;
  const heroSub      = contenido.hero_descripcion || SITE.heroSub;
  const aboutTitulo  = contenido.about_titulo   || "Formados por funcionarios. Para funcionarios.";
  const aboutTexto   = contenido.about_texto    || "";
  const siteName     = contenido.site_nombre    || SITE.name;
  const siteTagline  = contenido.site_tagline   || SITE.tagline;
  const planesData   = planes.length > 0 ? planes : SITE.plans;
  const statsData    = loaded ? [
    { val: stats.aspirantes?.replace(/\D/g,"") || "300", suf: "+", label: "Aspirantes activos" },
    { val: stats.supuestos?.replace(/\D/g,"")  || "150", suf: "+", label: "Supuestos disponibles" },
    { val: stats.satisfaccion?.replace(/\D/g,"") || "95", suf: "%", label: "Tasa de satisfacción" },
    { val: stats.simulacros || "12", suf: "", label: "Simulacros al año" },
  ] : SITE.stats;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ background: "#FFFFFF" }}>
      <NavBar scrolled={scrolled} links={{
        onHome: () => {},
        items: [
          { label: "Supuesto gratis", onClick: () => onNavigate("supuesto-gratis") },
          { label: "Tarifas", onClick: () => onNavigate("tarifas") },
          { label: "Cómo funciona", href: "#como-funciona" },
          { label: "Temario", href: "#temario" },
          { label: "Testimonios", href: "#testimonios" },
          { label: "Acceso plataforma", onClick: () => onNavigate("tarifas"), cta: true },
        ]
      }} />

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero-bg-text">IIPP</div>
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">Oposiciones · Instituciones Penitenciarias · España</div>
            <h1 className="hero-h1">{heroTitle}<br/><em>Supuestos Prácticos</em><br/>Reales</h1>
            <p className="hero-sub">{heroSub}</p>
            <div className="hero-btns">
              <a href="#" className="btn-gold" onClick={(e) => { e.preventDefault(); onNavigate("tarifas"); }}>{SITE.cta} →</a>
              <a href="#como-funciona" className="btn-ghost-w">Cómo funciona</a>
            </div>
          </div>
          <Reveal delay={0.2}>
            <div className="hero-card">
              <div className="hero-card-tag">Por qué elegirnos</div>
              {[["300+","Aspirantes activos en toda España"],["150+","Supuestos disponibles desde el primer día"],["95%","Tasa de satisfacción de nuestros alumnos"],["12","Simulacros de examen real al año"]].map(([n,l])=>(
                <div key={l} className="hero-stat"><div className="hero-stat-num">{n}</div><div className="hero-stat-label">{l}</div></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker"><div className="ticker-track">
        {[...Array(2)].map((_,ri)=>["Supuestos semanales","Resoluciones detalladas","Normativa actualizada","Simulacros reales","Instituciones Penitenciarias","Toda España","Aprueba con método"].map((t,i)=>(
          <span key={`${ri}-${i}`} className="ticker-item">{t} <span className="ticker-sep">✦</span> </span>
        )))}
      </div></div>

      {/* FEATURES */}
      <section className="sp" style={{ background:"#fff" }} id="temario">
        <Reveal>
          <div className="section-tag">¿Qué incluye?</div>
          <h2 className="section-title">Todo lo que <em>necesitas</em> para aprobar</h2>
        </Reveal>
        <div className="feat-grid">
          {SITE.features.map((f,i)=>(<Reveal key={i} delay={i*0.06}><div className="feat-item"><div className="feat-n">{f.num}</div><div className="feat-name">{f.title}</div><div className="feat-desc">{f.desc}</div></div></Reveal>))}
        </div>
      </section>

      {/* STATS */}
      <section className="stats-band">
        {statsData.map((s,i)=>(<div key={i} className="stat-item"><div className="stat-bar"/><StatBlock val={s.val} suf={s.suf} label={s.label}/></div>))}
      </section>

      {/* ABOUT */}
      <section className="about" id="temario-2">
        <div className="about-left">
          <Reveal><div><div className="about-left-tag">¿Quiénes somos?</div><h2 className="about-left-title">Formados por funcionarios.<br/>Para funcionarios.</h2></div></Reveal>
          <Reveal delay={0.2}><p className="about-left-quote">"El método que yo hubiera querido tener cuando empecé a opositar."</p></Reveal>
        </div>
        <div className="about-right">
          <Reveal delay={0.1}>
            <div className="section-tag" style={{ marginBottom:"20px" }}>Nuestra historia</div>
            <p>Somos una <strong>academia online especializada en la preparación de oposiciones a Instituciones Penitenciarias</strong>, creada y dirigida por funcionarios en activo que conocen de primera mano qué se evalúa y cómo.</p>
            <p>{aboutTexto || "Cada semana, más de 300 aspirantes confían en nuestro método: práctico, actualizado y centrado en lo que realmente importa en el examen."}</p>
            <div style={{display:"flex",gap:"12px",marginTop:"36px",flexWrap:"wrap"}}>
              <a href="#" style={{padding:"15px 32px",background:"var(--blue)",color:"#fff",fontWeight:700,fontSize:"15px",borderRadius:"3px",textDecoration:"none"}} onMouseOver={e=>e.currentTarget.style.background="var(--blue-d)"} onMouseOut={e=>e.currentTarget.style.background="var(--blue)"}>Conoce el método →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STEPS */}
      <section className="sp" style={{background:"#fff"}} id="como-funciona">
        <Reveal><div className="section-tag">¿Cómo funciona?</div><h2 className="section-title">Tu camino hacia <em>el aprobado</em></h2></Reveal>
        <div className="steps-grid">
          {SITE.steps.map((s,i)=>(<div key={i} className={`step-item ${activeStep===i?"on":""}`} style={{paddingLeft:i>0?"32px":0}} onMouseEnter={()=>setActiveStep(i)}><div className="step-r">{s.num}</div><div className="step-title">{s.title}</div><div className="step-desc">{s.desc}</div></div>))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-sec" id="tarifas">
        <Reveal><div><div className="cta-eyebrow">¿A qué esperas?</div><h2 className="cta-title">Empieza hoy.<br/>Aprueba este año.</h2></div></Reveal>
        <Reveal delay={0.15}><div>
          <p className="cta-desc">Da el paso y entrena con casos reales, resoluciones detalladas y un método avalado por funcionarios en activo.</p>
          <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
            <a href="#" className="btn-fill-inv" onClick={(e)=>{e.preventDefault();onNavigate("tarifas");}}>Ver tarifas →</a>
            <a href="#" className="btn-ghost-inv">Prueba gratis</a>
          </div>
        </div></Reveal>
      </section>

      {/* TESTIMONIOS */}
      <section className="sp" style={{background:"#fff"}} id="testimonios">
        <Reveal><div className="section-tag">Testimonios</div><h2 className="section-title">Lo que dicen <em>nuestros alumnos</em></h2></Reveal>
        <div className="testi-grid">
          {SITE.testimonials.map((t,i)=>(<Reveal key={i} delay={i*0.1}><div className="t-card">
            <div className="t-stars">{[...Array(5)].map((_,j)=>(<svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>))}</div>
            <p className="t-quote">"{t.text}"</p>
            <div className="t-author"><div className="t-av">{t.name.charAt(0)}</div><div><div className="t-name">{t.name}</div><div className="t-city">{t.city}</div></div></div>
          </div></Reveal>))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <Logo size={52}/><div className="f-name">{SITE.name}</div><div className="f-sub">{SITE.tagline}</div>
            <p className="f-desc">Formación online especializada en oposiciones a Instituciones Penitenciarias. Prepárate con casos reales y un método avalado por profesionales.</p>
            <div className="f-socials">{["FB","IG","YT","TK"].map(s=><a key={s} href="#" className="f-soc">{s}</a>)}</div>
          </div>
          <div><div className="f-col-title">Plataforma</div>{["Tarifas","Supuesto GRATIS","Cancelar suscripción","Acceso plataforma"].map(l=>(<a key={l} href="#" className="f-link" onClick={l==="Tarifas"?(e)=>{e.preventDefault();onNavigate("tarifas");}:undefined}>{l}</a>))}</div>
          <div><div className="f-col-title">Legal</div>{["Política de Privacidad","Aviso Legal","Política de Cookies","Condiciones generales"].map(l=>(<a key={l} href="#" className="f-link">{l}</a>))}</div>
        </div>
        <div className="footer-bottom">
          <span className="f-copy">© 2026 Preparador IIPP — Todos los derechos reservados</span>
          <a href="https://wa.me/34641198743" target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:"8px", color:"rgba(255,255,255,0.5)", textDecoration:"none", fontSize:"13px", fontWeight:500, transition:"color .2s" }}
            onMouseOver={e=>e.currentTarget.style.color="#25D366"}
            onMouseOut={e=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            641 198 743
          </a>
          <span className="f-copy">Hecho con ❤ para opositores</span>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SUPUESTO GRATIS PAGE
═══════════════════════════════════════════ */
const PDF_ID = "1ZSXSewL-ph2NCgeySL2EDQVKPOOzTT5c";
const PDF_EMBED = `https://drive.google.com/file/d/${PDF_ID}/preview`;
const PDF_DOWNLOAD = `https://drive.google.com/uc?export=download&id=${PDF_ID}`;

function SupuestoGratis({ onBack, onTarifas }) {
  const [pdfLoaded, setPdfLoaded] = useState(false);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "var(--body)" }}>
      <NavBar links={{
        onHome: onBack,
        items: [
          { label: "Inicio", onClick: onBack },
          { label: "Supuesto gratis" },
          { label: "Tarifas", onClick: onTarifas },
          { label: "↓ Descargar PDF", href: PDF_DOWNLOAD, download: true },
          { label: "Ver tarifas →", onClick: onTarifas, cta: true },
        ]
      }} />

      {/* HERO STRIP */}
      <div style={{ background: "linear-gradient(135deg, var(--blue-d), var(--blue))", padding: "128px 64px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "40px", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold-l)", fontWeight: 600, marginBottom: "12px" }}>Supuesto Práctico Gratuito</div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(28px,3vw,42px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-1px", marginBottom: "12px" }}>
            Prueba nuestro método<br/><em style={{ fontStyle: "italic", color: "var(--gold-l)" }}>sin compromiso</em>
          </h1>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.65)", fontWeight: 300, maxWidth: "480px", lineHeight: 1.6 }}>
            Accede a un supuesto práctico real de Instituciones Penitenciarias, con resolución detallada incluida. Sin registro, sin tarjeta.
          </p>
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {[["📄","PDF incluido"],["✅","Resolución detallada"],["⚖️","Caso real IIPP"]].map(([icon, label]) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", padding: "14px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>{icon}</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF VIEWER */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid var(--ink25)", overflow: "hidden", boxShadow: "0 4px 32px rgba(13,35,71,0.08)" }}>

          {/* Toolbar */}
          <div style={{ padding: "14px 24px", background: "var(--offwhite)", borderBottom: "1px solid var(--ink25)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57" }}/>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FEBC2E" }}/>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28C840" }}/>
              <span style={{ marginLeft: "8px", fontSize: "13px", color: "var(--ink60)", fontWeight: 500 }}>Supuesto Práctico — Preparador IIPP</span>
            </div>
            <a href={PDF_DOWNLOAD} download style={{ fontSize: "12px", color: "var(--blue)", fontWeight: 600, textDecoration: "none" }}>↓ Descargar</a>
          </div>

          {/* iFrame visor */}
          {!pdfLoaded && (
            <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink60)", fontSize: "14px" }}>
              Cargando supuesto...
            </div>
          )}
          <iframe
            src={PDF_EMBED}
            style={{ width: "100%", height: "900px", border: "none", display: pdfLoaded ? "block" : "none" }}
            allow="autoplay"
            onLoad={() => setPdfLoaded(true)}
            title="Supuesto Práctico IIPP"
          />
        </div>

        {/* CTA debajo del PDF */}
        <div style={{ marginTop: "48px", background: "linear-gradient(135deg, var(--blue-d), var(--blue))", borderRadius: "12px", padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold-l)", fontWeight: 600, marginBottom: "12px" }}>¿Te ha gustado?</div>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: "10px" }}>
              Material para estudiar y practicar cada semana
            </h2>
            <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.6)", fontWeight: 300 }}>
              Suscríbete desde 49€/mes. Sin permanencia. Cancela cuando quieras.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button onClick={onTarifas} style={{ padding: "16px 36px", background: "var(--gold)", color: "var(--blue-d)", fontWeight: 700, fontSize: "15px", border: "none", borderRadius: "3px", cursor: "pointer", transition: "background .2s, transform .2s" }}
              onMouseOver={e => { e.currentTarget.style.background = "var(--gold-l)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { e.currentTarget.style.background = "var(--gold)"; e.currentTarget.style.transform = "none"; }}
            >Ver tarifas →</button>
            <button onClick={onBack} style={{ padding: "14px 32px", background: "transparent", color: "rgba(255,255,255,0.7)", fontWeight: 500, fontSize: "15px", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: "3px", cursor: "pointer", transition: "border-color .2s, color .2s" }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >Volver al inicio</button>
          </div>
        </div>
      </div>

      {/* FOOTER mini */}
      <div style={{ background: "var(--blue-d)", padding: "24px 64px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"12px", marginTop: "40px" }}>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>© 2026 Preparador IIPP — Todos los derechos reservados</p>
        <a href="https://wa.me/34641198743" target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:"8px", color:"rgba(255,255,255,0.5)", textDecoration:"none", fontSize:"13px", fontWeight:500 }}
          onMouseOver={e=>e.currentTarget.style.color="#25D366"}
          onMouseOut={e=>e.currentTarget.style.color="rgba(255,255,255,0.5)"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          641 198 743
        </a>
      </div>
    </div>
  );
}

/* ── Botón flotante WhatsApp ── */
function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(false);
  return (
    <a
      href="https://wa.me/34641198743"
      target="_blank"
      rel="noreferrer"
      onMouseOver={() => setTooltip(true)}
      onMouseOut={() => setTooltip(false)}
      style={{
        position: "fixed", bottom: "28px", right: "28px", zIndex: 999,
        width: "58px", height: "58px", borderRadius: "50%",
        background: "#25D366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        transition: "transform .2s, box-shadow .2s",
        textDecoration: "none",
      }}
      onFocus={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(37,211,102,0.55)"; }}
      onBlur={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)"; }}
    >
      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "absolute", bottom: "68px", right: 0,
          background: "#1A1A1A", color: "#fff",
          fontSize: "13px", fontWeight: 500, fontFamily: "var(--body)",
          padding: "8px 14px", borderRadius: "8px", whiteSpace: "nowrap",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}>
          💬 641 198 743
          <div style={{ position: "absolute", bottom: "-5px", right: "22px", width: "10px", height: "10px", background: "#1A1A1A", transform: "rotate(45deg)" }}/>
        </div>
      )}
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

/* ═══════════════════════════════════════════
   APP ROUTER
═══════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div style={{ fontFamily: "var(--body)", color: "var(--ink)", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;400;500;600&display=swap');
        :root{
          --serif:'DM Serif Display',Georgia,serif;--body:'DM Sans','Segoe UI',sans-serif;
          --blue:#1E3A6E;--blue-d:#0D2347;--blue-l:#2A4F96;--blue-dim:rgba(30,58,110,.08);--blue-mid:rgba(30,58,110,.15);
          --gold:#C9A020;--gold-l:#E8C84A;--gold-dim:rgba(201,160,32,.15);--green:#2A7A30;
          --white:#FFFFFF;--offwhite:#F5F7FA;--offwhite2:#EBF0F8;
          --ink:#0D1B35;--ink60:rgba(13,27,53,.6);--ink25:rgba(13,27,53,.15);--ink08:rgba(13,27,53,.05);
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}

        .nav{position:fixed;top:0;left:0;right:0;z-index:10000;height:88px;padding:0 64px;display:flex;align-items:center;justify-content:space-between;transition:background .35s,box-shadow .35s;background:rgba(255,255,255,0);}
        .nav.down{background:rgba(255,255,255,.98);backdrop-filter:blur(16px);box-shadow:0 1px 0 var(--ink25);}
        .nav-brand{display:flex;align-items:center;gap:16px;text-decoration:none;}
        .nav-name{font-family:var(--serif);font-size:22px;color:var(--blue-d);line-height:1.05;letter-spacing:-.3px;}
        .nav-sub{font-size:10px;color:var(--gold);letter-spacing:2px;text-transform:uppercase;font-weight:600;margin-top:3px;}
        .nav-links{display:flex;gap:28px;align-items:center;list-style:none;}
        .nav-links a{font-size:14px;font-weight:500;color:var(--ink60);text-decoration:none;transition:color .2s;}
        .nav-links a:hover{color:var(--blue);}
        .nav-cta{padding:11px 26px;background:var(--blue);color:#fff;font-size:13px;font-weight:700;border:none;border-radius:3px;cursor:pointer;text-decoration:none;transition:background .2s;}
        .nav-cta:hover{background:var(--blue-d);}

        .hero{position:relative;min-height:100vh;background:#fff;display:flex;align-items:center;overflow:hidden;}
        .hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%231E3A6E' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;}
        .hero-bg-text{position:absolute;right:-80px;bottom:-60px;font-family:var(--serif);font-size:clamp(260px,30vw,420px);font-weight:900;color:rgba(30,58,110,.04);line-height:1;pointer-events:none;user-select:none;letter-spacing:-10px;}
        .hero-inner{position:relative;z-index:2;width:100%;padding:140px 80px 100px;display:grid;grid-template-columns:1.3fr 1fr;gap:72px;align-items:center;}
        .hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:32px;}
        .hero-eyebrow::before{content:'';width:32px;height:1px;background:var(--gold);}
        .hero-h1{font-family:var(--serif);font-size:clamp(52px,6.5vw,96px);font-weight:900;color:var(--blue-d);line-height:1;letter-spacing:-2.5px;margin-bottom:32px;}
        .hero-h1 em{font-style:italic;color:var(--blue);}
        .hero-sub{font-size:clamp(16px,1.5vw,20px);color:var(--ink60);line-height:1.7;font-weight:300;margin-bottom:48px;max-width:580px;}
        .hero-btns{display:flex;gap:14px;flex-wrap:wrap;}

        .btn-gold{padding:17px 40px;background:var(--blue);color:#fff;font-size:15px;font-weight:700;border:none;border-radius:3px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 24px rgba(30,58,110,.2);transition:background .2s,transform .2s;}
        .btn-gold:hover{background:var(--blue-d);transform:translateY(-2px);}
        .btn-ghost-w{padding:15px 36px;background:transparent;color:var(--blue);font-size:15px;font-weight:500;border:1.5px solid var(--blue);border-radius:3px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:background .2s,color .2s;}
        .btn-ghost-w:hover{background:var(--blue);color:#fff;}

        .hero-card{background:var(--blue-d);border:1px solid var(--blue);border-radius:14px;padding:44px 40px;}
        .hero-card-tag{font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold-l);font-weight:600;margin-bottom:28px;}
        .hero-stat{display:flex;align-items:center;gap:20px;padding:20px 0;border-bottom:1px solid rgba(255,255,255,.1);}
        .hero-stat:last-child{border-bottom:none;}
        .hero-stat-num{font-family:var(--serif);font-size:40px;font-weight:900;color:var(--gold-l);letter-spacing:-1.5px;min-width:88px;line-height:1;}
        .hero-stat-label{font-size:15px;color:rgba(255,255,255,.65);font-weight:300;line-height:1.4;}

        .ticker{background:var(--gold);padding:13px 0;overflow:hidden;white-space:nowrap;}
        .ticker-track{display:inline-flex;gap:40px;animation:tick 28s linear infinite;}
        @keyframes tick{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .ticker-item{font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--blue-d);}
        .ticker-sep{color:rgba(13,35,71,.35);}

        .sp{padding:110px 80px;}
        .section-tag{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--blue);font-weight:600;margin-bottom:14px;}
        .section-title{font-family:var(--serif);font-size:clamp(36px,4vw,56px);font-weight:900;color:var(--ink);line-height:1.05;letter-spacing:-2px;margin-bottom:64px;}
        .section-title em{font-style:italic;color:var(--blue);}

        .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--ink25);}
        .feat-item{padding:44px 36px;border-right:1px solid var(--ink25);border-bottom:1px solid var(--ink25);transition:background .25s;}
        .feat-item:nth-child(3n){border-right:none;}
        .feat-item:hover{background:var(--offwhite2);}
        .feat-n{font-family:var(--serif);font-size:13px;font-style:italic;color:var(--gold);margin-bottom:18px;}
        .feat-name{font-family:var(--serif);font-size:21px;font-weight:700;color:var(--ink);margin-bottom:12px;line-height:1.2;}
        .feat-desc{font-size:14px;color:var(--ink60);line-height:1.65;font-weight:300;}

        .stats-band{background:#fff;border-top:2px solid var(--gold);border-bottom:2px solid var(--gold);padding:80px;display:grid;grid-template-columns:repeat(4,1fr);}
        .stat-item{padding:32px;border-right:1px solid var(--ink25);}
        .stat-item:last-child{border-right:none;}
        .stat-bar{width:28px;height:2px;background:var(--gold);margin-bottom:20px;}

        .about{display:grid;grid-template-columns:1fr 1fr;min-height:560px;}
        .about-left{background:var(--offwhite);padding:80px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;border-right:1px solid var(--ink25);}
        .about-left::before{content:'IIPP';position:absolute;top:-40px;right:-30px;font-family:var(--serif);font-size:240px;font-weight:900;color:rgba(30,58,110,.05);line-height:1;pointer-events:none;}
        .about-left-tag{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--blue);font-weight:600;}
        .about-left-title{font-family:var(--serif);font-size:clamp(30px,2.8vw,44px);font-weight:900;color:var(--blue-d);line-height:1.1;margin-top:16px;position:relative;z-index:1;}
        .about-left-quote{font-family:var(--serif);font-size:16px;font-style:italic;color:var(--ink60);border-left:2px solid var(--gold);padding-left:18px;position:relative;z-index:1;}
        .about-right{background:#fff;padding:80px;display:flex;flex-direction:column;justify-content:center;}
        .about-right p{font-size:17px;color:var(--ink60);line-height:1.8;font-weight:300;margin-bottom:24px;}
        .about-right strong{color:var(--blue);font-weight:600;}

        .steps-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:2px solid var(--blue);margin-top:56px;}
        .step-item{padding:44px 32px 44px 0;border-right:1px solid var(--ink25);cursor:pointer;transition:background .2s;position:relative;}
        .step-item:last-child{border-right:none;}
        .step-item.on::after{content:'';position:absolute;top:-2px;left:0;right:0;height:3px;background:var(--gold);}
        .step-item:hover{background:var(--offwhite2);}
        .step-r{font-family:var(--serif);font-size:14px;font-style:italic;color:var(--blue);margin-bottom:18px;}
        .step-title{font-family:var(--serif);font-size:22px;font-weight:700;color:var(--ink);margin-bottom:12px;line-height:1.1;}
        .step-desc{font-size:14px;color:var(--ink60);line-height:1.65;font-weight:300;}

        .cta-sec{background:#fff;border-top:3px solid var(--gold);border-bottom:3px solid var(--gold);padding:100px 80px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;position:relative;overflow:hidden;}
        .cta-sec::after{content:'';position:absolute;right:-100px;top:-100px;width:400px;height:400px;border-radius:50%;background:rgba(30,58,110,.03);pointer-events:none;}
        .cta-eyebrow{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:18px;}
        .cta-title{font-family:var(--serif);font-size:clamp(34px,3.5vw,52px);font-weight:900;color:var(--blue-d);line-height:1.05;letter-spacing:-2px;}
        .cta-desc{font-size:17px;color:var(--ink60);line-height:1.75;font-weight:300;margin-bottom:36px;}
        .btn-fill-inv{padding:17px 40px;background:var(--blue);color:#fff;font-size:15px;font-weight:700;border:none;border-radius:3px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:background .2s,transform .2s;}
        .btn-fill-inv:hover{background:var(--blue-d);transform:translateY(-1px);}
        .btn-ghost-inv{padding:15px 36px;background:transparent;color:var(--blue);font-size:15px;font-weight:500;border:1.5px solid var(--blue);border-radius:3px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:background .2s,color .2s;}
        .btn-ghost-inv:hover{background:var(--blue);color:#fff;}

        .testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;margin-top:56px;}
        .t-card{background:#fff;padding:48px 40px;transition:background .25s;border:1px solid var(--ink25);}
        .t-card:hover{background:var(--offwhite2);border-color:var(--blue);}
        .t-stars{display:flex;gap:3px;margin-bottom:22px;}
        .t-quote{font-family:var(--serif);font-size:clamp(17px,1.6vw,20px);font-style:italic;color:var(--ink);line-height:1.5;margin-bottom:28px;}
        .t-author{display:flex;align-items:center;gap:14px;}
        .t-av{width:48px;height:48px;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:20px;font-style:italic;color:#fff;font-weight:700;flex-shrink:0;}
        .t-name{font-size:14px;font-weight:600;color:var(--ink);}
        .t-city{font-size:12px;color:var(--ink60);letter-spacing:1px;text-transform:uppercase;margin-top:3px;}

        .footer{background:var(--blue-d);padding:80px 80px 40px;}
        .footer-top{display:grid;grid-template-columns:2.5fr 1fr 1fr;gap:64px;padding-bottom:56px;border-bottom:1px solid rgba(255,255,255,.07);}
        .f-name{font-family:var(--serif);font-size:20px;color:#fff;margin-top:14px;}
        .f-sub{font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);margin-top:4px;}
        .f-desc{font-size:14px;color:rgba(255,255,255,.38);line-height:1.7;margin-top:18px;max-width:300px;font-weight:300;}
        .f-socials{display:flex;gap:8px;margin-top:24px;}
        .f-soc{width:36px;height:36px;border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.35);font-size:11px;font-weight:600;text-decoration:none;transition:border-color .2s,color .2s;}
        .f-soc:hover{border-color:var(--gold);color:var(--gold);}
        .f-col-title{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.28);font-weight:600;margin-bottom:22px;}
        .f-link{display:block;font-size:14px;color:rgba(255,255,255,.42);text-decoration:none;margin-bottom:11px;transition:color .2s;}
        .f-link:hover{color:#fff;}
        .footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:28px;}
        .f-copy{font-size:12px;color:rgba(255,255,255,.22);}

        .mob-btn{display:none;background:none;border:none;cursor:pointer;padding:6px;}
        .mob-btn span{display:block;width:22px;height:1.5px;background:var(--blue-d);margin:5px 0;transition:.3s;}

        /* ── PRICING PAGE ── */
        .pricing-header{border-bottom:1px solid var(--ink25);padding:20px 64px;display:flex;align-items:center;justify-content:space-between;}
        .pricing-grid{max-width:1200px;margin:0 auto;padding:40px 40px 80px;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;align-items:start;}
        .pricing-hero{text-align:center;padding:80px 40px 20px;}

        @media(max-width:1100px){.sp{padding:80px 40px;}.hero-inner{padding:120px 40px 80px;}.stats-band,.cta-sec,.footer{padding-left:40px;padding-right:40px;}.about-left,.about-right{padding:60px 40px;}.pricing-grid{grid-template-columns:repeat(2,1fr);padding:40px 32px 60px;}}
        @media(max-width:900px){.hero-inner{grid-template-columns:1fr;gap:48px;}.about{grid-template-columns:1fr;}.cta-sec{grid-template-columns:1fr;gap:40px;}.feat-grid{grid-template-columns:repeat(2,1fr);}.feat-item:nth-child(3n){border-right:1px solid var(--ink25);}.feat-item:nth-child(2n){border-right:none;}.steps-grid{grid-template-columns:repeat(2,1fr);}.testi-grid{grid-template-columns:1fr;}.stats-band{grid-template-columns:repeat(2,1fr);}.footer-top{grid-template-columns:1fr 1fr;}}
        @media(max-width:768px){.nav{padding:0 20px;height:76px;}.nav-name{font-size:16px;}.nav-links{display:none;}.nav-links.open{display:flex;flex-direction:column;position:fixed;top:0;left:0;right:0;bottom:0;background:#FFFFFF;padding:80px 24px 16px;gap:0;align-items:flex-start;z-index:9999;justify-content:center;}.nav-links.open a{font-family:var(--serif);font-size:18px;font-weight:700;color:var(--ink)!important;padding:10px 0;border-bottom:1px solid var(--ink25);width:100%;display:block;text-decoration:none;line-height:1.2;}.nav-links.open li{width:100%;list-style:none;}.nav-links.open .nav-cta{font-family:var(--body);font-size:15px;background:var(--blue);color:#fff!important;padding:12px 24px;border-radius:4px;margin-top:12px;text-align:center;border-bottom:none;display:block;}.mob-btn{display:block;z-index:10000;position:relative;}.sp{padding:70px 24px;}.hero-inner{padding:100px 24px 70px;}.about-left,.about-right{padding:50px 24px;}.cta-sec,.stats-band,.footer{padding:70px 24px;}.footer-top{grid-template-columns:1fr;gap:36px;}.feat-grid{grid-template-columns:1fr;}.steps-grid{grid-template-columns:1fr;}.stats-band{grid-template-columns:repeat(2,1fr);}.stat-item{border-right:none;border-bottom:1px solid var(--ink25);}.pricing-grid{grid-template-columns:1fr;padding:24px 20px 60px;gap:28px;}.pricing-header{padding:16px 20px;flex-wrap:wrap;gap:12px;}.pricing-hero{padding:60px 20px 16px;}}
      `}</style>

      {page === "home"            && <HomePage onNavigate={navigate} />}
      {page === "tarifas"         && <PricingPage onBack={() => navigate("home")} onSupuestoGratis={() => navigate("supuesto-gratis")} plans={SITE.plans} />}
      {page === "supuesto-gratis" && <SupuestoGratis onBack={() => navigate("home")} onTarifas={() => navigate("tarifas")} />}
      <WhatsAppButton />
    </div>
  );
}