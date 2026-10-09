import { renderDatePresets } from './utils/filter.js';

const metricUnits = {
  distance_km: 'กม.', quantity: 'ลูกบาศก์เมตร', weight: 'กิโลกรัม', sediment_quantity: 'ลบ.ม.',
  volume: 'ลบ.ม.', fee_amount: 'บาท', sludge_quantity: 'กก.',
  fertilizer_remaining_latest: 'กก.', communities_count: 'ชุมชน', participants_count: 'คน',
};

const metricNames = {
  fertilizer_remaining_latest: 'ปุ๋ยคงเหลือล่าสุด',
};

const dashboardDate = value => new Intl.DateTimeFormat('th-TH', {
  day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok',
}).format(new Date(`${String(value).slice(0, 10)}T12:00:00+07:00`));

const dashboardDateTime = value => value ? new Intl.DateTimeFormat('th-TH', {
  day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  timeZone: 'Asia/Bangkok',
}).format(new Date(String(value).replace(' ', 'T') + (String(value).includes('Z') || /[+-]\d\d:\d\d$/.test(String(value)) ? '' : '+00:00'))) : '—';

export function dashboardContent({ data, loading, error, params, groups, modules, icon, esc, number, moduleHref }) {
  const from = params.get('from') || data?.period?.from || '';
  const to = params.get('to') || data?.period?.to || '';
  const isFiltered = Boolean(from || to);
  const heading = `<div class="mb-5 sm:mb-6"><p class="text-xs font-bold tracking-[.16em] text-primary">ภาพรวมระบบ</p><h1 class="mt-2 text-2xl font-bold text-ink sm:text-3xl">แดชบอร์ดฝ่ายบริการ</h1><p class="mt-2 text-sm text-muted">ติดตามงานบริการจากฐานข้อมูลจริงตามสิทธิ์ของคุณ</p></div>`;
  const filter = `
    <section aria-labelledby="dashboard-filter-title" class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h2 id="dashboard-filter-title" class="font-bold text-ink">${isFiltered ? 'ช่วงวันที่ดำเนินงาน' : 'ข้อมูลสะสมทั้งหมดตั้งแต่เริ่มระบบ'}</h2>
          <p class="text-xs text-muted">${isFiltered ? 'ตัวเลขหลักใช้วันที่ดำเนินงาน รวมวันเริ่มต้นและวันสิ้นสุด' : 'แสดงภาพรวมและจำนวนรายการสะสมของทุกหมวดงานตั้งแต่เริ่มระบบ'}</p>
        </div>
        ${renderDatePresets({ from, to, formId: 'dashboard-filter' })}
      </div>
      <form id="dashboard-filter" class="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] sm:items-end">
        <label class="min-w-0 text-sm font-semibold">ตั้งแต่วันที่<input class="field mt-1" type="date" name="from" value="${esc(from)}" placeholder="ทั้งหมด"></label>
        <label class="min-w-0 text-sm font-semibold">ถึงวันที่<input class="field mt-1" type="date" name="to" value="${esc(to)}" placeholder="ทั้งหมด"></label>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 font-bold text-white hover:bg-primary-dark">กรองข้อมูล</button>
        ${isFiltered ? `<a href="#/dashboard" class="flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-muted hover:bg-[#f6faf7]" title="คืนค่าเป็นทั้งหมดทุกช่วงเวลา">ดูทั้งหมด</a>` : ''}
      </form>
      <p id="dashboard-filter-error" role="alert" class="mt-2 hidden text-sm text-red-700"></p>
    </section>
  `;

  if (loading || (!data && !error)) return `${heading}${filter}<div role="status" aria-live="polite" class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted">กำลังโหลดข้อมูลภาพรวม…</div>`;
  if (error) return `${heading}${filter}<div role="alert" class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"><p class="font-semibold">โหลดข้อมูลภาพรวมไม่สำเร็จ</p><p class="mt-1">${esc(error)}</p><button type="button" data-action="retry-dashboard" class="mt-3 min-h-11 rounded-xl border border-red-300 bg-white px-4 font-semibold">ลองอีกครั้ง</button></div>`;

  const visibleModules = modules.filter(module => Object.hasOwn(data.module_summary, module.id));
  const visible = id => visibleModules.some(module => module.id === id);
  const periodLink = id => (data.period?.from && data.period?.to)
    ? `${moduleHref(id)}?${new URLSearchParams({ from: data.period.from, to: data.period.to })}`
    : moduleHref(id);
  const periodTotal = data.period.total;
  const summaryCard = (label, value, suffix, description, prominent = false) => `<div class="dashboard-card panel-shadow rounded-2xl border border-line bg-white ${prominent ? 'border-l-[3px] border-l-primary' : ''} p-4 sm:p-5"><p class="text-sm font-semibold text-[#4d655a]">${label}</p><p class="mt-3 text-3xl font-bold leading-tight text-ink">${number(value)} <span class="text-sm font-medium text-muted">${suffix}</span></p><p class="mt-1 text-xs text-muted">${description}</p></div>`;
  const metricText = (module, key, value) => {
    const label = metricNames[key] || module.fields.find(field => field.name === key)?.label || key;
    return `<span class="inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-[#f4f8f5] px-2.5 py-1.5 text-xs text-[#435b50]"><span>${esc(label)}:</span><strong class="text-ink">${value === null ? 'ไม่มีข้อมูล' : `${number(value)} ${module.fields.find(field => field.name === key)?.unit || metricUnits[key] || ''}`}</strong></span>`;
  };
  const metricValue = (id, key) => data.module_summary[id]?.metrics[key] ?? 0;
  const groupMetrics = {
    cleaning: [
      ['ระยะทางดำเนินงานรวม', visibleModules.filter(m => m.group === 'cleaning').reduce((sum, m) => sum + metricValue(m.id, 'distance_km'), 0), 'กม.'],
      ...(visible('waterway-cleanings') ? [['ผักตบชวาและมูลฝอยที่กำจัด', metricValue('waterway-cleanings', 'quantity'), 'ลูกบาศก์เมตร']] : []),
    ],
    waste: [['น้ำหนักมูลฝอย', metricValue('waste-collections', 'weight'), 'กิโลกรัม']],
    sanitation: [
      ...(visible('drain-cleanings') ? [['ตะกอนจากงานลอกท่อ', metricValue('drain-cleanings', 'sediment_quantity'), 'ลบ.ม.']] : []),
      ...(visible('septic-pumpings') ? [['สิ่งปฏิกูลที่สูบ', metricValue('septic-pumpings', 'volume'), 'ลบ.ม.']] : []),
      ...(visible('septic-treatments') ? [['ตะกอนสำหรับทำปุ๋ย', metricValue('septic-treatments', 'sludge_quantity'), 'กก.']] : []),
    ],
    projects: [['ผู้เข้าร่วมโครงการ', metricValue('waste-management-projects', 'participants_count'), 'คน']],
  };
  const groupCards = groups.filter(group => visibleModules.some(m => m.group === group.id)).map(group => `<section class="dashboard-card panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5"><div class="flex items-start gap-3"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf5ef] text-primary">${icon(group.icon, 19)}</span><div class="min-w-0"><h3 class="break-words text-sm font-bold text-ink">${esc(group.label)}</h3><p class="mt-1 text-2xl font-bold text-ink">${number(data.group_summary[group.id] || 0)} <span class="text-xs font-medium text-muted">${isFiltered ? 'รายการในช่วงที่เลือก' : 'รายการสะสม'}</span></p></div></div><dl class="mt-4 space-y-1.5 border-t border-line pt-3">${groupMetrics[group.id].map(([label, value, unit]) => `<div class="flex flex-wrap justify-between gap-x-2 text-xs"><dt class="text-muted">${label}</dt><dd class="font-bold text-ink">${number(value)} ${unit}</dd></div>`).join('')}</dl></section>`).join('');
  const moduleCards = visibleModules.map(module => {
    const item = data.module_summary[module.id];
    return `<a href="${periodLink(module.id)}" class="flex min-w-0 flex-col gap-2 rounded-xl border border-line bg-white p-3.5 transition hover:border-[#9fd1b8] hover:bg-[#f9fcfa] focus-visible:outline"><span class="flex min-w-0 items-start justify-between gap-2"><span class="min-w-0 break-words text-sm font-semibold text-ink">${esc(module.short)}</span><strong class="shrink-0 text-sm text-primary">${number(item.count)} รายการ</strong></span><span class="flex flex-wrap gap-1.5">${Object.entries(item.metrics).map(([key, value]) => metricText(module, key, value)).join('') || '<span class="text-xs text-muted">ไม่มีค่าปริมาณ</span>'}</span></a>`;
  }).join('');
  const max = Math.max(1, ...data.trend.map(item => item.count));
  const trendRows = data.trend.map(item => `<li class="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-xs"><span class="min-w-0 break-words text-muted">${dashboardDate(item.from)}${item.from === item.to ? '' : ` – ${dashboardDate(item.to)}`}</span><strong class="text-ink">${number(item.count)} รายการ</strong><span class="col-span-2 h-2 rounded-full bg-[#eef3ef]"><span class="block h-2 rounded-full bg-primary" style="width:${Math.max(0, Math.round(item.count / max * 100))}%"></span></span></li>`).join('');
  const recentRows = data.recent.slice(0, 6).map(item => {
    const module = modules.find(candidate => candidate.id === item.module);
    if (!module) return '';
    return `<a href="${moduleHref(module.id)}/${encodeURIComponent(item.id)}" class="flex min-w-0 flex-col gap-2 border-t border-line px-4 py-3.5 transition hover:bg-[#f9fcfa] sm:flex-row sm:items-center sm:gap-3 sm:px-5"><div class="flex min-w-0 flex-1 items-center gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf5ef] text-primary">${icon(module.icon, 17)}</span><div class="min-w-0 flex-1"><strong class="block break-words text-sm text-ink">${esc(item.title || module.short)}</strong><span class="block break-words text-xs text-muted">${esc(module.short)}</span></div></div><div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pl-12 text-xs sm:flex-col sm:items-end sm:gap-y-0.5 sm:pl-0"><span class="inline-flex items-center gap-1 font-semibold text-primary-dark"><span class="font-normal text-muted">ดำเนินงาน:</span> ${dashboardDate(item.service_date)}</span><time class="text-[11px] text-muted" datetime="${esc(item.created_at)}">บันทึกเมื่อ ${dashboardDateTime(item.created_at)}</time></div></a>`;
  }).join('');

  const periodTotalLabel = isFiltered ? 'รายการในช่วงที่เลือก' : 'รายการสะสมทั้งหมด';
  const periodDescription = (data.period?.from && data.period?.to)
    ? `${dashboardDate(data.period.from)} – ${dashboardDate(data.period.to)}`
    : 'ข้อมูลสะสมตั้งแต่เริ่มระบบ';

  return `${heading}${filter}<section aria-label="ยอดรวม" class="dashboard-summary mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">${summaryCard(periodTotalLabel, periodTotal, 'รายการ', periodDescription, true)}${summaryCard('ยอดสะสมตั้งแต่เริ่มระบบ', data.total, 'รายการ', 'เฉพาะหมวดที่คุณมีสิทธิ์ดู')}${summaryCard('ดำเนินงานวันนี้', data.today, 'รายการ', 'อิงวันที่ดำเนินงานตามเวลาไทย')}</section><section aria-labelledby="group-heading" class="mb-6"><h2 id="group-heading" class="mb-3 text-lg font-bold text-ink">ภาพรวมกลุ่มงาน</h2>${visibleModules.length ? `<div class="dashboard-summary grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">${groupCards}</div>` : '<p class="rounded-xl border border-line bg-white p-5 text-sm text-muted">ไม่มีหมวดงานที่คุณมีสิทธิ์ดู</p>'}</section><section aria-labelledby="module-heading" class="panel-shadow mb-6 rounded-2xl border border-line bg-[#f8faf8] p-4 sm:p-5"><div class="mb-3"><h2 id="module-heading" class="text-lg font-bold text-ink">งานบริการรายหมวด</h2><p class="text-xs text-muted">${isFiltered ? 'จำนวนและปริมาณในช่วงวันที่ที่เลือก; แต่ละค่าระบุหน่วยและความหมายแยกกัน' : 'จำนวนและปริมาณสะสมทั้งหมด; แต่ละค่าระบุหน่วยและความหมายแยกกัน'}</p></div>${isFiltered && periodTotal === 0 ? '<p class="mb-3 rounded-xl border border-[#d8e7dd] bg-white p-4 text-sm text-muted">ยังไม่มีรายการดำเนินงานในช่วงวันที่นี้ ลองเลือกช่วงอื่นเพื่อดูข้อมูล</p>' : ''}<div class="grid min-w-0 gap-2 sm:grid-cols-2 xl:grid-cols-3">${moduleCards}</div></section><div class="dashboard-panels grid grid-cols-1 gap-5 xl:grid-cols-2"><section aria-labelledby="trend-heading" class="panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5"><h2 id="trend-heading" class="text-lg font-bold text-ink">แนวโน้มจำนวนรายการ</h2><p class="mt-1 text-xs text-muted">${isFiltered ? 'แบ่งช่วงภายในวันที่ที่เลือก; แถบยาวขึ้นหมายถึงจำนวนมากขึ้น' : 'แนวโน้มจำนวนรายการย้อนหลัง; แถบยาวขึ้นหมายถึงจำนวนมากขึ้น'}</p>${periodTotal && data.trend.length > 1 ? `<ol class="mt-5 space-y-4">${trendRows}</ol>` : '<p class="mt-5 text-sm text-muted">ข้อมูลยังไม่เพียงพอสำหรับแสดงแนวโน้ม</p>'}</section><section aria-labelledby="recent-heading" class="panel-shadow overflow-hidden rounded-2xl border border-line bg-white"><div class="p-4 sm:p-5"><h2 id="recent-heading" class="text-lg font-bold text-ink">บันทึกล่าสุด</h2><p class="mt-1 text-xs text-muted">เรียงตามเวลาบันทึก ครอบคลุมข้อมูลทุกช่วงเวลา</p></div>${recentRows || '<p class="border-t border-line p-5 text-sm text-muted">ยังไม่มีรายการบันทึก</p>'}</section></div>`;
}
