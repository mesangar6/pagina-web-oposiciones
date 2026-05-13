import { useState, useEffect } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://vsagqtaqnpjxedzisxam.supabase.co",
  "sb_publishable_E-Jv0XqC6qmGDgGCnfvg_A_mnPYxNGG"
);

/* ── iconos SVG simples ── */
const Icon = {
  dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>,
  alumnos:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  supuestos: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  contenido: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  planes:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  logout:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  check:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
  plus:      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit:      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
  eye:       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
};

/* ════════════════════════════
   LOGIN
════════════════════════════ */
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) setError("Email o contraseña incorrectos");
    else onLogin();
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F5F7FA", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--f)" }}>
      <div style={{ background: "#fff", borderRadius: "12px", padding: "48px 40px", width: "100%", maxWidth: "420px", boxShadow: "0 4px 32px rgba(13,35,71,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ width: "56px", height: "56px", background: "var(--blue)", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "24px" }}>🛡️</div>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "26px", fontWeight: 900, color: "var(--blue-d)", marginBottom: "6px" }}>Preparador IIPP</h1>
          <p style={{ fontSize: "14px", color: "var(--ink60)" }}>Panel de Administración</p>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Email</label>
            <input style={inputStyle} type="email" placeholder="admin@preparadoriipp.com" value={email} onChange={e => setEmail(e.target.value)} required/>
          </div>
          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Contraseña</label>
            <input style={inputStyle} type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} required/>
          </div>
          {error && <div style={{ background: "#FEE2E2", color: "#DC2626", padding: "10px 14px", borderRadius: "6px", fontSize: "13px", marginBottom: "16px" }}>{error}</div>}
          <button type="submit" style={{ ...btnPrimary, width: "100%", justifyContent: "center" }} disabled={loading}>
            {loading ? "Entrando..." : "Entrar al panel"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ════════════════════════════
   DASHBOARD
════════════════════════════ */
function Dashboard({ stats }) {
  const cards = [
    { label: "Alumnos activos",       value: stats.alumnosActivos,   color: "#1E3A6E", bg: "#EBF0F8" },
    { label: "Ingresos este mes",     value: `${stats.ingresosMes}€`, color: "#2A7A30", bg: "#ECFDF5" },
    { label: "Suscripciones totales", value: stats.totalAlumnos,     color: "#C9A020", bg: "#FFFBEB" },
    { label: "Supuestos publicados",  value: stats.supuestosPublicados, color: "#7C3AED", bg: "#F5F3FF" },
  ];

  return (
    <div>
      <h2 style={pageTitle}>Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", marginBottom: "40px" }}>
        {cards.map((c, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: "12px", padding: "28px 24px", boxShadow: "0 1px 8px rgba(13,35,71,0.07)", borderTop: `3px solid ${c.color}` }}>
            <div style={{ fontSize: "32px", fontWeight: 900, color: c.color, fontFamily: "var(--serif)", letterSpacing: "-1px" }}>{c.value ?? "—"}</div>
            <div style={{ fontSize: "13px", color: "var(--ink60)", marginTop: "6px", fontWeight: 500 }}>{c.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "28px", boxShadow: "0 1px 8px rgba(13,35,71,0.07)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--blue-d)", marginBottom: "20px" }}>Distribución por plan</h3>
          {stats.porPlan?.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ fontSize: "13px", color: "var(--ink60)", width: "100px" }}>{p.plan}</div>
              <div style={{ flex: 1, height: "8px", background: "#EBF0F8", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${p.pct}%`, background: "var(--blue)", borderRadius: "4px", transition: "width 1s ease" }}/>
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--blue-d)", width: "32px", textAlign: "right" }}>{p.count}</div>
            </div>
          ))}
          {(!stats.porPlan || stats.porPlan.length === 0) && <p style={{ fontSize: "13px", color: "var(--ink60)" }}>Sin datos todavía</p>}
        </div>

        <div style={{ background: "#fff", borderRadius: "12px", padding: "28px", boxShadow: "0 1px 8px rgba(13,35,71,0.07)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--blue-d)", marginBottom: "20px" }}>Últimos alumnos</h3>
          {stats.ultimosAlumnos?.map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid #F0F4F8" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px", fontWeight: 700, flexShrink: 0 }}>{a.nombre?.charAt(0) || "?"}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>{a.nombre}</div>
                <div style={{ fontSize: "12px", color: "var(--ink60)" }}>{a.email}</div>
              </div>
              <span style={{ ...badge(a.estado === "activo" ? "green" : "red") }}>{a.estado}</span>
            </div>
          ))}
          {(!stats.ultimosAlumnos || stats.ultimosAlumnos.length === 0) && <p style={{ fontSize: "13px", color: "var(--ink60)" }}>Sin alumnos todavía</p>}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════
   ALUMNOS
════════════════════════════ */
function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => { fetchAlumnos(); }, []);

  const fetchAlumnos = async () => {
    setLoading(true);
    const { data } = await supabase.from("alumnos").select("*").order("created_at", { ascending: false });
    setAlumnos(data || []);
    setLoading(false);
  };

  const filtrados = alumnos.filter(a => {
    const matchSearch = a.nombre?.toLowerCase().includes(search.toLowerCase()) || a.email?.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filtroEstado === "todos" || a.estado === filtroEstado;
    return matchSearch && matchEstado;
  });

  const guardar = async () => {
    if (form.id) {
      await supabase.from("alumnos").update(form).eq("id", form.id);
    } else {
      await supabase.from("alumnos").insert(form);
    }
    setModal(null); fetchAlumnos();
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar este alumno?")) return;
    await supabase.from("alumnos").delete().eq("id", id);
    fetchAlumnos();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={pageTitle}>Alumnos</h2>
        <button style={btnPrimary} onClick={() => { setForm({}); setModal("alumno"); }}>{Icon.plus} Nuevo alumno</button>
      </div>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input style={{ ...inputStyle, flex: 1, marginBottom: 0 }} placeholder="Buscar por nombre o email..." value={search} onChange={e => setSearch(e.target.value)}/>
        <select style={{ ...inputStyle, marginBottom: 0, width: "160px" }} value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="activo">Activos</option>
          <option value="cancelado">Cancelados</option>
          <option value="pendiente">Pendientes</option>
        </select>
      </div>

      <div style={tableContainer}>
        <table style={tableStyle}>
          <thead><tr style={theadRow}>
            {["Nombre","Email","Plan","Estado","CCAA","Fecha inicio","Acciones"].map(h => <th key={h} style={thStyle}>{h}</th>)}
          </tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--ink60)" }}>Cargando...</td></tr>
            ) : filtrados.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--ink60)" }}>No hay alumnos</td></tr>
            ) : filtrados.map(a => (
              <tr key={a.id} style={trStyle}>
                <td style={tdStyle}><strong>{a.nombre}</strong></td>
                <td style={tdStyle}>{a.email}</td>
                <td style={tdStyle}><span style={badge("blue")}>{a.plan || "—"}</span></td>
                <td style={tdStyle}><span style={badge(a.estado === "activo" ? "green" : a.estado === "cancelado" ? "red" : "yellow")}>{a.estado}</span></td>
                <td style={tdStyle}>{a.ccaa || "—"}</td>
                <td style={tdStyle}>{a.fecha_inicio ? new Date(a.fecha_inicio).toLocaleDateString("es-ES") : "—"}</td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button style={btnIcon} onClick={() => { setForm(a); setModal("alumno"); }}>{Icon.edit}</button>
                    <button style={{ ...btnIcon, color: "#DC2626" }} onClick={() => eliminar(a.id)}>{Icon.trash}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal === "alumno" && (
        <Modal title={form.id ? "Editar alumno" : "Nuevo alumno"} onClose={() => setModal(null)} onSave={guardar}>
          <div style={formGrid}>
            <Field label="Nombre completo" value={form.nombre || ""} onChange={v => setForm({...form, nombre: v})}/>
            <Field label="Email" type="email" value={form.email || ""} onChange={v => setForm({...form, email: v})}/>
            <Field label="Teléfono" value={form.telefono || ""} onChange={v => setForm({...form, telefono: v})}/>
            <Field label="DNI" value={form.dni || ""} onChange={v => setForm({...form, dni: v})}/>
            <SelectField label="Plan" value={form.plan || ""} onChange={v => setForm({...form, plan: v})} options={["mensual","trimestral","semestral","anual"]}/>
            <SelectField label="Estado" value={form.estado || "activo"} onChange={v => setForm({...form, estado: v})} options={["activo","cancelado","pendiente"]}/>
            <Field label="Comunidad Autónoma" value={form.ccaa || ""} onChange={v => setForm({...form, ccaa: v})}/>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ════════════════════════════
   SUPUESTOS
════════════════════════════ */
function Supuestos() {
  const [supuestos, setSupuestos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => { fetchSupuestos(); }, []);

  const fetchSupuestos = async () => {
    setLoading(true);
    const { data } = await supabase.from("supuestos").select("*").order("created_at", { ascending: false });
    setSupuestos(data || []);
    setLoading(false);
  };

  const guardar = async () => {
    if (form.id) await supabase.from("supuestos").update(form).eq("id", form.id);
    else await supabase.from("supuestos").insert(form);
    setModal(null); fetchSupuestos();
  };

  const eliminar = async (id) => {
    if (!confirm("¿Eliminar este supuesto?")) return;
    await supabase.from("supuestos").delete().eq("id", id);
    fetchSupuestos();
  };

  const togglePublicado = async (s) => {
    await supabase.from("supuestos").update({ publicado: !s.publicado }).eq("id", s.id);
    fetchSupuestos();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={pageTitle}>Supuestos Prácticos</h2>
        <button style={btnPrimary} onClick={() => { setForm({ publicado: false }); setModal("supuesto"); }}>{Icon.plus} Nuevo supuesto</button>
      </div>

      <div style={tableContainer}>
        <table style={tableStyle}>
          <thead><tr style={theadRow}>
            {["Título","Categoría","Semana","Estado","PDF","Resolución","Acciones"].map(h => <th key={h} style={thStyle}>{h}</th>)}
          </tr></thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--ink60)" }}>Cargando...</td></tr>
            ) : supuestos.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "var(--ink60)" }}>No hay supuestos todavía</td></tr>
            ) : supuestos.map(s => (
              <tr key={s.id} style={trStyle}>
                <td style={tdStyle}><strong>{s.titulo}</strong><br/><span style={{ fontSize: "12px", color: "var(--ink60)" }}>{s.descripcion?.substring(0,60)}...</span></td>
                <td style={tdStyle}><span style={badge("blue")}>{s.categoria || "—"}</span></td>
                <td style={tdStyle}>Sem. {s.semana || "—"}</td>
                <td style={tdStyle}>
                  <button style={{ ...badge(s.publicado ? "green" : "yellow"), border: "none", cursor: "pointer" }} onClick={() => togglePublicado(s)}>
                    {s.publicado ? "Publicado" : "Borrador"}
                  </button>
                </td>
                <td style={tdStyle}>{s.url_pdf ? <a href={s.url_pdf} target="_blank" rel="noreferrer" style={{ color: "var(--blue)" }}>Ver PDF</a> : "—"}</td>
                <td style={tdStyle}>{s.url_resolucion ? <a href={s.url_resolucion} target="_blank" rel="noreferrer" style={{ color: "var(--blue)" }}>Ver</a> : "—"}</td>
                <td style={tdStyle}>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button style={btnIcon} onClick={() => { setForm(s); setModal("supuesto"); }}>{Icon.edit}</button>
                    <button style={{ ...btnIcon, color: "#DC2626" }} onClick={() => eliminar(s.id)}>{Icon.trash}</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal === "supuesto" && (
        <Modal title={form.id ? "Editar supuesto" : "Nuevo supuesto"} onClose={() => setModal(null)} onSave={guardar}>
          <div style={formGrid}>
            <Field label="Título" value={form.titulo || ""} onChange={v => setForm({...form, titulo: v})} full/>
            <Field label="Descripción" value={form.descripcion || ""} onChange={v => setForm({...form, descripcion: v})} full multiline/>
            <SelectField label="Categoría" value={form.categoria || ""} onChange={v => setForm({...form, categoria: v})} options={["laboral","penal","seguridad_social","administrativo","otro"]}/>
            <Field label="Semana" type="number" value={form.semana || ""} onChange={v => setForm({...form, semana: parseInt(v)})}/>
            <Field label="URL del PDF" value={form.url_pdf || ""} onChange={v => setForm({...form, url_pdf: v})} full/>
            <Field label="URL de la resolución" value={form.url_resolucion || ""} onChange={v => setForm({...form, url_resolucion: v})} full/>
            <div style={{ gridColumn: "1/-1", display: "flex", alignItems: "center", gap: "10px" }}>
              <input type="checkbox" id="publicado" checked={form.publicado || false} onChange={e => setForm({...form, publicado: e.target.checked})} style={{ width: "16px", height: "16px" }}/>
              <label htmlFor="publicado" style={{ fontSize: "14px", color: "var(--ink)", fontWeight: 500 }}>Publicar supuesto</label>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ════════════════════════════
   CONTENIDO WEB
════════════════════════════ */
function ContenidoWeb() {
  const [contenido, setContenido] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(null);

  useEffect(() => { fetchContenido(); }, []);

  const fetchContenido = async () => {
    setLoading(true);
    const { data } = await supabase.from("contenido_web").select("*").order("clave");
    setContenido(data || []);
    setLoading(false);
  };

  const guardar = async (item) => {
    setSaving(true);
    await supabase.from("contenido_web").update({ valor: item.valor, updated_at: new Date().toISOString() }).eq("id", item.id);
    setEditando(null); setSaving(false);
    setOk(item.id); setTimeout(() => setOk(null), 2000);
    fetchContenido();
  };

  const grupos = {
    "Hero": contenido.filter(c => c.clave.startsWith("hero")),
    "Estadísticas": contenido.filter(c => c.clave.startsWith("stats")),
    "Quiénes somos": contenido.filter(c => c.clave.startsWith("about")),
  };

  return (
    <div>
      <h2 style={pageTitle}>Contenido de la Web</h2>
      <p style={{ fontSize: "14px", color: "var(--ink60)", marginBottom: "32px" }}>Edita los textos que aparecen en la página web. Los cambios se guardan en la base de datos.</p>

      {loading ? <div style={{ textAlign: "center", padding: "40px", color: "var(--ink60)" }}>Cargando...</div> : (
        Object.entries(grupos).map(([grupo, items]) => items.length > 0 && (
          <div key={grupo} style={{ background: "#fff", borderRadius: "12px", padding: "28px", boxShadow: "0 1px 8px rgba(13,35,71,0.07)", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--blue-d)", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid #EBF0F8" }}>{grupo}</h3>
            {items.map(item => (
              <div key={item.id} style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>{item.descripcion || item.clave}</label>
                  {ok === item.id && <span style={{ fontSize: "12px", color: "#2A7A30", fontWeight: 600 }}>✓ Guardado</span>}
                </div>
                {editando === item.id ? (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input style={{ ...inputStyle, flex: 1, marginBottom: 0 }} value={item.valor}
                      onChange={e => setContenido(contenido.map(c => c.id === item.id ? {...c, valor: e.target.value} : c))}/>
                    <button style={btnPrimary} onClick={() => guardar(item)} disabled={saving}>Guardar</button>
                    <button style={btnSecondary} onClick={() => setEditando(null)}>Cancelar</button>
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <div style={{ flex: 1, padding: "10px 14px", background: "#F5F7FA", borderRadius: "6px", fontSize: "14px", color: "var(--ink)", border: "1px solid #E2E8F0" }}>{item.valor}</div>
                    <button style={btnIcon} onClick={() => setEditando(item.id)}>{Icon.edit}</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

/* ════════════════════════════
   PLANES
════════════════════════════ */
function Planes() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(null);

  useEffect(() => { fetchPlanes(); }, []);

  const fetchPlanes = async () => {
    setLoading(true);
    const { data } = await supabase.from("planes").select("*").order("precio");
    setPlanes(data || []);
    setLoading(false);
  };

  const guardar = async (plan) => {
    await supabase.from("planes").update({ ...plan, updated_at: new Date().toISOString() }).eq("id", plan.id);
    setEditando(null); fetchPlanes();
  };

  return (
    <div>
      <h2 style={pageTitle}>Planes y Precios</h2>
      <p style={{ fontSize: "14px", color: "var(--ink60)", marginBottom: "32px" }}>Modifica los precios de cada plan de suscripción.</p>

      {loading ? <div style={{ textAlign: "center", padding: "40px", color: "var(--ink60)" }}>Cargando...</div> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "20px" }}>
          {planes.map(plan => (
            <div key={plan.id} style={{ background: "#fff", borderRadius: "12px", padding: "28px", boxShadow: "0 1px 8px rgba(13,35,71,0.07)", border: editando === plan.id ? "2px solid var(--blue)" : "1px solid #E2E8F0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 700, color: "var(--blue-d)" }}>{plan.nombre}</h3>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  <span style={badge(plan.activo ? "green" : "red")}>{plan.activo ? "Activo" : "Inactivo"}</span>
                  <button style={btnIcon} onClick={() => setEditando(editando === plan.id ? null : plan.id)}>{Icon.edit}</button>
                </div>
              </div>

              {editando === plan.id ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <Field label="Precio total (€)" type="number" value={plan.precio} onChange={v => setPlanes(planes.map(p => p.id === plan.id ? {...p, precio: parseInt(v)} : p))}/>
                  <Field label="Precio original/tachado (€)" type="number" value={plan.precio_original || ""} onChange={v => setPlanes(planes.map(p => p.id === plan.id ? {...p, precio_original: parseInt(v)} : p))}/>
                  <Field label="Precio por mes (€)" type="number" value={plan.precio_mes} onChange={v => setPlanes(planes.map(p => p.id === plan.id ? {...p, precio_mes: parseInt(v)} : p))}/>
                  <Field label="Periodo" value={plan.periodo} onChange={v => setPlanes(planes.map(p => p.id === plan.id ? {...p, periodo: v} : p))}/>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button style={btnPrimary} onClick={() => guardar(plan)}>Guardar cambios</button>
                    <button style={btnSecondary} onClick={() => setEditando(null)}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: "40px", fontWeight: 900, fontFamily: "var(--serif)", color: "var(--blue-d)", letterSpacing: "-2px" }}>{plan.precio}€</div>
                  <div style={{ fontSize: "14px", color: "var(--ink60)", marginBottom: "12px" }}>{plan.periodo} · {plan.precio_mes}€/mes</div>
                  {plan.precio_original && <div style={{ fontSize: "14px", color: "var(--ink60)" }}>Precio original: <s>{plan.precio_original}€</s> · Ahorro: {plan.precio_original - plan.precio}€</div>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════
   COMPONENTES REUTILIZABLES
════════════════════════════ */
function Modal({ title, children, onClose, onSave }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,35,71,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <div style={{ background: "#fff", borderRadius: "14px", padding: "32px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(13,35,71,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h3 style={{ fontFamily: "var(--serif)", fontSize: "20px", fontWeight: 700, color: "var(--blue-d)" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "var(--ink60)", padding: "4px" }}>✕</button>
        </div>
        {children}
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #EBF0F8" }}>
          <button style={btnSecondary} onClick={onClose}>Cancelar</button>
          <button style={btnPrimary} onClick={onSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", full = false, multiline = false }) {
  return (
    <div style={{ gridColumn: full ? "1/-1" : "auto" }}>
      <label style={labelStyle}>{label}</label>
      {multiline
        ? <textarea style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }} value={value} onChange={e => onChange(e.target.value)}/>
        : <input style={inputStyle} type={type} value={value} onChange={e => onChange(e.target.value)}/>
      }
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <select style={inputStyle} value={value} onChange={e => onChange(e.target.value)}>
        <option value="">— Selecciona —</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

/* ════════════════════════════
   ESTILOS COMPARTIDOS
════════════════════════════ */
const pageTitle = { fontFamily: "var(--serif)", fontSize: "26px", fontWeight: 900, color: "var(--blue-d)", marginBottom: "24px", letterSpacing: "-0.5px" };
const labelStyle = { display: "block", fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" };
const inputStyle = { width: "100%", padding: "10px 14px", border: "1px solid #E2E8F0", borderRadius: "6px", fontSize: "14px", fontFamily: "var(--f)", color: "var(--ink)", outline: "none", marginBottom: 0 };
const btnPrimary = { display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 20px", background: "var(--blue)", color: "#fff", fontFamily: "var(--f)", fontSize: "14px", fontWeight: 600, border: "none", borderRadius: "6px", cursor: "pointer" };
const btnSecondary = { display: "inline-flex", alignItems: "center", gap: "6px", padding: "10px 20px", background: "#F5F7FA", color: "var(--ink)", fontFamily: "var(--f)", fontSize: "14px", fontWeight: 600, border: "1px solid #E2E8F0", borderRadius: "6px", cursor: "pointer" };
const btnIcon = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", background: "#F5F7FA", border: "1px solid #E2E8F0", borderRadius: "6px", cursor: "pointer", color: "var(--ink60)" };
const tableContainer = { background: "#fff", borderRadius: "12px", boxShadow: "0 1px 8px rgba(13,35,71,0.07)", overflow: "hidden" };
const tableStyle = { width: "100%", borderCollapse: "collapse" };
const theadRow = { background: "#F5F7FA" };
const thStyle = { padding: "12px 16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "var(--ink60)", textTransform: "uppercase", letterSpacing: "0.5px", whiteSpace: "nowrap" };
const trStyle = { borderBottom: "1px solid #F0F4F8" };
const tdStyle = { padding: "14px 16px", fontSize: "14px", color: "var(--ink)" };
const formGrid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" };
const badge = (color) => ({
  display: "inline-block", padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600,
  background: color === "green" ? "#ECFDF5" : color === "red" ? "#FEF2F2" : color === "yellow" ? "#FFFBEB" : "#EBF0F8",
  color: color === "green" ? "#2A7A30" : color === "red" ? "#DC2626" : color === "yellow" ? "#D97706" : "#1E3A6E",
});

/* ════════════════════════════
   APP PRINCIPAL
════════════════════════════ */
export default function AdminPanel() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seccion, setSeccion] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); setLoading(false);
    });
    supabase.auth.onAuthStateChange((_e, session) => setSession(session));
  }, []);

  useEffect(() => {
    if (session) fetchStats();
  }, [session]);

  const fetchStats = async () => {
    const [{ data: alumnos }, { data: supuestos }] = await Promise.all([
      supabase.from("alumnos").select("*"),
      supabase.from("supuestos").select("*"),
    ]);
    const activos = alumnos?.filter(a => a.estado === "activo") || [];
    const precios = { mensual: 49, trimestral: 39, semestral: 33, anual: 29 };
    const ingresos = activos.reduce((sum, a) => sum + (precios[a.plan] || 0), 0);
    const porPlan = ["mensual","trimestral","semestral","anual"].map(p => ({
      plan: p, count: alumnos?.filter(a => a.plan === p).length || 0,
      pct: alumnos?.length ? Math.round((alumnos.filter(a => a.plan === p).length / alumnos.length) * 100) : 0,
    }));
    setStats({
      alumnosActivos: activos.length,
      totalAlumnos: alumnos?.length || 0,
      ingresosMes: ingresos,
      supuestosPublicados: supuestos?.filter(s => s.publicado).length || 0,
      porPlan,
      ultimosAlumnos: alumnos?.slice(0, 5) || [],
    });
  };

  const nav = [
    { id: "dashboard", label: "Dashboard",  icon: Icon.dashboard },
    { id: "alumnos",   label: "Alumnos",    icon: Icon.alumnos },
    { id: "supuestos", label: "Supuestos",  icon: Icon.supuestos },
    { id: "contenido", label: "Contenido",  icon: Icon.contenido },
    { id: "planes",    label: "Precios",    icon: Icon.planes },
  ];

  if (loading) return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "var(--f)", color: "var(--ink60)" }}>Cargando...</div>;
  if (!session) return <Login onLogin={() => supabase.auth.getSession().then(({ data: { session } }) => setSession(session))} />;

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "var(--f)", background: "#F5F7FA" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;400;500;600;700&display=swap');
        :root {
          --f: 'DM Sans', sans-serif;
          --serif: 'DM Serif Display', Georgia, serif;
          --blue: #1E3A6E; --blue-d: #0D2347;
          --gold: #C9A020;
          --ink: #0D1B35; --ink60: rgba(13,27,53,0.6);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea, select { font-family: var(--f) !important; }
        input:focus, textarea:focus, select:focus { outline: 2px solid var(--blue); border-color: var(--blue) !important; }
        table tr:hover td { background: #F8FAFC; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 3px; }
      `}</style>

      {/* SIDEBAR */}
      <div style={{ width: sidebarOpen ? "240px" : "64px", background: "var(--blue-d)", transition: "width .25s", flexShrink: 0, display: "flex", flexDirection: "column", position: "fixed", top: 0, bottom: 0, zIndex: 100 }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "36px", height: "36px", background: "var(--gold)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>🛡️</div>
          {sidebarOpen && <div><div style={{ fontFamily: "var(--serif)", fontSize: "15px", color: "#fff", lineHeight: 1.1 }}>Preparador IIPP</div><div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", letterSpacing: "1px" }}>PANEL ADMIN</div></div>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {nav.map(item => (
            <button key={item.id} onClick={() => setSeccion(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: "12px",
              padding: "11px 12px", marginBottom: "4px", borderRadius: "8px", border: "none", cursor: "pointer",
              background: seccion === item.id ? "rgba(255,255,255,0.12)" : "transparent",
              color: seccion === item.id ? "#fff" : "rgba(255,255,255,0.55)",
              fontSize: "14px", fontWeight: seccion === item.id ? 600 : 400,
              fontFamily: "var(--f)", textAlign: "left", transition: "background .15s, color .15s",
            }}>
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && item.label}
            </button>
          ))}
        </nav>

        {/* Footer sidebar */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <button onClick={() => supabase.auth.signOut()} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "8px", border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.45)", fontSize: "14px", fontFamily: "var(--f)" }}>
            {Icon.logout} {sidebarOpen && "Cerrar sesión"}
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ marginLeft: sidebarOpen ? "240px" : "64px", flex: 1, transition: "margin-left .25s" }}>
        {/* Topbar */}
        <div style={{ height: "64px", background: "#fff", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", position: "sticky", top: 0, zIndex: 50 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink60)", padding: "6px" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a href="https://preparadoriipp.com" target="_blank" rel="noreferrer" style={{ fontSize: "13px", color: "var(--blue)", fontWeight: 500, textDecoration: "none" }}>← Ver web</a>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px", fontWeight: 700 }}>
              {session.user.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "36px 40px", maxWidth: "1200px" }}>
          {seccion === "dashboard" && <Dashboard stats={stats} />}
          {seccion === "alumnos"   && <Alumnos />}
          {seccion === "supuestos" && <Supuestos />}
          {seccion === "contenido" && <ContenidoWeb />}
          {seccion === "planes"    && <Planes />}
        </div>
      </div>
    </div>
  );
}
