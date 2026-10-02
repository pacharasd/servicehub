/**
 * src/views/auditLogs.js
 * Audit Logs View
 * Conforms to ADR 0007, ADR 0009 & WCAG 2.2 Level AA
 */
import { apiRequest, can } from '../api.js';
import { esc, thaiDate } from '../utils/format.js';
import { pageHeading, outlinedButton } from '../utils/layout.js';
import { renderDatePresets } from '../utils/filter.js';

let auditRows = [];
let auditMeta = { current_page: 1, last_page: 1 };

export function auditPage({ params, auditRows: rows = auditRows, auditMeta: meta = auditMeta }) {
  if (!can('audit-logs.view')) {
    return `
      <div class="panel-shadow mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-white p-10 text-center">
        <h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึง</h1>
        <p class="mt-2 text-sm text-muted">คุณไม่มีสิทธิ์ในการดูประวัติการแก้ไขข้อมูลของระบบ</p>
      </div>
    `;
  }

  const q = params.get('q') || '';
  const action = params.get('action') || 'all';
  const from = params.get('from') || '';
  const to = params.get('to') || '';

  const pageHref = (page) => {
    const next = new URLSearchParams();
    if (q) next.set('q', q);
    if (action !== 'all') next.set('action', action);
    if (from) next.set('from', from);
    if (to) next.set('to', to);
    next.set('page', String(page));
    return `#/audit-logs?${next}`;
  };

  const isFiltered = Boolean(q || action !== 'all' || from || to);

  return `
    ${pageHeading('การจัดการระบบ', 'ประวัติการแก้ไข', 'บันทึกการเพิ่ม แก้ไข และลบข้อมูลการปฏิบัติงานในระบบ')}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 mb-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองประวัติ</h2>
        ${renderDatePresets({ from, to, formId: 'audit-filter' })}
      </div>
      <form id="audit-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.2fr)_150px_140px_140px_auto_auto] sm:items-end">
        <div>
          <label for="audit-q" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <input id="audit-q" class="field" name="q" value="${esc(q)}" placeholder="พิมพ์ค้นหาคำ หรือชื่อผู้ใช้..." data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="audit-action" class="mb-1.5 block text-xs font-bold text-[#52665d]">การกระทำ</label>
          <select id="audit-action" name="action" class="field master-native-select" data-action="live-filter">
            <option value="all" ${action === 'all' ? 'selected' : ''}>ทุกการกระทำ</option>
            <option value="created" ${action === 'created' ? 'selected' : ''}>สร้างข้อมูล (create)</option>
            <option value="updated" ${action === 'updated' ? 'selected' : ''}>แก้ไขข้อมูล (update)</option>
            <option value="deleted" ${action === 'deleted' ? 'selected' : ''}>ลบข้อมูล (delete)</option>
            <option value="auth" ${action === 'auth' ? 'selected' : ''}>เข้าสู่ระบบ (auth)</option>
          </select>
        </div>
        <div>
          <label for="audit-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label>
          <input id="audit-from" class="field" type="date" name="from" value="${esc(from)}" data-action="live-filter">
        </div>
        <div>
          <label for="audit-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label>
          <input id="audit-to" class="field" type="date" name="to" value="${esc(to)}" data-action="live-filter">
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        ${isFiltered ? `<a href="#/audit-logs" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>` : ''}
      </form>
      <div class="mt-4 divide-y divide-line">
        ${rows.length ? rows.map((item) => `
          <div class="grid gap-2 py-3.5 text-sm sm:grid-cols-4 items-center">
            <strong class="font-bold text-primary-dark">${esc(item.action)}</strong>
            <span class="text-muted font-mono text-xs">${esc(item.subject_type || '')} #${esc(item.subject_id || '')}</span>
            <span class="text-ink font-medium">${esc(item.actor_username || 'ระบบ')}</span>
            <time class="text-xs text-muted" datetime="${esc(item.created_at)}">${thaiDate(item.created_at)}</time>
          </div>
        `).join('') : '<p class="py-8 text-center text-sm text-muted">ไม่มีประวัติการแก้ไขที่ตรงกับเงื่อนไข</p>'}
      </div>
      ${meta.last_page > 1 ? `
      <div class="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>หน้า ${meta.current_page} / ${meta.last_page}</span>
        <div class="flex gap-2">
          ${meta.current_page > 1 ? outlinedButton('ก่อนหน้า', pageHref(meta.current_page - 1)) : ''}
          ${meta.current_page < meta.last_page ? outlinedButton('ถัดไป', pageHref(meta.current_page + 1)) : ''}
        </div>
      </div>` : ''}
    </section>
  `;
}

export async function fetchAuditLogs(params = new URLSearchParams()) {
  if (!can('audit-logs.view')) return { data: [], meta: { current_page: 1, last_page: 1 } };
  try {
    const baseUrl = window.serviceHubUrls?.apiAudit || '/api/audit-logs';
    const result = await apiRequest(`${baseUrl}?${params.toString()}`);
    auditRows = result.data ?? [];
    auditMeta = result.meta ?? { current_page: 1, last_page: 1 };
    return {
      data: auditRows,
      meta: auditMeta,
    };
  } catch (error) {
    throw error;
  }
}

export async function renderAuditLogsView(ctx) {
  try {
    await fetchAuditLogs(ctx.params);
  } catch (err) {
    console.error('Error fetching audit logs:', err);
  }
  return auditPage({ params: ctx.params, auditRows, auditMeta });
}
