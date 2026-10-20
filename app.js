'use strict';
/* ============ Utilidades ============ */
const KEY = 'pilas_v1';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => String(n).padStart(2, '0');
const cop = n => (n < 0 ? '−$' : '$') + Math.abs(Math.round(n)).toLocaleString('es-CO');
const short = n => { const a = Math.abs(n); const s = a >= 1e6 ? (a / 1e6).toFixed(1).replace('.0', '') + 'M' : a >= 1e3 ? Math.round(a / 1e3) + 'k' : String(Math.round(a)); return (n < 0 ? '−' : '') + s; };
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const norm = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const dKey = d => { const x = new Date(d); return x.getFullYear() + '-' + pad(x.getMonth() + 1) + '-' + pad(x.getDate()); };
const todayK = () => dKey(Date.now());
const curM = () => todayK().slice(0, 7);
const addMonths = (m, n) => { const [y, mo] = m.split('-').map(Number); const d = new Date(y, mo - 1 + n, 1); return d.getFullYear() + '-' + pad(d.getMonth() + 1); };
const addDays = (k, n) => { const d = new Date(k + 'T12:00'); d.setDate(d.getDate() + n); return dKey(d); };
const mName = m => cap(new Date(m + '-15T12:00').toLocaleDateString('es-CO', { month: 'long', year: 'numeric' }));
const mShort = m => cap(new Date(m + '-15T12:00').toLocaleDateString('es-CO', { month: 'short' }).replace('.', ''));
const dLong = k => cap(new Date(k + 'T12:00').toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }));
const dateLong = k => new Date(k + 'T12:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00') - new Date(a + 'T12:00')) / 864e5);
const money = s => +String(s).replace(/\D/g, '') || 0;
const daysInMonth = m => { const [y, mo] = m.split('-').map(Number); return new Date(y, mo, 0).getDate(); };
const EA = m => Math.pow(1 + m, 12) - 1;
const fromEA = e => Math.pow(1 + e, 1 / 12) - 1;
const pct = (v, d = 1) => (v * 100).toFixed(d).replace('.', ',') + '%';
const PALETTE = ['#3F5BD9', '#D9731A', '#0F8F7A', '#C93D72', '#7B4FD0', '#1F86C7', '#A8800F', '#4F7F2E', '#D2523B', '#0E8A8A', '#FFB627'];
const shortCOP = v => { const a = Math.abs(v), s = v < 0 ? '−' : ''; if (a >= 1e6) return s + '$' + (a / 1e6).toFixed(2).replace(/\.?0+$/, '').replace('.', ',') + ' M'; if (a >= 1000) return s + '$' + Math.round(a / 1000) + ' mil'; return s + '$' + Math.round(a); };
/* Iconos de línea (24×24, trazo 2px, puntas redondeadas) */
const SVGI = {
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 9.5V20h14V9.5"/><path d="M10 20v-6h4v6"/>',
  food: '<path d="M7 3v18M4.5 3v5a2.5 2.5 0 0 0 5 0V3"/><path d="M18 21V3c-2.2 0-3.5 3-3.5 7h3.5"/>',
  bus: '<rect x="4" y="3" width="16" height="15" rx="3"/><path d="M4 11h16M8 21v-3M16 21v-3"/><path d="M7.5 14.5h.01M16.5 14.5h.01"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z"/>',
  card: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 10h18M7 15h4"/>',
  shirt: '<path d="M8.5 3 4 5.5l1.8 4.2 2.2-1V21h8V8.7l2.2 1L20 5.5 15.5 3a3.5 3.5 0 0 1-7 0z"/>',
  ticket: '<path d="M3 8a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2.5a1.5 1.5 0 0 0 0 3V16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2.5a1.5 1.5 0 0 0 0-3z"/><path d="M15 7v2M15 11v2M15 15v2"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3.5 20c0-3.2 2.5-5.5 5.5-5.5s5.5 2.3 5.5 5.5"/><path d="M15.5 5.5a2.6 2.6 0 0 1 0 5"/><path d="M17 14.6c2.1.6 3.5 2.6 3.5 5.4"/>',
  cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.2V16c0 1.6 2.7 3 6 3s6-1.4 6-3v-4.8"/><path d="M22 9v5"/>',
  piggy: '<path d="M19 10.5c.7.1 1.5.6 2 1.2M4.5 12A6.5 5.5 0 0 1 17 9.4l2.6-1.4-.4 3.6a5 5 0 0 1 .3 1.4c0 1.6-.8 3-2 4V20h-3v-1.8a8 8 0 0 1-3.5.3V20H8v-2.6A5.5 5.5 0 0 1 4.5 12z"/><path d="M9.5 7.5h3.5"/><path d="M15.5 12h.01"/>',
  dots: '<path d="M6 12h.01M12 12h.01M18 12h.01" stroke-width="3"/>',
  bill: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 10v4M18 10v4"/>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18"/>',
  store: '<path d="M4 9 5.5 4h13L20 9"/><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0"/><path d="M5 11.5V20h14v-8.5M10 20v-5h4v5"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  gift: '<rect x="3" y="8" width="18" height="5" rx="1"/><path d="M5 13v8h14v-8M12 8v13"/><path d="M12 8C10.5 5 7 4.5 7 6.8 7 8 9 8 12 8zm0 0c1.5-3 5-3.5 5-1.2C17 8 15 8 12 8z"/>',
  tag: '<path d="M3 12.2V4a1 1 0 0 1 1-1h8.2l8.8 8.8-9 9z"/><path d="M8 8h.01" stroke-width="3"/>',
  sprout: '<path d="M12 21v-9"/><path d="M12 12C12 7.5 8.5 5 4 5c0 4.2 3.2 7 8 7z"/><path d="M12 14.5c0-4 2.8-6.5 7-6.5 0 3.8-2.6 6.5-7 6.5z"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  unlock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 7.6-1.7"/><path d="M12 15v2"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  snow: '<path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11"/><path d="m9.5 3.5 2.5 2 2.5-2M9.5 20.5l2.5-2 2.5 2"/>',
  flame: '<path d="M12 21a6 6 0 0 0 6-6c0-4-3-6.5-4-10-1.5 2-2.5 3.5-2.5 5.5C10 9.5 9 8.8 8.6 7.5 7 9.2 6 11.6 6 15a6 6 0 0 0 6 6z"/>',
  calendar: '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/><path d="m9 15 2 2 4-4"/>',
  envelope: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  checkc: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  shield: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/>',
  shield2: '<path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/><path d="m9 12 2 2 4-4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  battery: '<rect x="2.5" y="7" width="17" height="10" rx="2"/><path d="M22 10.5v3M6 10v4M9.5 10v4M13 10v4"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4v3h-4z"/>'
};
const svgI = (k, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${SVGI[k] || SVGI.tag}</svg>`;
const NAME_ICON = { 'Vivienda': 'home', 'Comida': 'food', 'Transporte': 'bus', 'Salud': 'heart', 'Deudas': 'card', 'Personal': 'shirt', 'Diversión': 'ticket', 'Familia': 'people', 'Educación': 'cap', 'Ahorro': 'piggy', 'Otros gastos': 'dots', 'Sueldo': 'bill', 'Trabajo extra': 'briefcase', 'Ventas': 'store', 'Prima': 'star', 'Regalos recibidos': 'gift', 'Otros ingresos': 'dots' };

const ICON = {
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
  chev: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
  edit: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9a2.1 2.1 0 0 0-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>',
  left: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>',
  x: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z"/></svg>',
  alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3 2 20h20z" stroke-linejoin="round"/><path d="M12 10v4M12 17h.01"/></svg>',
  up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 15 6-6 4 4 6-6"/><path d="M14 7h6v6"/></svg>',
  flame: '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2s5 4.5 5 10a5 5 0 0 1-10 0c0-2.4 1.3-4 2.3-5 .2 1.6 1 2.6 1.9 2.9C11 7.6 12 2 12 2z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  trash: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  inbox: '<svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13h4l2 3h4l2-3h4"/><path d="M5 5h14l1 8v6H4v-6z"/></svg>'
};

/* ============ Estado ============ */
function freshState() {
  return {
    v: 1, next: 1,
    profile: { name: '', path: '', income: 0, incomeType: 'fijo', onboarded: false, demo: false, theme: (typeof state !== 'undefined' && state?.profile?.theme) || 'auto' },
    cats: [], tx: [], favs: [], budgets: {}, bills: [], debts: [],
    plan: { strategy: 'avalanche', extra: 0 }, goals: [],
    learn: { done: {}, scores: {}, xp: 0, given: {}, freezes: 0, frozen: [], marks: [], badges: {}, monthCheck: curM(), sobreOk: false, ceroOk: false }, ch: { active: null, done: [], custom: [] }
  };
}
function migrate() {
  const L = state.learn ||= {}; L.done ||= {}; L.xp ||= 0; L.given ||= {}; L.freezes ??= 0; L.frozen ||= []; L.marks ||= []; L.badges ||= {}; L.monthCheck ||= curM(); L.sobreOk ||= false; L.ceroOk ||= false;
  state.profile.theme ||= 'auto'; state.ch ||= { active: null, done: [] }; state.ch.custom ||= []; L.scores ||= {};
  Object.keys(L.done).forEach(k => { if (typeof LEGACY_LESSONS !== 'undefined' && LEGACY_LESSONS[k]) { L.done[LEGACY_LESSONS[k]] = true; delete L.done[k]; } });
}
let state;
try { state = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { state = null; }
if (!state || !state.profile) state = freshState();
migrate();
const nid = p => p + (state.next++);
function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { } }

function seedCats() {
  state.cats = [];
  const walk = (e, kind, parent) => {
    const [name, kids] = Array.isArray(e) ? e : [e, []];
    const c = { id: nid('c'), name, kind, parent };
    if (!parent) c.icon = NAME_ICON[name] || 'tag';
    if (!parent && name === 'Ahorro') c.sys = 'ahorro';
    if (!parent && name === 'Deudas') c.sys = 'deudas';
    state.cats.push(c);
    (kids || []).forEach(k => walk(k, kind, c.id));
  };
  DEFAULT_CATS.out.forEach(e => walk(e, 'out', null));
  DEFAULT_CATS.in.forEach(e => walk(e, 'in', null));
}

/* ============ Categorías ============ */
let CI = { by: {}, kids: {} };
function idx() {
  CI = { by: {}, kids: {} };
  state.cats.forEach(c => { if (!c.parent && !c.icon) c.icon = NAME_ICON[c.name] || 'tag'; CI.by[c.id] = c; const k = c.parent || 'root:' + c.kind; (CI.kids[k] ||= []).push(c); });
}
const cat = id => CI.by[id];
const kidsOf = id => CI.kids[id] || [];
const roots = kind => CI.kids['root:' + kind] || [];
function pathOf(id) { const p = []; let c = cat(id), g = 0; while (c && g++ < 40) { p.unshift(c); c = c.parent ? cat(c.parent) : null; } return p; }
const topOf = id => pathOf(id)[0];
function desc(id) { const s = new Set([id]); const st = [id]; while (st.length) { const x = st.pop(); kidsOf(x).forEach(k => { s.add(k.id); st.push(k.id); }); } return s; }
function catColor(id) { const t = topOf(id); if (!t) return 'var(--c11)'; const i = roots(t.kind).indexOf(t); return `var(--c${((i + (t.kind === 'in' ? 2 : 0)) % 11) + 1})`; }
const iconOf = id => topOf(id)?.icon || 'tag';
const catName = id => cat(id)?.name || 'Sin categoría';
const catPath = id => pathOf(id).map(c => c.name).join(' › ') || 'Sin categoría';
function dot(id, size) { const col = catColor(id); return `<span class="cdot" style="background:color-mix(in srgb,${col} 15%,transparent);color:${col}${size ? `;width:${size}px;height:${size}px;border-radius:${size < 32 ? 8 : 12}px` : ''}">${svgI(iconOf(id))}</span>`; }
function sysCat(sys) {
  let c = state.cats.find(x => x.sys === sys);
  if (!c) { c = { id: nid('c'), name: sys === 'ahorro' ? 'Ahorro' : 'Deudas', kind: 'out', parent: null, sys, icon: sys === 'ahorro' ? 'piggy' : 'card' }; state.cats.push(c); idx(); }
  return c.id;
}

/* ============ Cálculos ============ */
const txOf = m => state.tx.filter(t => t.d.startsWith(m));
function totals(m) { let i = 0, o = 0; txOf(m).forEach(t => t.k === 'in' ? i += t.a : o += t.a); return { i, o, b: i - o }; }
function sumCat(id, m) { const s = desc(id); let v = 0; state.tx.forEach(t => { if (s.has(t.cat) && (!m || t.d.startsWith(m))) v += t.a; }); return v; }
function sumSys(sys, m) { const c = state.cats.find(x => x.sys === sys); return c ? sumCat(c.id, m) : 0; }
function avgExpense() {
  const ms = [1, 2, 3].map(n => addMonths(curM(), -n)).filter(m => totals(m).o > 0);
  if (ms.length) return ms.reduce((a, m) => a + totals(m).o - sumSys('ahorro', m) - sumSys('deudas', m), 0) / ms.length;
  const t = totals(curM()); const day = +todayK().slice(8);
  if (t.o > 0 && day > 7) return (t.o - sumSys('ahorro', curM()) - sumSys('deudas', curM())) / day * daysInMonth(curM());
  return state.profile.income * 0.7;
}
function incomeRef() {
  const ms = [1, 2, 3].map(n => addMonths(curM(), -n)).filter(m => totals(m).i > 0);
  if (ms.length) return ms.reduce((a, m) => a + totals(m).i, 0) / ms.length;
  return Math.max(state.profile.income, totals(curM()).i);
}
function streak() {
  const days = new Set(state.tx.map(t => t.d)); (state.learn.frozen || []).forEach(d => days.add(d)); let k = todayK(), n = 0;
  if (!days.has(k)) k = addDays(k, -1);
  while (days.has(k)) { n++; k = addDays(k, -1); }
  return n;
}
const activeDebts = () => state.debts.filter(d => d.bal > 0);
function simulate(strategy, extra) {
  let ds = activeDebts().map(d => ({ id: d.id, bal: d.bal, rate: d.rate, min: d.min }));
  const budget = ds.reduce((a, d) => a + d.min, 0) + (extra || 0);
  const order = []; let month = 0, interest = 0;
  while (ds.some(d => d.bal > 0.5) && month < 600) {
    month++;
    ds.forEach(d => { if (d.bal > 0) { const it = d.bal * d.rate; d.bal += it; interest += it; } });
    let pool = budget;
    ds.forEach(d => { if (d.bal > 0) { const p = Math.min(d.min, d.bal); d.bal -= p; pool -= p; } });
    const act = ds.filter(d => d.bal > 0.5).sort(strategy === 'snowball' ? (a, b) => a.bal - b.bal : (a, b) => b.rate - a.rate || a.bal - b.bal);
    for (const d of act) { if (pool <= 0) break; const p = Math.min(pool, d.bal); d.bal -= p; pool -= p; }
    ds.forEach(d => { if (d.bal <= 0.5 && !order.some(o => o.id === d.id)) { d.bal = 0; order.push({ id: d.id, month }); } });
  }
  return { months: month, interest, order, stuck: month >= 600, budget };
}
function targetOrder(strategy) {
  return activeDebts().slice().sort(strategy === 'snowball' ? (a, b) => a.bal - b.bal : (a, b) => b.rate - a.rate || a.bal - b.bal);
}
function loanCalc(P, r, n) {
  if (!P || !n) return null;
  const cuota = r > 0 ? P * r / (1 - Math.pow(1 + r, -n)) : P / n;
  return { cuota, total: cuota * n, interes: cuota * n - P };
}
/* Pagos fijos: se repiten cada mes el mismo día; "start" es el primer mes en que toca pagarlo */
const billActive = (b, m) => !b.start || m >= b.start;
const billDue = (b, m) => m + '-' + pad(Math.min(b.day, daysInMonth(m)));
const billPeriod = b => billActive(b, curM()) ? curM() : b.start;
function billNext(b) { const p = billPeriod(b); return b.paid?.[p] ? billDue(b, addMonths(p, 1)) : billDue(b, p); }
const dMid = k => new Date(k + 'T12:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'long' });
const monthWord = m => new Date(m + '-15T12:00').toLocaleDateString('es-CO', { month: 'long' });
function billStatus(b, m = curM()) {
  if (b.paid && b.paid[m]) return { st: 'ok', lab: 'Pagado' };
  if (!billActive(b, m)) return { st: 'off', lab: 'Empieza el ' + dMid(billDue(b, b.start)), later: true };
  if (m !== curM()) return { st: 'off', lab: 'Pendiente' };
  const due = Math.min(b.day, daysInMonth(m)); const today = +todayK().slice(8); const n = due - today;
  if (n < 0) return { st: 'bad', lab: 'Vencido', n };
  if (n === 0) return { st: 'bad', lab: 'Vence hoy', n };
  if (n <= 5) return { st: 'warn', lab: n === 1 ? 'Mañana' : `En ${n} días`, n };
  return { st: 'off', lab: 'Pendiente', n };
}
function emergencyGoal() { return state.goals.find(g => g.emergency); }

function score() {
  const inc = incomeRef(); const m = curM(); const prev = addMonths(m, -1);
  const ref = totals(prev).i > 0 ? prev : m; const t = totals(ref);
  const parts = [];
  // Ahorro
  const rate = t.i > 0 ? Math.max(0, (t.i - t.o + sumSys('ahorro', ref)) / t.i) : 0;
  const pA = t.i > 0 ? Math.round(25 * Math.min(1, rate / 0.2)) : 12;
  parts.push({ name: 'Ahorro', pts: pA, max: 25, detail: t.i > 0 ? `Guardaste el ${pct(rate, 0)} de lo que entró en ${mName(ref).toLowerCase()}.` : 'Aún no hay ingresos registrados: lo medimos cuando anotes tu primer ingreso.', how: 'Llega al 20% de ahorro separando primero tu ahorro el día de pago.' });
  // Colchón
  const eg = emergencyGoal(); const exp = Math.max(1, avgExpense()); const months = eg ? eg.saved / exp : 0;
  const pC = Math.round(25 * Math.min(1, months / 3));
  parts.push({ name: 'Fondo de emergencia', pts: pC, max: 25, detail: eg ? `Tu fondo cubre ${months.toFixed(1).replace('.', ',')} meses de gastos.` : 'Aún no tienes fondo de emergencia.', how: 'La meta es cubrir 3 meses de gastos. Empieza por uno.' });
  // Deudas
  const ds = activeDebts(); const mins = ds.reduce((a, d) => a + d.min, 0); const ratio = inc > 0 ? mins / inc : (mins > 0 ? 1 : 0);
  let pD = ds.length ? Math.round(25 * (1 - Math.min(1, ratio / 0.4))) : 25;
  const pricey = ds.some(d => d.rate >= 0.06); if (pricey) pD = Math.max(0, pD - 8);
  parts.push({ name: 'Deudas', pts: pD, max: 25, detail: ds.length ? `Tus cuotas se llevan el ${pct(ratio, 0)} de tus ingresos${pricey ? ' y tienes una deuda muy cara' : ''}.` : 'No tienes deudas activas. ¡Bien!', how: 'Que tus cuotas no pasen del 30% de lo que ganas, y sal primero de las deudas más caras.' });
  // Control
  const days = new Set(state.tx.filter(x => daysBetween(x.d, todayK()) < 14 && daysBetween(x.d, todayK()) >= 0).map(x => x.d)).size;
  let pR = Math.round(10 * Math.min(1, days / 7));
  const bud = Object.entries(state.budgets).filter(([id]) => cat(id));
  pR += bud.length ? Math.round(10 * bud.filter(([id, lim]) => sumCat(id, m) <= lim).length / bud.length) : 0;
  const dueBills = state.bills.filter(b => billActive(b, m) && Math.min(b.day, daysInMonth(m)) <= +todayK().slice(8));
  pR += dueBills.length ? Math.round(5 * dueBills.filter(b => b.paid?.[m]).length / dueBills.length) : 5;
  parts.push({ name: 'Control', pts: pR, max: 25, detail: `Anotaste ${days} de los últimos 14 días${bud.length ? '' : ' y aún no tienes presupuesto'}.`, how: 'Anota a diario, arma tu presupuesto por sobres y paga a tiempo tus pagos fijos.' });
  const total = parts.reduce((a, p) => a + p.pts, 0);
  const level = total >= 70 ? ['ok', 'Saludable'] : total >= 40 ? ['warn', 'En construcción'] : ['bad', 'En alerta'];
  return { total, parts, level };
}

function nextLesson() { return LESSONS.find(l => !state.learn.done[l.id]) || null; }
const lessonIdx = id => LESSONS.findIndex(l => l.id === id);
const unlocked = id => { const i = lessonIdx(id); return i <= 0 || !!state.learn.done[id] || !!state.learn.done[LESSONS[i - 1].id]; };
const modNum = lv => LEVELS.findIndex(x => x.id === lv) + 1;
const modLessons = lv => LESSONS.filter(l => l.level === lv);

function coach() {
  const tips = []; const m = curM(); const prev = addMonths(m, -1); const day = +todayK().slice(8);
  const add = (pr, kind, title, text, act, actLabel) => tips.push({ pr, kind, title, text, act, actLabel });
  const ds = activeDebts();
  const caro = ds.filter(d => d.rate >= 0.06).sort((a, b) => b.rate - a.rate)[0];
  if (caro) add(100, 'bad', `${caro.name} te está saliendo carísima`, `Paga cerca del ${pct(caro.rate, 0)} mensual (${pct(EA(caro.rate), 0)} al año). Ponla de primera en tu plan de deudas.`, 'lesson:gota', 'Leer: el gota a gota');
  Object.entries(state.budgets).forEach(([id, lim]) => {
    if (!cat(id) || !lim) return; const s = sumCat(id, m);
    if (s > lim) add(90, 'bad', `Te pasaste en ${catName(id)}`, `Llevas ${cop(s)} de un sobre de ${cop(lim)}. Intenta compensar en otra categoría este mes.`, 'go:plan:presupuesto', 'Ver presupuesto');
    else if (s >= lim * 0.8 && day < 22) add(70, 'warn', `${catName(id)} va al ${Math.round(s / lim * 100)}%`, `Te quedan ${cop(lim - s)} y faltan ${daysInMonth(m) - day} días del mes.`, 'go:plan:presupuesto', 'Ver presupuesto');
  });
  const last = state.tx.reduce((a, t) => t.d > a ? t.d : a, '');
  if (!last) add(95, 'warn', 'Empieza anotando tu primer gasto', 'Toca el botón amarillo y registra lo que gastaste hoy. Así arranca todo.', 'add', 'Registrar ahora');
  else { const gap = daysBetween(last, todayK()); if (gap >= 3) add(80, 'warn', `Llevas ${gap} días sin anotar`, 'Si no anotas, los números dejan de servir. Registra lo de estos días.', 'add', 'Registrar'); }
  if (day >= 10 && totals(prev).o > 0) {
    roots('out').forEach(r => {
      if (r.sys) return; const a = sumCat(r.id, m), b = sumCat(r.id, prev) * day / daysInMonth(prev);
      if (b > 30000 && a > b * 1.3 && a - b > 40000) add(60, 'warn', `${r.name} va subiendo`, `A esta altura del mes pasado llevabas cerca de ${cop(b)}; ahora vas en ${cop(a)}.`, 'report:' + r.id, 'Ver detalle');
    });
  }
  const eg = emergencyGoal();
  if (!eg) add(65, 'warn', 'Aún no tienes fondo de emergencia', `Con ${cop(Math.round(avgExpense() / 10000) * 10000)} ya cubrirías un mes de gastos. Empieza poquito a poco.`, 'goal:emergency', 'Crear mi fondo');
  const comida = state.cats.find(c => !c.parent && c.name === 'Comida');
  const t = totals(m);
  if (comida && t.o > 0) {
    const hor = state.cats.filter(c => /domicilio|mecato/i.test(c.name)).reduce((a, c) => a + sumCat(c.id, m), 0);
    if (hor > t.o * 0.1 && hor > 60000) add(55, 'warn', 'Los gastos hormiga pesan', `Domicilios y mecato van en ${cop(hor)} este mes, el ${Math.round(hor / t.o * 100)}% de tus gastos.`, 'lesson:hormiga', 'Leer: gastos hormiga');
  }
  if (!Object.keys(state.budgets).length) add(50, 'warn', 'Arma tus sobres del mes', 'Ponle un límite a 4 o 5 categorías y la app te avisa antes de que te pases.', 'go:plan:presupuesto', 'Crear presupuesto');
  const st = streak(); if (st >= 5) add(40, 'good', `¡Llevas ${st} días seguidos anotando!`, 'Ese hábito es la base de todo lo demás. Sigue así.', null, null);
  const nl = nextLesson(); if (nl) add(30, 'good', 'Tu siguiente lección', `${nl.title} · ${nl.min} min`, 'lesson:' + nl.id, 'Leer ahora');
  return tips.sort((a, b) => b.pr - a.pr).slice(0, 3);
}

/* ============ Hojas, avisos y animaciones ============ */
const stack = [];
function sheet(html, opts = {}) {
  const bg = document.createElement('div'); bg.className = 'sheet-bg';
  bg.innerHTML = `<div class="sheet${opts.full ? ' full' : ''}" role="dialog" aria-modal="true"><div class="grab" aria-hidden="true"></div>${html}</div>`;
  document.body.appendChild(bg); stack.push({ bg, onClose: opts.onClose }); enableDrag(bg, bg.firstElementChild); if (typeof armBack === 'function') armBack();
  bg.addEventListener('click', e => { if (e.target === bg) closeSheet(); });
  return bg.firstElementChild;
}
function closeSheet(cb) {
  const s = stack.pop(); if (!s) return;
  const fin = () => { s.bg.remove(); s.onClose && s.onClose(); cb && cb(); };
  if (REDUCED) return fin(); s.bg.classList.add('closing'); setTimeout(fin, 220);
}
document.addEventListener('keydown', e => { if (e.key === 'Escape' && stack.length) closeSheet(); });
function head(title) { return `<div class="shead"><h3>${title}</h3><button class="ghost" data-a="close" type="button">Cerrar</button></div>`; }
function toast(t, undo) {
  $$('.toast').forEach(x => x.remove());
  const el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status');
  el.innerHTML = `<span class="ok">${ICON.check}</span><span></span>${undo ? '<button type="button">Deshacer</button>' : ''}`;
  el.children[1].textContent = t; document.body.appendChild(el);
  const bye = () => { el.classList.add('bye'); setTimeout(() => el.remove(), 250); };
  const tm = setTimeout(bye, undo ? 4500 : 2400);
  if (undo) el.querySelector('button').onclick = () => { clearTimeout(tm); undo(); bye(); };
}
function done(btn, after) { btn.classList.add('done'); btn.innerHTML = ICON.check + 'Listo'; btn.disabled = true; setTimeout(() => { closeSheet(); after && after(); }, REDUCED ? 0 : 360); }
function confetti() {
  if (REDUCED) return; const box = document.createElement('div'); box.className = 'confetti';
  for (let i = 0; i < 40; i++) { const p = document.createElement('i'); p.style.left = Math.random() * 100 + '%'; p.style.background = PALETTE[i % 8]; p.style.animationDelay = Math.random() * .4 + 's'; p.style.animationDuration = 1.2 + Math.random() * .8 + 's'; box.appendChild(p); }
  document.body.appendChild(box); setTimeout(() => box.remove(), 2400);
}
const lastVals = {};
function countUp(el, v) {
  const key = el.id; const from = lastVals[key] ?? 0; lastVals[key] = v;
  if (REDUCED || from === v) { el.textContent = cop(v); return; }
  const t0 = performance.now(), dur = 700;
  const step = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = cop(from + (v - from) * e); if (p < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
function moneyInput(el) { el.addEventListener('input', () => { const v = el.value.replace(/\D/g, ''); el.value = v ? (+v).toLocaleString('es-CO') : ''; }); }
function segThumb(seg) { const on = seg.querySelector('button.on'), th = seg.querySelector('.th'); if (on && th) { th.style.width = on.offsetWidth + 'px'; th.style.transform = `translateX(${on.offsetLeft - 3}px)`; } }
function seg(id, items, current, cls = '') { return `<div class="seg ${cls}" id="${id}" role="tablist"><span class="th" aria-hidden="true"></span>${items.map(([k, l]) => `<button type="button" role="tab" data-seg="${k}" class="${k === current ? 'on' : ''}" aria-selected="${k === current}">${l}</button>`).join('')}</div>`; }

/* ============ Puntos, racha y logros ============ */
const nq = []; let nbusy = false;
function notify(msg, big) { nq.push({ msg, big }); if (!nbusy) nextNote(); }
function nextNote() {
  const n = nq.shift(); if (!n) { nbusy = false; return; } nbusy = true;
  const el = document.createElement('div'); el.className = 'ptoast' + (n.big ? ' big' : ''); el.setAttribute('role', 'status');
  el.innerHTML = svgI(n.big ? 'trophy' : 'star') + '<span></span>'; el.lastChild.textContent = n.msg; document.body.appendChild(el);
  setTimeout(() => { el.classList.add('bye'); setTimeout(() => { el.remove(); nextNote(); }, REDUCED ? 0 : 250); }, n.big ? 2800 : 2000);
}
function award(key, pts, msg) {
  const d = todayK(), g = state.learn.given; g[d] ||= {}; if (g[d][key]) return false;
  g[d][key] = 1; state.learn.xp += pts; Object.keys(g).forEach(k => { if (daysBetween(k, d) > 45) delete g[k]; });
  notify(msg); return true;
}
function afterTx() { award('first', 2, '+2 puntos por anotar hoy'); maintainStreak(); persist(); }
function maintainStreak() {
  const L = state.learn, today = todayK(); const days = new Set(state.tx.map(t => t.d)); L.frozen.forEach(d => days.add(d));
  let last = null; days.forEach(d => { if (d < today && (!last || d > last)) last = d; });
  if (last) { const gap = daysBetween(last, today) - 1; if (gap > 0 && gap <= L.freezes) { for (let i = 1; i <= gap; i++) { const d = addDays(last, i); L.frozen.push(d); days.add(d); } L.freezes -= gap; notify(gap === 1 ? 'Usaste un congelador: tu racha sigue viva' : `Usaste ${gap} congeladores: tu racha sigue viva`); } }
  let k = today; if (!days.has(k)) k = addDays(k, -1); let n = 0; while (days.has(k)) { n++; k = addDays(k, -1); } const start = addDays(k, 1);
  for (let x = 7; x <= n; x += 7) { const key = start + ':' + x; if (!L.marks.includes(key)) { L.marks.push(key); if (L.freezes < 2) { L.freezes++; notify('Ganaste un congelador por 7 días seguidos'); } } }
  L.marks = L.marks.slice(-30); L.frozen = L.frozen.filter(d => daysBetween(d, today) < 120);
}
function billsOnTime(m) {
  const act = state.bills.filter(b => billActive(b, m)); if (!act.length) return false;
  return act.every(b => { const id = b.paid && b.paid[m]; if (id === 'manual') return true; const t = id && state.tx.find(x => x.id === id); return t && t.d.startsWith(m) && +t.d.slice(8) <= Math.min(b.day, daysInMonth(m)); });
}
function monthlyCheck() {
  const L = state.learn, m = curM(); if (L.monthCheck === m) return; const prev = addMonths(m, -1);
  if (txOf(prev).length) {
    const ok = Object.entries(state.budgets).filter(([id, lim]) => cat(id) && lim && sumCat(id, prev) <= lim).length;
    if (ok) { L.xp += 10 * ok; L.sobreOk = true; notify(`+${10 * ok} puntos: ${ok} ${ok === 1 ? 'sobre' : 'sobres'} de ${mName(prev).split(' ')[0].toLowerCase()} dentro del límite`); }
    if (billsOnTime(prev)) L.ceroOk = true;
  }
  L.monthCheck = m;
}
const BADGES = [
  { id: 'b7', name: 'Primera semana', how: 'Anota 7 días seguidos.', icon: 'flame' },
  { id: 'b30', name: 'Un mes anotando', how: 'Anota 30 días seguidos.', icon: 'calendar' },
  { id: 'sobre', name: 'Sobre cumplido', how: 'Termina un mes dentro del límite de al menos un sobre.', icon: 'envelope' },
  { id: 'cero', name: 'Cero vencidos', how: 'Paga todos tus pagos fijos de un mes en su fecha o antes.', icon: 'checkc' },
  { id: 'col1', name: 'Colchón de 1 mes', how: 'Que tu fondo de emergencia cubra un mes de gastos.', icon: 'shield' },
  { id: 'col3', name: 'Colchón de 3 meses', how: 'Que tu fondo de emergencia cubra tres meses de gastos.', icon: 'shield2' },
  { id: 'deuda1', name: 'Una deuda menos', how: 'Paga por completo una de tus deudas.', icon: 'unlock' },
  { id: 'libre', name: 'Libre de deudas', how: 'Deja en cero todas tus deudas registradas.', icon: 'sun' },
  { id: 'meta', name: 'Meta lograda', how: 'Completa una meta de ahorro distinta al fondo de emergencia.', icon: 'target' },
  { id: 'pila', name: 'Plata sana', how: 'Llega a 70 o más en tu salud financiera.', icon: 'battery' },
  { id: 'estudio', name: 'Estudioso', how: 'Aprueba todas las lecciones de un módulo del curso.', icon: 'cap' },
  { id: 'constante', name: 'Constante', how: 'Completa 5 retos.', icon: 'trophy' }
];
function checkBadges() {
  const L = state.learn, B = L.badges, nw = [];
  const has = (id, c) => { if (c && !B[id]) { B[id] = todayK(); nw.push(id); } };
  const st = streak(); has('b7', st >= 7); has('b30', st >= 30); has('sobre', L.sobreOk); has('cero', L.ceroOk || billsOnTime(curM()));
  const eg = emergencyGoal(), exp = avgExpense(); has('col1', eg && exp > 0 && eg.saved >= exp); has('col3', eg && exp > 0 && eg.saved >= exp * 3);
  has('deuda1', state.debts.some(d => d.bal <= 0)); has('libre', state.debts.length > 0 && state.debts.every(d => d.bal <= 0));
  has('meta', state.goals.some(g => !g.emergency && g.target > 0 && g.saved >= g.target)); has('pila', score().total >= 70);
  has('estudio', LEVELS.some(lv => LESSONS.filter(l => l.level === lv.id).every(l => L.done[l.id]))); has('constante', state.ch.done.length >= 5);
  if (nw.length) { persist(); confetti(); nw.forEach(id => notify('¡Nuevo logro: ' + BADGES.find(b => b.id === id).name + '!', true)); }
}

/* ============ Tema ============ */
const THEME_BG = { light: '#F2F5F7', dark: '#071017' };
function applyTheme() {
  const th = state.profile.theme || 'auto', r = document.documentElement;
  if (th === 'auto') { if (r.dataset.pilasTheme) { delete r.dataset.theme; delete r.dataset.pilasTheme; } }
  else { r.dataset.theme = th; r.dataset.pilasTheme = '1'; }
  $$('meta[name="theme-color"]').forEach(m => { const dark = (m.getAttribute('media') || '').includes('dark'); m.setAttribute('content', th === 'auto' ? (dark ? THEME_BG.dark : THEME_BG.light) : THEME_BG[th]); });
}

/* ============ Cerrar hojas deslizando hacia abajo ============ */
function enableDrag(bg, sh) {
  let st = null;
  const reset = () => { sh.style.transition = REDUCED ? 'none' : 'transform .22s var(--ease)'; bg.style.transition = REDUCED ? 'none' : 'background .22s ease'; sh.style.transform = ''; bg.style.background = ''; setTimeout(() => { sh.style.transition = ''; bg.style.transition = ''; }, 260); };
  sh.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return; const t = e.target;
    const handle = !!t.closest('.grab') || (!!t.closest('.shead') && !t.closest('button,input,select,textarea,a'));
    if (!handle && (t.closest('input,textarea,select,.favlist,[data-nodrag]') || sh.scrollTop > 0)) return;
    st = { id: e.pointerId, y0: e.clientY, x0: e.clientX, handle, drag: false, dy: 0, ly: e.clientY, lt: e.timeStamp, v: 0 };
  });
  sh.addEventListener('pointermove', e => {
    if (!st || e.pointerId !== st.id) return; const dy = e.clientY - st.y0, dx = e.clientX - st.x0;
    if (!st.drag) {
      if (st.handle ? Math.abs(dy) > 4 : (dy > 8 && dy > Math.abs(dx) * 1.2 && sh.scrollTop <= 0)) { st.drag = true; try { sh.setPointerCapture(st.id); } catch (_) { } sh.style.animation = 'none'; bg.style.animation = 'none'; sh.style.transition = 'none'; sh.style.userSelect = 'none'; }
      else { if (!st.handle && (dy < -6 || Math.abs(dx) > 14)) st = null; return; }
    }
    const d = Math.max(0, dy); st.dy = d; const dt = e.timeStamp - st.lt; if (dt > 0) { st.v = (e.clientY - st.ly) / dt; st.ly = e.clientY; st.lt = e.timeStamp; }
    sh.style.transform = `translateY(${d}px)`; bg.style.background = `rgba(10,12,30,${(0.5 * (1 - Math.min(1, d / Math.max(240, sh.offsetHeight)))).toFixed(3)})`;
  });
  const end = e => {
    if (!st || e.pointerId !== st.id) return; const s0 = st; st = null; if (!s0.drag) return; sh.style.userSelect = '';
    sh._dragged = true; setTimeout(() => { sh._dragged = false; }, 60);
    if (e.type !== 'pointercancel' && (s0.dy > 120 || (s0.v > 0.6 && s0.dy > 20))) { sh.style.animation = ''; bg.style.animation = ''; closeSheet(); }
    else reset();
  };
  sh.addEventListener('pointerup', end); sh.addEventListener('pointercancel', end);
  sh.addEventListener('touchmove', e => { if (!st) return; const dy = e.touches[0].clientY - st.y0; if (st.drag || st.handle || (dy > 0 && sh.scrollTop <= 0)) e.preventDefault(); }, { passive: false });
  sh.addEventListener('click', e => { if (sh._dragged) { e.stopPropagation(); e.preventDefault(); } }, true);
}

/* ============ Navegación ============ */
let tab = 'inicio';
const sub = { movs: 'lista', plan: 'presupuesto', aprende: 'lecciones' };
let movM = curM(), repM = curM(), repNode = null;
const movF = { k: 'all', cat: null, q: '' };
let newTx = null;

function render(opts = {}) {
  idx();
  const v = $('#view');
  if (!state.profile.onboarded) { $('#tabbar').hidden = true; $('#top').hidden = true; v.innerHTML = onbView(); afterOnb(); if (onb.step > 0) armBack(); return; }
  $('#tabbar').hidden = false; $('#top').hidden = false; $('#backBtn').hidden = !navHist.length; checkBadges();
  $$('.tab').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
  const html = ({ inicio: inicioView, movs: movsView, plan: planView, aprende: aprendeView })[tab]();
  v.innerHTML = html;
  if (!opts.quiet) { v.classList.remove('view'); void v.offsetWidth; v.classList.add('view'); }
  $$('.seg', v).forEach(segThumb);
  afterRender();
}
/* Volver atrás: la app recuerda por dónde ibas (botón de arriba y gesto o botón "atrás" del celular) */
const navHist = []; let navArmed = false;
function armBack() { if (!navArmed) { try { history.pushState({ numia: 1 }, ''); navArmed = true; } catch (_) { } } }
function pushNav() { navHist.push({ tab, sub: { ...sub }, repNode, repM, y: scrollY }); if (navHist.length > 40) navHist.shift(); armBack(); }
function goBack() {
  if (stack.length) { closeSheet(); return true; }
  if (!state.profile.onboarded) { if (onb.step > 0) { onb.step--; render(); return true; } return false; }
  const s = navHist.pop(); if (!s) return false;
  tab = s.tab; Object.assign(sub, s.sub); repNode = s.repNode; repM = s.repM; render(); scrollTo({ top: s.y, behavior: 'auto' }); return true;
}
addEventListener('popstate', () => { navArmed = false; if (goBack()) armBack(); });
$('#backBtn').addEventListener('click', () => goBack());
function go(t, s, noPush) { if (!noPush && (t !== tab || (s && s !== sub[t]))) pushNav(); tab = t; if (s) sub[t] = s; render(); scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); }
$$('.tab').forEach(b => b.addEventListener('click', () => go(b.dataset.tab)));
$('#fab').addEventListener('click', () => openAdd('out'));
$('#settingsBtn').addEventListener('click', openSettings);
addEventListener('resize', () => $$('.seg').forEach(segThumb));

/* ============ Bienvenida y diagnóstico ============ */
let onb = { step: 0, name: '', path: '', income: '', incomeType: 'fijo', saved: '', debts: [] };
function onbView() {
  const S = onb.step; const dots = `<div class="steps">${[0, 1, 2, 3, 4].map(i => `<i class="${i <= S ? 'on' : ''}"></i>`).join('')}</div>`;
  if (S === 0) return `<section class="onb welcome">
    <div class="hero-brand" role="img" aria-label="NüMIA"><img class="logo" src="logo.png" alt="" width="76" height="76"><span class="wm" aria-hidden="true"></span></div>
    <h1>Tu plata, bajo control.</h1>
    <p>Controla tus gastos, sal de deudas y aprende a ahorrar, a tu ritmo y sin que nadie te juzgue.</p>
    <label class="field" for="oName">¿Cómo te llamas?<input id="oName" value="${esc(onb.name)}" placeholder="Tu nombre" autocomplete="given-name"></label>
    <button class="primary" data-o="next" type="button">Empezar</button>
    <button class="ghost" data-o="demo" type="button" style="min-height:48px">Explorar con datos de ejemplo</button>
    <p class="sub">Tus datos se guardan solo en este celular.</p></section>`;
  if (S === 1) return `<section class="onb">${dots}<h1>¿En qué momento estás con tu plata?</h1><p>Así te armo un camino a tu medida. Lo puedes cambiar cuando quieras.</p>
    ${[['start', 'sprout', 'Estoy empezando', 'Empecé a ganar mi plata y quiero hacerlo bien desde ya.'], ['order', 'compass', 'Quiero ordenarme', 'Gano, pero no sé a dónde se va la plata.'], ['debt', 'unlock', 'Quiero salir de deudas', 'Las cuotas me tienen apretado y quiero un plan.']].map(([k, ic, t, d]) => `<button class="choice ${onb.path === k ? 'on' : ''}" data-o="path:${k}" type="button"><span class="ic" aria-hidden="true">${svgI(ic)}</span><span><b>${t}</b><small>${d}</small></span></button>`).join('')}
    <button class="primary" data-o="next" type="button" ${onb.path ? '' : 'disabled style="opacity:.5"'}>Continuar</button></section>`;
  if (S === 2) return `<section class="onb">${dots}<h1>¿Cuánto te entra al mes, más o menos?</h1><p>Sueldo, ventas, trabajos extra. Un aproximado sirve.</p>
    <label class="amount" for="oInc"><span>$</span><input id="oInc" inputmode="numeric" placeholder="0" value="${esc(onb.income)}" aria-label="Ingreso mensual"></label>
    <div class="seg" id="oType">${[['fijo', 'Fijo cada mes'], ['variable', 'Cambia cada mes']].map(([k, l]) => `<button type="button" data-o="type:${k}" class="${onb.incomeType === k ? 'on' : ''}">${l}</button>`).join('')}<span class="th"></span></div>
    <button class="primary" data-o="next" type="button">Continuar</button><button class="link" data-o="back" type="button">Atrás</button></section>`;
  if (S === 3) return `<section class="onb">${dots}<h1>¿Tienes algo ahorrado para emergencias?</h1><p>Plata que podrías usar si mañana pasa algo. Si no tienes, pon 0, no pasa nada.</p>
    <label class="amount" for="oSav"><span>$</span><input id="oSav" inputmode="numeric" placeholder="0" value="${esc(onb.saved)}" aria-label="Ahorro para emergencias"></label>
    <button class="primary" data-o="next" type="button">Continuar</button><button class="link" data-o="back" type="button">Atrás</button></section>`;
  if (S === 4) return `<section class="onb">${dots}<h1>¿Tienes deudas?</h1><p>Tarjetas, préstamos, créditos o plata que le debas a alguien. Puedes agregarlas ahora o después.</p>
    <div class="list">${onb.debts.map((d, i) => `<div class="item"><span class="cdot" style="background:color-mix(in srgb,var(--loss) 14%,transparent);color:var(--loss)">$</span><span class="t"><b>${esc(d.name)}</b><small>Cuota ${cop(d.min)} · ${pct(d.rate, 1)} mensual</small></span><span class="amt">${cop(d.bal)}</span></div>`).join('') || '<p class="empty">Aún no agregas deudas.</p>'}</div>
    <button class="ghost" data-o="adddebt" type="button" style="min-height:48px">${ICON.plus} Agregar una deuda</button>
    <button class="primary" data-o="finish" type="button">Ver mi diagnóstico</button><button class="link" data-o="back" type="button">Atrás</button></section>`;
  return '';
}
function afterOnb() {
  const i = $('#oInc'), s = $('#oSav'); if (i) moneyInput(i); if (s) moneyInput(s);
  $$('#view .seg').forEach(segThumb);
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-o]'); if (!b) return;
  const [a, val] = b.dataset.o.split(':');
  const keep = () => { const n = $('#oName'); if (n) onb.name = n.value.trim(); const i = $('#oInc'); if (i) onb.income = i.value; const s = $('#oSav'); if (s) onb.saved = s.value; };
  keep();
  if (a === 'demo') { loadDemo(onb.name); return; }
  if (a === 'path') { onb.path = val; render(); return; }
  if (a === 'type') { onb.incomeType = val; render(); return; }
  if (a === 'back') { onb.step--; render(); return; }
  if (a === 'next') { if (onb.step === 1 && !onb.path) return; onb.step++; render(); return; }
  if (a === 'adddebt') { openDebtForm(null, d => { onb.debts.push(d); render(); }); return; }
  if (a === 'finish') {
    const name = onb.name; state = freshState(); seedCats(); idx();
    Object.assign(state.profile, { name, path: onb.path === 'debt' ? 'debt' : 'start', pathRaw: onb.path, income: money(onb.income), incomeType: onb.incomeType, onboarded: true });
    const sv = money(onb.saved); const exp = Math.max(300000, money(onb.income) * 0.7);
    state.goals.push({ id: nid('g'), name: 'Fondo de emergencia', target: Math.round(exp * 3 / 50000) * 50000, saved: sv, date: '', emergency: true });
    onb.debts.forEach(d => state.debts.push({ ...d, id: nid('d'), orig: d.bal }));
    persist(); tab = 'inicio'; render(); setTimeout(() => openScore(true), 350);
  }
});

/* ============ Datos de ejemplo ============ */
function loadDemo(name) {
  state = freshState(); seedCats(); idx();
  Object.assign(state.profile, { name: name || 'Haderson', path: 'debt', income: 2600000, incomeType: 'variable', onboarded: true, demo: true });
  const find = n => state.cats.find(c => c.name === n).id;
  const R = (a, b) => Math.round((a + Math.random() * (b - a)) / 1000) * 1000;
  const add = (d, k, c, a, note = '') => state.tx.push({ id: nid('t'), d, k, cat: find(c), a, note });
  const today = todayK(); const m0 = curM();
  for (let back = 2; back >= 0; back--) {
    const m = addMonths(m0, -back); const last = back === 0 ? +today.slice(8) : daysInMonth(m);
    const D = n => m + '-' + pad(Math.min(n, last));
    if (last >= 1) add(D(1), 'in', 'Sueldo', 2200000, 'Pago quincena');
    if (last >= 16) add(D(16), 'in', 'Trabajo extra', R(250000, 450000), 'Tours fin de semana');
    if (last >= 5) add(D(5), 'out', 'Arriendo', 850000);
    if (last >= 12) add(D(12), 'out', 'Luz', R(70000, 95000));
    if (last >= 12) add(D(12), 'out', 'Agua', R(40000, 55000));
    if (last >= 15) add(D(15), 'out', 'Internet', 85000);
    if (last >= 20) add(D(20), 'out', 'Celular', 45000);
    if (last >= 25) add(D(25), 'out', 'Tarjeta de crédito', 180000, 'Cuota tarjeta');
    if (last >= 8) add(D(8), 'out', 'Préstamos', 380000, 'Cuota moto');
    for (let d = 1; d <= last; d++) {
      const k = D(d);
      if (d % 7 === 2) add(k, 'out', 'Mercado', R(90000, 150000), 'Mercado semanal');
      if (d % 3 === 0) add(k, 'out', 'Domicilios', R(22000, 38000) + (back === 0 ? 6000 : 0), d % 2 ? 'Rappi' : 'Hamburguesa');
      if (d % 2 === 0) add(k, 'out', 'Mecato', R(4000, 9000));
      if (d % 4 === 1) add(k, 'out', 'Gasolina', R(30000, 50000));
      if (d % 9 === 4) add(k, 'out', 'Salidas', R(40000, 90000), 'Salida con amigos');
      if (d % 6 === 3) add(k, 'out', 'Bus y Metro', 12000);
    }
    if (last >= 3) add(D(3), 'out', 'Suscripciones', 33000, 'Streaming');
    if (last >= 18) add(D(18), 'out', 'Ropa', R(80000, 160000));
    if (last >= 2) add(D(2), 'out', 'Ahorro', 150000, 'Meta: Fondo de emergencia');
  }
  state.budgets[find('Comida')] = 700000; state.budgets[find('Transporte')] = 450000; state.budgets[find('Diversión')] = 200000; state.budgets[find('Domicilios')] = 250000;
  const mk = (name, a, day, c) => ({ id: nid('b'), name, a, day, cat: find(c), paid: {} });
  state.bills = [mk('Arriendo', 850000, 5, 'Arriendo'), mk('Internet', 85000, 15, 'Internet'), mk('Celular', 45000, 20, 'Celular'), mk('Cuota tarjeta', 180000, 25, 'Tarjeta de crédito'), mk('Cuota moto', 380000, 8, 'Préstamos')];
  state.bills.forEach(b => { for (let back = 2; back >= 0; back--) { const m = addMonths(m0, -back); const t = state.tx.find(x => x.d.startsWith(m) && x.cat === b.cat && x.a === b.a); if (t) b.paid[m] = t.id; } });
  state.debts = [
    { id: nid('d'), name: 'Tarjeta de crédito', bal: 2800000, orig: 3500000, rate: 0.021, min: 180000 },
    { id: nid('d'), name: 'Crédito de la moto', bal: 6200000, orig: 8000000, rate: 0.016, min: 380000 },
    { id: nid('d'), name: 'Préstamo de un amigo', bal: 300000, orig: 500000, rate: 0, min: 100000 }
  ];
  state.plan = { strategy: 'avalanche', extra: 100000 };
  state.goals = [
    { id: nid('g'), name: 'Fondo de emergencia', target: 4500000, saved: 750000, date: '', emergency: true },
    { id: nid('g'), name: 'Viaje de diciembre', target: 1500000, saved: 450000, date: m0.slice(0, 4) + '-12-15', emergency: false }
  ];
  state.favs = [
    { k: 'out', cat: find('Bus y Metro'), a: 12000, note: 'Pasajes del día', u: 9 },
    { k: 'out', cat: find('Mecato'), a: 6000, note: 'Tinto y pandebono', u: 7 },
    { k: 'out', cat: find('Mercado'), a: 120000, note: 'Mercado semanal', u: 4 },
    { k: 'in', cat: find('Trabajo extra'), a: 150000, note: 'Tour de fin de semana', u: 3 }
  ];
  Object.assign(state.learn, { done: { finanzas: true, flujo: true, necesidades: true }, scores: { finanzas: 4, flujo: 3, necesidades: 4 }, xp: 30 });
  state.ch = { active: { id: 'c1', start: addDays(today, -2), checks: [addDays(today, -2), addDays(today, -1)] }, done: [], custom: [] };
  maintainStreak(); persist(); tab = 'inicio'; render();
}

/* ============ Inicio ============ */
function inicioView() {
  const m = curM(); const t = totals(m); const sc = score(); const p = state.profile;
  const est = !t.i && p.income > 0; const base = t.i || p.income; const left = base - t.o; const st = streak(); const fz = state.learn.freezes || 0;
  const sav = sumSys('ahorro', m), debtP = sumSys('deudas', m), gastos = Math.max(0, t.o - sav - debtP), libre = Math.max(0, left);
  const pend = state.bills.filter(b => billActive(b, m) && !(b.paid && b.paid[m])).reduce((a, b) => a + b.a, 0);
  const daysLeft = daysInMonth(m) - +todayK().slice(8) + 1; const avail = left - pend; const perDay = Math.floor(avail / daysLeft / 1000) * 1000;
  const totW = Math.max(base, t.o, 1); const w = v => (v / totW * 100).toFixed(2) + '%';
  const parts = [['Gastos', gastos, 'var(--hero-loss)'], ['Deudas', debtP, 'var(--hero-debt)'], ['Ahorro', sav, 'var(--hero-gain)']];
  const R = 40, C = 2 * Math.PI * R;
  const bills = state.bills.map(b => ({ b, s: billStatus(b) })).filter(x => ['bad', 'warn'].includes(x.s.st)).sort((a, b) => a.s.n - b.s.n);
  const buds = Object.entries(state.budgets).filter(([id]) => cat(id)).map(([id, lim]) => ({ id, lim, s: sumCat(id, m) })).sort((a, b) => b.s / b.lim - a.s / a.lim).slice(0, 3);
  const ch = state.ch.active && allChallenges().find(c => c.id === state.ch.active.id);
  const nl = nextLesson();
  return `
  ${state.profile.demo ? `<div class="note rise" style="--d:0;display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap"><span>Estás viendo <b>datos de ejemplo</b>.</span><button class="ghost" data-act="reset" type="button">Empezar con mis datos</button></div>` : ''}
  <div class="between rise" style="--d:0"><div><h1 style="font-size:22px">Hola${p.name ? ', ' + esc(p.name) : ''}</h1><span class="sub">${dLong(todayK())}</span></div>${st || fz ? `<span class="pill warn streak">${svgI('flame')}${st} ${st === 1 ? 'día' : 'días'}${fz ? `<span class="fz" title="Congeladores">${svgI('snow')}${fz}</span>` : ''}</span>` : ''}</div>
  <section class="hero rise" style="--d:1" aria-label="Resumen del mes">
    <div class="between z"><span class="lbl">Te queda este mes</span><span class="sub">${mName(m)}</span></div>
    <div class="z" style="display:grid;gap:4px"><div class="big n ${left < 0 ? 'neg' : ''}" id="hBal">${cop(left)}</div><span class="sub n">${base ? `de ${cop(base)} que ${est ? 'esperas' : 'entraron'}` : 'Registra tus ingresos para ver cuánto te queda'}</span></div>
    <div class="perday z n ${perDay > 0 ? '' : avail > 0 ? 'tight' : 'over'}">${svgI('bolt')}<div>${perDay > 0 ? `<b>Puedes gastar ${cop(perDay)} al día</b> <span>por ${daysLeft} ${daysLeft === 1 ? 'día' : 'días'}</span>` : avail > 0 ? `<b>Te quedan ${cop(avail)} para ${daysLeft} ${daysLeft === 1 ? 'día' : 'días'}.</b> <span>Hasta fin de mes, solo lo necesario.</span>` : `<b>Te pasaste ${cop(-avail)} este mes.</b> <span>Hasta fin de mes, solo lo necesario.</span>`}
      ${pend ? `<small>${avail > 0 ? 'Ya descontamos' : 'Incluye'} ${cop(pend)} de pagos fijos pendientes</small>` : ''}${est ? '<small>Es un cálculo aproximado con el ingreso de tu perfil. Regístralo cuando te llegue.</small>' : ''}</div></div>
    <div class="z" style="display:grid;gap:10px">
      <div class="stack" role="img" aria-label="Gastos ${cop(gastos)}, deudas ${cop(debtP)}, ahorro ${cop(sav)}${left >= 0 ? ', libre ' + cop(libre) : ''}">${parts.map(([, v, c], i) => v ? `<span style="width:${w(v)};background:${c};--i:${i}"></span>` : '').join('')}${libre ? `<span style="width:${w(libre)};background:rgba(255,255,255,.2);--i:3"></span>` : ''}</div>
      <div class="slegend n">${parts.map(([l, v, c]) => `<div><i style="background:${c}"></i>${l}<b>${shortCOP(v)}</b></div>`).join('')}${left >= 0 ? `<div><i style="background:rgba(255,255,255,.35)"></i>Libre<b>${shortCOP(libre)}</b></div>` : `<div class="over">Te pasaste ${cop(-left)}</div>`}</div>
    </div>
  </section>
  <section class="panel rise" style="--d:2">
    <button class="score" data-act="score" type="button" aria-label="Ver detalle de tu salud financiera">
      <span class="ring"><svg viewBox="0 0 96 96"><circle class="bgc" cx="48" cy="48" r="${R}"/><circle class="fg" cx="48" cy="48" r="${R}" stroke="${sc.level[0] === 'ok' ? 'var(--gain-fill)' : sc.level[0] === 'warn' ? 'var(--accent)' : 'var(--loss-fill)'}" stroke-dasharray="${C}" stroke-dashoffset="${C}" data-off="${C * (1 - sc.total / 100)}"/></svg><b class="n">${sc.total}</b><small>de 100</small></span>
      <span style="display:grid;gap:6px"><span class="lbl">Salud financiera</span><span class="pill ${sc.level[0]}">${sc.level[1]}</span><span class="sub">Toca para ver qué la sube y cómo mejorar.</span></span>
    </button>
  </section>
  <section class="panel rise" style="--d:3"><div class="between"><h2>Tu entrenador</h2></div><div class="tips">${coach().map(tipHTML).join('')}</div></section>
  ${bills.length ? `<section class="panel rise" style="--d:4"><div class="between"><h2>Pagos cercanos</h2><button class="link" data-act="go:plan:pagos" type="button">Ver todos</button></div><div class="list">${bills.map(({ b, s }) => `<div class="item">${dot(b.cat)}<span class="t"><b>${esc(b.name)}</b><small><span class="pill ${s.st}">${s.lab}</span> · ${dMid(billDue(b, m))}</small></span><span class="amt n">${cop(b.a)}<button class="link" data-act="paybill:${b.id}" type="button" style="display:block;margin-left:auto">Pagar</button></span></div>`).join('')}</div></section>` : ''}
  ${buds.length ? `<section class="panel rise play" style="--d:5"><div class="between"><h2>Tus sobres</h2><button class="link" data-act="go:plan:presupuesto" type="button">Ver todos</button></div><div>${buds.map((x, i) => envHTML(x, i)).join('')}</div></section>` : ''}
  <section class="panel rise" style="--d:6">${ch ? challengeCard(ch, true) : `<div class="between"><div><h2>Reto de la semana</h2><span class="sub">Pequeños retos que crean grandes hábitos.</span></div><button class="ghost" data-act="go:aprende:retos" type="button">Ver retos</button></div>`}</section>
  ${nl ? `<section class="panel rise" style="--d:7"><span class="lbl">Lección recomendada</span><button class="lesson next" data-act="lesson:${nl.id}" type="button"><span class="st">${LESSONS.indexOf(nl) + 1}</span><span><b>${esc(nl.title)}</b><small>${LEVELS.find(l => l.id === nl.level).name} · ${nl.min} min</small></span>${ICON.chev}</button></section>` : ''}`;
}
function tipHTML(t) {
  return `<div class="tipc ${t.kind}"><span class="ic">${t.kind === 'bad' ? ICON.alert : t.kind === 'good' ? ICON.up : ICON.bulb}</span><div><b>${esc(t.title)}</b><p>${esc(t.text)}</p>${t.act ? `<button class="link" data-act="${t.act}" type="button">${esc(t.actLabel)} →</button>` : ''}</div></div>`;
}
function envHTML({ id, lim, s }, i) {
  const r = lim ? s / lim : 0; const cls = r > 1 ? 'bad' : r >= .8 ? 'warn' : '';
  return `<div class="env ${cls}"><div class="between"><span class="row" style="gap:8px;min-width:0">${dot(id, 28)}<b style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(catName(id))}</b></span><span class="n" style="font-weight:700">${cop(s)} <span class="sub">de ${cop(lim)}</span></span></div>
  <div class="bar"><span style="width:${Math.min(100, r * 100)}%;--i:${i}"></span></div>
  <span class="sub n ${r > 1 ? 'down' : ''}">${r > 1 ? `Te pasaste ${cop(s - lim)}` : `Te quedan ${cop(lim - s)}`}</span></div>`;
}
function challengeCard(ch, compact) {
  const a = state.ch.active; const today = todayK(); const checked = a.checks.includes(today);
  const n = Math.min(ch.days, 14); const startIdx = Math.max(0, daysBetween(a.start, today) - n + 1);
  const cells = []; for (let i = 0; i < ch.days && cells.length < 14; i++) { const k = addDays(a.start, i + (ch.days > 14 ? startIdx : 0)); cells.push(`<span class="${a.checks.includes(k) ? 'ok' : ''} ${k === today ? 'today' : ''}">${a.checks.includes(k) ? '✓' : i + 1 + (ch.days > 14 ? startIdx : 0)}</span>`); }
  return `<div class="between"><div style="min-width:0"><span class="lbl">Reto activo</span><h2>${esc(ch.name)}</h2></div><span class="pill brand n">${a.checks.length}/${ch.days}</span></div>
  ${compact ? '' : `<p class="sub" style="margin:0">${esc(ch.desc)}</p>`}
  <div class="days">${cells.join('')}</div>
  <div class="btns"><button class="primary ${checked ? 'done' : ''}" data-act="checkin" type="button" ${checked ? 'disabled' : ''}>${checked ? ICON.check + 'Hoy cumpliste' : 'Hoy lo cumplí'}</button></div>`;
}

/* ============ Movimientos y reporte ============ */
function movsView() {
  return `${seg('movSeg', [['lista', 'Movimientos'], ['reporte', 'Reporte']], sub.movs)}${sub.movs === 'lista' ? listaView() : reporteView()}`;
}
function monthNav(id, m) { return `<div class="between"><button class="iconbtn" data-act="${id}:-1" type="button" aria-label="Mes anterior">${ICON.left}</button><b style="font-family:var(--display);font-size:17px">${mName(m)}</b><button class="iconbtn" data-act="${id}:1" type="button" aria-label="Mes siguiente" ${m >= curM() ? 'disabled style="opacity:.4"' : ''}><span style="display:inline-block;transform:rotate(180deg)">${ICON.left}</span></button></div>`; }
function listaView() {
  let list = txOf(movM);
  if (movF.k !== 'all') list = list.filter(t => t.k === movF.k);
  if (movF.cat && cat(movF.cat)) { const s = desc(movF.cat); list = list.filter(t => s.has(t.cat)); }
  if (movF.q) { const q = norm(movF.q); list = list.filter(t => norm(catPath(t.cat) + ' ' + (t.note || '') + ' ' + t.a).includes(q)); }
  list.sort((a, b) => b.d.localeCompare(a.d) || b.id.localeCompare(a.id, undefined, { numeric: true }));
  let i = 0, o = 0; list.forEach(t => t.k === 'in' ? i += t.a : o += t.a);
  const groups = {}; list.forEach(t => (groups[t.d] ||= []).push(t));
  return `<section class="panel tight">${monthNav('movm', movM)}
    <label class="search" for="movQ">${ICON.search}<input id="movQ" type="search" placeholder="Buscar por nota, categoría o valor" value="${esc(movF.q)}" autocomplete="off"></label>
    <div class="chips">${[['all', 'Todo'], ['out', 'Gastos'], ['in', 'Ingresos']].map(([k, l]) => `<button class="chip ${movF.k === k ? 'on' : ''}" data-act="movk:${k}" type="button">${l}</button>`).join('')}
    <button class="chip ${movF.cat ? 'on' : ''}" data-act="movcat" type="button">${movF.cat && cat(movF.cat) ? esc(catName(movF.cat)) + ' <span class="x">' + ICON.x + '</span>' : 'Categoría ▾'}</button></div>
    <div class="kpis n"><div class="kpi"><span class="lbl">Entró</span><b class="up">${cop(i)}</b></div><div class="kpi"><span class="lbl">Salió</span><b class="down">${cop(o)}</b></div><div class="kpi"><span class="lbl">Balance</span><b>${cop(i - o)}</b></div></div>
  </section>
  <section class="panel tight">${list.length ? Object.entries(groups).map(([d, ts]) => `<div class="dayh"><span>${dLong(d)}</span><span class="n">${cop(ts.reduce((a, t) => a + (t.k === 'in' ? t.a : -t.a), 0))}</span></div><div class="list">${ts.map(txRow).join('')}</div>`).join('') : `<p class="empty">${state.tx.length ? 'No hay movimientos con estos filtros.' : 'Aún no registras movimientos. Toca el botón amarillo para empezar.'}</p>`}</section>
  <button class="ghost wrapbtn" data-act="cats" type="button" style="min-height:48px">Administrar categorías</button>`;
}
function txRow(t) {
  const p = pathOf(t.cat);
  return `<button class="item ${t.id === newTx ? 'new' : ''}" data-act="tx:${t.id}" type="button">${dot(t.cat)}<span class="t"><b>${esc(t.note || catName(t.cat))}</b><small>${esc(t.note ? p.map(c => c.name).join(' › ') : p.slice(0, -1).map(c => c.name).join(' › ') || (t.k === 'in' ? 'Ingreso' : 'Gasto'))}</small></span><span class="amt n ${t.k === 'in' ? 'up' : ''}">${t.k === 'in' ? '+' : '−'}${cop(t.a)}</span></button>`;
}
function reporteView() {
  const m = repM, prev = addMonths(m, -1); const t = totals(m), tp = totals(prev);
  const sv = sumSys('ahorro', m); const rate = t.i > 0 ? (t.i - t.o + sv) / t.i : 0;
  const delta = (a, b, inv) => { if (!b) return ''; const d = (a - b) / b; const good = inv ? d < 0 : d > 0; return `<small class="${good ? 'up' : 'down'}">${d >= 0 ? '▲' : '▼'} ${Math.abs(Math.round(d * 100))}%</small>`; };
  const node = repNode && cat(repNode) ? repNode : null;
  const list = (node ? kidsOf(node) : roots('out')).map(c => ({ c, v: sumCat(c.id, m) })).filter(x => x.v > 0).sort((a, b) => b.v - a.v);
  const own = node ? state.tx.filter(x => x.cat === node && x.d.startsWith(m)).reduce((a, x) => a + x.a, 0) : 0;
  const tot = node ? sumCat(node, m) : t.o; const mx = Math.max(1, ...list.map(x => x.v), own);
  const inc = roots('in').map(c => ({ c, v: sumCat(c.id, m) })).filter(x => x.v > 0).sort((a, b) => b.v - a.v); const mi = Math.max(1, ...inc.map(x => x.v));
  return `<section class="panel tight">${monthNav('repm', m)}
    <div class="kpis n"><div class="kpi"><span class="lbl">Entró</span><b class="up">${cop(t.i)}</b>${delta(t.i, tp.i)}</div><div class="kpi"><span class="lbl">Salió</span><b class="down">${cop(t.o)}</b>${delta(t.o, tp.o, true)}</div><div class="kpi"><span class="lbl">Ahorraste</span><b>${t.i ? pct(Math.max(0, rate), 0) : '—'}</b><small class="sub">de lo que entró</small></div></div></section>
  <section class="panel"><div class="between"><h2>Últimos 6 meses</h2></div><div class="chart" id="trend"></div>
    <div class="legend"><span><i style="background:var(--gain-fill)"></i>Entró</span><span><i style="background:var(--loss-fill)"></i>Salió</span></div></section>
  <section class="panel play"><div class="between"><h2>En qué se fue</h2><span class="sub n">${cop(tot)}</span></div>
    ${node ? `<div class="crumbs"><button data-act="repnode:" type="button">Todo</button>${pathOf(node).map(c => `<span>›</span><button data-act="repnode:${c.id}" type="button">${esc(c.name)}</button>`).join('')}</div>` : '<span class="sub" style="margin-top:-6px">Toca una categoría para ver el detalle de sus subcategorías.</span>'}
    <div>${list.map((x, i) => catBar(x.c.id, x.v, tot, mx, i, kidsOf(x.c.id).length > 0)).join('')}${own ? catBar(node, own, tot, mx, list.length, false, 'Sin subcategoría') : ''}${!list.length && !own ? '<p class="empty">No hay gastos en este periodo.</p>' : ''}</div></section>
  <section class="panel play"><div class="between"><h2>De dónde entró</h2><span class="sub n">${cop(t.i)}</span></div><div>${inc.map((x, i) => catBar(x.c.id, x.v, t.i, mi, i, false)).join('') || '<p class="empty">No hay ingresos en este periodo.</p>'}</div></section>`;
}
function catBar(id, v, tot, mx, i, drill, label) {
  const inner = `<span class="nm">${dot(id, 28)}<span>${esc(label || catName(id))}</span>${drill ? ICON.chev : ''}</span><span class="n" style="font-weight:700">${cop(v)} <span class="sub">${tot ? Math.round(v / tot * 100) : 0}%</span></span><span class="bar"><span style="width:${v / mx * 100}%;background:${catColor(id)};--i:${i}"></span></span>`;
  return drill ? `<button class="catrow" data-act="repnode:${id}" type="button">${inner}</button>` : `<div class="catrow">${inner}</div>`;
}
function drawTrend() {
  const el = $('#trend'); if (!el) return;
  const ms = [5, 4, 3, 2, 1, 0].map(n => addMonths(repM, -n)); const data = ms.map(m => ({ m, ...totals(m) }));
  const W = 520, H = 200, L = 6, R = 6, T = 20, B = 26; const mx = Math.max(1, ...data.map(d => Math.max(d.i, d.o)));
  const y = v => T + (1 - v / mx) * (H - T - B); const bw = (W - L - R) / 6, w = Math.min(22, bw * .3);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Ingresos y gastos de los últimos 6 meses">`;
  [.5, 1].forEach(f => { s += `<line x1="${L}" x2="${W - R}" y1="${y(mx * f)}" y2="${y(mx * f)}" stroke="var(--grid)"/><text x="${L}" y="${y(mx * f) - 5}">${short(mx * f)}</text>`; });
  s += `<line x1="${L}" x2="${W - R}" y1="${y(0)}" y2="${y(0)}" stroke="var(--line)" stroke-width="1.5"/>`;
  const rect = (x, v, col, i) => { const h = Math.max(v ? 2 : 0, y(0) - y(v)); const r = Math.min(4, h / 2); const t = y(0) - h; return h ? `<path class="b" style="--i:${i}" fill="${col}" d="M${x},${y(0)} V${t + r} Q${x},${t} ${x + r},${t} H${x + w - r} Q${x + w},${t} ${x + w},${t + r} V${y(0)} Z"/>` : ''; };
  data.forEach((d, i) => {
    const cx = L + bw * i + bw / 2; const sel = d.m === repM;
    s += `<g class="tb" data-i="${i}" tabindex="0" role="button" aria-label="${mName(d.m)}: entró ${cop(d.i)}, salió ${cop(d.o)}"><rect x="${cx - bw / 2 + 2}" y="${T - 16}" width="${bw - 4}" height="${H - T - B + 16}" fill="transparent"/>`;
    s += rect(cx - w - 1, d.i, 'var(--gain-fill)', i * 2) + rect(cx + 1, d.o, 'var(--loss-fill)', i * 2 + 1);
    s += `<text x="${cx}" y="${H - 7}" text-anchor="middle" style="${sel ? 'fill:var(--ink);font-weight:700' : ''}">${mShort(d.m)}</text></g>`;
  });
  s += '</svg><div class="tip" id="ttip"></div>'; el.innerHTML = s;
  const tip = $('#ttip');
  const show = g => { const d = data[+g.dataset.i]; const bb = g.getBoundingClientRect(), cb = el.getBoundingClientRect(); tip.innerHTML = `<b>${mName(d.m)}</b><br>Entró ${cop(d.i)} · Salió ${cop(d.o)}<br>Balance ${cop(d.i - d.o)}`; const half = Math.min(115, cb.width / 2); tip.style.left = Math.min(Math.max(bb.left - cb.left + bb.width / 2, half), cb.width - half) + 'px'; tip.classList.add('show'); };
  $$('.tb', el).forEach(g => { g.addEventListener('pointerenter', () => show(g)); g.addEventListener('click', () => show(g)); g.addEventListener('focus', () => show(g)); g.addEventListener('pointerleave', () => tip.classList.remove('show')); g.addEventListener('blur', () => tip.classList.remove('show')); });
  if (!REDUCED) { el.classList.remove('play'); void el.offsetWidth; el.classList.add('play'); }
}

