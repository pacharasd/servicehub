import './style.css';
import { groups, modules, createDemoRecords } from './data.js';

const STORAGE_KEY = 'servicehub-demo-records-v1';
const app = document.querySelector('#app');
const icons = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  sparkles: '<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 17 .7 1.3L21 19l-1.3.7L19 21l-.7-1.3L17 19l1.3-.7L19 17ZM4 17l.5 1L6 18.5 4.5 19 4 20l-.5-1L2 18.5l1.5-.5L4 17Z"/>',
  recycle: '<path d="m7 19-2-3.4a2 2 0 0 1 0-2l1-1.7M9 5h5.2a2 2 0 0 1 1.7 1l1.4 2.4M19 11l2 3.5a2 2 0 0 1 0 2l-1.4 2.4a2 2 0 0 1-1.7 1H13"/><path d="m4 12 2.8-.8L7.5 14M17 7.5l.5 3 2.8-.9M11 21l2-2-2-2"/>',
  droplet: '<path d="M12 22a8 8 0 0 0 8-8c0-4.4-8-12-8-12S4 9.6 4 14a8 8 0 0 0 8 8Z"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 16 4-5 3 2 5-7"/>',
  road: '<path d="M7 3 4 21M17 3l3 18M12 3v3m0 4v4m0 4v3"/>',
  waves: '<path d="M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  truck: '<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  flask: '<path d="M9 3h6M10 3v7l-5.5 9a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 10V3M8 16h8"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="m5 12 14 0m-6-6 6 6-6 6"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
  filter: '<path d="M4 7h16M7 12h10M10 17h4"/>',
  ellipsis: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L10 16l-4 1 1-4 9.5-9.5Z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  empty: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 10h8M8 14h5"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
};

const icon = (name, size = 20, cls = '') => `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.grid}</svg>`;
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const number = (value) => new Intl.NumberFormat('th-TH', { maximumFractionDigits: 2 }).format(Number(value) || 0);
const thaiDate = (date) => date ? new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok' }).format(new Date(`${date.slice(0, 10)}T12:00:00+07:00`)) : '—';
const today = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' });
const moduleById = (id) => modules.find((module) => module.id === id);
const groupById = (id) => groups.find((group) => group.id === id);
const moduleHref = (id) => `#/module/${id}`;

const sidebarItems = [
  {
    type: 'group',
    id: 'cleaning',
    label: 'งานบริการรักษาความสะอาด',
    icon: 'sparkles',
    children: [
      { module: 'road-washings', label: 'การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด' },
      { module: 'waterway-cleanings', label: 'การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ' },
      { module: 'road-sweepings', label: 'การกวาดทำความสะอาดฝุ่นถนนสาธารณะ' },
      { module: 'outsourced-cleanings', label: 'กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม' },
    ],
  },
  { type: 'link', module: 'waste-collections', label: 'งานบริหารจัดการมูลฝอย', icon: 'recycle' },
  {
    type: 'group',
    id: 'sanitation',
    label: 'งานบริหารจัดการสิ่งปฏิกูล',
    icon: 'droplet',
    children: [
      { module: 'drain-cleanings', label: 'งานลอกท่อระบายน้ำ' },
      { module: 'septic-pumpings', label: 'งานสูบสิ่งปฏิกูล' },
      { module: 'septic-treatments', label: 'การบำบัดสิ่งปฏิกูล' },
    ],
  },
  { type: 'link', module: 'waste-management-projects', label: 'โครงการต่าง ๆ', icon: 'chart' },
];

