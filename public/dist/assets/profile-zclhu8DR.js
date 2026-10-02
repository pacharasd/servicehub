import{i as o,d as x,e as v,U as w,p as y}from"./view-users-DB_OcK_G.js";import{u as g,e as p}from"./view-analytics-BMG2sQy1.js";function h(){const n=window.serviceHubUser||{},f=g(n.name||n.username||"U"),u=n.roles||[],b=u[0]||"staff",i=w[b]||{label:b,color:"border-gray-200 bg-gray-50 text-gray-700"};return`
    ${y("โปรไฟล์ส่วนบุคคล","ข้อมูลบัญชีของฉัน","จัดการชื่อที่แสดงและเปลี่ยนรหัสผ่านสำหรับเข้าใช้งานระบบ")}
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Card 1: ข้อมูลบัญชีและแก้ไขชื่อ -->
      <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7 flex flex-col justify-between" aria-labelledby="profile-info-heading">
        <div>
          <div class="flex items-center gap-4 pb-6 border-b border-line">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#177a67] to-[#0e6253] text-xl font-bold text-white shadow-md">
              ${p(f)}
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h2 id="profile-info-heading" class="text-lg font-bold text-ink truncate">${p(n.name||n.username)}</h2>
                <span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${i.color}">
                  ${p(i.label)}
                </span>
                <span class="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  ${o("check",12)} ใช้งานอยู่
                </span>
              </div>
              <p class="text-xs text-muted mt-1">ชื่อผู้ใช้: @${p(n.username)}</p>
            </div>
          </div>

          <form id="profile-name-form" class="mt-6 space-y-4" novalidate>
            <div>
              <label for="profile-username" class="mb-1 block text-sm font-semibold text-ink">ชื่อผู้ใช้ (Username)</label>
              <input id="profile-username" type="text" class="field w-full bg-[#f8faf8] text-muted cursor-not-allowed border-dashed" value="${p(n.username)}" readonly disabled>
              <p class="mt-1 text-[11px] text-muted">ชื่อผู้ใช้ถูกกำหนดโดยผู้ดูแลระบบและไม่สามารถเปลี่ยนแปลงได้</p>
            </div>

            <div>
              <label for="profile-name" class="mb-1 block text-sm font-semibold text-ink">ชื่อ-นามสกุลที่แสดง (Display Name) <span class="text-red-500">*</span></label>
              <input id="profile-name" name="name" type="text" required maxlength="255" class="field w-full" value="${p(n.name||"")}" placeholder="กรอกชื่อ-นามสกุลของคุณ">
              <p id="profile-name-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
            </div>

            <div>
              <label class="mb-1 block text-sm font-semibold text-ink">บทบาทหน้าที่ (Roles)</label>
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${u.map(s=>{const e=w[s]||{label:s,color:"border-gray-200 bg-gray-50"};return`<span class="rounded-lg border px-2.5 py-1 text-xs font-medium ${e.color}">${p(e.label)}</span>`}).join("")}
              </div>
            </div>

            <div class="pt-2">
              <button type="submit" id="profile-name-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-50">
                ${o("check",17)}
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
            ${o("lock",20)}
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
                ${o("eye",18)}
              </button>
            </div>
            <p id="profile-current-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div>
            <div class="mb-1 flex items-center justify-between">
              <label for="profile-new-pwd" class="text-sm font-semibold text-ink">รหัสผ่านใหม่ <span class="text-red-500">*</span></label>
              <button type="button" id="profile-gen-pwd" class="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                ${o("sparkles",13)} สุ่มรหัสผ่านปลอดภัย
              </button>
            </div>
            <div class="relative">
              <input id="profile-new-pwd" name="password" type="password" required minlength="15" autocomplete="new-password" class="field w-full pr-12" placeholder="รหัสผ่านใหม่ไม่น้อยกว่า 15 ตัวอักษร">
              <button type="button" data-action="toggle-pwd" data-target="profile-new-pwd" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="profile-new-pwd">
                ${o("eye",18)}
              </button>
            </div>
            <p id="profile-new-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div>
            <label for="profile-confirm-pwd" class="mb-1 block text-sm font-semibold text-ink">ยืนยันรหัสผ่านใหม่ <span class="text-red-500">*</span></label>
            <div class="relative">
              <input id="profile-confirm-pwd" name="password_confirmation" type="password" required minlength="15" autocomplete="new-password" class="field w-full pr-12" placeholder="กรอกรหัสผ่านใหม่อีกครั้ง">
              <button type="button" data-action="toggle-pwd" data-target="profile-confirm-pwd" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="profile-confirm-pwd">
                ${o("eye",18)}
              </button>
            </div>
            <p id="profile-confirm-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div class="rounded-xl bg-[#f4f8f5] p-3 text-xs text-[#486358] leading-relaxed">
            <span class="font-bold text-primary-dark">ข้อกำหนดความปลอดภัย:</span> เมื่อเปลี่ยนรหัสผ่านเรียบร้อย ระบบจะตัดเซสชันในอุปกรณ์อื่นทั้งหมดทันที แต่เครื่องนี้จะยังคงใช้งานต่อได้ตามปกติ
          </div>

          <div class="pt-2">
            <button type="submit" id="profile-pwd-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-50">
              ${o("lock",17)}
              <span>บันทึกรหัสผ่านใหม่</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  `}function E({toastFn:n=v,onNameUpdated:f}={}){const u=document.getElementById("profile-name-form"),b=document.getElementById("profile-password-form");document.querySelectorAll('[data-action="toggle-pwd"]').forEach(i=>{i.addEventListener("click",()=>{const s=i.dataset.target,e=document.getElementById(s);if(!e)return;const r=e.type==="password";e.type=r?"text":"password",i.innerHTML=o(r?"eyeOff":"eye",18),i.setAttribute("aria-label",r?"ซ่อนรหัสผ่าน":"แสดงรหัสผ่าน"),i.setAttribute("aria-pressed",String(r))})}),document.getElementById("profile-gen-pwd")?.addEventListener("click",()=>{const i="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",s=new Uint8Array(16);crypto.getRandomValues(s);const e=Array.from(s).map(t=>i[t%i.length]).join(""),r=document.getElementById("profile-new-pwd"),a=document.getElementById("profile-confirm-pwd");if(r){r.value=e,r.type="text";const t=document.querySelector('[data-target="profile-new-pwd"]');t&&(t.innerHTML=o("eyeOff",18),t.setAttribute("aria-label","ซ่อนรหัสผ่าน"),t.setAttribute("aria-pressed","true"))}if(a){a.value=e,a.type="text";const t=document.querySelector('[data-target="profile-confirm-pwd"]');t&&(t.innerHTML=o("eyeOff",18),t.setAttribute("aria-label","ซ่อนรหัสผ่าน"),t.setAttribute("aria-pressed","true"))}}),u?.addEventListener("submit",async i=>{i.preventDefault();const s=document.getElementById("profile-name"),e=document.getElementById("profile-name-error"),r=document.getElementById("profile-name-submit"),a=s.value.trim();if(!a){e&&(e.textContent="กรุณาระบุชื่อ-นามสกุล",e.classList.remove("hidden")),s.focus();return}e&&e.classList.add("hidden"),r&&(r.disabled=!0,r.classList.add("opacity-50"));try{const t=window.serviceHubUrls?.apiProfile||"/api/profile",d=await x(t,{method:"PUT",body:{name:a}});window.serviceHubUser&&(window.serviceHubUser.name=d.data?.name||a),n("บันทึกข้อมูลชื่อเรียบร้อยแล้ว"),typeof f=="function"&&f(a)}catch(t){const d=t.errors?.name?.[0]||t.message||"ไม่สามารถบันทึกชื่อได้";e&&(e.textContent=d,e.classList.remove("hidden")),n(d,"error")}finally{r&&(r.disabled=!1,r.classList.remove("opacity-50"))}}),b?.addEventListener("submit",async i=>{i.preventDefault();const s=document.getElementById("profile-current-pwd"),e=document.getElementById("profile-new-pwd"),r=document.getElementById("profile-confirm-pwd"),a=document.getElementById("profile-current-pwd-error"),t=document.getElementById("profile-new-pwd-error"),d=document.getElementById("profile-confirm-pwd-error"),c=document.getElementById("profile-pwd-submit");a.classList.add("hidden"),t.classList.add("hidden"),d.classList.add("hidden");let m=!1;if(s.value||(a.textContent="กรุณาระบุรหัสผ่านปัจจุบัน",a.classList.remove("hidden"),m=!0),(!e.value||e.value.length<15)&&(t.textContent="รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 15 ตัวอักษร",t.classList.remove("hidden"),m=!0),e.value!==r.value&&(d.textContent="รหัสผ่านยืนยันไม่ตรงกับรหัสผ่านใหม่",d.classList.remove("hidden"),m=!0),e.value&&s.value&&e.value===s.value&&(t.textContent="รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านปัจจุบัน",t.classList.remove("hidden"),m=!0),!m){c&&(c.disabled=!0,c.classList.add("opacity-50"));try{const l=window.serviceHubUrls?.apiProfilePassword||"/api/profile/password";await x(l,{method:"PUT",body:{current_password:s.value,password:e.value,password_confirmation:r.value}}),s.value="",e.value="",r.value="",n("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว เซสชันในอุปกรณ์อื่นถูกยกเลิกแล้ว")}catch(l){l.errors?.current_password&&(a.textContent=l.errors.current_password[0],a.classList.remove("hidden")),l.errors?.password&&(t.textContent=l.errors.password[0],t.classList.remove("hidden")),!l.errors?.current_password&&!l.errors?.password&&n(l.message||"เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน","error")}finally{c&&(c.disabled=!1,c.classList.remove("opacity-50"))}}})}function I(n){return setTimeout(()=>{E()},0),h()}export{E as attachProfileEvents,h as profilePage,I as renderProfileView};
