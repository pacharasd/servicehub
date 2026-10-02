/**
 * src/utils/format.js
 * Formatting Utilities, Currency, Thai Date/Time, Badges, and Escaping Helpers
 * Conforms to ADR 0007 & WCAG 2.2 Level AA
 */

/**
 * ป้องกัน XSS ด้วยการแปลงอักขระพิเศษเป็น HTML Entities
 * @param {any} value
 * @returns {string}
 */
export const esc = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]
  );

/**
 * จัดรูปแบบตัวเลขตามรูปแบบภาษาไทย (คั่นจุลภาค ทศนิยมไม่เกิน 2 ตำแหน่ง)
 * @param {number|string} value
 * @param {Intl.NumberFormatOptions} [options={}]
 * @returns {string}
 */
export const number = (value, options = {}) =>
  new Intl.NumberFormat('th-TH', { maximumFractionDigits: 2, ...options }).format(Number(value) || 0);

/**
 * จัดรูปแบบจำนวนเต็ม
 * @param {number|string} value
 * @returns {string}
 */
export const integer = (value) =>
  new Intl.NumberFormat('th-TH', { maximumFractionDigits: 0 }).format(Number(value) || 0);

/**
 * จัดรูปแบบค่าเงินบาท
 * @param {number|string} value
 * @param {{ suffix?: string, prefix?: string, minimumFractionDigits?: number, maximumFractionDigits?: number }} [options={}]
 * @returns {string}
 */
export function currency(value, {
  suffix = ' บาท',
  prefix = '',
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
} = {}) {
  const num = Number(value) || 0;
  const formatted = new Intl.NumberFormat('th-TH', {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(num);
  return `${prefix}${formatted}${suffix}`;
}

/**
 * จัดรูปแบบวันที่ภาษาไทย (พ.ศ.) ในเขตเวลา Asia/Bangkok
 * @param {string|Date} date
 * @returns {string}
 */
export function thaiDate(date) {
  if (!date) return '—';
  const cleanStr = String(date).slice(0, 10);
  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Bangkok',
  }).format(new Date(`${cleanStr}T12:00:00+07:00`));
}

/**
 * จัดรูปแบบวันที่และเวลาภาษาไทย (พ.ศ.) ในเขตเวลา Asia/Bangkok
 * @param {string|Date} value
 * @returns {string}
 */
export function thaiDateTime(value) {
  if (!value) return '—';
  const normalized = String(value).replace(' ', 'T');
  const hasTz = normalized.includes('Z') || /[+-]\d\d:\d\d$/.test(normalized);
  const dateObj = new Date(normalized + (hasTz ? '' : '+00:00'));

  return new Intl.DateTimeFormat('th-TH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Bangkok',
  }).format(dateObj);
}

/**
 * คืนค่าสตริงวันที่ปัจจุบันในรูปแบบ YYYY-MM-DD ตามเวลาไทย
 * @returns {string}
 */
export const today = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' });

/**
 * คืนค่าสตริงเดือนปัจจุบันในรูปแบบ YYYY-MM ตามเวลาไทย
 * @returns {string}
 */
export const currentMonth = () =>
  new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' }).slice(0, 7);

/**
 * แสดงข้อความช่วงวันที่ภาษาไทย
 * @param {string} from
 * @param {string} to
 * @returns {string}
 */
export function dateRangeText(from, to) {
  if (!from && !to) return '—';
  if (from === to || (!to && from)) return thaiDate(from);
  return `${thaiDate(from)} – ${thaiDate(to)}`;
}

/**
 * แมปชื่อบทบาทภาษาไทยแบบทางการ
 */
export const roleNameMap = {
  'super-admin': 'ผู้ดูแลระบบสูงสุด',
  admin: 'ผู้ดูแลระบบ',
  staff: 'เจ้าหน้าที่',
  viewer: 'ผู้ดูข้อมูล',
  auditor: 'ผู้ตรวจสอบระบบ',
};