/* ============ Plan ============ */
function planView() {
  return `${seg('planSeg', [['presupuesto', 'Presupuesto'], ['pagos', 'Pagos fijos'], ['deudas', 'Deudas'], ['metas', 'Metas']], sub.plan, 'scroll')}${({ presupuesto: budgetView, pagos: billsView, deudas: debtsView, metas: goalsView })[sub.plan]()}`;
}
function budgetView() {
  const m = curM(); const inc = incomeRef();
  const items = Object.entries(state.budgets).filter(([id]) => cat(id)).map(([id, lim]) => ({ id, lim, s: sumCat(id, m) })).sort((a, b) => pathOf(a.id)[0].name.localeCompare(pathOf(b.id)[0].name));
  const tl = items.filter(x => !items.some(y => y.id !== x.id && desc(y.id).has(x.id))).reduce((a, x) => a + x.lim, 0);
  return `<section class="panel"><div class="between"><div><h2>Tus sobres de ${mName(m).split(' ')[0].toLowerCase()}</h2><span class="sub">Un límite por categoría. Te avisamos al 80%.</span></div></div>
    ${inc ? `<div class="note n">Asignaste <b>${cop(tl)}</b> de tus ingresos de <b>${cop(inc)}</b>${tl > inc ? ' — <span class="down">más de lo que te entra</span>' : ` · quedan ${cop(inc - tl)} sin sobre`}.</div>` : ''}
    <div class="play">${items.map((x, i) => `<div style="position:relative">${envHTML(x, i)}<button class="link" data-act="budget:${x.id}" type="button" style="position:absolute;right:0;bottom:4px;min-height:30px;font-size:13px">Editar</button></div>`).join('') || '<p class="empty">Aún no tienes sobres. Empieza con comida, transporte y diversión.</p>'}</div>
    <button class="primary" data-act="budget:" type="button">${ICON.plus} Agregar sobre</button></section>
    <button class="lesson" data-act="lesson:sobres" type="button"><span class="st">?</span><span><b>¿Cómo armar un buen presupuesto?</b><small>Lección de 3 minutos</small></span>${ICON.chev}</button>`;
}
function billsView() {
  const m = curM(); const list = state.bills.slice().sort((a, b) => billNext(a).localeCompare(billNext(b)) || a.name.localeCompare(b.name));
  const act = list.filter(b => billActive(b, m) || b.paid?.[m]); const tot = act.reduce((a, b) => a + b.a, 0); const paid = act.filter(b => b.paid?.[m]).reduce((a, b) => a + b.a, 0);
  return `<section class="panel"><div class="between"><div><h2>Pagos fijos</h2><span class="sub">Lo que pagas todos los meses. Toca <b>Editar</b> para cambiar o eliminar uno.</span></div></div>
    ${act.length ? `<div class="kpis n"><div class="kpi"><span class="lbl">Este mes</span><b>${cop(tot)}</b></div><div class="kpi"><span class="lbl">Pagado</span><b class="up">${cop(paid)}</b></div><div class="kpi"><span class="lbl">Falta</span><b class="down">${cop(tot - paid)}</b></div></div>` : ''}
    <div class="list">${list.map(b => { const s = b.paid?.[billPeriod(b)] ? { st: 'ok', lab: 'Pagado' } : billStatus(b); const ok = s.st === 'ok'; return `<div class="item bill">${dot(b.cat)}<div class="bmain">
      <div class="btop"><b>${esc(b.name)}</b><span class="amt n">${cop(b.a)}</span></div>
      <small class="bdate">${ok ? 'Próximo pago' : 'Fecha de pago'}: <b>${dateLong(billNext(b))}</b></small><small>${esc(catPath(b.cat))}</small>
      <div class="acts"><span class="pill ${s.st}">${ok ? ICON.check.replace('<svg', '<svg width="12" height="12"') : ''}${s.lab}</span>${ok ? '' : `<button class="sbtn pay" data-act="paybill:${b.id}" type="button">Pagar</button>`}<button class="sbtn push" data-act="bill:${b.id}" type="button" aria-label="Editar o eliminar ${esc(b.name)}">${ICON.edit}Editar</button></div>
    </div></div>`; }).join('') || '<p class="empty">Agrega arriendo, servicios, celular y cuotas para que no se te pasen.</p>'}</div>
    <button class="primary" data-act="bill:" type="button">${ICON.plus} Agregar pago fijo</button></section>`;
}
function debtsView() {
  const ds = activeDebts(); const paidOff = state.debts.filter(d => d.bal <= 0);
  const P = state.plan; const sim = simulate(P.strategy, P.extra); const other = simulate(P.strategy === 'snowball' ? 'avalanche' : 'snowball', P.extra); const noExtra = P.extra ? simulate(P.strategy, 0) : null;
  const tot = ds.reduce((a, d) => a + d.bal, 0), mins = ds.reduce((a, d) => a + d.min, 0);
  const ord = targetOrder(P.strategy); const when = id => { const o = sim.order.find(x => x.id === id); return o ? mShort(addMonths(curM(), o.month)) + ' ' + addMonths(curM(), o.month).slice(0, 4) : '—'; };
  const free = sim.stuck ? null : addMonths(curM(), sim.months);
  return `${ds.length ? `<section class="hero"><span class="lbl" style="position:relative;z-index:1">Quedas libre de deudas en</span>
      <div class="big" style="position:relative;z-index:1;font-size:clamp(30px,9vw,42px)">${free ? mName(free) : 'Nunca, así como vas'}</div>
      <div class="tiles n"><div class="tile"><span class="lbl">Debes</span><b>${cop(tot)}</b></div><div class="tile"><span class="lbl">Intereses por pagar</span><b>${sim.stuck ? '—' : cop(sim.interest)}</b></div></div>
      ${sim.stuck ? '<span class="sub" style="position:relative;z-index:1">Con las cuotas actuales alguna deuda no baja. Aumenta el pago o revisa sus intereses.</span>' : `<span class="sub" style="position:relative;z-index:1">Pagando ${cop(sim.budget)} al mes${noExtra && !noExtra.stuck ? ` · sin el extra serían ${noExtra.months - sim.months} meses más` : ''}.</span>`}</section>
    <section class="panel"><h2>Tu plan</h2>
      ${seg('stratSeg', [['avalanche', 'Avalancha'], ['snowball', 'Bola de nieve']], P.strategy)}
      <p class="sub" style="margin:0">${P.strategy === 'avalanche' ? 'Primero la deuda con el interés más alto. Pagas menos intereses en total.' : 'Primero la deuda más pequeña. Ves resultados rápido y te motivas.'}${!other.stuck && !sim.stuck ? ` Con la otra estrategia pagarías ${cop(Math.abs(other.interest - sim.interest))} ${other.interest > sim.interest ? 'más' : 'menos'} en intereses.` : ''}</p>
      <label class="field" for="extraIn">Pago extra al mes, además de las cuotas mínimas (${cop(mins)})<input id="extraIn" inputmode="numeric" value="${P.extra ? P.extra.toLocaleString('es-CO') : ''}" placeholder="$0"></label>
      <div style="display:grid;gap:10px">${ord.map((d, i) => { const stuck = d.min <= d.bal * d.rate; return `<div class="card2 ${i === 0 ? 'focus' : ''}"><div class="between"><span class="row" style="min-width:0"><span class="order">${i + 1}</span><h3 style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(d.name)}</h3></span>${i === 0 ? '<span class="pill warn">Atacando</span>' : `<span class="sub">Libre en ${when(d.id)}</span>`}</div>
        <div class="kv n"><div><b>${cop(d.bal)}</b><span>Saldo</span></div><div><b>${d.rate ? pct(d.rate, 1) : '0%'}</b><span>Mensual${d.rate ? ' · ' + pct(EA(d.rate), 0) + ' EA' : ''}</span></div><div><b>${cop(d.min)}</b><span>Cuota</span></div></div>
        ${d.orig > d.bal ? `<div class="bar"><span style="width:${(1 - d.bal / d.orig) * 100}%;background:var(--gain-fill)"></span></div><span class="sub">Llevas pagado el ${Math.round((1 - d.bal / d.orig) * 100)}%</span>` : ''}
        ${stuck ? '<span class="pill bad">Con esta cuota la deuda no baja</span>' : ''}
        <div class="btns"><button class="ghost" data-act="abono:${d.id}" type="button">Abonar</button><button class="ghost" data-act="debt:${d.id}" type="button">Editar</button></div></div>`; }).join('')}</div>
    </section>` : `<section class="panel"><h2>Sin deudas activas</h2><p class="sub" style="margin:0">${paidOff.length ? '¡Saliste de todas tus deudas! Ahora dale con todo al ahorro.' : 'Si tienes tarjetas, préstamos o le debes a alguien, agrégalo para armar tu plan.'}</p></section>`}
    <button class="primary" data-act="debt:" type="button">${ICON.plus} Agregar deuda</button>
    <button class="ghost wrapbtn" data-act="loancalc" type="button" style="min-height:48px">¿Cuánto me cuesta de verdad un préstamo?</button>
    ${paidOff.length ? `<section class="panel tight"><h2>Deudas pagadas 🎉</h2><div class="list">${paidOff.map(d => `<div class="item"><span class="cdot" style="background:color-mix(in srgb,var(--gain-fill) 16%,transparent);color:var(--gain)">✓</span><span class="t"><b>${esc(d.name)}</b><small>${cop(d.orig || 0)} pagados</small></span><button class="link" data-act="debt:${d.id}" type="button">Ver</button></div>`).join('')}</div></section>` : ''}
    <button class="lesson" data-act="lesson:estrategias" type="button"><span class="st">?</span><span><b>Bola de nieve o avalancha</b><small>Lección de 3 minutos</small></span>${ICON.chev}</button>`;
}
function goalsView() {
  const exp = avgExpense(); const eg = emergencyGoal();
  return `${!eg ? `<section class="panel"><h2>Crea tu fondo de emergencia</h2><p class="sub" style="margin:0">Te sugerimos ${cop(Math.round(exp * 3 / 50000) * 50000)}: 3 meses de tus gastos. Es lo primero que te protege de endeudarte.</p><button class="primary" data-act="goal:emergency" type="button">Crear mi fondo</button></section>` : ''}
  ${state.goals.map(g => { const r = g.target ? Math.min(1, g.saved / g.target) : 0; const left = Math.max(0, g.target - g.saved); const wk = g.date ? Math.max(1, Math.ceil(daysBetween(todayK(), g.date) / 7)) : 0; const late = g.date && daysBetween(todayK(), g.date) < 0;
    return `<section class="panel"><div class="between"><div style="min-width:0"><span class="lbl">${g.emergency ? 'Fondo de emergencia' : 'Meta'}</span><h2>${esc(g.name)}</h2></div>${r >= 1 ? '<span class="pill ok">¡Lograda!</span>' : `<span class="pill brand n">${Math.round(r * 100)}%</span>`}</div>
    <div class="bar" style="height:12px"><span style="width:${r * 100}%;background:${r >= 1 ? 'var(--gain-fill)' : 'var(--accent)'}"></span></div>
    <div class="kv n"><div><b>${cop(g.saved)}</b><span>Ahorrado</span></div><div><b>${cop(g.target)}</b><span>Meta</span></div><div><b>${g.emergency ? (g.saved / Math.max(1, exp)).toFixed(1).replace('.', ',') + ' meses' : g.date ? dateLong(g.date).replace(/ de \d{4}$/, '') : 'Sin fecha'}</b><span>${g.emergency ? 'Te cubre' : 'Fecha'}</span></div></div>
    ${r < 1 ? `<span class="sub n">${late ? 'La fecha ya pasó. Ajusta la meta o la fecha.' : wk ? `Para llegar a tiempo: <b>${cop(Math.ceil(left / wk / 1000) * 1000)}</b> por semana durante ${wk} semanas.` : `Te faltan ${cop(left)}.`}</span>` : ''}
    <div class="btns"><button class="ghost" data-act="aporte:${g.id}" type="button">${ICON.plus} Aportar</button><button class="ghost" data-act="retiro:${g.id}" type="button">Retirar</button><button class="ghost" data-act="goal:${g.id}" type="button">Editar</button></div></section>`; }).join('')}
  <button class="primary" data-act="goal:" type="button">${ICON.plus} Nueva meta</button>
  <button class="lesson" data-act="lesson:emergencia" type="button"><span class="st">?</span><span><b>Tu fondo de emergencia</b><small>Lección de 3 minutos</small></span>${ICON.chev}</button>`;
}

