import './style.css';
import fallbackLogoUrl from './assets/nonthaburi-logo.png';
import { groups, modules } from './data.js';
import { dashboardContent } from './dashboard.js';
import { reportBody } from './reports.js';

const logoUrl = window.serviceHubUrls?.logo || fallbackLogoUrl;

const ZONE_HREF = '#/cleaning-zones';
const WASTE_TYPE_HREF = '#/waste-types';
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
  login: '<path d="M10 17l5-5-5-5M15 12H3M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',
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
      { module: 'road-washings', label: 'การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด', children: [{ module: 'cleaning-zones', href: ZONE_HREF, label: 'เขตรักษาความสะอาด' }] },
      { module: 'waterway-cleanings', label: 'การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ' },
      { module: 'road-sweepings', label: 'การกวาดทำความสะอาดฝุ่นถนนสาธารณะ' },
      { module: 'outsourced-cleanings', label: 'กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม' },
    ],
  },
  { type: 'link', module: 'waste-collections', label: 'งานบริหารจัดการมูลฝอย', icon: 'recycle', children: [{ module: 'waste-types', href: WASTE_TYPE_HREF, label: 'ประเภทขยะมูลฝอย' }] },
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

const referenceKinds = {
  'cleaning-zones': 'เขตรักษาความสะอาด',
  'waste-types': 'ประเภทขยะมูลฝอย',
};
const references = Object.fromEntries(Object.keys(referenceKinds).map(key => [key, []]));
let records = [];
let zones = references['cleaning-zones'];
let wasteTypes = references['waste-types'];
let overview = null;
let overviewLoading = false;
let overviewError = '';
let overviewRequest = 0;
let liveDataLoaded = false;
let reportData = {};
let reportDetail = null;
let reportMeta = null;
let reportLoading = false;
let reportError = '';
let reportRequest = 0;
let auditRows = [];
let auditMeta = { current_page: 1, last_page: 1 };
let loadError = '';
let mobileOpen = false;
let userMenuOpen = false;
let toast = null;
let pendingDelete = null;
let expandedSidebarGroups = new Set();
let expandedFilterModules = new Set();
const roleNameMap = {
  'super-admin': 'ผู้ดูแลระบบสูงสุด',
  'admin': 'ผู้ดูแลระบบ',
  'staff': 'เจ้าหน้าที่',
  'viewer': 'ผู้ดูข้อมูล',
  'auditor': 'ผู้ตรวจสอบระบบ',
};
const roleBadgeMap = {
  'super-admin': 'border-red-200 bg-red-50 text-red-700',
  'admin': 'border-amber-200 bg-amber-50 text-amber-700',
  'staff': 'border-teal-200 bg-teal-50 text-teal-800',
  'viewer': 'border-gray-200 bg-gray-50 text-gray-700',
  'auditor': 'border-blue-200 bg-blue-50 text-blue-700',
};
const apiActivity = module => window.serviceHubUrls.apiActivities.replace('__MODULE__', encodeURIComponent(module));
const apiReference = type => window.serviceHubUrls.apiReferences.replace('__TYPE__', encodeURIComponent(type));
const can = permission => window.serviceHubUser.permissions.includes(permission);

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content, ...options.headers },
    ...options,
  });
  if (response.status === 401 || response.status === 419) { window.location.assign(window.serviceHubUrls.login); throw new Error('กรุณาเข้าสู่ระบบอีกครั้ง'); }
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.message || (response.status === 403 ? 'ไม่มีสิทธิ์ดำเนินการ' : `เกิดข้อผิดพลาด (${response.status})`));
    error.fields = body.errors || {};
    throw error;
  }
  return body;
}

