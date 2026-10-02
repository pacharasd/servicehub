/**
 * tests/E2E/challenger_stress_test.mjs
 *
 * Empirical Adversarial Challenger Test Suite for Milestone 2:
 * 1. Hash routing in src/router.js (URL parsing, params, guards, figmacapture, dynamic title formatting)
 * 2. Accessible drawer in src/components/drawer.js (trapFocus cycling, ESC dismissal, scroll-lock, focus restoration)
 * 3. Confirm Modal in src/components/confirmModal.js (replacement for window.confirm, safe cancel focus, promise resolution)
 * 4. Rollup code-splitting chunks and asset pipeline (manualChunks, chunk existence, manifest, index.html absence)
 *
 * Run with: node --test tests/E2E/challenger_stress_test.mjs
 */

import { describe, it, before, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');

// ============================================================================
// Minimal Lightweight DOM Mock for Node.js Testing
// ============================================================================

class MockClassList {
  constructor(el) {
    this.el = el;
    this._classes = new Set();
  }
  add(...names) {
    names.forEach((n) => this._classes.add(n));
  }
  remove(...names) {
    names.forEach((n) => this._classes.delete(n));
  }
  contains(name) {
    return this._classes.has(name);
  }
  toggle(name, force) {
    if (force !== undefined) {
      if (force) this.add(name);
      else this.remove(name);
      return force;
    }
    if (this.contains(name)) {
      this.remove(name);
      return false;
    }
    this.add(name);
    return true;
  }
  toString() {
    return [...this._classes].join(' ');
  }
}

class MockElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.id = '';
    this._className = '';
    this.classList = new MockClassList(this);
    this.attributes = {};
    this.dataset = {};
    this.style = { overflow: '' };
    this.children = [];
    this.parentElement = null;
    this.listeners = {};
    this.hidden = false;
    this.disabled = false;
    this.tabIndex = 0;
    this.textContent = '';
    this._innerHTML = '';
    this.offsetParent = {}; // truthy so not hidden
  }

  get className() {
    return this.classList.toString() || this._className;
  }
  set className(val) {
    this._className = val || '';
    this.classList = new MockClassList(this);
    if (val) {
      val.split(/\s+/).filter(Boolean).forEach((c) => this.classList.add(c));
    }
  }

  get innerHTML() {
    return this._innerHTML;
  }
  set innerHTML(val) {
    this._innerHTML = val || '';
    this.children = [];
    this._parseHTML(val);
  }

  _parseHTML(html) {
    // Robust regex parsing for tags and nesting
    const tokenRegex = /<([a-z0-9-]+)([^>]*?)(\/?)>|([^<]+)|<\/([a-z0-9-]+)>/gi;
    let match;
    let currentParent = this;
    const stack = [this];

    while ((match = tokenRegex.exec(html)) !== null) {
      const [full, openTag, attrStr, selfClose, text, closeTag] = match;

      if (openTag) {
        const el = new MockElement(openTag);
        // parse attributes
        const attrRegex = /([a-zA-Z0-9_-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^>\s]+)))?/g;
        let attrMatch;
        while ((attrMatch = attrRegex.exec(attrStr)) !== null) {
          const name = attrMatch[1];
          const val = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? '';
          el.setAttribute(name, val);
        }

        currentParent.appendChild(el);

        const isVoid = /^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i.test(openTag);
        if (!selfClose && !isVoid) {
          stack.push(el);
          currentParent = el;
        }
      } else if (closeTag) {
        if (stack.length > 1) {
          stack.pop();
          currentParent = stack[stack.length - 1];
        }
      } else if (text && text.trim()) {
        currentParent.textContent += text;
      }
    }
  }

  setAttribute(name, val) {
    this.attributes[name] = String(val);
    if (name.startsWith('data-')) {
      const key = name.slice(5).replace(/-([a-z])/g, (_, l) => l.toUpperCase());
      this.dataset[key] = String(val);
    }
    if (name === 'id') this.id = String(val);
  }
  getAttribute(name) {
    return this.attributes[name] ?? null;
  }
  removeAttribute(name) {
    delete this.attributes[name];
  }

  appendChild(child) {
    if (!child) return;
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) {
      this.children.splice(idx, 1);
      child.parentElement = null;
    }
    return child;
  }

  remove() {
    if (this.parentElement) {
      this.parentElement.removeChild(this);
    }
  }

  addEventListener(type, cb) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(cb);
  }
  removeEventListener(type, cb) {
    if (!this.listeners[type]) return;
    this.listeners[type] = this.listeners[type].filter((fn) => fn !== cb);
  }
  dispatchEvent(event) {
    if (!event.target) event.target = this;
    event.currentTarget = this;
    const handlers = this.listeners[event.type] || [];
    for (const h of handlers) {
      h(event);
    }
    if (this.parentElement && !event._stoppedProp) {
      this.parentElement.dispatchEvent(event);
    }
  }

  focus() {
    if (globalThis.document) {
      globalThis.document.activeElement = this;
    }
  }

  closest(selector) {
    let curr = this;
    while (curr) {
      if (curr.matches && curr.matches(selector)) return curr;
      curr = curr.parentElement;
    }
    return null;
  }

  matches(selector) {
    if (selector.startsWith('#')) return this.id === selector.slice(1);
    if (selector.startsWith('.')) return this.classList.contains(selector.slice(1));
    if (selector.startsWith('[')) {
      const attrMatch = /\[([a-zA-Z0-9_-]+)(?:=["']([^"']+)["'])?\]/.exec(selector);
      if (attrMatch) {
        const attrName = attrMatch[1];
        const attrVal = attrMatch[2];
        if (attrVal !== undefined) return this.getAttribute(attrName) === attrVal;
        return this.getAttribute(attrName) !== null;
      }
    }
    return this.tagName.toLowerCase() === selector.toLowerCase();
  }

  querySelector(selector) {
    const all = this.querySelectorAll(selector);
    return all.length ? all[0] : null;
  }

  querySelectorAll(selector) {
    const matches = [];
    const search = (node) => {
      for (const child of node.children) {
        if (child.matches(selector)) matches.push(child);
        search(child);
      }
    };
    search(this);
    return matches;
  }
}