/* ============ Aprende ============ */
function aprendeView() {
  const L = state.learn; const done = Object.keys(L.done).length; const lvl = Math.floor(L.xp / 50) + 1; const st = streak(); const nb = Object.keys(L.badges).length;
  return `<section class="panel"><div class="xp"><span class="medal n">${lvl}</span><div style="display:grid;gap:6px;min-width:0"><div class="between"><b style="font-family:var(--display)">Nivel ${lvl}</b><span class="sub n">${L.xp} puntos</span></div><div class="bar"><span style="width:${(L.xp % 50) / 50 * 100}%;background:var(--accent)"></span></div><span class="sub n">Te faltan ${50 - L.xp % 50} puntos para el nivel ${lvl + 1}</span></div></div>
    <div class="stats n"><span class="stat">${svgI('flame')}<span><b>${st}</b> ${st === 1 ? 'día' : 'días'} de racha</span></span><span class="stat">${svgI('snow')}<span><b>${L.freezes}</b> ${L.freezes === 1 ? 'congelador' : 'congeladores'}</span></span><span class="stat">${svgI('trophy')}<span><b>${nb}</b> de ${BADGES.length} logros</span></span><span class="stat">${svgI('cap')}<span><b>${done}</b> de ${LESSONS.length} lecciones</span></span></div>
    <button class="link" data-act="howpts" type="button" style="justify-self:start">¿Cómo gano puntos? →</button></section>
  ${seg('learnSeg', [['lecciones', 'Lecciones'], ['retos', 'Retos'], ['logros', 'Logros'], ['glosario', 'Glosario']], sub.aprende, 'scroll')}
  ${({ lecciones: lessonsView, retos: challengesView, logros: badgesView, glosario: glossaryView })[sub.aprende]()}
  <p class="sub" style="text-align:center;margin:4px 0">Contenido educativo. No reemplaza la asesoría de un profesional financiero.</p>`;
}
const dateShort = k => new Date(k + 'T12:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '');
function badgesView() {
  const B = state.learn.badges;
  return `<section class="panel"><div class="between"><div><h2>Tus logros</h2><span class="sub">Se ganan con lo que haces con tu plata, a tu ritmo.</span></div><span class="pill brand n">${Object.keys(B).length}/${BADGES.length}</span></div>
  <div class="badges">${BADGES.map((b, i) => { const got = B[b.id]; return `<div class="badge ${got ? 'got' : ''}" style="--d:${i}"><span class="bico">${svgI(b.icon)}</span><b>${esc(b.name)}</b><small>${got ? 'Logrado el ' + dateShort(got) : esc(b.how)}</small></div>`; }).join('')}</div></section>`;
}
function openHowPoints() {
  const rows = [['Anotar tu primer movimiento del día', '+2'], ['Pagar un pago fijo en su fecha o antes', '+5'], ['Aportar a una de tus metas', '+5'], ['Aprobar el examen de una lección', '+10'], ['Terminar un reto', '+20'], ['Cerrar el mes con un sobre dentro de su límite', '+10 por sobre']];
  sheet(`${head('¿Cómo gano puntos?')}
    <div class="list">${rows.map(([t, p]) => `<div class="item" style="grid-template-columns:1fr auto"><span class="t"><b style="white-space:normal">${t}</b></span><span class="pill warn n">${p}</span></div>`).join('')}</div>
    <div class="note">Cada hábito suma una vez al día. Los puntos nunca se pierden.</div>
    <div class="tipc good"><span class="ic">${svgI('snow')}</span><div><b>Congeladores</b><p>Por cada 7 días seguidos anotando ganas un congelador (puedes tener hasta 2). Si un día no alcanzas a anotar, se usa solo y tu racha sigue.</p></div></div>
    <button class="primary" data-a="close" type="button">Entendido</button>`).onclick = e => { const b = e.target.closest('button'); if (b && b.dataset.a === 'close') closeSheet(); };
}
function lessonsView() {
  const L = state.learn; const total = LESSONS.length; const done = LESSONS.filter(l => L.done[l.id]).length; const nl = nextLesson();
  const curLv = nl ? nl.level : null; const pctDone = Math.round(done / total * 100);
  return `<section class="panel course">
    <div class="between"><div style="min-width:0"><span class="lbl">Curso</span><h2 style="font-size:20px">${COURSE.name}</h2><span class="sub">${LEVELS.length} módulos · ${total} lecciones con ejemplo real y examen</span></div></div>
    <div style="display:grid;gap:6px"><div class="bar" style="height:10px"><span style="width:${pctDone}%;background:var(--accent)"></span></div><span class="sub n">${pctDone}% completado · ${done} de ${total} lecciones aprobadas</span></div>
    ${nl ? `<button class="continue" data-act="lesson:${nl.id}" type="button"><span class="cnum n">${lessonIdx(nl.id) + 1}</span><span style="min-width:0"><span class="lbl">${done ? 'Continúa donde ibas' : 'Empieza aquí'} · Módulo ${modNum(nl.level)}</span><b>${esc(nl.title)}</b><small>${nl.min} min · Lección, ejemplo real y examen</small></span>${ICON.chev}</button>`
      : `<div class="note" style="text-align:center"><b>¡Completaste el curso “${COURSE.name}”!</b><br>Puedes repasar cualquier lección y volver a presentar sus exámenes.</div>`}
  </section>
  ${LEVELS.map((lv, mi) => { const ls = modLessons(lv.id); const d = ls.filter(l => L.done[l.id]).length; const complete = d === ls.length; const locked = !unlocked(ls[0].id);
    return `<details class="panel module ${complete ? 'complete' : ''} ${locked ? 'locked' : ''}" ${lv.id === curLv ? 'open' : ''}>
      <summary><span class="mnum n">${complete ? svgI('checkc') : locked ? svgI('lock') : mi + 1}</span><span style="min-width:0;display:grid;gap:2px"><span class="lbl">Módulo ${mi + 1}${complete ? ' · Completado' : ''}</span><b>${lv.name}</b><small>${lv.desc}</small></span><span class="pill ${complete ? 'ok' : 'off'} n">${d}/${ls.length}</span></summary>
      <div class="mlist">${ls.map(l => { const isDone = !!L.done[l.id], open = unlocked(l.id), isNext = nl && nl.id === l.id; const sc = L.scores[l.id];
        return `<button class="lesson ${isDone ? 'done' : isNext ? 'next' : ''} ${open ? '' : 'lockd'}" data-act="lesson:${l.id}" type="button" ${open ? '' : 'aria-disabled="true"'}><span class="st n">${isDone ? '✓' : open ? lessonIdx(l.id) + 1 : svgI('lock')}</span><span><b>${esc(l.title)}</b><small>${isDone ? `Aprobada${sc ? ` · ${sc}/4` : ''}` : isNext ? `Siguiente · ${l.min} min` : open ? `${l.min} min` : 'Aprueba la anterior para desbloquearla'}</small></span>${open ? ICON.chev : ''}</button>`; }).join('')}</div>
    </details>`; }).join('')}`;
}
const allChallenges = () => [...CHALLENGES, ...(state.ch.custom || [])];
function challengesView() {
  const a = state.ch.active; const ac = a && allChallenges().find(c => c.id === a.id);
  const row = c => { const n = state.ch.done.filter(x => x.id === c.id).length;
    return `<div class="item"><span class="cdot n" style="background:color-mix(in srgb,var(--accent) 22%,transparent);color:var(--warn);font-size:14px">${c.days}d</span><span class="t"><b style="white-space:normal">${esc(c.name)}</b><small style="white-space:normal">${esc(c.desc || (c.days === 1 ? 'Reto de un día' : `Reto de ${c.days} días`))}</small>${c.custom ? `<button class="link" data-act="editch:${c.id}" type="button" style="min-height:28px;padding:2px 0;font-size:13px">Editar</button>` : ''}</span><span class="amt">${n ? `<span class="pill ok">×${n}</span>` : ''}<button class="link" data-act="startch:${c.id}" type="button" style="display:block;margin-left:auto">${ac ? 'Cambiar' : 'Empezar'}</button></span></div>`; };
  const mine = (state.ch.custom || []).filter(c => !a || c.id !== a.id), base = CHALLENGES.filter(c => !a || c.id !== a.id);
  return `${ac ? `<section class="panel">${challengeCard(ac, false)}<div class="between">${ac.custom ? `<button class="link" data-act="editch:${ac.id}" type="button">Editar reto</button>` : '<span></span>'}<button class="link" data-act="quitch" type="button" style="color:var(--muted)">Abandonar reto</button></div></section>` : ''}
  <section class="panel tight"><div class="between"><div><h2>Tus retos</h2><span class="sub">Crea retos a tu medida: ahorrar para algo, dejar un gasto, un hábito nuevo.</span></div></div>
    <div class="list">${mine.map(row).join('') || `<p class="empty">${(state.ch.custom || []).length ? 'Tu reto está activo arriba.' : 'Aún no has creado retos propios.'}</p>`}</div>
    <button class="primary" data-act="newch" type="button">${ICON.plus} Crear un reto</button></section>
  <section class="panel tight"><h2>${ac ? 'Otros retos' : 'Retos sugeridos'}</h2><div class="list">${base.map(row).join('')}</div></section>`;
}
function openChallengeForm(id) {
  const c0 = id ? (state.ch.custom || []).find(c => c.id === id) : null; let days = c0 ? c0.days : 7;
  const opts = [3, 5, 7, 14, 21, 30];
  const sh = formSheet(c0 ? 'Editar reto' : 'Nuevo reto', `<label class="field" for="chName">Nombre del reto<input id="chName" maxlength="50" value="${esc(c0?.name || '')}" placeholder="Ej: Una semana sin comprar café"></label>
    <label class="field" for="chDesc">¿Qué tienes que cumplir cada día? (opcional)<input id="chDesc" maxlength="120" value="${esc(c0?.desc || '')}" placeholder="Ej: Llevar el tinto desde la casa"></label>
    <div class="field">Duración<div class="chips" id="chDays">${opts.map(d => `<button type="button" class="chip ${d === days ? 'on' : ''}" data-days="${d}">${d} días</button>`).join('')}</div>
    <label class="field" for="chOther" style="margin-top:4px">Otra duración (días)<input id="chOther" type="number" inputmode="numeric" min="1" max="365" value="${opts.includes(days) ? '' : days}" placeholder="Entre 1 y 365"></label></div>
    <label class="switch" for="chStart"><span>Empezarlo ahora<small>${state.ch.active ? 'Reemplaza el reto que tienes activo' : 'Queda como tu reto activo'}</small></span><input type="checkbox" id="chStart" ${c0 ? '' : 'checked'}><span class="knob" aria-hidden="true"></span></label>`, (b, sh) => {
    if (b.dataset.a === 'del') {
      state.ch.custom = state.ch.custom.filter(c => c.id !== id); if (state.ch.active && state.ch.active.id === id) state.ch.active = null;
      persist(); return closeSheet(() => { render({ quiet: true }); toast('Reto eliminado'); });
    }
    const name = $('#chName', sh).value.trim(), desc = $('#chDesc', sh).value.trim(), other = +$('#chOther', sh).value || 0; const d = other ? Math.min(365, Math.max(1, Math.round(other))) : days;
    if (!name) { $('#fMsg', sh).textContent = 'Ponle un nombre a tu reto.'; return; }
    let cid = id;
    if (c0) Object.assign(c0, { name, desc, days: d }); else { cid = nid('u'); (state.ch.custom ||= []).push({ id: cid, name, desc, days: d, custom: true }); }
    if ($('#chStart', sh).checked) state.ch.active = { id: cid, start: todayK(), checks: [] };
    persist(); done(b, () => { render({ quiet: true }); toast(c0 ? 'Reto actualizado' : $('#chStart', sh).checked ? 'Reto creado y en marcha. ¡Tú puedes!' : 'Reto creado'); });
  }, c0 ? `<button class="ghost" data-a="del" type="button" style="min-height:48px;color:var(--loss)">${ICON.trash} Eliminar reto</button>` : '');
  sh.addEventListener('click', e => { const b = e.target.closest('[data-days]'); if (!b) return; days = +b.dataset.days; $('#chOther', sh).value = ''; $$('#chDays .chip', sh).forEach(x => x.classList.toggle('on', x === b)); });
}
let glQ = '';
function glossaryView() {
  const list = GLOSSARY.filter(([t, d]) => !glQ || norm(t + ' ' + d).includes(norm(glQ)));
  return `<section class="panel tight"><label class="search" for="glQ">${ICON.search}<input id="glQ" type="search" placeholder="Buscar un término" value="${esc(glQ)}" autocomplete="off"></label>
  <div>${list.map(([t, d]) => `<details class="gl"><summary>${esc(t)}</summary><p>${esc(d)}</p></details>`).join('') || '<p class="empty">No encontramos ese término.</p>'}</div></section>`;
}
function shuffle(a) { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
function openLesson(id, fromCourse) {
  const l = LESSONS.find(x => x.id === id); if (!l) return;
  if (fromCourse && !unlocked(id)) { toast('Aprueba la lección anterior para desbloquear esta'); return; }
  const L = state.learn, lv = LEVELS.find(x => x.id === l.level), ls = modLessons(l.level), k = ls.indexOf(l) + 1;
  const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const STEPS = ['Lección', 'Ejemplo', 'Aprendizaje', 'Examen'];
  let step = 0, qi = 0, answers = [], order = [];
  const sh = sheet(`<div class="shead"><div style="min-width:0"><span class="lbl">Módulo ${modNum(l.level)} · Lección ${k} de ${ls.length}</span><h3 style="margin-top:4px">${esc(l.title)}</h3></div><button class="ghost" data-a="close" type="button">Cerrar</button></div>
    <div class="lsteps" id="lSteps"></div><div id="lBody"></div>`, { full: true });
  const body = $('#lBody', sh);
  const top = () => { sh.scrollTop = 0; };
  const steps = () => { const cur = Math.min(step, 3); $('#lSteps', sh).innerHTML = STEPS.map((n, i) => `<span class="${i < cur || step === 4 ? 'ok' : i === cur ? 'on' : ''}"><i></i>${n}</span>`).join(''); };
  const startExam = () => { qi = 0; answers = []; order = l.q.map(q => shuffle(q[1].map((o, i) => ({ o, i })))); step = 3; draw(); };
  function draw() {
    steps(); top();
    if (step === 0) body.innerHTML = `<div class="inner reader">${l.body.map(p => `<p>${md(p)}</p>`).join('')}
      <button class="primary" data-a="next" type="button">Ver un ejemplo de la vida real →</button></div>`;
    else if (step === 1) body.innerHTML = `<div class="inner"><div class="story"><span class="lbl">${svgI('people')}Ejemplo de la vida real</span><h4>${esc(l.example.title)}</h4>${l.example.text.map(p => `<p>${md(p)}</p>`).join('')}</div>
      <div class="btns"><button class="ghost" data-a="back" type="button" style="min-height:48px">← Volver</button><button class="primary" data-a="next" type="button" style="flex:2;width:auto">Lo que te llevas →</button></div></div>`;
    else if (step === 2) body.innerHTML = `<div class="inner"><span class="lbl">Lo que te llevas de esta lección</span>
      <ul class="takeaways">${l.learn.map(t => `<li>${svgI('checkc')}<span>${md(t)}</span></li>`).join('')}</ul>
      <div class="note">El examen tiene ${l.q.length} preguntas. Necesitas ${COURSE.pass} respuestas correctas para aprobar${L.done[id] ? '. Ya aprobaste esta lección: puedes repetirlo para repasar' : ' y desbloquear la siguiente lección'}.</div>
      <div class="btns"><button class="ghost" data-a="back" type="button" style="min-height:48px">← Volver</button><button class="primary" data-a="exam" type="button" style="flex:2;width:auto">Presentar el examen</button></div></div>`;
    else if (step === 3) {
      const q = l.q[qi], ans = answers[qi];
      body.innerHTML = `<div class="inner"><div class="between"><span class="lbl">Pregunta ${qi + 1} de ${l.q.length}</span><span class="qdots">${l.q.map((_, i) => `<i class="${answers[i] == null ? (i === qi ? 'on' : '') : answers[i] === l.q[i][2] ? 'ok' : 'bad'}"></i>`).join('')}</span></div>
        <b style="font-size:17px;line-height:1.35">${esc(q[0])}</b>
        <div style="display:grid;gap:8px">${order[qi].map(({ o, i }) => `<button class="opt ${ans == null ? '' : i === q[2] ? 'right' : i === ans ? 'wrong' : 'dim'}" data-opt="${i}" type="button" ${ans == null ? '' : 'disabled'}>${esc(o)}</button>`).join('')}</div>
        ${ans == null ? '' : `<div class="why ${ans === q[2] ? 'good' : 'bad'}"><b>${ans === q[2] ? '¡Correcto!' : 'No es esa.'}</b> ${esc(q[3])}</div>
        <button class="primary" data-a="${qi < l.q.length - 1 ? 'nextq' : 'result'}" type="button">${qi < l.q.length - 1 ? 'Siguiente pregunta →' : 'Ver mi resultado'}</button>`}</div>`;
    } else {
      const ok = answers.filter((a, i) => a === l.q[i][2]).length, pass = ok >= COURSE.pass;
      const first = pass && !L.done[id];
      if (pass) { L.scores[id] = Math.max(L.scores[id] || 0, ok); if (first) { L.done[id] = true; L.xp += 10; progressChallenge('c8'); } persist(); }
      const modDone = pass && ls.every(x => L.done[x.id]); const nxt = LESSONS[lessonIdx(id) + 1];
      body.innerHTML = `<div class="inner"><div class="result ${pass ? 'pass' : 'fail'}"><span class="rscore n">${ok}<small>/${l.q.length}</small></span>
        <h4>${pass ? (ok === l.q.length ? '¡Perfecto! Aprobaste' : '¡Aprobaste!') : 'Te faltó poco'}</h4>
        <p>${pass ? (first ? 'Ganaste 10 puntos y desbloqueaste la siguiente lección.' : 'Repasar también cuenta. Bien hecho.') : `Necesitas ${COURSE.pass} de ${l.q.length}. Repasa la lección y vuelve a intentarlo, las preguntas cambian de orden.`}</p></div>
        ${modDone && first ? `<div class="note" style="text-align:center"><b>¡Completaste el módulo ${modNum(l.level)}: ${esc(lv.name)}!</b></div>` : ''}
        ${answers.some((a, i) => a !== l.q[i][2]) ? `<div style="display:grid;gap:8px"><span class="lbl">Para repasar</span>${l.q.map((q, i) => answers[i] === q[2] ? '' : `<div class="why bad"><b>${esc(q[0])}</b><br>Respuesta correcta: ${esc(q[1][q[2]])}. ${esc(q[3])}</div>`).join('')}</div>` : ''}
        ${pass ? `${nxt ? `<button class="primary" data-a="nextlesson" type="button">Siguiente lección: ${esc(nxt.title)} →</button>` : '<div class="note" style="text-align:center"><b>¡Terminaste todo el curso!</b> Ahora pon en práctica tu plan.</div>'}<button class="ghost" data-a="close" type="button" style="min-height:48px">Volver al curso</button>`
          : `<button class="primary" data-a="exam" type="button">Intentar de nuevo</button><button class="ghost" data-a="review" type="button" style="min-height:48px">Repasar la lección</button>`}</div>`;
    }
  }
  draw();
  sh.onclick = e => {
    const b = e.target.closest('button'); if (!b) return; const a = b.dataset.a;
    if (a === 'close') return closeSheet(() => { if (tab === 'aprende' || tab === 'inicio') render({ quiet: true }); });
    if (a === 'next') { step++; return draw(); }
    if (a === 'back') { step--; return draw(); }
    if (a === 'review') { step = 0; return draw(); }
    if (a === 'exam') return startExam();
    if (b.dataset.opt !== undefined && answers[qi] == null) { answers[qi] = +b.dataset.opt; return draw(); }
    if (a === 'nextq') { qi++; return draw(); }
    if (a === 'result') { step = 4; return draw(); }
    if (a === 'nextlesson') { const nxt = LESSONS[lessonIdx(id) + 1]; closeSheet(() => { render({ quiet: true }); if (nxt) openLesson(nxt.id); }); }
  };
}
function progressChallenge(id) { const a = state.ch.active; if (a && a.id === id && !a.checks.includes(todayK())) { a.checks.push(todayK()); finishChallengeIfDone(); persist(); } }
function finishChallengeIfDone() {
  const a = state.ch.active; if (!a) return; const c = allChallenges().find(x => x.id === a.id); if (!c) { state.ch.active = null; return; }
  if (a.checks.length >= c.days) { state.ch.done.push({ id: c.id, date: todayK() }); state.ch.active = null; state.learn.xp += 20; setTimeout(() => toast(`¡Completaste el reto "${c.name}"! +20 puntos`), 300); }
}

/* ============ Registrar ingreso o gasto ============ */
function recentCats(kind) { const seen = []; for (let i = state.tx.length - 1; i >= 0 && seen.length < 6; i--) { const t = state.tx[i]; if (t.k === kind && cat(t.cat) && !seen.includes(t.cat)) seen.push(t.cat); } return seen; }
function hl(text, q) { const t = String(text); if (!q) return esc(t); const i = norm(t).indexOf(norm(q)); if (i < 0) return esc(t); return esc(t.slice(0, i)) + '<mark>' + esc(t.slice(i, i + q.length)) + '</mark>' + esc(t.slice(i + q.length)); }
function openAdd(kind, opts = {}) {
  let k = kind, view = opts.tab || (state.favs.some(f => f.k === k) ? 'fav' : 'new'), q = '';
  const form = { a: '', cat: null, note: '', d: todayK(), fav: false };
  const sh = sheet(`<div class="shead"><h3 id="addTitle"></h3><button class="ghost" data-a="close" type="button">Cerrar</button></div>
    <div class="seg" id="kSeg"><span class="th"></span><button type="button" data-k="out">Gasto</button><button type="button" data-k="in">Ingreso</button></div>
    <div class="seg" id="vSeg"><span class="th"></span><button type="button" data-v="fav">Favoritos</button><button type="button" data-v="new">Nuevo</button></div>
    <div id="addBody"></div>`);
  const body = $('#addBody', sh);
  const segs = () => { $$('#kSeg button', sh).forEach(b => b.classList.toggle('on', b.dataset.k === k)); $$('#vSeg button', sh).forEach(b => b.classList.toggle('on', b.dataset.v === view)); $$('.seg', sh).forEach(segThumb); $('#addTitle', sh).textContent = k === 'in' ? 'Registrar ingreso' : 'Registrar gasto'; };
  const keep = () => { const a = $('#amt', sh), n = $('#note', sh), d = $('#date', sh), f = $('#asFav', sh); if (a) form.a = a.value; if (n) form.note = n.value; if (d) form.d = d.value || todayK(); if (f) form.fav = f.checked; };
  function drawFav() {
    const all = state.favs.map((f, i) => ({ ...f, i })).filter(f => f.k === k && cat(f.cat)).sort((a, b) => (b.u || 0) - (a.u || 0));
    const list = q ? all.filter(f => norm((f.note || '') + ' ' + catPath(f.cat)).includes(norm(q))) : all;
    body.innerHTML = `<div class="inner"><label class="search" for="favQ">${ICON.search}<input id="favQ" type="search" placeholder="Buscar en tus favoritos" value="${esc(q)}" autocomplete="off"></label>
      <div class="favlist">${list.length ? list.map((f, n) => `<div class="favrow" style="--i:${n}"><button type="button" class="use" data-use="${f.i}">${dot(f.cat, 36)}<span class="nm">${hl(f.note || catName(f.cat), q)}</span><span class="val n ${k === 'in' ? 'up' : ''}">${cop(f.a)}</span><span class="meta">${hl(catPath(f.cat), q)}</span></button><button type="button" class="star" data-unfav="${f.i}" aria-label="Quitar de favoritos">${ICON.star}</button></div>`).join('')
        : `<div class="empty" style="text-align:center;display:grid;gap:10px;justify-items:center">${ICON.inbox}<span>${all.length ? `No hay favoritos que coincidan con “${esc(q)}”.` : 'Aún no tienes favoritos. Crea un movimiento y activa “Guardar en favoritos”.'}</span><button class="ghost" data-a="tonew" type="button">${q ? `Crear “${esc(q)}”` : 'Crear uno nuevo'}</button></div>`}</div>
      <p class="sub" style="margin:0">Toca uno para registrarlo con la fecha de hoy.</p></div>`;
    const i = $('#favQ', sh); i.addEventListener('input', () => { q = i.value; const p = i.selectionStart; drawFav(); const ni = $('#favQ', sh); ni.focus(); try { ni.setSelectionRange(p, p); } catch (_) { } });
  }
  function drawNew() {
    const rc = recentCats(k).filter(id => id !== form.cat).slice(0, 5);
    body.innerHTML = `<div class="inner">
      <label class="amount" for="amt" id="amtBox"><span>$</span><input id="amt" inputmode="numeric" placeholder="0" value="${esc(form.a)}" autocomplete="off" aria-label="Valor"></label>
      <button class="catbtn" data-a="pickcat" type="button">${form.cat ? dot(form.cat) : `<span class="cdot" style="background:var(--grid);color:var(--muted)">?</span>`}<span style="min-width:0"><b>${form.cat ? esc(catName(form.cat)) : 'Elegir categoría'}</b><small>${form.cat ? esc(catPath(form.cat)) : 'Toca para elegir o crear una'}</small></span><span class="chev">${ICON.chev}</span></button>
      ${rc.length ? `<div class="chips">${rc.map(id => `<button class="chip" data-rc="${id}" type="button">${esc(catName(id))}</button>`).join('')}</div>` : ''}
      <div class="grid2"><label class="field" for="note">Nota<input id="note" value="${esc(form.note)}" placeholder="${k === 'in' ? 'Ej: Pago quincena' : 'Ej: Almuerzo con amigos'}"></label><label class="field" for="date">Fecha<input id="date" type="date" value="${form.d}" max="${todayK()}"></label></div>
      <label class="switch" for="asFav"><span>Guardar en favoritos<small>Para registrarlo con un toque la próxima vez</small></span><input type="checkbox" id="asFav" ${form.fav ? 'checked' : ''}><span class="knob" aria-hidden="true"></span></label>
      <p class="msg" id="addMsg" role="alert"></p>
      <button class="primary ${k === 'in' ? 'gain' : 'loss'}" data-a="save" type="button">Registrar ${k === 'in' ? 'ingreso' : 'gasto'}</button></div>`;
    moneyInput($('#amt', sh));
  }
  const draw = () => { segs(); view === 'fav' ? drawFav() : drawNew(); };
  draw(); if (view === 'new') setTimeout(() => $('#amt', sh)?.focus({ preventScroll: true }), REDUCED ? 0 : 320);
  sh.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.a === 'close') return closeSheet();
    if (b.dataset.k) { keep(); if (b.dataset.k !== k) { k = b.dataset.k; form.cat = null; } return draw(); }
    if (b.dataset.v) { keep(); view = b.dataset.v; return draw(); }
    if (b.dataset.a === 'tonew') { form.note = q; form.fav = true; view = 'new'; return draw(); }
    if (b.dataset.rc) { keep(); form.cat = b.dataset.rc; return drawNew(); }
    if (b.dataset.a === 'pickcat') { keep(); pickCategory(k, form.cat, id => { form.cat = id; drawNew(); }); return; }
    if (b.dataset.use !== undefined) {
      const f = state.favs[+b.dataset.use]; f.u = (f.u || 0) + 1;
      const t = { id: nid('t'), d: todayK(), k: f.k, cat: f.cat, a: f.a, note: f.note || '' }; state.tx.push(t); newTx = t.id; persist();
      progressChallenge('c1'); afterTx();
      setTimeout(() => closeSheet(() => { render({ quiet: true }); toast(`Registrado: ${f.note || catName(f.cat)} ${cop(f.a)}`, () => undoTx(t.id)); }), REDUCED ? 0 : 150); return;
    }
    if (b.dataset.unfav !== undefined) { const i = +b.dataset.unfav, f = state.favs[i]; const row = b.closest('.favrow'); const fin = () => { state.favs.splice(state.favs.indexOf(f), 1); persist(); drawFav(); toast('Quitado de favoritos', () => { state.favs.push(f); persist(); if (stack.length && view === 'fav') drawFav(); }); }; if (REDUCED) return fin(); row.classList.add('gone'); setTimeout(fin, 240); return; }
    if (b.dataset.a === 'save') {
      keep(); const a = money(form.a);
      if (!a) { $('#addMsg', sh).textContent = 'Escribe el valor.'; const bx = $('#amtBox', sh); bx.classList.remove('err'); void bx.offsetWidth; bx.classList.add('err'); $('#amt', sh).focus(); return; }
      if (!form.cat) { $('#addMsg', sh).textContent = 'Elige una categoría.'; return; }
      const t = { id: nid('t'), d: form.d || todayK(), k, cat: form.cat, a, note: form.note.trim() }; state.tx.push(t); newTx = t.id;
      const fav = form.fav && !state.favs.some(f => f.k === k && f.cat === form.cat && f.a === a && (f.note || '') === t.note);
      if (fav) state.favs.push({ k, cat: form.cat, a, note: t.note, u: 1 });
      persist(); progressChallenge('c1'); afterTx();
      done(b, () => { render({ quiet: true }); toast(`${k === 'in' ? 'Ingreso' : 'Gasto'} registrado${fav ? ' y guardado' : ''}: ${cop(a)}`, () => undoTx(t.id)); });
    }
  };
}
function undoTx(id) { state.tx = state.tx.filter(t => t.id !== id); persist(); render({ quiet: true }); }

