/**
 * src/views/references.js
 * Reference Master Views: Cleaning Zones and Waste Types
 * Conforms to ADR 0007, ADR 0009 & WCAG 2.2 Level AA
 */
import { apiRequest, allPages, can, apiReferenceUrl } from '../api.js';
import { esc, number } from '../utils/format.js';
import { icon } from '../utils/icons.js';
import { pageHeading, primaryButton, outlinedButton } from '../utils/layout.js';
import { showConfirmModal } from '../components/confirmModal.js';
import { showToast } from '../components/toast.js';
import { navigate } from '../router.js';
import { getActivityRecords, refreshActivityData } from './activities.js';

let zonesData = [];
let wasteTypesData = [];
let isRefLoaded = false;

export async function refreshReferenceData() {
  const [zones, wastes] = await Promise.all([
    can('cleaning-zones.view') ? allPages(apiReferenceUrl('cleaning-zones')) : Promise.resolve([]),
    can('waste-types.view') ? allPages(apiReferenceUrl('waste-types')) : Promise.resolve([]),
  ]);
  zonesData = zones || [];
  wasteTypesData = wastes || [];
  isRefLoaded = true;
}

export function zoneUsage(name, records = getActivityRecords()) {
  return records.filter((r) => r.module === 'road-washings' && r.cleaning_zone === name).length;
}

export function wasteTypeUsage(name, records = getActivityRecords()) {
  return records.filter((r) => r.module === 'waste-collections' && r.waste_type === name).length;
}

