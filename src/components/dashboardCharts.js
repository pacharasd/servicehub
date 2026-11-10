const piePalette = ['#B45309', '#0F766E', '#1D4ED8', '#4338CA', '#166534', '#92400E', '#075985'];

const polar = (cx, cy, r, deg) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [+(cx + r * Math.cos(rad)).toFixed(2), +(cy + r * Math.sin(rad)).toFixed(2)];
};

const formatPercent = (weight, total, number) => {
  if (total <= 0 || weight <= 0) return '0%';
  const raw = (weight / total) * 100;
  if (raw < 0.1) return '<0.1%';
  return `${number(Math.round(raw * 10) / 10)}%`;
};

function computePieSlices(positiveRows, total) {
  if (total <= 0) {
    return '<circle cx="130" cy="130" r="108" fill="#ECEEE9" stroke="#D8DDD8" stroke-width="1.5"></circle>';
  }
  if (positiveRows.length === 1) {
    return `<circle cx="130" cy="130" r="108" fill="${positiveRows[0].color}"></circle>`;
  }
  const minSweep = 22;
  const rawSweeps = positiveRows.map(row => (row.weight / total) * 360);
  const smallIndices = rawSweeps.map((s, i) => (s < minSweep ? i : -1)).filter(i => i !== -1);
  const largeSum = rawSweeps.reduce((sum, s) => (s >= minSweep ? sum + s : sum), 0);
  const reserved = smallIndices.length * minSweep;
  const sweeps = rawSweeps.map(s => {
    if (s < minSweep) return minSweep;
    return largeSum > 0 ? (s / largeSum) * Math.max(360 - reserved, minSweep) : 360 / positiveRows.length;
  });

  let angle = 0;
  return positiveRows.map((row, idx) => {
    const sweep = sweeps[idx];
    const mid = angle + sweep / 2;
    const isTiny = (row.weight / total) * 100 < 5;
    const offset = isTiny ? 10 : 0;
    const [cx, cy] = offset ? polar(130, 130, offset, mid) : [130, 130];
    const [x1, y1] = polar(cx, cy, 104, angle);
    angle += sweep;
    const [x2, y2] = polar(cx, cy, 104, angle);
    const largeArc = sweep > 180 ? 1 : 0;
    return `<path d="M ${cx} ${cy} L ${x1} ${y1} A 104 104 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${row.color}" stroke="#FFFFFF" stroke-width="2" data-exploded="${isTiny ? 'true' : 'false'}"></path>`;
  }).join('');
}

export function wastePieChart({ breakdown, esc, number, icon }) {
  const rows = Array.isArray(breakdown) ? breakdown : [];
  if (!rows.length) {
    return '<p class="col-span-full mt-1 text-xs text-muted">ยังไม่มีข้อมูลประเภทขยะ</p>';
  }
  const total = rows.reduce((sum, row) => sum + (Number(row.weight) || 0), 0);
  const icons = ['fileText', 'recycle', 'leaf', 'flask', 'box'];
  return rows.map((row, idx) => {
    const weight = Number(row.weight) || 0;
    const pctText = formatPercent(weight, total, number);
    const ic = icon ? icon(icons[idx % icons.length], 16) : '';
    return `<div class="flex min-w-0 items-start gap-2 text-left"><span class="mt-0.5 shrink-0 text-[#0F766E]">${ic}</span><div class="min-w-0 flex-1 text-left"><dt class="text-xs leading-snug text-muted">${esc(row.name || 'ไม่ระบุประเภท')}</dt><dd class="m-0 mt-0.5 text-left text-sm font-bold tabular-nums text-ink"><strong>${number(weight)}</strong> <span class="block text-xs font-normal text-muted">กิโลกรัม (${pctText})</span></dd></div></div>`;
  }).join('');
}

