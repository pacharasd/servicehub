import { esc } from '../utils/format.js';

export const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
const weekdays = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
const pad = value => String(value).padStart(2, '0');
const isoDate = date => `${String(date.getUTCFullYear()).padStart(4, '0')}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
const utcDate = (year, month, day) => {
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

export function validIso(value, mode = 'date') {
  const match = String(value).match(mode === 'month' ? /^(\d{4})-(\d{2})$/ : /^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return false;
  const [, y, m, d = '1'] = match;
  const date = utcDate(+y, +m, +d);
  return +y >= 1 && +y <= 9999 && date.getUTCFullYear() === +y && date.getUTCMonth() + 1 === +m && date.getUTCDate() === +d;
}

export function parseThaiDate(value, mode = 'date') {
  if (!String(value).trim()) return '';
  const match = String(value).trim().match(mode === 'month' ? /^(\d{1,2})\/(\d{4,5})$/ : /^(\d{1,2})\/(\d{1,2})\/(\d{4,5})$/);
  if (!match) return null;
  const parts = match.slice(1).map(Number);
  const year = parts.at(-1) - 543;
  const month = mode === 'month' ? parts[0] : parts[1];
  const iso = `${String(year).padStart(4, '0')}-${pad(month)}${mode === 'month' ? '' : `-${pad(parts[0])}`}`;
  return validIso(iso, mode) ? iso : null;
}

export function formatThaiDate(value, mode = 'date') {
  if (!validIso(value, mode)) return '';
  const [year, month, day] = value.split('-').map(Number);
  return `${mode === 'month' ? '' : `${pad(day)}/`}${pad(month)}/${year + 543}`;
}

export function todayThai() {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  return ['year', 'month', 'day'].map(key => parts.find(part => part.type === key).value).join('-');
}

export function moveCalendarDate(value, key, shift = false) {
  const [year, month, day] = value.split('-').map(Number);
  const date = utcDate(year, month, day);
  const offsets = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -date.getUTCDay(), End: 6 - date.getUTCDay() };
  if (key in offsets) date.setUTCDate(day + offsets[key]);
  else if (key === 'PageUp' || key === 'PageDown') {
    const delta = (key === 'PageUp' ? -1 : 1) * (shift ? 12 : 1);
    date.setUTCDate(1);
    date.setUTCMonth(date.getUTCMonth() + delta);
    const last = utcDate(date.getUTCFullYear(), date.getUTCMonth() + 2, 0).getUTCDate();
    date.setUTCDate(Math.min(day, last));
  }
  return isoDate(date);
}

const bindings = new WeakMap();
let active = null;
let initialized = false;
let sequence = 0;

function syncBinding(binding) {
  const { canonical, text, button } = binding;
  text.value = formatThaiDate(canonical.value, binding.mode);
  text.disabled = button.disabled = canonical.disabled;
  binding.committed = canonical.value;
  text.setCustomValidity(!canonical.value && text.required ? 'กรุณาระบุวันที่ พ.ศ.' : '');
  text.removeAttribute('aria-invalid');
}

export function syncThaiDateInputs(root = document) {
  root.querySelectorAll('[data-thai-canonical]').forEach(input => syncBinding(bindings.get(input)));
}

function commit(binding, value, notify = true) {
  const changed = binding.committed !== value;
  binding.canonical.value = value;
  syncBinding(binding);
  if (changed && notify) binding.canonical.dispatchEvent(new Event('change', { bubbles: true }));
}

function readText(binding, notify) {
  const value = parseThaiDate(binding.text.value, binding.mode);
  let message = value === null ? `กรุณากรอก${binding.mode === 'month' ? 'เดือน/ปี' : 'วัน/เดือน/ปี'} พ.ศ. ที่ถูกต้อง` : '';
  if (value === '' && binding.text.required) message = 'กรุณาระบุวันที่ พ.ศ.';
  if (value && ((binding.min && value < binding.min) || (binding.max && value > binding.max))) message = 'วันที่อยู่นอกช่วงที่กำหนด';
  binding.text.setCustomValidity(message);
  if (message) {
    binding.canonical.value = '';
    binding.text.setAttribute('aria-invalid', 'true');
    return false;
  }
  commit(binding, value, notify);
  return true;
}

function closeCalendar(restore = true) {
  if (!active) return;
  const { dialog, binding } = active;
  active = null;
  dialog.remove();
  binding.button.setAttribute('aria-expanded', 'false');
  if (restore && binding.text.isConnected) binding.text.focus();
}

function renderCalendar(focusValue = null) {
  const state = active;
  const { binding, dialog, year, month } = state;
  const selected = binding.canonical.value;
  const today = todayThai();
  const label = `พ.ศ. ${year + 543}`;
  const disabledDate = iso => (binding.min && iso < binding.min) || (binding.max && iso > binding.max);
  let grid;
  if (binding.mode === 'month') {
    grid = `<div class="grid grid-cols-3 gap-1">${thaiMonths.map((name, index) => {
      const iso = `${String(year).padStart(4, '0')}-${pad(index + 1)}`;
      return `<button type="button" data-value="${iso}" class="rounded-lg border border-line px-1 py-3 text-xs ${selected === iso ? 'bg-primary text-white' : ''}" ${disabledDate(iso) ? 'disabled' : ''} aria-label="${name} ${label}">${name}</button>`;
    }).join('')}</div>`;
  } else {
    const first = utcDate(year, month, 1);
    const days = utcDate(year, month + 1, 0).getUTCDate();
    const available = Array.from({ length: days }, (_, index) => `${String(year).padStart(4, '0')}-${pad(month)}-${pad(index + 1)}`).filter(iso => !disabledDate(iso));
    const preferred = focusValue || state.focusDate;
    const focused = available.includes(preferred) ? preferred : available[0];
    const cells = Array.from({ length: Math.ceil((first.getUTCDay() + days) / 7) * 7 }, (_, index) => {
      const day = index - first.getUTCDay() + 1;
      if (day < 1 || day > days) return '<td></td>';
      const iso = `${String(year).padStart(4, '0')}-${pad(month)}-${pad(day)}`;
      const current = iso === selected;
      const labelDate = new Intl.DateTimeFormat('th-TH-u-ca-buddhist', { dateStyle: 'full', timeZone: 'UTC' }).format(utcDate(year, month, day));
      const focus = iso === focused;
      return `<td role="gridcell" aria-selected="${current}"><button type="button" data-value="${iso}" tabindex="${focus ? 0 : -1}" aria-label="${esc(labelDate)}" ${iso === today ? 'aria-current="date"' : ''} ${disabledDate(iso) ? 'disabled' : ''} class="h-9 w-full rounded-lg text-sm ${current ? 'bg-primary text-white' : iso === today ? 'border border-primary' : 'hover:bg-canvas'}">${day}</button></td>`;
    });
    const rows = Array.from({ length: cells.length / 7 }, (_, index) => `<tr>${cells.slice(index * 7, index * 7 + 7).join('')}</tr>`).join('');
    grid = `<table role="grid" aria-label="${thaiMonths[month - 1]} ${label}" class="w-full table-fixed"><thead><tr>${weekdays.map(day => `<th scope="col" class="py-2 text-xs text-muted">${day}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`;
  }
  dialog.innerHTML = `<div class="flex items-center justify-between gap-2"><h2 id="thai-calendar-title" class="font-bold" aria-live="polite">${binding.mode === 'month' ? 'เลือกเดือน' : thaiMonths[month - 1]} ${label}</h2><button type="button" data-calendar="close" class="min-h-11 px-2 text-sm text-primary">ปิด</button></div>
    <div class="my-2 flex items-center gap-2"><button type="button" data-calendar="previous" aria-label="${binding.mode === 'month' ? 'ปีก่อนหน้า' : 'เดือนก่อนหน้า'}" class="min-h-11 px-2">‹</button>${binding.mode === 'date' ? `<label class="min-w-0 flex-1"><span class="sr-only">เดือน</span><select data-calendar="month" class="field text-sm">${thaiMonths.map((name, index) => `<option value="${index + 1}" ${month === index + 1 ? 'selected' : ''}>${name}</option>`).join('')}</select></label>` : ''}<label class="min-w-0 flex-1"><span class="sr-only">ปี พ.ศ.</span><input data-calendar="year" type="number" class="field text-sm" min="544" max="10542" value="${year + 543}"></label><button type="button" data-calendar="next" aria-label="${binding.mode === 'month' ? 'ปีถัดไป' : 'เดือนถัดไป'}" class="min-h-11 px-2">›</button></div>${grid}<p class="mt-2 text-xs text-muted">ใช้ลูกศรเลือกวัน Enter เพื่อยืนยัน และ Escape เพื่อปิด</p><div class="mt-3 flex justify-between gap-2"><button type="button" data-calendar="clear" class="min-h-11 px-3 text-primary">ล้างค่า</button><button type="button" data-calendar="today" class="min-h-11 px-3 text-primary">${binding.mode === 'month' ? 'เดือนนี้' : 'วันนี้'}</button></div>`;
  if (focusValue) dialog.querySelector(`[data-value="${focusValue}"]`)?.focus();
}

