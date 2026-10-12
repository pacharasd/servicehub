const be=[{id:"cleaning",label:"งานบริการรักษาความสะอาด",short:"รักษาความสะอาด",icon:"sparkles",tone:"mint"},{id:"waste",label:"งานบริการมูลฝอย",short:"บริการมูลฝอย",icon:"recycle",tone:"sky"},{id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",short:"จัดการสิ่งปฏิกูล",icon:"droplet",tone:"amber"},{id:"projects",label:"งานพัฒนาระบบจัดการมูลฝอย",short:"พัฒนาระบบ",icon:"chart",tone:"violet"}],J={name:"service_date",label:"วันที่ดำเนินงาน",type:"date",required:!0},Q=[{id:"road-washings",group:"cleaning",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",short:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",icon:"road",titleField:"location",fields:[J,{name:"cleaning_zone_id",label:"เขตรักษาความสะอาด",type:"reference",reference:"cleaning-zones",required:!0},{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0}]},{id:"waterway-cleanings",group:"cleaning",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",short:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",icon:"waves",titleField:"waterway_name",fields:[{...J,label:"วันเริ่ม"},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"waterway_name",label:"ชื่อแหล่งน้ำ",type:"text",required:!0},{name:"distance_km",label:"ระยะทางปฏิบัติงาน",type:"number",unit:"เมตร",required:!0},{name:"quantity",label:"ปริมาณที่กำจัดได้",type:"number",unit:"ลูกบาศก์เมตร",required:!0}]},{id:"road-sweepings",group:"cleaning",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",short:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",icon:"sparkles",titleField:"road",fields:[J,{name:"road",label:"ถนน",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0}]},{id:"outsourced-cleanings",group:"cleaning",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",short:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",icon:"users",titleField:"location",fields:[J,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0},{name:"community",label:"ชุมชน",type:"text",required:!0}]},{id:"waste-collections",group:"waste",label:"งานบริหารจัดการมูลฝอย",short:"งานบริหารจัดการมูลฝอย",icon:"recycle",titleField:"source",fields:[{...J,label:"วันเริ่ม"},{name:"end_date",label:"วันที่สิ้นสุด",type:"date",required:!0},{name:"source",label:"แหล่งที่เก็บ",type:"text",required:!0},{name:"waste_type_id",label:"ประเภทขยะมูลฝอย",type:"reference",reference:"waste-types",required:!0},{name:"weight",label:"น้ำหนัก",type:"number",unit:"กิโลกรัม",required:!0},{name:"hazardous_waste_name",label:"ชื่อขยะอันตราย",type:"text",required:!1,wasteTypeCode:"WASTE-004"}]},{id:"drain-cleanings",group:"sanitation",label:"งานลอกท่อระบายน้ำ",short:"ลอกท่อระบายน้ำ",icon:"droplet",titleField:"location",fields:[J,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กิโลเมตร",required:!0},{name:"sediment_quantity",label:"ปริมาณตะกอน",type:"number",unit:"ลูกบาศก์เมตร",required:!0}]},{id:"septic-pumpings",group:"sanitation",label:"งานสูบสิ่งปฏิกูล",short:"สูบสิ่งปฏิกูล",icon:"truck",titleField:"location",fields:[J,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"volume",label:"ปริมาตรสิ่งปฏิกูล",type:"number",unit:"ลูกบาศก์เมตร",required:!0},{name:"fee_amount",label:"ค่าธรรมเนียม",type:"number",unit:"บาท",required:!0}]},{id:"septic-treatments",group:"sanitation",label:"การบำบัดสิ่งปฏิกูล",short:"บำบัดสิ่งปฏิกูล",icon:"flask",titleField:"service_date",fields:[J,{name:"sludge_quantity",label:"ปริมาณตะกอนสำหรับทำปุ๋ย",type:"number",unit:"กิโลกรัม",required:!0},{name:"fertilizer_remaining",label:"ปุ๋ยอินทรีย์สูตร 2 คงเหลือ",type:"number",unit:"กิโลกรัม",required:!0},{name:"microbial_note",label:"ข้อมูลการใส่น้ำจุลินทรีย์ชีวภาพ",type:"textarea",required:!0}]},{id:"waste-management-projects",group:"projects",label:"โครงการพัฒนาระบบจัดการมูลฝอย",short:"โครงการพัฒนา",icon:"chart",titleField:"project_name",fields:[J,{name:"project_name",label:"ชื่อโครงการ",type:"text",required:!0},{name:"communities_count",label:"จำนวนชุมชนที่เข้าร่วม",type:"integer",unit:"ชุมชน",required:!0},{name:"participants_count",label:"ผู้เข้าร่วมโครงการ",type:"integer",unit:"คน",required:!0}]}];class $e extends Error{constructor(t,a=0,r=null){super(t),this.name="ApiError",this.status=a,this.data=r,this.errors=r&&typeof r=="object"&&r.errors?r.errors:{}}get fieldErrors(){const t={};if(!this.errors||typeof this.errors!="object")return t;for(const[a,r]of Object.entries(this.errors))t[a]=Array.isArray(r)?r[0]||"":String(r||"");return t}get isValidationError(){return this.status===422}get isRateLimited(){return this.status===429}get isUnauthorized(){return this.status===401||this.status===419}get isForbidden(){return this.status===403}}function Wt(){return document.querySelector('meta[name="csrf-token"]')?.content||""}function Kt(){return window.serviceHubUrls?.login||"/login"}function $(e){const t=window.serviceHubUser;return t?(Array.isArray(t.roles)?t.roles:[]).includes("super-admin")?!0:(Array.isArray(t.permissions)?t.permissions:[]).includes(e):!1}const Yt=["super-admin","admin"];function Ie(){const e=window.serviceHubUser?.roles??[];return Array.isArray(e)&&e.some(t=>Yt.includes(t))}function qe(e){if(!Ie())return!1;if((window.serviceHubUser?.roles??[]).includes("super-admin"))return!0;const a=window.serviceHubUser?.permissions??[];return Array.isArray(a)&&a.includes(e)}function xe(e){return(window.serviceHubUrls?.apiActivities||"/api/activities/__MODULE__").replace("__MODULE__",encodeURIComponent(e))}function He(e){return(window.serviceHubUrls?.apiReferences||"/api/references/__TYPE__").replace("__TYPE__",encodeURIComponent(e))}async function I(e,t={}){const a=Wt(),r={Accept:"application/json","X-Requested-With":"XMLHttpRequest",...a?{"X-CSRF-TOKEN":a}:{},...t.headers||{}};let s=t.body;const n=typeof FormData<"u"&&s instanceof FormData,i=typeof Blob<"u"&&s instanceof Blob,o=typeof URLSearchParams<"u"&&s instanceof URLSearchParams;s&&typeof s=="object"&&!n&&!i&&!o&&(s=JSON.stringify(s),r["Content-Type"]||(r["Content-Type"]="application/json"));let l;try{l=await fetch(e,{credentials:"same-origin",...t,headers:r,body:s})}catch(m){throw m instanceof $e?m:new $e(m.message||"ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง",0)}if(l.status===401||l.status===419){const m=Kt();throw window.location.assign(m),new $e("เซสชันของคุณหมดอายุ กรุณาเข้าสู่ระบบใหม่",l.status)}const d=await l.json().catch(()=>({}));if(!l.ok){let m=d.message,u=0;if(l.status===429){const b=l.headers?.get?.("Retry-After"),h=Number(b);u=Number.isFinite(h)&&h>0?Math.ceil(h):Math.max(0,Math.ceil((Date.parse(b||"")-Date.now())/1e3)||0),m=u?`คำขอส่งมาถี่เกินไป กรุณารอ ${u} วินาทีแล้วลองใหม่อีกครั้ง`:"คำขอส่งมาถี่เกินไป กรุณารอสักครู่แล้วลองใหม่อีกครั้ง (Too Many Attempts)"}else l.status===403?m=m||"คุณไม่มีสิทธิ์ดำเนินการในส่วนนี้":l.status===422?m=m||"ข้อมูลที่ส่งไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง":m=m||`เกิดข้อผิดพลาด (${l.status})`;const p=new $e(m,l.status,d);throw p.fields=d.errors||{},p.retryAfterSeconds=u,p}return d}async function yt(e,t={}){let a=1;const r=[];for(;;){const s=e.includes("?")?"&":"?",n=`${e}${s}per_page=100&page=${a}`,i=await I(n,t);Array.isArray(i.data)&&r.push(...i.data);const o=i.meta?.last_page||1;if(a>=o)break;a++}return r}const $t=" — เทศบาลนครนนทบุรี",Ze="/dashboard";function Te(e=window.location.hash){let t=e||"";if(t.startsWith("#")&&(t=t.slice(1)),t.startsWith("figmacapture="))return{hash:"#/dashboard",path:"/dashboard",parts:["dashboard"],params:new URLSearchParams,query:{}};const[a,r=""]=(t||Ze).split("?"),s=a.startsWith("/")?a:`/${a}`,n=s.split("/").filter(Boolean),i=new URLSearchParams(r),o=Object.fromEntries(i.entries());return{hash:`#${s}${r?`?${r}`:""}`,path:s,parts:n.length?n:["dashboard"],params:i,query:o}}function Y(){return Te()}function ot(e,t=$t){const a=(e||"แดชบอร์ดฝ่ายบริการ").trim();a.endsWith(t.trim())?document.title=a:document.title=`${a}${t}`}function Gt(e){const[t,a]=e.parts;return t==="dashboard"||!e.parts.length?"แดชบอร์ดฝ่ายบริการ":t==="login"?"เข้าสู่ระบบ":t==="users"?"จัดการผู้ใช้งาน":t==="profile"?"โปรไฟล์ส่วนบุคคล":t==="audit-logs"?"ประวัติการแก้ไข":t==="cleaning-zones"?"เขตรักษาความสะอาด":t==="waste-types"?"ประเภทขยะมูลฝอย":t==="reports"?Q.find(s=>s.id===a)?.short||"รายงาน":t==="module"?Q.find(s=>s.id===a)?.short||"งานบริการ":"แดชบอร์ดฝ่ายบริการ"}class Xt{constructor(t={},a={}){let r={};t&&typeof t=="object"&&!t.defaultRoute&&!t.routes?r={routes:t,...a}:r=t||{},this.routes={},this.options={defaultRoute:Ze,titleSuffix:$t,...r},this.current=Te(),this.beforeHooks=[],this.afterHooks=[],this.notFoundHandler=null,this.navigationSequence=0,this.options.routes&&this.registerRoutes(this.options.routes)}registerRoutes(t){for(const[a,r]of Object.entries(t))typeof r=="function"?this.routes[a]={handler:r}:this.routes[a]=r}setNotFound(t){this.notFoundHandler=t}beforeEach(t){this.beforeHooks.push(t)}afterEach(t){this.afterHooks.push(t)}navigate(t,a={}){let r=t||Ze;r.startsWith("#")&&(r=r.slice(1)),r.startsWith("/")||(r=`/${r}`);const s=`#${r}`;window.location.hash===s?this.resolve():a.replace?window.location.replace(s):window.location.hash=s,a.noScroll||window.scrollTo({top:0,behavior:"smooth"})}async checkGuards(t,a){if(t.parts[0]==="login"){const s=window.serviceHubUrls?.login||"/login";return window.location.replace(s),!1}for(const s of this.beforeHooks){const n=await s(t);if(n===!1)return!1;if(typeof n=="string")return n}if(a?.guard){const s=await a.guard(t);if(s===!1)return!1;if(typeof s=="string")return s}const r=t.parts[0];if(r==="users"&&!Ie()||r==="audit-logs"&&!$("audit-logs.view")||r==="cleaning-zones"&&!$("cleaning-zones.view")||r==="waste-types"&&!$("waste-types.view"))return!1;if(r==="module"&&t.parts[1]){const s=t.parts[1];if(!$(`${s}.view`))return!1}return!0}async resolve(){const t=++this.navigationSequence,a=Te();a.isCurrent=()=>t===this.navigationSequence&&Te().hash===a.hash,this.current=a;const r=a.parts[0]||"dashboard",s=this.routes[r]||this.routes["*"],n=await this.checkGuards(a,s);if(!a.isCurrent())return;if(n===!1){typeof this.options.onDenied=="function"?await this.options.onDenied(a):this.notFoundHandler&&await this.notFoundHandler(a),ot("ไม่พบหน้าหรือไม่มีสิทธิ์เข้าถึง",this.options.titleSuffix);return}if(typeof n=="string"){this.navigate(n);return}let i="";s?.title?i=typeof s.title=="function"?s.title(a):s.title:i=Gt(a),ot(i,this.options.titleSuffix);try{s?.handler?await s.handler(a):this.notFoundHandler&&await this.notFoundHandler(a)}catch(o){if(!a.isCurrent())return;if(typeof this.options.onError=="function")await this.options.onError(o,a);else throw o;return}if(a.isCurrent()){for(const o of this.afterHooks)o(a);typeof this.options.afterRender=="function"&&this.options.afterRender(a)}}init(){window.addEventListener("hashchange",()=>this.resolve()),this.resolve()}}let pe=null;function Qt(e={},t={}){return pe=new Xt(e,t),pe.init(),pe}function U(e,t={}){pe?pe.navigate(e,t):(window.location.hash=e.startsWith("#")?e:`#${e}`,window.scrollTo({top:0,behavior:"smooth"}))}const c=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),_=(e,t={})=>new Intl.NumberFormat("th-TH",{maximumFractionDigits:2,...t}).format(Number(e)||0);function B(e){if(!e)return"—";const t=String(e).slice(0,10);return new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Bangkok"}).format(new Date(`${t}T12:00:00+07:00`))}const Jt={"super-admin":"ผู้ดูแลระบบสูงสุด",admin:"ผู้ดูแลระบบ",staff:"เจ้าหน้าที่",viewer:"ผู้ดูข้อมูล",auditor:"ผู้ตรวจสอบระบบ"},ea={"super-admin":"border-red-200 bg-red-50 text-red-700",admin:"border-amber-200 bg-amber-50 text-amber-700",staff:"border-teal-200 bg-teal-50 text-teal-800",viewer:"border-gray-200 bg-gray-50 text-gray-700",auditor:"border-blue-200 bg-blue-50 text-blue-700"};function kt(e){const t=String(e||"").trim().split(/\s+/);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():String(e||"?")[0].toUpperCase()}const ne=e=>`#/module/${e}`,lt={grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',sparkles:'<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 17 .7 1.3L21 19l-1.3.7L19 21l-.7-1.3L17 19l1.3-.7L19 17ZM4 17l.5 1L6 18.5 4.5 19 4 20l-.5-1L2 18.5l1.5-.5L4 17Z"/>',recycle:'<path d="m7 19-2-3.4a2 2 0 0 1 0-2l1-1.7M9 5h5.2a2 2 0 0 1 1.7 1l1.4 2.4M19 11l2 3.5a2 2 0 0 1 0 2l-1.4 2.4a2 2 0 0 1-1.7 1H13"/><path d="m4 12 2.8-.8L7.5 14M17 7.5l.5 3 2.8-.9M11 21l2-2-2-2"/>',droplet:'<path d="M12 22a8 8 0 0 0 8-8c0-4.4-8-12-8-12S4 9.6 4 14a8 8 0 0 0 8 8Z"/>',chart:'<path d="M3 3v18h18"/><path d="m7 16 4-5 3 2 5-7"/>',road:'<path d="M7 3 4 21M17 3l3 18M12 3v3m0 4v4m0 4v3"/>',waves:'<path d="M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',truck:'<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',flask:'<path d="M9 3h6M10 3v7l-5.5 9a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 10V3M8 16h8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',plus:'<path d="M12 5v14M5 12h14"/>',arrow:'<path d="m5 12 14 0m-6-6 6 6-6 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="M18 6 6 18M6 6l12 12"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',ellipsis:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L10 16l-4 1 1-4 9.5-9.5Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',empty:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 10h8M8 14h5"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',login:'<path d="M10 17l5-5-5-5M15 12H3M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',lock:'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',eyeOff:'<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>'};function f(e,t=20,a="",r={}){const s=lt[e];s||typeof process>"u"&&console.warn(`[icons] ไม่พบ icon ชื่อ "${e}" — ใช้ "grid" แทน`);const n=s||lt.grid,o=!!(r["aria-label"]||r.title||r.role==="img")?'role="img"':'aria-hidden="true"',l=Object.entries(r).filter(([d])=>d!=="aria-hidden"&&d!=="role").map(([d,m])=>`${d}="${c(m)}"`).join(" ");return`<svg class="${a}" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${o} ${l}>${n}</svg>`}function Z(e,t,a,r=""){return`<div class="mb-5 flex min-w-0 max-w-full flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end">
    <div class="min-w-0 max-w-full flex-1">
      <p class="mb-1 text-xs font-bold tracking-[.13em] text-primary sm:mb-1.5">${c(e)}</p>
      <h1 class="break-words text-[22px] sm:text-[32px] font-bold leading-tight tracking-tight text-ink">${c(t)}</h1>
      <p class="mt-1.5 break-words text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">${c(a)}</p>
    </div>
    ${r?`<div class="w-full shrink-0 sm:w-auto">${r}</div>`:""}
  </div>`}const he=(e,t,a="plus")=>`<a href="${t}" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${f(a,18)}${c(e)}</a>`,le=(e,t,a="arrow")=>`<a href="${t}" class="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f8fbf8]">${c(e)}${f(a,17)}</a>`;let dt=null,X=null;function St(){return X&&document.body.contains(X)||(X=document.getElementById("toast-container"),X||(X=document.createElement("div"),X.id="toast-container",X.className="fixed inset-x-4 bottom-4 z-[70] flex flex-col gap-2 sm:inset-x-auto sm:bottom-5 sm:right-5 pointer-events-none",document.body.appendChild(X))),X}function R(e,t="success"){const a=St();a.innerHTML="",clearTimeout(dt);const r=t==="error",s=r?"border-red-200 bg-white text-red-700":"border-[#c6e9d8] bg-white text-primary-dark",n=r?"info":"check",i=document.createElement("div");i.role="status",i.setAttribute("aria-live","polite"),i.className=`app-toast pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold shadow-xl transition-all duration-200 ${s}`,i.innerHTML=`
    ${f(n,19,"shrink-0")}
    <span class="flex-1">${c(e)}</span>
    <button type="button" class="ml-2 rounded-lg p-1 text-muted hover:bg-canvas transition" aria-label="ปิดข้อความ">
      ${f("close",17)}
    </button>
  `,i.querySelector("button")?.addEventListener("click",()=>{i.remove()}),a.appendChild(i),dt=setTimeout(()=>{i.remove()},4200)}function ie(){document.querySelectorAll("select.field:not(.custom-select-applied):not(.master-native-select)").forEach(e=>{e.classList.add("custom-select-applied"),e.style.display="none";const t=document.createElement("div");t.className="relative w-full";const a=document.createElement("button");a.type="button",a.className=e.className.replace("custom-select-applied","").replace("hidden","")+" flex items-center justify-between text-left";const r=()=>'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';a.innerHTML=`<span class="truncate">${e.options[e.selectedIndex]?.text||""}</span>${r()}`,e.getAttribute("aria-invalid")==="true"&&a.setAttribute("aria-invalid","true");const s=document.createElement("div");s.className="absolute left-0 top-[calc(100%+6px)] z-20 hidden w-full overflow-y-auto max-h-60 rounded-xl border border-line bg-white shadow-xl custom-select-menu py-1";const n=()=>{a.innerHTML=`<span class="truncate">${e.options[e.selectedIndex]?.text||""}</span>${r()}`},i=Array.from(e.options).filter(o=>!o.disabled);i.forEach(o=>{const l=document.createElement("div");l.className=`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${o.selected?"bg-[#f0f8f2] font-bold text-primary":""}`,l.textContent=o.text,l.onclick=()=>{e.value=o.value,e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})),s.classList.add("hidden"),n(),Array.from(s.children).forEach((d,m)=>{d.className=`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${i[m].selected?"bg-[#f0f8f2] font-bold text-primary":""}`})},s.appendChild(l)}),a.onclick=o=>{o.preventDefault();const l=!s.classList.contains("hidden");document.querySelectorAll(".custom-select-menu").forEach(d=>d.classList.add("hidden")),l||s.classList.remove("hidden")},e.parentNode.insertBefore(t,e),t.appendChild(a),t.appendChild(s),t.appendChild(e)})}const ke=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],ta=["อา.","จ.","อ.","พ.","พฤ.","ศ.","ส."],F=e=>String(e).padStart(2,"0"),_t=e=>`${String(e.getUTCFullYear()).padStart(4,"0")}-${F(e.getUTCMonth()+1)}-${F(e.getUTCDate())}`,oe=(e,t,a)=>{const r=new Date(0);return r.setUTCFullYear(e,t-1,a),r.setUTCHours(0,0,0,0),r};function at(e,t="date"){const a=String(e).match(t==="month"?/^(\d{4})-(\d{2})$/:/^(\d{4})-(\d{2})-(\d{2})$/);if(!a)return!1;const[,r,s,n="1"]=a,i=oe(+r,+s,+n);return+r>=1&&+r<=9999&&i.getUTCFullYear()===+r&&i.getUTCMonth()+1===+s&&i.getUTCDate()===+n}function Et(e,t="date"){if(!String(e).trim())return"";const a=String(e).trim().match(t==="month"?/^(\d{1,2})\/(\d{4,5})$/:/^(\d{1,2})\/(\d{1,2})\/(\d{4,5})$/);if(!a)return null;const r=a.slice(1).map(Number),s=r.at(-1)-543,n=t==="month"?r[0]:r[1],i=`${String(s).padStart(4,"0")}-${F(n)}${t==="month"?"":`-${F(r[0])}`}`;return at(i,t)?i:null}function aa(e,t="date"){if(!at(e,t))return"";const[a,r,s]=e.split("-").map(Number);return`${t==="month"?"":`${F(s)}/`}${F(r)}/${a+543}`}function ue(){const e=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Bangkok",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date);return["year","month","day"].map(t=>e.find(a=>a.type===t).value).join("-")}function ra(e,t,a=!1){const[r,s,n]=e.split("-").map(Number),i=oe(r,s,n),o={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7,Home:-i.getUTCDay(),End:6-i.getUTCDay()};if(t in o)i.setUTCDate(n+o[t]);else if(t==="PageUp"||t==="PageDown"){const l=(t==="PageUp"?-1:1)*(a?12:1);i.setUTCDate(1),i.setUTCMonth(i.getUTCMonth()+l);const d=oe(i.getUTCFullYear(),i.getUTCMonth()+2,0).getUTCDate();i.setUTCDate(Math.min(n,d))}return _t(i)}const fe=new WeakMap;let q=null,ct=!1,sa=0;function rt(e){const{canonical:t,text:a,button:r}=e;a.value=aa(t.value,e.mode),a.disabled=r.disabled=t.disabled,e.committed=t.value,a.setCustomValidity(!t.value&&a.required?"กรุณาระบุวันที่ พ.ศ.":""),a.removeAttribute("aria-invalid")}function We(e=document){e.querySelectorAll("[data-thai-canonical]").forEach(t=>rt(fe.get(t)))}function je(e,t,a=!0){const r=e.committed!==t;e.canonical.value=t,rt(e),r&&a&&e.canonical.dispatchEvent(new Event("change",{bubbles:!0}))}function Lt(e,t){const a=Et(e.text.value,e.mode);let r=a===null?`กรุณากรอก${e.mode==="month"?"เดือน/ปี":"วัน/เดือน/ปี"} พ.ศ. ที่ถูกต้อง`:"";return a===""&&e.text.required&&(r="กรุณาระบุวันที่ พ.ศ."),a&&(e.min&&a<e.min||e.max&&a>e.max)&&(r="วันที่อยู่นอกช่วงที่กำหนด"),e.text.setCustomValidity(r),r?(e.canonical.value="",e.text.setAttribute("aria-invalid","true"),!1):(je(e,a,t),!0)}function se(e=!0){if(!q)return;const{dialog:t,binding:a}=q;q=null,t.remove(),a.button.setAttribute("aria-expanded","false"),e&&a.text.isConnected&&a.text.focus()}function Se(e=null){const t=q,{binding:a,dialog:r,year:s,month:n}=t,i=a.canonical.value,o=ue(),l=`พ.ศ. ${s+543}`,d=u=>a.min&&u<a.min||a.max&&u>a.max;let m;if(a.mode==="month")m=`<div class="grid grid-cols-3 gap-1">${ke.map((u,p)=>{const b=`${String(s).padStart(4,"0")}-${F(p+1)}`;return`<button type="button" data-value="${b}" class="rounded-lg border border-line px-1 py-3 text-xs ${i===b?"bg-primary text-white":""}" ${d(b)?"disabled":""} aria-label="${u} ${l}">${u}</button>`}).join("")}</div>`;else{const u=oe(s,n,1),p=oe(s,n+1,0).getUTCDate(),b=Array.from({length:p},(j,E)=>`${String(s).padStart(4,"0")}-${F(n)}-${F(E+1)}`).filter(j=>!d(j)),h=e||t.focusDate,w=b.includes(h)?h:b[0],k=Array.from({length:Math.ceil((u.getUTCDay()+p)/7)*7},(j,E)=>{const A=E-u.getUTCDay()+1;if(A<1||A>p)return"<td></td>";const y=`${String(s).padStart(4,"0")}-${F(n)}-${F(A)}`,ae=y===i,v=new Intl.DateTimeFormat("th-TH-u-ca-buddhist",{dateStyle:"full",timeZone:"UTC"}).format(oe(s,n,A));return`<td role="gridcell" aria-selected="${ae}"><button type="button" data-value="${y}" tabindex="${y===w?0:-1}" aria-label="${c(v)}" ${y===o?'aria-current="date"':""} ${d(y)?"disabled":""} class="h-9 w-full rounded-lg text-sm ${ae?"bg-primary text-white":y===o?"border border-primary":"hover:bg-canvas"}">${A}</button></td>`}),S=Array.from({length:k.length/7},(j,E)=>`<tr>${k.slice(E*7,E*7+7).join("")}</tr>`).join("");m=`<table role="grid" aria-label="${ke[n-1]} ${l}" class="w-full table-fixed"><thead><tr>${ta.map(j=>`<th scope="col" class="py-2 text-xs text-muted">${j}</th>`).join("")}</tr></thead><tbody>${S}</tbody></table>`}r.innerHTML=`<div class="flex items-center justify-between gap-2"><h2 id="thai-calendar-title" class="font-bold" aria-live="polite">${a.mode==="month"?"เลือกเดือน":ke[n-1]} ${l}</h2><button type="button" data-calendar="close" class="min-h-11 px-2 text-sm text-primary">ปิด</button></div>
    <div class="my-2 flex items-center gap-2"><button type="button" data-calendar="previous" aria-label="${a.mode==="month"?"ปีก่อนหน้า":"เดือนก่อนหน้า"}" class="min-h-11 px-2">‹</button>${a.mode==="date"?`<label class="min-w-0 flex-1"><span class="sr-only">เดือน</span><select data-calendar="month" class="field text-sm">${ke.map((u,p)=>`<option value="${p+1}" ${n===p+1?"selected":""}>${u}</option>`).join("")}</select></label>`:""}<label class="min-w-0 flex-1"><span class="sr-only">ปี พ.ศ.</span><input data-calendar="year" type="number" class="field text-sm" min="544" max="10542" value="${s+543}"></label><button type="button" data-calendar="next" aria-label="${a.mode==="month"?"ปีถัดไป":"เดือนถัดไป"}" class="min-h-11 px-2">›</button></div>${m}<p class="mt-2 text-xs text-muted">ใช้ลูกศรเลือกวัน Enter เพื่อยืนยัน และ Escape เพื่อปิด</p><div class="mt-3 flex justify-between gap-2"><button type="button" data-calendar="clear" class="min-h-11 px-3 text-primary">ล้างค่า</button><button type="button" data-calendar="today" class="min-h-11 px-3 text-primary">${a.mode==="month"?"เดือนนี้":"วันนี้"}</button></div>`,e&&r.querySelector(`[data-value="${e}"]`)?.focus()}function mt(e){se(!1);let t=e.canonical.value||(e.mode==="month"?ue().slice(0,7):ue());e.min&&t<e.min&&(t=e.min),e.max&&t>e.max&&(t=e.max);const[a,r,s=1]=t.split("-").map(Number),n=document.createElement("dialog");n.id="thai-calendar",n.className="thai-calendar rounded-2xl border border-line bg-white p-3 text-ink shadow-xl",n.setAttribute("aria-labelledby","thai-calendar-title"),document.body.append(n),q={binding:e,dialog:n,year:a,month:r,focusDate:`${String(a).padStart(4,"0")}-${F(r)}-${F(s)}`},e.button.setAttribute("aria-expanded","true"),Se(),n.addEventListener("cancel",i=>{i.preventDefault(),se()}),n.addEventListener("click",i=>{const o=i.target.closest("button");if(!o||!q)return;if(o.dataset.value){je(e,o.dataset.value),se();return}const l=o.dataset.calendar;if(l==="close")se();else if(l==="clear")je(e,""),se();else if(l==="today"){const d=e.mode==="month"?ue().slice(0,7):ue();e.min&&d<e.min||e.max&&d>e.max||(je(e,d),se())}else if(l==="previous"||l==="next"){const d=oe(q.year,q.month,1);if(d.setUTCMonth(d.getUTCMonth()+(l==="previous"?-1:1)*(e.mode==="month"?12:1)),d.getUTCFullYear()<1||d.getUTCFullYear()>9999)return;q.year=d.getUTCFullYear(),q.month=d.getUTCMonth()+1,q.focusDate=_t(d),Se(),n.querySelector(`[data-calendar="${l}"]`)?.focus()}}),n.addEventListener("change",i=>{const o=i.target.dataset.calendar;if(o==="month")q.month=Number(i.target.value);else if(o==="year"){const l=Number(i.target.value)-543;if(!Number.isInteger(l)||l<1||l>9999){i.target.value=q.year+543;return}q.year=l}else return;q.focusDate=`${String(q.year).padStart(4,"0")}-${F(q.month)}-01`,Se(),n.querySelector(`[data-calendar="${o}"]`)?.focus()}),n.addEventListener("keydown",i=>{if(i.key==="Escape"){i.preventDefault(),se();return}if(i.key==="Tab"){const m=[...n.querySelectorAll('button:not([disabled]):not([tabindex="-1"]), input, select')],u=m[0],p=m.at(-1);i.shiftKey&&document.activeElement===u?(i.preventDefault(),p.focus()):!i.shiftKey&&document.activeElement===p&&(i.preventDefault(),u.focus())}if(e.mode!=="date"||!i.target.dataset.value||!["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown"].includes(i.key))return;i.preventDefault();const o=ra(i.target.dataset.value,i.key,i.shiftKey);if(!at(o)||e.min&&o<e.min||e.max&&o>e.max)return;const[l,d]=o.split("-").map(Number);q.year=l,q.month=d,q.focusDate=o,Se(o)}),n.showModal(),(n.querySelector('[data-value][tabindex="0"]:not([disabled])')||n.querySelector('[data-calendar="close"]')).focus()}function ut(e=document){e.querySelectorAll('input[type="date"], input[type="month"]').forEach(t=>{const a=t.type,r=document.createElement("input"),s=t.id,n=s===t.name&&s?`${s}-display`:s||`thai-date-${++sa}`;if(n!==s&&s)for(const m of t.labels||[])m.htmlFor===s&&(m.htmlFor=n);r.type="text",r.id=n,r.className=t.className,r.inputMode="numeric",r.autocomplete="off",r.required=t.required,r.placeholder=a==="month"?"เดือน/ปี พ.ศ.":"วัน/เดือน/ปี พ.ศ.",r.setAttribute("aria-describedby",`${t.getAttribute("aria-describedby")||""} ${n}-format`.trim()),t.hasAttribute("aria-invalid")&&r.setAttribute("aria-invalid",t.getAttribute("aria-invalid")),r.setAttribute("data-thai-display","");const i=document.createElement("span");i.className="thai-date-field";const o=document.createElement("button");o.type="button",o.className="thai-date-open",o.textContent="▦",o.setAttribute("aria-label",a==="month"?"เปิดตัวเลือกเดือนภาษาไทย":"เปิดปฏิทินภาษาไทย"),o.setAttribute("aria-haspopup","dialog"),o.setAttribute("aria-expanded","false"),o.setAttribute("aria-controls","thai-calendar");const l=document.createElement("span");l.id=`${n}-format`,l.className="sr-only",l.textContent=a==="month"?"กรอกเดือน/ปี พ.ศ. เช่น 10/2569":"กรอกวัน/เดือน/ปี พ.ศ. เช่น 09/10/2569",t.before(i),i.append(t,r,o,l),t.type="hidden",t.id=`${n}-iso`,t.required=!1,t.dataset.thaiCanonical=a;const d={canonical:t,text:r,button:o,mode:a,min:t.min,max:t.max,initialValue:t.value};fe.set(t,d),rt(d),t.getAttribute("aria-invalid")==="true"&&r.setAttribute("aria-invalid","true"),r.addEventListener("input",()=>{const m=Et(r.value,a);r.setCustomValidity(m===null?"กรุณากรอกวันที่ พ.ศ. ให้ครบและถูกต้อง":m===""&&r.required?"กรุณาระบุวันที่ พ.ศ.":""),m===null&&(t.value="")}),r.addEventListener("change",()=>Lt(d,!0)),r.addEventListener("keydown",m=>{m.key==="ArrowDown"&&m.altKey&&(m.preventDefault(),mt(d))}),o.addEventListener("click",()=>mt(d))})}function na(e){ct||(ct=!0,ut(e),new MutationObserver(()=>{q&&!q.binding.text.isConnected&&se(!1),ut(e),e.querySelectorAll("[data-thai-canonical]").forEach(t=>{const a=fe.get(t);a.text.disabled!==t.disabled&&(a.text.disabled=t.disabled),a.button.disabled!==t.disabled&&(a.button.disabled=t.disabled)})}).observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["disabled"]}),document.addEventListener("submit",t=>{const r=[...t.target.querySelectorAll("[data-thai-canonical]")].filter(s=>!s.disabled);for(const s of r){const n=fe.get(s);if(!Lt(n,!1)||!n.text.checkValidity()){t.preventDefault(),t.stopImmediatePropagation(),n.text.reportValidity(),n.text.focus();return}}},!0),document.addEventListener("reset",t=>setTimeout(()=>{t.target.querySelectorAll("[data-thai-canonical]").forEach(a=>{a.value=fe.get(a).initialValue}),We(t.target)},0)))}function _e(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${r}`}function ia(e){const t=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Bangkok",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),a=n=>Number(t.find(i=>i.type===n).value),r=new Date(a("year"),a("month")-1,a("day")),s=_e(r);switch(e){case"all":return{from:"",to:""};case"today":return{from:s,to:s};case"7d":{const n=new Date(r);return n.setDate(n.getDate()-6),{from:_e(n),to:s}}case"month":{const n=new Date(r.getFullYear(),r.getMonth(),1);return{from:_e(n),to:s}}case"30d":{const n=new Date(r);return n.setDate(n.getDate()-29),{from:_e(n),to:s}}default:return{from:s,to:s}}}const oa=[{id:"all",label:"ทั้งหมด"},{id:"today",label:"วันนี้"},{id:"7d",label:"7 วันล่าสุด"},{id:"month",label:"เดือนนี้"},{id:"30d",label:"30 วันล่าสุด"}];function Pe({from:e="",to:t="",formId:a="",cls:r=""}={}){return`
    <div class="flex flex-wrap items-center gap-1.5 ${r}" role="group" aria-label="ช่วงเวลาด่วน">
      <span class="text-xs font-semibold text-muted mr-1">ช่วงด่วน:</span>
      ${oa.map(s=>{const n=ia(s.id),i=s.id==="all"?!e&&!t:!!e&&e===n.from&&t===n.to;return`
          <button
            type="button"
            data-action="set-date-preset"
            data-preset="${s.id}"
            data-from="${n.from}"
            data-to="${n.to}"
            ${a?`data-form="${c(a)}"`:""}
            class="min-h-8 inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold transition ${i?"bg-primary text-white shadow-xs":"border border-line bg-white text-muted hover:border-primary/40 hover:text-ink"}"
            aria-pressed="${i}"
          >
            ${c(s.label)}
          </button>
        `}).join("")}
    </div>
  `}function la(e,t=300){let a=null;return function(...r){clearTimeout(a),a=setTimeout(()=>{e.apply(this,r)},t)}}const da=""+new URL("nonthaburi-logo-BUg5neRh.png",import.meta.url).href,qt="#/cleaning-zones",Tt="#/waste-types",jt=[{type:"group",id:"cleaning",label:"งานบริการรักษาความสะอาด",icon:"sparkles",children:[{module:"road-washings",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",children:[{module:"cleaning-zones",href:qt,label:"เขตรักษาความสะอาด"}]},{module:"waterway-cleanings",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ"},{module:"road-sweepings",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ"},{module:"outsourced-cleanings",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม"}]},{type:"link",module:"waste-collections",label:"งานบริหารจัดการมูลฝอย",icon:"recycle",children:[{module:"waste-types",href:Tt,label:"ประเภทขยะมูลฝอย"}]},{type:"group",id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",icon:"droplet",children:[{module:"drain-cleanings",label:"งานลอกท่อระบายน้ำ"},{module:"septic-pumpings",label:"งานสูบสิ่งปฏิกูล"},{module:"septic-treatments",label:"การบำบัดสิ่งปฏิกูล"}]},{type:"link",module:"waste-management-projects",label:"โครงการต่าง ๆ",icon:"chart"}];let T=!1,O=!1;const te=new Set;function Ne(e){T=typeof e=="boolean"?e:!T,Ut()}function Fe(){O=!1;const e=document.getElementById("user-menu-dropdown"),t=document.getElementById("user-menu-button");e&&(e.classList.add("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.remove("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!0),t&&(t.setAttribute("aria-expanded","false"),t.classList.remove("border-primary","bg-[#f0f8f2]"),t.querySelector("svg:last-child")?.classList.remove("rotate-180"))}function ca(){O=!O;const e=document.getElementById("user-menu-dropdown"),t=document.getElementById("user-menu-button");e&&(O?(e.classList.remove("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.add("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!1,e.querySelector("a, button")?.focus()):(e.classList.add("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.remove("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!0,t?.focus())),t&&(t.setAttribute("aria-expanded",String(O)),t.classList.toggle("border-primary",O),t.classList.toggle("bg-[#f0f8f2]",O),t.querySelector("svg:last-child")?.classList.toggle("rotate-180",O))}function re(e){const t=jt.find(a=>a.type==="group"&&a.children.some(r=>r.module===e||r.children?.some(s=>s.module===e)));if((e==="waste-collections"||e==="waste-types")&&te.add("waste-collections"),t){te.add(t.id);const a=t.children.find(r=>r.children?.some(s=>s.module===e)||r.module===e&&r.children);a&&te.add(a.module)}}function ma(e){te.has(e)?te.delete(e):te.add(e)}function Ut(){const e=window.innerWidth<1024;document.body.style.overflow=e&&T?"hidden":"";const t=document.getElementById("sidebar"),a=document.getElementById("mobile-backdrop");a&&(a.classList.toggle("opacity-100",e&&T),a.classList.toggle("pointer-events-auto",e&&T),a.classList.toggle("visible",e&&T),a.classList.toggle("opacity-0",!e||!T),a.classList.toggle("pointer-events-none",!e||!T),a.classList.toggle("invisible",!e||!T)),t&&(t.inert=e&&!T,t.setAttribute("aria-hidden",String(!T&&e)),e?(t.classList.toggle("-translate-x-full",!T),t.classList.toggle("translate-x-0",T),t.classList.toggle("invisible",!T),t.classList.toggle("pointer-events-none",!T),t.classList.toggle("visible",T),t.classList.toggle("pointer-events-auto",T)):(t.classList.remove("-translate-x-full","invisible","pointer-events-none"),t.classList.add("translate-x-0","visible","pointer-events-auto")));const r=document.querySelector('[data-action="open-menu"]');r&&r.setAttribute("aria-expanded",String(T))}function ua(e,t){if(e.type==="link"){if(!$(`${e.module}.view`))return"";const n=t===e.module;if(!e.children)return`<a href="${ne(e.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${n?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${n?'aria-current="page"':""}>${f(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a>`;const i=e.children.filter(d=>$(`${d.module}.view`));if(!i.length)return`<a href="${ne(e.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${n?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${n?'aria-current="page"':""}>${f(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a>`;const o=i.some(d=>d.module===t),l=te.has(e.module);return`<div class="mb-1 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${n?"nav-active":o?"bg-[#f4f9f5] text-primary-dark":"text-[#657772]"}"><a href="${ne(e.module)}" class="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-l-xl px-3 py-2.5 text-sm font-semibold leading-5 hover:bg-[#f4f7f4] hover:text-ink" ${n?'aria-current="page"':""}>${f(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${e.module}" aria-expanded="${l}" aria-controls="sidebar-subgroup-${e.module}" aria-label="${l?"ปิด":"เปิด"}เมนูย่อยของ${c(e.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${f("chevronDown",16,`transition-transform ${l?"rotate-180":""}`)}</button></div><div id="sidebar-subgroup-${e.module}" class="ml-5 border-l border-[#dbe9df] pl-3" ${l?"":"hidden"}>${i.map(d=>{const m=t===d.module;return`<a href="${d.href||ne(d.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${m?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${m?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(d.label)}</span></a>`}).join("")}</div></div>`}const a=e.children.filter(n=>$(`${n.module}.view`));if(!a.length)return"";const r=te.has(e.id),s=a.some(n=>n.module===t||n.children?.some(i=>i.module===t&&$(`${i.module}.view`)));return`<div class="mb-1">
    <button type="button" data-action="toggle-sidebar-group" data-group="${e.id}" aria-expanded="${r}" aria-controls="sidebar-group-${e.id}" class="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold leading-5 ${s?"bg-[#f4f9f5] text-primary-dark":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">
      ${f(e.icon,19,"shrink-0")}<span class="min-w-0 flex-1 whitespace-normal break-words">${c(e.label)}</span>${f("chevronDown",16,`shrink-0 transition-transform ${r?"rotate-180":""}`)}
    </button>
    <div id="sidebar-group-${e.id}" class="ml-5 border-l border-[#dbe9df] pl-3" ${r?"":"hidden"}>
      ${a.map(n=>{const i=t===n.module,o=n.href||ne(n.module);if(!n.children)return`<a href="${o}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${i?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${i?'aria-current="page"':""}><span class="whitespace-normal break-words">${c(n.label)}</span></a>`;const l=n.children.filter(u=>$(`${u.module}.view`));if(!l.length)return`<a href="${o}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${i?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${i?'aria-current="page"':""}><span class="whitespace-normal break-words">${c(n.label)}</span></a>`;const d=te.has(n.module),m=n.children.some(u=>u.module===t);return`<div class="my-0.5 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${i?"nav-active":m?"bg-[#f4f9f5] text-primary-dark":"text-[#687b74]"}"><a href="${o}" class="flex min-h-11 min-w-0 flex-1 items-center rounded-l-xl px-3 py-2.5 text-[13px] font-medium leading-5 hover:bg-[#f4f7f4] hover:text-ink ${i?"font-semibold":""}" ${i?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(n.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${n.module}" aria-expanded="${d}" aria-controls="sidebar-subgroup-${n.module}" aria-label="${d?"ปิด":"เปิด"}เมนูย่อยของ${c(n.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${f("chevronDown",16,`transition-transform ${d?"rotate-180":""}`)}</button></div><div id="sidebar-subgroup-${n.module}" class="ml-3 border-l border-[#dbe9df] pl-2" ${d?"":"hidden"}>${l.map(u=>{const p=t===u.module;return`<a href="${u.href||ne(u.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${p?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${p?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(u.label)}</span></a>`}).join("")}</div></div>`}).join("")}
    </div>
  </div>`}function pa(e,t){const a=window.serviceHubUrls?.logo||da;return`
    <div id="mobile-backdrop" class="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none lg:hidden ${T?"opacity-100 pointer-events-auto visible":"opacity-0 pointer-events-none invisible"}" data-action="close-menu" aria-hidden="true"></div>
    <aside id="sidebar" role="complementary" aria-label="แถบเมนูหลัก" class="fixed inset-y-0 left-0 z-50 flex w-[266px] max-w-[calc(100vw-24px)] flex-col border-r border-line bg-white transition-transform duration-200 motion-reduce:transition-none lg:translate-x-0 lg:visible lg:pointer-events-auto ${T?"translate-x-0 visible pointer-events-auto":"-translate-x-full invisible pointer-events-none"}" ${T?'aria-hidden="false"':'aria-hidden="true"'}>
      <div class="flex h-[72px] items-center gap-3 border-b border-line px-5 sm:px-6">
        <img src="${a}" alt="ตราเทศบาลนครนนทบุรี" class="h-12 w-12 shrink-0 object-contain drop-shadow-sm">
        <div class="min-w-0 flex-1"><div class="text-[15px] font-bold tracking-tight text-ink leading-snug">เทศบาลนครนนทบุรี</div><div class="text-[11px] font-medium tracking-wide text-muted">ฐานข้อมูลฝ่ายบริการ</div></div>
        <button type="button" class="ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-muted lg:hidden" data-action="close-menu" aria-label="ปิดเมนู">${f("close",20)}</button>
      </div>
      <nav aria-label="เมนูหลัก" role="navigation" class="scrollbar-thin flex-1 overflow-y-auto px-4 pb-6 pt-6">
        <a href="#/dashboard" class="mb-2 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${t?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${t?'aria-current="page"':""}>${f("grid",19)}<span>แดชบอร์ดฝ่ายบริการ</span></a>
        ${jt.map(r=>ua(r,e)).join("")}
        ${!$("road-washings.view")&&$("cleaning-zones.view")?`<a href="${qt}" class="mb-1 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="cleaning-zones"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4]"}">เขตรักษาความสะอาด</a>`:""}
        ${!$("waste-collections.view")&&$("waste-types.view")?`<a href="${Tt}" class="mb-1 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="waste-types"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4]"}">ประเภทขยะมูลฝอย</a>`:""}
        <a href="#/reports" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="reports"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="reports"?'aria-current="page"':""}>${f("chart",18)}รายงาน</a>
        ${$("audit-logs.view")?`<a href="#/audit-logs" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="audit-logs"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">${f("info",18)}ประวัติการแก้ไข</a>`:""}
        ${Ie()?`<div class="mt-3 border-t border-line pt-3"><a href="#/users" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="users"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="users"?'aria-current="page"':""}>${f("users",19)}<span>จัดการผู้ใช้งาน</span></a></div>`:""}
        <div class="mt-3 border-t border-line pt-3">
          <a href="#/profile" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="profile"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="profile"?'aria-current="page"':""}>
            ${f("users",19)}<span>โปรไฟล์ของฉัน</span>
          </a>
        </div>
      </nav>
    </aside>
  `}function fa(e=[]){const t=window.serviceHubUser||{},a=(t.name||t.username||"U").slice(0,1).toUpperCase(),r=(t.name||t.username||"U").slice(0,2).toUpperCase(),s=(t.roles||[])[0]||"staff";return`
    <header role="banner" class="app-header sticky top-0 z-30 flex h-[72px] w-full max-w-full min-w-0 items-center justify-between border-b border-line bg-white/95 px-3.5 backdrop-blur-sm sm:px-7 lg:px-9">
      <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button type="button" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl p-2 text-ink hover:bg-canvas lg:hidden" data-action="open-menu" aria-label="เปิดเมนู" aria-expanded="${T}" aria-controls="sidebar">${f("menu",22)}</button>
        <nav aria-label="เส้นทางหน้า" role="navigation" class="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap text-xs text-muted sm:text-sm">
          <a class="shrink-0 hover:text-primary" href="#/dashboard">หน้าหลัก</a>
          ${e.map(n=>`${f("chevron",14,"shrink-0 text-[#b7c4bd]")}<span class="min-w-0 truncate ${n.current?"font-semibold text-ink":""}">${n.href?`<a href="${n.href}" class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom hover:text-primary">${c(n.label)}</a>`:`<span class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom">${c(n.label)}</span>`}</span>`).join("")}
        </nav>
      </div>
      <div class="ml-2 flex shrink-0 items-center gap-2 sm:gap-3">
        <span class="hidden rounded-full border border-[#cfe9dd] bg-[#f0faf4] px-3 py-1 text-[11px] font-bold text-primary sm:inline-flex">ข้อมูลจริง</span>
        <div id="user-menu-container" class="relative">
          <button type="button" data-action="toggle-user-menu" id="user-menu-button" aria-haspopup="menu" aria-expanded="${O}" aria-controls="user-menu-dropdown" class="flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f0f8f2] focus:outline-none focus:ring-2 focus:ring-primary/20 ${O?"border-primary bg-[#f0f8f2]":""}" aria-label="เมนูผู้ใช้งาน ${c(t.name||t.username)}">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#177a67] to-[#0e6253] text-xs font-bold text-white shadow-sm">${c(a)}</span>
            <span class="hidden max-w-[130px] truncate sm:inline">${c(t.name||t.username)}</span>
            ${f("chevronDown",14,`shrink-0 text-[#687b74] transition-transform duration-150 ${O?"rotate-180":""}`)}
          </button>
          <div id="user-menu-dropdown" class="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-24px)] rounded-2xl border border-line bg-white p-2 shadow-xl z-50 transition-all ${O?"opacity-100 visible translate-y-0 pointer-events-auto":"opacity-0 invisible -translate-y-1 pointer-events-none"}" role="menu" aria-labelledby="user-menu-button" ${O?"":"hidden"}>
            <div class="rounded-xl bg-[#f8faf8] p-3 border border-[#edf3ee]">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#177a67] to-[#0e6253] text-sm font-bold text-white shadow-sm">
                  ${c(r)}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-ink truncate">${c(t.name||t.username)}</div>
                  <div class="text-[11px] text-muted truncate">@${c(t.username)}</div>
                  <div class="mt-1">
                    <span class="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${ea[s]||"border-gray-200 bg-gray-50 text-gray-700"}">
                      ${c(Jt[s]||s)}
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
  `}function K(e,t=null,a=[],r=!1){return`
    ${pa(t,r)}
    <div class="app-shell min-h-screen w-full max-w-full min-w-0 lg:pl-[266px]">
      ${fa(a)}
      <main id="main-content" role="main" tabindex="-1" class="app-content mx-auto w-full min-w-0 max-w-[1510px] px-3.5 pb-16 pt-5 sm:px-7 sm:pt-7 lg:px-9">
        ${e}
      </main>
      <div id="shell-live-status" role="status" aria-live="polite" class="sr-only"></div>
    </div>
  `}function ba(){window.addEventListener("resize",Ut)}const xa={distance_km:"กิโลเมตร",quantity:"ลูกบาศก์เมตร",weight:"กิโลกรัม",sediment_quantity:"ลูกบาศก์เมตร",volume:"ลูกบาศก์เมตร",fee_amount:"บาท",sludge_quantity:"กิโลกรัม",fertilizer_remaining_latest:"กิโลกรัม",communities_count:"ชุมชน",participants_count:"คน"},ha={fertilizer_remaining_latest:"ปุ๋ยคงเหลือล่าสุด"},me=e=>new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Bangkok"}).format(new Date(`${String(e).slice(0,10)}T12:00:00+07:00`)),ga=e=>e?new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"Asia/Bangkok"}).format(new Date(String(e).replace(" ","T")+(String(e).includes("Z")||/[+-]\d\d:\d\d$/.test(String(e))?"":"+00:00"))):"—";function va({data:e,loading:t,error:a,params:r,groups:s,modules:n,icon:i,esc:o,number:l,moduleHref:d}){const m=r.get("from")||e?.period?.from||"",u=r.get("to")||e?.period?.to||"",p=!!(m||u),b='<div class="mb-5 sm:mb-6"><p class="text-xs font-bold tracking-[.16em] text-primary">ภาพรวมระบบ</p><h1 class="mt-2 text-2xl font-bold text-ink sm:text-3xl">แดชบอร์ดฝ่ายบริการ</h1><p class="mt-2 text-sm text-muted">ติดตามงานบริการจากฐานข้อมูลจริงตามสิทธิ์ของคุณ</p></div>',h=`
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
  `;if(t||!e&&!a)return`${b}${h}<div role="status" aria-live="polite" class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted">กำลังโหลดข้อมูลภาพรวม…</div>`;if(a)return`${b}${h}<div role="alert" class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"><p class="font-semibold">โหลดข้อมูลภาพรวมไม่สำเร็จ</p><p class="mt-1">${o(a)}</p><button type="button" data-action="retry-dashboard" class="mt-3 min-h-11 rounded-xl border border-red-300 bg-white px-4 font-semibold">ลองอีกครั้ง</button></div>`;const w=n.filter(x=>Object.hasOwn(e.module_summary,x.id)),k=x=>w.some(g=>g.id===x),S=x=>e.period?.from&&e.period?.to?`${d(x)}?${new URLSearchParams({from:e.period.from,to:e.period.to})}`:d(x),j=e.period.total,E=(x,g,H,z,M=!1)=>`<div class="dashboard-card panel-shadow rounded-2xl border border-line bg-white ${M?"border-l-[3px] border-l-primary":""} p-4 sm:p-5"><p class="text-sm font-semibold text-[#4d655a]">${x}</p><p class="mt-3 text-3xl font-bold leading-tight text-ink">${l(g)} <span class="text-sm font-medium text-muted">${H}</span></p><p class="mt-1 text-xs text-muted">${z}</p></div>`,A=(x,g,H)=>{const z=ha[g]||x.fields.find(M=>M.name===g)?.label||g;return`<span class="inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-[#f4f8f5] px-2.5 py-1.5 text-xs text-[#435b50]"><span>${o(z)}:</span><strong class="min-w-0 break-words text-ink">${H===null?"ไม่มีข้อมูล":`${l(H)} ${x.fields.find(M=>M.name===g)?.unit||xa[g]||""}`}</strong></span>`},y=(x,g)=>e.module_summary[x]?.metrics[g]??0,ae={cleaning:[["ระยะทางงานอื่นรวม",w.filter(x=>x.group==="cleaning"&&x.id!=="waterway-cleanings").reduce((x,g)=>x+y(g.id,"distance_km"),0),"กิโลเมตร"],...k("waterway-cleanings")?[["ระยะทางงานคลอง",y("waterway-cleanings","distance_km"),"เมตร"],["ผักตบชวาและมูลฝอยที่กำจัด",y("waterway-cleanings","quantity"),"ลูกบาศก์เมตร"]]:[]],waste:[["น้ำหนักมูลฝอย",y("waste-collections","weight"),"กิโลกรัม"]],sanitation:[...k("drain-cleanings")?[["ตะกอนจากงานลอกท่อ",y("drain-cleanings","sediment_quantity"),"ลูกบาศก์เมตร"]]:[],...k("septic-pumpings")?[["สิ่งปฏิกูลที่สูบ",y("septic-pumpings","volume"),"ลูกบาศก์เมตร"]]:[],...k("septic-treatments")?[["ตะกอนสำหรับทำปุ๋ย",y("septic-treatments","sludge_quantity"),"กิโลกรัม"]]:[]],projects:[["ผู้เข้าร่วมโครงการ",y("waste-management-projects","participants_count"),"คน"]]},v=s.filter(x=>w.some(g=>g.group===x.id)).map(x=>`<section class="dashboard-card panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5"><div class="flex items-start gap-3"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf5ef] text-primary">${i(x.icon,19)}</span><div class="min-w-0"><h3 class="break-words text-sm font-bold text-ink">${o(x.label)}</h3><p class="mt-1 text-2xl font-bold text-ink">${l(e.group_summary[x.id]||0)} <span class="text-xs font-medium text-muted">${p?"รายการในช่วงที่เลือก":"รายการสะสม"}</span></p></div></div><dl class="mt-4 space-y-1.5 border-t border-line pt-3">${ae[x.id].map(([g,H,z])=>`<div class="flex flex-wrap justify-between gap-x-2 text-xs"><dt class="text-muted">${g}</dt><dd class="min-w-0 break-words font-bold text-ink">${l(H)} ${z}</dd></div>`).join("")}</dl></section>`).join(""),D=w.map(x=>{const g=e.module_summary[x.id];return`<a href="${S(x.id)}" class="flex min-w-0 flex-col gap-2 rounded-xl border border-line bg-white p-3.5 transition hover:border-[#9fd1b8] hover:bg-[#f9fcfa] focus-visible:outline"><span class="flex min-w-0 items-start justify-between gap-2"><span class="min-w-0 break-words text-sm font-semibold text-ink">${o(x.short)}</span><strong class="shrink-0 text-sm text-primary">${l(g.count)} รายการ</strong></span><span class="flex flex-wrap gap-1.5">${Object.entries(g.metrics).map(([H,z])=>A(x,H,z)).join("")||'<span class="text-xs text-muted">ไม่มีค่าปริมาณ</span>'}</span></a>`}).join(""),W=Math.max(1,...e.trend.map(x=>x.count)),G=e.trend.map(x=>`<li class="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-xs"><span class="min-w-0 break-words text-muted">${me(x.from)}${x.from===x.to?"":` – ${me(x.to)}`}</span><strong class="text-ink">${l(x.count)} รายการ</strong><span class="col-span-2 h-2 rounded-full bg-[#eef3ef]"><span class="block h-2 rounded-full bg-primary" style="width:${Math.max(0,Math.round(x.count/W*100))}%"></span></span></li>`).join(""),ce=e.recent.slice(0,6).map(x=>{const g=n.find(H=>H.id===x.module);return g?`<a href="${d(g.id)}/${encodeURIComponent(x.id)}" class="flex min-w-0 flex-col gap-2 border-t border-line px-4 py-3.5 transition hover:bg-[#f9fcfa] sm:flex-row sm:items-center sm:gap-3 sm:px-5"><div class="flex min-w-0 flex-1 items-center gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf5ef] text-primary">${i(g.icon,17)}</span><div class="min-w-0 flex-1"><strong class="block break-words text-sm text-ink">${o(x.title||g.short)}</strong><span class="block break-words text-xs text-muted">${o(g.short)}</span></div></div><div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pl-12 text-xs sm:flex-col sm:items-end sm:gap-y-0.5 sm:pl-0"><span class="inline-flex items-center gap-1 font-semibold text-primary-dark"><span class="font-normal text-muted">ดำเนินงาน:</span> ${me(x.service_date)}</span><time class="text-[11px] text-muted" datetime="${o(x.created_at)}">บันทึกเมื่อ ${ga(x.created_at)}</time></div></a>`:""}).join(""),we=p?"รายการในช่วงที่เลือก":"รายการสะสมทั้งหมด",Be=e.period?.from&&e.period?.to?`${me(e.period.from)} – ${me(e.period.to)}`:"ข้อมูลสะสมตั้งแต่เริ่มระบบ";return`${b}${h}<section aria-label="ยอดรวม" class="dashboard-summary mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">${E(we,j,"รายการ",Be,!0)}${E("ยอดสะสมตั้งแต่เริ่มระบบ",e.total,"รายการ","เฉพาะหมวดที่คุณมีสิทธิ์ดู")}${E("ดำเนินงานวันนี้",e.today,"รายการ","อิงวันที่ดำเนินงานตามเวลาไทย")}</section><section aria-labelledby="group-heading" class="mb-6"><h2 id="group-heading" class="mb-3 text-lg font-bold text-ink">ภาพรวมกลุ่มงาน</h2>${w.length?`<div class="dashboard-summary grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">${v}</div>`:'<p class="rounded-xl border border-line bg-white p-5 text-sm text-muted">ไม่มีหมวดงานที่คุณมีสิทธิ์ดู</p>'}</section><section aria-labelledby="module-heading" class="panel-shadow mb-6 rounded-2xl border border-line bg-[#f8faf8] p-4 sm:p-5"><div class="mb-3"><h2 id="module-heading" class="text-lg font-bold text-ink">งานบริการรายหมวด</h2><p class="text-xs text-muted">${p?"จำนวนและปริมาณในช่วงวันที่ที่เลือก; แต่ละค่าระบุหน่วยและความหมายแยกกัน":"จำนวนและปริมาณสะสมทั้งหมด; แต่ละค่าระบุหน่วยและความหมายแยกกัน"}</p></div>${p&&j===0?'<p class="mb-3 rounded-xl border border-[#d8e7dd] bg-white p-4 text-sm text-muted">ยังไม่มีรายการดำเนินงานในช่วงวันที่นี้ ลองเลือกช่วงอื่นเพื่อดูข้อมูล</p>':""}<div class="grid min-w-0 gap-2 sm:grid-cols-2 xl:grid-cols-3">${D}</div></section><div class="dashboard-panels grid grid-cols-1 gap-5 xl:grid-cols-2"><section aria-labelledby="trend-heading" class="panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5"><h2 id="trend-heading" class="text-lg font-bold text-ink">แนวโน้มจำนวนรายการ</h2><p class="mt-1 text-xs text-muted">${p?"แบ่งช่วงภายในวันที่ที่เลือก; แถบยาวขึ้นหมายถึงจำนวนมากขึ้น":"แนวโน้มจำนวนรายการย้อนหลัง; แถบยาวขึ้นหมายถึงจำนวนมากขึ้น"}</p>${j&&e.trend.length>1?`<ol class="mt-5 space-y-4">${G}</ol>`:'<p class="mt-5 text-sm text-muted">ข้อมูลยังไม่เพียงพอสำหรับแสดงแนวโน้ม</p>'}</section><section aria-labelledby="recent-heading" class="panel-shadow overflow-hidden rounded-2xl border border-line bg-white"><div class="p-4 sm:p-5"><h2 id="recent-heading" class="text-lg font-bold text-ink">บันทึกล่าสุด</h2><p class="mt-1 text-xs text-muted">เรียงตามเวลาบันทึก ครอบคลุมข้อมูลทุกช่วงเวลา</p></div>${ce||'<p class="border-t border-line p-5 text-sm text-muted">ยังไม่มีรายการบันทึก</p>'}</section></div>`}let Ue=null;function At(e,t){if(e.key!=="Tab")return;const a=[...t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(n=>!n.closest("[hidden]")&&n.offsetParent!==null);if(!a.length){e.preventDefault();return}const r=a[0],s=a[a.length-1];e.shiftKey&&document.activeElement===r?(e.preventDefault(),s.focus()):!e.shiftKey&&document.activeElement===s&&(e.preventDefault(),r.focus())}function wa({title:e="",content:t="",footer:a="",trigger:r=null,onClose:s=null,initialFocusSelector:n="input:not([disabled]), select:not([disabled]), button:not([disabled])",maxWidth:i="max-w-[440px]"}={}){Ae();const o=r||document.activeElement,l=document.createElement("div");l.id="accessible-drawer-root",l.className="drawer-container",l.innerHTML=`
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
  `,t instanceof HTMLElement&&l.querySelector(".flex-1").appendChild(t),document.body.appendChild(l),document.body.style.overflow="hidden";const d=u=>{if(u.key==="Escape")u.preventDefault(),Ae();else if(u.key==="Tab"){const p=document.getElementById("drawer-panel");p&&At(u,p)}},m=u=>{u.target.closest('[data-action="drawer-close"]')&&(u.preventDefault(),Ae())};return document.addEventListener("keydown",d),l.addEventListener("click",m),Ue={root:l,triggerElement:o,onKeydown:d,onClick:m,onClose:s},requestAnimationFrame(()=>{requestAnimationFrame(()=>{const u=document.getElementById("drawer-panel");if(!u)return;const p=n?u.querySelector(n):null;p&&typeof p.focus=="function"?p.focus():u.querySelector('button[data-action="drawer-close"]')?.focus()})}),l}function Ae(){if(!Ue)return;const{root:e,triggerElement:t,onKeydown:a,onClick:r,onClose:s}=Ue;document.removeEventListener("keydown",a),e.removeEventListener("click",r),e.remove(),document.body.style.overflow="",Ue=null,t&&typeof t.focus=="function"&&t.focus(),typeof s=="function"&&s()}function st({title:e="ยืนยันการดำเนินการ",message:t="คุณต้องการดำเนินการต่อหรือไม่",confirmText:a="ยืนยัน",cancelText:r="ยกเลิก",variant:s="danger",iconName:n="trash"}={}){return new Promise(i=>{const o=document.activeElement,l=document.createElement("div");l.id="accessible-modal-root",l.className="modal-container fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#0d241e]/55 p-4 backdrop-blur-xs";const d={danger:{iconBg:"bg-[#fff0ed] text-[#b64b43]",btnConfirm:"bg-[#b84d45] hover:bg-[#a43e37] text-white"},warning:{iconBg:"bg-[#fff8eb] text-[#b2721a]",btnConfirm:"bg-[#b2721a] hover:bg-[#9a6214] text-white"},primary:{iconBg:"bg-[#eaf5ef] text-primary",btnConfirm:"bg-primary hover:bg-primary-dark text-white"}}[s]||{iconBg:"bg-[#fff0ed] text-[#b64b43]",btnConfirm:"bg-[#b84d45] hover:bg-[#a43e37] text-white"};l.innerHTML=`
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
    `,document.body.appendChild(l);const m=document.body.style.overflow;document.body.style.overflow="hidden";const u=l.querySelector("#confirm-modal-cancel"),p=l.querySelector("#confirm-modal-confirm"),b=w=>{document.removeEventListener("keydown",h),l.remove(),document.body.style.overflow=m,o&&typeof o.focus=="function"&&o.focus(),i(w)},h=w=>{if(w.key==="Escape")w.preventDefault(),b(!1);else if(w.key==="Tab"){const k=l.querySelector('[role="alertdialog"]');k&&At(w,k)}};l.addEventListener("click",w=>{w.target===l&&b(!1)}),u?.addEventListener("click",()=>b(!1)),p?.addEventListener("click",()=>b(!0)),document.addEventListener("keydown",h),setTimeout(()=>{u?.focus()},50)})}const de={"super-admin":{label:"ผู้ดูแลสูงสุด",color:"bg-[#fef2e8] text-[#b25d1a] border-[#f9d4b4]"},admin:{label:"ผู้ดูแลระบบ",color:"bg-[#e8f0fe] text-[#2756b8] border-[#c3d3f9]"},staff:{label:"เจ้าหน้าที่",color:"bg-[#eef7f2] text-[#156e3a] border-[#b7e4ce]"},viewer:{label:"ผู้ดูข้อมูล",color:"bg-[#f3f0fb] text-[#5a469b] border-[#cdc5ef]"},auditor:{label:"ผู้ตรวจสอบ",color:"bg-[#fff4e8] text-[#966020] border-[#f5d9a8]"}};function ya(e){const t=de[e]||{label:e,color:"bg-[#f2f4f3] text-[#52665e] border-[#d8e3de]"};return`<span class="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${t.color}">${c(t.label)}</span>`}let N={loading:!1,error:null,users:[],summary:{},meta:{},roles:[]},L={q:"",role:"all",status:"all",sort:"created_at",direction:"desc",page:1},pt=null;function $a(){return`
    <div id="user-directory-root" class="w-full min-w-0 max-w-full">
      ${Ct()}
    </div>
  `}function Ct(){const{loading:e,error:t,users:a,summary:r,meta:s}=N,i=qe("users.create")?`<button type="button" data-action="um-open-create" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${f("plus",18)}เพิ่มผู้ใช้งาน</button>`:"";return`
    ${Z("การจัดการระบบ","จัดการผู้ใช้งาน","บริหารบัญชีผู้ใช้ สิทธิ์การเข้าถึง และความปลอดภัยของระบบ",i)}
    ${ka(r)}
    ${Sa()}
    ${e?`<div role="status" aria-live="polite" class="flex items-center justify-center py-16 text-muted text-sm">${f("filter",20,"animate-spin mr-2")} กำลังโหลดข้อมูลผู้ใช้งาน...</div>`:t?`<div role="alert" class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">${c(t)}</div>`:_a(a,s)}
  `}function ka(e){return`
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
  `}function Sa(){const{q:e,role:t,status:a,sort:r,direction:s}=L,n=[{value:"all",label:"ทุกบทบาท"},...Object.entries(de).map(([o,l])=>({value:o,label:l.label}))],i=[{value:"all",label:"ทุกสถานะ"},{value:"active",label:"ใช้งานอยู่"},{value:"inactive",label:"ระงับแล้ว"}];return`
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
  `}function _a(e,t){const a=qe("users.update"),r=qe("users.disable"),s=qe("users.update");if(!e.length)return`
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
          <p class="mt-0.5 text-xs text-muted">พบ ${_(o)} บัญชี</p>
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
            ${e.map(d=>{const m=d.role??d.roles?.[0]?.name??d.roles?.[0]??"",u=!!d.is_active,p=String(d.id)===String(window.serviceHubUser?.id);return`
                <tr class="transition hover:bg-[#fafcfa]" data-user-id="${c(String(d.id))}">
                  <td class="px-5 py-3.5">
                    <div class="flex items-center gap-3">
                      <span aria-hidden="true" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e0f0e8] text-[13px] font-bold text-primary-dark">
                        ${c(kt(d.name))}
                      </span>
                      <span class="font-semibold text-ink break-words max-w-[160px]">${c(d.name)}</span>
                    </div>
                  </td>
                  <td class="px-5 py-3.5 text-muted font-mono text-xs">${c(d.username)}</td>
                  <td class="px-5 py-3.5">${m?ya(m):'<span class="text-muted">—</span>'}</td>
                  <td class="px-5 py-3.5">
                    <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${u?"bg-[#eef7f2] text-[#156e3a]":"bg-[#fef2f2] text-[#b91c1c]"}">
                      <span class="h-1.5 w-1.5 rounded-full ${u?"bg-[#22c55e]":"bg-[#ef4444]"}"></span>
                      ${u?"ใช้งานอยู่":"ระงับแล้ว"}
                    </span>
                  </td>
                  <td class="px-5 py-3.5 text-xs text-muted whitespace-nowrap">${B(d.created_at)}</td>
                  ${a||r||s?`
                  <td class="px-5 py-3.5 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                      ${a?`<button type="button" data-action="um-edit-user" data-id="${c(String(d.id))}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-ink hover:bg-canvas" aria-label="แก้ไข ${c(d.name)}">${f("edit",15)}แก้ไข</button>`:""}
                      ${r&&!p?`<button type="button" data-action="um-toggle-status" data-id="${c(String(d.id))}" data-active="${u?"1":"0"}" data-name="${c(d.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold ${u?"text-[#b91c1c] hover:bg-red-50":"text-[#156e3a] hover:bg-[#eef7f2]"}" aria-label="${u?"ระงับ":"เปิดใช้"} ${c(d.name)}">${f(u?"close":"check",15)}${u?"ระงับ":"เปิดใช้"}</button>`:""}
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
        <span>แสดง ${_((n-1)*l+1)}–${_(Math.min(n*l,o))} จาก ${_(o)} บัญชี</span>
        <div class="flex items-center gap-2">
          <button type="button" data-action="um-page" data-page="${n-1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${n===1?"opacity-45 cursor-not-allowed":"hover:bg-canvas"}" ${n===1?'disabled aria-disabled="true"':""}>ก่อนหน้า</button>
          <span class="px-1 font-bold text-ink">${n} / ${i}</span>
          <button type="button" data-action="um-page" data-page="${n+1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${n===i?"opacity-45 cursor-not-allowed":"hover:bg-canvas"}" ${n===i?'disabled aria-disabled="true"':""}>ถัดไป</button>
        </div>
      </div>`:""}
    </section>
  `}function Ea(){const e="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",t=new Uint8Array(16);return crypto.getRandomValues(t),Array.from(t).map(a=>e[a%e.length]).join("")}async function ee(e=R){N.loading=!0,N.error=null,ft(e);const t=new URLSearchParams;L.q&&t.set("q",L.q),L.role&&L.role!=="all"&&t.set("role",L.role),L.status&&L.status!=="all"&&t.set("status",L.status),t.set("sort",L.sort),t.set("direction",L.direction),t.set("page",String(L.page)),t.set("per_page","10");try{const a=window.serviceHubUrls?.apiUsers||"/api/users",r=await I(`${a}?${t}`);N.users=r.data??[],N.summary=r.summary??{},N.meta=r.meta??{}}catch(a){N.error=a.message||"ไม่สามารถโหลดข้อมูลผู้ใช้งานได้"}finally{N.loading=!1,ft(e)}}async function La(){try{const e=window.serviceHubUrls?.apiRoles||"/api/roles",t=await I(e);N.roles=t.data??[]}catch{N.roles=Object.keys(de).map(e=>({name:e}))}}function ft(e=R){const t=document.getElementById("user-directory-root");t&&(t.innerHTML=Ct(),qa(t,e))}function qa(e,t=R){e.querySelector('[data-action="um-search"]')?.addEventListener("input",a=>{clearTimeout(pt),pt=setTimeout(()=>{L.q=a.target.value.trim(),L.page=1,ee(t)},300)}),e.querySelector('[data-action="um-filter-role"]')?.addEventListener("change",a=>{L.role=a.target.value,L.page=1,ee(t)}),e.querySelector('[data-action="um-filter-status"]')?.addEventListener("change",a=>{L.status=a.target.value,L.page=1,ee(t)}),e.querySelector('[data-action="um-filter-sort"]')?.addEventListener("change",a=>{const[r,s]=a.target.value.split(":");L.sort=r,L.direction=s,L.page=1,ee(t)}),e.querySelector('[data-action="um-clear-filters"]')?.addEventListener("click",()=>{Object.assign(L,{q:"",role:"all",status:"all",sort:"created_at",direction:"desc",page:1}),ee(t)}),e.querySelectorAll('[data-action="um-page"]').forEach(a=>{a.addEventListener("click",()=>{L.page=Number(a.dataset.page),ee(t)})}),e.querySelector('[data-action="um-open-create"]')?.addEventListener("click",a=>{Oe({mode:"create",trigger:a.currentTarget,toastFn:t})}),e.querySelectorAll('[data-action="um-edit-user"]').forEach(a=>{a.addEventListener("click",r=>{const s=N.users.find(o=>String(o.id)===a.dataset.id);if(!s)return;const n=s.role??s.roles?.[0]?.name??s.roles?.[0]??"",i={...s,role:n};Oe({mode:"edit",user:i,trigger:r.currentTarget,toastFn:t})})}),e.querySelectorAll('[data-action="um-reset-password"]').forEach(a=>{a.addEventListener("click",r=>{const s={id:a.dataset.id,name:a.dataset.name};Oe({mode:"reset",user:s,trigger:r.currentTarget,toastFn:t})})}),e.querySelectorAll('[data-action="um-toggle-status"]').forEach(a=>{a.addEventListener("click",async()=>{const r=a.dataset.id,s=a.dataset.active==="1",n=a.dataset.name;if(await st({title:s?"ยืนยันการระงับการใช้งาน":"ยืนยันการเปิดใช้งาน",message:`คุณต้องการ${s?"ระงับการใช้งาน":"เปิดใช้งาน"}บัญชี "${n}" ใช่หรือไม่? ${s?"ผู้ใช้จะถูกตัดเซสชันการเข้าใช้งานทันที":""}`,confirmText:s?"ระงับการใช้งาน":"เปิดใช้งาน",variant:s?"danger":"primary",iconName:s?"close":"check"})){a.disabled=!0;try{const o=window.serviceHubUrls?.apiUsers||"/api/users";await I(`${o}/${encodeURIComponent(r)}/status`,{method:"PATCH",body:{is_active:!s}}),t(s?"ระงับการใช้งานบัญชีแล้ว":"เปิดใช้งานบัญชีแล้ว"),await ee(t)}catch(o){t(o.message||"ไม่สามารถเปลี่ยนสถานะผู้ใช้ได้","error"),a.disabled=!1}}})})}function Oe({mode:e,user:t=null,trigger:a=null,toastFn:r=R}){const s=e==="reset",n=e==="edit",i=s?`รีเซ็ตรหัสผ่าน — ${c(t?.name)}`:n?"แก้ไขข้อมูลผู้ใช้":"เพิ่มผู้ใช้งานใหม่",o=N.roles.length?N.roles:Object.keys(de).map(p=>({name:p})),l=document.createElement("div");l.innerHTML=`
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
  `;l.querySelectorAll('[data-action="toggle-pwd-visibility"]').forEach(p=>{p.addEventListener("click",()=>{const b=l.querySelector(`#${p.dataset.target}`);if(!b)return;const h=b.type==="password";b.type=h?"text":"password",p.innerHTML=f(h?"eyeOff":"eye",18),p.setAttribute("aria-label",h?"ซ่อนรหัสผ่าน":"แสดงรหัสผ่าน"),p.setAttribute("aria-pressed",String(h))})});const m=()=>{const p=Ea(),b=l.querySelector("#um-password")||l.querySelector("#um-new-password");if(b){b.value=p,b.type="text";const h=l.querySelector(`[data-target="${b.id}"]`);h&&(h.innerHTML=f("eyeOff",18),h.setAttribute("aria-label","ซ่อนรหัสผ่าน"),h.setAttribute("aria-pressed","true"))}};l.querySelector("#um-gen-pw-btn")?.addEventListener("click",m),l.querySelector("#um-gen-init-pw-btn")?.addEventListener("click",m);const u=l.querySelector("#um-drawer-form");u.addEventListener("submit",async p=>{p.preventDefault();const b=document.getElementById("um-drawer-submit"),h=l.querySelector("#drawer-server-error");h.classList.add("hidden"),h.textContent="",l.querySelectorAll('[aria-invalid="true"]').forEach(S=>S.removeAttribute("aria-invalid")),l.querySelectorAll("#um-password-error").forEach(S=>{S.textContent="ความยาวอย่างน้อย 15 ตัวอักษร",S.classList.remove("text-red-600"),S.classList.add("text-muted")}),l.querySelectorAll("#um-name-error, #um-username-error").forEach(S=>{S.textContent="",S.classList.add("hidden")});const w=new FormData(u),k={};e==="create"?(k.name=String(w.get("name")||"").trim(),k.username=String(w.get("username")||"").trim(),k.password=String(w.get("password")||""),k.role=String(w.get("role")||"")):e==="edit"?(k.name=String(w.get("name")||"").trim(),k.role=String(w.get("role")||"")):e==="reset"&&(k.password=String(w.get("password")||"")),b&&(b.disabled=!0,b.classList.add("opacity-60"));try{const S=window.serviceHubUrls?.apiUsers||"/api/users";let j,E;e==="create"?(j=S,E="POST"):e==="edit"?(j=`${S}/${encodeURIComponent(t.id)}`,E="PUT"):(j=`${S}/${encodeURIComponent(t.id)}/reset-password`,E="POST"),await I(j,{method:E,body:k}),Ae(),r(e==="create"?"สร้างผู้ใช้งานเรียบร้อยแล้ว":e==="edit"?"บันทึกการแก้ไขแล้ว":"รีเซ็ตรหัสผ่านเรียบร้อยแล้ว"),await ee(r)}catch(S){b&&(b.disabled=!1,b.classList.remove("opacity-60")),S.status===422&&S.errors?(Object.entries(S.errors).forEach(([j,E])=>{const A=u.querySelector(`[name="${j}"]`),y=u.querySelector(`#um-${j}-error`);A&&A.setAttribute("aria-invalid","true"),y&&(y.textContent=E[0],y.classList.remove("hidden","text-muted"),y.classList.add("text-red-600"))}),u.querySelector('[aria-invalid="true"]')?.focus()):(h.textContent=S.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล",h.classList.remove("hidden"))}}),wa({title:i,content:l,footer:d,trigger:a,initialFocusSelector:e==="reset"?"#um-new-password":"#um-name"})}function Ta(e){return setTimeout(()=>{ee(R),N.roles.length||La()},0),$a()}let Dt=[],P={"cleaning-zones":[],"waste-types":[]};const Ke=new Set,bt=new Set;let Ce=null;function Mt(e){Ke.delete(e),P[e]=[]}async function Ve(e){const t=[...new Set(e.fields.filter(a=>a.type==="reference").map(a=>a.reference))];for(const a of t)Ke.has(a)||!$(`${a}.view`)||(P[a]=await yt(He(a)),Ke.add(a))}async function ja(e,t=new URLSearchParams){const a=Q.find(n=>n.id===e);if(!a)throw new Error("Unknown activity module");const r=new URLSearchParams({per_page:"6",page:String(Math.max(1,Number.parseInt(t.get("page"),10)||1))});for(const n of["q","from","to","sort",...a.fields.filter(i=>i.type==="reference").map(i=>i.name)])t.get(n)&&r.set(n,t.get(n));const s=await I(`${xe(e)}?${r}`);return Dt=Array.isArray(s.data)?s.data:[],s}function Rt(e,t,a=P){return!e||t==null||t===""?"—":e.type==="reference"?c(a[e.reference]?.find(r=>String(r.id)===String(t))?.name||"ไม่พบข้อมูลอ้างอิง"):e.type==="number"||e.type==="integer"?`${_(t)}${e.unit?` ${c(e.unit)}`:""}`:e.type==="date"?B(t):c(t)}function nt(e,t){return t["waste-types"]?.some(a=>String(a.id)===String(e)&&a.code==="WASTE-004")||!1}function Ua(e){if(e?.dataset.module!=="waste-collections")return;const t=e.elements.waste_type_id,a=e.querySelector("[data-hazardous-waste-field]"),r=e.elements.hazardous_waste_name;if(!a||!r)return;const s=t?.selectedOptions[0]?.dataset.code==="WASTE-004";a.hidden=!s,r.disabled=!s,s||(r.value="",r.removeAttribute("aria-invalid"),e.querySelector("#field-hazardous_waste_name-help").textContent="")}function xt(e,t="",a="",r=P){const s=`field-${e.name}`,n=`id="${s}" name="${e.name}" class="field" ${e.required?"required":""} ${a?'aria-invalid="true"':""} aria-describedby="${s}-help"`;let i;if(e.type==="textarea")i=`<textarea ${n} rows="4" maxlength="10000">${c(t)}</textarea>`;else if(e.type==="reference")i=`
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
    `;else{const o=e.type==="number"||e.type==="integer",l=e.type==="number"?["distance_km","fee_amount"].includes(e.name)?"0.01":"0.001":"1";i=`<input ${n} type="${o?"number":e.type}" ${o?`step="${l}" min="0"`:""} ${e.type==="text"?`maxlength="${e.name==="project_name"?500:255}"`:""} value="${c(t)}" placeholder="${e.type==="text"?`ระบุ${c(e.label)}`:""}">`}return`
    <div class="${e.type==="textarea"?"sm:col-span-2":""}">
      <label for="${s}" class="mb-1.5 block text-sm font-semibold text-[#41564c]">
        ${c(e.label)} ${e.required?'<span class="text-[#bf5b53]" aria-label="จำเป็น">*</span>':""}
      </label>
      ${i}
      <p id="${s}-help" class="mt-1.5 min-h-4 text-xs ${a?"text-[#b73c35]":"text-muted"}">
        ${a?c(a):e.unit?`หน่วย: ${c(e.unit)}`:"&nbsp;"}
      </p>
    </div>
  `}function Aa(e,t,a=P){const r=Object.fromEntries(new FormData(e)),s={};return t.fields.forEach(n=>{if(n.wasteTypeCode&&!nt(r.waste_type_id,a)){r[n.name]=null;return}const i=String(r[n.name]??"").trim();if(r[n.name]=i,n.required&&!i)s[n.name]=`กรุณาระบุ${n.label}`;else if(n.wasteTypeCode&&[...i].length>255)s[n.name]="ชื่อขยะอันตรายต้องไม่เกิน 255 ตัวอักษร";else if(i&&(n.type==="number"||n.type==="integer")){const o=Number(i);(!Number.isFinite(o)||o<0||n.type==="integer"&&!Number.isInteger(o))&&(s[n.name]=`กรุณาระบุ${n.label}เป็นจำนวนที่ถูกต้อง`)}else i&&n.type==="date"&&(!/^\d{4}-\d{2}-\d{2}$/.test(i)||Number.isNaN(new Date(`${i}T00:00:00Z`).getTime())||new Date(`${i}T00:00:00Z`).toISOString().slice(0,10)!==i)?s[n.name]="กรุณาระบุวันที่ที่ถูกต้อง":n.type==="reference"&&i&&!a[n.reference]?.some(o=>String(o.id)===i&&o.is_active)&&(s[n.name]=`กรุณาเลือก${n.label}จากรายการ`)}),t.fields.some(n=>n.name==="end_date")&&r.end_date&&r.service_date&&r.end_date<r.service_date&&(s.end_date="วันที่สิ้นสุดต้องไม่ก่อนวันเริ่ม"),{data:r,errors:s}}function Ca({module:e,group:t,params:a,records:r=Dt,references:s=P,meta:n=null}){const i=a.get("q")||"",o=a.get("from")||"",l=a.get("to")||"",d=a.get("sort")||"newest",m=6,u=Math.max(0,Number(n?.total??r.length)||0),p=Math.max(1,Number(n?.last_page)||Math.ceil(u/m)||1),b=Math.min(p,Math.max(1,Number(n?.current_page??a.get("page"))||1)),h=r,w=e.fields.filter(v=>v.name!=="service_date").slice(0,["waste-collections","waterway-cleanings"].includes(e.id)?4:3),k=v=>{const D=new URLSearchParams(a);return D.set("page",String(v)),`#/module/${e.id}?${D}`},S=e.fields.filter(v=>v.type==="reference").map(v=>{const D=a.get(v.name)||"";return`
      <div class="w-full min-w-0 sm:w-[170px]">
        <label for="${v.name}-filter" class="mb-1.5 block text-xs font-bold text-[#52665d]">${v.label}</label>
        <select id="${v.name}-filter" name="${v.name}" class="field">
          <option value="">ทั้งหมด</option>
          ${(s[v.reference]||[]).map(W=>`<option value="${c(W.id)}" ${D===String(W.id)?"selected":""}>${c(W.name)}</option>`).join("")}
        </select>
      </div>
    `}).join("");(o||l||d!=="newest"||e.fields.some(v=>v.type==="reference"&&a.get(v.name)))&&bt.add(e.id);const E=bt.has(e.id),A=[];o&&l?A.push(`ช่วงวันที่ ${B(o)} – ${B(l)}`):o?A.push(`ตั้งแต่วันที่ ${B(o)}`):l&&A.push(`ถึงวันที่ ${B(l)}`),i&&A.push(`ค้นหา "${i}"`),e.fields.filter(v=>v.type==="reference").forEach(v=>{const D=a.get(v.name);if(D){const W=s[v.reference]?.find(G=>String(G.id)===String(D));W&&A.push(`${v.label}: ${W.name}`)}});const y=A.length>0,ae=y?`
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#cfe5d6] bg-[#f0f8f3] px-4 py-3 text-xs sm:text-sm text-[#2b4c3c]" role="region" aria-label="สถานะตัวกรองข้อมูล">
      <div class="flex items-center gap-2">
        ${f("filter",16,"shrink-0 text-primary")}
        <div>
          <span class="font-bold">กำลังกรองข้อมูล:</span>
          <span class="text-[#3c594b]">${c(A.join(" · "))}</span>
          <span class="ml-1 text-xs text-muted font-normal">(${u>0?`พบ ${_(u)} รายการ`:"ไม่พบรายการ"})</span>
        </div>
      </div>
      <a href="#/module/${e.id}" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#b2dac0] bg-white px-3.5 py-1.5 text-xs font-bold text-primary shadow-xs hover:bg-[#ebf5ee]">
        ${f("close",14)}แสดงข้อมูลทั้งหมดทุกช่วงเวลา
      </a>
    </div>
  `:"";return`
    ${Z(t?.label||"",e.label,`จัดการข้อมูล${e.short} ค้นหาและกรองรายการตามช่วงวันที่`,$(`${e.id}.create`)?he("เพิ่มข้อมูล",`#/module/${e.id}/new`):"")}
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
        <button type="button" data-action="toggle-mobile-filters" data-module="${e.id}" aria-expanded="${E}" aria-controls="advanced-filters-${e.id}" class="inline-flex min-h-11 w-full items-center justify-between rounded-xl border border-line px-4 text-sm font-semibold text-primary-dark md:hidden">
          ตัวกรองเพิ่มเติม ${f("chevronDown",16,E?"rotate-180":"")}
        </button>
        <div id="advanced-filters-${e.id}" class="${E?"flex":"hidden"} w-full flex-wrap items-end gap-3 md:contents">
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label>
            <input id="date-from" class="field" type="date" name="from" value="${c(o)}">
          </div>
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label>
            <input id="date-to" class="field" type="date" name="to" value="${c(l)}">
          </div>
          ${S}
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

    ${ae}

    <section aria-labelledby="records-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
        <div>
          <h2 id="records-title" class="text-sm font-bold">รายการข้อมูล</h2>
          <p class="mt-0.5 text-xs text-muted">พบ ${_(u)} รายการ</p>
        </div>
        <span class="rounded-full bg-[#f0f7f2] px-2.5 py-1 text-[11px] font-bold text-primary">${c(e.short)}</span>
      </div>
      ${h.length?`
      <div class="data-table-scroll block overflow-x-auto w-full max-w-full min-w-0">
        <table class="w-full min-w-[650px] text-left text-sm" role="table">
          <thead class="bg-[#f9fbf9] text-xs font-semibold text-muted">
            <tr>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">${e.fields.find(v=>v.name==="service_date").label}</th>
              ${w.map(v=>`<th scope="col" class="px-5 py-3.5 whitespace-nowrap ${e.id==="waste-collections"&&v.name==="weight"?"text-right":""}">${c(v.label)}</th>`).join("")}
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">ผู้บันทึก</th>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">ดูข้อมูล</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef2ee]">
            ${h.map(v=>`
              <tr class="transition hover:bg-[#fafcfa]">
                <td class="whitespace-nowrap px-5 py-3.5 font-semibold text-ink">${B(v.service_date)}</td>
                ${w.map(D=>`<td class="max-w-[240px] ${["number","integer"].includes(D.type)?"whitespace-normal break-words":"truncate"} ${e.id==="waste-collections"&&D.name==="weight"?"text-right":""} px-5 py-3.5 text-[#53675e]">${Rt(D,v[D.name],s)}</td>`).join("")}
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
        <span>แสดง ${_((b-1)*m+1)}–${_(Math.min(b*m,u))} จาก ${_(u)} รายการ</span>
        <div class="flex items-center gap-2">
          <a href="${k(Math.max(1,b-1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${b===1?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${b===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="px-1 font-bold text-ink">${b} / ${p}</span>
          <a href="${k(Math.min(p,b+1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${b===p?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${b===p?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:`
      <div class="flex flex-col items-center px-6 py-14 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${y?"bg-[#fef5e7] text-[#c2782b]":"bg-[#f1f7f2] text-primary"}">${f("empty",27)}</div>
        <h3 class="text-base font-bold text-ink">${y?"ไม่พบรายการข้อมูลตามเงื่อนไขที่เลือก":"ยังไม่มีข้อมูลในหมวดนี้"}</h3>
        <p class="mt-2 max-w-md text-sm leading-relaxed text-muted">
          ${y?`ไม่มีการบันทึกงานบริการ${c(e.short)}${o&&l?` ระหว่างวันที่ ${B(o)} ถึง ${B(l)}`:""} คุณสามารถคลิกปุ่มด้านล่างเพื่อดูข้อมูลทั้งหมดในอดีต หรือเลือกช่วงเวลาอื่น`:`เริ่มต้นด้วยการเพิ่มรายการข้อมูลการดำเนินงานในหมวด${c(e.short)}`}
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          ${y?`
            <a href="#/module/${e.id}" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-sm hover:bg-primary-dark">
              ${f("grid",16)}แสดงข้อมูลทั้งหมดทุกช่วงเวลา
            </a>
          `:""}
          ${$(`${e.id}.create`)?`
            <a href="#/module/${e.id}/new" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl ${y?"border border-line bg-white text-ink hover:bg-canvas":"bg-primary text-white hover:bg-primary-dark"} px-5 text-sm font-bold">
              ${f("plus",16)}เพิ่มข้อมูลใหม่
            </a>
          `:""}
        </div>
      </div>`}
    </section>
  `}function Da({module:e,group:t,record:a,references:r=P}){return`
    ${Z(t?.label||"","รายละเอียดข้อมูล",`ข้อมูล${e.short} วันที่ ${B(a.service_date)}`,`
      <div class="flex flex-wrap gap-2">
        ${$(`${e.id}.update`)?le("แก้ไข",`#/module/${e.id}/${encodeURIComponent(a.id)}/edit`,"edit"):""}
        ${$(`${e.id}.delete`)?`
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
          ${e.fields.filter(s=>!s.wasteTypeCode||nt(a.waste_type_id,r)).map(s=>`
            <div class="border-b border-[#edf1ed] py-4">
              <dt class="text-xs font-semibold text-muted">${c(s.label)}</dt>
              <dd class="mt-1.5 break-words text-sm font-bold text-ink">${Rt(s,a[s.name],r)}</dd>
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
            <p class="mt-0.5 text-xs text-muted">${B(a.created_at)}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-primary">แก้ไขล่าสุด</p>
            <p class="mt-1 text-xs text-muted">${c(a.updated_by||"ไม่ระบุ")}</p>
            <p class="mt-0.5 text-xs text-muted">${B(a.updated_at)}</p>
          </div>
        </div>
        <div class="mt-5 rounded-xl bg-[#f4f8f4] p-3 text-[11px] leading-relaxed text-muted">
          การเปลี่ยนแปลงถูกบันทึกใน Audit Log ของระบบ
        </div>
      </aside>
    </div>
  `}function De({module:e,group:t,record:a=null,errors:r={},values:s=null,references:n=P}){const i=!!a,o={...s||Ce||a||{}};if(!i&&!o.service_date){const d=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Bangkok",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date),m=u=>d.find(p=>p.type===u).value;o.service_date=`${m("year")}-${m("month")}-${m("day")}`}const l=`${i?"แก้ไข":"เพิ่ม"}ข้อมูล${e.short}`;return`
    ${Z(t?.label||"",l,i?"ตรวจสอบและแก้ไขรายละเอียดรายการนี้":"กรอกข้อมูลการดำเนินงานให้ครบตามช่องที่กำหนด")}
    <section class="panel-shadow w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-5 py-5 sm:px-7">
        <h2 class="font-bold">รายละเอียดการดำเนินงาน</h2>
        <p class="mt-1 text-xs text-muted">ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p>
      </div>
      <form id="record-form" data-module="${e.id}" data-id="${a?c(a.id):""}" novalidate class="p-5 sm:p-7">
        <div class="grid min-w-0 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          ${e.fields.map(d=>{const m=xt(d,o[d.name]??"",r[d.name],n);if(!d.wasteTypeCode)return m;const u=nt(o.waste_type_id,n),p=xt(d,u?o.hazardous_waste_name??"":"",r.hazardous_waste_name,n).replace('name="hazardous_waste_name"',`name="hazardous_waste_name" ${u?"":"disabled"}`);return`<div class="min-w-0" data-hazardous-waste-field ${u?"":"hidden"}>${p}</div>`}).join("")}
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
  `}async function Ma(e,t,{navigate:a=U,showToast:r=R}={}){if(await st({title:"ยืนยันการลบรายการ",message:"รายการนี้จะถูกลบออกจากฐานข้อมูลอย่างถาวร คุณต้องการดำเนินการต่อหรือไม่?",confirmText:"ลบรายการ",variant:"danger",iconName:"trash"}))try{const n=`${xe(e)}/${t}`;await I(n,{method:"DELETE"}),r("ลบรายการเรียบร้อยแล้ว"),a(`/module/${e}`)}catch(n){r(n.message||"ไม่สามารถลบรายการได้","error")}}async function Ra(e){const t=e.dataset.module,a=Q.find(i=>i.id===t);if(!a)return;const{data:r,errors:s}=Aa(e,a,P),n=e.dataset.id?{id:e.dataset.id}:null;if(Object.keys(s).length){Ce=r;const i=be.find(d=>d.id===a.group),o=De({module:a,group:i,record:n,errors:s,values:r,references:P}),l=document.querySelector("#main-content");l&&(l.innerHTML=o),document.querySelector('[aria-invalid="true"]')?.focus();return}try{const i=n?`${xe(a.id)}/${n.id}`:xe(a.id),l=await I(i,{method:n?"PUT":"POST",body:r});Ce=null,U(`/module/${a.id}/${l.data.id}`),R("บันทึกข้อมูลแล้ว")}catch(i){Ce=r;const o=i.fieldErrors||Object.fromEntries(Object.entries(i.fields||{}).map(([u,p])=>[u,Array.isArray(p)?p[0]:p]));R(i.message||"ไม่สามารถบันทึกข้อมูลได้","error");const l=be.find(u=>u.id===a.group),d=De({module:a,group:l,record:n,errors:o,values:r,references:P}),m=document.querySelector("#main-content");m&&(m.innerHTML=d),document.querySelector('[aria-invalid="true"]')?.focus()}}async function Ia(e){const t=e.parts[1],a=Q.find(o=>o.id===t);if(!a)return'<div class="p-8 text-center text-muted">ไม่พบข้อมูลโมดูลงานบริการ</div>';const r=be.find(o=>o.id===a.group);if(e.parts.length===2){const[o]=await Promise.all([ja(t,e.params),Ve(a)]);if(!e.isCurrent())return null;const l=Math.max(1,Number.parseInt(e.params.get("page"),10)||1),d=Math.max(1,Number(o.meta?.last_page)||1);if(Number(o.meta?.total)>0&&l>d){const m=new URLSearchParams(e.params);return m.set("page",String(d)),U(`/module/${t}?${m}`),null}return Ca({module:a,group:r,params:e.params,records:o.data,references:P,meta:o.meta})}if(e.parts.length===3&&e.parts[2]==="new")return $(`${a.id}.create`)?(await Ve(a),De({module:a,group:r,record:null,references:P})):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์สร้างข้อมูลในหมวดนี้</div>';const s=decodeURIComponent(e.parts[2]||"");let n;try{[n]=await Promise.all([I(`${xe(t)}/${encodeURIComponent(s)}`),Ve(a)])}catch(o){if(o.status===404)return'<div class="p-8 text-center text-muted">ไม่พบรายการข้อมูลที่ต้องการ</div>';throw o}if(!e.isCurrent())return null;const i=n.data;return e.parts.length===4&&e.parts[3]==="edit"?$(`${a.id}.update`)?De({module:a,group:r,record:i,references:P}):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์แก้ไขข้อมูลในหมวดนี้</div>':Da({module:a,group:r,record:i,references:P})}let ge=[],ve=[];const It=new Set;async function ze(e){if(!$(`${e}.view`))return;const t=await yt(He(e));e==="cleaning-zones"&&(ge=t),e==="waste-types"&&(ve=t),It.add(e)}function Ht(e){return Number(e.usage_count)||0}function Pt(e){return Number(e.usage_count)||0}function Ha({params:e,zones:t=ge}){const a=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),r=e.get("sort")==="name"?"name":"code",s=e.get("status")||"all",n=10,i=t.filter(u=>!a||(u.code+" "+u.name).toLocaleLowerCase("th-TH").includes(a)).filter(u=>s==="all"?!0:s==="active"?u.is_active:!u.is_active).sort((u,p)=>String(u[r]).localeCompare(String(p[r]),"th",{numeric:!0})),o=Math.max(1,Math.ceil(i.length/n)),l=Math.min(o,Math.max(1,Number.parseInt(e.get("page"),10)||1)),d=i.slice((l-1)*n,l*n),m=u=>{const p=new URLSearchParams;return e.get("q")&&p.set("q",e.get("q")),s!=="all"&&p.set("status",s),r!=="code"&&p.set("sort",r),u>1&&p.set("page",String(u)),"#/cleaning-zones"+(p.size?"?"+p:"")};return`
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
        <p class="mt-1 text-xs text-muted">พบ ${_(i.length)} รายการ</p>
      </div>
      ${d.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${d.map(u=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/cleaning-zones/${encodeURIComponent(u.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${c(u.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${c(u.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานล้างถนน ${_(Ht(u))} รายการ</span>
            ${f("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบเขตรักษาความสะอาด</h3>
        <p class="mt-2 text-sm text-muted">${a?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มเขต"}</p>
        <div class="mt-5">${a?le("แสดงทั้งหมด","#/cleaning-zones"):he("เพิ่มเขต","#/cleaning-zones/new")}</div>
      </div>`}
      ${i.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${_((l-1)*n+1)}–${_(Math.min(l*n,i.length))} จาก ${_(i.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===1?"pointer-events-none opacity-45":""}" href="${m(l-1)}" ${l===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${l} / ${o}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===o?"pointer-events-none opacity-45":""}" href="${m(l+1)}" ${l===o?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function Pa({zone:e}){const t=Ht(e),a=Number(e.referenced_count)||0;return`
    ${Z("ข้อมูลพื้นฐาน",e.name,"รายละเอียดเขตรักษาความสะอาด",`
      <div class="flex flex-wrap gap-2">
        ${le("แก้ไข",`#/cleaning-zones/${encodeURIComponent(e.id)}/edit`,"edit")}
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
          <dd class="mt-1 font-bold">${_(t)} รายการ</dd>
        </div>
      </dl>
      ${a?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">เขตนี้ยังมีรายการล้างถนนอ้างอิงอยู่ รวมถึงรายการที่ลบออกจากหน้าจอ จึงไม่สามารถลบเขตได้</p>':""}
    </section>
  `}function Ye(e=null,t={},a=e||{}){const s=!!e?"แก้ไขเขตรักษาความสะอาด":"เพิ่มเขตรักษาความสะอาด",n=(i,o,l)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="zone-${i}">
        ${c(o)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="zone-${i}" name="${i}" type="text" maxlength="${l}" required value="${c(a[i]||"")}" aria-describedby="zone-${i}-error" ${t[i]?'aria-invalid="true"':""}>
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
  `}function za({params:e,wasteTypes:t=ve}){const a=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),r=10,s=t.filter(d=>!a||(d.code+" "+d.name).toLocaleLowerCase("th-TH").includes(a)).sort((d,m)=>String(d.code).localeCompare(String(m.code),"th",{numeric:!0})),n=Math.max(1,Math.ceil(s.length/r)),i=Math.min(n,Math.max(1,Number.parseInt(e.get("page"),10)||1)),o=s.slice((i-1)*r,i*r),l=d=>{const m=new URLSearchParams;return e.get("q")&&m.set("q",e.get("q")),d>1&&m.set("page",String(d)),"#/waste-types"+(m.size?"?"+m:"")};return`
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
        <p class="mt-1 text-xs text-muted">พบ ${_(s.length)} รายการ</p>
      </div>
      ${o.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${o.map(d=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/waste-types/${encodeURIComponent(d.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${c(d.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${c(d.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานบริหารจัดการมูลฝอย ${_(Pt(d))} รายการ</span>
            ${f("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบประเภทขยะมูลฝอย</h3>
        <p class="mt-2 text-sm text-muted">${a?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มประเภท"}</p>
        <div class="mt-5">${a?le("แสดงทั้งหมด","#/waste-types"):he("เพิ่มประเภท","#/waste-types/new")}</div>
      </div>`}
      ${s.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${_((i-1)*r+1)}–${_(Math.min(i*r,s.length))} จาก ${_(s.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${i===1?"pointer-events-none opacity-45":""}" href="${l(i-1)}" ${i===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${i} / ${n}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${i===n?"pointer-events-none opacity-45":""}" href="${l(i+1)}" ${i===n?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function Ba({wasteType:e}){const t=Pt(e),a=Number(e.referenced_count)||0;return`
    ${Z("ข้อมูลพื้นฐาน",e.name,"รายละเอียดประเภทขยะมูลฝอย",`
      <div class="flex flex-wrap gap-2">
        ${le("แก้ไข",`#/waste-types/${encodeURIComponent(e.id)}/edit`,"edit")}
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
          <dd class="mt-1 font-bold">${_(t)} รายการ</dd>
        </div>
      </dl>
      ${a?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">ประเภทนี้ยังมีรายการมูลฝอยอ้างอิงอยู่ รวมถึงรายการที่ลบออกจากหน้าจอ จึงไม่สามารถลบประเภทได้</p>':""}
    </section>
  `}function Ge(e=null,t={},a=e||{}){const s=!!e?"แก้ไขประเภทขยะมูลฝอย":"เพิ่มประเภทขยะมูลฝอย",n=(i,o,l)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="wasteType-${i}">
        ${c(o)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="wasteType-${i}" name="${i}" type="text" maxlength="${l}" required value="${c(a[i]||"")}" aria-describedby="wasteType-${i}-error" ${t[i]?'aria-invalid="true"':""}>
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
  `}async function Na(e,t,a,r,{navigate:s=U,showToast:n=R,refreshData:i=ze}={}){if(r>0){n(`ไม่สามารถลบ "${a}" ได้เนื่องจากมีข้อมูลงานบริการที่อ้างอิงอยู่`,"error");return}const o=e==="cleaning-zones"?"เขต":"ประเภทขยะ";if(await st({title:`ยืนยันการลบ${o}`,message:`คุณต้องการลบ "${a}" ออกจากระบบใช่หรือไม่?`,confirmText:`ลบ${o}`,variant:"danger",iconName:"trash"}))try{const d=`${He(e)}/${t}`;await I(d,{method:"DELETE"}),n(`ลบ${o}เรียบร้อยแล้ว`),await i(e),Mt(e),s(`/${e}`)}catch(d){n(d.message||`ไม่สามารถลบ${o}ได้`,"error")}}async function ht(e,t){const a=e.dataset.id,r=Object.fromEntries(new FormData(e));r.is_active=e.elements.namedItem("is_active")?.checked??!0;try{const s=`${He(t)}${a?`/${a}`:""}`,n=await I(s,{method:a?"PUT":"POST",body:r});await ze(t),Mt(t),U(`/${t}/${n.data.id}`),R("บันทึกข้อมูลแล้ว")}catch(s){R(s.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล","error");const n=s.fieldErrors||Object.fromEntries(Object.entries(s.fields||{}).map(([m,u])=>[m,Array.isArray(u)?u[0]:u])),o=(t==="cleaning-zones"?ge:ve).find(m=>String(m.id)===a)||null,l=t==="cleaning-zones"?Ye(o,n,r):Ge(o,n,r),d=document.querySelector("#main-content");d&&(d.innerHTML=l)}}async function gt(e,t){It.has(e)||await ze(e);const a=e==="cleaning-zones",r=a?ge:ve;if(t.parts.length===1)return a?Ha({params:t.params,zones:ge}):za({params:t.params,wasteTypes:ve});if(t.parts.length===2&&t.parts[1]==="new")return a?Ye():Ge();const s=decodeURIComponent(t.parts[1]||""),n=r.find(i=>String(i.id)===s);return n?t.parts.length===3&&t.parts[2]==="edit"?a?Ye(n):Ge(n):a?Pa({zone:n}):Ba({wasteType:n}):'<div class="p-8 text-center text-muted">ไม่พบข้อมูลอ้างอิงที่ต้องการ</div>'}function Fa(){const e=window.serviceHubUser||{},t=kt(e.name||e.username||"U"),a=e.roles||[],r=a[0]||"staff",s=de[r]||{label:r,color:"border-gray-200 bg-gray-50 text-gray-700"};return`
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
                ${a.map(n=>{const i=de[n]||{label:n,color:"border-gray-200 bg-gray-50"};return`<span class="rounded-lg border px-2.5 py-1 text-xs font-medium ${i.color}">${c(i.label)}</span>`}).join("")}
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
  `}function Oa({toastFn:e=R,onNameUpdated:t}={}){const a=document.getElementById("profile-name-form"),r=document.getElementById("profile-password-form");document.querySelectorAll('[data-action="toggle-pwd"]').forEach(s=>{s.addEventListener("click",()=>{const n=s.dataset.target,i=document.getElementById(n);if(!i)return;const o=i.type==="password";i.type=o?"text":"password",s.innerHTML=f(o?"eyeOff":"eye",18),s.setAttribute("aria-label",o?"ซ่อนรหัสผ่าน":"แสดงรหัสผ่าน"),s.setAttribute("aria-pressed",String(o))})}),document.getElementById("profile-gen-pwd")?.addEventListener("click",()=>{const s="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",n=new Uint8Array(16);crypto.getRandomValues(n);const i=Array.from(n).map(d=>s[d%s.length]).join(""),o=document.getElementById("profile-new-pwd"),l=document.getElementById("profile-confirm-pwd");if(o){o.value=i,o.type="text";const d=document.querySelector('[data-target="profile-new-pwd"]');d&&(d.innerHTML=f("eyeOff",18),d.setAttribute("aria-label","ซ่อนรหัสผ่าน"),d.setAttribute("aria-pressed","true"))}if(l){l.value=i,l.type="text";const d=document.querySelector('[data-target="profile-confirm-pwd"]');d&&(d.innerHTML=f("eyeOff",18),d.setAttribute("aria-label","ซ่อนรหัสผ่าน"),d.setAttribute("aria-pressed","true"))}}),a?.addEventListener("submit",async s=>{s.preventDefault();const n=document.getElementById("profile-name"),i=document.getElementById("profile-name-error"),o=document.getElementById("profile-name-submit"),l=n.value.trim();if(!l){i&&(i.textContent="กรุณาระบุชื่อ-นามสกุล",i.classList.remove("hidden")),n.focus();return}i&&i.classList.add("hidden"),o&&(o.disabled=!0,o.classList.add("opacity-50"));try{const d=window.serviceHubUrls?.apiProfile||"/api/profile",m=await I(d,{method:"PUT",body:{name:l}});window.serviceHubUser&&(window.serviceHubUser.name=m.data?.name||l),e("บันทึกข้อมูลชื่อเรียบร้อยแล้ว"),typeof t=="function"&&t(l)}catch(d){const m=d.errors?.name?.[0]||d.message||"ไม่สามารถบันทึกชื่อได้";i&&(i.textContent=m,i.classList.remove("hidden")),e(m,"error")}finally{o&&(o.disabled=!1,o.classList.remove("opacity-50"))}}),r?.addEventListener("submit",async s=>{s.preventDefault();const n=document.getElementById("profile-current-pwd"),i=document.getElementById("profile-new-pwd"),o=document.getElementById("profile-confirm-pwd"),l=document.getElementById("profile-current-pwd-error"),d=document.getElementById("profile-new-pwd-error"),m=document.getElementById("profile-confirm-pwd-error"),u=document.getElementById("profile-pwd-submit");l.classList.add("hidden"),d.classList.add("hidden"),m.classList.add("hidden");let p=!1;if(n.value||(l.textContent="กรุณาระบุรหัสผ่านปัจจุบัน",l.classList.remove("hidden"),p=!0),(!i.value||i.value.length<15)&&(d.textContent="รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 15 ตัวอักษร",d.classList.remove("hidden"),p=!0),i.value!==o.value&&(m.textContent="รหัสผ่านยืนยันไม่ตรงกับรหัสผ่านใหม่",m.classList.remove("hidden"),p=!0),i.value&&n.value&&i.value===n.value&&(d.textContent="รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านปัจจุบัน",d.classList.remove("hidden"),p=!0),!p){u&&(u.disabled=!0,u.classList.add("opacity-50"));try{const b=window.serviceHubUrls?.apiProfilePassword||"/api/profile/password";await I(b,{method:"PUT",body:{current_password:n.value,password:i.value,password_confirmation:o.value}}),n.value="",i.value="",o.value="",e("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว เซสชันในอุปกรณ์อื่นถูกยกเลิกแล้ว")}catch(b){b.errors?.current_password&&(l.textContent=b.errors.current_password[0],l.classList.remove("hidden")),b.errors?.password&&(d.textContent=b.errors.password[0],d.classList.remove("hidden")),!b.errors?.current_password&&!b.errors?.password&&e(b.message||"เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน","error")}finally{u&&(u.disabled=!1,u.classList.remove("opacity-50"))}}})}function Va(e){return setTimeout(()=>{Oa()},0),Fa()}let Me=[],Re={current_page:1,last_page:1};function Za({params:e,auditRows:t=Me,auditMeta:a=Re}){if(!$("audit-logs.view"))return`
      <div class="panel-shadow mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-white p-10 text-center">
        <h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึง</h1>
        <p class="mt-2 text-sm text-muted">คุณไม่มีสิทธิ์ในการดูประวัติการแก้ไขข้อมูลของระบบ</p>
      </div>
    `;const r=e.get("q")||"",s=e.get("action")||"all",n=e.get("from")||"",i=e.get("to")||"",o=d=>{const m=new URLSearchParams;return r&&m.set("q",r),s!=="all"&&m.set("action",s),n&&m.set("from",n),i&&m.set("to",i),m.set("page",String(d)),`#/audit-logs?${m}`},l=!!(r||s!=="all"||n||i);return`
    ${Z("การจัดการระบบ","ประวัติการแก้ไข","บันทึกการเพิ่ม แก้ไข และลบข้อมูลการปฏิบัติงานในระบบ")}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 mb-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองประวัติ</h2>
        ${Pe({from:n,to:i,formId:"audit-filter"})}
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
            <time class="text-xs text-muted" datetime="${c(d.created_at)}">${B(d.created_at)}</time>
          </div>
        `).join(""):'<p class="py-8 text-center text-sm text-muted">ไม่มีประวัติการแก้ไขที่ตรงกับเงื่อนไข</p>'}
      </div>
      ${a.last_page>1?`
      <div class="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>หน้า ${a.current_page} / ${a.last_page}</span>
        <div class="flex gap-2">
          ${a.current_page>1?le("ก่อนหน้า",o(a.current_page-1)):""}
          ${a.current_page<a.last_page?le("ถัดไป",o(a.current_page+1)):""}
        </div>
      </div>`:""}
    </section>
  `}async function Wa(e=new URLSearchParams){if(!$("audit-logs.view"))return{data:[],meta:{current_page:1,last_page:1}};try{const t=window.serviceHubUrls?.apiAudit||"/api/audit-logs",a=await I(`${t}?${e.toString()}`);return Me=a.data??[],Re=a.meta??{current_page:1,last_page:1},{data:Me,meta:Re}}catch(t){throw t}}async function Ka(e){try{await Wa(e.params)}catch(t){console.error("Error fetching audit logs:",t)}return Za({params:e.params,auditRows:Me,auditMeta:Re})}function Ya({module:e,params:t,data:a,meta:r,loading:s,error:n,modules:i,groups:o,can:l,esc:d,number:m,thaiDate:u,moduleHref:p}){const b=new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Bangkok"}).slice(0,7),h=t.has("from")||t.has("to")?"custom":"month",w=t.get("month")||b,k=new URLSearchParams;h==="custom"?(k.set("from",t.get("from")||""),k.set("to",t.get("to")||"")):t.has("month")&&k.set("month",w);const S=k.size?`?${k}`:"",j=g=>`#/reports/${encodeURIComponent(g)}${S}`,E=e?window.serviceHubUrls.apiReportDetailExport.replace("__MODULE__",encodeURIComponent(e.id))+S:window.serviceHubUrls.apiReportsExport+S,A=e?l(`${e.id}.export`):i.some(g=>l(`${g.id}.export`)),y=e?e.short:"ภาพรวมงานบริการ",ae=r?.period,v=r?.comparison,D=g=>g?`${u(g.from)} – ${u(g.to)}`:"—",W=e?a?.count:r?.total,G=e?a?.previous_count:r?.previous_total,ce=G===0||G==null?null:Math.round((W-G)*1e3/G)/10,we=(g,H)=>Object.entries(g?.quantities||{}).flatMap(([z,M])=>M.map(C=>{const ye=H.fields.find(Zt=>Zt.name===z)?.label||z,it=C.kind==="latest";return`<div class="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-line py-2 text-sm"><span class="text-muted">${d(ye)}${it?" (ค่าล่าสุด)":""}</span><strong class="min-w-0 break-words text-ink">${C.total==null?"—":`${m(C.total)} ${d(C.unit||"")}`}</strong>${it&&C.as_of?`<span class="w-full text-xs text-muted">ณ ${u(C.as_of)}</span>`:""}</div>`})).join(""),Be=`
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
          ${A?`<a class="inline-flex min-h-11 items-center rounded-xl border border-line px-4 font-semibold text-primary" href="${d(E)}">ส่งออกสรุป CSV</a>`:""}
        </div>
      </form>
    </section>
  `;let x="";if(s)x='<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังโหลดรายงาน…</section>';else if(n)x=`<section class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-6" role="alert"><p class="font-semibold text-red-700">${d(n)}</p><button type="button" data-action="retry-report" class="no-print mt-3 min-h-11 rounded-xl border border-red-200 bg-white px-4 font-semibold">ลองอีกครั้ง</button></section>`;else if(!r||!a)x='<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังเตรียมรายงาน…</section>';else{const g=`<section class="grid gap-3 sm:grid-cols-3"><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">รายการในช่วงที่เลือก</p><strong class="mt-2 block text-3xl text-ink">${m(W)}</strong><p class="mt-2 text-xs text-muted">${D(ae)}</p></div><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">ช่วงเปรียบเทียบ</p><strong class="mt-2 block text-3xl text-ink">${m(G)}</strong><p class="mt-2 text-xs text-muted">${D(v)}</p></div><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">การเปลี่ยนแปลงจำนวนรายการ</p><strong class="mt-2 block text-2xl text-ink">${ce==null?"เปรียบเทียบเป็นร้อยละไม่ได้":`${ce>0?"+":""}${m(ce)}%`}</strong><p class="mt-2 text-xs text-muted">${G===0?"ช่วงเปรียบเทียบไม่มีรายการ":"เทียบกับช่วงก่อนหน้า"}</p></div></section>`;if(e){const H=a.breakdown?.length?`<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">แยกตาม${e.id==="road-washings"?"เขตรักษาความสะอาด":"ประเภทขยะมูลฝอย"}</h2><div class="mt-3 divide-y divide-line">${a.breakdown.map(M=>`<div class="grid gap-1 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_auto_auto]"><span>${d(M.name)}</span><span>${m(M.count)} รายการ</span><strong class="min-w-0 break-words">${m(M.total)} ${d(M.unit)}</strong></div>`).join("")}</div></section>`:"",z=`<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">รายการล่าสุดตามวันที่ดำเนินงาน</h2>${a.recent?.length?`<ol class="mt-3 divide-y divide-line">${a.recent.map(M=>`<li class="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><div><strong>${d(M.title||"รายการงานบริการ")}</strong><p class="text-xs text-muted">${u(M.service_date)}</p></div><a class="no-print inline-flex min-h-11 items-center font-bold text-primary underline" href="${p(e.id)}/${encodeURIComponent(M.id)}">ดูรายการ</a></li>`).join("")}</ol>`:'<p class="mt-3 text-sm text-muted">ไม่มีรายการในช่วงที่เลือก</p>'}</section>`;x=`${g}<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">ปริมาณงานตามตัวชี้วัด</h2><p class="mt-1 text-xs text-muted">แสดงแต่ละหน่วยแยกกัน; ค่าคงเหลือเป็นค่าล่าสุด</p><div class="mt-3">${we(a,e)}</div></section>${H}${z}<a class="no-print inline-flex min-h-11 items-center font-bold text-primary underline" href="${p(e.id)}">ไปหน้ารายการ${d(e.short)}</a>`}else{const z=`<section><h2 class="mb-3 text-lg font-bold">ภาพรวม 4 กลุ่มงาน</h2><div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">${o.filter(C=>i.some(ye=>ye.group===C.id&&l(`${ye.id}.view`))).map(C=>`<div class="panel-shadow rounded-2xl border border-line bg-white p-5"><h3 class="text-sm font-semibold">${d(C.label)}</h3><strong class="mt-2 block text-2xl">${m(r.groups?.[C.id]||0)}</strong><span class="text-xs text-muted">รายการในช่วงที่เลือก</span></div>`).join("")}</div></section>`,M=i.filter(C=>l(`${C.id}.view`)).map(C=>`<article class="panel-shadow rounded-2xl border border-line bg-white p-5"><h3 class="font-bold">${d(C.short)}</h3><p class="mt-2 text-sm"><strong class="text-xl">${m(a[C.id]?.count||0)}</strong> รายการ</p><div class="mt-3">${we(a[C.id],C)||'<p class="text-sm text-muted">ไม่มีตัวชี้วัดปริมาณ</p>'}</div><a class="no-print mt-4 inline-flex min-h-11 items-center font-bold text-primary underline" href="${j(C.id)}">ดูรายงานหมวดนี้</a></article>`).join("");x=`${g}${z}<section><h2 class="mb-3 text-lg font-bold">รายงานครบ 9 หมวด</h2><div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">${M||'<p class="text-muted">ไม่มีหมวดที่ได้รับสิทธิ์ดู</p>'}</div></section>`}}return`<div class="report-page space-y-5"><div class="flex flex-wrap items-start justify-between gap-3"><div><p class="text-xs font-bold tracking-wider text-primary">รายงานงานบริการ</p><h1 class="mt-1 text-2xl font-bold sm:text-3xl">${d(y)}</h1><p class="mt-2 text-sm text-muted">ข้อมูลจริงจากวันที่ดำเนินงาน ตามสิทธิ์ของคุณ</p></div>${e?`<a class="no-print inline-flex min-h-11 items-center font-semibold text-primary underline" href="#/reports${S}">กลับภาพรวม</a>`:""}</div>${Be}${x}</div>`}const V=document.querySelector("#app");let zt=null,Xe=!1,Qe="",Ee=0,Bt={},Nt=null,Ft=null,Je=!1,et="",Le=0,tt=0;async function Ot(e=null){const t=++Ee,{params:a}=Y(),r=()=>e?e.isCurrent():Y().parts[0]==="dashboard";Xe=!0,Qe="",r()&&vt();try{const s=new URLSearchParams;a.get("from")&&s.set("from",a.get("from")),a.get("to")&&s.set("to",a.get("to"));const n=(window.serviceHubUrls?.apiDashboard||"/api/dashboard")+(s.size?`?${s}`:""),i=await I(n);if(t!==Ee||!r())return;zt=i.data}catch(s){if(t!==Ee||!r())return;Qe=s.message||"ไม่สามารถโหลดภาพรวมได้"}finally{t===Ee&&r()&&(Xe=!1,vt())}}function vt(){if(Y().parts[0]!=="dashboard")return;const{params:e}=Y(),t=va({data:zt,loading:Xe,error:Qe,params:e,groups:be,modules:Q,icon:f,esc:c,number:_,moduleHref:ne});V.innerHTML=K(t,null,[{label:"แดชบอร์ดฝ่ายบริการ",current:!0}],!0),ie()}async function Vt(e,t,a=null){const r=e[1]?Q.find(o=>o.id===e[1]):null,s=++Le,n=Y().hash,i=()=>a?a.isCurrent():Y().hash===n;Je=!0,et="",i()&&await wt(e,t);try{const o=window.serviceHubUrls?.apiReportDetail||"/api/reports/__MODULE__",l=window.serviceHubUrls?.apiReports||"/api/reports",d=(r?o.replace("__MODULE__",encodeURIComponent(r.id)):l)+(t.size?`?${t}`:""),m=await I(d);if(s!==Le||!i())return;Ft=m.meta,r?Nt=m.data:Bt=m.data}catch(o){if(s!==Le||!i())return;et=o.fields?.to?.[0]||o.fields?.from?.[0]||o.fields?.month?.[0]||o.message||"โหลดรายงานไม่สำเร็จ"}finally{s===Le&&i()&&(Je=!1,await wt(e,t))}}async function wt(e,t){if(Y().parts[0]!=="reports"||Y().parts[1]!==e[1])return;const a=e[1]?Q.find(n=>n.id===e[1]):null,r=Ya({module:a,params:t,data:a?Nt:Bt,meta:Ft,loading:Je,error:et,modules:Q,groups:be,can:$,esc:c,number:_,thaiDate:B,moduleHref:ne}),s=a?[{label:"รายงาน",href:"#/reports"},{label:a.short,current:!0}]:[{label:"รายงาน",current:!0}];V.innerHTML=K(r,"reports",s),ie()}const Ga={dashboard:async e=>{re("dashboard"),await Ot(e)},users:async e=>{if(!Ie()){U("#/dashboard"),R("คุณไม่มีสิทธิ์เข้าถึงหน้านี้","error");return}re("users"),V.innerHTML=K(Ta(),"users",[{label:"จัดการผู้ใช้งาน",current:!0}]),ie()},module:async e=>{const t=e.parts[1];if(t&&!$(`${t}.view`)){U("#/dashboard"),R("คุณไม่มีสิทธิ์เข้าถึงหมวดงานบริการนี้","error");return}re(t);const a=Q.find(n=>n.id===t),r=a?[{label:a.short,current:!0}]:[];(document.querySelector("#filter-form")?.dataset.module!==t||e.parts.length>2)&&(V.innerHTML=K('<section class="panel-shadow rounded-2xl border border-line bg-white p-6" role="status">กำลังโหลดข้อมูล...</section>',t,r));const s=await Ia(e);e.isCurrent()&&(V.innerHTML=K(s,t,r),ie())},"cleaning-zones":async e=>{if(!$("cleaning-zones.view")){U("#/dashboard");return}re("cleaning-zones");const t=await gt("cleaning-zones",e);e.isCurrent()&&(V.innerHTML=K(t,"cleaning-zones",[{label:"เขตรักษาความสะอาด",current:!0}]),ie())},"waste-types":async e=>{if(!$("waste-types.view")){U("#/dashboard");return}re("waste-types");const t=await gt("waste-types",e);e.isCurrent()&&(V.innerHTML=K(t,"waste-types",[{label:"ประเภทขยะมูลฝอย",current:!0}]),ie())},profile:async e=>{re("profile"),V.innerHTML=K(Va(),"profile",[{label:"โปรไฟล์ของฉัน",current:!0}])},"audit-logs":async e=>{if(!$("audit-logs.view")){U("#/dashboard");return}re("audit-logs");const t=await Ka(e);e.isCurrent()&&(V.innerHTML=K(t,"audit-logs",[{label:"ประวัติการแก้ไข",current:!0}]))},reports:async e=>{re("reports"),await Vt(e.parts,e.params,e)},"*":()=>{U("#/dashboard")}};function Xa(){document.addEventListener("keydown",t=>{if(t.key==="Escape"&&(Fe(),Ne(!1)),t.key==="Tab"&&window.innerWidth<1024){const a=document.getElementById("sidebar");if(a&&a.classList.contains("translate-x-0")){const r=[...a.querySelectorAll("a[href], button:not([disabled])")].filter(s=>!s.closest("[hidden]"));r.length&&(t.shiftKey&&document.activeElement===r[0]?(t.preventDefault(),r[r.length-1]?.focus()):!t.shiftKey&&document.activeElement===r[r.length-1]&&(t.preventDefault(),r[0]?.focus()))}}}),document.addEventListener("click",async t=>{const a=t.target.closest("[data-action]");if(t.target.closest("#user-menu-container")||Fe(),t.target.closest(".relative")||document.querySelectorAll(".custom-select-menu").forEach(s=>s.classList.add("hidden")),!a)return;const r=a.dataset.action;if(r==="open-menu"){Ne(!0),document.querySelector('#sidebar [data-action="close-menu"]')?.focus();return}if(r==="close-menu"){Ne(!1),document.querySelector('[data-action="open-menu"]')?.focus();return}if(r==="toggle-user-menu"){ca();return}if(r==="close-user-menu"){Fe();return}if(r==="toggle-sidebar-group"||r==="toggle-sidebar-subgroup"){ma(a.dataset.group),a.setAttribute("aria-expanded",String(a.getAttribute("aria-expanded")!=="true"));const s=document.getElementById(a.getAttribute("aria-controls"));s&&(s.hidden=!s.hidden),a.querySelector("svg:last-child")?.classList.toggle("rotate-180");return}if(r==="delete-activity"){const s=a.dataset.module,n=a.dataset.id;await Ma(s,n,{navigate:U,showToast:R});return}if(r==="delete-reference"){const s=a.dataset.type,n=a.dataset.id,i=a.dataset.name,o=Number(a.dataset.usage)||0;await Na(s,n,i,o,{navigate:U,showToast:R,refreshData:ze});return}if(r==="print-report"){window.print();return}if(r==="retry-dashboard"){Ot();return}if(r==="retry-report"){const{parts:s,params:n}=Y();Vt(s,n);return}if(r==="retry-route"){if(Date.now()<tt){R(`กรุณารออีก ${Math.ceil((tt-Date.now())/1e3)} วินาทีก่อนลองใหม่`,"error");return}U(Y().hash);return}if(r==="toggle-mobile-filters"){const s=a.getAttribute("aria-expanded")==="true",n=document.getElementById(a.getAttribute("aria-controls"));a.setAttribute("aria-expanded",String(!s)),a.querySelector("svg")?.classList.toggle("rotate-180",!s),n?.classList.toggle("hidden",s),n?.classList.toggle("flex",!s);return}if(r==="set-date-preset"){const s=a.dataset.from,n=a.dataset.to,i=a.dataset.form,o=i?document.getElementById(i):a.closest("form");if(o){if(o.elements.period_mode){const l=o.querySelector('input[name="period_mode"][value="custom"]');l&&(l.checked=!0,l.dispatchEvent(new Event("change",{bubbles:!0})))}o.elements.from&&(o.elements.from.value=s),o.elements.to&&(o.elements.to.value=n),We(o),o.requestSubmit?o.requestSubmit():o.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0}))}return}}),document.addEventListener("submit",async t=>{if(t.target.id==="record-form"){t.preventDefault(),Ra(t.target);return}if(t.target.id==="zone-form"){t.preventDefault(),ht(t.target,"cleaning-zones");return}if(t.target.id==="wasteType-form"){t.preventDefault(),ht(t.target,"waste-types");return}if(t.target.id==="dashboard-filter"){t.preventDefault();const a=t.target,r=a.elements.from.value,s=a.elements.to.value,n=a.parentElement.querySelector("#dashboard-filter-error");if(!r&&!s){n&&n.classList.add("hidden"),U("/dashboard");return}if(!r||!s||r>s){n&&(n.textContent=!r||!s?"กรุณาระบุวันที่เริ่มต้นและสิ้นสุด":"วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น",n.classList.remove("hidden"));return}n&&n.classList.add("hidden"),U(`/dashboard?${new URLSearchParams({from:r,to:s})}`);return}if(t.target.id==="report-filter"){t.preventDefault();const a=t.target,r=a.elements.period_mode?.value,s=new URLSearchParams;if(r==="month"){if(!a.elements.month?.value)return;s.set("month",a.elements.month.value)}else{const i=a.elements.from?.value,o=a.elements.to?.value,l=a.querySelector("#report-filter-error");if(!i||!o||i>o){l&&(l.textContent=!i||!o?"กรุณาระบุวันที่เริ่มต้นและสิ้นสุด":"วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น");return}l&&(l.textContent=""),s.set("from",i),s.set("to",o)}const n=`#/reports${a.dataset.reportModule?`/${a.dataset.reportModule}`:""}?${s}`;U(n.replace("#",""));return}if(t.target.id==="filter-form"){t.preventDefault();const a=t.target,r=new URLSearchParams;new FormData(a).forEach((n,i)=>{const o=String(n).trim();o&&!(i==="sort"&&o==="newest")&&r.set(i,o)});const s=`#/module/${a.dataset.module}${r.size?`?${r}`:""}`;s!==Y().hash&&U(s);return}if(t.target.id==="zone-filter"){t.preventDefault();const a=new FormData(t.target),r=new URLSearchParams;String(a.get("q")||"").trim()&&r.set("q",String(a.get("q")).trim()),a.get("status")&&a.get("status")!=="all"&&r.set("status",a.get("status")),a.get("sort")==="name"&&r.set("sort","name"),U(`/cleaning-zones${r.size?`?${r}`:""}`);return}if(t.target.id==="wasteType-filter"){t.preventDefault();const a=new FormData(t.target),r=new URLSearchParams;String(a.get("q")||"").trim()&&r.set("q",String(a.get("q")).trim()),U(`/waste-types${r.size?`?${r}`:""}`);return}if(t.target.id==="audit-filter"){t.preventDefault();const a=new FormData(t.target),r=new URLSearchParams;String(a.get("q")||"").trim()&&r.set("q",String(a.get("q")).trim()),a.get("action")&&a.get("action")!=="all"&&r.set("action",a.get("action")),a.get("from")&&r.set("from",a.get("from")),a.get("to")&&r.set("to",a.get("to")),U(`/audit-logs${r.size?`?${r}`:""}`);return}});const e=la(t=>{t&&t.isConnected&&(t.requestSubmit?t.requestSubmit():t.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))},500);document.addEventListener("input",t=>{if(t.target.dataset.action==="live-filter"&&t.target.type!=="date"){const a=t.target.form;a&&e(a)}}),document.addEventListener("change",t=>{if(t.target.name==="waste_type_id"&&t.target.closest("#record-form")&&Ua(t.target.form),t.target.dataset.action==="live-filter"){const a=t.target.form;a&&(a.requestSubmit?a.requestSubmit():a.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}if(t.target.name==="period_mode"&&t.target.closest("#report-filter")){const a=t.target.form,r=t.target.value==="custom",s=a.querySelector("[data-report-month]"),n=a.querySelector("[data-report-custom]");s&&(s.hidden=r),n&&(n.hidden=!r),a.elements.month&&(a.elements.month.disabled=r),a.elements.from&&(a.elements.from.disabled=!r),a.elements.to&&(a.elements.to.disabled=!r),We(a)}})}function Qa(){St(),ba(),na(V),Xa(),Qt(Ga,{onDenied:e=>{if(!e.isCurrent())return;const t='<section class="panel-shadow mx-auto max-w-lg rounded-2xl border border-line bg-white p-6 text-center" role="alert"><h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึงหน้านี้</h1><p class="mt-2 text-sm text-muted">บัญชีนี้ยังไม่ได้รับสิทธิ์ดูข้อมูลในหมวดที่เลือก</p><a href="#/dashboard" class="mt-5 inline-flex min-h-11 items-center font-bold text-primary underline">กลับแดชบอร์ด</a></section>';V.innerHTML=K(t,null,[{label:"ไม่มีสิทธิ์เข้าถึง",current:!0}])},onError:(e,t)=>{if(!t.isCurrent())return;const a=e.status===429,r=Number(e.retryAfterSeconds)||0;tt=a&&r>0?Date.now()+r*1e3:0;const s=a?"คำขอถี่เกินกำหนด":e.status===403?"ไม่มีสิทธิ์เข้าถึงข้อมูล":"โหลดหน้าไม่สำเร็จ",n=a?`กรุณารอ${r>0?` ${r} วินาที`:"สักครู่"}ก่อนลองใหม่`:e.status===403?"บัญชีนี้ยังไม่ได้รับสิทธิ์ดูข้อมูลในส่วนที่เลือก":"กรุณาลองใหม่อีกครั้ง หากยังพบปัญหาให้ติดต่อผู้ดูแลระบบ",i=`<section class="panel-shadow mx-auto max-w-lg rounded-2xl border border-red-200 bg-white p-6 text-center" role="alert"><h1 class="text-xl font-bold">${s}</h1><p class="mt-2 text-sm text-muted">${n}</p><button type="button" data-action="retry-route" class="mt-5 min-h-11 rounded-xl border border-line px-4 font-bold text-primary">ลองอีกครั้ง</button></section>`;V.innerHTML=K(i,null,[{label:"โหลดหน้าไม่สำเร็จ",current:!0}])},afterRender:()=>{ie()}})}Qa();
