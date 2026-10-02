/**
 * src/components/toast.js
 * Toast Notification System with Accessible Status Announcements
 * Conforms to WCAG 2.2 AA (4.1.3 Status Messages)
 */
import { icon } from '../utils/icons.js';
import { esc } from '../utils/format.js';

let toastTimer = null;
let toastContainer = null;

export function initToastContainer() {
  if (toastContainer && document.body.contains(toastContainer)) return toastContainer;
  toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed inset-x-4 bottom-4 z-[70] flex flex-col gap-2 sm:inset-x-auto sm:bottom-5 sm:right-5 pointer-events-none';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(message, type = 'success') {
  const container = initToastContainer();

  // Clear existing toasts
  container.innerHTML = '';
  clearTimeout(toastTimer);

  const isError = type === 'error';
  const borderCls = isError ? 'border-red-200 bg-white text-red-700' : 'border-[#c6e9d8] bg-white text-primary-dark';
  const iconName = isError ? 'info' : 'check';

  const toastEl = document.createElement('div');
  toastEl.role = 'status';
  toastEl.setAttribute('aria-live', 'polite');
  toastEl.className = `app-toast pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold shadow-xl transition-all duration-200 ${borderCls}`;

  toastEl.innerHTML = `
    ${icon(iconName, 19, 'shrink-0')}
    <span class="flex-1">${esc(message)}</span>
    <button type="button" class="ml-2 rounded-lg p-1 text-muted hover:bg-canvas transition" aria-label="ปิดข้อความ">
      ${icon('close', 17)}
    </button>
  `;

  toastEl.querySelector('button')?.addEventListener('click', () => {
    toastEl.remove();
  });

  container.appendChild(toastEl);

  toastTimer = setTimeout(() => {
    toastEl.remove();
  }, 4200);
}

export function dismissToast() {
  if (toastContainer) {
    toastContainer.innerHTML = '';
  }
}