/* Selector de categorías con subcategorías y buscador */
function pickCategory(kind, current, onPick, opts = {}) {
  let node = null, q = '';
  if (current && cat(current)) { const p = pathOf(current); node = p.length > 1 ? p[p.length - 2].id : null; }
  const sh = sheet(`${head(opts.title || 'Elegir categoría')}<label class="search" for="catQ">${ICON.search}<input id="catQ" type="search" placeholder="Buscar categoría" autocomplete="off"></label><div id="catBody"></div>`, { full: true });
  const body = $('#catBody', sh);
  function draw() {
    if (q) {
      const all = state.cats.filter(c => c.kind === kind && norm(c.name).includes(norm(q)));
      body.innerHTML = `<div class="inner">${all.map(c => `<button class="pick ${c.id === current ? 'sel' : ''}" data-pick="${c.id}" type="button">${dot(c.id, 36)}<span><b>${hl(c.name, q)}</b><small>${esc(catPath(c.id))}</small></span></button>`).join('') || '<p class="empty">No hay categorías con ese nombre.</p>'}
        <button class="ghost" data-a="new" type="button" style="min-height:46px">${ICON.plus} Crear “${esc(q)}”${node ? ' dentro de ' + esc(catName(node)) : ''}</button></div>`;
      return;
    }
    const list = node ? kidsOf(node) : roots(kind);
    body.innerHTML = `<div class="inner">
      ${node ? `<div class="crumbs"><button data-nav="" type="button">${kind === 'in' ? 'Ingresos' : 'Gastos'}</button>${pathOf(node).map(c => `<span>›</span><button data-nav="${c.id}" type="button">${esc(c.name)}</button>`).join('')}</div>
      <button class="pick sel" data-pick="${node}" type="button">${dot(node, 36)}<span><b>Usar “${esc(catName(node))}”</b><small>Sin elegir subcategoría</small></span></button>` : ''}
      <div>${list.map(c => { const n = kidsOf(c.id).length; return `<div style="display:grid;grid-template-columns:1fr auto;align-items:center"><button class="pick ${c.id === current ? 'sel' : ''}" data-pick="${c.id}" type="button" style="border-top:0">${dot(c.id, 36)}<span><b>${esc(c.name)}</b>${n ? `<small>${n} subcategoría${n > 1 ? 's' : ''}</small>` : ''}</span></button>${n ? `<button class="ghost" data-nav="${c.id}" type="button" aria-label="Ver subcategorías de ${esc(c.name)}" style="min-height:36px;padding:0 10px">${ICON.chev}</button>` : `<button class="ghost" data-sub="${c.id}" type="button" aria-label="Agregar subcategoría a ${esc(c.name)}" style="min-height:36px;padding:0 10px;color:var(--muted)">${ICON.plus}</button>`}</div>`; }).join('') || '<p class="empty">Esta categoría aún no tiene subcategorías.</p>'}</div>
      <button class="ghost" data-a="new" type="button" style="min-height:46px">${ICON.plus} ${node ? `Nueva subcategoría en ${esc(catName(node))}` : 'Nueva categoría'}</button></div>`;
  }
  draw();
  const qi = $('#catQ', sh); qi.addEventListener('input', () => { q = qi.value.trim(); draw(); });
  sh.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.a === 'close') return closeSheet();
    if (b.dataset.nav !== undefined) { node = b.dataset.nav || null; q = ''; qi.value = ''; draw(); body.scrollIntoView({ block: 'nearest' }); return; }
    if (b.dataset.pick) { const id = b.dataset.pick; closeSheet(() => onPick(id)); return; }
    if (b.dataset.sub) { askName('Nueva subcategoría', `Dentro de ${catName(b.dataset.sub)}`, '', name => { const c = { id: nid('c'), name, kind, parent: b.dataset.sub }; state.cats.push(c); persist(); idx(); node = b.dataset.sub; draw(); toast(`Creaste ${catPath(c.id)}`); }); return; }
    if (b.dataset.a === 'new') { askName(node ? 'Nueva subcategoría' : 'Nueva categoría', node ? `Dentro de ${catName(node)}` : (kind === 'in' ? 'Categoría de ingresos' : 'Categoría de gastos'), q, name => { const c = { id: nid('c'), name, kind, parent: node }; state.cats.push(c); persist(); idx(); q = ''; qi.value = ''; draw(); toast(`Creaste ${catPath(c.id)}`); }); }
  };
}
function askName(title, hint, val, cb) {
  const sh = sheet(`${head(title)}<span class="sub" style="margin-top:-6px">${esc(hint)}</span><label class="field" for="nmIn">Nombre<input id="nmIn" value="${esc(val || '')}" maxlength="40" autocomplete="off"></label><p class="msg" id="nmMsg"></p><button class="primary" data-a="ok" type="button">Guardar</button>`);
  const i = $('#nmIn', sh); setTimeout(() => i.focus(), REDUCED ? 0 : 300);
  const ok = () => { const v = i.value.trim(); if (!v) { $('#nmMsg', sh).textContent = 'Escribe un nombre.'; return; } closeSheet(() => cb(v)); };
  i.addEventListener('keydown', e => { if (e.key === 'Enter') ok(); });
  sh.onclick = e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.a === 'close') return closeSheet(); if (b.dataset.a === 'ok') ok(); };
}

