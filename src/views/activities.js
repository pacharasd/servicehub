/**
 * src/views/activities.js
 * 9 Municipal Service Activities Views (List, Detail, Form, Delete)
 * Conforms to ADR 0007, ADR 0009 & WCAG 2.2 Level AA
 */
import { apiRequest, allPages, can, apiActivityUrl, apiReferenceUrl } from '../api.js';
import { modules, groups } from '../data.js';
import { esc, number, thaiDate } from '../utils/format.js';
import { icon } from '../utils/icons.js';
import { pageHeading, primaryButton, outlinedButton } from '../utils/layout.js';
import { showConfirmModal } from '../components/confirmModal.js';
import { showToast } from '../components/toast.js';
import { navigate } from '../router.js';
import { renderDatePresets } from '../utils/filter.js';

// Module state for activities
let activityRecords = [];
let activityReferences = {
  'cleaning-zones': [],
  'waste-types': [],
};
const loadedReferenceTypes = new Set();
const expandedFilters = new Set();
let formDraft = null;

export function getActivityRecords() {
  return activityRecords;
}

export function setActivityRecords(records) {
  activityRecords = records || [];
}

export function getActivityReferences() {
  return activityReferences;
}

export function setActivityReferences(refs) {
  activityReferences = { ...activityReferences, ...refs };
}

export function invalidateActivityReference(type) {
  loadedReferenceTypes.delete(type);
  activityReferences[type] = [];
}

async function loadActivityReferences(module) {
  const types = [...new Set(module.fields.filter((field) => field.type === 'reference').map((field) => field.reference))];
  for (const type of types) {
    if (loadedReferenceTypes.has(type) || !can(`${type}.view`)) continue;
    activityReferences[type] = await allPages(apiReferenceUrl(type));
    loadedReferenceTypes.add(type);
  }
}

export async function refreshActivityData(moduleId, params = new URLSearchParams()) {
  const module = modules.find((item) => item.id === moduleId);
  if (!module) throw new Error('Unknown activity module');
  const query = new URLSearchParams({ per_page: '6', page: String(Math.max(1, Number.parseInt(params.get('page'), 10) || 1)) });
  for (const key of ['q', 'from', 'to', 'sort', ...module.fields.filter((field) => field.type === 'reference').map((field) => field.name)]) {
    if (params.get(key)) query.set(key, params.get(key));
  }
  const result = await apiRequest(`${apiActivityUrl(moduleId)}?${query}`);
  activityRecords = Array.isArray(result.data) ? result.data : [];
  return result;
}

export function formatField(field, value, references = activityReferences) {
  if (!field) return '—';
  if (value === undefined || value === null || value === '') return '—';
  if (field.type === 'reference') {
    return esc(references[field.reference]?.find((item) => String(item.id) === String(value))?.name || 'ไม่พบข้อมูลอ้างอิง');
  }
  if (field.type === 'number' || field.type === 'integer') {
    return `${number(value)}${field.unit ? ` ${esc(field.unit)}` : ''}`;
  }
  if (field.type === 'date') return thaiDate(value);
  return esc(value);
}

export function fieldInput(field, value = '', error = '', references = activityReferences) {
  const id = `field-${field.name}`;
  const common = `id="${id}" name="${field.name}" class="field" ${field.required ? 'required' : ''} ${error ? 'aria-invalid="true"' : ''} aria-describedby="${id}-help"`;
  let input;

  if (field.type === 'textarea') {
    input = `<textarea ${common} rows="4" maxlength="10000">${esc(value)}</textarea>`;
  } else if (field.type === 'reference') {
    input = `
      <select ${common}>
        <option value="" disabled ${!value ? 'selected' : ''}>เลือก${esc(field.label)}</option>
        ${(references[field.reference] || []).filter((item) => item.is_active || String(item.id) === String(value)).map((item) => `
          <option value="${esc(item.id)}" ${String(value) === String(item.id) ? 'selected' : ''}>
            ${esc(item.name)}${item.symbol ? ` (${esc(item.symbol)})` : ''}
          </option>
        `).join('')}
      </select>
    `;
  } else if (field.type === 'select') {
    input = `
      <select ${common}>
        <option value="" disabled ${!value ? 'selected' : ''}>ระบุ${esc(field.label)}</option>
        ${(field.options || []).map((opt) => `<option value="${esc(opt)}" ${value === opt ? 'selected' : ''}>${esc(opt)}</option>`).join('')}
      </select>
    `;
  } else {
    const isNum = field.type === 'number' || field.type === 'integer';
    const step = field.type === 'number' ? (['distance_km', 'fee_amount'].includes(field.name) ? '0.01' : '0.001') : '1';
    input = `<input ${common} type="${isNum ? 'number' : field.type}" ${isNum ? `step="${step}" min="0"` : ''} ${field.type === 'text' ? `maxlength="${field.name === 'project_name' ? 500 : 255}"` : ''} value="${esc(value)}" placeholder="${field.type === 'text' ? `ระบุ${esc(field.label)}` : ''}">`;
  }

  return `
    <div class="${field.type === 'textarea' ? 'sm:col-span-2' : ''}">
      <label for="${id}" class="mb-1.5 block text-sm font-semibold text-[#41564c]">
        ${esc(field.label)} ${field.required ? '<span class="text-[#bf5b53]" aria-label="จำเป็น">*</span>' : ''}
      </label>
      ${input}
      <p id="${id}-help" class="mt-1.5 min-h-4 text-xs ${error ? 'text-[#b73c35]' : 'text-muted'}">
        ${error ? esc(error) : field.unit ? `หน่วย: ${esc(field.unit)}` : '&nbsp;'}
      </p>
    </div>
  `;
}

