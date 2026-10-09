/**
 * src/utils/filter.js
 * Universal Filter Utility & Quick Date Presets
 * Conforms to ADR 0007, ADR 0010 & WCAG 2.2 Level AA
 */
import { esc } from './format.js';

/**
 * รูปแบบวันที่ YYYY-MM-DD ตามเขตเวลาท้องถิ่นไทย
 * @param {Date} date
 * @returns {string}
 */
export function formatDateYmd(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * คำนวณช่วงวันที่ตาม Preset ที่ระบุ
 * @param {'today' | '7d' | 'month' | '30d'} preset
 * @returns {{ from: string, to: string }}
 */
export function getQuickDateRange(preset) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const part = key => Number(parts.find(item => item.type === key).value);
  const now = new Date(part('year'), part('month') - 1, part('day'));
  const today = formatDateYmd(now);

  switch (preset) {
    case 'all':
      return { from: '', to: '' };
    case 'today':
      return { from: today, to: today };
    case '7d': {
      const past = new Date(now);
      past.setDate(past.getDate() - 6);
      return { from: formatDateYmd(past), to: today };
    }
    case 'month': {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return { from: formatDateYmd(startOfMonth), to: today };
    }
    case '30d': {
      const past = new Date(now);
      past.setDate(past.getDate() - 29);
      return { from: formatDateYmd(past), to: today };
    }
    default:
      return { from: today, to: today };
  }
}

/**
 * รายการ Presets ช่วงเวลาด่วน
 */
export const DATE_PRESETS = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'today', label: 'วันนี้' },
  { id: '7d', label: '7 วันล่าสุด' },
  { id: 'month', label: 'เดือนนี้' },
  { id: '30d', label: '30 วันล่าสุด' },
];

/**
 * สร้าง HTML สำหรับปุ่มชิปช่วงเวลาด่วน
 * @param {{ from?: string, to?: string, formId?: string, cls?: string }} options
 * @returns {string}
 */
export function renderDatePresets({ from = '', to = '', formId = '', cls = '' } = {}) {
  return `
    <div class="flex flex-wrap items-center gap-1.5 ${cls}" role="group" aria-label="ช่วงเวลาด่วน">
      <span class="text-xs font-semibold text-muted mr-1">ช่วงด่วน:</span>
      ${DATE_PRESETS.map((p) => {
        const range = getQuickDateRange(p.id);
        const isActive = p.id === 'all'
          ? (!from && !to)
          : (Boolean(from) && from === range.from && to === range.to);
        return `
          <button
            type="button"
            data-action="set-date-preset"
            data-preset="${p.id}"
            data-from="${range.from}"
            data-to="${range.to}"
            ${formId ? `data-form="${esc(formId)}"` : ''}
            class="min-h-8 inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold transition ${
              isActive
                ? 'bg-primary text-white shadow-xs'
                : 'border border-line bg-white text-muted hover:border-primary/40 hover:text-ink'
            }"
            aria-pressed="${isActive}"
          >
            ${esc(p.label)}
          </button>
        `;
      }).join('')}
    </div>
  `;
}

/**
 * ฟังก์ชันสร้าง Debounce สำหรับการพิมพ์ค้นหา
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
export function debounce(fn, delay = 300) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