class MockDocument {
  constructor() {
    this.title = '';
    this.body = new MockElement('body');
    this.activeElement = null;
    this.listeners = {};
  }
  createElement(tag) {
    return new MockElement(tag);
  }
  getElementById(id) {
    const search = (node) => {
      if (node.id === id) return node;
      for (const c of node.children) {
        const res = search(c);
        if (res) return res;
      }
      return null;
    };
    return search(this.body);
  }
  querySelector(sel) {
    if (sel === 'body') return this.body;
    return this.body.querySelector(sel);
  }
  querySelectorAll(sel) {
    return this.body.querySelectorAll(sel);
  }
  addEventListener(type, cb) {
    if (!this.listeners[type]) this.listeners[type] = [];
    this.listeners[type].push(cb);
  }
  removeEventListener(type, cb) {
    if (!this.listeners[type]) return;
    this.listeners[type] = this.listeners[type].filter((fn) => fn !== cb);
  }
  dispatchEvent(event) {
    const handlers = this.listeners[event.type] || [];
    for (const h of handlers) h(event);
  }
}

// Set up global mocks for Node environment
const mockDoc = new MockDocument();
const mockWin = {
  location: {
    hash: '',
    replace(h) { this.hash = h; },
    assign(h) { this.hash = h; },
  },
  scrollTo() {},
  addEventListener() {},
  removeEventListener() {},
  serviceHubUser: {
    id: 1,
    name: 'Administrator',
    roles: ['super-admin'],
    permissions: [],
  },
  serviceHubUrls: {
    login: '/login',
    apiUsers: '/api/users',
    apiActivities: '/api/activities/__MODULE__',
    apiReferences: '/api/references/__TYPE__',
    apiReportDetail: '/api/reports/__MODULE__',
  },
};

globalThis.document = mockDoc;
globalThis.window = mockWin;
globalThis.HTMLElement = MockElement;

// Import target modules dynamically after DOM global injection
const routerMod = await import('../../src/router.js');
const drawerMod = await import('../../src/components/drawer.js');
const confirmMod = await import('../../src/components/confirmModal.js');
const { parseHash, setDocumentTitle, resolveRouteTitle, Router } = routerMod;
const { trapFocus, openDrawer, closeDrawer, isDrawerOpen } = drawerMod;
const { showConfirmModal } = confirmMod;

// ============================================================================
// TEST SUITE: Milestone 2 Adversarial Stress Testing
// ============================================================================