export function wasteWeightChart({ breakdown, esc, number }) {
  if (!Array.isArray(breakdown)) return '<p role="alert" class="mt-4 text-sm text-muted">ไม่สามารถแสดงข้อมูลน้ำหนักแยกประเภทได้ กรุณาโหลดข้อมูลอีกครั้ง</p>';
  if (!breakdown.length) return '<p class="mt-4 text-sm text-muted">ยังไม่มีข้อมูลมูลฝอยในช่วงวันที่นี้</p>';
  const maximum = Math.max(...breakdown.map(row => row.weight));
  const total = breakdown.reduce((sum, row) => sum + (Number(row.weight) || 0), 0);
  const table = `<table class="sr-only"><caption>น้ำหนักมูลฝอยแยกตามประเภทขยะ หน่วยกิโลกรัม</caption><thead><tr><th scope="col">ประเภทขยะ</th><th scope="col">น้ำหนัก (กิโลกรัม)</th></tr></thead><tbody>${breakdown.map(row => `<tr><th scope="row">${esc(row.name || 'ไม่ระบุประเภท')}</th><td>${number(row.weight)}</td></tr>`).join('')}</tbody></table>`;
  if (maximum <= 0) return '<p class="mt-4 text-sm text-muted">ยังไม่มีน้ำหนักที่บันทึกในช่วงวันที่นี้ ทุกประเภทมีน้ำหนัก 0 กิโลกรัม</p>' + table;
  const positiveRows = breakdown.map((row, idx) => ({ ...row, weight: Number(row.weight) || 0, color: piePalette[idx % piePalette.length] })).filter(row => row.weight > 0);
  const slices = computePieSlices(positiveRows, total);
  const rowsHtml = breakdown.map((row, idx) => {
    const weight = Number(row.weight) || 0;
    const pctText = formatPercent(weight, total, number);
    const color = piePalette[idx % piePalette.length];
    return `<div class="distribution-row min-w-0"><div class="flex min-w-0 flex-wrap items-baseline justify-between gap-2"><dt class="flex min-w-0 items-center gap-2 break-words text-sm font-bold text-ink"><span class="h-3.5 w-3.5 shrink-0 rounded-xs" style="background-color:${color}" aria-hidden="true"></span><span>${esc(row.name || 'ไม่ระบุประเภท')}</span></dt><dd class="m-0 min-w-0 text-right text-sm tabular-nums text-ink"><strong>${number(weight)} กิโลกรัม</strong> <span class="text-xs text-muted">(${pctText})</span></dd></div><div class="distribution-track mt-1.5"><div class="distribution-fill" style="width:${weight / maximum * 100}%;background-color:${color}"></div></div></div>`;
  }).join('');
  return `<div class="mt-4 grid min-w-0 grid-cols-1 items-center gap-6 md:grid-cols-[260px_minmax(0,1fr)]" data-waste-pie="true" aria-hidden="true"><div class="flex flex-col items-center justify-center rounded-md border border-[#EAEEEC] bg-[#FAFBF9] p-4"><svg viewBox="0 0 260 260" class="h-56 w-56 sm:h-60 sm:w-60 shrink-0" role="img" aria-label="สัดส่วนน้ำหนักมูลฝอยแยกตามประเภทขยะ">${slices}</svg><p class="mt-2 text-center text-xs text-muted">ขยายสัดส่วนย่อยเพื่อให้เห็นทุกประเภทชัดเจน</p></div><dl class="m-0 min-w-0">${rowsHtml}</dl></div>${table}`;
}

export function distributionChart({ groups, summary, esc, number, icon }) {
  const total = groups.reduce((sum, group) => sum + (summary[group.id] || 0), 0);
  if (!total) return '<p class="mt-4 text-sm text-muted">ไม่มีรายการสำหรับแสดงสัดส่วนในช่วงนี้</p>';
  const groupStyles = {
    cleaning: { bg: 'bg-[#E6F4F0] text-[#0F766E]', bar: '#0F766E', icon: 'sparkles' },
    waste: { bg: 'bg-[#DBEAFE] text-[#1D4ED8]', bar: '#2563EB', icon: 'recycle' },
    sanitation: { bg: 'bg-[#FEF3C7] text-[#D97706]', bar: '#D97706', icon: 'droplet' },
    projects: { bg: 'bg-[#EDE9FE] text-[#6D28D9]', bar: '#7C3AED', icon: 'chart' },
  };
  return `<dl class="m-0 flex flex-col gap-3">${groups.map(group => {
    const count = summary[group.id] || 0;
    const percent = (count / total) * 100;
    const pctRounded = Math.round(percent * 10) / 10;
    const st = groupStyles[group.id] || groupStyles.cleaning;
    const ic = icon ? icon(group.icon || st.icon, 20) : '';
    return `<div class="distribution-row flex items-center gap-3.5 rounded-xl border border-[#EAEEEC] bg-[#FAFBF9] px-3.5 py-3"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${st.bg}">${ic}</span><div class="min-w-0 flex-1"><dt class="truncate text-xs font-bold text-ink">${esc(group.label)}</dt><dd class="m-0 mt-1 flex items-center gap-3"><span class="w-24 shrink-0 text-xs tabular-nums text-muted"><strong class="text-sm font-bold text-ink">${number(count)}</strong> รายการ</span><div class="distribution-track h-2 flex-1 overflow-hidden rounded-full bg-[#E5EAE7]" aria-hidden="true"><div class="distribution-fill h-full rounded-full" style="width:${percent}%;background-color:${st.bar}"></div></div><strong class="w-12 shrink-0 text-right text-xs font-bold tabular-nums text-ink">${number(pctRounded)}%</strong></dd></div></div>`;
  }).join('')}</dl>`;
}
