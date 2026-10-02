import{e as k,s as I,g as $,d as C,a as R,f as L,p as x,h as r,j as v,n as b,i as w,o as y}from"./view-users-CwadCYNt.js";import{r as P,n as S,g}from"./view-activities-krC1dhD7.js";let u=[],h=[],U=!1;async function T(){const[e,s]=await Promise.all([R("cleaning-zones.view")?L($("cleaning-zones")):Promise.resolve([]),R("waste-types.view")?L($("waste-types")):Promise.resolve([])]);u=e||[],h=s||[],U=!0}function j(e,s=g()){return s.filter(n=>n.module==="road-washings"&&n.cleaning_zone===e).length}function M(e,s=g()){return s.filter(n=>n.module==="waste-collections"&&n.waste_type===e).length}function D({params:e,zones:s=u,records:n=g()}){const c=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),d=e.get("sort")==="name"?"name":"code",a=10,t=s.filter(i=>!c||(i.code+" "+i.name).toLocaleLowerCase("th-TH").includes(c)).sort((i,m)=>String(i[d]).localeCompare(String(m[d]),"th",{numeric:!0})),l=Math.max(1,Math.ceil(t.length/a)),o=Math.min(l,Math.max(1,Number.parseInt(e.get("page"),10)||1)),p=t.slice((o-1)*a,o*a),f=i=>{const m=new URLSearchParams;return e.get("q")&&m.set("q",e.get("q")),d!=="code"&&m.set("sort",d),i>1&&m.set("page",String(i)),"#/cleaning-zones"+(m.size?"?"+m:"")};return`
    ${x("ข้อมูลพื้นฐาน","เขตรักษาความสะอาด","จัดการรหัสและชื่อเขตสำหรับรายการล้างทำความสะอาดถนน",v("เพิ่มเขต","#/cleaning-zones/new"))}
    <section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6">
      <form id="zone-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_180px_auto] sm:items-end">
        <div>
          <label for="zone-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label>
          <input id="zone-search" name="q" type="search" class="field" placeholder="รหัสหรือชื่อเขต" value="${r(e.get("q")||"")}">
        </div>
        <div>
          <label for="zone-sort" class="mb-1.5 block text-sm font-semibold">เรียงตาม</label>
          <select id="zone-sort" name="sort" class="field master-native-select">
            <option value="code" ${d==="code"?"selected":""}>รหัสเขต</option>
            <option value="name" ${d==="name"?"selected":""}>ชื่อเขต</option>
          </select>
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
      </form>
    </section>

    <section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-4 py-4 sm:px-6">
        <h2 class="text-sm font-bold">รายการเขต</h2>
        <p class="mt-1 text-xs text-muted">พบ ${b(t.length)} รายการ</p>
      </div>
      ${p.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${p.map(i=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/cleaning-zones/${encodeURIComponent(i.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${r(i.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${r(i.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานล้างถนน ${b(j(i.name,n))} รายการ</span>
            ${w("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบเขตรักษาความสะอาด</h3>
        <p class="mt-2 text-sm text-muted">${c?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มเขต"}</p>
        <div class="mt-5">${c?y("แสดงทั้งหมด","#/cleaning-zones"):v("เพิ่มเขต","#/cleaning-zones/new")}</div>
      </div>`}
      ${t.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${b((o-1)*a+1)}–${b(Math.min(o*a,t.length))} จาก ${b(t.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${o===1?"pointer-events-none opacity-45":""}" href="${f(o-1)}" ${o===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${o} / ${l}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${o===l?"pointer-events-none opacity-45":""}" href="${f(o+1)}" ${o===l?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function H({zone:e,records:s=g()}){const n=j(e.name,s);return`
    ${x("ข้อมูลพื้นฐาน",e.name,"รายละเอียดเขตรักษาความสะอาด",`
      <div class="flex flex-wrap gap-2">
        ${y("แก้ไข",`#/cleaning-zones/${encodeURIComponent(e.id)}/edit`,"edit")}
        <button type="button" class="min-h-11 rounded-xl border border-[#eed8d5] px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-reference" data-type="cleaning-zones" data-id="${r(e.id)}" data-name="${r(e.name)}" data-usage="${n}">
          ${w("trash",17)} ลบเขต
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
          <dd class="mt-1 font-bold">${b(n)} รายการ</dd>
        </div>
      </dl>
      ${n?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">เขตนี้ถูกใช้ในรายการล้างถนน ต้องเปลี่ยนเขตในรายการเหล่านั้นก่อนจึงจะลบได้</p>':""}
    </section>
  `}function z(e=null,s={},n=e||{}){const d=!!e?"แก้ไขเขตรักษาความสะอาด":"เพิ่มเขตรักษาความสะอาด",a=(t,l,o)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="zone-${t}">
        ${r(l)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="zone-${t}" name="${t}" type="text" maxlength="${o}" required value="${r(n[t]||"")}" aria-describedby="zone-${t}-error" ${s[t]?'aria-invalid="true"':""}>
      <p id="zone-${t}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${r(s[t]||"")}</p>
    </div>
  `;return`
    ${x("ข้อมูลพื้นฐาน",d,"กรอกรหัสและชื่อเขตเพื่อใช้ในฟอร์มล้างทำความสะอาดถนน")}
    <section class="panel-shadow max-w-2xl rounded-2xl border border-line bg-white p-5 sm:p-7">
      <form id="zone-form" data-id="${r(e?.id||"")}" novalidate>
        <div class="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
          ${a("code","รหัสเขต",50)}
          ${a("name","ชื่อเขต",255)}
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
  `}function _({params:e,wasteTypes:s=h,records:n=g()}){const c=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),d=e.get("sort")==="name"?"name":"code",a=10,t=s.filter(i=>!c||(i.code+" "+i.name).toLocaleLowerCase("th-TH").includes(c)).sort((i,m)=>String(i[d]).localeCompare(String(m[d]),"th",{numeric:!0})),l=Math.max(1,Math.ceil(t.length/a)),o=Math.min(l,Math.max(1,Number.parseInt(e.get("page"),10)||1)),p=t.slice((o-1)*a,o*a),f=i=>{const m=new URLSearchParams;return e.get("q")&&m.set("q",e.get("q")),d!=="code"&&m.set("sort",d),i>1&&m.set("page",String(i)),"#/waste-types"+(m.size?"?"+m:"")};return`
    ${x("ข้อมูลพื้นฐาน","ประเภทขยะมูลฝอย","จัดการรหัสและชื่อประเภทสำหรับรายการมูลฝอย",v("เพิ่มประเภท","#/waste-types/new"))}
    <section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6">
      <form id="wasteType-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_180px_auto] sm:items-end">
        <div>
          <label for="wasteType-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label>
          <input id="wasteType-search" name="q" type="search" class="field" placeholder="รหัสหรือชื่อประเภท" value="${r(e.get("q")||"")}">
        </div>
        <div>
          <label for="wasteType-sort" class="mb-1.5 block text-sm font-semibold">เรียงตาม</label>
          <select id="wasteType-sort" name="sort" class="field master-native-select">
            <option value="code" ${d==="code"?"selected":""}>รหัสประเภท</option>
            <option value="name" ${d==="name"?"selected":""}>ชื่อประเภท</option>
          </select>
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
      </form>
    </section>

    <section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-4 py-4 sm:px-6">
        <h2 class="text-sm font-bold">รายการประเภท</h2>
        <p class="mt-1 text-xs text-muted">พบ ${b(t.length)} รายการ</p>
      </div>
      ${p.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${p.map(i=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/waste-types/${encodeURIComponent(i.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${r(i.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${r(i.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานบริหารจัดการมูลฝอย ${b(M(i.name,n))} รายการ</span>
            ${w("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบประเภทขยะมูลฝอย</h3>
        <p class="mt-2 text-sm text-muted">${c?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มประเภท"}</p>
        <div class="mt-5">${c?y("แสดงทั้งหมด","#/waste-types"):v("เพิ่มประเภท","#/waste-types/new")}</div>
      </div>`}
      ${t.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${b((o-1)*a+1)}–${b(Math.min(o*a,t.length))} จาก ${b(t.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${o===1?"pointer-events-none opacity-45":""}" href="${f(o-1)}" ${o===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${o} / ${l}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${o===l?"pointer-events-none opacity-45":""}" href="${f(o+1)}" ${o===l?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function E({wasteType:e,records:s=g()}){const n=M(e.name,s);return`
    ${x("ข้อมูลพื้นฐาน",e.name,"รายละเอียดประเภทขยะมูลฝอย",`
      <div class="flex flex-wrap gap-2">
        ${y("แก้ไข",`#/waste-types/${encodeURIComponent(e.id)}/edit`,"edit")}
        <button type="button" class="min-h-11 rounded-xl border border-[#eed8d5] px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-reference" data-type="waste-types" data-id="${r(e.id)}" data-name="${r(e.name)}" data-usage="${n}">
          ${w("trash",17)} ลบประเภท
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
          <dd class="mt-1 font-bold">${b(n)} รายการ</dd>
        </div>
      </dl>
      ${n?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">ประเภทนี้ถูกใช้ในรายการมูลฝอย ต้องเปลี่ยนประเภทในรายการเหล่านั้นก่อนจึงจะลบได้</p>':""}
    </section>
  `}function q(e=null,s={},n=e||{}){const d=!!e?"แก้ไขประเภทขยะมูลฝอย":"เพิ่มประเภทขยะมูลฝอย",a=(t,l,o)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="wasteType-${t}">
        ${r(l)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="wasteType-${t}" name="${t}" type="text" maxlength="${o}" required value="${r(n[t]||"")}" aria-describedby="wasteType-${t}-error" ${s[t]?'aria-invalid="true"':""}>
      <p id="wasteType-${t}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${r(s[t]||"")}</p>
    </div>
  `;return`
    ${x("ข้อมูลพื้นฐาน",d,"กรอกรหัสและชื่อประเภทเพื่อใช้ในฟอร์มงานบริหารจัดการมูลฝอย")}
    <section class="panel-shadow max-w-2xl rounded-2xl border border-line bg-white p-5 sm:p-7">
      <form id="wasteType-form" data-id="${r(e?.id||"")}" novalidate>
        <div class="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
          ${a("code","รหัสประเภท",50)}
          ${a("name","ชื่อประเภท",255)}
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
  `}async function O(e,s,n,c,{navigate:d=S,showToast:a=k,refreshData:t=T}={}){if(c>0){a(`ไม่สามารถลบ "${n}" ได้เนื่องจากมีข้อมูลงานบริการที่อ้างอิงอยู่`,"error");return}const l=e==="cleaning-zones"?"เขต":"ประเภทขยะ";if(await I({title:`ยืนยันการลบ${l}`,message:`คุณต้องการลบ "${n}" ออกจากระบบใช่หรือไม่?`,confirmText:`ลบ${l}`,variant:"danger",iconName:"trash"}))try{const p=`${$(e)}/${s}`;await C(p,{method:"DELETE"}),a(`ลบ${l}เรียบร้อยแล้ว`),await t(),await P(),d(`/${e}`)}catch(p){a(p.message||`ไม่สามารถลบ${l}ได้`,"error")}}async function N(e,s){const n=e.dataset.id,c=Object.fromEntries(new FormData(e));c.is_active=e.elements.namedItem("is_active")?.checked??!0;try{const d=`${$(s)}${n?`/${n}`:""}`,a=await C(d,{method:n?"PUT":"POST",body:c});await T(),await P(),S(`/${s}/${a.data.id}`),k("บันทึกข้อมูลแล้ว")}catch(d){k(d.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล","error");const a=d.fieldErrors||Object.fromEntries(Object.entries(d.fields||{}).map(([f,i])=>[f,Array.isArray(i)?i[0]:i])),l=(s==="cleaning-zones"?u:h).find(f=>String(f.id)===n)||null,o=s==="cleaning-zones"?z(l,a,c):q(l,a,c),p=document.querySelector("#main-content");p&&(p.innerHTML=o)}}async function F(e,s){U||await T();const n=e==="cleaning-zones",c=n?u:h;if(s.parts.length===1)return n?D({params:s.params,zones:u}):_({params:s.params,wasteTypes:h});if(s.parts.length===2&&s.parts[1]==="new")return n?z():q();const d=decodeURIComponent(s.parts[1]||""),a=c.find(t=>String(t.id)===d);return a?s.parts.length===3&&s.parts[2]==="edit"?n?z(a):q(a):n?H({zone:a}):E({wasteType:a}):'<div class="p-8 text-center text-muted">ไม่พบข้อมูลอ้างอิงที่ต้องการ</div>'}export{F as a,O as d,T as r,N as s};
