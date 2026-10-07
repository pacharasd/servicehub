import test from 'node:test';
import assert from 'node:assert/strict';
import { apiRequest } from '../../src/api.js';
import { invalidateActivityReference, renderActivitiesView, formPage, validateForm } from '../../src/views/activities.js';
import { modules } from '../../src/data.js';

function setEnvironment(fetchResponse) {
  const requests = [];
  globalThis.window = {
    serviceHubUser: { roles: ['super-admin'], permissions: [] },
    serviceHubUrls: {
      apiActivities: '/api/activities/__MODULE__',
      apiReferences: '/api/references/__TYPE__',
    },
  };
  globalThis.document = { querySelector: () => null };
  globalThis.fetch = async (url) => {
    requests.push(String(url));
    return fetchResponse(String(url));
  };
  return requests;
}

function jsonResponse(data, status = 200, headers = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: (name) => headers[name] ?? null },
    json: async () => data,
  };
}

test('activity list requests only its module page and uses server totals', async () => {
  const requests = setEnvironment(() => jsonResponse({
    data: [{ id: '8', module: 'waterway-cleanings', service_date: '2026-10-01', waterway_name: 'คลองหนึ่ง' }],
    meta: { total: 13, current_page: 2, last_page: 3 },
  }));

  const html = await renderActivitiesView({
    parts: ['module', 'waterway-cleanings'],
    params: new URLSearchParams('page=2&q=%E0%B8%84%E0%B8%A5%E0%B8%AD%E0%B8%87&from=2026-10-01&sort=oldest'),
    isCurrent: () => true,
  });

  assert.equal(requests.length, 1);
  const request = new URL(requests[0], 'https://example.test');
  assert.equal(request.pathname, '/api/activities/waterway-cleanings');
  assert.equal(request.searchParams.get('per_page'), '6');
  assert.equal(request.searchParams.get('page'), '2');
  assert.equal(request.searchParams.get('q'), 'คลอง');
  assert.equal(request.searchParams.get('from'), '2026-10-01');
  assert.equal(request.searchParams.get('sort'), 'oldest');
  assert.match(html, /พบ 13 รายการ/);
  assert.match(html, /2 \/ 3/);
  assert.match(html, /<button type="submit"[^>]*>ค้นหา<\/button>/);
  assert.match(html, /พิมพ์คำค้นหาแล้วกด Enter/);
  assert.doesNotMatch(html, /data-action="live-filter"/);
});

test('a referenced module loads only its own records and reference choices', async () => {
  invalidateActivityReference('cleaning-zones');
  const requests = setEnvironment((url) => url.includes('/references/')
    ? jsonResponse({ data: [{ id: 1, name: 'เขต 1', is_active: true }], meta: { last_page: 1 } })
    : jsonResponse({ data: [], meta: { total: 0, current_page: 1, last_page: 1 } }));

  await renderActivitiesView({
    parts: ['module', 'road-washings'],
    params: new URLSearchParams('cleaning_zone_id=1'),
    isCurrent: () => true,
  });

  assert.equal(requests.length, 2);
  assert.ok(requests.some((url) => url.includes('/api/activities/road-washings?')));
  assert.ok(requests.some((url) => url.includes('/api/references/cleaning-zones?')));
  assert.ok(requests.every((url) => !url.includes('waterway-cleanings')));
  assert.ok(requests.some((url) => url.includes('cleaning_zone_id=1')));
});

test('activity detail fetches its record directly without loading list pages', async () => {
  const requests = setEnvironment(() => jsonResponse({ data: {
    id: '42', module: 'waterway-cleanings', service_date: '2026-10-01', waterway_name: 'คลองหนึ่ง',
  } }));

  const html = await renderActivitiesView({
    parts: ['module', 'waterway-cleanings', '42'],
    params: new URLSearchParams(),
    isCurrent: () => true,
  });

  assert.deepEqual(requests, ['/api/activities/waterway-cleanings/42']);
  assert.match(html, /คลองหนึ่ง/);
});

test('429 exposes Retry-After without automatically repeating the request', async () => {
  const requests = setEnvironment(() => jsonResponse({ message: 'Too Many Requests' }, 429, { 'Retry-After': '42' }));

  await assert.rejects(
    apiRequest('/api/activities/road-washings'),
    (error) => error.status === 429 && error.retryAfterSeconds === 42,
  );
  assert.equal(requests.length, 1);
});

test('fast route switching discards stale activity responses without rendering', async () => {
  let finishWaterway;
  const slowPromise = new Promise((resolve) => { finishWaterway = resolve; });

  setEnvironment((url) => {
    if (url.includes('waterway-cleanings')) {
      return slowPromise.then(() => jsonResponse({ data: [], meta: { total: 0 } }));
    }
    return jsonResponse({ data: [], meta: { total: 0 } });
  });

  let currentHash = '#/module/waterway-cleanings';
  const ctxWaterway = {
    parts: ['module', 'waterway-cleanings'],
    params: new URLSearchParams(),
    isCurrent: () => currentHash === '#/module/waterway-cleanings',
  };

  const pendingWaterway = renderActivitiesView(ctxWaterway);
  currentHash = '#/module/road-sweepings';

  finishWaterway();
  const result = await pendingWaterway;
  assert.equal(result, null);
});

