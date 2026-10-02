class _ extends Error{constructor(e,r=0,a=null){super(e),this.name="ApiError",this.status=r,this.data=a,this.errors=a&&typeof a=="object"&&a.errors?a.errors:{}}get fieldErrors(){const e={};if(!this.errors||typeof this.errors!="object")return e;for(const[r,a]of Object.entries(this.errors))e[r]=Array.isArray(a)?a[0]||"":String(a||"");return e}get isValidationError(){return this.status===422}get isRateLimited(){return this.status===429}get isUnauthorized(){return this.status===401||this.status===419}get isForbidden(){return this.status===403}}function z(){return document.querySelector('meta[name="csrf-token"]')?.content||""}function K(){return window.serviceHubUrls?.login||"/login"}function ie(t){const e=window.serviceHubUser;return e?(Array.isArray(e.roles)?e.roles:[]).includes("super-admin")?!0:(Array.isArray(e.permissions)?e.permissions:[]).includes(t):!1}const V=["super-admin","admin"];function Z(){const t=window.serviceHubUser?.roles??[];return Array.isArray(t)&&t.some(e=>V.includes(e))}function T(t){if(!Z())return!1;if((window.serviceHubUser?.roles??[]).includes("super-admin"))return!0;const r=window.serviceHubUser?.permissions??[];return Array.isArray(r)&&r.includes(t)}function le(t){return(window.serviceHubUrls?.apiActivities||"/api/activities/__MODULE__").replace("__MODULE__",encodeURIComponent(t))}function de(t){return(window.serviceHubUrls?.apiReferences||"/api/references/__TYPE__").replace("__TYPE__",encodeURIComponent(t))}async function L(t,e={}){const r=z(),a={Accept:"application/json","X-Requested-With":"XMLHttpRequest",...r?{"X-CSRF-TOKEN":r}:{},...e.headers||{}};let s=e.body;const i=typeof FormData<"u"&&s instanceof FormData,l=typeof Blob<"u"&&s instanceof Blob,d=typeof URLSearchParams<"u"&&s instanceof URLSearchParams;s&&typeof s=="object"&&!i&&!l&&!d&&(s=JSON.stringify(s),a["Content-Type"]||(a["Content-Type"]="application/json"));let n;try{n=await fetch(t,{credentials:"same-origin",...e,headers:a,body:s})}catch(p){throw p instanceof _?p:new _(p.message||"ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง",0)}if(n.status===401||n.status===419){const p=K();throw window.location.assign(p),new _("เซสชันของคุณหมดอายุ กรุณาเข้าสู่ระบบใหม่",n.status)}const c=await n.json().catch(()=>({}));if(!n.ok){let p=c.message;n.status===403?p=p||"คุณไม่มีสิทธิ์ดำเนินการในส่วนนี้":n.status===422?p=p||"ข้อมูลที่ส่งไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง":n.status===429?p=p||"คำขอส่งมาถี่เกินไป กรุณารอสักครู่แล้วลองใหม่ (Too Many Attempts)":p=p||`เกิดข้อผิดพลาด (${n.status})`;const u=new _(p,n.status,c);throw u.fields=c.errors||{},u}return c}async function ce(t,e={}){let r=1;const a=[];for(;;){const s=t.includes("?")?"&":"?",i=`${t}${s}per_page=100&page=${r}`,l=await L(i,e);Array.isArray(l.data)&&a.push(...l.data);const d=l.meta?.last_page||1;if(r>=d)break;r++}return a}const o=t=>String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),A=(t,e={})=>new Intl.NumberFormat("th-TH",{maximumFractionDigits:2,...e}).format(Number(t)||0);function X(t){if(!t)return"—";const e=String(t).slice(0,10);return new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Bangkok"}).format(new Date(`${e}T12:00:00+07:00`))}const ue={"super-admin":"ผู้ดูแลระบบสูงสุด",admin:"ผู้ดูแลระบบ",staff:"เจ้าหน้าที่",viewer:"ผู้ดูข้อมูล",auditor:"ผู้ตรวจสอบระบบ"},me={"super-admin":"border-red-200 bg-red-50 text-red-700",admin:"border-amber-200 bg-amber-50 text-amber-700",staff:"border-teal-200 bg-teal-50 text-teal-800",viewer:"border-gray-200 bg-gray-50 text-gray-700",auditor:"border-blue-200 bg-blue-50 text-blue-700"};function Y(t){const e=String(t||"").trim().split(/\s+/);return e.length>=2?(e[0][0]+e[1][0]).toUpperCase():String(t||"?")[0].toUpperCase()}const pe=t=>`#/module/${t}`,R={grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',sparkles:'<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 17 .7 1.3L21 19l-1.3.7L19 21l-.7-1.3L17 19l1.3-.7L19 17ZM4 17l.5 1L6 18.5 4.5 19 4 20l-.5-1L2 18.5l1.5-.5L4 17Z"/>',recycle:'<path d="m7 19-2-3.4a2 2 0 0 1 0-2l1-1.7M9 5h5.2a2 2 0 0 1 1.7 1l1.4 2.4M19 11l2 3.5a2 2 0 0 1 0 2l-1.4 2.4a2 2 0 0 1-1.7 1H13"/><path d="m4 12 2.8-.8L7.5 14M17 7.5l.5 3 2.8-.9M11 21l2-2-2-2"/>',droplet:'<path d="M12 22a8 8 0 0 0 8-8c0-4.4-8-12-8-12S4 9.6 4 14a8 8 0 0 0 8 8Z"/>',chart:'<path d="M3 3v18h18"/><path d="m7 16 4-5 3 2 5-7"/>',road:'<path d="M7 3 4 21M17 3l3 18M12 3v3m0 4v4m0 4v3"/>',waves:'<path d="M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',truck:'<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',flask:'<path d="M9 3h6M10 3v7l-5.5 9a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 10V3M8 16h8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',plus:'<path d="M12 5v14M5 12h14"/>',arrow:'<path d="m5 12 14 0m-6-6 6 6-6 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="M18 6 6 18M6 6l12 12"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',ellipsis:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L10 16l-4 1 1-4 9.5-9.5Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',empty:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 10h8M8 14h5"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',login:'<path d="M10 17l5-5-5-5M15 12H3M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',lock:'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'};function g(t,e=20,r="",a={}){const s=R[t]||R.grid,l=!!(a["aria-label"]||a.title||a.role==="img")?'role="img"':'aria-hidden="true"',d=Object.entries(a).filter(([n])=>n!=="aria-hidden"&&n!=="role").map(([n,c])=>`${n}="${o(c)}"`).join(" ");return`<svg class="${r}" width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${l} ${d}>${s}</svg>`}function G(t,e,r,a=""){return`<div class="mb-5 flex min-w-0 max-w-full flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end">
    <div class="min-w-0 max-w-full flex-1">
      <p class="mb-1 text-xs font-bold tracking-[.13em] text-primary sm:mb-1.5">${o(t)}</p>
      <h1 class="break-words text-[22px] sm:text-[32px] font-bold leading-tight tracking-tight text-ink">${o(e)}</h1>
      <p class="mt-1.5 break-words text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">${o(r)}</p>
    </div>
    ${a?`<div class="w-full shrink-0 sm:w-auto">${a}</div>`:""}
  </div>`}const fe=(t,e,r="plus")=>`<a href="${e}" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${g(r,18)}${o(t)}</a>`,be=(t,e,r="arrow")=>`<a href="${e}" class="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f8fbf8]">${o(t)}${g(r,17)}</a>`;let B=null,w=null;function J(){return w&&document.body.contains(w)||(w=document.getElementById("toast-container"),w||(w=document.createElement("div"),w.id="toast-container",w.className="fixed inset-x-4 bottom-4 z-[70] flex flex-col gap-2 sm:inset-x-auto sm:bottom-5 sm:right-5 pointer-events-none",document.body.appendChild(w))),w}function q(t,e="success"){const r=J();r.innerHTML="",clearTimeout(B);const a=e==="error",s=a?"border-red-200 bg-white text-red-700":"border-[#c6e9d8] bg-white text-primary-dark",i=a?"info":"check",l=document.createElement("div");l.role="status",l.setAttribute("aria-live","polite"),l.className=`app-toast pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold shadow-xl transition-all duration-200 ${s}`,l.innerHTML=`
    ${g(i,19,"shrink-0")}
    <span class="flex-1">${o(t)}</span>
    <button type="button" class="ml-2 rounded-lg p-1 text-muted hover:bg-canvas transition" aria-label="ปิดข้อความ">
      ${g("close",17)}
    </button>
  `,l.querySelector("button")?.addEventListener("click",()=>{l.remove()}),r.appendChild(l),B=setTimeout(()=>{l.remove()},4200)}let C=null;function O(t,e){if(t.key!=="Tab")return;const r=[...e.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(i=>!i.closest("[hidden]")&&i.offsetParent!==null);if(!r.length){t.preventDefault();return}const a=r[0],s=r[r.length-1];t.shiftKey&&document.activeElement===a?(t.preventDefault(),s.focus()):!t.shiftKey&&document.activeElement===s&&(t.preventDefault(),a.focus())}function W({title:t="",content:e="",footer:r="",trigger:a=null,onClose:s=null,initialFocusSelector:i="input:not([disabled]), select:not([disabled]), button:not([disabled])",maxWidth:l="max-w-[440px]"}={}){j();const d=a||document.activeElement,n=document.createElement("div");n.id="accessible-drawer-root",n.className="drawer-container",n.innerHTML=`
    <div id="drawer-backdrop" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-200" aria-hidden="true" data-action="drawer-close"></div>
    <div id="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" class="fixed inset-y-0 right-0 z-50 flex w-full ${o(l)} flex-col bg-white shadow-2xl transition-transform duration-300">
      <div class="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5 sm:px-6">
        <h2 id="drawer-title" class="text-base font-bold text-ink">${o(t)}</h2>
        <button type="button" data-action="drawer-close" class="rounded-xl p-2 text-muted hover:bg-canvas transition" aria-label="ปิด">${g("close",20)}</button>
      </div>
      <div class="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
        ${typeof e=="string"?e:""}
      </div>
      ${r?`
      <div class="flex shrink-0 items-center justify-end gap-3 border-t border-line px-5 py-4 sm:px-6 bg-[#fafbfa]">
        ${r}
      </div>`:""}
    </div>
  `,e instanceof HTMLElement&&n.querySelector(".flex-1").appendChild(e),document.body.appendChild(n),document.body.style.overflow="hidden";const c=u=>{if(u.key==="Escape")u.preventDefault(),j();else if(u.key==="Tab"){const m=document.getElementById("drawer-panel");m&&O(u,m)}},p=u=>{u.target.closest('[data-action="drawer-close"]')&&(u.preventDefault(),j())};return document.addEventListener("keydown",c),n.addEventListener("click",p),C={root:n,triggerElement:d,onKeydown:c,onClick:p,onClose:s},setTimeout(()=>{const u=document.getElementById("drawer-panel");if(!u)return;const m=i?u.querySelector(i):null;m&&typeof m.focus=="function"?m.focus():u.querySelector('button[data-action="drawer-close"]')?.focus()},50),n}function j(){if(!C)return;const{root:t,triggerElement:e,onKeydown:r,onClick:a,onClose:s}=C;document.removeEventListener("keydown",r),t.removeEventListener("click",a),t.remove(),document.body.style.overflow="",C=null,e&&typeof e.focus=="function"&&e.focus(),typeof s=="function"&&s()}function Q({title:t="ยืนยันการดำเนินการ",message:e="คุณต้องการดำเนินการต่อหรือไม่",confirmText:r="ยืนยัน",cancelText:a="ยกเลิก",variant:s="danger",iconName:i="trash"}={}){return new Promise(l=>{const d=document.activeElement,n=document.createElement("div");n.id="accessible-modal-root",n.className="modal-container fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#0d241e]/55 p-4 backdrop-blur-xs";const c={danger:{iconBg:"bg-[#fff0ed] text-[#b64b43]",btnConfirm:"bg-[#b84d45] hover:bg-[#a43e37] text-white"},warning:{iconBg:"bg-[#fff8eb] text-[#b2721a]",btnConfirm:"bg-[#b2721a] hover:bg-[#9a6214] text-white"},primary:{iconBg:"bg-[#eaf5ef] text-primary",btnConfirm:"bg-primary hover:bg-primary-dark text-white"}}[s]||{iconBg:"bg-[#fff0ed] text-[#b64b43]",btnConfirm:"bg-[#b84d45] hover:bg-[#a43e37] text-white"};n.innerHTML=`
      <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-modal-title" aria-describedby="confirm-modal-desc" class="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${c.iconBg}">
          ${g(i,21)}
        </div>
        <h2 id="confirm-modal-title" class="text-lg font-bold text-ink">${o(t)}</h2>
        <p id="confirm-modal-desc" class="mt-2 text-sm leading-relaxed text-muted">${o(e)}</p>
        <div class="mt-7 flex justify-end gap-2.5">
          <button type="button" id="confirm-modal-cancel" class="min-h-11 rounded-xl border border-line px-4 text-sm font-bold text-ink hover:bg-canvas transition">
            ${o(a)}
          </button>
          <button type="button" id="confirm-modal-confirm" class="min-h-11 rounded-xl px-4 text-sm font-bold transition ${c.btnConfirm}">
            ${o(r)}
          </button>
        </div>
      </div>
    `,document.body.appendChild(n),document.body.style.overflow="hidden";const p=n.querySelector("#confirm-modal-cancel"),u=n.querySelector("#confirm-modal-confirm"),m=b=>{document.removeEventListener("keydown",x),n.remove(),document.body.style.overflow="",d&&typeof d.focus=="function"&&d.focus(),l(b)},x=b=>{if(b.key==="Escape")b.preventDefault(),m(!1);else if(b.key==="Tab"){const y=n.querySelector('[role="alertdialog"]');y&&O(b,y)}};n.addEventListener("click",b=>{b.target===n&&m(!1)}),p?.addEventListener("click",()=>m(!1)),u?.addEventListener("click",()=>m(!0)),document.addEventListener("keydown",x),setTimeout(()=>{p?.focus()},50)})}const M={"super-admin":{label:"ผู้ดูแลสูงสุด",color:"bg-[#fef2e8] text-[#b25d1a] border-[#f9d4b4]"},admin:{label:"ผู้ดูแลระบบ",color:"bg-[#e8f0fe] text-[#2756b8] border-[#c3d3f9]"},staff:{label:"เจ้าหน้าที่",color:"bg-[#eef7f2] text-[#156e3a] border-[#b7e4ce]"},viewer:{label:"ผู้ดูข้อมูล",color:"bg-[#f3f0fb] text-[#5a469b] border-[#cdc5ef]"},auditor:{label:"ผู้ตรวจสอบ",color:"bg-[#fff4e8] text-[#966020] border-[#f5d9a8]"}};function F(t){const e=M[t]||{label:t,color:"bg-[#f2f4f3] text-[#52665e] border-[#d8e3de]"};return`<span class="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${e.color}">${o(e.label)}</span>`}let v={loading:!1,error:null,users:[],summary:{},meta:{},roles:[]},f={q:"",role:"all",status:"all",sort:"created_at",direction:"desc",page:1},P=null;function ee(){return`
    <div id="user-directory-root" class="w-full min-w-0 max-w-full">
      ${N()}
    </div>
  `}function N(){const{loading:t,error:e,users:r,summary:a,meta:s}=v,l=T("users.create")?`<button type="button" data-action="um-open-create" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${g("plus",18)}เพิ่มผู้ใช้งาน</button>`:"";return`
    ${G("การจัดการระบบ","จัดการผู้ใช้งาน","บริหารบัญชีผู้ใช้ สิทธิ์การเข้าถึง และความปลอดภัยของระบบ",l)}
    ${te(a)}
    ${re()}
    ${t?`<div role="status" aria-live="polite" class="flex items-center justify-center py-16 text-muted text-sm">${g("filter",20,"animate-spin mr-2")} กำลังโหลดข้อมูลผู้ใช้งาน...</div>`:e?`<div role="alert" class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">${o(e)}</div>`:ae(r,s)}
  `}function te(t){return`
    <section aria-label="สรุปสถิติผู้ใช้" class="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      ${[{label:"บัญชีผู้ใช้ทั้งหมด",value:t.total_accounts??"—",icon:"users",bg:"bg-[#e6f4ee]",color:"text-primary"},{label:"ใช้งานอยู่",value:t.active_users??"—",icon:"check",bg:"bg-[#e7f3f8]",color:"text-[#3485a5]"},{label:"ผู้ดูแลระบบ",value:t.administrators??"—",icon:"sparkles",bg:"bg-[#fff3e5]",color:"text-[#bb7934]"},{label:"การยืนยันตัวตน 2FA",value:t.two_factor_enrolled??(t.total_accounts!=null?"พร้อมใช้งาน":"—"),icon:"lock",bg:"bg-[#f3f0fb]",color:"text-[#6b4fb8]"}].map(r=>`
        <div class="rounded-2xl border border-line bg-white p-4 sm:p-5 panel-shadow">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${r.bg} ${r.color}">
              ${g(r.icon,19)}
            </div>
            <p class="text-xs font-medium text-muted">${o(r.label)}</p>
          </div>
          <p class="mt-3 text-[26px] font-bold leading-none text-ink">${o(String(r.value))}</p>
        </div>
      `).join("")}
    </section>
  `}function re(){const{q:t,role:e,status:r,sort:a,direction:s}=f,i=[{value:"all",label:"ทุกบทบาท"},...Object.entries(M).map(([d,n])=>({value:d,label:n.label}))],l=[{value:"all",label:"ทุกสถานะ"},{value:"active",label:"ใช้งานอยู่"},{value:"inactive",label:"ระงับแล้ว"}];return`
    <section aria-label="ค้นหาและกรองผู้ใช้" class="mb-5 panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-end gap-3">
        <div class="w-full min-w-0 sm:min-w-[200px] sm:flex-1">
          <label for="um-search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <div class="relative">
            ${g("search",18,"pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]")}
            <input id="um-search" type="search" placeholder="ชื่อหรือชื่อผู้ใช้..." class="field pl-10" value="${o(t)}" data-action="um-search" autocomplete="off">
          </div>
        </div>
        <div class="w-full min-w-0 sm:w-[160px]">
          <label for="um-role" class="mb-1.5 block text-xs font-bold text-[#52665d]">บทบาท</label>
          <select id="um-role" class="field master-native-select" data-action="um-filter-role">
            ${i.map(d=>`<option value="${d.value}"${e===d.value?" selected":""}>${o(d.label)}</option>`).join("")}
          </select>
        </div>
        <div class="w-full min-w-0 sm:w-[160px]">
          <label for="um-status" class="mb-1.5 block text-xs font-bold text-[#52665d]">สถานะ</label>
          <select id="um-status" class="field master-native-select" data-action="um-filter-status">
            ${l.map(d=>`<option value="${d.value}"${r===d.value?" selected":""}>${o(d.label)}</option>`).join("")}
          </select>
        </div>
        <div class="w-full min-w-0 sm:w-[180px]">
          <label for="um-sort" class="mb-1.5 block text-xs font-bold text-[#52665d]">เรียงตาม</label>
          <select id="um-sort" class="field master-native-select" data-action="um-filter-sort">
            <option value="created_at:desc"${a==="created_at"&&s==="desc"?" selected":""}>วันที่สร้าง (ใหม่สุด)</option>
            <option value="created_at:asc"${a==="created_at"&&s==="asc"?" selected":""}>วันที่สร้าง (เก่าสุด)</option>
            <option value="name:asc"${a==="name"&&s==="asc"?" selected":""}>ชื่อ (ก–ฮ)</option>
            <option value="name:desc"${a==="name"&&s==="desc"?" selected":""}>ชื่อ (ฮ–ก)</option>
          </select>
        </div>
        <button type="button" data-action="um-clear-filters" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas sm:w-auto">ล้างตัวกรอง</button>
      </div>
    </section>
  `}function ae(t,e){const r=T("users.update"),a=T("users.disable"),s=T("users.update");if(!t.length)return`
      <div class="panel-shadow flex flex-col items-center rounded-2xl border border-line bg-white px-6 py-16 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f7f2] text-primary">
          ${g("users",27)}
        </div>
        <h3 class="text-base font-bold">ไม่พบผู้ใช้งาน</h3>
        <p class="mt-1 max-w-sm text-sm leading-relaxed text-muted">ลองเปลี่ยนคำค้นหาหรือตัวกรอง หรือเพิ่มผู้ใช้งานใหม่</p>
      </div>
    `;const{current_page:i=1,last_page:l=1,total:d=0,per_page:n=10}=e;return`
    <section aria-labelledby="um-table-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
        <div>
          <h2 id="um-table-title" class="text-sm font-bold">รายการผู้ใช้งาน</h2>
          <p class="mt-0.5 text-xs text-muted">พบ ${A(d)} บัญชี</p>
        </div>
      </div>
      <div class="data-table-scroll block overflow-x-auto w-full max-w-full min-w-0">
        <table class="w-full min-w-[680px] text-left text-sm" role="table" aria-label="ตารางผู้ใช้งาน">
          <thead class="bg-[#f9fbf9] text-xs font-semibold text-muted">
            <tr>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">ผู้ใช้งาน</th>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">ชื่อผู้ใช้</th>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">บทบาท</th>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">สถานะ</th>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">วันที่สร้าง</th>
              ${r||a||s?'<th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">การดำเนินการ</th>':""}
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef2ee]">
            ${t.map(c=>{const p=c.role??c.roles?.[0]?.name??c.roles?.[0]??"",u=!!c.is_active,m=String(c.id)===String(window.serviceHubUser?.id);return`
                <tr class="transition hover:bg-[#fafcfa]" data-user-id="${o(String(c.id))}">
                  <td class="px-5 py-3.5">
                    <div class="flex items-center gap-3">
                      <span aria-hidden="true" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e0f0e8] text-[13px] font-bold text-primary-dark">
                        ${o(Y(c.name))}
                      </span>
                      <span class="font-semibold text-ink break-words max-w-[160px]">${o(c.name)}</span>
                    </div>
                  </td>
                  <td class="px-5 py-3.5 text-muted font-mono text-xs">${o(c.username)}</td>
                  <td class="px-5 py-3.5">${p?F(p):'<span class="text-muted">—</span>'}</td>
                  <td class="px-5 py-3.5">
                    <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${u?"bg-[#eef7f2] text-[#156e3a]":"bg-[#fef2f2] text-[#b91c1c]"}">
                      <span class="h-1.5 w-1.5 rounded-full ${u?"bg-[#22c55e]":"bg-[#ef4444]"}"></span>
                      ${u?"ใช้งานอยู่":"ระงับแล้ว"}
                    </span>
                  </td>
                  <td class="px-5 py-3.5 text-xs text-muted whitespace-nowrap">${X(c.created_at)}</td>
                  ${r||a||s?`
                  <td class="px-5 py-3.5 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                      ${r?`<button type="button" data-action="um-edit-user" data-id="${o(String(c.id))}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-ink hover:bg-canvas" aria-label="แก้ไข ${o(c.name)}">${g("edit",15)}แก้ไข</button>`:""}
                      ${a&&!m?`<button type="button" data-action="um-toggle-status" data-id="${o(String(c.id))}" data-active="${u?"1":"0"}" data-name="${o(c.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold ${u?"text-[#b91c1c] hover:bg-red-50":"text-[#156e3a] hover:bg-[#eef7f2]"}" aria-label="${u?"ระงับ":"เปิดใช้"} ${o(c.name)}">${g(u?"close":"check",15)}${u?"ระงับ":"เปิดใช้"}</button>`:""}
                      ${s&&!m?`<button type="button" data-action="um-reset-password" data-id="${o(String(c.id))}" data-name="${o(c.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-muted hover:bg-canvas" aria-label="รีเซ็ตรหัสผ่าน ${o(c.name)}">${g("logout",15)}รีเซ็ต</button>`:""}
                    </div>
                  </td>`:""}
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
      ${l>1?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-xs text-muted sm:px-6 sm:py-4">
        <span>แสดง ${A((i-1)*n+1)}–${A(Math.min(i*n,d))} จาก ${A(d)} บัญชี</span>
        <div class="flex items-center gap-2">
          <button type="button" data-action="um-page" data-page="${i-1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${i===1?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${i===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</button>
          <span class="px-1 font-bold text-ink">${i} / ${l}</span>
          <button type="button" data-action="um-page" data-page="${i+1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${i===l?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${i===l?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</button>
        </div>
      </div>`:""}
    </section>
  `}function se(){const t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",e=new Uint8Array(16);return crypto.getRandomValues(e),Array.from(e).map(r=>t[r%t.length]).join("")}async function $(t=q){v.loading=!0,v.error=null,I(t);const e=new URLSearchParams;f.q&&e.set("q",f.q),f.role&&f.role!=="all"&&e.set("role",f.role),f.status&&f.status!=="all"&&e.set("status",f.status),e.set("sort",f.sort),e.set("direction",f.direction),e.set("page",String(f.page)),e.set("per_page","10");try{const r=window.serviceHubUrls?.apiUsers||"/api/users",a=await L(`${r}?${e}`);v.users=a.data??[],v.summary=a.summary??{},v.meta=a.meta??{}}catch(r){v.error=r.message||"ไม่สามารถโหลดข้อมูลผู้ใช้งานได้"}finally{v.loading=!1,I(t)}}async function ne(){try{const t=window.serviceHubUrls?.apiRoles||"/api/roles",e=await L(t);v.roles=e.data??[]}catch{v.roles=Object.keys(M).map(t=>({name:t}))}}function I(t=q){const e=document.getElementById("user-directory-root");e&&(e.innerHTML=N(),oe(e,t))}function oe(t,e=q){t.querySelector('[data-action="um-search"]')?.addEventListener("input",r=>{clearTimeout(P),P=setTimeout(()=>{f.q=r.target.value.trim(),f.page=1,$(e)},300)}),t.querySelector('[data-action="um-filter-role"]')?.addEventListener("change",r=>{f.role=r.target.value,f.page=1,$(e)}),t.querySelector('[data-action="um-filter-status"]')?.addEventListener("change",r=>{f.status=r.target.value,f.page=1,$(e)}),t.querySelector('[data-action="um-filter-sort"]')?.addEventListener("change",r=>{const[a,s]=r.target.value.split(":");f.sort=a,f.direction=s,f.page=1,$(e)}),t.querySelector('[data-action="um-clear-filters"]')?.addEventListener("click",()=>{f={q:"",role:"all",status:"all",sort:"created_at",direction:"desc",page:1},$(e)}),t.querySelectorAll('[data-action="um-page"]').forEach(r=>{r.addEventListener("click",()=>{f.page=Number(r.dataset.page),$(e)})}),t.querySelector('[data-action="um-open-create"]')?.addEventListener("click",r=>{H({mode:"create",trigger:r.currentTarget,toastFn:e})}),t.querySelectorAll('[data-action="um-edit-user"]').forEach(r=>{r.addEventListener("click",a=>{const s=v.users.find(d=>String(d.id)===r.dataset.id);if(!s)return;const i=s.role??s.roles?.[0]?.name??s.roles?.[0]??"",l={...s,role:i};H({mode:"edit",user:l,trigger:a.currentTarget,toastFn:e})})}),t.querySelectorAll('[data-action="um-reset-password"]').forEach(r=>{r.addEventListener("click",a=>{const s={id:r.dataset.id,name:r.dataset.name};H({mode:"reset",user:s,trigger:a.currentTarget,toastFn:e})})}),t.querySelectorAll('[data-action="um-toggle-status"]').forEach(r=>{r.addEventListener("click",async()=>{const a=r.dataset.id,s=r.dataset.active==="1",i=r.dataset.name;if(await Q({title:s?"ยืนยันการระงับการใช้งาน":"ยืนยันการเปิดใช้งาน",message:`คุณต้องการ${s?"ระงับการใช้งาน":"เปิดใช้งาน"}บัญชี "${i}" ใช่หรือไม่? ${s?"ผู้ใช้จะถูกตัดเซสชันการเข้าใช้งานทันที":""}`,confirmText:s?"ระงับการใช้งาน":"เปิดใช้งาน",variant:s?"danger":"primary",iconName:s?"close":"check"})){r.disabled=!0;try{const d=window.serviceHubUrls?.apiUsers||"/api/users";await L(`${d}/${encodeURIComponent(a)}/status`,{method:"PATCH",body:{is_active:!s}}),e(s?"ระงับการใช้งานบัญชีแล้ว":"เปิดใช้งานบัญชีแล้ว"),await $(e)}catch(d){e(d.message||"ไม่สามารถเปลี่ยนสถานะผู้ใช้ได้","error"),r.disabled=!1}}})})}function H({mode:t,user:e=null,trigger:r=null,toastFn:a=q}){const s=t==="reset",i=t==="edit",l=s?`รีเซ็ตรหัสผ่าน — ${o(e?.name)}`:i?"แก้ไขข้อมูลผู้ใช้":"เพิ่มผู้ใช้งานใหม่",d=v.roles.length?v.roles:Object.keys(M).map(m=>({name:m})),n=document.createElement("div");n.innerHTML=`
    <div id="drawer-server-error" class="mb-4 hidden rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert"></div>
    <form id="um-drawer-form" novalidate class="space-y-4">
      ${s?`
        <div>
          <label for="um-new-password" class="mb-1.5 block text-sm font-semibold text-ink">รหัสผ่านใหม่ <span class="text-red-500">*</span></label>
          <div class="relative">
            <input id="um-new-password" name="password" type="password" autocomplete="new-password" class="field pr-20 font-mono" required minlength="15" aria-describedby="um-password-error">
            <button type="button" data-action="toggle-pwd-visibility" data-target="um-new-password" class="absolute inset-y-1 right-1 rounded-lg px-3 text-xs font-bold text-primary">แสดง</button>
          </div>
          <p id="um-password-error" class="mt-1 text-xs text-muted" role="alert">ความยาวอย่างน้อย 15 ตัวอักษร</p>
          <button type="button" id="um-gen-pw-btn" class="mt-2 text-xs font-semibold text-primary hover:underline">สุ่มรหัสผ่านปลอดภัย</button>
        </div>
      `:`
        <div>
          <label for="um-name" class="mb-1.5 block text-sm font-semibold text-ink">ชื่อ-นามสกุล <span class="text-red-500">*</span></label>
          <input id="um-name" name="name" type="text" autocomplete="name" class="field" value="${o(e?.name??"")}" required maxlength="255" aria-describedby="um-name-error">
          <p id="um-name-error" class="mt-1 hidden text-xs text-red-600" role="alert"></p>
        </div>
        ${i?`
        <div>
          <p class="text-xs font-bold text-muted uppercase">ชื่อผู้ใช้</p>
          <p class="mt-1 font-mono text-sm font-bold text-ink">@${o(e?.username??"")}</p>
        </div>`:`
        <div>
          <label for="um-username" class="mb-1.5 block text-sm font-semibold text-ink">ชื่อผู้ใช้ (Username) <span class="text-red-500">*</span></label>
          <input id="um-username" name="username" type="text" autocomplete="username" class="field font-mono" placeholder="3-100 ตัวอักษร (a-z, 0-9, . - _)" required maxlength="100" aria-describedby="um-username-error">
          <p id="um-username-error" class="mt-1 hidden text-xs text-red-600" role="alert"></p>
        </div>`}
        <div>
          <label for="um-drawer-role" class="mb-1.5 block text-sm font-semibold text-ink">บทบาท <span class="text-red-500">*</span></label>
          <select id="um-drawer-role" name="role" class="field master-native-select">
            ${d.map(m=>`<option value="${o(m.name)}"${e?.role===m.name?" selected":""}>${o(M[m.name]?.label||m.name)}</option>`).join("")}
          </select>
        </div>
        ${i?"":`
        <div>
          <label for="um-password" class="mb-1.5 block text-sm font-semibold text-ink">รหัสผ่านเริ่มต้น <span class="text-red-500">*</span></label>
          <div class="relative">
            <input id="um-password" name="password" type="password" autocomplete="new-password" class="field pr-20 font-mono" required minlength="15" aria-describedby="um-password-error">
            <button type="button" data-action="toggle-pwd-visibility" data-target="um-password" class="absolute inset-y-1 right-1 rounded-lg px-3 text-xs font-bold text-primary">แสดง</button>
          </div>
          <p id="um-password-error" class="mt-1 text-xs text-muted" role="alert">ความยาวอย่างน้อย 15 ตัวอักษร</p>
          <button type="button" id="um-gen-init-pw-btn" class="mt-2 text-xs font-semibold text-primary hover:underline">สุ่มรหัสผ่านปลอดภัย</button>
        </div>`}
      `}
    </form>
  `;const c=`
    <button type="button" data-action="drawer-close" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-semibold text-ink hover:bg-canvas">ยกเลิก</button>
    <button type="submit" form="um-drawer-form" id="um-drawer-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">
      ${s?"รีเซ็ตรหัสผ่าน":i?"บันทึกการแก้ไข":"สร้างผู้ใช้งาน"}
    </button>
  `;n.querySelectorAll('[data-action="toggle-pwd-visibility"]').forEach(m=>{m.addEventListener("click",()=>{const x=n.querySelector(`#${m.dataset.target}`);if(!x)return;const b=x.type==="password";x.type=b?"text":"password",m.textContent=b?"ซ่อน":"แสดง"})});const p=()=>{const m=se(),x=n.querySelector("#um-password")||n.querySelector("#um-new-password");if(x){x.value=m,x.type="text";const b=n.querySelector(`[data-target="${x.id}"]`);b&&(b.textContent="ซ่อน")}};n.querySelector("#um-gen-pw-btn")?.addEventListener("click",p),n.querySelector("#um-gen-init-pw-btn")?.addEventListener("click",p);const u=n.querySelector("#um-drawer-form");u.addEventListener("submit",async m=>{m.preventDefault();const x=document.getElementById("um-drawer-submit"),b=n.querySelector("#drawer-server-error");b.classList.add("hidden"),b.textContent="",n.querySelectorAll('[aria-invalid="true"]').forEach(h=>h.removeAttribute("aria-invalid")),n.querySelectorAll("#um-password-error").forEach(h=>{h.textContent="ความยาวอย่างน้อย 15 ตัวอักษร",h.classList.remove("text-red-600"),h.classList.add("text-muted")}),n.querySelectorAll("#um-name-error, #um-username-error").forEach(h=>{h.textContent="",h.classList.add("hidden")});const y=new FormData(u),k={};t==="create"?(k.name=String(y.get("name")||"").trim(),k.username=String(y.get("username")||"").trim(),k.password=String(y.get("password")||""),k.role=String(y.get("role")||"")):t==="edit"?(k.name=String(y.get("name")||"").trim(),k.role=String(y.get("role")||"")):t==="reset"&&(k.password=String(y.get("password")||"")),x&&(x.disabled=!0,x.classList.add("opacity-60"));try{const h=window.serviceHubUrls?.apiUsers||"/api/users";let S,E;t==="create"?(S=h,E="POST"):t==="edit"?(S=`${h}/${encodeURIComponent(e.id)}`,E="PUT"):(S=`${h}/${encodeURIComponent(e.id)}/reset-password`,E="POST"),await L(S,{method:E,body:k}),j(),a(t==="create"?"สร้างผู้ใช้งานเรียบร้อยแล้ว":t==="edit"?"บันทึกการแก้ไขแล้ว":"รีเซ็ตรหัสผ่านเรียบร้อยแล้ว"),await $(a)}catch(h){x&&(x.disabled=!1,x.classList.remove("opacity-60")),h.status===422&&h.errors?(Object.entries(h.errors).forEach(([S,E])=>{const D=u.querySelector(`[name="${S}"]`),U=u.querySelector(`#um-${S}-error`);D&&D.setAttribute("aria-invalid","true"),U&&(U.textContent=E[0],U.classList.remove("hidden","text-muted"),U.classList.add("text-red-600"))}),u.querySelector('[aria-invalid="true"]')?.focus()):(b.textContent=h.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล",b.classList.remove("hidden"))}}),W({title:l,content:n,footer:c,trigger:r,initialFocusSelector:t==="reset"?"#um-new-password":"#um-name"})}function xe(t){return setTimeout(()=>{$(q),v.roles.length||ne()},0),ee()}export{M as U,ie as a,le as b,Z as c,L as d,q as e,ce as f,de as g,o as h,g as i,fe as j,ue as k,J as l,pe as m,A as n,be as o,G as p,xe as q,me as r,Q as s,X as t,Y as u};
