import catalog from '../resources/report-catalog.json' with { type: 'json' };
import { renderDatePresets } from './utils/filter.js';

export function reportBody({ module, params, data, meta, loading, error, modules, groups, can, esc, number, thaiDate, moduleHref }) {
  const currentMonth = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' }).slice(0, 7);
  const mode = params.has('from') || params.has('to') ? 'custom' : 'month';
  const month = params.get('month') || currentMonth;
  const selected = new URLSearchParams();
  if (mode === 'custom') {
    selected.set('from', params.get('from') || '');
    selected.set('to', params.get('to') || '');
  } else if (params.has('month')) selected.set('month', month);
  const query = selected.size ? `?${selected}` : '';
  const reportHref = id => `#/reports/${encodeURIComponent(id)}${query}`;
  const exportUrl = module
    ? window.serviceHubUrls.apiReportDetailExport.replace('__MODULE__', encodeURIComponent(module.id)) + query
    : window.serviceHubUrls.apiReportsExport + query;
  const excelUrl = exportUrl + (query ? '&' : '?') + 'format=xlsx';
  const exportLimited = !module && modules.some(m => can(`${m.id}.view`) && !can(`${m.id}.export`));
  const canExport = module ? can(`${module.id}.export`) : modules.some(m => can(`${m.id}.export`));
  const heading = module ? module.short : 'ภาพรวมงานบริการ';
  const period = meta?.period;
  const comparison = meta?.comparison;
  const range = value => value ? `${thaiDate(value.from)} – ${thaiDate(value.to)}` : '—';
  const count = module ? data?.count : meta?.total;
  const previous = module ? data?.previous_count : meta?.previous_total;
  const percent = previous === 0 || previous == null ? null : Math.round((count - previous) * 1000 / previous) / 10;
  const definitionFor = id => catalog.modules.find(item => item.id === id);
  const quantities = item => Object.entries(item?.quantities || {}).flatMap(([field, values]) => values.map(value => ({ field, ...value })));
  const labelFor = (id, field) => definitionFor(id)?.fields.find(entry => entry.name === field)?.label || field;
  const amount = value => value.total == null ? (value.field === 'service_users_count' ? 'ยังไม่มีข้อมูลจำนวนผู้ใช้บริการ' : '—') : number(value.total);
  const valueNote = value => value.note ? `<span class="block text-xs text-muted">${esc(value.note)}</span>` : '';
  const table = (headers, body, name) => `<div class="report-table-wrap min-w-0 max-w-full overflow-x-auto rounded-xl border border-line bg-white" role="region" aria-label="${esc(name)}" tabindex="0"><table class="report-table w-full min-w-[680px] border-collapse text-sm"><thead><tr>${headers.map(h => `<th scope="col" class="border-b border-line bg-[#eaf5ef] px-4 py-3 text-left font-bold">${h}</th>`).join('')}</tr></thead><tbody>${body}</tbody></table></div>`;
  const cell = (text, numeric = false, extra = '') => `<td class="border-b border-line px-4 py-3 align-top ${numeric ? 'text-right tabular-nums' : 'break-words'}" ${extra}>${text}</td>`;

  const filter = `
    <section class="report-controls no-print panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5">
      <form id="report-filter" data-report-module="${esc(module?.id || '')}" class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap gap-4">
            <label class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><input type="radio" name="period_mode" value="month" ${mode === 'month' ? 'checked' : ''}>รายเดือน</label>
            <label class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><input type="radio" name="period_mode" value="custom" ${mode === 'custom' ? 'checked' : ''}>กำหนดช่วงวันที่</label>
          </div>
          <div data-report-custom ${mode === 'month' ? 'hidden' : ''}>
            ${renderDatePresets({ from: params.get('from') || '', to: params.get('to') || '', formId: 'report-filter' })}
          </div>
        </div>
        <div data-report-month ${mode === 'custom' ? 'hidden' : ''}>
          <label for="report-month" class="mb-1 block text-sm font-semibold">เดือนที่ดำเนินงาน</label>
          <input id="report-month" class="field max-w-sm" type="month" name="month" value="${esc(month)}" ${mode === 'custom' ? 'disabled' : ''} required>
        </div>
        <div data-report-custom class="grid gap-3 sm:grid-cols-2" ${mode === 'month' ? 'hidden' : ''}>
          <div>
            <label for="report-from" class="mb-1 block text-sm font-semibold">ตั้งแต่วันที่</label>
            <input id="report-from" class="field" type="date" name="from" value="${esc(params.get('from') || '')}" ${mode === 'month' ? 'disabled' : ''} required>
          </div>
          <div>
            <label for="report-to" class="mb-1 block text-sm font-semibold">ถึงวันที่</label>
            <input id="report-to" class="field" type="date" name="to" value="${esc(params.get('to') || '')}" ${mode === 'month' ? 'disabled' : ''} required>
          </div>
        </div>
        <p id="report-filter-error" class="text-sm text-red-700" role="alert"></p>
        <div class="flex flex-wrap gap-2">
          <button class="min-h-11 rounded-xl bg-primary px-5 font-bold text-white hover:bg-primary-dark" type="submit">แสดงรายงาน</button>
          <a href="#/reports${module ? `/${encodeURIComponent(module.id)}` : ''}" data-action="clear-filters" class="inline-flex min-h-11 items-center rounded-xl border border-line px-4 text-sm font-semibold text-muted hover:bg-[#f6faf7]">ล้างตัวกรอง</a>
          <button class="min-h-11 rounded-xl border border-line px-4 font-semibold" type="button" data-action="print-report">พิมพ์ / บันทึก PDF</button>
          ${canExport ? `<a class="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 font-bold text-white" data-action="download-report" href="${esc(excelUrl)}">ดาวน์โหลด Excel</a><details class="self-center"><summary class="cursor-pointer text-sm text-muted">ตัวเลือกไฟล์อื่น</summary><a class="inline-flex min-h-11 items-center px-3 text-sm text-primary" href="${esc(exportUrl)}">ส่งออกสรุป CSV</a></details>` : ''}
        </div>
        ${exportLimited ? '<p class="text-sm text-muted">ไฟล์ส่งออกมีเฉพาะหมวดที่คุณมีสิทธิ์ส่งออก จึงอาจน้อยกว่าข้อมูลบนหน้าจอ</p>' : ''}
        <p class="text-xs text-muted">Excel รวมสรุปและรายการจริง สูงสุด 5,000 รายการต่อครั้ง · PDF พิมพ์เฉพาะสรุป</p>
      </form>
    </section>
  `;

  let content = '';
  if (loading) content = '<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังโหลดรายงาน…</section>';
  else if (error) content = `<section class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-6" role="alert"><p class="font-semibold text-red-700">${esc(error)}</p><button type="button" data-action="retry-report" class="no-print mt-3 min-h-11 rounded-xl border border-red-200 bg-white px-4 font-semibold">ลองอีกครั้ง</button></section>`;
  else if (!meta || !data) content = '<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังเตรียมรายงาน…</section>';
  else {
    const visible = module ? [module] : modules.filter(m => can(`${m.id}.view`));
    const active = module ? (data.count ? 1 : 0) : visible.filter(m => data[m.id]?.count > 0).length;
    const summary = `<section class="grid min-w-0 gap-3 sm:grid-cols-3"><div class="rounded-xl border border-line bg-white p-4"><p class="text-sm text-muted">ช่วงวันที่รายงาน</p><strong class="mt-2 block">${range(period)}</strong></div><div class="rounded-xl border border-line bg-white p-4"><p class="text-sm text-muted">จำนวนงานทั้งหมด</p><strong class="mt-2 block text-2xl">${number(count)} รายการ</strong></div><div class="rounded-xl border border-line bg-white p-4"><p class="text-sm text-muted">หมวดที่มีข้อมูล</p><strong class="mt-2 block text-2xl">${active} หมวด</strong></div></section><details class="report-comparison rounded-xl border border-line bg-white p-4"><summary class="cursor-pointer font-semibold">เปรียบเทียบช่วงก่อนหน้า</summary><p class="mt-2 text-sm">${range(comparison)} · ${number(previous)} รายการ · ${percent == null ? 'เปรียบเทียบเป็นร้อยละไม่ได้' : `เปลี่ยนแปลง ${percent > 0 ? '+' : ''}${number(percent)}%`}</p></details>`;
    if (!module) {
      const sections = groups.filter(group => visible.some(m => m.group === group.id)).map(group => {
        const rows = visible.filter(m => m.group === group.id).map(m => {
          const item = data[m.id];
          const values = quantities(item);
          return (values.length ? values : [{field: '', total: null, unit: ''}]).map((value, index) => `<tr class="even:bg-[#f8faf8]">${index === 0 ? cell(esc(definitionFor(m.id).label), false, `rowspan="${Math.max(1,values.length)}"`) + cell(number(item?.count || 0), true, `rowspan="${Math.max(1,values.length)}"`) : ''}${cell(esc(labelFor(m.id,value.field)) + (value.kind === 'latest' ? `<span class="block text-xs text-muted">ค่าล่าสุด${value.as_of ? ' ณ '+thaiDate(value.as_of) : ''}</span>` : ''))}${cell(amount(value) + valueNote(value),true)}${cell(esc(value.unit || ''))}${index === 0 ? cell(`<a class="no-print inline-flex min-h-11 items-center font-semibold text-primary underline" href="${esc(reportHref(m.id))}">ดูรายละเอียด</a>`, false, `rowspan="${Math.max(1,values.length)}"`) : ''}</tr>`).join('');
        }).join('');
        return `<section class="min-w-0"><h2 class="mb-3 text-lg font-bold">${esc(group.label)}</h2>${table(['หมวดงาน','จำนวนรายการ','ตัวชี้วัด','ปริมาณ','หน่วย','<span class="no-print">ดูรายละเอียด</span>'],rows,group.label)}</section>`;
      }).join('');
      content = summary + (count === 0 ? '<p class="rounded-xl border border-line bg-white p-4 text-muted">ไม่มีรายการในช่วงที่เลือก</p>' : '') + (sections || '<p>ไม่มีหมวดที่ได้รับสิทธิ์ดู</p>');
    } else {
      const rows = quantities(data).map(value => `<tr>${cell(esc(labelFor(module.id,value.field)))}${cell(amount(value) + valueNote(value),true)}${cell(esc(value.unit))}${cell(value.kind === 'latest' ? 'ค่าล่าสุด' : 'ผลรวม')}${cell(value.as_of ? thaiDate(value.as_of) : '—')}</tr>`).join('');
      const breakdown = data.breakdown?.length ? `<section class="min-w-0"><h2 class="mb-3 text-lg font-bold">แยกตาม${module.id === 'road-washings' ? 'เขตรักษาความสะอาด' : 'ประเภทขยะมูลฝอย'}</h2>${table(['ชื่อ','จำนวนรายการ','ปริมาณ','หน่วย'],data.breakdown.map(row => `<tr>${cell(esc(row.name))}${cell(number(row.count),true)}${cell(number(row.total),true)}${cell(esc(row.unit))}</tr>`).join(''),'ข้อมูลแยกตามกลุ่ม')}</section>` : '';
      const listHref = moduleHref(module.id) + '?' + new URLSearchParams({from:period.from,to:period.to});
      content = summary + `<section class="min-w-0"><h2 class="mb-3 text-lg font-bold">ตัวชี้วัดงานบริการ</h2>${table(['ตัวชี้วัด','ปริมาณ','หน่วย','ความหมาย','วันที่อ้างอิง'],rows,'ตัวชี้วัดงานบริการ')}</section>` + breakdown + `<a class="no-print inline-flex min-h-11 items-center font-semibold text-primary underline" href="${esc(listHref)}">ดูรายการทั้งหมดในช่วงนี้</a>`;
    }
  }

  return `<div class="report-page space-y-5"><div class="flex flex-wrap items-start justify-between gap-3"><div><p class="text-xs font-bold tracking-wider text-primary">รายงานงานบริการ</p><h1 class="type-page-title mt-1">${esc(heading)}</h1><p class="mt-2 text-sm text-muted">ข้อมูลจริงจากวันที่ดำเนินงาน ตามสิทธิ์ของคุณ</p></div>${module ? `<a class="no-print inline-flex min-h-11 items-center font-semibold text-primary underline" href="#/reports${query}">กลับภาพรวม</a>` : ''}</div>${filter}${content}</div>`;
}
