/**
 * src/components/confirmModal.js
 * Accessible Confirmation Modal replacing window.confirm()
 * Conforms to ADR 0007, ADR 0009 & WCAG 2.2 Level AA
 */
import { icon } from '../utils/icons.js';
import { esc } from '../utils/format.js';
import { trapFocus } from './drawer.js';

/**
 * แสดงกล่องข้อความยืนยันการดำเนินการแบบ Accessible แทน window.confirm()
 * @param {{
 *   title?: string,
 *   message?: string,
 *   confirmText?: string,
 *   cancelText?: string,
 *   variant?: 'danger' | 'warning' | 'primary',
 *   iconName?: string
 * }} options
 * @returns {Promise<boolean>}
 */
export function showConfirmModal({
  title = 'ยืนยันการดำเนินการ',
  message = 'คุณต้องการดำเนินการต่อหรือไม่',
  confirmText = 'ยืนยัน',
  cancelText = 'ยกเลิก',
  variant = 'danger',
  iconName = 'trash'
} = {}) {
  return new Promise((resolve) => {
    const triggerElement = document.activeElement;
    const modalRoot = document.createElement('div');
    modalRoot.id = 'accessible-modal-root';
    modalRoot.className = 'modal-container fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#0d241e]/55 p-4 backdrop-blur-xs';

    const variantStyles = {
      danger: {
        iconBg: 'bg-[#fff0ed] text-[#b64b43]',
        btnConfirm: 'bg-[#b84d45] hover:bg-[#a43e37] text-white',
      },
      warning: {
        iconBg: 'bg-[#fff8eb] text-[#b2721a]',
        btnConfirm: 'bg-[#b2721a] hover:bg-[#9a6214] text-white',
      },
      primary: {
        iconBg: 'bg-[#eaf5ef] text-primary',
        btnConfirm: 'bg-primary hover:bg-primary-dark text-white',
      }
    }[variant] || {
      iconBg: 'bg-[#fff0ed] text-[#b64b43]',
      btnConfirm: 'bg-[#b84d45] hover:bg-[#a43e37] text-white',
    };

    modalRoot.innerHTML = `
      <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-modal-title" aria-describedby="confirm-modal-desc" class="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${variantStyles.iconBg}">
          ${icon(iconName, 21)}
        </div>
        <h2 id="confirm-modal-title" class="text-lg font-bold text-ink">${esc(title)}</h2>
        <p id="confirm-modal-desc" class="mt-2 text-sm leading-relaxed text-muted">${esc(message)}</p>
        <div class="mt-7 flex justify-end gap-2.5">
          <button type="button" id="confirm-modal-cancel" class="min-h-11 rounded-xl border border-line px-4 text-sm font-bold text-ink hover:bg-canvas transition">
            ${esc(cancelText)}
          </button>
          <button type="button" id="confirm-modal-confirm" class="min-h-11 rounded-xl px-4 text-sm font-bold transition ${variantStyles.btnConfirm}">
            ${esc(confirmText)}
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalRoot);
    document.body.style.overflow = 'hidden';

    const cancelBtn = modalRoot.querySelector('#confirm-modal-cancel');
    const confirmBtn = modalRoot.querySelector('#confirm-modal-confirm');

    const cleanup = (result) => {
      document.removeEventListener('keydown', onKeydown);
      modalRoot.remove();
      document.body.style.overflow = '';
      if (triggerElement && typeof triggerElement.focus === 'function') {
        triggerElement.focus();
      }
      resolve(result);
    };

    const onKeydown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        cleanup(false);
      } else if (e.key === 'Tab') {
        const dialog = modalRoot.querySelector('[role="alertdialog"]');
        if (dialog) trapFocus(e, dialog);
      }
    };

    modalRoot.addEventListener('click', (e) => {
      if (e.target === modalRoot) {
        cleanup(false);
      }
    });

    cancelBtn?.addEventListener('click', () => cleanup(false));
    confirmBtn?.addEventListener('click', () => cleanup(true));
    document.addEventListener('keydown', onKeydown);

    // กำหนดโฟกัสเริ่มต้นไปที่ปุ่มยกเลิก เพื่อความปลอดภัยในการดำเนินการที่ลบข้อมูล
    setTimeout(() => {
      cancelBtn?.focus();
    }, 50);
  });
}
