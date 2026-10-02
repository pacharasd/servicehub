/**
 * src/api.js
 * Centralized API Client with CSRF Injection, Session Interception,
 * Error Unpacking, Rate Limiting & RBAC Permission Helpers.
 * Conforms to ADR 0007, ADR 0008, and AGENT.md
 */

/**
 * คลาสสำหรับจัดการข้อผิดพลาดทางเทคนิคและข้อผิดพลาดจากเซิร์ฟเวอร์
 */
export class ApiError extends Error {
  constructor(message, status = 0, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    this.errors = (data && typeof data === 'object' && data.errors) ? data.errors : {};
  }

  /**
   * ถอดรหัส Validation Error เป็นคู่คีย์-ค่าแบบสตริงเดี่ยว (เลือกข้อความแรกของแต่ละฟิลด์)
   * เหมาะสำหรับส่งต่อให้ฟอร์มนำไปเรนเดอร์ใน aria-describedby
   */
  get fieldErrors() {
    const result = {};
    if (!this.errors || typeof this.errors !== 'object') return result;
    for (const [key, value] of Object.entries(this.errors)) {
      result[key] = Array.isArray(value) ? (value[0] || '') : String(value || '');
    }
    return result;
  }

  get isValidationError() {
    return this.status === 422;
  }

  get isRateLimited() {
    return this.status === 429;
  }

  get isUnauthorized() {
    return this.status === 401 || this.status === 419;
  }

  get isForbidden() {
    return this.status === 403;
  }
}

/**
 * ดึง CSRF Token จาก meta tag ของเอกสาร
 */
export function getCsrfToken() {
  return document.querySelector('meta[name="csrf-token"]')?.content || '';
}

/**
 * ดึง URL หน้าล็อกอินของระบบ
 */
export function getLoginUrl() {
  return window.serviceHubUrls?.login || '/login';
}

/**
 * ตรวจสอบสิทธิ์การใช้งานทั่วไป (เช่น road-washings.view, cleaning-zones.create)
 * @param {string} permission
 * @returns {boolean}
 */
export function can(permission) {
  const user = window.serviceHubUser;
  if (!user) return false;
  const roles = Array.isArray(user.roles) ? user.roles : [];
  if (roles.includes('super-admin')) return true;
  const permissions = Array.isArray(user.permissions) ? user.permissions : [];
  return permissions.includes(permission);
}

/**
 * บทบาทผู้ดูแลที่ได้รับอนุญาตให้เข้าถึงโมดูลจัดการผู้ใช้งาน
 */
export const USER_ADMIN_ROLES = ['super-admin', 'admin'];

/**
 * ตรวจสอบว่าผู้ใช้มีสิทธิ์เข้าถึงเมนูและหน้าจัดการผู้ใช้งานหรือไม่
 * @returns {boolean}
 */
export function canManageUsers() {
  const roles = window.serviceHubUser?.roles ?? [];
  return Array.isArray(roles) && roles.some((r) => USER_ADMIN_ROLES.includes(r));
}

/**
 * ตรวจสอบสิทธิ์ย่อยในโมดูลจัดการผู้ใช้งาน (users.create, users.update, users.disable)
 * @param {string} permission
 * @returns {boolean}
 */
export function canDo(permission) {
  if (!canManageUsers()) return false;
  const roles = window.serviceHubUser?.roles ?? [];
  if (roles.includes('super-admin')) return true;
  const permissions = window.serviceHubUser?.permissions ?? [];
  return Array.isArray(permissions) && permissions.includes(permission);
}

/**
 * สร้าง URL สำหรับโมดูลงานบริการ
 */
export function apiActivityUrl(moduleId) {
  const template = window.serviceHubUrls?.apiActivities || '/api/activities/__MODULE__';
  return template.replace('__MODULE__', encodeURIComponent(moduleId));
}

/**
 * สร้าง URL สำหรับข้อมูลอ้างอิง
 */
export function apiReferenceUrl(type) {
  const template = window.serviceHubUrls?.apiReferences || '/api/references/__TYPE__';
  return template.replace('__TYPE__', encodeURIComponent(type));
}

/**
 * สร้าง URL สำหรับ API จัดการผู้ใช้งาน
 */
export function apiUsersUrl(suffix = '') {
  const base = window.serviceHubUrls?.apiUsers || '/api/users';
  return `${base}${suffix}`;
}

