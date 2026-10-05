import test from 'node:test';
import assert from 'node:assert/strict';
import { Router } from '../../src/router.js';

function environment(hash, permissions = []) {
  globalThis.window = {
    location: { hash },
    serviceHubUser: { roles: ['viewer'], permissions },
    serviceHubUrls: { login: '/login' },
    scrollTo() {},
    addEventListener() {},
  };
  globalThis.document = { title: '' };
}

test('denied module route renders the access message instead of retaining the old page', async () => {
  environment('#/module/road-washings');
  const calls = [];
  const router = new Router({
    routes: { module: () => calls.push('module') },
    onDenied: () => calls.push('denied'),
  });

  await router.resolve();

  assert.deepEqual(calls, ['denied']);
  assert.match(document.title, /ไม่มีสิทธิ์/);
});

test('an earlier asynchronous route cannot replace the newly selected route', async () => {
  environment('#/dashboard', ['road-washings.view']);
  let completeDashboard;
  const waiting = new Promise((resolve) => { completeDashboard = resolve; });
  const rendered = [];
  const router = new Router({
    routes: {
      dashboard: async (ctx) => {
        await waiting;
        if (ctx.isCurrent()) rendered.push('dashboard');
      },
      module: async (ctx) => {
        if (ctx.isCurrent()) rendered.push('module');
      },
    },
  });

  const first = router.resolve();
  window.location.hash = '#/module/road-washings';
  await router.resolve();
  completeDashboard();
  await first;

  assert.deepEqual(rendered, ['module']);
});

test('a failed route renders an error state', async () => {
  environment('#/dashboard');
  let seen = false;
  const router = new Router({
    routes: { dashboard: async () => { throw new Error('offline'); } },
    onError: () => { seen = true; },
  });

  await router.resolve();

  assert.equal(seen, true);
});