describe('Milestone 2 Adversarial Challenge Suite', () => {

  beforeEach(() => {
    mockDoc.title = '';
    mockDoc.body.style.overflow = '';
    mockDoc.body.children = [];
    mockDoc.listeners = {};
    mockWin.location.hash = '';
    mockWin.serviceHubUser = {
      id: 1,
      name: 'Administrator',
      roles: ['super-admin'],
      permissions: [],
    };
  });

  // --------------------------------------------------------------------------
  // SECTION 1: HASH ROUTING IN src/router.js
  // --------------------------------------------------------------------------
  describe('1. Hash Routing & URL Parsing Stress Tests', () => {

    it('1.1: Fallback to /dashboard when hash is empty, #, or #/', () => {
      const emptyRes = parseHash('');
      assert.strictEqual(emptyRes.path, '/dashboard');
      assert.deepStrictEqual(emptyRes.parts, ['dashboard']);
      assert.strictEqual(emptyRes.hash, '#/dashboard');

      const singleHash = parseHash('#');
      assert.strictEqual(singleHash.path, '/dashboard');
      assert.deepStrictEqual(singleHash.parts, ['dashboard']);

      const slashHash = parseHash('#/');
      assert.deepStrictEqual(slashHash.parts, ['dashboard']);
    });

    it('1.2: URL parsing with complex query params and Thai characters', () => {
      const thaiQuery = 'q=' + encodeURIComponent('เทศบาลนนทบุรี') + '&page=3&status=active&sort=created_at&dir=desc';
      const parsed = parseHash(`#users?${thaiQuery}`);

      assert.strictEqual(parsed.path, '/users');
      assert.deepStrictEqual(parsed.parts, ['users']);
      assert.strictEqual(parsed.params.get('q'), 'เทศบาลนนทบุรี');
      assert.strictEqual(parsed.params.get('page'), '3');
      assert.strictEqual(parsed.params.get('status'), 'active');
      assert.strictEqual(parsed.query.sort, 'created_at');
      assert.strictEqual(parsed.query.dir, 'desc');
    });

    it('1.3: Deeply nested URL parts parsing', () => {
      const parsed = parseHash('#/module/road-washings/edit/999?ref=archive');
      assert.strictEqual(parsed.path, '/module/road-washings/edit/999');
      assert.deepStrictEqual(parsed.parts, ['module', 'road-washings', 'edit', '999']);
      assert.strictEqual(parsed.params.get('ref'), 'archive');
    });

    it('1.4: Resilient handling of multiple consecutive slashes and messy URLs', () => {
      const parsed = parseHash('#///reports////drain-cleanings///?filter=1');
      assert.deepStrictEqual(parsed.parts, ['reports', 'drain-cleanings']);
      assert.strictEqual(parsed.params.get('filter'), '1');
    });

    it('1.5: Figma Capture hash redirect (#figmacapture=...) returns /dashboard target', () => {
      const capture1 = parseHash('#figmacapture=export_uuid_123456');
      assert.strictEqual(capture1.path, '/dashboard');
      assert.strictEqual(capture1.hash, '#/dashboard');
      assert.deepStrictEqual(capture1.parts, ['dashboard']);

      const capture2 = parseHash('figmacapture=true&token=xyz');
      assert.strictEqual(capture2.path, '/dashboard');
      assert.deepStrictEqual(capture2.parts, ['dashboard']);
    });

    it('1.6: Document title formatting: appends suffix " — เทศบาลนครนนทบุรี"', () => {
      setDocumentTitle('จัดการผู้ใช้งาน');
      assert.strictEqual(mockDoc.title, 'จัดการผู้ใช้งาน — เทศบาลนครนนทบุรี');

      setDocumentTitle('โปรไฟล์ส่วนบุคคล');
      assert.strictEqual(mockDoc.title, 'โปรไฟล์ส่วนบุคคล — เทศบาลนครนนทบุรี');
    });

    it('1.7: Document title idempotency: avoids duplicate suffix when already suffixed', () => {
      setDocumentTitle('จัดการผู้ใช้งาน — เทศบาลนครนนทบุรี');
      assert.strictEqual(mockDoc.title, 'จัดการผู้ใช้งาน — เทศบาลนครนนทบุรี');
      assert.strictEqual(/เทศบาลนครนนทบุรี.*เทศบาลนครนนทบุรี/.test(mockDoc.title), false);
    });

    it('1.8: Document title fallback when empty/null', () => {
      setDocumentTitle('');
      assert.strictEqual(mockDoc.title, 'แดชบอร์ดฝ่ายบริการ — เทศบาลนครนนทบุรี');

      setDocumentTitle(null);
      assert.strictEqual(mockDoc.title, 'แดชบอร์ดฝ่ายบริการ — เทศบาลนครนนทบุรี');
    });

    it('1.9: resolveRouteTitle resolves municipal titles for all routes', () => {
      assert.strictEqual(resolveRouteTitle({ parts: ['dashboard'] }), 'แดชบอร์ดฝ่ายบริการ');
      assert.strictEqual(resolveRouteTitle({ parts: ['users'] }), 'จัดการผู้ใช้งาน');
      assert.strictEqual(resolveRouteTitle({ parts: ['profile'] }), 'โปรไฟล์ส่วนบุคคล');
      assert.strictEqual(resolveRouteTitle({ parts: ['audit-logs'] }), 'ประวัติการแก้ไข');
      assert.strictEqual(resolveRouteTitle({ parts: ['cleaning-zones'] }), 'เขตรักษาความสะอาด');
      assert.strictEqual(resolveRouteTitle({ parts: ['waste-types'] }), 'ประเภทขยะมูลฝอย');
      assert.strictEqual(
        resolveRouteTitle({ parts: ['reports', 'road-washings'] }),
        'การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด'
      );
      assert.strictEqual(resolveRouteTitle({ parts: ['module', 'drain-cleanings'] }), 'ลอกท่อระบายน้ำ');
      assert.strictEqual(resolveRouteTitle({ parts: ['unrecognized_page'] }), 'แดชบอร์ดฝ่ายบริการ');
    });

    it('1.10: Navigation Guard blocks unauthorized users route for non-admin roles', async () => {
      mockWin.serviceHubUser = { roles: ['viewer'], permissions: [] };
      const router = new Router();
      const allowed = await router.checkGuards({ parts: ['users'], params: new URLSearchParams() });
      assert.strictEqual(allowed, false, 'Users route must be blocked for viewer role');
    });

    it('1.11: Navigation Guard allows users route for super-admin or admin role', async () => {
      mockWin.serviceHubUser = { roles: ['admin'], permissions: [] };
      const router = new Router();
      const allowed = await router.checkGuards({ parts: ['users'], params: new URLSearchParams() });
      assert.strictEqual(allowed, true, 'Users route must be allowed for admin role');
    });

    it('1.12: Navigation Guard blocks audit-logs without permission', async () => {
      mockWin.serviceHubUser = { roles: ['viewer'], permissions: [] };
      const router = new Router();
      const allowed = await router.checkGuards({ parts: ['audit-logs'], params: new URLSearchParams() });
      assert.strictEqual(allowed, false, 'audit-logs must be blocked when audit-logs.view is missing');
    });

    it('1.13: Navigation Guard blocks module route without matching permission', async () => {
      mockWin.serviceHubUser = { roles: ['viewer'], permissions: ['cleaning-zones.view'] };
      const router = new Router();
      const allowed = await router.checkGuards({ parts: ['module', 'road-washings'], params: new URLSearchParams() });
      assert.strictEqual(allowed, false, 'module/road-washings must be blocked when road-washings.view is missing');
    });

    it('1.14: Navigation Guard intercepts login route and triggers window.location.replace', async () => {
      let replacedUrl = '';
      mockWin.location.replace = (url) => { replacedUrl = url; };
      const router = new Router();
      const allowed = await router.checkGuards({ parts: ['login'], params: new URLSearchParams() });
      assert.strictEqual(allowed, false);
      assert.strictEqual(replacedUrl, '/login');
    });

    it('1.15: Router resolve sets title to "ไม่พบหน้าหรือไม่มีสิทธิ์เข้าถึง" on guard failure', async () => {
      mockWin.serviceHubUser = { roles: ['viewer'], permissions: [] };
      mockWin.location.hash = '#/users';
      let notFoundCalled = false;

      const router = new Router({
        users: () => {},
      });
      router.setNotFound(() => {
        notFoundCalled = true;
      });

      await router.resolve();
      assert.strictEqual(notFoundCalled, true, 'notFoundHandler must be invoked on guard rejection');
      assert.strictEqual(mockDoc.title, 'ไม่พบหน้าหรือไม่มีสิทธิ์เข้าถึง — เทศบาลนครนนทบุรี');
    });
  });

  // --------------------------------------------------------------------------
  // SECTION 2: ACCESSIBLE DRAWER IN src/components/drawer.js
  // --------------------------------------------------------------------------
  describe('2. Accessible Drawer Stress Tests', () => {

    it('2.1: trapFocus cycles forward from last element to first on Tab', () => {
      const container = new MockElement('div');
      const btn1 = new MockElement('button');
      btn1.id = 'first-btn';
      const input = new MockElement('input');
      const btn2 = new MockElement('button');
      btn2.id = 'last-btn';

      container.appendChild(btn1);
      container.appendChild(input);
      container.appendChild(btn2);

      let focused = null;
      btn1.focus = () => { focused = 'first-btn'; };
      btn2.focus = () => { focused = 'last-btn'; };

      // Set activeElement to last-btn
      mockDoc.activeElement = btn2;

      let prevented = false;
      const tabEvent = {
        key: 'Tab',
        shiftKey: false,
        preventDefault: () => { prevented = true; },
      };

      trapFocus(tabEvent, container);

      assert.strictEqual(prevented, true, 'Tab on last element must call preventDefault()');
      assert.strictEqual(focused, 'first-btn', 'Focus must cycle to the first element');
    });

    it('2.2: trapFocus cycles backward from first element to last on Shift+Tab', () => {
      const container = new MockElement('div');
      const btn1 = new MockElement('button');
      btn1.id = 'first-btn';
      const btn2 = new MockElement('button');
      btn2.id = 'last-btn';

      container.appendChild(btn1);
      container.appendChild(btn2);

      let focused = null;
      btn1.focus = () => { focused = 'first-btn'; };
      btn2.focus = () => { focused = 'last-btn'; };

      // Set activeElement to first-btn
      mockDoc.activeElement = btn1;

      let prevented = false;
      const shiftTabEvent = {
        key: 'Tab',
        shiftKey: true,
        preventDefault: () => { prevented = true; },
      };

      trapFocus(shiftTabEvent, container);

      assert.strictEqual(prevented, true, 'Shift+Tab on first element must call preventDefault()');
      assert.strictEqual(focused, 'last-btn', 'Focus must cycle backward to the last element');
    });

    it('2.3: trapFocus does NOT preventDefault on intermediate elements', () => {
      const container = new MockElement('div');
      const btn1 = new MockElement('button');
      const input = new MockElement('input');
      const btn2 = new MockElement('button');

      container.appendChild(btn1);
      container.appendChild(input);
      container.appendChild(btn2);

      mockDoc.activeElement = input;

      let prevented = false;
      const event = {
        key: 'Tab',
        shiftKey: false,
        preventDefault: () => { prevented = true; },
      };

      trapFocus(event, container);
      assert.strictEqual(prevented, false, 'Tab on intermediate element must not prevent default');
    });

    it('2.4: trapFocus ignores non-Tab keys', () => {
      const container = new MockElement('div');
      const btn = new MockElement('button');
      container.appendChild(btn);

      let prevented = false;
      const arrowEvent = {
        key: 'ArrowDown',
        shiftKey: false,
        preventDefault: () => { prevented = true; },
      };

      trapFocus(arrowEvent, container);
      assert.strictEqual(prevented, false, 'Non-Tab keys must not trigger trap');
    });

    it('2.5: openDrawer locks body scroll and closeDrawer restores it', () => {
      mockDoc.body.style.overflow = '';
      openDrawer({ title: 'ทดสอบ Drawer' });

      assert.strictEqual(mockDoc.body.style.overflow, 'hidden', 'Opening drawer must set body overflow: hidden');
      assert.strictEqual(isDrawerOpen(), true);

      closeDrawer();
      assert.strictEqual(mockDoc.body.style.overflow, '', 'Closing drawer must restore body overflow: ""');
      assert.strictEqual(isDrawerOpen(), false);
    });

    it('2.6: closeDrawer restores focus to trigger element', () => {
      const trigger = new MockElement('button');
      let restored = false;
      trigger.focus = () => { restored = true; };

      openDrawer({ title: 'ทดสอบ', trigger });
      closeDrawer();

      assert.strictEqual(restored, true, 'closeDrawer must restore focus to the trigger element');
    });

    it('2.7: ESC key dismisses active drawer', () => {
      let closed = false;
      openDrawer({
        title: 'ESC Test',
        onClose: () => { closed = true; },
      });

      // Dispatch ESC keydown on document
      let prevented = false;
      mockDoc.dispatchEvent({
        type: 'keydown',
        key: 'Escape',
        preventDefault: () => { prevented = true; },
      });

      assert.strictEqual(prevented, true, 'Escape keydown must be prevented');
      assert.strictEqual(closed, true, 'Escape must invoke closeDrawer() and onClose callback');
      assert.strictEqual(isDrawerOpen(), false);
    });
  });

  // --------------------------------------------------------------------------
  // SECTION 3: ACCESSIBLE CONFIRM MODAL IN src/components/confirmModal.js
  // --------------------------------------------------------------------------
  describe('3. Confirm Modal Stress Tests', () => {

    it('3.1: showConfirmModal returns a Promise resolving true on Confirm click', async () => {
      const promise = showConfirmModal({
        title: 'ยืนยันการลบ',
        message: 'ต้องการลบข้อมูลนี้หรือไม่',
        confirmText: 'ลบข้อมูล',
        cancelText: 'ยกเลิก',
      });

      const modalRoot = mockDoc.getElementById('accessible-modal-root');
      assert.ok(modalRoot, 'Modal root element must be mounted in DOM');

      const confirmBtn = modalRoot.querySelector('#confirm-modal-confirm');
      assert.ok(confirmBtn, 'Confirm button must exist');

      confirmBtn.dispatchEvent({ type: 'click' });
      const result = await promise;

      assert.strictEqual(result, true, 'Confirm button must resolve Promise to true');
      assert.strictEqual(mockDoc.getElementById('accessible-modal-root'), null, 'Modal root must be unmounted');
    });

    it('3.2: showConfirmModal resolves false on Cancel click', async () => {
      const promise = showConfirmModal({
        title: 'ยกเลิกทดสอบ',
        message: 'เนื้อหา',
      });

      const modalRoot = mockDoc.getElementById('accessible-modal-root');
      const cancelBtn = modalRoot.querySelector('#confirm-modal-cancel');
      assert.ok(cancelBtn, 'Cancel button must exist');

      cancelBtn.dispatchEvent({ type: 'click' });
      const result = await promise;

      assert.strictEqual(result, false, 'Cancel button must resolve Promise to false');
    });

    it('3.3: showConfirmModal resolves false on Escape key', async () => {
      const promise = showConfirmModal({
        title: 'Escape ทดสอบ',
        message: 'เนื้อหา',
      });

      mockDoc.dispatchEvent({
        type: 'keydown',
        key: 'Escape',
        preventDefault: () => {},
      });

      const result = await promise;
      assert.strictEqual(result, false, 'Escape key must dismiss modal with false');
    });

    it('3.4: showConfirmModal locks body scroll and cleans up on resolution', async () => {
      mockDoc.body.style.overflow = '';
      const promise = showConfirmModal({
        title: 'Scroll Lock Test',
        message: 'ข้อความ',
      });

      assert.strictEqual(mockDoc.body.style.overflow, 'hidden', 'Modal must lock body scroll');

      const modalRoot = mockDoc.getElementById('accessible-modal-root');
      modalRoot.querySelector('#confirm-modal-cancel').dispatchEvent({ type: 'click' });

      await promise;
      assert.strictEqual(mockDoc.body.style.overflow, '', 'Modal resolution must restore body scroll');
    });

    it('3.5: showConfirmModal restores focus to trigger element', async () => {
      const trigger = new MockElement('button');
      let restored = false;
      trigger.focus = () => { restored = true; };
      mockDoc.activeElement = trigger;

      const promise = showConfirmModal({ title: 'Focus Test', message: 'Test' });
      const modalRoot = mockDoc.getElementById('accessible-modal-root');
      modalRoot.querySelector('#confirm-modal-cancel').dispatchEvent({ type: 'click' });

      await promise;
      assert.strictEqual(restored, true, 'Focus must be restored to trigger element');
    });
  });

  // --------------------------------------------------------------------------
  // SECTION 4: ROLLUP CODE-SPLITTING & ASSET PIPELINE
  // --------------------------------------------------------------------------
  describe('4. Rollup Code-Splitting Chunks & Asset Pipeline Verification', () => {

    it('4.1: vite.config.js manualChunks specifies required modular chunk names', () => {
      const viteConfig = fs.readFileSync(path.join(projectRoot, 'vite.config.js'), 'utf8');
      assert.ok(/view-users/.test(viteConfig), 'vite.config.js must define view-users chunk');
      assert.ok(/view-activities/.test(viteConfig), 'vite.config.js must define view-activities chunk');
      assert.ok(/view-references/.test(viteConfig), 'vite.config.js must define view-references chunk');
      assert.ok(/view-analytics/.test(viteConfig), 'vite.config.js must define view-analytics chunk');
      assert.ok(/vendor/.test(viteConfig), 'vite.config.js must define vendor chunk');
    });

    it('4.2: Built chunk files exist in public/dist/assets/ with expected non-empty size', () => {
      const assetsDir = path.join(projectRoot, 'public', 'dist', 'assets');
      assert.ok(fs.existsSync(assetsDir), 'public/dist/assets/ directory must exist');

      const files = fs.readdirSync(assetsDir);
      const hasViewUsers = files.some((f) => /^view-users-.*\.js$/.test(f));
      const hasViewActivities = files.some((f) => /^view-activities-.*\.js$/.test(f));
      const hasViewReferences = files.some((f) => /^view-references-.*\.js$/.test(f));
      const hasViewAnalytics = files.some((f) => /^view-analytics-.*\.js$/.test(f));
      const hasMain = files.some((f) => /^main-.*\.js$/.test(f));

      assert.ok(hasViewUsers, 'view-users chunk file must exist in public/dist/assets/');
      assert.ok(hasViewActivities, 'view-activities chunk file must exist in public/dist/assets/');
      assert.ok(hasViewReferences, 'view-references chunk file must exist in public/dist/assets/');
      assert.ok(hasViewAnalytics, 'view-analytics chunk file must exist in public/dist/assets/');
      assert.ok(hasMain, 'main chunk file must exist in public/dist/assets/');

      // Verify non-trivial size (> 10KB)
      for (const f of files.filter((n) => n.endsWith('.js'))) {
        const stats = fs.statSync(path.join(assetsDir, f));
        assert.ok(stats.size > 10000, `Chunk ${f} size (${stats.size} bytes) must exceed 10KB`);
      }
    });

    it('4.3: public/dist/manifest.json records correct chunk mapping', () => {
      const manifestPath = path.join(projectRoot, 'public', 'dist', 'manifest.json');
      assert.ok(fs.existsSync(manifestPath), 'public/dist/manifest.json must exist');

      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      const manifestKeys = Object.keys(manifest);

      const hasUsersChunk = manifestKeys.some((k) => k.includes('view-users'));
      const hasActivitiesChunk = manifestKeys.some((k) => k.includes('view-activities'));
      const hasReferencesChunk = manifestKeys.some((k) => k.includes('view-references'));
      const hasAnalyticsChunk = manifestKeys.some((k) => k.includes('view-analytics'));
      const hasMainEntry = manifestKeys.some((k) => k === 'src/main.js');

      assert.ok(hasUsersChunk, 'manifest.json must map view-users chunk');
      assert.ok(hasActivitiesChunk, 'manifest.json must map view-activities chunk');
      assert.ok(hasReferencesChunk, 'manifest.json must map view-references chunk');
      assert.ok(hasAnalyticsChunk, 'manifest.json must map view-analytics chunk');
      assert.ok(hasMainEntry, 'manifest.json must map src/main.js entry');
    });

    it('4.4: public/dist/index.html strictly does NOT exist (SPA shell bypass protection)', () => {
      const indexPath = path.join(projectRoot, 'public', 'dist', 'index.html');
      assert.strictEqual(
        fs.existsSync(indexPath),
        false,
        'public/dist/index.html must NOT exist, ensuring all requests route through Laravel Blade app shell'
      );
    });

    it('4.5: Immutable caching header is declared for dist/assets in public/.htaccess', () => {
      const htaccessPath = path.join(projectRoot, 'public', '.htaccess');
      const content = fs.readFileSync(htaccessPath, 'utf8');
      assert.ok(
        /Cache-Control\s+"public,\s*max-age=31536000,\s*immutable"/i.test(content),
        'public/.htaccess must set 1-year immutable caching for static assets'
      );
    });
  });
});
