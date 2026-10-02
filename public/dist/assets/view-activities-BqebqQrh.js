import{c as ae,a as f,s as se,b as R,d as V,e as H,p as z,o as K,i as $,f as D,g as E,h as W}from"./view-users-iAQT2Vs4.js";import{e as d,t as q,n as _,r as re}from"./view-analytics-BMG2sQy1.js";const A=[{id:"cleaning",label:"งานบริการรักษาความสะอาด",short:"รักษาความสะอาด",icon:"sparkles",tone:"mint"},{id:"waste",label:"งานบริการมูลฝอย",short:"บริการมูลฝอย",icon:"recycle",tone:"sky"},{id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",short:"จัดการสิ่งปฏิกูล",icon:"droplet",tone:"amber"},{id:"projects",label:"งานพัฒนาระบบจัดการมูลฝอย",short:"พัฒนาระบบ",icon:"chart",tone:"violet"}],y={name:"service_date",label:"วันที่ดำเนินงาน",type:"date",required:!0},j=[{id:"road-washings",group:"cleaning",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",short:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",icon:"road",titleField:"location",fields:[y,{name:"cleaning_zone_id",label:"เขตรักษาความสะอาด",type:"reference",reference:"cleaning-zones",required:!0},{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0}]},{id:"waterway-cleanings",group:"cleaning",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",short:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",icon:"waves",titleField:"waterway_name",fields:[y,{name:"waterway_name",label:"ชื่อแหล่งน้ำ",type:"text",required:!0},{name:"distance_km",label:"ระยะทางปฏิบัติงาน",type:"number",unit:"กม.",required:!0},{name:"quantity",label:"ปริมาณที่กำจัดได้",type:"number",unit:"ตัน",required:!0}]},{id:"road-sweepings",group:"cleaning",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",short:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",icon:"sparkles",titleField:"road",fields:[y,{name:"road",label:"ถนน",type:"text",required:!0},{name:"storage_location",label:"สถานที่จัดเก็บ",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0}]},{id:"outsourced-cleanings",group:"cleaning",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",short:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",icon:"users",titleField:"location",fields:[y,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0},{name:"community",label:"ชุมชน",type:"text",required:!0}]},{id:"waste-collections",group:"waste",label:"งานบริหารจัดการมูลฝอย",short:"งานบริหารจัดการมูลฝอย",icon:"recycle",titleField:"waste_name",fields:[y,{name:"source",label:"แหล่งที่เก็บ",type:"text",required:!0},{name:"waste_type_id",label:"ประเภทขยะมูลฝอย",type:"reference",reference:"waste-types",required:!0},{name:"waste_name",label:"ชื่อขยะมูลฝอย",type:"text",required:!0},{name:"weight",label:"น้ำหนัก",type:"number",unit:"ตัน",required:!0}]},{id:"drain-cleanings",group:"sanitation",label:"งานลอกท่อระบายน้ำ",short:"ลอกท่อระบายน้ำ",icon:"droplet",titleField:"location",fields:[y,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0},{name:"sediment_quantity",label:"ปริมาณตะกอน",type:"number",unit:"ลบ.ม.",required:!0}]},{id:"septic-pumpings",group:"sanitation",label:"งานสูบสิ่งปฏิกูล",short:"สูบสิ่งปฏิกูล",icon:"truck",titleField:"location",fields:[y,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"volume",label:"ปริมาตรสิ่งปฏิกูล",type:"number",unit:"ลบ.ม.",required:!0},{name:"fee_amount",label:"ค่าธรรมเนียม",type:"number",unit:"บาท",required:!0}]},{id:"septic-treatments",group:"sanitation",label:"การบำบัดสิ่งปฏิกูล",short:"บำบัดสิ่งปฏิกูล",icon:"flask",titleField:"service_date",fields:[y,{name:"sludge_quantity",label:"ปริมาณตะกอนสำหรับทำปุ๋ย",type:"number",unit:"กก.",required:!0},{name:"fertilizer_remaining",label:"ปุ๋ยอินทรีย์สูตร 2 คงเหลือ",type:"number",unit:"กก.",required:!0},{name:"microbial_note",label:"ข้อมูลการใส่น้ำจุลินทรีย์ชีวภาพ",type:"textarea",required:!0}]},{id:"waste-management-projects",group:"projects",label:"โครงการพัฒนาระบบจัดการมูลฝอย",short:"โครงการพัฒนา",icon:"chart",titleField:"project_name",fields:[y,{name:"project_name",label:"ชื่อโครงการ",type:"text",required:!0},{name:"communities_count",label:"จำนวนชุมชนที่เข้าร่วม",type:"integer",unit:"ชุมชน",required:!0},{name:"participants_count",label:"ผู้เข้าร่วมโครงการ",type:"integer",unit:"คน",required:!0}]}],O=" — เทศบาลนครนนทบุรี",L="/dashboard";function U(e=window.location.hash){let t=e||"";if(t.startsWith("#")&&(t=t.slice(1)),t.startsWith("figmacapture="))return{hash:"#/dashboard",path:"/dashboard",parts:["dashboard"],params:new URLSearchParams,query:{}};const[i,n=""]=(t||L).split("?"),s=i.startsWith("/")?i:`/${i}`,r=s.split("/").filter(Boolean),a=new URLSearchParams(n),o=Object.fromEntries(a.entries());return{hash:`#${s}${n?`?${n}`:""}`,path:s,parts:r.length?r:["dashboard"],params:a,query:o}}function we(){return U()}function B(e,t=O){const i=(e||"แดชบอร์ดฝ่ายบริการ").trim();i.endsWith(t.trim())?document.title=i:document.title=`${i}${t}`}function oe(e){const[t,i]=e.parts;return t==="dashboard"||!e.parts.length?"แดชบอร์ดฝ่ายบริการ":t==="login"?"เข้าสู่ระบบ":t==="users"?"จัดการผู้ใช้งาน":t==="profile"?"โปรไฟล์ส่วนบุคคล":t==="audit-logs"?"ประวัติการแก้ไข":t==="cleaning-zones"?"เขตรักษาความสะอาด":t==="waste-types"?"ประเภทขยะมูลฝอย":t==="reports"?j.find(s=>s.id===i)?.short||"รายงาน":t==="module"?j.find(s=>s.id===i)?.short||"งานบริการ":"แดชบอร์ดฝ่ายบริการ"}class le{constructor(t={},i={}){let n={};t&&typeof t=="object"&&!t.defaultRoute&&!t.routes?n={routes:t,...i}:n=t||{},this.routes={},this.options={defaultRoute:L,titleSuffix:O,...n},this.current=U(),this.beforeHooks=[],this.afterHooks=[],this.notFoundHandler=null,this.options.routes&&this.registerRoutes(this.options.routes)}registerRoutes(t){for(const[i,n]of Object.entries(t))typeof n=="function"?this.routes[i]={handler:n}:this.routes[i]=n}setNotFound(t){this.notFoundHandler=t}beforeEach(t){this.beforeHooks.push(t)}afterEach(t){this.afterHooks.push(t)}navigate(t,i={}){let n=t||L;n.startsWith("#")&&(n=n.slice(1)),n.startsWith("/")||(n=`/${n}`);const s=`#${n}`;window.location.hash===s?this.resolve():i.replace?window.location.replace(s):window.location.hash=s,i.noScroll||window.scrollTo({top:0,behavior:"smooth"})}async checkGuards(t,i){if(t.parts[0]==="login"){const s=window.serviceHubUrls?.login||"/login";return window.location.replace(s),!1}for(const s of this.beforeHooks){const r=await s(t);if(r===!1)return!1;if(typeof r=="string")return r}if(i?.guard){const s=await i.guard(t);if(s===!1)return!1;if(typeof s=="string")return s}const n=t.parts[0];if(n==="users"&&!ae()||n==="audit-logs"&&!f("audit-logs.view")||n==="cleaning-zones"&&!f("cleaning-zones.view")||n==="waste-types"&&!f("waste-types.view"))return!1;if(n==="module"&&t.parts[1]){const s=t.parts[1];if(!f(`${s}.view`))return!1}return!0}async resolve(){const t=U();this.current=t;const i=t.parts[0]||"dashboard",n=this.routes[i]||this.routes["*"],s=await this.checkGuards(t,n);if(s===!1){this.notFoundHandler&&await this.notFoundHandler(t),B("ไม่พบหน้าหรือไม่มีสิทธิ์เข้าถึง",this.options.titleSuffix);return}if(typeof s=="string"){this.navigate(s);return}let r="";n?.title?r=typeof n.title=="function"?n.title(t):n.title:r=oe(t),B(r,this.options.titleSuffix),n?.handler?await n.handler(t):this.notFoundHandler&&await this.notFoundHandler(t);for(const a of this.afterHooks)a(t);typeof this.options.afterRender=="function"&&this.options.afterRender(t)}init(){window.addEventListener("hashchange",()=>this.resolve()),this.resolve()}}let k=null;function ye(e={},t={}){return k=new le(e,t),k.init(),k}function Q(e,t={}){k?k.navigate(e,t):(window.location.hash=e.startsWith("#")?e:`#${e}`,window.scrollTo({top:0,behavior:"smooth"}))}let v=[],c={"cleaning-zones":[],"waste-types":[]},X=!1;const G=new Set;let F=null;function de(){return v}function ce(e){v=e||[]}function ue(){return c}function pe(e){c={...c,...e}}async function T(){try{const[e,t,...i]=await Promise.all([f("cleaning-zones.view")?E(W("cleaning-zones")):Promise.resolve([]),f("waste-types.view")?E(W("waste-types")):Promise.resolve([]),...j.map(n=>f(`${n.id}.view`)?E(R(n.id)):Promise.resolve([]))]);c["cleaning-zones"]=e||[],c["waste-types"]=t||[],v=i.flat(),X=!0}catch(e){throw console.error("Failed to load activity data:",e),e}}function I(e,t,i=c){return!e||t==null||t===""?"—":e.type==="reference"?d(i[e.reference]?.find(n=>String(n.id)===String(t))?.name||"ไม่พบข้อมูลอ้างอิง"):e.type==="number"||e.type==="integer"?`${_(t)}${e.unit?` ${d(e.unit)}`:""}`:e.type==="date"?q(t):d(t)}function J(e,t="",i="",n=c){const s=`field-${e.name}`,r=`id="${s}" name="${e.name}" class="field" ${e.required?"required":""} ${i?'aria-invalid="true"':""} aria-describedby="${s}-help"`;let a;if(e.type==="textarea")a=`<textarea ${r} rows="4" maxlength="10000">${d(t)}</textarea>`;else if(e.type==="reference")a=`
      <select ${r}>
        <option value="" disabled ${t?"":"selected"}>เลือก${d(e.label)}</option>
        ${(n[e.reference]||[]).filter(o=>o.is_active||String(o.id)===String(t)).map(o=>`
          <option value="${d(o.id)}" ${String(t)===String(o.id)?"selected":""}>
            ${d(o.name)}${o.symbol?` (${d(o.symbol)})`:""}
          </option>
        `).join("")}
      </select>
    `;else if(e.type==="select")a=`
      <select ${r}>
        <option value="" disabled ${t?"":"selected"}>ระบุ${d(e.label)}</option>
        ${(e.options||[]).map(o=>`<option value="${d(o)}" ${t===o?"selected":""}>${d(o)}</option>`).join("")}
      </select>
    `;else{const o=e.type==="number"||e.type==="integer",m=e.type==="number"?["distance_km","fee_amount"].includes(e.name)?"0.01":"0.001":"1";a=`<input ${r} type="${o?"number":e.type}" ${o?`step="${m}" min="0"`:""} ${e.type==="text"?`maxlength="${e.name==="project_name"?500:255}"`:""} value="${d(t)}" placeholder="${e.type==="text"?`ระบุ${d(e.label)}`:""}">`}return`
    <div class="${e.type==="textarea"?"sm:col-span-2":""}">
      <label for="${s}" class="mb-1.5 block text-sm font-semibold text-[#41564c]">
        ${d(e.label)} ${e.required?'<span class="text-[#bf5b53]" aria-label="จำเป็น">*</span>':""}
      </label>
      ${a}
      <p id="${s}-help" class="mt-1.5 min-h-4 text-xs ${i?"text-[#b73c35]":"text-muted"}">
        ${i?d(i):e.unit?`หน่วย: ${d(e.unit)}`:"&nbsp;"}
      </p>
    </div>
  `}function Y(e,t,i=c){const n=Object.fromEntries(new FormData(e)),s={};return t.fields.forEach(r=>{const a=String(n[r.name]??"").trim();if(n[r.name]=a,r.required&&!a)s[r.name]=`กรุณาระบุ${r.label}`;else if(a&&(r.type==="number"||r.type==="integer")){const o=Number(a);(!Number.isFinite(o)||o<0||r.type==="integer"&&!Number.isInteger(o))&&(s[r.name]=`กรุณาระบุ${r.label}เป็นจำนวนที่ถูกต้อง`)}else a&&r.type==="date"&&Number.isNaN(new Date(a).getTime())?s[r.name]="กรุณาระบุวันที่ที่ถูกต้อง":r.type==="reference"&&a&&!i[r.reference]?.some(o=>String(o.id)===a&&o.is_active)&&(s[r.name]=`กรุณาเลือก${r.label}จากรายการ`)}),{data:n,errors:s}}function Z({module:e,group:t,params:i,records:n=v,references:s=c}){const r=i.get("q")||"",a=i.get("from")||"",o=i.get("to")||"",m=i.get("sort")||"newest",x=Math.max(1,Number(i.get("page"))||1);let u=n.filter(l=>l.module===e.id);if(r){const l=r.toLocaleLowerCase("th");u=u.filter(p=>e.fields.some(h=>{const ie=h.type==="reference"?s[h.reference]?.find(ne=>String(ne.id)===String(p[h.name]))?.name:p[h.name];return String(ie??"").toLocaleLowerCase("th").includes(l)}))}a&&(u=u.filter(l=>l.service_date>=a)),o&&(u=u.filter(l=>l.service_date<=o)),e.fields.filter(l=>l.type==="reference").forEach(l=>{const p=i.get(l.name);p&&(u=u.filter(h=>String(h[l.name])===String(p)))}),u.sort((l,p)=>m==="oldest"?l.service_date.localeCompare(p.service_date):p.service_date.localeCompare(l.service_date));const g=6,w=Math.max(1,Math.ceil(u.length/g)),b=Math.min(x,w),M=u.slice((b-1)*g,b*g),N=e.fields.filter(l=>l.name!=="service_date").slice(0,3),C=l=>{const p=new URLSearchParams(i);return p.set("page",String(l)),`#/module/${e.id}?${p}`},te=e.fields.filter(l=>l.type==="reference").map(l=>{const p=i.get(l.name)||"";return`
      <div class="w-full min-w-0 sm:w-[170px]">
        <label for="${l.name}-filter" class="mb-1.5 block text-xs font-bold text-[#52665d]">${l.label}</label>
        <select id="${l.name}-filter" name="${l.name}" class="field">
          <option value="">ทั้งหมด</option>
          ${(s[l.reference]||[]).map(h=>`<option value="${d(h.id)}" ${p===String(h.id)?"selected":""}>${d(h.name)}</option>`).join("")}
        </select>
      </div>
    `}).join("");(a||o||m!=="newest"||e.fields.some(l=>l.type==="reference"&&i.get(l.name)))&&G.add(e.id);const P=G.has(e.id);return`
    ${z(t?.label||"",e.label,`จัดการข้อมูล${e.short} ค้นหาและกรองรายการตามช่วงวันที่`,f(`${e.id}.create`)?D("เพิ่มข้อมูล",`#/module/${e.id}/new`):"")}
    <section aria-label="ตัวกรองรายการ" class="panel-shadow mb-5 w-full max-w-full min-w-0 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองข้อมูล</h2>
        ${re({from:a,to:o,formId:"filter-form"})}
      </div>
      <form id="filter-form" data-module="${e.id}" class="flex flex-wrap items-end gap-3">
        <div class="w-full min-w-0 sm:min-w-[180px] sm:flex-1">
          <label for="search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <div class="relative">
            ${$("search",18,"pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]")}
            <input id="search" name="q" class="field pl-10" type="search" placeholder="พิมพ์ค้นหาทันที..." value="${d(r)}" data-action="live-filter" autocomplete="off">
          </div>
        </div>
        <button type="button" data-action="toggle-mobile-filters" data-module="${e.id}" aria-expanded="${P}" aria-controls="advanced-filters-${e.id}" class="inline-flex min-h-11 w-full items-center justify-between rounded-xl border border-line px-4 text-sm font-semibold text-primary-dark md:hidden">
          ตัวกรองเพิ่มเติม ${$("chevronDown",16,P?"rotate-180":"")}
        </button>
        <div id="advanced-filters-${e.id}" class="${P?"flex":"hidden"} w-full flex-wrap items-end gap-3 md:contents">
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label>
            <input id="date-from" class="field" type="date" name="from" value="${d(a)}" data-action="live-filter">
          </div>
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label>
            <input id="date-to" class="field" type="date" name="to" value="${d(o)}" data-action="live-filter">
          </div>
          ${te}
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="sort" class="mb-1.5 block text-xs font-bold text-[#52665d]">เรียงตาม</label>
            <select id="sort" name="sort" class="field" data-action="live-filter">
              <option value="newest" ${m==="newest"?"selected":""}>วันที่ล่าสุด</option>
              <option value="oldest" ${m==="oldest"?"selected":""}>วันที่เก่าสุด</option>
            </select>
          </div>
          <div class="w-full sm:w-auto">
            <a href="#/module/${e.id}" data-action="clear-filters" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas sm:w-auto">ล้างตัวกรอง</a>
          </div>
        </div>
      </form>
    </section>

    <section aria-labelledby="records-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
        <div>
          <h2 id="records-title" class="text-sm font-bold">รายการข้อมูล</h2>
          <p class="mt-0.5 text-xs text-muted">พบ ${_(u.length)} รายการ</p>
        </div>
        <span class="rounded-full bg-[#f0f7f2] px-2.5 py-1 text-[11px] font-bold text-primary">${d(e.short)}</span>
      </div>
      ${M.length?`
      <div class="data-table-scroll block overflow-x-auto w-full max-w-full min-w-0">
        <table class="w-full min-w-[650px] text-left text-sm" role="table">
          <thead class="bg-[#f9fbf9] text-xs font-semibold text-muted">
            <tr>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">วันที่ดำเนินงาน</th>
              ${N.map(l=>`<th scope="col" class="px-5 py-3.5 whitespace-nowrap">${d(l.label)}</th>`).join("")}
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">ผู้บันทึก</th>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">ดูข้อมูล</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef2ee]">
            ${M.map(l=>`
              <tr class="transition hover:bg-[#fafcfa]">
                <td class="whitespace-nowrap px-5 py-3.5 font-semibold text-ink">${q(l.service_date)}</td>
                ${N.map(p=>`<td class="max-w-[240px] truncate px-5 py-3.5 text-[#53675e]">${I(p,l[p.name],s)}</td>`).join("")}
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
        <span>แสดง ${_((b-1)*g+1)}–${_(Math.min(b*g,u.length))} จาก ${_(u.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a href="${C(Math.max(1,b-1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${b===1?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${b===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="px-1 font-bold text-ink">${b} / ${w}</span>
          <a href="${C(Math.min(w,b+1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${b===w?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${b===w?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:`
      <div class="flex flex-col items-center px-6 py-16 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f7f2] text-primary">${$("empty",27)}</div>
        <h3 class="text-base font-bold">ไม่พบรายการข้อมูล</h3>
        <p class="mt-1 max-w-sm text-sm leading-relaxed text-muted">${r||a||o?"ลองเปลี่ยนคำค้นหาหรือช่วงวันที่ แล้วค้นหาอีกครั้ง":"เริ่มต้นด้วยการเพิ่มรายการข้อมูลในหมวดนี้"}</p>
        <div class="mt-5">${r||a||o?K("ล้างตัวกรอง",`#/module/${e.id}`):D("เพิ่มข้อมูล",`#/module/${e.id}/new`)}</div>
      </div>`}
    </section>
  `}function ee({module:e,group:t,record:i,references:n=c}){return`
    ${z(t?.label||"","รายละเอียดข้อมูล",`ข้อมูล${e.short} วันที่ ${q(i.service_date)}`,`
      <div class="flex flex-wrap gap-2">
        ${f(`${e.id}.update`)?K("แก้ไข",`#/module/${e.id}/${encodeURIComponent(i.id)}/edit`,"edit"):""}
        ${f(`${e.id}.delete`)?`
          <button type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#eed8d5] bg-white px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-activity" data-module="${e.id}" data-id="${d(i.id)}">
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
          ${e.fields.map(s=>`
            <div class="border-b border-[#edf1ed] py-4">
              <dt class="text-xs font-semibold text-muted">${d(s.label)}</dt>
              <dd class="mt-1.5 break-words text-sm font-bold text-ink">${I(s,i[s.name],n)}</dd>
            </div>
          `).join("")}
        </dl>
      </section>
      <aside class="h-fit rounded-2xl border border-line bg-white p-5">
        <h2 class="text-sm font-bold">ประวัติรายการ</h2>
        <div class="mt-5 space-y-5 border-l-2 border-[#d8eadf] pl-4">
          <div>
            <p class="text-xs font-bold text-primary">บันทึกข้อมูล</p>
            <p class="mt-1 text-xs text-muted">${d(i.created_by||"ไม่ระบุ")}</p>
            <p class="mt-0.5 text-xs text-muted">${q(i.created_at)}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-primary">แก้ไขล่าสุด</p>
            <p class="mt-1 text-xs text-muted">${d(i.updated_by||"ไม่ระบุ")}</p>
            <p class="mt-0.5 text-xs text-muted">${q(i.updated_at)}</p>
          </div>
        </div>
        <div class="mt-5 rounded-xl bg-[#f4f8f4] p-3 text-[11px] leading-relaxed text-muted">
          การเปลี่ยนแปลงถูกบันทึกใน Audit Log ของระบบ
        </div>
      </aside>
    </div>
  `}function S({module:e,group:t,record:i=null,errors:n={},values:s=null,references:r=c}){const a=!!i,o=s||F||i||{},m=`${a?"แก้ไข":"เพิ่ม"}ข้อมูล${e.short}`;return`
    ${z(t?.label||"",m,a?"ตรวจสอบและแก้ไขรายละเอียดรายการนี้":"กรอกข้อมูลการดำเนินงานให้ครบตามช่องที่กำหนด")}
    <section class="panel-shadow w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-5 py-5 sm:px-7">
        <h2 class="font-bold">รายละเอียดการดำเนินงาน</h2>
        <p class="mt-1 text-xs text-muted">ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p>
      </div>
      <form id="record-form" data-module="${e.id}" data-id="${i?d(i.id):""}" novalidate class="p-5 sm:p-7">
        <div class="grid min-w-0 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          ${e.fields.map(x=>J(x,o[x.name]??"",n[x.name],r)).join("")}
        </div>
        <div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <a href="${i?`#/module/${e.id}/${encodeURIComponent(i.id)}`:`#/module/${e.id}`}" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold text-[#566a60] hover:bg-canvas">
            ยกเลิก
          </a>
          <button type="submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">
            ${$("check",18)}${a?"บันทึกการแก้ไข":"บันทึกข้อมูล"}
          </button>
        </div>
      </form>
    </section>
  `}async function me(e,t,{navigate:i=Q,showToast:n=H,refreshData:s=T}={}){if(await se({title:"ยืนยันการลบรายการ",message:"รายการนี้จะถูกลบออกจากฐานข้อมูลอย่างถาวร คุณต้องการดำเนินการต่อหรือไม่?",confirmText:"ลบรายการ",variant:"danger",iconName:"trash"}))try{const a=`${R(e)}/${t}`;await V(a,{method:"DELETE"}),n("ลบรายการเรียบร้อยแล้ว"),await s(),i(`/module/${e}`)}catch(a){n(a.message||"ไม่สามารถลบรายการได้","error")}}async function fe(e){const t=e.dataset.module,i=j.find(a=>a.id===t);if(!i)return;const{data:n,errors:s}=Y(e,i,c),r=e.dataset.id?v.find(a=>String(a.id)===e.dataset.id&&a.module===i.id):null;if(Object.keys(s).length){F=n;const a=A.find(x=>x.id===i.group),o=S({module:i,group:a,record:r,errors:s,values:n,references:c}),m=document.querySelector("#main-content");m&&(m.innerHTML=o),document.querySelector('[aria-invalid="true"]')?.focus();return}try{const a=r?`${R(i.id)}/${r.id}`:R(i.id),m=await V(a,{method:r?"PUT":"POST",body:n});F=null,await T(),Q(`/module/${i.id}/${m.data.id}`),H("บันทึกข้อมูลแล้ว")}catch(a){F=n;const o=a.fieldErrors||Object.fromEntries(Object.entries(a.fields||{}).map(([g,w])=>[g,Array.isArray(w)?w[0]:w]));H(a.message||"ไม่สามารถบันทึกข้อมูลได้","error");const m=A.find(g=>g.id===i.group),x=S({module:i,group:m,record:r,errors:o,values:n,references:c}),u=document.querySelector("#main-content");u&&(u.innerHTML=x),document.querySelector('[aria-invalid="true"]')?.focus()}}async function be(e){X||await T();const t=e.parts[1],i=j.find(a=>a.id===t);if(!i)return'<div class="p-8 text-center text-muted">ไม่พบข้อมูลโมดูลงานบริการ</div>';const n=A.find(a=>a.id===i.group);if(e.parts.length===2)return Z({module:i,group:n,params:e.params,records:v,references:c});if(e.parts.length===3&&e.parts[2]==="new")return f(`${i.id}.create`)?S({module:i,group:n,record:null,references:c}):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์สร้างข้อมูลในหมวดนี้</div>';const s=decodeURIComponent(e.parts[2]||""),r=v.find(a=>a.module===i.id&&String(a.id)===s);return r?e.parts.length===4&&e.parts[3]==="edit"?f(`${i.id}.update`)?S({module:i,group:n,record:r,references:c}):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์แก้ไขข้อมูลในหมวดนี้</div>':ee({module:i,group:n,record:r,references:c}):'<div class="p-8 text-center text-muted">ไม่พบรายการข้อมูลที่ต้องการ</div>'}const ve=Object.freeze(Object.defineProperty({__proto__:null,deleteActivity:me,detailPage:ee,fieldInput:J,formPage:S,formatField:I,getActivityRecords:de,getActivityReferences:ue,listPage:Z,refreshActivityData:T,renderActivitiesView:be,setActivityRecords:ce,setActivityReferences:pe,submitActivity:fe,validateForm:Y},Symbol.toStringTag,{value:"Module"}));export{we as a,A as b,ve as c,de as g,ye as i,j as m,Q as n,T as r};
