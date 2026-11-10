/**
 * src/utils/layout.js
 * Common UI Layout Helpers & Action Buttons
 * Conforms to ADR 0007 & WCAG 2.2 Level AA
 */

import { esc } from './format.js';
import { icon } from './icons.js';

/**
 * สร้างส่วนหัวของหน้า (Page Heading) แบบสมุดทะเบียนราชการยุคใหม่ (ไม่มี Kicker/Eyebrow)
 * @param {string} _eyebrow - พารามิเตอร์เดิมเพื่อความเข้ากันได้ (ไม่แสดงผล Kicker ตามกฎ Impeccable Craft Floor)
 * @param {string} title - ชื่อหัวข้อหลักของหน้า
 * @param {string} description - คำอธิบายรายละเอียดของหน้า
 * @param {string} [action=''] - มาร์กอัป HTML สำหรับปุ่มหรือการดำเนินการ
 * @returns {string}
 */
export function pageHeading(_eyebrow, title, description, action = '') {
  return `<div class="mb-5 flex min-w-0 max-w-full flex-col justify-between gap-3 border-b border-line pb-4 sm:mb-6 sm:flex-row sm:items-end">
    <div class="min-w-0 max-w-full flex-1">
      <h1 class="type-page-title break-words text-ink">${esc(title)}</h1>
      <p class="mt-1 break-words text-xs leading-relaxed text-muted sm:text-sm">${esc(description)}</p>
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
  `<a href="${href}" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm type-primary-action text-white transition hover:bg-primary-dark">${icon(iconName, 18)}${esc(label)}</a>`;

/**
 * ปุ่มการดำเนินการรอง (Outlined Button) สไตล์ปุ่มเส้นขอบสีขาว
 * @param {string} label - ข้อความบนปุ่ม
 * @param {string} href - ลิงก์ปลายทาง
 * @param {string} [iconName='arrow'] - ชื่อไอคอน
 * @returns {string}
 */
export const outlinedButton = (label, href, iconName = 'arrow') =>
  `<a href="${href}" class="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-line bg-white px-4 py-2.5 text-sm type-body text-ink transition hover:border-[#9eb3ab] hover:bg-[#f2f4f0]">${esc(label)}${icon(iconName, 17)}</a>`;
