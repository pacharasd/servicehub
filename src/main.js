/**
 * src/main.js — Enterprise Application Orchestrator
 * Conforms to ADR 0007 (Modular Vanilla JS ES Architecture) & WCAG 2.2 AA
 */
import './style.css';
import { groups, modules } from './data.js';
import { initRouter, navigate, route } from './router.js';
import { apiRequest, can, canManageUsers } from './api.js';
import { esc, number, thaiDate, moduleHref } from './utils/format.js';
import { icon } from './utils/icons.js';
import { primaryButton, outlinedButton } from './utils/layout.js';
import { initToastContainer, showToast } from './components/toast.js';
import { initCustomSelects } from './components/select.js';
import { debounce } from './utils/filter.js';
import {
  initShell,
  renderShell,
  toggleMobileMenu,
  closeUserMenu,
  toggleUserMenu,
  expandActiveSidebarGroup,
  toggleSidebarGroup,
} from './components/navigation.js';

// Core Landing & Consolidated Feature Views
import { dashboardContent } from './dashboard.js';
import { renderUsersView } from './views/users.js';
import {
  renderActivitiesView,
  deleteActivity,
  refreshActivityData,
  submitActivity,
} from './views/activities.js';
import {
  renderReferencesView,
  deleteReference,
  refreshReferenceData,
  submitReference,
} from './views/references.js';
import { renderProfileView } from './views/profile.js';
import { renderAuditLogsView } from './views/auditLogs.js';
import { reportBody } from './reports.js';

const app = document.querySelector('#app');

// State for dashboard and reports
let overview = null;
let overviewLoading = false;
let overviewError = '';
let overviewRequest = 0;

let reportData = {};
let reportDetail = null;
let reportMeta = null;
let reportLoading = false;
let reportError = '';
let reportRequest = 0;

async function loadDashboard(ctx = null) {
  const requestId = ++overviewRequest;
  const { params } = route();
  const isCurrent = () => (ctx ? ctx.isCurrent() : route().parts[0] === 'dashboard');
  overviewLoading = true;
  overviewError = '';
  if (isCurrent()) renderDashboard();

  try {
    const query = new URLSearchParams();
    if (params.has('from')) query.set('from', params.get('from'));
    if (params.has('to')) query.set('to', params.get('to'));
    const url = (window.serviceHubUrls?.apiDashboard || '/api/dashboard') + (query.size ? `?${query}` : '');
    const result = await apiRequest(url);
    if (requestId !== overviewRequest || !isCurrent()) return;
    overview = result.data;
  } catch (error) {
    if (requestId !== overviewRequest || !isCurrent()) return;
    overviewError = error.message || 'ไม่สามารถโหลดภาพรวมได้';
  } finally {
    if (requestId === overviewRequest && isCurrent()) {
      overviewLoading = false;
      renderDashboard();
    }
  }
}

function renderDashboard() {
  if (route().parts[0] !== 'dashboard') return;
  const { params } = route();
  const content = dashboardContent({
    data: overview,
    loading: overviewLoading,
    error: overviewError,
    params,
    groups,
    modules,
    icon,
    esc,
    number,
    moduleHref,
  });
  app.innerHTML = renderShell(content, null, [{ label: 'แดชบอร์ดฝ่ายบริการ', current: true }], true);
  initCustomSelects();
}

async function loadReports(parts, params, ctx = null) {
  const module = parts[1] ? modules.find((m) => m.id === parts[1]) : null;
  const requestId = ++reportRequest;
  const expectedHash = route().hash;
  const isCurrent = () => (ctx ? ctx.isCurrent() : route().hash === expectedHash);
  reportLoading = true;
  reportError = '';
  if (isCurrent()) await renderReports(parts, params);

  try {
    const template = window.serviceHubUrls?.apiReportDetail || '/api/reports/__MODULE__';
    const base = window.serviceHubUrls?.apiReports || '/api/reports';
    const url = (module ? template.replace('__MODULE__', encodeURIComponent(module.id)) : base) + (params.size ? `?${params}` : '');
    const result = await apiRequest(url);
    if (requestId !== reportRequest || !isCurrent()) return;
    reportMeta = result.meta;
    if (module) reportDetail = result.data;
    else reportData = result.data;
  } catch (error) {
    if (requestId !== reportRequest || !isCurrent()) return;
    reportError = error.fields?.to?.[0] || error.fields?.from?.[0] || error.fields?.month?.[0] || error.message || 'โหลดรายงานไม่สำเร็จ';
  } finally {
    if (requestId === reportRequest && isCurrent()) {
      reportLoading = false;
      await renderReports(parts, params);
    }
  }
}