export function zoneListPage({ params, zones = zonesData, records = getActivityRecords() }) {
  const query = (params.get('q') || '').trim().toLocaleLowerCase('th-TH');
  const sort = params.get('sort') === 'name' ? 'name' : 'code';
  const status = params.get('status') || 'all';
  const pageSize = 10;
  const rows = zones
    .filter((z) => !query || (z.code + ' ' + z.name).toLocaleLowerCase('th-TH').includes(query))
    .filter((z) => status === 'all' ? true : (status === 'active' ? z.is_active : !z.is_active))
    .sort((a, b) => String(a[sort]).localeCompare(String(b[sort]), 'th', { numeric: true }));

  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const page = Math.min(pages, Math.max(1, Number.parseInt(params.get('page'), 10) || 1));
  const visible = rows.slice((page - 1) * pageSize, page * pageSize);

  const pageHref = (target) => {
    const next = new URLSearchParams();
    if (params.get('q')) next.set('q', params.get('q'));
    if (status !== 'all') next.set('status', status);
    if (sort !== 'code') next.set('sort', sort);
    if (target > 1) next.set('page', String(target));
    return '#/cleaning-zones' + (next.size ? '?' + next : '');
  };

  return `
    ${pageHeading('ข้อมูลพื้นฐาน', 'เขตรักษาความสะอาด', 'จัดการรหัสและชื่อเขตสำหรับรายการล้างทำความสะอาดถนน', primaryButton('เพิ่มเขต', '#/cleaning-zones/new'))}
    <section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6">
      <form id="zone-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_160px_160px_auto_auto] sm:items-end">
        <div>
          <label for="zone-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label>
          <input id="zone-search" name="q" type="search" class="field" placeholder="พิมพ์ค้นหาทันที..." value="${esc(params.get('q') || '')}" data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="zone-status" class="mb-1.5 block text-sm font-semibold">สถานะ</label>
          <select id="zone-status" name="status" class="field master-native-select" data-action="live-filter">
            <option value="all" ${status === 'all' ? 'selected' : ''}>ทุกสถานะ</option>
            <option value="active" ${status === 'active' ? 'selected' : ''}>ใช้งานอยู่</option>
            <option value="inactive" ${status === 'inactive' ? 'selected' : ''}>ระงับแล้ว</option>
          </select>
        </div>
        <div>
          <label for="zone-sort" class="mb-1.5 block text-sm font-semibold">เรียงตาม</label>
          <select id="zone-sort" name="sort" class="field master-native-select" data-action="live-filter">
            <option value="code" ${sort === 'code' ? 'selected' : ''}>รหัสเขต</option>
            <option value="name" ${sort === 'name' ? 'selected' : ''}>ชื่อเขต</option>
          </select>
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        <a href="#/cleaning-zones" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>
      </form>
    </section>

    <section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-4 py-4 sm:px-6">
        <h2 class="text-sm font-bold">รายการเขต</h2>
        <p class="mt-1 text-xs text-muted">พบ ${number(rows.length)} รายการ</p>
      </div>
      ${visible.length ? `
      <div class="divide-y divide-[#edf1ed]">
        ${visible.map((z) => `
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/cleaning-zones/${encodeURIComponent(z.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${esc(z.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${esc(z.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานล้างถนน ${number(zoneUsage(z.name, records))} รายการ</span>
            ${icon('chevron', 16, 'shrink-0 text-muted')}
          </a>
        `).join('')}
      </div>` : `
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบเขตรักษาความสะอาด</h3>
        <p class="mt-2 text-sm text-muted">${query ? 'ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด' : 'เริ่มต้นด้วยการเพิ่มเขต'}</p>
        <div class="mt-5">${query ? outlinedButton('แสดงทั้งหมด', '#/cleaning-zones') : primaryButton('เพิ่มเขต', '#/cleaning-zones/new')}</div>
      </div>`}
      ${rows.length ? `
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${number((page - 1) * pageSize + 1)}–${number(Math.min(page * pageSize, rows.length))} จาก ${number(rows.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${page === 1 ? 'pointer-events-none opacity-45' : ''}" href="${pageHref(page - 1)}" ${page === 1 ? 'aria-disabled="true" tabindex="-1"' : ''}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${page} / ${pages}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${page === pages ? 'pointer-events-none opacity-45' : ''}" href="${pageHref(page + 1)}" ${page === pages ? 'aria-disabled="true" tabindex="-1"' : ''}>ถัดไป</a>
        </div>
      </div>` : ''}
    </section>
  `;
}

export function zoneDetailPage({ zone, records = getActivityRecords() }) {
  const usage = zoneUsage(zone.name, records);
  return `
    ${pageHeading('ข้อมูลพื้นฐาน', zone.name, 'รายละเอียดเขตรักษาความสะอาด', `
      <div class="flex flex-wrap gap-2">
        ${outlinedButton('แก้ไข', `#/cleaning-zones/${encodeURIComponent(zone.id)}/edit`, 'edit')}
        <button type="button" class="min-h-11 rounded-xl border border-[#eed8d5] px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-reference" data-type="cleaning-zones" data-id="${esc(zone.id)}" data-name="${esc(zone.name)}" data-usage="${usage}">
          ${icon('trash', 17)} ลบเขต
        </button>
      </div>
    `)}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7">
      <h2 class="text-base font-bold">ข้อมูลเขต</h2>
      <dl class="mt-4 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <dt class="text-xs font-semibold text-muted">รหัสเขต</dt>
          <dd class="mt-1 break-words font-bold">${esc(zone.code)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-muted">ชื่อเขต</dt>
          <dd class="mt-1 break-words font-bold">${esc(zone.name)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-muted">รายการล้างถนนที่ใช้เขตนี้</dt>
          <dd class="mt-1 font-bold">${number(usage)} รายการ</dd>
        </div>
      </dl>
      ${usage ? `<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">เขตนี้ถูกใช้ในรายการล้างถนน ต้องเปลี่ยนเขตในรายการเหล่านั้นก่อนจึงจะลบได้</p>` : ''}
    </section>
  `;
}

export function zoneFormPage(zone = null, errors = {}, values = zone || {}) {
  const editing = Boolean(zone);
  const title = editing ? 'แก้ไขเขตรักษาความสะอาด' : 'เพิ่มเขตรักษาความสะอาด';
  const input = (name, label, limit) => `
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="zone-${name}">
        ${esc(label)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="zone-${name}" name="${name}" type="text" maxlength="${limit}" required value="${esc(values[name] || '')}" aria-describedby="zone-${name}-error" ${errors[name] ? 'aria-invalid="true"' : ''}>
      <p id="zone-${name}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${esc(errors[name] || '')}</p>
    </div>
  `;

  return `
    ${pageHeading('ข้อมูลพื้นฐาน', title, 'กรอกรหัสและชื่อเขตเพื่อใช้ในฟอร์มล้างทำความสะอาดถนน')}
    <section class="panel-shadow max-w-2xl rounded-2xl border border-line bg-white p-5 sm:p-7">
      <form id="zone-form" data-id="${esc(zone?.id || '')}" novalidate>
        <div class="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
          ${input('code', 'รหัสเขต', 50)}
          ${input('name', 'ชื่อเขต', 255)}
        </div>
        <div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <a class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold" href="${zone ? `#/cleaning-zones/${encodeURIComponent(zone.id)}` : '#/cleaning-zones'}">
            ยกเลิก
          </a>
          <button type="submit" class="min-h-11 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </section>
  `;
}

export function wasteTypeListPage({ params, wasteTypes = wasteTypesData, records = getActivityRecords() }) {
  const query = (params.get('q') || '').trim().toLocaleLowerCase('th-TH');
  const sort = params.get('sort') === 'name' ? 'name' : 'code';
  const status = params.get('status') || 'all';
  const pageSize = 10;
  const rows = wasteTypes
    .filter((w) => !query || (w.code + ' ' + w.name).toLocaleLowerCase('th-TH').includes(query))
    .filter((w) => status === 'all' ? true : (status === 'active' ? w.is_active : !w.is_active))
    .sort((a, b) => String(a[sort]).localeCompare(String(b[sort]), 'th', { numeric: true }));

  const pages = Math.max(1, Math.ceil(rows.length / pageSize));
  const page = Math.min(pages, Math.max(1, Number.parseInt(params.get('page'), 10) || 1));
  const visible = rows.slice((page - 1) * pageSize, page * pageSize);

  const pageHref = (target) => {
    const next = new URLSearchParams();
    if (params.get('q')) next.set('q', params.get('q'));
    if (status !== 'all') next.set('status', status);
    if (sort !== 'code') next.set('sort', sort);
    if (target > 1) next.set('page', String(target));
    return '#/waste-types' + (next.size ? '?' + next : '');
  };

  return `
    ${pageHeading('ข้อมูลพื้นฐาน', 'ประเภทขยะมูลฝอย', 'จัดการรหัสและชื่อประเภทสำหรับรายการมูลฝอย', primaryButton('เพิ่มประเภท', '#/waste-types/new'))}
    <section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6">
      <form id="wasteType-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_160px_160px_auto_auto] sm:items-end">
        <div>
          <label for="wasteType-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label>
          <input id="wasteType-search" name="q" type="search" class="field" placeholder="พิมพ์ค้นหาทันที..." value="${esc(params.get('q') || '')}" data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="wasteType-status" class="mb-1.5 block text-sm font-semibold">สถานะ</label>
          <select id="wasteType-status" name="status" class="field master-native-select" data-action="live-filter">
            <option value="all" ${status === 'all' ? 'selected' : ''}>ทุกสถานะ</option>
            <option value="active" ${status === 'active' ? 'selected' : ''}>ใช้งานอยู่</option>
            <option value="inactive" ${status === 'inactive' ? 'selected' : ''}>ระงับแล้ว</option>
          </select>
        </div>
        <div>
          <label for="wasteType-sort" class="mb-1.5 block text-sm font-semibold">เรียงตาม</label>
          <select id="wasteType-sort" name="sort" class="field master-native-select" data-action="live-filter">
            <option value="code" ${sort === 'code' ? 'selected' : ''}>รหัสประเภท</option>
            <option value="name" ${sort === 'name' ? 'selected' : ''}>ชื่อประเภท</option>
          </select>
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        <a href="#/waste-types" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>
      </form>
    </section>

    <section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-4 py-4 sm:px-6">
        <h2 class="text-sm font-bold">รายการประเภท</h2>
        <p class="mt-1 text-xs text-muted">พบ ${number(rows.length)} รายการ</p>
      </div>
      ${visible.length ? `
      <div class="divide-y divide-[#edf1ed]">
        ${visible.map((w) => `
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/waste-types/${encodeURIComponent(w.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${esc(w.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${esc(w.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานบริหารจัดการมูลฝอย ${number(wasteTypeUsage(w.name, records))} รายการ</span>
            ${icon('chevron', 16, 'shrink-0 text-muted')}
          </a>
        `).join('')}
      </div>` : `
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบประเภทขยะมูลฝอย</h3>
        <p class="mt-2 text-sm text-muted">${query ? 'ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด' : 'เริ่มต้นด้วยการเพิ่มประเภท'}</p>
        <div class="mt-5">${query ? outlinedButton('แสดงทั้งหมด', '#/waste-types') : primaryButton('เพิ่มประเภท', '#/waste-types/new')}</div>
      </div>`}
      ${rows.length ? `
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${number((page - 1) * pageSize + 1)}–${number(Math.min(page * pageSize, rows.length))} จาก ${number(rows.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${page === 1 ? 'pointer-events-none opacity-45' : ''}" href="${pageHref(page - 1)}" ${page === 1 ? 'aria-disabled="true" tabindex="-1"' : ''}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${page} / ${pages}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${page === pages ? 'pointer-events-none opacity-45' : ''}" href="${pageHref(page + 1)}" ${page === pages ? 'aria-disabled="true" tabindex="-1"' : ''}>ถัดไป</a>
        </div>
      </div>` : ''}
    </section>
  `;
}

export function wasteTypeDetailPage({ wasteType, records = getActivityRecords() }) {
  const usage = wasteTypeUsage(wasteType.name, records);
  return `
    ${pageHeading('ข้อมูลพื้นฐาน', wasteType.name, 'รายละเอียดประเภทขยะมูลฝอย', `
      <div class="flex flex-wrap gap-2">
        ${outlinedButton('แก้ไข', `#/waste-types/${encodeURIComponent(wasteType.id)}/edit`, 'edit')}
        <button type="button" class="min-h-11 rounded-xl border border-[#eed8d5] px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-reference" data-type="waste-types" data-id="${esc(wasteType.id)}" data-name="${esc(wasteType.name)}" data-usage="${usage}">
          ${icon('trash', 17)} ลบประเภท
        </button>
      </div>
    `)}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7">
      <h2 class="text-base font-bold">ข้อมูลประเภท</h2>
      <dl class="mt-4 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <dt class="text-xs font-semibold text-muted">รหัสประเภท</dt>
          <dd class="mt-1 break-words font-bold">${esc(wasteType.code)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-muted">ชื่อประเภท</dt>
          <dd class="mt-1 break-words font-bold">${esc(wasteType.name)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-muted">รายการมูลฝอยที่ใช้ประเภทนี้</dt>
          <dd class="mt-1 font-bold">${number(usage)} รายการ</dd>
        </div>
      </dl>
      ${usage ? `<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">ประเภทนี้ถูกใช้ในรายการมูลฝอย ต้องเปลี่ยนประเภทในรายการเหล่านั้นก่อนจึงจะลบได้</p>` : ''}
    </section>
  `;
}

export function wasteTypeFormPage(wasteType = null, errors = {}, values = wasteType || {}) {
  const editing = Boolean(wasteType);
  const title = editing ? 'แก้ไขประเภทขยะมูลฝอย' : 'เพิ่มประเภทขยะมูลฝอย';
  const input = (name, label, limit) => `
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="wasteType-${name}">
        ${esc(label)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="wasteType-${name}" name="${name}" type="text" maxlength="${limit}" required value="${esc(values[name] || '')}" aria-describedby="wasteType-${name}-error" ${errors[name] ? 'aria-invalid="true"' : ''}>
      <p id="wasteType-${name}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${esc(errors[name] || '')}</p>
    </div>
  `;

  return `
    ${pageHeading('ข้อมูลพื้นฐาน', title, 'กรอกรหัสและชื่อประเภทเพื่อใช้ในฟอร์มงานบริหารจัดการมูลฝอย')}
    <section class="panel-shadow max-w-2xl rounded-2xl border border-line bg-white p-5 sm:p-7">
      <form id="wasteType-form" data-id="${esc(wasteType?.id || '')}" novalidate>
        <div class="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
          ${input('code', 'รหัสประเภท', 50)}
          ${input('name', 'ชื่อประเภท', 255)}
        </div>
        <div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <a class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold" href="${wasteType ? `#/waste-types/${encodeURIComponent(wasteType.id)}` : '#/waste-types'}">
            ยกเลิก
          </a>
          <button type="submit" class="min-h-11 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </section>
  `;
}

export async function deleteReference(type, id, name, usage, { navigate: nav = navigate, showToast: toastFn = showToast, refreshData = refreshReferenceData } = {}) {
  if (usage > 0) {
    toastFn(`ไม่สามารถลบ "${name}" ได้เนื่องจากมีข้อมูลงานบริการที่อ้างอิงอยู่`, 'error');
    return;
  }

  const noun = type === 'cleaning-zones' ? 'เขต' : 'ประเภทขยะ';
  const confirmed = await showConfirmModal({
    title: `ยืนยันการลบ${noun}`,
    message: `คุณต้องการลบ "${name}" ออกจากระบบใช่หรือไม่?`,
    confirmText: `ลบ${noun}`,
    variant: 'danger',
    iconName: 'trash',
  });

  if (!confirmed) return;

  try {
    const url = `${apiReferenceUrl(type)}/${id}`;
    await apiRequest(url, { method: 'DELETE' });
    toastFn(`ลบ${noun}เรียบร้อยแล้ว`);
    await refreshData();
    await refreshActivityData();
    nav(`/${type}`);
  } catch (error) {
    toastFn(error.message || `ไม่สามารถลบ${noun}ได้`, 'error');
  }
}

export async function submitReference(form, type) {
  const id = form.dataset.id;
  const data = Object.fromEntries(new FormData(form));
  data.is_active = form.elements.namedItem('is_active')?.checked ?? true;

  try {
    const url = `${apiReferenceUrl(type)}${id ? `/${id}` : ''}`;
    const response = await apiRequest(url, { method: id ? 'PUT' : 'POST', body: data });
    await refreshReferenceData();
    await refreshActivityData();
    navigate(`/${type}/${response.data.id}`);
    showToast('บันทึกข้อมูลแล้ว');
  } catch (error) {
    showToast(error.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'error');
    const fields = error.fieldErrors || Object.fromEntries(Object.entries(error.fields || {}).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v]));
    const list = type === 'cleaning-zones' ? zonesData : wasteTypesData;
    const existing = list.find((item) => String(item.id) === id) || null;
    const content = type === 'cleaning-zones'
      ? zoneFormPage(existing, fields, data)
      : wasteTypeFormPage(existing, fields, data);
    const mainEl = document.querySelector('#main-content');
    if (mainEl) mainEl.innerHTML = content;
  }
}

export async function renderReferencesView(type, ctx) {
  if (!isRefLoaded) {
    await refreshReferenceData();
  }

  const isZone = type === 'cleaning-zones';
  const list = isZone ? zonesData : wasteTypesData;

  if (ctx.parts.length === 1) {
    return isZone
      ? zoneListPage({ params: ctx.params, zones: zonesData })
      : wasteTypeListPage({ params: ctx.params, wasteTypes: wasteTypesData });
  }

  if (ctx.parts.length === 2 && ctx.parts[1] === 'new') {
    return isZone ? zoneFormPage() : wasteTypeFormPage();
  }

  const refId = decodeURIComponent(ctx.parts[1] || '');
  const item = list.find((it) => String(it.id) === refId);

  if (!item) {
    return `<div class="p-8 text-center text-muted">ไม่พบข้อมูลอ้างอิงที่ต้องการ</div>`;
  }

  if (ctx.parts.length === 3 && ctx.parts[2] === 'edit') {
    return isZone ? zoneFormPage(item) : wasteTypeFormPage(item);
  }

  return isZone
    ? zoneDetailPage({ zone: item })
    : wasteTypeDetailPage({ wasteType: item });
}