export function validateForm(form, module, references = activityReferences) {
  const data = Object.fromEntries(new FormData(form));
  const errors = {};

  module.fields.forEach((field) => {
    const value = String(data[field.name] ?? '').trim();
    data[field.name] = value;
    if (field.required && !value) {
      errors[field.name] = `กรุณาระบุ${field.label}`;
    } else if (value && (field.type === 'number' || field.type === 'integer')) {
      const num = Number(value);
      if (!Number.isFinite(num) || num < 0 || (field.type === 'integer' && !Number.isInteger(num))) {
        errors[field.name] = `กรุณาระบุ${field.label}เป็นจำนวนที่ถูกต้อง`;
      }
    } else if (value && field.type === 'date' && Number.isNaN(new Date(value).getTime())) {
      errors[field.name] = 'กรุณาระบุวันที่ที่ถูกต้อง';
    } else if (field.type === 'reference' && value && !references[field.reference]?.some((item) => String(item.id) === value && item.is_active)) {
      errors[field.name] = `กรุณาเลือก${field.label}จากรายการ`;
    }
  });

  return { data, errors };
}

export function listPage({ module, group, params, records = activityRecords, references = activityReferences, meta = null }) {
  const query = params.get('q') || '';
  const from = params.get('from') || '';
  const to = params.get('to') || '';
  const sort = params.get('sort') || 'newest';
  const pageSize = 6;
  const total = Math.max(0, Number(meta?.total ?? records.length) || 0);
  const pages = Math.max(1, Number(meta?.last_page) || Math.ceil(total / pageSize) || 1);
  const safePage = Math.min(pages, Math.max(1, Number(meta?.current_page ?? params.get('page')) || 1));
  const visible = records;
  const shownFields = module.fields.filter((f) => f.name !== 'service_date').slice(0, 3);

  const buildPage = (next) => {
    const nextParams = new URLSearchParams(params);
    nextParams.set('page', String(next));
    return `#/module/${module.id}?${nextParams}`;
  };

  const selectFilters = module.fields.filter((f) => f.type === 'reference').map((f) => {
    const fValue = params.get(f.name) || '';
    return `
      <div class="w-full min-w-0 sm:w-[170px]">
        <label for="${f.name}-filter" class="mb-1.5 block text-xs font-bold text-[#52665d]">${f.label}</label>
        <select id="${f.name}-filter" name="${f.name}" class="field">
          <option value="">ทั้งหมด</option>
          ${(references[f.reference] || []).map((opt) => `<option value="${esc(opt.id)}" ${fValue === String(opt.id) ? 'selected' : ''}>${esc(opt.name)}</option>`).join('')}
        </select>
      </div>
    `;
  }).join('');

  const activeAdvancedFilters = Boolean(from || to || sort !== 'newest' || module.fields.some((f) => f.type === 'reference' && params.get(f.name)));
  if (activeAdvancedFilters) expandedFilters.add(module.id);
  const filtersOpen = expandedFilters.has(module.id);

  const activeFilterLabels = [];
  if (from && to) activeFilterLabels.push(`ช่วงวันที่ ${thaiDate(from)} – ${thaiDate(to)}`);
  else if (from) activeFilterLabels.push(`ตั้งแต่วันที่ ${thaiDate(from)}`);
  else if (to) activeFilterLabels.push(`ถึงวันที่ ${thaiDate(to)}`);
  if (query) activeFilterLabels.push(`ค้นหา "${query}"`);
  module.fields.filter((f) => f.type === 'reference').forEach((f) => {
    const val = params.get(f.name);
    if (val) {
      const refItem = references[f.reference]?.find((item) => String(item.id) === String(val));
      if (refItem) activeFilterLabels.push(`${f.label}: ${refItem.name}`);
    }
  });
  const hasActiveFilters = activeFilterLabels.length > 0;

  const filterBanner = hasActiveFilters ? `
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#cfe5d6] bg-[#f0f8f3] px-4 py-3 text-xs sm:text-sm text-[#2b4c3c]" role="region" aria-label="สถานะตัวกรองข้อมูล">
      <div class="flex items-center gap-2">
        ${icon('filter', 16, 'shrink-0 text-primary')}
        <div>
          <span class="font-bold">กำลังกรองข้อมูล:</span>
          <span class="text-[#3c594b]">${esc(activeFilterLabels.join(' · '))}</span>
          <span class="ml-1 text-xs text-muted font-normal">(${total > 0 ? `พบ ${number(total)} รายการ` : 'ไม่พบรายการ'})</span>
        </div>
      </div>
      <a href="#/module/${module.id}" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#b2dac0] bg-white px-3.5 py-1.5 text-xs font-bold text-primary shadow-xs hover:bg-[#ebf5ee]">
        ${icon('close', 14)}แสดงข้อมูลทั้งหมดทุกช่วงเวลา
      </a>
    </div>
  ` : '';

  return `
    ${pageHeading(group?.label || '', module.label, `จัดการข้อมูล${module.short} ค้นหาและกรองรายการตามช่วงวันที่`, can(`${module.id}.create`) ? primaryButton('เพิ่มข้อมูล', `#/module/${module.id}/new`) : '')}
    <section aria-label="ตัวกรองรายการ" class="panel-shadow mb-5 w-full max-w-full min-w-0 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองข้อมูล</h2>
        ${renderDatePresets({ from, to, formId: 'filter-form' })}
      </div>
      <form id="filter-form" data-module="${module.id}" class="flex flex-wrap items-end gap-3">
        <div class="w-full min-w-0 sm:min-w-[180px] sm:flex-1">
          <label for="search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <div class="relative">
            ${icon('search', 18, 'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]')}
            <input id="search" name="q" class="field pl-10" type="search" placeholder="พิมพ์คำค้นหาแล้วกด Enter..." value="${esc(query)}" autocomplete="off">
          </div>
        </div>
        <button type="button" data-action="toggle-mobile-filters" data-module="${module.id}" aria-expanded="${filtersOpen}" aria-controls="advanced-filters-${module.id}" class="inline-flex min-h-11 w-full items-center justify-between rounded-xl border border-line px-4 text-sm font-semibold text-primary-dark md:hidden">
          ตัวกรองเพิ่มเติม ${icon('chevronDown', 16, filtersOpen ? 'rotate-180' : '')}
        </button>
        <div id="advanced-filters-${module.id}" class="${filtersOpen ? 'flex' : 'hidden'} w-full flex-wrap items-end gap-3 md:contents">
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label>
            <input id="date-from" class="field" type="date" name="from" value="${esc(from)}">
          </div>
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label>
            <input id="date-to" class="field" type="date" name="to" value="${esc(to)}">
          </div>
          ${selectFilters}
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="sort" class="mb-1.5 block text-xs font-bold text-[#52665d]">เรียงตาม</label>
            <select id="sort" name="sort" class="field">
              <option value="newest" ${sort === 'newest' ? 'selected' : ''}>วันที่ล่าสุด</option>
              <option value="oldest" ${sort === 'oldest' ? 'selected' : ''}>วันที่เก่าสุด</option>
            </select>
          </div>
          <div class="w-full sm:w-auto">
            <a href="#/module/${module.id}" data-action="clear-filters" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas sm:w-auto">ล้างตัวกรอง</a>
          </div>
        </div>
        <button type="submit" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark sm:w-auto">ค้นหา</button>
      </form>
    </section>

    ${filterBanner}

    <section aria-labelledby="records-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
        <div>
          <h2 id="records-title" class="text-sm font-bold">รายการข้อมูล</h2>
          <p class="mt-0.5 text-xs text-muted">พบ ${number(total)} รายการ</p>
        </div>
        <span class="rounded-full bg-[#f0f7f2] px-2.5 py-1 text-[11px] font-bold text-primary">${esc(module.short)}</span>
      </div>
      ${visible.length ? `
      <div class="data-table-scroll block overflow-x-auto w-full max-w-full min-w-0">
        <table class="w-full min-w-[650px] text-left text-sm" role="table">
          <thead class="bg-[#f9fbf9] text-xs font-semibold text-muted">
            <tr>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">วันที่ดำเนินงาน</th>
              ${shownFields.map((f) => `<th scope="col" class="px-5 py-3.5 whitespace-nowrap">${esc(f.label)}</th>`).join('')}
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">ผู้บันทึก</th>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">ดูข้อมูล</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef2ee]">
            ${visible.map((r) => `
              <tr class="transition hover:bg-[#fafcfa]">
                <td class="whitespace-nowrap px-5 py-3.5 font-semibold text-ink">${thaiDate(r.service_date)}</td>
                ${shownFields.map((f) => `<td class="max-w-[240px] truncate px-5 py-3.5 text-[#53675e]">${formatField(f, r[f.name], references)}</td>`).join('')}
                <td class="whitespace-nowrap px-5 py-3.5 text-muted">${esc(r.created_by)}</td>
                <td class="whitespace-nowrap px-5 py-3.5 text-right">
                  <a href="#/module/${module.id}/${encodeURIComponent(r.id)}" class="inline-flex items-center gap-1 font-bold text-primary hover:underline">
                    รายละเอียด ${icon('arrow', 15)}
                  </a>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-xs text-muted sm:px-6 sm:py-4">
        <span>แสดง ${number((safePage - 1) * pageSize + 1)}–${number(Math.min(safePage * pageSize, total))} จาก ${number(total)} รายการ</span>
        <div class="flex items-center gap-2">
          <a href="${buildPage(Math.max(1, safePage - 1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${safePage === 1 ? 'pointer-events-none opacity-45' : 'hover:bg-canvas'}" ${safePage === 1 ? 'aria-disabled="true" tabindex="-1"' : ''}>ก่อนหน้า</a>
          <span class="px-1 font-bold text-ink">${safePage} / ${pages}</span>
          <a href="${buildPage(Math.min(pages, safePage + 1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${safePage === pages ? 'pointer-events-none opacity-45' : 'hover:bg-canvas'}" ${safePage === pages ? 'aria-disabled="true" tabindex="-1"' : ''}>ถัดไป</a>
        </div>
      </div>` : `
      <div class="flex flex-col items-center px-6 py-14 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${hasActiveFilters ? 'bg-[#fef5e7] text-[#c2782b]' : 'bg-[#f1f7f2] text-primary'}">${icon('empty', 27)}</div>
        <h3 class="text-base font-bold text-ink">${hasActiveFilters ? 'ไม่พบรายการข้อมูลตามเงื่อนไขที่เลือก' : 'ยังไม่มีข้อมูลในหมวดนี้'}</h3>
        <p class="mt-2 max-w-md text-sm leading-relaxed text-muted">
          ${hasActiveFilters
            ? `ไม่มีการบันทึกงานบริการ${esc(module.short)}${from && to ? ` ระหว่างวันที่ ${thaiDate(from)} ถึง ${thaiDate(to)}` : ''} คุณสามารถคลิกปุ่มด้านล่างเพื่อดูข้อมูลทั้งหมดในอดีต หรือเลือกช่วงเวลาอื่น`
            : `เริ่มต้นด้วยการเพิ่มรายการข้อมูลการดำเนินงานในหมวด${esc(module.short)}`}
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          ${hasActiveFilters ? `
            <a href="#/module/${module.id}" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-sm hover:bg-primary-dark">
              ${icon('grid', 16)}แสดงข้อมูลทั้งหมดทุกช่วงเวลา
            </a>
          ` : ''}
          ${can(`${module.id}.create`) ? `
            <a href="#/module/${module.id}/new" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl ${hasActiveFilters ? 'border border-line bg-white text-ink hover:bg-canvas' : 'bg-primary text-white hover:bg-primary-dark'} px-5 text-sm font-bold">
              ${icon('plus', 16)}เพิ่มข้อมูลใหม่
            </a>
          ` : ''}
        </div>
      </div>`}
    </section>
  `;
}

export function detailPage({ module, group, record, references = activityReferences }) {
  return `
    ${pageHeading(group?.label || '', 'รายละเอียดข้อมูล', `ข้อมูล${module.short} วันที่ ${thaiDate(record.service_date)}`, `
      <div class="flex flex-wrap gap-2">
        ${can(`${module.id}.update`) ? outlinedButton('แก้ไข', `#/module/${module.id}/${encodeURIComponent(record.id)}/edit`, 'edit') : ''}
        ${can(`${module.id}.delete`) ? `
          <button type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#eed8d5] bg-white px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-activity" data-module="${module.id}" data-id="${esc(record.id)}">
            ${icon('trash', 17)}ลบรายการ
          </button>` : ''}
      </div>
    `)}
    <div class="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
      <section class="panel-shadow rounded-2xl border border-line bg-white">
        <div class="border-b border-line px-5 py-5 sm:px-7">
          <h2 class="font-bold">ข้อมูลการดำเนินงาน</h2>
        </div>
        <dl class="grid min-w-0 grid-cols-1 gap-x-8 gap-y-0 p-5 sm:grid-cols-2 sm:p-7">
          ${module.fields.map((f) => `
            <div class="border-b border-[#edf1ed] py-4">
              <dt class="text-xs font-semibold text-muted">${esc(f.label)}</dt>
              <dd class="mt-1.5 break-words text-sm font-bold text-ink">${formatField(f, record[f.name], references)}</dd>
            </div>
          `).join('')}
        </dl>
      </section>
      <aside class="h-fit rounded-2xl border border-line bg-white p-5">
        <h2 class="text-sm font-bold">ประวัติรายการ</h2>
        <div class="mt-5 space-y-5 border-l-2 border-[#d8eadf] pl-4">
          <div>
            <p class="text-xs font-bold text-primary">บันทึกข้อมูล</p>
            <p class="mt-1 text-xs text-muted">${esc(record.created_by || 'ไม่ระบุ')}</p>
            <p class="mt-0.5 text-xs text-muted">${thaiDate(record.created_at)}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-primary">แก้ไขล่าสุด</p>
            <p class="mt-1 text-xs text-muted">${esc(record.updated_by || 'ไม่ระบุ')}</p>
            <p class="mt-0.5 text-xs text-muted">${thaiDate(record.updated_at)}</p>
          </div>
        </div>
        <div class="mt-5 rounded-xl bg-[#f4f8f4] p-3 text-[11px] leading-relaxed text-muted">
          การเปลี่ยนแปลงถูกบันทึกใน Audit Log ของระบบ
        </div>
      </aside>
    </div>
  `;
}

export function formPage({ module, group, record = null, errors = {}, values = null, references = activityReferences }) {
  const editing = Boolean(record);
  const data = { ...(values || formDraft || record || {}) };
  if (!editing && !data.service_date) {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    data.service_date = `${y}-${m}-${d}`;
  }
  const title = `${editing ? 'แก้ไข' : 'เพิ่ม'}ข้อมูล${module.short}`;

  return `
    ${pageHeading(group?.label || '', title, editing ? 'ตรวจสอบและแก้ไขรายละเอียดรายการนี้' : 'กรอกข้อมูลการดำเนินงานให้ครบตามช่องที่กำหนด')}
    <section class="panel-shadow w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-5 py-5 sm:px-7">
        <h2 class="font-bold">รายละเอียดการดำเนินงาน</h2>
        <p class="mt-1 text-xs text-muted">ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p>
      </div>
      <form id="record-form" data-module="${module.id}" data-id="${record ? esc(record.id) : ''}" novalidate class="p-5 sm:p-7">
        <div class="grid min-w-0 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          ${module.fields.map((f) => fieldInput(f, data[f.name] ?? '', errors[f.name], references)).join('')}
        </div>
        <div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <a href="${record ? `#/module/${module.id}/${encodeURIComponent(record.id)}` : `#/module/${module.id}`}" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold text-[#566a60] hover:bg-canvas">
            ยกเลิก
          </a>
          <button type="submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">
            ${icon('check', 18)}${editing ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล'}
          </button>
        </div>
      </form>
    </section>
  `;
}

export async function deleteActivity(moduleId, recordId, { navigate: nav = navigate, showToast: toastFn = showToast } = {}) {
  const confirmed = await showConfirmModal({
    title: 'ยืนยันการลบรายการ',
    message: 'รายการนี้จะถูกลบออกจากฐานข้อมูลอย่างถาวร คุณต้องการดำเนินการต่อหรือไม่?',
    confirmText: 'ลบรายการ',
    variant: 'danger',
    iconName: 'trash',
  });

  if (!confirmed) return;

  try {
    const url = `${apiActivityUrl(moduleId)}/${recordId}`;
    await apiRequest(url, { method: 'DELETE' });
    toastFn('ลบรายการเรียบร้อยแล้ว');
    nav(`/module/${moduleId}`);
  } catch (error) {
    toastFn(error.message || 'ไม่สามารถลบรายการได้', 'error');
  }
}

export async function submitActivity(form) {
  const moduleId = form.dataset.module;
  const module = modules.find((m) => m.id === moduleId);
  if (!module) return;

  const { data, errors } = validateForm(form, module, activityReferences);
  const existing = form.dataset.id ? { id: form.dataset.id } : null;

  if (Object.keys(errors).length) {
    formDraft = data;
    const group = groups.find((g) => g.id === module.group);
    const content = formPage({ module, group, record: existing, errors, values: data, references: activityReferences });
    const mainEl = document.querySelector('#main-content');
    if (mainEl) mainEl.innerHTML = content;
    document.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  try {
    const url = existing ? `${apiActivityUrl(module.id)}/${existing.id}` : apiActivityUrl(module.id);
    const method = existing ? 'PUT' : 'POST';
    const response = await apiRequest(url, { method, body: data });
    formDraft = null;
    navigate(`/module/${module.id}/${response.data.id}`);
    showToast('บันทึกข้อมูลแล้ว');
  } catch (error) {
    formDraft = data;
    const fieldErrors = error.fieldErrors || Object.fromEntries(Object.entries(error.fields || {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]));
    showToast(error.message || 'ไม่สามารถบันทึกข้อมูลได้', 'error');
    const group = groups.find((g) => g.id === module.group);
    const content = formPage({ module, group, record: existing, errors: fieldErrors, values: data, references: activityReferences });
    const mainEl = document.querySelector('#main-content');
    if (mainEl) mainEl.innerHTML = content;
    document.querySelector('[aria-invalid="true"]')?.focus();
  }
}

export async function renderActivitiesView(ctx) {
  const moduleId = ctx.parts[1];
  const module = modules.find((m) => m.id === moduleId);
  if (!module) {
    return `<div class="p-8 text-center text-muted">ไม่พบข้อมูลโมดูลงานบริการ</div>`;
  }
  const group = groups.find((g) => g.id === module.group);

  if (ctx.parts.length === 2) {
    const [result] = await Promise.all([refreshActivityData(moduleId, ctx.params), loadActivityReferences(module)]);
    if (!ctx.isCurrent()) return null;
    const requestedPage = Math.max(1, Number.parseInt(ctx.params.get('page'), 10) || 1);
    const lastPage = Math.max(1, Number(result.meta?.last_page) || 1);
    if (Number(result.meta?.total) > 0 && requestedPage > lastPage) {
      const nextParams = new URLSearchParams(ctx.params);
      nextParams.set('page', String(lastPage));
      navigate(`/module/${moduleId}?${nextParams}`);
      return null;
    }
    return listPage({ module, group, params: ctx.params, records: result.data, references: activityReferences, meta: result.meta });
  }

  if (ctx.parts.length === 3 && ctx.parts[2] === 'new') {
    if (!can(`${module.id}.create`)) {
      return `<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์สร้างข้อมูลในหมวดนี้</div>`;
    }
    await loadActivityReferences(module);
    return formPage({ module, group, record: null, references: activityReferences });
  }

  const recordId = decodeURIComponent(ctx.parts[2] || '');
  let result;
  try {
    [result] = await Promise.all([apiRequest(`${apiActivityUrl(moduleId)}/${encodeURIComponent(recordId)}`), loadActivityReferences(module)]);
  } catch (error) {
    if (error.status === 404) return `<div class="p-8 text-center text-muted">ไม่พบรายการข้อมูลที่ต้องการ</div>`;
    throw error;
  }
  if (!ctx.isCurrent()) return null;
  const record = result.data;

  if (ctx.parts.length === 4 && ctx.parts[3] === 'edit') {
    if (!can(`${module.id}.update`)) {
      return `<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์แก้ไขข้อมูลในหมวดนี้</div>`;
    }
    return formPage({ module, group, record, references: activityReferences });
  }

  return detailPage({ module, group, record, references: activityReferences });
}