async function renderReports(parts, params) {
  if (route().parts[0] !== 'reports' || route().parts[1] !== parts[1]) return;
  const module = parts[1] ? modules.find((m) => m.id === parts[1]) : null;
  const content = reportBody({
    module,
    params,
    data: module ? reportDetail : reportData,
    meta: reportMeta,
    loading: reportLoading,
    error: reportError,
    modules,
    groups,
    can,
    esc,
    number,
    thaiDate,
    moduleHref,
  });
  const crumbs = module ? [{ label: 'รายงาน', href: '#/reports' }, { label: module.short, current: true }] : [{ label: 'รายงาน', current: true }];
  app.innerHTML = renderShell(content, 'reports', crumbs);
  initCustomSelects();
}

/**
 * Route Dispatch Table
 */
const routes = {
  dashboard: async (ctx) => {
    expandActiveSidebarGroup('dashboard');
    await loadDashboard(ctx);
  },
  users: async (ctx) => {
    if (!canManageUsers()) {
      navigate('#/dashboard');
      showToast('คุณไม่มีสิทธิ์เข้าถึงหน้านี้', 'error');
      return;
    }
    expandActiveSidebarGroup('users');
    app.innerHTML = renderShell(renderUsersView(ctx), 'users', [{ label: 'จัดการผู้ใช้งาน', current: true }]);
    initCustomSelects();
  },
  module: async (ctx) => {
    const moduleId = ctx.parts[1];
    if (moduleId && !can(`${moduleId}.view`)) {
      navigate('#/dashboard');
      showToast('คุณไม่มีสิทธิ์เข้าถึงหมวดงานบริการนี้', 'error');
      return;
    }
    expandActiveSidebarGroup(moduleId);
    const mod = modules.find((m) => m.id === moduleId);
    const crumbs = mod ? [{ label: mod.short, current: true }] : [];
    const content = await renderActivitiesView(ctx);
    if (!ctx.isCurrent()) return;
    app.innerHTML = renderShell(content, moduleId, crumbs);
    initCustomSelects();
  },
  'cleaning-zones': async (ctx) => {
    if (!can('cleaning-zones.view')) {
      navigate('#/dashboard');
      return;
    }
    expandActiveSidebarGroup('cleaning-zones');
    const content = await renderReferencesView('cleaning-zones', ctx);
    if (!ctx.isCurrent()) return;
    app.innerHTML = renderShell(content, 'cleaning-zones', [{ label: 'เขตรักษาความสะอาด', current: true }]);
    initCustomSelects();
  },
  'waste-types': async (ctx) => {
    if (!can('waste-types.view')) {
      navigate('#/dashboard');
      return;
    }
    expandActiveSidebarGroup('waste-types');
    const content = await renderReferencesView('waste-types', ctx);
    if (!ctx.isCurrent()) return;
    app.innerHTML = renderShell(content, 'waste-types', [{ label: 'ประเภทขยะมูลฝอย', current: true }]);
    initCustomSelects();
  },
  profile: async (ctx) => {
    expandActiveSidebarGroup('profile');
    app.innerHTML = renderShell(renderProfileView(ctx), 'profile', [{ label: 'โปรไฟล์ของฉัน', current: true }]);
  },
  'audit-logs': async (ctx) => {
    if (!can('audit-logs.view')) {
      navigate('#/dashboard');
      return;
    }
    expandActiveSidebarGroup('audit-logs');
    const content = await renderAuditLogsView(ctx);
    if (!ctx.isCurrent()) return;
    app.innerHTML = renderShell(content, 'audit-logs', [{ label: 'ประวัติการแก้ไข', current: true }]);
  },
  reports: async (ctx) => {
    expandActiveSidebarGroup('reports');
    await loadReports(ctx.parts, ctx.params, ctx);
  },
  '*': () => {
    navigate('#/dashboard');
  },
};

/**
 * Global Keyboard & Interaction Shortcuts
 */