/* Editar movimiento */
function openTx(id) {
  const t = state.tx.find(x => x.id === id); if (!t) return; const f = { ...t, a: t.a.toLocaleString('es-CO') };
  const sh = sheet(`${head(t.k === 'in' ? 'Ingreso' : 'Gasto')}<div id="txBody"></div>`);
  const body = $('#txBody', sh);
  const keep = () => { f.a = $('#eAmt', sh).value; f.note = $('#eNote', sh).value; f.d = $('#eDate', sh).value || f.d; };
  const draw = () => {
    body.innerHTML = `<div class="inner"><label class="amount" for="eAmt"><span>$</span><input id="eAmt" inputmode="numeric" value="${esc(f.a)}" aria-label="Valor"></label>
    <button class="catbtn" data-a="pickcat" type="button">${dot(f.cat)}<span style="min-width:0"><b>${esc(catName(f.cat))}</b><small>${esc(catPath(f.cat))}</small></span><span class="chev">${ICON.chev}</span></button>
    <div class="grid2"><label class="field" for="eNote">Nota<input id="eNote" value="${esc(f.note || '')}"></label><label class="field" for="eDate">Fecha<input id="eDate" type="date" value="${f.d}"></label></div>
    <button class="primary" data-a="save" type="button">Guardar cambios</button><button class="ghost" data-a="del" type="button" style="min-height:48px;color:var(--loss)">${ICON.trash} Eliminar</button></div>`;
    moneyInput($('#eAmt', sh));
  };
  draw();
  sh.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.a === 'close') return closeSheet();
    if (b.dataset.a === 'pickcat') { keep(); pickCategory(t.k, f.cat, c => { f.cat = c; draw(); }); return; }
    if (b.dataset.a === 'save') { keep(); const a = money(f.a); if (!a) return; Object.assign(t, { a, cat: f.cat, note: f.note.trim(), d: f.d }); persist(); done(b, () => { render({ quiet: true }); toast('Cambios guardados'); }); }
    if (b.dataset.a === 'del') { const copy = { ...t }; state.tx = state.tx.filter(x => x.id !== id); state.bills.forEach(bl => Object.keys(bl.paid || {}).forEach(m => { if (bl.paid[m] === id) delete bl.paid[m]; })); persist(); closeSheet(() => { render({ quiet: true }); toast('Movimiento eliminado', () => { state.tx.push(copy); persist(); render({ quiet: true }); }); }); }
  };
}