function openCalendar(binding) {
  closeCalendar(false);
  let initial = binding.canonical.value || (binding.mode === 'month' ? todayThai().slice(0, 7) : todayThai());
  if (binding.min && initial < binding.min) initial = binding.min;
  if (binding.max && initial > binding.max) initial = binding.max;
  const [year, month, day = 1] = initial.split('-').map(Number);
  const dialog = document.createElement('dialog');
  dialog.id = 'thai-calendar';
  dialog.className = 'thai-calendar rounded-2xl border border-line bg-white p-3 text-ink shadow-xl';
  dialog.setAttribute('aria-labelledby', 'thai-calendar-title');
  document.body.append(dialog);
  active = { binding, dialog, year, month, focusDate: `${String(year).padStart(4, '0')}-${pad(month)}-${pad(day)}` };
  binding.button.setAttribute('aria-expanded', 'true');
  renderCalendar();
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeCalendar(); });
  dialog.addEventListener('click', event => {
    const target = event.target.closest('button');
    if (!target || !active) return;
    if (target.dataset.value) { commit(binding, target.dataset.value); closeCalendar(); return; }
    const action = target.dataset.calendar;
    if (action === 'close') closeCalendar();
    else if (action === 'clear') { commit(binding, ''); closeCalendar(); }
    else if (action === 'today') {
      const value = binding.mode === 'month' ? todayThai().slice(0, 7) : todayThai();
      if (!((binding.min && value < binding.min) || (binding.max && value > binding.max))) { commit(binding, value); closeCalendar(); }
    } else if (action === 'previous' || action === 'next') {
      const date = utcDate(active.year, active.month, 1);
      date.setUTCMonth(date.getUTCMonth() + (action === 'previous' ? -1 : 1) * (binding.mode === 'month' ? 12 : 1));
      if (date.getUTCFullYear() < 1 || date.getUTCFullYear() > 9999) return;
      active.year = date.getUTCFullYear(); active.month = date.getUTCMonth() + 1;
      active.focusDate = isoDate(date);
      renderCalendar();
      dialog.querySelector(`[data-calendar="${action}"]`)?.focus();
    }
  });
  dialog.addEventListener('change', event => {
    const kind = event.target.dataset.calendar;
    if (kind === 'month') active.month = Number(event.target.value);
    else if (kind === 'year') {
      const year = Number(event.target.value) - 543;
      if (!Number.isInteger(year) || year < 1 || year > 9999) { event.target.value = active.year + 543; return; }
      active.year = year;
    } else return;
    active.focusDate = `${String(active.year).padStart(4, '0')}-${pad(active.month)}-01`;
    renderCalendar();
    dialog.querySelector(`[data-calendar="${kind}"]`)?.focus();
  });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); closeCalendar(); return; }
    if (event.key === 'Tab') {
      const controls = [...dialog.querySelectorAll('button:not([disabled]):not([tabindex="-1"]), input, select')];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    if (binding.mode !== 'date' || !event.target.dataset.value || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'].includes(event.key)) return;
    event.preventDefault();
    const next = moveCalendarDate(event.target.dataset.value, event.key, event.shiftKey);
    if (!validIso(next) || (binding.min && next < binding.min) || (binding.max && next > binding.max)) return;
    const [y, m] = next.split('-').map(Number);
    active.year = y; active.month = m; active.focusDate = next;
    renderCalendar(next);
  });
  dialog.showModal();
  (dialog.querySelector('[data-value][tabindex="0"]:not([disabled])') || dialog.querySelector('[data-calendar="close"]')).focus();
}

