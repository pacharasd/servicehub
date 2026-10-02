/**
 * src/components/navigation.js
 * Application Navigation, Responsive Sidebar, Topbar, and Shell Component
 * Conforms to ADR 0007, ADR 0009 & WCAG 2.2 Level AA (Landmarks & Touch Targets)
 */

import fallbackLogoUrl from '../assets/nonthaburi-logo.png';
import { can, canManageUsers } from '../api.js';
import { esc, moduleHref, roleBadgeMap, roleNameMap } from '../utils/format.js';
import { icon } from '../utils/icons.js';

const ZONE_HREF = '#/cleaning-zones';
const WASTE_TYPE_HREF = '#/waste-types';

export const sidebarItems = [
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

let mobileOpen = false;
let userMenuOpen = false;
const expandedSidebarGroups = new Set();

export function toggleMobileMenu(open) {
  mobileOpen = typeof open === 'boolean' ? open : !mobileOpen;
  syncMobileNavigation();
}

export function closeUserMenu() {
  userMenuOpen = false;
  const menu = document.getElementById('user-menu-dropdown');
  const btn = document.getElementById('user-menu-button');
  if (menu) {
    menu.classList.add('opacity-0', 'invisible', '-translate-y-1', 'pointer-events-none');
    menu.classList.remove('opacity-100', 'visible', 'translate-y-0', 'pointer-events-auto');
    menu.hidden = true;
  }
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.classList.remove('border-primary', 'bg-[#f0f8f2]');
    btn.querySelector('svg:last-child')?.classList.remove('rotate-180');
  }
}

export function toggleUserMenu() {
  userMenuOpen = !userMenuOpen;
  const menu = document.getElementById('user-menu-dropdown');
  const btn = document.getElementById('user-menu-button');
  if (menu) {
    if (userMenuOpen) {
      menu.classList.remove('opacity-0', 'invisible', '-translate-y-1', 'pointer-events-none');
      menu.classList.add('opacity-100', 'visible', 'translate-y-0', 'pointer-events-auto');
      menu.hidden = false;
      menu.querySelector('a, button')?.focus();
    } else {
      menu.classList.add('opacity-0', 'invisible', '-translate-y-1', 'pointer-events-none');
      menu.classList.remove('opacity-100', 'visible', 'translate-y-0', 'pointer-events-auto');
      menu.hidden = true;
      btn?.focus();
    }
  }
  if (btn) {
    btn.setAttribute('aria-expanded', String(userMenuOpen));
    btn.classList.toggle('border-primary', userMenuOpen);
    btn.classList.toggle('bg-[#f0f8f2]', userMenuOpen);
    btn.querySelector('svg:last-child')?.classList.toggle('rotate-180', userMenuOpen);
  }
}

export function expandActiveSidebarGroup(currentModule) {
  const activeGroup = sidebarItems.find((item) =>
    item.type === 'group' &&
    item.children.some((child) => child.module === currentModule || child.children?.some((nested) => nested.module === currentModule))
  );
  if (currentModule === 'waste-collections' || currentModule === 'waste-types') {
    expandedSidebarGroups.add('waste-collections');
  }
  if (activeGroup) {
    expandedSidebarGroups.add(activeGroup.id);
    const activeSubgroup = activeGroup.children.find(
      (child) => child.children?.some((nested) => nested.module === currentModule) || (child.module === currentModule && child.children)
    );
    if (activeSubgroup) expandedSidebarGroups.add(activeSubgroup.module);
  }
}

export function toggleSidebarGroup(groupId) {
  if (expandedSidebarGroups.has(groupId)) {
    expandedSidebarGroups.delete(groupId);
  } else {
    expandedSidebarGroups.add(groupId);
  }
}

export function syncMobileNavigation() {
  const isMobile = window.innerWidth < 1024;
  document.body.style.overflow = isMobile && mobileOpen ? 'hidden' : '';
  const sidebarElement = document.getElementById('sidebar');
  const backdrop = document.getElementById('mobile-backdrop');

  if (backdrop) {
    backdrop.classList.toggle('hidden', !mobileOpen);
  }

  if (sidebarElement) {
    sidebarElement.inert = isMobile && !mobileOpen;
    sidebarElement.setAttribute('aria-hidden', String(!mobileOpen && isMobile));
    if (isMobile) {
      sidebarElement.classList.toggle('-translate-x-full', !mobileOpen);
      sidebarElement.classList.toggle('translate-x-0', mobileOpen);
      sidebarElement.classList.toggle('invisible', !mobileOpen);
      sidebarElement.classList.toggle('pointer-events-none', !mobileOpen);
      sidebarElement.classList.toggle('visible', mobileOpen);
      sidebarElement.classList.toggle('pointer-events-auto', mobileOpen);
    } else {
      sidebarElement.classList.remove('-translate-x-full', 'invisible', 'pointer-events-none');
      sidebarElement.classList.add('translate-x-0', 'visible', 'pointer-events-auto');
    }
  }

  const openBtn = document.querySelector('[data-action="open-menu"]');
  if (openBtn) {
    openBtn.setAttribute('aria-expanded', String(mobileOpen));
  }
}

