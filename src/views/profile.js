/**
 * src/views/profile.js
 * User Profile & Password Management View
 * Conforms to ADR 0007, ADR 0009 & WCAG 2.2 Level AA
 */
import { apiRequest } from '../api.js';
import { esc, userInitials } from '../utils/format.js';
import { icon } from '../utils/icons.js';
import { pageHeading } from '../utils/layout.js';
import { USER_ROLES } from './users.js';
import { showToast } from '../components/toast.js';

export function profilePage() {
  const user = window.serviceHubUser || {};
  const initials = userInitials(user.name || user.username || 'U');
  const roles = user.roles || [];
  const primaryRole = roles[0] || 'staff';
  const primaryRoleMeta = USER_ROLES[primaryRole] || { label: primaryRole, color: 'border-gray-200 bg-gray-50 text-gray-700' };

  return `
    ${pageHeading('โปรไฟล์ส่วนบุคคล', 'ข้อมูลบัญชีของฉัน', 'จัดการชื่อที่แสดงและเปลี่ยนรหัสผ่านสำหรับเข้าใช้งานระบบ')}
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Card 1: ข้อมูลบัญชีและแก้ไขชื่อ -->
      <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7 flex flex-col justify-between" aria-labelledby="profile-info-heading">
        <div>
          <div class="flex items-center gap-4 pb-6 border-b border-line">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#177a67] to-[#0e6253] text-xl font-bold text-white shadow-md">
              ${esc(initials)}
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h2 id="profile-info-heading" class="text-lg font-bold text-ink truncate">${esc(user.name || user.username)}</h2>
                <span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${primaryRoleMeta.color}">
                  ${esc(primaryRoleMeta.label)}
                </span>
                <span class="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  ${icon('check', 12)} ใช้งานอยู่
                </span>
              </div>
              <p class="text-xs text-muted mt-1">ชื่อผู้ใช้: @${esc(user.username)}</p>
            </div>
          </div>

          <form id="profile-name-form" class="mt-6 space-y-4" novalidate>
            <div>
              <label for="profile-username" class="mb-1 block text-sm font-semibold text-ink">ชื่อผู้ใช้ (Username)</label>
              <input id="profile-username" type="text" class="field w-full bg-[#f8faf8] text-muted cursor-not-allowed border-dashed" value="${esc(user.username)}" readonly disabled>
              <p class="mt-1 text-[11px] text-muted">ชื่อผู้ใช้ถูกกำหนดโดยผู้ดูแลระบบและไม่สามารถเปลี่ยนแปลงได้</p>
            </div>

            <div>
              <label for="profile-name" class="mb-1 block text-sm font-semibold text-ink">ชื่อ-นามสกุลที่แสดง (Display Name) <span class="text-red-500">*</span></label>
              <input id="profile-name" name="name" type="text" required maxlength="255" class="field w-full" value="${esc(user.name || '')}" placeholder="กรอกชื่อ-นามสกุลของคุณ">
              <p id="profile-name-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
            </div>

            <div>
              <label class="mb-1 block text-sm font-semibold text-ink">บทบาทหน้าที่ (Roles)</label>
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${roles.map((r) => {
                  const meta = USER_ROLES[r] || { label: r, color: 'border-gray-200 bg-gray-50' };
                  return `<span class="rounded-lg border px-2.5 py-1 text-xs font-medium ${meta.color}">${esc(meta.label)}</span>`;
                }).join('')}
              </div>
            </div>

            <div class="pt-2">
              <button type="submit" id="profile-name-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-50">
                ${icon('check', 17)}
                <span>บันทึกชื่อที่แสดง</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- Card 2: เปลี่ยนรหัสผ่าน -->
      <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7" aria-labelledby="profile-pwd-heading">
        <div class="flex items-center gap-3 pb-4 border-b border-line">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f0f8f4] text-primary">
            ${icon('lock', 20)}
          </div>
          <div>
            <h2 id="profile-pwd-heading" class="text-base font-bold text-ink">เปลี่ยนรหัสผ่านส่วนตัว</h2>
            <p class="text-xs text-muted">รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 15 ตัวอักษร</p>
          </div>
        </div>

        <form id="profile-password-form" class="mt-5 space-y-4" novalidate>
          <div>
            <label for="profile-current-pwd" class="mb-1 block text-sm font-semibold text-ink">รหัสผ่านปัจจุบัน <span class="text-red-500">*</span></label>
            <div class="relative">
              <input id="profile-current-pwd" name="current_password" type="password" required autocomplete="current-password" class="field w-full pr-12" placeholder="กรอกรหัสผ่านปัจจุบัน">
              <button type="button" data-action="toggle-pwd" data-target="profile-current-pwd" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="profile-current-pwd">
                ${icon('eye', 18)}
              </button>
            </div>
            <p id="profile-current-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div>
            <div class="mb-1 flex items-center justify-between">
              <label for="profile-new-pwd" class="text-sm font-semibold text-ink">รหัสผ่านใหม่ <span class="text-red-500">*</span></label>
              <button type="button" id="profile-gen-pwd" class="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                ${icon('sparkles', 13)} สุ่มรหัสผ่านปลอดภัย
              </button>
            </div>
            <div class="relative">
              <input id="profile-new-pwd" name="password" type="password" required minlength="15" autocomplete="new-password" class="field w-full pr-12" placeholder="รหัสผ่านใหม่ไม่น้อยกว่า 15 ตัวอักษร">
              <button type="button" data-action="toggle-pwd" data-target="profile-new-pwd" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="profile-new-pwd">
                ${icon('eye', 18)}
              </button>
            </div>
            <p id="profile-new-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div>
            <label for="profile-confirm-pwd" class="mb-1 block text-sm font-semibold text-ink">ยืนยันรหัสผ่านใหม่ <span class="text-red-500">*</span></label>
            <div class="relative">
              <input id="profile-confirm-pwd" name="password_confirmation" type="password" required minlength="15" autocomplete="new-password" class="field w-full pr-12" placeholder="กรอกรหัสผ่านใหม่อีกครั้ง">
              <button type="button" data-action="toggle-pwd" data-target="profile-confirm-pwd" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="profile-confirm-pwd">
                ${icon('eye', 18)}
              </button>
            </div>
            <p id="profile-confirm-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div class="rounded-xl bg-[#f4f8f5] p-3 text-xs text-[#486358] leading-relaxed">
            <span class="font-bold text-primary-dark">ข้อกำหนดความปลอดภัย:</span> เมื่อเปลี่ยนรหัสผ่านเรียบร้อย ระบบจะตัดเซสชันในอุปกรณ์อื่นทั้งหมดทันที แต่เครื่องนี้จะยังคงใช้งานต่อได้ตามปกติ
          </div>

          <div class="pt-2">
            <button type="submit" id="profile-pwd-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-50">
              ${icon('lock', 17)}
              <span>บันทึกรหัสผ่านใหม่</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  `;
}