export function enhanceThaiDateInputs(root = document) {
  root.querySelectorAll('input[type="date"], input[type="month"]').forEach(canonical => {
    const mode = canonical.type;
    const text = document.createElement('input');
    const originalId = canonical.id;
    const id = originalId === canonical.name && originalId ? `${originalId}-display` : originalId || `thai-date-${++sequence}`;
    if (id !== originalId && originalId) {
      for (const label of canonical.labels || []) if (label.htmlFor === originalId) label.htmlFor = id;
    }
    text.type = 'text'; text.id = id; text.className = canonical.className;
    text.inputMode = 'numeric'; text.autocomplete = 'off'; text.required = canonical.required;
    text.placeholder = mode === 'month' ? 'เดือน/ปี พ.ศ.' : 'วัน/เดือน/ปี พ.ศ.';
    text.setAttribute('aria-describedby', `${canonical.getAttribute('aria-describedby') || ''} ${id}-format`.trim());
    if (canonical.hasAttribute('aria-invalid')) text.setAttribute('aria-invalid', canonical.getAttribute('aria-invalid'));
    text.setAttribute('data-thai-display', '');
    const wrapper = document.createElement('span');
    wrapper.className = 'thai-date-field';
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'thai-date-open';
    button.textContent = '▦'; button.setAttribute('aria-label', mode === 'month' ? 'เปิดตัวเลือกเดือนภาษาไทย' : 'เปิดปฏิทินภาษาไทย');
    button.setAttribute('aria-haspopup', 'dialog'); button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-controls', 'thai-calendar');
    const help = document.createElement('span'); help.id = `${id}-format`; help.className = 'sr-only'; help.textContent = mode === 'month' ? 'กรอกเดือน/ปี พ.ศ. เช่น 10/2569' : 'กรอกวัน/เดือน/ปี พ.ศ. เช่น 09/10/2569';
    canonical.before(wrapper);
    wrapper.append(canonical, text, button, help);
    canonical.type = 'hidden'; canonical.id = `${id}-iso`; canonical.required = false; canonical.dataset.thaiCanonical = mode;
    const binding = { canonical, text, button, mode, min: canonical.min, max: canonical.max, initialValue: canonical.value };
    bindings.set(canonical, binding);
    syncBinding(binding);
    if (canonical.getAttribute('aria-invalid') === 'true') text.setAttribute('aria-invalid', 'true');
    text.addEventListener('input', () => {
      const parsed = parseThaiDate(text.value, mode);
      text.setCustomValidity(parsed === null ? 'กรุณากรอกวันที่ พ.ศ. ให้ครบและถูกต้อง' : parsed === '' && text.required ? 'กรุณาระบุวันที่ พ.ศ.' : '');
      // Never leave a previously valid value attached to incomplete visible text.
      if (parsed === null) canonical.value = '';
    });
    text.addEventListener('change', () => readText(binding, true));
    text.addEventListener('keydown', event => {
      if (event.key === 'ArrowDown' && event.altKey) { event.preventDefault(); openCalendar(binding); }
    });
    button.addEventListener('click', () => openCalendar(binding));
  });
}