/* Administrar categorías */
function openCats() {
  let kind = 'out';
  const sh = sheet(`${head('Categorías')}<div class="seg" id="ckSeg"><span class="th"></span><button type="button" data-ck="out">Gastos</button><button type="button" data-ck="in">Ingresos</button></div><p class="sub" style="margin:-4px 0 0">Puedes crear subcategorías dentro de cualquier categoría, sin límite de niveles.</p><div id="treeBody"></div>`, { full: true, onClose: () => render({ quiet: true }) });
  const body = $('#treeBody', sh);
  const count = id => { const s = desc(id); return state.tx.filter(t => s.has(t.cat)).length; };
  function draw() {
    idx(); $$('#ckSeg button', sh).forEach(b => b.classList.toggle('on', b.dataset.ck === kind)); segThumb($('#ckSeg', sh));
    const rows = []; const walk = (c, depth) => { rows.push({ c, depth }); kidsOf(c.id).forEach(k => walk(k, depth + 1)); }; roots(kind).forEach(c => walk(c, 0));
    body.innerHTML = `<div class="inner"><div class="tree">${rows.map(({ c, depth }) => `<div class="node" style="padding-left:${Math.min(depth, 5) * 16}px"><span class="nm">${depth ? '<span style="color:var(--muted)">└</span>' : ''}<i style="width:10px;height:10px;border-radius:3px;background:${catColor(c.id)};flex:none"></i><b>${esc(c.name)}</b><small>${count(c.id) || ''}</small></span><span class="acts"><button data-addsub="${c.id}" type="button" aria-label="Agregar subcategoría a ${esc(c.name)}">+ Sub</button><button data-ren="${c.id}" type="button" aria-label="Renombrar ${esc(c.name)}">Editar</button>${c.sys ? '' : `<button data-delc="${c.id}" type="button" aria-label="Eliminar ${esc(c.name)}" style="color:var(--loss)">${ICON.trash}</button>`}</span></div>`).join('')}</div>
      <button class="primary" data-a="addroot" type="button">${ICON.plus} Nueva categoría principal</button></div>`;
  }
  draw();
  sh.onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.a === 'close') return closeSheet();
    if (b.dataset.ck) { kind = b.dataset.ck; return draw(); }
    if (b.dataset.a === 'addroot') return askName('Nueva categoría', kind === 'in' ? 'Categoría de ingresos' : 'Categoría de gastos', '', n => { state.cats.push({ id: nid('c'), name: n, kind, parent: null }); persist(); draw(); toast('Categoría creada'); });
    if (b.dataset.addsub) { const p = b.dataset.addsub; return askName('Nueva subcategoría', `Dentro de ${catPath(p)}`, '', n => { state.cats.push({ id: nid('c'), name: n, kind, parent: p }); persist(); draw(); toast('Subcategoría creada'); }); }
    if (b.dataset.ren) { const c = cat(b.dataset.ren); return askName('Renombrar', catPath(c.id), c.name, n => { c.name = n; persist(); draw(); toast('Nombre actualizado'); }); }
    if (b.dataset.delc) {
      const c = cat(b.dataset.delc); const n = state.tx.filter(t => t.cat === c.id).length; const kids = kidsOf(c.id).length;
      const dest = c.parent || (state.cats.find(x => x.kind === c.kind && !x.parent && /^Otros/.test(x.name) && x.id !== c.id) || {}).id;
      const cf = sheet(`${head('Eliminar categoría')}<p style="margin:0">¿Eliminar <b>${esc(catPath(c.id))}</b>?</p>
        <p class="sub" style="margin:0">${n ? `Sus ${n} movimientos pasan a <b>${esc(dest ? catPath(dest) : 'Sin categoría')}</b>. ` : ''}${kids ? `Sus ${kids} subcategorías suben un nivel. ` : ''}Esto no se puede deshacer.</p>
        <button class="primary loss" data-a="yes" type="button">Sí, eliminar</button>`);
      cf.onclick = ev => { const x = ev.target.closest('button'); if (!x) return; if (x.dataset.a === 'close') return closeSheet(); if (x.dataset.a === 'yes') {
        state.tx.forEach(t => { if (t.cat === c.id) t.cat = dest; }); state.favs = state.favs.filter(f => f.cat !== c.id); state.bills.forEach(bl => { if (bl.cat === c.id) bl.cat = dest; });
        if (state.budgets[c.id] != null) { if (c.parent && state.budgets[c.parent] == null) state.budgets[c.parent] = state.budgets[c.id]; delete state.budgets[c.id]; }
        state.cats.forEach(k => { if (k.parent === c.id) k.parent = c.parent; }); state.cats = state.cats.filter(k => k.id !== c.id);
        persist(); closeSheet(() => { draw(); toast('Categoría eliminada'); }); } };
    }
  };
}

