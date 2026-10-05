import test from 'node:test';
import assert from 'node:assert/strict';
import { apiRequest } from '../../src/api.js';
import { invalidateActivityReference, renderActivitiesView } from '../../src/views/activities.js';

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

