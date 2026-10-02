import{i as se,d as oe,a as z,s as ie,n as f,m as S,b as F,r as le,c as de}from"./view-activities-krC1dhD7.js";import{i as p,a as y,c as W,r as ce,h as l,k as pe,m as $,d as q,e as I,u as ue,U as T,p as K,t as Y,o as N,l as me,n as Z,q as fe}from"./view-users-CwadCYNt.js";import{d as be,r as xe}from"./view-analytics-Cv5yGdFv.js";import{d as ge,s as M,r as ve,a as O}from"./view-references-BuS9jEpV.js";function k(){document.querySelectorAll("select.field:not(.custom-select-applied):not(.master-native-select)").forEach(e=>{e.classList.add("custom-select-applied"),e.style.display="none";const t=document.createElement("div");t.className="relative w-full";const r=document.createElement("button");r.type="button",r.className=e.className.replace("custom-select-applied","").replace("hidden","")+" flex items-center justify-between text-left";const n=()=>'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';r.innerHTML=`<span class="truncate">${e.options[e.selectedIndex]?.text||""}</span>${n()}`,e.getAttribute("aria-invalid")==="true"&&r.setAttribute("aria-invalid","true");const a=document.createElement("div");a.className="absolute left-0 top-[calc(100%+6px)] z-20 hidden w-full overflow-y-auto max-h-60 rounded-xl border border-line bg-white shadow-xl custom-select-menu py-1";const s=()=>{r.innerHTML=`<span class="truncate">${e.options[e.selectedIndex]?.text||""}</span>${n()}`},o=Array.from(e.options).filter(i=>!i.disabled);o.forEach(i=>{const c=document.createElement("div");c.className=`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${i.selected?"bg-[#f0f8f2] font-bold text-primary":""}`,c.textContent=i.text,c.onclick=()=>{e.value=i.value,e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})),a.classList.add("hidden"),s(),Array.from(a.children).forEach((d,m)=>{d.className=`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${o[m].selected?"bg-[#f0f8f2] font-bold text-primary":""}`})},a.appendChild(c)}),r.onclick=i=>{i.preventDefault();const c=!a.classList.contains("hidden");document.querySelectorAll(".custom-select-menu").forEach(d=>d.classList.add("hidden")),c||a.classList.remove("hidden")},e.parentNode.insertBefore(t,e),t.appendChild(r),t.appendChild(a),t.appendChild(e)})}const he=""+new URL("nonthaburi-logo-BxI5auOM.png",import.meta.url).href,we="#/cleaning-zones",ye="#/waste-types",J=[{type:"group",id:"cleaning",label:"งานบริการรักษาความสะอาด",icon:"sparkles",children:[{module:"road-washings",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",children:[{module:"cleaning-zones",href:we,label:"เขตรักษาความสะอาด"}]},{module:"waterway-cleanings",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ"},{module:"road-sweepings",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ"},{module:"outsourced-cleanings",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม"}]},{type:"link",module:"waste-collections",label:"งานบริหารจัดการมูลฝอย",icon:"recycle",children:[{module:"waste-types",href:ye,label:"ประเภทขยะมูลฝอย"}]},{type:"group",id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",icon:"droplet",children:[{module:"drain-cleanings",label:"งานลอกท่อระบายน้ำ"},{module:"septic-pumpings",label:"งานสูบสิ่งปฏิกูล"},{module:"septic-treatments",label:"การบำบัดสิ่งปฏิกูล"}]},{type:"link",module:"waste-management-projects",label:"โครงการต่าง ๆ",icon:"chart"}];let u=!1,b=!1;const g=new Set;function R(e){u=typeof e=="boolean"?e:!u,Q()}function A(){b=!1;const e=document.getElementById("user-menu-dropdown"),t=document.getElementById("user-menu-button");e&&(e.classList.add("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.remove("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!0),t&&(t.setAttribute("aria-expanded","false"),t.classList.remove("border-primary","bg-[#f0f8f2]"),t.querySelector("svg:last-child")?.classList.remove("rotate-180"))}function $e(){b=!b;const e=document.getElementById("user-menu-dropdown"),t=document.getElementById("user-menu-button");e&&(b?(e.classList.remove("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.add("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!1,e.querySelector("a, button")?.focus()):(e.classList.add("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.remove("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!0,t?.focus())),t&&(t.setAttribute("aria-expanded",String(b)),t.classList.toggle("border-primary",b),t.classList.toggle("bg-[#f0f8f2]",b),t.querySelector("svg:last-child")?.classList.toggle("rotate-180",b))}function v(e){const t=J.find(r=>r.type==="group"&&r.children.some(n=>n.module===e||n.children?.some(a=>a.module===e)));if((e==="waste-collections"||e==="waste-types")&&g.add("waste-collections"),t){g.add(t.id);const r=t.children.find(n=>n.children?.some(a=>a.module===e)||n.module===e&&n.children);r&&g.add(r.module)}}function ke(e){g.has(e)?g.delete(e):g.add(e)}function Q(){const e=window.innerWidth<1024;document.body.style.overflow=e&&u?"hidden":"";const t=document.getElementById("sidebar"),r=document.getElementById("mobile-backdrop");r&&r.classList.toggle("hidden",!u),t&&(t.inert=e&&!u,t.setAttribute("aria-hidden",String(!u&&e)),e?(t.classList.toggle("-translate-x-full",!u),t.classList.toggle("translate-x-0",u),t.classList.toggle("invisible",!u),t.classList.toggle("pointer-events-none",!u),t.classList.toggle("visible",u),t.classList.toggle("pointer-events-auto",u)):(t.classList.remove("-translate-x-full","invisible","pointer-events-none"),t.classList.add("translate-x-0","visible","pointer-events-auto")));const n=document.querySelector('[data-action="open-menu"]');n&&n.setAttribute("aria-expanded",String(u))}function Le(e,t){if(e.type==="link"){const a=t===e.module;if(!e.children)return`<a href="${$(e.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${a?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${a?'aria-current="page"':""}>${p(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${l(e.label)}</span></a>`;const s=e.children.some(i=>i.module===t),o=g.has(e.module);return`<div class="mb-1 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${a?"nav-active":s?"bg-[#f4f9f5] text-primary-dark":"text-[#657772]"}"><a href="${$(e.module)}" class="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-l-xl px-3 py-2.5 text-sm font-semibold leading-5 hover:bg-[#f4f7f4] hover:text-ink" ${a?'aria-current="page"':""}>${p(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${l(e.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${e.module}" aria-expanded="${o}" aria-controls="sidebar-subgroup-${e.module}" aria-label="${o?"ปิด":"เปิด"}เมนูย่อยของ${l(e.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${p("chevronDown",16,`transition-transform ${o?"rotate-180":""}`)}</button></div><div id="sidebar-subgroup-${e.module}" class="ml-5 border-l border-[#dbe9df] pl-3" ${o?"":"hidden"}>${e.children.map(i=>{const c=t===i.module;return`<a href="${i.href||$(i.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${c?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${c?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${l(i.label)}</span></a>`}).join("")}</div></div>`}const r=g.has(e.id),n=e.children.some(a=>a.module===t||a.children?.some(s=>s.module===t));return`<div class="mb-1">
    <button type="button" data-action="toggle-sidebar-group" data-group="${e.id}" aria-expanded="${r}" aria-controls="sidebar-group-${e.id}" class="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold leading-5 ${n?"bg-[#f4f9f5] text-primary-dark":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">
      ${p(e.icon,19,"shrink-0")}<span class="min-w-0 flex-1 whitespace-normal break-words">${l(e.label)}</span>${p("chevronDown",16,`shrink-0 transition-transform ${r?"rotate-180":""}`)}
    </button>
    <div id="sidebar-group-${e.id}" class="ml-5 border-l border-[#dbe9df] pl-3" ${r?"":"hidden"}>
      ${e.children.map(a=>{const s=t===a.module,o=a.href||$(a.module);if(!a.children)return`<a href="${o}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${s?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${s?'aria-current="page"':""}><span class="whitespace-normal break-words">${l(a.label)}</span></a>`;const i=g.has(a.module),c=a.children.some(d=>d.module===t);return`<div class="my-0.5 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${s?"nav-active":c?"bg-[#f4f9f5] text-primary-dark":"text-[#687b74]"}"><a href="${o}" class="flex min-h-11 min-w-0 flex-1 items-center rounded-l-xl px-3 py-2.5 text-[13px] font-medium leading-5 hover:bg-[#f4f7f4] hover:text-ink ${s?"font-semibold":""}" ${s?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${l(a.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${a.module}" aria-expanded="${i}" aria-controls="sidebar-subgroup-${a.module}" aria-label="${i?"ปิด":"เปิด"}เมนูย่อยของ${l(a.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${p("chevronDown",16,`transition-transform ${i?"rotate-180":""}`)}</button></div><div id="sidebar-subgroup-${a.module}" class="ml-3 border-l border-[#dbe9df] pl-2" ${i?"":"hidden"}>${a.children.map(d=>{const m=t===d.module;return`<a href="${d.href||$(d.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${m?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${m?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${l(d.label)}</span></a>`}).join("")}</div></div>`}).join("")}
    </div>
  </div>`}function Ee(e,t){const r=window.serviceHubUrls?.logo||he;return`
    <div id="mobile-backdrop" class="${u?"fixed inset-0 z-40 bg-slate-950/35 lg:hidden":"hidden"}" data-action="close-menu"></div>
    <aside id="sidebar" role="complementary" aria-label="แถบเมนูหลัก" class="fixed inset-y-0 left-0 z-50 flex w-[266px] max-w-[calc(100vw-24px)] flex-col border-r border-line bg-white transition-transform duration-200 lg:translate-x-0 lg:visible lg:pointer-events-auto ${u?"translate-x-0 visible pointer-events-auto":"-translate-x-full invisible pointer-events-none"}" ${u?'aria-hidden="false"':'aria-hidden="true"'}>
      <div class="flex h-[72px] items-center gap-3 border-b border-line px-5 sm:px-6">
        <img src="${r}" alt="ตราเทศบาลนครนนทบุรี" class="h-12 w-12 shrink-0 object-contain drop-shadow-sm">
        <div class="min-w-0 flex-1"><div class="text-[15px] font-bold tracking-tight text-ink leading-snug">เทศบาลนครนนทบุรี</div><div class="text-[11px] font-medium tracking-wide text-muted">ฐานข้อมูลฝ่ายบริการ</div></div>
        <button type="button" class="ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-muted lg:hidden" data-action="close-menu" aria-label="ปิดเมนู">${p("close",20)}</button>
      </div>
      <nav aria-label="เมนูหลัก" role="navigation" class="scrollbar-thin flex-1 overflow-y-auto px-4 pb-6 pt-6">
        <a href="#/dashboard" class="mb-2 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${t?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${t?'aria-current="page"':""}>${p("grid",19)}<span>แดชบอร์ดฝ่ายบริการ</span></a>
        ${J.map(n=>Le(n,e)).join("")}
        <a href="#/reports" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="reports"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">${p("chart",18)}รายงาน</a>
        ${y("audit-logs.view")?`<a href="#/audit-logs" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="audit-logs"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">${p("info",18)}ประวัติการแก้ไข</a>`:""}
        ${W()?`<div class="mt-3 border-t border-line pt-3"><a href="#/users" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="users"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="users"?'aria-current="page"':""}>${p("users",19)}<span>จัดการผู้ใช้งาน</span></a></div>`:""}
        <div class="mt-3 border-t border-line pt-3">
          <a href="#/profile" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="profile"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="profile"?'aria-current="page"':""}>
            ${p("users",19)}<span>โปรไฟล์ของฉัน</span>
          </a>
        </div>
      </nav>
    </aside>
  `}function Se(e=[]){const t=window.serviceHubUser||{},r=(t.name||t.username||"U").slice(0,1).toUpperCase(),n=(t.name||t.username||"U").slice(0,2).toUpperCase(),a=(t.roles||[])[0]||"staff";return`
    <header role="banner" class="app-header sticky top-0 z-30 flex h-[72px] w-full max-w-full min-w-0 items-center justify-between border-b border-line bg-white/95 px-3.5 backdrop-blur-sm sm:px-7 lg:px-9">
      <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button type="button" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl p-2 text-ink hover:bg-canvas lg:hidden" data-action="open-menu" aria-label="เปิดเมนู" aria-expanded="${u}" aria-controls="sidebar">${p("menu",22)}</button>
        <nav aria-label="เส้นทางหน้า" role="navigation" class="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap text-xs text-muted sm:text-sm">
          <a class="shrink-0 hover:text-primary" href="#/dashboard">หน้าหลัก</a>
          ${e.map(s=>`${p("chevron",14,"shrink-0 text-[#b7c4bd]")}<span class="min-w-0 truncate ${s.current?"font-semibold text-ink":""}">${s.href?`<a href="${s.href}" class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom hover:text-primary">${l(s.label)}</a>`:`<span class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom">${l(s.label)}</span>`}</span>`).join("")}
        </nav>
      </div>
      <div class="ml-2 flex shrink-0 items-center gap-2 sm:gap-3">
        <span class="hidden rounded-full border border-[#cfe9dd] bg-[#f0faf4] px-3 py-1 text-[11px] font-bold text-primary sm:inline-flex">ข้อมูลจริง</span>
        <div id="user-menu-container" class="relative">
          <button type="button" data-action="toggle-user-menu" id="user-menu-button" aria-haspopup="menu" aria-expanded="${b}" aria-controls="user-menu-dropdown" class="flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f0f8f2] focus:outline-none focus:ring-2 focus:ring-primary/20 ${b?"border-primary bg-[#f0f8f2]":""}" aria-label="เมนูผู้ใช้งาน ${l(t.name||t.username)}">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#177a67] to-[#0e6253] text-xs font-bold text-white shadow-sm">${l(r)}</span>
            <span class="hidden max-w-[130px] truncate sm:inline">${l(t.name||t.username)}</span>
            ${p("chevronDown",14,`shrink-0 text-[#687b74] transition-transform duration-150 ${b?"rotate-180":""}`)}
          </button>
          <div id="user-menu-dropdown" class="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-24px)] rounded-2xl border border-line bg-white p-2 shadow-xl z-50 transition-all ${b?"opacity-100 visible translate-y-0 pointer-events-auto":"opacity-0 invisible -translate-y-1 pointer-events-none"}" role="menu" aria-labelledby="user-menu-button" ${b?"":"hidden"}>
            <div class="rounded-xl bg-[#f8faf8] p-3 border border-[#edf3ee]">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#177a67] to-[#0e6253] text-sm font-bold text-white shadow-sm">
                  ${l(n)}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-ink truncate">${l(t.name||t.username)}</div>
                  <div class="text-[11px] text-muted truncate">@${l(t.username)}</div>
                  <div class="mt-1">
                    <span class="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${ce[a]||"border-gray-200 bg-gray-50 text-gray-700"}">
                      ${l(pe[a]||a)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-1.5 border-t border-line"></div>
            <a href="#/profile" data-action="close-user-menu" role="menuitem" class="flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-ink transition hover:bg-[#f0f8f2] hover:text-primary-dark">
              ${p("users",16,"text-primary")}
              <span>โปรไฟล์ของฉัน</span>
            </a>
            <div class="my-1.5 border-t border-line"></div>
            <form method="POST" action="${l(window.serviceHubUrls?.logout||"/logout")}" class="m-0">
              <input type="hidden" name="_token" value="${l(document.querySelector('meta[name="csrf-token"]')?.content)}">
              <button type="submit" role="menuitem" class="flex w-full min-h-11 items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-700">
                ${p("logout",16,"text-rose-500")}
                <span>ออกจากระบบ</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  `}function h(e,t=null,r=[],n=!1){return`
    ${Ee(t,n)}
    <div class="app-shell min-h-screen w-full max-w-full min-w-0 lg:pl-[266px]">
      ${Se(r)}
      <main id="main-content" role="main" tabindex="-1" class="app-content mx-auto w-full min-w-0 max-w-[1510px] px-3.5 pb-16 pt-5 sm:px-7 sm:pt-7 lg:px-9">
        ${e}
      </main>
      <div id="shell-live-status" role="status" aria-live="polite" class="sr-only"></div>
    </div>
  `}function qe(){window.addEventListener("resize",Q)}function Ie(){const e=window.serviceHubUser||{},t=ue(e.name||e.username||"U"),r=e.roles||[],n=r[0]||"staff",a=T[n]||{label:n,color:"border-gray-200 bg-gray-50 text-gray-700"};return`
    ${K("โปรไฟล์ส่วนบุคคล","ข้อมูลบัญชีของฉัน","จัดการชื่อที่แสดงและเปลี่ยนรหัสผ่านสำหรับเข้าใช้งานระบบ")}
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Card 1: ข้อมูลบัญชีและแก้ไขชื่อ -->
      <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7 flex flex-col justify-between" aria-labelledby="profile-info-heading">
        <div>
          <div class="flex items-center gap-4 pb-6 border-b border-line">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#177a67] to-[#0e6253] text-xl font-bold text-white shadow-md">
              ${l(t)}
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h2 id="profile-info-heading" class="text-lg font-bold text-ink truncate">${l(e.name||e.username)}</h2>
                <span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${a.color}">
                  ${l(a.label)}
                </span>
                <span class="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  ${p("check",12)} ใช้งานอยู่
                </span>
              </div>
              <p class="text-xs text-muted mt-1">ชื่อผู้ใช้: @${l(e.username)}</p>
            </div>
          </div>

          <form id="profile-name-form" class="mt-6 space-y-4" novalidate>
            <div>
              <label for="profile-username" class="mb-1 block text-sm font-semibold text-ink">ชื่อผู้ใช้ (Username)</label>
              <input id="profile-username" type="text" class="field w-full bg-[#f8faf8] text-muted cursor-not-allowed border-dashed" value="${l(e.username)}" readonly disabled>
              <p class="mt-1 text-[11px] text-muted">ชื่อผู้ใช้ถูกกำหนดโดยผู้ดูแลระบบและไม่สามารถเปลี่ยนแปลงได้</p>
            </div>

            <div>
              <label for="profile-name" class="mb-1 block text-sm font-semibold text-ink">ชื่อ-นามสกุลที่แสดง (Display Name) <span class="text-red-500">*</span></label>
              <input id="profile-name" name="name" type="text" required maxlength="255" class="field w-full" value="${l(e.name||"")}" placeholder="กรอกชื่อ-นามสกุลของคุณ">
              <p id="profile-name-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
            </div>

            <div>
              <label class="mb-1 block text-sm font-semibold text-ink">บทบาทหน้าที่ (Roles)</label>
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${r.map(s=>{const o=T[s]||{label:s,color:"border-gray-200 bg-gray-50"};return`<span class="rounded-lg border px-2.5 py-1 text-xs font-medium ${o.color}">${l(o.label)}</span>`}).join("")}
              </div>
            </div>

            <div class="pt-2">
              <button type="submit" id="profile-name-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-50">
                ${p("check",17)}
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
            ${p("lock",20)}
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
              <input id="profile-current-pwd" name="current_password" type="password" required autocomplete="current-password" class="field w-full pr-16" placeholder="กรอกรหัสผ่านปัจจุบัน">
              <button type="button" data-action="toggle-pwd" data-target="profile-current-pwd" class="absolute inset-y-1 right-1 flex items-center px-3 text-xs font-semibold text-primary hover:text-primary-dark">แสดง</button>
            </div>
            <p id="profile-current-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div>
            <div class="mb-1 flex items-center justify-between">
              <label for="profile-new-pwd" class="text-sm font-semibold text-ink">รหัสผ่านใหม่ <span class="text-red-500">*</span></label>
              <button type="button" id="profile-gen-pwd" class="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                ${p("sparkles",13)} สุ่มรหัสผ่านปลอดภัย
              </button>
            </div>
            <div class="relative">
              <input id="profile-new-pwd" name="password" type="password" required minlength="15" autocomplete="new-password" class="field w-full pr-16" placeholder="รหัสผ่านใหม่ไม่น้อยกว่า 15 ตัวอักษร">
              <button type="button" data-action="toggle-pwd" data-target="profile-new-pwd" class="absolute inset-y-1 right-1 flex items-center px-3 text-xs font-semibold text-primary hover:text-primary-dark">แสดง</button>
            </div>
            <p id="profile-new-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div>
            <label for="profile-confirm-pwd" class="mb-1 block text-sm font-semibold text-ink">ยืนยันรหัสผ่านใหม่ <span class="text-red-500">*</span></label>
            <div class="relative">
              <input id="profile-confirm-pwd" name="password_confirmation" type="password" required minlength="15" autocomplete="new-password" class="field w-full pr-16" placeholder="กรอกรหัสผ่านใหม่อีกครั้ง">
              <button type="button" data-action="toggle-pwd" data-target="profile-confirm-pwd" class="absolute inset-y-1 right-1 flex items-center px-3 text-xs font-semibold text-primary hover:text-primary-dark">แสดง</button>
            </div>
            <p id="profile-confirm-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div class="rounded-xl bg-[#f4f8f5] p-3 text-xs text-[#486358] leading-relaxed">
            <span class="font-bold text-primary-dark">ข้อกำหนดความปลอดภัย:</span> เมื่อเปลี่ยนรหัสผ่านเรียบร้อย ระบบจะตัดเซสชันในอุปกรณ์อื่นทั้งหมดทันที แต่เครื่องนี้จะยังคงใช้งานต่อได้ตามปกติ
          </div>

          <div class="pt-2">
            <button type="submit" id="profile-pwd-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-50">
              ${p("lock",17)}
              <span>บันทึกรหัสผ่านใหม่</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  `}function Ue({toastFn:e=I,onNameUpdated:t}={}){const r=document.getElementById("profile-name-form"),n=document.getElementById("profile-password-form");document.querySelectorAll('[data-action="toggle-pwd"]').forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.target,o=document.getElementById(s);if(!o)return;const i=o.type==="password";o.type=i?"text":"password",a.textContent=i?"ซ่อน":"แสดง"})}),document.getElementById("profile-gen-pwd")?.addEventListener("click",()=>{const a="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",s=new Uint8Array(16);crypto.getRandomValues(s);const o=Array.from(s).map(d=>a[d%a.length]).join(""),i=document.getElementById("profile-new-pwd"),c=document.getElementById("profile-confirm-pwd");if(i){i.value=o,i.type="text";const d=document.querySelector('[data-target="profile-new-pwd"]');d&&(d.textContent="ซ่อน")}if(c){c.value=o,c.type="text";const d=document.querySelector('[data-target="profile-confirm-pwd"]');d&&(d.textContent="ซ่อน")}}),r?.addEventListener("submit",async a=>{a.preventDefault();const s=document.getElementById("profile-name"),o=document.getElementById("profile-name-error"),i=document.getElementById("profile-name-submit"),c=s.value.trim();if(!c){o&&(o.textContent="กรุณาระบุชื่อ-นามสกุล",o.classList.remove("hidden")),s.focus();return}o&&o.classList.add("hidden"),i&&(i.disabled=!0,i.classList.add("opacity-50"));try{const d=window.serviceHubUrls?.apiProfile||"/api/profile",m=await q(d,{method:"PUT",body:{name:c}});window.serviceHubUser&&(window.serviceHubUser.name=m.data?.name||c),e("บันทึกข้อมูลชื่อเรียบร้อยแล้ว"),typeof t=="function"&&t(c)}catch(d){const m=d.errors?.name?.[0]||d.message||"ไม่สามารถบันทึกชื่อได้";o&&(o.textContent=m,o.classList.remove("hidden")),e(m,"error")}finally{i&&(i.disabled=!1,i.classList.remove("opacity-50"))}}),n?.addEventListener("submit",async a=>{a.preventDefault();const s=document.getElementById("profile-current-pwd"),o=document.getElementById("profile-new-pwd"),i=document.getElementById("profile-confirm-pwd"),c=document.getElementById("profile-current-pwd-error"),d=document.getElementById("profile-new-pwd-error"),m=document.getElementById("profile-confirm-pwd-error"),L=document.getElementById("profile-pwd-submit");c.classList.add("hidden"),d.classList.add("hidden"),m.classList.add("hidden");let E=!1;if(s.value||(c.textContent="กรุณาระบุรหัสผ่านปัจจุบัน",c.classList.remove("hidden"),E=!0),(!o.value||o.value.length<15)&&(d.textContent="รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 15 ตัวอักษร",d.classList.remove("hidden"),E=!0),o.value!==i.value&&(m.textContent="รหัสผ่านยืนยันไม่ตรงกับรหัสผ่านใหม่",m.classList.remove("hidden"),E=!0),o.value&&s.value&&o.value===s.value&&(d.textContent="รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านปัจจุบัน",d.classList.remove("hidden"),E=!0),!E){L&&(L.disabled=!0,L.classList.add("opacity-50"));try{const x=window.serviceHubUrls?.apiProfilePassword||"/api/profile/password";await q(x,{method:"PUT",body:{current_password:s.value,password:o.value,password_confirmation:i.value}}),s.value="",o.value="",i.value="",e("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว เซสชันในอุปกรณ์อื่นถูกยกเลิกแล้ว")}catch(x){x.errors?.current_password&&(c.textContent=x.errors.current_password[0],c.classList.remove("hidden")),x.errors?.password&&(d.textContent=x.errors.password[0],d.classList.remove("hidden")),!x.errors?.current_password&&!x.errors?.password&&e(x.message||"เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน","error")}finally{L&&(L.disabled=!1,L.classList.remove("opacity-50"))}}})}function _e(e){return setTimeout(()=>{Ue()},0),Ie()}let B=[],D={current_page:1,last_page:1};function Be({params:e,auditRows:t=B,auditMeta:r=D}){if(!y("audit-logs.view"))return`
      <div class="panel-shadow mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-white p-10 text-center">
        <h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึง</h1>
        <p class="mt-2 text-sm text-muted">คุณไม่มีสิทธิ์ในการดูประวัติการแก้ไขข้อมูลของระบบ</p>
      </div>
    `;const n=a=>{const s=e.get("q")||"";return`#/audit-logs?${new URLSearchParams({q:s,page:String(a)})}`};return`
    ${K("การจัดการระบบ","ประวัติการแก้ไข","บันทึกการเพิ่ม แก้ไข และลบข้อมูลการปฏิบัติงานในระบบ")}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5">
      <form id="audit-filter" class="flex gap-2">
        <label class="sr-only" for="audit-q">ค้นหา</label>
        <input id="audit-q" class="field min-w-0 flex-1" name="q" value="${l(e.get("q")||"")}" placeholder="ค้นหาการกระทำ หมวด หรือชื่อผู้ใช้">
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
      </form>
      <div class="mt-4 divide-y divide-line">
        ${t.length?t.map(a=>`
          <div class="grid gap-2 py-3.5 text-sm sm:grid-cols-4 items-center">
            <strong class="font-bold text-primary-dark">${l(a.action)}</strong>
            <span class="text-muted font-mono text-xs">${l(a.subject_type||"")} #${l(a.subject_id||"")}</span>
            <span class="text-ink font-medium">${l(a.actor_username||"ระบบ")}</span>
            <time class="text-xs text-muted" datetime="${l(a.created_at)}">${Y(a.created_at)}</time>
          </div>
        `).join(""):'<p class="py-8 text-center text-sm text-muted">ไม่มีประวัติการแก้ไขที่ตรงกับเงื่อนไข</p>'}
      </div>
      ${r.last_page>1?`
      <div class="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>หน้า ${r.current_page} / ${r.last_page}</span>
        <div class="flex gap-2">
          ${r.current_page>1?N("ก่อนหน้า",n(r.current_page-1)):""}
          ${r.current_page<r.last_page?N("ถัดไป",n(r.current_page+1)):""}
        </div>
      </div>`:""}
    </section>
  `}async function De(e=new URLSearchParams){if(!y("audit-logs.view"))return{data:[],meta:{current_page:1,last_page:1}};try{const t=window.serviceHubUrls?.apiAudit||"/api/audit-logs",r=await q(`${t}?${e.toString()}`);return B=r.data??[],D=r.meta??{current_page:1,last_page:1},{data:B,meta:D}}catch(t){throw t}}async function Re(e){try{await De(e.params)}catch(t){console.error("Error fetching audit logs:",t)}return Be({params:e.params,auditRows:B,auditMeta:D})}const w=document.querySelector("#app");let X=null,C=!1,j="",U=0,ee={},te=null,re=null,H=!1,P="",_=0;async function ae(){const e=++U,{params:t}=z();C=!0,j="",V();try{const r=new URLSearchParams;t.has("from")&&r.set("from",t.get("from")),t.has("to")&&r.set("to",t.get("to"));const n=(window.serviceHubUrls?.apiDashboard||"/api/dashboard")+(r.size?`?${r}`:""),a=await q(n);if(e!==U)return;X=a.data}catch(r){if(e!==U)return;j=r.message||"ไม่สามารถโหลดภาพรวมได้"}finally{e===U&&(C=!1,V())}}function V(){const{params:e}=z(),t=be({data:X,loading:C,error:j,params:e,groups:F,modules:S,icon:p,esc:l,number:Z,moduleHref:$});w.innerHTML=h(t,null,[{label:"แดชบอร์ดฝ่ายบริการ",current:!0}],!0),k()}async function ne(e,t){const r=e[1]?S.find(a=>a.id===e[1]):null,n=++_;H=!0,P="",G(e,t);try{const a=window.serviceHubUrls?.apiReportDetail||"/api/reports/__MODULE__",s=window.serviceHubUrls?.apiReports||"/api/reports",o=(r?a.replace("__MODULE__",encodeURIComponent(r.id)):s)+(t.size?`?${t}`:""),i=await q(o);if(n!==_)return;re=i.meta,r?te=i.data:ee=i.data}catch(a){if(n!==_)return;P=a.fields?.to?.[0]||a.fields?.from?.[0]||a.fields?.month?.[0]||a.message||"โหลดรายงานไม่สำเร็จ"}finally{n===_&&(H=!1,G(e,t))}}function G(e,t){const r=e[1]?S.find(s=>s.id===e[1]):null,n=xe({module:r,params:t,data:r?te:ee,meta:re,loading:H,error:P,modules:S,groups:F,can:y,esc:l,number:Z,thaiDate:Y,moduleHref:$}),a=r?[{label:"รายงาน",href:"#/reports"},{label:r.short,current:!0}]:[{label:"รายงาน",current:!0}];w.innerHTML=h(n,"reports",a),k()}const Ae={dashboard:async()=>{v("dashboard"),await ae()},users:async e=>{if(!W()){f("#/dashboard"),I("คุณไม่มีสิทธิ์เข้าถึงหน้านี้","error");return}v("users"),w.innerHTML=h(fe(),"users",[{label:"จัดการผู้ใช้งาน",current:!0}]),k()},module:async e=>{const t=e.parts[1];if(t&&!y(`${t}.view`)){f("#/dashboard"),I("คุณไม่มีสิทธิ์เข้าถึงหมวดงานบริการนี้","error");return}v(t);const r=S.find(a=>a.id===t),n=r?[{label:r.short,current:!0}]:[];w.innerHTML=h(await de(e),t,n),k()},"cleaning-zones":async e=>{if(!y("cleaning-zones.view")){f("#/dashboard");return}v("cleaning-zones"),w.innerHTML=h(await O("cleaning-zones",e),"cleaning-zones",[{label:"เขตรักษาความสะอาด",current:!0}]),k()},"waste-types":async e=>{if(!y("waste-types.view")){f("#/dashboard");return}v("waste-types"),w.innerHTML=h(await O("waste-types",e),"waste-types",[{label:"ประเภทขยะมูลฝอย",current:!0}]),k()},profile:async e=>{v("profile"),w.innerHTML=h(_e(),"profile",[{label:"โปรไฟล์ของฉัน",current:!0}])},"audit-logs":async e=>{if(!y("audit-logs.view")){f("#/dashboard");return}v("audit-logs"),w.innerHTML=h(await Re(e),"audit-logs",[{label:"ประวัติการแก้ไข",current:!0}])},reports:async e=>{v("reports"),await ne(e.parts,e.params)},"*":()=>{f("#/dashboard")}};function Ce(){document.addEventListener("keydown",e=>{if(e.key==="Escape"&&(A(),R(!1)),e.key==="Tab"&&window.innerWidth<1024){const t=document.getElementById("sidebar");if(t&&t.classList.contains("translate-x-0")){const r=[...t.querySelectorAll("a[href], button:not([disabled])")].filter(n=>!n.closest("[hidden]"));r.length&&(e.shiftKey&&document.activeElement===r[0]?(e.preventDefault(),r[r.length-1]?.focus()):!e.shiftKey&&document.activeElement===r[r.length-1]&&(e.preventDefault(),r[0]?.focus()))}}}),document.addEventListener("click",async e=>{const t=e.target.closest("[data-action]");if(e.target.closest("#user-menu-container")||A(),e.target.closest(".relative")||document.querySelectorAll(".custom-select-menu").forEach(n=>n.classList.add("hidden")),!t)return;const r=t.dataset.action;if(r==="open-menu"){R(!0),document.querySelector('#sidebar [data-action="close-menu"]')?.focus();return}if(r==="close-menu"){R(!1),document.querySelector('[data-action="open-menu"]')?.focus();return}if(r==="toggle-user-menu"){$e();return}if(r==="close-user-menu"){A();return}if(r==="toggle-sidebar-group"||r==="toggle-sidebar-subgroup"){ke(t.dataset.group),t.setAttribute("aria-expanded",String(t.getAttribute("aria-expanded")!=="true"));const n=document.getElementById(t.getAttribute("aria-controls"));n&&(n.hidden=!n.hidden),t.querySelector("svg:last-child")?.classList.toggle("rotate-180");return}if(r==="delete-activity"){const n=t.dataset.module,a=t.dataset.id;await oe(n,a,{navigate:f,showToast:I,refreshData:le});return}if(r==="delete-reference"){const n=t.dataset.type,a=t.dataset.id,s=t.dataset.name,o=Number(t.dataset.usage)||0;await ge(n,a,s,o,{navigate:f,showToast:I,refreshData:ve});return}if(r==="print-report"){window.print();return}if(r==="retry-dashboard"){ae();return}if(r==="retry-report"){const{parts:n,params:a}=z();ne(n,a);return}if(r==="toggle-mobile-filters"){const n=t.getAttribute("aria-expanded")==="true",a=document.getElementById(t.getAttribute("aria-controls"));t.setAttribute("aria-expanded",String(!n)),t.querySelector("svg")?.classList.toggle("rotate-180",!n),a?.classList.toggle("hidden",n),a?.classList.toggle("flex",!n);return}}),document.addEventListener("submit",e=>{if(e.target.id==="record-form"){e.preventDefault(),ie(e.target);return}if(e.target.id==="zone-form"){e.preventDefault(),M(e.target,"cleaning-zones");return}if(e.target.id==="wasteType-form"){e.preventDefault(),M(e.target,"waste-types");return}if(e.target.id==="dashboard-filter"){e.preventDefault();const t=e.target,r=t.elements.from.value,n=t.elements.to.value,a=t.parentElement.querySelector("#dashboard-filter-error");if(!r||!n||r>n){a&&(a.textContent=!r||!n?"กรุณาระบุวันที่เริ่มต้นและสิ้นสุด":"วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น",a.classList.remove("hidden"));return}a&&a.classList.add("hidden"),f(`/dashboard?${new URLSearchParams({from:r,to:n})}`);return}if(e.target.id==="report-filter"){e.preventDefault();const t=e.target,r=t.elements.period_mode?.value,n=new URLSearchParams;if(r==="month"){if(!t.elements.month?.value)return;n.set("month",t.elements.month.value)}else{const s=t.elements.from?.value,o=t.elements.to?.value,i=t.querySelector("#report-filter-error");if(!s||!o||s>o){i&&(i.textContent=!s||!o?"กรุณาระบุวันที่เริ่มต้นและสิ้นสุด":"วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น");return}i&&(i.textContent=""),n.set("from",s),n.set("to",o)}const a=`#/reports${t.dataset.reportModule?`/${t.dataset.reportModule}`:""}?${n}`;f(a.replace("#",""));return}if(e.target.id==="filter-form"){e.preventDefault();const t=e.target,r=new URLSearchParams;new FormData(t).forEach((n,a)=>{n&&!(a==="sort"&&n==="newest")&&r.set(a,n)}),f(`/module/${t.dataset.module}${r.size?`?${r}`:""}`);return}if(e.target.id==="zone-filter"){e.preventDefault();const t=new FormData(e.target),r=new URLSearchParams;String(t.get("q")||"").trim()&&r.set("q",String(t.get("q")).trim()),t.get("sort")==="name"&&r.set("sort","name"),f(`/cleaning-zones${r.size?`?${r}`:""}`);return}if(e.target.id==="wasteType-filter"){e.preventDefault();const t=new FormData(e.target),r=new URLSearchParams;String(t.get("q")||"").trim()&&r.set("q",String(t.get("q")).trim()),t.get("sort")==="name"&&r.set("sort","name"),f(`/waste-types${r.size?`?${r}`:""}`);return}}),document.addEventListener("change",e=>{if(e.target.name==="period_mode"&&e.target.closest("#report-filter")){const t=e.target.form,r=e.target.value==="custom",n=t.querySelector("[data-report-month]"),a=t.querySelector("[data-report-custom]");n&&(n.hidden=r),a&&(a.hidden=!r),t.elements.month&&(t.elements.month.disabled=r),t.elements.from&&(t.elements.from.disabled=!r),t.elements.to&&(t.elements.to.disabled=!r)}})}function je(){me(),qe(),Ce(),se(Ae,{afterRender:()=>{k()}})}je();