function sidebarNavItem(item, currentModule) {
  if (item.type === 'link') {
    const active = currentModule === item.module;
    if (!item.children) {
      return `<a href="${moduleHref(item.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${active ? 'nav-active' : 'text-[#657772] hover:bg-[#f4f7f4] hover:text-ink'}" ${active ? 'aria-current="page"' : ''}>${icon(item.icon, 19, 'shrink-0')}<span class="min-w-0 whitespace-normal break-words">${esc(item.label)}</span></a>`;
    }
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

export function sidebar(currentModule, dashboard) {
  const logoUrl = window.serviceHubUrls?.logo || fallbackLogoUrl;
  return `
    <div id="mobile-backdrop" class="${mobileOpen ? 'fixed inset-0 z-40 bg-slate-950/35 lg:hidden' : 'hidden'}" data-action="close-menu"></div>
    <aside id="sidebar" role="complementary" aria-label="แถบเมนูหลัก" class="fixed inset-y-0 left-0 z-50 flex w-[266px] max-w-[calc(100vw-24px)] flex-col border-r border-line bg-white transition-transform duration-200 lg:translate-x-0 lg:visible lg:pointer-events-auto ${mobileOpen ? 'translate-x-0 visible pointer-events-auto' : '-translate-x-full invisible pointer-events-none'}" ${mobileOpen ? 'aria-hidden="false"' : 'aria-hidden="true"'}>
      <div class="flex h-[72px] items-center gap-3 border-b border-line px-5 sm:px-6">
        <img src="${logoUrl}" alt="ตราเทศบาลนครนนทบุรี" class="h-12 w-12 shrink-0 object-contain drop-shadow-sm">
        <div class="min-w-0 flex-1"><div class="text-[15px] font-bold tracking-tight text-ink leading-snug">เทศบาลนครนนทบุรี</div><div class="text-[11px] font-medium tracking-wide text-muted">ฐานข้อมูลฝ่ายบริการ</div></div>
        <button type="button" class="ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-muted lg:hidden" data-action="close-menu" aria-label="ปิดเมนู">${icon('close', 20)}</button>
      </div>
      <nav aria-label="เมนูหลัก" role="navigation" class="scrollbar-thin flex-1 overflow-y-auto px-4 pb-6 pt-6">
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
    </aside>
  `;
}

export function topbar(breadcrumbs = []) {
  const user = window.serviceHubUser || {};
  const initial = (user.name || user.username || 'U').slice(0, 1).toUpperCase();
  const initials = (user.name || user.username || 'U').slice(0, 2).toUpperCase();
  const primaryRole = (user.roles || [])[0] || 'staff';

  return `
    <header role="banner" class="app-header sticky top-0 z-30 flex h-[72px] w-full max-w-full min-w-0 items-center justify-between border-b border-line bg-white/95 px-3.5 backdrop-blur-sm sm:px-7 lg:px-9">
      <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button type="button" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl p-2 text-ink hover:bg-canvas lg:hidden" data-action="open-menu" aria-label="เปิดเมนู" aria-expanded="${mobileOpen}" aria-controls="sidebar">${icon('menu', 22)}</button>
        <nav aria-label="เส้นทางหน้า" role="navigation" class="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap text-xs text-muted sm:text-sm">
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
            <a href="#/profile" data-action="close-user-menu" role="menuitem" class="flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-ink transition hover:bg-[#f0f8f2] hover:text-primary-dark">
              ${icon('users', 16, 'text-primary')}
              <span>โปรไฟล์ของฉัน</span>
            </a>
            <div class="my-1.5 border-t border-line"></div>
            <form method="POST" action="${esc(window.serviceHubUrls?.logout || '/logout')}" class="m-0">
              <input type="hidden" name="_token" value="${esc(document.querySelector('meta[name="csrf-token"]')?.content)}">
              <button type="submit" role="menuitem" class="flex w-full min-h-11 items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-700">
                ${icon('logout', 16, 'text-rose-500')}
                <span>ออกจากระบบ</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  `;
}

export function renderShell(content, currentModule = null, crumbs = [], dashboard = false) {
  return `
    ${sidebar(currentModule, dashboard)}
    <div class="app-shell min-h-screen w-full max-w-full min-w-0 lg:pl-[266px]">
      ${topbar(crumbs)}
      <main id="main-content" role="main" tabindex="-1" class="app-content mx-auto w-full min-w-0 max-w-[1510px] px-3.5 pb-16 pt-5 sm:px-7 sm:pt-7 lg:px-9">
        ${content}
      </main>
      <div id="shell-live-status" role="status" aria-live="polite" class="sr-only"></div>
    </div>
  `;
}

export function initShell() {
  window.addEventListener('resize', syncMobileNavigation);
}