/**
 * สร้าง URL สำหรับ API รายละเอียดรายงาน
 */
export function apiReportDetailUrl(moduleId) {
  const template = window.serviceHubUrls?.apiReportDetail || '/api/reports/__MODULE__';
  return template.replace('__MODULE__', encodeURIComponent(moduleId));
}

/**
 * ฟังก์ชันหลักในการส่งคำขอ HTTP API แบบรวมศูนย์
 * @param {string} url
 * @param {RequestInit} [options={}]
 * @returns {Promise<any>}
 */
export async function apiRequest(url, options = {}) {
  const csrfToken = getCsrfToken();
  const headers = {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {}),
    ...(options.headers || {}),
  };

  let body = options.body;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const isBlob = typeof Blob !== 'undefined' && body instanceof Blob;
  const isURLSearchParams = typeof URLSearchParams !== 'undefined' && body instanceof URLSearchParams;

  if (body && typeof body === 'object' && !isFormData && !isBlob && !isURLSearchParams) {
    body = JSON.stringify(body);
    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
  }

  let response;
  try {
    response = await fetch(url, {
      credentials: 'same-origin',
      ...options,
      headers,
      body,
    });
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message || 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง', 0);
  }

  // 1. ตรวจสอบการหมดอายุของเซสชัน (401 Unauthorized หรือ 419 CSRF Token Mismatch)
  if (response.status === 401 || response.status === 419) {
    const loginUrl = getLoginUrl();
    window.location.assign(loginUrl);
    throw new ApiError('เซสชันของคุณหมดอายุ กรุณาเข้าสู่ระบบใหม่', response.status);
  }

  // 2. แปลงผลลัพธ์ JSON
  const payload = await response.json().catch(() => ({}));

  // 3. ตรวจสอบข้อผิดพลาด HTTP สถานะอื่นๆ
  if (!response.ok) {
    let errorMsg = payload.message;

    if (response.status === 403) {
      errorMsg = errorMsg || 'คุณไม่มีสิทธิ์ดำเนินการในส่วนนี้';
    } else if (response.status === 422) {
      errorMsg = errorMsg || 'ข้อมูลที่ส่งไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง';
    } else if (response.status === 429) {
      errorMsg = errorMsg || 'คำขอส่งมาถี่เกินไป กรุณารอสักครู่แล้วลองใหม่ (Too Many Attempts)';
    } else {
      errorMsg = errorMsg || `เกิดข้อผิดพลาด (${response.status})`;
    }

    const err = new ApiError(errorMsg, response.status, payload);
    err.fields = payload.errors || {};
    throw err;
  }

  return payload;
}

/**
 * ดึงข้อมูล Pagination ครบทุกหน้าสำหรับตาราง Master และกิจกรรมบริการ
 * @param {string} url
 * @param {RequestInit} [options={}]
 * @returns {Promise<any[]>}
 */
export async function allPages(url, options = {}) {
  let page = 1;
  const rows = [];
  while (true) {
    const separator = url.includes('?') ? '&' : '?';
    const pageUrl = `${url}${separator}per_page=100&page=${page}`;
    const result = await apiRequest(pageUrl, options);
    if (Array.isArray(result.data)) {
      rows.push(...result.data);
    }
    const lastPage = result.meta?.last_page || 1;
    if (page >= lastPage) break;
    page++;
  }
  return rows;
}

/**
 * เมธอดความสะดวกสำหรับคำขอ GET
 */
export function apiGet(url, options = {}) {
  return apiRequest(url, { ...options, method: 'GET' });
}

/**
 * เมธอดความสะดวกสำหรับคำขอ POST
 */
export function apiPost(url, data, options = {}) {
  return apiRequest(url, { ...options, method: 'POST', body: data });
}

/**
 * เมธอดความสะดวกสำหรับคำขอ PUT
 */
export function apiPut(url, data, options = {}) {
  return apiRequest(url, { ...options, method: 'PUT', body: data });
}

/**
 * เมธอดความสะดวกสำหรับคำขอ PATCH
 */
export function apiPatch(url, data, options = {}) {
  return apiRequest(url, { ...options, method: 'PATCH', body: data });
}

/**
 * เมธอดความสะดวกสำหรับคำขอ DELETE
 */
export function apiDelete(url, options = {}) {
  return apiRequest(url, { ...options, method: 'DELETE' });
}
