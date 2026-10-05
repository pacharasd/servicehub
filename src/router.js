/**
 * src/router.js
 * Hash-based SPA Router with Navigation Guards & Dynamic Document Title Management
 * Conforms to ADR 0007 (Modular Vanilla JS) & WCAG 2.2 Level AA
 */

import { can, canManageUsers } from './api.js';
import { modules } from './data.js';

const DEFAULT_TITLE_SUFFIX = ' — เทศบาลนครนนทบุรี';
const DEFAULT_ROUTE_PATH = '/dashboard';

/**
 * แยกชิ้นส่วนและพารามิเตอร์ของ Hash URL
 * @param {string} [hashInput=window.location.hash]
 * @returns {{ hash: string, path: string, parts: string[], params: URLSearchParams, query: Record<string, string> }}
 */
export function parseHash(hashInput = window.location.hash) {
  let hash = hashInput || '';
  if (hash.startsWith('#')) {
    hash = hash.slice(1);
  }

  // รองรับ Figma Capture URL
  if (hash.startsWith('figmacapture=')) {
    return {
      hash: '#/dashboard',
      path: '/dashboard',
      parts: ['dashboard'],
      params: new URLSearchParams(),
      query: {},
    };
  }

  const [rawPath, rawQuery = ''] = (hash || DEFAULT_ROUTE_PATH).split('?');
  const normalizedPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const parts = normalizedPath.split('/').filter(Boolean);
  const params = new URLSearchParams(rawQuery);
  const query = Object.fromEntries(params.entries());

  return {
    hash: `#${normalizedPath}${rawQuery ? `?${rawQuery}` : ''}`,
    path: normalizedPath,
    parts: parts.length ? parts : ['dashboard'],
    params,
    query,
  };
}

/**
 * ดึงข้อมูลเส้นทางปัจจุบัน (Alias เข้ากันได้กับ src/main.js เดิม)
 */
export function route() {
  return parseHash();
}

/**
 * ตั้งชื่อแท็บเบราว์เซอร์ตามมาตรฐานเทศบาล
 * @param {string} title
 * @param {string} [suffix=DEFAULT_TITLE_SUFFIX]
 */
export function setDocumentTitle(title, suffix = DEFAULT_TITLE_SUFFIX) {
  const cleanTitle = (title || 'แดชบอร์ดฝ่ายบริการ').trim();
  if (cleanTitle.endsWith(suffix.trim())) {
    document.title = cleanTitle;
  } else {
    document.title = `${cleanTitle}${suffix}`;
  }
}

/**
 * คำนวณชื่อหน้าตามเส้นทางที่กำหนด
 * @param {{ parts: string[] }} routeData
 * @returns {string}
 */
export function resolveRouteTitle(routeData) {
  const [root, second] = routeData.parts;
  if (root === 'dashboard' || !routeData.parts.length) return 'แดชบอร์ดฝ่ายบริการ';
  if (root === 'login') return 'เข้าสู่ระบบ';
  if (root === 'users') return 'จัดการผู้ใช้งาน';
  if (root === 'profile') return 'โปรไฟล์ส่วนบุคคล';
  if (root === 'audit-logs') return 'ประวัติการแก้ไข';
  if (root === 'cleaning-zones') return 'เขตรักษาความสะอาด';
  if (root === 'waste-types') return 'ประเภทขยะมูลฝอย';
  if (root === 'reports') {
    const mod = modules.find((m) => m.id === second);
    return mod?.short || 'รายงาน';
  }
  if (root === 'module') {
    const mod = modules.find((m) => m.id === second);
    return mod?.short || 'งานบริการ';
  }
  return 'แดชบอร์ดฝ่ายบริการ';
}

/**
 * คลาสบริหารจัดการเส้นทาง
 */
export class Router {
  constructor(routesOrOptions = {}, maybeOptions = {}) {
    let options = {};
    if (routesOrOptions && typeof routesOrOptions === 'object' && !routesOrOptions.defaultRoute && !routesOrOptions.routes) {
      options = { routes: routesOrOptions, ...maybeOptions };
    } else {
      options = routesOrOptions || {};
    }

    this.routes = {};
    this.options = {
      defaultRoute: DEFAULT_ROUTE_PATH,
      titleSuffix: DEFAULT_TITLE_SUFFIX,
      ...options,
    };
    this.current = parseHash();
    this.beforeHooks = [];
    this.afterHooks = [];
    this.notFoundHandler = null;
    this.navigationSequence = 0;

    if (this.options.routes) {
      this.registerRoutes(this.options.routes);
    }
  }

  /**
   * ลงทะเบียนตารางเส้นทาง
   * @param {Record<string, Function|Object>} routes
   */
  registerRoutes(routes) {
    for (const [pattern, config] of Object.entries(routes)) {
      if (typeof config === 'function') {
        this.routes[pattern] = { handler: config };
      } else {
        this.routes[pattern] = config;
      }
    }
  }

  /**
   * กำหนด Handler สำหรับหน้า 404 Not Found
   */
  setNotFound(handler) {
    this.notFoundHandler = handler;
  }

  /**
   * เพิ่ม Hook ก่อนการเปลี่ยนหน้า
   */
  beforeEach(fn) {
    this.beforeHooks.push(fn);
  }

