import { wastePieChart, distributionChart } from './components/dashboardCharts.js';
import { renderDatePresets } from './utils/filter.js';

const metricUnits = {
  distance_km: 'กิโลเมตร', quantity: 'ลูกบาศก์เมตร', weight: 'กิโลกรัม', sediment_quantity: 'ลูกบาศก์เมตร',
  volume: 'ลูกบาศก์เมตร', treated_volume: 'ลูกบาศก์เมตร', fee_amount: 'บาท', sludge_quantity: 'กิโลกรัม',
  fertilizer_remaining_latest: 'กิโลกรัม', communities_count: 'ชุมชน', participants_count: 'คน',
};

const metricNames = {
  fertilizer_remaining_latest: 'ปุ๋ยคงเหลือล่าสุด',
};

const groupCorridors = {
  cleaning: {
    top: 'border-t-4 border-t-[#0F766E]',
    headerBg: 'bg-gradient-to-r from-[#ECFDF5] via-[#F2FBF7] to-white border-b border-[#D5ECE4]',
    circle: 'bg-[#0F766E] text-white',
    softIcon: 'bg-[#E6F4F0] text-[#0F766E]',
    pill: 'bg-[#E6F4F0] text-[#0F766E] hover:bg-[#D1EAE6]',
    band: 'bg-[#ECF6F3] text-[#0F766E]',
    iconText: 'text-[#0F766E]',
    groupIcon: 'truck',
    subtitle: 'ดูแลความสะอาดถนน คลองสาธารณะ และพื้นที่สาธารณะ',
  },
  waste: {
    top: 'border-t-4 border-t-[#1D4ED8]',
    headerBg: 'bg-gradient-to-r from-[#EFF6FF] via-[#F5F9FF] to-white border-b border-[#DBEAFE]',
    circle: 'bg-[#1D4ED8] text-white',
    softIcon: 'bg-[#DBEAFE] text-[#1D4ED8]',
    pill: 'bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#DBEAFE]',
    band: 'bg-[#F0F7FF] text-[#1D4ED8]',
    iconText: 'text-[#1D4ED8]',
    groupIcon: 'recycle',
    subtitle: 'จัดเก็บ ขนส่ง และกำจัดขยะมูลฝอยอย่างถูกต้อง',
  },
  sanitation: {
    top: 'border-t-4 border-t-[#D97706]',
    headerBg: 'bg-gradient-to-r from-[#FFFBEB] via-[#FEF9E7] to-white border-b border-[#FDE68A]',
    circle: 'bg-[#D97706] text-white',
    softIcon: 'bg-[#FEF3C7] text-[#D97706]',
    pill: 'bg-[#FEF3C7] text-[#B45309] hover:bg-[#FDE68A]',
    band: 'bg-[#FEF9EC] text-[#B45309]',
    iconText: 'text-[#D97706]',
    groupIcon: 'truck',
    subtitle: 'สูบ ขนส่ง และบำบัดสิ่งปฏิกูลตามมาตรฐาน',
  },
  projects: {
    top: 'border-t-4 border-t-[#6D28D9]',
    headerBg: 'bg-gradient-to-r from-[#F5F3FF] via-[#FAF8FF] to-white border-b border-[#EDE9FE]',
    circle: 'bg-[#6D28D9] text-white',
    softIcon: 'bg-[#EDE9FE] text-[#6D28D9]',
    pill: 'bg-[#F5F3FF] text-[#6D28D9] hover:bg-[#EDE9FE]',
    band: 'bg-[#F7F5FF] text-[#6D28D9]',
    iconText: 'text-[#6D28D9]',
    groupIcon: 'bars',
    subtitle: 'โครงการและการพัฒนาระบบจัดการมูลฝอย',
  },
};