export function initThaiDatePickers(root) {
  if (initialized) return;
  initialized = true;
  enhanceThaiDateInputs(root);
  new MutationObserver(() => {
    if (active && !active.binding.text.isConnected) closeCalendar(false);
    enhanceThaiDateInputs(root);
    root.querySelectorAll('[data-thai-canonical]').forEach(input => {
      const binding = bindings.get(input);
      if (binding.text.disabled !== input.disabled) binding.text.disabled = input.disabled;
      if (binding.button.disabled !== input.disabled) binding.button.disabled = input.disabled;
    });
  }).observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled'] });
  document.addEventListener('submit', event => {
    const form = event.target;
    const inputs = [...form.querySelectorAll('[data-thai-canonical]')].filter(input => !input.disabled);
    for (const input of inputs) {
      const binding = bindings.get(input);
      if (!readText(binding, false) || !binding.text.checkValidity()) {
        event.preventDefault(); event.stopImmediatePropagation(); binding.text.reportValidity(); binding.text.focus(); return;
      }
    }
  }, true);
  document.addEventListener('reset', event => setTimeout(() => {
    event.target.querySelectorAll('[data-thai-canonical]').forEach(input => { input.value = bindings.get(input).initialValue; });
    syncThaiDateInputs(event.target);
  }, 0));
}
