import { useState, useEffect, useRef } from "react";
import { db } from "./firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

const STATUS_ORDER = ["pending", "in_progress", "done", "blocked"];
const STATUS = {
  pending:     { label: "Pendente",      color: "#94a3b8", bg: "#f1f5f9", dot: "#94a3b8" },
  in_progress: { label: "Em andamento",  color: "#d97706", bg: "#fef3c7", dot: "#f59e0b" },
  done:        { label: "Concluído",     color: "#059669", bg: "#d1fae5", dot: "#10b981" },
  blocked:     { label: "Impedimento",   color: "#dc2626", bg: "#fee2e2", dot: "#ef4444" },
};

const DEFAULT_COMPONENTS = ["Banco de Dados", "API", "Repositório"];

const INITIAL_PRODUCTS = [
  { id: "amplum",      name: "Amplum",                 color: "#6366f1", components: ["Banco de Dados", "API", "Repositório", "WS"] },
  { id: "animallis",   name: "Animallis",               color: "#10b981", components: ["Banco de Dados", "API", "Repositório", "Bucket/Storage"] },
  { id: "integre",     name: "Integre",                 color: "#f59e0b", components: ["Banco de Dados", "API", "Repositório", "WS"] },
  { id: "minha_conta", name: "Minha Conta Web",         color: "#3b82f6", components: ["Banco de Dados", "API", "Repositório"] },
  { id: "painel_adm",  name: "Painel Administrativo",   color: "#8b5cf6", components: ["Banco de Dados", "API", "Repositório", "WS"] },
  { id: "laudos",      name: "Laudos",                  color: "#ef4444", components: ["Banco de Dados", "API", "WS", "Repositório", "Bucket"] },
];

function buildStatus(products) {
  const s = {};
  for (const p of products) {
    s[p.id] = {};
    for (const c of p.components) s[p.id][c] = { status: "pending", note: "" };
  }
  return s;
}

const DOC_REF = () => doc(db, "migracao", "estado");

function persist(data) {
  setDoc(DOC_REF(), data).catch(console.error);
}

function hydrate() { return null; } // substituído pelo listener do Firebase

function mergeWithInitial(saved) {
  if (!saved) return { products: INITIAL_PRODUCTS, compStatus: buildStatus(INITIAL_PRODUCTS) };
  const savedIds = new Set(saved.products.map(p => p.id));
  const missing = INITIAL_PRODUCTS.filter(p => !savedIds.has(p.id));
  const products = [...saved.products, ...missing];
  const compStatus = { ...saved.compStatus };
  for (const p of missing) {
    compStatus[p.id] = {};
    for (const c of p.components) compStatus[p.id][c] = { status: "pending", note: "" };
  }
  return { products, compStatus };
}

function progress(product, compStatus) {
  const total = product.components.length;
  if (!total) return { pct: 0, done: 0, total: 0 };
  const done = product.components.filter(c => compStatus[product.id]?.[c]?.status === "done").length;
  return { pct: Math.round((done / total) * 100), done, total };
}

function globalStats(products, compStatus) {
  const all = products.flatMap(p => p.components.map(c => compStatus[p.id]?.[c]?.status || "pending"));
  const counts = { pending: 0, in_progress: 0, done: 0, blocked: 0 };
  for (const s of all) counts[s] = (counts[s] || 0) + 1;
  return { counts, total: all.length, pct: all.length ? Math.round((counts.done / all.length) * 100) : 0 };
}

function Ring({ pct, color, size = 80, stroke = 8 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease" }} />
    </svg>
  );
}