function bindGlobalEvents() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeUserMenu();
      toggleMobileMenu(false);
    }
    if (e.key === 'Tab' && window.innerWidth < 1024) {
      const sidebar = document.getElementById('sidebar');
      if (sidebar && sidebar.classList.contains('translate-x-0')) {
        const links = [...sidebar.querySelectorAll('a[href], button:not([disabled])')].filter((el) => !el.closest('[hidden]'));
        if (links.length) {
          if (e.shiftKey && document.activeElement === links[0]) {
            e.preventDefault();
            links[links.length - 1]?.focus();
          } else if (!e.shiftKey && document.activeElement === links[links.length - 1]) {
            e.preventDefault();
            links[0]?.focus();
          }
        }
      }
    }
  });

  document.addEventListener('click', async (e) => {
    const trigger = e.target.closest('[data-action]');

    if (!e.target.closest('#user-menu-container')) {
      closeUserMenu();
    }
    if (!e.target.closest('.relative')) {
      document.querySelectorAll('.custom-select-menu').forEach((m) => m.classList.add('hidden'));
    }

    if (!trigger) return;
    const action = trigger.dataset.action;

    if (action === 'open-menu') {
      toggleMobileMenu(true);
      document.querySelector('#sidebar [data-action="close-menu"]')?.focus();
      return;
    }
    if (action === 'close-menu') {
      toggleMobileMenu(false);
      document.querySelector('[data-action="open-menu"]')?.focus();
      return;
    }
    if (action === 'toggle-user-menu') {
      toggleUserMenu();
      return;
    }
    if (action === 'close-user-menu') {
      closeUserMenu();
      return;
    }
    if (action === 'toggle-sidebar-group' || action === 'toggle-sidebar-subgroup') {
      toggleSidebarGroup(trigger.dataset.group);
      trigger.setAttribute('aria-expanded', String(trigger.getAttribute('aria-expanded') !== 'true'));
      const targetPanel = document.getElementById(trigger.getAttribute('aria-controls'));
      if (targetPanel) targetPanel.hidden = !targetPanel.hidden;
      trigger.querySelector('svg:last-child')?.classList.toggle('rotate-180');
      return;
    }
    if (action === 'delete-activity') {
      const moduleId = trigger.dataset.module;
      const recordId = trigger.dataset.id;
      await deleteActivity(moduleId, recordId, {
        navigate,
        showToast,
        refreshData: refreshActivityData,
      });
      return;
    }
    if (action === 'delete-reference') {
      const type = trigger.dataset.type;
      const id = trigger.dataset.id;
      const name = trigger.dataset.name;
      const usage = Number(trigger.dataset.usage) || 0;
      await deleteReference(type, id, name, usage, {
        navigate,
        showToast,
        refreshData: refreshReferenceData,
      });
      return;
    }
    if (action === 'print-report') {
      window.print();
      return;
    }
    if (action === 'retry-dashboard') {
      loadDashboard();
      return;
    }
    if (action === 'retry-report') {
      const { parts, params } = route();
      loadReports(parts, params);
      return;
    }
    if (action === 'retry-route') {
      navigate(route().hash);
      return;
    }
    if (action === 'toggle-mobile-filters') {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      trigger.setAttribute('aria-expanded', String(!expanded));
      trigger.querySelector('svg')?.classList.toggle('rotate-180', !expanded);
      panel?.classList.toggle('hidden', expanded);
      panel?.classList.toggle('flex', !expanded);
      return;
    }
    if (action === 'set-date-preset') {
      const from = trigger.dataset.from;
      const to = trigger.dataset.to;
      const formId = trigger.dataset.form;
      const form = formId ? document.getElementById(formId) : trigger.closest('form');
      if (form) {
        if (form.elements.period_mode) {
          const customRadio = form.querySelector('input[name="period_mode"][value="custom"]');
          if (customRadio) {
            customRadio.checked = true;
            customRadio.dispatchEvent(new Event('change', { bubbles: true }));
          }
        }
        if (form.elements.from) form.elements.from.value = from;
        if (form.elements.to) form.elements.to.value = to;
        form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }
      return;
    }
  });

  document.addEventListener('submit', async (e) => {
    if (e.target.id === 'record-form') {
      e.preventDefault();
      submitActivity(e.target);
      return;
    }
    if (e.target.id === 'zone-form') {
      e.preventDefault();
      submitReference(e.target, 'cleaning-zones');
      return;
    }
    if (e.target.id === 'wasteType-form') {
      e.preventDefault();
      submitReference(e.target, 'waste-types');
      return;
    }
    if (e.target.id === 'dashboard-filter') {
      e.preventDefault();
      const form = e.target;
      const from = form.elements.from.value;
      const to = form.elements.to.value;
      const error = form.parentElement.querySelector('#dashboard-filter-error');
      if (!from || !to || from > to) {
        if (error) {
          error.textContent = !from || !to ? 'กรุณาระบุวันที่เริ่มต้นและสิ้นสุด' : 'วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น';
          error.classList.remove('hidden');
        }
        return;
      }
      if (error) error.classList.add('hidden');
      navigate(`/dashboard?${new URLSearchParams({ from, to })}`);
      return;
    }
    if (e.target.id === 'report-filter') {
      e.preventDefault();
      const form = e.target;
      const mode = form.elements.period_mode?.value;
      const params = new URLSearchParams();
      if (mode === 'month') {
        if (!form.elements.month?.value) return;
        params.set('month', form.elements.month.value);
      } else {
        const from = form.elements.from?.value;
        const to = form.elements.to?.value;
        const error = form.querySelector('#report-filter-error');
        if (!from || !to || from > to) {
          if (error) error.textContent = !from || !to ? 'กรุณาระบุวันที่เริ่มต้นและสิ้นสุด' : 'วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น';
          return;
        }
        if (error) error.textContent = '';
        params.set('from', from);
        params.set('to', to);
      }
      const target = `#/reports${form.dataset.reportModule ? `/${form.dataset.reportModule}` : ''}?${params}`;
      navigate(target.replace('#', ''));
      return;
    }
    if (e.target.id === 'filter-form') {
      e.preventDefault();
      const form = e.target;
      const params = new URLSearchParams();
      new FormData(form).forEach((value, key) => {
        if (value && !(key === 'sort' && value === 'newest')) params.set(key, value);
      });
      navigate(`/module/${form.dataset.module}${params.size ? `?${params}` : ''}`);
      return;
    }
    if (e.target.id === 'zone-filter') {
      e.preventDefault();
      const data = new FormData(e.target);
      const params = new URLSearchParams();
      if (String(data.get('q') || '').trim()) params.set('q', String(data.get('q')).trim());
      if (data.get('status') && data.get('status') !== 'all') params.set('status', data.get('status'));
      if (data.get('sort') === 'name') params.set('sort', 'name');
      navigate(`/cleaning-zones${params.size ? `?${params}` : ''}`);
      return;
    }
    if (e.target.id === 'wasteType-filter') {
      e.preventDefault();
      const data = new FormData(e.target);
      const params = new URLSearchParams();
      if (String(data.get('q') || '').trim()) params.set('q', String(data.get('q')).trim());
      if (data.get('status') && data.get('status') !== 'all') params.set('status', data.get('status'));
      if (data.get('sort') === 'name') params.set('sort', 'name');
      navigate(`/waste-types${params.size ? `?${params}` : ''}`);
      return;
    }
    if (e.target.id === 'audit-filter') {
      e.preventDefault();
      const data = new FormData(e.target);
      const params = new URLSearchParams();
      if (String(data.get('q') || '').trim()) params.set('q', String(data.get('q')).trim());
      if (data.get('action') && data.get('action') !== 'all') params.set('action', data.get('action'));
      if (data.get('from')) params.set('from', data.get('from'));
      if (data.get('to')) params.set('to', data.get('to'));
      navigate(`/audit-logs${params.size ? `?${params}` : ''}`);
      return;
    }
  });

  const debouncedFormSubmit = debounce((form) => {
    if (form && form.isConnected) {
      form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
  }, 300);

  document.addEventListener('input', (e) => {
    if (e.target.dataset.action === 'live-filter' && e.target.type !== 'date') {
      const form = e.target.form;
      if (form) debouncedFormSubmit(form);
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.dataset.action === 'live-filter') {
      const form = e.target.form;
      if (form) {
        form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      }
    }
    if (e.target.name === 'period_mode' && e.target.closest('#report-filter')) {
      const form = e.target.form;
      const custom = e.target.value === 'custom';
      const m = form.querySelector('[data-report-month]');
      const c = form.querySelector('[data-report-custom]');
      if (m) m.hidden = custom;
      if (c) c.hidden = !custom;
      if (form.elements.month) form.elements.month.disabled = custom;
      if (form.elements.from) form.elements.from.disabled = !custom;
      if (form.elements.to) form.elements.to.disabled = !custom;
    }
  });
}

