import{e as z,s as I,h as $,d as C,a as _,g as L,p as u,o as y,i as k,f as w}from"./view-users-iAQT2Vs4.js";import{e as r,n as b}from"./view-analytics-BMG2sQy1.js";import{r as P,n as S,g}from"./view-activities-BqebqQrh.js";let v=[],h=[],j=!1;async function R(){const[e,s]=await Promise.all([_("cleaning-zones.view")?L($("cleaning-zones")):Promise.resolve([]),_("waste-types.view")?L($("waste-types")):Promise.resolve([])]);v=e||[],h=s||[],j=!0}function U(e,s=g()){return s.filter(a=>a.module==="road-washings"&&a.cleaning_zone===e).length}function M(e,s=g()){return s.filter(a=>a.module==="waste-collections"&&a.waste_type===e).length}function D({params:e,zones:s=v,records:a=g()}){const c=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),d=e.get("sort")==="name"?"name":"code",t=e.get("status")||"all",n=10,l=s.filter(i=>!c||(i.code+" "+i.name).toLocaleLowerCase("th-TH").includes(c)).filter(i=>t==="all"?!0:t==="active"?i.is_active:!i.is_active).sort((i,m)=>String(i[d]).localeCompare(String(m[d]),"th",{numeric:!0})),p=Math.max(1,Math.ceil(l.length/n)),o=Math.min(p,Math.max(1,Number.parseInt(e.get("page"),10)||1)),f=l.slice((o-1)*n,o*n),x=i=>{const m=new URLSearchParams;return e.get("q")&&m.set("q",e.get("q")),t!=="all"&&m.set("status",t),d!=="code"&&m.set("sort",d),i>1&&m.set("page",String(i)),"#/cleaning-zones"+(m.size?"?"+m:"")};return`
    ${u("ข้อมูลพื้นฐาน","เขตรักษาความสะอาด","จัดการรหัสและชื่อเขตสำหรับรายการล้างทำความสะอาดถนน",w("เพิ่มเขต","#/cleaning-zones/new"))}
    <section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6">
      <form id="zone-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_160px_160px_auto_auto] sm:items-end">
        <div>
          <label for="zone-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label>
          <input id="zone-search" name="q" type="search" class="field" placeholder="พิมพ์ค้นหาทันที..." value="${r(e.get("q")||"")}" data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="zone-status" class="mb-1.5 block text-sm font-semibold">สถานะ</label>
          <select id="zone-status" name="status" class="field master-native-select" data-action="live-filter">
            <option value="all" ${t==="all"?"selected":""}>ทุกสถานะ</option>
            <option value="active" ${t==="active"?"selected":""}>ใช้งานอยู่</option>
            <option value="inactive" ${t==="inactive"?"selected":""}>ระงับแล้ว</option>
          </select>
        </div>
        <div>
          <label for="zone-sort" class="mb-1.5 block text-sm font-semibold">เรียงตาม</label>
          <select id="zone-sort" name="sort" class="field master-native-select" data-action="live-filter">
            <option value="code" ${d==="code"?"selected":""}>รหัสเขต</option>
            <option value="name" ${d==="name"?"selected":""}>ชื่อเขต</option>
          </select>
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        <a href="#/cleaning-zones" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>
      </form>
    </section>

    <section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-4 py-4 sm:px-6">
        <h2 class="text-sm font-bold">รายการเขต</h2>
        <p class="mt-1 text-xs text-muted">พบ ${b(l.length)} รายการ</p>
      </div>
      ${f.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${f.map(i=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/cleaning-zones/${encodeURIComponent(i.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${r(i.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${r(i.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานล้างถนน ${b(U(i.name,a))} รายการ</span>
            ${k("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบเขตรักษาความสะอาด</h3>
        <p class="mt-2 text-sm text-muted">${c?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มเขต"}</p>
        <div class="mt-5">${c?y("แสดงทั้งหมด","#/cleaning-zones"):w("เพิ่มเขต","#/cleaning-zones/new")}</div>
      </div>`}
      ${l.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${b((o-1)*n+1)}–${b(Math.min(o*n,l.length))} จาก ${b(l.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${o===1?"pointer-events-none opacity-45":""}" href="${x(o-1)}" ${o===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${o} / ${p}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${o===p?"pointer-events-none opacity-45":""}" href="${x(o+1)}" ${o===p?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function H({zone:e,records:s=g()}){const a=U(e.name,s);return`
    ${u("ข้อมูลพื้นฐาน",e.name,"รายละเอียดเขตรักษาความสะอาด",`
      <div class="flex flex-wrap gap-2">
        ${y("แก้ไข",`#/cleaning-zones/${encodeURIComponent(e.id)}/edit`,"edit")}
        <button type="button" class="min-h-11 rounded-xl border border-[#eed8d5] px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-reference" data-type="cleaning-zones" data-id="${r(e.id)}" data-name="${r(e.name)}" data-usage="${a}">
          ${k("trash",17)} ลบเขต
        </button>
      </div>
    `)}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7">
      <h2 class="text-base font-bold">ข้อมูลเขต</h2>
      <dl class="mt-4 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <dt class="text-xs font-semibold text-muted">รหัสเขต</dt>
          <dd class="mt-1 break-words font-bold">${r(e.code)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-muted">ชื่อเขต</dt>
          <dd class="mt-1 break-words font-bold">${r(e.name)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-muted">รายการล้างถนนที่ใช้เขตนี้</dt>
          <dd class="mt-1 font-bold">${b(a)} รายการ</dd>
        </div>
      </dl>
      ${a?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">เขตนี้ถูกใช้ในรายการล้างถนน ต้องเปลี่ยนเขตในรายการเหล่านั้นก่อนจึงจะลบได้</p>':""}
    </section>
  `}function T(e=null,s={},a=e||{}){const d=!!e?"แก้ไขเขตรักษาความสะอาด":"เพิ่มเขตรักษาความสะอาด",t=(n,l,p)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="zone-${n}">
        ${r(l)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="zone-${n}" name="${n}" type="text" maxlength="${p}" required value="${r(a[n]||"")}" aria-describedby="zone-${n}-error" ${s[n]?'aria-invalid="true"':""}>
      <p id="zone-${n}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${r(s[n]||"")}</p>
    </div>
  `;return`
    ${u("ข้อมูลพื้นฐาน",d,"กรอกรหัสและชื่อเขตเพื่อใช้ในฟอร์มล้างทำความสะอาดถนน")}
    <section class="panel-shadow max-w-2xl rounded-2xl border border-line bg-white p-5 sm:p-7">
      <form id="zone-form" data-id="${r(e?.id||"")}" novalidate>
        <div class="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
          ${t("code","รหัสเขต",50)}
          ${t("name","ชื่อเขต",255)}
        </div>
        <div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <a class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold" href="${e?`#/cleaning-zones/${encodeURIComponent(e.id)}`:"#/cleaning-zones"}">
            ยกเลิก
          </a>
          <button type="submit" class="min-h-11 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </section>
  `}function E({params:e,wasteTypes:s=h,records:a=g()}){const c=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),d=e.get("sort")==="name"?"name":"code",t=e.get("status")||"all",n=10,l=s.filter(i=>!c||(i.code+" "+i.name).toLocaleLowerCase("th-TH").includes(c)).filter(i=>t==="all"?!0:t==="active"?i.is_active:!i.is_active).sort((i,m)=>String(i[d]).localeCompare(String(m[d]),"th",{numeric:!0})),p=Math.max(1,Math.ceil(l.length/n)),o=Math.min(p,Math.max(1,Number.parseInt(e.get("page"),10)||1)),f=l.slice((o-1)*n,o*n),x=i=>{const m=new URLSearchParams;return e.get("q")&&m.set("q",e.get("q")),t!=="all"&&m.set("status",t),d!=="code"&&m.set("sort",d),i>1&&m.set("page",String(i)),"#/waste-types"+(m.size?"?"+m:"")};return`
    ${u("ข้อมูลพื้นฐาน","ประเภทขยะมูลฝอย","จัดการรหัสและชื่อประเภทสำหรับรายการมูลฝอย",w("เพิ่มประเภท","#/waste-types/new"))}
    <section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6">
      <form id="wasteType-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_160px_160px_auto_auto] sm:items-end">
        <div>
          <label for="wasteType-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label>
          <input id="wasteType-search" name="q" type="search" class="field" placeholder="พิมพ์ค้นหาทันที..." value="${r(e.get("q")||"")}" data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="wasteType-status" class="mb-1.5 block text-sm font-semibold">สถานะ</label>
          <select id="wasteType-status" name="status" class="field master-native-select" data-action="live-filter">
            <option value="all" ${t==="all"?"selected":""}>ทุกสถานะ</option>
            <option value="active" ${t==="active"?"selected":""}>ใช้งานอยู่</option>
            <option value="inactive" ${t==="inactive"?"selected":""}>ระงับแล้ว</option>
          </select>
        </div>
        <div>
          <label for="wasteType-sort" class="mb-1.5 block text-sm font-semibold">เรียงตาม</label>
          <select id="wasteType-sort" name="sort" class="field master-native-select" data-action="live-filter">
            <option value="code" ${d==="code"?"selected":""}>รหัสประเภท</option>
            <option value="name" ${d==="name"?"selected":""}>ชื่อประเภท</option>
          </select>
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        <a href="#/waste-types" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>
      </form>
    </section>

    <section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-4 py-4 sm:px-6">
        <h2 class="text-sm font-bold">รายการประเภท</h2>
        <p class="mt-1 text-xs text-muted">พบ ${b(l.length)} รายการ</p>
      </div>
      ${f.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${f.map(i=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/waste-types/${encodeURIComponent(i.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${r(i.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${r(i.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานบริหารจัดการมูลฝอย ${b(M(i.name,a))} รายการ</span>
            ${k("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบประเภทขยะมูลฝอย</h3>
        <p class="mt-2 text-sm text-muted">${c?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มประเภท"}</p>
        <div class="mt-5">${c?y("แสดงทั้งหมด","#/waste-types"):w("เพิ่มประเภท","#/waste-types/new")}</div>
      </div>`}
      ${l.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${b((o-1)*n+1)}–${b(Math.min(o*n,l.length))} จาก ${b(l.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${o===1?"pointer-events-none opacity-45":""}" href="${x(o-1)}" ${o===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${o} / ${p}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${o===p?"pointer-events-none opacity-45":""}" href="${x(o+1)}" ${o===p?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function A({wasteType:e,records:s=g()}){const a=M(e.name,s);return`
    ${u("ข้อมูลพื้นฐาน",e.name,"รายละเอียดประเภทขยะมูลฝอย",`
      <div class="flex flex-wrap gap-2">
        ${y("แก้ไข",`#/waste-types/${encodeURIComponent(e.id)}/edit`,"edit")}
        <button type="button" class="min-h-11 rounded-xl border border-[#eed8d5] px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-reference" data-type="waste-types" data-id="${r(e.id)}" data-name="${r(e.name)}" data-usage="${a}">
          ${k("trash",17)} ลบประเภท
        </button>
      </div>
    `)}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7">
      <h2 class="text-base font-bold">ข้อมูลประเภท</h2>
      <dl class="mt-4 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <dt class="text-xs font-semibold text-muted">รหัสประเภท</dt>
          <dd class="mt-1 break-words font-bold">${r(e.code)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-muted">ชื่อประเภท</dt>
          <dd class="mt-1 break-words font-bold">${r(e.name)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-muted">รายการมูลฝอยที่ใช้ประเภทนี้</dt>
          <dd class="mt-1 font-bold">${b(a)} รายการ</dd>
        </div>
      </dl>
      ${a?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">ประเภทนี้ถูกใช้ในรายการมูลฝอย ต้องเปลี่ยนประเภทในรายการเหล่านั้นก่อนจึงจะลบได้</p>':""}
    </section>
  `}function q(e=null,s={},a=e||{}){const d=!!e?"แก้ไขประเภทขยะมูลฝอย":"เพิ่มประเภทขยะมูลฝอย",t=(n,l,p)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="wasteType-${n}">
        ${r(l)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="wasteType-${n}" name="${n}" type="text" maxlength="${p}" required value="${r(a[n]||"")}" aria-describedby="wasteType-${n}-error" ${s[n]?'aria-invalid="true"':""}>
      <p id="wasteType-${n}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${r(s[n]||"")}</p>
    </div>
  `;return`
    ${u("ข้อมูลพื้นฐาน",d,"กรอกรหัสและชื่อประเภทเพื่อใช้ในฟอร์มงานบริหารจัดการมูลฝอย")}
    <section class="panel-shadow max-w-2xl rounded-2xl border border-line bg-white p-5 sm:p-7">
      <form id="wasteType-form" data-id="${r(e?.id||"")}" novalidate>
        <div class="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
          ${t("code","รหัสประเภท",50)}
          ${t("name","ชื่อประเภท",255)}
        </div>
        <div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <a class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold" href="${e?`#/waste-types/${encodeURIComponent(e.id)}`:"#/waste-types"}">
            ยกเลิก
          </a>
          <button type="submit" class="min-h-11 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">
            บันทึกข้อมูล
          </button>
        </div>
      </form>
    </section>
  `}async function F(e,s,a,c,{navigate:d=S,showToast:t=z,refreshData:n=R}={}){if(c>0){t(`ไม่สามารถลบ "${a}" ได้เนื่องจากมีข้อมูลงานบริการที่อ้างอิงอยู่`,"error");return}const l=e==="cleaning-zones"?"เขต":"ประเภทขยะ";if(await I({title:`ยืนยันการลบ${l}`,message:`คุณต้องการลบ "${a}" ออกจากระบบใช่หรือไม่?`,confirmText:`ลบ${l}`,variant:"danger",iconName:"trash"}))try{const o=`${$(e)}/${s}`;await C(o,{method:"DELETE"}),t(`ลบ${l}เรียบร้อยแล้ว`),await n(),await P(),d(`/${e}`)}catch(o){t(o.message||`ไม่สามารถลบ${l}ได้`,"error")}}async function V(e,s){const a=e.dataset.id,c=Object.fromEntries(new FormData(e));c.is_active=e.elements.namedItem("is_active")?.checked??!0;try{const d=`${$(s)}${a?`/${a}`:""}`,t=await C(d,{method:a?"PUT":"POST",body:c});await R(),await P(),S(`/${s}/${t.data.id}`),z("บันทึกข้อมูลแล้ว")}catch(d){z(d.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล","error");const t=d.fieldErrors||Object.fromEntries(Object.entries(d.fields||{}).map(([f,x])=>[f,Array.isArray(x)?x[0]:x])),l=(s==="cleaning-zones"?v:h).find(f=>String(f.id)===a)||null,p=s==="cleaning-zones"?T(l,t,c):q(l,t,c),o=document.querySelector("#main-content");o&&(o.innerHTML=p)}}async function Z(e,s){j||await R();const a=e==="cleaning-zones",c=a?v:h;if(s.parts.length===1)return a?D({params:s.params,zones:v}):E({params:s.params,wasteTypes:h});if(s.parts.length===2&&s.parts[1]==="new")return a?T():q();const d=decodeURIComponent(s.parts[1]||""),t=c.find(n=>String(n.id)===d);return t?s.parts.length===3&&s.parts[2]==="edit"?a?T(t):q(t):a?H({zone:t}):A({wasteType:t}):'<div class="p-8 text-center text-muted">ไม่พบข้อมูลอ้างอิงที่ต้องการ</div>'}export{F as deleteReference,R as refreshReferenceData,Z as renderReferencesView,V as submitReference,A as wasteTypeDetailPage,q as wasteTypeFormPage,E as wasteTypeListPage,M as wasteTypeUsage,H as zoneDetailPage,T as zoneFormPage,D as zoneListPage,U as zoneUsage};
