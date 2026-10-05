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
