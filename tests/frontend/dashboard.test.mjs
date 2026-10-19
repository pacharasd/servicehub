import test from 'node:test';
import assert from 'node:assert/strict';
import { dashboardContent } from '../../src/dashboard.js';
import { groups, modules } from '../../src/data.js';
import { esc, number } from '../../src/utils/format.js';
import { icon } from '../../src/utils/icons.js';

function mockDashboardData(period = { from: null, to: null, total: 2 }) {
  const moduleSummary = {};
  for (const m of modules) {
    moduleSummary[m.id] = {
      group: m.group,
      count: m.id === 'road-washings' ? 2 : 0,
      metrics: { distance_km: m.id === 'road-washings' ? 15.0 : 0 },
    };
  }
  return {
    total: 2,
    today: 1,
    groups: { cleaning: 2 },
    recent: [
      {
        id: '1',
        module: 'road-washings',
        title: 'สุเหร่าวัดปากน้ำ',
        service_date: '2026-09-20',
        created_at: '2026-10-02 09:50:00',
      },
    ],
    period,
    group_summary: { cleaning: 2 },
    module_summary: moduleSummary,
    trend: [
      { from: '2026-05-01', to: '2026-05-31', count: 0 },
      { from: '2026-06-01', to: '2026-06-30', count: 0 },
      { from: '2026-07-01', to: '2026-07-31', count: 0 },
      { from: '2026-08-01', to: '2026-08-31', count: 0 },
      { from: '2026-09-01', to: '2026-09-30', count: 1 },
      { from: '2026-10-01', to: '2026-10-31', count: 1 },
    ],
  };
}