/* ============ Formularios del plan ============ */
function formSheet(title, fields, onSave, extra = '') {
  const sh = sheet(`${head(title)}${fields}<p class="msg" id="fMsg"></p><button class="primary" data-a="save" type="button">Guardar</button>${extra}`);
  $$('[data-money]', sh).forEach(moneyInput);
  sh.onclick = e => { const b = e.target.closest('button'); if (!b) return; if (b.dataset.a === 'close') return closeSheet(); if (b.dataset.a === 'save' || b.dataset.a === 'del' || b.dataset.a === 'pick') onSave(b, sh); };
  return sh;
}
function openBudget(id) {
  let cid = id || null; const cur = id ? state.budgets[id] : 0;
  const sh = formSheet(id ? 'Editar sobre' : 'Nuevo sobre', `<button class="catbtn" data-a="pick" type="button" id="bCat"></button><label class="field" for="bLim">Límite al mes<input id="bLim" data-money inputmode="numeric" value="${cur ? cur.toLocaleString('es-CO') : ''}" placeholder="$0"><small id="bHint"></small></label>`, (b, sh) => {
    if (b.dataset.a === 'pick') return pickCategory('out', cid, c => { cid = c; paint(); }, { title: 'Categoría del sobre' });
    if (b.dataset.a === 'del') { delete state.budgets[id]; persist(); return closeSheet(() => { render({ quiet: true }); toast('Sobre eliminado'); }); }
    const v = money($('#bLim', sh).value); if (!cid) { $('#fMsg', sh).textContent = 'Elige una categoría.'; return; } if (!v) { $('#fMsg', sh).textContent = 'Escribe el límite.'; return; }
    if (id && id !== cid) delete state.budgets[id]; state.budgets[cid] = v; persist(); done(b, () => { render({ quiet: true }); toast('Sobre guardado'); });
  }, id ? `<button class="ghost" data-a="del" type="button" style="min-height:48px;color:var(--loss)">${ICON.trash} Eliminar sobre</button>` : '');
  const paint = () => { const b = $('#bCat', sh); b.innerHTML = cid ? `${dot(cid)}<span><b>${esc(catName(cid))}</b><small>${esc(catPath(cid))}</small></span><span class="chev">${ICON.chev}</span>` : `<span class="cdot" style="background:var(--grid);color:var(--muted)">?</span><span><b>Elegir categoría</b><small>Puede ser principal o subcategoría</small></span><span class="chev">${ICON.chev}</span>`;
    const avg = cid ? [1, 2, 3].map(n => sumCat(cid, addMonths(curM(), -n))).filter(Boolean) : []; $('#bHint', sh).textContent = avg.length ? `En los últimos meses gastaste en promedio ${cop(avg.reduce((a, x) => a + x, 0) / avg.length)}.` : ''; };
  paint();
}
function openBill(id) {
  const b0 = state.bills.find(b => b.id === id); let cid = b0?.cat || null;
  const per0 = b0 ? billPeriod(b0) : null; let paidSel = b0 ? !!b0.paid?.[per0] : false;
  const sh = formSheet(b0 ? 'Editar pago fijo' : 'Nuevo pago fijo', `<label class="field" for="blName">Nombre<input id="blName" value="${esc(b0?.name || '')}" placeholder="Ej: Arriendo"></label>
    <label class="field" for="blA">Valor<input id="blA" data-money inputmode="numeric" value="${b0 ? b0.a.toLocaleString('es-CO') : ''}" placeholder="$0"></label>
    <label class="field" for="blDate">Fecha de pago<input id="blDate" type="date" value="${b0 ? billDue(b0, per0) : ''}"><small id="blDateH">Se repite cada mes ese mismo día.</small></label>
    <button class="catbtn" data-a="pick" type="button" id="blCat"></button>
    <div class="field"><span id="blStL">¿Ya está pagado?</span>${seg('blSt', [['no', 'Pendiente'], ['si', 'Ya está pagado']], paidSel ? 'si' : 'no')}</div>
    <label class="switch" for="blTx" id="blTxW"><span>Anotarlo como gasto<small>Apágalo si ya lo registraste en Movimientos</small></span><input type="checkbox" id="blTx" checked><span class="knob" aria-hidden="true"></span></label>
    <p class="sub" id="blNote" style="margin:0"></p>`, (b, sh) => {
    if (b.dataset.a === 'pick') return pickCategory('out', cid, c => { cid = c; paint(); }, { title: 'Categoría del pago' });
    if (b.dataset.a === 'del') { const i = state.bills.indexOf(b0); state.bills.splice(i, 1); persist(); return closeSheet(() => { render({ quiet: true }); toast('Pago fijo eliminado', () => { state.bills.splice(i, 0, b0); persist(); render({ quiet: true }); }); }); }
    const name = $('#blName', sh).value.trim(), a = money($('#blA', sh).value), dv = $('#blDate', sh).value;
    if (!name || !a || !dv || !cid) { $('#fMsg', sh).textContent = 'Completa nombre, valor, fecha y categoría.'; return; }
    const day = +dv.slice(8), P = dv.slice(0, 7); let bl = b0;
    if (!bl) { bl = { id: nid('b'), name, a, day, cat: cid, paid: {}, start: P }; state.bills.push(bl); }
    else { Object.assign(bl, { name, a, day, cat: cid }); bl.paid ||= {}; if (P !== per0) bl.start = P; }
    const was = bl.paid[P];
    if (paidSel && !was) {
      if ($('#blTx', sh).checked) { const t = { id: nid('t'), d: dv <= todayK() ? dv : todayK(), k: 'out', cat: cat(bl.cat) ? bl.cat : sysCat('deudas'), a: bl.a, note: bl.name }; state.tx.push(t); bl.paid[P] = t.id; afterTx(); }
      else bl.paid[P] = 'manual';
    } else if (!paidSel && was) { if (was !== 'manual') state.tx = state.tx.filter(t => t.id !== was); delete bl.paid[P]; }
    persist(); done(b, () => { render({ quiet: true }); toast(b0 ? 'Pago fijo actualizado' : 'Pago fijo guardado'); });
  }, b0 ? `<button class="ghost" data-a="del" type="button" style="min-height:48px;color:var(--loss)">${ICON.trash} Eliminar este pago fijo</button><p class="sub" style="margin:0;text-align:center">Lo que ya pagaste se queda en tus movimientos.</p>` : '');
  const paint = () => { $('#blCat', sh).innerHTML = cid ? `${dot(cid)}<span><b>${esc(catName(cid))}</b><small>${esc(catPath(cid))}</small></span><span class="chev">${ICON.chev}</span>` : `<span class="cdot" style="background:var(--grid);color:var(--muted)">?</span><span><b>Categoría</b><small>Dónde se registra cuando lo pagues</small></span><span class="chev">${ICON.chev}</span>`; };
  const paintSt = () => {
    const dv = $('#blDate', sh).value, P = dv ? dv.slice(0, 7) : (per0 || curM()), was = b0?.paid?.[P];
    $('#blStL', sh).textContent = dv ? `¿Ya pagaste el de ${monthWord(P)}?` : '¿Ya está pagado?';
    $('#blDateH', sh).textContent = dv ? `${dLong(dv)} de ${dv.slice(0, 4)}. Se repite cada mes el día ${+dv.slice(8)}.` : 'Se repite cada mes ese mismo día.';
    $$('#blSt button', sh).forEach(x => { const on = (x.dataset.seg === 'si') === paidSel; x.classList.toggle('on', on); x.setAttribute('aria-selected', on); }); segThumb($('#blSt', sh));
    $('#blTxW', sh).hidden = !(paidSel && !was);
    $('#blNote', sh).textContent = !paidSel && was ? (was === 'manual' ? `Al guardar, el de ${monthWord(P)} vuelve a quedar pendiente.` : `Al guardar, el de ${monthWord(P)} vuelve a quedar pendiente y se borra el gasto que se anotó al pagarlo.`) : '';
  };
  sh.addEventListener('click', e => { const s = e.target.closest('#blSt [data-seg]'); if (s) { paidSel = s.dataset.seg === 'si'; paintSt(); } });
  $('#blDate', sh).addEventListener('change', () => { const dv = $('#blDate', sh).value; if (b0 && dv) paidSel = !!b0.paid?.[dv.slice(0, 7)]; paintSt(); });
  paint(); paintSt(); requestAnimationFrame(() => segThumb($('#blSt', sh)));
}
function payBill(id) {
  const b = state.bills.find(x => x.id === id); if (!b) return; const m = billPeriod(b); if (b.paid?.[m]) return;
  const t = { id: nid('t'), d: todayK(), k: 'out', cat: cat(b.cat) ? b.cat : sysCat('deudas'), a: b.a, note: b.name }; state.tx.push(t); (b.paid ||= {})[m] = t.id; newTx = t.id;
  if (m === curM() && +todayK().slice(8) <= b.day) award('bill', 5, '+5 puntos por pagar a tiempo'); afterTx();
  render({ quiet: true }); toast(`Pagaste ${b.name}: ${cop(b.a)}`, () => { delete b.paid[m]; undoTx(t.id); });
}
function openDebtForm(d0, cb) {
  const rateTxt = d0 ? (d0.rate * 100).toFixed(2).replace(/\.?0+$/, '').replace('.', ',') : '';
  const sh = formSheet(d0 ? 'Editar deuda' : 'Nueva deuda', `<label class="field" for="dName">¿Qué deuda es?<input id="dName" value="${esc(d0?.name || '')}" placeholder="Ej: Tarjeta, crédito de la moto"></label>
    <div class="grid2"><label class="field" for="dBal">Cuánto debes hoy<input id="dBal" data-money inputmode="numeric" value="${d0 ? Math.round(d0.bal).toLocaleString('es-CO') : ''}" placeholder="$0"></label><label class="field" for="dMin">Cuota mensual<input id="dMin" data-money inputmode="numeric" value="${d0 ? d0.min.toLocaleString('es-CO') : ''}" placeholder="$0"></label></div>
    <div class="grid2"><label class="field" for="dRate">Interés (%)<input id="dRate" inputmode="decimal" value="${rateTxt}" placeholder="Ej: 2,1"></label><label class="field" for="dRType">Tipo de tasa<select id="dRType"><option value="m">Mensual</option><option value="ea">Efectiva anual (EA)</option></select></label></div>
    <span class="sub" style="margin-top:-6px">Si no sabes la tasa, búscala en el extracto o pon 0 si es un préstamo sin intereses.</span>`, (b, sh) => {
    if (b.dataset.a === 'del') { state.debts = state.debts.filter(x => x.id !== d0.id); persist(); return closeSheet(() => { render({ quiet: true }); toast('Deuda eliminada'); }); }
    const name = $('#dName', sh).value.trim(), bal = money($('#dBal', sh).value), min = money($('#dMin', sh).value); let r = parseFloat(($('#dRate', sh).value || '0').replace(',', '.')) / 100 || 0;
    if ($('#dRType', sh).value === 'ea') r = fromEA(r);
    if (!name || !bal || !min) { $('#fMsg', sh).textContent = 'Completa nombre, saldo y cuota.'; return; }
    const d = { name, bal, min, rate: r };
    if (cb) { closeSheet(() => cb(d)); return; }
    if (d0) { Object.assign(d0, d); if (!d0.orig || d0.orig < bal) d0.orig = bal; } else state.debts.push({ ...d, id: nid('d'), orig: bal });
    persist(); done(b, () => { render({ quiet: true }); toast('Deuda guardada'); });
  }, d0 ? `<button class="ghost" data-a="del" type="button" style="min-height:48px;color:var(--loss)">${ICON.trash} Eliminar deuda</button>` : '');
}
function openAbono(id) {
  const d = state.debts.find(x => x.id === id); if (!d) return;
  formSheet(`Abonar a ${esc(d.name)}`, `<p class="sub" style="margin:-6px 0 0">Saldo actual: <b class="n">${cop(d.bal)}</b>. El abono se registra como una salida en Deudas.</p>
    <label class="amount" for="abA"><span>$</span><input id="abA" data-money inputmode="numeric" value="${d.min.toLocaleString('es-CO')}" aria-label="Valor del abono"></label>`, (b, sh) => {
    const a = Math.min(money($('#abA', sh).value), Math.ceil(d.bal)); if (!a) return;
    const prev = d.bal; d.bal = Math.max(0, d.bal - a);
    const t = { id: nid('t'), d: todayK(), k: 'out', cat: sysCat('deudas'), a, note: 'Abono: ' + d.name }; state.tx.push(t); afterTx();
    const paidOff = d.bal <= 0;
    done(b, () => { render({ quiet: true }); if (paidOff) { confetti(); toast(`¡Pagaste por completo ${d.name}!`); } else toast(`Abonaste ${cop(a)} a ${d.name}`, () => { d.bal = prev; undoTx(t.id); }); });
  });
}
function openLoanCalc() {
  const sh = sheet(`${head('¿Cuánto me cuesta un préstamo?')}<p class="sub" style="margin:-6px 0 0">Mira la cuota y el total antes de firmar.</p>
    <label class="field" for="lcP">Monto que te prestan<input id="lcP" data-money inputmode="numeric" placeholder="$0" value="1.000.000"></label>
    <div class="grid2"><label class="field" for="lcR">Interés (%)<input id="lcR" inputmode="decimal" value="2" placeholder="Ej: 2"></label><label class="field" for="lcT">Tipo<select id="lcT"><option value="m">Mensual</option><option value="ea">Efectiva anual</option><option value="gg">Gota a gota (diario)</option></select></label></div>
    <label class="field" for="lcN" id="lcNL">Plazo en meses<input id="lcN" type="number" inputmode="numeric" min="1" value="12"></label>
    <div id="lcOut" class="card2 n" aria-live="polite"></div>`);
  $$('[data-money]', sh).forEach(moneyInput);
  const calc = () => {
    const P = money($('#lcP', sh).value), rr = parseFloat(($('#lcR', sh).value || '0').replace(',', '.')) / 100 || 0, ty = $('#lcT', sh).value, n = Math.max(1, +$('#lcN', sh).value || 1);
    $('#lcNL', sh).firstChild.textContent = ty === 'gg' ? 'Plazo en días' : 'Plazo en meses';
    let out;
    if (ty === 'gg') { const total = P * (1 + rr); const cuota = total / n; const monthly = Math.pow(1 + rr, 30 / n) - 1; out = `<div class="kv"><div><b>${cop(cuota)}</b><span>Cuota diaria</span></div><div><b>${cop(total)}</b><span>Pagas en total</span></div><div><b class="down">${cop(total - P)}</b><span>Intereses</span></div></div><p class="sub" style="margin:0">Eso equivale a más o menos <b class="down">${pct(EA(monthly), 0)} efectivo anual</b>. Un préstamo formal rara vez pasa del 40%.</p>`; }
    else { const r = ty === 'ea' ? fromEA(rr) : rr; const L = loanCalc(P, r, n); if (!L) { $('#lcOut', sh).innerHTML = '<p class="empty">Escribe el monto y el plazo.</p>'; return; }
      out = `<div class="kv"><div><b>${cop(L.cuota)}</b><span>Cuota mensual</span></div><div><b>${cop(L.total)}</b><span>Pagas en total</span></div><div><b class="down">${cop(L.interes)}</b><span>Intereses</span></div></div><p class="sub" style="margin:0">Tasa: ${pct(r, 2)} mensual = <b>${pct(EA(r), 1)} EA</b>. Por cada $100 que te prestan devuelves ${cop(L.total / P * 100)}.</p>`; }
    $('#lcOut', sh).innerHTML = out;
  };
  sh.addEventListener('input', calc); sh.addEventListener('change', calc); calc();
  sh.onclick = e => { const b = e.target.closest('button'); if (b && b.dataset.a === 'close') closeSheet(); };
}
function openGoal(id) {
  const g0 = id === 'emergency' ? null : state.goals.find(g => g.id === id); const em = id === 'emergency' || g0?.emergency;
  const sug = Math.round(avgExpense() * 3 / 50000) * 50000;
  formSheet(g0 ? 'Editar meta' : em ? 'Fondo de emergencia' : 'Nueva meta', `<label class="field" for="gName">Nombre<input id="gName" value="${esc(g0?.name || (em ? 'Fondo de emergencia' : ''))}" placeholder="Ej: Viaje, moto, estudio"></label>
    <div class="grid2"><label class="field" for="gT">Meta<input id="gT" data-money inputmode="numeric" value="${g0 ? g0.target.toLocaleString('es-CO') : em ? sug.toLocaleString('es-CO') : ''}" placeholder="$0">${em ? `<small>Sugerido: 3 meses de gastos (${cop(sug)})</small>` : ''}</label><label class="field" for="gS">Ya tienes<input id="gS" data-money inputmode="numeric" value="${g0 ? g0.saved.toLocaleString('es-CO') : ''}" placeholder="$0"></label></div>
    ${em ? '' : `<label class="field" for="gD">Fecha objetivo (opcional)<input id="gD" type="date" value="${g0?.date || ''}" min="${todayK()}"></label>`}`, (b, sh) => {
    if (b.dataset.a === 'del') { state.goals = state.goals.filter(x => x.id !== g0.id); persist(); return closeSheet(() => { render({ quiet: true }); toast('Meta eliminada'); }); }
    const name = $('#gName', sh).value.trim(), target = money($('#gT', sh).value), saved = money($('#gS', sh).value), date = $('#gD', sh)?.value || '';
    if (!name || !target) { $('#fMsg', sh).textContent = 'Escribe el nombre y el valor de la meta.'; return; }
    if (g0) Object.assign(g0, { name, target, saved, date }); else state.goals.push({ id: nid('g'), name, target, saved, date, emergency: !!em });
    persist(); done(b, () => { if (tab !== 'plan') { pushNav(); tab = 'plan'; sub.plan = 'metas'; } render({ quiet: true }); toast('Meta guardada'); });
  }, g0 ? `<button class="ghost" data-a="del" type="button" style="min-height:48px;color:var(--loss)">${ICON.trash} Eliminar meta</button>` : '');
}
function openAporte(id, retiro) {
  const g = state.goals.find(x => x.id === id); if (!g) return;
  formSheet(retiro ? `Retirar de ${esc(g.name)}` : `Aportar a ${esc(g.name)}`, `<p class="sub" style="margin:-6px 0 0">${retiro ? `Tienes ${cop(g.saved)} en esta meta.` : 'El aporte se registra como una salida en la categoría Ahorro, así sabes que esa plata ya tiene dueño.'}</p>
    <label class="amount" for="apA"><span>$</span><input id="apA" data-money inputmode="numeric" placeholder="0" aria-label="Valor"></label>`, (b, sh) => {
    let a = money($('#apA', sh).value); if (!a) return;
    if (retiro) { a = Math.min(a, g.saved); g.saved -= a; persist(); return done(b, () => { render({ quiet: true }); toast(`Retiraste ${cop(a)} de ${g.name}`); }); }
    const before = g.saved; g.saved += a; const t = { id: nid('t'), d: todayK(), k: 'out', cat: sysCat('ahorro'), a, note: 'Meta: ' + g.name }; state.tx.push(t); award('aporte', 5, '+5 puntos por aportar a tu meta'); afterTx();
    const reached = before < g.target && g.saved >= g.target;
    done(b, () => { render({ quiet: true }); if (reached) { confetti(); toast(`¡Lograste tu meta ${g.name}!`); } else toast(`Aportaste ${cop(a)} a ${g.name}`, () => { g.saved = before; undoTx(t.id); }); });
  });
}

