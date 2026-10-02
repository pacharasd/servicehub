/**
 * src/views/users.js
 * Enterprise User Directory & Lifecycle Management View
 * Conforms to ADR 0007, ADR 0009 & WCAG 2.2 Level AA
 */
import { apiRequest, canDo } from '../api.js';
import { esc, number, thaiDate, userInitials } from '../utils/format.js';
import { icon } from '../utils/icons.js';
import { pageHeading } from '../utils/layout.js';
import { openDrawer, closeDrawer } from '../components/drawer.js';
import { showConfirmModal } from '../components/confirmModal.js';
import { showToast } from '../components/toast.js';

export const USER_ROLES = {
  'super-admin': { label: 'ผู้ดูแลสูงสุด', color: 'bg-[#fef2e8] text-[#b25d1a] border-[#f9d4b4]' },
  admin: { label: 'ผู้ดูแลระบบ', color: 'bg-[#e8f0fe] text-[#2756b8] border-[#c3d3f9]' },
  staff: { label: 'เจ้าหน้าที่', color: 'bg-[#eef7f2] text-[#156e3a] border-[#b7e4ce]' },
  viewer: { label: 'ผู้ดูข้อมูล', color: 'bg-[#f3f0fb] text-[#5a469b] border-[#cdc5ef]' },
  auditor: { label: 'ผู้ตรวจสอบ', color: 'bg-[#fff4e8] text-[#966020] border-[#f5d9a8]' },
};

export function roleBadge(roleName) {
  const role = USER_ROLES[roleName] || { label: roleName, color: 'bg-[#f2f4f3] text-[#52665e] border-[#d8e3de]' };
  return `<span class="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${role.color}">${esc(role.label)}</span>`;
}

// Module State
export let umState = {
  loading: false,
  error: null,
  users: [],
  summary: {},
  meta: {},
  roles: [],
};

export let umParams = {
  q: '',
  role: 'all',
  status: 'all',
  sort: 'created_at',
  direction: 'desc',
  page: 1,
};

let searchDebounceTimer = null;

export function userDirectoryPage() {
  return `
    <div id="user-directory-root" class="w-full min-w-0 max-w-full">
      ${userDirectoryContent()}
    </div>
  `;
}

export function userDirectoryContent() {
  const { loading, error, users, summary, meta } = umState;
  const canCreate = canDo('users.create');
  const createBtn = canCreate
    ? `<button type="button" data-action="um-open-create" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${icon('plus', 18)}เพิ่มผู้ใช้งาน</button>`
    : '';

  return `
    ${pageHeading('การจัดการระบบ', 'จัดการผู้ใช้งาน', 'บริหารบัญชีผู้ใช้ สิทธิ์การเข้าถึง และความปลอดภัยของระบบ', createBtn)}
    ${userKpiCards(summary)}
    ${userFilterBar()}
    ${loading ? `<div role="status" aria-live="polite" class="flex items-center justify-center py-16 text-muted text-sm">${icon('filter', 20, 'animate-spin mr-2')} กำลังโหลดข้อมูลผู้ใช้งาน...</div>`
      : error ? `<div role="alert" class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">${esc(error)}</div>`
      : userTable(users, meta)}
  `;
}

export function userKpiCards(summary) {
  const cards = [
    { label: 'บัญชีผู้ใช้ทั้งหมด', value: summary.total_accounts ?? '—', icon: 'users', bg: 'bg-[#e6f4ee]', color: 'text-primary' },
    { label: 'ใช้งานอยู่', value: summary.active_users ?? '—', icon: 'check', bg: 'bg-[#e7f3f8]', color: 'text-[#3485a5]' },
    { label: 'ผู้ดูแลระบบ', value: summary.administrators ?? '—', icon: 'sparkles', bg: 'bg-[#fff3e5]', color: 'text-[#bb7934]' },
    { label: 'การยืนยันตัวตน 2FA', value: summary.two_factor_enrolled ?? (summary.total_accounts != null ? 'พร้อมใช้งาน' : '—'), icon: 'lock', bg: 'bg-[#f3f0fb]', color: 'text-[#6b4fb8]' },
  ];

  return `
    <section aria-label="สรุปสถิติผู้ใช้" class="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      ${cards.map((c) => `
        <div class="rounded-2xl border border-line bg-white p-4 sm:p-5 panel-shadow">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.bg} ${c.color}">
              ${icon(c.icon, 19)}
            </div>
            <p class="text-xs font-medium text-muted">${esc(c.label)}</p>
          </div>
          <p class="mt-3 text-[26px] font-bold leading-none text-ink">${esc(String(c.value))}</p>
        </div>
      `).join('')}
    </section>
  `;
}

