export function wasteWeightChart({ breakdown, esc, number }) {
  if (!Array.isArray(breakdown)) return '<p role="alert" class="mt-4 text-sm text-muted">ไม่สามารถแสดงข้อมูลน้ำหนักแยกประเภทได้ กรุณาโหลดข้อมูลอีกครั้ง</p>';
  if (!breakdown.length) return '<p class="mt-4 text-sm text-muted">ยังไม่มีข้อมูลมูลฝอยในช่วงวันที่นี้</p>';
  const maximum = Math.max(...breakdown.map(row => row.weight));
  const table = `<table class="sr-only"><caption>น้ำหนักมูลฝอยแยกตามประเภทขยะ หน่วยกิโลกรัม</caption><thead><tr><th scope="col">ประเภทขยะ</th><th scope="col">น้ำหนัก (กิโลกรัม)</th></tr></thead><tbody>${breakdown.map(row => `<tr><th scope="row">${esc(row.name || 'ไม่ระบุประเภท')}</th><td>${number(row.weight)}</td></tr>`).join('')}</tbody></table>`;
  if (maximum <= 0) return '<p class="mt-4 text-sm text-muted">ยังไม่มีน้ำหนักที่บันทึกในช่วงวันที่นี้ ทุกประเภทมีน้ำหนัก 0 กิโลกรัม</p>' + table;
  return `<dl aria-hidden="true">${breakdown.map(row => `<div class="distribution-row min-w-0"><dt class="min-w-0 break-words text-sm">${esc(row.name || 'ไม่ระบุประเภท')}</dt><dd class="m-0 min-w-0"><p class="break-words text-right text-sm tabular-nums">${number(row.weight)} กิโลกรัม</p><div class="distribution-track mt-2"><div class="distribution-fill" style="width:${row.weight / maximum * 100}%"></div></div></dd></div>`).join('')}</dl>${table}`;
}

export function distributionChart({ groups, summary, esc, number }) {
  const total = groups.reduce((sum,group) => sum + (summary[group.id] || 0),0);
  if (!total) return '<p class="mt-4 text-sm text-muted">ไม่มีรายการสำหรับแสดงสัดส่วนในช่วงนี้</p>';
  return `<dl>${groups.map(group => {
    const count = summary[group.id] || 0;
    const percent = count/total*100;
    return `<div class="distribution-row"><dt class="text-sm font-semibold">${esc(group.label)}</dt><dd class="m-0"><div class="flex flex-wrap justify-between gap-2 text-sm"><span>${number(count)} รายการ</span><strong>${number(Math.round(percent*10)/10)}%</strong></div><div class="distribution-track mt-2" aria-hidden="true"><div class="distribution-fill" style="width:${percent}%"></div></div></dd></div>`;
  }).join('')}</dl>`;
}
