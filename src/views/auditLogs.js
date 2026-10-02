/**
 * src/views/auditLogs.js
 * Audit Logs View
 * Conforms to ADR 0007, ADR 0009 & WCAG 2.2 Level AA
 */
import { apiRequest, can } from '../api.js';
import { esc, thaiDate } from '../utils/format.js';
import { pageHeading, outlinedButton } from '../utils/layout.js';

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

  const pageHref = (page) => {
    const q = params.get('q') || '';
    return `#/audit-logs?${new URLSearchParams({ q, page: String(page) })}`;
  };

  return `
    ${pageHeading('การจัดการระบบ', 'ประวัติการแก้ไข', 'บันทึกการเพิ่ม แก้ไข และลบข้อมูลการปฏิบัติงานในระบบ')}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5">
      <form id="audit-filter" class="flex gap-2">
        <label class="sr-only" for="audit-q">ค้นหา</label>
        <input id="audit-q" class="field min-w-0 flex-1" name="q" value="${esc(params.get('q') || '')}" placeholder="ค้นหาการกระทำ หมวด หรือชื่อผู้ใช้">
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
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
