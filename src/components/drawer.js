/**
 * src/components/drawer.js
 * Accessible Slide-over Drawer Component with Focus Trap and Restoration
 * Conforms to ADR 0007, ADR 0009 & WCAG 2.2 Level AA
 */
import { icon } from '../utils/icons.js';
import { esc } from '../utils/format.js';

let activeDrawer = null;

/**
 * ดักจับและควบคุมการวนโฟกัสภายในกล่องโต้ตอบ
 * @param {KeyboardEvent} event
 * @param {HTMLElement} container
 */
export function trapFocus(event, container) {
  if (event.key !== 'Tab') return;
  const focusable = [...container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )].filter(el => !el.closest('[hidden]') && el.offsetParent !== null);

  if (!focusable.length) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/**
 * เปิด Drawer แสดงผลแบบสไลด์เข้าจากด้านข้าง
 * @param {{
 *   title?: string,
 *   content?: string | HTMLElement,
 *   footer?: string,
 *   trigger?: HTMLElement,
 *   onClose?: Function,
 *   initialFocusSelector?: string,
 *   maxWidth?: string
 * }} options
 * @returns {HTMLElement}
 */
export function openDrawer({
  title = '',
  content = '',
  footer = '',
  trigger = null,
  onClose = null,
  initialFocusSelector = 'input:not([disabled]), select:not([disabled]), button:not([disabled])',
  maxWidth = 'max-w-[440px]'
} = {}) {
  closeDrawer(); // ปิด Drawer ที่เปิดอยู่ก่อนหน้า (ถ้ามี)

  const triggerElement = trigger || document.activeElement;
  const drawerRoot = document.createElement('div');
  drawerRoot.id = 'accessible-drawer-root';
  drawerRoot.className = 'drawer-container';

  drawerRoot.innerHTML = `
    <div id="drawer-backdrop" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-200" aria-hidden="true" data-action="drawer-close"></div>
    <div id="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" class="fixed inset-y-0 right-0 z-50 flex w-full ${esc(maxWidth)} flex-col bg-white shadow-2xl transition-transform duration-300">
      <div class="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5 sm:px-6">
        <h2 id="drawer-title" class="text-base font-bold text-ink">${esc(title)}</h2>
        <button type="button" data-action="drawer-close" class="rounded-xl p-2 text-muted hover:bg-canvas transition" aria-label="ปิด">${icon('close', 20)}</button>
      </div>
      <div class="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
        ${typeof content === 'string' ? content : ''}
      </div>
      ${footer ? `
      <div class="flex shrink-0 items-center justify-end gap-3 border-t border-line px-5 py-4 sm:px-6 bg-[#fafbfa]">
        ${footer}
      </div>` : ''}
    </div>
  `;

  if (content instanceof HTMLElement) {
    drawerRoot.querySelector('.flex-1').appendChild(content);
  }

  document.body.appendChild(drawerRoot);
  document.body.style.overflow = 'hidden';

  const onKeydown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDrawer();
    } else if (e.key === 'Tab') {
      const panel = document.getElementById('drawer-panel');
      if (panel) trapFocus(e, panel);
    }
  };

  const onClick = (e) => {
    if (e.target.closest('[data-action="drawer-close"]')) {
      e.preventDefault();
      closeDrawer();
    }
  };

  document.addEventListener('keydown', onKeydown);
  drawerRoot.addEventListener('click', onClick);

  activeDrawer = {
    root: drawerRoot,
    triggerElement,
    onKeydown,
    onClick,
    onClose
  };

  // กำหนดโฟกัสเริ่มต้น
  setTimeout(() => {
    const panel = document.getElementById('drawer-panel');
    if (!panel) return;
    const target = initialFocusSelector ? panel.querySelector(initialFocusSelector) : null;
    if (target && typeof target.focus === 'function') {
      target.focus();
    } else {
      panel.querySelector('button[data-action="drawer-close"]')?.focus();
    }
  }, 50);

  return drawerRoot;
}

/**
 * ปิด Slide-over Drawer และคืนค่าโฟกัสให้กับปุ่มที่เรียก
 */
export function closeDrawer() {
  if (!activeDrawer) return;

  const { root, triggerElement, onKeydown, onClick, onClose } = activeDrawer;

  document.removeEventListener('keydown', onKeydown);
  root.removeEventListener('click', onClick);
  root.remove();
  document.body.style.overflow = '';

  activeDrawer = null;

  if (triggerElement && typeof triggerElement.focus === 'function') {
    triggerElement.focus();
  }

  if (typeof onClose === 'function') {
    onClose();
  }
}

/**
 * ตรวจสอบว่ามี Drawer เปิดอยู่หรือไม่
 * @returns {boolean}
 */
export function isDrawerOpen() {
  return Boolean(activeDrawer);
}