test('dashboardContent in all-time default mode links directly to unconstrained module routes', () => {
  const data = mockDashboardData({ from: null, to: null, total: 2 });
  const html = dashboardContent({
    data,
    loading: false,
    error: '',
    params: new URLSearchParams(),
    groups,
    modules,
    icon,
    esc,
    number,
    moduleHref: (id) => `#/module/${id}`,
  });

  // Verify heading and labels for all-time
  assert.match(html, /ข้อมูลสะสมทั้งหมดตั้งแต่เริ่มระบบ/);
  assert.match(html, /รายการสะสมทั้งหมด/);
  assert.match(html, /ข้อมูลสะสมตั้งแต่เริ่มระบบ/);

  // Verify 'all' preset button has aria-pressed="true"
  assert.match(html, /data-preset="all"[^>]*aria-pressed="true"/);

  // Verify unconstrained module link (NO ?from=...&to=...)
  assert.match(html, /href="#\/module\/road-washings"/);
  assert.doesNotMatch(html, /href="#\/module\/road-washings\?from=/);

  // Verify recent row displays service date and creation date cleanly
  assert.match(html, /สุเหร่าวัดปากน้ำ/);
  assert.match(html, /ดำเนินงาน:.*20 ก\.ย\. 2569/);
  assert.match(html, /บันทึกเมื่อ 2 ต\.ค\. 2569/);
});

test('dashboardContent in filtered mode links with date parameters and shows filtered labels', () => {
  const data = mockDashboardData({ from: '2026-10-01', to: '2026-10-31', total: 1 });
  const html = dashboardContent({
    data,
    loading: false,
    error: '',
    params: new URLSearchParams('from=2026-10-01&to=2026-10-31'),
    groups,
    modules,
    icon,
    esc,
    number,
    moduleHref: (id) => `#/module/${id}`,
  });

  // Verify filtered labels
  assert.match(html, /ช่วงวันที่ดำเนินงาน/);
  assert.match(html, /รายการในช่วงที่เลือก/);
  assert.match(html, /1 ต\.ค\. 2569 – 31 ต\.ค\. 2569/);

  // Verify clear filter button to all-time
  assert.match(html, /href="#\/dashboard"[^>]*>ดูทั้งหมด<\/a>/);

  // Verify constrained module link WITH date query params
  assert.match(html, /href="#\/module\/road-washings\?from=2026-10-01&(?:amp;)?to=2026-10-31"/);
});
test('dashboard separates waterway meters from other cleaning kilometers', () => {
  const data = mockDashboardData();
  data.module_summary['waterway-cleanings'].metrics.distance_km = 100;
  const html = dashboardContent({ data, loading: false, error: '', params: new URLSearchParams(), groups, modules, icon, esc, number, moduleHref: id => '#/module/' + id });
  assert.match(html, /ระยะทางงานคลอง<\/dt><dd[^>]*>100 เมตร/);
  assert.match(html, /ระยะทางงานอื่นรวม<\/dt><dd[^>]*>15 กิโลเมตร/);
  assert.doesNotMatch(html, /115 กิโลเมตร/);
});

function renderWaste(data, options = {}) {
  return dashboardContent({ data, loading: false, error: '', params: new URLSearchParams(), groups, modules, icon, esc, number, moduleHref: id => '#/module/' + id, ...options });
}

test('waste card shows weights and escaped top name without a report link', () => {
  const data = mockDashboardData({ from: '2026-10-01', to: '2026-10-31', total: 3 });
  data.module_summary['waste-collections'] = { count: 3, metrics: { weight: 1250.5 }, waste_overview: { hazardous_weight: 12.5, top_type: { code: 'WASTE-001', name: '<ทั่วไป>', weight: 1238 } } };
  const html = renderWaste(data);
  assert.match(html, /น้ำหนักมูลฝอย<\/dt><dd[^>]*>1,250.5 กิโลกรัม/);
  assert.match(html, /น้ำหนักขยะอันตราย<\/dt><dd[^>]*>12.5 กิโลกรัม/);
  assert.match(html, /ประเภทที่มีน้ำหนักมากที่สุด<\/dt><dd[^>]*break-words[^>]*>&lt;ทั่วไป&gt; · 1,238 กิโลกรัม/);
  assert.doesNotMatch(html, /href="#\/reports\/waste-collections|ดูรายงานช่วงนี้|ดูรายงานเดือนนี้/);
  assert.ok(html.indexOf('น้ำหนักมูลฝอย') < html.indexOf('น้ำหนักขยะอันตราย'));
  assert.ok(html.indexOf('น้ำหนักขยะอันตราย') < html.indexOf('ประเภทที่มีน้ำหนักมากที่สุด'));
});

test('waste card handles empty and zero weights without report links', () => {
  for (const period of [{ from: null, to: null, total: 0 }, { from: '2026-10-01', to: null, total: 0 }, { from: null, to: '2026-10-31', total: 0 }]) {
    const data = mockDashboardData(period);
    data.module_summary['waste-collections'] = { count: 0, metrics: { weight: 0 }, waste_overview: { hazardous_weight: 0, top_type: null } };
    assert.doesNotMatch(renderWaste(data), /href="#\/reports\/waste-collections|ดูรายงานเดือนนี้/);
    assert.match(renderWaste(data), /ประเภทที่มีน้ำหนักมากที่สุด<\/dt><dd[^>]*>ยังไม่มีข้อมูล/);
    data.module_summary['waste-collections'].count = 1;
    assert.match(renderWaste(data), /ยังไม่มีน้ำหนักที่บันทึก/);
  }
});

test('loading errors and restricted permissions do not fabricate waste summaries', () => {
  const data = mockDashboardData();
  for (const options of [{ loading: true }, { error: 'ลองใหม่ภายหลัง' }]) {
    const html = renderWaste(data, options);
    assert.doesNotMatch(html, /น้ำหนักขยะอันตราย|0 กิโลกรัม|ดูรายงานเดือนนี้/);
  }
  delete data.module_summary['waste-collections'];
  assert.doesNotMatch(renderWaste(data), /น้ำหนักขยะอันตราย|ดูรายงานเดือนนี้/);
});

test('dashboard KPIs distinguish record count, active modules and today without losing all-time context', async () => {
  const { JSDOM } = await import('jsdom');
  const data = mockDashboardData({from:'2026-10-01',to:'2026-10-31',total:1});
  const html = renderWaste(data);
  const doc = new JSDOM(html).window.document;
  const cards = [...doc.querySelector('[aria-label="ยอดรวม"]').children];
  assert.equal(cards.length,3);
  assert.match(cards[0].textContent,/รายการในช่วงที่เลือก/);
  assert.match(cards[0].textContent,/จากยอดสะสมทั้งหมด 2 รายการ/);
  assert.match(cards[1].textContent,/หมวดงานที่มีข้อมูล/);
  assert.match(cards[1].querySelector('.type-kpi').textContent,/1 หมวด/);
  assert.match(cards[2].textContent,/ดำเนินงานวันนี้/);
  assert.match(cards[2].textContent,/ไม่ขึ้นกับช่วงที่เลือก/);
  assert.ok(html.indexOf('id="waste-weight-heading"') < html.indexOf('id="module-heading"'));
  assert.ok(html.indexOf('id="recent-heading"') < html.indexOf('id="module-heading"'));
  const form = doc.getElementById('dashboard-filter');
  assert.ok(form.parentElement.querySelector('#dashboard-filter-error'));
  assert.doesNotMatch(form.className,/240px/);
  assert.ok(doc.querySelector('.department-card'));
  data.module_summary['road-washings'].count=0;
  const empty = new JSDOM(renderWaste(data)).window.document;
  assert.match([...empty.querySelector('[aria-label="ยอดรวม"]').children][1].querySelector('.type-kpi').textContent,/0 หมวด/);
});

test('waste chart follows dashboard permissions and loading/error state', () => {
  const data=mockDashboardData();
  data.module_summary['waste-collections'].waste_overview={breakdown:[{code:'A',name:'ขยะจริง',weight:1234.5}]};
  let html=renderWaste(data);
  assert.match(html,/1,234.5 กิโลกรัม/);
  assert.doesNotMatch(html,/แนวโน้มจำนวนรายการ/);
  delete data.module_summary['waste-collections'];
  html=renderWaste(data);
  assert.doesNotMatch(html,/waste-weight-heading|xl:grid-cols-2/);
  assert.match(html,/distribution-heading/);
  assert.match(html,/recent-heading/);
});