  /**
   * เพิ่ม Hook หลังการเปลี่ยนหน้า
   */
  afterEach(fn) {
    this.afterHooks.push(fn);
  }

  /**
   * สั่งเปลี่ยนเส้นทางทางโปรแกรม
   * @param {string} targetPath
   * @param {{ replace?: boolean, noScroll?: boolean }} [options={}]
   */
  navigate(targetPath, options = {}) {
    let clean = targetPath || DEFAULT_ROUTE_PATH;
    if (clean.startsWith('#')) clean = clean.slice(1);
    if (!clean.startsWith('/')) clean = `/${clean}`;

    const targetHash = `#${clean}`;
    if (window.location.hash === targetHash) {
      this.resolve();
    } else if (options.replace) {
      window.location.replace(targetHash);
    } else {
      window.location.hash = targetHash;
    }

    if (!options.noScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * ตรวจสอบ Guard ประจำเส้นทาง
   * @param {any} routeData
   * @param {any} [routeConfig]
   * @returns {Promise<boolean | string>}
   */
  async checkGuards(routeData, routeConfig) {
    // 1. ดักจับกรณีผู้ใช้พยายามเข้าเส้นทาง login
    if (routeData.parts[0] === 'login') {
      const loginUrl = window.serviceHubUrls?.login || '/login';
      window.location.replace(loginUrl);
      return false;
    }

    // 2. Global beforeEach Hooks
    for (const hook of this.beforeHooks) {
      const allowed = await hook(routeData);
      if (allowed === false) return false;
      if (typeof allowed === 'string') return allowed;
    }

    // 3. Route-level Guard
    if (routeConfig?.guard) {
      const allowed = await routeConfig.guard(routeData);
      if (allowed === false) return false;
      if (typeof allowed === 'string') return allowed;
    }

    // 4. Default Permission Verification based on top-level resource
    const root = routeData.parts[0];
    if (root === 'users' && !canManageUsers()) {
      return false;
    }
    if (root === 'audit-logs' && !can('audit-logs.view')) {
      return false;
    }
    if (root === 'cleaning-zones' && !can('cleaning-zones.view')) {
      return false;
    }
    if (root === 'waste-types' && !can('waste-types.view')) {
      return false;
    }
    if (root === 'module' && routeData.parts[1]) {
      const modId = routeData.parts[1];
      if (!can(`${modId}.view`)) {
        return false;
      }
    }

    return true;
  }

  /**
   * ดำเนินการ Resolve เส้นทางปัจจุบันและเรนเดอร์หน้าจอ
   */
  async resolve() {
    const navigationId = ++this.navigationSequence;
    const routeData = parseHash();
    routeData.isCurrent = () => navigationId === this.navigationSequence && parseHash().hash === routeData.hash;
    this.current = routeData;
    currentRouteData = routeData;

    const rootKey = routeData.parts[0] || 'dashboard';
    const config = this.routes[rootKey] || this.routes['*'];

    const guardResult = await this.checkGuards(routeData, config);
    if (!routeData.isCurrent()) return;
    if (guardResult === false) {
      if (typeof this.options.onDenied === 'function') {
        await this.options.onDenied(routeData);
      } else if (this.notFoundHandler) {
        await this.notFoundHandler(routeData);
      }
      setDocumentTitle('ไม่พบหน้าหรือไม่มีสิทธิ์เข้าถึง', this.options.titleSuffix);
      return;
    }

    if (typeof guardResult === 'string') {
      this.navigate(guardResult);
      return;
    }

    // Resolve Page Title
    let pageTitle = '';
    if (config?.title) {
      pageTitle = typeof config.title === 'function' ? config.title(routeData) : config.title;
    } else {
      pageTitle = resolveRouteTitle(routeData);
    }
    setDocumentTitle(pageTitle, this.options.titleSuffix);

    // Execute Handler
    try {
      if (config?.handler) {
        await config.handler(routeData);
      } else if (this.notFoundHandler) {
        await this.notFoundHandler(routeData);
      }
    } catch (error) {
      if (!routeData.isCurrent()) return;
      if (typeof this.options.onError === 'function') {
        await this.options.onError(error, routeData);
      } else {
        throw error;
      }
      return;
    }

    if (!routeData.isCurrent()) return;

    // Global afterHooks
    for (const hook of this.afterHooks) {
      hook(routeData);
    }

    if (typeof this.options.afterRender === 'function') {
      this.options.afterRender(routeData);
    }
  }

  /**
   * ผูกเหตุการณ์กับหน้าต่างและเริ่มต้นการทำงาน
   */
  init() {
    window.addEventListener('hashchange', () => this.resolve());
    this.resolve();
  }
}

// ตัวแปร Singleton สำหรับทั้งแอป
let globalRouterInstance = null;
export let currentRouteData = null;

export function currentRoute() {
  return currentRouteData || parseHash();
}

export function initRouter(routesOrOptions = {}, options = {}) {
  globalRouterInstance = new Router(routesOrOptions, options);
  globalRouterInstance.init();
  return globalRouterInstance;
}

export function getRouter() {
  if (!globalRouterInstance) {
    globalRouterInstance = new Router();
  }
  return globalRouterInstance;
}

export function navigate(path, options = {}) {
  if (globalRouterInstance) {
    globalRouterInstance.navigate(path, options);
  } else {
    window.location.hash = path.startsWith('#') ? path : `#${path}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
