/**
 * src/utils/icons.js
 * SVG Icons Mapping & Accessible Helper Function
 * Conforms to ADR 0007 & WCAG 2.2 Level AA
 */

import { esc } from './format.js';

/**
 * แผนที่ SVG Icons ในระบบ ServiceHub
 */
export const icons = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  sparkles: '<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 17 .7 1.3L21 19l-1.3.7L19 21l-.7-1.3L17 19l1.3-.7L19 17ZM4 17l.5 1L6 18.5 4.5 19 4 20l-.5-1L2 18.5l1.5-.5L4 17Z"/>',
  recycle: '<path d="m7 19-2-3.4a2 2 0 0 1 0-2l1-1.7M9 5h5.2a2 2 0 0 1 1.7 1l1.4 2.4M19 11l2 3.5a2 2 0 0 1 0 2l-1.4 2.4a2 2 0 0 1-1.7 1H13"/><path d="m4 12 2.8-.8L7.5 14M17 7.5l.5 3 2.8-.9M11 21l2-2-2-2"/>',
  droplet: '<path d="M12 22a8 8 0 0 0 8-8c0-4.4-8-12-8-12S4 9.6 4 14a8 8 0 0 0 8 8Z"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 16 4-5 3 2 5-7"/>',
  road: '<path d="M7 3 4 21M17 3l3 18M12 3v3m0 4v4m0 4v3"/>',
  waves: '<path d="M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  truck: '<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  flask: '<path d="M9 3h6M10 3v7l-5.5 9a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 10V3M8 16h8"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="m5 12 14 0m-6-6 6 6-6 6"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
  filter: '<path d="M4 7h16M7 12h10M10 17h4"/>',
  ellipsis: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
  edit: '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L10 16l-4 1 1-4 9.5-9.5Z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  empty: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 10h8M8 14h5"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  login: '<path d="M10 17l5-5-5-5M15 12H3M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeOff: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>',
};

/**
 * สร้างองค์ประกอบ SVG พร้อมการตั้งค่า ARIA สำหรับการเข้าถึง
 * @param {keyof typeof icons} name - ชื่อไอคอนที่ต้องการ
 * @param {number} [size=20] - ขนาดพิกเซลของไอคอน (กว้างและสูง)
 * @param {string} [cls=''] - คลาส CSS เพิ่มเติม
 * @param {Record<string, string>} [attrs={}] - แอตทริบิวต์เพิ่มเติม เช่น aria-label, title
 * @returns {string}
 */
export function icon(name, size = 20, cls = '', attrs = {}) {
  const content = icons[name];
  if (!content) {
    if (typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') {
      console.warn(`[icons] ไม่พบ icon ชื่อ "${name}" — ใช้ "grid" แทน`);
    }
  }
  const svgContent = content || icons.grid;
  const isAccessible = Boolean(attrs['aria-label'] || attrs.title || attrs.role === 'img');

  const defaultAria = isAccessible
    ? 'role="img"'
    : 'aria-hidden="true"';

  const extraAttrs = Object.entries(attrs)
    .filter(([key]) => key !== 'aria-hidden' && key !== 'role')
    .map(([k, v]) => `${k}="${esc(v)}"`)
    .join(' ');

  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${defaultAria} ${extraAttrs}>${svgContent}</svg>`;
}
