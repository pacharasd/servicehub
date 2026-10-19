import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { reportBody } from '../../src/reports.js';
import { modules, groups } from '../../src/data.js';
import { esc, number, thaiDate } from '../../src/utils/format.js';
const dom = new JSDOM('');
globalThis.window = dom.window;
window.serviceHubUrls = { apiReportsExport: '/api/reports/export', apiReportDetailExport: '/api/reports/__MODULE__/export' };
const meta = { period: { from: '2026-10-01', to: '2026-10-14' }, comparison: { from: '2026-09-01', to: '2026-09-14' }, total: 5, previous_total: 0 };
const data = Object.fromEntries(modules.map(m => [m.id, {count: 1, quantities: {distance_km: [{total: 10, unit: m.id === 'waterway-cleanings' ? 'เมตร' : 'กิโลเมตร', kind: 'sum'}]}}]));
const render = options => reportBody({ module: null, params: new URLSearchParams('month=2026-10'), data, meta, loading: false, error: '', modules, groups, can: () => true, esc, number, thaiDate, moduleHref: id => '#/module/'+id, ...options });
test('reports use grouped accessible tables with one count per module, Excel primary and comparison collapsed', () => {
  const html = render();
  const doc = new JSDOM(html).window.document;
  assert.equal(doc.querySelectorAll('table').length, 4);
  assert.equal(doc.querySelectorAll('thead').length, 4);
  assert.equal(doc.querySelectorAll('article').length, 0);
  assert.equal(doc.querySelector('.report-comparison').hasAttribute('open'), false);
  assert.equal(doc.querySelector('[data-action="download-report"]').getAttribute('href'), '/api/reports/export?month=2026-10&format=xlsx');
  assert.equal(doc.querySelectorAll('a[href^="#/reports/"]').length, 9);
  assert.match(html, /overflow-x-auto/);
  assert.match(html, /text-right tabular-nums/);
});
test('report detail separates metrics, latest balance and breakdown and keeps exact list dates', () => {
  const module = modules.find(m => m.id === 'waste-collections');
  const html = render({module, data: { count: 2, previous_count: 0, quantities: {weight: [{total: 123.5,unit:'กิโลกรัม',kind:'sum'}]}, breakdown: [{name:'<ขยะ>',count:2,total:123.5,unit:'กิโลกรัม'}] }});
  assert.match(html, /&lt;ขยะ&gt;/);
  assert.match(html, /123.5/);
  assert.match(html, /href="#\/module\/waste-collections\?from=2026-10-01&amp;to=2026-10-14"/);
  assert.doesNotMatch(html, /รายการล่าสุดตามวันที่/);
});
test('restricted export scope and errors are explicit', () => {
  assert.match(render({can: permission => permission !== 'waste-collections.export'}), /ไฟล์ส่งออกมีเฉพาะหมวดที่คุณมีสิทธิ์ส่งออก/);
  assert.doesNotMatch(render({can: permission => !permission.endsWith('.export')}), /ดาวน์โหลด Excel/);
  assert.match(render({error:'โหลดไม่ได้'}), /role="alert"/);
  assert.match(render({loading:true}), /กำลังโหลดรายงาน/);
});

test('shared report labels and units match all activity field definitions', async () => {
  const { default: catalog } = await import('../../resources/report-catalog.json', { with: { type: 'json' } });
  for (const module of modules) {
    assert.deepEqual(catalog.modules.find(m => m.id === module.id).fields, module.fields);
  }
});

test('multiple metrics share a single count cell rather than duplicating totals', () => {
  const copy = structuredClone(data);
  copy['septic-pumpings'] = {count: 7, quantities: {volume: [{total:2,unit:'ลูกบาศก์เมตร',kind:'sum'}],fee_amount:[{total:3,unit:'บาท',kind:'sum'}]}};
  const doc = new JSDOM(render({data:copy})).window.document;
  const cell = [...doc.querySelectorAll('td')].find(td => td.textContent === 'งานสูบสิ่งปฏิกูล');
  assert.equal(cell.rowSpan, 2);
  assert.equal(cell.nextElementSibling.textContent, '7');
  assert.equal(cell.parentElement.nextElementSibling.children.length, 3);
});