/**
 * แมปชื่อบทบาทภาษาไทยแบบกระชับ (สำหรับป้าย Badge)
 */
export const roleThai = {
  'super-admin': 'ผู้ดูแลสูงสุด',
  admin: 'ผู้ดูแลระบบ',
  staff: 'เจ้าหน้าที่',
  viewer: 'ผู้ดูข้อมูล',
  auditor: 'ผู้ตรวจสอบ',
};

/**
 * รหัสสีและคลาส Tailwind สำหรับป้ายบทบาทผู้ใช้
 */
export const roleBadgeColors = {
  'super-admin': 'bg-[#fef2e8] text-[#b25d1a] border-[#f9d4b4]',
  admin: 'bg-[#e8f0fe] text-[#2756b8] border-[#c3d3f9]',
  staff: 'bg-[#eef7f2] text-[#156e3a] border-[#b7e4ce]',
  viewer: 'bg-[#f3f0fb] text-[#5a469b] border-[#cdc5ef]',
  auditor: 'bg-[#fff4e8] text-[#966020] border-[#f5d9a8]',
};

/**
 * สไตล์สีสำรองของบทบาทใน Topbar
 */
export const roleBadgeMap = {
  'super-admin': 'border-red-200 bg-red-50 text-red-700',
  admin: 'border-amber-200 bg-amber-50 text-amber-700',
  staff: 'border-teal-200 bg-teal-50 text-teal-800',
  viewer: 'border-gray-200 bg-gray-50 text-gray-700',
  auditor: 'border-blue-200 bg-blue-50 text-blue-700',
};

/**
 * สร้าง HTML สำหรับป้ายแสดงบทบาท
 * @param {string} roleName
 * @returns {string}
 */
export function roleBadge(roleName) {
  const cls = roleBadgeColors[roleName] || 'bg-[#f2f4f3] text-[#52665e] border-[#d8e3de]';
  const label = roleThai[roleName] || roleNameMap[roleName] || roleName;
  return `<span class="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${cls}">${esc(label)}</span>`;
}

/**
 * สร้าง HTML สำหรับป้ายแสดงสถานะการใช้งาน (ใช้งานอยู่ / ระงับการใช้งาน)
 * @param {boolean|number} isActive
 * @param {{ activeText?: string, inactiveText?: string, useShort?: boolean }} [options={}]
 * @returns {string}
 */
export function statusBadge(isActive, {
  activeText = 'ใช้งานอยู่',
  inactiveText = 'ระงับแล้ว',
  useShort = false,
} = {}) {
  const active = Boolean(isActive);
  const text = active ? activeText : inactiveText;
  const bgClass = active ? 'bg-[#eef7f2] text-[#156e3a]' : 'bg-[#fef2f2] text-[#b91c1c]';
  const dotClass = active ? 'bg-[#22c55e]' : 'bg-[#ef4444]';

  return `<span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${bgClass}"><span class="h-1.5 w-1.5 rounded-full ${dotClass}" aria-hidden="true"></span>${esc(text)}</span>`;
}

/**
 * ดึงตัวอักษรย่อ 1-2 ตัวสำหรับอวาตาร์ผู้ใช้
 * @param {string} name
 * @returns {string}
 */
export function userInitials(name) {
  const parts = String(name || '').trim().split(/\s+/);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : String(name || '?')[0].toUpperCase();
}

/**
 * ดึงตัวอักษรแรก 1 ตัวสำหรับปุ่ม Topbar
 * @param {string} name
 * @returns {string}
 */
export function userInitial(name) {
  return (String(name || 'U').trim()[0] || 'U').toUpperCase();
}

/**
 * สร้างลิงก์เส้นทางสำหรับโมดูลงานบริการ
 * @param {string} id
 * @returns {string}
 */
export const moduleHref = (id) => `#/module/${id}`;
