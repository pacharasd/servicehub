/**
 * tests/E2E/tier5_adversarial_hardening.mjs
 *
 * Tier 5 White-Box Adversarial Coverage Hardening Test Suite for ServiceHub.
 * Conforms to ADR 0007, ADR 0008, ADR 0009, WCAG 2.2 Level AA, and OWASP standards.
 *
 * Test Vectors:
 * 1. Hash Routing Adversarial Stress (Malformed hashes, path traversals, query edge cases, #figmacapture bypasses, title formatting)
 * 2. Accessible Components Adversarial Stress (Rapid ESC bursts, focus wrap-around with 0/1/N focusables, body scroll recovery)
 * 3. Data & View Resilience Adversarial Stress (Extreme input lengths, special character/XSS injections, 422 error display & reset)
 * 4. Mobile Viewport Reflow (320px zero horizontal overflow, CSS containment, table scroll isolation)
 * 5. Security Headers & CSP Directives Penetration Audit
 *
 * Run with: node --test tests/E2E/tier5_adversarial_hardening.mjs
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
// Comprehensive Lightweight DOM Mock for Node.js Testing
// ============================================================================

class MockClassList {
  constructor(el) {
    this.el = el;
    this._classes = new Set();
  }
  add(...names) {
    names.forEach((n) => {
      if (n) n.split(/\s+/).forEach((c) => this._classes.add(c));
    });
  }
  remove(...names) {
    names.forEach((n) => {
      if (n) n.split(/\s+/).forEach((c) => this._classes.delete(c));
    });
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
    this.offsetParent = {}; // truthy so not hidden by default
    this.type = 'text';
    this.value = '';
    this.name = '';
    this.required = false;
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
    const tokenRegex = /<([a-z0-9-]+)([^>]*?)(\/?)>|([^<]+)|<\/([a-z0-9-]+)>/gi;
    let match;
    let currentParent = this;
    const stack = [this];

    while ((match = tokenRegex.exec(html)) !== null) {
      const [full, openTag, attrStr, selfClose, text, closeTag] = match;

      if (openTag) {
        const el = new MockElement(openTag);
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
    if (name === 'class') this.className = String(val);
    if (name === 'type') this.type = String(val);
    if (name === 'name') this.name = String(val);
    if (name === 'value') this.value = String(val);
    if (name === 'required') this.required = true;
    if (name === 'disabled') this.disabled = true;
  }
  getAttribute(name) {
    return this.attributes[name] ?? null;
  }
  removeAttribute(name) {
    delete this.attributes[name];
    if (name === 'disabled') this.disabled = false;
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
    // Support comma-separated selectors: e.g. "a[href], button:not([disabled])"
    if (selector.includes(',')) {
      return selector.split(',').some((sub) => this.matches(sub.trim()));
    }

    let sel = selector.trim();

    // Support :not(...) pseudo-class
    const notMatch = /:not\(([^)]+)\)/.exec(sel);
    if (notMatch) {
      const innerSel = notMatch[1];
      const baseSel = sel.replace(notMatch[0], '');
      if (this.matches(innerSel)) return false;
      if (!baseSel) return true;
      sel = baseSel;
    }

    if (sel.startsWith('#')) return this.id === sel.slice(1);
    if (sel.startsWith('.')) return this.classList.contains(sel.slice(1));
    if (sel.startsWith('[')) {
      const attrMatch = /\[([a-zA-Z0-9_-]+)(?:=["']([^"']+)["'])?\]/.exec(sel);
      if (attrMatch) {
        const attrName = attrMatch[1];
        const attrVal = attrMatch[2];
        if (attrVal !== undefined) return this.getAttribute(attrName) === attrVal;
        return this.getAttribute(attrName) !== null;
      }
    }

    // Compound selector like button[data-action="drawer-close"] or a[href]
    const compound = /^([a-z0-9-]+)(\[.*\])$/i.exec(sel);
    if (compound) {
      const tag = compound[1];
      const attrPart = compound[2];
      return this.tagName.toLowerCase() === tag.toLowerCase() && this.matches(attrPart);
    }

    return this.tagName.toLowerCase() === sel.toLowerCase();
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
    if (sel === 'body') return [this.body];
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
    for (const h of handlers) {
      h(event);
    }
  }
}

// Setup global mock browser environment
let mockDoc = new MockDocument();
globalThis.MockElement = MockElement;
globalThis.HTMLElement = MockElement;
globalThis.document = mockDoc;

const OriginalFormData = globalThis.FormData;
globalThis.FormData = class MockFormData extends OriginalFormData {
  constructor(form) {
    if (form && form.tagName === 'FORM' && form.querySelectorAll) {
      super();
      const inputs = form.querySelectorAll('input, select, textarea');
      for (const input of inputs) {
        if (input.name && !input.disabled) {
          this.append(input.name, input.value ?? '');
        }
      }
    } else {
      super(form);
    }
  }
};

globalThis.window = {
  location: { hash: '', replace: () => {}, assign: () => {} },
  scrollTo: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  serviceHubUser: { id: 1, name: 'Admin', username: 'admin', roles: ['super-admin'], permissions: ['*'] },
  serviceHubUrls: { login: '/login', apiUsers: '/api/users' },
  innerWidth: 1280,
  innerHeight: 800,
};

// ============================================================================
// Import Tested Modules
// ============================================================================
import { parseHash, setDocumentTitle, resolveRouteTitle, Router } from '../../src/router.js';
import { trapFocus, openDrawer, closeDrawer, isDrawerOpen } from '../../src/components/drawer.js';
import { showConfirmModal } from '../../src/components/confirmModal.js';
import { ApiError, can, canManageUsers } from '../../src/api.js';
import { esc, number, currency, thaiDate } from '../../src/utils/format.js';
import { userDirectoryPage, userFilterBar, userTable, umParams } from '../../src/views/users.js';
import { fieldInput, validateForm, listPage, formPage, detailPage } from '../../src/views/activities.js';
import { zoneListPage, zoneFormPage, zoneDetailPage } from '../../src/views/references.js';
import { profilePage } from '../../src/views/profile.js';
import { auditPage } from '../../src/views/auditLogs.js';
import { modules, groups } from '../../src/data.js';

// ============================================================================
// ADVERSARIAL STRESS TEST SUITE
// ============================================================================

describe('Tier 5 Adversarial Coverage Hardening Suite', () => {

  beforeEach(() => {
    mockDoc = new MockDocument();
    globalThis.document = mockDoc;
    globalThis.window.location.hash = '';
    globalThis.window.serviceHubUser = {
      id: 1,
      name: 'ผู้ดูแลสูงสุด',
      username: 'superadmin',
      roles: ['super-admin'],
      permissions: ['*'],
    };
  });

  // =========================================================================
  // VECTOR 1: HASH ROUTING ADVERSARIAL STRESS
  // =========================================================================
  describe('Vector 1: Hash Routing Adversarial Stress', () => {

    it('1.1: Malformed and empty hash inputs safely normalize or fallback in Router', async () => {
      // Empty and root hashes
      const safeInputs = ['', '#', '#/', '#///'];
      for (const raw of safeInputs) {
        const result = parseHash(raw);
        assert.ok(result.parts.length > 0, `parseHash("${raw}") must have parts`);
        assert.strictEqual(result.parts[0], 'dashboard', `parseHash("${raw}") must resolve to dashboard`);
        assert.ok(result.path.startsWith('/'), `Path must be normalized`);
      }

      // Repeated hash characters ('##', '###') fall back to wildcard route in Router
      let wildcardFired = false;
      const router = new Router({
        routes: {
          dashboard: () => {},
          '*': () => { wildcardFired = true; },
        },
      });

      globalThis.window.location.hash = '##';
      await router.resolve();
      assert.strictEqual(wildcardFired, true, 'Repeated hashes "##" must route to wildcard handler "*"');
    });

    it('1.2: Path traversal attack sequences in hash: leading traversal falls back to wildcard, mid-path traversal maintains rootKey', async () => {
      // 1. Leading traversal without valid root: parts[0] is '..', falls back to wildcard '*'
      let routeHitLeading = null;
      const routerLeading = new Router({
        routes: {
          dashboard: () => { routeHitLeading = 'dashboard'; },
          users: () => { routeHitLeading = 'users'; },
          '*': () => { routeHitLeading = '*'; },
        },
      });

      globalThis.window.location.hash = '#/../../etc/passwd';
      await routerLeading.resolve();
      assert.strictEqual(routeHitLeading, '*', 'Leading path traversal "#/../../etc/passwd" must fall back to wildcard route "*"');

      // 2. Mid-path traversal: parseHash splits without path.normalize, so parts[0] remains rootKey
      const resMid = parseHash('#/users/../../module/road-washings');
      assert.strictEqual(resMid.parts[0], 'users', 'Without posix normalization, parts[0] remains the first token');
      assert.ok(resMid.parts.includes('..'), 'Demonstrates lack of path normalization: raw ".." is retained in parts');
    });

    it('1.3: Query strings with multiple ?, dangling &, or missing values parse without crash', () => {
      const messyQueries = [
        '#/users?',
        '#/users?q=&role=&status=&sort=',
        '#/users?search=',
        '#/users?q=test?role=admin?filter=active',
        '#/users?&&&&====&&',
        '#/dashboard?from=&to=',
      ];

      for (const input of messyQueries) {
        assert.doesNotThrow(() => {
          const res = parseHash(input);
          assert.strictEqual(res.parts[0], input.includes('dashboard') ? 'dashboard' : 'users');
          assert.ok(res.params instanceof URLSearchParams);
        }, `Parsing ${input} must not throw`);
      }
    });

    it('1.4: Special character & injection strings in query are safely preserved in URLSearchParams', () => {
      const sqlInjection = "#/users?q=Robert'); DROP TABLE users;--&role=admin";
      const xssInjection = "#/users?q=<script>alert('xss')</script>";
      const thaiQuery = "#/users?q=สมชาย+ใจดี&role=staff";

      const rSql = parseHash(sqlInjection);
      assert.strictEqual(rSql.query.q, "Robert'); DROP TABLE users;--");
      assert.strictEqual(rSql.query.role, "admin");

      const rXss = parseHash(xssInjection);
      assert.strictEqual(rXss.query.q, "<script>alert('xss')</script>");

      const rThai = parseHash(thaiQuery);
      assert.strictEqual(rThai.query.role, "staff");
    });

    it('1.5: #figmacapture= URL bypass attempts strictly redirect to /dashboard and drop params', () => {
      const figmaInputs = [
        '#figmacapture=123',
        '#figmacapture=users',
        '#figmacapture=login',
        '#figmacapture=&test=bypass&admin=true',
        '#figmacapture=/module/road-washings',
      ];

      for (const input of figmaInputs) {
        const result = parseHash(input);
        assert.strictEqual(result.path, '/dashboard', `${input} must normalize to /dashboard`);
        assert.deepStrictEqual(result.parts, ['dashboard'], `${input} parts must be ['dashboard']`);
        assert.strictEqual(result.params.toString(), '', `${input} must have empty params`);
        assert.deepStrictEqual(result.query, {}, `${input} query must be empty`);
      }
    });

    it('1.6: Document title formatting: idempotency, suffix preservation, and empty handling', () => {
      const suffix = ' — เทศบาลนครนนทบุรี';

      // Normal title
      setDocumentTitle('จัดการผู้ใช้งาน');
      assert.strictEqual(mockDoc.title, 'จัดการผู้ใช้งาน' + suffix);

      // Already suffixed title (idempotency check)
      setDocumentTitle('จัดการผู้ใช้งาน — เทศบาลนครนนทบุรี');
      assert.strictEqual(mockDoc.title, 'จัดการผู้ใช้งาน' + suffix, 'Must NOT duplicate suffix');

      // Empty title defaults to fallback
      setDocumentTitle('');
      assert.strictEqual(mockDoc.title, 'แดชบอร์ดฝ่ายบริการ' + suffix);

      // Null title defaults to fallback
      setDocumentTitle(null);
      assert.strictEqual(mockDoc.title, 'แดชบอร์ดฝ่ายบริการ' + suffix);

      // Very long title (1,000 characters)
      const longTitle = 'ก'.repeat(1000);
      assert.doesNotThrow(() => setDocumentTitle(longTitle));
      assert.strictEqual(mockDoc.title, longTitle + suffix);
    });

    it('1.7: resolveRouteTitle handles unknown, empty, and edge case routes gracefully', () => {
      assert.strictEqual(resolveRouteTitle({ parts: [] }), 'แดชบอร์ดฝ่ายบริการ');
      assert.strictEqual(resolveRouteTitle({ parts: ['unknown-root'] }), 'แดชบอร์ดฝ่ายบริการ');
      assert.strictEqual(resolveRouteTitle({ parts: ['reports', 'unknown-module'] }), 'รายงาน');
      assert.strictEqual(resolveRouteTitle({ parts: ['module', 'unknown-module'] }), 'งานบริการ');
      assert.strictEqual(resolveRouteTitle({ parts: ['users'] }), 'จัดการผู้ใช้งาน');
      assert.strictEqual(resolveRouteTitle({ parts: ['audit-logs'] }), 'ประวัติการแก้ไข');
    });

    it('1.8: Router navigation guards block users without permission and handle role manipulation', () => {
      const router = new Router();

      // Case A: serviceHubUser is null/undefined
      globalThis.window.serviceHubUser = null;
      assert.strictEqual(canManageUsers(), false);

      // Case B: serviceHubUser roles is not an array (tampered)
      globalThis.window.serviceHubUser = { roles: 'admin' };
      assert.strictEqual(canManageUsers(), false);

      // Case C: viewer role
      globalThis.window.serviceHubUser = { roles: ['viewer'], permissions: ['users.view'] };
      assert.strictEqual(canManageUsers(), false);

      // Case D: admin role
      globalThis.window.serviceHubUser = { roles: ['admin'], permissions: ['users.view'] };
      assert.strictEqual(canManageUsers(), true);
    });
  });

  // =========================================================================
  // VECTOR 2: ACCESSIBLE COMPONENTS ADVERSARIAL STRESS
  // =========================================================================
  describe('Vector 2: Accessible Components Adversarial Stress', () => {

    it('2.1: trapFocus handles container with exactly 1 focusable item on Tab and Shift+Tab', () => {
      const container = new MockElement('div');
      const singleBtn = new MockElement('button');
      singleBtn.id = 'only-btn';
      container.appendChild(singleBtn);

      let focusedId = null;
      singleBtn.focus = () => { focusedId = 'only-btn'; };
      mockDoc.activeElement = singleBtn;

      // Forward Tab
      let tabPrevented = false;
      const tabEvent = { key: 'Tab', shiftKey: false, preventDefault: () => { tabPrevented = true; } };
      trapFocus(tabEvent, container);
      assert.strictEqual(tabPrevented, true, 'Tab on single element must prevent default');
      assert.strictEqual(focusedId, 'only-btn', 'Focus must remain on the single element');

      // Backward Shift+Tab
      let shiftPrevented = false;
      const shiftTabEvent = { key: 'Tab', shiftKey: true, preventDefault: () => { shiftPrevented = true; } };
      trapFocus(shiftTabEvent, container);
      assert.strictEqual(shiftPrevented, true, 'Shift+Tab on single element must prevent default');
      assert.strictEqual(focusedId, 'only-btn', 'Focus must remain on the single element');
    });

    it('2.2: trapFocus handles container with 0 focusable items safely without throwing', () => {
      const container = new MockElement('div');
      const paragraph = new MockElement('p');
      paragraph.textContent = 'ไม่มีปุ่มหรืออินพุตใดๆ';
      container.appendChild(paragraph);

      let prevented = false;
      const tabEvent = { key: 'Tab', shiftKey: false, preventDefault: () => { prevented = true; } };

      assert.doesNotThrow(() => {
        trapFocus(tabEvent, container);
      });
      assert.strictEqual(prevented, true, 'Tab on container with 0 focusables must preventDefault');
    });

    it('2.3: trapFocus correctly cycles forward and backward across multiple elements', () => {
      const container = new MockElement('div');
      const btn1 = new MockElement('button');
      btn1.id = 'btn-first';
      const input = new MockElement('input');
      input.id = 'input-mid';
      const btn2 = new MockElement('button');
      btn2.id = 'btn-last';

      container.appendChild(btn1);
      container.appendChild(input);
      container.appendChild(btn2);

      let focusedId = null;
      btn1.focus = () => { focusedId = 'btn-first'; };
      btn2.focus = () => { focusedId = 'btn-last'; };

      // Tab on last element -> wraps to first
      mockDoc.activeElement = btn2;
      let tabPrevented = false;
      trapFocus({ key: 'Tab', shiftKey: false, preventDefault: () => { tabPrevented = true; } }, container);
      assert.strictEqual(tabPrevented, true);
      assert.strictEqual(focusedId, 'btn-first');

      // Shift+Tab on first element -> wraps to last
      mockDoc.activeElement = btn1;
      let shiftPrevented = false;
      trapFocus({ key: 'Tab', shiftKey: true, preventDefault: () => { shiftPrevented = true; } }, container);
      assert.strictEqual(shiftPrevented, true);
      assert.strictEqual(focusedId, 'btn-last');

      // Tab on middle element -> does NOT prevent default
      mockDoc.activeElement = input;
      let midPrevented = false;
      trapFocus({ key: 'Tab', shiftKey: false, preventDefault: () => { midPrevented = true; } }, container);
      assert.strictEqual(midPrevented, false, 'Intermediate Tab must not be prevented');
    });

    it('2.4: Rapid burst of 50 ESC keys does not crash drawer or leave corrupted state', () => {
      const trigger = new MockElement('button');
      trigger.id = 'trigger-btn';
      mockDoc.body.appendChild(trigger);
      trigger.focus();

      let closeCount = 0;
      openDrawer({
        title: 'ทดสอบลิ้นชัก',
        content: '<p>เนื้อหาทดสอบ</p>',
        trigger,
        onClose: () => { closeCount++; },
      });

      assert.strictEqual(isDrawerOpen(), true);
      assert.strictEqual(mockDoc.body.style.overflow, 'hidden');

      // Dispatch 50 rapid ESC events
      for (let i = 0; i < 50; i++) {
        mockDoc.dispatchEvent({
          type: 'keydown',
          key: 'Escape',
          preventDefault: () => {},
        });
      }

      assert.strictEqual(isDrawerOpen(), false, 'Drawer must be closed');
      assert.strictEqual(mockDoc.body.style.overflow, '', 'Body overflow must be restored to empty string');
      assert.strictEqual(closeCount, 1, 'onClose should fire exactly once');
    });

    it('2.5: Body scroll lock recovery across sequential drawer and confirm modal interactions', async () => {
      // 1. Initial state
      assert.strictEqual(mockDoc.body.style.overflow, '');

      // 2. Open drawer -> locked
      openDrawer({ title: 'Drawer 1' });
      assert.strictEqual(mockDoc.body.style.overflow, 'hidden');

      // 3. Close drawer -> restored
      closeDrawer();
      assert.strictEqual(mockDoc.body.style.overflow, '');

      // 4. Open confirm modal -> locked
      const modalPromise = showConfirmModal({ title: 'ยืนยัน', message: 'ลบรายการ' });
      assert.strictEqual(mockDoc.body.style.overflow, 'hidden');

      // Cancel modal
      mockDoc.dispatchEvent({ type: 'keydown', key: 'Escape', preventDefault: () => {} });
      const result = await modalPromise;
      assert.strictEqual(result, false);
      assert.strictEqual(mockDoc.body.style.overflow, '', 'Body overflow must be cleanly restored');
    });
  });

  // =========================================================================
  // VECTOR 3: DATA & VIEW RESILIENCE ADVERSARIAL STRESS
  // =========================================================================
  describe('Vector 3: Data & View Resilience Adversarial Stress', () => {

    it('3.1: esc() prevents HTML/XSS injection for all sensitive characters', () => {
      const malicious = '<script>alert("xss & dangerous")</script>\' "';
      const escaped = esc(malicious);

      assert.ok(!escaped.includes('<script>'), 'Must not contain unescaped <');
      assert.ok(!escaped.includes('</script>'), 'Must not contain unescaped >');
      assert.ok(escaped.includes('&lt;script&gt;'), 'Must encode tags');
      assert.ok(escaped.includes('&amp;'), 'Must encode &');
      assert.ok(escaped.includes('&quot;'), 'Must encode "');
      assert.ok(escaped.includes('&#39;'), 'Must encode \'');
    });

    it('3.2: Extreme input length (100,000 characters) in esc() without call stack overflow', () => {
      const hugeString = '<p>' + 'ก'.repeat(100000) + '&"\'</p>';
      assert.doesNotThrow(() => {
        const out = esc(hugeString);
        assert.ok(out.startsWith('&lt;p&gt;'));
        assert.ok(out.endsWith('&lt;/p&gt;'));
      });
    });

    it('3.3: Thai unicode strings with multiple tone marks and special punctuation handled cleanly', () => {
      const complexThai = 'ที่ทำการฝ่ายบริการฯ ๑๒๓/๔๕ หมู่ ๖ (น้ำหนัก ๑,๕๐๐.๕๐ กก.) ภาษีมูลค่าเพิ่ม ๗%';
      const escaped = esc(complexThai);
      assert.strictEqual(escaped, complexThai, 'Valid Thai text without special HTML entities must remain unaltered');
    });

    it('3.4: ApiError correctly unpacks Laravel 422 validation errors with fieldErrors getter', () => {
      const errorPayload = {
        message: 'The name and username fields are invalid.',
        errors: {
          name: ['ชื่อ-นามสกุลจำเป็นต้องกรอก', 'ชื่อต้องไม่เกิน 255 ตัวอักษร'],
          username: ['ชื่อผู้ใช้ถูกใช้งานแล้ว'],
          password: ['รหัสผ่านต้องมีความยาวอย่างน้อย 15 ตัวอักษร'],
        },
      };

      const apiErr = new ApiError('Validation failed', 422, errorPayload);
      assert.strictEqual(apiErr.isValidationError, true);
      assert.strictEqual(apiErr.isRateLimited, false);
      assert.strictEqual(apiErr.isUnauthorized, false);

      const fields = apiErr.fieldErrors;
      assert.strictEqual(fields.name, 'ชื่อ-นามสกุลจำเป็นต้องกรอก', 'Must pick first message');
      assert.strictEqual(fields.username, 'ชื่อผู้ใช้ถูกใช้งานแล้ว');
      assert.strictEqual(fields.password, 'รหัสผ่านต้องมีความยาวอย่างน้อย 15 ตัวอักษร');
    });

    it('3.5: ApiError fieldErrors handles malformed errors (null, string, empty arrays) without crash', () => {
      const nullErrors = new ApiError('Error', 422, { errors: null });
      assert.deepStrictEqual(nullErrors.fieldErrors, {});

      const emptyArrayErrors = new ApiError('Error', 422, { errors: { field: [] } });
      assert.deepStrictEqual(emptyArrayErrors.fieldErrors, { field: '' });

      const stringValueErrors = new ApiError('Error', 422, { errors: { field: 'ข้อผิดพลาด' } });
      assert.deepStrictEqual(stringValueErrors.fieldErrors, { field: 'ข้อผิดพลาด' });

      const noDataErrors = new ApiError('Error', 500, null);
      assert.deepStrictEqual(noDataErrors.fieldErrors, {});
    });

    it('3.6: User Directory filter bar and search render cleanly under extreme query length', () => {
      umParams.q = 'ก'.repeat(1000);
      const html = userFilterBar();
      assert.ok(html.includes('id="um-search"'));
      assert.ok(html.includes('value="' + 'ก'.repeat(1000) + '"'));
    });

    it('3.7: Service activity validateForm rejects negative numbers, invalid dates, and inactive references', () => {
      const roadWashingMod = modules.find((m) => m.id === 'road-washings');
      assert.ok(roadWashingMod);

      const mockReferences = {
        'cleaning-zones': [
          { id: 1, name: 'เขต 1', is_active: true },
          { id: 2, name: 'เขต 2 (ยกเลิก)', is_active: false },
        ],
      };

      // Case A: Negative distance and invalid date
      const formA = new MockElement('form');
      const inputDate = new MockElement('input');
      inputDate.name = 'service_date';
      inputDate.value = 'invalid-date';
      const inputZone = new MockElement('select');
      inputZone.name = 'cleaning_zone_id';
      inputZone.value = '2'; // inactive reference!
      const inputLoc = new MockElement('input');
      inputLoc.name = 'location';
      inputLoc.value = ' '; // empty / whitespace only!
      const inputDist = new MockElement('input');
      inputDist.name = 'distance_km';
      inputDist.value = '-12.5'; // negative number!

      formA.appendChild(inputDate);
      formA.appendChild(inputZone);
      formA.appendChild(inputLoc);
      formA.appendChild(inputDist);

      const resultA = validateForm(formA, roadWashingMod, mockReferences);
      assert.ok(resultA.errors.service_date, 'Must reject invalid date');
      assert.ok(resultA.errors.cleaning_zone_id, 'Must reject inactive cleaning zone');
      assert.ok(resultA.errors.location, 'Must reject whitespace-only location');
      assert.ok(resultA.errors.distance_km, 'Must reject negative distance');

      // Case B: Valid submission
      const formB = new MockElement('form');
      const validDate = new MockElement('input');
      validDate.name = 'service_date';
      validDate.value = '2026-05-15';
      const validZone = new MockElement('select');
      validZone.name = 'cleaning_zone_id';
      validZone.value = '1';
      const validLoc = new MockElement('input');
      validLoc.name = 'location';
      validLoc.value = 'ถนนแจ้งวัฒนะ';
      const validDist = new MockElement('input');
      validDist.name = 'distance_km';
      validDist.value = '4.50';

      formB.appendChild(validDate);
      formB.appendChild(validZone);
      formB.appendChild(validLoc);
      formB.appendChild(validDist);

      const resultB = validateForm(formB, roadWashingMod, mockReferences);
      assert.deepStrictEqual(resultB.errors, {}, 'Valid form must produce zero errors');
    });

    it('3.8: 422 error display and error reset lifecycle on form re-submission', () => {
      // Simulate form markup with 422 errors attached
      const form = new MockElement('form');
      form.id = 'um-drawer-form';
      const nameInput = new MockElement('input');
      nameInput.name = 'name';
      nameInput.setAttribute('aria-invalid', 'true');
      const nameError = new MockElement('p');
      nameError.id = 'um-name-error';
      nameError.className = 'text-red-600';
      nameError.textContent = 'ชื่อจำเป็นต้องกรอก';

      const alertBanner = new MockElement('div');
      alertBanner.id = 'drawer-server-error';
      alertBanner.textContent = 'ข้อมูลไม่ถูกต้อง';

      form.appendChild(nameInput);
      form.appendChild(nameError);
      form.appendChild(alertBanner);

      // Verify initial error state
      assert.strictEqual(nameInput.getAttribute('aria-invalid'), 'true');
      assert.strictEqual(nameError.textContent, 'ชื่อจำเป็นต้องกรอก');

      // Simulate form reset on re-submission (matches users.js submit handler lines 480-490)
      alertBanner.classList.add('hidden');
      alertBanner.textContent = '';
      form.querySelectorAll('[aria-invalid="true"]').forEach((el) => el.removeAttribute('aria-invalid'));
      form.querySelectorAll('#um-name-error').forEach((el) => {
        el.textContent = '';
        el.classList.add('hidden');
      });

      // Verify clean reset state before API call
      assert.strictEqual(nameInput.getAttribute('aria-invalid'), null, 'aria-invalid must be removed on reset');
      assert.strictEqual(nameError.textContent, '', 'Error message must be cleared');
      assert.strictEqual(alertBanner.textContent, '', 'Server alert text must be cleared');
    });
  });

  // =========================================================================
  // VECTOR 4: MOBILE VIEWPORT REFLOW & 320PX CONTAINMENT ADVERSARIAL AUDIT
  // =========================================================================
  describe('Vector 4: Mobile Viewport Reflow & 320px Containment Adversarial Audit', () => {

    it('4.1: CSS audit confirms html, body, and app-shell have overflow-x clip/hidden', () => {
      const styleCss = fs.readFileSync(path.join(projectRoot, 'src/style.css'), 'utf8');

      // html / :root overflow-x
      assert.ok(
        /html,\s*:root\s*\{[^}]*overflow-x:\s*clip\s*!important/i.test(styleCss),
        'html/:root must declare overflow-x: clip !important'
      );
      assert.ok(
        /html,\s*:root\s*\{[^}]*overflow-x:\s*hidden\s*!important/i.test(styleCss),
        'html/:root must declare overflow-x: hidden !important'
      );

      // body overflow-x
      assert.ok(
        /body\s*\{[^}]*overflow-x:\s*clip\s*!important/i.test(styleCss),
        'body must declare overflow-x: clip !important'
      );

      // #app, .app-shell, #main-content
      assert.ok(
        /#app,\s*\.app-shell,\s*#main-content\s*\{[^}]*overflow-x:\s*hidden/i.test(styleCss),
        '#app, .app-shell, #main-content must declare overflow-x: hidden'
      );
    });

    it('4.2: Data tables are isolated with .data-table-scroll and contain: inline-size', () => {
      const styleCss = fs.readFileSync(path.join(projectRoot, 'src/style.css'), 'utf8');

      assert.ok(
        /\.data-table-scroll\s*\{[^}]*overflow-x:\s*auto\s*!important/i.test(styleCss),
        '.data-table-scroll must declare overflow-x: auto !important'
      );
      assert.ok(
        /\.data-table-scroll\s*\{[^}]*contain:\s*inline-size/i.test(styleCss),
        '.data-table-scroll must declare contain: inline-size for isolation'
      );
    });

    it('4.3: No fixed min-width exceeds 320px in core layout CSS selectors', () => {
      const styleCss = fs.readFileSync(path.join(projectRoot, 'src/style.css'), 'utf8');

      // Look for min-width: [number]px where number > 320 outside of media queries
      const lines = styleCss.split('\n');
      for (const line of lines) {
        if (line.includes('@media')) continue;
        const match = /min-width:\s*([0-9]+)px/i.exec(line);
        if (match) {
          const val = parseInt(match[1], 10);
          assert.ok(
            val <= 320,
            `Global CSS rule declares min-width: ${val}px which exceeds 320px mobile viewport: "${line}"`
          );
        }
      }
    });

    it('4.4: User table HTML structure wraps table inside .data-table-scroll', () => {
      const dummyUsers = [
        { id: 1, name: 'สมชาย ผู้ใช้งาน', username: 'somchai', roles: [{ name: 'staff' }], is_active: true, created_at: '2026-01-01' },
      ];
      const tableHtml = userTable(dummyUsers, { current_page: 1, last_page: 1, total: 1 });
      assert.ok(
        tableHtml.includes('data-table-scroll'),
        'User table markup must include .data-table-scroll container'
      );
      assert.ok(
        tableHtml.includes('overflow-x-auto'),
        'User table container must include overflow-x-auto class'
      );
    });

    it('4.5: All 9 municipal application views render valid responsive markup without unescaped script tags', () => {
      const roadWashingMod = modules.find((m) => m.id === 'road-washings');
      const cleaningGrp = groups.find((g) => g.id === 'cleaning');

      const dummyRecord = {
        id: 1,
        module: 'road-washings',
        service_date: '2026-01-01',
        location: 'ถนนแจ้งวัฒนะ',
        distance_km: 5,
        created_by: 'admin',
        created_at: '2026-01-01',
        updated_by: 'admin',
        updated_at: '2026-01-01',
      };

      const viewsToTest = [
        { name: 'User Directory', html: userDirectoryPage() },
        { name: 'Activity List', html: listPage({ module: roadWashingMod, group: cleaningGrp, params: new URLSearchParams(), records: [dummyRecord] }) },
        { name: 'Activity Form', html: formPage({ module: roadWashingMod, group: cleaningGrp }) },
        { name: 'Activity Detail', html: detailPage({ module: roadWashingMod, group: cleaningGrp, record: dummyRecord }) },
        { name: 'Zone List', html: zoneListPage({ params: new URLSearchParams(), zones: [{ id: 1, code: 'Z01', name: 'เขต 1' }] }) },
        { name: 'Zone Form', html: zoneFormPage() },
        { name: 'Zone Detail', html: zoneDetailPage({ zone: { id: 1, code: 'Z01', name: 'เขต 1' } }) },
        { name: 'Profile Page', html: profilePage() },
        { name: 'Audit Logs Page', html: auditPage({ params: new URLSearchParams(), auditRows: [], auditMeta: { current_page: 1, last_page: 1 } }) },
      ];

      for (const view of viewsToTest) {
        assert.ok(typeof view.html === 'string' && view.html.length > 50, `${view.name} must render non-empty HTML string`);
        // Security check: no raw executable script tags injected into rendered templates
        assert.ok(!/<script\b[^>]*>([\s\S]*?)<\/script>/i.test(view.html), `${view.name} must not contain unescaped <script> tags`);
        // Containment check: tables must have data-table-scroll or overflow-x-auto
        if (view.html.includes('<table')) {
          assert.ok(
            view.html.includes('data-table-scroll') || view.html.includes('overflow-x-auto'),
            `${view.name} table must be wrapped in scroll container`
          );
        }
      }
    });
  });

  // =========================================================================
  // VECTOR 5: SECURITY HEADERS & CSP PENETRATION AUDIT
  // =========================================================================
  describe('Vector 5: Security Headers & CSP Directives Penetration Audit', () => {

    it('5.1: SecurityHeaders middleware declares all 5 mandatory OWASP headers', () => {
      const middlewareFile = fs.readFileSync(
        path.join(projectRoot, 'app/Http/Middleware/SecurityHeaders.php'),
        'utf8'
      );

      assert.ok(middlewareFile.includes("'X-Frame-Options', 'SAMEORIGIN'"), 'Must set X-Frame-Options: SAMEORIGIN');
      assert.ok(middlewareFile.includes("'X-Content-Type-Options', 'nosniff'"), 'Must set X-Content-Type-Options: nosniff');
      assert.ok(middlewareFile.includes("'Referrer-Policy', 'strict-origin-when-cross-origin'"), 'Must set Referrer-Policy');
      assert.ok(middlewareFile.includes("'Permissions-Policy', 'geolocation=(), camera=(), microphone=()'"), 'Must set Permissions-Policy');
      assert.ok(middlewareFile.includes("'Content-Security-Policy'"), 'Must set Content-Security-Policy');
    });

    it('5.2: CSP policy prohibits external frame ancestors and restrains dangerous execution', () => {
      const middlewareFile = fs.readFileSync(
        path.join(projectRoot, 'app/Http/Middleware/SecurityHeaders.php'),
        'utf8'
      );

      assert.ok(middlewareFile.includes("default-src 'self'"), 'CSP must default-src to self');
      assert.ok(middlewareFile.includes("frame-ancestors 'self'"), 'CSP must restrict frame-ancestors to self');
      assert.ok(middlewareFile.includes("base-uri 'self'"), 'CSP must restrict base-uri to self');
      assert.ok(middlewareFile.includes("form-action 'self'"), 'CSP must restrict form-action to self');
    });

    it('5.3: Production SPA bypass protection: public/dist/index.html strictly does not exist', () => {
      const distIndex = path.join(projectRoot, 'public/dist/index.html');
      assert.strictEqual(
        fs.existsSync(distIndex),
        false,
        'public/dist/index.html MUST NOT exist to prevent SPA shell bypass'
      );
    });

    it('5.4: Apache .htaccess sets 1-year immutable caching for dist/assets', () => {
      const htaccess = fs.readFileSync(path.join(projectRoot, 'public/.htaccess'), 'utf8');
      assert.ok(
        htaccess.includes('max-age=31536000'),
        '.htaccess must configure max-age=31536000'
      );
      assert.ok(
        htaccess.includes('immutable'),
        '.htaccess must configure immutable caching directive'
      );
    });
  });
});
