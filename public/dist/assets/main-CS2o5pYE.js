const Te=[{id:"cleaning",label:"งานบริการรักษาความสะอาด",short:"รักษาความสะอาด",icon:"sparkles",tone:"mint"},{id:"waste",label:"งานบริการมูลฝอย",short:"บริการมูลฝอย",icon:"recycle",tone:"sky"},{id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",short:"จัดการสิ่งปฏิกูล",icon:"droplet",tone:"amber"},{id:"projects",label:"งานพัฒนาระบบจัดการมูลฝอย",short:"พัฒนาระบบ",icon:"chart",tone:"violet"}],se={name:"service_date",label:"วันที่ดำเนินงาน",type:"date",required:!0},re=[{id:"road-washings",group:"cleaning",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",short:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",icon:"road",titleField:"location",fields:[se,{name:"cleaning_zone_id",label:"เขตรักษาความสะอาด",type:"reference",reference:"cleaning-zones",required:!0},{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0}]},{id:"waterway-cleanings",group:"cleaning",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",short:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",icon:"waves",titleField:"waterway_name",fields:[{...se,label:"วันเริ่ม"},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"waterway_name",label:"ชื่อแหล่งน้ำ",type:"text",required:!0},{name:"distance_km",label:"ระยะทางปฏิบัติงาน",type:"number",unit:"เมตร",required:!0},{name:"quantity",label:"ปริมาณที่กำจัดได้",type:"number",unit:"ลูกบาศก์เมตร",required:!0}]},{id:"road-sweepings",group:"cleaning",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",short:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",icon:"sparkles",titleField:"road",fields:[se,{name:"road",label:"ถนน",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0}]},{id:"outsourced-cleanings",group:"cleaning",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",short:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",icon:"users",titleField:"location",fields:[se,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0},{name:"community",label:"ชุมชน",type:"text",required:!0}]},{id:"waste-collections",group:"waste",label:"งานบริหารจัดการมูลฝอย",short:"งานบริหารจัดการมูลฝอย",icon:"recycle",titleField:"source",fields:[{...se,label:"วันเริ่ม"},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"source",label:"แหล่งที่เก็บ",type:"text",required:!0},{name:"waste_type_id",label:"ประเภทขยะมูลฝอย",type:"reference",reference:"waste-types",required:!0},{name:"weight",label:"น้ำหนัก",type:"number",unit:"กิโลกรัม",required:!0},{name:"hazardous_waste_name",label:"ชื่อขยะอันตราย",type:"text",required:!1,wasteTypeCode:"WASTE-004"}]},{id:"drain-cleanings",group:"sanitation",label:"งานลอกท่อระบายน้ำ",short:"ลอกท่อระบายน้ำ",icon:"droplet",titleField:"location",fields:[{...se,label:"วันเริ่ม"},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"location",label:"สถานที่",type:"text",required:!0},{name:"drain_work_type_id",label:"ประเภทงาน",type:"reference",reference:"drain-work-types",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"เมตร",required:!0},{name:"sediment_quantity",label:"ปริมาณตะกอน",type:"number",unit:"ลูกบาศก์เมตร",required:!0}]},{id:"septic-pumpings",group:"sanitation",label:"งานสูบสิ่งปฏิกูล",short:"สูบสิ่งปฏิกูล",icon:"truck",titleField:"service_date",fields:[{...se,label:"วันเริ่ม"},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"service_users_count",label:"จำนวนผู้ใช้บริการ",type:"integer",unit:"คน",min:1,required:!0},{name:"volume",label:"ปริมาตรสิ่งปฏิกูลรวม",type:"number",unit:"ลูกบาศก์เมตร",required:!0},{name:"fee_amount",label:"ค่าธรรมเนียม",type:"number",unit:"บาท",required:!0}]},{id:"septic-treatments",group:"sanitation",label:"การบำบัดสิ่งปฏิกูล",short:"บำบัดสิ่งปฏิกูล",icon:"flask",titleField:"service_date",fields:[{...se,label:"วันเริ่ม"},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"treated_volume",label:"บำบัดสิ่งปฏิกูลรวม",type:"number",unit:"ลูกบาศก์เมตร",required:!0},{name:"sludge_quantity",label:"ปริมาณตะกอนสำหรับทำปุ๋ย",type:"number",unit:"กิโลกรัม",required:!0},{name:"fertilizer_remaining",label:"ปุ๋ยอินทรีย์สูตร 2 คงเหลือ",type:"number",unit:"กิโลกรัม",required:!0},{name:"microbial_note",label:"ข้อมูลการใส่น้ำจุลินทรีย์ชีวภาพ",type:"textarea",required:!0}]},{id:"waste-management-projects",group:"projects",label:"โครงการพัฒนาระบบจัดการมูลฝอย",short:"โครงการพัฒนา",icon:"chart",titleField:"project_name",fields:[se,{name:"project_name",label:"ชื่อโครงการ",type:"text",required:!0},{name:"communities_count",label:"จำนวนชุมชนที่เข้าร่วม",type:"integer",unit:"ชุมชน",required:!0},{name:"participants_count",label:"ผู้เข้าร่วมโครงการ",type:"integer",unit:"คน",required:!0}]}];class Pe extends Error{constructor(t,a=0,r=null){super(t),this.name="ApiError",this.status=a,this.data=r,this.errors=r&&typeof r=="object"&&r.errors?r.errors:{}}get fieldErrors(){const t={};if(!this.errors||typeof this.errors!="object")return t;for(const[a,r]of Object.entries(this.errors))t[a]=Array.isArray(r)?r[0]||"":String(r||"");return t}get isValidationError(){return this.status===422}get isRateLimited(){return this.status===429}get isUnauthorized(){return this.status===401||this.status===419}get isForbidden(){return this.status===403}}function ba(){return document.querySelector('meta[name="csrf-token"]')?.content||""}function xa(){return window.serviceHubUrls?.login||"/login"}function g(e){const t=window.serviceHubUser;return t?(Array.isArray(t.roles)?t.roles:[]).includes("super-admin")?!0:(Array.isArray(t.permissions)?t.permissions:[]).includes(e):!1}const ha=["super-admin","admin"];function Ce(){const e=window.serviceHubUser?.roles??[];return Array.isArray(e)&&e.some(t=>ha.includes(t))}function Ve(e){if(!Ce())return!1;if((window.serviceHubUser?.roles??[]).includes("super-admin"))return!0;const a=window.serviceHubUser?.permissions??[];return Array.isArray(a)&&a.includes(e)}function Ae(e){return(window.serviceHubUrls?.apiActivities||"/api/activities/__MODULE__").replace("__MODULE__",encodeURIComponent(e))}function rt(e){return(window.serviceHubUrls?.apiReferences||"/api/references/__TYPE__").replace("__TYPE__",encodeURIComponent(e))}async function H(e,t={}){const a=ba(),r={Accept:"application/json","X-Requested-With":"XMLHttpRequest",...a?{"X-CSRF-TOKEN":a}:{},...t.headers||{}};let s=t.body;const n=typeof FormData<"u"&&s instanceof FormData,i=typeof Blob<"u"&&s instanceof Blob,o=typeof URLSearchParams<"u"&&s instanceof URLSearchParams;s&&typeof s=="object"&&!n&&!i&&!o&&(s=JSON.stringify(s),r["Content-Type"]||(r["Content-Type"]="application/json"));let l;try{l=await fetch(e,{credentials:"same-origin",...t,headers:r,body:s})}catch(u){throw u instanceof Pe?u:new Pe(u.message||"ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง",0)}if(l.status===401||l.status===419){const u=xa();throw window.location.assign(u),new Pe("เซสชันของคุณหมดอายุ กรุณาเข้าสู่ระบบใหม่",l.status)}const d=await l.json().catch(()=>({}));if(!l.ok){let u=d.message,m=0;if(l.status===429){const b=l.headers?.get?.("Retry-After"),v=Number(b);m=Number.isFinite(v)&&v>0?Math.ceil(v):Math.max(0,Math.ceil((Date.parse(b||"")-Date.now())/1e3)||0),u=m?`คำขอส่งมาถี่เกินไป กรุณารอ ${m} วินาทีแล้วลองใหม่อีกครั้ง`:"คำขอส่งมาถี่เกินไป กรุณารอสักครู่แล้วลองใหม่อีกครั้ง (Too Many Attempts)"}else l.status===403?u=u||"คุณไม่มีสิทธิ์ดำเนินการในส่วนนี้":l.status===422?u=u||"ข้อมูลที่ส่งไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง":u=u||`เกิดข้อผิดพลาด (${l.status})`;const p=new Pe(u,l.status,d);throw p.fields=d.errors||{},p.retryAfterSeconds=m,p}return d}async function Kt(e,t={}){let a=1;const r=[];for(;;){const s=e.includes("?")?"&":"?",n=`${e}${s}per_page=100&page=${a}`,i=await H(n,t);Array.isArray(i.data)&&r.push(...i.data);const o=i.meta?.last_page||1;if(a>=o)break;a++}return r}const Wt=" — เทศบาลนครนนทบุรี",ct="/dashboard";function Ke(e=window.location.hash){let t=e||"";if(t.startsWith("#")&&(t=t.slice(1)),t.startsWith("figmacapture="))return{hash:"#/dashboard",path:"/dashboard",parts:["dashboard"],params:new URLSearchParams,query:{}};const[a,r=""]=(t||ct).split("?"),s=a.startsWith("/")?a:`/${a}`,n=s.split("/").filter(Boolean),i=new URLSearchParams(r),o=Object.fromEntries(i.entries());return{hash:`#${s}${r?`?${r}`:""}`,path:s,parts:n.length?n:["dashboard"],params:i,query:o}}function Q(){return Ke()}function jt(e,t=Wt){const a=(e||"แดชบอร์ดฝ่ายบริการ").trim();a.endsWith(t.trim())?document.title=a:document.title=`${a}${t}`}function ga(e){const[t,a]=e.parts;return t==="dashboard"||!e.parts.length?"แดชบอร์ดฝ่ายบริการ":t==="login"?"เข้าสู่ระบบ":t==="users"?"จัดการผู้ใช้งาน":t==="profile"?"โปรไฟล์ส่วนบุคคล":t==="audit-logs"?"ประวัติการแก้ไข":t==="cleaning-zones"?"เขตรักษาความสะอาด":t==="drain-work-types"?"ประเภทงานลอกท่อ":t==="waste-types"?"ประเภทขยะมูลฝอย":t==="reports"?re.find(s=>s.id===a)?.short||"รายงาน":t==="module"?re.find(s=>s.id===a)?.short||"งานบริการ":"แดชบอร์ดฝ่ายบริการ"}class wa{constructor(t={},a={}){let r={};t&&typeof t=="object"&&!t.defaultRoute&&!t.routes?r={routes:t,...a}:r=t||{},this.routes={},this.options={defaultRoute:ct,titleSuffix:Wt,...r},this.current=Ke(),this.beforeHooks=[],this.afterHooks=[],this.notFoundHandler=null,this.navigationSequence=0,this.options.routes&&this.registerRoutes(this.options.routes)}registerRoutes(t){for(const[a,r]of Object.entries(t))typeof r=="function"?this.routes[a]={handler:r}:this.routes[a]=r}setNotFound(t){this.notFoundHandler=t}beforeEach(t){this.beforeHooks.push(t)}afterEach(t){this.afterHooks.push(t)}navigate(t,a={}){let r=t||ct;r.startsWith("#")&&(r=r.slice(1)),r.startsWith("/")||(r=`/${r}`);const s=`#${r}`;window.location.hash===s?this.resolve():a.replace?window.location.replace(s):window.location.hash=s,a.noScroll||window.scrollTo({top:0,behavior:"smooth"})}async checkGuards(t,a){if(t.parts[0]==="login"){const s=window.serviceHubUrls?.login||"/login";return window.location.replace(s),!1}for(const s of this.beforeHooks){const n=await s(t);if(n===!1)return!1;if(typeof n=="string")return n}if(a?.guard){const s=await a.guard(t);if(s===!1)return!1;if(typeof s=="string")return s}const r=t.parts[0];if(r==="users"&&!Ce()||r==="audit-logs"&&!g("audit-logs.view")||r==="cleaning-zones"&&!g("cleaning-zones.view")||r==="drain-work-types"&&!g("drain-work-types.view")||r==="waste-types"&&!g("waste-types.view"))return!1;if(r==="module"&&t.parts[1]){const s=t.parts[1];if(!g(`${s}.view`))return!1}return!0}async resolve(){const t=++this.navigationSequence,a=Ke();a.isCurrent=()=>t===this.navigationSequence&&Ke().hash===a.hash,this.current=a;const r=a.parts[0]||"dashboard",s=this.routes[r]||this.routes["*"],n=await this.checkGuards(a,s);if(!a.isCurrent())return;if(n===!1){typeof this.options.onDenied=="function"?await this.options.onDenied(a):this.notFoundHandler&&await this.notFoundHandler(a),jt("ไม่พบหน้าหรือไม่มีสิทธิ์เข้าถึง",this.options.titleSuffix);return}if(typeof n=="string"){this.navigate(n);return}let i="";s?.title?i=typeof s.title=="function"?s.title(a):s.title:i=ga(a),jt(i,this.options.titleSuffix);try{s?.handler?await s.handler(a):this.notFoundHandler&&await this.notFoundHandler(a)}catch(o){if(!a.isCurrent())return;if(typeof this.options.onError=="function")await this.options.onError(o,a);else throw o;return}if(a.isCurrent()){for(const o of this.afterHooks)o(a);typeof this.options.afterRender=="function"&&this.options.afterRender(a)}}init(){window.addEventListener("hashchange",()=>this.resolve()),this.resolve()}}let Ee=null;function va(e={},t={}){return Ee=new wa(e,t),Ee.init(),Ee}function U(e,t={}){Ee?Ee.navigate(e,t):(window.location.hash=e.startsWith("#")?e:`#${e}`,window.scrollTo({top:0,behavior:"smooth"}))}const c=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),q=(e,t={})=>new Intl.NumberFormat("th-TH",{maximumFractionDigits:2,...t}).format(Number(e)||0);function F(e){if(!e)return"—";const t=String(e).slice(0,10);return new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Bangkok"}).format(new Date(`${t}T12:00:00+07:00`))}const ya={"super-admin":"ผู้ดูแลระบบสูงสุด",admin:"ผู้ดูแลระบบ",staff:"เจ้าหน้าที่",viewer:"ผู้ดูข้อมูล",auditor:"ผู้ตรวจสอบระบบ"},$a={"super-admin":"border-red-200 bg-red-50 text-red-700",admin:"border-amber-200 bg-amber-50 text-amber-700",staff:"border-teal-200 bg-teal-50 text-teal-800",viewer:"border-gray-200 bg-gray-50 text-gray-700",auditor:"border-blue-200 bg-blue-50 text-blue-700"};function Zt(e){const t=String(e||"").trim().split(/\s+/);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():String(e||"?")[0].toUpperCase()}const oe=e=>`#/module/${e}`,Ut={grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',sparkles:'<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 17 .7 1.3L21 19l-1.3.7L19 21l-.7-1.3L17 19l1.3-.7L19 17ZM4 17l.5 1L6 18.5 4.5 19 4 20l-.5-1L2 18.5l1.5-.5L4 17Z"/>',recycle:'<path d="m7 19-2-3.4a2 2 0 0 1 0-2l1-1.7M9 5h5.2a2 2 0 0 1 1.7 1l1.4 2.4M19 11l2 3.5a2 2 0 0 1 0 2l-1.4 2.4a2 2 0 0 1-1.7 1H13"/><path d="m4 12 2.8-.8L7.5 14M17 7.5l.5 3 2.8-.9M11 21l2-2-2-2"/>',droplet:'<path d="M12 22a8 8 0 0 0 8-8c0-4.4-8-12-8-12S4 9.6 4 14a8 8 0 0 0 8 8Z"/>',chart:'<path d="M3 3v18h18"/><path d="m7 16 4-5 3 2 5-7"/>',road:'<path d="M7 3 4 21M17 3l3 18M12 3v3m0 4v4m0 4v3"/>',waves:'<path d="M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',truck:'<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',flask:'<path d="M9 3h6M10 3v7l-5.5 9a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 10V3M8 16h8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',plus:'<path d="M12 5v14M5 12h14"/>',arrow:'<path d="m5 12 14 0m-6-6 6 6-6 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="M18 6 6 18M6 6l12 12"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',ellipsis:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L10 16l-4 1 1-4 9.5-9.5Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',empty:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 10h8M8 14h5"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',login:'<path d="M10 17l5-5-5-5M15 12H3M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',lock:'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',eyeOff:'<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>'};function f(e,t=20,a="",r={}){const s=Ut[e];s||typeof process>"u"&&console.warn(`[icons] ไม่พบ icon ชื่อ "${e}" — ใช้ "grid" แทน`);const n=s||Ut.grid,o=!!(r["aria-label"]||r.title||r.role==="img")?'role="img"':'aria-hidden="true"',l=Object.entries(r).filter(([d])=>d!=="aria-hidden"&&d!=="role").map(([d,u])=>`${d}="${c(u)}"`).join(" ");return`<svg class="${a}" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${o} ${l}>${n}</svg>`}function z(e,t,a,r=""){return`<div class="mb-5 flex min-w-0 max-w-full flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end">
    <div class="min-w-0 max-w-full flex-1">
      <p class="mb-1 type-helper text-primary sm:mb-1.5">${c(e)}</p>
      <h1 class="type-page-title break-words text-ink">${c(t)}</h1>
      <p class="mt-1.5 break-words text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">${c(a)}</p>
    </div>
    ${r?`<div class="w-full shrink-0 sm:w-auto">${r}</div>`:""}
  </div>`}const we=(e,t,a="plus")=>`<a href="${t}" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm type-primary-action text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${f(a,18)}${c(e)}</a>`,Z=(e,t,a="arrow")=>`<a href="${t}" class="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm type-body text-ink transition hover:border-[#afcfc0] hover:bg-[#f8fbf8]">${c(e)}${f(a,17)}</a>`;let Ct=null,ae=null;function Yt(){return ae&&document.body.contains(ae)||(ae=document.getElementById("toast-container"),ae||(ae=document.createElement("div"),ae.id="toast-container",ae.className="fixed inset-x-4 bottom-4 z-[70] flex flex-col gap-2 sm:inset-x-auto sm:bottom-5 sm:right-5 pointer-events-none",document.body.appendChild(ae))),ae}function R(e,t="success"){const a=Yt();a.innerHTML="",clearTimeout(Ct);const r=t==="error",s=r?"border-red-200 bg-white text-red-700":"border-[#c6e9d8] bg-white text-primary-dark",n=r?"info":"check",i=document.createElement("div");i.role="status",i.setAttribute("aria-live","polite"),i.className=`app-toast pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold shadow-xl transition-all duration-200 ${s}`,i.innerHTML=`
    ${f(n,19,"shrink-0")}
    <span class="flex-1">${c(e)}</span>
    <button type="button" class="ml-2 rounded-lg p-1 text-muted hover:bg-canvas transition" aria-label="ปิดข้อความ">
      ${f("close",17)}
    </button>
  `,i.querySelector("button")?.addEventListener("click",()=>{i.remove()}),a.appendChild(i),Ct=setTimeout(()=>{i.remove()},4200)}function fe(){document.querySelectorAll("select.field:not(.custom-select-applied):not(.master-native-select)").forEach(e=>{e.classList.add("custom-select-applied"),e.style.display="none";const t=document.createElement("div");t.className="relative w-full";const a=document.createElement("button");a.type="button",a.className=e.className.replace("custom-select-applied","").replace("hidden","")+" flex items-center justify-between text-left";const r=()=>'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';a.innerHTML=`<span class="truncate">${e.options[e.selectedIndex]?.text||""}</span>${r()}`,e.getAttribute("aria-invalid")==="true"&&a.setAttribute("aria-invalid","true");const s=document.createElement("div");s.className="absolute left-0 top-[calc(100%+6px)] z-20 hidden w-full overflow-y-auto max-h-60 rounded-xl border border-line bg-white shadow-xl custom-select-menu py-1";const n=()=>{a.innerHTML=`<span class="truncate">${e.options[e.selectedIndex]?.text||""}</span>${r()}`},i=Array.from(e.options).filter(o=>!o.disabled);i.forEach(o=>{const l=document.createElement("div");l.className=`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${o.selected?"bg-[#f0f8f2] font-bold text-primary":""}`,l.textContent=o.text,l.onclick=()=>{e.value=o.value,e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})),s.classList.add("hidden"),n(),Array.from(s.children).forEach((d,u)=>{d.className=`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${i[u].selected?"bg-[#f0f8f2] font-bold text-primary":""}`})},s.appendChild(l)}),a.onclick=o=>{o.preventDefault();const l=!s.classList.contains("hidden");document.querySelectorAll(".custom-select-menu").forEach(d=>d.classList.add("hidden")),l||s.classList.remove("hidden")},e.parentNode.insertBefore(t,e),t.appendChild(a),t.appendChild(s),t.appendChild(e)})}const ze=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],ka=["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],V=e=>String(e).padStart(2,"0"),Gt=e=>`${String(e.getUTCFullYear()).padStart(4,"0")}-${V(e.getUTCMonth()+1)}-${V(e.getUTCDate())}`,be=(e,t,a)=>{const r=new Date(0);return r.setUTCFullYear(e,t-1,a),r.setUTCHours(0,0,0,0),r};function $t(e,t="date"){const a=String(e).match(t==="month"?/^(\d{4})-(\d{2})$/:/^(\d{4})-(\d{2})-(\d{2})$/);if(!a)return!1;const[,r,s,n="1"]=a,i=be(+r,+s,+n);return+r>=1&&+r<=9999&&i.getUTCFullYear()===+r&&i.getUTCMonth()+1===+s&&i.getUTCDate()===+n}function Xt(e,t="date"){if(!String(e).trim())return"";const a=String(e).trim().match(t==="month"?/^(\d{1,2})\/(\d{4,5})$/:/^(\d{1,2})\/(\d{1,2})\/(\d{4,5})$/);if(!a)return null;const r=a.slice(1).map(Number),s=r.at(-1)-543,n=t==="month"?r[0]:r[1],i=`${String(s).padStart(4,"0")}-${V(n)}${t==="month"?"":`-${V(r[0])}`}`;return $t(i,t)?i:null}function _a(e,t="date"){if(!$t(e,t))return"";const[a,r,s]=e.split("-").map(Number);return`${t==="month"?"":`${V(s)}/`}${V(r)}/${a+543}`}function qe(){const e=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Bangkok",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date);return["year","month","day"].map(t=>e.find(a=>a.type===t).value).join("-")}function Sa(e,t,a=!1){const[r,s,n]=e.split("-").map(Number),i=be(r,s,n),o={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7,Home:-i.getUTCDay(),End:6-i.getUTCDay()};if(t in o)i.setUTCDate(n+o[t]);else if(t==="PageUp"||t==="PageDown"){const l=(t==="PageUp"?-1:1)*(a?12:1);i.setUTCDate(1),i.setUTCMonth(i.getUTCMonth()+l);const d=be(i.getUTCFullYear(),i.getUTCMonth()+2,0).getUTCDate();i.setUTCDate(Math.min(n,d))}return Gt(i)}const Le=new WeakMap;let j=null,Dt=!1,qa=0;function kt(e){const{canonical:t,text:a,button:r}=e;a.value=_a(t.value,e.mode),a.disabled=r.disabled=t.disabled,e.committed=t.value,a.setCustomValidity(!t.value&&a.required?"กรุณาระบุวันที่ พ.ศ.":""),a.removeAttribute("aria-invalid")}function ut(e=document){e.querySelectorAll("[data-thai-canonical]").forEach(t=>kt(Le.get(t)))}function We(e,t,a=!0){const r=e.committed!==t;e.canonical.value=t,kt(e),r&&a&&e.canonical.dispatchEvent(new Event("change",{bubbles:!0}))}function Jt(e,t){const a=Xt(e.text.value,e.mode);let r=a===null?`กรุณากรอก${e.mode==="month"?"เดือน/ปี":"วัน/เดือน/ปี"} พ.ศ. ที่ถูกต้อง`:"";return a===""&&e.text.required&&(r="กรุณาระบุวันที่ พ.ศ."),a&&(e.min&&a<e.min||e.max&&a>e.max)&&(r="วันที่อยู่นอกช่วงที่กำหนด"),e.text.setCustomValidity(r),r?(e.canonical.value="",e.text.setAttribute("aria-invalid","true"),!1):(We(e,a,t),!0)}function de(e=!0){if(!j)return;const{dialog:t,binding:a}=j;j=null,t.remove(),a.button.setAttribute("aria-expanded","false"),e&&a.text.isConnected&&a.text.focus()}function Ne(e=null){const t=j,{binding:a,dialog:r,year:s,month:n}=t,i=a.canonical.value,o=qe(),l=`พ.ศ. ${s+543}`,d=m=>a.min&&m<a.min||a.max&&m>a.max;let u;if(a.mode==="month")u=`<div class="grid grid-cols-3 gap-1">${ze.map((m,p)=>{const b=`${String(s).padStart(4,"0")}-${V(p+1)}`;return`<button type="button" data-value="${b}" class="rounded-lg border border-line px-1 py-3 text-xs ${i===b?"bg-primary text-white":""}" ${d(b)?"disabled":""} aria-label="${m} ${l}">${m}</button>`}).join("")}</div>`;else{const m=be(s,n,1),p=be(s,n+1,0).getUTCDate(),b=Array.from({length:p},(D,T)=>`${String(s).padStart(4,"0")}-${V(n)}-${V(T+1)}`).filter(D=>!d(D)),v=e||t.focusDate,$=b.includes(v)?v:b[0],k=Array.from({length:Math.ceil((m.getUTCDay()+p)/7)*7},(D,T)=>{const A=T-m.getUTCDay()+1;if(A<1||A>p)return"<td></td>";const E=`${String(s).padStart(4,"0")}-${V(n)}-${V(A)}`,le=E===i,h=new Intl.DateTimeFormat("th-TH-u-ca-buddhist",{dateStyle:"full",timeZone:"UTC"}).format(be(s,n,A));return`<td role="gridcell" aria-selected="${le}"><button type="button" data-value="${E}" tabindex="${E===$?0:-1}" aria-label="${c(h)}" ${E===o?'aria-current="date"':""} ${d(E)?"disabled":""} class="h-9 w-full rounded-lg text-sm ${le?"bg-primary text-white":E===o?"border border-primary":"hover:bg-canvas"}">${A}</button></td>`}),_=Array.from({length:k.length/7},(D,T)=>`<tr>${k.slice(T*7,T*7+7).join("")}</tr>`).join("");u=`<table role="grid" aria-label="${ze[n-1]} ${l}" class="w-full table-fixed"><thead><tr>${ka.map(D=>`<th scope="col" class="py-2 text-xs text-muted">${D}</th>`).join("")}</tr></thead><tbody>${_}</tbody></table>`}r.innerHTML=`<div class="flex items-center justify-between gap-2"><h2 id="thai-calendar-title" class="font-bold" aria-live="polite">${a.mode==="month"?"เลือกเดือน":ze[n-1]} ${l}</h2><button type="button" data-calendar="close" class="min-h-11 px-2 text-sm text-primary">ปิด</button></div>
    <div class="my-2 flex items-center gap-2"><button type="button" data-calendar="previous" aria-label="${a.mode==="month"?"ปีก่อนหน้า":"เดือนก่อนหน้า"}" class="min-h-11 px-2">‹</button>${a.mode==="date"?`<label class="min-w-0 flex-1"><span class="sr-only">เดือน</span><select data-calendar="month" class="field text-sm">${ze.map((m,p)=>`<option value="${p+1}" ${n===p+1?"selected":""}>${m}</option>`).join("")}</select></label>`:""}<label class="min-w-0 flex-1"><span class="sr-only">ปี พ.ศ.</span><input data-calendar="year" type="number" class="field text-sm" min="544" max="10542" value="${s+543}"></label><button type="button" data-calendar="next" aria-label="${a.mode==="month"?"ปีถัดไป":"เดือนถัดไป"}" class="min-h-11 px-2">›</button></div>${u}<p class="mt-2 text-xs text-muted">ใช้ลูกศรเลือกวัน Enter เพื่อยืนยัน และ Escape เพื่อปิด</p><div class="mt-3 flex justify-between gap-2"><button type="button" data-calendar="clear" class="min-h-11 px-3 text-primary">ล้างค่า</button><button type="button" data-calendar="today" class="min-h-11 px-3 text-primary">${a.mode==="month"?"เดือนนี้":"วันนี้"}</button></div>`,e&&r.querySelector(`[data-value="${e}"]`)?.focus()}function Mt(e){de(!1);let t=e.canonical.value||(e.mode==="month"?qe().slice(0,7):qe());e.min&&t<e.min&&(t=e.min),e.max&&t>e.max&&(t=e.max);const[a,r,s=1]=t.split("-").map(Number),n=document.createElement("dialog");n.id="thai-calendar",n.className="thai-calendar rounded-2xl border border-line bg-white p-3 text-ink shadow-xl",n.setAttribute("aria-labelledby","thai-calendar-title"),document.body.append(n),j={binding:e,dialog:n,year:a,month:r,focusDate:`${String(a).padStart(4,"0")}-${V(r)}-${V(s)}`},e.button.setAttribute("aria-expanded","true"),Ne(),n.addEventListener("cancel",i=>{i.preventDefault(),de()}),n.addEventListener("click",i=>{const o=i.target.closest("button");if(!o||!j)return;if(o.dataset.value){We(e,o.dataset.value),de();return}const l=o.dataset.calendar;if(l==="close")de();else if(l==="clear")We(e,""),de();else if(l==="today"){const d=e.mode==="month"?qe().slice(0,7):qe();e.min&&d<e.min||e.max&&d>e.max||(We(e,d),de())}else if(l==="previous"||l==="next"){const d=be(j.year,j.month,1);if(d.setUTCMonth(d.getUTCMonth()+(l==="previous"?-1:1)*(e.mode==="month"?12:1)),d.getUTCFullYear()<1||d.getUTCFullYear()>9999)return;j.year=d.getUTCFullYear(),j.month=d.getUTCMonth()+1,j.focusDate=Gt(d),Ne(),n.querySelector(`[data-calendar="${l}"]`)?.focus()}}),n.addEventListener("change",i=>{const o=i.target.dataset.calendar;if(o==="month")j.month=Number(i.target.value);else if(o==="year"){const l=Number(i.target.value)-543;if(!Number.isInteger(l)||l<1||l>9999){i.target.value=j.year+543;return}j.year=l}else return;j.focusDate=`${String(j.year).padStart(4,"0")}-${V(j.month)}-01`,Ne(),n.querySelector(`[data-calendar="${o}"]`)?.focus()}),n.addEventListener("keydown",i=>{if(i.key==="Escape"){i.preventDefault(),de();return}if(i.key==="Tab"){const u=[...n.querySelectorAll('button:not([disabled]):not([tabindex="-1"]), input, select')],m=u[0],p=u.at(-1);i.shiftKey&&document.activeElement===m?(i.preventDefault(),p.focus()):!i.shiftKey&&document.activeElement===p&&(i.preventDefault(),m.focus())}if(e.mode!=="date"||!i.target.dataset.value||!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown"].includes(i.key))return;i.preventDefault();const o=Sa(i.target.dataset.value,i.key,i.shiftKey);if(!$t(o)||e.min&&o<e.min||e.max&&o>e.max)return;const[l,d]=o.split("-").map(Number);j.year=l,j.month=d,j.focusDate=o,Ne(o)}),n.showModal(),(n.querySelector('[data-value][tabindex="0"]:not([disabled])')||n.querySelector('[data-calendar="close"]')).focus()}function Rt(e=document){e.querySelectorAll('input[type="date"], input[type="month"]').forEach(t=>{const a=t.type,r=document.createElement("input"),s=t.id,n=s===t.name&&s?`${s}-display`:s||`thai-date-${++qa}`;if(n!==s&&s)for(const u of t.labels||[])u.htmlFor===s&&(u.htmlFor=n);r.type="text",r.id=n,r.className=t.className,r.inputMode="numeric",r.autocomplete="off",r.required=t.required,r.placeholder=a==="month"?"เดือน/ปี พ.ศ.":"วัน/เดือน/ปี พ.ศ.",r.setAttribute("aria-describedby",`${t.getAttribute("aria-describedby")||""} ${n}-format`.trim()),t.hasAttribute("aria-invalid")&&r.setAttribute("aria-invalid",t.getAttribute("aria-invalid")),r.setAttribute("data-thai-display","");const i=document.createElement("span");i.className="thai-date-field";const o=document.createElement("button");o.type="button",o.className="thai-date-open",o.textContent="▦",o.setAttribute("aria-label",a==="month"?"เปิดตัวเลือกเดือนภาษาไทย":"เปิดปฏิทินภาษาไทย"),o.setAttribute("aria-haspopup","dialog"),o.setAttribute("aria-expanded","false"),o.setAttribute("aria-controls","thai-calendar");const l=document.createElement("span");l.id=`${n}-format`,l.className="sr-only",l.textContent=a==="month"?"กรอกเดือน/ปี พ.ศ. เช่น 10/2569":"กรอกวัน/เดือน/ปี พ.ศ. เช่น 09/10/2569",t.before(i),i.append(t,r,o,l),t.type="hidden",t.id=`${n}-iso`,t.required=!1,t.dataset.thaiCanonical=a;const d={canonical:t,text:r,button:o,mode:a,min:t.min,max:t.max,initialValue:t.value};Le.set(t,d),kt(d),t.getAttribute("aria-invalid")==="true"&&r.setAttribute("aria-invalid","true"),r.addEventListener("input",()=>{const u=Xt(r.value,a);r.setCustomValidity(u===null?"กรุณากรอกวันที่ พ.ศ. ให้ครบและถูกต้อง":u===""&&r.required?"กรุณาระบุวันที่ พ.ศ.":""),u===null&&(t.value="")}),r.addEventListener("change",()=>Jt(d,!0)),r.addEventListener("keydown",u=>{u.key==="ArrowDown"&&u.altKey&&(u.preventDefault(),Mt(d))}),o.addEventListener("click",()=>Mt(d))})}function Ea(e){Dt||(Dt=!0,Rt(e),new MutationObserver(()=>{j&&!j.binding.text.isConnected&&de(!1),Rt(e),e.querySelectorAll("[data-thai-canonical]").forEach(t=>{const a=Le.get(t);a.text.disabled!==t.disabled&&(a.text.disabled=t.disabled),a.button.disabled!==t.disabled&&(a.button.disabled=t.disabled)})}).observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["disabled"]}),document.addEventListener("submit",t=>{const r=[...t.target.querySelectorAll("[data-thai-canonical]")].filter(s=>!s.disabled);for(const s of r){const n=Le.get(s);if(!Jt(n,!1)||!n.text.checkValidity()){t.preventDefault(),t.stopImmediatePropagation(),n.text.reportValidity(),n.text.focus();return}}},!0),document.addEventListener("reset",t=>setTimeout(()=>{t.target.querySelectorAll("[data-thai-canonical]").forEach(a=>{a.value=Le.get(a).initialValue}),ut(t.target)},0)))}function Be(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function La(e){const t=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Bangkok",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),a=n=>Number(t.find(i=>i.type===n).value),r=new Date(a("year"),a("month")-1,a("day")),s=Be(r);switch(e){case"all":return{from:"",to:""};case"today":return{from:s,to:s};case"7d":{const n=new Date(r);return n.setDate(n.getDate()-6),{from:Be(n),to:s}}case"month":{const n=new Date(r.getFullYear(),r.getMonth(),1);return{from:Be(n),to:s}}case"30d":{const n=new Date(r);return n.setDate(n.getDate()-29),{from:Be(n),to:s}}default:return{from:s,to:s}}}const Ta=[{id:"all",label:"ทั้งหมด"},{id:"today",label:"วันนี้"},{id:"7d",label:"7 วันล่าสุด"},{id:"month",label:"เดือนนี้"},{id:"30d",label:"30 วันล่าสุด"}];function st({from:e="",to:t="",formId:a="",cls:r=""}={}){return`
    <div class="flex flex-wrap items-center gap-1.5 ${r}" role="group" aria-label="ช่วงเวลาด่วน">
      <span class="text-xs font-semibold text-muted mr-1">ช่วงด่วน:</span>
      ${Ta.map(s=>{const n=La(s.id),i=s.id==="all"?!e&&!t:!!e&&e===n.from&&t===n.to;return`
          <button
            type="button"
            data-action="set-date-preset"
            data-preset="${s.id}"
            data-from="${n.from}"
            data-to="${n.to}"
            ${a?`data-form="${c(a)}"`:""}
            class="min-h-11 inline-flex items-center rounded-lg px-3 py-2 text-xs font-bold transition ${i?"bg-primary text-white shadow-xs":"border border-line bg-white text-muted hover:border-primary/40 hover:text-ink"}"
            aria-pressed="${i}"
          >
            ${c(s.label)}
          </button>
        `}).join("")}
    </div>
  `}function Aa(e,t=300){let a=null;return function(...r){clearTimeout(a),a=setTimeout(()=>{e.apply(this,r)},t)}}const ja=new URL(""+new URL("nonthaburi-logo-BUg5neRh.png",import.meta.url).href,import.meta.url).href,_t="#/cleaning-zones",St="#/waste-types",qt=[{type:"group",id:"cleaning",label:"งานบริการรักษาความสะอาด",icon:"sparkles",children:[{module:"road-washings",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",children:[{module:"cleaning-zones",href:_t,label:"เขตรักษาความสะอาด"}]},{module:"waterway-cleanings",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ"},{module:"road-sweepings",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ"},{module:"outsourced-cleanings",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม"}]},{type:"link",module:"waste-collections",label:"งานบริหารจัดการมูลฝอย",icon:"recycle",children:[{module:"waste-types",href:St,label:"ประเภทขยะมูลฝอย"}]},{type:"group",id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",icon:"droplet",children:[{module:"drain-cleanings",label:"งานลอกท่อระบายน้ำ",children:[{module:"drain-work-types",href:"#/drain-work-types",label:"ประเภทงานลอกท่อ"}]},{module:"septic-pumpings",label:"งานสูบสิ่งปฏิกูล"},{module:"septic-treatments",label:"การบำบัดสิ่งปฏิกูล"}]},{type:"link",module:"waste-management-projects",label:"โครงการต่าง ๆ",icon:"chart"}];let S=!1,I=!1,X=!1,It=!1;try{X=localStorage.getItem("servicehub.sidebar-collapsed")==="true"}catch{}const ee=new Set;function Qt(e=!X){X=e;try{localStorage.setItem("servicehub.sidebar-collapsed",String(e))}catch{}De()}function Ua(e){Qt(!1),ee.add(e);const t=document.getElementById(`sidebar-group-${e}`)||document.getElementById(`sidebar-subgroup-${e}`);t&&(t.hidden=!1),document.querySelectorAll(`[data-group="${e}"][aria-expanded]`).forEach(a=>a.setAttribute("aria-expanded","true")),document.querySelector(`[data-group="${e}"][aria-expanded] svg:last-child`)?.classList.add("rotate-180"),document.querySelector(`[data-group="${e}"][aria-expanded]`)?.focus()}function Xe(e){const t=S;S=typeof e=="boolean"?e:!S,De(),!t&&S&&document.querySelector('#sidebar [data-action="close-menu"]')?.focus(),t&&!S&&window.innerWidth<1024&&document.querySelector('[data-action="open-menu"]')?.focus()}function Je(){I=!1;const e=document.getElementById("user-menu-dropdown"),t=document.getElementById("user-menu-button");e&&(e.classList.add("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.remove("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!0),t&&(t.setAttribute("aria-expanded","false"),t.classList.remove("border-primary","bg-[#f0f8f2]"),t.querySelector("svg:last-child")?.classList.remove("rotate-180"))}function Ca(){I=!I;const e=document.getElementById("user-menu-dropdown"),t=document.getElementById("user-menu-button");e&&(I?(e.classList.remove("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.add("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!1,e.querySelector("a, button")?.focus()):(e.classList.add("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.remove("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!0,t?.focus())),t&&(t.setAttribute("aria-expanded",String(I)),t.classList.toggle("border-primary",I),t.classList.toggle("bg-[#f0f8f2]",I),t.querySelector("svg:last-child")?.classList.toggle("rotate-180",I))}function ne(e){const t=qt.find(a=>a.type==="group"&&a.children.some(r=>r.module===e||r.children?.some(s=>s.module===e)));if((e==="waste-collections"||e==="waste-types")&&ee.add("waste-collections"),t){ee.add(t.id);const a=t.children.find(r=>r.children?.some(s=>s.module===e)||r.module===e&&r.children);a&&ee.add(a.module)}}function Da(e){ee.has(e)?ee.delete(e):ee.add(e)}function De(){const e=window.innerWidth<1024;document.documentElement.classList.toggle("sidebar-collapsed",X),document.querySelectorAll('[data-action="toggle-desktop-sidebar"]').forEach(s=>{s.setAttribute("aria-expanded",String(!X)),s.setAttribute("aria-label",X?"ขยายเมนู":"ย่อเมนู")}),document.querySelectorAll(".sidebar-expanded").forEach(s=>{s.inert=!e&&X}),document.querySelectorAll(".sidebar-rail").forEach(s=>{s.inert=e||!X}),document.body.style.overflow=e&&S?"hidden":"",document.querySelectorAll(".app-shell").forEach(s=>{s.inert=e&&S});const t=document.getElementById("sidebar"),a=document.getElementById("mobile-backdrop");a&&(a.classList.toggle("opacity-100",e&&S),a.classList.toggle("pointer-events-auto",e&&S),a.classList.toggle("visible",e&&S),a.classList.toggle("opacity-0",!e||!S),a.classList.toggle("pointer-events-none",!e||!S),a.classList.toggle("invisible",!e||!S)),t&&(t.inert=e&&!S,t.setAttribute("aria-hidden",String(!S&&e)),e?(t.classList.toggle("-translate-x-full",!S),t.classList.toggle("translate-x-0",S),t.classList.toggle("invisible",!S),t.classList.toggle("pointer-events-none",!S),t.classList.toggle("visible",S),t.classList.toggle("pointer-events-auto",S)):(t.classList.remove("-translate-x-full","invisible","pointer-events-none"),t.classList.add("translate-x-0","visible","pointer-events-auto")));const r=document.querySelector('[data-action="open-menu"]');r&&r.setAttribute("aria-expanded",String(S))}function Ma(e,t){if(e.type==="link"){if(!g(`${e.module}.view`))return"";const n=t===e.module;if(!e.children)return`<a href="${oe(e.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${n?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${n?'aria-current="page"':""}>${f(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a>`;const i=e.children.filter(d=>g(`${d.module}.view`));if(!i.length)return`<a href="${oe(e.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${n?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${n?'aria-current="page"':""}>${f(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a>`;const o=i.some(d=>d.module===t),l=ee.has(e.module);return`<div class="mb-1 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${n?"nav-active":o?"bg-[#f4f9f5] text-primary-dark":"text-[#657772]"}"><a href="${oe(e.module)}" class="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-l-xl px-3 py-2.5 text-sm font-semibold leading-5 hover:bg-[#f4f7f4] hover:text-ink" ${n?'aria-current="page"':""}>${f(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${e.module}" aria-expanded="${l}" aria-controls="sidebar-subgroup-${e.module}" aria-label="${l?"ปิด":"เปิด"}เมนูย่อยของ${c(e.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${f("chevronDown",16,`transition-transform ${l?"rotate-180":""}`)}</button></div><div id="sidebar-subgroup-${e.module}" class="ml-5 border-l border-[#dbe9df] pl-3" ${l?"":"hidden"}>${i.map(d=>{const u=t===d.module;return`<a href="${d.href||oe(d.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${u?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${u?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(d.label)}</span></a>`}).join("")}</div></div>`}const a=e.children.filter(n=>g(`${n.module}.view`));if(!a.length)return"";const r=ee.has(e.id),s=a.some(n=>n.module===t||n.children?.some(i=>i.module===t&&g(`${i.module}.view`)));return`<div class="mb-1">
    <button type="button" data-action="toggle-sidebar-group" data-group="${e.id}" aria-expanded="${r}" aria-controls="sidebar-group-${e.id}" class="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold leading-5 ${s?"bg-[#f4f9f5] text-primary-dark":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">
      ${f(e.icon,19,"shrink-0")}<span class="min-w-0 flex-1 whitespace-normal break-words">${c(e.label)}</span>${f("chevronDown",16,`shrink-0 transition-transform ${r?"rotate-180":""}`)}
    </button>
    <div id="sidebar-group-${e.id}" class="ml-5 border-l border-[#dbe9df] pl-3" ${r?"":"hidden"}>
      ${a.map(n=>{const i=t===n.module,o=n.href||oe(n.module);if(!n.children)return`<a href="${o}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${i?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${i?'aria-current="page"':""}><span class="whitespace-normal break-words">${c(n.label)}</span></a>`;const l=n.children.filter(m=>g(`${m.module}.view`));if(!l.length)return`<a href="${o}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${i?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${i?'aria-current="page"':""}><span class="whitespace-normal break-words">${c(n.label)}</span></a>`;const d=ee.has(n.module),u=n.children.some(m=>m.module===t);return`<div class="my-0.5 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${i?"nav-active":u?"bg-[#f4f9f5] text-primary-dark":"text-[#687b74]"}"><a href="${o}" class="flex min-h-11 min-w-0 flex-1 items-center rounded-l-xl px-3 py-2.5 text-[13px] font-medium leading-5 hover:bg-[#f4f7f4] hover:text-ink ${i?"font-semibold":""}" ${i?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(n.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${n.module}" aria-expanded="${d}" aria-controls="sidebar-subgroup-${n.module}" aria-label="${d?"ปิด":"เปิด"}เมนูย่อยของ${c(n.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${f("chevronDown",16,`transition-transform ${d?"rotate-180":""}`)}</button></div><div id="sidebar-subgroup-${n.module}" class="ml-3 border-l border-[#dbe9df] pl-2" ${d?"":"hidden"}>${l.map(m=>{const p=t===m.module;return`<a href="${m.href||oe(m.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${p?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${p?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(m.label)}</span></a>`}).join("")}</div></div>`}).join("")}
    </div>
  </div>`}function Ra(e,t){const a=window.serviceHubUrls?.logo||ja;return`
    <div id="mobile-backdrop" class="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none lg:hidden ${S?"opacity-100 pointer-events-auto visible":"opacity-0 pointer-events-none invisible"}" data-action="close-menu" aria-hidden="true"></div>
    <aside id="sidebar" role="complementary" aria-label="แถบเมนูหลัก" class="fixed inset-y-0 left-0 z-50 flex w-[296px] max-w-[calc(100vw-24px)] flex-col border-r border-line bg-white transition-transform duration-200 motion-reduce:transition-none lg:translate-x-0 lg:visible lg:pointer-events-auto ${S?"translate-x-0 visible pointer-events-auto":"-translate-x-full invisible pointer-events-none"}" ${S?'aria-hidden="false"':'aria-hidden="true"'}>
      <div class="sidebar-brand flex h-16 items-center gap-3 border-b border-line px-4">
        <img src="${a}" alt="ตราเทศบาลนครนนทบุรี" class="h-12 w-12 shrink-0 object-contain drop-shadow-sm">
        <div class="sidebar-brand-text min-w-0 flex-1"><div class="text-[15px] font-bold tracking-tight text-ink leading-snug">เทศบาลนครนนทบุรี</div><div class="text-[11px] font-medium tracking-wide text-muted">ฐานข้อมูลฝ่ายบริการ</div></div>
        <button type="button" class="ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-muted lg:hidden" data-action="close-menu" aria-label="ปิดเมนู">${f("close",20)}</button>
      </div>
      ${Pa(e,t)}
      <nav aria-label="เมนูหลัก" role="navigation" class="sidebar-expanded scrollbar-thin flex-1 overflow-y-auto px-3 pb-6 pt-4">
        <a href="#/dashboard" class="mb-2 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${t?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${t?'aria-current="page"':""}>${f("grid",19)}<span>แดชบอร์ดฝ่ายบริการ</span></a>
        ${qt.map(r=>Ma(r,e)).join("")}
        ${!g("road-washings.view")&&g("cleaning-zones.view")?`<a href="${_t}" class="mb-1 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="cleaning-zones"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4]"}">เขตรักษาความสะอาด</a>`:""}
        ${!g("drain-cleanings.view")&&g("drain-work-types.view")?'<a href="#/drain-work-types" class="flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm">ประเภทงานลอกท่อ</a>':""}
        ${!g("waste-collections.view")&&g("waste-types.view")?`<a href="${St}" class="mb-1 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="waste-types"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4]"}">ประเภทขยะมูลฝอย</a>`:""}
        <a href="#/reports" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="reports"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="reports"?'aria-current="page"':""}>${f("chart",18)}รายงาน</a>
        ${g("audit-logs.view")?`<a href="#/audit-logs" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="audit-logs"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">${f("info",18)}ประวัติการแก้ไข</a>`:""}
        ${Ce()?`<div class="mt-3 border-t border-line pt-3"><a href="#/users" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="users"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="users"?'aria-current="page"':""}>${f("users",19)}<span>จัดการผู้ใช้งาน</span></a></div>`:""}
        <div class="mt-3 border-t border-line pt-3">
          <a href="#/profile" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="profile"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="profile"?'aria-current="page"':""}>
            ${f("users",19)}<span>โปรไฟล์ของฉัน</span>
          </a>
        </div>
      </nav>
    </aside>
  `}function Ia(e=[]){const t=window.serviceHubUser||{},a=(t.name||t.username||"U").slice(0,1).toUpperCase(),r=(t.name||t.username||"U").slice(0,2).toUpperCase(),s=(t.roles||[])[0]||"staff";return`
    <header role="banner" class="app-header sticky top-0 z-30 flex h-14 lg:h-16 w-full max-w-full min-w-0 items-center justify-between border-b border-line bg-white/95 px-4 sm:px-6">
      <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button type="button" data-action="toggle-desktop-sidebar" class="desktop-sidebar-toggle min-h-11 min-w-11 items-center justify-center rounded-lg text-muted hover:bg-canvas" aria-label="${X?"ขยายเมนู":"ย่อเมนู"}" aria-expanded="${!X}" aria-controls="sidebar">${f("menu",20)}</button>
        <button type="button" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl p-2 text-ink hover:bg-canvas lg:hidden" data-action="open-menu" aria-label="เปิดเมนู" aria-expanded="${S}" aria-controls="sidebar">${f("menu",22)}</button>
        <nav aria-label="เส้นทางหน้า" role="navigation" class="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap text-xs text-muted sm:text-sm">
          <a class="shrink-0 hover:text-primary" href="#/dashboard">หน้าหลัก</a>
          ${e.map(n=>`${f("chevron",14,"shrink-0 text-[#b7c4bd]")}<span class="min-w-0 truncate ${n.current?"font-semibold text-ink":""}">${n.href?`<a href="${n.href}" class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom hover:text-primary">${c(n.label)}</a>`:`<span class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom">${c(n.label)}</span>`}</span>`).join("")}
        </nav>
      </div>
      <div class="ml-2 flex shrink-0 items-center gap-2 sm:gap-3">
        <span class="hidden rounded-full border border-[#cfe9dd] bg-[#f0faf4] px-3 py-1 text-[11px] font-bold text-primary sm:inline-flex">ข้อมูลจริง</span>
        <div id="user-menu-container" class="relative">
          <button type="button" data-action="toggle-user-menu" id="user-menu-button" aria-haspopup="menu" aria-expanded="${I}" aria-controls="user-menu-dropdown" class="flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f0f8f2] focus:outline-none focus:ring-2 focus:ring-primary/20 ${I?"border-primary bg-[#f0f8f2]":""}" aria-label="เมนูผู้ใช้งาน ${c(t.name||t.username)}">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white shadow-sm">${c(a)}</span>
            <span class="hidden max-w-[130px] truncate sm:inline">${c(t.name||t.username)}</span>
            ${f("chevronDown",14,`shrink-0 text-[#687b74] transition-transform duration-150 ${I?"rotate-180":""}`)}
          </button>
          <div id="user-menu-dropdown" class="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-24px)] rounded-2xl border border-line bg-white p-2 shadow-xl z-50 transition-all ${I?"opacity-100 visible translate-y-0 pointer-events-auto":"opacity-0 invisible -translate-y-1 pointer-events-none"}" role="menu" aria-labelledby="user-menu-button" ${I?"":"hidden"}>
            <div class="rounded-xl bg-[#f8faf8] p-3 border border-[#edf3ee]">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white shadow-sm">
                  ${c(r)}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-ink truncate">${c(t.name||t.username)}</div>
                  <div class="text-[11px] text-muted truncate">@${c(t.username)}</div>
                  <div class="mt-1">
                    <span class="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${$a[s]||"border-gray-200 bg-gray-50 text-gray-700"}">
                      ${c(ya[s]||s)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-1.5 border-t border-line"></div>
            <a href="#/profile" data-action="close-user-menu" role="menuitem" class="flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-ink transition hover:bg-[#f0f8f2] hover:text-primary-dark">
              ${f("users",16,"text-primary")}
              <span>โปรไฟล์ของฉัน</span>
            </a>
            <div class="my-1.5 border-t border-line"></div>
            <form method="POST" action="${c(window.serviceHubUrls?.logout||"/logout")}" class="m-0">
              <input type="hidden" name="_token" value="${c(document.querySelector('meta[name="csrf-token"]')?.content)}">
              <button type="submit" role="menuitem" class="flex w-full min-h-11 items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-700">
                ${f("logout",16,"text-rose-500")}
                <span>ออกจากระบบ</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  `}function Ht(e,t=null,a=[],r=!1){return document.documentElement.classList.toggle("sidebar-collapsed",X),queueMicrotask(De),`
    ${Ra(t,r)}
    <div class="app-shell min-h-screen w-full max-w-full min-w-0 lg:pl-[296px]">
      ${Ia(a)}
      <main id="main-content" role="main" tabindex="-1" class="app-content mx-auto w-full min-w-0 max-w-[1510px] px-3.5 pb-16 pt-5 sm:px-7 sm:pt-7 lg:px-9">
        ${e}
      </main>
      <div id="shell-live-status" role="status" aria-live="polite" class="sr-only"></div>
    </div>
  `}function W(e,t,a=null,r=[],s=!1){const n=JSON.stringify([a,s,window.serviceHubUser?.roles,window.serviceHubUser?.permissions]),i=JSON.stringify([r,window.serviceHubUser]),o=e.querySelector("#sidebar"),l=e.querySelector("#main-content");if(!o||!l||!e.querySelector(".app-shell"))e.innerHTML=Ht(t,a,r,s);else{if(e.dataset.navigationKey!==n||e.dataset.headerKey!==i){const d=document.createElement("template");d.innerHTML=Ht("",a,r,s),e.dataset.navigationKey!==n&&ea(o,d.content.querySelector("#sidebar"),!0),e.dataset.headerKey!==i&&e.querySelector(".app-header").replaceWith(d.content.querySelector(".app-header"))}l.innerHTML=t}e.dataset.navigationKey=n,e.dataset.headerKey=i,De()}function ea(e,t,a=!1){if(e.isEqualNode(t))return;if(e.nodeType!==1){e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue);return}const r=i=>a&&["class","aria-hidden","inert"].includes(i);for(const i of[...e.attributes])!r(i.name)&&!t.hasAttribute(i.name)&&e.removeAttribute(i.name);for(const i of t.attributes)!r(i.name)&&e.getAttribute(i.name)!==i.value&&e.setAttribute(i.name,i.value);const s=[...e.childNodes],n=[...t.childNodes];for(let i=0;i<Math.max(s.length,n.length);i++){const o=s[i],l=n[i];l?o?o.nodeType!==l.nodeType||o.nodeName!==l.nodeName?o.replaceWith(l.cloneNode(!0)):ea(o,l):e.append(l.cloneNode(!0)):o.remove()}}function Ha(){It||(It=!0,window.addEventListener("resize",De),document.addEventListener("keydown",za),document.addEventListener("mouseover",Pt),document.addEventListener("focusin",e=>{Pt(e),I&&!e.target.closest("#user-menu-container")&&Je()}),document.addEventListener("mouseout",ge),document.addEventListener("focusout",ge),document.addEventListener("click",e=>{S&&e.target.closest("#sidebar a[href]")&&Xe(!1);const t=e.target.closest("[data-action]"),a=t?.dataset.action;if(a==="toggle-desktop-sidebar"&&(ge(),Qt()),a==="expand-sidebar-group"&&(ge(),Ua(t.dataset.group)),a==="toggle-sidebar-group"||a==="toggle-sidebar-subgroup"){Da(t.dataset.group);const r=ee.has(t.dataset.group);t.setAttribute("aria-expanded",String(r)),t.setAttribute("aria-label",`${r?"ปิด":"เปิด"}เมนูย่อย`);const s=document.getElementById(t.getAttribute("aria-controls"));s&&(s.hidden=!r),t.querySelector("svg:last-child")?.classList.toggle("rotate-180",r)}}))}function Pa(e,t){const a=[{label:"แดชบอร์ดฝ่ายบริการ",icon:"grid",href:"#/dashboard",active:t}];for(const r of qt)(r.type==="group"?!r.children.some(s=>g(`${s.module}.view`)):!g(`${r.module}.view`))||a.push({label:r.label,icon:r.icon,group:r.type==="group"?r.id:r.children?.some(s=>g(`${s.module}.view`))?r.module:null,href:r.module?oe(r.module):null,active:e===r.module||r.children?.some(s=>s.module===e||s.children?.some(n=>n.module===e))});return!g("road-washings.view")&&g("cleaning-zones.view")&&a.push({label:"เขตรักษาความสะอาด",icon:"road",href:_t,active:e==="cleaning-zones"}),!g("drain-cleanings.view")&&g("drain-work-types.view")&&a.push({label:"ประเภทงานลอกท่อ",icon:"droplet",href:"#/drain-work-types",active:e==="drain-work-types"}),!g("waste-collections.view")&&g("waste-types.view")&&a.push({label:"ประเภทขยะมูลฝอย",icon:"recycle",href:St,active:e==="waste-types"}),a.push({label:"รายงาน",icon:"chart",href:"#/reports",active:e==="reports"}),g("audit-logs.view")&&a.push({label:"ประวัติการแก้ไข",icon:"info",href:"#/audit-logs",active:e==="audit-logs"}),Ce()&&a.push({label:"จัดการผู้ใช้งาน",icon:"users",href:"#/users",active:e==="users"}),a.push({label:"โปรไฟล์ของฉัน",icon:"users",href:"#/profile",active:e==="profile"}),`<nav class="sidebar-rail" aria-label="เมนูแบบย่อ">${a.map(r=>{const s=`data-nav-label="${c(r.label)}" aria-label="${c(r.label)}" class="rail-item ${r.active?"nav-active":""}"`;return r.group?`<button type="button" data-action="expand-sidebar-group" data-group="${r.group}" ${s}>${f(r.icon,20)}</button>`:`<a href="${r.href}" ${s} ${r.active?'aria-current="page"':""}>${f(r.icon,20)}</a>`}).join("")}</nav>`}function ge(){document.getElementById("nav-tooltip")?.remove(),document.querySelectorAll('[aria-describedby="nav-tooltip"]').forEach(e=>e.removeAttribute("aria-describedby"))}function Pt(e){const t=e.target.closest?.("[data-nav-label]");if(!t||window.innerWidth<1024||!X)return;ge();const a=document.createElement("div");a.id="nav-tooltip",a.role="tooltip",a.textContent=t.dataset.navLabel,a.className="nav-tooltip";const r=t.getBoundingClientRect();a.style.top=`${Math.min(window.innerHeight-80,Math.max(8,r.top))}px`,t.setAttribute("aria-describedby","nav-tooltip"),document.body.append(a)}function za(e){e.key==="Escape"&&(ge(),I&&(Je(),document.getElementById("user-menu-button")?.focus()),Xe(!1));const t=document.getElementById("user-menu-dropdown");if(I&&["ArrowDown","ArrowUp","Home","End"].includes(e.key)){const a=[...t.querySelectorAll('[role="menuitem"]')],r=a.indexOf(document.activeElement),s=e.key==="Home"?0:e.key==="End"?a.length-1:(r+(e.key==="ArrowDown"?1:-1)+a.length)%a.length;e.preventDefault(),a[s]?.focus()}if(e.key==="Tab"&&S&&window.innerWidth<1024){const a=[...document.querySelectorAll("#sidebar a[href], #sidebar button")].filter(r=>!r.closest("[hidden],.sidebar-rail"));e.shiftKey&&document.activeElement===a[0]?(e.preventDefault(),a.at(-1)?.focus()):!e.shiftKey&&document.activeElement===a.at(-1)&&(e.preventDefault(),a[0]?.focus())}}function Na({breakdown:e,esc:t,number:a}){if(!Array.isArray(e))return'<p role="alert" class="mt-4 text-sm text-muted">ไม่สามารถแสดงข้อมูลน้ำหนักแยกประเภทได้ กรุณาโหลดข้อมูลอีกครั้ง</p>';if(!e.length)return'<p class="mt-4 text-sm text-muted">ยังไม่มีข้อมูลมูลฝอยในช่วงวันที่นี้</p>';const r=Math.max(...e.map(n=>n.weight)),s=`<table class="sr-only"><caption>น้ำหนักมูลฝอยแยกตามประเภทขยะ หน่วยกิโลกรัม</caption><thead><tr><th scope="col">ประเภทขยะ</th><th scope="col">น้ำหนัก (กิโลกรัม)</th></tr></thead><tbody>${e.map(n=>`<tr><th scope="row">${t(n.name||"ไม่ระบุประเภท")}</th><td>${a(n.weight)}</td></tr>`).join("")}</tbody></table>`;return r<=0?'<p class="mt-4 text-sm text-muted">ยังไม่มีน้ำหนักที่บันทึกในช่วงวันที่นี้ ทุกประเภทมีน้ำหนัก 0 กิโลกรัม</p>'+s:`<dl aria-hidden="true">${e.map(n=>`<div class="distribution-row min-w-0"><dt class="min-w-0 break-words text-sm">${t(n.name||"ไม่ระบุประเภท")}</dt><dd class="m-0 min-w-0"><p class="break-words text-right text-sm tabular-nums">${a(n.weight)} กิโลกรัม</p><div class="distribution-track mt-2"><div class="distribution-fill" style="width:${n.weight/r*100}%"></div></div></dd></div>`).join("")}</dl>${s}`}function Ba({groups:e,summary:t,esc:a,number:r}){const s=e.reduce((n,i)=>n+(t[i.id]||0),0);return s?`<dl>${e.map(n=>{const i=t[n.id]||0,o=i/s*100;return`<div class="distribution-row"><dt class="text-sm font-semibold">${a(n.label)}</dt><dd class="m-0"><div class="flex flex-wrap justify-between gap-2 text-sm"><span>${r(i)} รายการ</span><strong>${r(Math.round(o*10)/10)}%</strong></div><div class="distribution-track mt-2" aria-hidden="true"><div class="distribution-fill" style="width:${o}%"></div></div></dd></div>`}).join("")}</dl>`:'<p class="mt-4 text-sm text-muted">ไม่มีรายการสำหรับแสดงสัดส่วนในช่วงนี้</p>'}const Fa={distance_km:"กิโลเมตร",quantity:"ลูกบาศก์เมตร",weight:"กิโลกรัม",sediment_quantity:"ลูกบาศก์เมตร",volume:"ลูกบาศก์เมตร",treated_volume:"ลูกบาศก์เมตร",fee_amount:"บาท",sludge_quantity:"กิโลกรัม",fertilizer_remaining_latest:"กิโลกรัม",communities_count:"ชุมชน",participants_count:"คน"},Oa={fertilizer_remaining_latest:"ปุ๋ยคงเหลือล่าสุด"},Se=e=>new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Bangkok"}).format(new Date(`${String(e).slice(0,10)}T12:00:00+07:00`)),Va=e=>e?new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"Asia/Bangkok"}).format(new Date(String(e).replace(" ","T")+(String(e).includes("Z")||/[+-]\d\d:\d\d$/.test(String(e))?"":"+00:00"))):"—";function Ka({data:e,loading:t,error:a,params:r,groups:s,modules:n,icon:i,esc:o,number:l,moduleHref:d}){const u=r.get("from")||e?.period?.from||"",m=r.get("to")||e?.period?.to||"",p=!!(u||m),b='<div class="mb-5 sm:mb-6"><p class="text-xs font-bold tracking-wide text-primary">ภาพรวมระบบ</p><h1 class="type-page-title mt-2 text-ink">แดชบอร์ดฝ่ายบริการ</h1><p class="mt-2 text-sm text-muted">ติดตามงานบริการจากฐานข้อมูลจริงตามสิทธิ์ของคุณ</p></div>',v=`
    <section aria-labelledby="dashboard-filter-title" class="panel-shadow mb-6 rounded-xl border border-line bg-white p-4">
      <div class="mb-3"><h2 id="dashboard-filter-title" class="font-bold text-ink">${p?"ช่วงวันที่ดำเนินงาน":"ข้อมูลสะสมทั้งหมดตั้งแต่เริ่มระบบ"}</h2><p class="type-helper text-muted">${p?"ตัวเลขหลักใช้วันที่ดำเนินงาน รวมวันเริ่มต้นและวันสิ้นสุด":"แสดงภาพรวมและจำนวนรายการสะสมของทุกหมวดงานตั้งแต่เริ่มระบบ"}</p></div>
      <div class="flex min-w-0 flex-wrap items-end gap-4">
        <form id="dashboard-filter" class="grid min-w-0 flex-[1_1_440px] gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] lg:items-end">
          <label class="min-w-0 text-sm">ตั้งแต่วันที่<input class="field mt-1" type="date" name="from" value="${o(u)}" placeholder="ทั้งหมด"></label>
          <label class="min-w-0 text-sm">ถึงวันที่<input class="field mt-1" type="date" name="to" value="${o(m)}" placeholder="ทั้งหมด"></label>
          <button type="submit" class="min-h-11 rounded-xl bg-primary px-4 text-white hover:bg-primary-dark">กรองข้อมูล</button>
          ${p?'<a href="#/dashboard" class="flex min-h-11 items-center justify-center rounded-xl border border-line px-3 text-sm text-muted hover:bg-canvas" title="คืนค่าเป็นทั้งหมดทุกช่วงเวลา">ดูทั้งหมด</a>':""}
        </form>
        <div class="min-w-0 flex-[1_1_320px]">${st({from:u,to:m,formId:"dashboard-filter"})}</div>
        <p id="dashboard-filter-error" role="alert" class="hidden basis-full text-sm text-red-700"></p>
      </div>
    </section>
  `;if(t||!e&&!a)return`${b}${v}<div role="status" aria-live="polite" class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted">กำลังโหลดข้อมูลภาพรวม…</div>`;if(a)return`${b}${v}<div role="alert" class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"><p class="font-semibold">โหลดข้อมูลภาพรวมไม่สำเร็จ</p><p class="mt-1">${o(a)}</p><button type="button" data-action="retry-dashboard" class="mt-3 min-h-11 rounded-xl border border-red-300 bg-white px-4 font-semibold">ลองอีกครั้ง</button></div>`;const $=n.filter(x=>Object.hasOwn(e.module_summary,x.id)),k=x=>$.some(w=>w.id===x),_=x=>e.period?.from&&e.period?.to?`${d(x)}?${new URLSearchParams({from:e.period.from,to:e.period.to})}`:d(x),D=e.period.total,T=$.filter(x=>e.module_summary[x.id].count>0).length,A=(x,w,K,N,y=!1)=>`<div class="dashboard-card dashboard-kpi panel-shadow rounded-xl border border-line bg-white p-4 sm:p-6"><span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E6F3F0] text-primary" aria-hidden="true">${i(y?"filter":x==="ดำเนินงานวันนี้"?"calendar":"grid",20)}</span><div class="min-w-0"><p class="text-sm font-semibold text-muted">${x}</p><p class="dashboard-kpi-number type-kpi mt-2 text-ink">${l(w)} <span class="text-sm font-medium text-muted">${K}</span></p><p class="mt-2 text-xs text-muted">${N}</p></div></div>`,E=x=>x?.missing?`ยังไม่ระบุจำนวน ${l(x.missing)} รายการ`:"",le=(x,w,K)=>{const N=Oa[w]||x.fields.find(y=>y.name===w)?.label||w;return`<span class="inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-[#f4f8f5] px-2.5 py-1.5 text-sm text-[#435b50]"><span>${o(N)}:</span><strong class="min-w-0 break-words text-ink">${K===null?w==="service_users_count"?"ยังไม่มีข้อมูลจำนวนผู้ใช้บริการ":"ไม่มีข้อมูล":`${l(K)} ${x.fields.find(y=>y.name===w)?.unit||Fa[w]||""}`}</strong>${w==="service_users_count"&&E(e.module_summary[x.id]?.service_users_coverage)?`<span class="basis-full text-xs text-muted">${E(e.module_summary[x.id].service_users_coverage)}</span>`:""}</span>`},h=(x,w)=>e.module_summary[x]?.metrics[w]??0,C=e.module_summary["waste-collections"],Y=C?.waste_overview,he=()=>{const x=Y?.top_type;return`<div class="flex min-w-0 flex-wrap justify-between gap-x-2 gap-y-1 text-xs"><dt class="text-muted">ประเภทที่มีน้ำหนักมากที่สุด</dt><dd class="min-w-0 max-w-full break-words font-bold text-ink">${x?`${o(x.name)} · ${l(x.weight)} กิโลกรัม`:C?.count?"ยังไม่มีน้ำหนักที่บันทึก":"ยังไม่มีข้อมูล"}</dd></div></dl>`},ve={cleaning:[["ระยะทางงานอื่นรวม",$.filter(x=>x.group==="cleaning"&&x.id!=="waterway-cleanings").reduce((x,w)=>x+h(w.id,"distance_km"),0),"กิโลเมตร"],...k("waterway-cleanings")?[["ระยะทางงานคลอง",h("waterway-cleanings","distance_km"),"เมตร"],["ผักตบชวาและมูลฝอยที่กำจัด",h("waterway-cleanings","quantity"),"ลูกบาศก์เมตร"]]:[]],waste:[["น้ำหนักมูลฝอย",h("waste-collections","weight"),"กิโลกรัม"],["น้ำหนักขยะอันตราย",Y?.hazardous_weight??0,"กิโลกรัม"]],sanitation:[...k("drain-cleanings")?[["ตะกอนจากงานลอกท่อ",h("drain-cleanings","sediment_quantity"),"ลูกบาศก์เมตร"]]:[],...k("septic-pumpings")?[["สิ่งปฏิกูลที่สูบ",h("septic-pumpings","volume"),"ลูกบาศก์เมตร"],["ผู้ใช้บริการงานสูบสิ่งปฏิกูล",e.module_summary["septic-pumpings"].metrics.service_users_count??null,"คน",E(e.module_summary["septic-pumpings"].service_users_coverage)]]:[],...k("septic-treatments")?[["บำบัดสิ่งปฏิกูลรวม",h("septic-treatments","treated_volume"),"ลูกบาศก์เมตร"],["ตะกอนสำหรับทำปุ๋ย",h("septic-treatments","sludge_quantity"),"กิโลกรัม"]]:[]],projects:[["ผู้เข้าร่วมโครงการ",h("waste-management-projects","participants_count"),"คน"]]},ue=s.filter(x=>$.some(w=>w.group===x.id)).map(x=>`<section class="dashboard-card department-card panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5"><div class="flex items-start gap-3"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf5ef] text-primary">${i(x.icon,19)}</span><div class="min-w-0"><h3 class="break-words text-sm font-bold text-ink">${o(x.label)}</h3><p class="mt-1 text-2xl font-bold text-ink">${l(e.group_summary[x.id]||0)} <span class="text-xs font-medium text-muted">${p?"รายการในช่วงที่เลือก":"รายการสะสม"}</span></p></div></div><dl class="mt-4 space-y-1.5 border-t border-line pt-3">${ve[x.id].map(([w,K,N,y])=>`<div class="flex flex-wrap justify-between gap-x-2 text-xs"><dt class="text-muted">${w}</dt><dd class="min-w-0 break-words font-bold text-ink">${K===null?"ยังไม่มีข้อมูลจำนวนผู้ใช้บริการ":`${l(K)} ${N}`}${y?`<span class="block text-xs font-normal text-muted">${y}</span>`:""}</dd></div>`).join("")}${x.id==="waste"?he():"</dl>"}</section>`).join(""),ye=$.map(x=>{const w=e.module_summary[x.id];return`<a href="${_(x.id)}" class="flex min-w-0 flex-col gap-2 rounded-xl border border-line bg-white p-3.5 transition hover:border-[#9fd1b8] hover:bg-[#f9fcfa] focus-visible:outline"><span class="flex min-w-0 items-start justify-between gap-2"><span class="min-w-0 break-words text-sm font-semibold text-ink">${o(x.short)}</span><strong class="shrink-0 text-sm text-primary">${l(w.count)} รายการ</strong></span><span class="flex flex-wrap gap-1.5">${Object.entries(w.metrics).map(([K,N])=>le(x,K,N)).join("")||'<span class="text-xs text-muted">ไม่มีค่าปริมาณ</span>'}</span></a>`}).join(""),Me=e.recent.slice(0,6).map(x=>{const w=n.find(K=>K.id===x.module);return w?`<a href="${d(w.id)}/${encodeURIComponent(x.id)}" class="flex min-w-0 flex-col gap-2 border-t border-line px-4 py-3.5 transition hover:bg-[#f9fcfa] sm:flex-row sm:items-center sm:gap-3 sm:px-5"><div class="flex min-w-0 flex-1 items-center gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf5ef] text-primary">${i(w.icon,17)}</span><div class="min-w-0 flex-1"><strong class="block break-words text-sm text-ink">${o(x.title||w.short)}</strong><span class="block break-words text-xs text-muted">${o(w.short)}</span></div></div><div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pl-12 text-xs sm:flex-col sm:items-end sm:gap-y-0.5 sm:pl-0"><span class="inline-flex items-center gap-1 font-semibold text-primary-dark"><span class="font-normal text-muted">ดำเนินงาน:</span> ${Se(x.service_date)}</span><time class="text-[11px] text-muted" datetime="${o(x.created_at)}">บันทึกเมื่อ ${Va(x.created_at)}</time></div></a>`:""}).join(""),Re=p?"รายการในช่วงที่เลือก":"รายการสะสมทั้งหมด",$e=e.period?.from&&e.period?.to?`${Se(e.period.from)} – ${Se(e.period.to)}`:u?`ตั้งแต่ ${Se(u)} เป็นต้นไป`:m?`ถึง ${Se(m)}`:"ข้อมูลสะสมตั้งแต่เริ่มระบบ",Ie=s.filter(x=>$.some(w=>w.group===x.id)),He=`<div class="dashboard-panels mb-6 grid min-w-0 grid-cols-1 gap-4 ${k("waste-collections")?"xl:grid-cols-2":""}">${k("waste-collections")?`<section class="panel-shadow min-w-0 rounded-xl border border-line bg-white p-4 sm:p-6" aria-labelledby="waste-weight-heading"><h2 id="waste-weight-heading" class="text-lg font-bold">น้ำหนักมูลฝอยแยกตามประเภทขยะ</h2><p class="mt-1 text-xs text-muted">${$e} · นับตามวันเริ่ม · หน่วยกิโลกรัม</p>${Na({breakdown:Y?.breakdown,esc:o,number:l})}</section>`:""}<section class="panel-shadow min-w-0 rounded-xl border border-line bg-white p-4 sm:p-6" aria-labelledby="distribution-heading"><h2 id="distribution-heading" class="text-lg font-bold">สัดส่วนจำนวนรายการตามกลุ่มงาน</h2><p class="mt-1 text-xs text-muted">${p?"ใช้ช่วงวันที่ที่เลือก":"ข้อมูลสะสมทั้งหมด"} · เฉพาะกลุ่มที่คุณมีสิทธิ์ดู</p>${Ba({groups:Ie,summary:e.group_summary,esc:o,number:l})}</section></div>`;return`${b}${v}
    <section aria-label="ยอดรวม" class="dashboard-summary mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">${A(Re,D,"รายการ",$e+(p?` · จากยอดสะสมทั้งหมด ${l(e.total)} รายการ`:""),!0)}${A("หมวดงานที่มีข้อมูล",T,"หมวด",p?"มีรายการในช่วงวันที่ที่เลือก":"มีรายการสะสม เฉพาะหมวดที่คุณมีสิทธิ์ดู")}${A("ดำเนินงานวันนี้",e.today,"รายการ","วันนี้ตามเวลาไทย ไม่ขึ้นกับช่วงที่เลือก")}</section>
    <section aria-labelledby="group-heading" class="mb-6"><h2 id="group-heading" class="mb-4 text-lg font-bold">ภาพรวมกลุ่มงาน</h2>${$.length?`<div class="dashboard-summary grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">${ue}</div>`:'<p class="rounded-xl border border-line bg-white p-4 text-sm text-muted">ไม่มีหมวดงานที่คุณมีสิทธิ์ดู</p>'}</section>
    ${He}
    <section aria-labelledby="recent-heading" class="mb-6 panel-shadow overflow-hidden rounded-xl border border-line bg-white"><div class="p-4 sm:p-6"><h2 id="recent-heading" class="text-lg font-bold">กิจกรรมล่าสุด</h2><p class="mt-1 text-xs text-muted">เรียงตามเวลาบันทึก ครอบคลุมข้อมูลทุกช่วงเวลา</p></div>${Me||'<p class="border-t border-line p-4 text-sm text-muted">ยังไม่มีรายการบันทึก</p>'}</section>
    <section aria-labelledby="module-heading" class="mb-6"><h2 id="module-heading" class="mb-1 text-lg font-bold">งานบริการรายหมวด</h2><p class="mb-4 text-xs text-muted">${p?"จำนวนและปริมาณในช่วงวันที่ที่เลือก":"จำนวนและปริมาณสะสมทั้งหมด"}; แต่ละค่าระบุหน่วยและความหมายแยกกัน</p>${p&&D===0?'<p class="mb-4 rounded-xl border border-line bg-white p-4 text-sm text-muted">ยังไม่มีรายการดำเนินงานในช่วงวันที่นี้ ลองเลือกช่วงอื่นเพื่อดูข้อมูล</p>':""}<div class="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">${ye}</div></section>
`}let Ze=null;function ta(e,t){if(e.key!=="Tab")return;const a=[...t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(n=>!n.closest("[hidden]")&&n.offsetParent!==null);if(!a.length){e.preventDefault();return}const r=a[0],s=a[a.length-1];e.shiftKey&&document.activeElement===r?(e.preventDefault(),s.focus()):!e.shiftKey&&document.activeElement===s&&(e.preventDefault(),r.focus())}function Wa({title:e="",content:t="",footer:a="",trigger:r=null,onClose:s=null,initialFocusSelector:n="input:not([disabled]), select:not([disabled]), button:not([disabled])",maxWidth:i="max-w-[440px]"}={}){Ye();const o=r||document.activeElement,l=document.createElement("div");l.id="accessible-drawer-root",l.className="drawer-container",l.innerHTML=`
    <div id="drawer-backdrop" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-200" aria-hidden="true" data-action="drawer-close"></div>
    <div id="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" class="fixed inset-y-0 right-0 z-50 flex w-full ${c(i)} flex-col bg-white shadow-2xl transition-transform duration-300">
      <div class="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5 sm:px-6">
        <h2 id="drawer-title" class="text-base font-bold text-ink">${c(e)}</h2>
        <button type="button" data-action="drawer-close" class="rounded-xl p-2 text-muted hover:bg-canvas transition" aria-label="ปิด">${f("close",20)}</button>
      </div>
      <div class="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
        ${typeof t=="string"?t:""}
      </div>
      ${a?`
      <div class="flex shrink-0 items-center justify-end gap-3 border-t border-line px-5 py-4 sm:px-6 bg-[#fafbfa]">
        ${a}
      </div>`:""}
    </div>
  `,t instanceof HTMLElement&&l.querySelector(".flex-1").appendChild(t),document.body.appendChild(l),document.body.style.overflow="hidden";const d=m=>{if(m.key==="Escape")m.preventDefault(),Ye();else if(m.key==="Tab"){const p=document.getElementById("drawer-panel");p&&ta(m,p)}},u=m=>{m.target.closest('[data-action="drawer-close"]')&&(m.preventDefault(),Ye())};return document.addEventListener("keydown",d),l.addEventListener("click",u),Ze={root:l,triggerElement:o,onKeydown:d,onClick:u,onClose:s},requestAnimationFrame(()=>{requestAnimationFrame(()=>{const m=document.getElementById("drawer-panel");if(!m)return;const p=n?m.querySelector(n):null;p&&typeof p.focus=="function"?p.focus():m.querySelector('button[data-action="drawer-close"]')?.focus()})}),l}function Ye(){if(!Ze)return;const{root:e,triggerElement:t,onKeydown:a,onClick:r,onClose:s}=Ze;document.removeEventListener("keydown",a),e.removeEventListener("click",r),e.remove(),document.body.style.overflow="",Ze=null,t&&typeof t.focus=="function"&&t.focus(),typeof s=="function"&&s()}function Et({title:e="ยืนยันการดำเนินการ",message:t="คุณต้องการดำเนินการต่อหรือไม่",confirmText:a="ยืนยัน",cancelText:r="ยกเลิก",variant:s="danger",iconName:n="trash"}={}){return new Promise(i=>{const o=document.activeElement,l=document.createElement("div");l.id="accessible-modal-root",l.className="modal-container fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#0d241e]/55 p-4 backdrop-blur-xs";const d={danger:{iconBg:"bg-[#fff0ed] text-[#b64b43]",btnConfirm:"bg-[#b84d45] hover:bg-[#a43e37] text-white"},warning:{iconBg:"bg-[#fff8eb] text-[#b2721a]",btnConfirm:"bg-[#b2721a] hover:bg-[#9a6214] text-white"},primary:{iconBg:"bg-[#eaf5ef] text-primary",btnConfirm:"bg-primary hover:bg-primary-dark text-white"}}[s]||{iconBg:"bg-[#fff0ed] text-[#b64b43]",btnConfirm:"bg-[#b84d45] hover:bg-[#a43e37] text-white"};l.innerHTML=`
      <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-modal-title" aria-describedby="confirm-modal-desc" class="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${d.iconBg}">
          ${f(n,21)}
        </div>
        <h2 id="confirm-modal-title" class="text-lg font-bold text-ink">${c(e)}</h2>
        <p id="confirm-modal-desc" class="mt-2 text-sm leading-relaxed text-muted">${c(t)}</p>
        <div class="mt-7 flex justify-end gap-2.5">
          <button type="button" id="confirm-modal-cancel" class="min-h-11 rounded-xl border border-line px-4 text-sm font-bold text-ink hover:bg-canvas transition">
            ${c(r)}
          </button>
          <button type="button" id="confirm-modal-confirm" class="min-h-11 rounded-xl px-4 text-sm font-bold transition ${d.btnConfirm}">
            ${c(a)}
          </button>
        </div>
      </div>
    `,document.body.appendChild(l);const u=document.body.style.overflow;document.body.style.overflow="hidden";const m=l.querySelector("#confirm-modal-cancel"),p=l.querySelector("#confirm-modal-confirm"),b=$=>{document.removeEventListener("keydown",v),l.remove(),document.body.style.overflow=u,o&&typeof o.focus=="function"&&o.focus(),i($)},v=$=>{if($.key==="Escape")$.preventDefault(),b(!1);else if($.key==="Tab"){const k=l.querySelector('[role="alertdialog"]');k&&ta($,k)}};l.addEventListener("click",$=>{$.target===l&&b(!1)}),m?.addEventListener("click",()=>b(!1)),p?.addEventListener("click",()=>b(!0)),document.addEventListener("keydown",v),setTimeout(()=>{m?.focus()},50)})}const xe={"super-admin":{label:"ผู้ดูแลสูงสุด",color:"bg-[#fef2e8] text-[#b25d1a] border-[#f9d4b4]"},admin:{label:"ผู้ดูแลระบบ",color:"bg-[#e8f0fe] text-[#2756b8] border-[#c3d3f9]"},staff:{label:"เจ้าหน้าที่",color:"bg-[#eef7f2] text-[#156e3a] border-[#b7e4ce]"},viewer:{label:"ผู้ดูข้อมูล",color:"bg-[#f3f0fb] text-[#5a469b] border-[#cdc5ef]"},auditor:{label:"ผู้ตรวจสอบ",color:"bg-[#fff4e8] text-[#966020] border-[#f5d9a8]"}};function Za(e){const t=xe[e]||{label:e,color:"bg-[#f2f4f3] text-[#52665e] border-[#d8e3de]"};return`<span class="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${t.color}">${c(t.label)}</span>`}let O={loading:!1,error:null,users:[],summary:{},meta:{},roles:[]},L={q:"",role:"all",status:"all",sort:"created_at",direction:"desc",page:1},zt=null;function Ya(){return`
    <div id="user-directory-root" class="w-full min-w-0 max-w-full">
      ${aa()}
    </div>
  `}function aa(){const{loading:e,error:t,users:a,summary:r,meta:s}=O,i=Ve("users.create")?`<button type="button" data-action="um-open-create" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${f("plus",18)}เพิ่มผู้ใช้งาน</button>`:"";return`
    ${z("การจัดการระบบ","จัดการผู้ใช้งาน","บริหารบัญชีผู้ใช้ สิทธิ์การเข้าถึง และความปลอดภัยของระบบ",i)}
    ${Ga(r)}
    ${Xa()}
    ${e?`<div role="status" aria-live="polite" class="flex items-center justify-center py-16 text-muted text-sm">${f("filter",20,"animate-spin mr-2")} กำลังโหลดข้อมูลผู้ใช้งาน...</div>`:t?`<div role="alert" class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">${c(t)}</div>`:Ja(a,s)}
  `}function Ga(e){return`
    <section aria-label="สรุปสถิติผู้ใช้" class="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      ${[{label:"บัญชีผู้ใช้ทั้งหมด",value:e.total_accounts??"—",icon:"users",bg:"bg-[#e6f4ee]",color:"text-primary"},{label:"ใช้งานอยู่",value:e.active_users??"—",icon:"check",bg:"bg-[#e7f3f8]",color:"text-[#3485a5]"},{label:"ผู้ดูแลระบบ",value:e.administrators??"—",icon:"sparkles",bg:"bg-[#fff3e5]",color:"text-[#bb7934]"},{label:"การยืนยันตัวตน 2FA",value:e.two_factor_enrolled??(e.total_accounts!=null?"พร้อมใช้งาน":"—"),icon:"lock",bg:"bg-[#f3f0fb]",color:"text-[#6b4fb8]"}].map(a=>`
        <div class="rounded-2xl border border-line bg-white p-4 sm:p-5 panel-shadow">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${a.bg} ${a.color}">
              ${f(a.icon,19)}
            </div>
            <p class="text-xs font-medium text-muted">${c(a.label)}</p>
          </div>
          <p class="mt-3 text-[26px] font-bold leading-none text-ink">${c(String(a.value))}</p>
        </div>
      `).join("")}
    </section>
  `}function Xa(){const{q:e,role:t,status:a,sort:r,direction:s}=L,n=[{value:"all",label:"ทุกบทบาท"},...Object.entries(xe).map(([o,l])=>({value:o,label:l.label}))],i=[{value:"all",label:"ทุกสถานะ"},{value:"active",label:"ใช้งานอยู่"},{value:"inactive",label:"ระงับแล้ว"}];return`
    <section aria-label="ค้นหาและกรองผู้ใช้" class="mb-5 panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-end gap-3">
        <div class="w-full min-w-0 sm:min-w-[200px] sm:flex-1">
          <label for="um-search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <div class="relative">
            ${f("search",18,"pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]")}
            <input id="um-search" type="search" placeholder="ชื่อหรือชื่อผู้ใช้..." class="field pl-10" value="${c(e)}" data-action="um-search" autocomplete="off">
          </div>
        </div>
        <div class="w-full min-w-0 sm:w-[160px]">
          <label for="um-role" class="mb-1.5 block text-xs font-bold text-[#52665d]">บทบาท</label>
          <select id="um-role" class="field master-native-select" data-action="um-filter-role">
            ${n.map(o=>`<option value="${o.value}"${t===o.value?" selected":""}>${c(o.label)}</option>`).join("")}
          </select>
        </div>
        <div class="w-full min-w-0 sm:w-[160px]">
          <label for="um-status" class="mb-1.5 block text-xs font-bold text-[#52665d]">สถานะ</label>
          <select id="um-status" class="field master-native-select" data-action="um-filter-status">
            ${i.map(o=>`<option value="${o.value}"${a===o.value?" selected":""}>${c(o.label)}</option>`).join("")}
          </select>
        </div>
        <div class="w-full min-w-0 sm:w-[180px]">
          <label for="um-sort" class="mb-1.5 block text-xs font-bold text-[#52665d]">เรียงตาม</label>
          <select id="um-sort" class="field master-native-select" data-action="um-filter-sort">
            <option value="created_at:desc"${r==="created_at"&&s==="desc"?" selected":""}>วันที่สร้าง (ใหม่สุด)</option>
            <option value="created_at:asc"${r==="created_at"&&s==="asc"?" selected":""}>วันที่สร้าง (เก่าสุด)</option>
            <option value="name:asc"${r==="name"&&s==="asc"?" selected":""}>ชื่อ (ก–ฮ)</option>
            <option value="name:desc"${r==="name"&&s==="desc"?" selected":""}>ชื่อ (ฮ–ก)</option>
          </select>
        </div>
        <button type="button" data-action="um-clear-filters" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas sm:w-auto">ล้างตัวกรอง</button>
      </div>
    </section>
  `}function Ja(e,t){const a=Ve("users.update"),r=Ve("users.disable"),s=Ve("users.update");if(!e.length)return`
      <div class="panel-shadow flex flex-col items-center rounded-2xl border border-line bg-white px-6 py-16 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f7f2] text-primary">
          ${f("users",27)}
        </div>
        <h3 class="text-base font-bold">ไม่พบผู้ใช้งาน</h3>
        <p class="mt-1 max-w-sm text-sm leading-relaxed text-muted">ลองเปลี่ยนคำค้นหาหรือตัวกรอง หรือเพิ่มผู้ใช้งานใหม่</p>
      </div>
    `;const{current_page:n=1,last_page:i=1,total:o=0,per_page:l=10}=t;return`
    <section aria-labelledby="um-table-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
        <div>
          <h2 id="um-table-title" class="text-sm font-bold">รายการผู้ใช้งาน</h2>
          <p class="mt-0.5 text-xs text-muted">พบ ${q(o)} บัญชี</p>
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
              ${a||r||s?'<th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">การดำเนินการ</th>':""}
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef2ee]">
            ${e.map(d=>{const u=d.role??d.roles?.[0]?.name??d.roles?.[0]??"",m=!!d.is_active,p=String(d.id)===String(window.serviceHubUser?.id);return`
                <tr class="transition hover:bg-[#fafcfa]" data-user-id="${c(String(d.id))}">
                  <td class="px-5 py-3.5">
                    <div class="flex items-center gap-3">
                      <span aria-hidden="true" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e0f0e8] text-[13px] font-bold text-primary-dark">
                        ${c(Zt(d.name))}
                      </span>
                      <span class="font-semibold text-ink break-words max-w-[160px]">${c(d.name)}</span>
                    </div>
                  </td>
                  <td class="px-5 py-3.5 text-muted font-mono text-xs">${c(d.username)}</td>
                  <td class="px-5 py-3.5">${u?Za(u):'<span class="text-muted">—</span>'}</td>
                  <td class="px-5 py-3.5">
                    <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${m?"bg-[#eef7f2] text-[#156e3a]":"bg-[#fef2f2] text-[#b91c1c]"}">
                      <span class="h-1.5 w-1.5 rounded-full ${m?"bg-[#22c55e]":"bg-[#ef4444]"}"></span>
                      ${m?"ใช้งานอยู่":"ระงับแล้ว"}
                    </span>
                  </td>
                  <td class="px-5 py-3.5 text-xs text-muted whitespace-nowrap">${F(d.created_at)}</td>
                  ${a||r||s?`
                  <td class="px-5 py-3.5 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                      ${a?`<button type="button" data-action="um-edit-user" data-id="${c(String(d.id))}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-ink hover:bg-canvas" aria-label="แก้ไข ${c(d.name)}">${f("edit",15)}แก้ไข</button>`:""}
                      ${r&&!p?`<button type="button" data-action="um-toggle-status" data-id="${c(String(d.id))}" data-active="${m?"1":"0"}" data-name="${c(d.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold ${m?"text-[#b91c1c] hover:bg-red-50":"text-[#156e3a] hover:bg-[#eef7f2]"}" aria-label="${m?"ระงับ":"เปิดใช้"} ${c(d.name)}">${f(m?"close":"check",15)}${m?"ระงับ":"เปิดใช้"}</button>`:""}
                      ${s&&!p?`<button type="button" data-action="um-reset-password" data-id="${c(String(d.id))}" data-name="${c(d.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-muted hover:bg-canvas" aria-label="รีเซ็ตรหัสผ่าน ${c(d.name)}">${f("logout",15)}รีเซ็ต</button>`:""}
                    </div>
                  </td>`:""}
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
      ${i>1?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-xs text-muted sm:px-6 sm:py-4">
        <span>แสดง ${q((n-1)*l+1)}–${q(Math.min(n*l,o))} จาก ${q(o)} บัญชี</span>
        <div class="flex items-center gap-2">
          <button type="button" data-action="um-page" data-page="${n-1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${n===1?"opacity-45 cursor-not-allowed":"hover:bg-canvas"}" ${n===1?'disabled aria-disabled="true"':""}>ก่อนหน้า</button>
          <span class="px-1 font-bold text-ink">${n} / ${i}</span>
          <button type="button" data-action="um-page" data-page="${n+1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${n===i?"opacity-45 cursor-not-allowed":"hover:bg-canvas"}" ${n===i?'disabled aria-disabled="true"':""}>ถัดไป</button>
        </div>
      </div>`:""}
    </section>
  `}function Qa(){const e="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",t=new Uint8Array(16);return crypto.getRandomValues(t),Array.from(t).map(a=>e[a%e.length]).join("")}async function ie(e=R){O.loading=!0,O.error=null,Nt(e);const t=new URLSearchParams;L.q&&t.set("q",L.q),L.role&&L.role!=="all"&&t.set("role",L.role),L.status&&L.status!=="all"&&t.set("status",L.status),t.set("sort",L.sort),t.set("direction",L.direction),t.set("page",String(L.page)),t.set("per_page","10");try{const a=window.serviceHubUrls?.apiUsers||"/api/users",r=await H(`${a}?${t}`);O.users=r.data??[],O.summary=r.summary??{},O.meta=r.meta??{}}catch(a){O.error=a.message||"ไม่สามารถโหลดข้อมูลผู้ใช้งานได้"}finally{O.loading=!1,Nt(e)}}async function er(){try{const e=window.serviceHubUrls?.apiRoles||"/api/roles",t=await H(e);O.roles=t.data??[]}catch{O.roles=Object.keys(xe).map(e=>({name:e}))}}function Nt(e=R){const t=document.getElementById("user-directory-root");t&&(t.innerHTML=aa(),tr(t,e))}function tr(e,t=R){e.querySelector('[data-action="um-search"]')?.addEventListener("input",a=>{clearTimeout(zt),zt=setTimeout(()=>{L.q=a.target.value.trim(),L.page=1,ie(t)},300)}),e.querySelector('[data-action="um-filter-role"]')?.addEventListener("change",a=>{L.role=a.target.value,L.page=1,ie(t)}),e.querySelector('[data-action="um-filter-status"]')?.addEventListener("change",a=>{L.status=a.target.value,L.page=1,ie(t)}),e.querySelector('[data-action="um-filter-sort"]')?.addEventListener("change",a=>{const[r,s]=a.target.value.split(":");L.sort=r,L.direction=s,L.page=1,ie(t)}),e.querySelector('[data-action="um-clear-filters"]')?.addEventListener("click",()=>{Object.assign(L,{q:"",role:"all",status:"all",sort:"created_at",direction:"desc",page:1}),ie(t)}),e.querySelectorAll('[data-action="um-page"]').forEach(a=>{a.addEventListener("click",()=>{L.page=Number(a.dataset.page),ie(t)})}),e.querySelector('[data-action="um-open-create"]')?.addEventListener("click",a=>{it({mode:"create",trigger:a.currentTarget,toastFn:t})}),e.querySelectorAll('[data-action="um-edit-user"]').forEach(a=>{a.addEventListener("click",r=>{const s=O.users.find(o=>String(o.id)===a.dataset.id);if(!s)return;const n=s.role??s.roles?.[0]?.name??s.roles?.[0]??"",i={...s,role:n};it({mode:"edit",user:i,trigger:r.currentTarget,toastFn:t})})}),e.querySelectorAll('[data-action="um-reset-password"]').forEach(a=>{a.addEventListener("click",r=>{const s={id:a.dataset.id,name:a.dataset.name};it({mode:"reset",user:s,trigger:r.currentTarget,toastFn:t})})}),e.querySelectorAll('[data-action="um-toggle-status"]').forEach(a=>{a.addEventListener("click",async()=>{const r=a.dataset.id,s=a.dataset.active==="1",n=a.dataset.name;if(await Et({title:s?"ยืนยันการระงับการใช้งาน":"ยืนยันการเปิดใช้งาน",message:`คุณต้องการ${s?"ระงับการใช้งาน":"เปิดใช้งาน"}บัญชี "${n}" ใช่หรือไม่? ${s?"ผู้ใช้จะถูกตัดเซสชันการเข้าใช้งานทันที":""}`,confirmText:s?"ระงับการใช้งาน":"เปิดใช้งาน",variant:s?"danger":"primary",iconName:s?"close":"check"})){a.disabled=!0;try{const o=window.serviceHubUrls?.apiUsers||"/api/users";await H(`${o}/${encodeURIComponent(r)}/status`,{method:"PATCH",body:{is_active:!s}}),t(s?"ระงับการใช้งานบัญชีแล้ว":"เปิดใช้งานบัญชีแล้ว"),await ie(t)}catch(o){t(o.message||"ไม่สามารถเปลี่ยนสถานะผู้ใช้ได้","error"),a.disabled=!1}}})})}function it({mode:e,user:t=null,trigger:a=null,toastFn:r=R}){const s=e==="reset",n=e==="edit",i=s?`รีเซ็ตรหัสผ่าน — ${c(t?.name)}`:n?"แก้ไขข้อมูลผู้ใช้":"เพิ่มผู้ใช้งานใหม่",o=O.roles.length?O.roles:Object.keys(xe).map(p=>({name:p})),l=document.createElement("div");l.innerHTML=`
    <div id="drawer-server-error" class="mb-4 hidden rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert"></div>
    <form id="um-drawer-form" novalidate class="space-y-4">
      ${s?`
        <div>
          <label for="um-new-password" class="mb-1.5 block text-sm font-semibold text-ink">รหัสผ่านใหม่ <span class="text-red-500">*</span></label>
          <div class="relative">
            <input id="um-new-password" name="password" type="password" autocomplete="new-password" class="field pr-12 font-mono" required minlength="15" aria-describedby="um-password-error">
            <button type="button" data-action="toggle-pwd-visibility" data-target="um-new-password" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="um-new-password">
              ${f("eye",18)}
            </button>
          </div>
          <p id="um-password-error" class="mt-1 text-xs text-muted" role="alert">ความยาวอย่างน้อย 15 ตัวอักษร</p>
          <button type="button" id="um-gen-pw-btn" class="mt-2 text-xs font-semibold text-primary hover:underline">สุ่มรหัสผ่านปลอดภัย</button>
        </div>
      `:`
        <div>
          <label for="um-name" class="mb-1.5 block text-sm font-semibold text-ink">ชื่อ-นามสกุล <span class="text-red-500">*</span></label>
          <input id="um-name" name="name" type="text" autocomplete="name" class="field" value="${c(t?.name??"")}" required maxlength="255" aria-describedby="um-name-error">
          <p id="um-name-error" class="mt-1 hidden text-xs text-red-600" role="alert"></p>
        </div>
        ${n?`
        <div>
          <p class="text-xs font-bold text-muted uppercase">ชื่อผู้ใช้</p>
          <p class="mt-1 font-mono text-sm font-bold text-ink">@${c(t?.username??"")}</p>
        </div>`:`
        <div>
          <label for="um-username" class="mb-1.5 block text-sm font-semibold text-ink">ชื่อผู้ใช้ (Username) <span class="text-red-500">*</span></label>
          <input id="um-username" name="username" type="text" autocomplete="username" class="field font-mono" placeholder="3-100 ตัวอักษร (a-z, 0-9, . - _)" required maxlength="100" aria-describedby="um-username-error">
          <p id="um-username-error" class="mt-1 hidden text-xs text-red-600" role="alert"></p>
        </div>`}
        <div>
          <label for="um-drawer-role" class="mb-1.5 block text-sm font-semibold text-ink">บทบาท <span class="text-red-500">*</span></label>
          <select id="um-drawer-role" name="role" class="field master-native-select">
            ${o.map(p=>`<option value="${c(p.name)}"${t?.role===p.name?" selected":""}>${c(xe[p.name]?.label||p.name)}</option>`).join("")}
          </select>
        </div>
        ${n?"":`
        <div>
          <label for="um-password" class="mb-1.5 block text-sm font-semibold text-ink">รหัสผ่านเริ่มต้น <span class="text-red-500">*</span></label>
          <div class="relative">
            <input id="um-password" name="password" type="password" autocomplete="new-password" class="field pr-12 font-mono" required minlength="15" aria-describedby="um-password-error">
            <button type="button" data-action="toggle-pwd-visibility" data-target="um-password" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="um-password">
              ${f("eye",18)}
            </button>
          </div>
          <p id="um-password-error" class="mt-1 text-xs text-muted" role="alert">ความยาวอย่างน้อย 15 ตัวอักษร</p>
          <button type="button" id="um-gen-init-pw-btn" class="mt-2 text-xs font-semibold text-primary hover:underline">สุ่มรหัสผ่านปลอดภัย</button>
        </div>`}
      `}
    </form>
  `;const d=`
    <button type="button" data-action="drawer-close" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-semibold text-ink hover:bg-canvas">ยกเลิก</button>
    <button type="submit" form="um-drawer-form" id="um-drawer-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">
      ${s?"รีเซ็ตรหัสผ่าน":n?"บันทึกการแก้ไข":"สร้างผู้ใช้งาน"}
    </button>
  `;l.querySelectorAll('[data-action="toggle-pwd-visibility"]').forEach(p=>{p.addEventListener("click",()=>{const b=l.querySelector(`#${p.dataset.target}`);if(!b)return;const v=b.type==="password";b.type=v?"text":"password",p.innerHTML=f(v?"eyeOff":"eye",18),p.setAttribute("aria-label",v?"ซ่อนรหัสผ่าน":"แสดงรหัสผ่าน"),p.setAttribute("aria-pressed",String(v))})});const u=()=>{const p=Qa(),b=l.querySelector("#um-password")||l.querySelector("#um-new-password");if(b){b.value=p,b.type="text";const v=l.querySelector(`[data-target="${b.id}"]`);v&&(v.innerHTML=f("eyeOff",18),v.setAttribute("aria-label","ซ่อนรหัสผ่าน"),v.setAttribute("aria-pressed","true"))}};l.querySelector("#um-gen-pw-btn")?.addEventListener("click",u),l.querySelector("#um-gen-init-pw-btn")?.addEventListener("click",u);const m=l.querySelector("#um-drawer-form");m.addEventListener("submit",async p=>{p.preventDefault();const b=document.getElementById("um-drawer-submit"),v=l.querySelector("#drawer-server-error");v.classList.add("hidden"),v.textContent="",l.querySelectorAll('[aria-invalid="true"]').forEach(_=>_.removeAttribute("aria-invalid")),l.querySelectorAll("#um-password-error").forEach(_=>{_.textContent="ความยาวอย่างน้อย 15 ตัวอักษร",_.classList.remove("text-red-600"),_.classList.add("text-muted")}),l.querySelectorAll("#um-name-error, #um-username-error").forEach(_=>{_.textContent="",_.classList.add("hidden")});const $=new FormData(m),k={};e==="create"?(k.name=String($.get("name")||"").trim(),k.username=String($.get("username")||"").trim(),k.password=String($.get("password")||""),k.role=String($.get("role")||"")):e==="edit"?(k.name=String($.get("name")||"").trim(),k.role=String($.get("role")||"")):e==="reset"&&(k.password=String($.get("password")||"")),b&&(b.disabled=!0,b.classList.add("opacity-60"));try{const _=window.serviceHubUrls?.apiUsers||"/api/users";let D,T;e==="create"?(D=_,T="POST"):e==="edit"?(D=`${_}/${encodeURIComponent(t.id)}`,T="PUT"):(D=`${_}/${encodeURIComponent(t.id)}/reset-password`,T="POST"),await H(D,{method:T,body:k}),Ye(),r(e==="create"?"สร้างผู้ใช้งานเรียบร้อยแล้ว":e==="edit"?"บันทึกการแก้ไขแล้ว":"รีเซ็ตรหัสผ่านเรียบร้อยแล้ว"),await ie(r)}catch(_){b&&(b.disabled=!1,b.classList.remove("opacity-60")),_.status===422&&_.errors?(Object.entries(_.errors).forEach(([D,T])=>{const A=m.querySelector(`[name="${D}"]`),E=m.querySelector(`#um-${D}-error`);A&&A.setAttribute("aria-invalid","true"),E&&(E.textContent=T[0],E.classList.remove("hidden","text-muted"),E.classList.add("text-red-600"))}),m.querySelector('[aria-invalid="true"]')?.focus()):(v.textContent=_.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล",v.classList.remove("hidden"))}}),Wa({title:i,content:l,footer:d,trigger:a,initialFocusSelector:e==="reset"?"#um-new-password":"#um-name"})}function ar(e){return setTimeout(()=>{ie(R),O.roles.length||er()},0),Ya()}let ra=[],P={"cleaning-zones":[],"waste-types":[],"drain-work-types":[]};const mt=new Set,Bt=new Set;let Ge=null;function sa(e){mt.delete(e),P[e]=[]}async function ot(e){const t=[...new Set(e.fields.filter(a=>a.type==="reference").map(a=>a.reference))];for(const a of t)mt.has(a)||!g(`${a}.view`)||(P[a]=await Kt(rt(a)),mt.add(a))}async function rr(e,t=new URLSearchParams){const a=re.find(n=>n.id===e);if(!a)throw new Error("Unknown activity module");const r=new URLSearchParams({per_page:"6",page:String(Math.max(1,Number.parseInt(t.get("page"),10)||1))});for(const n of["q","from","to","sort",...a.fields.filter(i=>i.type==="reference").map(i=>i.name)])t.get(n)&&r.set(n,t.get(n));const s=await H(`${Ae(e)}?${r}`);return ra=Array.isArray(s.data)?s.data:[],s}function na(e,t,a=P){return e?t==null||t===""?e.name==="drain_work_type_id"?"ยังไม่ระบุประเภทงาน":e.name==="service_users_count"?"ไม่ระบุ":"—":e.type==="reference"?c(a[e.reference]?.find(r=>String(r.id)===String(t))?.name||"ไม่พบข้อมูลอ้างอิง"):e.type==="number"||e.type==="integer"?`${q(t)}${e.unit?` ${c(e.unit)}`:""}`:e.type==="date"?F(t):c(t):"—"}function Lt(e,t){return t["waste-types"]?.some(a=>String(a.id)===String(e)&&a.code==="WASTE-004")||!1}function sr(e){if(e?.dataset.module!=="waste-collections")return;const t=e.elements.waste_type_id,a=e.querySelector("[data-hazardous-waste-field]"),r=e.elements.hazardous_waste_name;if(!a||!r)return;const s=t?.selectedOptions[0]?.dataset.code==="WASTE-004";a.hidden=!s,r.disabled=!s,s||(r.value="",r.removeAttribute("aria-invalid"),e.querySelector("#field-hazardous_waste_name-help").textContent="")}function Ft(e,t="",a="",r=P){const s=`field-${e.name}`,n=`id="${s}" name="${e.name}" class="field" ${e.required?"required":""} ${a?'aria-invalid="true"':""} aria-describedby="${s}-help"`;let i;if(e.type==="textarea")i=`<textarea ${n} rows="4" maxlength="10000">${c(t)}</textarea>`;else if(e.type==="reference")i=`
      <select ${n}>
        <option value="" disabled ${t?"":"selected"}>เลือก${c(e.label)}</option>
        ${(r[e.reference]||[]).filter(o=>o.is_active||String(o.id)===String(t)).map(o=>`
          <option value="${c(o.id)}" data-code="${c(o.code||"")}" ${String(t)===String(o.id)?"selected":""}>
            ${c(o.name)}${o.symbol?` (${c(o.symbol)})`:""}
          </option>
        `).join("")}
      </select>
    `;else if(e.type==="select")i=`
      <select ${n}>
        <option value="" disabled ${t?"":"selected"}>ระบุ${c(e.label)}</option>
        ${(e.options||[]).map(o=>`<option value="${c(o)}" ${t===o?"selected":""}>${c(o)}</option>`).join("")}
      </select>
    `;else{const o=e.type==="number"||e.type==="integer",l=e.type==="number"?["distance_km","fee_amount"].includes(e.name)?"0.01":"0.001":"1";i=`<input ${n} type="${o?"number":e.type}" ${o?`step="${l}" min="${e.min??0}"`:""} ${e.type==="text"?`maxlength="${e.name==="project_name"?500:255}"`:""} value="${c(t)}" placeholder="${e.type==="text"?`ระบุ${c(e.label)}`:""}">`}return`
    <div class="${e.type==="textarea"?"sm:col-span-2":""}">
      <label for="${s}" class="mb-1.5 block text-sm font-semibold text-[#41564c]">
        ${c(e.label)} ${e.required?'<span class="text-[#bf5b53]" aria-label="จำเป็น">*</span>':""}
      </label>
      ${i}
      <p id="${s}-help" class="mt-1.5 min-h-4 text-xs ${a?"text-[#b73c35]":"text-muted"}">
        ${a?c(a):e.unit?`หน่วย: ${c(e.unit)}`:"&nbsp;"}
      </p>
    </div>
  `}function nr(e,t,a=P){const r=Object.fromEntries(new FormData(e)),s={};return t.fields.forEach(n=>{if(n.wasteTypeCode&&!Lt(r.waste_type_id,a)){r[n.name]=null;return}const i=String(r[n.name]??"").trim();if(r[n.name]=i,n.required&&!i)s[n.name]=`กรุณาระบุ${n.label}`;else if(n.wasteTypeCode&&[...i].length>255)s[n.name]="ชื่อขยะอันตรายต้องไม่เกิน 255 ตัวอักษร";else if(i&&(n.type==="number"||n.type==="integer")){const o=Number(i);(!Number.isFinite(o)||o<(n.min??0)||n.name==="service_users_count"&&o>4294967295||n.type==="integer"&&!Number.isInteger(o))&&(s[n.name]=`กรุณาระบุ${n.label}เป็นจำนวนที่ถูกต้อง`)}else i&&n.type==="date"&&(!/^\d{4}-\d{2}-\d{2}$/.test(i)||Number.isNaN(new Date(`${i}T00:00:00Z`).getTime())||new Date(`${i}T00:00:00Z`).toISOString().slice(0,10)!==i)?s[n.name]="กรุณาระบุวันที่ที่ถูกต้อง":n.type==="reference"&&i&&!a[n.reference]?.some(o=>String(o.id)===i&&(o.is_active||n.name==="drain_work_type_id"&&e.dataset.originalDrainType===i))&&(s[n.name]=`กรุณาเลือก${n.label}จากรายการ`)}),t.fields.some(n=>n.name==="end_date")&&r.end_date&&r.service_date&&r.end_date<r.service_date&&(s.end_date="วันที่สิ้นสุดต้องไม่ก่อนวันเริ่ม"),{data:r,errors:s}}function ir({module:e,group:t,params:a,records:r=ra,references:s=P,meta:n=null}){const i=a.get("q")||"",o=a.get("from")||"",l=a.get("to")||"",d=a.get("sort")||"newest",u=6,m=Math.max(0,Number(n?.total??r.length)||0),p=Math.max(1,Number(n?.last_page)||Math.ceil(m/u)||1),b=Math.min(p,Math.max(1,Number(n?.current_page??a.get("page"))||1)),v=r,$=["septic-pumpings","septic-treatments","drain-cleanings"].includes(e.id)?e.fields.filter(h=>h.name!=="service_date"):e.fields.filter(h=>h.name!=="service_date").slice(0,["waste-collections","waterway-cleanings"].includes(e.id)?4:3),k=h=>{const C=new URLSearchParams(a);return C.set("page",String(h)),`#/module/${e.id}?${C}`},_=e.fields.filter(h=>h.type==="reference"&&h.name!=="drain_work_type_id").map(h=>{const C=a.get(h.name)||"";return`
      <div class="w-full min-w-0 sm:w-[170px]">
        <label for="${h.name}-filter" class="mb-1.5 block text-xs font-bold text-[#52665d]">${h.label}</label>
        <select id="${h.name}-filter" name="${h.name}" class="field">
          <option value="">ทั้งหมด</option>
          ${(s[h.reference]||[]).map(Y=>`<option value="${c(Y.id)}" ${C===String(Y.id)?"selected":""}>${c(Y.name)}</option>`).join("")}
        </select>
      </div>
    `}).join("");(o||l||d!=="newest"||e.fields.some(h=>h.type==="reference"&&a.get(h.name)))&&Bt.add(e.id);const T=Bt.has(e.id),A=[];o&&l?A.push(`ช่วงวันที่ ${F(o)} – ${F(l)}`):o?A.push(`ตั้งแต่วันที่ ${F(o)}`):l&&A.push(`ถึงวันที่ ${F(l)}`),i&&A.push(`ค้นหา "${i}"`),e.fields.filter(h=>h.type==="reference").forEach(h=>{const C=a.get(h.name);if(C){const Y=s[h.reference]?.find(he=>String(he.id)===String(C));Y&&A.push(`${h.label}: ${Y.name}`)}});const E=A.length>0,le=E?`
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#cfe5d6] bg-[#f0f8f3] px-4 py-3 text-xs sm:text-sm text-[#2b4c3c]" role="region" aria-label="สถานะตัวกรองข้อมูล">
      <div class="flex items-center gap-2">
        ${f("filter",16,"shrink-0 text-primary")}
        <div>
          <span class="font-bold">กำลังกรองข้อมูล:</span>
          <span class="text-[#3c594b]">${c(A.join(" · "))}</span>
          <span class="ml-1 text-xs text-muted font-normal">(${m>0?`พบ ${q(m)} รายการ`:"ไม่พบรายการ"})</span>
        </div>
      </div>
      <a href="#/module/${e.id}" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#b2dac0] bg-white px-3.5 py-1.5 text-xs font-bold text-primary shadow-xs hover:bg-[#ebf5ee]">
        ${f("close",14)}แสดงข้อมูลทั้งหมดทุกช่วงเวลา
      </a>
    </div>
  `:"";return`
    ${z(t?.label||"",e.label,`จัดการข้อมูล${e.short} ค้นหาและกรองรายการตามช่วงวันที่`,g(`${e.id}.create`)?we("เพิ่มข้อมูล",`#/module/${e.id}/new`):"")}
    <section aria-label="ตัวกรองรายการ" class="panel-shadow mb-5 w-full max-w-full min-w-0 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองข้อมูล</h2>
        ${st({from:o,to:l,formId:"filter-form"})}
      </div>
      <form id="filter-form" data-module="${e.id}" class="flex flex-wrap items-end gap-3">
        <div class="w-full min-w-0 sm:min-w-[180px] sm:flex-1">
          <label for="search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <div class="relative">
            ${f("search",18,"pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]")}
            <input id="search" name="q" class="field pl-10" type="search" placeholder="พิมพ์คำค้นหาแล้วกด Enter..." value="${c(i)}" autocomplete="off">
          </div>
        </div>
        <button type="button" data-action="toggle-mobile-filters" data-module="${e.id}" aria-expanded="${T}" aria-controls="advanced-filters-${e.id}" class="inline-flex min-h-11 w-full items-center justify-between rounded-xl border border-line px-4 text-sm font-semibold text-primary-dark md:hidden">
          ตัวกรองเพิ่มเติม ${f("chevronDown",16,T?"rotate-180":"")}
        </button>
        <div id="advanced-filters-${e.id}" class="${T?"flex":"hidden"} w-full flex-wrap items-end gap-3 md:contents">
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label>
            <input id="date-from" class="field" type="date" name="from" value="${c(o)}">
          </div>
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label>
            <input id="date-to" class="field" type="date" name="to" value="${c(l)}">
          </div>
          ${_}
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="sort" class="mb-1.5 block text-xs font-bold text-[#52665d]">เรียงตาม</label>
            <select id="sort" name="sort" class="field">
              <option value="newest" ${d==="newest"?"selected":""}>วันที่ล่าสุด</option>
              <option value="oldest" ${d==="oldest"?"selected":""}>วันที่เก่าสุด</option>
            </select>
          </div>
          <div class="w-full sm:w-auto">
            <a href="#/module/${e.id}" data-action="clear-filters" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas sm:w-auto">ล้างตัวกรอง</a>
          </div>
        </div>
        <button type="submit" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark sm:w-auto">ค้นหา</button>
      </form>
    </section>

    ${le}

    <section aria-labelledby="records-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
        <div>
          <h2 id="records-title" class="text-sm font-bold">รายการข้อมูล</h2>
          <p class="mt-0.5 text-xs text-muted">พบ ${q(m)} รายการ</p>
        </div>
        <span class="rounded-full bg-[#f0f7f2] px-2.5 py-1 text-[11px] font-bold text-primary">${c(e.short)}</span>
      </div>
      ${v.length?`
      <div class="data-table-scroll block overflow-x-auto w-full max-w-full min-w-0">
        <table class="w-full min-w-[650px] text-left text-sm" role="table">
          <thead class="bg-[#f9fbf9] text-xs font-semibold text-muted">
            <tr>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">${e.fields.find(h=>h.name==="service_date").label}</th>
              ${$.map(h=>`<th scope="col" class="px-5 py-3.5 whitespace-nowrap ${e.id==="waste-collections"&&h.name==="weight"?"text-right":""}">${c(h.label)}</th>`).join("")}
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">ผู้บันทึก</th>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">ดูข้อมูล</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef2ee]">
            ${v.map(h=>`
              <tr class="transition hover:bg-[#fafcfa]">
                <td class="whitespace-nowrap px-5 py-3.5 font-semibold text-ink">${F(h.service_date)}</td>
                ${$.map(C=>`<td class="max-w-[240px] ${["number","integer"].includes(C.type)||C.name==="drain_work_type_id"?"whitespace-normal break-words":"truncate"} ${e.id==="waste-collections"&&C.name==="weight"?"text-right":""} px-5 py-3.5 text-[#53675e]">${na(C,h[C.name],s)}</td>`).join("")}
                <td class="whitespace-nowrap px-5 py-3.5 text-muted">${c(h.created_by)}</td>
                <td class="whitespace-nowrap px-5 py-3.5 text-right">
                  <a href="#/module/${e.id}/${encodeURIComponent(h.id)}" class="inline-flex items-center gap-1 font-bold text-primary hover:underline">
                    รายละเอียด ${f("arrow",15)}
                  </a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-xs text-muted sm:px-6 sm:py-4">
        <span>แสดง ${q((b-1)*u+1)}–${q(Math.min(b*u,m))} จาก ${q(m)} รายการ</span>
        <div class="flex items-center gap-2">
          <a href="${k(Math.max(1,b-1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${b===1?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${b===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="px-1 font-bold text-ink">${b} / ${p}</span>
          <a href="${k(Math.min(p,b+1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${b===p?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${b===p?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:`
      <div class="flex flex-col items-center px-6 py-14 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${E?"bg-[#fef5e7] text-[#c2782b]":"bg-[#f1f7f2] text-primary"}">${f("empty",27)}</div>
        <h3 class="text-base font-bold text-ink">${E?"ไม่พบรายการข้อมูลตามเงื่อนไขที่เลือก":"ยังไม่มีข้อมูลในหมวดนี้"}</h3>
        <p class="mt-2 max-w-md text-sm leading-relaxed text-muted">
          ${E?`ไม่มีการบันทึกงานบริการ${c(e.short)}${o&&l?` ระหว่างวันที่ ${F(o)} ถึง ${F(l)}`:""} คุณสามารถคลิกปุ่มด้านล่างเพื่อดูข้อมูลทั้งหมดในอดีต หรือเลือกช่วงเวลาอื่น`:`เริ่มต้นด้วยการเพิ่มรายการข้อมูลการดำเนินงานในหมวด${c(e.short)}`}
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          ${E?`
            <a href="#/module/${e.id}" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-sm hover:bg-primary-dark">
              ${f("grid",16)}แสดงข้อมูลทั้งหมดทุกช่วงเวลา
            </a>
          `:""}
          ${g(`${e.id}.create`)?`
            <a href="#/module/${e.id}/new" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl ${E?"border border-line bg-white text-ink hover:bg-canvas":"bg-primary text-white hover:bg-primary-dark"} px-5 text-sm font-bold">
              ${f("plus",16)}เพิ่มข้อมูลใหม่
            </a>
          `:""}
        </div>
      </div>`}
    </section>
  `}function or({module:e,group:t,record:a,references:r=P}){return`
    ${z(t?.label||"","รายละเอียดข้อมูล",`ข้อมูล${e.short} วันที่ ${F(a.service_date)}`,`
      <div class="flex flex-wrap gap-2">
        ${g(`${e.id}.update`)?Z("แก้ไข",`#/module/${e.id}/${encodeURIComponent(a.id)}/edit`,"edit"):""}
        ${g(`${e.id}.delete`)?`
          <button type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#eed8d5] bg-white px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-activity" data-module="${e.id}" data-id="${c(a.id)}">
            ${f("trash",17)}ลบรายการ
          </button>`:""}
      </div>
    `)}
    <div class="grid min-w-0 grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
      <section class="panel-shadow rounded-2xl border border-line bg-white">
        <div class="border-b border-line px-5 py-5 sm:px-7">
          <h2 class="font-bold">ข้อมูลการดำเนินงาน</h2>
        </div>
        <dl class="grid min-w-0 grid-cols-1 gap-x-8 gap-y-0 p-5 sm:grid-cols-2 sm:p-7">
          ${e.fields.filter(s=>!s.wasteTypeCode||Lt(a.waste_type_id,r)).map(s=>`
            <div class="border-b border-[#edf1ed] py-4">
              <dt class="text-xs font-semibold text-muted">${c(s.label)}</dt>
              <dd class="mt-1.5 break-words text-sm font-bold text-ink">${na(s,a[s.name],r)}</dd>
            </div>
          `).join("")}
        </dl>
      </section>
      <aside class="h-fit rounded-2xl border border-line bg-white p-5">
        <h2 class="text-sm font-bold">ประวัติรายการ</h2>
        <div class="mt-5 space-y-5 border-l-2 border-[#d8eadf] pl-4">
          <div>
            <p class="text-xs font-bold text-primary">บันทึกข้อมูล</p>
            <p class="mt-1 text-xs text-muted">${c(a.created_by||"ไม่ระบุ")}</p>
            <p class="mt-0.5 text-xs text-muted">${F(a.created_at)}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-primary">แก้ไขล่าสุด</p>
            <p class="mt-1 text-xs text-muted">${c(a.updated_by||"ไม่ระบุ")}</p>
            <p class="mt-0.5 text-xs text-muted">${F(a.updated_at)}</p>
          </div>
        </div>
        <div class="mt-5 rounded-xl bg-[#f4f8f4] p-3 text-[11px] leading-relaxed text-muted">
          การเปลี่ยนแปลงถูกบันทึกใน Audit Log ของระบบ
        </div>
      </aside>
    </div>
  `}function Qe({module:e,group:t,record:a=null,errors:r={},values:s=null,references:n=P}){const i=!!a,o={...s||Ge||a||{}},l=[...e.fields];if(e.id==="drain-cleanings"){const u=l.findIndex(p=>p.name==="location"),m=l.findIndex(p=>p.name==="drain_work_type_id");[l[u],l[m]]=[l[m],l[u]]}if(!i&&!o.service_date){const u=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Bangkok",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),m=p=>u.find(b=>b.type===p).value;o.service_date=`${m("year")}-${m("month")}-${m("day")}`}const d=`${i?"แก้ไข":"เพิ่ม"}ข้อมูล${e.short}`;return`
    ${z(t?.label||"",d,i?"ตรวจสอบและแก้ไขรายละเอียดรายการนี้":"กรอกข้อมูลการดำเนินงานให้ครบตามช่องที่กำหนด")}
    <section class="panel-shadow w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-5 py-5 sm:px-7">
        <h2 class="font-bold">รายละเอียดการดำเนินงาน</h2>
        <p class="mt-1 text-xs text-muted">ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p>
      </div>
      <form id="record-form" data-module="${e.id}" data-original-drain-type="${c(a?.drain_work_type_id||"")}" data-id="${a?c(a.id):""}" novalidate class="p-5 sm:p-7">
        <div class="grid min-w-0 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          ${l.map(u=>{const m=Ft(u,o[u.name]??"",r[u.name],n);if(u.name==="drain_work_type_id"&&!(n["drain-work-types"]||[]).some(v=>v.is_active||String(v.id)===String(o[u.name])))return m+'<p class="text-sm text-muted sm:col-span-2">ยังไม่มีประเภทงานที่เลือกได้ กรุณาเพิ่มประเภทก่อนบันทึก'+(g("drain-work-types.create")&&g("drain-work-types.view")?' <a class="underline text-primary" href="#/drain-work-types/new">เพิ่มประเภทงานลอกท่อ</a>':" หรือติดต่อผู้ดูแลประเภทงาน")+"</p>";if(!u.wasteTypeCode)return m;const p=Lt(o.waste_type_id,n),b=Ft(u,p?o.hazardous_waste_name??"":"",r.hazardous_waste_name,n).replace('name="hazardous_waste_name"',`name="hazardous_waste_name" ${p?"":"disabled"}`);return`<div class="min-w-0" data-hazardous-waste-field ${p?"":"hidden"}>${b}</div>`}).join("")}
        </div>
        <div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <a href="${a?`#/module/${e.id}/${encodeURIComponent(a.id)}`:`#/module/${e.id}`}" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold text-[#566a60] hover:bg-canvas">
            ยกเลิก
          </a>
          <button type="submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">
            ${f("check",18)}${i?"บันทึกการแก้ไข":"บันทึกข้อมูล"}
          </button>
        </div>
      </form>
    </section>
  `}async function lr(e,t,{navigate:a=U,showToast:r=R}={}){if(await Et({title:"ยืนยันการลบรายการ",message:"รายการนี้จะถูกลบออกจากฐานข้อมูลอย่างถาวร คุณต้องการดำเนินการต่อหรือไม่?",confirmText:"ลบรายการ",variant:"danger",iconName:"trash"}))try{const n=`${Ae(e)}/${t}`;await H(n,{method:"DELETE"}),r("ลบรายการเรียบร้อยแล้ว"),a(`/module/${e}`)}catch(n){r(n.message||"ไม่สามารถลบรายการได้","error")}}async function dr(e){const t=e.dataset.module,a=re.find(i=>i.id===t);if(!a)return;const{data:r,errors:s}=nr(e,a,P),n=e.dataset.id?{id:e.dataset.id,drain_work_type_id:e.dataset.originalDrainType||null}:null;if(Object.keys(s).length){Ge=r;const i=Te.find(d=>d.id===a.group),o=Qe({module:a,group:i,record:n,errors:s,values:r,references:P}),l=document.querySelector("#main-content");l&&(l.innerHTML=o),document.querySelector('[aria-invalid="true"]')?.focus();return}try{const i=n?`${Ae(a.id)}/${n.id}`:Ae(a.id),l=await H(i,{method:n?"PUT":"POST",body:r});Ge=null,U(`/module/${a.id}/${l.data.id}`),R("บันทึกข้อมูลแล้ว")}catch(i){Ge=r;const o=i.fieldErrors||Object.fromEntries(Object.entries(i.fields||{}).map(([m,p])=>[m,Array.isArray(p)?p[0]:p]));R(i.message||"ไม่สามารถบันทึกข้อมูลได้","error");const l=Te.find(m=>m.id===a.group),d=Qe({module:a,group:l,record:n,errors:o,values:r,references:P}),u=document.querySelector("#main-content");u&&(u.innerHTML=d),document.querySelector('[aria-invalid="true"]')?.focus()}}async function cr(e){const t=e.parts[1],a=re.find(o=>o.id===t);if(!a)return'<div class="p-8 text-center text-muted">ไม่พบข้อมูลโมดูลงานบริการ</div>';const r=Te.find(o=>o.id===a.group);if(e.parts.length===2){const[o]=await Promise.all([rr(t,e.params),ot(a)]);if(!e.isCurrent())return null;const l=Math.max(1,Number.parseInt(e.params.get("page"),10)||1),d=Math.max(1,Number(o.meta?.last_page)||1);if(Number(o.meta?.total)>0&&l>d){const u=new URLSearchParams(e.params);return u.set("page",String(d)),U(`/module/${t}?${u}`),null}return ir({module:a,group:r,params:e.params,records:o.data,references:P,meta:o.meta})}if(e.parts.length===3&&e.parts[2]==="new")return g(`${a.id}.create`)?(await ot(a),Qe({module:a,group:r,record:null,references:P})):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์สร้างข้อมูลในหมวดนี้</div>';const s=decodeURIComponent(e.parts[2]||"");let n;try{[n]=await Promise.all([H(`${Ae(t)}/${encodeURIComponent(s)}`),ot(a)])}catch(o){if(o.status===404)return'<div class="p-8 text-center text-muted">ไม่พบรายการข้อมูลที่ต้องการ</div>';throw o}if(!e.isCurrent())return null;const i=n.data;return e.parts.length===4&&e.parts[3]==="edit"?g(`${a.id}.update`)?Qe({module:a,group:r,record:i,references:P}):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์แก้ไขข้อมูลในหมวดนี้</div>':or({module:a,group:r,record:i,references:P})}const ce="#/drain-work-types",pt=e=>g(`drain-work-types.${e}`);function ur(e,t){const a=(e.get("q")||"").trim(),r=t.filter(o=>`${o.code} ${o.name}`.toLocaleLowerCase("th-TH").includes(a.toLocaleLowerCase("th-TH"))).sort((o,l)=>o.code.localeCompare(l.code,"th",{numeric:!0})),s=Math.max(1,Math.ceil(r.length/10)),n=Math.min(s,Math.max(1,parseInt(e.get("page"),10)||1)),i=o=>`${ce}?${new URLSearchParams({...a?{q:a}:{},page:String(o)})}`;return`${z("ข้อมูลพื้นฐาน","ประเภทงานลอกท่อ","จัดการรหัสและชื่อประเภทงานลอกท่อระบายน้ำ",pt("create")?we("เพิ่มประเภท",ce+"/new"):"")}
    <section class="panel-shadow mb-5 rounded-xl border border-line bg-white p-4 sm:p-6">
      <form id="drainType-filter" class="flex min-w-0 flex-wrap items-end gap-3">
        <label class="w-full min-w-0 max-w-[400px] text-sm" for="drainType-search">ค้นหา<input id="drainType-search" class="field mt-1" type="search" name="q" value="${c(a)}" placeholder="ค้นหารหัสหรือชื่อประเภท"></label>
        <button class="min-h-11 rounded-xl bg-primary px-5 text-white">ค้นหา</button>${Z("ล้างตัวกรอง",ce)}
      </form>
    </section>
    <section class="panel-shadow min-w-0 rounded-xl border border-line bg-white p-4 sm:p-6"><h2>รายการประเภท</h2><p class="text-sm text-muted">พบ ${q(r.length)} รายการ</p>
      ${r.length?r.slice((n-1)*10,n*10).map(o=>`<a class="flex min-w-0 flex-wrap items-center gap-3 border-b border-line py-4" href="${ce}/${encodeURIComponent(o.id)}"><span class="max-w-full break-words text-primary">${c(o.code)}</span><span class="min-w-0 flex-1 break-words">${c(o.name)}</span><span class="text-sm text-muted">${o.is_active?"ใช้งาน":"ระงับใช้งาน"} · ใช้ ${q(o.usage_count)} รายการ</span></a>`).join(""):'<p class="py-8 text-muted">ไม่พบประเภทงานลอกท่อ เพิ่มประเภทก่อนบันทึกงานใหม่ หรือเปลี่ยนคำค้นหา</p>'}
      <nav aria-label="แบ่งหน้าประเภทงาน" class="mt-4 flex flex-wrap items-center gap-3">${n>1?Z("ก่อนหน้า",i(n-1)):""}<span>${n} / ${s}</span>${n<s?Z("ถัดไป",i(n+1)):""}</nav>
    </section>`}function ft(e=null,t={},a=e||{}){return`${z("ข้อมูลพื้นฐาน",e?"แก้ไขประเภทงานลอกท่อ":"เพิ่มประเภทงานลอกท่อ","กำหนดรหัส ชื่อ และสถานะสำหรับเลือกในฟอร์มงานลอกท่อ")}
    <section class="panel-shadow max-w-2xl rounded-xl border border-line bg-white p-4 sm:p-6"><form id="drainType-form" data-id="${c(e?.id||"")}" novalidate>
      <div class="grid min-w-0 gap-4 sm:grid-cols-2">${[["code","รหัสประเภท",50],["name","ชื่อประเภท",255]].map(([r,s,n])=>`<div class="min-w-0"><label for="drainType-${r}" class="text-sm">${s} *</label><input class="field mt-1" id="drainType-${r}" name="${r}" maxlength="${n}" required value="${c(a[r]||"")}" aria-describedby="drainType-${r}-error" ${t[r]?'aria-invalid="true"':""}><p id="drainType-${r}-error" class="text-sm text-red-700">${c(t[r]||"")}</p></div>`).join("")}</div>
      <label class="my-4 flex min-h-11 items-center gap-2"><input type="checkbox" name="is_active" ${a.is_active!==!1?"checked":""}>เปิดใช้งาน</label>
      <div class="flex flex-wrap gap-3">${Z("ยกเลิก",e?`${ce}/${encodeURIComponent(e.id)}`:ce)}<button class="min-h-11 rounded-xl bg-primary px-5 text-white">บันทึกข้อมูล</button></div>
    </form></section>`}function mr(e){return`${z("ข้อมูลพื้นฐาน",e.name,"รายละเอียดประเภทงานลอกท่อ",pt("update")?Z("แก้ไข",`${ce}/${encodeURIComponent(e.id)}/edit`):"")}
    <section class="panel-shadow min-w-0 rounded-xl border border-line bg-white p-4 sm:p-6"><dl class="grid min-w-0 gap-4 sm:grid-cols-2">${[["รหัสประเภท",e.code],["ชื่อประเภท",e.name],["สถานะ",e.is_active?"ใช้งาน":"ระงับใช้งาน"],["จำนวนงานที่ใช้งาน",q(e.usage_count)+" รายการ"]].map(([t,a])=>`<div class="min-w-0"><dt class="text-sm text-muted">${t}</dt><dd class="break-words">${c(a)}</dd></div>`).join("")}</dl>
      ${e.referenced_count?'<p class="mt-4 text-sm text-muted">มีงานอ้างอิงรวมถึงรายการที่ลบแล้ว จึงลบประเภทไม่ได้ สามารถแก้ไขเป็นระงับใช้งานได้</p>':""}
      <div class="mt-4 flex flex-wrap gap-3">${Z("กลับรายการ",ce)}${pt("delete")?`<button class="min-h-11 rounded-xl border border-line px-4 text-red-700" data-action="delete-reference" data-type="drain-work-types" data-id="${c(e.id)}" data-name="${c(e.name)}" data-usage="${q(e.referenced_count).replaceAll(",","")}">ลบประเภท</button>`:""}</div>
    </section>`}let je=[],Ue=[],et=[];const ia=new Set;async function nt(e){if(!g(`${e}.view`))return;const t=await Kt(rt(e));e==="cleaning-zones"&&(je=t),e==="waste-types"&&(Ue=t),e==="drain-work-types"&&(et=t),ia.add(e)}function oa(e){return Number(e.usage_count)||0}function la(e){return Number(e.usage_count)||0}function pr({params:e,zones:t=je}){const a=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),r=e.get("sort")==="name"?"name":"code",s=e.get("status")||"all",n=10,i=t.filter(m=>!a||(m.code+" "+m.name).toLocaleLowerCase("th-TH").includes(a)).filter(m=>s==="all"?!0:s==="active"?m.is_active:!m.is_active).sort((m,p)=>String(m[r]).localeCompare(String(p[r]),"th",{numeric:!0})),o=Math.max(1,Math.ceil(i.length/n)),l=Math.min(o,Math.max(1,Number.parseInt(e.get("page"),10)||1)),d=i.slice((l-1)*n,l*n),u=m=>{const p=new URLSearchParams;return e.get("q")&&p.set("q",e.get("q")),s!=="all"&&p.set("status",s),r!=="code"&&p.set("sort",r),m>1&&p.set("page",String(m)),"#/cleaning-zones"+(p.size?"?"+p:"")};return`
    ${z("ข้อมูลพื้นฐาน","เขตรักษาความสะอาด","จัดการรหัสและชื่อเขตสำหรับรายการล้างทำความสะอาดถนน",we("เพิ่มเขต","#/cleaning-zones/new"))}
    <section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6">
      <form id="zone-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_160px_160px_auto_auto] sm:items-end">
        <div>
          <label for="zone-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label>
          <input id="zone-search" name="q" type="search" class="field" placeholder="พิมพ์ค้นหาทันที..." value="${c(e.get("q")||"")}" data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="zone-status" class="mb-1.5 block text-sm font-semibold">สถานะ</label>
          <select id="zone-status" name="status" class="field master-native-select" data-action="live-filter">
            <option value="all" ${s==="all"?"selected":""}>ทุกสถานะ</option>
            <option value="active" ${s==="active"?"selected":""}>ใช้งานอยู่</option>
            <option value="inactive" ${s==="inactive"?"selected":""}>ระงับแล้ว</option>
          </select>
        </div>
        <div>
          <label for="zone-sort" class="mb-1.5 block text-sm font-semibold">เรียงตาม</label>
          <select id="zone-sort" name="sort" class="field master-native-select" data-action="live-filter">
            <option value="code" ${r==="code"?"selected":""}>รหัสเขต</option>
            <option value="name" ${r==="name"?"selected":""}>ชื่อเขต</option>
          </select>
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        <a href="#/cleaning-zones" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>
      </form>
    </section>

    <section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-4 py-4 sm:px-6">
        <h2 class="text-sm font-bold">รายการเขต</h2>
        <p class="mt-1 text-xs text-muted">พบ ${q(i.length)} รายการ</p>
      </div>
      ${d.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${d.map(m=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/cleaning-zones/${encodeURIComponent(m.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${c(m.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${c(m.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานล้างถนน ${q(oa(m))} รายการ</span>
            ${f("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบเขตรักษาความสะอาด</h3>
        <p class="mt-2 text-sm text-muted">${a?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มเขต"}</p>
        <div class="mt-5">${a?Z("แสดงทั้งหมด","#/cleaning-zones"):we("เพิ่มเขต","#/cleaning-zones/new")}</div>
      </div>`}
      ${i.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${q((l-1)*n+1)}–${q(Math.min(l*n,i.length))} จาก ${q(i.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===1?"pointer-events-none opacity-45":""}" href="${u(l-1)}" ${l===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${l} / ${o}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===o?"pointer-events-none opacity-45":""}" href="${u(l+1)}" ${l===o?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function fr({zone:e}){const t=oa(e),a=Number(e.referenced_count)||0;return`
    ${z("ข้อมูลพื้นฐาน",e.name,"รายละเอียดเขตรักษาความสะอาด",`
      <div class="flex flex-wrap gap-2">
        ${Z("แก้ไข",`#/cleaning-zones/${encodeURIComponent(e.id)}/edit`,"edit")}
        <button type="button" class="inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#eed8d5] bg-white px-4 py-2.5 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6] sm:w-auto" data-action="delete-reference" data-type="cleaning-zones" data-id="${c(e.id)}" data-name="${c(e.name)}" data-usage="${a}">
          ${f("trash",17)}<span>ลบเขต</span>
        </button>
      </div>
    `)}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7">
      <h2 class="text-base font-bold">ข้อมูลเขต</h2>
      <dl class="mt-4 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <dt class="text-xs font-semibold text-muted">รหัสเขต</dt>
          <dd class="mt-1 break-words font-bold">${c(e.code)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-muted">ชื่อเขต</dt>
          <dd class="mt-1 break-words font-bold">${c(e.name)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-muted">รายการล้างถนนที่ใช้เขตนี้</dt>
          <dd class="mt-1 font-bold">${q(t)} รายการ</dd>
        </div>
      </dl>
      ${a?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">เขตนี้ยังมีรายการล้างถนนอ้างอิงอยู่ รวมถึงรายการที่ลบออกจากหน้าจอ จึงไม่สามารถลบเขตได้</p>':""}
    </section>
  `}function bt(e=null,t={},a=e||{}){const s=!!e?"แก้ไขเขตรักษาความสะอาด":"เพิ่มเขตรักษาความสะอาด",n=(i,o,l)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="zone-${i}">
        ${c(o)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="zone-${i}" name="${i}" type="text" maxlength="${l}" required value="${c(a[i]||"")}" aria-describedby="zone-${i}-error" ${t[i]?'aria-invalid="true"':""}>
      <p id="zone-${i}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${c(t[i]||"")}</p>
    </div>
  `;return`
    ${z("ข้อมูลพื้นฐาน",s,"กรอกรหัสและชื่อเขตเพื่อใช้ในฟอร์มล้างทำความสะอาดถนน")}
    <section class="panel-shadow max-w-2xl rounded-2xl border border-line bg-white p-5 sm:p-7">
      <form id="zone-form" data-id="${c(e?.id||"")}" novalidate>
        <div class="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
          ${n("code","รหัสเขต",50)}
          ${n("name","ชื่อเขต",255)}
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
  `}function br({params:e,wasteTypes:t=Ue}){const a=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),r=10,s=t.filter(d=>!a||(d.code+" "+d.name).toLocaleLowerCase("th-TH").includes(a)).sort((d,u)=>String(d.code).localeCompare(String(u.code),"th",{numeric:!0})),n=Math.max(1,Math.ceil(s.length/r)),i=Math.min(n,Math.max(1,Number.parseInt(e.get("page"),10)||1)),o=s.slice((i-1)*r,i*r),l=d=>{const u=new URLSearchParams;return e.get("q")&&u.set("q",e.get("q")),d>1&&u.set("page",String(d)),"#/waste-types"+(u.size?"?"+u:"")};return`
    ${z("ข้อมูลพื้นฐาน","ประเภทขยะมูลฝอย","จัดการรหัสและชื่อประเภทสำหรับรายการมูลฝอย",we("เพิ่มประเภท","#/waste-types/new"))}
    <section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6">
      <form id="wasteType-filter" class="flex min-w-0 flex-wrap items-end justify-start gap-3">
        <div class="w-full min-w-0 max-w-[400px]">
          <label for="wasteType-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label>
          <input id="wasteType-search" name="q" type="search" class="field" placeholder="พิมพ์ค้นหาทันที..." value="${c(e.get("q")||"")}" data-action="live-filter" autocomplete="off">
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        <a href="#/waste-types" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>
      </form>
    </section>

    <section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-4 py-4 sm:px-6">
        <h2 class="text-sm font-bold">รายการประเภท</h2>
        <p class="mt-1 text-xs text-muted">พบ ${q(s.length)} รายการ</p>
      </div>
      ${o.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${o.map(d=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/waste-types/${encodeURIComponent(d.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${c(d.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${c(d.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานบริหารจัดการมูลฝอย ${q(la(d))} รายการ</span>
            ${f("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบประเภทขยะมูลฝอย</h3>
        <p class="mt-2 text-sm text-muted">${a?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มประเภท"}</p>
        <div class="mt-5">${a?Z("แสดงทั้งหมด","#/waste-types"):we("เพิ่มประเภท","#/waste-types/new")}</div>
      </div>`}
      ${s.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${q((i-1)*r+1)}–${q(Math.min(i*r,s.length))} จาก ${q(s.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${i===1?"pointer-events-none opacity-45":""}" href="${l(i-1)}" ${i===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${i} / ${n}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${i===n?"pointer-events-none opacity-45":""}" href="${l(i+1)}" ${i===n?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function xr({wasteType:e}){const t=la(e),a=Number(e.referenced_count)||0;return`
    ${z("ข้อมูลพื้นฐาน",e.name,"รายละเอียดประเภทขยะมูลฝอย",`
      <div class="flex flex-wrap gap-2">
        ${Z("แก้ไข",`#/waste-types/${encodeURIComponent(e.id)}/edit`,"edit")}
        <button type="button" class="inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#eed8d5] bg-white px-4 py-2.5 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6] sm:w-auto" data-action="delete-reference" data-type="waste-types" data-id="${c(e.id)}" data-name="${c(e.name)}" data-usage="${a}">
          ${f("trash",17)}<span>ลบประเภท</span>
        </button>
      </div>
    `)}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7">
      <h2 class="text-base font-bold">ข้อมูลประเภท</h2>
      <dl class="mt-4 grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <dt class="text-xs font-semibold text-muted">รหัสประเภท</dt>
          <dd class="mt-1 break-words font-bold">${c(e.code)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-muted">ชื่อประเภท</dt>
          <dd class="mt-1 break-words font-bold">${c(e.name)}</dd>
        </div>
        <div>
          <dt class="text-xs font-semibold text-muted">รายการมูลฝอยที่ใช้ประเภทนี้</dt>
          <dd class="mt-1 font-bold">${q(t)} รายการ</dd>
        </div>
      </dl>
      ${a?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">ประเภทนี้ยังมีรายการมูลฝอยอ้างอิงอยู่ รวมถึงรายการที่ลบออกจากหน้าจอ จึงไม่สามารถลบประเภทได้</p>':""}
    </section>
  `}function xt(e=null,t={},a=e||{}){const s=!!e?"แก้ไขประเภทขยะมูลฝอย":"เพิ่มประเภทขยะมูลฝอย",n=(i,o,l)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="wasteType-${i}">
        ${c(o)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="wasteType-${i}" name="${i}" type="text" maxlength="${l}" required value="${c(a[i]||"")}" aria-describedby="wasteType-${i}-error" ${t[i]?'aria-invalid="true"':""}>
      <p id="wasteType-${i}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${c(t[i]||"")}</p>
    </div>
  `;return`
    ${z("ข้อมูลพื้นฐาน",s,"กรอกรหัสและชื่อประเภทเพื่อใช้ในฟอร์มงานบริหารจัดการมูลฝอย")}
    <section class="panel-shadow max-w-2xl rounded-2xl border border-line bg-white p-5 sm:p-7">
      <form id="wasteType-form" data-id="${c(e?.id||"")}" novalidate>
        <div class="grid min-w-0 grid-cols-1 gap-5 sm:grid-cols-2">
          ${n("code","รหัสประเภท",50)}
          ${n("name","ชื่อประเภท",255)}
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
  `}async function hr(e,t,a,r,{navigate:s=U,showToast:n=R,refreshData:i=nt}={}){if(r>0){n(`ไม่สามารถลบ "${a}" ได้เนื่องจากมีข้อมูลงานบริการที่อ้างอิงอยู่`,"error");return}const o=e==="cleaning-zones"?"เขต":e==="drain-work-types"?"ประเภทงานลอกท่อ":"ประเภทขยะ";if(await Et({title:`ยืนยันการลบ${o}`,message:`คุณต้องการลบ "${a}" ออกจากระบบใช่หรือไม่?`,confirmText:`ลบ${o}`,variant:"danger",iconName:"trash"}))try{const d=`${rt(e)}/${t}`;await H(d,{method:"DELETE"}),n(`ลบ${o}เรียบร้อยแล้ว`),await i(e),sa(e),s(`/${e}`)}catch(d){n(d.message||`ไม่สามารถลบ${o}ได้`,"error")}}async function lt(e,t){const a=e.dataset.id,r=Object.fromEntries(new FormData(e));r.is_active=e.elements.namedItem("is_active")?.checked??!0;try{const s=`${rt(t)}${a?`/${a}`:""}`,n=await H(s,{method:a?"PUT":"POST",body:r});await nt(t),sa(t),U(`/${t}/${n.data.id}`),R("บันทึกข้อมูลแล้ว")}catch(s){R(s.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล","error");const n=s.fieldErrors||Object.fromEntries(Object.entries(s.fields||{}).map(([u,m])=>[u,Array.isArray(m)?m[0]:m])),o=(t==="drain-work-types"?et:t==="cleaning-zones"?je:Ue).find(u=>String(u.id)===a)||null,l=t==="drain-work-types"?ft(o,n,r):t==="cleaning-zones"?bt(o,n,r):xt(o,n,r),d=document.querySelector("#main-content");d&&(d.innerHTML=l)}}async function dt(e,t){if(ia.has(e)||await nt(e),e==="drain-work-types"){if(t.parts.length===1)return ur(t.params,et);if(t.parts[1]==="new")return g(e+".create")?ft():'<p role="alert">คุณไม่มีสิทธิ์เพิ่มประเภทงาน</p>';const i=et.find(o=>String(o.id)===decodeURIComponent(t.parts[1]));return i?t.parts[2]==="edit"?g(e+".update")?ft(i):'<p role="alert">คุณไม่มีสิทธิ์แก้ไขประเภทงาน</p>':mr(i):"<p>ไม่พบประเภทงานที่ต้องการ</p>"}const a=e==="cleaning-zones",r=a?je:Ue;if(t.parts.length===1)return a?pr({params:t.params,zones:je}):br({params:t.params,wasteTypes:Ue});if(t.parts.length===2&&t.parts[1]==="new")return a?bt():xt();const s=decodeURIComponent(t.parts[1]||""),n=r.find(i=>String(i.id)===s);return n?t.parts.length===3&&t.parts[2]==="edit"?a?bt(n):xt(n):a?fr({zone:n}):xr({wasteType:n}):'<div class="p-8 text-center text-muted">ไม่พบข้อมูลอ้างอิงที่ต้องการ</div>'}function gr(){const e=window.serviceHubUser||{},t=Zt(e.name||e.username||"U"),a=e.roles||[],r=a[0]||"staff",s=xe[r]||{label:r,color:"border-gray-200 bg-gray-50 text-gray-700"};return`
    ${z("โปรไฟล์ส่วนบุคคล","ข้อมูลบัญชีของฉัน","จัดการชื่อที่แสดงและเปลี่ยนรหัสผ่านสำหรับเข้าใช้งานระบบ")}
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Card 1: ข้อมูลบัญชีและแก้ไขชื่อ -->
      <section class="panel-shadow rounded-2xl border border-line bg-white p-5 sm:p-7 flex flex-col justify-between" aria-labelledby="profile-info-heading">
        <div>
          <div class="flex items-center gap-4 pb-6 border-b border-line">
            <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#177a67] to-[#0e6253] text-xl font-bold text-white shadow-md">
              ${c(t)}
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <h2 id="profile-info-heading" class="text-lg font-bold text-ink truncate">${c(e.name||e.username)}</h2>
                <span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.color}">
                  ${c(s.label)}
                </span>
                <span class="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                  ${f("check",12)} ใช้งานอยู่
                </span>
              </div>
              <p class="text-xs text-muted mt-1">ชื่อผู้ใช้: @${c(e.username)}</p>
            </div>
          </div>

          <form id="profile-name-form" class="mt-6 space-y-4" novalidate>
            <div>
              <label for="profile-username" class="mb-1 block text-sm font-semibold text-ink">ชื่อผู้ใช้ (Username)</label>
              <input id="profile-username" type="text" class="field w-full bg-[#f8faf8] text-muted cursor-not-allowed border-dashed" value="${c(e.username)}" readonly disabled>
              <p class="mt-1 text-[11px] text-muted">ชื่อผู้ใช้ถูกกำหนดโดยผู้ดูแลระบบและไม่สามารถเปลี่ยนแปลงได้</p>
            </div>

            <div>
              <label for="profile-name" class="mb-1 block text-sm font-semibold text-ink">ชื่อ-นามสกุลที่แสดง (Display Name) <span class="text-red-500">*</span></label>
              <input id="profile-name" name="name" type="text" required maxlength="255" class="field w-full" value="${c(e.name||"")}" placeholder="กรอกชื่อ-นามสกุลของคุณ">
              <p id="profile-name-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
            </div>

            <div>
              <label class="mb-1 block text-sm font-semibold text-ink">บทบาทหน้าที่ (Roles)</label>
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${a.map(n=>{const i=xe[n]||{label:n,color:"border-gray-200 bg-gray-50"};return`<span class="rounded-lg border px-2.5 py-1 text-xs font-medium ${i.color}">${c(i.label)}</span>`}).join("")}
              </div>
            </div>

            <div class="pt-2">
              <button type="submit" id="profile-name-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-50">
                ${f("check",17)}
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
            ${f("lock",20)}
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
                ${f("eye",18)}
              </button>
            </div>
            <p id="profile-current-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div>
            <div class="mb-1 flex items-center justify-between">
              <label for="profile-new-pwd" class="text-sm font-semibold text-ink">รหัสผ่านใหม่ <span class="text-red-500">*</span></label>
              <button type="button" id="profile-gen-pwd" class="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                ${f("sparkles",13)} สุ่มรหัสผ่านปลอดภัย
              </button>
            </div>
            <div class="relative">
              <input id="profile-new-pwd" name="password" type="password" required minlength="15" autocomplete="new-password" class="field w-full pr-12" placeholder="รหัสผ่านใหม่ไม่น้อยกว่า 15 ตัวอักษร">
              <button type="button" data-action="toggle-pwd" data-target="profile-new-pwd" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="profile-new-pwd">
                ${f("eye",18)}
              </button>
            </div>
            <p id="profile-new-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div>
            <label for="profile-confirm-pwd" class="mb-1 block text-sm font-semibold text-ink">ยืนยันรหัสผ่านใหม่ <span class="text-red-500">*</span></label>
            <div class="relative">
              <input id="profile-confirm-pwd" name="password_confirmation" type="password" required minlength="15" autocomplete="new-password" class="field w-full pr-12" placeholder="กรอกรหัสผ่านใหม่อีกครั้ง">
              <button type="button" data-action="toggle-pwd" data-target="profile-confirm-pwd" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="profile-confirm-pwd">
                ${f("eye",18)}
              </button>
            </div>
            <p id="profile-confirm-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div class="rounded-xl bg-[#f4f8f5] p-3 text-xs text-[#486358] leading-relaxed">
            <span class="font-bold text-primary-dark">ข้อกำหนดความปลอดภัย:</span> เมื่อเปลี่ยนรหัสผ่านเรียบร้อย ระบบจะตัดเซสชันในอุปกรณ์อื่นทั้งหมดทันที แต่เครื่องนี้จะยังคงใช้งานต่อได้ตามปกติ
          </div>

          <div class="pt-2">
            <button type="submit" id="profile-pwd-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-50">
              ${f("lock",17)}
              <span>บันทึกรหัสผ่านใหม่</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  `}function wr({toastFn:e=R,onNameUpdated:t}={}){const a=document.getElementById("profile-name-form"),r=document.getElementById("profile-password-form");document.querySelectorAll('[data-action="toggle-pwd"]').forEach(s=>{s.addEventListener("click",()=>{const n=s.dataset.target,i=document.getElementById(n);if(!i)return;const o=i.type==="password";i.type=o?"text":"password",s.innerHTML=f(o?"eyeOff":"eye",18),s.setAttribute("aria-label",o?"ซ่อนรหัสผ่าน":"แสดงรหัสผ่าน"),s.setAttribute("aria-pressed",String(o))})}),document.getElementById("profile-gen-pwd")?.addEventListener("click",()=>{const s="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",n=new Uint8Array(16);crypto.getRandomValues(n);const i=Array.from(n).map(d=>s[d%s.length]).join(""),o=document.getElementById("profile-new-pwd"),l=document.getElementById("profile-confirm-pwd");if(o){o.value=i,o.type="text";const d=document.querySelector('[data-target="profile-new-pwd"]');d&&(d.innerHTML=f("eyeOff",18),d.setAttribute("aria-label","ซ่อนรหัสผ่าน"),d.setAttribute("aria-pressed","true"))}if(l){l.value=i,l.type="text";const d=document.querySelector('[data-target="profile-confirm-pwd"]');d&&(d.innerHTML=f("eyeOff",18),d.setAttribute("aria-label","ซ่อนรหัสผ่าน"),d.setAttribute("aria-pressed","true"))}}),a?.addEventListener("submit",async s=>{s.preventDefault();const n=document.getElementById("profile-name"),i=document.getElementById("profile-name-error"),o=document.getElementById("profile-name-submit"),l=n.value.trim();if(!l){i&&(i.textContent="กรุณาระบุชื่อ-นามสกุล",i.classList.remove("hidden")),n.focus();return}i&&i.classList.add("hidden"),o&&(o.disabled=!0,o.classList.add("opacity-50"));try{const d=window.serviceHubUrls?.apiProfile||"/api/profile",u=await H(d,{method:"PUT",body:{name:l}});window.serviceHubUser&&(window.serviceHubUser.name=u.data?.name||l),e("บันทึกข้อมูลชื่อเรียบร้อยแล้ว"),typeof t=="function"&&t(l)}catch(d){const u=d.errors?.name?.[0]||d.message||"ไม่สามารถบันทึกชื่อได้";i&&(i.textContent=u,i.classList.remove("hidden")),e(u,"error")}finally{o&&(o.disabled=!1,o.classList.remove("opacity-50"))}}),r?.addEventListener("submit",async s=>{s.preventDefault();const n=document.getElementById("profile-current-pwd"),i=document.getElementById("profile-new-pwd"),o=document.getElementById("profile-confirm-pwd"),l=document.getElementById("profile-current-pwd-error"),d=document.getElementById("profile-new-pwd-error"),u=document.getElementById("profile-confirm-pwd-error"),m=document.getElementById("profile-pwd-submit");l.classList.add("hidden"),d.classList.add("hidden"),u.classList.add("hidden");let p=!1;if(n.value||(l.textContent="กรุณาระบุรหัสผ่านปัจจุบัน",l.classList.remove("hidden"),p=!0),(!i.value||i.value.length<15)&&(d.textContent="รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 15 ตัวอักษร",d.classList.remove("hidden"),p=!0),i.value!==o.value&&(u.textContent="รหัสผ่านยืนยันไม่ตรงกับรหัสผ่านใหม่",u.classList.remove("hidden"),p=!0),i.value&&n.value&&i.value===n.value&&(d.textContent="รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านปัจจุบัน",d.classList.remove("hidden"),p=!0),!p){m&&(m.disabled=!0,m.classList.add("opacity-50"));try{const b=window.serviceHubUrls?.apiProfilePassword||"/api/profile/password";await H(b,{method:"PUT",body:{current_password:n.value,password:i.value,password_confirmation:o.value}}),n.value="",i.value="",o.value="",e("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว เซสชันในอุปกรณ์อื่นถูกยกเลิกแล้ว")}catch(b){b.errors?.current_password&&(l.textContent=b.errors.current_password[0],l.classList.remove("hidden")),b.errors?.password&&(d.textContent=b.errors.password[0],d.classList.remove("hidden")),!b.errors?.current_password&&!b.errors?.password&&e(b.message||"เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน","error")}finally{m&&(m.disabled=!1,m.classList.remove("opacity-50"))}}})}function vr(e){return setTimeout(()=>{wr()},0),gr()}let tt=[],at={current_page:1,last_page:1};function yr({params:e,auditRows:t=tt,auditMeta:a=at}){if(!g("audit-logs.view"))return`
      <div class="panel-shadow mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-white p-10 text-center">
        <h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึง</h1>
        <p class="mt-2 text-sm text-muted">คุณไม่มีสิทธิ์ในการดูประวัติการแก้ไขข้อมูลของระบบ</p>
      </div>
    `;const r=e.get("q")||"",s=e.get("action")||"all",n=e.get("from")||"",i=e.get("to")||"",o=d=>{const u=new URLSearchParams;return r&&u.set("q",r),s!=="all"&&u.set("action",s),n&&u.set("from",n),i&&u.set("to",i),u.set("page",String(d)),`#/audit-logs?${u}`},l=!!(r||s!=="all"||n||i);return`
    ${z("การจัดการระบบ","ประวัติการแก้ไข","บันทึกการเพิ่ม แก้ไข และลบข้อมูลการปฏิบัติงานในระบบ")}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 mb-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองประวัติ</h2>
        ${st({from:n,to:i,formId:"audit-filter"})}
      </div>
      <form id="audit-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.2fr)_150px_140px_140px_auto_auto] sm:items-end">
        <div>
          <label for="audit-q" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <input id="audit-q" class="field" name="q" value="${c(r)}" placeholder="พิมพ์ค้นหาคำ หรือชื่อผู้ใช้..." data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="audit-action" class="mb-1.5 block text-xs font-bold text-[#52665d]">การกระทำ</label>
          <select id="audit-action" name="action" class="field master-native-select" data-action="live-filter">
            <option value="all" ${s==="all"?"selected":""}>ทุกการกระทำ</option>
            <option value="created" ${s==="created"?"selected":""}>สร้างข้อมูล (create)</option>
            <option value="updated" ${s==="updated"?"selected":""}>แก้ไขข้อมูล (update)</option>
            <option value="deleted" ${s==="deleted"?"selected":""}>ลบข้อมูล (delete)</option>
            <option value="auth" ${s==="auth"?"selected":""}>เข้าสู่ระบบ (auth)</option>
          </select>
        </div>
        <div>
          <label for="audit-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label>
          <input id="audit-from" class="field" type="date" name="from" value="${c(n)}" data-action="live-filter">
        </div>
        <div>
          <label for="audit-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label>
          <input id="audit-to" class="field" type="date" name="to" value="${c(i)}" data-action="live-filter">
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        ${l?'<a href="#/audit-logs" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>':""}
      </form>
      <div class="mt-4 divide-y divide-line">
        ${t.length?t.map(d=>`
          <div class="grid gap-2 py-3.5 text-sm sm:grid-cols-4 items-center">
            <strong class="font-bold text-primary-dark">${c(d.action)}</strong>
            <span class="text-muted font-mono text-xs">${c(d.subject_type||"")} #${c(d.subject_id||"")}</span>
            <span class="text-ink font-medium">${c(d.actor_username||"ระบบ")}</span>
            <time class="text-xs text-muted" datetime="${c(d.created_at)}">${F(d.created_at)}</time>
          </div>
        `).join(""):'<p class="py-8 text-center text-sm text-muted">ไม่มีประวัติการแก้ไขที่ตรงกับเงื่อนไข</p>'}
      </div>
      ${a.last_page>1?`
      <div class="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>หน้า ${a.current_page} / ${a.last_page}</span>
        <div class="flex gap-2">
          ${a.current_page>1?Z("ก่อนหน้า",o(a.current_page-1)):""}
          ${a.current_page<a.last_page?Z("ถัดไป",o(a.current_page+1)):""}
        </div>
      </div>`:""}
    </section>
  `}async function $r(e=new URLSearchParams){if(!g("audit-logs.view"))return{data:[],meta:{current_page:1,last_page:1}};try{const t=window.serviceHubUrls?.apiAudit||"/api/audit-logs",a=await H(`${t}?${e.toString()}`);return tt=a.data??[],at=a.meta??{current_page:1,last_page:1},{data:tt,meta:at}}catch(t){throw t}}async function kr(e){try{await $r(e.params)}catch(t){console.error("Error fetching audit logs:",t)}return yr({params:e.params,auditRows:tt,auditMeta:at})}const _r=[{id:"road-washings",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",short:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",group:"cleaning",fields:[{name:"service_date",label:"วันที่ดำเนินงาน",type:"date",required:!0},{name:"cleaning_zone_id",label:"เขตรักษาความสะอาด",type:"reference",reference:"cleaning-zones",required:!0},{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0}]},{id:"waterway-cleanings",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",short:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",group:"cleaning",fields:[{name:"service_date",label:"วันเริ่ม",type:"date",required:!0},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"waterway_name",label:"ชื่อแหล่งน้ำ",type:"text",required:!0},{name:"distance_km",label:"ระยะทางปฏิบัติงาน",type:"number",unit:"เมตร",required:!0},{name:"quantity",label:"ปริมาณที่กำจัดได้",type:"number",unit:"ลูกบาศก์เมตร",required:!0}]},{id:"road-sweepings",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",short:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",group:"cleaning",fields:[{name:"service_date",label:"วันที่ดำเนินงาน",type:"date",required:!0},{name:"road",label:"ถนน",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0}]},{id:"outsourced-cleanings",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",short:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",group:"cleaning",fields:[{name:"service_date",label:"วันที่ดำเนินงาน",type:"date",required:!0},{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0},{name:"community",label:"ชุมชน",type:"text",required:!0}]},{id:"waste-collections",label:"งานบริหารจัดการมูลฝอย",short:"งานบริหารจัดการมูลฝอย",group:"waste",fields:[{name:"service_date",label:"วันเริ่ม",type:"date",required:!0},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"source",label:"แหล่งที่เก็บ",type:"text",required:!0},{name:"waste_type_id",label:"ประเภทขยะมูลฝอย",type:"reference",reference:"waste-types",required:!0},{name:"weight",label:"น้ำหนัก",type:"number",unit:"กิโลกรัม",required:!0},{name:"hazardous_waste_name",label:"ชื่อขยะอันตราย",type:"text",required:!1,wasteTypeCode:"WASTE-004"}]},{id:"drain-cleanings",label:"งานลอกท่อระบายน้ำ",short:"ลอกท่อระบายน้ำ",group:"sanitation",fields:[{name:"service_date",label:"วันเริ่ม",type:"date",required:!0},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"location",label:"สถานที่",type:"text",required:!0},{name:"drain_work_type_id",label:"ประเภทงาน",type:"reference",required:!0,reference:"drain-work-types"},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"เมตร",required:!0},{name:"sediment_quantity",label:"ปริมาณตะกอน",type:"number",unit:"ลูกบาศก์เมตร",required:!0}]},{id:"septic-pumpings",label:"งานสูบสิ่งปฏิกูล",short:"สูบสิ่งปฏิกูล",group:"sanitation",fields:[{name:"service_date",label:"วันเริ่ม",type:"date",required:!0},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"service_users_count",label:"จำนวนผู้ใช้บริการ",type:"integer",unit:"คน",min:1,required:!0},{name:"volume",label:"ปริมาตรสิ่งปฏิกูลรวม",type:"number",unit:"ลูกบาศก์เมตร",required:!0},{name:"fee_amount",label:"ค่าธรรมเนียม",type:"number",unit:"บาท",required:!0}]},{id:"septic-treatments",label:"การบำบัดสิ่งปฏิกูล",short:"บำบัดสิ่งปฏิกูล",group:"sanitation",fields:[{name:"service_date",label:"วันเริ่ม",type:"date",required:!0},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"treated_volume",label:"บำบัดสิ่งปฏิกูลรวม",type:"number",unit:"ลูกบาศก์เมตร",required:!0},{name:"sludge_quantity",label:"ปริมาณตะกอนสำหรับทำปุ๋ย",type:"number",unit:"กิโลกรัม",required:!0},{name:"fertilizer_remaining",label:"ปุ๋ยอินทรีย์สูตร 2 คงเหลือ",type:"number",unit:"กิโลกรัม",required:!0},{name:"microbial_note",label:"ข้อมูลการใส่น้ำจุลินทรีย์ชีวภาพ",type:"textarea",required:!0}]},{id:"waste-management-projects",label:"โครงการพัฒนาระบบจัดการมูลฝอย",short:"โครงการพัฒนา",group:"projects",fields:[{name:"service_date",label:"วันที่ดำเนินงาน",type:"date",required:!0},{name:"project_name",label:"ชื่อโครงการ",type:"text",required:!0},{name:"communities_count",label:"จำนวนชุมชนที่เข้าร่วม",type:"integer",unit:"ชุมชน",required:!0},{name:"participants_count",label:"ผู้เข้าร่วมโครงการ",type:"integer",unit:"คน",required:!0}]}],Sr={modules:_r};function qr({module:e,params:t,data:a,meta:r,loading:s,error:n,modules:i,groups:o,can:l,esc:d,number:u,thaiDate:m,moduleHref:p}){const b=new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Bangkok"}).slice(0,7),v=t.has("from")||t.has("to")?"custom":"month",$=t.get("month")||b,k=new URLSearchParams;v==="custom"?(k.set("from",t.get("from")||""),k.set("to",t.get("to")||"")):t.has("month")&&k.set("month",$);const _=k.size?`?${k}`:"",D=y=>`#/reports/${encodeURIComponent(y)}${_}`,T=e?window.serviceHubUrls.apiReportDetailExport.replace("__MODULE__",encodeURIComponent(e.id))+_:window.serviceHubUrls.apiReportsExport+_,A=T+(_?"&":"?")+"format=xlsx",E=!e&&i.some(y=>l(`${y.id}.view`)&&!l(`${y.id}.export`)),le=e?l(`${e.id}.export`):i.some(y=>l(`${y.id}.export`)),h=e?e.short:"ภาพรวมงานบริการ",C=r?.period,Y=r?.comparison,he=y=>y?`${m(y.from)} – ${m(y.to)}`:"—",ve=e?a?.count:r?.total,ue=e?a?.previous_count:r?.previous_total,ye=ue===0||ue==null?null:Math.round((ve-ue)*1e3/ue)/10,Me=y=>Sr.modules.find(G=>G.id===y),Re=y=>Object.entries(y?.quantities||{}).flatMap(([G,te])=>te.map(J=>({field:G,...J}))),$e=(y,G)=>Me(y)?.fields.find(te=>te.name===G)?.label||G,Ie=y=>y.total==null?y.field==="service_users_count"?"ยังไม่มีข้อมูลจำนวนผู้ใช้บริการ":"—":u(y.total),He=y=>y.note?`<span class="block text-xs text-muted">${d(y.note)}</span>`:"",x=(y,G,te)=>`<div class="report-table-wrap min-w-0 max-w-full overflow-x-auto rounded-xl border border-line bg-white" role="region" aria-label="${d(te)}" tabindex="0"><table class="report-table w-full min-w-[680px] border-collapse text-sm"><thead><tr>${y.map(J=>`<th scope="col" class="border-b border-line bg-[#eaf5ef] px-4 py-3 text-left font-bold">${J}</th>`).join("")}</tr></thead><tbody>${G}</tbody></table></div>`,w=(y,G=!1,te="")=>`<td class="border-b border-line px-4 py-3 align-top ${G?"text-right tabular-nums":"break-words"}" ${te}>${y}</td>`,K=`
    <section class="report-controls no-print panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5">
      <form id="report-filter" data-report-module="${d(e?.id||"")}" class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap gap-4">
            <label class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><input type="radio" name="period_mode" value="month" ${v==="month"?"checked":""}>รายเดือน</label>
            <label class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><input type="radio" name="period_mode" value="custom" ${v==="custom"?"checked":""}>กำหนดช่วงวันที่</label>
          </div>
          <div data-report-custom ${v==="month"?"hidden":""}>
            ${st({from:t.get("from")||"",to:t.get("to")||"",formId:"report-filter"})}
          </div>
        </div>
        <div data-report-month ${v==="custom"?"hidden":""}>
          <label for="report-month" class="mb-1 block text-sm font-semibold">เดือนที่ดำเนินงาน</label>
          <input id="report-month" class="field max-w-sm" type="month" name="month" value="${d($)}" ${v==="custom"?"disabled":""} required>
        </div>
        <div data-report-custom class="grid gap-3 sm:grid-cols-2" ${v==="month"?"hidden":""}>
          <div>
            <label for="report-from" class="mb-1 block text-sm font-semibold">ตั้งแต่วันที่</label>
            <input id="report-from" class="field" type="date" name="from" value="${d(t.get("from")||"")}" ${v==="month"?"disabled":""} required>
          </div>
          <div>
            <label for="report-to" class="mb-1 block text-sm font-semibold">ถึงวันที่</label>
            <input id="report-to" class="field" type="date" name="to" value="${d(t.get("to")||"")}" ${v==="month"?"disabled":""} required>
          </div>
        </div>
        <p id="report-filter-error" class="text-sm text-red-700" role="alert"></p>
        <div class="flex flex-wrap gap-2">
          <button class="min-h-11 rounded-xl bg-primary px-5 font-bold text-white hover:bg-primary-dark" type="submit">แสดงรายงาน</button>
          <a href="#/reports${e?`/${encodeURIComponent(e.id)}`:""}" data-action="clear-filters" class="inline-flex min-h-11 items-center rounded-xl border border-line px-4 text-sm font-semibold text-muted hover:bg-[#f6faf7]">ล้างตัวกรอง</a>
          <button class="min-h-11 rounded-xl border border-line px-4 font-semibold" type="button" data-action="print-report">พิมพ์ / บันทึก PDF</button>
          ${le?`<a class="inline-flex min-h-11 items-center rounded-xl bg-primary px-4 font-bold text-white" data-action="download-report" href="${d(A)}">ดาวน์โหลด Excel</a><details class="self-center"><summary class="cursor-pointer text-sm text-muted">ตัวเลือกไฟล์อื่น</summary><a class="inline-flex min-h-11 items-center px-3 text-sm text-primary" href="${d(T)}">ส่งออกสรุป CSV</a></details>`:""}
        </div>
        ${E?'<p class="text-sm text-muted">ไฟล์ส่งออกมีเฉพาะหมวดที่คุณมีสิทธิ์ส่งออก จึงอาจน้อยกว่าข้อมูลบนหน้าจอ</p>':""}
        <p class="text-xs text-muted">Excel รวมสรุปและรายการจริง สูงสุด 5,000 รายการต่อครั้ง · PDF พิมพ์เฉพาะสรุป</p>
      </form>
    </section>
  `;let N="";if(s)N='<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังโหลดรายงาน…</section>';else if(n)N=`<section class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-6" role="alert"><p class="font-semibold text-red-700">${d(n)}</p><button type="button" data-action="retry-report" class="no-print mt-3 min-h-11 rounded-xl border border-red-200 bg-white px-4 font-semibold">ลองอีกครั้ง</button></section>`;else if(!r||!a)N='<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังเตรียมรายงาน…</section>';else{const y=e?[e]:i.filter(J=>l(`${J.id}.view`)),G=e?a.count?1:0:y.filter(J=>a[J.id]?.count>0).length,te=`<section class="grid min-w-0 gap-3 sm:grid-cols-3"><div class="rounded-xl border border-line bg-white p-4"><p class="text-sm text-muted">ช่วงวันที่รายงาน</p><strong class="mt-2 block">${he(C)}</strong></div><div class="rounded-xl border border-line bg-white p-4"><p class="text-sm text-muted">จำนวนงานทั้งหมด</p><strong class="mt-2 block text-2xl">${u(ve)} รายการ</strong></div><div class="rounded-xl border border-line bg-white p-4"><p class="text-sm text-muted">หมวดที่มีข้อมูล</p><strong class="mt-2 block text-2xl">${G} หมวด</strong></div></section><details class="report-comparison rounded-xl border border-line bg-white p-4"><summary class="cursor-pointer font-semibold">เปรียบเทียบช่วงก่อนหน้า</summary><p class="mt-2 text-sm">${he(Y)} · ${u(ue)} รายการ · ${ye==null?"เปรียบเทียบเป็นร้อยละไม่ได้":`เปลี่ยนแปลง ${ye>0?"+":""}${u(ye)}%`}</p></details>`;if(e){const J=Re(a).map(M=>`<tr>${w(d($e(e.id,M.field)))}${w(Ie(M)+He(M),!0)}${w(d(M.unit))}${w(M.kind==="latest"?"ค่าล่าสุด":"ผลรวม")}${w(M.as_of?m(M.as_of):"—")}</tr>`).join(""),me=a.breakdown?.length?`<section class="min-w-0"><h2 class="mb-3 text-lg font-bold">แยกตาม${e.id==="road-washings"?"เขตรักษาความสะอาด":"ประเภทขยะมูลฝอย"}</h2>${x(["ชื่อ","จำนวนรายการ","ปริมาณ","หน่วย"],a.breakdown.map(M=>`<tr>${w(d(M.name))}${w(u(M.count),!0)}${w(u(M.total),!0)}${w(d(M.unit))}</tr>`).join(""),"ข้อมูลแยกตามกลุ่ม")}</section>`:"",ke=p(e.id)+"?"+new URLSearchParams({from:C.from,to:C.to});N=te+`<section class="min-w-0"><h2 class="mb-3 text-lg font-bold">ตัวชี้วัดงานบริการ</h2>${x(["ตัวชี้วัด","ปริมาณ","หน่วย","ความหมาย","วันที่อ้างอิง"],J,"ตัวชี้วัดงานบริการ")}</section>`+me+`<a class="no-print inline-flex min-h-11 items-center font-semibold text-primary underline" href="${d(ke)}">ดูรายการทั้งหมดในช่วงนี้</a>`}else{const J=o.filter(me=>y.some(ke=>ke.group===me.id)).map(me=>{const ke=y.filter(M=>M.group===me.id).map(M=>{const Tt=a[M.id],_e=Re(Tt);return(_e.length?_e:[{field:"",total:null,unit:""}]).map((pe,At)=>`<tr class="even:bg-[#f8faf8]">${At===0?w(d(Me(M.id).label),!1,`rowspan="${Math.max(1,_e.length)}"`)+w(u(Tt?.count||0),!0,`rowspan="${Math.max(1,_e.length)}"`):""}${w(d($e(M.id,pe.field))+(pe.kind==="latest"?`<span class="block text-xs text-muted">ค่าล่าสุด${pe.as_of?" ณ "+m(pe.as_of):""}</span>`:""))}${w(Ie(pe)+He(pe),!0)}${w(d(pe.unit||""))}${At===0?w(`<a class="no-print inline-flex min-h-11 items-center font-semibold text-primary underline" href="${d(D(M.id))}">ดูรายละเอียด</a>`,!1,`rowspan="${Math.max(1,_e.length)}"`):""}</tr>`).join("")}).join("");return`<section class="min-w-0"><h2 class="mb-3 text-lg font-bold">${d(me.label)}</h2>${x(["หมวดงาน","จำนวนรายการ","ตัวชี้วัด","ปริมาณ","หน่วย",'<span class="no-print">ดูรายละเอียด</span>'],ke,me.label)}</section>`}).join("");N=te+(ve===0?'<p class="rounded-xl border border-line bg-white p-4 text-muted">ไม่มีรายการในช่วงที่เลือก</p>':"")+(J||"<p>ไม่มีหมวดที่ได้รับสิทธิ์ดู</p>")}}return`<div class="report-page space-y-5"><div class="flex flex-wrap items-start justify-between gap-3"><div><p class="text-xs font-bold tracking-wider text-primary">รายงานงานบริการ</p><h1 class="type-page-title mt-1">${d(h)}</h1><p class="mt-2 text-sm text-muted">ข้อมูลจริงจากวันที่ดำเนินงาน ตามสิทธิ์ของคุณ</p></div>${e?`<a class="no-print inline-flex min-h-11 items-center font-semibold text-primary underline" href="#/reports${_}">กลับภาพรวม</a>`:""}</div>${K}${N}</div>`}const B=document.querySelector("#app");let da=null,ht=!1,gt="",Fe=0,ca={},ua=null,ma=null,wt=!1,vt="",Oe=0,yt=0;async function pa(e=null){const t=++Fe,{params:a}=Q(),r=()=>e?e.isCurrent():Q().parts[0]==="dashboard";ht=!0,gt="",r()&&Ot();try{const s=new URLSearchParams;a.get("from")&&s.set("from",a.get("from")),a.get("to")&&s.set("to",a.get("to"));const n=(window.serviceHubUrls?.apiDashboard||"/api/dashboard")+(s.size?`?${s}`:""),i=await H(n);if(t!==Fe||!r())return;da=i.data}catch(s){if(t!==Fe||!r())return;gt=s.message||"ไม่สามารถโหลดภาพรวมได้"}finally{t===Fe&&r()&&(ht=!1,Ot())}}function Ot(){if(Q().parts[0]!=="dashboard")return;const{params:e}=Q(),t=Ka({data:da,loading:ht,error:gt,params:e,groups:Te,modules:re,icon:f,esc:c,number:q,moduleHref:oe});W(B,t,null,[{label:"แดชบอร์ดฝ่ายบริการ",current:!0}],!0),fe()}async function fa(e,t,a=null){const r=e[1]?re.find(o=>o.id===e[1]):null,s=++Oe,n=Q().hash,i=()=>a?a.isCurrent():Q().hash===n;wt=!0,vt="",i()&&await Vt(e,t);try{const o=window.serviceHubUrls?.apiReportDetail||"/api/reports/__MODULE__",l=window.serviceHubUrls?.apiReports||"/api/reports",d=(r?o.replace("__MODULE__",encodeURIComponent(r.id)):l)+(t.size?`?${t}`:""),u=await H(d);if(s!==Oe||!i())return;ma=u.meta,r?ua=u.data:ca=u.data}catch(o){if(s!==Oe||!i())return;vt=o.fields?.to?.[0]||o.fields?.from?.[0]||o.fields?.month?.[0]||o.message||"โหลดรายงานไม่สำเร็จ"}finally{s===Oe&&i()&&(wt=!1,await Vt(e,t))}}async function Vt(e,t){if(Q().parts[0]!=="reports"||Q().parts[1]!==e[1])return;const a=e[1]?re.find(n=>n.id===e[1]):null,r=qr({module:a,params:t,data:a?ua:ca,meta:ma,loading:wt,error:vt,modules:re,groups:Te,can:g,esc:c,number:q,thaiDate:F,moduleHref:oe}),s=a?[{label:"รายงาน",href:"#/reports"},{label:a.short,current:!0}]:[{label:"รายงาน",current:!0}];W(B,r,"reports",s),fe()}const Er={dashboard:async e=>{ne("dashboard"),await pa(e)},users:async e=>{if(!Ce()){U("#/dashboard"),R("คุณไม่มีสิทธิ์เข้าถึงหน้านี้","error");return}ne("users"),W(B,ar(),"users",[{label:"จัดการผู้ใช้งาน",current:!0}]),fe()},module:async e=>{const t=e.parts[1];if(t&&!g(`${t}.view`)){U("#/dashboard"),R("คุณไม่มีสิทธิ์เข้าถึงหมวดงานบริการนี้","error");return}ne(t);const a=re.find(n=>n.id===t),r=a?[{label:a.short,current:!0}]:[];(document.querySelector("#filter-form")?.dataset.module!==t||e.parts.length>2)&&W(B,'<section class="panel-shadow rounded-2xl border border-line bg-white p-6" role="status">กำลังโหลดข้อมูล...</section>',t,r);const s=await cr(e);e.isCurrent()&&(W(B,s,t,r),fe())},"cleaning-zones":async e=>{if(!g("cleaning-zones.view")){U("#/dashboard");return}ne("cleaning-zones");const t=await dt("cleaning-zones",e);e.isCurrent()&&(W(B,t,"cleaning-zones",[{label:"เขตรักษาความสะอาด",current:!0}]),fe())},"drain-work-types":async e=>{if(!g("drain-work-types.view")){W(B,'<p role="alert">คุณไม่มีสิทธิ์ดูประเภทงานลอกท่อ</p>',"drain-work-types");return}ne("drain-work-types");const t=await dt("drain-work-types",e);e.isCurrent()&&W(B,t,"drain-work-types",[{label:"ประเภทงานลอกท่อ",current:!0}])},"waste-types":async e=>{if(!g("waste-types.view")){U("#/dashboard");return}ne("waste-types");const t=await dt("waste-types",e);e.isCurrent()&&(W(B,t,"waste-types",[{label:"ประเภทขยะมูลฝอย",current:!0}]),fe())},profile:async e=>{ne("profile"),W(B,vr(),"profile",[{label:"โปรไฟล์ของฉัน",current:!0}])},"audit-logs":async e=>{if(!g("audit-logs.view")){U("#/dashboard");return}ne("audit-logs");const t=await kr(e);e.isCurrent()&&W(B,t,"audit-logs",[{label:"ประวัติการแก้ไข",current:!0}])},reports:async e=>{ne("reports"),await fa(e.parts,e.params,e)},"*":()=>{U("#/dashboard")}};function Lr(){document.addEventListener("click",async t=>{const a=t.target.closest("[data-action]");if(t.target.closest("#user-menu-container")||Je(),t.target.closest(".relative")||document.querySelectorAll(".custom-select-menu").forEach(s=>s.classList.add("hidden")),!a)return;const r=a.dataset.action;if(r==="open-menu"){Xe(!0),document.querySelector('#sidebar [data-action="close-menu"]')?.focus();return}if(r==="close-menu"){Xe(!1),document.querySelector('[data-action="open-menu"]')?.focus();return}if(r==="toggle-user-menu"){Ca();return}if(r==="close-user-menu"){Je();return}if(r==="delete-activity"){const s=a.dataset.module,n=a.dataset.id;await lr(s,n,{navigate:U,showToast:R});return}if(r==="delete-reference"){const s=a.dataset.type,n=a.dataset.id,i=a.dataset.name,o=Number(a.dataset.usage)||0;await hr(s,n,i,o,{navigate:U,showToast:R,refreshData:nt});return}if(r==="print-report"){window.print();return}if(r==="download-report"){if(t.preventDefault(),a.dataset.downloading)return;a.dataset.downloading="true",a.setAttribute("aria-busy","true");try{const s=await fetch(a.href,{credentials:"same-origin",headers:{Accept:"application/json"}});if(!s.ok){const o=await s.json().catch(()=>({})),l=Object.values(o.errors||{}).flat()[0];throw new Error(s.status===422?l||"กรุณาตรวจช่วงวันที่":s.status===429?`คำขอมากเกินไป กรุณารอ ${s.headers.get("Retry-After")||60} วินาทีแล้วลองใหม่`:s.status===403?"คุณไม่มีสิทธิ์ส่งออกรายงานนี้":"ดาวน์โหลดรายงานไม่สำเร็จ กรุณาลองอีกครั้ง")}const n=URL.createObjectURL(await s.blob()),i=document.createElement("a");i.href=n,i.download="รายงานงานบริการ.xlsx",i.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}catch(s){R(s.message||"ดาวน์โหลดรายงานไม่สำเร็จ","error")}finally{delete a.dataset.downloading,a.removeAttribute("aria-busy")}return}if(r==="retry-dashboard"){pa();return}if(r==="retry-report"){const{parts:s,params:n}=Q();fa(s,n);return}if(r==="retry-route"){if(Date.now()<yt){R(`กรุณารออีก ${Math.ceil((yt-Date.now())/1e3)} วินาทีก่อนลองใหม่`,"error");return}U(Q().hash);return}if(r==="toggle-mobile-filters"){const s=a.getAttribute("aria-expanded")==="true",n=document.getElementById(a.getAttribute("aria-controls"));a.setAttribute("aria-expanded",String(!s)),a.querySelector("svg")?.classList.toggle("rotate-180",!s),n?.classList.toggle("hidden",s),n?.classList.toggle("flex",!s);return}if(r==="set-date-preset"){const s=a.dataset.from,n=a.dataset.to,i=a.dataset.form,o=i?document.getElementById(i):a.closest("form");if(o){if(o.elements.period_mode){const l=o.querySelector('input[name="period_mode"][value="custom"]');l&&(l.checked=!0,l.dispatchEvent(new Event("change",{bubbles:!0})))}o.elements.from&&(o.elements.from.value=s),o.elements.to&&(o.elements.to.value=n),ut(o),o.requestSubmit?o.requestSubmit():o.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0}))}return}}),document.addEventListener("submit",async t=>{if(t.target.id==="record-form"){t.preventDefault(),dr(t.target);return}if(t.target.id==="drainType-form"){t.preventDefault(),lt(t.target,"drain-work-types");return}if(t.target.id==="drainType-filter"){t.preventDefault();const a=new FormData(t.target).get("q")?.trim();U("/drain-work-types"+(a?"?"+new URLSearchParams({q:a}):""));return}if(t.target.id==="zone-form"){t.preventDefault(),lt(t.target,"cleaning-zones");return}if(t.target.id==="wasteType-form"){t.preventDefault(),lt(t.target,"waste-types");return}if(t.target.id==="dashboard-filter"){t.preventDefault();const a=t.target,r=a.elements.from.value,s=a.elements.to.value,n=a.parentElement.querySelector("#dashboard-filter-error");if(!r&&!s){n&&n.classList.add("hidden"),U("/dashboard");return}if(!r||!s||r>s){n&&(n.textContent=!r||!s?"กรุณาระบุวันที่เริ่มต้นและสิ้นสุด":"วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น",n.classList.remove("hidden"));return}n&&n.classList.add("hidden"),U(`/dashboard?${new URLSearchParams({from:r,to:s})}`);return}if(t.target.id==="report-filter"){t.preventDefault();const a=t.target,r=a.elements.period_mode?.value,s=new URLSearchParams;if(r==="month"){if(!a.elements.month?.value)return;s.set("month",a.elements.month.value)}else{const i=a.elements.from?.value,o=a.elements.to?.value,l=a.querySelector("#report-filter-error");if(!i||!o||i>o){l&&(l.textContent=!i||!o?"กรุณาระบุวันที่เริ่มต้นและสิ้นสุด":"วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น");return}l&&(l.textContent=""),s.set("from",i),s.set("to",o)}const n=`#/reports${a.dataset.reportModule?`/${a.dataset.reportModule}`:""}?${s}`;U(n.replace("#",""));return}if(t.target.id==="filter-form"){t.preventDefault();const a=t.target,r=new URLSearchParams;new FormData(a).forEach((n,i)=>{const o=String(n).trim();o&&!(i==="sort"&&o==="newest")&&r.set(i,o)});const s=`#/module/${a.dataset.module}${r.size?`?${r}`:""}`;s!==Q().hash&&U(s);return}if(t.target.id==="zone-filter"){t.preventDefault();const a=new FormData(t.target),r=new URLSearchParams;String(a.get("q")||"").trim()&&r.set("q",String(a.get("q")).trim()),a.get("status")&&a.get("status")!=="all"&&r.set("status",a.get("status")),a.get("sort")==="name"&&r.set("sort","name"),U(`/cleaning-zones${r.size?`?${r}`:""}`);return}if(t.target.id==="wasteType-filter"){t.preventDefault();const a=new FormData(t.target),r=new URLSearchParams;String(a.get("q")||"").trim()&&r.set("q",String(a.get("q")).trim()),U(`/waste-types${r.size?`?${r}`:""}`);return}if(t.target.id==="audit-filter"){t.preventDefault();const a=new FormData(t.target),r=new URLSearchParams;String(a.get("q")||"").trim()&&r.set("q",String(a.get("q")).trim()),a.get("action")&&a.get("action")!=="all"&&r.set("action",a.get("action")),a.get("from")&&r.set("from",a.get("from")),a.get("to")&&r.set("to",a.get("to")),U(`/audit-logs${r.size?`?${r}`:""}`);return}});const e=Aa(t=>{t&&t.isConnected&&(t.requestSubmit?t.requestSubmit():t.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))},500);document.addEventListener("input",t=>{if(t.target.dataset.action==="live-filter"&&t.target.type!=="date"){const a=t.target.form;a&&e(a)}}),document.addEventListener("change",t=>{if(t.target.name==="waste_type_id"&&t.target.closest("#record-form")&&sr(t.target.form),t.target.dataset.action==="live-filter"){const a=t.target.form;a&&(a.requestSubmit?a.requestSubmit():a.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}if(t.target.name==="period_mode"&&t.target.closest("#report-filter")){const a=t.target.form,r=t.target.value==="custom",s=a.querySelector("[data-report-month]"),n=a.querySelector("[data-report-custom]");s&&(s.hidden=r),n&&(n.hidden=!r),a.elements.month&&(a.elements.month.disabled=r),a.elements.from&&(a.elements.from.disabled=!r),a.elements.to&&(a.elements.to.disabled=!r),ut(a)}})}function Tr(){Yt(),Ha(),Ea(B),Lr(),va(Er,{onDenied:e=>{if(!e.isCurrent())return;W(B,'<section class="panel-shadow mx-auto max-w-lg rounded-2xl border border-line bg-white p-6 text-center" role="alert"><h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึงหน้านี้</h1><p class="mt-2 text-sm text-muted">บัญชีนี้ยังไม่ได้รับสิทธิ์ดูข้อมูลในหมวดที่เลือก</p><a href="#/dashboard" class="mt-5 inline-flex min-h-11 items-center font-bold text-primary underline">กลับแดชบอร์ด</a></section>',null,[{label:"ไม่มีสิทธิ์เข้าถึง",current:!0}])},onError:(e,t)=>{if(!t.isCurrent())return;const a=e.status===429,r=Number(e.retryAfterSeconds)||0;yt=a&&r>0?Date.now()+r*1e3:0;const s=a?"คำขอถี่เกินกำหนด":e.status===403?"ไม่มีสิทธิ์เข้าถึงข้อมูล":"โหลดหน้าไม่สำเร็จ",n=a?`กรุณารอ${r>0?` ${r} วินาที`:"สักครู่"}ก่อนลองใหม่`:e.status===403?"บัญชีนี้ยังไม่ได้รับสิทธิ์ดูข้อมูลในส่วนที่เลือก":"กรุณาลองใหม่อีกครั้ง หากยังพบปัญหาให้ติดต่อผู้ดูแลระบบ",i=`<section class="panel-shadow mx-auto max-w-lg rounded-2xl border border-red-200 bg-white p-6 text-center" role="alert"><h1 class="text-xl font-bold">${s}</h1><p class="mt-2 text-sm text-muted">${n}</p><button type="button" data-action="retry-route" class="mt-5 min-h-11 rounded-xl border border-line px-4 font-bold text-primary">ลองอีกครั้ง</button></section>`;W(B,i,null,[{label:"โหลดหน้าไม่สำเร็จ",current:!0}])},afterRender:()=>{fe()}})}Tr();
