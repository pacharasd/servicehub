/**
 * src/utils/layout.js
 * Common UI Layout Helpers & Action Buttons
 * Conforms to ADR 0007 & WCAG 2.2 Level AA
 */

import { esc } from './format.js';
import { icon } from './icons.js';

/**
 * สร้างส่วนหัวของหน้า (Page Heading) พร้อมชื่อกลุ่มและปุ่มการดำเนินการ
 * @param {string} eyebrow - ข้อความหมวดหมู่ย่อยด้านบน
 * @param {string} title - ชื่อหัวข้อหลักของหน้า
 * @param {string} description - คำอธิบายรายละเอียดของหน้า
 * @param {string} [action=''] - มาร์กอัป HTML สำหรับปุ่มหรือการดำเนินการ
 * @returns {string}
 */
export function pageHeading(eyebrow, title, description, action = '') {
  return `<div class="mb-5 flex min-w-0 max-w-full flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end">
    <div class="min-w-0 max-w-full flex-1">
      <p class="mb-1 text-xs font-bold tracking-[.13em] text-primary sm:mb-1.5">${esc(eyebrow)}</p>
      <h1 class="break-words text-[22px] sm:text-[32px] font-bold leading-tight tracking-tight text-ink">${esc(title)}</h1>
      <p class="mt-1.5 break-words text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">${esc(description)}</p>
    </div>
    ${action ? `<div class="w-full shrink-0 sm:w-auto">${action}</div>` : ''}
  </div>`;
}

/**
 * ปุ่มการดำเนินการหลัก (Primary Button) สไตล์ปุ่มสีเขียวเทศบาล
 * @param {string} label - ข้อความบนปุ่ม
 * @param {string} href - ลิงก์ปลายทาง
 * @param {string} [iconName='plus'] - ชื่อไอคอน
 * @returns {string}
 */
export const primaryButton = (label, href, iconName = 'plus') =>
  `<a href="${href}" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${icon(iconName, 18)}${esc(label)}</a>`;

/**
 * ปุ่มการดำเนินการรอง (Outlined Button) สไตล์ปุ่มเส้นขอบสีขาว
 * @param {string} label - ข้อความบนปุ่ม
 * @param {string} href - ลิงก์ปลายทาง
 * @param {string} [iconName='arrow'] - ชื่อไอคอน
 * @returns {string}
 */
export const outlinedButton = (label, href, iconName = 'arrow') =>
  `<a href="${href}" class="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f8fbf8]">${esc(label)}${icon(iconName, 17)}</a>`;