async function allPages(url) {
  let page = 1;
  const rows = [];
  while (true) {
    const result = await apiRequest(`${url}${url.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
    rows.push(...result.data);
    if (page >= (result.meta?.last_page || 1)) return rows;
    page++;
  }
}

async function refreshLiveData() {
  loadError = '';
  try {
    const [masters, activities] = await Promise.all([
      Promise.all(Object.keys(referenceKinds).map(async type => [type, can(`${type}.view`) ? await allPages(apiReference(type)) : []])),
      Promise.all(modules.map(async module => can(`${module.id}.view`) ? await allPages(apiActivity(module.id)) : [])),
    ]);
    for (const [type, rows] of masters) references[type] = rows;
    zones = references['cleaning-zones'];
    wasteTypes = references['waste-types'];
    records = activities.flat();
    liveDataLoaded = true;
    render();
  } catch (error) { loadError = error.message || 'ไม่สามารถโหลดข้อมูลจากฐานข้อมูลได้'; render(); }
}

async function loadDashboard() {
  const requestId = ++overviewRequest;
  const { parts, params } = route();
  if (parts[0] !== 'dashboard' && parts.length) return;
  overviewLoading = true;
  overviewError = '';
  render();
  try {
    const query = new URLSearchParams();
    if (params.has('from')) query.set('from', params.get('from'));
    if (params.has('to')) query.set('to', params.get('to'));
    const result = await apiRequest(window.serviceHubUrls.apiDashboard + (query.size ? `?${query}` : ''));
    if (requestId !== overviewRequest) return;
    overview = result.data;
  } catch (error) {
    if (requestId !== overviewRequest) return;
    overviewError = error.message || 'ไม่สามารถโหลดภาพรวมได้';
  } finally {
    if (requestId === overviewRequest) { overviewLoading = false; render(); }
  }
}

function zoneUsage(name) { return records.filter(r => r.module === 'road-washings' && r.cleaning_zone === name).length; }
function wasteTypeUsage(name) { return records.filter(r => r.module === 'waste-collections' && r.waste_type === name).length; }

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
  const currentModule = parts[0] === 'module' ? parts[1] : parts[0] === 'cleaning-zones' ? 'cleaning-zones' : parts[0] === 'waste-types' ? 'waste-types' : null;
  const activeGroup = sidebarItems.find((item) => item.type === 'group' && item.children.some((child) => child.module === currentModule || child.children?.some((nested) => nested.module === currentModule)));
  if (currentModule === 'waste-collections' || currentModule === 'waste-types') expandedSidebarGroups.add('waste-collections');
  if (activeGroup) {
    expandedSidebarGroups.add(activeGroup.id);
    const activeSubgroup = activeGroup.children.find((child) => child.children?.some((nested) => nested.module === currentModule) || (child.module === currentModule && child.children));
    if (activeSubgroup) expandedSidebarGroups.add(activeSubgroup.module);
  }
}

function sidebarNavItem(item, currentModule) {
  if (item.type === 'link') {
    const active = currentModule === item.module;
    if (!item.children) return `<a href="${moduleHref(item.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${active ? 'nav-active' : 'text-[#657772] hover:bg-[#f4f7f4] hover:text-ink'}" ${active ? 'aria-current="page"' : ''}>${icon(item.icon, 19, 'shrink-0')}<span class="min-w-0 whitespace-normal break-words">${esc(item.label)}</span></a>`;
    const nestedActive = item.children.some((child) => child.module === currentModule);
    const expanded = expandedSidebarGroups.has(item.module);
    return `<div class="mb-1 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${active ? 'nav-active' : nestedActive ? 'bg-[#f4f9f5] text-primary-dark' : 'text-[#657772]'}"><a href="${moduleHref(item.module)}" class="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-l-xl px-3 py-2.5 text-sm font-semibold leading-5 hover:bg-[#f4f7f4] hover:text-ink" ${active ? 'aria-current="page"' : ''}>${icon(item.icon, 19, 'shrink-0')}<span class="min-w-0 whitespace-normal break-words">${esc(item.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${item.module}" aria-expanded="${expanded}" aria-controls="sidebar-subgroup-${item.module}" aria-label="${expanded ? 'ปิด' : 'เปิด'}เมนูย่อยของ${esc(item.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${icon('chevronDown', 16, `transition-transform ${expanded ? 'rotate-180' : ''}`)}</button></div><div id="sidebar-subgroup-${item.module}" class="ml-5 border-l border-[#dbe9df] pl-3" ${expanded ? '' : 'hidden'}>${item.children.map((child) => {
      const selected = currentModule === child.module;
      return `<a href="${child.href || moduleHref(child.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${selected ? 'nav-active' : 'text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink'}" ${selected ? 'aria-current="page"' : ''}><span class="min-w-0 whitespace-normal break-words">${esc(child.label)}</span></a>`;
    }).join('')}</div></div>`;
  }

  const expanded = expandedSidebarGroups.has(item.id);
  const active = item.children.some((child) => child.module === currentModule || child.children?.some((nested) => nested.module === currentModule));
  return `<div class="mb-1">
    <button type="button" data-action="toggle-sidebar-group" data-group="${item.id}" aria-expanded="${expanded}" aria-controls="sidebar-group-${item.id}" class="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold leading-5 ${active ? 'bg-[#f4f9f5] text-primary-dark' : 'text-[#657772] hover:bg-[#f4f7f4] hover:text-ink'}">
      ${icon(item.icon, 19, 'shrink-0')}<span class="min-w-0 flex-1 whitespace-normal break-words">${esc(item.label)}</span>${icon('chevronDown', 16, `shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`)}
    </button>
    <div id="sidebar-group-${item.id}" class="ml-5 border-l border-[#dbe9df] pl-3" ${expanded ? '' : 'hidden'}>
      ${item.children.map((child) => {
        const selected = currentModule === child.module;
        const href = child.href || moduleHref(child.module);
        if (!child.children) return `<a href="${href}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${selected ? 'nav-active' : 'text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink'}" ${selected ? 'aria-current="page"' : ''}><span class="whitespace-normal break-words">${esc(child.label)}</span></a>`;
        const subExpanded = expandedSidebarGroups.has(child.module);
        const nestedActive = child.children.some((nested) => nested.module === currentModule);
        return `<div class="my-0.5 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${selected ? 'nav-active' : nestedActive ? 'bg-[#f4f9f5] text-primary-dark' : 'text-[#687b74]'}"><a href="${href}" class="flex min-h-11 min-w-0 flex-1 items-center rounded-l-xl px-3 py-2.5 text-[13px] font-medium leading-5 hover:bg-[#f4f7f4] hover:text-ink ${selected ? 'font-semibold' : ''}" ${selected ? 'aria-current="page"' : ''}><span class="min-w-0 whitespace-normal break-words">${esc(child.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${child.module}" aria-expanded="${subExpanded}" aria-controls="sidebar-subgroup-${child.module}" aria-label="${subExpanded ? 'ปิด' : 'เปิด'}เมนูย่อยของ${esc(child.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${icon('chevronDown', 16, `transition-transform ${subExpanded ? 'rotate-180' : ''}`)}</button></div><div id="sidebar-subgroup-${child.module}" class="ml-3 border-l border-[#dbe9df] pl-2" ${subExpanded ? '' : 'hidden'}>${child.children.map((nested) => {
          const nestedSelected = currentModule === nested.module;
          return `<a href="${nested.href || moduleHref(nested.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${nestedSelected ? 'nav-active' : 'text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink'}" ${nestedSelected ? 'aria-current="page"' : ''}><span class="min-w-0 whitespace-normal break-words">${esc(nested.label)}</span></a>`;
        }).join('')}</div></div>`;
      }).join('')}
    </div>
  </div>`;
}

function sidebar(currentModule, dashboard) {
  return `<div id="mobile-backdrop" class="${mobileOpen ? 'fixed inset-0 z-40 bg-slate-950/35 lg:hidden' : 'hidden'}" data-action="close-menu"></div>
    <aside id="sidebar" class="fixed inset-y-0 left-0 z-50 flex w-[266px] max-w-[calc(100vw-24px)] flex-col border-r border-line bg-white transition-transform duration-200 lg:translate-x-0 lg:visible lg:pointer-events-auto ${mobileOpen ? 'translate-x-0 visible pointer-events-auto' : '-translate-x-full invisible pointer-events-none'}" ${mobileOpen ? 'aria-hidden="false"' : 'aria-hidden="true"'}>
      <div class="flex h-[72px] items-center gap-3 border-b border-line px-5 sm:px-6">
        <img src="${logoUrl}" alt="ตราเทศบาลนครนนทบุรี" class="h-12 w-12 shrink-0 object-contain drop-shadow-sm">
        <div class="min-w-0 flex-1"><div class="text-[15px] font-bold tracking-tight text-ink leading-snug">เทศบาลนครนนทบุรี</div><div class="text-[11px] font-medium tracking-wide text-muted">ฐานข้อมูลฝ่ายบริการ</div></div>
        <button type="button" class="ml-auto rounded-lg p-2 text-muted lg:hidden" data-action="close-menu" aria-label="ปิดเมนู">${icon('close', 20)}</button>
      </div>
      <nav aria-label="เมนูหลัก" class="scrollbar-thin flex-1 overflow-y-auto px-4 pb-6 pt-6">
        <a href="#/dashboard" class="mb-2 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${dashboard ? 'nav-active' : 'text-[#657772] hover:bg-[#f4f7f4] hover:text-ink'}" ${dashboard ? 'aria-current="page"' : ''}>${icon('grid', 19)}<span>แดชบอร์ดฝ่ายบริการ</span></a>
        ${sidebarItems.map((item) => sidebarNavItem(item, currentModule)).join('')}
        <a href="#/reports" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${currentModule === 'reports' ? 'nav-active' : 'text-[#657772] hover:bg-[#f4f7f4] hover:text-ink'}">${icon('chart', 18)}รายงาน</a>
        ${can('audit-logs.view') ? `<a href="#/audit-logs" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${currentModule === 'audit-logs' ? 'nav-active' : 'text-[#657772] hover:bg-[#f4f7f4] hover:text-ink'}">${icon('info', 18)}ประวัติการแก้ไข</a>` : ''}
        ${canManageUsers() ? `<div class="mt-3 border-t border-line pt-3"><a href="#/users" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${currentModule === 'users' ? 'nav-active' : 'text-[#657772] hover:bg-[#f4f7f4] hover:text-ink'}" ${currentModule === 'users' ? 'aria-current="page"' : ''}>${icon('users', 19)}<span>จัดการผู้ใช้งาน</span></a></div>` : ''}
        <div class="mt-3 border-t border-line pt-3">
          <a href="#/profile" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${currentModule === 'profile' ? 'nav-active' : 'text-[#657772] hover:bg-[#f4f7f4] hover:text-ink'}" ${currentModule === 'profile' ? 'aria-current="page"' : ''}>
            ${icon('users', 19)}<span>โปรไฟล์ของฉัน</span>
          </a>
        </div>
      </nav>
    </aside>`;
}
function topbar(breadcrumbs) {
  const user = window.serviceHubUser || {};
  const initial = (user.name || user.username || 'U').slice(0, 1).toUpperCase();
  const initials = (user.name || user.username || 'U').slice(0, 2).toUpperCase();
  const primaryRole = (user.roles || [])[0] || 'staff';
  return `<header class="app-header sticky top-0 z-30 flex h-[72px] w-full max-w-full min-w-0 items-center justify-between border-b border-line bg-white/95 px-3.5 backdrop-blur-sm sm:px-7 lg:px-9">
    <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
      <button type="button" class="shrink-0 rounded-xl p-2 text-ink hover:bg-canvas lg:hidden" data-action="open-menu" aria-label="เปิดเมนู" aria-expanded="${mobileOpen}" aria-controls="sidebar">${icon('menu', 22)}</button>
      <nav aria-label="เส้นทางหน้า" class="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap text-xs text-muted sm:text-sm">
        <a class="shrink-0 hover:text-primary" href="#/dashboard">หน้าหลัก</a>
        ${breadcrumbs.map((crumb) => `${icon('chevron', 14, 'shrink-0 text-[#b7c4bd]')}<span class="min-w-0 truncate ${crumb.current ? 'font-semibold text-ink' : ''}">${crumb.href ? `<a href="${crumb.href}" class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom hover:text-primary">${esc(crumb.label)}</a>` : `<span class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom">${esc(crumb.label)}</span>`}</span>`).join('')}
      </nav>
    </div>
    <div class="ml-2 flex shrink-0 items-center gap-2 sm:gap-3">
      <span class="hidden rounded-full border border-[#cfe9dd] bg-[#f0faf4] px-3 py-1 text-[11px] font-bold text-primary sm:inline-flex">ข้อมูลจริง</span>
      <div id="user-menu-container" class="relative">
        <button type="button" data-action="toggle-user-menu" id="user-menu-button" aria-haspopup="menu" aria-expanded="${userMenuOpen}" aria-controls="user-menu-dropdown" class="flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f0f8f2] focus:outline-none focus:ring-2 focus:ring-primary/20 ${userMenuOpen ? 'border-primary bg-[#f0f8f2]' : ''}" aria-label="เมนูผู้ใช้งาน ${esc(user.name || user.username)}">
          <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#177a67] to-[#0e6253] text-xs font-bold text-white shadow-sm">${esc(initial)}</span>
          <span class="hidden max-w-[130px] truncate sm:inline">${esc(user.name || user.username)}</span>
          ${icon('chevronDown', 14, `shrink-0 text-[#687b74] transition-transform duration-150 ${userMenuOpen ? 'rotate-180' : ''}`)}
        </button>
        <div id="user-menu-dropdown" class="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-24px)] rounded-2xl border border-line bg-white p-2 shadow-xl z-50 transition-all ${userMenuOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-1 pointer-events-none'}" role="menu" aria-labelledby="user-menu-button" ${userMenuOpen ? '' : 'hidden'}>
          <div class="rounded-xl bg-[#f8faf8] p-3 border border-[#edf3ee]">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#177a67] to-[#0e6253] text-sm font-bold text-white shadow-sm">
                ${esc(initials)}
              </div>
              <div class="min-w-0 flex-1">
                <div class="text-xs font-bold text-ink truncate">${esc(user.name || user.username)}</div>
                <div class="text-[11px] text-muted truncate">@${esc(user.username)}</div>
                <div class="mt-1">
                  <span class="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${roleBadgeMap[primaryRole] || 'border-gray-200 bg-gray-50 text-gray-700'}">
                    ${esc(roleNameMap[primaryRole] || primaryRole)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="my-1.5 border-t border-line"></div>
          <a href="#/profile" data-action="close-user-menu" role="menuitem" class="flex min-h-10 items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-ink transition hover:bg-[#f0f8f2] hover:text-primary-dark">
            ${icon('users', 16, 'text-primary')}
            <span>โปรไฟล์ของฉัน</span>
          </a>
          <div class="my-1.5 border-t border-line"></div>
          <form method="POST" action="${esc(window.serviceHubUrls.logout)}" class="m-0">
            <input type="hidden" name="_token" value="${esc(document.querySelector('meta[name="csrf-token"]')?.content)}">
            <button type="submit" role="menuitem" class="flex w-full min-h-10 items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-700">
              ${icon('logout', 16, 'text-rose-500')}
              <span>ออกจากระบบ</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </header>`;
}

function shell(content, currentModule = null, crumbs = [], dashboard = false) {
  if (loadError) content = `<div role="alert" class="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">${esc(loadError)}</div>` + content;
  return `${sidebar(currentModule, dashboard)}<div class="app-shell min-h-screen w-full max-w-full min-w-0 lg:pl-[266px]">${topbar(crumbs)}<main id="main-content" class="app-content mx-auto w-full min-w-0 max-w-[1510px] px-3.5 pb-16 pt-5 sm:px-7 sm:pt-7 lg:px-9">${content}</main></div>${toast ? `<div role="status" aria-live="polite" class="app-toast fixed inset-x-4 bottom-4 z-[70] flex max-w-sm sm:inset-x-auto sm:bottom-5 sm:right-5 items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold shadow-xl ${toast.type === 'error' ? 'border-red-200 bg-white text-red-700' : 'border-[#c6e9d8] bg-white text-primary-dark'}">${icon(toast.type === 'error' ? 'info' : 'check', 19)}${esc(toast.message)}<button type="button" class="ml-2 rounded p-1" data-action="dismiss-toast" aria-label="ปิดข้อความ">${icon('close', 17)}</button></div>` : ''}${pendingDelete ? deleteDialog() : ''}`;
}

function pageHeading(eyebrow, title, description, action = '') {
  return `<div class="mb-5 flex min-w-0 max-w-full flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end">
    <div class="min-w-0 max-w-full flex-1">
      <p class="mb-1 text-xs font-bold tracking-[.13em] text-primary sm:mb-1.5">${esc(eyebrow)}</p>
      <h1 class="break-words text-[22px] sm:text-[32px] font-bold leading-tight tracking-tight text-ink">${esc(title)}</h1>
      <p class="mt-1.5 break-words text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">${esc(description)}</p>
    </div>
    ${action ? `<div class="w-full shrink-0 sm:w-auto">${action}</div>` : ''}
  </div>`;
}
const primaryButton = (label, href, iconName = 'plus') => `<a href="${href}" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${icon(iconName, 18)}${esc(label)}</a>`;
const outlinedButton = (label, href, iconName = 'arrow') => `<a href="${href}" class="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f8fbf8]">${esc(label)}${icon(iconName, 17)}</a>`;

function dashboard() {
  return shell(dashboardContent({ data: overview, loading: overviewLoading, error: overviewError, params: route().params, groups, modules, icon, esc, number, moduleHref }), null, [{ label: 'แดชบอร์ดฝ่ายบริการ', current: true }], true);
}

function listPage(module, params) {
  const query = params.get('q') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const sort = params.get('sort') || 'newest';
  const page = Math.max(1, Number(params.get('page')) || 1);
  let rows = records.filter((record) => record.module === module.id);
  if (query) rows = rows.filter((record) => module.fields.some((field) => String(field.type === 'reference' ? references[field.reference]?.find(item => String(item.id) === String(record[field.name]))?.name : record[field.name] ?? '').toLocaleLowerCase('th').includes(query.toLocaleLowerCase('th'))));
  if (from) rows = rows.filter((record) => record.service_date >= from);
  if (to) rows = rows.filter((record) => record.service_date <= to);
  module.fields.filter(f => f.type === 'reference').forEach(f => {
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

  const selectFilters = module.fields.filter(f => f.type === 'reference').map(f => {
    const fValue = params.get(f.name) || '';
    return `<div class="w-full min-w-0 sm:w-[170px]"><label for="${f.name}-filter" class="mb-1.5 block text-xs font-bold text-[#52665d]">${f.label}</label><select id="${f.name}-filter" name="${f.name}" class="field"><option value="">ทั้งหมด</option>${(references[f.reference] || []).map(opt => `<option value="${esc(opt.id)}" ${fValue === String(opt.id) ? 'selected' : ''}>${esc(opt.name)}</option>`).join('')}</select></div>`;
  }).join('');
  const activeAdvancedFilters = Boolean(from || to || sort !== 'newest' || module.fields.some((field) => field.type === 'reference' && params.get(field.name)));
  if (activeAdvancedFilters) expandedFilterModules.add(module.id);
  const filtersOpen = expandedFilterModules.has(module.id);

  return shell(`${pageHeading(groupById(module.group).label, module.label, `จัดการข้อมูล${module.short} ค้นหาและกรองรายการตามช่วงวันที่`, can(`${module.id}.create`) ? primaryButton('เพิ่มข้อมูล', `${moduleHref(module.id)}/new`) : '')}
    <section aria-label="ตัวกรองรายการ" class="panel-shadow mb-5 w-full max-w-full min-w-0 rounded-2xl border border-line bg-white p-4 sm:p-5"><form id="filter-form" data-module="${module.id}" class="flex flex-wrap items-end gap-3"><div class="w-full min-w-0 sm:min-w-[180px] sm:flex-1"><label for="search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label><div class="relative">${icon('search', 18, 'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]')}<input id="search" name="q" class="field pl-10" type="search" placeholder="ค้นหาข้อมูล..." value="${esc(query)}"></div></div><button type="button" data-action="toggle-mobile-filters" data-module="${module.id}" aria-expanded="${filtersOpen}" aria-controls="advanced-filters-${module.id}" class="inline-flex min-h-11 w-full items-center justify-between rounded-xl border border-line px-4 text-sm font-semibold text-primary-dark md:hidden">ตัวกรองเพิ่มเติม ${icon('chevronDown', 16, filtersOpen ? 'rotate-180' : '')}</button><div id="advanced-filters-${module.id}" class="${filtersOpen ? 'flex' : 'hidden'} w-full flex-wrap items-end gap-3 md:contents"><div class="w-full min-w-0 sm:w-[150px]"><label for="date-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label><input id="date-from" class="field" type="date" name="from" value="${esc(from)}"></div><div class="w-full min-w-0 sm:w-[150px]"><label for="date-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label><input id="date-to" class="field" type="date" name="to" value="${esc(to)}"></div>${selectFilters}<div class="w-full min-w-0 sm:w-[150px]"><label for="sort" class="mb-1.5 block text-xs font-bold text-[#52665d]">เรียงตาม</label><select id="sort" name="sort" class="field"><option value="newest" ${sort === 'newest' ? 'selected' : ''}>วันที่ล่าสุด</option><option value="oldest" ${sort === 'oldest' ? 'selected' : ''}>วันที่เก่าสุด</option></select></div><div class="w-full sm:w-auto"><a href="${moduleHref(module.id)}" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas sm:w-auto">ล้างตัวกรอง</a></div></div></form></section>
    <section aria-labelledby="records-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white"><div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4"><div><h2 id="records-title" class="text-sm font-bold">รายการข้อมูล</h2><p class="mt-0.5 text-xs text-muted">พบ ${number(rows.length)} รายการ</p></div><span class="rounded-full bg-[#f0f7f2] px-2.5 py-1 text-[11px] font-bold text-primary">${esc(module.short)}</span></div>${visible.length ? `<div class="flex items-center justify-between border-b border-line bg-[#f8faf8] px-4 py-2 text-[11px] font-medium text-muted md:hidden"><div class="flex items-center gap-1.5">${icon('arrow', 13, 'rotate-180 text-primary shrink-0')}<span>เลื่อนตารางเพื่อดูคอลัมน์ทั้งหมด</span>${icon('arrow', 13, 'text-primary shrink-0')}</div><span class="text-[10px] text-muted font-normal">แนวนอน</span></div><div class="data-table-scroll block overflow-x-auto w-full max-w-full min-w-0"><table class="w-full min-w-[650px] text-left text-sm"><thead class="bg-[#f9fbf9] text-xs font-semibold text-muted"><tr><th scope="col" class="px-5 py-3.5 whitespace-nowrap">วันที่ดำเนินงาน</th>${shownFields.map((field) => `<th scope="col" class="px-5 py-3.5 whitespace-nowrap">${esc(field.label)}</th>`).join('')}<th scope="col" class="px-5 py-3.5 whitespace-nowrap">ผู้บันทึก</th><th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">ดูข้อมูล</th></tr></thead><tbody class="divide-y divide-[#eef2ee]">${visible.map((record) => `<tr class="transition hover:bg-[#fafcfa]"><td class="whitespace-nowrap px-5 py-3.5 font-semibold text-ink">${thaiDate(record.service_date)}</td>${shownFields.map((field) => `<td class="max-w-[240px] truncate px-5 py-3.5 text-[#53675e]">${formatField(field, record[field.name])}</td>`).join('')}<td class="whitespace-nowrap px-5 py-3.5 text-muted">${esc(record.created_by)}</td><td class="whitespace-nowrap px-5 py-3.5 text-right"><a href="${moduleHref(module.id)}/${encodeURIComponent(record.id)}" class="inline-flex items-center gap-1 font-bold text-primary hover:underline">รายละเอียด ${icon('arrow', 15)}</a></td></tr>`).join('')}</tbody></table></div><div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-xs text-muted sm:px-6 sm:py-4"><span>แสดง ${number((safePage - 1) * pageSize + 1)}–${number(Math.min(safePage * pageSize, rows.length))} จาก ${number(rows.length)} รายการ</span><div class="flex items-center gap-2"><a href="${buildPage(Math.max(1, safePage - 1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${safePage === 1 ? 'pointer-events-none opacity-45' : 'hover:bg-canvas'}" ${safePage === 1 ? 'aria-disabled="true" tabindex="-1"' : ''}>ก่อนหน้า</a><span class="px-1 font-bold text-ink">${safePage} / ${pages}</span><a href="${buildPage(Math.min(pages, safePage + 1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${safePage === pages ? 'pointer-events-none opacity-45' : 'hover:bg-canvas'}" ${safePage === pages ? 'aria-disabled="true" tabindex="-1"' : ''}>ถัดไป</a></div></div>` : `<div class="flex flex-col items-center px-6 py-16 text-center"><div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f7f2] text-primary">${icon('empty', 27)}</div><h3 class="text-base font-bold">ไม่พบรายการข้อมูล</h3><p class="mt-1 max-w-sm text-sm leading-relaxed text-muted">${query || from || to ? 'ลองเปลี่ยนคำค้นหาหรือช่วงวันที่ แล้วค้นหาอีกครั้ง' : 'เริ่มต้นด้วยการเพิ่มรายการข้อมูลในหมวดนี้'}</p><div class="mt-5">${query || from || to ? outlinedButton('ล้างตัวกรอง', moduleHref(module.id)) : primaryButton('เพิ่มข้อมูล', `${moduleHref(module.id)}/new`)}</div></div>`}</section>`, module.id, [{ label: module.short, current: true }]);
}

function formatField(field, value) {
  if (!field) return '—';
  if (value === undefined || value === null || value === '') return '—';
  if (field.type === 'reference') return esc(references[field.reference]?.find(item => String(item.id) === String(value))?.name || 'ไม่พบข้อมูลอ้างอิง');
  if (field.type === 'number' || field.type === 'integer') return `${number(value)}${field.unit ? ` ${esc(field.unit)}` : ''}`;
  if (field.type === 'date') return thaiDate(value);
  return esc(value);
}

function fieldInput(field, value = '', error = '') {
  const id = `field-${field.name}`;
  const common = `id="${id}" name="${field.name}" class="field" ${field.required ? 'required' : ''} ${error ? 'aria-invalid="true"' : ''} aria-describedby="${id}-help"`;
  let input;
  if (field.type === 'textarea') {
    input = `<textarea ${common} rows="4" maxlength="10000">${esc(value)}</textarea>`;
  } else if (field.type === 'reference') {
    input = `<select ${common}><option value="" disabled ${!value ? 'selected' : ''}>เลือก${esc(field.label)}</option>${(references[field.reference] || []).filter(item => item.is_active || String(item.id) === String(value)).map(item => `<option value="${esc(item.id)}" ${String(value) === String(item.id) ? 'selected' : ''}>${esc(item.name)}${item.symbol ? ` (${esc(item.symbol)})` : ''}</option>`).join('')}</select>`;
  } else if (field.type === 'select') {
    input = `<select ${common}><option value="" disabled ${!value ? 'selected' : ''}>ระบุ${esc(field.label)}</option>${(field.name === 'cleaning_zone' ? zones.map((zone) => zone.name) : field.name === 'waste_type' ? wasteTypes.map((wasteType) => wasteType.name) : field.options).map(opt => `<option value="${esc(opt)}" ${value === opt ? 'selected' : ''}>${esc(opt)}</option>`).join('')}</select>`;
  } else {
    input = `<input ${common} type="${field.type === 'integer' || field.type === 'number' ? 'number' : field.type}" ${field.type === 'number' ? `step="${['distance_km', 'fee_amount'].includes(field.name) ? '0.01' : '0.001'}" min="0"` : field.type === 'integer' ? 'step="1" min="0"' : ''} ${field.type === 'text' ? `maxlength="${field.name === 'project_name' ? 500 : 255}"` : ''} value="${esc(value)}" placeholder="${field.type === 'text' ? `ระบุ${esc(field.label)}` : ''}">`;
  }
  return `<div class="${field.type === 'textarea' ? 'sm:col-span-2' : ''}"><label for="${id}" class="mb-1.5 block text-sm font-semibold text-[#41564c]">${esc(field.label)} ${field.required ? '<span class="text-[#bf5b53]" aria-label="จำเป็น">*</span>' : ''}</label>${input}<p id="${id}-help" class="mt-1.5 min-h-4 text-xs ${error ? 'text-[#b73c35]' : 'text-muted'}">${error ? esc(error) : field.unit ? `หน่วย: ${esc(field.unit)}` : '&nbsp;'}</p></div>`;
}

function formPage(module, record = null, errors = {}) {
  const editing = Boolean(record);
  const values = formPage.draft || record || {};
  const title = `${editing ? 'แก้ไข' : 'เพิ่ม'}ข้อมูล${module.short}`;
  return shell(`${pageHeading(groupById(module.group).label, title, editing ? 'ตรวจสอบและแก้ไขรายละเอียดรายการนี้' : 'กรอกข้อมูลการดำเนินงานให้ครบตามช่องที่กำหนด')}
    <section class="panel-shadow w-full max-w-full min-w-0 rounded-2xl border border-line bg-white"><div class="border-b border-line px-5 py-5 sm:px-7"><h2 class="font-bold">รายละเอียดการดำเนินงาน</h2><p class="mt-1 text-xs text-muted">ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p></div><form id="record-form" data-module="${module.id}" data-id="${record ? esc(record.id) : ''}" novalidate class="p-5 sm:p-7"><div class="grid min-w-0 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">${module.fields.map((field) => fieldInput(field, values[field.name] ?? '', errors[field.name])).join('')}</div><div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end"><a href="${record ? `${moduleHref(module.id)}/${encodeURIComponent(record.id)}` : moduleHref(module.id)}" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold text-[#566a60] hover:bg-canvas">ยกเลิก</a><button type="submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">${icon('check', 18)}${editing ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}</button></div></form></section>`, module.id, [{ label: module.short, href: moduleHref(module.id) }, { label: editing ? 'แก้ไขข้อมูล' : 'เพิ่มข้อมูล', current: true }]);
}

function detailPage(module, record) {
  return shell(`${pageHeading(groupById(module.group).label, 'รายละเอียดข้อมูล', `ข้อมูล${module.short} วันที่ ${thaiDate(record.service_date)}`, `<div class="flex flex-wrap gap-2">${can(`${module.id}.update`) ? outlinedButton('แก้ไข', `${moduleHref(module.id)}/${encodeURIComponent(record.id)}/edit`, 'edit') : ''}${can(`${module.id}.delete`) ? `<button type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#eed8d5] bg-white px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete" data-module="${module.id}" data-id="${esc(record.id)}">${icon('trash', 17)}ลบรายการ</button>` : ''}</div>`)}
    <div class="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]"><section class="panel-shadow rounded-2xl border border-line bg-white"><div class="border-b border-line px-5 py-5 sm:px-7"><h2 class="font-bold">ข้อมูลการดำเนินงาน</h2></div><dl class="grid min-w-0 grid-cols-1 gap-x-8 gap-y-0 p-5 sm:grid-cols-2 sm:p-7">${module.fields.map((field) => `<div class="border-b border-[#edf1ed] py-4"><dt class="text-xs font-semibold text-muted">${esc(field.label)}</dt><dd class="mt-1.5 break-words text-sm font-bold text-ink">${formatField(field, record[field.name])}</dd></div>`).join('')}</dl></section><aside class="h-fit rounded-2xl border border-line bg-white p-5"><h2 class="text-sm font-bold">ประวัติรายการ</h2><div class="mt-5 space-y-5 border-l-2 border-[#d8eadf] pl-4"><div><p class="text-xs font-bold text-primary">บันทึกข้อมูล</p><p class="mt-1 text-xs text-muted">${esc(record.created_by || 'ไม่ระบุ')}</p><p class="mt-0.5 text-xs text-muted">${thaiDate(record.created_at)}</p></div><div><p class="text-xs font-bold text-primary">แก้ไขล่าสุด</p><p class="mt-1 text-xs text-muted">${esc(record.updated_by || 'ไม่ระบุ')}</p><p class="mt-0.5 text-xs text-muted">${thaiDate(record.updated_at)}</p></div></div><div class="mt-5 rounded-xl bg-[#f4f8f4] p-3 text-[11px] leading-relaxed text-muted">การเปลี่ยนแปลงถูกบันทึกใน Audit Log ของระบบ</div></aside></div>`, module.id, [{ label: module.short, href: moduleHref(module.id) }, { label: 'รายละเอียด', current: true }]);
}

function zoneListPage(params) {
  const query = (params.get('q') || '').trim().toLocaleLowerCase('th-TH');
  const sort = params.get('sort') === 'name' ? 'name' : 'code';
  const pageSize = 10;
  const rows = zones.filter((zone) => !query || (zone.code + ' ' + zone.name).toLocaleLowerCase('th-TH').includes(query))
    .sort((a, b) => String(a[sort]).localeCompare(String(b[sort]), 'th', { numeric: true }));
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const page = Math.min(pages, Math.max(1, Number.parseInt(params.get('page'), 10) || 1));
  const visible = rows.slice((page - 1) * pageSize, page * pageSize);
  const pageHref = (target) => {
    const next = new URLSearchParams();
    if (params.get('q')) next.set('q', params.get('q'));
    if (sort !== 'code') next.set('sort', sort);
    if (target > 1) next.set('page', target);
    return ZONE_HREF + (next.size ? '?' + next : '');
  };
  return shell(
    pageHeading('ข้อมูลพื้นฐาน', 'เขตรักษาความสะอาด', 'จัดการรหัสและชื่อเขตสำหรับรายการล้างทำความสะอาดถนน', primaryButton('เพิ่มเขต', ZONE_HREF + '/new')) +
    '<section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6"><form id="zone-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_180px_auto] sm:items-end">' +
    '<div><label for="zone-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label><input id="zone-search" name="q" type="search" class="field" placeholder="รหัสหรือชื่อเขต" value="' + esc(params.get('q') || '') + '"></div>' +
    '<div><label for="zone-sort" class="mb-1.5 block text-sm font-semibold">เรียงตาม</label><select id="zone-sort" name="sort" class="field master-native-select"><option value="code" ' + (sort === 'code' ? 'selected' : '') + '>รหัสเขต</option><option value="name" ' + (sort === 'name' ? 'selected' : '') + '>ชื่อเขต</option></select></div>' +
    '<button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button></form></section>' +
    '<section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white"><div class="border-b border-line px-4 py-4 sm:px-6"><h2 class="text-sm font-bold">รายการเขต</h2><p class="mt-1 text-xs text-muted">พบ ' + number(rows.length) + ' รายการ</p></div>' +
    (visible.length ? '<div class="divide-y divide-[#edf1ed]">' + visible.map((zone) => '<a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="' + ZONE_HREF + '/' + encodeURIComponent(zone.id) + '"><span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">' + esc(zone.code) + '</span><span class="min-w-0 flex-1 break-words text-sm font-semibold">' + esc(zone.name) + '</span><span class="hidden text-xs text-muted sm:inline">ใช้ในงานล้างถนน ' + number(zoneUsage(zone.name)) + ' รายการ</span>' + icon('chevron', 16, 'shrink-0 text-muted') + '</a>').join('') + '</div>' : '<div class="px-5 py-14 text-center"><h3 class="font-bold">ไม่พบเขตรักษาความสะอาด</h3><p class="mt-2 text-sm text-muted">' + (query ? 'ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด' : 'เริ่มต้นด้วยการเพิ่มเขต') + '</p><div class="mt-5">' + (query ? outlinedButton('แสดงทั้งหมด', ZONE_HREF) : primaryButton('เพิ่มเขต', ZONE_HREF + '/new')) + '</div></div>') +
    (rows.length ? '<div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6"><span>แสดง ' + number((page - 1) * pageSize + 1) + '–' + number(Math.min(page * pageSize, rows.length)) + ' จาก ' + number(rows.length) + ' รายการ</span><div class="flex items-center gap-2"><a class="min-h-11 rounded-lg border border-line px-3 py-3 ' + (page === 1 ? 'pointer-events-none opacity-45' : '') + '" href="' + pageHref(page - 1) + '" ' + (page === 1 ? 'aria-disabled="true" tabindex="-1"' : '') + '>ก่อนหน้า</a><span class="font-bold text-ink">' + page + ' / ' + pages + '</span><a class="min-h-11 rounded-lg border border-line px-3 py-3 ' + (page === pages ? 'pointer-events-none opacity-45' : '') + '" href="' + pageHref(page + 1) + '" ' + (page === pages ? 'aria-disabled="true" tabindex="-1"' : '') + '>ถัดไป</a></div></div>' : '') + '</section>',
    'cleaning-zones', [{ label: 'เขตรักษาความสะอาด', current: true }]);
}

function zoneFormPage(zone = null, errors = {}, values = zone || {}) {
  const editing = Boolean(zone);
  const title = editing ? 'แก้ไขเขตรักษาความสะอาด' : 'เพิ่มเขตรักษาความสะอาด';
  const input = (name, label, limit) => '<div><label class="mb-1.5 block text-sm font-semibold" for="zone-' + name + '">' + label + ' <span class="text-[#b4473e]" aria-label="จำเป็น">*</span></label><input class="field" id="zone-' + name + '" name="' + name + '" type="text" maxlength="' + limit + '" required value="' + esc(values[name] || '') + '" aria-describedby="zone-' + name + '-error" ' + (errors[name] ? 'aria-invalid="true"' : '') + '><p id="zone-' + name + '-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">' + esc(errors[name] || '') + '</p></div>';
  return shell(pageHeading('ข้อมูลพื้นฐาน', title, 'กรอกรหัสและชื่อเขตเพื่อใช้ในฟอร์มล้างทำความสะอาดถนน') +
    '<section class="panel-shadow max-w-2xl rounded-2xl border border-line bg-white p-5 sm:p-7"><form id="zone-form" data-id="' + esc(zone?.id || '') + '" novalidate><div class="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">' + input('code', 'รหัสเขต', 50) + input('name', 'ชื่อเขต', 255) + '</div><div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end"><a class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold" href="' + (zone ? ZONE_HREF + '/' + encodeURIComponent(zone.id) : ZONE_HREF) + '">ยกเลิก</a><button type="submit" class="min-h-11 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">บันทึกข้อมูล</button></div></form></section>',
    'cleaning-zones', [{ label: 'เขตรักษาความสะอาด', href: ZONE_HREF }, { label: editing ? 'แก้ไข' : 'เพิ่มข้อมูล', current: true }]);
}

function zoneDetailPage(zone) {
  const usage = zoneUsage(zone.name);
  return shell(pageHeading('ข้อมูลพื้นฐาน', zone.name, 'รายละเอียดเขตรักษาความสะอาด', '<div class="flex flex-wrap gap-2">' + outlinedButton('แก้ไข', ZONE_HREF + '/' + encodeURIComponent(zone.id) + '/edit', 'edit') + '<button type="button" class="min-h-11 rounded-xl border border-[#eed8d5] px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-zone" data-id="' + esc(zone.id) + '">' + icon('trash', 17) + ' ลบเขต</button></div>') +
    '<section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7"><h2 class="text-base font-bold">ข้อมูลเขต</h2><dl class="mt-4 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2"><div><dt class="text-xs font-semibold text-muted">รหัสเขต</dt><dd class="mt-1 break-words font-bold">' + esc(zone.code) + '</dd></div><div><dt class="text-xs font-semibold text-muted">ชื่อเขต</dt><dd class="mt-1 break-words font-bold">' + esc(zone.name) + '</dd></div><div><dt class="text-xs font-semibold text-muted">รายการล้างถนนที่ใช้เขตนี้</dt><dd class="mt-1 font-bold">' + number(usage) + ' รายการ</dd></div></dl>' + (usage ? '<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">เขตนี้ถูกใช้ในรายการล้างถนน ต้องเปลี่ยนเขตในรายการเหล่านั้นก่อนจึงจะลบได้</p>' : '') + '</section>',
    'cleaning-zones', [{ label: 'เขตรักษาความสะอาด', href: ZONE_HREF }, { label: 'รายละเอียด', current: true }]);
}

function wasteTypeListPage(params) {
  const query = (params.get('q') || '').trim().toLocaleLowerCase('th-TH');
  const sort = params.get('sort') === 'name' ? 'name' : 'code';
  const pageSize = 10;
  const rows = wasteTypes.filter((wasteType) => !query || (wasteType.code + ' ' + wasteType.name).toLocaleLowerCase('th-TH').includes(query))
    .sort((a, b) => String(a[sort]).localeCompare(String(b[sort]), 'th', { numeric: true }));
  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const page = Math.min(pages, Math.max(1, Number.parseInt(params.get('page'), 10) || 1));
  const visible = rows.slice((page - 1) * pageSize, page * pageSize);
  const pageHref = (target) => {
    const next = new URLSearchParams();
    if (params.get('q')) next.set('q', params.get('q'));
    if (sort !== 'code') next.set('sort', sort);
    if (target > 1) next.set('page', target);
    return WASTE_TYPE_HREF + (next.size ? '?' + next : '');
  };
  return shell(
    pageHeading('ข้อมูลพื้นฐาน', 'ประเภทขยะมูลฝอย', 'จัดการรหัสและชื่อประเภทสำหรับรายการมูลฝอย', primaryButton('เพิ่มประเภท', WASTE_TYPE_HREF + '/new')) +
    '<section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6"><form id="wasteType-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_180px_auto] sm:items-end">' +
    '<div><label for="wasteType-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label><input id="wasteType-search" name="q" type="search" class="field" placeholder="รหัสหรือชื่อประเภท" value="' + esc(params.get('q') || '') + '"></div>' +
    '<div><label for="wasteType-sort" class="mb-1.5 block text-sm font-semibold">เรียงตาม</label><select id="wasteType-sort" name="sort" class="field master-native-select"><option value="code" ' + (sort === 'code' ? 'selected' : '') + '>รหัสประเภท</option><option value="name" ' + (sort === 'name' ? 'selected' : '') + '>ชื่อประเภท</option></select></div>' +
    '<button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button></form></section>' +
    '<section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white"><div class="border-b border-line px-4 py-4 sm:px-6"><h2 class="text-sm font-bold">รายการประเภท</h2><p class="mt-1 text-xs text-muted">พบ ' + number(rows.length) + ' รายการ</p></div>' +
    (visible.length ? '<div class="divide-y divide-[#edf1ed]">' + visible.map((wasteType) => '<a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="' + WASTE_TYPE_HREF + '/' + encodeURIComponent(wasteType.id) + '"><span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">' + esc(wasteType.code) + '</span><span class="min-w-0 flex-1 break-words text-sm font-semibold">' + esc(wasteType.name) + '</span><span class="hidden text-xs text-muted sm:inline">ใช้ในงานบริหารจัดการมูลฝอย ' + number(wasteTypeUsage(wasteType.name)) + ' รายการ</span>' + icon('chevron', 16, 'shrink-0 text-muted') + '</a>').join('') + '</div>' : '<div class="px-5 py-14 text-center"><h3 class="font-bold">ไม่พบประเภทขยะมูลฝอย</h3><p class="mt-2 text-sm text-muted">' + (query ? 'ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด' : 'เริ่มต้นด้วยการเพิ่มประเภท') + '</p><div class="mt-5">' + (query ? outlinedButton('แสดงทั้งหมด', WASTE_TYPE_HREF) : primaryButton('เพิ่มประเภท', WASTE_TYPE_HREF + '/new')) + '</div></div>') +
    (rows.length ? '<div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6"><span>แสดง ' + number((page - 1) * pageSize + 1) + '–' + number(Math.min(page * pageSize, rows.length)) + ' จาก ' + number(rows.length) + ' รายการ</span><div class="flex items-center gap-2"><a class="min-h-11 rounded-lg border border-line px-3 py-3 ' + (page === 1 ? 'pointer-events-none opacity-45' : '') + '" href="' + pageHref(page - 1) + '" ' + (page === 1 ? 'aria-disabled="true" tabindex="-1"' : '') + '>ก่อนหน้า</a><span class="font-bold text-ink">' + page + ' / ' + pages + '</span><a class="min-h-11 rounded-lg border border-line px-3 py-3 ' + (page === pages ? 'pointer-events-none opacity-45' : '') + '" href="' + pageHref(page + 1) + '" ' + (page === pages ? 'aria-disabled="true" tabindex="-1"' : '') + '>ถัดไป</a></div></div>' : '') + '</section>',
    'waste-types', [{ label: 'ประเภทขยะมูลฝอย', current: true }]);
}

function wasteTypeFormPage(wasteType = null, errors = {}, values = wasteType || {}) {
  const editing = Boolean(wasteType);
  const title = editing ? 'แก้ไขประเภทขยะมูลฝอย' : 'เพิ่มประเภทขยะมูลฝอย';
  const input = (name, label, limit) => '<div><label class="mb-1.5 block text-sm font-semibold" for="wasteType-' + name + '">' + label + ' <span class="text-[#b4473e]" aria-label="จำเป็น">*</span></label><input class="field" id="wasteType-' + name + '" name="' + name + '" type="text" maxlength="' + limit + '" required value="' + esc(values[name] || '') + '" aria-describedby="wasteType-' + name + '-error" ' + (errors[name] ? 'aria-invalid="true"' : '') + '><p id="wasteType-' + name + '-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">' + esc(errors[name] || '') + '</p></div>';
  return shell(pageHeading('ข้อมูลพื้นฐาน', title, 'กรอกรหัสและชื่อประเภทเพื่อใช้ในฟอร์มงานบริหารจัดการมูลฝอย') +
    '<section class="panel-shadow max-w-2xl rounded-2xl border border-line bg-white p-5 sm:p-7"><form id="wasteType-form" data-id="' + esc(wasteType?.id || '') + '" novalidate><div class="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">' + input('code', 'รหัสประเภท', 50) + input('name', 'ชื่อประเภท', 255) + '</div><div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end"><a class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold" href="' + (wasteType ? WASTE_TYPE_HREF + '/' + encodeURIComponent(wasteType.id) : WASTE_TYPE_HREF) + '">ยกเลิก</a><button type="submit" class="min-h-11 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">บันทึกข้อมูล</button></div></form></section>',
    'waste-types', [{ label: 'ประเภทขยะมูลฝอย', href: WASTE_TYPE_HREF }, { label: editing ? 'แก้ไข' : 'เพิ่มข้อมูล', current: true }]);
}

function wasteTypeDetailPage(wasteType) {
  const usage = wasteTypeUsage(wasteType.name);
  return shell(pageHeading('ข้อมูลพื้นฐาน', wasteType.name, 'รายละเอียดประเภทขยะมูลฝอย', '<div class="flex flex-wrap gap-2">' + outlinedButton('แก้ไข', WASTE_TYPE_HREF + '/' + encodeURIComponent(wasteType.id) + '/edit', 'edit') + '<button type="button" class="min-h-11 rounded-xl border border-[#eed8d5] px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-waste-type" data-id="' + esc(wasteType.id) + '">' + icon('trash', 17) + ' ลบประเภท</button></div>') +
    '<section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7"><h2 class="text-base font-bold">ข้อมูลประเภท</h2><dl class="mt-4 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2"><div><dt class="text-xs font-semibold text-muted">รหัสประเภท</dt><dd class="mt-1 break-words font-bold">' + esc(wasteType.code) + '</dd></div><div><dt class="text-xs font-semibold text-muted">ชื่อประเภท</dt><dd class="mt-1 break-words font-bold">' + esc(wasteType.name) + '</dd></div><div><dt class="text-xs font-semibold text-muted">รายการมูลฝอยที่ใช้ประเภทนี้</dt><dd class="mt-1 font-bold">' + number(usage) + ' รายการ</dd></div></dl>' + (usage ? '<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">ประเภทนี้ถูกใช้ในรายการมูลฝอย ต้องเปลี่ยนประเภทในรายการเหล่านั้นก่อนจึงจะลบได้</p>' : '') + '</section>',
    'waste-types', [{ label: 'ประเภทขยะมูลฝอย', href: WASTE_TYPE_HREF }, { label: 'รายละเอียด', current: true }]);
}

function notFound() {
  return shell(`<div class="panel-shadow mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-white p-10 text-center"><div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f2f7f3] text-primary">${icon('empty', 27)}</div><h1 class="text-xl font-bold">ไม่พบหน้าที่ต้องการ</h1><p class="mt-2 text-sm text-muted">รายการนี้อาจถูกลบหรือไม่มีอยู่ในข้อมูลจริง</p><div class="mt-6">${primaryButton('กลับแดชบอร์ดฝ่ายบริการ', '#/dashboard', 'arrow')}</div></div>`, null, [{ label: 'ไม่พบหน้า', current: true }]);
}



function reportsPage(parts, params) {
  const module = parts[1] ? moduleById(parts[1]) : null;
  if (parts.length > 2 || (parts[1] && (!module || !can(`${module.id}.view`)))) return notFound();
  const body = reportBody({ module, params, data: module ? reportDetail : reportData, meta: reportMeta, loading: reportLoading, error: reportError, modules, groups, can, esc, number, thaiDate, moduleHref });
  return shell(body, 'reports', module ? [{ label: 'รายงาน', href: '#/reports' }, { label: module.short, current: true }] : [{ label: 'รายงาน', current: true }]);
}

function auditPage(params) {
  if (!can('audit-logs.view')) return notFound();
  const pageHref = page => `#/audit-logs?${new URLSearchParams({ q: params.get('q') || '', page })}`;
  return shell(`${pageHeading('การจัดการระบบ', 'ประวัติการแก้ไข', 'บันทึกการเพิ่ม แก้ไข และลบข้อมูล')}<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><form id="audit-filter" class="flex gap-2"><label class="sr-only" for="audit-q">ค้นหา</label><input id="audit-q" class="field min-w-0 flex-1" name="q" value="${esc(params.get('q') || '')}" placeholder="ค้นหาการกระทำ หมวด หรือผู้ใช้"><button class="rounded-xl bg-primary px-5 text-white">ค้นหา</button></form><div class="mt-4 divide-y">${auditRows.map(item => `<div class="grid gap-1 py-3 text-sm sm:grid-cols-4"><strong>${esc(item.action)}</strong><span>${esc(item.subject_type || '')} #${esc(item.subject_id || '')}</span><span>${esc(item.actor_username || 'ระบบ')}</span><time>${esc(item.created_at)}</time></div>`).join('') || '<p class="py-8 text-center">ไม่มีประวัติ</p>'}</div><div class="mt-4 flex items-center justify-between text-sm"><span>หน้า ${auditMeta.current_page} / ${auditMeta.last_page}</span><div class="flex gap-2">${auditMeta.current_page > 1 ? outlinedButton('ก่อนหน้า', pageHref(auditMeta.current_page - 1)) : ''}${auditMeta.current_page < auditMeta.last_page ? outlinedButton('ถัดไป', pageHref(auditMeta.current_page + 1)) : ''}</div></div></section>`, 'audit-logs', [{ label: 'ประวัติการแก้ไข', current: true }]);
}

async function loadReportAndAudit() {
  const { parts, params } = route();
  if (parts[0] === 'reports') {
    const module = parts[1] ? moduleById(parts[1]) : null;
    if (parts.length > 2 || (parts[1] && (!module || !can(`${module.id}.view`)))) return;
    const requestId = ++reportRequest;
    reportLoading = true;
    reportError = '';
    render();
    try {
      const url = module ? window.serviceHubUrls.apiReportDetail.replace('__MODULE__', encodeURIComponent(module.id)) : window.serviceHubUrls.apiReports;
      const result = await apiRequest(url + (params.size ? `?${params}` : ''));
      if (requestId !== reportRequest || route().parts.join('/') !== parts.join('/')) return;
      reportMeta = result.meta;
      if (module) reportDetail = result.data;
      else reportData = result.data;
    } catch (error) {
      if (requestId !== reportRequest) return;
      reportError = error.fields?.to?.[0] || error.fields?.from?.[0] || error.fields?.month?.[0] || error.message || 'โหลดรายงานไม่สำเร็จ';
    } finally {
      if (requestId === reportRequest) { reportLoading = false; render(); }
    }
    return;
  }
  try {
    if (parts[0] === 'audit-logs' && can('audit-logs.view')) {
      const result = await apiRequest(window.serviceHubUrls.apiAudit + '?' + params.toString());
      auditRows = result.data;
      auditMeta = result.meta;
    } else return;
    render();
  } catch (error) { loadError = error.message; render(); }
}

function displayValidation(form, fields) {
  for (const [name, messages] of Object.entries(fields || {})) {
    const input = form.elements.namedItem(name);
    const error = form.querySelector(`#ref-${name}-error`);
    if (input?.setAttribute) input.setAttribute('aria-invalid', 'true');
    if (error) error.textContent = messages[0] || '';
  }
  form.querySelector('[aria-invalid="true"]')?.focus();
}

async function submitReference(form, type) {
  const id = form.dataset.id;
  const data = Object.fromEntries(new FormData(form));
  data.is_active = form.elements.namedItem('is_active')?.checked ?? true;
  try {
    const response = await apiRequest(apiReference(type) + (id ? `/${id}` : ''), { method: id ? 'PUT' : 'POST', body: JSON.stringify(data) });
    await refreshLiveData();
    navigate(`/${type}/${response.data.id}`);
    showToast('บันทึกข้อมูลแล้ว');
  } catch (error) {
    showToast(error.message, 'error');
    const fields = Object.fromEntries(Object.entries(error.fields || {}).map(([key, messages]) => [key, messages[0]]));
    const existing = references[type]?.find(item => String(item.id) === id) || null;
    if (type === 'cleaning-zones') app.innerHTML = zoneFormPage(existing, fields, data);
    else if (type === 'waste-types') app.innerHTML = wasteTypeFormPage(existing, fields, data);
    else {
      const currentForm = document.getElementById('reference-form');
      for (const [key, value] of Object.entries(data)) {
        const input = currentForm?.elements.namedItem(key);
        if (input && key === 'is_active') input.checked = Boolean(value);
        else if (input) input.value = value;
      }
      displayValidation(currentForm, error.fields);
    }
    initCustomSelects();
  }
}

async function submitActivity(form) {
  const module = moduleById(form.dataset.module);
  const { data, errors } = validateForm(form, module);
  const existing = form.dataset.id ? records.find(item => String(item.id) === form.dataset.id && item.module === module.id) : null;
  if (Object.keys(errors).length) { formPage.draft = data; app.innerHTML = formPage(module, existing, errors); initCustomSelects(); document.querySelector('[aria-invalid="true"]')?.focus(); return; }
  try {
    const response = await apiRequest(apiActivity(module.id) + (existing ? `/${existing.id}` : ''), { method: existing ? 'PUT' : 'POST', body: JSON.stringify(data) });
    formPage.draft = null;
    await refreshLiveData();
    navigate(`/module/${module.id}/${response.data.id}`);
    showToast('บันทึกข้อมูลแล้ว');
  } catch (error) {
    formPage.draft = data;
    const fieldErrors = Object.fromEntries(Object.entries(error.fields || {}).map(([key, messages]) => [key, messages[0]]));
    showToast(error.message, 'error');
    app.innerHTML = formPage(module, existing, fieldErrors);
    initCustomSelects();
    document.querySelector('[aria-invalid="true"]')?.focus();
  }
}

function deleteDialog() {
  const noun = pendingDelete.kind === 'zone' ? 'เขต' : pendingDelete.kind === 'waste-type' ? 'ประเภทขยะ' : 'รายการ';
  const description = pendingDelete.kind === 'zone' ? 'เขตนี้จะถูกลบจากข้อมูลจริงในเบราว์เซอร์' : pendingDelete.kind === 'waste-type' ? 'ประเภทขยะนี้จะถูกลบจากข้อมูลจริงในเบราว์เซอร์' : 'รายการนี้จะถูกลบจากข้อมูลจริงที่เก็บในเบราว์เซอร์';
  return `<div class="app-dialog fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#0d241e]/55 p-4" data-action="cancel-delete"><div role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description" class="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl" data-dialog><div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff0ed] text-[#b64b43]">${icon('trash', 21)}</div><h2 id="delete-title" class="text-lg font-bold">ยืนยันการลบ${noun}</h2><p id="delete-description" class="mt-2 text-sm leading-relaxed text-muted">${description} คุณต้องการดำเนินการต่อหรือไม่</p><div class="mt-7 flex justify-end gap-2"><button type="button" class="min-h-11 rounded-xl border border-line px-4 text-sm font-bold text-ink" data-action="cancel-delete">ยกเลิก</button><button type="button" class="min-h-11 rounded-xl bg-[#b84d45] px-4 text-sm font-bold text-white hover:bg-[#a43e37]" data-action="confirm-delete">ลบ${noun}</button></div></div></div>`;
}
function syncMobileNavigation() {
  const isMobile = window.innerWidth < 1024;
  document.body.style.overflow = isMobile && mobileOpen ? 'hidden' : '';
  const sidebarElement = document.getElementById('sidebar');
  if (sidebarElement) {
    sidebarElement.inert = isMobile && !mobileOpen;
    if (isMobile) {
      sidebarElement.classList.toggle('invisible', !mobileOpen);
      sidebarElement.classList.toggle('pointer-events-none', !mobileOpen);
      sidebarElement.classList.toggle('visible', mobileOpen);
      sidebarElement.classList.toggle('pointer-events-auto', mobileOpen);
    } else {
      sidebarElement.classList.remove('invisible', 'pointer-events-none');
      sidebarElement.classList.add('visible', 'pointer-events-auto');
    }
  }
}
// ── User Management Helpers ──────────────────────────────────────────────────
const USER_ADMIN_ROLES = ['super-admin', 'admin'];
function canManageUsers() {
  const roles = window.serviceHubUser?.roles ?? [];
  return Array.isArray(roles) && roles.some((r) => USER_ADMIN_ROLES.includes(r));
}
function canDo(permission) {
  if (!canManageUsers()) return false;
  const roles = window.serviceHubUser?.roles ?? [];
  if (roles.includes('super-admin')) return true;
  const permissions = window.serviceHubUser?.permissions ?? [];
  return Array.isArray(permissions) && permissions.includes(permission);
}
const roleBadgeColors = {
  'super-admin': 'bg-[#fef2e8] text-[#b25d1a] border-[#f9d4b4]',
  admin:   'bg-[#e8f0fe] text-[#2756b8] border-[#c3d3f9]',
  staff:   'bg-[#eef7f2] text-[#156e3a] border-[#b7e4ce]',
  viewer:  'bg-[#f3f0fb] text-[#5a469b] border-[#cdc5ef]',
  auditor: 'bg-[#fff4e8] text-[#966020] border-[#f5d9a8]',
};
const roleThai = { 'super-admin': 'ผู้ดูแลสูงสุด', admin: 'ผู้ดูแลระบบ', staff: 'เจ้าหน้าที่', viewer: 'ผู้ดูข้อมูล', auditor: 'ผู้ตรวจสอบ' };
function roleBadge(roleName) {
  const cls = roleBadgeColors[roleName] || 'bg-[#f2f4f3] text-[#52665e] border-[#d8e3de]';
  return `<span class="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${cls}">${esc(roleThai[roleName] || roleName)}</span>`;
}
function userInitials(name) {
  const parts = String(name || '').trim().split(/\s+/);
  return parts.length >= 2 ? (parts[0][0] + parts[1][0]).toUpperCase() : String(name || '?')[0].toUpperCase();
}

// User Management state
let umState = { loading: false, error: null, users: [], summary: {}, meta: {}, roles: [], drawer: null, drawerLoading: false, drawerErrors: {} };
let umParams = { q: '', role: 'all', status: 'all', sort: 'created_at', direction: 'desc', page: 1 };
let umSearchTimer = null;

function umApiHeaders() {
  return { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content ?? '' };
}

function umUsersUrl(suffix = '') {
  return `${window.serviceHubUrls.apiUsers}${suffix}`;
}

async function umFetchUsers() {
  umState.loading = true; umState.error = null; renderUserDirectory();
  const p = new URLSearchParams();
  if (umParams.q) p.set('q', umParams.q);
  if (umParams.role && umParams.role !== 'all') p.set('role', umParams.role);
  if (umParams.status && umParams.status !== 'all') p.set('status', umParams.status);
  p.set('sort', umParams.sort); p.set('direction', umParams.direction); p.set('page', String(umParams.page)); p.set('per_page', '10');
  try {
    const res = await fetch(umUsersUrl(`?${p}`), { headers: { 'Accept': 'application/json' } });
    if (!res.ok) { umState.error = res.status === 403 ? 'คุณไม่มีสิทธิ์จัดการผู้ใช้งาน' : `เกิดข้อผิดพลาด (${res.status})`; }
    else {
      const json = await res.json();
      umState.users = json.data ?? []; umState.summary = json.summary ?? {}; umState.meta = json.meta ?? {};
    }
  } catch { umState.error = 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่'; }
  umState.loading = false; renderUserDirectory();
}

async function umFetchRoles() {
  try {
    const res = await fetch(window.serviceHubUrls.apiRoles, { headers: { 'Accept': 'application/json' } });
    if (res.ok) { const json = await res.json(); umState.roles = json.data ?? []; }
  } catch { /* non-critical */ }
}

function renderUserDirectory() {
  const container = document.getElementById('user-directory-root');
  if (!container) return;
  container.innerHTML = userDirectoryContent();
  attachUmEvents(container);
}

function userDirectoryPage() {
  return shell(`
    <div id="user-directory-root">
      ${userDirectoryContent()}
    </div>
  `, 'users', [{ label: 'จัดการผู้ใช้งาน', current: true }]);
}

function userDirectoryContent() {
  const { loading, error, users, summary, meta } = umState;
  const canCreate = canDo('users.create');
  const createBtn = canCreate
    ? `<button type="button" data-action="um-open-create" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${icon('plus', 18)}เพิ่มผู้ใช้งาน</button>`
    : '';
  return `
    ${pageHeading('การจัดการระบบ', 'จัดการผู้ใช้งาน', 'บริหารบัญชีผู้ใช้ สิทธิ์การเข้าถึง และความปลอดภัยของระบบ', createBtn)}
    ${userKpiCards(summary)}
    ${userFilterBar()}
    ${loading ? `<div class="flex items-center justify-center py-16 text-muted text-sm">${icon('filter', 20, 'animate-spin mr-2')} กำลังโหลด...</div>` : error ? `<div class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">${esc(error)}</div>` : userTable(users, meta)}
    ${umState.drawer ? userDrawer() : ''}
  `;
}

function userKpiCards(s) {
  const cards = [
    { label: 'บัญชีผู้ใช้ทั้งหมด', value: s.total_accounts ?? '—', icon: 'users', bg: 'bg-[#e6f4ee]', color: 'text-primary' },
    { label: 'ใช้งานอยู่', value: s.active_users ?? '—', icon: 'check', bg: 'bg-[#e7f3f8]', color: 'text-[#3485a5]' },
    { label: 'ผู้ดูแลระบบ', value: s.administrators ?? '—', icon: 'sparkles', bg: 'bg-[#fff3e5]', color: 'text-[#bb7934]' },
  ];
  return `<section aria-label="สรุปสถิติผู้ใช้" class="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
    ${cards.map((c) => `<div class="rounded-2xl border border-line bg-white p-4 sm:p-5 panel-shadow">
      <div class="flex items-center gap-3"><div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.bg} ${c.color}">${icon(c.icon, 19)}</div><p class="text-xs font-medium text-muted">${esc(c.label)}</p></div>
      <p class="mt-3 text-[26px] font-bold leading-none text-ink">${esc(String(c.value))}</p>
    </div>`).join('')}
  </section>`;
}

function userFilterBar() {
  const { q, role, status, sort, direction } = umParams;
  const roles = [{ value: 'all', label: 'ทุกบทบาท' }, ...Object.entries(roleThai).map(([v, l]) => ({ value: v, label: l }))];
  const statuses = [{ value: 'all', label: 'ทุกสถานะ' }, { value: 'active', label: 'ใช้งานอยู่' }, { value: 'inactive', label: 'ระงับแล้ว' }];
  return `<section aria-label="ค้นหาและกรองผู้ใช้" class="mb-5 panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5">
    <div class="flex flex-wrap items-end gap-3">
      <div class="w-full min-w-0 sm:min-w-[200px] sm:flex-1">
        <label for="um-search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
        <div class="relative">${icon('search', 18, 'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]')}
          <input id="um-search" type="search" placeholder="ชื่อหรือชื่อผู้ใช้..." class="field pl-10" value="${esc(q)}" data-action="um-search" autocomplete="off">
        </div>
      </div>
      <div class="w-full min-w-0 sm:w-[160px]">
        <label for="um-role" class="mb-1.5 block text-xs font-bold text-[#52665d]">บทบาท</label>
        <select id="um-role" class="field master-native-select" data-action="um-filter-role">
          ${roles.map((r) => `<option value="${r.value}"${role === r.value ? ' selected' : ''}>${esc(r.label)}</option>`).join('')}
        </select>
      </div>
      <div class="w-full min-w-0 sm:w-[160px]">
        <label for="um-status" class="mb-1.5 block text-xs font-bold text-[#52665d]">สถานะ</label>
        <select id="um-status" class="field master-native-select" data-action="um-filter-status">
          ${statuses.map((s) => `<option value="${s.value}"${status === s.value ? ' selected' : ''}>${esc(s.label)}</option>`).join('')}
        </select>
      </div>
      <div class="w-full min-w-0 sm:w-[180px]">
        <label for="um-sort" class="mb-1.5 block text-xs font-bold text-[#52665d]">เรียงตาม</label>
        <select id="um-sort" class="field master-native-select" data-action="um-filter-sort">
          <option value="created_at:desc"${sort === 'created_at' && direction === 'desc' ? ' selected' : ''}>วันที่สร้าง (ใหม่สุด)</option>
          <option value="created_at:asc"${sort === 'created_at' && direction === 'asc' ? ' selected' : ''}>วันที่สร้าง (เก่าสุด)</option>
          <option value="name:asc"${sort === 'name' && direction === 'asc' ? ' selected' : ''}>ชื่อ (ก–ฮ)</option>
          <option value="name:desc"${sort === 'name' && direction === 'desc' ? ' selected' : ''}>ชื่อ (ฮ–ก)</option>
        </select>
      </div>
      <button type="button" data-action="um-clear-filters" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas sm:w-auto">ล้างตัวกรอง</button>
    </div>
  </section>`;
}

function userTable(users, meta) {
  const canUpdate = canDo('users.update');
  const canDisable = canDo('users.disable');
  const canReset = canDo('users.update');
  if (!users.length) return `<div class="panel-shadow flex flex-col items-center rounded-2xl border border-line bg-white px-6 py-16 text-center">
    <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f7f2] text-primary">${icon('users', 27)}</div>
    <h3 class="text-base font-bold">ไม่พบผู้ใช้งาน</h3>
    <p class="mt-1 max-w-sm text-sm leading-relaxed text-muted">ลองเปลี่ยนคำค้นหาหรือตัวกรอง หรือเพิ่มผู้ใช้งานใหม่</p>
  </div>`;
  const { current_page: cp = 1, last_page: lp = 1, total = 0, per_page: pp = 10 } = meta;
  return `<section aria-labelledby="um-table-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
      <div><h2 id="um-table-title" class="text-sm font-bold">รายการผู้ใช้งาน</h2><p class="mt-0.5 text-xs text-muted">พบ ${number(total)} บัญชี</p></div>
    </div>
    ${users.length ? `<div class="flex items-center justify-between border-b border-line bg-[#f8faf8] px-4 py-2 text-[11px] font-medium text-muted md:hidden"><div class="flex items-center gap-1.5">${icon('arrow', 13, 'rotate-180 text-primary shrink-0')}<span>เลื่อนตารางเพื่อดูคอลัมน์ทั้งหมด</span>${icon('arrow', 13, 'text-primary shrink-0')}</div></div>` : ''}
    <div class="data-table-scroll block overflow-x-auto w-full max-w-full min-w-0">
      <table class="w-full min-w-[680px] text-left text-sm" role="grid" aria-label="ตารางผู้ใช้งาน">
        <thead class="bg-[#f9fbf9] text-xs font-semibold text-muted">
          <tr>
            <th scope="col" class="px-5 py-3.5 whitespace-nowrap">ผู้ใช้งาน</th>
            <th scope="col" class="px-5 py-3.5 whitespace-nowrap">ชื่อผู้ใช้</th>
            <th scope="col" class="px-5 py-3.5 whitespace-nowrap">บทบาท</th>
            <th scope="col" class="px-5 py-3.5 whitespace-nowrap">สถานะ</th>
            <th scope="col" class="px-5 py-3.5 whitespace-nowrap">วันที่สร้าง</th>
            ${(canUpdate || canDisable || canReset) ? '<th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">การดำเนินการ</th>' : ''}
          </tr>
        </thead>
        <tbody class="divide-y divide-[#eef2ee]">
          ${users.map((u) => {
            const roleName = u.role ?? (u.roles?.[0]?.name ?? '');
            const isActive = Boolean(u.is_active);
            const isSelf = u.id === window.serviceHubUser?.id;
            return `<tr class="transition hover:bg-[#fafcfa]" data-user-id="${esc(String(u.id))}">
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-3">
                  <span aria-hidden="true" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e0f0e8] text-[13px] font-bold text-primary-dark">${esc(userInitials(u.name))}</span>
                  <span class="font-semibold text-ink break-words max-w-[160px]">${esc(u.name)}</span>
                </div>
              </td>
              <td class="px-5 py-3.5 text-muted font-mono text-xs">${esc(u.username)}</td>
              <td class="px-5 py-3.5">${roleName ? roleBadge(roleName) : '<span class="text-muted">—</span>'}</td>
              <td class="px-5 py-3.5">
                <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${isActive ? 'bg-[#eef7f2] text-[#156e3a]' : 'bg-[#fef2f2] text-[#b91c1c]'}">
                  <span class="h-1.5 w-1.5 rounded-full ${isActive ? 'bg-[#22c55e]' : 'bg-[#ef4444]'}"></span>
                  ${isActive ? 'ใช้งานอยู่' : 'ระงับแล้ว'}
                </span>
              </td>
              <td class="px-5 py-3.5 text-xs text-muted whitespace-nowrap">${u.created_at ? new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(u.created_at)) : '—'}</td>
              ${(canUpdate || canDisable || canReset) ? `<td class="px-5 py-3.5 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  ${canUpdate ? `<button type="button" data-action="um-edit-user" data-user='${JSON.stringify({ id: u.id, name: u.name, username: u.username, role: roleName })}' class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-ink hover:bg-canvas" aria-label="แก้ไข ${esc(u.name)}">${icon('edit', 15)}แก้ไข</button>` : ''}
                  ${canDisable && !isSelf ? `<button type="button" data-action="um-toggle-status" data-id="${esc(String(u.id))}" data-active="${isActive ? '1' : '0'}" data-name="${esc(u.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold ${isActive ? 'text-[#b91c1c] hover:bg-red-50' : 'text-[#156e3a] hover:bg-[#eef7f2]'}" aria-label="${isActive ? 'ระงับ' : 'เปิดใช้'} ${esc(u.name)}">${isActive ? icon('close', 15) : icon('check', 15)}${isActive ? 'ระงับ' : 'เปิดใช้'}</button>` : ''}
                  ${canReset && !isSelf ? `<button type="button" data-action="um-reset-password" data-id="${esc(String(u.id))}" data-name="${esc(u.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-muted hover:bg-canvas" aria-label="รีเซ็ตรหัสผ่าน ${esc(u.name)}">${icon('logout', 15)}รีเซ็ต</button>` : ''}
                </div>
              </td>` : ''}
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
    ${lp > 1 ? `<div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-xs text-muted sm:px-6 sm:py-4">
      <span>แสดง ${number((cp - 1) * pp + 1)}–${number(Math.min(cp * pp, total))} จาก ${number(total)} บัญชี</span>
      <div class="flex items-center gap-2">
        <button type="button" data-action="um-page" data-page="${cp - 1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${cp === 1 ? 'pointer-events-none opacity-45' : 'hover:bg-canvas'}" ${cp === 1 ? 'aria-disabled="true" tabindex="-1"' : ''}>ก่อนหน้า</button>
        <span class="px-1 font-bold text-ink">${cp} / ${lp}</span>
        <button type="button" data-action="um-page" data-page="${cp + 1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${cp === lp ? 'pointer-events-none opacity-45' : 'hover:bg-canvas'}" ${cp === lp ? 'aria-disabled="true" tabindex="-1"' : ''}>ถัดไป</button>
      </div>
    </div>` : ''}
  </section>`;
}

function userDrawer() {
  const d = umState.drawer;
  const roles = umState.roles.length ? umState.roles : Object.entries(roleThai).map(([value]) => ({ name: value }));
  const errs = umState.drawerErrors;
  const isEdit = d.mode === 'edit';
  const isReset = d.mode === 'reset';
  const title = isReset ? `รีเซ็ตรหัสผ่าน — ${esc(d.user?.name)}` : isEdit ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มผู้ใช้งานใหม่';

  let body = '';
  if (isReset) {
    body = `<div class="mb-5">
      <label for="um-new-password" class="mb-2 block text-sm font-semibold">รหัสผ่านใหม่ <span class="text-red-500" aria-hidden="true">*</span></label>
      <div class="relative">
        <input id="um-new-password" name="password" type="password" autocomplete="new-password" class="field w-full pr-20 font-mono${errs.password ? ' border-red-400' : ''}" aria-describedby="${errs.password ? 'um-pw-error' : ''}" aria-invalid="${errs.password ? 'true' : 'false'}">
        <button type="button" data-action="um-toggle-new-password" class="absolute inset-y-1 right-1 rounded-lg px-3 text-xs font-bold text-primary">แสดง</button>
      </div>
      <p class="mt-1 text-xs text-muted">อย่างน้อย 15 ตัวอักษร</p>${errs.password ? `<p id="um-pw-error" class="mt-1 text-xs text-red-600">${esc(errs.password)}</p>` : ''}
      <button type="button" data-action="um-gen-password" class="mt-2 text-xs font-semibold text-primary hover:underline">สร้างรหัสผ่านอัตโนมัติ</button>
    </div>`;
  } else {
    body = `
      <div class="mb-5">
        <label for="um-name" class="mb-2 block text-sm font-semibold">ชื่อ-นามสกุล <span class="text-red-500" aria-hidden="true">*</span></label>
        <input id="um-name" name="name" type="text" autocomplete="name" class="field w-full${errs.name ? ' border-red-400' : ''}" value="${esc(d.user?.name ?? '')}" aria-invalid="${errs.name ? 'true' : 'false'}">
        ${errs.name ? `<p class="mt-1 text-xs text-red-600">${esc(errs.name)}</p>` : ''}
      </div>
      ${!isEdit ? `<div class="mb-5">
        <label for="um-username" class="mb-2 block text-sm font-semibold">ชื่อผู้ใช้ <span class="text-red-500" aria-hidden="true">*</span></label>
        <input id="um-username" name="username" type="text" autocomplete="username" class="field w-full font-mono${errs.username ? ' border-red-400' : ''}" placeholder="3-100 ตัวอักษร (a-z, 0-9, . - _)" aria-invalid="${errs.username ? 'true' : 'false'}">
        ${errs.username ? `<p class="mt-1 text-xs text-red-600">${esc(errs.username)}</p>` : ''}
      </div>` : `<div class="mb-5"><p class="text-sm font-semibold text-muted">ชื่อผู้ใช้</p><p class="mt-1 font-mono text-sm text-ink">${esc(d.user?.username ?? '')}</p></div>`}
      <div class="mb-5">
        <label for="um-role" class="mb-2 block text-sm font-semibold">บทบาท <span class="text-red-500" aria-hidden="true">*</span></label>
        <select id="um-drawer-role" name="role" class="field w-full master-native-select${errs.role ? ' border-red-400' : ''}" aria-invalid="${errs.role ? 'true' : 'false'}">
          ${roles.map((r) => `<option value="${esc(r.name)}"${d.user?.role === r.name ? ' selected' : ''}>${esc(roleThai[r.name] || r.name)}</option>`).join('')}
        </select>
        ${errs.role ? `<p class="mt-1 text-xs text-red-600">${esc(errs.role)}</p>` : ''}
      </div>
      ${!isEdit ? `<div class="mb-5">
        <label for="um-password" class="mb-2 block text-sm font-semibold">รหัสผ่านเริ่มต้น <span class="text-red-500" aria-hidden="true">*</span></label>
        <div class="relative">
          <input id="um-password" name="password" type="password" autocomplete="new-password" class="field w-full pr-20 font-mono${errs.password ? ' border-red-400' : ''}" aria-invalid="${errs.password ? 'true' : 'false'}">
          <button type="button" data-action="um-toggle-password" class="absolute inset-y-1 right-1 rounded-lg px-3 text-xs font-bold text-primary">แสดง</button>
        </div>
        <p class="mt-1 text-xs text-muted">อย่างน้อย 15 ตัวอักษร</p>${errs.password ? `<p class="mt-1 text-xs text-red-600">${esc(errs.password)}</p>` : ''}
        <button type="button" data-action="um-gen-password" class="mt-2 text-xs font-semibold text-primary hover:underline">สร้างรหัสผ่านอัตโนมัติ</button>
      </div>` : ''}
    `;
  }

  return `<div id="um-drawer-backdrop" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm" data-action="um-close-drawer" aria-hidden="true"></div>
  <div id="um-drawer" role="dialog" aria-modal="true" aria-label="${title}" class="fixed inset-y-0 right-0 z-50 flex w-full max-w-[440px] flex-col bg-white shadow-2xl">
    <div class="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5 sm:px-6">
      <h2 class="text-base font-bold text-ink">${title}</h2>
      <button type="button" data-action="um-close-drawer" class="rounded-xl p-2 text-muted hover:bg-canvas" aria-label="ปิด">${icon('close', 20)}</button>
    </div>
    <div class="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
      ${errs._server ? `<div class="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">${esc(errs._server)}</div>` : ''}
      <form id="um-drawer-form" novalidate>
        ${body}
      </form>
    </div>
    <div class="flex shrink-0 items-center justify-end gap-3 border-t border-line px-5 py-4 sm:px-6">
      <button type="button" data-action="um-close-drawer" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-semibold text-ink hover:bg-canvas">ยกเลิก</button>
      <button type="submit" form="um-drawer-form" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark${umState.drawerLoading ? ' opacity-60 pointer-events-none' : ''}">
        ${umState.drawerLoading ? `${icon('filter', 17, 'animate-spin')}กำลังบันทึก...` : isReset ? 'รีเซ็ตรหัสผ่าน' : isEdit ? 'บันทึกการแก้ไข' : 'สร้างผู้ใช้งาน'}
      </button>
    </div>
  </div>`;
}

function generateSecurePassword() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!';
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => chars[b % chars.length]).join('');
}

function umTrapFocus(event) {
  const drawer = document.getElementById('um-drawer');
  if (!drawer) return;
  const focusable = [...drawer.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter((el) => !el.closest('[hidden]'));
  if (!focusable.length) return;
  if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1).focus(); }
  else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
}

function attachUmEvents(root) {
  // Search
  root.querySelector('[data-action="um-search"]')?.addEventListener('input', (e) => {
    clearTimeout(umSearchTimer);
    umSearchTimer = setTimeout(() => { umParams.q = e.target.value; umParams.page = 1; umFetchUsers(); }, 300);
  });
  // Filters
  root.querySelector('[data-action="um-filter-role"]')?.addEventListener('change', (e) => { umParams.role = e.target.value; umParams.page = 1; umFetchUsers(); });
  root.querySelector('[data-action="um-filter-status"]')?.addEventListener('change', (e) => { umParams.status = e.target.value; umParams.page = 1; umFetchUsers(); });
  root.querySelector('[data-action="um-filter-sort"]')?.addEventListener('change', (e) => { const [s, d] = e.target.value.split(':'); umParams.sort = s; umParams.direction = d; umParams.page = 1; umFetchUsers(); });
  root.querySelector('[data-action="um-clear-filters"]')?.addEventListener('click', () => { umParams = { q: '', role: 'all', status: 'all', sort: 'created_at', direction: 'desc', page: 1 }; umFetchUsers(); });
  // Pagination
  root.querySelectorAll('[data-action="um-page"]').forEach((btn) => btn.addEventListener('click', () => { umParams.page = Number(btn.dataset.page); umFetchUsers(); }));
  // Create
  root.querySelector('[data-action="um-open-create"]')?.addEventListener('click', async () => {
    umState.drawer = { mode: 'create', user: null }; umState.drawerErrors = {};
    if (!umState.roles.length) await umFetchRoles();
    renderUserDirectory();
    setTimeout(() => { document.getElementById('um-name')?.focus(); document.addEventListener('keydown', umDrawerKeydown); }, 50);
  });
  // Edit
  root.querySelectorAll('[data-action="um-edit-user"]').forEach((btn) => btn.addEventListener('click', async () => {
    let userData; try { userData = JSON.parse(btn.dataset.user); } catch { return; }
    umState.drawer = { mode: 'edit', user: userData }; umState.drawerErrors = {};
    if (!umState.roles.length) await umFetchRoles();
    renderUserDirectory();
    setTimeout(() => { document.getElementById('um-name')?.focus(); document.addEventListener('keydown', umDrawerKeydown); }, 50);
  }));
  // Toggle status
  root.querySelectorAll('[data-action="um-toggle-status"]').forEach((btn) => btn.addEventListener('click', () => umConfirmToggle(btn)));
  // Reset password
  root.querySelectorAll('[data-action="um-reset-password"]').forEach((btn) => btn.addEventListener('click', async () => {
    const id = btn.dataset.id; const name = btn.dataset.name;
    umState.drawer = { mode: 'reset', user: { id, name } }; umState.drawerErrors = {};
    renderUserDirectory();
    setTimeout(() => { document.getElementById('um-new-password')?.focus(); document.addEventListener('keydown', umDrawerKeydown); }, 50);
  }));
  // Drawer close
  root.querySelectorAll('[data-action="um-close-drawer"]').forEach((el) => el.addEventListener('click', umCloseDrawer));
  // Drawer form submit
  root.querySelector('#um-drawer-form')?.addEventListener('submit', umHandleDrawerSubmit);
  // Password toggle
  root.querySelector('[data-action="um-toggle-password"]')?.addEventListener('click', () => umTogglePasswordField('um-password'));
  root.querySelector('[data-action="um-toggle-new-password"]')?.addEventListener('click', () => umTogglePasswordField('um-new-password'));
  // Password generator
  root.querySelectorAll('[data-action="um-gen-password"]').forEach((btn) => btn.addEventListener('click', () => {
    const pw = generateSecurePassword();
    const field = document.getElementById('um-password') || document.getElementById('um-new-password');
    if (field) { field.value = pw; field.type = 'text'; }
  }));
}

function umTogglePasswordField(id) {
  const field = document.getElementById(id);
  const btn = document.querySelector(`[data-action="um-toggle-password"], [data-action="um-toggle-new-password"]`);
  if (!field) return;
  field.type = field.type === 'password' ? 'text' : 'password';
  if (btn) btn.textContent = field.type === 'password' ? 'แสดง' : 'ซ่อน';
}

function umDrawerKeydown(event) {
  if (event.key === 'Escape') umCloseDrawer();
  if (event.key === 'Tab') umTrapFocus(event);
}

function umCloseDrawer() {
  document.removeEventListener('keydown', umDrawerKeydown);
  umState.drawer = null; umState.drawerErrors = {}; renderUserDirectory();
}

async function umConfirmToggle(btn) {
  const id = btn.dataset.id; const isActive = btn.dataset.active === '1'; const name = btn.dataset.name;
  if (!confirm(`${isActive ? 'ระงับการใช้งาน' : 'เปิดใช้งาน'}บัญชี "${name}" ใช่หรือไม่?`)) return;
  btn.disabled = true;
  try {
    const res = await fetch(umUsersUrl(`/${encodeURIComponent(id)}/status`), { method: 'PATCH', headers: umApiHeaders(), body: JSON.stringify({ is_active: !isActive }) });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) { showToast(json.message || 'ไม่สามารถเปลี่ยนสถานะได้', 'error'); }
    else { showToast(isActive ? 'ระงับการใช้งานแล้ว' : 'เปิดใช้งานแล้ว'); await umFetchUsers(); }
  } catch { showToast('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้', 'error'); }
}

async function umHandleDrawerSubmit(event) {
  event.preventDefault();
  const d = umState.drawer; if (!d) return;
  const form = event.target;
  const fd = new FormData(form);
  let body = {};
  if (d.mode === 'create') body = { name: String(fd.get('name') || '').trim(), username: String(fd.get('username') || '').trim(), password: String(fd.get('password') || ''), role: String(fd.get('role') || '') };
  else if (d.mode === 'edit') body = { name: String(fd.get('name') || '').trim(), role: String(fd.get('role') || '') };
  else if (d.mode === 'reset') body = { password: String(fd.get('password') || '') };
  umState.drawerLoading = true; umState.drawerErrors = {}; renderUserDirectory();
  try {
    let url, method;
    if (d.mode === 'create') { url = umUsersUrl(); method = 'POST'; }
    else if (d.mode === 'edit') { url = umUsersUrl(`/${encodeURIComponent(d.user.id)}`); method = 'PUT'; }
    else { url = umUsersUrl(`/${encodeURIComponent(d.user.id)}/reset-password`); method = 'POST'; }
    const res = await fetch(url, { method, headers: umApiHeaders(), body: JSON.stringify(body) });
    const json = await res.json().catch(() => ({}));
    if (res.ok) {
      umState.drawerLoading = false; umCloseDrawer();
      showToast(d.mode === 'create' ? 'สร้างผู้ใช้งานแล้ว' : d.mode === 'edit' ? 'บันทึกการแก้ไขแล้ว' : 'รีเซ็ตรหัสผ่านแล้ว');
      await umFetchUsers();
    } else if (res.status === 422) {
      const fieldErrors = json.errors ?? {};
      umState.drawerErrors = Object.fromEntries(Object.entries(fieldErrors).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]));
      if (!Object.keys(umState.drawerErrors).length) umState.drawerErrors._server = json.message || 'ข้อมูลไม่ถูกต้อง';
      umState.drawerLoading = false; renderUserDirectory();
      document.querySelector('#um-drawer [aria-invalid="true"]')?.focus();
    } else {
      umState.drawerErrors = { _server: json.message || `เกิดข้อผิดพลาด (${res.status})` };
      umState.drawerLoading = false; renderUserDirectory();
    }
  } catch { umState.drawerErrors = { _server: 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้' }; umState.drawerLoading = false; renderUserDirectory(); }
}

function profilePage() {
  const user = window.serviceHubUser || {};
  const initials = (user.name || user.username || 'U').slice(0, 2).toUpperCase();
  const roles = user.roles || [];
  const primaryRole = roles[0] || 'staff';

  const breadcrumbs = [{ label: 'โปรไฟล์ของฉัน', current: true }];

  return shell(`
    ${pageHeading('โปรไฟล์ส่วนบุคคล', 'ข้อมูลบัญชีของฉัน', 'จัดการชื่อที่แสดงและเปลี่ยนรหัสผ่านสำหรับเข้าใช้งานระบบ')}

    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Card 1: ข้อมูลบัญชีและแก้ไขชื่อ -->
      <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7 flex flex-col justify-between" aria-labelledby="profile-info-heading">
        <div>
          <div class="flex items-center gap-4 pb-6 border-b border-line">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#177a67] to-[#0e6253] text-xl font-bold text-white shadow-md">
              ${esc(initials)}
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h2 id="profile-info-heading" class="text-lg font-bold text-ink truncate">${esc(user.name || user.username)}</h2>
                <span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${roleBadgeMap[primaryRole] || 'border-gray-200 bg-gray-50 text-gray-700'}">
                  ${esc(roleNameMap[primaryRole] || primaryRole)}
                </span>
                <span class="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  ${icon('check', 12)} ใช้งานอยู่
                </span>
              </div>
              <p class="text-xs text-muted mt-1">ชื่อผู้ใช้: @${esc(user.username)}</p>
            </div>
          </div>

          <form id="profile-name-form" class="mt-6 space-y-4" novalidate>
            <div>
              <label for="profile-username" class="mb-1 block text-sm font-semibold text-ink">ชื่อผู้ใช้ (Username)</label>
              <input id="profile-username" type="text" class="field w-full bg-[#f8faf8] text-muted cursor-not-allowed border-dashed" value="${esc(user.username)}" readonly disabled>
              <p class="mt-1 text-[11px] text-muted">ชื่อผู้ใช้ถูกกำหนดโดยผู้ดูแลระบบและไม่สามารถเปลี่ยนแปลงได้</p>
            </div>

            <div>
              <label for="profile-name" class="mb-1 block text-sm font-semibold text-ink">ชื่อ-นามสกุลที่แสดง (Display Name) <span class="text-red-500">*</span></label>
              <input id="profile-name" name="name" type="text" required maxlength="255" class="field w-full" value="${esc(user.name || '')}" placeholder="กรอกชื่อ-นามสกุลของคุณ">
              <p id="profile-name-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
            </div>

            <div>
              <label class="mb-1 block text-sm font-semibold text-ink">บทบาทหน้าที่ (Roles)</label>
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${roles.map((r) => `<span class="rounded-lg border px-2.5 py-1 text-xs font-medium ${roleBadgeMap[r] || 'border-gray-200 bg-gray-50'}">${esc(roleNameMap[r] || r)}</span>`).join('')}
              </div>
            </div>

            <div class="pt-2">
              <button type="submit" id="profile-name-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-50">
                ${icon('check', 17)}
                <span>บันทึกชื่อที่แสดง</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- Card 2: เปลี่ยนรหัสผ่าน -->
      <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7" aria-labelledby="profile-pwd-heading">
        <div class="flex items-center gap-3 pb-4 border-b border-line">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f8f4] text-primary">
            ${icon('lock', 20)}
          </div>
          <div>
            <h2 id="profile-pwd-heading" class="text-base font-bold text-ink">เปลี่ยนรหัสผ่านส่วนตัว</h2>
            <p class="text-xs text-muted">รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 15 ตัวอักษร</p>
          </div>
        </div>

        <form id="profile-password-form" class="mt-5 space-y-4" novalidate>
          <div>
            <label for="profile-current-pwd" class="mb-1 block text-sm font-semibold text-ink">รหัสผ่านปัจจุบัน <span class="text-red-500">*</span></label>
            <div class="relative">
              <input id="profile-current-pwd" name="current_password" type="password" required autocomplete="current-password" class="field w-full pr-16" placeholder="กรอกรหัสผ่านปัจจุบัน">
              <button type="button" data-action="toggle-pwd" data-target="profile-current-pwd" class="absolute inset-y-1 right-1 flex items-center px-3 text-xs font-semibold text-primary hover:text-primary-dark">แสดง</button>
            </div>
            <p id="profile-current-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div>
            <div class="mb-1 flex items-center justify-between">
              <label for="profile-new-pwd" class="text-sm font-semibold text-ink">รหัสผ่านใหม่ <span class="text-red-500">*</span></label>
              <button type="button" id="profile-gen-pwd" class="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                ${icon('sparkles', 13)} สุ่มรหัสผ่านปลอดภัย
              </button>
            </div>
            <div class="relative">
              <input id="profile-new-pwd" name="password" type="password" required minlength="15" autocomplete="new-password" class="field w-full pr-16" placeholder="รหัสผ่านใหม่ไม่น้อยกว่า 15 ตัวอักษร">
              <button type="button" data-action="toggle-pwd" data-target="profile-new-pwd" class="absolute inset-y-1 right-1 flex items-center px-3 text-xs font-semibold text-primary hover:text-primary-dark">แสดง</button>
            </div>
            <p id="profile-new-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div>
            <label for="profile-confirm-pwd" class="mb-1 block text-sm font-semibold text-ink">ยืนยันรหัสผ่านใหม่ <span class="text-red-500">*</span></label>
            <div class="relative">
              <input id="profile-confirm-pwd" name="password_confirmation" type="password" required minlength="15" autocomplete="new-password" class="field w-full pr-16" placeholder="กรอกรหัสผ่านใหม่อีกครั้ง">
              <button type="button" data-action="toggle-pwd" data-target="profile-confirm-pwd" class="absolute inset-y-1 right-1 flex items-center px-3 text-xs font-semibold text-primary hover:text-primary-dark">แสดง</button>
            </div>
            <p id="profile-confirm-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div class="rounded-xl bg-[#f4f8f5] p-3 text-xs text-[#486358] leading-relaxed">
            <span class="font-bold text-primary-dark">ข้อกำหนดความปลอดภัย:</span> เมื่อเปลี่ยนรหัสผ่านเรียบร้อย ระบบจะตัดเซสชันในอุปกรณ์อื่นทั้งหมดทันที แต่เครื่องนี้จะยังคงใช้งานต่อได้ตามปกติ
          </div>

          <div class="pt-2">
            <button type="submit" id="profile-pwd-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-50">
              ${icon('lock', 17)}
              <span>บันทึกรหัสผ่านใหม่</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  `, 'profile', breadcrumbs);
}

function attachProfileEvents() {
  const nameForm = document.getElementById('profile-name-form');
  const pwdForm = document.getElementById('profile-password-form');

  // Show/Hide password toggles
  document.querySelectorAll('[data-action="toggle-pwd"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPwd = input.type === 'password';
      input.type = isPwd ? 'text' : 'password';
      btn.textContent = isPwd ? 'ซ่อน' : 'แสดง';
    });
  });

  // Password generator
  document.getElementById('profile-gen-pwd')?.addEventListener('click', () => {
    const pw = generateSecurePassword();
    const newPwd = document.getElementById('profile-new-pwd');
    const confirmPwd = document.getElementById('profile-confirm-pwd');
    if (newPwd) {
      newPwd.value = pw;
      newPwd.type = 'text';
      const btn = document.querySelector('[data-target="profile-new-pwd"]');
      if (btn) btn.textContent = 'ซ่อน';
    }
    if (confirmPwd) {
      confirmPwd.value = pw;
      confirmPwd.type = 'text';
      const btn = document.querySelector('[data-target="profile-confirm-pwd"]');
      if (btn) btn.textContent = 'ซ่อน';
    }
  });

  // Name form submit
  nameForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('profile-name');
    const nameError = document.getElementById('profile-name-error');
    const submitBtn = document.getElementById('profile-name-submit');
    const name = nameInput.value.trim();

    if (!name) {
      if (nameError) {
        nameError.textContent = 'กรุณาระบุชื่อ-นามสกุล';
        nameError.classList.remove('hidden');
      }
      nameInput.focus();
      return;
    }
    if (nameError) nameError.classList.add('hidden');

    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-50');

    try {
      const res = await fetch(window.serviceHubUrls.apiProfile, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
        },
        body: JSON.stringify({ name }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = json.errors?.name?.[0] || json.message || 'ไม่สามารถบันทึกชื่อได้';
        if (nameError) {
          nameError.textContent = msg;
          nameError.classList.remove('hidden');
        }
      } else {
        window.serviceHubUser.name = json.data?.name || name;
        showToast('บันทึกข้อมูลชื่อเรียบร้อยแล้ว');
        render();
      }
    } catch {
      showToast('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-50');
    }
  });

  // Password form submit
  pwdForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currInput = document.getElementById('profile-current-pwd');
    const newInput = document.getElementById('profile-new-pwd');
    const confInput = document.getElementById('profile-confirm-pwd');
    const currError = document.getElementById('profile-current-pwd-error');
    const newError = document.getElementById('profile-new-pwd-error');
    const confError = document.getElementById('profile-confirm-pwd-error');
    const submitBtn = document.getElementById('profile-pwd-submit');

    currError.classList.add('hidden');
    newError.classList.add('hidden');
    confError.classList.add('hidden');

    let hasClientError = false;
    if (!currInput.value) {
      currError.textContent = 'กรุณาระบุรหัสผ่านปัจจุบัน';
      currError.classList.remove('hidden');
      hasClientError = true;
    }
    if (!newInput.value || newInput.value.length < 15) {
      newError.textContent = 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 15 ตัวอักษร';
      newError.classList.remove('hidden');
      hasClientError = true;
    }
    if (newInput.value !== confInput.value) {
      confError.textContent = 'รหัสผ่านยืนยันไม่ตรงกับรหัสผ่านใหม่';
      confError.classList.remove('hidden');
      hasClientError = true;
    }
    if (newInput.value && currInput.value && newInput.value === currInput.value) {
      newError.textContent = 'รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านปัจจุบัน';
      newError.classList.remove('hidden');
      hasClientError = true;
    }

    if (hasClientError) return;

    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-50');

    try {
      const res = await fetch(window.serviceHubUrls.apiProfilePassword, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content || '',
        },
        body: JSON.stringify({
          current_password: currInput.value,
          password: newInput.value,
          password_confirmation: confInput.value,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (json.errors?.current_password) {
          currError.textContent = json.errors.current_password[0];
          currError.classList.remove('hidden');
        }
        if (json.errors?.password) {
          newError.textContent = json.errors.password[0];
          newError.classList.remove('hidden');
        }
        if (!json.errors?.current_password && !json.errors?.password) {
          showToast(json.message || 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน', 'error');
        }
      } else {
        currInput.value = '';
        newInput.value = '';
        confInput.value = '';
        showToast('เปลี่ยนรหัสผ่านเรียบร้อยแล้ว เซสชันในอุปกรณ์อื่นถูกยกเลิกแล้ว');
      }
    } catch {
      showToast('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-50');
    }
  });
}

function render() {
  const { parts, params } = route();
  if (parts[0] === 'login') {
    window.location.replace(window.serviceHubUrls.login);
    return;
  }
  const module = parts[0] === 'module' ? moduleById(parts[1]) : null;
  let markup;
  if (parts[0] === 'profile') {
    markup = profilePage();
  } else if (parts[0] === 'users') {
    if (!canManageUsers()) { markup = notFound(); }
    else {
      markup = userDirectoryPage();
      // Kick off data fetch after DOM settles
      setTimeout(() => { umFetchUsers(); if (!umState.roles.length) umFetchRoles(); }, 0);
    }
  } else if (parts[0] === 'dashboard' || !parts.length) markup = dashboard();
  else if (parts[0] === 'reports') markup = reportsPage(parts, params);
  else if (parts[0] === 'audit-logs') markup = auditPage(params);
  else if (!liveDataLoaded && ((module && can(`${module.id}.view`)) || (parts[0] in referenceKinds && can(`${parts[0]}.view`)))) {
    markup = shell(`<div class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" ${loadError ? 'role="alert"' : 'role="status"'}>${loadError ? 'ไม่สามารถโหลดรายการงานบริการได้' : 'กำลังโหลดรายการงานบริการ…'}${loadError ? '<button type="button" data-action="retry-live-data" class="ml-3 min-h-11 rounded-xl border border-line px-3 font-semibold text-primary">ลองอีกครั้ง</button>' : ''}</div>`, module?.id || parts[0]);
  }
  else if (parts[0] === 'waste-types') {
    if (!can('waste-types.view')) markup = notFound();
    else
    if (parts.length === 1) markup = wasteTypeListPage(params);
    else if (parts.length === 2 && parts[1] === 'new') markup = wasteTypeFormPage();
    else {
      const wasteType = wasteTypes.find((item) => String(item.id) === decodeURIComponent(parts[1] || ''));
      markup = !wasteType ? notFound() : parts.length === 2 ? wasteTypeDetailPage(wasteType) : parts.length === 3 && parts[2] === 'edit' ? wasteTypeFormPage(wasteType) : notFound();
    }
  }  else if (parts[0] === 'cleaning-zones') {
    if (!can('cleaning-zones.view')) markup = notFound();
    else
    if (parts.length === 1) markup = zoneListPage(params);
    else if (parts.length === 2 && parts[1] === 'new') markup = zoneFormPage();
    else {
      const zone = zones.find((item) => String(item.id) === decodeURIComponent(parts[1] || ''));
      markup = !zone ? notFound() : parts.length === 2 ? zoneDetailPage(zone) : parts.length === 3 && parts[2] === 'edit' ? zoneFormPage(zone) : notFound();
    }
  }
  else if (module && !can(`${module.id}.view`)) markup = notFound();
  else if (!module) markup = notFound();
  else if (parts.length === 2) markup = listPage(module, params);
  else if (parts[2] === 'new' && parts.length === 3) markup = can(`${module.id}.create`) ? formPage(module) : notFound();
  else {
    const record = records.find((item) => item.module === module.id && String(item.id) === decodeURIComponent(parts[2] || ''));
    markup = record ? parts[3] === 'edit' ? can(`${module.id}.update`) ? formPage(module, record) : notFound() : detailPage(module, record) : notFound();
  }
  app.innerHTML = markup;
  if (parts[0] === 'profile') {
    attachProfileEvents();
  }
  const resource = module?.id || (parts[0] in referenceKinds ? parts[0] : null);
  if (resource) {
    if (!can(`${resource}.create`)) app.querySelectorAll('a[href$="/new"]').forEach(link => link.remove());
    if (!can(`${resource}.update`)) app.querySelectorAll('a[href$="/edit"]').forEach(link => link.remove());
    if (!can(`${resource}.delete`)) app.querySelectorAll('[data-action="delete"], [data-action="delete-zone"], [data-action="delete-waste-type"], [data-action="delete-reference"]').forEach(button => button.remove());
  }
  syncMobileNavigation();
  document.title = `${parts[0] === 'reports' ? (moduleById(parts[1])?.short || 'รายงาน') : parts[0] === 'login' ? 'เข้าสู่ระบบ' : parts[0] === 'profile' ? 'โปรไฟล์ส่วนบุคคล' : parts[0] === 'cleaning-zones' ? 'เขตรักษาความสะอาด' : parts[0] === 'waste-types' ? 'ประเภทขยะมูลฝอย' : module?.short || 'แดชบอร์ดฝ่ายบริการ'} — เทศบาลนครนนทบุรี`;
  if (pendingDelete) document.querySelector('[data-dialog] button[data-action="cancel-delete"]')?.focus();
  initCustomSelects();
}

function initCustomSelects() {
  document.querySelectorAll('select.field:not(.custom-select-applied):not(.master-native-select)').forEach(select => {
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
    else if (field.type === 'reference' && value && !references[field.reference]?.some(item => String(item.id) === value && item.is_active)) errors[field.name] = `กรุณาเลือก${field.label}จากรายการ`;
  });
  return { data, errors };
}

function setLoginFieldError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  if (message) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
  error.textContent = message;
  error.classList.toggle('hidden', !message);
}
document.addEventListener('input', (event) => {
  const form = event.target.form;
  if (form?.id === 'login-form' && event.target.matches('input')) {
    setLoginFieldError(event.target, '');
    document.getElementById('login-feedback').classList.add('hidden');
  }
  if (form && form.id === 'filter-form') {
    clearTimeout(form.timeoutId);
    form.timeoutId = setTimeout(() => {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 400);
  }
});

document.addEventListener('submit', (event) => {
  if (event.target.id === 'dashboard-filter') {
    event.preventDefault();
    const form = event.target;
    const from = form.elements.from.value;
    const to = form.elements.to.value;
    const error = form.parentElement.querySelector('#dashboard-filter-error');
    if (!from || !to || from > to) {
      error.textContent = !from || !to ? 'กรุณาระบุวันที่เริ่มต้นและสิ้นสุด' : 'วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น';
      error.classList.remove('hidden');
      return;
    }
    error.textContent = '';
    error.classList.add('hidden');
    const next = `#/dashboard?${new URLSearchParams({ from, to })}`;
    if (location.hash === next) loadDashboard();
    else location.hash = next;
    return;
  }
  if (event.target.id === 'report-filter') {
    event.preventDefault();
    const form = event.target;
    const mode = form.elements.period_mode.value;
    const params = new URLSearchParams();
    if (mode === 'month') {
      if (!form.elements.month.value) return;
      params.set('month', form.elements.month.value);
    } else {
      const from = form.elements.from.value;
      const to = form.elements.to.value;
      const error = form.querySelector('#report-filter-error');
      if (!from || !to || from > to) {
        error.textContent = !from || !to ? 'กรุณาระบุวันที่เริ่มต้นและสิ้นสุด' : 'วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น';
        return;
      }
      error.textContent = '';
      params.set('from', from);
      params.set('to', to);
    }
    const target = `#/reports${form.dataset.reportModule ? `/${form.dataset.reportModule}` : ''}?${params}`;
    if (location.hash === target) loadReportAndAudit();
    else location.hash = target;
    return;
  }
  if (event.target.id === 'audit-filter') {
    event.preventDefault();
    const params = new URLSearchParams(new FormData(event.target));
    navigate(`/audit-logs?${params}`);
    loadReportAndAudit();
    return;
  }
  if (event.target.id === 'zone-filter') {
    event.preventDefault();
    const data = new FormData(event.target);
    const params = new URLSearchParams();
    if (String(data.get('q') || '').trim()) params.set('q', String(data.get('q')).trim());
    if (data.get('sort') === 'name') params.set('sort', 'name');
    navigate('/cleaning-zones' + (params.size ? '?' + params : ''));
    return;
  }
  if (event.target.id === 'zone-form') {
    event.preventDefault();
    submitReference(event.target, 'cleaning-zones');
    return;
  }
  if (event.target.id === 'wasteType-filter') {
    event.preventDefault();
    const data = new FormData(event.target);
    const params = new URLSearchParams();
    if (String(data.get('q') || '').trim()) params.set('q', String(data.get('q')).trim());
    if (data.get('sort') === 'name') params.set('sort', 'name');
    navigate('/waste-types' + (params.size ? '?' + params : ''));
    return;
  }
  if (event.target.id === 'wasteType-form') {
    event.preventDefault();
    submitReference(event.target, 'waste-types');
    return;
  }
  if (event.target.id === 'reference-form') {
    event.preventDefault();
    submitReference(event.target, event.target.dataset.type);
    return;
  }
  if (event.target.id === 'reference-filter') {
    event.preventDefault();
    const type = event.target.dataset.type;
    const params = new URLSearchParams(new FormData(event.target));
    navigate('/' + type + '?' + params);
    return;
  }
  if (event.target.id === 'filter-form') {
    event.preventDefault();
    const form = event.target;
    const params = new URLSearchParams();
    new FormData(form).forEach((value, key) => { if (value && !(key === 'sort' && value === 'newest')) params.set(key, value); });
    navigate(`/module/${form.dataset.module}${params.size ? `?${params}` : ''}`);
  }
  if (event.target.id === 'record-form') {
    event.preventDefault();
    submitActivity(event.target);
  }
});

document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-action]');
  if (!trigger) return;
  const action = trigger.dataset.action;
  if (action === 'print-report') { window.print(); return; }
  if (action === 'retry-report') { loadReportAndAudit(); return; }
  if (action === 'retry-dashboard') { loadDashboard(); return; }
  if (action === 'retry-live-data') { refreshLiveData(); return; }
  if (action === 'toggle-user-menu') {
    userMenuOpen = !userMenuOpen;
    render();
    if (userMenuOpen) {
      document.querySelector('#user-menu-dropdown a, #user-menu-dropdown button')?.focus();
    } else {
      document.querySelector('#user-menu-button')?.focus();
    }
    return;
  }
  if (action === 'close-user-menu') {
    userMenuOpen = false;
    render();
  }
  if (action === 'toggle-login-password') {
    const password = document.getElementById('login-password');
    const showing = password.type === 'password';
    password.type = showing ? 'text' : 'password';
    trigger.textContent = showing ? 'ซ่อน' : 'แสดง';
    trigger.setAttribute('aria-pressed', String(showing));
    return;
  }
  if (action === 'toggle-mobile-filters') {
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    trigger.setAttribute('aria-expanded', String(!expanded));
    trigger.querySelector('svg')?.classList.toggle('rotate-180', !expanded);
    panel.classList.toggle('hidden', expanded);
    panel.classList.toggle('flex', !expanded);
    if (expanded) expandedFilterModules.delete(trigger.dataset.module);
    else expandedFilterModules.add(trigger.dataset.module);
    return;
  }
  if (action === 'toggle-sidebar-subgroup') {
    const groupId = trigger.dataset.group;
    if (expandedSidebarGroups.has(groupId)) expandedSidebarGroups.delete(groupId);
    else expandedSidebarGroups.add(groupId);
    render();
    document.querySelector('[data-action="toggle-sidebar-subgroup"][data-group="' + groupId + '"]')?.focus();
    return;
  }  if (action === 'toggle-sidebar-group') {
    const groupId = trigger.dataset.group;
    if (expandedSidebarGroups.has(groupId)) expandedSidebarGroups.delete(groupId);
    else expandedSidebarGroups.add(groupId);
    render();
    document.querySelector('[data-action="toggle-sidebar-group"][data-group="' + groupId + '"]')?.focus();
  }
  if (action === 'open-menu') { mobileOpen = true; render(); document.querySelector('#sidebar [data-action="close-menu"]')?.focus(); }
  if (action === 'close-menu') { if (event.target.closest('[data-dialog]')) return; mobileOpen = false; render(); document.querySelector('[data-action="open-menu"]')?.focus(); }
  if (action === 'dismiss-toast') { toast = null; render(); }
  if (action === 'delete-zone') {
    const zone = zones.find((item) => String(item.id) === trigger.dataset.id);
    if (!zone) return;
    pendingDelete = { kind: 'zone', id: zone.id };
    render();
    return;
  }
  if (action === 'delete-waste-type') {
    const wasteType = wasteTypes.find((item) => String(item.id) === trigger.dataset.id);
    if (!wasteType) return;
    pendingDelete = { kind: 'waste-type', id: wasteType.id };
    render();
    return;
  }
  if (action === 'delete') { pendingDelete = { module: trigger.dataset.module, id: trigger.dataset.id, focus: trigger }; render(); }
  if (action === 'cancel-delete' && (trigger === event.target || trigger.tagName === 'BUTTON')) { pendingDelete = null; render(); document.querySelector('[data-action="delete-waste-type"], [data-action="delete-zone"], [data-action="delete"]')?.focus(); }
  if (action === 'delete-reference') { pendingDelete = { kind: 'reference', type: trigger.dataset.type, id: trigger.dataset.id }; render(); return; }
  if (action === 'confirm-delete' && pendingDelete) {
    const target = pendingDelete;
    pendingDelete = null;
    (async () => {
      try {
        const url = target.kind === 'zone' ? apiReference('cleaning-zones') + '/' + target.id :
          target.kind === 'waste-type' ? apiReference('waste-types') + '/' + target.id :
          target.kind === 'reference' ? apiReference(target.type) + '/' + target.id :
          apiActivity(target.module) + '/' + target.id;
        await apiRequest(url, { method: 'DELETE' });
        await refreshLiveData();
        navigate(target.kind === 'zone' ? '/cleaning-zones' : target.kind === 'waste-type' ? '/waste-types' : target.kind === 'reference' ? '/' + target.type : '/module/' + target.module);
        showToast('ลบข้อมูลแล้ว');
      } catch (error) { showToast(error.message, 'error'); }
    })();
  }
});

document.addEventListener('change', (event) => {
  if (event.target.name !== 'period_mode' || !event.target.closest('#report-filter')) return;
  const form = event.target.form;
  const custom = event.target.value === 'custom';
  form.querySelector('[data-report-month]').hidden = custom;
  form.querySelector('[data-report-custom]').hidden = !custom;
  form.elements.month.disabled = custom;
  form.elements.from.disabled = !custom;
  form.elements.to.disabled = !custom;
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && userMenuOpen) { userMenuOpen = false; render(); document.querySelector('#user-menu-button')?.focus(); return; }
  if (event.key === 'Escape' && pendingDelete) { pendingDelete = null; render(); document.querySelector('[data-action="delete-waste-type"], [data-action="delete-zone"], [data-action="delete"]')?.focus(); }
  if (event.key === 'Escape' && mobileOpen) { mobileOpen = false; render(); document.querySelector('[data-action="open-menu"]')?.focus(); }
  if (event.key === 'Tab' && mobileOpen && window.innerWidth < 1024) {
    const links = [...document.querySelectorAll('#sidebar a[href], #sidebar button:not([disabled])')].filter((element) => !element.closest('[hidden]'));
    if (event.shiftKey && document.activeElement === links[0]) { event.preventDefault(); links.at(-1)?.focus(); }
    else if (!event.shiftKey && document.activeElement === links.at(-1)) { event.preventDefault(); links[0]?.focus(); }
  }
  if (event.key === 'Tab' && pendingDelete) {
    const buttons = [...document.querySelectorAll('[data-dialog] button')];
    const current = buttons.indexOf(document.activeElement);
    if (event.shiftKey && current === 0) { event.preventDefault(); buttons.at(-1).focus(); }
    if (!event.shiftKey && current === buttons.length - 1) { event.preventDefault(); buttons[0].focus(); }
  }
});

window.addEventListener('resize', syncMobileNavigation);
window.addEventListener('hashchange', () => {
  formPage.draft = null;
  mobileOpen = false;
  userMenuOpen = false;
  expandActiveSidebarGroup();
  render();
  const { parts } = route();
  if (parts[0] === 'dashboard' || !parts.length) loadDashboard();
  else if (!liveDataLoaded && ((parts[0] === 'module' && moduleById(parts[1])) || parts[0] in referenceKinds)) refreshLiveData();
  loadReportAndAudit();
});
document.addEventListener('click', (e) => {
  if (userMenuOpen && !e.target.closest('#user-menu-container')) {
    userMenuOpen = false;
    render();
  }
  if (!e.target.closest('.relative')) {
    document.querySelectorAll('.custom-select-menu').forEach(m => m.classList.add('hidden'));
  }
});
expandActiveSidebarGroup();
render();
if (route().parts[0] === 'dashboard' || !route().parts.length) loadDashboard();
else if ((route().parts[0] === 'module' && moduleById(route().parts[1])) || route().parts[0] in referenceKinds) refreshLiveData();
loadReportAndAudit();