export function userFilterBar() {
  const { q, role, status, sort, direction } = umParams;
  const roles = [{ value: 'all', label: 'ทุกบทบาท' }, ...Object.entries(USER_ROLES).map(([v, d]) => ({ value: v, label: d.label }))];
  const statuses = [{ value: 'all', label: 'ทุกสถานะ' }, { value: 'active', label: 'ใช้งานอยู่' }, { value: 'inactive', label: 'ระงับแล้ว' }];

  return `
    <section aria-label="ค้นหาและกรองผู้ใช้" class="mb-5 panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-end gap-3">
        <div class="w-full min-w-0 sm:min-w-[200px] sm:flex-1">
          <label for="um-search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <div class="relative">
            ${icon('search', 18, 'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]')}
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
    </section>
  `;
}

export function userTable(users, meta) {
  const canUpdate = canDo('users.update');
  const canDisable = canDo('users.disable');
  const canReset = canDo('users.update');

  if (!users.length) {
    return `
      <div class="panel-shadow flex flex-col items-center rounded-2xl border border-line bg-white px-6 py-16 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f7f2] text-primary">
          ${icon('users', 27)}
        </div>
        <h3 class="text-base font-bold">ไม่พบผู้ใช้งาน</h3>
        <p class="mt-1 max-w-sm text-sm leading-relaxed text-muted">ลองเปลี่ยนคำค้นหาหรือตัวกรอง หรือเพิ่มผู้ใช้งานใหม่</p>
      </div>
    `;
  }

  const { current_page: cp = 1, last_page: lp = 1, total = 0, per_page: pp = 10 } = meta;

  return `
    <section aria-labelledby="um-table-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
        <div>
          <h2 id="um-table-title" class="text-sm font-bold">รายการผู้ใช้งาน</h2>
          <p class="mt-0.5 text-xs text-muted">พบ ${number(total)} บัญชี</p>
        </div>
      </div>
      <div class="data-table-scroll block overflow-x-auto w-full max-w-full min-w-0">
        <table class="w-full min-w-[680px] text-left text-sm" role="table" aria-label="ตารางผู้ใช้งาน">
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
              const roleName = u.role ?? (u.roles?.[0]?.name ?? u.roles?.[0] ?? '');
              const isActive = Boolean(u.is_active);
              const isSelf = String(u.id) === String(window.serviceHubUser?.id);

              return `
                <tr class="transition hover:bg-[#fafcfa]" data-user-id="${esc(String(u.id))}">
                  <td class="px-5 py-3.5">
                    <div class="flex items-center gap-3">
                      <span aria-hidden="true" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e0f0e8] text-[13px] font-bold text-primary-dark">
                        ${esc(userInitials(u.name))}
                      </span>
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
                  <td class="px-5 py-3.5 text-xs text-muted whitespace-nowrap">${thaiDate(u.created_at)}</td>
                  ${(canUpdate || canDisable || canReset) ? `
                  <td class="px-5 py-3.5 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                      ${canUpdate ? `<button type="button" data-action="um-edit-user" data-id="${esc(String(u.id))}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-ink hover:bg-canvas" aria-label="แก้ไข ${esc(u.name)}">${icon('edit', 15)}แก้ไข</button>` : ''}
                      ${canDisable && !isSelf ? `<button type="button" data-action="um-toggle-status" data-id="${esc(String(u.id))}" data-active="${isActive ? '1' : '0'}" data-name="${esc(u.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold ${isActive ? 'text-[#b91c1c] hover:bg-red-50' : 'text-[#156e3a] hover:bg-[#eef7f2]'}" aria-label="${isActive ? 'ระงับ' : 'เปิดใช้'} ${esc(u.name)}">${isActive ? icon('close', 15) : icon('check', 15)}${isActive ? 'ระงับ' : 'เปิดใช้'}</button>` : ''}
                      ${canReset && !isSelf ? `<button type="button" data-action="um-reset-password" data-id="${esc(String(u.id))}" data-name="${esc(u.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-muted hover:bg-canvas" aria-label="รีเซ็ตรหัสผ่าน ${esc(u.name)}">${icon('logout', 15)}รีเซ็ต</button>` : ''}
                    </div>
                  </td>` : ''}
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
      ${lp > 1 ? `
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-xs text-muted sm:px-6 sm:py-4">
        <span>แสดง ${number((cp - 1) * pp + 1)}–${number(Math.min(cp * pp, total))} จาก ${number(total)} บัญชี</span>
        <div class="flex items-center gap-2">
          <button type="button" data-action="um-page" data-page="${cp - 1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${cp === 1 ? 'opacity-45 cursor-not-allowed' : 'hover:bg-canvas'}" ${cp === 1 ? 'disabled aria-disabled="true"' : ''}>ก่อนหน้า</button>
          <span class="px-1 font-bold text-ink">${cp} / ${lp}</span>
          <button type="button" data-action="um-page" data-page="${cp + 1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${cp === lp ? 'opacity-45 cursor-not-allowed' : 'hover:bg-canvas'}" ${cp === lp ? 'disabled aria-disabled="true"' : ''}>ถัดไป</button>
        </div>
      </div>` : ''}
    </section>
  `;
}

export function generateSecurePassword() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!';
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => chars[b % chars.length]).join('');
}

export async function fetchUsers(toastFn = showToast) {
  umState.loading = true;
  umState.error = null;
  renderUserDirectory(toastFn);

  const params = new URLSearchParams();
  if (umParams.q) params.set('q', umParams.q);
  if (umParams.role && umParams.role !== 'all') params.set('role', umParams.role);
  if (umParams.status && umParams.status !== 'all') params.set('status', umParams.status);
  params.set('sort', umParams.sort);
  params.set('direction', umParams.direction);
  params.set('page', String(umParams.page));
  params.set('per_page', '10');

  try {
    const url = window.serviceHubUrls?.apiUsers || '/api/users';
    const result = await apiRequest(`${url}?${params}`);
    umState.users = result.data ?? [];
    umState.summary = result.summary ?? {};
    umState.meta = result.meta ?? {};
  } catch (error) {
    umState.error = error.message || 'ไม่สามารถโหลดข้อมูลผู้ใช้งานได้';
  } finally {
    umState.loading = false;
    renderUserDirectory(toastFn);
  }
}

export async function fetchRoles() {
  try {
    const url = window.serviceHubUrls?.apiRoles || '/api/roles';
    const result = await apiRequest(url);
    umState.roles = result.data ?? [];
  } catch {
    umState.roles = Object.keys(USER_ROLES).map((k) => ({ name: k }));
  }
}

export function renderUserDirectory(toastFn = showToast) {
  const root = document.getElementById('user-directory-root');
  if (!root) return;
  root.innerHTML = userDirectoryContent();
  attachUserEvents(root, toastFn);
}

export function attachUserEvents(root, toastFn = showToast) {
  // Search
  root.querySelector('[data-action="um-search"]')?.addEventListener('input', (e) => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      umParams.q = e.target.value.trim();
      umParams.page = 1;
      fetchUsers(toastFn);
    }, 300);
  });

  // Filters
  root.querySelector('[data-action="um-filter-role"]')?.addEventListener('change', (e) => {
    umParams.role = e.target.value;
    umParams.page = 1;
    fetchUsers(toastFn);
  });

  root.querySelector('[data-action="um-filter-status"]')?.addEventListener('change', (e) => {
    umParams.status = e.target.value;
    umParams.page = 1;
    fetchUsers(toastFn);
  });

  root.querySelector('[data-action="um-filter-sort"]')?.addEventListener('change', (e) => {
    const [sort, dir] = e.target.value.split(':');
    umParams.sort = sort;
    umParams.direction = dir;
    umParams.page = 1;
    fetchUsers(toastFn);
  });

  root.querySelector('[data-action="um-clear-filters"]')?.addEventListener('click', () => {
    Object.assign(umParams, { q: '', role: 'all', status: 'all', sort: 'created_at', direction: 'desc', page: 1 });
    fetchUsers(toastFn);
  });

  // Pagination
  root.querySelectorAll('[data-action="um-page"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      umParams.page = Number(btn.dataset.page);
      fetchUsers(toastFn);
    });
  });

  // Open Create Drawer
  root.querySelector('[data-action="um-open-create"]')?.addEventListener('click', (e) => {
    openUserDrawer({ mode: 'create', trigger: e.currentTarget, toastFn });
  });

  // Open Edit Drawer
  root.querySelectorAll('[data-action="um-edit-user"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const u = umState.users.find((user) => String(user.id) === btn.dataset.id);
      if (!u) return;
      const role = u.role ?? (u.roles?.[0]?.name ?? u.roles?.[0] ?? '');
      const user = { ...u, role };
      openUserDrawer({ mode: 'edit', user, trigger: e.currentTarget, toastFn });
    });
  });

  // Reset Password Drawer
  root.querySelectorAll('[data-action="um-reset-password"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const user = { id: btn.dataset.id, name: btn.dataset.name };
      openUserDrawer({ mode: 'reset', user, trigger: e.currentTarget, toastFn });
    });
  });

  // Status Toggle with Accessible Confirm Modal
  root.querySelectorAll('[data-action="um-toggle-status"]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const isActive = btn.dataset.active === '1';
      const name = btn.dataset.name;

      const confirmed = await showConfirmModal({
        title: isActive ? 'ยืนยันการระงับการใช้งาน' : 'ยืนยันการเปิดใช้งาน',
        message: `คุณต้องการ${isActive ? 'ระงับการใช้งาน' : 'เปิดใช้งาน'}บัญชี "${name}" ใช่หรือไม่? ${isActive ? 'ผู้ใช้จะถูกตัดเซสชันการเข้าใช้งานทันที' : ''}`,
        confirmText: isActive ? 'ระงับการใช้งาน' : 'เปิดใช้งาน',
        variant: isActive ? 'danger' : 'primary',
        iconName: isActive ? 'close' : 'check',
      });

      if (!confirmed) return;

      btn.disabled = true;
      try {
        const baseUrl = window.serviceHubUrls?.apiUsers || '/api/users';
        await apiRequest(`${baseUrl}/${encodeURIComponent(id)}/status`, {
          method: 'PATCH',
          body: { is_active: !isActive },
        });
        toastFn(isActive ? 'ระงับการใช้งานบัญชีแล้ว' : 'เปิดใช้งานบัญชีแล้ว');
        await fetchUsers(toastFn);
      } catch (err) {
        toastFn(err.message || 'ไม่สามารถเปลี่ยนสถานะผู้ใช้ได้', 'error');
        btn.disabled = false;
      }
    });
  });
}

export function openUserDrawer({ mode, user = null, trigger = null, toastFn = showToast }) {
  const isReset = mode === 'reset';
  const isEdit = mode === 'edit';
  const title = isReset ? `รีเซ็ตรหัสผ่าน — ${esc(user?.name)}` : isEdit ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มผู้ใช้งานใหม่';
  const roles = umState.roles.length ? umState.roles : Object.keys(USER_ROLES).map((k) => ({ name: k }));

  const content = document.createElement('div');
  content.innerHTML = `
    <div id="drawer-server-error" class="mb-4 hidden rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert"></div>
    <form id="um-drawer-form" novalidate class="space-y-4">
      ${isReset ? `
        <div>
          <label for="um-new-password" class="mb-1.5 block text-sm font-semibold text-ink">รหัสผ่านใหม่ <span class="text-red-500">*</span></label>
          <div class="relative">
            <input id="um-new-password" name="password" type="password" autocomplete="new-password" class="field pr-12 font-mono" required minlength="15" aria-describedby="um-password-error">
            <button type="button" data-action="toggle-pwd-visibility" data-target="um-new-password" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="um-new-password">
              ${icon('eye', 18)}
            </button>
          </div>
          <p id="um-password-error" class="mt-1 text-xs text-muted" role="alert">ความยาวอย่างน้อย 15 ตัวอักษร</p>
          <button type="button" id="um-gen-pw-btn" class="mt-2 text-xs font-semibold text-primary hover:underline">สุ่มรหัสผ่านปลอดภัย</button>
        </div>
      ` : `
        <div>
          <label for="um-name" class="mb-1.5 block text-sm font-semibold text-ink">ชื่อ-นามสกุล <span class="text-red-500">*</span></label>
          <input id="um-name" name="name" type="text" autocomplete="name" class="field" value="${esc(user?.name ?? '')}" required maxlength="255" aria-describedby="um-name-error">
          <p id="um-name-error" class="mt-1 hidden text-xs text-red-600" role="alert"></p>
        </div>
        ${!isEdit ? `
        <div>
          <label for="um-username" class="mb-1.5 block text-sm font-semibold text-ink">ชื่อผู้ใช้ (Username) <span class="text-red-500">*</span></label>
          <input id="um-username" name="username" type="text" autocomplete="username" class="field font-mono" placeholder="3-100 ตัวอักษร (a-z, 0-9, . - _)" required maxlength="100" aria-describedby="um-username-error">
          <p id="um-username-error" class="mt-1 hidden text-xs text-red-600" role="alert"></p>
        </div>` : `
        <div>
          <p class="text-xs font-bold text-muted uppercase">ชื่อผู้ใช้</p>
          <p class="mt-1 font-mono text-sm font-bold text-ink">@${esc(user?.username ?? '')}</p>
        </div>`}
        <div>
          <label for="um-drawer-role" class="mb-1.5 block text-sm font-semibold text-ink">บทบาท <span class="text-red-500">*</span></label>
          <select id="um-drawer-role" name="role" class="field master-native-select">
            ${roles.map((r) => `<option value="${esc(r.name)}"${user?.role === r.name ? ' selected' : ''}>${esc(USER_ROLES[r.name]?.label || r.name)}</option>`).join('')}
          </select>
        </div>
        ${!isEdit ? `
        <div>
          <label for="um-password" class="mb-1.5 block text-sm font-semibold text-ink">รหัสผ่านเริ่มต้น <span class="text-red-500">*</span></label>
          <div class="relative">
            <input id="um-password" name="password" type="password" autocomplete="new-password" class="field pr-12 font-mono" required minlength="15" aria-describedby="um-password-error">
            <button type="button" data-action="toggle-pwd-visibility" data-target="um-password" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="um-password">
              ${icon('eye', 18)}
            </button>
          </div>
          <p id="um-password-error" class="mt-1 text-xs text-muted" role="alert">ความยาวอย่างน้อย 15 ตัวอักษร</p>
          <button type="button" id="um-gen-init-pw-btn" class="mt-2 text-xs font-semibold text-primary hover:underline">สุ่มรหัสผ่านปลอดภัย</button>
        </div>` : ''}
      `}
    </form>
  `;

  const footer = `
    <button type="button" data-action="drawer-close" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-semibold text-ink hover:bg-canvas">ยกเลิก</button>
    <button type="submit" form="um-drawer-form" id="um-drawer-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">
      ${isReset ? 'รีเซ็ตรหัสผ่าน' : isEdit ? 'บันทึกการแก้ไข' : 'สร้างผู้ใช้งาน'}
    </button>
  `;

  // Attach drawer internal events
  content.querySelectorAll('[data-action="toggle-pwd-visibility"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const input = content.querySelector(`#${btn.dataset.target}`);
      if (!input) return;
      const isPwd = input.type === 'password';
      input.type = isPwd ? 'text' : 'password';
      btn.innerHTML = icon(isPwd ? 'eyeOff' : 'eye', 18);
      btn.setAttribute('aria-label', isPwd ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน');
      btn.setAttribute('aria-pressed', String(isPwd));
    });
  });

  const pwGen = () => {
    const pw = generateSecurePassword();
    const field = content.querySelector('#um-password') || content.querySelector('#um-new-password');
    if (field) {
      field.value = pw;
      field.type = 'text';
      const toggle = content.querySelector(`[data-target="${field.id}"]`);
      if (toggle) {
        toggle.innerHTML = icon('eyeOff', 18);
        toggle.setAttribute('aria-label', 'ซ่อนรหัสผ่าน');
        toggle.setAttribute('aria-pressed', 'true');
      }
    }
  };
  content.querySelector('#um-gen-pw-btn')?.addEventListener('click', pwGen);
  content.querySelector('#um-gen-init-pw-btn')?.addEventListener('click', pwGen);

  // Form Submission
  const form = content.querySelector('#um-drawer-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('um-drawer-submit');
    const errAlert = content.querySelector('#drawer-server-error');
    errAlert.classList.add('hidden');
    errAlert.textContent = '';
    content.querySelectorAll('[aria-invalid="true"]').forEach((el) => el.removeAttribute('aria-invalid'));
    content.querySelectorAll('#um-password-error').forEach((el) => {
      el.textContent = 'ความยาวอย่างน้อย 15 ตัวอักษร';
      el.classList.remove('text-red-600');
      el.classList.add('text-muted');
    });
    content.querySelectorAll('#um-name-error, #um-username-error').forEach((el) => {
      el.textContent = '';
      el.classList.add('hidden');
    });

    const fd = new FormData(form);
    const body = {};

    if (mode === 'create') {
      body.name = String(fd.get('name') || '').trim();
      body.username = String(fd.get('username') || '').trim();
      body.password = String(fd.get('password') || '');
      body.role = String(fd.get('role') || '');
    } else if (mode === 'edit') {
      body.name = String(fd.get('name') || '').trim();
      body.role = String(fd.get('role') || '');
    } else if (mode === 'reset') {
      body.password = String(fd.get('password') || '');
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-60');
    }

    try {
      const baseUrl = window.serviceHubUrls?.apiUsers || '/api/users';
      let endpoint, method;
      if (mode === 'create') {
        endpoint = baseUrl;
        method = 'POST';
      } else if (mode === 'edit') {
        endpoint = `${baseUrl}/${encodeURIComponent(user.id)}`;
        method = 'PUT';
      } else {
        endpoint = `${baseUrl}/${encodeURIComponent(user.id)}/reset-password`;
        method = 'POST';
      }

      await apiRequest(endpoint, { method, body });
      closeDrawer();
      toastFn(mode === 'create' ? 'สร้างผู้ใช้งานเรียบร้อยแล้ว' : mode === 'edit' ? 'บันทึกการแก้ไขแล้ว' : 'รีเซ็ตรหัสผ่านเรียบร้อยแล้ว');
      await fetchUsers(toastFn);
    } catch (error) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-60');
      }

      if (error.status === 422 && error.errors) {
        Object.entries(error.errors).forEach(([field, msgs]) => {
          const input = form.querySelector(`[name="${field}"]`);
          const msgEl = form.querySelector(`#um-${field}-error`);
          if (input) input.setAttribute('aria-invalid', 'true');
          if (msgEl) {
            msgEl.textContent = msgs[0];
            msgEl.classList.remove('hidden', 'text-muted');
            msgEl.classList.add('text-red-600');
          }
        });
        form.querySelector('[aria-invalid="true"]')?.focus();
      } else {
        errAlert.textContent = error.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล';
        errAlert.classList.remove('hidden');
      }
    }
  });

  openDrawer({
    title,
    content,
    footer,
    trigger,
    initialFocusSelector: mode === 'reset' ? '#um-new-password' : '#um-name',
  });
}

export function renderUsersView(ctx) {
  setTimeout(() => {
    fetchUsers(showToast);
    if (!umState.roles.length) fetchRoles();
  }, 0);
  return userDirectoryPage();
}