/* ============ Puntaje ============ */
function openScore(first) {
  const sc = score(); const nl = nextLesson();
  sheet(`${head(first ? 'Tu diagnóstico' : 'Salud financiera')}
    <div class="between"><div><span class="big n" style="font-size:44px">${sc.total}</span><span class="sub"> de 100</span></div><span class="pill ${sc.level[0]}">${sc.level[1]}</span></div>
    <div class="parts play">${sc.parts.map((p, i) => `<div class="part"><div class="between"><b>${p.name}</b><span class="n sub"><b style="color:var(--ink)">${p.pts}</b> / ${p.max}</span></div><div class="bar"><span style="width:${p.pts / p.max * 100}%;--i:${i};background:${p.pts / p.max >= .7 ? 'var(--gain-fill)' : p.pts / p.max >= .4 ? 'var(--accent)' : 'var(--loss-fill)'}"></span></div><span class="sub">${esc(p.detail)} ${p.pts < p.max ? esc(p.how) : ''}</span></div>`).join('')}</div>
    ${first ? `<div class="note"><b>Tus primeros pasos:</b><br>1. Registra tus gastos de hoy con el botón amarillo.<br>2. ${state.profile.path === 'debt' ? 'Revisa tu plan en Plan › Deudas.' : 'Arma tus sobres en Plan › Presupuesto.'}<br>3. ${nl ? `Lee “${esc(nl.title)}” en Aprende.` : 'Empieza un reto en Aprende.'}</div>` : ''}
    <button class="primary" data-a="close" type="button">${first ? 'Vamos' : 'Entendido'}</button>`).onclick = e => { const b = e.target.closest('button'); if (b && b.dataset.a === 'close') closeSheet(); };
}

/* ============ Ajustes ============ */
function openSettings() {
  const p = state.profile; let last = null; try { last = localStorage.getItem('pilas_last_backup'); } catch (e) { }
  const sh = sheet(`${head('Ajustes')}
    <label class="field" for="sName">Tu nombre<input id="sName" value="${esc(p.name)}"></label>
    <div class="grid2"><label class="field" for="sInc">Ingreso mensual aprox.<input id="sInc" data-money inputmode="numeric" value="${p.income ? p.income.toLocaleString('es-CO') : ''}"></label>
    <label class="field" for="sPath">Tu camino<select id="sPath"><option value="start" ${p.path !== 'debt' ? 'selected' : ''}>Empezando / ordenarme</option><option value="debt" ${p.path === 'debt' ? 'selected' : ''}>Salir de deudas</option></select></label></div>
    <button class="primary" data-a="saveprof" type="button">Guardar</button>
    <div class="field">Tema<div class="seg" id="themeSeg"><span class="th" aria-hidden="true"></span>${[['auto', 'Automático'], ['light', 'Claro'], ['dark', 'Oscuro']].map(([k, l]) => `<button type="button" data-theme="${k}" class="${(p.theme || 'auto') === k ? 'on' : ''}" aria-pressed="${(p.theme || 'auto') === k}">${l}</button>`).join('')}</div><small>Automático sigue el modo de tu celular.</small></div>
    <button class="ghost" data-a="cats" type="button" style="min-height:48px">Administrar categorías</button>
    <div class="panel tight" style="box-shadow:none"><h2>Tus datos</h2><span class="sub">Se guardan solo en este celular. ${last ? 'Última copia: ' + dateLong(last.slice(0, 10)) + '.' : 'Aún no has hecho copias.'}</span>
      <div class="grid2"><button class="ghost" data-a="export" type="button" style="min-height:48px">Hacer copia</button><button class="ghost" data-a="import" type="button" style="min-height:48px">Restaurar copia</button></div><input type="file" id="bkFile" accept="application/json,.json" hidden></div>
    <button class="ghost" data-a="wipe" type="button" style="min-height:48px;color:var(--loss)">Borrar todo y empezar de nuevo</button>
    <div class="foot-brand" role="img" aria-label="NüMIA"><img class="logo" src="logo.png" alt="" width="24" height="24"><span class="wm" aria-hidden="true"></span></div>
    <p class="sub" style="margin:0;text-align:center">NüMIA es una herramienta educativa. No reemplaza la asesoría de un profesional financiero.</p>`);
  $$('[data-money]', sh).forEach(moneyInput); requestAnimationFrame(() => segThumb($('#themeSeg', sh)));
  $('#bkFile', sh).onchange = async e => {
    const f = e.target.files[0]; e.target.value = ''; if (!f) return; let d = null; try { d = JSON.parse(await f.text()); } catch (_) { }
    const st = d && d.state; if (!st || !st.profile || !Array.isArray(st.tx)) { toast('Ese archivo no es una copia de NüMIA'); return; }
    const c = sheet(`${head('Restaurar copia')}<p style="margin:0">Copia del ${d.exported ? dateLong(d.exported.slice(0, 10)) : 'fecha desconocida'} con ${st.tx.length} movimientos. Tus datos actuales se reemplazan.</p><button class="primary" data-a="yes" type="button">Restaurar</button>`);
    c.onclick = ev => { const x = ev.target.closest('button'); if (!x) return; if (x.dataset.a === 'close') return closeSheet(); if (x.dataset.a === 'yes') { state = st; migrate(); persist(); applyTheme(); done(x, () => { closeSheet(); render(); toast('Copia restaurada'); }); } };
  };
  sh.onclick = async e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.a === 'close') return closeSheet();
    if (b.dataset.theme) { p.theme = b.dataset.theme; persist(); applyTheme(); $$('#themeSeg button', sh).forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); }); segThumb($('#themeSeg', sh)); return; }
    if (b.dataset.a === 'saveprof') { p.name = $('#sName', sh).value.trim(); p.income = money($('#sInc', sh).value); p.path = $('#sPath', sh).value; persist(); done(b, () => { render({ quiet: true }); toast('Datos guardados'); }); }
    if (b.dataset.a === 'cats') return openCats();
    if (b.dataset.a === 'export') {
      const now = new Date(); const name = 'numia-copia-' + dKey(now) + '.json'; const blob = new Blob([JSON.stringify({ app: 'NüMIA', v: 1, exported: now.toISOString(), state })], { type: 'application/json' });
      const mark = () => { try { localStorage.setItem('pilas_last_backup', now.toISOString()); } catch (_) { } };
      try { const file = new File([blob], name, { type: 'application/json' }); if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'Copia de NüMIA' }); mark(); toast('Copia lista. Guárdala en Archivos'); return; } } catch (err) { if (err && err.name === 'AbortError') return; }
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); mark(); toast('Copia descargada');
    }
    if (b.dataset.a === 'import') $('#bkFile', sh).click();
    if (b.dataset.a === 'wipe') {
      const c = sheet(`${head('¿Borrar todo?')}<p style="margin:0">Se borran todos tus movimientos, deudas, metas y progreso. Haz una copia antes si la quieres conservar.</p><button class="primary loss" data-a="yes" type="button">Sí, borrar todo</button>`);
      c.onclick = ev => { const x = ev.target.closest('button'); if (!x) return; if (x.dataset.a === 'close') return closeSheet(); if (x.dataset.a === 'yes') { state = freshState(); persist(); onb = { step: 0, name: '', path: '', income: '', incomeType: 'fijo', saved: '', debts: [] }; while (stack.length) stack.pop().bg.remove(); tab = 'inicio'; navHist.length = 0; render(); } };
    }
  };
}

/* ============ Acciones de las vistas ============ */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el || !$('#view').contains(el)) return;
  const [a, x, y] = el.dataset.act.split(':');
  switch (a) {
    case 'go': return go(x, y);
    case 'add': return openAdd('out');
    case 'score': return openScore();
    case 'howpts': return openHowPoints();
    case 'lesson': return openLesson(x, tab === 'aprende');
    case 'reset': { const c = sheet(`${head('Empezar con tus datos')}<p style="margin:0">Se borran los datos de ejemplo y empiezas el diagnóstico con tu información.</p><button class="primary" data-a="yes" type="button">Empezar</button>`); c.onclick = ev => { const b = ev.target.closest('button'); if (!b) return; if (b.dataset.a === 'close') return closeSheet(); if (b.dataset.a === 'yes') { const n = state.profile.name; state = freshState(); persist(); onb = { step: 1, name: n === 'Haderson' ? '' : n, path: '', income: '', incomeType: 'fijo', saved: '', debts: [] }; navHist.length = 0; tab = 'inicio'; closeSheet(() => render()); } }; return; }
    case 'paybill': return payBill(x);
    case 'bill': return openBill(x || null);
    case 'budget': return openBudget(x || null);
    case 'debt': return openDebtForm(x ? state.debts.find(d => d.id === x) : null);
    case 'abono': return openAbono(x);
    case 'loancalc': return openLoanCalc();
    case 'goal': return openGoal(x || null);
    case 'aporte': return openAporte(x, false);
    case 'retiro': return openAporte(x, true);
    case 'tx': return openTx(x);
    case 'cats': return openCats();
    case 'movm': movM = addMonths(movM, +x); return render({ quiet: true });
    case 'repm': repM = addMonths(repM, +x); return render({ quiet: true });
    case 'movk': movF.k = x; return render({ quiet: true });
    case 'movcat': if (movF.cat) { movF.cat = null; return render({ quiet: true }); } return pickCategory(movF.k === 'in' ? 'in' : 'out', null, id => { movF.cat = id; render({ quiet: true }); }, { title: 'Filtrar por categoría' });
    case 'repnode': if ((x || null) !== repNode) pushNav(); repNode = x || null; render({ quiet: true }); return scrollTo({ top: 0, behavior: 'auto' });
    case 'report': pushNav(); sub.movs = 'reporte'; repM = curM(); repNode = x; return go('movs', null, true);
    case 'checkin': { const ac = state.ch.active; if (!ac || ac.checks.includes(todayK())) return; ac.checks.push(todayK()); finishChallengeIfDone(); persist(); render({ quiet: true }); if (state.ch.active) toast('¡Bien! Un día más'); return; }
    case 'startch': state.ch.active = { id: x, start: todayK(), checks: [] }; persist(); render({ quiet: true }); toast('Reto iniciado. ¡Tú puedes!'); return;
    case 'newch': return openChallengeForm(null);
    case 'editch': return openChallengeForm(x);
    case 'quitch': state.ch.active = null; persist(); render({ quiet: true }); return;
  }
});
document.addEventListener('click', e => {
  const b = e.target.closest('#view [data-seg]'); if (!b) return; const s = b.closest('.seg').id;
  const key = { movSeg: 'movs', planSeg: 'plan', learnSeg: 'aprende' }[s];
  if (key) { if (sub[key] !== b.dataset.seg) pushNav(); sub[key] = b.dataset.seg; }
  else if (s === 'stratSeg') { state.plan.strategy = b.dataset.seg; persist(); }
  render({ quiet: true });
});
function afterRender() {
  const v = $('#view');
  const fg = $('.ring .fg', v); if (fg) requestAnimationFrame(() => fg.style.strokeDashoffset = fg.dataset.off);
  const hb = $('#hBal'); if (hb) { const t = totals(curM()); countUp(hb, (t.i || state.profile.income) - t.o); }
  drawTrend();
  const q = $('#movQ'); if (q) q.addEventListener('input', () => { movF.q = q.value; const p = q.selectionStart; render({ quiet: true }); const n = $('#movQ'); n.focus(); try { n.setSelectionRange(p, p); } catch (_) { } });
  const g = $('#glQ'); if (g) g.addEventListener('input', () => { glQ = g.value; const p = g.selectionStart; render({ quiet: true }); const n = $('#glQ'); n.focus(); try { n.setSelectionRange(p, p); } catch (_) { } });
  const ex = $('#extraIn'); if (ex) { moneyInput(ex); ex.addEventListener('change', () => { state.plan.extra = money(ex.value); persist(); render({ quiet: true }); }); }
  if (!REDUCED) $$('.play', v).forEach(p => { p.classList.remove('play'); void p.offsetWidth; p.classList.add('play'); });
  newTx = null;
}

if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => { });
if ('serviceWorker' in navigator && location.protocol === 'https:') addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { }));
if (state.profile.onboarded && !state.cats.length) seedCats();
applyTheme();
if (state.profile.onboarded) { idx(); monthlyCheck(); maintainStreak(); persist(); }
render();