export function attachProfileEvents({ toastFn = showToast, onNameUpdated } = {}) {
  const nameForm = document.getElementById('profile-name-form');
  const pwdForm = document.getElementById('profile-password-form');

  // Show/Hide password toggles
  document.querySelectorAll('[data-action="toggle-pwd"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPwd = input.type === 'password';
      input.type = isPwd ? 'text' : 'password';
      btn.innerHTML = icon(isPwd ? 'eyeOff' : 'eye', 18);
      btn.setAttribute('aria-label', isPwd ? 'ซ่อนรหัสผ่าน' : 'แสดงรหัสผ่าน');
      btn.setAttribute('aria-pressed', String(isPwd));
    });
  });

  // Password generator
  document.getElementById('profile-gen-pwd')?.addEventListener('click', () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!';
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    const pw = Array.from(arr).map((b) => chars[b % chars.length]).join('');

    const newPwd = document.getElementById('profile-new-pwd');
    const confirmPwd = document.getElementById('profile-confirm-pwd');
    if (newPwd) {
      newPwd.value = pw;
      newPwd.type = 'text';
      const btn = document.querySelector('[data-target="profile-new-pwd"]');
      if (btn) {
        btn.innerHTML = icon('eyeOff', 18);
        btn.setAttribute('aria-label', 'ซ่อนรหัสผ่าน');
        btn.setAttribute('aria-pressed', 'true');
      }
    }
    if (confirmPwd) {
      confirmPwd.value = pw;
      confirmPwd.type = 'text';
      const btn = document.querySelector('[data-target="profile-confirm-pwd"]');
      if (btn) {
        btn.innerHTML = icon('eyeOff', 18);
        btn.setAttribute('aria-label', 'ซ่อนรหัสผ่าน');
        btn.setAttribute('aria-pressed', 'true');
      }
    }
  });

  // Name form submit
  nameForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('profile-name');
    const nameError = document.getElementById('profile-name-error');
    const submitBtn = document.getElementById('profile-name-submit');
    const name = nameInput.value.trim();

    if (!name) {
      if (nameError) {
        nameError.textContent = 'กรุณาระบุชื่อ-นามสกุล';
        nameError.classList.remove('hidden');
      }
      nameInput.focus();
      return;
    }
    if (nameError) nameError.classList.add('hidden');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-50');
    }

    try {
      const url = window.serviceHubUrls?.apiProfile || '/api/profile';
      const res = await apiRequest(url, {
        method: 'PUT',
        body: { name },
      });
      if (window.serviceHubUser) {
        window.serviceHubUser.name = res.data?.name || name;
      }
      toastFn('บันทึกข้อมูลชื่อเรียบร้อยแล้ว');
      if (typeof onNameUpdated === 'function') onNameUpdated(name);
    } catch (error) {
      const msg = error.errors?.name?.[0] || error.message || 'ไม่สามารถบันทึกชื่อได้';
      if (nameError) {
        nameError.textContent = msg;
        nameError.classList.remove('hidden');
      }
      toastFn(msg, 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-50');
      }
    }
  });

  // Password form submit
  pwdForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currInput = document.getElementById('profile-current-pwd');
    const newInput = document.getElementById('profile-new-pwd');
    const confInput = document.getElementById('profile-confirm-pwd');
    const currError = document.getElementById('profile-current-pwd-error');
    const newError = document.getElementById('profile-new-pwd-error');
    const confError = document.getElementById('profile-confirm-pwd-error');
    const submitBtn = document.getElementById('profile-pwd-submit');

    currError.classList.add('hidden');
    newError.classList.add('hidden');
    confError.classList.add('hidden');

    let hasClientError = false;
    if (!currInput.value) {
      currError.textContent = 'กรุณาระบุรหัสผ่านปัจจุบัน';
      currError.classList.remove('hidden');
      hasClientError = true;
    }
    if (!newInput.value || newInput.value.length < 15) {
      newError.textContent = 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 15 ตัวอักษร';
      newError.classList.remove('hidden');
      hasClientError = true;
    }
    if (newInput.value !== confInput.value) {
      confError.textContent = 'รหัสผ่านยืนยันไม่ตรงกับรหัสผ่านใหม่';
      confError.classList.remove('hidden');
      hasClientError = true;
    }
    if (newInput.value && currInput.value && newInput.value === currInput.value) {
      newError.textContent = 'รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านปัจจุบัน';
      newError.classList.remove('hidden');
      hasClientError = true;
    }

    if (hasClientError) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-50');
    }

    try {
      const url = window.serviceHubUrls?.apiProfilePassword || '/api/profile/password';
      await apiRequest(url, {
        method: 'PUT',
        body: {
          current_password: currInput.value,
          password: newInput.value,
          password_confirmation: confInput.value,
        },
      });

      currInput.value = '';
      newInput.value = '';
      confInput.value = '';
      toastFn('เปลี่ยนรหัสผ่านเรียบร้อยแล้ว เซสชันในอุปกรณ์อื่นถูกยกเลิกแล้ว');
    } catch (error) {
      if (error.errors?.current_password) {
        currError.textContent = error.errors.current_password[0];
        currError.classList.remove('hidden');
      }
      if (error.errors?.password) {
        newError.textContent = error.errors.password[0];
        newError.classList.remove('hidden');
      }
      if (!error.errors?.current_password && !error.errors?.password) {
        toastFn(error.message || 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน', 'error');
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-50');
      }
    }
  });
}

export function renderProfileView(ctx) {
  setTimeout(() => {
    attachProfileEvents();
  }, 0);
  return profilePage();
}