const skylineSvg = `<svg class="pointer-events-none hidden h-20 w-auto shrink-0 opacity-90 lg:block" viewBox="0 0 380 80" fill="none" aria-hidden="true"><path d="M0 74h380" stroke="#B7D7D0" stroke-width="2"/><rect x="18" y="34" width="22" height="40" rx="2" fill="#D5EAE5"/><rect x="44" y="20" width="28" height="54" rx="2" fill="#C2E0DA"/><rect x="78" y="42" width="18" height="32" rx="2" fill="#D5EAE5"/><rect x="102" y="14" width="32" height="60" rx="2" fill="#B2D8D0"/><rect x="140" y="28" width="24" height="46" rx="2" fill="#CDE5E0"/><path d="M190 74 L218 22 L224 22 L252 74" stroke="#0F766E" stroke-width="2.5" stroke-opacity="0.45"/><path d="M221 22 V74" stroke="#0F766E" stroke-width="3" stroke-opacity="0.55"/><path d="M221 30 L182 72 M221 38 L194 72 M221 30 L260 72 M221 38 L248 72" stroke="#0F766E" stroke-width="1.2" stroke-opacity="0.35"/><path d="M170 64 H350" stroke="#0F766E" stroke-width="3" stroke-opacity="0.5"/><circle cx="332" cy="58" r="10" fill="#B7D7D0"/><circle cx="352" cy="61" r="8" fill="#CDE5E0"/></svg>`;

const miniBarsSvg = color => `<svg class="h-10 w-12 shrink-0 self-end opacity-85" viewBox="0 0 48 40" fill="none" aria-hidden="true"><rect x="4" y="26" width="7" height="12" rx="2" fill="${color}" fill-opacity="0.25"/><rect x="15" y="18" width="7" height="20" rx="2" fill="${color}" fill-opacity="0.4"/><rect x="26" y="11" width="7" height="27" rx="2" fill="${color}" fill-opacity="0.6"/><rect x="37" y="4" width="7" height="34" rx="2" fill="${color}" fill-opacity="0.85"/></svg>`;