test('activity list renders active filter banner and contextual empty state when no records match filter', async () => {
  setEnvironment(() => jsonResponse({
    data: [],
    meta: { total: 0, current_page: 1, last_page: 1 },
  }));

  const html = await renderActivitiesView({
    parts: ['module', 'road-washings'],
    params: new URLSearchParams('from=2026-10-01&to=2026-10-31'),
    isCurrent: () => true,
  });

  assert.match(html, /กำลังกรองข้อมูล:/);
  assert.match(html, /ช่วงวันที่ 1 ต\.ค\. 2569 – 31 ต\.ค\. 2569/);
  assert.match(html, /ไม่พบรายการ/);
  assert.match(html, /href="#\/module\/road-washings"/);
  assert.match(html, /แสดงข้อมูลทั้งหมดทุกช่วงเวลา/);
  assert.match(html, /ไม่พบรายการข้อมูลตามเงื่อนไขที่เลือก/);
  assert.match(html, /ไม่มีการบันทึกงานบริการการล้างทำความสะอาดถนน/);
});

test('activity list renders active filter banner with count when filtered records exist', async () => {
  setEnvironment(() => jsonResponse({
    data: [{ id: '1', module: 'road-washings', service_date: '2026-10-02', location: 'สุเหร่าวัดปากน้ำ' }],
    meta: { total: 1, current_page: 1, last_page: 1 },
  }));

  const html = await renderActivitiesView({
    parts: ['module', 'road-washings'],
    params: new URLSearchParams('from=2026-10-01&to=2026-10-31&q=%E0%B8%AA%E0%B8%B8%E0%B9%87%E0%B8%AB%E0%B8%A3%E0%B9%88%E0%B8%B2'),
    isCurrent: () => true,
  });

  assert.match(html, /กำลังกรองข้อมูล:/);
  assert.match(html, /พบ 1 รายการ/);
  assert.match(html, /แสดงข้อมูลทั้งหมดทุกช่วงเวลา/);
});

test('activity list renders standard empty state without filter banner when no filters are active', async () => {
  setEnvironment(() => jsonResponse({
    data: [],
    meta: { total: 0, current_page: 1, last_page: 1 },
  }));

  const html = await renderActivitiesView({
    parts: ['module', 'road-washings'],
    params: new URLSearchParams(),
    isCurrent: () => true,
  });

  assert.doesNotMatch(html, /กำลังกรองข้อมูล:/);
  assert.match(html, /ยังไม่มีข้อมูลในหมวดนี้/);
  assert.match(html, /เพิ่มข้อมูลใหม่/);
});

test('waste form requires a valid end date and uses kilograms', () => {
  setEnvironment(() => jsonResponse({ data: [] }));
  const module = modules.find((item) => item.id === 'waste-collections');
  const html = formPage({ module });
  assert.match(html, /วันเริ่ม/);
  assert.match(html, /name="end_date"[^>]*value=""/);
  assert.match(html, /กิโลกรัม/);
  const NativeFormData = globalThis.FormData;
  globalThis.FormData = class {
    constructor(values) { return Object.entries(values); }
  };
  try {
    const data = { service_date: '2026-09-30', end_date: '2026-10-02', source: 'จุดเก็บ', waste_type_id: '1', waste_name: 'ขยะ', weight: '12.345' };
    const refs = { 'waste-types': [{ id: 1, is_active: true }] };
    assert.deepEqual(validateForm(data, module, refs).errors, {});
    for (const end of ['', '2026-09-29', '2026-02-30', 'invalid']) {
      assert.ok(validateForm({ ...data, end_date: end }, module, refs).errors.end_date);
    }
    assert.deepEqual(validateForm({ ...data, end_date: data.service_date }, module, refs).errors, {});
  } finally {
    globalThis.FormData = NativeFormData;
  }
});

test('formPage defaults service_date to today for new records and preserves existing record service_date', () => {
  setEnvironment(() => jsonResponse({ data: [] }));

  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const part = (type) => parts.find((item) => item.type === type).value;
  const todayIso = `${part('year')}-${part('month')}-${part('day')}`;

  const roadModule = modules.find((m) => m.id === 'road-washings');

  // New record
  const newHtml = formPage({
    module: roadModule,
    group: { label: 'งานบริการ' },
    record: null,
  });
  assert.match(newHtml, new RegExp(`name="service_date"[^>]*value="${todayIso}"`));

  // Edit existing record
  const editHtml = formPage({
    module: roadModule,
    group: { label: 'งานบริการ' },
    record: { id: '99', service_date: '2026-09-15' },
  });
  assert.match(editHtml, /name="service_date"[^>]*value="2026-09-15"/);
});