/**
 * Application Bootstrap
 */
function bootstrap() {
  initToastContainer();
  initShell();
  bindGlobalEvents();

  initRouter(routes, {
    onDenied: (ctx) => {
      if (!ctx.isCurrent()) return;
      const content = `<section class="panel-shadow mx-auto max-w-lg rounded-2xl border border-line bg-white p-6 text-center" role="alert"><h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึงหน้านี้</h1><p class="mt-2 text-sm text-muted">บัญชีนี้ยังไม่ได้รับสิทธิ์ดูข้อมูลในหมวดที่เลือก</p><a href="#/dashboard" class="mt-5 inline-flex min-h-11 items-center font-bold text-primary underline">กลับแดชบอร์ด</a></section>`;
      app.innerHTML = renderShell(content, null, [{ label: 'ไม่มีสิทธิ์เข้าถึง', current: true }]);
    },
    onError: (_error, ctx) => {
      if (!ctx.isCurrent()) return;
      const content = `<section class="panel-shadow mx-auto max-w-lg rounded-2xl border border-red-200 bg-white p-6 text-center" role="alert"><h1 class="text-xl font-bold">โหลดหน้าไม่สำเร็จ</h1><p class="mt-2 text-sm text-muted">กรุณาลองใหม่อีกครั้ง หากยังพบปัญหาให้ติดต่อผู้ดูแลระบบ</p><button type="button" data-action="retry-route" class="mt-5 min-h-11 rounded-xl border border-line px-4 font-bold text-primary">ลองอีกครั้ง</button></section>`;
      app.innerHTML = renderShell(content, null, [{ label: 'โหลดหน้าไม่สำเร็จ', current: true }]);
    },
    afterRender: () => {
      initCustomSelects();
    },
  });
}

bootstrap();