function loadRecords() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(stored) ? stored : createDemoRecords();
  } catch { return createDemoRecords(); }
}
let records = loadRecords();
let mobileOpen = false;
let toast = null;
let pendingDelete = null;
let expandedSidebarGroups = new Set();

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(records)); return true; }
  catch { showToast('ไม่สามารถบันทึกในเบราว์เซอร์นี้ได้', 'error'); return false; }
}
function showToast(message, type = 'success') {
  toast = { message, type };
  render();
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => { toast = null; render(); }, 4200);
}
function route() {
  if (location.hash.startsWith("#figmacapture=")) return { parts: ["dashboard"], params: new URLSearchParams() };
  const [path, query = ''] = (location.hash.slice(1) || '/dashboard').split('?');
  const parts = path.split('/').filter(Boolean);
  return { parts, params: new URLSearchParams(query) };
}
function navigate(path) {
  mobileOpen = false;
  if (location.hash === `#${path}`) render();
  else location.hash = path;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function expandActiveSidebarGroup() {
  const { parts } = route();
  const currentModule = parts[0] === 'module' ? parts[1] : null;
  const activeGroup = sidebarItems.find((item) => item.type === 'group' && item.children.some((child) => child.module === currentModule));
  if (activeGroup) expandedSidebarGroups.add(activeGroup.id);
}

function sidebarNavItem(item, currentModule) {
  if (item.type === 'link') {
    const active = currentModule === item.module;
    return `<a href="${moduleHref(item.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${active ? 'nav-active' : 'text-[#657772] hover:bg-[#f4f7f4] hover:text-ink'}" ${active ? 'aria-current="page"' : ''}>${icon(item.icon, 19, 'shrink-0')}<span class="min-w-0 whitespace-normal break-words">${esc(item.label)}</span></a>`;
  }

  const expanded = expandedSidebarGroups.has(item.id);
  const active = item.children.some((child) => child.module === currentModule);
  return `<div class="mb-1">
    <button type="button" data-action="toggle-sidebar-group" data-group="${item.id}" aria-expanded="${expanded}" aria-controls="sidebar-group-${item.id}" class="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold leading-5 ${active ? 'bg-[#f4f9f5] text-primary-dark' : 'text-[#657772] hover:bg-[#f4f7f4] hover:text-ink'}">
      ${icon(item.icon, 19, 'shrink-0')}<span class="min-w-0 flex-1 whitespace-normal break-words">${esc(item.label)}</span>${icon('chevronDown', 16, `shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`)}
    </button>
    <div id="sidebar-group-${item.id}" class="ml-5 border-l border-[#dbe9df] pl-3" ${expanded ? '' : 'hidden'}>
      ${item.children.map((child) => {
        const selected = currentModule === child.module;
        return `<a href="${moduleHref(child.module)}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${selected ? 'nav-active' : 'text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink'}" ${selected ? 'aria-current="page"' : ''}><span class="whitespace-normal break-words">${esc(child.label)}</span></a>`;
      }).join('')}
    </div>
  </div>`;
}

function sidebar(currentModule, dashboard) {
  return `<div id="mobile-backdrop" class="${mobileOpen ? 'fixed inset-0 z-40 bg-slate-950/35 lg:hidden' : 'hidden'}" data-action="close-menu"></div>
    <aside id="sidebar" class="fixed inset-y-0 left-0 z-50 flex w-[266px] flex-col border-r border-line bg-white transition-transform duration-200 lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}">
      <div class="flex h-[84px] items-center gap-3 border-b border-line px-6">
        <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">${icon('waves', 25)}</div>
        <div><div class="text-[18px] font-bold tracking-tight text-ink">ServiceHub</div><div class="text-[11px] font-medium tracking-wide text-muted">ระบบข้อมูลส่วนบริการ</div></div>
        <button type="button" class="ml-auto rounded-lg p-2 text-muted lg:hidden" data-action="close-menu" aria-label="ปิดเมนู">${icon('close', 20)}</button>
      </div>
      <nav aria-label="เมนูหลัก" class="scrollbar-thin flex-1 overflow-y-auto px-4 pb-6 pt-6">
        <a href="#/dashboard" class="mb-2 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${dashboard ? 'nav-active' : 'text-[#657772] hover:bg-[#f4f7f4] hover:text-ink'}" ${dashboard ? 'aria-current="page"' : ''}>${icon('grid', 19)}<span>แดชบอร์ด</span></a>
        ${sidebarItems.map((item) => sidebarNavItem(item, currentModule)).join('')}
      </nav>
      <div class="border-t border-line p-4"><div class="rounded-2xl bg-[#f3f8f5] p-3.5"><div class="flex items-center gap-2 text-xs font-bold text-primary-dark">${icon('info', 16)} โหมดตัวอย่าง</div><p class="mt-1.5 text-[11px] leading-relaxed text-muted">ข้อมูลในหน้านี้เป็นข้อมูลสาธิตและบันทึกเฉพาะในเบราว์เซอร์</p></div></div>
    </aside>`;
}
function topbar(breadcrumbs) {
  return `<header class="sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-line bg-white/95 px-4 backdrop-blur-sm sm:px-7 lg:px-9">
    <div class="flex min-w-0 items-center gap-3"><button type="button" class="rounded-xl p-2 text-ink hover:bg-canvas lg:hidden" data-action="open-menu" aria-label="เปิดเมนู">${icon('menu', 22)}</button><nav aria-label="เส้นทางหน้า" class="flex min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap text-xs text-muted sm:text-sm"><a class="hover:text-primary" href="#/dashboard">หน้าหลัก</a>${breadcrumbs.map((crumb) => `${icon('chevron', 14, 'shrink-0 text-[#b7c4bd]')}<span class="truncate ${crumb.current ? 'font-semibold text-ink' : ''}">${crumb.href ? `<a href="${crumb.href}" class="hover:text-primary">${esc(crumb.label)}</a>` : esc(crumb.label)}</span>`).join('')}</nav></div>
    <div class="ml-3 flex shrink-0 items-center gap-3"><span class="hidden rounded-full border border-[#cfe9dd] bg-[#f0faf4] px-3 py-1 text-[11px] font-bold text-primary sm:inline-flex">ข้อมูลสาธิต</span><div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#dceee5] text-xs font-bold text-primary-dark" aria-label="ผู้ใช้งานตัวอย่าง">ผท</div></div>
  </header>`;
}

function shell(content, currentModule = null, crumbs = [], dashboard = false) {
  return `${sidebar(currentModule, dashboard)}<div class="min-h-screen lg:pl-[266px]">${topbar(crumbs)}<main id="main-content" class="mx-auto max-w-[1510px] px-4 pb-16 pt-7 sm:px-7 lg:px-9">${content}</main></div>${toast ? `<div role="status" aria-live="polite" class="fixed bottom-5 right-5 z-[70] flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold shadow-xl ${toast.type === 'error' ? 'border-red-200 bg-white text-red-700' : 'border-[#c6e9d8] bg-white text-primary-dark'}">${icon(toast.type === 'error' ? 'info' : 'check', 19)}${esc(toast.message)}<button type="button" class="ml-2 rounded p-1" data-action="dismiss-toast" aria-label="ปิดข้อความ">${icon('close', 17)}</button></div>` : ''}${pendingDelete ? deleteDialog() : ''}`;
}

function pageHeading(eyebrow, title, description, action = '') {
  return `<div class="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p class="mb-1.5 text-xs font-bold tracking-[.13em] text-primary">${esc(eyebrow)}</p><h1 class="text-[27px] font-bold leading-tight tracking-tight text-ink sm:text-[32px]">${esc(title)}</h1><p class="mt-2 text-sm leading-relaxed text-muted">${esc(description)}</p></div>${action}</div>`;
}
const primaryButton = (label, href, iconName = 'plus') => `<a href="${href}" class="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${icon(iconName, 18)}${esc(label)}</a>`;
const outlinedButton = (label, href, iconName = 'arrow') => `<a href="${href}" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f8fbf8]">${esc(label)}${icon(iconName, 17)}</a>`;

function dashboard() {
  const total = records.length;
  const todayCount = records.filter((record) => record.service_date === today()).length;
  const countGroups = groups.map((group) => ({ ...group, count: records.filter((record) => moduleById(record.module)?.group === group.id).length }));
  const max = Math.max(...countGroups.map((group) => group.count), 1);
  const recent = [...records].sort((a, b) => b.service_date.localeCompare(a.service_date)).slice(0, 5);
  return shell(`${pageHeading('ภาพรวมระบบ', 'แดชบอร์ดส่วนบริการ', 'ติดตามงานบริการทุกกลุ่มในภาพรวมจากข้อมูลสาธิต', primaryButton('เพิ่มข้อมูลใหม่', '#/module/road-washings/new'))}
    <section aria-label="สรุปข้อมูล" class="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div class="panel-shadow relative overflow-hidden rounded-2xl border border-[#dbece3] bg-[#eaf6ee] p-5 sm:p-6"><div class="absolute -right-7 -top-7 h-32 w-32 rounded-full border-[20px] border-white/40"></div><div class="relative flex items-start justify-between"><div class="flex h-11 w-11 items-center justify-center rounded-xl bg-white/85 text-primary">${icon('grid', 21)}</div><span class="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-bold text-primary">ทั้งหมด</span></div><div class="relative mt-7 text-[32px] font-bold leading-none text-ink">${number(total)} <span class="text-sm font-medium text-muted">รายการ</span></div><p class="relative mt-2 text-xs font-medium text-muted">ข้อมูลในระบบตัวอย่าง</p></div>
      ${[{ title: 'บันทึกวันนี้', value: todayCount, unit: 'รายการ', iconName: 'calendar', color: 'text-[#3485a5]', bg: 'bg-[#e7f3f8]' }, { title: 'กลุ่มงานบริการ', value: groups.length, unit: 'กลุ่มงาน', iconName: 'sparkles', color: 'text-[#bb7934]', bg: 'bg-[#fff3e5]' }, { title: 'หมวดข้อมูล', value: modules.length, unit: 'หมวด', iconName: 'chart', color: 'text-[#7767b4]', bg: 'bg-[#f1eefb]' }].map((card) => `<div class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-6"><div class="flex items-center justify-between"><div class="flex h-11 w-11 items-center justify-center rounded-xl ${card.bg} ${card.color}">${icon(card.iconName, 21)}</div><span class="text-xs font-medium text-[#9aac9f]">ข้อมูลสาธิต</span></div><div class="mt-7 text-[32px] font-bold leading-none text-ink">${number(card.value)} <span class="text-sm font-medium text-muted">${card.unit}</span></div><p class="mt-2 text-xs font-medium text-muted">${card.title}</p></div>`).join('')}
    </section>
    <div class="mb-7 grid gap-6 xl:grid-cols-[1.36fr_1fr]"><section aria-labelledby="group-chart-title" class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-6"><div class="mb-6 flex items-start justify-between"><div><h2 id="group-chart-title" class="text-base font-bold">ปริมาณรายการตามกลุ่มงาน</h2><p class="mt-1 text-xs text-muted">จำนวนรายการตัวอย่างในแต่ละกลุ่มงาน</p></div><span class="rounded-full bg-[#f2f7f4] px-2.5 py-1 text-[11px] font-bold text-primary">${number(total)} รายการ</span></div><div class="space-y-5">${countGroups.map((group) => `<div><div class="mb-2 flex items-center justify-between gap-3 text-xs sm:text-sm"><span class="font-semibold text-[#415650]">${esc(group.short)}</span><span class="font-bold text-ink">${number(group.count)}</span></div><div class="h-2.5 rounded-full bg-[#eef3ef]"><div class="h-2.5 rounded-full ${group.tone === 'mint' ? 'bg-[#38aa82]' : group.tone === 'sky' ? 'bg-[#6daec6]' : group.tone === 'amber' ? 'bg-[#e6b36b]' : 'bg-[#a499cf]'}" style="width:${Math.round(group.count / max * 100)}%"></div></div></div>`).join('')}</div></section>
      <section aria-labelledby="quick-title" class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-6"><div class="mb-5"><h2 id="quick-title" class="text-base font-bold">เข้าถึงงานอย่างรวดเร็ว</h2><p class="mt-1 text-xs text-muted">เลือกหมวดงานที่ต้องการจัดการ</p></div><div class="grid gap-2.5">${groups.map((group) => { const first = modules.find((module) => module.group === group.id); return `<a href="${moduleHref(first.id)}" class="group flex items-center gap-3 rounded-xl border border-[#edf1ed] px-3.5 py-3 transition hover:border-[#c8e4d6] hover:bg-[#f8fcf9]"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${group.tone === 'mint' ? 'bg-[#e9f6ef] text-[#229368]' : group.tone === 'sky' ? 'bg-[#eaf4f8] text-[#4c97ae]' : group.tone === 'amber' ? 'bg-[#fcf3e8] text-[#c08740]' : 'bg-[#f2eff9] text-[#8a79b8]'}">${icon(group.icon, 19)}</span><span class="min-w-0 flex-1 truncate text-sm font-semibold text-ink">${esc(group.short)}</span>${icon('arrow', 17, 'text-[#9caea3] transition group-hover:translate-x-1 group-hover:text-primary')}</a>`; }).join('')}</div></section></div>
    <div class="grid gap-6 xl:grid-cols-[1.36fr_1fr]"><section aria-labelledby="recent-title" class="panel-shadow overflow-hidden rounded-2xl border border-line bg-white"><div class="flex items-center justify-between border-b border-line px-5 py-5 sm:px-6"><div><h2 id="recent-title" class="text-base font-bold">รายการล่าสุด</h2><p class="mt-1 text-xs text-muted">ข้อมูลสาธิตที่บันทึกล่าสุด</p></div></div><div class="divide-y divide-[#eef2ee]">${recent.map((record) => { const module = moduleById(record.module); return `<a href="${moduleHref(module.id)}/${encodeURIComponent(record.id)}" class="flex items-center gap-3 px-5 py-4 transition hover:bg-[#f9fbf9] sm:px-6"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef7f0] text-primary">${icon(module.icon, 18)}</div><div class="min-w-0 flex-1"><p class="truncate text-sm font-semibold">${esc(record[module.titleField] || module.short)}</p><p class="mt-0.5 truncate text-xs text-muted">${esc(module.short)}</p></div><span class="hidden text-xs text-muted sm:block">${thaiDate(record.service_date)}</span>${icon('chevron', 16, 'text-[#a6b7ac]')}</a>`; }).join('')}</div></section>
      <section aria-labelledby="module-title" class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-6"><div class="mb-5"><h2 id="module-title" class="text-base font-bold">หมวดข้อมูลทั้งหมด</h2><p class="mt-1 text-xs text-muted">ครอบคลุมข้อมูลตามข้อกำหนด AGENT.md</p></div><div class="space-y-1.5">${modules.map((module) => `<a href="${moduleHref(module.id)}" class="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-[13px] text-[#51665b] transition hover:bg-[#f4f9f5] hover:text-primary"><span class="truncate">${esc(module.short)}</span><span class="shrink-0 rounded-full bg-[#f2f6f2] px-2 py-0.5 text-[11px] font-bold text-[#779081]">${records.filter((record) => record.module === module.id).length}</span></a>`).join('')}</div></section></div>`, null, [{ label: 'แดชบอร์ด', current: true }], true);
}

function listPage(module, params) {
  const query = params.get('q') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const sort = params.get('sort') || 'newest';
  const page = Math.max(1, Number(params.get('page')) || 1);
  let rows = records.filter((record) => record.module === module.id);
  if (query) rows = rows.filter((record) => module.fields.some((field) => String(record[field.name] ?? '').toLocaleLowerCase('th').includes(query.toLocaleLowerCase('th'))));
  if (from) rows = rows.filter((record) => record.service_date >= from);
  if (to) rows = rows.filter((record) => record.service_date <= to);
  module.fields.filter(f => f.type === 'select').forEach(f => {
    const v = params.get(f.name);
    if (v) rows = rows.filter(record => record[f.name] === v);
  });
  rows.sort((a, b) => sort === 'oldest' ? a.service_date.localeCompare(b.service_date) : b.service_date.localeCompare(a.service_date));
  const pageSize = 6;
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(page, pages);
  const visible = rows.slice((safePage - 1) * pageSize, safePage * pageSize);
  const nonDate = module.fields.filter((field) => field.name !== 'service_date');
  const shownFields = nonDate.slice(0, 3);
  const buildPage = (next) => { const nextParams = new URLSearchParams(params); nextParams.set('page', String(next)); return `${moduleHref(module.id)}?${nextParams}`; };

  const selectFilters = module.fields.filter(f => f.type === 'select' && f.options).map(f => {
    const fValue = params.get(f.name) || '';
    return `<div class="w-full sm:w-[170px]"><label for="${f.name}-filter" class="mb-1.5 block text-xs font-bold text-[#52665d]">${f.label}</label><select id="${f.name}-filter" name="${f.name}" class="field"><option value="">ทั้งหมด</option>${f.options.map(opt => `<option value="${esc(opt)}" ${fValue === opt ? 'selected' : ''}>${esc(opt)}</option>`).join('')}</select></div>`;
  }).join('');

  return shell(`${pageHeading(groupById(module.group).label, module.label, `จัดการข้อมูล${module.short} ค้นหาและกรองรายการตามช่วงวันที่`, primaryButton('เพิ่มข้อมูล', `${moduleHref(module.id)}/new`))}
    <section aria-label="ตัวกรองรายการ" class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-5"><form id="filter-form" data-module="${module.id}" class="flex flex-wrap items-end gap-3"><div class="flex-1 min-w-[180px]"><label for="search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label><div class="relative">${icon('search', 18, 'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]')}<input id="search" name="q" class="field pl-10" type="search" placeholder="ค้นหาข้อมูล..." value="${esc(query)}"></div></div><div class="w-full sm:w-[150px]"><label for="date-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label><input id="date-from" class="field" type="date" name="from" value="${esc(from)}"></div><div class="w-full sm:w-[150px]"><label for="date-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label><input id="date-to" class="field" type="date" name="to" value="${esc(to)}"></div>${selectFilters}<div class="w-full sm:w-[150px]"><label for="sort" class="mb-1.5 block text-xs font-bold text-[#52665d]">เรียงตาม</label><select id="sort" name="sort" class="field"><option value="newest" ${sort === 'newest' ? 'selected' : ''}>วันที่ล่าสุด</option><option value="oldest" ${sort === 'oldest' ? 'selected' : ''}>วันที่เก่าสุด</option></select></div><div class="w-full sm:w-auto"><a href="${moduleHref(module.id)}" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas sm:w-auto">ล้างตัวกรอง</a></div></form></section>
    <section aria-labelledby="records-title" class="panel-shadow overflow-hidden rounded-2xl border border-line bg-white"><div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-4 sm:px-6"><div><h2 id="records-title" class="text-sm font-bold">รายการข้อมูล</h2><p class="mt-0.5 text-xs text-muted">พบ ${number(rows.length)} รายการ</p></div><span class="rounded-full bg-[#f0f7f2] px-2.5 py-1 text-[11px] font-bold text-primary">${esc(module.short)}</span></div>${visible.length ? `<div class="hidden overflow-x-auto md:block"><table class="w-full min-w-[690px] text-left text-sm"><thead class="bg-[#f9fbf9] text-xs font-semibold text-muted"><tr><th scope="col" class="px-6 py-3.5">วันที่ดำเนินงาน</th>${shownFields.map((field) => `<th scope="col" class="px-6 py-3.5">${esc(field.label)}</th>`).join('')}<th scope="col" class="px-6 py-3.5">ผู้บันทึก</th><th scope="col" class="px-6 py-3.5 text-right">ดูข้อมูล</th></tr></thead><tbody class="divide-y divide-[#eef2ee]">${visible.map((record) => `<tr class="transition hover:bg-[#fafcfa]"><td class="whitespace-nowrap px-6 py-4 font-semibold text-ink">${thaiDate(record.service_date)}</td>${shownFields.map((field) => `<td class="max-w-[260px] truncate px-6 py-4 text-[#53675e]">${formatField(field, record[field.name])}</td>`).join('')}<td class="px-6 py-4 text-muted">${esc(record.created_by)}</td><td class="px-6 py-4 text-right"><a href="${moduleHref(module.id)}/${encodeURIComponent(record.id)}" class="inline-flex items-center gap-1 font-bold text-primary hover:underline">รายละเอียด ${icon('arrow', 15)}</a></td></tr>`).join('')}</tbody></table></div><div class="divide-y divide-[#edf1ed] md:hidden">${visible.map((record) => `<a href="${moduleHref(module.id)}/${encodeURIComponent(record.id)}" class="block px-5 py-4 hover:bg-[#fafcfa]"><div class="flex items-center justify-between gap-2"><span class="font-bold text-ink">${esc(record[module.titleField] || module.short)}</span>${icon('chevron', 16, 'shrink-0 text-muted')}</div><div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted"><span>${thaiDate(record.service_date)}</span><span>${esc(shownFields[0]?.label || '')}: ${formatField(shownFields[0], record[shownFields[0]?.name])}</span></div></a>`).join('')}</div><div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 text-xs text-muted sm:px-6"><span>แสดง ${number((safePage - 1) * pageSize + 1)}–${number(Math.min(safePage * pageSize, rows.length))} จาก ${number(rows.length)} รายการ</span><div class="flex items-center gap-2"><a href="${buildPage(Math.max(1, safePage - 1))}" class="rounded-lg border border-line px-3 py-1.5 ${safePage === 1 ? 'pointer-events-none opacity-45' : 'hover:bg-canvas'}" ${safePage === 1 ? 'aria-disabled="true" tabindex="-1"' : ''}>ก่อนหน้า</a><span class="px-1 font-bold text-ink">${safePage} / ${pages}</span><a href="${buildPage(Math.min(pages, safePage + 1))}" class="rounded-lg border border-line px-3 py-1.5 ${safePage === pages ? 'pointer-events-none opacity-45' : 'hover:bg-canvas'}" ${safePage === pages ? 'aria-disabled="true" tabindex="-1"' : ''}>ถัดไป</a></div></div>` : `<div class="flex flex-col items-center px-6 py-16 text-center"><div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f7f2] text-primary">${icon('empty', 27)}</div><h3 class="text-base font-bold">ไม่พบรายการข้อมูล</h3><p class="mt-1 max-w-sm text-sm leading-relaxed text-muted">${query || from || to ? 'ลองเปลี่ยนคำค้นหาหรือช่วงวันที่ แล้วค้นหาอีกครั้ง' : 'เริ่มต้นด้วยการเพิ่มรายการข้อมูลในหมวดนี้'}</p><div class="mt-5">${query || from || to ? outlinedButton('ล้างตัวกรอง', moduleHref(module.id)) : primaryButton('เพิ่มข้อมูล', `${moduleHref(module.id)}/new`)}</div></div>`}</section>`, module.id, [{ label: module.short, current: true }]);
}

function formatField(field, value) {
  if (!field) return '—';
  if (value === undefined || value === null || value === '') return '—';
  if (field.type === 'number' || field.type === 'integer') return `${number(value)}${field.unit ? ` ${esc(field.unit)}` : ''}`;
  if (field.type === 'date') return thaiDate(value);
  return esc(value);
}

function fieldInput(field, value = '', error = '') {
  const id = `field-${field.name}`;
  const common = `id="${id}" name="${field.name}" class="field" ${field.required ? 'required' : ''} ${error ? 'aria-invalid="true"' : ''} aria-describedby="${id}-help"`;
  let input;
  if (field.type === 'textarea') {
    input = `<textarea ${common} rows="4" maxlength="500">${esc(value)}</textarea>`;
  } else if (field.type === 'select') {
    input = `<select ${common}><option value="" disabled ${!value ? 'selected' : ''}>ระบุ${esc(field.label)}</option>${field.options.map(opt => `<option value="${esc(opt)}" ${value === opt ? 'selected' : ''}>${esc(opt)}</option>`).join('')}</select>`;
  } else {
    input = `<input ${common} type="${field.type === 'integer' || field.type === 'number' ? 'number' : field.type}" ${field.type === 'number' ? 'step="0.01" min="0"' : field.type === 'integer' ? 'step="1" min="0"' : ''} ${field.type === 'text' ? 'maxlength="255"' : ''} value="${esc(value)}" placeholder="${field.type === 'text' ? `ระบุ${esc(field.label)}` : ''}">`;
  }
  return `<div class="${field.type === 'textarea' ? 'sm:col-span-2' : ''}"><label for="${id}" class="mb-1.5 block text-sm font-semibold text-[#41564c]">${esc(field.label)} ${field.required ? '<span class="text-[#bf5b53]" aria-label="จำเป็น">*</span>' : ''}</label>${input}<p id="${id}-help" class="mt-1.5 min-h-4 text-xs ${error ? 'text-[#b73c35]' : 'text-muted'}">${error ? esc(error) : field.unit ? `หน่วย: ${esc(field.unit)}` : '&nbsp;'}</p></div>`;
}

function formPage(module, record = null, errors = {}) {
  const editing = Boolean(record);
  const values = formPage.draft || record || {};
  const title = `${editing ? 'แก้ไข' : 'เพิ่ม'}ข้อมูล${module.short}`;
  return shell(`${pageHeading(groupById(module.group).label, title, editing ? 'ตรวจสอบและแก้ไขรายละเอียดรายการนี้' : 'กรอกข้อมูลการดำเนินงานให้ครบตามช่องที่กำหนด')}
    <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]"><section class="panel-shadow rounded-2xl border border-line bg-white"><div class="border-b border-line px-5 py-5 sm:px-7"><h2 class="font-bold">รายละเอียดการดำเนินงาน</h2><p class="mt-1 text-xs text-muted">ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p></div><form id="record-form" data-module="${module.id}" data-id="${record ? esc(record.id) : ''}" novalidate class="p-5 sm:p-7"><div class="grid gap-x-6 gap-y-3 sm:grid-cols-2">${module.fields.map((field) => fieldInput(field, values[field.name] ?? '', errors[field.name])).join('')}</div><div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end"><a href="${record ? `${moduleHref(module.id)}/${encodeURIComponent(record.id)}` : moduleHref(module.id)}" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold text-[#566a60] hover:bg-canvas">ยกเลิก</a><button type="submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">${icon('check', 18)}${editing ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}</button></div></form></section>
      <aside class="h-fit rounded-2xl border border-[#d7eadd] bg-[#f0f8f2] p-5"><div class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary">${icon('info', 20)}</div><h2 class="mt-4 text-sm font-bold">เกี่ยวกับข้อมูลนี้</h2><p class="mt-2 text-xs leading-6 text-[#62776a]">แบบฟอร์มนี้เป็นต้นแบบหน้าจอ ข้อมูลจะบันทึกไว้เฉพาะในเบราว์เซอร์ของคุณ และยังไม่มีการเชื่อมต่อระบบหลังบ้าน</p><div class="mt-4 border-t border-[#d8e8db] pt-4 text-xs text-[#62776a]">หมวดงาน: <span class="font-semibold text-primary-dark">${esc(groupById(module.group).short)}</span></div></aside></div>`, module.id, [{ label: module.short, href: moduleHref(module.id) }, { label: editing ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล', current: true }]);
}

function detailPage(module, record) {
  return shell(`${pageHeading(groupById(module.group).label, 'รายละเอียดข้อมูล', `ข้อมูล${module.short} วันที่ ${thaiDate(record.service_date)}`, `<div class="flex flex-wrap gap-2">${outlinedButton('แก้ไข', `${moduleHref(module.id)}/${encodeURIComponent(record.id)}/edit`, 'edit')}<button type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#eed8d5] bg-white px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete" data-module="${module.id}" data-id="${esc(record.id)}">${icon('trash', 17)}ลบรายการ</button></div>`)}
    <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]"><section class="panel-shadow rounded-2xl border border-line bg-white"><div class="border-b border-line px-5 py-5 sm:px-7"><h2 class="font-bold">ข้อมูลการดำเนินงาน</h2></div><dl class="grid gap-x-8 gap-y-0 p-5 sm:grid-cols-2 sm:p-7">${module.fields.map((field) => `<div class="border-b border-[#edf1ed] py-4"><dt class="text-xs font-semibold text-muted">${esc(field.label)}</dt><dd class="mt-1.5 break-words text-sm font-bold text-ink">${formatField(field, record[field.name])}</dd></div>`).join('')}</dl></section><aside class="h-fit rounded-2xl border border-line bg-white p-5"><h2 class="text-sm font-bold">ประวัติรายการ</h2><div class="mt-5 space-y-5 border-l-2 border-[#d8eadf] pl-4"><div><p class="text-xs font-bold text-primary">บันทึกข้อมูล</p><p class="mt-1 text-xs text-muted">${esc(record.created_by || 'ผู้ใช้งานตัวอย่าง')}</p><p class="mt-0.5 text-xs text-muted">${thaiDate(record.created_at)}</p></div><div><p class="text-xs font-bold text-primary">แก้ไขล่าสุด</p><p class="mt-1 text-xs text-muted">${esc(record.updated_by || 'ผู้ใช้งานตัวอย่าง')}</p><p class="mt-0.5 text-xs text-muted">${thaiDate(record.updated_at)}</p></div></div><div class="mt-5 rounded-xl bg-[#f4f8f4] p-3 text-[11px] leading-relaxed text-muted">ประวัตินี้เป็นข้อมูลตัวอย่าง ยังไม่มี Audit Log จากระบบหลังบ้าน</div></aside></div>`, module.id, [{ label: module.short, href: moduleHref(module.id) }, { label: 'รายละเอียด', current: true }]);
}

function notFound() {
  return shell(`<div class="panel-shadow mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-white p-10 text-center"><div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f2f7f3] text-primary">${icon('empty', 27)}</div><h1 class="text-xl font-bold">ไม่พบหน้าที่ต้องการ</h1><p class="mt-2 text-sm text-muted">รายการนี้อาจถูกลบหรือไม่มีอยู่ในข้อมูลสาธิต</p><div class="mt-6">${primaryButton('กลับแดชบอร์ด', '#/dashboard', 'arrow')}</div></div>`, null, [{ label: 'ไม่พบหน้า', current: true }]);
}

function deleteDialog() {
  return `<div class="fixed inset-0 z-[80] flex items-center justify-center bg-[#0d241e]/55 p-4" data-action="cancel-delete"><div role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description" class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" data-dialog><div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0ed] text-[#b64b43]">${icon('trash', 21)}</div><h2 id="delete-title" class="text-lg font-bold">ยืนยันการลบรายการ</h2><p id="delete-description" class="mt-2 text-sm leading-relaxed text-muted">รายการนี้จะถูกลบจากข้อมูลสาธิตที่เก็บในเบราว์เซอร์ คุณต้องการดำเนินการต่อหรือไม่</p><div class="mt-7 flex justify-end gap-2"><button type="button" class="min-h-11 rounded-xl border border-line px-4 text-sm font-bold text-ink" data-action="cancel-delete">ยกเลิก</button><button type="button" class="min-h-11 rounded-xl bg-[#b84d45] px-4 text-sm font-bold text-white hover:bg-[#a43e37]" data-action="confirm-delete">ลบรายการ</button></div></div></div>`;
}

function render() {
  const { parts, params } = route();
  const module = parts[0] === 'module' ? moduleById(parts[1]) : null;
  let markup;
  if (parts[0] === 'dashboard' || !parts.length) markup = dashboard();
  else if (!module) markup = notFound();
  else if (parts.length === 2) markup = listPage(module, params);
  else if (parts[2] === 'new' && parts.length === 3) markup = formPage(module);
  else {
    const record = records.find((item) => item.module === module.id && item.id === decodeURIComponent(parts[2] || ''));
    markup = record ? parts[3] === 'edit' ? formPage(module, record) : detailPage(module, record) : notFound();
  }
  app.innerHTML = markup;
  document.title = `${module?.short || 'แดชบอร์ด'} — ServiceHub`;
  if (pendingDelete) document.querySelector('[data-dialog] button[data-action="cancel-delete"]')?.focus();
  initCustomSelects();
}

function initCustomSelects() {
  document.querySelectorAll('select.field:not(.custom-select-applied)').forEach(select => {
    select.classList.add('custom-select-applied');
    select.style.display = 'none';
    const wrapper = document.createElement('div');
    wrapper.className = 'relative w-full';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = select.className.replace('custom-select-applied', '').replace('hidden', '') + ' flex items-center justify-between text-left';
    const renderIcon = () => `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
    button.innerHTML = `<span class="truncate">${select.options[select.selectedIndex]?.text || ''}</span>${renderIcon()}`;
    if (select.getAttribute('aria-invalid') === 'true') button.setAttribute('aria-invalid', 'true');
    const menu = document.createElement('div');
    menu.className = 'absolute left-0 top-[calc(100%+6px)] z-20 hidden w-full overflow-y-auto max-h-60 rounded-xl border border-line bg-white shadow-xl custom-select-menu py-1';
    
    const update = () => {
      button.innerHTML = `<span class="truncate">${select.options[select.selectedIndex]?.text || ''}</span>${renderIcon()}`;
    };

    const validOptions = Array.from(select.options).filter(opt => !opt.disabled);
    
    validOptions.forEach((opt) => {
      const div = document.createElement('div');
      div.className = `cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${opt.selected ? 'bg-[#f0f8f2] font-bold text-primary' : ''}`;
      div.textContent = opt.text;
      div.onclick = () => {
        select.value = opt.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        select.dispatchEvent(new Event('input', { bubbles: true }));
        menu.classList.add('hidden');
        update();
        Array.from(menu.children).forEach((c, j) => {
          c.className = `cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${validOptions[j].selected ? 'bg-[#f0f8f2] font-bold text-primary' : ''}`;
        });
      };
      menu.appendChild(div);
    });
    
    button.onclick = (e) => {
      e.preventDefault();
      const isOpen = !menu.classList.contains('hidden');
      document.querySelectorAll('.custom-select-menu').forEach(m => m.classList.add('hidden'));
      if (!isOpen) menu.classList.remove('hidden');
    };
    
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(button);
    wrapper.appendChild(menu);
    wrapper.appendChild(select);
  });
}

function validateForm(form, module) {
  const data = Object.fromEntries(new FormData(form));
  const errors = {};
  module.fields.forEach((field) => {
    const value = String(data[field.name] ?? '').trim();
    data[field.name] = value;
    if (field.required && !value) errors[field.name] = `กรุณาระบุ${field.label}`;
    else if (value && (field.type === 'number' || field.type === 'integer') && (!Number.isFinite(Number(value)) || Number(value) < 0 || (field.type === 'integer' && !Number.isInteger(Number(value))))) errors[field.name] = `กรุณาระบุ${field.label}เป็นจำนวนที่ถูกต้อง`;
    else if (value && field.type === 'date' && Number.isNaN(new Date(value).getTime())) errors[field.name] = 'กรุณาระบุวันที่ที่ถูกต้อง';
  });
  return { data, errors };
}

document.addEventListener('input', (event) => {
  const form = event.target.form;
  if (form && form.id === 'filter-form') {
    clearTimeout(form.timeoutId);
    form.timeoutId = setTimeout(() => {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 400);
  }
});

document.addEventListener('submit', (event) => {
  if (event.target.id === 'filter-form') {
    event.preventDefault();
    const form = event.target;
    const params = new URLSearchParams();
    new FormData(form).forEach((value, key) => { if (value && !(key === 'sort' && value === 'newest')) params.set(key, value); });
    navigate(`/module/${form.dataset.module}${params.size ? `?${params}` : ''}`);
  }
  if (event.target.id === 'record-form') {
    event.preventDefault();
    const form = event.target;
    const module = moduleById(form.dataset.module);
    const { data, errors } = validateForm(form, module);
    const existing = form.dataset.id ? records.find((record) => record.id === form.dataset.id) : null;
    if (Object.keys(errors).length) {
      formPage.draft = data;
      app.innerHTML = formPage(module, existing, errors);
      document.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    formPage.draft = null;
    const timestamp = new Date().toISOString();
    const record = existing ? { ...existing, ...data, updated_at: timestamp, updated_by: 'ผู้ใช้งานตัวอย่าง' } : { id: `${module.id}-${crypto.randomUUID()}`, module: module.id, ...data, created_by: 'ผู้ใช้งานตัวอย่าง', created_at: timestamp, updated_by: 'ผู้ใช้งานตัวอย่าง', updated_at: timestamp };
    records = existing ? records.map((item) => item.id === existing.id ? record : item) : [record, ...records];
    if (!persist()) return;
    navigate(`/module/${module.id}/${encodeURIComponent(record.id)}`);
    showToast(existing ? 'แก้ไขข้อมูลสาธิตแล้ว' : 'บันทึกข้อมูลสาธิตแล้ว');
  }
});

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-action]');
  if (!trigger) return;
  const action = trigger.dataset.action;
  if (action === 'toggle-sidebar-group') {
    const groupId = trigger.dataset.group;
    if (expandedSidebarGroups.has(groupId)) expandedSidebarGroups.delete(groupId);
    else expandedSidebarGroups.add(groupId);
    render();
    document.querySelector('[data-action="toggle-sidebar-group"][data-group="' + groupId + '"]')?.focus();
  }
  if (action === 'open-menu') { mobileOpen = true; render(); }
  if (action === 'close-menu') { if (event.target.closest('[data-dialog]')) return; mobileOpen = false; render(); }
  if (action === 'dismiss-toast') { toast = null; render(); }
  if (action === 'delete') { pendingDelete = { module: trigger.dataset.module, id: trigger.dataset.id, focus: trigger }; render(); }
  if (action === 'cancel-delete' && (trigger === event.target || trigger.tagName === 'BUTTON')) { pendingDelete = null; render(); document.querySelector('[data-action="delete"]')?.focus(); }
  if (action === 'confirm-delete' && pendingDelete) {
    const { module, id } = pendingDelete;
    records = records.filter((record) => record.id !== id);
    pendingDelete = null;
    if (!persist()) return;
    navigate(`/module/${module}`);
    showToast('ลบข้อมูลสาธิตแล้ว');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && pendingDelete) { pendingDelete = null; render(); document.querySelector('[data-action="delete"]')?.focus(); }
  if (event.key === 'Escape' && mobileOpen) { mobileOpen = false; render(); }
  if (event.key === 'Tab' && pendingDelete) {
    const buttons = [...document.querySelectorAll('[data-dialog] button')];
    const current = buttons.indexOf(document.activeElement);
    if (event.shiftKey && current === 0) { event.preventDefault(); buttons.at(-1).focus(); }
    if (!event.shiftKey && current === buttons.length - 1) { event.preventDefault(); buttons[0].focus(); }
  }
});

window.addEventListener('hashchange', () => { formPage.draft = null; mobileOpen = false; expandActiveSidebarGroup(); render(); });
document.addEventListener('click', (e) => {
  if (!e.target.closest('.relative')) {
    document.querySelectorAll('.custom-select-menu').forEach(m => m.classList.add('hidden'));
  }
});
expandActiveSidebarGroup();
render();