function StatCard({ label, value, color, bg }) {
  return (
    <div style={{ flex: 1, minWidth: 80, background: bg, borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
      <div style={{ fontSize: 26, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 11, color: "#64748b", marginTop: 2, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

function ComponentList({ pid, components, compStatus, onReorder, onCycle, onSetNote, onRemove, editNote, setEditNote, addComp, setAddComp, onAddComp }) {
  const dragIdx = useRef(null);
  const overIdx = useRef(null);

  const handleDragStart = (i, e) => {
    dragIdx.current = i;
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.style.opacity = "0.4";
  };
  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
    if (dragIdx.current !== null && overIdx.current !== null && dragIdx.current !== overIdx.current) {
      const next = [...components];
      const [moved] = next.splice(dragIdx.current, 1);
      next.splice(overIdx.current, 0, moved);
      onReorder(pid, next);
    }
    dragIdx.current = null;
    overIdx.current = null;
  };
  const handleDragOver = (i, e) => {
    e.preventDefault();
    overIdx.current = i;
  };

  return (
    <div style={{ padding: "4px 20px 20px", borderTop: "1px solid #f1f5f9" }}>
      <div style={{ fontSize: 11, color: "#94a3b8", margin: "10px 0 8px", paddingLeft: 4 }}>
        ⠿ Arraste para reordenar
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {components.map((comp, i) => {
          const cs = compStatus[pid]?.[comp] || { status: "pending", note: "" };
          const st = STATUS[cs.status];
          const isEditN = editNote?.pid === pid && editNote?.comp === comp;
          return (
            <div key={comp} draggable
              onDragStart={e => handleDragStart(i, e)}
              onDragEnd={handleDragEnd}
              onDragOver={e => handleDragOver(i, e)}
              style={{ display: "flex", alignItems: "flex-start", gap: 10, background: "#f8fafc", borderRadius: 10, padding: "10px 14px", border: "1px solid #e9eef5", cursor: "grab", userSelect: "none" }}>
              <span style={{ color: "#cbd5e1", fontSize: 16, lineHeight: "22px", flexShrink: 0 }}>⠿</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: st.dot, display: "inline-block", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{comp}</span>
                  <button onClick={() => onCycle(pid, comp)}
                    style={{ fontSize: 11, padding: "3px 12px", borderRadius: 99, border: "none", background: st.bg, color: st.color, fontWeight: 700, cursor: "pointer" }}>
                    {st.label} ↻
                  </button>
                  <button onClick={() => setEditNote(isEditN ? null : { pid, comp })}
                    style={{ fontSize: 12, background: "none", border: "none", cursor: "pointer", color: cs.note ? "#6366f1" : "#cbd5e1" }}>📝</button>
                  <button onClick={() => onRemove(pid, comp)}
                    style={{ marginLeft: "auto", fontSize: 11, color: "#fca5a5", background: "none", border: "none", cursor: "pointer" }}>✕</button>
                </div>
                {cs.note && !isEditN && (
                  <div style={{ fontSize: 12, color: "#6366f1", marginTop: 5, paddingLeft: 16, borderLeft: "2px solid #c7d2fe", fontStyle: "italic" }}>{cs.note}</div>
                )}
                {isEditN && (
                  <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                    <input autoFocus value={cs.note}
                      onChange={e => onSetNote(pid, comp, e.target.value)}
                      onKeyDown={e => e.key === "Enter" && setEditNote(null)}
                      placeholder="Observação..."
                      style={{ flex: 1, fontSize: 12, border: "1px solid #e2e8f0", borderRadius: 6, padding: "5px 10px", outline: "none" }} />
                    <button onClick={() => setEditNote(null)} style={{ fontSize: 12, background: "#6366f1", color: "#fff", border: "none", borderRadius: 6, padding: "5px 12px", cursor: "pointer" }}>OK</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <input
          placeholder="+ Adicionar componente (ex: Bucket, WS...)"
          value={addComp[pid] || ""}
          onChange={e => setAddComp(a => ({ ...a, [pid]: e.target.value }))}
          onKeyDown={e => { if (e.key === "Enter") { onAddComp(pid, addComp[pid]); setAddComp(a => ({ ...a, [pid]: "" })); }}}
          style={{ flex: 1, fontSize: 12, border: "1px dashed #cbd5e1", borderRadius: 8, padding: "7px 12px", outline: "none", color: "#64748b", background: "#f8fafc" }}
        />
        <button onClick={() => { onAddComp(pid, addComp[pid]); setAddComp(a => ({ ...a, [pid]: "" })); }}
          style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          Adicionar
        </button>
      </div>
    </div>
  );
}

function ProductList({ products, onReorder, renderCard }) {
  const dragIdx = useRef(null);
  const overIdx = useRef(null);

  const handleDragStart = (i, e) => { dragIdx.current = i; e.dataTransfer.effectAllowed = "move"; e.currentTarget.style.opacity = "0.4"; };
  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
    if (dragIdx.current !== null && overIdx.current !== null && dragIdx.current !== overIdx.current) {
      const next = [...products];
      const [moved] = next.splice(dragIdx.current, 1);
      next.splice(overIdx.current, 0, moved);
      onReorder(next);
    }
    dragIdx.current = null; overIdx.current = null;
  };
  const handleDragOver = (i, e) => { e.preventDefault(); overIdx.current = i; };

  return (
    <>
      {products.map((p, i) => (
        <div key={p.id} draggable
          onDragStart={e => handleDragStart(i, e)}
          onDragEnd={handleDragEnd}
          onDragOver={e => handleDragOver(i, e)}>
          {renderCard(p)}
        </div>
      ))}
    </>
  );
}

export default function App() {
  const [products, setProducts]     = useState(INITIAL_PRODUCTS);
  const [compStatus, setCompStatus] = useState(buildStatus(INITIAL_PRODUCTS));
  const [loaded, setLoaded]         = useState(false);
  const [view, setView]             = useState("dashboard");
  const [expanded, setExpanded]     = useState({});
  const [editNote, setEditNote]     = useState(null);
  const [modal, setModal]           = useState(false);
  const [np, setNp]                 = useState({ name: "", color: "#6366f1", components: [...DEFAULT_COMPONENTS] });
  const [npInput, setNpInput]       = useState("");
  const [addComp, setAddComp]       = useState({});
  const [filterStatus, setFilter]   = useState("all");

  // Listener em tempo real do Firebase
  useEffect(() => {
    const unsub = onSnapshot(DOC_REF(), (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const merged = mergeWithInitial(data);
        setProducts(merged.products);
        setCompStatus(merged.compStatus);
      } else {
        // Primeiro acesso: salva os dados iniciais no Firebase
        const initial = mergeWithInitial(null);
        persist(initial);
      }
      setLoaded(true);
    });
    return () => unsub();
  }, []);

  // Salva no Firebase sempre que mudar
  useEffect(() => {
    if (!loaded) return;
    persist({ products, compStatus });
  }, [products, compStatus]);

  const cycleStatus = (pid, comp) => setCompStatus(prev => {
    const cur = prev[pid]?.[comp]?.status || "pending";
    const next = STATUS_ORDER[(STATUS_ORDER.indexOf(cur) + 1) % STATUS_ORDER.length];
    return { ...prev, [pid]: { ...prev[pid], [comp]: { ...prev[pid][comp], status: next } } };
  });

  const setNote = (pid, comp, note) => setCompStatus(prev => ({
    ...prev, [pid]: { ...prev[pid], [comp]: { ...prev[pid][comp], note } }
  }));

  const addComponent = (pid, val) => {
    if (!val?.trim()) return;
    const c = val.trim();
    setProducts(prev => prev.map(p => p.id === pid ? { ...p, components: [...p.components, c] } : p));
    setCompStatus(prev => ({ ...prev, [pid]: { ...prev[pid], [c]: { status: "pending", note: "" } } }));
  };

  const removeComponent = (pid, comp) => {
    setProducts(prev => prev.map(p => p.id === pid ? { ...p, components: p.components.filter(c => c !== comp) } : p));
    setCompStatus(prev => { const cp = { ...prev[pid] }; delete cp[comp]; return { ...prev, [pid]: cp }; });
  };

  const reorderComponents = (pid, newComps) => {
    setProducts(prev => prev.map(p => p.id === pid ? { ...p, components: newComps } : p));
  };

  const createProduct = () => {
    if (!np.name.trim()) return;
    const id = np.name.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now();
    const comps = np.components.filter(Boolean);
    setProducts(prev => [...prev, { id, name: np.name.trim(), color: np.color, components: comps }]);
    setCompStatus(prev => {
      const s = {}; for (const c of comps) s[c] = { status: "pending", note: "" };
      return { ...prev, [id]: s };
    });
    setNp({ name: "", color: "#6366f1", components: [...DEFAULT_COMPONENTS] });
    setModal(false);
  };

  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setCompStatus(prev => { const cp = { ...prev }; delete cp[id]; return cp; });
  };

  if (!loaded) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "Inter,sans-serif", color: "#64748b", fontSize: 15 }}>
      Carregando dados... ⏳
    </div>
  );

  const stats = globalStats(products, compStatus);
  const filteredProducts = filterStatus === "all" ? products
    : products.filter(p => {
        const comps = p.components.map(c => compStatus[p.id]?.[c]?.status || "pending");
        if (filterStatus === "done")        return comps.every(s => s === "done");
        if (filterStatus === "blocked")     return comps.some(s => s === "blocked");
        if (filterStatus === "in_progress") return comps.some(s => s === "in_progress") && !comps.every(s => s === "done");
        return comps.every(s => s === "pending");
      });

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#f8fafc", minHeight: "100vh", paddingBottom: 40 }}>
      <div style={{ background: "#0f172a", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 18 }}>🚀 Migração dos Produtos WMI (Em Homologação)</div>
          <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 2 }}>Migração por produto · {products.length} produtos</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["dashboard","board"].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
              background: view === v ? "#6366f1" : "#1e293b", color: view === v ? "#fff" : "#94a3b8"
            }}>{v === "dashboard" ? "📊 Dashboard" : "📋 Detalhes"}</button>
          ))}
          <button onClick={() => setModal(true)} style={{ marginLeft: 8, padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: "#6366f1", color: "#fff" }}>
            + Produto
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "24px 20px" }}>
        {view === "dashboard" && (
          <>
            <div style={{ background: "#fff", borderRadius: 16, padding: "28px 32px", marginBottom: 20, border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 32, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <Ring pct={stats.pct} color="#6366f1" size={110} stroke={10} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{stats.pct}%</span>
                  <span style={{ fontSize: 10, color: "#94a3b8", marginTop: 1 }}>concluído</span>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 4 }}>Progresso Geral da Migração (Em Homologação)</div>
                <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>
                  {stats.counts.done} de {stats.total} componentes concluídos em {products.length} produtos
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <StatCard label="Pendentes"    value={stats.counts.pending}     color="#94a3b8" bg="#f8fafc" />
                  <StatCard label="Em andamento" value={stats.counts.in_progress} color="#d97706" bg="#fffbeb" />
                  <StatCard label="Concluídos"   value={stats.counts.done}        color="#059669" bg="#f0fdf4" />
                  <StatCard label="Impedimentos" value={stats.counts.blocked}     color="#dc2626" bg="#fff1f2" />
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              <ProductList products={products} onReorder={setProducts} renderCard={p => {
                const { pct, done, total } = progress(p, compStatus);
                const blocked = p.components.filter(c => compStatus[p.id]?.[c]?.status === "blocked").length;
                const inprog  = p.components.filter(c => compStatus[p.id]?.[c]?.status === "in_progress").length;
                return (
                  <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", cursor: "grab", userSelect: "none" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                        <span style={{ color: "#cbd5e1", fontSize: 16, marginTop: 2 }}>⠿</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{p.name}</div>
                          <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{total} componentes</div>
                        </div>
                      </div>
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <Ring pct={pct} color={p.color} size={56} stroke={6} />
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 12, fontWeight: 800, color: p.color }}>{pct}%</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                      {p.components.map(c => {
                        const s = compStatus[p.id]?.[c]?.status || "pending";
                        const st = STATUS[s];
                        return (
                          <span key={c} title={`${c}: ${st.label}`}
                            style={{ fontSize: 11, padding: "3px 9px", borderRadius: 99, background: st.bg, color: st.color, fontWeight: 600, cursor: "pointer" }}
                            onClick={() => { setView("board"); setExpanded(e => ({ ...e, [p.id]: true })); }}>
                            {c}
                          </span>
                        );
                      })}
                    </div>
                    <div style={{ background: "#f1f5f9", borderRadius: 99, height: 6, marginBottom: 10 }}>
                      <div style={{ background: pct === 100 ? "#10b981" : p.color, borderRadius: 99, height: 6, width: `${pct}%`, transition: "width 0.5s" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94a3b8" }}>
                      <span>{done}/{total} concluídos</span>
                      <span style={{ display: "flex", gap: 8 }}>
                        {inprog  > 0 && <span style={{ color: "#d97706" }}>⏳ {inprog}</span>}
                        {blocked > 0 && <span style={{ color: "#ef4444" }}>🔴 {blocked} impedimento{blocked > 1 ? "s" : ""}</span>}
                      </span>
                    </div>
                    <button onClick={() => { setView("board"); setExpanded(e => ({ ...e, [p.id]: true })); }}
                      style={{ marginTop: 12, width: "100%", padding: "7px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#f8fafc", color: "#475569", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                      Ver detalhes →
                    </button>
                  </div>
                );
              }} />
            </div>
          </>
        )}

        {view === "board" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
              {[["all","Todos"],["pending","Pendentes"],["in_progress","Em andamento"],["done","Concluídos"],["blocked","Impedimentos"]].map(([k,l]) => (
                <button key={k} onClick={() => setFilter(k)} style={{
                  padding: "5px 14px", borderRadius: 99, border: "1px solid " + (filterStatus === k ? "#0f172a" : "#e2e8f0"),
                  cursor: "pointer", fontSize: 12, fontWeight: 600,
                  background: filterStatus === k ? "#0f172a" : "#fff", color: filterStatus === k ? "#fff" : "#64748b"
                }}>{l}</button>
              ))}
              <span style={{ marginLeft: "auto", fontSize: 11, color: "#94a3b8" }}>⠿ Arraste para reordenar</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <ProductList products={filteredProducts} onReorder={setProducts} renderCard={p => {
                const { pct, done, total } = progress(p, compStatus);
                const isOpen = expanded[p.id];
                return (
                  <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)", cursor: isOpen ? "default" : "grab" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderLeft: "5px solid #e2e8f0", userSelect: "none" }}>
                      <span style={{ color: "#cbd5e1", fontSize: 18, flexShrink: 0 }}>⠿</span>
                      <div style={{ flex: 1, cursor: "pointer" }} onClick={() => setExpanded(e => ({ ...e, [p.id]: !e[p.id] }))}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                          <span style={{ fontWeight: 700, fontSize: 16, color: "#0f172a" }}>{p.name}</span>
                          {pct === 100 && <span style={{ fontSize: 11, background: "#d1fae5", color: "#059669", borderRadius: 99, padding: "2px 8px", fontWeight: 700 }}>✓ Concluído</span>}
                          {p.components.some(c => compStatus[p.id]?.[c]?.status === "blocked") && (
                            <span style={{ fontSize: 11, background: "#fee2e2", color: "#dc2626", borderRadius: 99, padding: "2px 8px", fontWeight: 700 }}>⚠ Impedimento</span>
                          )}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ flex: 1, maxWidth: 280, background: "#e2e8f0", borderRadius: 99, height: 6 }}>
                            <div style={{ background: pct === 100 ? "#10b981" : "#6366f1", borderRadius: 99, height: 6, width: `${pct}%`, transition: "width 0.4s" }} />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 700, color: "#64748b" }}>{pct}% · {done}/{total}</span>
                        </div>
                      </div>
                      <span onClick={() => setExpanded(e => ({ ...e, [p.id]: !e[p.id] }))} style={{ color: "#94a3b8", fontSize: 16, cursor: "pointer" }}>{isOpen ? "▲" : "▼"}</span>
                    </div>
                    {isOpen && (
                      <>
                        <ComponentList
                          pid={p.id} components={p.components} compStatus={compStatus}
                          onReorder={reorderComponents} onCycle={cycleStatus} onSetNote={setNote}
                          onRemove={removeComponent} editNote={editNote} setEditNote={setEditNote}
                          addComp={addComp} setAddComp={setAddComp} onAddComp={addComponent}
                        />
                        <div style={{ padding: "0 20px 16px", display: "flex", justifyContent: "flex-end" }}>
                          <button onClick={() => removeProduct(p.id)}
                            style={{ fontSize: 11, color: "#ef4444", background: "none", border: "1px solid #fecaca", borderRadius: 6, padding: "4px 12px", cursor: "pointer" }}>
                            🗑 Remover produto
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              }} />
            </div>
          </>
        )}
      </div>

      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 28, width: 440, maxWidth: "95vw", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 18, fontWeight: 800, color: "#0f172a" }}>Novo Produto</h2>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 4, textTransform: "uppercase" }}>Nome</label>
            <input autoFocus value={np.name} onChange={e => setNp(n => ({ ...n, name: e.target.value }))}
              placeholder="Ex: Laudos" style={{ width: "100%", fontSize: 14, border: "1px solid #e2e8f0", borderRadius: 8, padding: "9px 12px", outline: "none", marginBottom: 16, boxSizing: "border-box" }} />
            <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 6, textTransform: "uppercase" }}>Cor</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {["#6366f1","#10b981","#f59e0b","#3b82f6","#8b5cf6","#ef4444","#14b8a6","#f97316"].map(c => (
                <div key={c} onClick={() => setNp(n => ({ ...n, color: c }))}
                  style={{ width: 28, height: 28, borderRadius: "50%", background: c, cursor: "pointer", border: np.color === c ? "3px solid #0f172a" : "3px solid transparent" }} />
              ))}
            </div>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#64748b", display: "block", marginBottom: 6, textTransform: "uppercase" }}>Componentes</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {np.components.map(c => (
                <span key={c} style={{ fontSize: 12, background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 99, padding: "4px 10px", display: "flex", alignItems: "center", gap: 5 }}>
                  {c}
                  <button onClick={() => setNp(n => ({ ...n, components: n.components.filter(x => x !== c) }))}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 12, padding: 0 }}>✕</button>
                </span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 22 }}>
              <input value={npInput} onChange={e => setNpInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && npInput.trim()) { setNp(n => ({ ...n, components: [...n.components, npInput.trim()] })); setNpInput(""); }}}
                placeholder="Adicionar componente específico..."
                style={{ flex: 1, fontSize: 13, border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 10px", outline: "none" }} />
              <button onClick={() => { if (npInput.trim()) { setNp(n => ({ ...n, components: [...n.components, npInput.trim()] })); setNpInput(""); }}}
                style={{ background: "#f1f5f9", color: "#374151", border: "1px solid #e2e8f0", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontSize: 13 }}>+</button>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setModal(false)} style={{ background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: 8, padding: "9px 18px", cursor: "pointer", fontSize: 13 }}>Cancelar</button>
              <button onClick={createProduct} style={{ background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, padding: "9px 22px", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Criar Produto</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}