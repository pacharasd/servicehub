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
  const reportApi = id => window.serviceHubUrls.apiReportDetail.replace('__MODULE__', encodeURIComponent(id));
  const exportUrl = module
    ? window.serviceHubUrls.apiReportDetailExport.replace('__MODULE__', encodeURIComponent(module.id)) + query
    : window.serviceHubUrls.apiReportsExport + query;
  const canExport = module ? can(`${module.id}.export`) : modules.some(m => can(`${m.id}.export`));
  const heading = module ? module.short : 'ภาพรวมงานบริการ';
  const period = meta?.period;
  const comparison = meta?.comparison;
  const range = value => value ? `${thaiDate(value.from)} – ${thaiDate(value.to)}` : '—';
  const count = module ? data?.count : meta?.total;
  const previous = module ? data?.previous_count : meta?.previous_total;
  const percent = previous === 0 || previous == null ? null : Math.round((count - previous) * 1000 / previous) / 10;
  const metricList = (item, definition) => Object.entries(item?.quantities || {}).flatMap(([field, values]) => values.map(value => {
    const label = definition.fields.find(entry => entry.name === field)?.label || field;
    const latest = value.kind === 'latest';
    return `<div class="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-line py-2 text-sm"><span class="text-muted">${esc(label)}${latest ? ' (ค่าล่าสุด)' : ''}</span><strong class="text-ink">${value.total == null ? '—' : `${number(value.total)} ${esc(value.unit || '')}`}</strong>${latest && value.as_of ? `<span class="w-full text-xs text-muted">ณ ${thaiDate(value.as_of)}</span>` : ''}</div>`;
  })).join('');
  const trend = module ? data?.trend : meta?.trend;
  const maxTrend = Math.max(1, ...(trend || []).map(point => point.count));
  const trendContent = trend?.length
    ? `<ol class="mt-4 max-h-[34rem] space-y-3 overflow-y-auto" aria-label="จำนวนรายการตามวันที่ดำเนินงาน">${trend.map(point => `<li class="grid min-w-0 grid-cols-[6.5rem_minmax(0,1fr)_3rem] items-center gap-2 text-xs sm:grid-cols-[8rem_minmax(0,1fr)_4rem]"><time datetime="${esc(point.date)}">${thaiDate(point.date)}</time><span class="h-3 rounded-full bg-[#e8f0eb]"><span class="block h-3 rounded-full bg-primary" style="width:${Math.max(3, point.count / maxTrend * 100)}%"></span></span><strong class="text-right">${number(point.count)}</strong></li>`).join('')}</ol>`
    : '<p class="mt-4 text-sm text-muted">ไม่มีรายการในช่วงที่เลือก</p>';

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
          ${canExport ? `<a class="inline-flex min-h-11 items-center rounded-xl border border-line px-4 font-semibold text-primary" href="${esc(exportUrl)}">ส่งออกสรุป CSV</a>` : ''}
        </div>
      </form>
    </section>
  `;

  let content = '';
  if (loading) content = '<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังโหลดรายงาน…</section>';
  else if (error) content = `<section class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-6" role="alert"><p class="font-semibold text-red-700">${esc(error)}</p><button type="button" data-action="retry-report" class="no-print mt-3 min-h-11 rounded-xl border border-red-200 bg-white px-4 font-semibold">ลองอีกครั้ง</button></section>`;
  else if (!meta || !data) content = '<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังเตรียมรายงาน…</section>';
  else {
    const summary = `<section class="grid gap-3 sm:grid-cols-3"><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">รายการในช่วงที่เลือก</p><strong class="mt-2 block text-3xl text-ink">${number(count)}</strong><p class="mt-2 text-xs text-muted">${range(period)}</p></div><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">ช่วงเปรียบเทียบ</p><strong class="mt-2 block text-3xl text-ink">${number(previous)}</strong><p class="mt-2 text-xs text-muted">${range(comparison)}</p></div><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">การเปลี่ยนแปลงจำนวนรายการ</p><strong class="mt-2 block text-2xl text-ink">${percent == null ? 'เปรียบเทียบเป็นร้อยละไม่ได้' : `${percent > 0 ? '+' : ''}${number(percent)}%`}</strong><p class="mt-2 text-xs text-muted">${previous === 0 ? 'ช่วงเปรียบเทียบไม่มีรายการ' : 'เทียบกับช่วงก่อนหน้า'}</p></div></section>`;
    const trendSection = `<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">แนวโน้มตามวันที่ดำเนินงาน</h2><p class="mt-1 text-xs text-muted">ตัวเลขกำกับทุกวัน อ่านได้โดยไม่ต้องอาศัยสี</p>${trendContent}</section>`;
    if (!module) {
      const visibleGroups = groups.filter(group => modules.some(m => m.group === group.id && can(`${m.id}.view`)));
      const groupCards = `<section><h2 class="mb-3 text-lg font-bold">ภาพรวม 4 กลุ่มงาน</h2><div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">${visibleGroups.map(group => `<div class="panel-shadow rounded-2xl border border-line bg-white p-5"><h3 class="text-sm font-semibold">${esc(group.label)}</h3><strong class="mt-2 block text-2xl">${number(meta.groups?.[group.id] || 0)}</strong><span class="text-xs text-muted">รายการในช่วงที่เลือก</span></div>`).join('')}</div></section>`;
      const cards = modules.filter(m => can(`${m.id}.view`)).map(m => `<article class="panel-shadow rounded-2xl border border-line bg-white p-5"><h3 class="font-bold">${esc(m.short)}</h3><p class="mt-2 text-sm"><strong class="text-xl">${number(data[m.id]?.count || 0)}</strong> รายการ</p><div class="mt-3">${metricList(data[m.id], m) || '<p class="text-sm text-muted">ไม่มีตัวชี้วัดปริมาณ</p>'}</div><a class="no-print mt-4 inline-flex min-h-11 items-center font-bold text-primary underline" href="${reportHref(m.id)}">ดูรายงานหมวดนี้</a></article>`).join('');
      content = `${summary}${groupCards}<section><h2 class="mb-3 text-lg font-bold">รายงานครบ 9 หมวด</h2><div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">${cards || '<p class="text-muted">ไม่มีหมวดที่ได้รับสิทธิ์ดู</p>'}</div></section>${trendSection}`;
    } else {
      const breakdown = data.breakdown?.length ? `<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">แยกตาม${module.id === 'road-washings' ? 'เขตรักษาความสะอาด' : 'ประเภทขยะมูลฝอย'}</h2><div class="mt-3 divide-y divide-line">${data.breakdown.map(row => `<div class="grid gap-1 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_auto_auto]"><span>${esc(row.name)}</span><span>${number(row.count)} รายการ</span><strong>${number(row.total)} ${esc(row.unit)}</strong></div>`).join('')}</div></section>` : '';
      const recent = `<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">รายการล่าสุดตามวันที่ดำเนินงาน</h2>${data.recent?.length ? `<ol class="mt-3 divide-y divide-line">${data.recent.map(row => `<li class="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><div><strong>${esc(row.title || 'รายการงานบริการ')}</strong><p class="text-xs text-muted">${thaiDate(row.service_date)}</p></div><a class="no-print inline-flex min-h-11 items-center font-bold text-primary underline" href="${moduleHref(module.id)}/${encodeURIComponent(row.id)}">ดูรายการ</a></li>`).join('')}</ol>` : '<p class="mt-3 text-sm text-muted">ไม่มีรายการในช่วงที่เลือก</p>'}</section>`;
      content = `${summary}<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">ปริมาณงานตามตัวชี้วัด</h2><p class="mt-1 text-xs text-muted">แสดงแต่ละหน่วยแยกกัน; ค่าคงเหลือเป็นค่าล่าสุด</p><div class="mt-3">${metricList(data, module)}</div></section>${breakdown}${trendSection}${recent}<a class="no-print inline-flex min-h-11 items-center font-bold text-primary underline" href="${moduleHref(module.id)}">ไปหน้ารายการ${esc(module.short)}</a>`;
    }
  }

  return `<div class="report-page space-y-5"><div class="flex flex-wrap items-start justify-between gap-3"><div><p class="text-xs font-bold tracking-wider text-primary">รายงานงานบริการ</p><h1 class="mt-1 text-2xl font-bold sm:text-3xl">${esc(heading)}</h1><p class="mt-2 text-sm text-muted">ข้อมูลจริงจากวันที่ดำเนินงาน ตามสิทธิ์ของคุณ</p></div>${module ? `<a class="no-print inline-flex min-h-11 items-center font-semibold text-primary underline" href="#/reports${query}">กลับภาพรวม</a>` : ''}</div>${filter}${content}</div>`;
}
