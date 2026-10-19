import { can } from '../api.js';
import { esc, number } from '../utils/format.js';
import { pageHeading, primaryButton, outlinedButton } from '../utils/layout.js';

const root = '#/drain-work-types';
const allowed = action => can(`drain-work-types.${action}`);

export function drainTypeListPage(params, records) {
  const q = (params.get('q') || '').trim();
  const rows = records.filter(row => `${row.code} ${row.name}`.toLocaleLowerCase('th-TH').includes(q.toLocaleLowerCase('th-TH')))
    .sort((a,b) => a.code.localeCompare(b.code,'th',{numeric:true}));
  const pages = Math.max(1,Math.ceil(rows.length/10));
  const page = Math.min(pages,Math.max(1,parseInt(params.get('page'),10)||1));
  const href = target => `${root}?${new URLSearchParams({...q ? {q} : {},page:String(target)})}`;
  return `${pageHeading('ข้อมูลพื้นฐาน','ประเภทงานลอกท่อ','จัดการรหัสและชื่อประเภทงานลอกท่อระบายน้ำ',allowed('create') ? primaryButton('เพิ่มประเภท',root+'/new') : '')}
    <section class="panel-shadow mb-5 rounded-xl border border-line bg-white p-4 sm:p-6">
      <form id="drainType-filter" class="flex min-w-0 flex-wrap items-end gap-3">
        <label class="w-full min-w-0 max-w-[400px] text-sm" for="drainType-search">ค้นหา<input id="drainType-search" class="field mt-1" type="search" name="q" value="${esc(q)}" placeholder="ค้นหารหัสหรือชื่อประเภท"></label>
        <button class="min-h-11 rounded-xl bg-primary px-5 text-white">ค้นหา</button>${outlinedButton('ล้างตัวกรอง',root)}
      </form>
    </section>
    <section class="panel-shadow min-w-0 rounded-xl border border-line bg-white p-4 sm:p-6"><h2>รายการประเภท</h2><p class="text-sm text-muted">พบ ${number(rows.length)} รายการ</p>
      ${rows.length ? rows.slice((page-1)*10,page*10).map(row => `<a class="flex min-w-0 flex-wrap items-center gap-3 border-b border-line py-4" href="${root}/${encodeURIComponent(row.id)}"><span class="max-w-full break-words text-primary">${esc(row.code)}</span><span class="min-w-0 flex-1 break-words">${esc(row.name)}</span><span class="text-sm text-muted">${row.is_active ? 'ใช้งาน' : 'ระงับใช้งาน'} · ใช้ ${number(row.usage_count)} รายการ</span></a>`).join('') : '<p class="py-8 text-muted">ไม่พบประเภทงานลอกท่อ เพิ่มประเภทก่อนบันทึกงานใหม่ หรือเปลี่ยนคำค้นหา</p>'}
      <nav aria-label="แบ่งหน้าประเภทงาน" class="mt-4 flex flex-wrap items-center gap-3">${page > 1 ? outlinedButton('ก่อนหน้า',href(page-1)) : ''}<span>${page} / ${pages}</span>${page < pages ? outlinedButton('ถัดไป',href(page+1)) : ''}</nav>
    </section>`;
}

export function drainTypeFormPage(item = null, errors = {}, values = item || {}) {
  return `${pageHeading('ข้อมูลพื้นฐาน',item ? 'แก้ไขประเภทงานลอกท่อ' : 'เพิ่มประเภทงานลอกท่อ','กำหนดรหัส ชื่อ และสถานะสำหรับเลือกในฟอร์มงานลอกท่อ')}
    <section class="panel-shadow max-w-2xl rounded-xl border border-line bg-white p-4 sm:p-6"><form id="drainType-form" data-id="${esc(item?.id || '')}" novalidate>
      <div class="grid min-w-0 gap-4 sm:grid-cols-2">${[['code','รหัสประเภท',50],['name','ชื่อประเภท',255]].map(([key,label,max]) => `<div class="min-w-0"><label for="drainType-${key}" class="text-sm">${label} *</label><input class="field mt-1" id="drainType-${key}" name="${key}" maxlength="${max}" required value="${esc(values[key] || '')}" aria-describedby="drainType-${key}-error" ${errors[key] ? 'aria-invalid="true"' : ''}><p id="drainType-${key}-error" class="text-sm text-red-700">${esc(errors[key] || '')}</p></div>`).join('')}</div>
      <label class="my-4 flex min-h-11 items-center gap-2"><input type="checkbox" name="is_active" ${values.is_active !== false ? 'checked' : ''}>เปิดใช้งาน</label>
      <div class="flex flex-wrap gap-3">${outlinedButton('ยกเลิก',item ? `${root}/${encodeURIComponent(item.id)}` : root)}<button class="min-h-11 rounded-xl bg-primary px-5 text-white">บันทึกข้อมูล</button></div>
    </form></section>`;
}

export function drainTypeDetailPage(item) {
  return `${pageHeading('ข้อมูลพื้นฐาน',item.name,'รายละเอียดประเภทงานลอกท่อ',allowed('update') ? outlinedButton('แก้ไข',`${root}/${encodeURIComponent(item.id)}/edit`) : '')}
    <section class="panel-shadow min-w-0 rounded-xl border border-line bg-white p-4 sm:p-6"><dl class="grid min-w-0 gap-4 sm:grid-cols-2">${[['รหัสประเภท',item.code],['ชื่อประเภท',item.name],['สถานะ',item.is_active ? 'ใช้งาน' : 'ระงับใช้งาน'],['จำนวนงานที่ใช้งาน',number(item.usage_count)+' รายการ']].map(([label,value]) => `<div class="min-w-0"><dt class="text-sm text-muted">${label}</dt><dd class="break-words">${esc(value)}</dd></div>`).join('')}</dl>
      ${item.referenced_count ? '<p class="mt-4 text-sm text-muted">มีงานอ้างอิงรวมถึงรายการที่ลบแล้ว จึงลบประเภทไม่ได้ สามารถแก้ไขเป็นระงับใช้งานได้</p>' : ''}
      <div class="mt-4 flex flex-wrap gap-3">${outlinedButton('กลับรายการ',root)}${allowed('delete') ? `<button class="min-h-11 rounded-xl border border-line px-4 text-red-700" data-action="delete-reference" data-type="drain-work-types" data-id="${esc(item.id)}" data-name="${esc(item.name)}" data-usage="${number(item.referenced_count).replaceAll(',','')}">ลบประเภท</button>` : ''}</div>
    </section>`;
}