const emptyIllustrationSvg = `<div class="flex items-center gap-3 rounded-md bg-[#F8FAF9] px-3.5 py-2.5 text-xs text-muted"><svg class="h-9 w-9 shrink-0 text-[#94A3B8]" viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="10" y="6" width="28" height="36" rx="4" fill="#E2E8F0"/><path d="M16 16h16M16 24h16M16 32h10" stroke="#64748B" stroke-width="2.5" stroke-linecap="round"/></svg><span>ยังไม่มีข้อมูลในช่วงเวลาที่เลือก</span></div>`;

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
  const topControlBand = `
    <div class="mb-5 overflow-hidden rounded-xl border border-[#DCE8E4] bg-white">
      <div class="relative flex flex-wrap items-center justify-between gap-4 border-b border-[#E7EFEA] bg-gradient-to-r from-[#ECF7F4] via-[#F5FAF8] to-[#E2F1EC] px-5 py-4">
        <div class="flex min-w-0 items-center gap-3.5">
          <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D1EAE2] text-[#0F766E]">${icon('grid', 24)}</span>
          <div class="min-w-0">
            <h1 class="type-page-title text-ink">แดชบอร์ดฝ่ายบริการ</h1>
            <p class="mt-0.5 text-xs text-muted sm:text-sm">ติดตามงานบริการจากฐานข้อมูลจริงตามสิทธิ์ของคุณ แสดงภาพรวมและจำนวนรายการสะสมของทุกหมวดงานตั้งแต่เริ่มระบบ</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          ${skylineSvg}
          <div class="hidden text-right sm:block">
            <p class="text-sm font-bold text-[#0F4C46]">เทศบาลนครนนทบุรี</p>
            <p class="text-xs text-muted">“เมืองน่าอยู่ สะอาด ปลอดภัย เพื่อประชาชน”</p>
          </div>
        </div>
      </div>
      <section aria-labelledby="dashboard-filter-title" class="p-4 sm:px-5 sm:py-3.5">
        <h2 id="dashboard-filter-title" class="sr-only">${isFiltered ? 'ช่วงวันที่ดำเนินงาน' : 'ข้อมูลสะสมทั้งหมดตั้งแต่เริ่มระบบ'}</h2>
        <div class="flex flex-wrap items-end justify-between gap-3">
          <form id="dashboard-filter" class="grid min-w-0 flex-1 basis-[440px] gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] sm:items-end">
            <label class="min-w-0 text-xs font-bold text-ink">ตั้งแต่วันที่<input class="field mt-1" type="date" name="from" value="${esc(from)}" placeholder="ทั้งหมด"></label>
            <label class="min-w-0 text-xs font-bold text-ink">ถึงวันที่<input class="field mt-1" type="date" name="to" value="${esc(to)}" placeholder="ทั้งหมด"></label>
            <button type="submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-[#0D4A44] px-4 text-sm font-bold text-white hover:bg-[#0F766E]">${icon('filter', 16)}<span>กรองข้อมูล</span></button>
            ${isFiltered ? '<a href="#/dashboard" class="flex min-h-11 items-center justify-center rounded-md border border-line bg-white px-3 text-sm text-muted hover:bg-canvas" title="คืนค่าเป็นทั้งหมดทุกช่วงเวลา">ดูทั้งหมด</a>' : ''}
          </form>
          ${renderDatePresets({ from, to, formId: 'dashboard-filter' })}
          <p id="dashboard-filter-error" role="alert" class="hidden w-full mt-2 text-sm text-red-700"></p>
        </div>
      </section>
    </div>
  `;

  if (loading || (!data && !error)) return `${topControlBand}<div role="status" aria-live="polite" class="rounded-md border border-line bg-white p-6 text-sm text-muted">กำลังโหลดข้อมูลภาพรวม…</div>`;
  if (error) return `${topControlBand}<div role="alert" class="rounded-md border border-red-200 bg-red-50 p-5 text-sm text-red-700"><p class="font-semibold">โหลดข้อมูลภาพรวมไม่สำเร็จ</p><p class="mt-1">${esc(error)}</p><button type="button" data-action="retry-dashboard" class="mt-3 min-h-11 rounded-md border border-red-300 bg-white px-4 font-semibold">ลองอีกครั้ง</button></div>`;

  const visibleModules = modules.filter(module => Object.hasOwn(data.module_summary, module.id));
  const visible = id => visibleModules.some(module => module.id === id);
  const periodLink = id => (data.period?.from && data.period?.to)
    ? `${moduleHref(id)}?${new URLSearchParams({ from: data.period.from, to: data.period.to })}`
    : moduleHref(id);
  const periodTotal = data.period.total;
  const activeModuleCount = visibleModules.filter(module => data.module_summary[module.id].count > 0).length;
  const summaryCard = (label, value, suffix, description, iconName, iconBg, barColor) => `
    <div class="dashboard-card dashboard-kpi flex items-center justify-between gap-3 rounded-xl border border-line bg-white p-4 sm:p-5">
      <div class="flex min-w-0 flex-1 items-start gap-3.5">
        <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}">${icon(iconName, 22)}</span>
        <div class="min-w-0 flex-1">
          <p class="text-xs font-bold text-ink">${label}</p>
          <p class="dashboard-kpi-number type-kpi mt-1 text-ink">${number(value)} <span class="text-sm font-bold text-ink">${suffix}</span></p>
          <p class="mt-1 text-xs text-muted">${description}</p>
        </div>
      </div>
      ${miniBarsSvg(barColor)}
    </div>
  `;

  const usersNote = coverage => coverage?.missing ? `ยังไม่ระบุจำนวน ${number(coverage.missing)} รายการ` : '';
  const metricText = (module, key, value) => {
    const label = metricNames[key] || module.fields.find(field => field.name === key)?.label || key;
    const note = key === 'service_users_count' ? usersNote(data.module_summary[module.id]?.service_users_coverage) : '';
    return `<div class="rounded-lg border border-[#EAEEEC] bg-[#FAFBF9] px-3 py-2 text-left"><span class="block text-xs text-muted">${esc(label)}:</span><strong class="mt-0.5 block break-words text-sm font-bold tabular-nums text-ink">${value === null ? (key === 'service_users_count' ? 'ยังไม่มีข้อมูลจำนวนผู้ใช้บริการ' : 'ไม่มีข้อมูล') : `${number(value)} ${module.fields.find(field => field.name === key)?.unit || metricUnits[key] || ''}`}</strong>${note ? `<span class="mt-0.5 block text-xs text-muted">${note}</span>` : ''}</div>`;
  };
  const metricValue = (id, key) => data.module_summary[id]?.metrics[key] ?? 0;
  const waste = data.module_summary['waste-collections'];
  const wasteOverview = waste?.waste_overview;
  const groupMetrics = {
    cleaning: [
      ['ระยะทางงานอื่นรวม', visibleModules.filter(m => m.group === 'cleaning' && m.id !== 'waterway-cleanings').reduce((sum, m) => sum + metricValue(m.id, 'distance_km'), 0), 'กิโลเมตร', '', 'road'],
      ...(visible('waterway-cleanings') ? [['ระยะทางงานคลอง', metricValue('waterway-cleanings', 'distance_km'), 'เมตร', '', 'waves'], ['ผักตบชวาและมูลฝอยที่กำจัด', metricValue('waterway-cleanings', 'quantity'), 'ลูกบาศก์เมตร', '', 'box']] : []),
    ],
    waste: [
      ['น้ำหนักมูลฝอย', metricValue('waste-collections', 'weight'), 'กิโลกรัม', '', 'bag'],
    ],
    sanitation: [
      ...(visible('drain-cleanings') ? [['ตะกอนจากงานลอกท่อ', metricValue('drain-cleanings', 'sediment_quantity'), 'ลูกบาศก์เมตร', '', 'box']] : []),
      ...(visible('septic-pumpings') ? [['สิ่งปฏิกูลที่สูบ', metricValue('septic-pumpings', 'volume'), 'ลูกบาศก์เมตร', '', 'droplet'], ['ผู้ใช้บริการงานสูบสิ่งปฏิกูล', data.module_summary['septic-pumpings'].metrics.service_users_count ?? null, 'คน', usersNote(data.module_summary['septic-pumpings'].service_users_coverage), 'users']] : []),
      ...(visible('septic-treatments') ? [['บำบัดสิ่งปฏิกูลรวม', metricValue('septic-treatments', 'treated_volume'), 'ลูกบาศก์เมตร', '', 'flask'], ['ตะกอนสำหรับทำปุ๋ย', metricValue('septic-treatments', 'sludge_quantity'), 'กิโลกรัม', '', 'leaf']] : []),
    ],
    projects: [['ผู้เข้าร่วมโครงการ', metricValue('waste-management-projects', 'participants_count'), 'คน', '', 'users']],
  };
  const visibleGroups = groups.filter(group => visibleModules.some(m => m.group === group.id));
  const groupCards = visibleGroups.map(group => {
    const corridor = groupCorridors[group.id] || groupCorridors.cleaning;
    const firstMod = visibleModules.find(m => m.group === group.id);
    const groupCount = data.group_summary[group.id] || 0;
    const cols = group.id === 'waste' ? 'sm:grid-cols-2 lg:grid-cols-3' : group.id === 'cleaning' ? 'sm:grid-cols-3' : group.id === 'sanitation' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2';
    const metricBoxes = groupMetrics[group.id].map(([label, value, unit, note, ic]) => `
      <div class="flex min-w-0 items-start gap-2 text-left">
        <span class="mt-0.5 shrink-0 ${corridor.iconText}">${icon(ic || 'grid', 16)}</span>
        <div class="min-w-0 flex-1 text-left">
          <dt class="text-xs leading-snug text-muted">${label}</dt><dd class="m-0 mt-0.5 text-left text-sm font-bold tabular-nums text-ink">${value === null ? 'ยังไม่มีข้อมูลจำนวนผู้ใช้บริการ' : `${number(value)} ${unit}`}${note ? `<span class="block text-xs font-normal text-muted">${note}</span>` : ''}</dd>
        </div>
      </div>
    `).join('');
    const extraWaste = group.id === 'waste' ? wastePieChart({ breakdown: wasteOverview?.breakdown, esc, number, icon }) : '';
    const emptyProject = group.id === 'projects' && groupCount === 0 ? emptyIllustrationSvg : '';
    return `
      <section class="dashboard-card department-card flex min-w-0 flex-col justify-between rounded-xl border border-line bg-white p-5 ${corridor.top}">
        <div>
          <div class="flex items-start justify-between gap-3">
            <div class="flex min-w-0 items-center gap-3">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${corridor.circle}">${icon(corridor.groupIcon, 20)}</span>
              <div class="min-w-0">
                <h3 class="break-words text-base font-bold text-ink">${esc(group.label)}</h3>
                <p class="mt-0.5 text-xs text-muted">${corridor.subtitle}</p>
              </div>
            </div>
            ${firstMod ? `<a href="${periodLink(firstMod.id)}" class="inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition ${corridor.pill}"><span>ดูรายละเอียด</span>${icon('arrow', 14)}</a>` : ''}
          </div>
          <div class="mt-3.5 rounded-md px-3.5 py-2 ${corridor.band}">
            <p class="text-xl font-bold tabular-nums">${number(groupCount)} <span class="text-xs font-bold">${isFiltered ? 'รายการในช่วงที่เลือก' : 'รายการสะสม'}</span></p>
          </div>
          <dl class="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 border-t border-[#EAEEEC] pt-3.5 ${cols}">${metricBoxes}${extraWaste}${emptyProject ? `<div class="flex items-center justify-end">${emptyProject}</div>` : ''}</dl>
        </div>
      </section>
    `;
  }).join('');

  const groupedModuleLedger = visibleGroups.map(group => {
    const groupMods = visibleModules.filter(m => m.group === group.id);
    const corridor = groupCorridors[group.id] || groupCorridors.cleaning;
    const groupCount = data.group_summary[group.id] || 0;
    const rows = groupMods.map(module => {
      const item = data.module_summary[module.id];
      const metricsHtml = Object.entries(item.metrics).map(([key, value]) => metricText(module, key, value)).join('');
      return `
        <a href="${periodLink(module.id)}" class="grid min-w-0 grid-cols-1 items-center gap-3 border-t border-[#EAEEEC] bg-white px-4 py-3.5 transition hover:bg-[#F9FAF7] focus-visible:outline sm:px-5 lg:grid-cols-[minmax(280px,380px)_minmax(0,1fr)_auto]">
          <div class="flex min-w-0 items-center justify-between gap-3">
            <div class="flex min-w-0 items-center gap-3">
              <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${corridor.softIcon}">${icon(module.icon || corridor.groupIcon, 18)}</span>
              <span class="min-w-0 break-words text-sm font-bold leading-snug text-ink">${esc(module.short)}</span>
            </div>
            <strong class="shrink-0 rounded-full px-3 py-1 text-xs font-bold tabular-nums ${corridor.softIcon}">${number(item.count)} รายการ</strong>
          </div>
          <div class="grid min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">${metricsHtml || '<span class="text-xs text-muted">ไม่มีค่าปริมาณ</span>'}</div>
          <span class="hidden h-8 w-8 items-center justify-center rounded-full bg-[#FAFBF9] text-muted lg:inline-flex">${icon('chevron', 16)}</span>
        </a>
      `;
    }).join('');
    return `
      <div class="overflow-hidden rounded-xl border border-line bg-white ${corridor.top}">
        <div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-5 ${corridor.headerBg}">
          <div class="flex min-w-0 items-center gap-3">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${corridor.circle}">${icon(corridor.groupIcon, 20)}</span>
            <div class="min-w-0">
              <h3 class="text-sm font-bold text-ink">${esc(group.label)}</h3>
              <p class="mt-0.5 text-xs text-muted">${corridor.subtitle}</p>
            </div>
          </div>
          <span class="inline-flex items-baseline gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-muted border border-line"><strong class="text-base font-bold tabular-nums ${corridor.iconText}">${number(groupCount)}</strong> รายการรวม</span>
        </div>
        ${rows}
      </div>
    `;
  }).join('');

  const recentRows = data.recent.slice(0, 6).map(item => {
    const module = modules.find(candidate => candidate.id === item.module);
    if (!module) return '';
    const corridor = groupCorridors[module.group] || groupCorridors.cleaning;
    return `
      <a href="${moduleHref(module.id)}/${encodeURIComponent(item.id)}" class="flex min-w-0 flex-col gap-2 border-t border-[#EAEEEC] px-4 py-3 transition hover:bg-[#F9FAF7] first:border-t-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5">
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${corridor.softIcon}">${icon(module.icon || corridor.groupIcon, 18)}</span>
          <div class="min-w-0 flex-1">
            <strong class="block break-words text-sm font-bold text-ink">${esc(item.title || module.short)}</strong>
            <span class="block break-words text-xs text-muted">${esc(module.short)}</span>
          </div>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-x-4 gap-y-0.5 text-xs sm:flex-col sm:items-end">
          <span class="inline-flex items-center gap-1 font-bold tabular-nums text-ink"><span class="font-normal text-muted">ดำเนินงาน:</span> ${dashboardDate(item.service_date)}</span>
          <time class="text-xs tabular-nums text-muted" datetime="${esc(item.created_at)}">บันทึกเมื่อ ${dashboardDateTime(item.created_at)}</time>
        </div>
      </a>
    `;
  }).join('');

  const periodTotalLabel = isFiltered ? 'รายการในช่วงที่เลือก' : 'รายการสะสมทั้งหมด';
  const periodDescription = (data.period?.from && data.period?.to)
    ? `${dashboardDate(data.period.from)} – ${dashboardDate(data.period.to)}`
    : from ? `ตั้งแต่ ${dashboardDate(from)} เป็นต้นไป` : to ? `ถึง ${dashboardDate(to)}` : 'ข้อมูลสะสมตั้งแต่เริ่มระบบ';

  const operationalSplit = `
    <div class="dashboard-panels mb-6 grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
      <section class="flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-white" aria-labelledby="distribution-heading">
        <div class="flex items-start gap-3 border-b border-[#EAEEEC] bg-[#FAFBF9] px-4 py-3.5 sm:px-5">
          <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6F4F0] text-[#0F766E]">${icon('bars', 18)}</span>
          <div class="min-w-0">
            <h2 id="distribution-heading" class="text-base font-bold text-ink">สัดส่วนจำนวนรายการตามกลุ่มงาน</h2>
            <p class="mt-0.5 text-xs text-muted">${isFiltered ? 'ใช้ช่วงวันที่ที่เลือก' : 'ข้อมูลสะสมทั้งหมด'} · เฉพาะกลุ่มที่คุณมีสิทธิ์ดู</p>
          </div>
        </div>
        <div class="flex-1 p-4 sm:p-5">
          ${distributionChart({ groups: visibleGroups, summary: data.group_summary, esc, number, icon })}
        </div>
      </section>
      <section class="flex min-w-0 flex-col overflow-hidden rounded-xl border border-line bg-white" aria-labelledby="recent-heading">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAEEEC] bg-[#FAFBF9] px-4 py-3.5 sm:px-5">
          <div class="flex min-w-0 items-start gap-3">
            <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E6F4F0] text-[#0F766E]">${icon('fileText', 18)}</span>
            <div class="min-w-0">
              <h2 id="recent-heading" class="text-base font-bold text-ink">สมุดบันทึกกิจกรรมล่าสุด</h2>
              <p class="mt-0.5 text-xs text-muted">เรียงตามเวลาบันทึก ครอบคลุมข้อมูลทุกช่วงเวลา</p>
            </div>
          </div>
          <a href="#/reports" class="inline-flex shrink-0 items-center gap-1 rounded-full border border-line bg-white px-3 py-1 text-xs font-bold text-ink transition hover:bg-canvas"><span>ดูรายงานสรุป</span>${icon('chevron', 14)}</a>
        </div>
        <div class="flex-1">${recentRows || '<p class="p-4 text-sm text-muted">ยังไม่มีรายการบันทึก</p>'}</div>
      </section>
    </div>
  `;

  return `
    ${topControlBand}
    <section aria-label="ยอดรวม" class="dashboard-summary mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">${summaryCard(periodTotalLabel, periodTotal, 'รายการ', periodDescription + (isFiltered ? ` · จากยอดสะสมทั้งหมด ${number(data.total)} รายการ` : ''), 'fileText', 'bg-[#E6F4F0] text-[#0F766E]', '#0F766E')}${summaryCard('หมวดงานที่มีข้อมูล', activeModuleCount, 'หมวด', isFiltered ? 'มีรายการในช่วงวันที่ที่เลือก' : 'มีรายการสะสม เฉพาะหมวดที่คุณมีสิทธิ์ดู', 'layers', 'bg-[#DBEAFE] text-[#1D4ED8]', '#1D4ED8')}${summaryCard('ดำเนินงานวันนี้', data.today, 'รายการ', 'วันนี้ตามเวลาไทย ไม่ขึ้นกับช่วงที่เลือก', 'calendar', 'bg-[#FEF3C7] text-[#D97706]', '#D97706')}</section>
    <section aria-labelledby="group-heading" class="mb-6"><div class="mb-3.5 flex flex-wrap items-center gap-2.5"><span class="text-[#0F766E]">${icon('bars', 20)}</span><h2 id="group-heading" class="text-lg font-bold text-ink">ดัชนีภาพรวม 4 กลุ่มงาน</h2><span class="text-xs text-muted">สรุปจำนวนรายการและปริมาณงานหลักตามสายงาน</span></div>${visibleModules.length ? `<div class="dashboard-summary grid grid-cols-1 gap-4 lg:grid-cols-2">${groupCards}</div>` : '<p class="rounded-md border border-line bg-white p-4 text-sm text-muted">ไม่มีหมวดงานที่คุณมีสิทธิ์ดู</p>'}</section>
    ${operationalSplit}
    <section aria-labelledby="module-heading" class="mb-6"><div class="mb-3.5 flex flex-wrap items-center justify-between gap-2"><div class="flex items-center gap-2.5"><span class="text-[#0F766E]">${icon('layers', 20)}</span><h2 id="module-heading" class="text-lg font-bold text-ink">ทะเบียนงานบริการรายหมวด (9 หมวดงาน)</h2></div><p class="text-xs text-muted">${isFiltered ? 'จำนวนและปริมาณในช่วงวันที่ที่เลือก' : 'จำนวนและปริมาณสะสมทั้งหมด'}; คลิกที่หมวดงานเพื่อดูรายละเอียดหรือบันทึกข้อมูล</p></div>${isFiltered && periodTotal === 0 ? '<p class="mb-4 rounded-md border border-line bg-white p-4 text-sm text-muted">ยังไม่มีรายการดำเนินงานในช่วงวันที่นี้ ลองเลือกช่วงอื่นเพื่อดูข้อมูล</p>' : ''}<div class="space-y-4">${groupedModuleLedger}</div></section>
`;
}
