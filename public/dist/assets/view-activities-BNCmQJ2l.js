import{c as ee,a as f,s as te,b as F,d as G,e as H,f as E,g as C,p as A,h as d,i as $,j as W,n as _,t as q,o as V}from"./view-users-BzvAMVA2.js";const P=[{id:"cleaning",label:"งานบริการรักษาความสะอาด",short:"รักษาความสะอาด",icon:"sparkles",tone:"mint"},{id:"waste",label:"งานบริการมูลฝอย",short:"บริการมูลฝอย",icon:"recycle",tone:"sky"},{id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",short:"จัดการสิ่งปฏิกูล",icon:"droplet",tone:"amber"},{id:"projects",label:"งานพัฒนาระบบจัดการมูลฝอย",short:"พัฒนาระบบ",icon:"chart",tone:"violet"}],y={name:"service_date",label:"วันที่ดำเนินงาน",type:"date",required:!0},j=[{id:"road-washings",group:"cleaning",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",short:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",icon:"road",titleField:"location",fields:[y,{name:"cleaning_zone_id",label:"เขตรักษาความสะอาด",type:"reference",reference:"cleaning-zones",required:!0},{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0}]},{id:"waterway-cleanings",group:"cleaning",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",short:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",icon:"waves",titleField:"waterway_name",fields:[y,{name:"waterway_name",label:"ชื่อแหล่งน้ำ",type:"text",required:!0},{name:"distance_km",label:"ระยะทางปฏิบัติงาน",type:"number",unit:"กม.",required:!0},{name:"quantity",label:"ปริมาณที่กำจัดได้",type:"number",unit:"ตัน",required:!0}]},{id:"road-sweepings",group:"cleaning",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",short:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",icon:"sparkles",titleField:"road",fields:[y,{name:"road",label:"ถนน",type:"text",required:!0},{name:"storage_location",label:"สถานที่จัดเก็บ",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0}]},{id:"outsourced-cleanings",group:"cleaning",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",short:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",icon:"users",titleField:"location",fields:[y,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0},{name:"community",label:"ชุมชน",type:"text",required:!0}]},{id:"waste-collections",group:"waste",label:"งานบริหารจัดการมูลฝอย",short:"งานบริหารจัดการมูลฝอย",icon:"recycle",titleField:"waste_name",fields:[y,{name:"source",label:"แหล่งที่เก็บ",type:"text",required:!0},{name:"waste_type_id",label:"ประเภทขยะมูลฝอย",type:"reference",reference:"waste-types",required:!0},{name:"waste_name",label:"ชื่อขยะมูลฝอย",type:"text",required:!0},{name:"weight",label:"น้ำหนัก",type:"number",unit:"ตัน",required:!0}]},{id:"drain-cleanings",group:"sanitation",label:"งานลอกท่อระบายน้ำ",short:"ลอกท่อระบายน้ำ",icon:"droplet",titleField:"location",fields:[y,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0},{name:"sediment_quantity",label:"ปริมาณตะกอน",type:"number",unit:"ลบ.ม.",required:!0}]},{id:"septic-pumpings",group:"sanitation",label:"งานสูบสิ่งปฏิกูล",short:"สูบสิ่งปฏิกูล",icon:"truck",titleField:"location",fields:[y,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"volume",label:"ปริมาตรสิ่งปฏิกูล",type:"number",unit:"ลบ.ม.",required:!0},{name:"fee_amount",label:"ค่าธรรมเนียม",type:"number",unit:"บาท",required:!0}]},{id:"septic-treatments",group:"sanitation",label:"การบำบัดสิ่งปฏิกูล",short:"บำบัดสิ่งปฏิกูล",icon:"flask",titleField:"service_date",fields:[y,{name:"sludge_quantity",label:"ปริมาณตะกอนสำหรับทำปุ๋ย",type:"number",unit:"กก.",required:!0},{name:"fertilizer_remaining",label:"ปุ๋ยอินทรีย์สูตร 2 คงเหลือ",type:"number",unit:"กก.",required:!0},{name:"microbial_note",label:"ข้อมูลการใส่น้ำจุลินทรีย์ชีวภาพ",type:"textarea",required:!0}]},{id:"waste-management-projects",group:"projects",label:"โครงการพัฒนาระบบจัดการมูลฝอย",short:"โครงการพัฒนา",icon:"chart",titleField:"project_name",fields:[y,{name:"project_name",label:"ชื่อโครงการ",type:"text",required:!0},{name:"communities_count",label:"จำนวนชุมชนที่เข้าร่วม",type:"integer",unit:"ชุมชน",required:!0},{name:"participants_count",label:"ผู้เข้าร่วมโครงการ",type:"integer",unit:"คน",required:!0}]}],K=" — เทศบาลนครนนทบุรี",L="/dashboard";function U(e=window.location.hash){let t=e||"";if(t.startsWith("#")&&(t=t.slice(1)),t.startsWith("figmacapture="))return{hash:"#/dashboard",path:"/dashboard",parts:["dashboard"],params:new URLSearchParams,query:{}};const[n,i=""]=(t||L).split("?"),a=n.startsWith("/")?n:`/${n}`,r=a.split("/").filter(Boolean),s=new URLSearchParams(i),o=Object.fromEntries(s.entries());return{hash:`#${a}${i?`?${i}`:""}`,path:a,parts:r.length?r:["dashboard"],params:s,query:o}}function ce(){return U()}function D(e,t=K){const n=(e||"แดชบอร์ดฝ่ายบริการ").trim();n.endsWith(t.trim())?document.title=n:document.title=`${n}${t}`}function ne(e){const[t,n]=e.parts;return t==="dashboard"||!e.parts.length?"แดชบอร์ดฝ่ายบริการ":t==="login"?"เข้าสู่ระบบ":t==="users"?"จัดการผู้ใช้งาน":t==="profile"?"โปรไฟล์ส่วนบุคคล":t==="audit-logs"?"ประวัติการแก้ไข":t==="cleaning-zones"?"เขตรักษาความสะอาด":t==="waste-types"?"ประเภทขยะมูลฝอย":t==="reports"?j.find(a=>a.id===n)?.short||"รายงาน":t==="module"?j.find(a=>a.id===n)?.short||"งานบริการ":"แดชบอร์ดฝ่ายบริการ"}class ie{constructor(t={},n={}){let i={};t&&typeof t=="object"&&!t.defaultRoute&&!t.routes?i={routes:t,...n}:i=t||{},this.routes={},this.options={defaultRoute:L,titleSuffix:K,...i},this.current=U(),this.beforeHooks=[],this.afterHooks=[],this.notFoundHandler=null,this.options.routes&&this.registerRoutes(this.options.routes)}registerRoutes(t){for(const[n,i]of Object.entries(t))typeof i=="function"?this.routes[n]={handler:i}:this.routes[n]=i}setNotFound(t){this.notFoundHandler=t}beforeEach(t){this.beforeHooks.push(t)}afterEach(t){this.afterHooks.push(t)}navigate(t,n={}){let i=t||L;i.startsWith("#")&&(i=i.slice(1)),i.startsWith("/")||(i=`/${i}`);const a=`#${i}`;window.location.hash===a?this.resolve():n.replace?window.location.replace(a):window.location.hash=a,n.noScroll||window.scrollTo({top:0,behavior:"smooth"})}async checkGuards(t,n){if(t.parts[0]==="login"){const a=window.serviceHubUrls?.login||"/login";return window.location.replace(a),!1}for(const a of this.beforeHooks){const r=await a(t);if(r===!1)return!1;if(typeof r=="string")return r}if(n?.guard){const a=await n.guard(t);if(a===!1)return!1;if(typeof a=="string")return a}const i=t.parts[0];if(i==="users"&&!ee()||i==="audit-logs"&&!f("audit-logs.view")||i==="cleaning-zones"&&!f("cleaning-zones.view")||i==="waste-types"&&!f("waste-types.view"))return!1;if(i==="module"&&t.parts[1]){const a=t.parts[1];if(!f(`${a}.view`))return!1}return!0}async resolve(){const t=U();this.current=t;const n=t.parts[0]||"dashboard",i=this.routes[n]||this.routes["*"],a=await this.checkGuards(t,i);if(a===!1){this.notFoundHandler&&await this.notFoundHandler(t),D("ไม่พบหน้าหรือไม่มีสิทธิ์เข้าถึง",this.options.titleSuffix);return}if(typeof a=="string"){this.navigate(a);return}let r="";i?.title?r=typeof i.title=="function"?i.title(t):i.title:r=ne(t),D(r,this.options.titleSuffix),i?.handler?await i.handler(t):this.notFoundHandler&&await this.notFoundHandler(t);for(const s of this.afterHooks)s(t);typeof this.options.afterRender=="function"&&this.options.afterRender(t)}init(){window.addEventListener("hashchange",()=>this.resolve()),this.resolve()}}let k=null;function ue(e={},t={}){return k=new ie(e,t),k.init(),k}function Q(e,t={}){k?k.navigate(e,t):(window.location.hash=e.startsWith("#")?e:`#${e}`,window.scrollTo({top:0,behavior:"smooth"}))}let v=[],m={"cleaning-zones":[],"waste-types":[]},X=!1;const B=new Set;let S=null;function pe(){return v}async function z(){try{const[e,t,...n]=await Promise.all([f("cleaning-zones.view")?E(C("cleaning-zones")):Promise.resolve([]),f("waste-types.view")?E(C("waste-types")):Promise.resolve([]),...j.map(i=>f(`${i.id}.view`)?E(F(i.id)):Promise.resolve([]))]);m["cleaning-zones"]=e||[],m["waste-types"]=t||[],v=n.flat(),X=!0}catch(e){throw console.error("Failed to load activity data:",e),e}}function J(e,t,n=m){return!e||t==null||t===""?"—":e.type==="reference"?d(n[e.reference]?.find(i=>String(i.id)===String(t))?.name||"ไม่พบข้อมูลอ้างอิง"):e.type==="number"||e.type==="integer"?`${_(t)}${e.unit?` ${d(e.unit)}`:""}`:e.type==="date"?q(t):d(t)}function se(e,t="",n="",i=m){const a=`field-${e.name}`,r=`id="${a}" name="${e.name}" class="field" ${e.required?"required":""} ${n?'aria-invalid="true"':""} aria-describedby="${a}-help"`;let s;if(e.type==="textarea")s=`<textarea ${r} rows="4" maxlength="10000">${d(t)}</textarea>`;else if(e.type==="reference")s=`
      <select ${r}>
        <option value="" disabled ${t?"":"selected"}>เลือก${d(e.label)}</option>
        ${(i[e.reference]||[]).filter(o=>o.is_active||String(o.id)===String(t)).map(o=>`
          <option value="${d(o.id)}" ${String(t)===String(o.id)?"selected":""}>
            ${d(o.name)}${o.symbol?` (${d(o.symbol)})`:""}
          </option>
        `).join("")}
      </select>
    `;else if(e.type==="select")s=`
      <select ${r}>
        <option value="" disabled ${t?"":"selected"}>ระบุ${d(e.label)}</option>
        ${(e.options||[]).map(o=>`<option value="${d(o)}" ${t===o?"selected":""}>${d(o)}</option>`).join("")}
      </select>
    `;else{const o=e.type==="number"||e.type==="integer",p=e.type==="number"?["distance_km","fee_amount"].includes(e.name)?"0.01":"0.001":"1";s=`<input ${r} type="${o?"number":e.type}" ${o?`step="${p}" min="0"`:""} ${e.type==="text"?`maxlength="${e.name==="project_name"?500:255}"`:""} value="${d(t)}" placeholder="${e.type==="text"?`ระบุ${d(e.label)}`:""}">`}return`
    <div class="${e.type==="textarea"?"sm:col-span-2":""}">
      <label for="${a}" class="mb-1.5 block text-sm font-semibold text-[#41564c]">
        ${d(e.label)} ${e.required?'<span class="text-[#bf5b53]" aria-label="จำเป็น">*</span>':""}
      </label>
      ${s}
      <p id="${a}-help" class="mt-1.5 min-h-4 text-xs ${n?"text-[#b73c35]":"text-muted"}">
        ${n?d(n):e.unit?`หน่วย: ${d(e.unit)}`:"&nbsp;"}
      </p>
    </div>
  `}function ae(e,t,n=m){const i=Object.fromEntries(new FormData(e)),a={};return t.fields.forEach(r=>{const s=String(i[r.name]??"").trim();if(i[r.name]=s,r.required&&!s)a[r.name]=`กรุณาระบุ${r.label}`;else if(s&&(r.type==="number"||r.type==="integer")){const o=Number(s);(!Number.isFinite(o)||o<0||r.type==="integer"&&!Number.isInteger(o))&&(a[r.name]=`กรุณาระบุ${r.label}เป็นจำนวนที่ถูกต้อง`)}else s&&r.type==="date"&&Number.isNaN(new Date(s).getTime())?a[r.name]="กรุณาระบุวันที่ที่ถูกต้อง":r.type==="reference"&&s&&!n[r.reference]?.some(o=>String(o.id)===s&&o.is_active)&&(a[r.name]=`กรุณาเลือก${r.label}จากรายการ`)}),{data:i,errors:a}}function re({module:e,group:t,params:n,records:i=v,references:a=m}){const r=n.get("q")||"",s=n.get("from")||"",o=n.get("to")||"",p=n.get("sort")||"newest",x=Math.max(1,Number(n.get("page"))||1);let c=i.filter(l=>l.module===e.id);if(r){const l=r.toLocaleLowerCase("th");c=c.filter(u=>e.fields.some(h=>{const Z=h.type==="reference"?a[h.reference]?.find(O=>String(O.id)===String(u[h.name]))?.name:u[h.name];return String(Z??"").toLocaleLowerCase("th").includes(l)}))}s&&(c=c.filter(l=>l.service_date>=s)),o&&(c=c.filter(l=>l.service_date<=o)),e.fields.filter(l=>l.type==="reference").forEach(l=>{const u=n.get(l.name);u&&(c=c.filter(h=>String(h[l.name])===String(u)))}),c.sort((l,u)=>p==="oldest"?l.service_date.localeCompare(u.service_date):u.service_date.localeCompare(l.service_date));const g=6,w=Math.max(1,Math.ceil(c.length/g)),b=Math.min(x,w),I=c.slice((b-1)*g,b*g),M=e.fields.filter(l=>l.name!=="service_date").slice(0,3),N=l=>{const u=new URLSearchParams(n);return u.set("page",String(l)),`#/module/${e.id}?${u}`},Y=e.fields.filter(l=>l.type==="reference").map(l=>{const u=n.get(l.name)||"";return`
      <div class="w-full min-w-0 sm:w-[170px]">
        <label for="${l.name}-filter" class="mb-1.5 block text-xs font-bold text-[#52665d]">${l.label}</label>
        <select id="${l.name}-filter" name="${l.name}" class="field">
          <option value="">ทั้งหมด</option>
          ${(a[l.reference]||[]).map(h=>`<option value="${d(h.id)}" ${u===String(h.id)?"selected":""}>${d(h.name)}</option>`).join("")}
        </select>
      </div>
    `}).join("");(s||o||p!=="newest"||e.fields.some(l=>l.type==="reference"&&n.get(l.name)))&&B.add(e.id);const T=B.has(e.id);return`
    ${A(t?.label||"",e.label,`จัดการข้อมูล${e.short} ค้นหาและกรองรายการตามช่วงวันที่`,f(`${e.id}.create`)?W("เพิ่มข้อมูล",`#/module/${e.id}/new`):"")}
    <section aria-label="ตัวกรองรายการ" class="panel-shadow mb-5 w-full max-w-full min-w-0 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <form id="filter-form" data-module="${e.id}" class="flex flex-wrap items-end gap-3">
        <div class="w-full min-w-0 sm:min-w-[180px] sm:flex-1">
          <label for="search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <div class="relative">
            ${$("search",18,"pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]")}
            <input id="search" name="q" class="field pl-10" type="search" placeholder="ค้นหาข้อมูล..." value="${d(r)}">
          </div>
        </div>
        <button type="button" data-action="toggle-mobile-filters" data-module="${e.id}" aria-expanded="${T}" aria-controls="advanced-filters-${e.id}" class="inline-flex min-h-11 w-full items-center justify-between rounded-xl border border-line px-4 text-sm font-semibold text-primary-dark md:hidden">
          ตัวกรองเพิ่มเติม ${$("chevronDown",16,T?"rotate-180":"")}
        </button>
        <div id="advanced-filters-${e.id}" class="${T?"flex":"hidden"} w-full flex-wrap items-end gap-3 md:contents">
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label>
            <input id="date-from" class="field" type="date" name="from" value="${d(s)}">
          </div>
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label>
            <input id="date-to" class="field" type="date" name="to" value="${d(o)}">
          </div>
          ${Y}
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="sort" class="mb-1.5 block text-xs font-bold text-[#52665d]">เรียงตาม</label>
            <select id="sort" name="sort" class="field">
              <option value="newest" ${p==="newest"?"selected":""}>วันที่ล่าสุด</option>
              <option value="oldest" ${p==="oldest"?"selected":""}>วันที่เก่าสุด</option>
            </select>
          </div>
          <div class="w-full sm:w-auto">
            <a href="#/module/${e.id}" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas sm:w-auto">ล้างตัวกรอง</a>
          </div>
        </div>
      </form>
    </section>

    <section aria-labelledby="records-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
        <div>
          <h2 id="records-title" class="text-sm font-bold">รายการข้อมูล</h2>
          <p class="mt-0.5 text-xs text-muted">พบ ${_(c.length)} รายการ</p>
        </div>
        <span class="rounded-full bg-[#f0f7f2] px-2.5 py-1 text-[11px] font-bold text-primary">${d(e.short)}</span>
      </div>
      ${I.length?`
      <div class="data-table-scroll block overflow-x-auto w-full max-w-full min-w-0">
        <table class="w-full min-w-[650px] text-left text-sm" role="table">
          <thead class="bg-[#f9fbf9] text-xs font-semibold text-muted">
            <tr>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">วันที่ดำเนินงาน</th>
              ${M.map(l=>`<th scope="col" class="px-5 py-3.5 whitespace-nowrap">${d(l.label)}</th>`).join("")}
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">ผู้บันทึก</th>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">ดูข้อมูล</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef2ee]">
            ${I.map(l=>`
              <tr class="transition hover:bg-[#fafcfa]">
                <td class="whitespace-nowrap px-5 py-3.5 font-semibold text-ink">${q(l.service_date)}</td>
                ${M.map(u=>`<td class="max-w-[240px] truncate px-5 py-3.5 text-[#53675e]">${J(u,l[u.name],a)}</td>`).join("")}
                <td class="whitespace-nowrap px-5 py-3.5 text-muted">${d(l.created_by)}</td>
                <td class="whitespace-nowrap px-5 py-3.5 text-right">
                  <a href="#/module/${e.id}/${encodeURIComponent(l.id)}" class="inline-flex items-center gap-1 font-bold text-primary hover:underline">
                    รายละเอียด ${$("arrow",15)}
                  </a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-xs text-muted sm:px-6 sm:py-4">
        <span>แสดง ${_((b-1)*g+1)}–${_(Math.min(b*g,c.length))} จาก ${_(c.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a href="${N(Math.max(1,b-1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${b===1?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${b===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="px-1 font-bold text-ink">${b} / ${w}</span>
          <a href="${N(Math.min(w,b+1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${b===w?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${b===w?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:`
      <div class="flex flex-col items-center px-6 py-16 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f7f2] text-primary">${$("empty",27)}</div>
        <h3 class="text-base font-bold">ไม่พบรายการข้อมูล</h3>
        <p class="mt-1 max-w-sm text-sm leading-relaxed text-muted">${r||s||o?"ลองเปลี่ยนคำค้นหาหรือช่วงวันที่ แล้วค้นหาอีกครั้ง":"เริ่มต้นด้วยการเพิ่มรายการข้อมูลในหมวดนี้"}</p>
        <div class="mt-5">${r||s||o?V("ล้างตัวกรอง",`#/module/${e.id}`):W("เพิ่มข้อมูล",`#/module/${e.id}/new`)}</div>
      </div>`}
    </section>
  `}function oe({module:e,group:t,record:n,references:i=m}){return`
    ${A(t?.label||"","รายละเอียดข้อมูล",`ข้อมูล${e.short} วันที่ ${q(n.service_date)}`,`
      <div class="flex flex-wrap gap-2">
        ${f(`${e.id}.update`)?V("แก้ไข",`#/module/${e.id}/${encodeURIComponent(n.id)}/edit`,"edit"):""}
        ${f(`${e.id}.delete`)?`
          <button type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#eed8d5] bg-white px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-activity" data-module="${e.id}" data-id="${d(n.id)}">
            ${$("trash",17)}ลบรายการ
          </button>`:""}
      </div>
    `)}
    <div class="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
      <section class="panel-shadow rounded-2xl border border-line bg-white">
        <div class="border-b border-line px-5 py-5 sm:px-7">
          <h2 class="font-bold">ข้อมูลการดำเนินงาน</h2>
        </div>
        <dl class="grid min-w-0 grid-cols-1 gap-x-8 gap-y-0 p-5 sm:grid-cols-2 sm:p-7">
          ${e.fields.map(a=>`
            <div class="border-b border-[#edf1ed] py-4">
              <dt class="text-xs font-semibold text-muted">${d(a.label)}</dt>
              <dd class="mt-1.5 break-words text-sm font-bold text-ink">${J(a,n[a.name],i)}</dd>
            </div>
          `).join("")}
        </dl>
      </section>
      <aside class="h-fit rounded-2xl border border-line bg-white p-5">
        <h2 class="text-sm font-bold">ประวัติรายการ</h2>
        <div class="mt-5 space-y-5 border-l-2 border-[#d8eadf] pl-4">
          <div>
            <p class="text-xs font-bold text-primary">บันทึกข้อมูล</p>
            <p class="mt-1 text-xs text-muted">${d(n.created_by||"ไม่ระบุ")}</p>
            <p class="mt-0.5 text-xs text-muted">${q(n.created_at)}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-primary">แก้ไขล่าสุด</p>
            <p class="mt-1 text-xs text-muted">${d(n.updated_by||"ไม่ระบุ")}</p>
            <p class="mt-0.5 text-xs text-muted">${q(n.updated_at)}</p>
          </div>
        </div>
        <div class="mt-5 rounded-xl bg-[#f4f8f4] p-3 text-[11px] leading-relaxed text-muted">
          การเปลี่ยนแปลงถูกบันทึกใน Audit Log ของระบบ
        </div>
      </aside>
    </div>
  `}function R({module:e,group:t,record:n=null,errors:i={},values:a=null,references:r=m}){const s=!!n,o=a||S||n||{},p=`${s?"แก้ไข":"เพิ่ม"}ข้อมูล${e.short}`;return`
    ${A(t?.label||"",p,s?"ตรวจสอบและแก้ไขรายละเอียดรายการนี้":"กรอกข้อมูลการดำเนินงานให้ครบตามช่องที่กำหนด")}
    <section class="panel-shadow w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-5 py-5 sm:px-7">
        <h2 class="font-bold">รายละเอียดการดำเนินงาน</h2>
        <p class="mt-1 text-xs text-muted">ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p>
      </div>
      <form id="record-form" data-module="${e.id}" data-id="${n?d(n.id):""}" novalidate class="p-5 sm:p-7">
        <div class="grid min-w-0 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          ${e.fields.map(x=>se(x,o[x.name]??"",i[x.name],r)).join("")}
        </div>
        <div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <a href="${n?`#/module/${e.id}/${encodeURIComponent(n.id)}`:`#/module/${e.id}`}" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold text-[#566a60] hover:bg-canvas">
            ยกเลิก
          </a>
          <button type="submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">
            ${$("check",18)}${s?"บันทึกการแก้ไข":"บันทึกข้อมูล"}
          </button>
        </div>
      </form>
    </section>
  `}async function me(e,t,{navigate:n=Q,showToast:i=H,refreshData:a=z}={}){if(await te({title:"ยืนยันการลบรายการ",message:"รายการนี้จะถูกลบออกจากฐานข้อมูลอย่างถาวร คุณต้องการดำเนินการต่อหรือไม่?",confirmText:"ลบรายการ",variant:"danger",iconName:"trash"}))try{const s=`${F(e)}/${t}`;await G(s,{method:"DELETE"}),i("ลบรายการเรียบร้อยแล้ว"),await a(),n(`/module/${e}`)}catch(s){i(s.message||"ไม่สามารถลบรายการได้","error")}}async function fe(e){const t=e.dataset.module,n=j.find(s=>s.id===t);if(!n)return;const{data:i,errors:a}=ae(e,n,m),r=e.dataset.id?v.find(s=>String(s.id)===e.dataset.id&&s.module===n.id):null;if(Object.keys(a).length){S=i;const s=P.find(x=>x.id===n.group),o=R({module:n,group:s,record:r,errors:a,values:i,references:m}),p=document.querySelector("#main-content");p&&(p.innerHTML=o),document.querySelector('[aria-invalid="true"]')?.focus();return}try{const s=r?`${F(n.id)}/${r.id}`:F(n.id),p=await G(s,{method:r?"PUT":"POST",body:i});S=null,await z(),Q(`/module/${n.id}/${p.data.id}`),H("บันทึกข้อมูลแล้ว")}catch(s){S=i;const o=s.fieldErrors||Object.fromEntries(Object.entries(s.fields||{}).map(([g,w])=>[g,Array.isArray(w)?w[0]:w]));H(s.message||"ไม่สามารถบันทึกข้อมูลได้","error");const p=P.find(g=>g.id===n.group),x=R({module:n,group:p,record:r,errors:o,values:i,references:m}),c=document.querySelector("#main-content");c&&(c.innerHTML=x),document.querySelector('[aria-invalid="true"]')?.focus()}}async function be(e){X||await z();const t=e.parts[1],n=j.find(s=>s.id===t);if(!n)return'<div class="p-8 text-center text-muted">ไม่พบข้อมูลโมดูลงานบริการ</div>';const i=P.find(s=>s.id===n.group);if(e.parts.length===2)return re({module:n,group:i,params:e.params,records:v,references:m});if(e.parts.length===3&&e.parts[2]==="new")return f(`${n.id}.create`)?R({module:n,group:i,record:null,references:m}):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์สร้างข้อมูลในหมวดนี้</div>';const a=decodeURIComponent(e.parts[2]||""),r=v.find(s=>s.module===n.id&&String(s.id)===a);return r?e.parts.length===4&&e.parts[3]==="edit"?f(`${n.id}.update`)?R({module:n,group:i,record:r,references:m}):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์แก้ไขข้อมูลในหมวดนี้</div>':oe({module:n,group:i,record:r,references:m}):'<div class="p-8 text-center text-muted">ไม่พบรายการข้อมูลที่ต้องการ</div>'}export{ce as a,P as b,be as c,me as d,pe as g,ue as i,j as m,Q as n,z as r,fe as s};
