const be=[{id:"cleaning",label:"งานบริการรักษาความสะอาด",short:"รักษาความสะอาด",icon:"sparkles",tone:"mint"},{id:"waste",label:"งานบริการมูลฝอย",short:"บริการมูลฝอย",icon:"recycle",tone:"sky"},{id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",short:"จัดการสิ่งปฏิกูล",icon:"droplet",tone:"amber"},{id:"projects",label:"งานพัฒนาระบบจัดการมูลฝอย",short:"พัฒนาระบบ",icon:"chart",tone:"violet"}],J={name:"service_date",label:"วันที่ดำเนินงาน",type:"date",required:!0},Q=[{id:"road-washings",group:"cleaning",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",short:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",icon:"road",titleField:"location",fields:[J,{name:"cleaning_zone_id",label:"เขตรักษาความสะอาด",type:"reference",reference:"cleaning-zones",required:!0},{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0}]},{id:"waterway-cleanings",group:"cleaning",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",short:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",icon:"waves",titleField:"waterway_name",fields:[J,{name:"waterway_name",label:"ชื่อแหล่งน้ำ",type:"text",required:!0},{name:"distance_km",label:"ระยะทางปฏิบัติงาน",type:"number",unit:"กิโลเมตร",required:!0},{name:"quantity",label:"ปริมาณที่กำจัดได้",type:"number",unit:"ลูกบาศก์เมตร",required:!0}]},{id:"road-sweepings",group:"cleaning",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",short:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",icon:"sparkles",titleField:"road",fields:[J,{name:"road",label:"ถนน",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0}]},{id:"outsourced-cleanings",group:"cleaning",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",short:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",icon:"users",titleField:"location",fields:[J,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0},{name:"community",label:"ชุมชน",type:"text",required:!0}]},{id:"waste-collections",group:"waste",label:"งานบริหารจัดการมูลฝอย",short:"งานบริหารจัดการมูลฝอย",icon:"recycle",titleField:"source",fields:[{...J,label:"วันเริ่ม"},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"source",label:"แหล่งที่เก็บ",type:"text",required:!0},{name:"waste_type_id",label:"ประเภทขยะมูลฝอย",type:"reference",reference:"waste-types",required:!0},{name:"weight",label:"น้ำหนัก",type:"number",unit:"กิโลกรัม",required:!0}]},{id:"drain-cleanings",group:"sanitation",label:"งานลอกท่อระบายน้ำ",short:"ลอกท่อระบายน้ำ",icon:"droplet",titleField:"location",fields:[J,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0},{name:"sediment_quantity",label:"ปริมาณตะกอน",type:"number",unit:"ลูกบาศก์เมตร",required:!0}]},{id:"septic-pumpings",group:"sanitation",label:"งานสูบสิ่งปฏิกูล",short:"สูบสิ่งปฏิกูล",icon:"truck",titleField:"location",fields:[J,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"volume",label:"ปริมาตรสิ่งปฏิกูล",type:"number",unit:"ลูกบาศก์เมตร",required:!0},{name:"fee_amount",label:"ค่าธรรมเนียม",type:"number",unit:"บาท",required:!0}]},{id:"septic-treatments",group:"sanitation",label:"การบำบัดสิ่งปฏิกูล",short:"บำบัดสิ่งปฏิกูล",icon:"flask",titleField:"service_date",fields:[J,{name:"sludge_quantity",label:"ปริมาณตะกอนสำหรับทำปุ๋ย",type:"number",unit:"กิโลกรัม",required:!0},{name:"fertilizer_remaining",label:"ปุ๋ยอินทรีย์สูตร 2 คงเหลือ",type:"number",unit:"กิโลกรัม",required:!0},{name:"microbial_note",label:"ข้อมูลการใส่น้ำจุลินทรีย์ชีวภาพ",type:"textarea",required:!0}]},{id:"waste-management-projects",group:"projects",label:"โครงการพัฒนาระบบจัดการมูลฝอย",short:"โครงการพัฒนา",icon:"chart",titleField:"project_name",fields:[J,{name:"project_name",label:"ชื่อโครงการ",type:"text",required:!0},{name:"communities_count",label:"จำนวนชุมชนที่เข้าร่วม",type:"integer",unit:"ชุมชน",required:!0},{name:"participants_count",label:"ผู้เข้าร่วมโครงการ",type:"integer",unit:"คน",required:!0}]}];class $e extends Error{constructor(t,r=0,a=null){super(t),this.name="ApiError",this.status=r,this.data=a,this.errors=a&&typeof a=="object"&&a.errors?a.errors:{}}get fieldErrors(){const t={};if(!this.errors||typeof this.errors!="object")return t;for(const[r,a]of Object.entries(this.errors))t[r]=Array.isArray(a)?a[0]||"":String(a||"");return t}get isValidationError(){return this.status===422}get isRateLimited(){return this.status===429}get isUnauthorized(){return this.status===401||this.status===419}get isForbidden(){return this.status===403}}function Vt(){return document.querySelector('meta[name="csrf-token"]')?.content||""}function Zt(){return window.serviceHubUrls?.login||"/login"}function y(e){const t=window.serviceHubUser;return t?(Array.isArray(t.roles)?t.roles:[]).includes("super-admin")?!0:(Array.isArray(t.permissions)?t.permissions:[]).includes(e):!1}const Kt=["super-admin","admin"];function Ie(){const e=window.serviceHubUser?.roles??[];return Array.isArray(e)&&e.some(t=>Kt.includes(t))}function _e(e){if(!Ie())return!1;if((window.serviceHubUser?.roles??[]).includes("super-admin"))return!0;const r=window.serviceHubUser?.permissions??[];return Array.isArray(r)&&r.includes(e)}function xe(e){return(window.serviceHubUrls?.apiActivities||"/api/activities/__MODULE__").replace("__MODULE__",encodeURIComponent(e))}function He(e){return(window.serviceHubUrls?.apiReferences||"/api/references/__TYPE__").replace("__TYPE__",encodeURIComponent(e))}async function I(e,t={}){const r=Vt(),a={Accept:"application/json","X-Requested-With":"XMLHttpRequest",...r?{"X-CSRF-TOKEN":r}:{},...t.headers||{}};let s=t.body;const n=typeof FormData<"u"&&s instanceof FormData,i=typeof Blob<"u"&&s instanceof Blob,o=typeof URLSearchParams<"u"&&s instanceof URLSearchParams;s&&typeof s=="object"&&!n&&!i&&!o&&(s=JSON.stringify(s),a["Content-Type"]||(a["Content-Type"]="application/json"));let l;try{l=await fetch(e,{credentials:"same-origin",...t,headers:a,body:s})}catch(m){throw m instanceof $e?m:new $e(m.message||"ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง",0)}if(l.status===401||l.status===419){const m=Zt();throw window.location.assign(m),new $e("เซสชันของคุณหมดอายุ กรุณาเข้าสู่ระบบใหม่",l.status)}const d=await l.json().catch(()=>({}));if(!l.ok){let m=d.message,u=0;if(l.status===429){const b=l.headers?.get?.("Retry-After"),h=Number(b);u=Number.isFinite(h)&&h>0?Math.ceil(h):Math.max(0,Math.ceil((Date.parse(b||"")-Date.now())/1e3)||0),m=u?`คำขอส่งมาถี่เกินไป กรุณารอ ${u} วินาทีแล้วลองใหม่อีกครั้ง`:"คำขอส่งมาถี่เกินไป กรุณารอสักครู่แล้วลองใหม่อีกครั้ง (Too Many Attempts)"}else l.status===403?m=m||"คุณไม่มีสิทธิ์ดำเนินการในส่วนนี้":l.status===422?m=m||"ข้อมูลที่ส่งไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง":m=m||`เกิดข้อผิดพลาด (${l.status})`;const p=new $e(m,l.status,d);throw p.fields=d.errors||{},p.retryAfterSeconds=u,p}return d}async function vt(e,t={}){let r=1;const a=[];for(;;){const s=e.includes("?")?"&":"?",n=`${e}${s}per_page=100&page=${r}`,i=await I(n,t);Array.isArray(i.data)&&a.push(...i.data);const o=i.meta?.last_page||1;if(r>=o)break;r++}return a}const wt=" — เทศบาลนครนนทบุรี",Ze="/dashboard";function je(e=window.location.hash){let t=e||"";if(t.startsWith("#")&&(t=t.slice(1)),t.startsWith("figmacapture="))return{hash:"#/dashboard",path:"/dashboard",parts:["dashboard"],params:new URLSearchParams,query:{}};const[r,a=""]=(t||Ze).split("?"),s=r.startsWith("/")?r:`/${r}`,n=s.split("/").filter(Boolean),i=new URLSearchParams(a),o=Object.fromEntries(i.entries());return{hash:`#${s}${a?`?${a}`:""}`,path:s,parts:n.length?n:["dashboard"],params:i,query:o}}function W(){return je()}function it(e,t=wt){const r=(e||"แดชบอร์ดฝ่ายบริการ").trim();r.endsWith(t.trim())?document.title=r:document.title=`${r}${t}`}function Yt(e){const[t,r]=e.parts;return t==="dashboard"||!e.parts.length?"แดชบอร์ดฝ่ายบริการ":t==="login"?"เข้าสู่ระบบ":t==="users"?"จัดการผู้ใช้งาน":t==="profile"?"โปรไฟล์ส่วนบุคคล":t==="audit-logs"?"ประวัติการแก้ไข":t==="cleaning-zones"?"เขตรักษาความสะอาด":t==="waste-types"?"ประเภทขยะมูลฝอย":t==="reports"?Q.find(s=>s.id===r)?.short||"รายงาน":t==="module"?Q.find(s=>s.id===r)?.short||"งานบริการ":"แดชบอร์ดฝ่ายบริการ"}class Wt{constructor(t={},r={}){let a={};t&&typeof t=="object"&&!t.defaultRoute&&!t.routes?a={routes:t,...r}:a=t||{},this.routes={},this.options={defaultRoute:Ze,titleSuffix:wt,...a},this.current=je(),this.beforeHooks=[],this.afterHooks=[],this.notFoundHandler=null,this.navigationSequence=0,this.options.routes&&this.registerRoutes(this.options.routes)}registerRoutes(t){for(const[r,a]of Object.entries(t))typeof a=="function"?this.routes[r]={handler:a}:this.routes[r]=a}setNotFound(t){this.notFoundHandler=t}beforeEach(t){this.beforeHooks.push(t)}afterEach(t){this.afterHooks.push(t)}navigate(t,r={}){let a=t||Ze;a.startsWith("#")&&(a=a.slice(1)),a.startsWith("/")||(a=`/${a}`);const s=`#${a}`;window.location.hash===s?this.resolve():r.replace?window.location.replace(s):window.location.hash=s,r.noScroll||window.scrollTo({top:0,behavior:"smooth"})}async checkGuards(t,r){if(t.parts[0]==="login"){const s=window.serviceHubUrls?.login||"/login";return window.location.replace(s),!1}for(const s of this.beforeHooks){const n=await s(t);if(n===!1)return!1;if(typeof n=="string")return n}if(r?.guard){const s=await r.guard(t);if(s===!1)return!1;if(typeof s=="string")return s}const a=t.parts[0];if(a==="users"&&!Ie()||a==="audit-logs"&&!y("audit-logs.view")||a==="cleaning-zones"&&!y("cleaning-zones.view")||a==="waste-types"&&!y("waste-types.view"))return!1;if(a==="module"&&t.parts[1]){const s=t.parts[1];if(!y(`${s}.view`))return!1}return!0}async resolve(){const t=++this.navigationSequence,r=je();r.isCurrent=()=>t===this.navigationSequence&&je().hash===r.hash,this.current=r;const a=r.parts[0]||"dashboard",s=this.routes[a]||this.routes["*"],n=await this.checkGuards(r,s);if(!r.isCurrent())return;if(n===!1){typeof this.options.onDenied=="function"?await this.options.onDenied(r):this.notFoundHandler&&await this.notFoundHandler(r),it("ไม่พบหน้าหรือไม่มีสิทธิ์เข้าถึง",this.options.titleSuffix);return}if(typeof n=="string"){this.navigate(n);return}let i="";s?.title?i=typeof s.title=="function"?s.title(r):s.title:i=Yt(r),it(i,this.options.titleSuffix);try{s?.handler?await s.handler(r):this.notFoundHandler&&await this.notFoundHandler(r)}catch(o){if(!r.isCurrent())return;if(typeof this.options.onError=="function")await this.options.onError(o,r);else throw o;return}if(r.isCurrent()){for(const o of this.afterHooks)o(r);typeof this.options.afterRender=="function"&&this.options.afterRender(r)}}init(){window.addEventListener("hashchange",()=>this.resolve()),this.resolve()}}let pe=null;function Gt(e={},t={}){return pe=new Wt(e,t),pe.init(),pe}function U(e,t={}){pe?pe.navigate(e,t):(window.location.hash=e.startsWith("#")?e:`#${e}`,window.scrollTo({top:0,behavior:"smooth"}))}const c=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),E=(e,t={})=>new Intl.NumberFormat("th-TH",{maximumFractionDigits:2,...t}).format(Number(e)||0);function z(e){if(!e)return"—";const t=String(e).slice(0,10);return new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Bangkok"}).format(new Date(`${t}T12:00:00+07:00`))}const Xt={"super-admin":"ผู้ดูแลระบบสูงสุด",admin:"ผู้ดูแลระบบ",staff:"เจ้าหน้าที่",viewer:"ผู้ดูข้อมูล",auditor:"ผู้ตรวจสอบระบบ"},Qt={"super-admin":"border-red-200 bg-red-50 text-red-700",admin:"border-amber-200 bg-amber-50 text-amber-700",staff:"border-teal-200 bg-teal-50 text-teal-800",viewer:"border-gray-200 bg-gray-50 text-gray-700",auditor:"border-blue-200 bg-blue-50 text-blue-700"};function yt(e){const t=String(e||"").trim().split(/\s+/);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():String(e||"?")[0].toUpperCase()}const ne=e=>`#/module/${e}`,ot={grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',sparkles:'<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 17 .7 1.3L21 19l-1.3.7L19 21l-.7-1.3L17 19l1.3-.7L19 17ZM4 17l.5 1L6 18.5 4.5 19 4 20l-.5-1L2 18.5l1.5-.5L4 17Z"/>',recycle:'<path d="m7 19-2-3.4a2 2 0 0 1 0-2l1-1.7M9 5h5.2a2 2 0 0 1 1.7 1l1.4 2.4M19 11l2 3.5a2 2 0 0 1 0 2l-1.4 2.4a2 2 0 0 1-1.7 1H13"/><path d="m4 12 2.8-.8L7.5 14M17 7.5l.5 3 2.8-.9M11 21l2-2-2-2"/>',droplet:'<path d="M12 22a8 8 0 0 0 8-8c0-4.4-8-12-8-12S4 9.6 4 14a8 8 0 0 0 8 8Z"/>',chart:'<path d="M3 3v18h18"/><path d="m7 16 4-5 3 2 5-7"/>',road:'<path d="M7 3 4 21M17 3l3 18M12 3v3m0 4v4m0 4v3"/>',waves:'<path d="M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',truck:'<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',flask:'<path d="M9 3h6M10 3v7l-5.5 9a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 10V3M8 16h8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',plus:'<path d="M12 5v14M5 12h14"/>',arrow:'<path d="m5 12 14 0m-6-6 6 6-6 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="M18 6 6 18M6 6l12 12"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',ellipsis:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L10 16l-4 1 1-4 9.5-9.5Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',empty:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 10h8M8 14h5"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',login:'<path d="M10 17l5-5-5-5M15 12H3M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',lock:'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',eyeOff:'<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>'};function f(e,t=20,r="",a={}){const s=ot[e];s||typeof process>"u"&&console.warn(`[icons] ไม่พบ icon ชื่อ "${e}" — ใช้ "grid" แทน`);const n=s||ot.grid,o=!!(a["aria-label"]||a.title||a.role==="img")?'role="img"':'aria-hidden="true"',l=Object.entries(a).filter(([d])=>d!=="aria-hidden"&&d!=="role").map(([d,m])=>`${d}="${c(m)}"`).join(" ");return`<svg class="${r}" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${o} ${l}>${n}</svg>`}function Z(e,t,r,a=""){return`<div class="mb-5 flex min-w-0 max-w-full flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end">
    <div class="min-w-0 max-w-full flex-1">
      <p class="mb-1 text-xs font-bold tracking-[.13em] text-primary sm:mb-1.5">${c(e)}</p>
      <h1 class="break-words text-[22px] sm:text-[32px] font-bold leading-tight tracking-tight text-ink">${c(t)}</h1>
      <p class="mt-1.5 break-words text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">${c(r)}</p>
    </div>
    ${a?`<div class="w-full shrink-0 sm:w-auto">${a}</div>`:""}
  </div>`}const he=(e,t,r="plus")=>`<a href="${t}" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${f(r,18)}${c(e)}</a>`,le=(e,t,r="arrow")=>`<a href="${t}" class="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f8fbf8]">${c(e)}${f(r,17)}</a>`;let lt=null,X=null;function $t(){return X&&document.body.contains(X)||(X=document.getElementById("toast-container"),X||(X=document.createElement("div"),X.id="toast-container",X.className="fixed inset-x-4 bottom-4 z-[70] flex flex-col gap-2 sm:inset-x-auto sm:bottom-5 sm:right-5 pointer-events-none",document.body.appendChild(X))),X}function R(e,t="success"){const r=$t();r.innerHTML="",clearTimeout(lt);const a=t==="error",s=a?"border-red-200 bg-white text-red-700":"border-[#c6e9d8] bg-white text-primary-dark",n=a?"info":"check",i=document.createElement("div");i.role="status",i.setAttribute("aria-live","polite"),i.className=`app-toast pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold shadow-xl transition-all duration-200 ${s}`,i.innerHTML=`
    ${f(n,19,"shrink-0")}
    <span class="flex-1">${c(e)}</span>
    <button type="button" class="ml-2 rounded-lg p-1 text-muted hover:bg-canvas transition" aria-label="ปิดข้อความ">
      ${f("close",17)}
    </button>
  `,i.querySelector("button")?.addEventListener("click",()=>{i.remove()}),r.appendChild(i),lt=setTimeout(()=>{i.remove()},4200)}function ie(){document.querySelectorAll("select.field:not(.custom-select-applied):not(.master-native-select)").forEach(e=>{e.classList.add("custom-select-applied"),e.style.display="none";const t=document.createElement("div");t.className="relative w-full";const r=document.createElement("button");r.type="button",r.className=e.className.replace("custom-select-applied","").replace("hidden","")+" flex items-center justify-between text-left";const a=()=>'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';r.innerHTML=`<span class="truncate">${e.options[e.selectedIndex]?.text||""}</span>${a()}`,e.getAttribute("aria-invalid")==="true"&&r.setAttribute("aria-invalid","true");const s=document.createElement("div");s.className="absolute left-0 top-[calc(100%+6px)] z-20 hidden w-full overflow-y-auto max-h-60 rounded-xl border border-line bg-white shadow-xl custom-select-menu py-1";const n=()=>{r.innerHTML=`<span class="truncate">${e.options[e.selectedIndex]?.text||""}</span>${a()}`},i=Array.from(e.options).filter(o=>!o.disabled);i.forEach(o=>{const l=document.createElement("div");l.className=`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${o.selected?"bg-[#f0f8f2] font-bold text-primary":""}`,l.textContent=o.text,l.onclick=()=>{e.value=o.value,e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})),s.classList.add("hidden"),n(),Array.from(s.children).forEach((d,m)=>{d.className=`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${i[m].selected?"bg-[#f0f8f2] font-bold text-primary":""}`})},s.appendChild(l)}),r.onclick=o=>{o.preventDefault();const l=!s.classList.contains("hidden");document.querySelectorAll(".custom-select-menu").forEach(d=>d.classList.add("hidden")),l||s.classList.remove("hidden")},e.parentNode.insertBefore(t,e),t.appendChild(r),t.appendChild(s),t.appendChild(e)})}const ke=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],Jt=["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],F=e=>String(e).padStart(2,"0"),kt=e=>`${String(e.getUTCFullYear()).padStart(4,"0")}-${F(e.getUTCMonth()+1)}-${F(e.getUTCDate())}`,oe=(e,t,r)=>{const a=new Date(0);return a.setUTCFullYear(e,t-1,r),a.setUTCHours(0,0,0,0),a};function rt(e,t="date"){const r=String(e).match(t==="month"?/^(\d{4})-(\d{2})$/:/^(\d{4})-(\d{2})-(\d{2})$/);if(!r)return!1;const[,a,s,n="1"]=r,i=oe(+a,+s,+n);return+a>=1&&+a<=9999&&i.getUTCFullYear()===+a&&i.getUTCMonth()+1===+s&&i.getUTCDate()===+n}function St(e,t="date"){if(!String(e).trim())return"";const r=String(e).trim().match(t==="month"?/^(\d{1,2})\/(\d{4,5})$/:/^(\d{1,2})\/(\d{1,2})\/(\d{4,5})$/);if(!r)return null;const a=r.slice(1).map(Number),s=a.at(-1)-543,n=t==="month"?a[0]:a[1],i=`${String(s).padStart(4,"0")}-${F(n)}${t==="month"?"":`-${F(a[0])}`}`;return rt(i,t)?i:null}function er(e,t="date"){if(!rt(e,t))return"";const[r,a,s]=e.split("-").map(Number);return`${t==="month"?"":`${F(s)}/`}${F(a)}/${r+543}`}function ue(){const e=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Bangkok",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date);return["year","month","day"].map(t=>e.find(r=>r.type===t).value).join("-")}function tr(e,t,r=!1){const[a,s,n]=e.split("-").map(Number),i=oe(a,s,n),o={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7,Home:-i.getUTCDay(),End:6-i.getUTCDay()};if(t in o)i.setUTCDate(n+o[t]);else if(t==="PageUp"||t==="PageDown"){const l=(t==="PageUp"?-1:1)*(r?12:1);i.setUTCDate(1),i.setUTCMonth(i.getUTCMonth()+l);const d=oe(i.getUTCFullYear(),i.getUTCMonth()+2,0).getUTCDate();i.setUTCDate(Math.min(n,d))}return kt(i)}const fe=new WeakMap;let _=null,dt=!1,rr=0;function at(e){const{canonical:t,text:r,button:a}=e;r.value=er(t.value,e.mode),r.disabled=a.disabled=t.disabled,e.committed=t.value,r.setCustomValidity(!t.value&&r.required?"กรุณาระบุวันที่ พ.ศ.":""),r.removeAttribute("aria-invalid")}function Ke(e=document){e.querySelectorAll("[data-thai-canonical]").forEach(t=>at(fe.get(t)))}function Te(e,t,r=!0){const a=e.committed!==t;e.canonical.value=t,at(e),a&&r&&e.canonical.dispatchEvent(new Event("change",{bubbles:!0}))}function Et(e,t){const r=St(e.text.value,e.mode);let a=r===null?`กรุณากรอก${e.mode==="month"?"เดือน/ปี":"วัน/เดือน/ปี"} พ.ศ. ที่ถูกต้อง`:"";return r===""&&e.text.required&&(a="กรุณาระบุวันที่ พ.ศ."),r&&(e.min&&r<e.min||e.max&&r>e.max)&&(a="วันที่อยู่นอกช่วงที่กำหนด"),e.text.setCustomValidity(a),a?(e.canonical.value="",e.text.setAttribute("aria-invalid","true"),!1):(Te(e,r,t),!0)}function se(e=!0){if(!_)return;const{dialog:t,binding:r}=_;_=null,t.remove(),r.button.setAttribute("aria-expanded","false"),e&&r.text.isConnected&&r.text.focus()}function Se(e=null){const t=_,{binding:r,dialog:a,year:s,month:n}=t,i=r.canonical.value,o=ue(),l=`พ.ศ. ${s+543}`,d=u=>r.min&&u<r.min||r.max&&u>r.max;let m;if(r.mode==="month")m=`<div class="grid grid-cols-3 gap-1">${ke.map((u,p)=>{const b=`${String(s).padStart(4,"0")}-${F(p+1)}`;return`<button type="button" data-value="${b}" class="rounded-lg border border-line px-1 py-3 text-xs ${i===b?"bg-primary text-white":""}" ${d(b)?"disabled":""} aria-label="${u} ${l}">${u}</button>`}).join("")}</div>`;else{const u=oe(s,n,1),p=oe(s,n+1,0).getUTCDate(),b=Array.from({length:p},(T,L)=>`${String(s).padStart(4,"0")}-${F(n)}-${F(L+1)}`).filter(T=>!d(T)),h=e||t.focusDate,w=b.includes(h)?h:b[0],$=Array.from({length:Math.ceil((u.getUTCDay()+p)/7)*7},(T,L)=>{const A=L-u.getUTCDay()+1;if(A<1||A>p)return"<td></td>";const S=`${String(s).padStart(4,"0")}-${F(n)}-${F(A)}`,re=S===i,v=new Intl.DateTimeFormat("th-TH-u-ca-buddhist",{dateStyle:"full",timeZone:"UTC"}).format(oe(s,n,A));return`<td role="gridcell" aria-selected="${re}"><button type="button" data-value="${S}" tabindex="${S===w?0:-1}" aria-label="${c(v)}" ${S===o?'aria-current="date"':""} ${d(S)?"disabled":""} class="h-9 w-full rounded-lg text-sm ${re?"bg-primary text-white":S===o?"border border-primary":"hover:bg-canvas"}">${A}</button></td>`}),k=Array.from({length:$.length/7},(T,L)=>`<tr>${$.slice(L*7,L*7+7).join("")}</tr>`).join("");m=`<table role="grid" aria-label="${ke[n-1]} ${l}" class="w-full table-fixed"><thead><tr>${Jt.map(T=>`<th scope="col" class="py-2 text-xs text-muted">${T}</th>`).join("")}</tr></thead><tbody>${k}</tbody></table>`}a.innerHTML=`<div class="flex items-center justify-between gap-2"><h2 id="thai-calendar-title" class="font-bold" aria-live="polite">${r.mode==="month"?"เลือกเดือน":ke[n-1]} ${l}</h2><button type="button" data-calendar="close" class="min-h-11 px-2 text-sm text-primary">ปิด</button></div>
    <div class="my-2 flex items-center gap-2"><button type="button" data-calendar="previous" aria-label="${r.mode==="month"?"ปีก่อนหน้า":"เดือนก่อนหน้า"}" class="min-h-11 px-2">‹</button>${r.mode==="date"?`<label class="min-w-0 flex-1"><span class="sr-only">เดือน</span><select data-calendar="month" class="field text-sm">${ke.map((u,p)=>`<option value="${p+1}" ${n===p+1?"selected":""}>${u}</option>`).join("")}</select></label>`:""}<label class="min-w-0 flex-1"><span class="sr-only">ปี พ.ศ.</span><input data-calendar="year" type="number" class="field text-sm" min="544" max="10542" value="${s+543}"></label><button type="button" data-calendar="next" aria-label="${r.mode==="month"?"ปีถัดไป":"เดือนถัดไป"}" class="min-h-11 px-2">›</button></div>${m}<p class="mt-2 text-xs text-muted">ใช้ลูกศรเลือกวัน Enter เพื่อยืนยัน และ Escape เพื่อปิด</p><div class="mt-3 flex justify-between gap-2"><button type="button" data-calendar="clear" class="min-h-11 px-3 text-primary">ล้างค่า</button><button type="button" data-calendar="today" class="min-h-11 px-3 text-primary">${r.mode==="month"?"เดือนนี้":"วันนี้"}</button></div>`,e&&a.querySelector(`[data-value="${e}"]`)?.focus()}function ct(e){se(!1);let t=e.canonical.value||(e.mode==="month"?ue().slice(0,7):ue());e.min&&t<e.min&&(t=e.min),e.max&&t>e.max&&(t=e.max);const[r,a,s=1]=t.split("-").map(Number),n=document.createElement("dialog");n.id="thai-calendar",n.className="thai-calendar rounded-2xl border border-line bg-white p-3 text-ink shadow-xl",n.setAttribute("aria-labelledby","thai-calendar-title"),document.body.append(n),_={binding:e,dialog:n,year:r,month:a,focusDate:`${String(r).padStart(4,"0")}-${F(a)}-${F(s)}`},e.button.setAttribute("aria-expanded","true"),Se(),n.addEventListener("cancel",i=>{i.preventDefault(),se()}),n.addEventListener("click",i=>{const o=i.target.closest("button");if(!o||!_)return;if(o.dataset.value){Te(e,o.dataset.value),se();return}const l=o.dataset.calendar;if(l==="close")se();else if(l==="clear")Te(e,""),se();else if(l==="today"){const d=e.mode==="month"?ue().slice(0,7):ue();e.min&&d<e.min||e.max&&d>e.max||(Te(e,d),se())}else if(l==="previous"||l==="next"){const d=oe(_.year,_.month,1);if(d.setUTCMonth(d.getUTCMonth()+(l==="previous"?-1:1)*(e.mode==="month"?12:1)),d.getUTCFullYear()<1||d.getUTCFullYear()>9999)return;_.year=d.getUTCFullYear(),_.month=d.getUTCMonth()+1,_.focusDate=kt(d),Se(),n.querySelector(`[data-calendar="${l}"]`)?.focus()}}),n.addEventListener("change",i=>{const o=i.target.dataset.calendar;if(o==="month")_.month=Number(i.target.value);else if(o==="year"){const l=Number(i.target.value)-543;if(!Number.isInteger(l)||l<1||l>9999){i.target.value=_.year+543;return}_.year=l}else return;_.focusDate=`${String(_.year).padStart(4,"0")}-${F(_.month)}-01`,Se(),n.querySelector(`[data-calendar="${o}"]`)?.focus()}),n.addEventListener("keydown",i=>{if(i.key==="Escape"){i.preventDefault(),se();return}if(i.key==="Tab"){const m=[...n.querySelectorAll('button:not([disabled]):not([tabindex="-1"]), input, select')],u=m[0],p=m.at(-1);i.shiftKey&&document.activeElement===u?(i.preventDefault(),p.focus()):!i.shiftKey&&document.activeElement===p&&(i.preventDefault(),u.focus())}if(e.mode!=="date"||!i.target.dataset.value||!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown"].includes(i.key))return;i.preventDefault();const o=tr(i.target.dataset.value,i.key,i.shiftKey);if(!rt(o)||e.min&&o<e.min||e.max&&o>e.max)return;const[l,d]=o.split("-").map(Number);_.year=l,_.month=d,_.focusDate=o,Se(o)}),n.showModal(),(n.querySelector('[data-value][tabindex="0"]:not([disabled])')||n.querySelector('[data-calendar="close"]')).focus()}function mt(e=document){e.querySelectorAll('input[type="date"], input[type="month"]').forEach(t=>{const r=t.type,a=document.createElement("input"),s=t.id,n=s===t.name&&s?`${s}-display`:s||`thai-date-${++rr}`;if(n!==s&&s)for(const m of t.labels||[])m.htmlFor===s&&(m.htmlFor=n);a.type="text",a.id=n,a.className=t.className,a.inputMode="numeric",a.autocomplete="off",a.required=t.required,a.placeholder=r==="month"?"เดือน/ปี พ.ศ.":"วัน/เดือน/ปี พ.ศ.",a.setAttribute("aria-describedby",`${t.getAttribute("aria-describedby")||""} ${n}-format`.trim()),t.hasAttribute("aria-invalid")&&a.setAttribute("aria-invalid",t.getAttribute("aria-invalid")),a.setAttribute("data-thai-display","");const i=document.createElement("span");i.className="thai-date-field";const o=document.createElement("button");o.type="button",o.className="thai-date-open",o.textContent="▦",o.setAttribute("aria-label",r==="month"?"เปิดตัวเลือกเดือนภาษาไทย":"เปิดปฏิทินภาษาไทย"),o.setAttribute("aria-haspopup","dialog"),o.setAttribute("aria-expanded","false"),o.setAttribute("aria-controls","thai-calendar");const l=document.createElement("span");l.id=`${n}-format`,l.className="sr-only",l.textContent=r==="month"?"กรอกเดือน/ปี พ.ศ. เช่น 10/2569":"กรอกวัน/เดือน/ปี พ.ศ. เช่น 09/10/2569",t.before(i),i.append(t,a,o,l),t.type="hidden",t.id=`${n}-iso`,t.required=!1,t.dataset.thaiCanonical=r;const d={canonical:t,text:a,button:o,mode:r,min:t.min,max:t.max,initialValue:t.value};fe.set(t,d),at(d),t.getAttribute("aria-invalid")==="true"&&a.setAttribute("aria-invalid","true"),a.addEventListener("input",()=>{const m=St(a.value,r);a.setCustomValidity(m===null?"กรุณากรอกวันที่ พ.ศ. ให้ครบและถูกต้อง":m===""&&a.required?"กรุณาระบุวันที่ พ.ศ.":""),m===null&&(t.value="")}),a.addEventListener("change",()=>Et(d,!0)),a.addEventListener("keydown",m=>{m.key==="ArrowDown"&&m.altKey&&(m.preventDefault(),ct(d))}),o.addEventListener("click",()=>ct(d))})}function ar(e){dt||(dt=!0,mt(e),new MutationObserver(()=>{_&&!_.binding.text.isConnected&&se(!1),mt(e),e.querySelectorAll("[data-thai-canonical]").forEach(t=>{const r=fe.get(t);r.text.disabled!==t.disabled&&(r.text.disabled=t.disabled),r.button.disabled!==t.disabled&&(r.button.disabled=t.disabled)})}).observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["disabled"]}),document.addEventListener("submit",t=>{const a=[...t.target.querySelectorAll("[data-thai-canonical]")].filter(s=>!s.disabled);for(const s of a){const n=fe.get(s);if(!Et(n,!1)||!n.text.checkValidity()){t.preventDefault(),t.stopImmediatePropagation(),n.text.reportValidity(),n.text.focus();return}}},!0),document.addEventListener("reset",t=>setTimeout(()=>{t.target.querySelectorAll("[data-thai-canonical]").forEach(r=>{r.value=fe.get(r).initialValue}),Ke(t.target)},0)))}function Ee(e){const t=e.getFullYear(),r=String(e.getMonth()+1).padStart(2,"0"),a=String(e.getDate()).padStart(2,"0");return`${t}-${r}-${a}`}function sr(e){const t=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Bangkok",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),r=n=>Number(t.find(i=>i.type===n).value),a=new Date(r("year"),r("month")-1,r("day")),s=Ee(a);switch(e){case"all":return{from:"",to:""};case"today":return{from:s,to:s};case"7d":{const n=new Date(a);return n.setDate(n.getDate()-6),{from:Ee(n),to:s}}case"month":{const n=new Date(a.getFullYear(),a.getMonth(),1);return{from:Ee(n),to:s}}case"30d":{const n=new Date(a);return n.setDate(n.getDate()-29),{from:Ee(n),to:s}}default:return{from:s,to:s}}}const nr=[{id:"all",label:"ทั้งหมด"},{id:"today",label:"วันนี้"},{id:"7d",label:"7 วันล่าสุด"},{id:"month",label:"เดือนนี้"},{id:"30d",label:"30 วันล่าสุด"}];function Pe({from:e="",to:t="",formId:r="",cls:a=""}={}){return`
    <div class="flex flex-wrap items-center gap-1.5 ${a}" role="group" aria-label="ช่วงเวลาด่วน">
      <span class="text-xs font-semibold text-muted mr-1">ช่วงด่วน:</span>
      ${nr.map(s=>{const n=sr(s.id),i=s.id==="all"?!e&&!t:!!e&&e===n.from&&t===n.to;return`
          <button
            type="button"
            data-action="set-date-preset"
            data-preset="${s.id}"
            data-from="${n.from}"
            data-to="${n.to}"
            ${r?`data-form="${c(r)}"`:""}
            class="min-h-8 inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold transition ${i?"bg-primary text-white shadow-xs":"border border-line bg-white text-muted hover:border-primary/40 hover:text-ink"}"
            aria-pressed="${i}"
          >
            ${c(s.label)}
          </button>
        `}).join("")}
    </div>
  `}function ir(e,t=300){let r=null;return function(...a){clearTimeout(r),r=setTimeout(()=>{e.apply(this,a)},t)}}const or=""+new URL("nonthaburi-logo-BUg5neRh.png",import.meta.url).href,Lt="#/cleaning-zones",qt="#/waste-types",_t=[{type:"group",id:"cleaning",label:"งานบริการรักษาความสะอาด",icon:"sparkles",children:[{module:"road-washings",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",children:[{module:"cleaning-zones",href:Lt,label:"เขตรักษาความสะอาด"}]},{module:"waterway-cleanings",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ"},{module:"road-sweepings",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ"},{module:"outsourced-cleanings",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม"}]},{type:"link",module:"waste-collections",label:"งานบริหารจัดการมูลฝอย",icon:"recycle",children:[{module:"waste-types",href:qt,label:"ประเภทขยะมูลฝอย"}]},{type:"group",id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",icon:"droplet",children:[{module:"drain-cleanings",label:"งานลอกท่อระบายน้ำ"},{module:"septic-pumpings",label:"งานสูบสิ่งปฏิกูล"},{module:"septic-treatments",label:"การบำบัดสิ่งปฏิกูล"}]},{type:"link",module:"waste-management-projects",label:"โครงการต่าง ๆ",icon:"chart"}];let j=!1,O=!1;const te=new Set;function Ne(e){j=typeof e=="boolean"?e:!j,jt()}function Fe(){O=!1;const e=document.getElementById("user-menu-dropdown"),t=document.getElementById("user-menu-button");e&&(e.classList.add("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.remove("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!0),t&&(t.setAttribute("aria-expanded","false"),t.classList.remove("border-primary","bg-[#f0f8f2]"),t.querySelector("svg:last-child")?.classList.remove("rotate-180"))}function lr(){O=!O;const e=document.getElementById("user-menu-dropdown"),t=document.getElementById("user-menu-button");e&&(O?(e.classList.remove("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.add("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!1,e.querySelector("a, button")?.focus()):(e.classList.add("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.remove("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!0,t?.focus())),t&&(t.setAttribute("aria-expanded",String(O)),t.classList.toggle("border-primary",O),t.classList.toggle("bg-[#f0f8f2]",O),t.querySelector("svg:last-child")?.classList.toggle("rotate-180",O))}function ae(e){const t=_t.find(r=>r.type==="group"&&r.children.some(a=>a.module===e||a.children?.some(s=>s.module===e)));if((e==="waste-collections"||e==="waste-types")&&te.add("waste-collections"),t){te.add(t.id);const r=t.children.find(a=>a.children?.some(s=>s.module===e)||a.module===e&&a.children);r&&te.add(r.module)}}function dr(e){te.has(e)?te.delete(e):te.add(e)}function jt(){const e=window.innerWidth<1024;document.body.style.overflow=e&&j?"hidden":"";const t=document.getElementById("sidebar"),r=document.getElementById("mobile-backdrop");r&&(r.classList.toggle("opacity-100",e&&j),r.classList.toggle("pointer-events-auto",e&&j),r.classList.toggle("visible",e&&j),r.classList.toggle("opacity-0",!e||!j),r.classList.toggle("pointer-events-none",!e||!j),r.classList.toggle("invisible",!e||!j)),t&&(t.inert=e&&!j,t.setAttribute("aria-hidden",String(!j&&e)),e?(t.classList.toggle("-translate-x-full",!j),t.classList.toggle("translate-x-0",j),t.classList.toggle("invisible",!j),t.classList.toggle("pointer-events-none",!j),t.classList.toggle("visible",j),t.classList.toggle("pointer-events-auto",j)):(t.classList.remove("-translate-x-full","invisible","pointer-events-none"),t.classList.add("translate-x-0","visible","pointer-events-auto")));const a=document.querySelector('[data-action="open-menu"]');a&&a.setAttribute("aria-expanded",String(j))}function cr(e,t){if(e.type==="link"){if(!y(`${e.module}.view`))return"";const n=t===e.module;if(!e.children)return`<a href="${ne(e.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${n?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${n?'aria-current="page"':""}>${f(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a>`;const i=e.children.filter(d=>y(`${d.module}.view`));if(!i.length)return`<a href="${ne(e.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${n?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${n?'aria-current="page"':""}>${f(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a>`;const o=i.some(d=>d.module===t),l=te.has(e.module);return`<div class="mb-1 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${n?"nav-active":o?"bg-[#f4f9f5] text-primary-dark":"text-[#657772]"}"><a href="${ne(e.module)}" class="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-l-xl px-3 py-2.5 text-sm font-semibold leading-5 hover:bg-[#f4f7f4] hover:text-ink" ${n?'aria-current="page"':""}>${f(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${e.module}" aria-expanded="${l}" aria-controls="sidebar-subgroup-${e.module}" aria-label="${l?"ปิด":"เปิด"}เมนูย่อยของ${c(e.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${f("chevronDown",16,`transition-transform ${l?"rotate-180":""}`)}</button></div><div id="sidebar-subgroup-${e.module}" class="ml-5 border-l border-[#dbe9df] pl-3" ${l?"":"hidden"}>${i.map(d=>{const m=t===d.module;return`<a href="${d.href||ne(d.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${m?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${m?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(d.label)}</span></a>`}).join("")}</div></div>`}const r=e.children.filter(n=>y(`${n.module}.view`));if(!r.length)return"";const a=te.has(e.id),s=r.some(n=>n.module===t||n.children?.some(i=>i.module===t&&y(`${i.module}.view`)));return`<div class="mb-1">
    <button type="button" data-action="toggle-sidebar-group" data-group="${e.id}" aria-expanded="${a}" aria-controls="sidebar-group-${e.id}" class="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold leading-5 ${s?"bg-[#f4f9f5] text-primary-dark":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">
      ${f(e.icon,19,"shrink-0")}<span class="min-w-0 flex-1 whitespace-normal break-words">${c(e.label)}</span>${f("chevronDown",16,`shrink-0 transition-transform ${a?"rotate-180":""}`)}
    </button>
    <div id="sidebar-group-${e.id}" class="ml-5 border-l border-[#dbe9df] pl-3" ${a?"":"hidden"}>
      ${r.map(n=>{const i=t===n.module,o=n.href||ne(n.module);if(!n.children)return`<a href="${o}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${i?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${i?'aria-current="page"':""}><span class="whitespace-normal break-words">${c(n.label)}</span></a>`;const l=n.children.filter(u=>y(`${u.module}.view`));if(!l.length)return`<a href="${o}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${i?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${i?'aria-current="page"':""}><span class="whitespace-normal break-words">${c(n.label)}</span></a>`;const d=te.has(n.module),m=n.children.some(u=>u.module===t);return`<div class="my-0.5 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${i?"nav-active":m?"bg-[#f4f9f5] text-primary-dark":"text-[#687b74]"}"><a href="${o}" class="flex min-h-11 min-w-0 flex-1 items-center rounded-l-xl px-3 py-2.5 text-[13px] font-medium leading-5 hover:bg-[#f4f7f4] hover:text-ink ${i?"font-semibold":""}" ${i?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(n.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${n.module}" aria-expanded="${d}" aria-controls="sidebar-subgroup-${n.module}" aria-label="${d?"ปิด":"เปิด"}เมนูย่อยของ${c(n.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${f("chevronDown",16,`transition-transform ${d?"rotate-180":""}`)}</button></div><div id="sidebar-subgroup-${n.module}" class="ml-3 border-l border-[#dbe9df] pl-2" ${d?"":"hidden"}>${l.map(u=>{const p=t===u.module;return`<a href="${u.href||ne(u.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${p?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${p?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(u.label)}</span></a>`}).join("")}</div></div>`}).join("")}
    </div>
  </div>`}function mr(e,t){const r=window.serviceHubUrls?.logo||or;return`
    <div id="mobile-backdrop" class="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none lg:hidden ${j?"opacity-100 pointer-events-auto visible":"opacity-0 pointer-events-none invisible"}" data-action="close-menu" aria-hidden="true"></div>
    <aside id="sidebar" role="complementary" aria-label="แถบเมนูหลัก" class="fixed inset-y-0 left-0 z-50 flex w-[266px] max-w-[calc(100vw-24px)] flex-col border-r border-line bg-white transition-transform duration-200 motion-reduce:transition-none lg:translate-x-0 lg:visible lg:pointer-events-auto ${j?"translate-x-0 visible pointer-events-auto":"-translate-x-full invisible pointer-events-none"}" ${j?'aria-hidden="false"':'aria-hidden="true"'}>
      <div class="flex h-[72px] items-center gap-3 border-b border-line px-5 sm:px-6">
        <img src="${r}" alt="ตราเทศบาลนครนนทบุรี" class="h-12 w-12 shrink-0 object-contain drop-shadow-sm">
        <div class="min-w-0 flex-1"><div class="text-[15px] font-bold tracking-tight text-ink leading-snug">เทศบาลนครนนทบุรี</div><div class="text-[11px] font-medium tracking-wide text-muted">ฐานข้อมูลฝ่ายบริการ</div></div>
        <button type="button" class="ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-muted lg:hidden" data-action="close-menu" aria-label="ปิดเมนู">${f("close",20)}</button>
      </div>
      <nav aria-label="เมนูหลัก" role="navigation" class="scrollbar-thin flex-1 overflow-y-auto px-4 pb-6 pt-6">
        <a href="#/dashboard" class="mb-2 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${t?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${t?'aria-current="page"':""}>${f("grid",19)}<span>แดชบอร์ดฝ่ายบริการ</span></a>
        ${_t.map(a=>cr(a,e)).join("")}
        ${!y("road-washings.view")&&y("cleaning-zones.view")?`<a href="${Lt}" class="mb-1 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="cleaning-zones"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4]"}">เขตรักษาความสะอาด</a>`:""}
        ${!y("waste-collections.view")&&y("waste-types.view")?`<a href="${qt}" class="mb-1 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="waste-types"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4]"}">ประเภทขยะมูลฝอย</a>`:""}
        <a href="#/reports" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="reports"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="reports"?'aria-current="page"':""}>${f("chart",18)}รายงาน</a>
        ${y("audit-logs.view")?`<a href="#/audit-logs" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="audit-logs"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">${f("info",18)}ประวัติการแก้ไข</a>`:""}
        ${Ie()?`<div class="mt-3 border-t border-line pt-3"><a href="#/users" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="users"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="users"?'aria-current="page"':""}>${f("users",19)}<span>จัดการผู้ใช้งาน</span></a></div>`:""}
        <div class="mt-3 border-t border-line pt-3">
          <a href="#/profile" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="profile"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="profile"?'aria-current="page"':""}>
            ${f("users",19)}<span>โปรไฟล์ของฉัน</span>
          </a>
        </div>
      </nav>
    </aside>
  `}function ur(e=[]){const t=window.serviceHubUser||{},r=(t.name||t.username||"U").slice(0,1).toUpperCase(),a=(t.name||t.username||"U").slice(0,2).toUpperCase(),s=(t.roles||[])[0]||"staff";return`
    <header role="banner" class="app-header sticky top-0 z-30 flex h-[72px] w-full max-w-full min-w-0 items-center justify-between border-b border-line bg-white/95 px-3.5 backdrop-blur-sm sm:px-7 lg:px-9">
      <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button type="button" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl p-2 text-ink hover:bg-canvas lg:hidden" data-action="open-menu" aria-label="เปิดเมนู" aria-expanded="${j}" aria-controls="sidebar">${f("menu",22)}</button>
        <nav aria-label="เส้นทางหน้า" role="navigation" class="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap text-xs text-muted sm:text-sm">
          <a class="shrink-0 hover:text-primary" href="#/dashboard">หน้าหลัก</a>
          ${e.map(n=>`${f("chevron",14,"shrink-0 text-[#b7c4bd]")}<span class="min-w-0 truncate ${n.current?"font-semibold text-ink":""}">${n.href?`<a href="${n.href}" class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom hover:text-primary">${c(n.label)}</a>`:`<span class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom">${c(n.label)}</span>`}</span>`).join("")}
        </nav>
      </div>
      <div class="ml-2 flex shrink-0 items-center gap-2 sm:gap-3">
        <span class="hidden rounded-full border border-[#cfe9dd] bg-[#f0faf4] px-3 py-1 text-[11px] font-bold text-primary sm:inline-flex">ข้อมูลจริง</span>
        <div id="user-menu-container" class="relative">
          <button type="button" data-action="toggle-user-menu" id="user-menu-button" aria-haspopup="menu" aria-expanded="${O}" aria-controls="user-menu-dropdown" class="flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f0f8f2] focus:outline-none focus:ring-2 focus:ring-primary/20 ${O?"border-primary bg-[#f0f8f2]":""}" aria-label="เมนูผู้ใช้งาน ${c(t.name||t.username)}">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#177a67] to-[#0e6253] text-xs font-bold text-white shadow-sm">${c(r)}</span>
            <span class="hidden max-w-[130px] truncate sm:inline">${c(t.name||t.username)}</span>
            ${f("chevronDown",14,`shrink-0 text-[#687b74] transition-transform duration-150 ${O?"rotate-180":""}`)}
          </button>
          <div id="user-menu-dropdown" class="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-24px)] rounded-2xl border border-line bg-white p-2 shadow-xl z-50 transition-all ${O?"opacity-100 visible translate-y-0 pointer-events-auto":"opacity-0 invisible -translate-y-1 pointer-events-none"}" role="menu" aria-labelledby="user-menu-button" ${O?"":"hidden"}>
            <div class="rounded-xl bg-[#f8faf8] p-3 border border-[#edf3ee]">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#177a67] to-[#0e6253] text-sm font-bold text-white shadow-sm">
                  ${c(a)}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-ink truncate">${c(t.name||t.username)}</div>
                  <div class="text-[11px] text-muted truncate">@${c(t.username)}</div>
                  <div class="mt-1">
                    <span class="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${Qt[s]||"border-gray-200 bg-gray-50 text-gray-700"}">
                      ${c(Xt[s]||s)}
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
  `}function Y(e,t=null,r=[],a=!1){return`
    ${mr(t,a)}
    <div class="app-shell min-h-screen w-full max-w-full min-w-0 lg:pl-[266px]">
      ${ur(r)}
      <main id="main-content" role="main" tabindex="-1" class="app-content mx-auto w-full min-w-0 max-w-[1510px] px-3.5 pb-16 pt-5 sm:px-7 sm:pt-7 lg:px-9">
        ${e}
      </main>
      <div id="shell-live-status" role="status" aria-live="polite" class="sr-only"></div>
    </div>
  `}function pr(){window.addEventListener("resize",jt)}const fr={distance_km:"กิโลเมตร",quantity:"ลูกบาศก์เมตร",weight:"กิโลกรัม",sediment_quantity:"ลูกบาศก์เมตร",volume:"ลูกบาศก์เมตร",fee_amount:"บาท",sludge_quantity:"กิโลกรัม",fertilizer_remaining_latest:"กิโลกรัม",communities_count:"ชุมชน",participants_count:"คน"},br={fertilizer_remaining_latest:"ปุ๋ยคงเหลือล่าสุด"},me=e=>new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Bangkok"}).format(new Date(`${String(e).slice(0,10)}T12:00:00+07:00`)),xr=e=>e?new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"Asia/Bangkok"}).format(new Date(String(e).replace(" ","T")+(String(e).includes("Z")||/[+-]\d\d:\d\d$/.test(String(e))?"":"+00:00"))):"—";function hr({data:e,loading:t,error:r,params:a,groups:s,modules:n,icon:i,esc:o,number:l,moduleHref:d}){const m=a.get("from")||e?.period?.from||"",u=a.get("to")||e?.period?.to||"",p=!!(m||u),b='<div class="mb-5 sm:mb-6"><p class="text-xs font-bold tracking-[.16em] text-primary">ภาพรวมระบบ</p><h1 class="mt-2 text-2xl font-bold text-ink sm:text-3xl">แดชบอร์ดฝ่ายบริการ</h1><p class="mt-2 text-sm text-muted">ติดตามงานบริการจากฐานข้อมูลจริงตามสิทธิ์ของคุณ</p></div>',h=`
    <section aria-labelledby="dashboard-filter-title" class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h2 id="dashboard-filter-title" class="font-bold text-ink">${p?"ช่วงวันที่ดำเนินงาน":"ข้อมูลสะสมทั้งหมดตั้งแต่เริ่มระบบ"}</h2>
          <p class="text-xs text-muted">${p?"ตัวเลขหลักใช้วันที่ดำเนินงาน รวมวันเริ่มต้นและวันสิ้นสุด":"แสดงภาพรวมและจำนวนรายการสะสมของทุกหมวดงานตั้งแต่เริ่มระบบ"}</p>
        </div>
        ${Pe({from:m,to:u,formId:"dashboard-filter"})}
      </div>
      <form id="dashboard-filter" class="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] sm:items-end">
        <label class="min-w-0 text-sm font-semibold">ตั้งแต่วันที่<input class="field mt-1" type="date" name="from" value="${o(m)}" placeholder="ทั้งหมด"></label>
        <label class="min-w-0 text-sm font-semibold">ถึงวันที่<input class="field mt-1" type="date" name="to" value="${o(u)}" placeholder="ทั้งหมด"></label>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 font-bold text-white hover:bg-primary-dark">กรองข้อมูล</button>
        ${p?'<a href="#/dashboard" class="flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-muted hover:bg-[#f6faf7]" title="คืนค่าเป็นทั้งหมดทุกช่วงเวลา">ดูทั้งหมด</a>':""}
      </form>
      <p id="dashboard-filter-error" role="alert" class="mt-2 hidden text-sm text-red-700"></p>
    </section>
  `;if(t||!e&&!r)return`${b}${h}<div role="status" aria-live="polite" class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted">กำลังโหลดข้อมูลภาพรวม…</div>`;if(r)return`${b}${h}<div role="alert" class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"><p class="font-semibold">โหลดข้อมูลภาพรวมไม่สำเร็จ</p><p class="mt-1">${o(r)}</p><button type="button" data-action="retry-dashboard" class="mt-3 min-h-11 rounded-xl border border-red-300 bg-white px-4 font-semibold">ลองอีกครั้ง</button></div>`;const w=n.filter(x=>Object.hasOwn(e.module_summary,x.id)),$=x=>w.some(g=>g.id===x),k=x=>e.period?.from&&e.period?.to?`${d(x)}?${new URLSearchParams({from:e.period.from,to:e.period.to})}`:d(x),T=e.period.total,L=(x,g,H,B,M=!1)=>`<div class="dashboard-card panel-shadow rounded-2xl border border-line bg-white ${M?"border-l-[3px] border-l-primary":""} p-4 sm:p-5"><p class="text-sm font-semibold text-[#4d655a]">${x}</p><p class="mt-3 text-3xl font-bold leading-tight text-ink">${l(g)} <span class="text-sm font-medium text-muted">${H}</span></p><p class="mt-1 text-xs text-muted">${B}</p></div>`,A=(x,g,H)=>{const B=br[g]||x.fields.find(M=>M.name===g)?.label||g;return`<span class="inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-[#f4f8f5] px-2.5 py-1.5 text-xs text-[#435b50]"><span>${o(B)}:</span><strong class="min-w-0 break-words text-ink">${H===null?"ไม่มีข้อมูล":`${l(H)} ${x.fields.find(M=>M.name===g)?.unit||fr[g]||""}`}</strong></span>`},S=(x,g)=>e.module_summary[x]?.metrics[g]??0,re={cleaning:[["ระยะทางดำเนินงานรวม",w.filter(x=>x.group==="cleaning").reduce((x,g)=>x+S(g.id,"distance_km"),0),"กิโลเมตร"],...$("waterway-cleanings")?[["ผักตบชวาและมูลฝอยที่กำจัด",S("waterway-cleanings","quantity"),"ลูกบาศก์เมตร"]]:[]],waste:[["น้ำหนักมูลฝอย",S("waste-collections","weight"),"กิโลกรัม"]],sanitation:[...$("drain-cleanings")?[["ตะกอนจากงานลอกท่อ",S("drain-cleanings","sediment_quantity"),"ลูกบาศก์เมตร"]]:[],...$("septic-pumpings")?[["สิ่งปฏิกูลที่สูบ",S("septic-pumpings","volume"),"ลูกบาศก์เมตร"]]:[],...$("septic-treatments")?[["ตะกอนสำหรับทำปุ๋ย",S("septic-treatments","sludge_quantity"),"กิโลกรัม"]]:[]],projects:[["ผู้เข้าร่วมโครงการ",S("waste-management-projects","participants_count"),"คน"]]},v=s.filter(x=>w.some(g=>g.group===x.id)).map(x=>`<section class="dashboard-card panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5"><div class="flex items-start gap-3"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf5ef] text-primary">${i(x.icon,19)}</span><div class="min-w-0"><h3 class="break-words text-sm font-bold text-ink">${o(x.label)}</h3><p class="mt-1 text-2xl font-bold text-ink">${l(e.group_summary[x.id]||0)} <span class="text-xs font-medium text-muted">${p?"รายการในช่วงที่เลือก":"รายการสะสม"}</span></p></div></div><dl class="mt-4 space-y-1.5 border-t border-line pt-3">${re[x.id].map(([g,H,B])=>`<div class="flex flex-wrap justify-between gap-x-2 text-xs"><dt class="text-muted">${g}</dt><dd class="min-w-0 break-words font-bold text-ink">${l(H)} ${B}</dd></div>`).join("")}</dl></section>`).join(""),D=w.map(x=>{const g=e.module_summary[x.id];return`<a href="${k(x.id)}" class="flex min-w-0 flex-col gap-2 rounded-xl border border-line bg-white p-3.5 transition hover:border-[#9fd1b8] hover:bg-[#f9fcfa] focus-visible:outline"><span class="flex min-w-0 items-start justify-between gap-2"><span class="min-w-0 break-words text-sm font-semibold text-ink">${o(x.short)}</span><strong class="shrink-0 text-sm text-primary">${l(g.count)} รายการ</strong></span><span class="flex flex-wrap gap-1.5">${Object.entries(g.metrics).map(([H,B])=>A(x,H,B)).join("")||'<span class="text-xs text-muted">ไม่มีค่าปริมาณ</span>'}</span></a>`}).join(""),K=Math.max(1,...e.trend.map(x=>x.count)),G=e.trend.map(x=>`<li class="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-xs"><span class="min-w-0 break-words text-muted">${me(x.from)}${x.from===x.to?"":` – ${me(x.to)}`}</span><strong class="text-ink">${l(x.count)} รายการ</strong><span class="col-span-2 h-2 rounded-full bg-[#eef3ef]"><span class="block h-2 rounded-full bg-primary" style="width:${Math.max(0,Math.round(x.count/K*100))}%"></span></span></li>`).join(""),ce=e.recent.slice(0,6).map(x=>{const g=n.find(H=>H.id===x.module);return g?`<a href="${d(g.id)}/${encodeURIComponent(x.id)}" class="flex min-w-0 flex-col gap-2 border-t border-line px-4 py-3.5 transition hover:bg-[#f9fcfa] sm:flex-row sm:items-center sm:gap-3 sm:px-5"><div class="flex min-w-0 flex-1 items-center gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf5ef] text-primary">${i(g.icon,17)}</span><div class="min-w-0 flex-1"><strong class="block break-words text-sm text-ink">${o(x.title||g.short)}</strong><span class="block break-words text-xs text-muted">${o(g.short)}</span></div></div><div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pl-12 text-xs sm:flex-col sm:items-end sm:gap-y-0.5 sm:pl-0"><span class="inline-flex items-center gap-1 font-semibold text-primary-dark"><span class="font-normal text-muted">ดำเนินงาน:</span> ${me(x.service_date)}</span><time class="text-[11px] text-muted" datetime="${o(x.created_at)}">บันทึกเมื่อ ${xr(x.created_at)}</time></div></a>`:""}).join(""),we=p?"รายการในช่วงที่เลือก":"รายการสะสมทั้งหมด",ze=e.period?.from&&e.period?.to?`${me(e.period.from)} – ${me(e.period.to)}`:"ข้อมูลสะสมตั้งแต่เริ่มระบบ";return`${b}${h}<section aria-label="ยอดรวม" class="dashboard-summary mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">${L(we,T,"รายการ",ze,!0)}${L("ยอดสะสมตั้งแต่เริ่มระบบ",e.total,"รายการ","เฉพาะหมวดที่คุณมีสิทธิ์ดู")}${L("ดำเนินงานวันนี้",e.today,"รายการ","อิงวันที่ดำเนินงานตามเวลาไทย")}</section><section aria-labelledby="group-heading" class="mb-6"><h2 id="group-heading" class="mb-3 text-lg font-bold text-ink">ภาพรวมกลุ่มงาน</h2>${w.length?`<div class="dashboard-summary grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">${v}</div>`:'<p class="rounded-xl border border-line bg-white p-5 text-sm text-muted">ไม่มีหมวดงานที่คุณมีสิทธิ์ดู</p>'}</section><section aria-labelledby="module-heading" class="panel-shadow mb-6 rounded-2xl border border-line bg-[#f8faf8] p-4 sm:p-5"><div class="mb-3"><h2 id="module-heading" class="text-lg font-bold text-ink">งานบริการรายหมวด</h2><p class="text-xs text-muted">${p?"จำนวนและปริมาณในช่วงวันที่ที่เลือก; แต่ละค่าระบุหน่วยและความหมายแยกกัน":"จำนวนและปริมาณสะสมทั้งหมด; แต่ละค่าระบุหน่วยและความหมายแยกกัน"}</p></div>${p&&T===0?'<p class="mb-3 rounded-xl border border-[#d8e7dd] bg-white p-4 text-sm text-muted">ยังไม่มีรายการดำเนินงานในช่วงวันที่นี้ ลองเลือกช่วงอื่นเพื่อดูข้อมูล</p>':""}<div class="grid min-w-0 gap-2 sm:grid-cols-2 xl:grid-cols-3">${D}</div></section><div class="dashboard-panels grid grid-cols-1 gap-5 xl:grid-cols-2"><section aria-labelledby="trend-heading" class="panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5"><h2 id="trend-heading" class="text-lg font-bold text-ink">แนวโน้มจำนวนรายการ</h2><p class="mt-1 text-xs text-muted">${p?"แบ่งช่วงภายในวันที่ที่เลือก; แถบยาวขึ้นหมายถึงจำนวนมากขึ้น":"แนวโน้มจำนวนรายการย้อนหลัง; แถบยาวขึ้นหมายถึงจำนวนมากขึ้น"}</p>${T&&e.trend.length>1?`<ol class="mt-5 space-y-4">${G}</ol>`:'<p class="mt-5 text-sm text-muted">ข้อมูลยังไม่เพียงพอสำหรับแสดงแนวโน้ม</p>'}</section><section aria-labelledby="recent-heading" class="panel-shadow overflow-hidden rounded-2xl border border-line bg-white"><div class="p-4 sm:p-5"><h2 id="recent-heading" class="text-lg font-bold text-ink">บันทึกล่าสุด</h2><p class="mt-1 text-xs text-muted">เรียงตามเวลาบันทึก ครอบคลุมข้อมูลทุกช่วงเวลา</p></div>${ce||'<p class="border-t border-line p-5 text-sm text-muted">ยังไม่มีรายการบันทึก</p>'}</section></div>`}let Ue=null;function Tt(e,t){if(e.key!=="Tab")return;const r=[...t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(n=>!n.closest("[hidden]")&&n.offsetParent!==null);if(!r.length){e.preventDefault();return}const a=r[0],s=r[r.length-1];e.shiftKey&&document.activeElement===a?(e.preventDefault(),s.focus()):!e.shiftKey&&document.activeElement===s&&(e.preventDefault(),a.focus())}function gr({title:e="",content:t="",footer:r="",trigger:a=null,onClose:s=null,initialFocusSelector:n="input:not([disabled]), select:not([disabled]), button:not([disabled])",maxWidth:i="max-w-[440px]"}={}){Ae();const o=a||document.activeElement,l=document.createElement("div");l.id="accessible-drawer-root",l.className="drawer-container",l.innerHTML=`
    <div id="drawer-backdrop" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-200" aria-hidden="true" data-action="drawer-close"></div>
    <div id="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" class="fixed inset-y-0 right-0 z-50 flex w-full ${c(i)} flex-col bg-white shadow-2xl transition-transform duration-300">
      <div class="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5 sm:px-6">
        <h2 id="drawer-title" class="text-base font-bold text-ink">${c(e)}</h2>
        <button type="button" data-action="drawer-close" class="rounded-xl p-2 text-muted hover:bg-canvas transition" aria-label="ปิด">${f("close",20)}</button>
      </div>
      <div class="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
        ${typeof t=="string"?t:""}
      </div>
      ${r?`
      <div class="flex shrink-0 items-center justify-end gap-3 border-t border-line px-5 py-4 sm:px-6 bg-[#fafbfa]">
        ${r}
      </div>`:""}
    </div>
  `,t instanceof HTMLElement&&l.querySelector(".flex-1").appendChild(t),document.body.appendChild(l),document.body.style.overflow="hidden";const d=u=>{if(u.key==="Escape")u.preventDefault(),Ae();else if(u.key==="Tab"){const p=document.getElementById("drawer-panel");p&&Tt(u,p)}},m=u=>{u.target.closest('[data-action="drawer-close"]')&&(u.preventDefault(),Ae())};return document.addEventListener("keydown",d),l.addEventListener("click",m),Ue={root:l,triggerElement:o,onKeydown:d,onClick:m,onClose:s},requestAnimationFrame(()=>{requestAnimationFrame(()=>{const u=document.getElementById("drawer-panel");if(!u)return;const p=n?u.querySelector(n):null;p&&typeof p.focus=="function"?p.focus():u.querySelector('button[data-action="drawer-close"]')?.focus()})}),l}function Ae(){if(!Ue)return;const{root:e,triggerElement:t,onKeydown:r,onClick:a,onClose:s}=Ue;document.removeEventListener("keydown",r),e.removeEventListener("click",a),e.remove(),document.body.style.overflow="",Ue=null,t&&typeof t.focus=="function"&&t.focus(),typeof s=="function"&&s()}function st({title:e="ยืนยันการดำเนินการ",message:t="คุณต้องการดำเนินการต่อหรือไม่",confirmText:r="ยืนยัน",cancelText:a="ยกเลิก",variant:s="danger",iconName:n="trash"}={}){return new Promise(i=>{const o=document.activeElement,l=document.createElement("div");l.id="accessible-modal-root",l.className="modal-container fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#0d241e]/55 p-4 backdrop-blur-xs";const d={danger:{iconBg:"bg-[#fff0ed] text-[#b64b43]",btnConfirm:"bg-[#b84d45] hover:bg-[#a43e37] text-white"},warning:{iconBg:"bg-[#fff8eb] text-[#b2721a]",btnConfirm:"bg-[#b2721a] hover:bg-[#9a6214] text-white"},primary:{iconBg:"bg-[#eaf5ef] text-primary",btnConfirm:"bg-primary hover:bg-primary-dark text-white"}}[s]||{iconBg:"bg-[#fff0ed] text-[#b64b43]",btnConfirm:"bg-[#b84d45] hover:bg-[#a43e37] text-white"};l.innerHTML=`
      <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-modal-title" aria-describedby="confirm-modal-desc" class="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${d.iconBg}">
          ${f(n,21)}
        </div>
        <h2 id="confirm-modal-title" class="text-lg font-bold text-ink">${c(e)}</h2>
        <p id="confirm-modal-desc" class="mt-2 text-sm leading-relaxed text-muted">${c(t)}</p>
        <div class="mt-7 flex justify-end gap-2.5">
          <button type="button" id="confirm-modal-cancel" class="min-h-11 rounded-xl border border-line px-4 text-sm font-bold text-ink hover:bg-canvas transition">
            ${c(a)}
          </button>
          <button type="button" id="confirm-modal-confirm" class="min-h-11 rounded-xl px-4 text-sm font-bold transition ${d.btnConfirm}">
            ${c(r)}
          </button>
        </div>
      </div>
    `,document.body.appendChild(l);const m=document.body.style.overflow;document.body.style.overflow="hidden";const u=l.querySelector("#confirm-modal-cancel"),p=l.querySelector("#confirm-modal-confirm"),b=w=>{document.removeEventListener("keydown",h),l.remove(),document.body.style.overflow=m,o&&typeof o.focus=="function"&&o.focus(),i(w)},h=w=>{if(w.key==="Escape")w.preventDefault(),b(!1);else if(w.key==="Tab"){const $=l.querySelector('[role="alertdialog"]');$&&Tt(w,$)}};l.addEventListener("click",w=>{w.target===l&&b(!1)}),u?.addEventListener("click",()=>b(!1)),p?.addEventListener("click",()=>b(!0)),document.addEventListener("keydown",h),setTimeout(()=>{u?.focus()},50)})}const de={"super-admin":{label:"ผู้ดูแลสูงสุด",color:"bg-[#fef2e8] text-[#b25d1a] border-[#f9d4b4]"},admin:{label:"ผู้ดูแลระบบ",color:"bg-[#e8f0fe] text-[#2756b8] border-[#c3d3f9]"},staff:{label:"เจ้าหน้าที่",color:"bg-[#eef7f2] text-[#156e3a] border-[#b7e4ce]"},viewer:{label:"ผู้ดูข้อมูล",color:"bg-[#f3f0fb] text-[#5a469b] border-[#cdc5ef]"},auditor:{label:"ผู้ตรวจสอบ",color:"bg-[#fff4e8] text-[#966020] border-[#f5d9a8]"}};function vr(e){const t=de[e]||{label:e,color:"bg-[#f2f4f3] text-[#52665e] border-[#d8e3de]"};return`<span class="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${t.color}">${c(t.label)}</span>`}let N={loading:!1,error:null,users:[],summary:{},meta:{},roles:[]},q={q:"",role:"all",status:"all",sort:"created_at",direction:"desc",page:1},ut=null;function wr(){return`
    <div id="user-directory-root" class="w-full min-w-0 max-w-full">
      ${Ut()}
    </div>
  `}function Ut(){const{loading:e,error:t,users:r,summary:a,meta:s}=N,i=_e("users.create")?`<button type="button" data-action="um-open-create" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${f("plus",18)}เพิ่มผู้ใช้งาน</button>`:"";return`
    ${Z("การจัดการระบบ","จัดการผู้ใช้งาน","บริหารบัญชีผู้ใช้ สิทธิ์การเข้าถึง และความปลอดภัยของระบบ",i)}
    ${yr(a)}
    ${$r()}
    ${e?`<div role="status" aria-live="polite" class="flex items-center justify-center py-16 text-muted text-sm">${f("filter",20,"animate-spin mr-2")} กำลังโหลดข้อมูลผู้ใช้งาน...</div>`:t?`<div role="alert" class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">${c(t)}</div>`:kr(r,s)}
  `}function yr(e){return`
    <section aria-label="สรุปสถิติผู้ใช้" class="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      ${[{label:"บัญชีผู้ใช้ทั้งหมด",value:e.total_accounts??"—",icon:"users",bg:"bg-[#e6f4ee]",color:"text-primary"},{label:"ใช้งานอยู่",value:e.active_users??"—",icon:"check",bg:"bg-[#e7f3f8]",color:"text-[#3485a5]"},{label:"ผู้ดูแลระบบ",value:e.administrators??"—",icon:"sparkles",bg:"bg-[#fff3e5]",color:"text-[#bb7934]"},{label:"การยืนยันตัวตน 2FA",value:e.two_factor_enrolled??(e.total_accounts!=null?"พร้อมใช้งาน":"—"),icon:"lock",bg:"bg-[#f3f0fb]",color:"text-[#6b4fb8]"}].map(r=>`
        <div class="rounded-2xl border border-line bg-white p-4 sm:p-5 panel-shadow">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${r.bg} ${r.color}">
              ${f(r.icon,19)}
            </div>
            <p class="text-xs font-medium text-muted">${c(r.label)}</p>
          </div>
          <p class="mt-3 text-[26px] font-bold leading-none text-ink">${c(String(r.value))}</p>
        </div>
      `).join("")}
    </section>
  `}function $r(){const{q:e,role:t,status:r,sort:a,direction:s}=q,n=[{value:"all",label:"ทุกบทบาท"},...Object.entries(de).map(([o,l])=>({value:o,label:l.label}))],i=[{value:"all",label:"ทุกสถานะ"},{value:"active",label:"ใช้งานอยู่"},{value:"inactive",label:"ระงับแล้ว"}];return`
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
            ${i.map(o=>`<option value="${o.value}"${r===o.value?" selected":""}>${c(o.label)}</option>`).join("")}
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
  `}function kr(e,t){const r=_e("users.update"),a=_e("users.disable"),s=_e("users.update");if(!e.length)return`
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
          <p class="mt-0.5 text-xs text-muted">พบ ${E(o)} บัญชี</p>
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
            ${e.map(d=>{const m=d.role??d.roles?.[0]?.name??d.roles?.[0]??"",u=!!d.is_active,p=String(d.id)===String(window.serviceHubUser?.id);return`
                <tr class="transition hover:bg-[#fafcfa]" data-user-id="${c(String(d.id))}">
                  <td class="px-5 py-3.5">
                    <div class="flex items-center gap-3">
                      <span aria-hidden="true" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e0f0e8] text-[13px] font-bold text-primary-dark">
                        ${c(yt(d.name))}
                      </span>
                      <span class="font-semibold text-ink break-words max-w-[160px]">${c(d.name)}</span>
                    </div>
                  </td>
                  <td class="px-5 py-3.5 text-muted font-mono text-xs">${c(d.username)}</td>
                  <td class="px-5 py-3.5">${m?vr(m):'<span class="text-muted">—</span>'}</td>
                  <td class="px-5 py-3.5">
                    <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${u?"bg-[#eef7f2] text-[#156e3a]":"bg-[#fef2f2] text-[#b91c1c]"}">
                      <span class="h-1.5 w-1.5 rounded-full ${u?"bg-[#22c55e]":"bg-[#ef4444]"}"></span>
                      ${u?"ใช้งานอยู่":"ระงับแล้ว"}
                    </span>
                  </td>
                  <td class="px-5 py-3.5 text-xs text-muted whitespace-nowrap">${z(d.created_at)}</td>
                  ${r||a||s?`
                  <td class="px-5 py-3.5 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                      ${r?`<button type="button" data-action="um-edit-user" data-id="${c(String(d.id))}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-ink hover:bg-canvas" aria-label="แก้ไข ${c(d.name)}">${f("edit",15)}แก้ไข</button>`:""}
                      ${a&&!p?`<button type="button" data-action="um-toggle-status" data-id="${c(String(d.id))}" data-active="${u?"1":"0"}" data-name="${c(d.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold ${u?"text-[#b91c1c] hover:bg-red-50":"text-[#156e3a] hover:bg-[#eef7f2]"}" aria-label="${u?"ระงับ":"เปิดใช้"} ${c(d.name)}">${f(u?"close":"check",15)}${u?"ระงับ":"เปิดใช้"}</button>`:""}
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
        <span>แสดง ${E((n-1)*l+1)}–${E(Math.min(n*l,o))} จาก ${E(o)} บัญชี</span>
        <div class="flex items-center gap-2">
          <button type="button" data-action="um-page" data-page="${n-1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${n===1?"opacity-45 cursor-not-allowed":"hover:bg-canvas"}" ${n===1?'disabled aria-disabled="true"':""}>ก่อนหน้า</button>
          <span class="px-1 font-bold text-ink">${n} / ${i}</span>
          <button type="button" data-action="um-page" data-page="${n+1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${n===i?"opacity-45 cursor-not-allowed":"hover:bg-canvas"}" ${n===i?'disabled aria-disabled="true"':""}>ถัดไป</button>
        </div>
      </div>`:""}
    </section>
  `}function Sr(){const e="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",t=new Uint8Array(16);return crypto.getRandomValues(t),Array.from(t).map(r=>e[r%e.length]).join("")}async function ee(e=R){N.loading=!0,N.error=null,pt(e);const t=new URLSearchParams;q.q&&t.set("q",q.q),q.role&&q.role!=="all"&&t.set("role",q.role),q.status&&q.status!=="all"&&t.set("status",q.status),t.set("sort",q.sort),t.set("direction",q.direction),t.set("page",String(q.page)),t.set("per_page","10");try{const r=window.serviceHubUrls?.apiUsers||"/api/users",a=await I(`${r}?${t}`);N.users=a.data??[],N.summary=a.summary??{},N.meta=a.meta??{}}catch(r){N.error=r.message||"ไม่สามารถโหลดข้อมูลผู้ใช้งานได้"}finally{N.loading=!1,pt(e)}}async function Er(){try{const e=window.serviceHubUrls?.apiRoles||"/api/roles",t=await I(e);N.roles=t.data??[]}catch{N.roles=Object.keys(de).map(e=>({name:e}))}}function pt(e=R){const t=document.getElementById("user-directory-root");t&&(t.innerHTML=Ut(),Lr(t,e))}function Lr(e,t=R){e.querySelector('[data-action="um-search"]')?.addEventListener("input",r=>{clearTimeout(ut),ut=setTimeout(()=>{q.q=r.target.value.trim(),q.page=1,ee(t)},300)}),e.querySelector('[data-action="um-filter-role"]')?.addEventListener("change",r=>{q.role=r.target.value,q.page=1,ee(t)}),e.querySelector('[data-action="um-filter-status"]')?.addEventListener("change",r=>{q.status=r.target.value,q.page=1,ee(t)}),e.querySelector('[data-action="um-filter-sort"]')?.addEventListener("change",r=>{const[a,s]=r.target.value.split(":");q.sort=a,q.direction=s,q.page=1,ee(t)}),e.querySelector('[data-action="um-clear-filters"]')?.addEventListener("click",()=>{Object.assign(q,{q:"",role:"all",status:"all",sort:"created_at",direction:"desc",page:1}),ee(t)}),e.querySelectorAll('[data-action="um-page"]').forEach(r=>{r.addEventListener("click",()=>{q.page=Number(r.dataset.page),ee(t)})}),e.querySelector('[data-action="um-open-create"]')?.addEventListener("click",r=>{Oe({mode:"create",trigger:r.currentTarget,toastFn:t})}),e.querySelectorAll('[data-action="um-edit-user"]').forEach(r=>{r.addEventListener("click",a=>{const s=N.users.find(o=>String(o.id)===r.dataset.id);if(!s)return;const n=s.role??s.roles?.[0]?.name??s.roles?.[0]??"",i={...s,role:n};Oe({mode:"edit",user:i,trigger:a.currentTarget,toastFn:t})})}),e.querySelectorAll('[data-action="um-reset-password"]').forEach(r=>{r.addEventListener("click",a=>{const s={id:r.dataset.id,name:r.dataset.name};Oe({mode:"reset",user:s,trigger:a.currentTarget,toastFn:t})})}),e.querySelectorAll('[data-action="um-toggle-status"]').forEach(r=>{r.addEventListener("click",async()=>{const a=r.dataset.id,s=r.dataset.active==="1",n=r.dataset.name;if(await st({title:s?"ยืนยันการระงับการใช้งาน":"ยืนยันการเปิดใช้งาน",message:`คุณต้องการ${s?"ระงับการใช้งาน":"เปิดใช้งาน"}บัญชี "${n}" ใช่หรือไม่? ${s?"ผู้ใช้จะถูกตัดเซสชันการเข้าใช้งานทันที":""}`,confirmText:s?"ระงับการใช้งาน":"เปิดใช้งาน",variant:s?"danger":"primary",iconName:s?"close":"check"})){r.disabled=!0;try{const o=window.serviceHubUrls?.apiUsers||"/api/users";await I(`${o}/${encodeURIComponent(a)}/status`,{method:"PATCH",body:{is_active:!s}}),t(s?"ระงับการใช้งานบัญชีแล้ว":"เปิดใช้งานบัญชีแล้ว"),await ee(t)}catch(o){t(o.message||"ไม่สามารถเปลี่ยนสถานะผู้ใช้ได้","error"),r.disabled=!1}}})})}function Oe({mode:e,user:t=null,trigger:r=null,toastFn:a=R}){const s=e==="reset",n=e==="edit",i=s?`รีเซ็ตรหัสผ่าน — ${c(t?.name)}`:n?"แก้ไขข้อมูลผู้ใช้":"เพิ่มผู้ใช้งานใหม่",o=N.roles.length?N.roles:Object.keys(de).map(p=>({name:p})),l=document.createElement("div");l.innerHTML=`
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
            ${o.map(p=>`<option value="${c(p.name)}"${t?.role===p.name?" selected":""}>${c(de[p.name]?.label||p.name)}</option>`).join("")}
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
  `;l.querySelectorAll('[data-action="toggle-pwd-visibility"]').forEach(p=>{p.addEventListener("click",()=>{const b=l.querySelector(`#${p.dataset.target}`);if(!b)return;const h=b.type==="password";b.type=h?"text":"password",p.innerHTML=f(h?"eyeOff":"eye",18),p.setAttribute("aria-label",h?"ซ่อนรหัสผ่าน":"แสดงรหัสผ่าน"),p.setAttribute("aria-pressed",String(h))})});const m=()=>{const p=Sr(),b=l.querySelector("#um-password")||l.querySelector("#um-new-password");if(b){b.value=p,b.type="text";const h=l.querySelector(`[data-target="${b.id}"]`);h&&(h.innerHTML=f("eyeOff",18),h.setAttribute("aria-label","ซ่อนรหัสผ่าน"),h.setAttribute("aria-pressed","true"))}};l.querySelector("#um-gen-pw-btn")?.addEventListener("click",m),l.querySelector("#um-gen-init-pw-btn")?.addEventListener("click",m);const u=l.querySelector("#um-drawer-form");u.addEventListener("submit",async p=>{p.preventDefault();const b=document.getElementById("um-drawer-submit"),h=l.querySelector("#drawer-server-error");h.classList.add("hidden"),h.textContent="",l.querySelectorAll('[aria-invalid="true"]').forEach(k=>k.removeAttribute("aria-invalid")),l.querySelectorAll("#um-password-error").forEach(k=>{k.textContent="ความยาวอย่างน้อย 15 ตัวอักษร",k.classList.remove("text-red-600"),k.classList.add("text-muted")}),l.querySelectorAll("#um-name-error, #um-username-error").forEach(k=>{k.textContent="",k.classList.add("hidden")});const w=new FormData(u),$={};e==="create"?($.name=String(w.get("name")||"").trim(),$.username=String(w.get("username")||"").trim(),$.password=String(w.get("password")||""),$.role=String(w.get("role")||"")):e==="edit"?($.name=String(w.get("name")||"").trim(),$.role=String(w.get("role")||"")):e==="reset"&&($.password=String(w.get("password")||"")),b&&(b.disabled=!0,b.classList.add("opacity-60"));try{const k=window.serviceHubUrls?.apiUsers||"/api/users";let T,L;e==="create"?(T=k,L="POST"):e==="edit"?(T=`${k}/${encodeURIComponent(t.id)}`,L="PUT"):(T=`${k}/${encodeURIComponent(t.id)}/reset-password`,L="POST"),await I(T,{method:L,body:$}),Ae(),a(e==="create"?"สร้างผู้ใช้งานเรียบร้อยแล้ว":e==="edit"?"บันทึกการแก้ไขแล้ว":"รีเซ็ตรหัสผ่านเรียบร้อยแล้ว"),await ee(a)}catch(k){b&&(b.disabled=!1,b.classList.remove("opacity-60")),k.status===422&&k.errors?(Object.entries(k.errors).forEach(([T,L])=>{const A=u.querySelector(`[name="${T}"]`),S=u.querySelector(`#um-${T}-error`);A&&A.setAttribute("aria-invalid","true"),S&&(S.textContent=L[0],S.classList.remove("hidden","text-muted"),S.classList.add("text-red-600"))}),u.querySelector('[aria-invalid="true"]')?.focus()):(h.textContent=k.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล",h.classList.remove("hidden"))}}),gr({title:i,content:l,footer:d,trigger:r,initialFocusSelector:e==="reset"?"#um-new-password":"#um-name"})}function qr(e){return setTimeout(()=>{ee(R),N.roles.length||Er()},0),wr()}let At=[],P={"cleaning-zones":[],"waste-types":[]};const Ye=new Set,ft=new Set;let Ce=null;function Ct(e){Ye.delete(e),P[e]=[]}async function Ve(e){const t=[...new Set(e.fields.filter(r=>r.type==="reference").map(r=>r.reference))];for(const r of t)Ye.has(r)||!y(`${r}.view`)||(P[r]=await vt(He(r)),Ye.add(r))}async function _r(e,t=new URLSearchParams){const r=Q.find(n=>n.id===e);if(!r)throw new Error("Unknown activity module");const a=new URLSearchParams({per_page:"6",page:String(Math.max(1,Number.parseInt(t.get("page"),10)||1))});for(const n of["q","from","to","sort",...r.fields.filter(i=>i.type==="reference").map(i=>i.name)])t.get(n)&&a.set(n,t.get(n));const s=await I(`${xe(e)}?${a}`);return At=Array.isArray(s.data)?s.data:[],s}function Dt(e,t,r=P){return!e||t==null||t===""?"—":e.type==="reference"?c(r[e.reference]?.find(a=>String(a.id)===String(t))?.name||"ไม่พบข้อมูลอ้างอิง"):e.type==="number"||e.type==="integer"?`${E(t)}${e.unit?` ${c(e.unit)}`:""}`:e.type==="date"?z(t):c(t)}function jr(e,t="",r="",a=P){const s=`field-${e.name}`,n=`id="${s}" name="${e.name}" class="field" ${e.required?"required":""} ${r?'aria-invalid="true"':""} aria-describedby="${s}-help"`;let i;if(e.type==="textarea")i=`<textarea ${n} rows="4" maxlength="10000">${c(t)}</textarea>`;else if(e.type==="reference")i=`
      <select ${n}>
        <option value="" disabled ${t?"":"selected"}>เลือก${c(e.label)}</option>
        ${(a[e.reference]||[]).filter(o=>o.is_active||String(o.id)===String(t)).map(o=>`
          <option value="${c(o.id)}" ${String(t)===String(o.id)?"selected":""}>
            ${c(o.name)}${o.symbol?` (${c(o.symbol)})`:""}
          </option>
        `).join("")}
      </select>
    `;else if(e.type==="select")i=`
      <select ${n}>
        <option value="" disabled ${t?"":"selected"}>ระบุ${c(e.label)}</option>
        ${(e.options||[]).map(o=>`<option value="${c(o)}" ${t===o?"selected":""}>${c(o)}</option>`).join("")}
      </select>
    `;else{const o=e.type==="number"||e.type==="integer",l=e.type==="number"?["distance_km","fee_amount"].includes(e.name)?"0.01":"0.001":"1";i=`<input ${n} type="${o?"number":e.type}" ${o?`step="${l}" min="0"`:""} ${e.type==="text"?`maxlength="${e.name==="project_name"?500:255}"`:""} value="${c(t)}" placeholder="${e.type==="text"?`ระบุ${c(e.label)}`:""}">`}return`
    <div class="${e.type==="textarea"?"sm:col-span-2":""}">
      <label for="${s}" class="mb-1.5 block text-sm font-semibold text-[#41564c]">
        ${c(e.label)} ${e.required?'<span class="text-[#bf5b53]" aria-label="จำเป็น">*</span>':""}
      </label>
      ${i}
      <p id="${s}-help" class="mt-1.5 min-h-4 text-xs ${r?"text-[#b73c35]":"text-muted"}">
        ${r?c(r):e.unit?`หน่วย: ${c(e.unit)}`:"&nbsp;"}
      </p>
    </div>
  `}function Tr(e,t,r=P){const a=Object.fromEntries(new FormData(e)),s={};return t.fields.forEach(n=>{const i=String(a[n.name]??"").trim();if(a[n.name]=i,n.required&&!i)s[n.name]=`กรุณาระบุ${n.label}`;else if(i&&(n.type==="number"||n.type==="integer")){const o=Number(i);(!Number.isFinite(o)||o<0||n.type==="integer"&&!Number.isInteger(o))&&(s[n.name]=`กรุณาระบุ${n.label}เป็นจำนวนที่ถูกต้อง`)}else i&&n.type==="date"&&(!/^\d{4}-\d{2}-\d{2}$/.test(i)||Number.isNaN(new Date(`${i}T00:00:00Z`).getTime())||new Date(`${i}T00:00:00Z`).toISOString().slice(0,10)!==i)?s[n.name]="กรุณาระบุวันที่ที่ถูกต้อง":n.type==="reference"&&i&&!r[n.reference]?.some(o=>String(o.id)===i&&o.is_active)&&(s[n.name]=`กรุณาเลือก${n.label}จากรายการ`)}),t.id==="waste-collections"&&a.end_date&&a.service_date&&a.end_date<a.service_date&&(s.end_date="วันที่สิ้นสุดต้องไม่ก่อนวันเริ่ม"),{data:a,errors:s}}function Ur({module:e,group:t,params:r,records:a=At,references:s=P,meta:n=null}){const i=r.get("q")||"",o=r.get("from")||"",l=r.get("to")||"",d=r.get("sort")||"newest",m=6,u=Math.max(0,Number(n?.total??a.length)||0),p=Math.max(1,Number(n?.last_page)||Math.ceil(u/m)||1),b=Math.min(p,Math.max(1,Number(n?.current_page??r.get("page"))||1)),h=a,w=e.fields.filter(v=>v.name!=="service_date").slice(0,e.id==="waste-collections"?4:3),$=v=>{const D=new URLSearchParams(r);return D.set("page",String(v)),`#/module/${e.id}?${D}`},k=e.fields.filter(v=>v.type==="reference").map(v=>{const D=r.get(v.name)||"";return`
      <div class="w-full min-w-0 sm:w-[170px]">
        <label for="${v.name}-filter" class="mb-1.5 block text-xs font-bold text-[#52665d]">${v.label}</label>
        <select id="${v.name}-filter" name="${v.name}" class="field">
          <option value="">ทั้งหมด</option>
          ${(s[v.reference]||[]).map(K=>`<option value="${c(K.id)}" ${D===String(K.id)?"selected":""}>${c(K.name)}</option>`).join("")}
        </select>
      </div>
    `}).join("");(o||l||d!=="newest"||e.fields.some(v=>v.type==="reference"&&r.get(v.name)))&&ft.add(e.id);const L=ft.has(e.id),A=[];o&&l?A.push(`ช่วงวันที่ ${z(o)} – ${z(l)}`):o?A.push(`ตั้งแต่วันที่ ${z(o)}`):l&&A.push(`ถึงวันที่ ${z(l)}`),i&&A.push(`ค้นหา "${i}"`),e.fields.filter(v=>v.type==="reference").forEach(v=>{const D=r.get(v.name);if(D){const K=s[v.reference]?.find(G=>String(G.id)===String(D));K&&A.push(`${v.label}: ${K.name}`)}});const S=A.length>0,re=S?`
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#cfe5d6] bg-[#f0f8f3] px-4 py-3 text-xs sm:text-sm text-[#2b4c3c]" role="region" aria-label="สถานะตัวกรองข้อมูล">
      <div class="flex items-center gap-2">
        ${f("filter",16,"shrink-0 text-primary")}
        <div>
          <span class="font-bold">กำลังกรองข้อมูล:</span>
          <span class="text-[#3c594b]">${c(A.join(" · "))}</span>
          <span class="ml-1 text-xs text-muted font-normal">(${u>0?`พบ ${E(u)} รายการ`:"ไม่พบรายการ"})</span>
        </div>
      </div>
      <a href="#/module/${e.id}" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#b2dac0] bg-white px-3.5 py-1.5 text-xs font-bold text-primary shadow-xs hover:bg-[#ebf5ee]">
        ${f("close",14)}แสดงข้อมูลทั้งหมดทุกช่วงเวลา
      </a>
    </div>
  `:"";return`
    ${Z(t?.label||"",e.label,`จัดการข้อมูล${e.short} ค้นหาและกรองรายการตามช่วงวันที่`,y(`${e.id}.create`)?he("เพิ่มข้อมูล",`#/module/${e.id}/new`):"")}
    <section aria-label="ตัวกรองรายการ" class="panel-shadow mb-5 w-full max-w-full min-w-0 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองข้อมูล</h2>
        ${Pe({from:o,to:l,formId:"filter-form"})}
      </div>
      <form id="filter-form" data-module="${e.id}" class="flex flex-wrap items-end gap-3">
        <div class="w-full min-w-0 sm:min-w-[180px] sm:flex-1">
          <label for="search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <div class="relative">
            ${f("search",18,"pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]")}
            <input id="search" name="q" class="field pl-10" type="search" placeholder="พิมพ์คำค้นหาแล้วกด Enter..." value="${c(i)}" autocomplete="off">
          </div>
        </div>
        <button type="button" data-action="toggle-mobile-filters" data-module="${e.id}" aria-expanded="${L}" aria-controls="advanced-filters-${e.id}" class="inline-flex min-h-11 w-full items-center justify-between rounded-xl border border-line px-4 text-sm font-semibold text-primary-dark md:hidden">
          ตัวกรองเพิ่มเติม ${f("chevronDown",16,L?"rotate-180":"")}
        </button>
        <div id="advanced-filters-${e.id}" class="${L?"flex":"hidden"} w-full flex-wrap items-end gap-3 md:contents">
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label>
            <input id="date-from" class="field" type="date" name="from" value="${c(o)}">
          </div>
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label>
            <input id="date-to" class="field" type="date" name="to" value="${c(l)}">
          </div>
          ${k}
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

    ${re}

    <section aria-labelledby="records-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
        <div>
          <h2 id="records-title" class="text-sm font-bold">รายการข้อมูล</h2>
          <p class="mt-0.5 text-xs text-muted">พบ ${E(u)} รายการ</p>
        </div>
        <span class="rounded-full bg-[#f0f7f2] px-2.5 py-1 text-[11px] font-bold text-primary">${c(e.short)}</span>
      </div>
      ${h.length?`
      <div class="data-table-scroll block overflow-x-auto w-full max-w-full min-w-0">
        <table class="w-full min-w-[650px] text-left text-sm" role="table">
          <thead class="bg-[#f9fbf9] text-xs font-semibold text-muted">
            <tr>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">${e.id==="waste-collections"?"วันเริ่ม":"วันที่ดำเนินงาน"}</th>
              ${w.map(v=>`<th scope="col" class="px-5 py-3.5 whitespace-nowrap ${e.id==="waste-collections"&&v.name==="weight"?"text-right":""}">${c(v.label)}</th>`).join("")}
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">ผู้บันทึก</th>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">ดูข้อมูล</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef2ee]">
            ${h.map(v=>`
              <tr class="transition hover:bg-[#fafcfa]">
                <td class="whitespace-nowrap px-5 py-3.5 font-semibold text-ink">${z(v.service_date)}</td>
                ${w.map(D=>`<td class="max-w-[240px] ${["number","integer"].includes(D.type)?"whitespace-normal break-words":"truncate"} ${e.id==="waste-collections"&&D.name==="weight"?"text-right":""} px-5 py-3.5 text-[#53675e]">${Dt(D,v[D.name],s)}</td>`).join("")}
                <td class="whitespace-nowrap px-5 py-3.5 text-muted">${c(v.created_by)}</td>
                <td class="whitespace-nowrap px-5 py-3.5 text-right">
                  <a href="#/module/${e.id}/${encodeURIComponent(v.id)}" class="inline-flex items-center gap-1 font-bold text-primary hover:underline">
                    รายละเอียด ${f("arrow",15)}
                  </a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-xs text-muted sm:px-6 sm:py-4">
        <span>แสดง ${E((b-1)*m+1)}–${E(Math.min(b*m,u))} จาก ${E(u)} รายการ</span>
        <div class="flex items-center gap-2">
          <a href="${$(Math.max(1,b-1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${b===1?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${b===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="px-1 font-bold text-ink">${b} / ${p}</span>
          <a href="${$(Math.min(p,b+1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${b===p?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${b===p?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:`
      <div class="flex flex-col items-center px-6 py-14 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${S?"bg-[#fef5e7] text-[#c2782b]":"bg-[#f1f7f2] text-primary"}">${f("empty",27)}</div>
        <h3 class="text-base font-bold text-ink">${S?"ไม่พบรายการข้อมูลตามเงื่อนไขที่เลือก":"ยังไม่มีข้อมูลในหมวดนี้"}</h3>
        <p class="mt-2 max-w-md text-sm leading-relaxed text-muted">
          ${S?`ไม่มีการบันทึกงานบริการ${c(e.short)}${o&&l?` ระหว่างวันที่ ${z(o)} ถึง ${z(l)}`:""} คุณสามารถคลิกปุ่มด้านล่างเพื่อดูข้อมูลทั้งหมดในอดีต หรือเลือกช่วงเวลาอื่น`:`เริ่มต้นด้วยการเพิ่มรายการข้อมูลการดำเนินงานในหมวด${c(e.short)}`}
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          ${S?`
            <a href="#/module/${e.id}" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-sm hover:bg-primary-dark">
              ${f("grid",16)}แสดงข้อมูลทั้งหมดทุกช่วงเวลา
            </a>
          `:""}
          ${y(`${e.id}.create`)?`
            <a href="#/module/${e.id}/new" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl ${S?"border border-line bg-white text-ink hover:bg-canvas":"bg-primary text-white hover:bg-primary-dark"} px-5 text-sm font-bold">
              ${f("plus",16)}เพิ่มข้อมูลใหม่
            </a>
          `:""}
        </div>
      </div>`}
    </section>
  `}function Ar({module:e,group:t,record:r,references:a=P}){return`
    ${Z(t?.label||"","รายละเอียดข้อมูล",`ข้อมูล${e.short} วันที่ ${z(r.service_date)}`,`
      <div class="flex flex-wrap gap-2">
        ${y(`${e.id}.update`)?le("แก้ไข",`#/module/${e.id}/${encodeURIComponent(r.id)}/edit`,"edit"):""}
        ${y(`${e.id}.delete`)?`
          <button type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#eed8d5] bg-white px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-activity" data-module="${e.id}" data-id="${c(r.id)}">
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
          ${e.fields.map(s=>`
            <div class="border-b border-[#edf1ed] py-4">
              <dt class="text-xs font-semibold text-muted">${c(s.label)}</dt>
              <dd class="mt-1.5 break-words text-sm font-bold text-ink">${Dt(s,r[s.name],a)}</dd>
            </div>
          `).join("")}
        </dl>
      </section>
      <aside class="h-fit rounded-2xl border border-line bg-white p-5">
        <h2 class="text-sm font-bold">ประวัติรายการ</h2>
        <div class="mt-5 space-y-5 border-l-2 border-[#d8eadf] pl-4">
          <div>
            <p class="text-xs font-bold text-primary">บันทึกข้อมูล</p>
            <p class="mt-1 text-xs text-muted">${c(r.created_by||"ไม่ระบุ")}</p>
            <p class="mt-0.5 text-xs text-muted">${z(r.created_at)}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-primary">แก้ไขล่าสุด</p>
            <p class="mt-1 text-xs text-muted">${c(r.updated_by||"ไม่ระบุ")}</p>
            <p class="mt-0.5 text-xs text-muted">${z(r.updated_at)}</p>
          </div>
        </div>
        <div class="mt-5 rounded-xl bg-[#f4f8f4] p-3 text-[11px] leading-relaxed text-muted">
          การเปลี่ยนแปลงถูกบันทึกใน Audit Log ของระบบ
        </div>
      </aside>
    </div>
  `}function De({module:e,group:t,record:r=null,errors:a={},values:s=null,references:n=P}){const i=!!r,o={...s||Ce||r||{}};if(!i&&!o.service_date){const d=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Bangkok",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),m=u=>d.find(p=>p.type===u).value;o.service_date=`${m("year")}-${m("month")}-${m("day")}`}const l=`${i?"แก้ไข":"เพิ่ม"}ข้อมูล${e.short}`;return`
    ${Z(t?.label||"",l,i?"ตรวจสอบและแก้ไขรายละเอียดรายการนี้":"กรอกข้อมูลการดำเนินงานให้ครบตามช่องที่กำหนด")}
    <section class="panel-shadow w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-5 py-5 sm:px-7">
        <h2 class="font-bold">รายละเอียดการดำเนินงาน</h2>
        <p class="mt-1 text-xs text-muted">ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p>
      </div>
      <form id="record-form" data-module="${e.id}" data-id="${r?c(r.id):""}" novalidate class="p-5 sm:p-7">
        <div class="grid min-w-0 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          ${e.fields.map(d=>jr(d,o[d.name]??"",a[d.name],n)).join("")}
        </div>
        <div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <a href="${r?`#/module/${e.id}/${encodeURIComponent(r.id)}`:`#/module/${e.id}`}" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold text-[#566a60] hover:bg-canvas">
            ยกเลิก
          </a>
          <button type="submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">
            ${f("check",18)}${i?"บันทึกการแก้ไข":"บันทึกข้อมูล"}
          </button>
        </div>
      </form>
    </section>
  `}async function Cr(e,t,{navigate:r=U,showToast:a=R}={}){if(await st({title:"ยืนยันการลบรายการ",message:"รายการนี้จะถูกลบออกจากฐานข้อมูลอย่างถาวร คุณต้องการดำเนินการต่อหรือไม่?",confirmText:"ลบรายการ",variant:"danger",iconName:"trash"}))try{const n=`${xe(e)}/${t}`;await I(n,{method:"DELETE"}),a("ลบรายการเรียบร้อยแล้ว"),r(`/module/${e}`)}catch(n){a(n.message||"ไม่สามารถลบรายการได้","error")}}async function Dr(e){const t=e.dataset.module,r=Q.find(i=>i.id===t);if(!r)return;const{data:a,errors:s}=Tr(e,r,P),n=e.dataset.id?{id:e.dataset.id}:null;if(Object.keys(s).length){Ce=a;const i=be.find(d=>d.id===r.group),o=De({module:r,group:i,record:n,errors:s,values:a,references:P}),l=document.querySelector("#main-content");l&&(l.innerHTML=o),document.querySelector('[aria-invalid="true"]')?.focus();return}try{const i=n?`${xe(r.id)}/${n.id}`:xe(r.id),l=await I(i,{method:n?"PUT":"POST",body:a});Ce=null,U(`/module/${r.id}/${l.data.id}`),R("บันทึกข้อมูลแล้ว")}catch(i){Ce=a;const o=i.fieldErrors||Object.fromEntries(Object.entries(i.fields||{}).map(([u,p])=>[u,Array.isArray(p)?p[0]:p]));R(i.message||"ไม่สามารถบันทึกข้อมูลได้","error");const l=be.find(u=>u.id===r.group),d=De({module:r,group:l,record:n,errors:o,values:a,references:P}),m=document.querySelector("#main-content");m&&(m.innerHTML=d),document.querySelector('[aria-invalid="true"]')?.focus()}}async function Mr(e){const t=e.parts[1],r=Q.find(o=>o.id===t);if(!r)return'<div class="p-8 text-center text-muted">ไม่พบข้อมูลโมดูลงานบริการ</div>';const a=be.find(o=>o.id===r.group);if(e.parts.length===2){const[o]=await Promise.all([_r(t,e.params),Ve(r)]);if(!e.isCurrent())return null;const l=Math.max(1,Number.parseInt(e.params.get("page"),10)||1),d=Math.max(1,Number(o.meta?.last_page)||1);if(Number(o.meta?.total)>0&&l>d){const m=new URLSearchParams(e.params);return m.set("page",String(d)),U(`/module/${t}?${m}`),null}return Ur({module:r,group:a,params:e.params,records:o.data,references:P,meta:o.meta})}if(e.parts.length===3&&e.parts[2]==="new")return y(`${r.id}.create`)?(await Ve(r),De({module:r,group:a,record:null,references:P})):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์สร้างข้อมูลในหมวดนี้</div>';const s=decodeURIComponent(e.parts[2]||"");let n;try{[n]=await Promise.all([I(`${xe(t)}/${encodeURIComponent(s)}`),Ve(r)])}catch(o){if(o.status===404)return'<div class="p-8 text-center text-muted">ไม่พบรายการข้อมูลที่ต้องการ</div>';throw o}if(!e.isCurrent())return null;const i=n.data;return e.parts.length===4&&e.parts[3]==="edit"?y(`${r.id}.update`)?De({module:r,group:a,record:i,references:P}):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์แก้ไขข้อมูลในหมวดนี้</div>':Ar({module:r,group:a,record:i,references:P})}let ge=[],ve=[];const Mt=new Set;async function Be(e){if(!y(`${e}.view`))return;const t=await vt(He(e));e==="cleaning-zones"&&(ge=t),e==="waste-types"&&(ve=t),Mt.add(e)}function Rt(e){return Number(e.usage_count)||0}function It(e){return Number(e.usage_count)||0}function Rr({params:e,zones:t=ge}){const r=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),a=e.get("sort")==="name"?"name":"code",s=e.get("status")||"all",n=10,i=t.filter(u=>!r||(u.code+" "+u.name).toLocaleLowerCase("th-TH").includes(r)).filter(u=>s==="all"?!0:s==="active"?u.is_active:!u.is_active).sort((u,p)=>String(u[a]).localeCompare(String(p[a]),"th",{numeric:!0})),o=Math.max(1,Math.ceil(i.length/n)),l=Math.min(o,Math.max(1,Number.parseInt(e.get("page"),10)||1)),d=i.slice((l-1)*n,l*n),m=u=>{const p=new URLSearchParams;return e.get("q")&&p.set("q",e.get("q")),s!=="all"&&p.set("status",s),a!=="code"&&p.set("sort",a),u>1&&p.set("page",String(u)),"#/cleaning-zones"+(p.size?"?"+p:"")};return`
    ${Z("ข้อมูลพื้นฐาน","เขตรักษาความสะอาด","จัดการรหัสและชื่อเขตสำหรับรายการล้างทำความสะอาดถนน",he("เพิ่มเขต","#/cleaning-zones/new"))}
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
            <option value="code" ${a==="code"?"selected":""}>รหัสเขต</option>
            <option value="name" ${a==="name"?"selected":""}>ชื่อเขต</option>
          </select>
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        <a href="#/cleaning-zones" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>
      </form>
    </section>

    <section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-4 py-4 sm:px-6">
        <h2 class="text-sm font-bold">รายการเขต</h2>
        <p class="mt-1 text-xs text-muted">พบ ${E(i.length)} รายการ</p>
      </div>
      ${d.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${d.map(u=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/cleaning-zones/${encodeURIComponent(u.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${c(u.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${c(u.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานล้างถนน ${E(Rt(u))} รายการ</span>
            ${f("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบเขตรักษาความสะอาด</h3>
        <p class="mt-2 text-sm text-muted">${r?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มเขต"}</p>
        <div class="mt-5">${r?le("แสดงทั้งหมด","#/cleaning-zones"):he("เพิ่มเขต","#/cleaning-zones/new")}</div>
      </div>`}
      ${i.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${E((l-1)*n+1)}–${E(Math.min(l*n,i.length))} จาก ${E(i.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===1?"pointer-events-none opacity-45":""}" href="${m(l-1)}" ${l===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${l} / ${o}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===o?"pointer-events-none opacity-45":""}" href="${m(l+1)}" ${l===o?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function Ir({zone:e}){const t=Rt(e),r=Number(e.referenced_count)||0;return`
    ${Z("ข้อมูลพื้นฐาน",e.name,"รายละเอียดเขตรักษาความสะอาด",`
      <div class="flex flex-wrap gap-2">
        ${le("แก้ไข",`#/cleaning-zones/${encodeURIComponent(e.id)}/edit`,"edit")}
        <button type="button" class="inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#eed8d5] bg-white px-4 py-2.5 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6] sm:w-auto" data-action="delete-reference" data-type="cleaning-zones" data-id="${c(e.id)}" data-name="${c(e.name)}" data-usage="${r}">
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
          <dd class="mt-1 font-bold">${E(t)} รายการ</dd>
        </div>
      </dl>
      ${r?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">เขตนี้ยังมีรายการล้างถนนอ้างอิงอยู่ รวมถึงรายการที่ลบออกจากหน้าจอ จึงไม่สามารถลบเขตได้</p>':""}
    </section>
  `}function We(e=null,t={},r=e||{}){const s=!!e?"แก้ไขเขตรักษาความสะอาด":"เพิ่มเขตรักษาความสะอาด",n=(i,o,l)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="zone-${i}">
        ${c(o)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="zone-${i}" name="${i}" type="text" maxlength="${l}" required value="${c(r[i]||"")}" aria-describedby="zone-${i}-error" ${t[i]?'aria-invalid="true"':""}>
      <p id="zone-${i}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${c(t[i]||"")}</p>
    </div>
  `;return`
    ${Z("ข้อมูลพื้นฐาน",s,"กรอกรหัสและชื่อเขตเพื่อใช้ในฟอร์มล้างทำความสะอาดถนน")}
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
  `}function Hr({params:e,wasteTypes:t=ve}){const r=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),a=10,s=t.filter(d=>!r||(d.code+" "+d.name).toLocaleLowerCase("th-TH").includes(r)).sort((d,m)=>String(d.code).localeCompare(String(m.code),"th",{numeric:!0})),n=Math.max(1,Math.ceil(s.length/a)),i=Math.min(n,Math.max(1,Number.parseInt(e.get("page"),10)||1)),o=s.slice((i-1)*a,i*a),l=d=>{const m=new URLSearchParams;return e.get("q")&&m.set("q",e.get("q")),d>1&&m.set("page",String(d)),"#/waste-types"+(m.size?"?"+m:"")};return`
    ${Z("ข้อมูลพื้นฐาน","ประเภทขยะมูลฝอย","จัดการรหัสและชื่อประเภทสำหรับรายการมูลฝอย",he("เพิ่มประเภท","#/waste-types/new"))}
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
        <p class="mt-1 text-xs text-muted">พบ ${E(s.length)} รายการ</p>
      </div>
      ${o.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${o.map(d=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/waste-types/${encodeURIComponent(d.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${c(d.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${c(d.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานบริหารจัดการมูลฝอย ${E(It(d))} รายการ</span>
            ${f("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบประเภทขยะมูลฝอย</h3>
        <p class="mt-2 text-sm text-muted">${r?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มประเภท"}</p>
        <div class="mt-5">${r?le("แสดงทั้งหมด","#/waste-types"):he("เพิ่มประเภท","#/waste-types/new")}</div>
      </div>`}
      ${s.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${E((i-1)*a+1)}–${E(Math.min(i*a,s.length))} จาก ${E(s.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${i===1?"pointer-events-none opacity-45":""}" href="${l(i-1)}" ${i===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${i} / ${n}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${i===n?"pointer-events-none opacity-45":""}" href="${l(i+1)}" ${i===n?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function Pr({wasteType:e}){const t=It(e),r=Number(e.referenced_count)||0;return`
    ${Z("ข้อมูลพื้นฐาน",e.name,"รายละเอียดประเภทขยะมูลฝอย",`
      <div class="flex flex-wrap gap-2">
        ${le("แก้ไข",`#/waste-types/${encodeURIComponent(e.id)}/edit`,"edit")}
        <button type="button" class="inline-flex min-h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-[#eed8d5] bg-white px-4 py-2.5 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6] sm:w-auto" data-action="delete-reference" data-type="waste-types" data-id="${c(e.id)}" data-name="${c(e.name)}" data-usage="${r}">
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
          <dd class="mt-1 font-bold">${E(t)} รายการ</dd>
        </div>
      </dl>
      ${r?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">ประเภทนี้ยังมีรายการมูลฝอยอ้างอิงอยู่ รวมถึงรายการที่ลบออกจากหน้าจอ จึงไม่สามารถลบประเภทได้</p>':""}
    </section>
  `}function Ge(e=null,t={},r=e||{}){const s=!!e?"แก้ไขประเภทขยะมูลฝอย":"เพิ่มประเภทขยะมูลฝอย",n=(i,o,l)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="wasteType-${i}">
        ${c(o)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="wasteType-${i}" name="${i}" type="text" maxlength="${l}" required value="${c(r[i]||"")}" aria-describedby="wasteType-${i}-error" ${t[i]?'aria-invalid="true"':""}>
      <p id="wasteType-${i}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${c(t[i]||"")}</p>
    </div>
  `;return`
    ${Z("ข้อมูลพื้นฐาน",s,"กรอกรหัสและชื่อประเภทเพื่อใช้ในฟอร์มงานบริหารจัดการมูลฝอย")}
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
  `}async function Br(e,t,r,a,{navigate:s=U,showToast:n=R,refreshData:i=Be}={}){if(a>0){n(`ไม่สามารถลบ "${r}" ได้เนื่องจากมีข้อมูลงานบริการที่อ้างอิงอยู่`,"error");return}const o=e==="cleaning-zones"?"เขต":"ประเภทขยะ";if(await st({title:`ยืนยันการลบ${o}`,message:`คุณต้องการลบ "${r}" ออกจากระบบใช่หรือไม่?`,confirmText:`ลบ${o}`,variant:"danger",iconName:"trash"}))try{const d=`${He(e)}/${t}`;await I(d,{method:"DELETE"}),n(`ลบ${o}เรียบร้อยแล้ว`),await i(e),Ct(e),s(`/${e}`)}catch(d){n(d.message||`ไม่สามารถลบ${o}ได้`,"error")}}async function bt(e,t){const r=e.dataset.id,a=Object.fromEntries(new FormData(e));a.is_active=e.elements.namedItem("is_active")?.checked??!0;try{const s=`${He(t)}${r?`/${r}`:""}`,n=await I(s,{method:r?"PUT":"POST",body:a});await Be(t),Ct(t),U(`/${t}/${n.data.id}`),R("บันทึกข้อมูลแล้ว")}catch(s){R(s.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล","error");const n=s.fieldErrors||Object.fromEntries(Object.entries(s.fields||{}).map(([m,u])=>[m,Array.isArray(u)?u[0]:u])),o=(t==="cleaning-zones"?ge:ve).find(m=>String(m.id)===r)||null,l=t==="cleaning-zones"?We(o,n,a):Ge(o,n,a),d=document.querySelector("#main-content");d&&(d.innerHTML=l)}}async function xt(e,t){Mt.has(e)||await Be(e);const r=e==="cleaning-zones",a=r?ge:ve;if(t.parts.length===1)return r?Rr({params:t.params,zones:ge}):Hr({params:t.params,wasteTypes:ve});if(t.parts.length===2&&t.parts[1]==="new")return r?We():Ge();const s=decodeURIComponent(t.parts[1]||""),n=a.find(i=>String(i.id)===s);return n?t.parts.length===3&&t.parts[2]==="edit"?r?We(n):Ge(n):r?Ir({zone:n}):Pr({wasteType:n}):'<div class="p-8 text-center text-muted">ไม่พบข้อมูลอ้างอิงที่ต้องการ</div>'}function zr(){const e=window.serviceHubUser||{},t=yt(e.name||e.username||"U"),r=e.roles||[],a=r[0]||"staff",s=de[a]||{label:a,color:"border-gray-200 bg-gray-50 text-gray-700"};return`
    ${Z("โปรไฟล์ส่วนบุคคล","ข้อมูลบัญชีของฉัน","จัดการชื่อที่แสดงและเปลี่ยนรหัสผ่านสำหรับเข้าใช้งานระบบ")}
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
                ${r.map(n=>{const i=de[n]||{label:n,color:"border-gray-200 bg-gray-50"};return`<span class="rounded-lg border px-2.5 py-1 text-xs font-medium ${i.color}">${c(i.label)}</span>`}).join("")}
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
  `}function Nr({toastFn:e=R,onNameUpdated:t}={}){const r=document.getElementById("profile-name-form"),a=document.getElementById("profile-password-form");document.querySelectorAll('[data-action="toggle-pwd"]').forEach(s=>{s.addEventListener("click",()=>{const n=s.dataset.target,i=document.getElementById(n);if(!i)return;const o=i.type==="password";i.type=o?"text":"password",s.innerHTML=f(o?"eyeOff":"eye",18),s.setAttribute("aria-label",o?"ซ่อนรหัสผ่าน":"แสดงรหัสผ่าน"),s.setAttribute("aria-pressed",String(o))})}),document.getElementById("profile-gen-pwd")?.addEventListener("click",()=>{const s="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",n=new Uint8Array(16);crypto.getRandomValues(n);const i=Array.from(n).map(d=>s[d%s.length]).join(""),o=document.getElementById("profile-new-pwd"),l=document.getElementById("profile-confirm-pwd");if(o){o.value=i,o.type="text";const d=document.querySelector('[data-target="profile-new-pwd"]');d&&(d.innerHTML=f("eyeOff",18),d.setAttribute("aria-label","ซ่อนรหัสผ่าน"),d.setAttribute("aria-pressed","true"))}if(l){l.value=i,l.type="text";const d=document.querySelector('[data-target="profile-confirm-pwd"]');d&&(d.innerHTML=f("eyeOff",18),d.setAttribute("aria-label","ซ่อนรหัสผ่าน"),d.setAttribute("aria-pressed","true"))}}),r?.addEventListener("submit",async s=>{s.preventDefault();const n=document.getElementById("profile-name"),i=document.getElementById("profile-name-error"),o=document.getElementById("profile-name-submit"),l=n.value.trim();if(!l){i&&(i.textContent="กรุณาระบุชื่อ-นามสกุล",i.classList.remove("hidden")),n.focus();return}i&&i.classList.add("hidden"),o&&(o.disabled=!0,o.classList.add("opacity-50"));try{const d=window.serviceHubUrls?.apiProfile||"/api/profile",m=await I(d,{method:"PUT",body:{name:l}});window.serviceHubUser&&(window.serviceHubUser.name=m.data?.name||l),e("บันทึกข้อมูลชื่อเรียบร้อยแล้ว"),typeof t=="function"&&t(l)}catch(d){const m=d.errors?.name?.[0]||d.message||"ไม่สามารถบันทึกชื่อได้";i&&(i.textContent=m,i.classList.remove("hidden")),e(m,"error")}finally{o&&(o.disabled=!1,o.classList.remove("opacity-50"))}}),a?.addEventListener("submit",async s=>{s.preventDefault();const n=document.getElementById("profile-current-pwd"),i=document.getElementById("profile-new-pwd"),o=document.getElementById("profile-confirm-pwd"),l=document.getElementById("profile-current-pwd-error"),d=document.getElementById("profile-new-pwd-error"),m=document.getElementById("profile-confirm-pwd-error"),u=document.getElementById("profile-pwd-submit");l.classList.add("hidden"),d.classList.add("hidden"),m.classList.add("hidden");let p=!1;if(n.value||(l.textContent="กรุณาระบุรหัสผ่านปัจจุบัน",l.classList.remove("hidden"),p=!0),(!i.value||i.value.length<15)&&(d.textContent="รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 15 ตัวอักษร",d.classList.remove("hidden"),p=!0),i.value!==o.value&&(m.textContent="รหัสผ่านยืนยันไม่ตรงกับรหัสผ่านใหม่",m.classList.remove("hidden"),p=!0),i.value&&n.value&&i.value===n.value&&(d.textContent="รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านปัจจุบัน",d.classList.remove("hidden"),p=!0),!p){u&&(u.disabled=!0,u.classList.add("opacity-50"));try{const b=window.serviceHubUrls?.apiProfilePassword||"/api/profile/password";await I(b,{method:"PUT",body:{current_password:n.value,password:i.value,password_confirmation:o.value}}),n.value="",i.value="",o.value="",e("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว เซสชันในอุปกรณ์อื่นถูกยกเลิกแล้ว")}catch(b){b.errors?.current_password&&(l.textContent=b.errors.current_password[0],l.classList.remove("hidden")),b.errors?.password&&(d.textContent=b.errors.password[0],d.classList.remove("hidden")),!b.errors?.current_password&&!b.errors?.password&&e(b.message||"เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน","error")}finally{u&&(u.disabled=!1,u.classList.remove("opacity-50"))}}})}function Fr(e){return setTimeout(()=>{Nr()},0),zr()}let Me=[],Re={current_page:1,last_page:1};function Or({params:e,auditRows:t=Me,auditMeta:r=Re}){if(!y("audit-logs.view"))return`
      <div class="panel-shadow mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-white p-10 text-center">
        <h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึง</h1>
        <p class="mt-2 text-sm text-muted">คุณไม่มีสิทธิ์ในการดูประวัติการแก้ไขข้อมูลของระบบ</p>
      </div>
    `;const a=e.get("q")||"",s=e.get("action")||"all",n=e.get("from")||"",i=e.get("to")||"",o=d=>{const m=new URLSearchParams;return a&&m.set("q",a),s!=="all"&&m.set("action",s),n&&m.set("from",n),i&&m.set("to",i),m.set("page",String(d)),`#/audit-logs?${m}`},l=!!(a||s!=="all"||n||i);return`
    ${Z("การจัดการระบบ","ประวัติการแก้ไข","บันทึกการเพิ่ม แก้ไข และลบข้อมูลการปฏิบัติงานในระบบ")}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 mb-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองประวัติ</h2>
        ${Pe({from:n,to:i,formId:"audit-filter"})}
      </div>
      <form id="audit-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.2fr)_150px_140px_140px_auto_auto] sm:items-end">
        <div>
          <label for="audit-q" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <input id="audit-q" class="field" name="q" value="${c(a)}" placeholder="พิมพ์ค้นหาคำ หรือชื่อผู้ใช้..." data-action="live-filter" autocomplete="off">
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
            <time class="text-xs text-muted" datetime="${c(d.created_at)}">${z(d.created_at)}</time>
          </div>
        `).join(""):'<p class="py-8 text-center text-sm text-muted">ไม่มีประวัติการแก้ไขที่ตรงกับเงื่อนไข</p>'}
      </div>
      ${r.last_page>1?`
      <div class="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>หน้า ${r.current_page} / ${r.last_page}</span>
        <div class="flex gap-2">
          ${r.current_page>1?le("ก่อนหน้า",o(r.current_page-1)):""}
          ${r.current_page<r.last_page?le("ถัดไป",o(r.current_page+1)):""}
        </div>
      </div>`:""}
    </section>
  `}async function Vr(e=new URLSearchParams){if(!y("audit-logs.view"))return{data:[],meta:{current_page:1,last_page:1}};try{const t=window.serviceHubUrls?.apiAudit||"/api/audit-logs",r=await I(`${t}?${e.toString()}`);return Me=r.data??[],Re=r.meta??{current_page:1,last_page:1},{data:Me,meta:Re}}catch(t){throw t}}async function Zr(e){try{await Vr(e.params)}catch(t){console.error("Error fetching audit logs:",t)}return Or({params:e.params,auditRows:Me,auditMeta:Re})}function Kr({module:e,params:t,data:r,meta:a,loading:s,error:n,modules:i,groups:o,can:l,esc:d,number:m,thaiDate:u,moduleHref:p}){const b=new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Bangkok"}).slice(0,7),h=t.has("from")||t.has("to")?"custom":"month",w=t.get("month")||b,$=new URLSearchParams;h==="custom"?($.set("from",t.get("from")||""),$.set("to",t.get("to")||"")):t.has("month")&&$.set("month",w);const k=$.size?`?${$}`:"",T=g=>`#/reports/${encodeURIComponent(g)}${k}`,L=e?window.serviceHubUrls.apiReportDetailExport.replace("__MODULE__",encodeURIComponent(e.id))+k:window.serviceHubUrls.apiReportsExport+k,A=e?l(`${e.id}.export`):i.some(g=>l(`${g.id}.export`)),S=e?e.short:"ภาพรวมงานบริการ",re=a?.period,v=a?.comparison,D=g=>g?`${u(g.from)} – ${u(g.to)}`:"—",K=e?r?.count:a?.total,G=e?r?.previous_count:a?.previous_total,ce=G===0||G==null?null:Math.round((K-G)*1e3/G)/10,we=(g,H)=>Object.entries(g?.quantities||{}).flatMap(([B,M])=>M.map(C=>{const ye=H.fields.find(Ot=>Ot.name===B)?.label||B,nt=C.kind==="latest";return`<div class="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-line py-2 text-sm"><span class="text-muted">${d(ye)}${nt?" (ค่าล่าสุด)":""}</span><strong class="min-w-0 break-words text-ink">${C.total==null?"—":`${m(C.total)} ${d(C.unit||"")}`}</strong>${nt&&C.as_of?`<span class="w-full text-xs text-muted">ณ ${u(C.as_of)}</span>`:""}</div>`})).join(""),ze=`
    <section class="report-controls no-print panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5">
      <form id="report-filter" data-report-module="${d(e?.id||"")}" class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap gap-4">
            <label class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><input type="radio" name="period_mode" value="month" ${h==="month"?"checked":""}>รายเดือน</label>
            <label class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><input type="radio" name="period_mode" value="custom" ${h==="custom"?"checked":""}>กำหนดช่วงวันที่</label>
          </div>
          <div data-report-custom ${h==="month"?"hidden":""}>
            ${Pe({from:t.get("from")||"",to:t.get("to")||"",formId:"report-filter"})}
          </div>
        </div>
        <div data-report-month ${h==="custom"?"hidden":""}>
          <label for="report-month" class="mb-1 block text-sm font-semibold">เดือนที่ดำเนินงาน</label>
          <input id="report-month" class="field max-w-sm" type="month" name="month" value="${d(w)}" ${h==="custom"?"disabled":""} required>
        </div>
        <div data-report-custom class="grid gap-3 sm:grid-cols-2" ${h==="month"?"hidden":""}>
          <div>
            <label for="report-from" class="mb-1 block text-sm font-semibold">ตั้งแต่วันที่</label>
            <input id="report-from" class="field" type="date" name="from" value="${d(t.get("from")||"")}" ${h==="month"?"disabled":""} required>
          </div>
          <div>
            <label for="report-to" class="mb-1 block text-sm font-semibold">ถึงวันที่</label>
            <input id="report-to" class="field" type="date" name="to" value="${d(t.get("to")||"")}" ${h==="month"?"disabled":""} required>
          </div>
        </div>
        <p id="report-filter-error" class="text-sm text-red-700" role="alert"></p>
        <div class="flex flex-wrap gap-2">
          <button class="min-h-11 rounded-xl bg-primary px-5 font-bold text-white hover:bg-primary-dark" type="submit">แสดงรายงาน</button>
          <a href="#/reports${e?`/${encodeURIComponent(e.id)}`:""}" data-action="clear-filters" class="inline-flex min-h-11 items-center rounded-xl border border-line px-4 text-sm font-semibold text-muted hover:bg-[#f6faf7]">ล้างตัวกรอง</a>
          <button class="min-h-11 rounded-xl border border-line px-4 font-semibold" type="button" data-action="print-report">พิมพ์ / บันทึก PDF</button>
          ${A?`<a class="inline-flex min-h-11 items-center rounded-xl border border-line px-4 font-semibold text-primary" href="${d(L)}">ส่งออกสรุป CSV</a>`:""}
        </div>
      </form>
    </section>
  `;let x="";if(s)x='<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังโหลดรายงาน…</section>';else if(n)x=`<section class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-6" role="alert"><p class="font-semibold text-red-700">${d(n)}</p><button type="button" data-action="retry-report" class="no-print mt-3 min-h-11 rounded-xl border border-red-200 bg-white px-4 font-semibold">ลองอีกครั้ง</button></section>`;else if(!a||!r)x='<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังเตรียมรายงาน…</section>';else{const g=`<section class="grid gap-3 sm:grid-cols-3"><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">รายการในช่วงที่เลือก</p><strong class="mt-2 block text-3xl text-ink">${m(K)}</strong><p class="mt-2 text-xs text-muted">${D(re)}</p></div><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">ช่วงเปรียบเทียบ</p><strong class="mt-2 block text-3xl text-ink">${m(G)}</strong><p class="mt-2 text-xs text-muted">${D(v)}</p></div><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">การเปลี่ยนแปลงจำนวนรายการ</p><strong class="mt-2 block text-2xl text-ink">${ce==null?"เปรียบเทียบเป็นร้อยละไม่ได้":`${ce>0?"+":""}${m(ce)}%`}</strong><p class="mt-2 text-xs text-muted">${G===0?"ช่วงเปรียบเทียบไม่มีรายการ":"เทียบกับช่วงก่อนหน้า"}</p></div></section>`;if(e){const H=r.breakdown?.length?`<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">แยกตาม${e.id==="road-washings"?"เขตรักษาความสะอาด":"ประเภทขยะมูลฝอย"}</h2><div class="mt-3 divide-y divide-line">${r.breakdown.map(M=>`<div class="grid gap-1 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_auto_auto]"><span>${d(M.name)}</span><span>${m(M.count)} รายการ</span><strong class="min-w-0 break-words">${m(M.total)} ${d(M.unit)}</strong></div>`).join("")}</div></section>`:"",B=`<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">รายการล่าสุดตามวันที่ดำเนินงาน</h2>${r.recent?.length?`<ol class="mt-3 divide-y divide-line">${r.recent.map(M=>`<li class="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><div><strong>${d(M.title||"รายการงานบริการ")}</strong><p class="text-xs text-muted">${u(M.service_date)}</p></div><a class="no-print inline-flex min-h-11 items-center font-bold text-primary underline" href="${p(e.id)}/${encodeURIComponent(M.id)}">ดูรายการ</a></li>`).join("")}</ol>`:'<p class="mt-3 text-sm text-muted">ไม่มีรายการในช่วงที่เลือก</p>'}</section>`;x=`${g}<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">ปริมาณงานตามตัวชี้วัด</h2><p class="mt-1 text-xs text-muted">แสดงแต่ละหน่วยแยกกัน; ค่าคงเหลือเป็นค่าล่าสุด</p><div class="mt-3">${we(r,e)}</div></section>${H}${B}<a class="no-print inline-flex min-h-11 items-center font-bold text-primary underline" href="${p(e.id)}">ไปหน้ารายการ${d(e.short)}</a>`}else{const B=`<section><h2 class="mb-3 text-lg font-bold">ภาพรวม 4 กลุ่มงาน</h2><div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">${o.filter(C=>i.some(ye=>ye.group===C.id&&l(`${ye.id}.view`))).map(C=>`<div class="panel-shadow rounded-2xl border border-line bg-white p-5"><h3 class="text-sm font-semibold">${d(C.label)}</h3><strong class="mt-2 block text-2xl">${m(a.groups?.[C.id]||0)}</strong><span class="text-xs text-muted">รายการในช่วงที่เลือก</span></div>`).join("")}</div></section>`,M=i.filter(C=>l(`${C.id}.view`)).map(C=>`<article class="panel-shadow rounded-2xl border border-line bg-white p-5"><h3 class="font-bold">${d(C.short)}</h3><p class="mt-2 text-sm"><strong class="text-xl">${m(r[C.id]?.count||0)}</strong> รายการ</p><div class="mt-3">${we(r[C.id],C)||'<p class="text-sm text-muted">ไม่มีตัวชี้วัดปริมาณ</p>'}</div><a class="no-print mt-4 inline-flex min-h-11 items-center font-bold text-primary underline" href="${T(C.id)}">ดูรายงานหมวดนี้</a></article>`).join("");x=`${g}${B}<section><h2 class="mb-3 text-lg font-bold">รายงานครบ 9 หมวด</h2><div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">${M||'<p class="text-muted">ไม่มีหมวดที่ได้รับสิทธิ์ดู</p>'}</div></section>`}}return`<div class="report-page space-y-5"><div class="flex flex-wrap items-start justify-between gap-3"><div><p class="text-xs font-bold tracking-wider text-primary">รายงานงานบริการ</p><h1 class="mt-1 text-2xl font-bold sm:text-3xl">${d(S)}</h1><p class="mt-2 text-sm text-muted">ข้อมูลจริงจากวันที่ดำเนินงาน ตามสิทธิ์ของคุณ</p></div>${e?`<a class="no-print inline-flex min-h-11 items-center font-semibold text-primary underline" href="#/reports${k}">กลับภาพรวม</a>`:""}</div>${ze}${x}</div>`}const V=document.querySelector("#app");let Ht=null,Xe=!1,Qe="",Le=0,Pt={},Bt=null,zt=null,Je=!1,et="",qe=0,tt=0;async function Nt(e=null){const t=++Le,{params:r}=W(),a=()=>e?e.isCurrent():W().parts[0]==="dashboard";Xe=!0,Qe="",a()&&ht();try{const s=new URLSearchParams;r.get("from")&&s.set("from",r.get("from")),r.get("to")&&s.set("to",r.get("to"));const n=(window.serviceHubUrls?.apiDashboard||"/api/dashboard")+(s.size?`?${s}`:""),i=await I(n);if(t!==Le||!a())return;Ht=i.data}catch(s){if(t!==Le||!a())return;Qe=s.message||"ไม่สามารถโหลดภาพรวมได้"}finally{t===Le&&a()&&(Xe=!1,ht())}}function ht(){if(W().parts[0]!=="dashboard")return;const{params:e}=W(),t=hr({data:Ht,loading:Xe,error:Qe,params:e,groups:be,modules:Q,icon:f,esc:c,number:E,moduleHref:ne});V.innerHTML=Y(t,null,[{label:"แดชบอร์ดฝ่ายบริการ",current:!0}],!0),ie()}async function Ft(e,t,r=null){const a=e[1]?Q.find(o=>o.id===e[1]):null,s=++qe,n=W().hash,i=()=>r?r.isCurrent():W().hash===n;Je=!0,et="",i()&&await gt(e,t);try{const o=window.serviceHubUrls?.apiReportDetail||"/api/reports/__MODULE__",l=window.serviceHubUrls?.apiReports||"/api/reports",d=(a?o.replace("__MODULE__",encodeURIComponent(a.id)):l)+(t.size?`?${t}`:""),m=await I(d);if(s!==qe||!i())return;zt=m.meta,a?Bt=m.data:Pt=m.data}catch(o){if(s!==qe||!i())return;et=o.fields?.to?.[0]||o.fields?.from?.[0]||o.fields?.month?.[0]||o.message||"โหลดรายงานไม่สำเร็จ"}finally{s===qe&&i()&&(Je=!1,await gt(e,t))}}async function gt(e,t){if(W().parts[0]!=="reports"||W().parts[1]!==e[1])return;const r=e[1]?Q.find(n=>n.id===e[1]):null,a=Kr({module:r,params:t,data:r?Bt:Pt,meta:zt,loading:Je,error:et,modules:Q,groups:be,can:y,esc:c,number:E,thaiDate:z,moduleHref:ne}),s=r?[{label:"รายงาน",href:"#/reports"},{label:r.short,current:!0}]:[{label:"รายงาน",current:!0}];V.innerHTML=Y(a,"reports",s),ie()}const Yr={dashboard:async e=>{ae("dashboard"),await Nt(e)},users:async e=>{if(!Ie()){U("#/dashboard"),R("คุณไม่มีสิทธิ์เข้าถึงหน้านี้","error");return}ae("users"),V.innerHTML=Y(qr(),"users",[{label:"จัดการผู้ใช้งาน",current:!0}]),ie()},module:async e=>{const t=e.parts[1];if(t&&!y(`${t}.view`)){U("#/dashboard"),R("คุณไม่มีสิทธิ์เข้าถึงหมวดงานบริการนี้","error");return}ae(t);const r=Q.find(n=>n.id===t),a=r?[{label:r.short,current:!0}]:[];(document.querySelector("#filter-form")?.dataset.module!==t||e.parts.length>2)&&(V.innerHTML=Y('<section class="panel-shadow rounded-2xl border border-line bg-white p-6" role="status">กำลังโหลดข้อมูล...</section>',t,a));const s=await Mr(e);e.isCurrent()&&(V.innerHTML=Y(s,t,a),ie())},"cleaning-zones":async e=>{if(!y("cleaning-zones.view")){U("#/dashboard");return}ae("cleaning-zones");const t=await xt("cleaning-zones",e);e.isCurrent()&&(V.innerHTML=Y(t,"cleaning-zones",[{label:"เขตรักษาความสะอาด",current:!0}]),ie())},"waste-types":async e=>{if(!y("waste-types.view")){U("#/dashboard");return}ae("waste-types");const t=await xt("waste-types",e);e.isCurrent()&&(V.innerHTML=Y(t,"waste-types",[{label:"ประเภทขยะมูลฝอย",current:!0}]),ie())},profile:async e=>{ae("profile"),V.innerHTML=Y(Fr(),"profile",[{label:"โปรไฟล์ของฉัน",current:!0}])},"audit-logs":async e=>{if(!y("audit-logs.view")){U("#/dashboard");return}ae("audit-logs");const t=await Zr(e);e.isCurrent()&&(V.innerHTML=Y(t,"audit-logs",[{label:"ประวัติการแก้ไข",current:!0}]))},reports:async e=>{ae("reports"),await Ft(e.parts,e.params,e)},"*":()=>{U("#/dashboard")}};function Wr(){document.addEventListener("keydown",t=>{if(t.key==="Escape"&&(Fe(),Ne(!1)),t.key==="Tab"&&window.innerWidth<1024){const r=document.getElementById("sidebar");if(r&&r.classList.contains("translate-x-0")){const a=[...r.querySelectorAll("a[href], button:not([disabled])")].filter(s=>!s.closest("[hidden]"));a.length&&(t.shiftKey&&document.activeElement===a[0]?(t.preventDefault(),a[a.length-1]?.focus()):!t.shiftKey&&document.activeElement===a[a.length-1]&&(t.preventDefault(),a[0]?.focus()))}}}),document.addEventListener("click",async t=>{const r=t.target.closest("[data-action]");if(t.target.closest("#user-menu-container")||Fe(),t.target.closest(".relative")||document.querySelectorAll(".custom-select-menu").forEach(s=>s.classList.add("hidden")),!r)return;const a=r.dataset.action;if(a==="open-menu"){Ne(!0),document.querySelector('#sidebar [data-action="close-menu"]')?.focus();return}if(a==="close-menu"){Ne(!1),document.querySelector('[data-action="open-menu"]')?.focus();return}if(a==="toggle-user-menu"){lr();return}if(a==="close-user-menu"){Fe();return}if(a==="toggle-sidebar-group"||a==="toggle-sidebar-subgroup"){dr(r.dataset.group),r.setAttribute("aria-expanded",String(r.getAttribute("aria-expanded")!=="true"));const s=document.getElementById(r.getAttribute("aria-controls"));s&&(s.hidden=!s.hidden),r.querySelector("svg:last-child")?.classList.toggle("rotate-180");return}if(a==="delete-activity"){const s=r.dataset.module,n=r.dataset.id;await Cr(s,n,{navigate:U,showToast:R});return}if(a==="delete-reference"){const s=r.dataset.type,n=r.dataset.id,i=r.dataset.name,o=Number(r.dataset.usage)||0;await Br(s,n,i,o,{navigate:U,showToast:R,refreshData:Be});return}if(a==="print-report"){window.print();return}if(a==="retry-dashboard"){Nt();return}if(a==="retry-report"){const{parts:s,params:n}=W();Ft(s,n);return}if(a==="retry-route"){if(Date.now()<tt){R(`กรุณารออีก ${Math.ceil((tt-Date.now())/1e3)} วินาทีก่อนลองใหม่`,"error");return}U(W().hash);return}if(a==="toggle-mobile-filters"){const s=r.getAttribute("aria-expanded")==="true",n=document.getElementById(r.getAttribute("aria-controls"));r.setAttribute("aria-expanded",String(!s)),r.querySelector("svg")?.classList.toggle("rotate-180",!s),n?.classList.toggle("hidden",s),n?.classList.toggle("flex",!s);return}if(a==="set-date-preset"){const s=r.dataset.from,n=r.dataset.to,i=r.dataset.form,o=i?document.getElementById(i):r.closest("form");if(o){if(o.elements.period_mode){const l=o.querySelector('input[name="period_mode"][value="custom"]');l&&(l.checked=!0,l.dispatchEvent(new Event("change",{bubbles:!0})))}o.elements.from&&(o.elements.from.value=s),o.elements.to&&(o.elements.to.value=n),Ke(o),o.requestSubmit?o.requestSubmit():o.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0}))}return}}),document.addEventListener("submit",async t=>{if(t.target.id==="record-form"){t.preventDefault(),Dr(t.target);return}if(t.target.id==="zone-form"){t.preventDefault(),bt(t.target,"cleaning-zones");return}if(t.target.id==="wasteType-form"){t.preventDefault(),bt(t.target,"waste-types");return}if(t.target.id==="dashboard-filter"){t.preventDefault();const r=t.target,a=r.elements.from.value,s=r.elements.to.value,n=r.parentElement.querySelector("#dashboard-filter-error");if(!a&&!s){n&&n.classList.add("hidden"),U("/dashboard");return}if(!a||!s||a>s){n&&(n.textContent=!a||!s?"กรุณาระบุวันที่เริ่มต้นและสิ้นสุด":"วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น",n.classList.remove("hidden"));return}n&&n.classList.add("hidden"),U(`/dashboard?${new URLSearchParams({from:a,to:s})}`);return}if(t.target.id==="report-filter"){t.preventDefault();const r=t.target,a=r.elements.period_mode?.value,s=new URLSearchParams;if(a==="month"){if(!r.elements.month?.value)return;s.set("month",r.elements.month.value)}else{const i=r.elements.from?.value,o=r.elements.to?.value,l=r.querySelector("#report-filter-error");if(!i||!o||i>o){l&&(l.textContent=!i||!o?"กรุณาระบุวันที่เริ่มต้นและสิ้นสุด":"วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น");return}l&&(l.textContent=""),s.set("from",i),s.set("to",o)}const n=`#/reports${r.dataset.reportModule?`/${r.dataset.reportModule}`:""}?${s}`;U(n.replace("#",""));return}if(t.target.id==="filter-form"){t.preventDefault();const r=t.target,a=new URLSearchParams;new FormData(r).forEach((n,i)=>{const o=String(n).trim();o&&!(i==="sort"&&o==="newest")&&a.set(i,o)});const s=`#/module/${r.dataset.module}${a.size?`?${a}`:""}`;s!==W().hash&&U(s);return}if(t.target.id==="zone-filter"){t.preventDefault();const r=new FormData(t.target),a=new URLSearchParams;String(r.get("q")||"").trim()&&a.set("q",String(r.get("q")).trim()),r.get("status")&&r.get("status")!=="all"&&a.set("status",r.get("status")),r.get("sort")==="name"&&a.set("sort","name"),U(`/cleaning-zones${a.size?`?${a}`:""}`);return}if(t.target.id==="wasteType-filter"){t.preventDefault();const r=new FormData(t.target),a=new URLSearchParams;String(r.get("q")||"").trim()&&a.set("q",String(r.get("q")).trim()),U(`/waste-types${a.size?`?${a}`:""}`);return}if(t.target.id==="audit-filter"){t.preventDefault();const r=new FormData(t.target),a=new URLSearchParams;String(r.get("q")||"").trim()&&a.set("q",String(r.get("q")).trim()),r.get("action")&&r.get("action")!=="all"&&a.set("action",r.get("action")),r.get("from")&&a.set("from",r.get("from")),r.get("to")&&a.set("to",r.get("to")),U(`/audit-logs${a.size?`?${a}`:""}`);return}});const e=ir(t=>{t&&t.isConnected&&(t.requestSubmit?t.requestSubmit():t.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))},500);document.addEventListener("input",t=>{if(t.target.dataset.action==="live-filter"&&t.target.type!=="date"){const r=t.target.form;r&&e(r)}}),document.addEventListener("change",t=>{if(t.target.dataset.action==="live-filter"){const r=t.target.form;r&&(r.requestSubmit?r.requestSubmit():r.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}if(t.target.name==="period_mode"&&t.target.closest("#report-filter")){const r=t.target.form,a=t.target.value==="custom",s=r.querySelector("[data-report-month]"),n=r.querySelector("[data-report-custom]");s&&(s.hidden=a),n&&(n.hidden=!a),r.elements.month&&(r.elements.month.disabled=a),r.elements.from&&(r.elements.from.disabled=!a),r.elements.to&&(r.elements.to.disabled=!a),Ke(r)}})}function Gr(){$t(),pr(),ar(V),Wr(),Gt(Yr,{onDenied:e=>{if(!e.isCurrent())return;const t='<section class="panel-shadow mx-auto max-w-lg rounded-2xl border border-line bg-white p-6 text-center" role="alert"><h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึงหน้านี้</h1><p class="mt-2 text-sm text-muted">บัญชีนี้ยังไม่ได้รับสิทธิ์ดูข้อมูลในหมวดที่เลือก</p><a href="#/dashboard" class="mt-5 inline-flex min-h-11 items-center font-bold text-primary underline">กลับแดชบอร์ด</a></section>';V.innerHTML=Y(t,null,[{label:"ไม่มีสิทธิ์เข้าถึง",current:!0}])},onError:(e,t)=>{if(!t.isCurrent())return;const r=e.status===429,a=Number(e.retryAfterSeconds)||0;tt=r&&a>0?Date.now()+a*1e3:0;const s=r?"คำขอถี่เกินกำหนด":e.status===403?"ไม่มีสิทธิ์เข้าถึงข้อมูล":"โหลดหน้าไม่สำเร็จ",n=r?`กรุณารอ${a>0?` ${a} วินาที`:"สักครู่"}ก่อนลองใหม่`:e.status===403?"บัญชีนี้ยังไม่ได้รับสิทธิ์ดูข้อมูลในส่วนที่เลือก":"กรุณาลองใหม่อีกครั้ง หากยังพบปัญหาให้ติดต่อผู้ดูแลระบบ",i=`<section class="panel-shadow mx-auto max-w-lg rounded-2xl border border-red-200 bg-white p-6 text-center" role="alert"><h1 class="text-xl font-bold">${s}</h1><p class="mt-2 text-sm text-muted">${n}</p><button type="button" data-action="retry-route" class="mt-5 min-h-11 rounded-xl border border-line px-4 font-bold text-primary">ลองอีกครั้ง</button></section>`;V.innerHTML=Y(i,null,[{label:"โหลดหน้าไม่สำเร็จ",current:!0}])},afterRender:()=>{ie()}})}Gr();
