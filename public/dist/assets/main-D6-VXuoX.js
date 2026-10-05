const fe=[{id:"cleaning",label:"งานบริการรักษาความสะอาด",short:"รักษาความสะอาด",icon:"sparkles",tone:"mint"},{id:"waste",label:"งานบริการมูลฝอย",short:"บริการมูลฝอย",icon:"recycle",tone:"sky"},{id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",short:"จัดการสิ่งปฏิกูล",icon:"droplet",tone:"amber"},{id:"projects",label:"งานพัฒนาระบบจัดการมูลฝอย",short:"พัฒนาระบบ",icon:"chart",tone:"violet"}],Q={name:"service_date",label:"วันที่ดำเนินงาน",type:"date",required:!0},Y=[{id:"road-washings",group:"cleaning",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",short:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",icon:"road",titleField:"location",fields:[Q,{name:"cleaning_zone_id",label:"เขตรักษาความสะอาด",type:"reference",reference:"cleaning-zones",required:!0},{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0}]},{id:"waterway-cleanings",group:"cleaning",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",short:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",icon:"waves",titleField:"waterway_name",fields:[Q,{name:"waterway_name",label:"ชื่อแหล่งน้ำ",type:"text",required:!0},{name:"distance_km",label:"ระยะทางปฏิบัติงาน",type:"number",unit:"กม.",required:!0},{name:"quantity",label:"ปริมาณที่กำจัดได้",type:"number",unit:"ตัน",required:!0}]},{id:"road-sweepings",group:"cleaning",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",short:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",icon:"sparkles",titleField:"road",fields:[Q,{name:"road",label:"ถนน",type:"text",required:!0},{name:"storage_location",label:"สถานที่จัดเก็บ",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0}]},{id:"outsourced-cleanings",group:"cleaning",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",short:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",icon:"users",titleField:"location",fields:[Q,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0},{name:"community",label:"ชุมชน",type:"text",required:!0}]},{id:"waste-collections",group:"waste",label:"งานบริหารจัดการมูลฝอย",short:"งานบริหารจัดการมูลฝอย",icon:"recycle",titleField:"waste_name",fields:[Q,{name:"source",label:"แหล่งที่เก็บ",type:"text",required:!0},{name:"waste_type_id",label:"ประเภทขยะมูลฝอย",type:"reference",reference:"waste-types",required:!0},{name:"waste_name",label:"ชื่อขยะมูลฝอย",type:"text",required:!0},{name:"weight",label:"น้ำหนัก",type:"number",unit:"ตัน",required:!0}]},{id:"drain-cleanings",group:"sanitation",label:"งานลอกท่อระบายน้ำ",short:"ลอกท่อระบายน้ำ",icon:"droplet",titleField:"location",fields:[Q,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0},{name:"sediment_quantity",label:"ปริมาณตะกอน",type:"number",unit:"ลบ.ม.",required:!0}]},{id:"septic-pumpings",group:"sanitation",label:"งานสูบสิ่งปฏิกูล",short:"สูบสิ่งปฏิกูล",icon:"truck",titleField:"location",fields:[Q,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"volume",label:"ปริมาตรสิ่งปฏิกูล",type:"number",unit:"ลบ.ม.",required:!0},{name:"fee_amount",label:"ค่าธรรมเนียม",type:"number",unit:"บาท",required:!0}]},{id:"septic-treatments",group:"sanitation",label:"การบำบัดสิ่งปฏิกูล",short:"บำบัดสิ่งปฏิกูล",icon:"flask",titleField:"service_date",fields:[Q,{name:"sludge_quantity",label:"ปริมาณตะกอนสำหรับทำปุ๋ย",type:"number",unit:"กก.",required:!0},{name:"fertilizer_remaining",label:"ปุ๋ยอินทรีย์สูตร 2 คงเหลือ",type:"number",unit:"กก.",required:!0},{name:"microbial_note",label:"ข้อมูลการใส่น้ำจุลินทรีย์ชีวภาพ",type:"textarea",required:!0}]},{id:"waste-management-projects",group:"projects",label:"โครงการพัฒนาระบบจัดการมูลฝอย",short:"โครงการพัฒนา",icon:"chart",titleField:"project_name",fields:[Q,{name:"project_name",label:"ชื่อโครงการ",type:"text",required:!0},{name:"communities_count",label:"จำนวนชุมชนที่เข้าร่วม",type:"integer",unit:"ชุมชน",required:!0},{name:"participants_count",label:"ผู้เข้าร่วมโครงการ",type:"integer",unit:"คน",required:!0}]}];class ye extends Error{constructor(t,s=0,r=null){super(t),this.name="ApiError",this.status=s,this.data=r,this.errors=r&&typeof r=="object"&&r.errors?r.errors:{}}get fieldErrors(){const t={};if(!this.errors||typeof this.errors!="object")return t;for(const[s,r]of Object.entries(this.errors))t[s]=Array.isArray(r)?r[0]||"":String(r||"");return t}get isValidationError(){return this.status===422}get isRateLimited(){return this.status===429}get isUnauthorized(){return this.status===401||this.status===419}get isForbidden(){return this.status===403}}function Ut(){return document.querySelector('meta[name="csrf-token"]')?.content||""}function Mt(){return window.serviceHubUrls?.login||"/login"}function v(e){const t=window.serviceHubUser;return t?(Array.isArray(t.roles)?t.roles:[]).includes("super-admin")?!0:(Array.isArray(t.permissions)?t.permissions:[]).includes(e):!1}const Tt=["super-admin","admin"];function Ae(){const e=window.serviceHubUser?.roles??[];return Array.isArray(e)&&e.some(t=>Tt.includes(t))}function Le(e){if(!Ae())return!1;if((window.serviceHubUser?.roles??[]).includes("super-admin"))return!0;const s=window.serviceHubUser?.permissions??[];return Array.isArray(s)&&s.includes(e)}function be(e){return(window.serviceHubUrls?.apiActivities||"/api/activities/__MODULE__").replace("__MODULE__",encodeURIComponent(e))}function Re(e){return(window.serviceHubUrls?.apiReferences||"/api/references/__TYPE__").replace("__TYPE__",encodeURIComponent(e))}async function A(e,t={}){const s=Ut(),r={Accept:"application/json","X-Requested-With":"XMLHttpRequest",...s?{"X-CSRF-TOKEN":s}:{},...t.headers||{}};let n=t.body;const a=typeof FormData<"u"&&n instanceof FormData,i=typeof Blob<"u"&&n instanceof Blob,o=typeof URLSearchParams<"u"&&n instanceof URLSearchParams;n&&typeof n=="object"&&!a&&!i&&!o&&(n=JSON.stringify(n),r["Content-Type"]||(r["Content-Type"]="application/json"));let l;try{l=await fetch(e,{credentials:"same-origin",...t,headers:r,body:n})}catch(p){throw p instanceof ye?p:new ye(p.message||"ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง",0)}if(l.status===401||l.status===419){const p=Mt();throw window.location.assign(p),new ye("เซสชันของคุณหมดอายุ กรุณาเข้าสู่ระบบใหม่",l.status)}const d=await l.json().catch(()=>({}));if(!l.ok){let p=d.message,m=0;if(l.status===429){const b=l.headers?.get?.("Retry-After"),g=Number(b);m=Number.isFinite(g)&&g>0?Math.ceil(g):Math.max(0,Math.ceil((Date.parse(b||"")-Date.now())/1e3)||0),p=m?`คำขอส่งมาถี่เกินไป กรุณารอ ${m} วินาทีแล้วลองใหม่อีกครั้ง`:"คำขอส่งมาถี่เกินไป กรุณารอสักครู่แล้วลองใหม่อีกครั้ง (Too Many Attempts)"}else l.status===403?p=p||"คุณไม่มีสิทธิ์ดำเนินการในส่วนนี้":l.status===422?p=p||"ข้อมูลที่ส่งไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง":p=p||`เกิดข้อผิดพลาด (${l.status})`;const u=new ye(p,l.status,d);throw u.fields=d.errors||{},u.retryAfterSeconds=m,u}return d}async function ot(e,t={}){let s=1;const r=[];for(;;){const n=e.includes("?")?"&":"?",a=`${e}${n}per_page=100&page=${s}`,i=await A(a,t);Array.isArray(i.data)&&r.push(...i.data);const o=i.meta?.last_page||1;if(s>=o)break;s++}return r}const lt=" — เทศบาลนครนนทบุรี",ze="/dashboard";function _e(e=window.location.hash){let t=e||"";if(t.startsWith("#")&&(t=t.slice(1)),t.startsWith("figmacapture="))return{hash:"#/dashboard",path:"/dashboard",parts:["dashboard"],params:new URLSearchParams,query:{}};const[s,r=""]=(t||ze).split("?"),n=s.startsWith("/")?s:`/${s}`,a=n.split("/").filter(Boolean),i=new URLSearchParams(r),o=Object.fromEntries(i.entries());return{hash:`#${n}${r?`?${r}`:""}`,path:n,parts:a.length?a:["dashboard"],params:i,query:o}}function X(){return _e()}function Xe(e,t=lt){const s=(e||"แดชบอร์ดฝ่ายบริการ").trim();s.endsWith(t.trim())?document.title=s:document.title=`${s}${t}`}function At(e){const[t,s]=e.parts;return t==="dashboard"||!e.parts.length?"แดชบอร์ดฝ่ายบริการ":t==="login"?"เข้าสู่ระบบ":t==="users"?"จัดการผู้ใช้งาน":t==="profile"?"โปรไฟล์ส่วนบุคคล":t==="audit-logs"?"ประวัติการแก้ไข":t==="cleaning-zones"?"เขตรักษาความสะอาด":t==="waste-types"?"ประเภทขยะมูลฝอย":t==="reports"?Y.find(n=>n.id===s)?.short||"รายงาน":t==="module"?Y.find(n=>n.id===s)?.short||"งานบริการ":"แดชบอร์ดฝ่ายบริการ"}class Rt{constructor(t={},s={}){let r={};t&&typeof t=="object"&&!t.defaultRoute&&!t.routes?r={routes:t,...s}:r=t||{},this.routes={},this.options={defaultRoute:ze,titleSuffix:lt,...r},this.current=_e(),this.beforeHooks=[],this.afterHooks=[],this.notFoundHandler=null,this.navigationSequence=0,this.options.routes&&this.registerRoutes(this.options.routes)}registerRoutes(t){for(const[s,r]of Object.entries(t))typeof r=="function"?this.routes[s]={handler:r}:this.routes[s]=r}setNotFound(t){this.notFoundHandler=t}beforeEach(t){this.beforeHooks.push(t)}afterEach(t){this.afterHooks.push(t)}navigate(t,s={}){let r=t||ze;r.startsWith("#")&&(r=r.slice(1)),r.startsWith("/")||(r=`/${r}`);const n=`#${r}`;window.location.hash===n?this.resolve():s.replace?window.location.replace(n):window.location.hash=n,s.noScroll||window.scrollTo({top:0,behavior:"smooth"})}async checkGuards(t,s){if(t.parts[0]==="login"){const n=window.serviceHubUrls?.login||"/login";return window.location.replace(n),!1}for(const n of this.beforeHooks){const a=await n(t);if(a===!1)return!1;if(typeof a=="string")return a}if(s?.guard){const n=await s.guard(t);if(n===!1)return!1;if(typeof n=="string")return n}const r=t.parts[0];if(r==="users"&&!Ae()||r==="audit-logs"&&!v("audit-logs.view")||r==="cleaning-zones"&&!v("cleaning-zones.view")||r==="waste-types"&&!v("waste-types.view"))return!1;if(r==="module"&&t.parts[1]){const n=t.parts[1];if(!v(`${n}.view`))return!1}return!0}async resolve(){const t=++this.navigationSequence,s=_e();s.isCurrent=()=>t===this.navigationSequence&&_e().hash===s.hash,this.current=s;const r=s.parts[0]||"dashboard",n=this.routes[r]||this.routes["*"],a=await this.checkGuards(s,n);if(!s.isCurrent())return;if(a===!1){typeof this.options.onDenied=="function"?await this.options.onDenied(s):this.notFoundHandler&&await this.notFoundHandler(s),Xe("ไม่พบหน้าหรือไม่มีสิทธิ์เข้าถึง",this.options.titleSuffix);return}if(typeof a=="string"){this.navigate(a);return}let i="";n?.title?i=typeof n.title=="function"?n.title(s):n.title:i=At(s),Xe(i,this.options.titleSuffix);try{n?.handler?await n.handler(s):this.notFoundHandler&&await this.notFoundHandler(s)}catch(o){if(!s.isCurrent())return;if(typeof this.options.onError=="function")await this.options.onError(o,s);else throw o;return}if(s.isCurrent()){for(const o of this.afterHooks)o(s);typeof this.options.afterRender=="function"&&this.options.afterRender(s)}}init(){window.addEventListener("hashchange",()=>this.resolve()),this.resolve()}}let ue=null;function Ct(e={},t={}){return ue=new Rt(e,t),ue.init(),ue}function j(e,t={}){ue?ue.navigate(e,t):(window.location.hash=e.startsWith("#")?e:`#${e}`,window.scrollTo({top:0,behavior:"smooth"}))}const c=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),S=(e,t={})=>new Intl.NumberFormat("th-TH",{maximumFractionDigits:2,...t}).format(Number(e)||0);function B(e){if(!e)return"—";const t=String(e).slice(0,10);return new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Bangkok"}).format(new Date(`${t}T12:00:00+07:00`))}const Dt={"super-admin":"ผู้ดูแลระบบสูงสุด",admin:"ผู้ดูแลระบบ",staff:"เจ้าหน้าที่",viewer:"ผู้ดูข้อมูล",auditor:"ผู้ตรวจสอบระบบ"},Ht={"super-admin":"border-red-200 bg-red-50 text-red-700",admin:"border-amber-200 bg-amber-50 text-amber-700",staff:"border-teal-200 bg-teal-50 text-teal-800",viewer:"border-gray-200 bg-gray-50 text-gray-700",auditor:"border-blue-200 bg-blue-50 text-blue-700"};function dt(e){const t=String(e||"").trim().split(/\s+/);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():String(e||"?")[0].toUpperCase()}const se=e=>`#/module/${e}`,Qe={grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',sparkles:'<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 17 .7 1.3L21 19l-1.3.7L19 21l-.7-1.3L17 19l1.3-.7L19 17ZM4 17l.5 1L6 18.5 4.5 19 4 20l-.5-1L2 18.5l1.5-.5L4 17Z"/>',recycle:'<path d="m7 19-2-3.4a2 2 0 0 1 0-2l1-1.7M9 5h5.2a2 2 0 0 1 1.7 1l1.4 2.4M19 11l2 3.5a2 2 0 0 1 0 2l-1.4 2.4a2 2 0 0 1-1.7 1H13"/><path d="m4 12 2.8-.8L7.5 14M17 7.5l.5 3 2.8-.9M11 21l2-2-2-2"/>',droplet:'<path d="M12 22a8 8 0 0 0 8-8c0-4.4-8-12-8-12S4 9.6 4 14a8 8 0 0 0 8 8Z"/>',chart:'<path d="M3 3v18h18"/><path d="m7 16 4-5 3 2 5-7"/>',road:'<path d="M7 3 4 21M17 3l3 18M12 3v3m0 4v4m0 4v3"/>',waves:'<path d="M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',truck:'<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',flask:'<path d="M9 3h6M10 3v7l-5.5 9a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 10V3M8 16h8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',plus:'<path d="M12 5v14M5 12h14"/>',arrow:'<path d="m5 12 14 0m-6-6 6 6-6 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="M18 6 6 18M6 6l12 12"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',ellipsis:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L10 16l-4 1 1-4 9.5-9.5Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',empty:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 10h8M8 14h5"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',login:'<path d="M10 17l5-5-5-5M15 12H3M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',lock:'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',eyeOff:'<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>'};function f(e,t=20,s="",r={}){const n=Qe[e];n||typeof process>"u"&&console.warn(`[icons] ไม่พบ icon ชื่อ "${e}" — ใช้ "grid" แทน`);const a=n||Qe.grid,o=!!(r["aria-label"]||r.title||r.role==="img")?'role="img"':'aria-hidden="true"',l=Object.entries(r).filter(([d])=>d!=="aria-hidden"&&d!=="role").map(([d,p])=>`${d}="${c(p)}"`).join(" ");return`<svg class="${s}" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${o} ${l}>${a}</svg>`}function O(e,t,s,r=""){return`<div class="mb-5 flex min-w-0 max-w-full flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end">
    <div class="min-w-0 max-w-full flex-1">
      <p class="mb-1 text-xs font-bold tracking-[.13em] text-primary sm:mb-1.5">${c(e)}</p>
      <h1 class="break-words text-[22px] sm:text-[32px] font-bold leading-tight tracking-tight text-ink">${c(t)}</h1>
      <p class="mt-1.5 break-words text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">${c(s)}</p>
    </div>
    ${r?`<div class="w-full shrink-0 sm:w-auto">${r}</div>`:""}
  </div>`}const xe=(e,t,s="plus")=>`<a href="${t}" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${f(s,18)}${c(e)}</a>`,ne=(e,t,s="arrow")=>`<a href="${t}" class="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f8fbf8]">${c(e)}${f(s,17)}</a>`;let Je=null,K=null;function ct(){return K&&document.body.contains(K)||(K=document.getElementById("toast-container"),K||(K=document.createElement("div"),K.id="toast-container",K.className="fixed inset-x-4 bottom-4 z-[70] flex flex-col gap-2 sm:inset-x-auto sm:bottom-5 sm:right-5 pointer-events-none",document.body.appendChild(K))),K}function M(e,t="success"){const s=ct();s.innerHTML="",clearTimeout(Je);const r=t==="error",n=r?"border-red-200 bg-white text-red-700":"border-[#c6e9d8] bg-white text-primary-dark",a=r?"info":"check",i=document.createElement("div");i.role="status",i.setAttribute("aria-live","polite"),i.className=`app-toast pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold shadow-xl transition-all duration-200 ${n}`,i.innerHTML=`
    ${f(a,19,"shrink-0")}
    <span class="flex-1">${c(e)}</span>
    <button type="button" class="ml-2 rounded-lg p-1 text-muted hover:bg-canvas transition" aria-label="ปิดข้อความ">
      ${f("close",17)}
    </button>
  `,i.querySelector("button")?.addEventListener("click",()=>{i.remove()}),s.appendChild(i),Je=setTimeout(()=>{i.remove()},4200)}function re(){document.querySelectorAll("select.field:not(.custom-select-applied):not(.master-native-select)").forEach(e=>{e.classList.add("custom-select-applied"),e.style.display="none";const t=document.createElement("div");t.className="relative w-full";const s=document.createElement("button");s.type="button",s.className=e.className.replace("custom-select-applied","").replace("hidden","")+" flex items-center justify-between text-left";const r=()=>'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';s.innerHTML=`<span class="truncate">${e.options[e.selectedIndex]?.text||""}</span>${r()}`,e.getAttribute("aria-invalid")==="true"&&s.setAttribute("aria-invalid","true");const n=document.createElement("div");n.className="absolute left-0 top-[calc(100%+6px)] z-20 hidden w-full overflow-y-auto max-h-60 rounded-xl border border-line bg-white shadow-xl custom-select-menu py-1";const a=()=>{s.innerHTML=`<span class="truncate">${e.options[e.selectedIndex]?.text||""}</span>${r()}`},i=Array.from(e.options).filter(o=>!o.disabled);i.forEach(o=>{const l=document.createElement("div");l.className=`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${o.selected?"bg-[#f0f8f2] font-bold text-primary":""}`,l.textContent=o.text,l.onclick=()=>{e.value=o.value,e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})),n.classList.add("hidden"),a(),Array.from(n.children).forEach((d,p)=>{d.className=`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${i[p].selected?"bg-[#f0f8f2] font-bold text-primary":""}`})},n.appendChild(l)}),s.onclick=o=>{o.preventDefault();const l=!n.classList.contains("hidden");document.querySelectorAll(".custom-select-menu").forEach(d=>d.classList.add("hidden")),l||n.classList.remove("hidden")},e.parentNode.insertBefore(t,e),t.appendChild(s),t.appendChild(n),t.appendChild(e)})}function $e(e){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${r}`}function It(e){const t=new Date,s=$e(t);switch(e){case"all":return{from:"",to:""};case"today":return{from:s,to:s};case"7d":{const r=new Date(t);return r.setDate(r.getDate()-6),{from:$e(r),to:s}}case"month":{const r=new Date(t.getFullYear(),t.getMonth(),1);return{from:$e(r),to:s}}case"30d":{const r=new Date(t);return r.setDate(r.getDate()-29),{from:$e(r),to:s}}default:return{from:s,to:s}}}const Pt=[{id:"all",label:"ทั้งหมด"},{id:"today",label:"วันนี้"},{id:"7d",label:"7 วันล่าสุด"},{id:"month",label:"เดือนนี้"},{id:"30d",label:"30 วันล่าสุด"}];function Ce({from:e="",to:t="",formId:s="",cls:r=""}={}){return`
    <div class="flex flex-wrap items-center gap-1.5 ${r}" role="group" aria-label="ช่วงเวลาด่วน">
      <span class="text-xs font-semibold text-muted mr-1">ช่วงด่วน:</span>
      ${Pt.map(n=>{const a=It(n.id),i=n.id==="all"?!e&&!t:!!e&&e===a.from&&t===a.to;return`
          <button
            type="button"
            data-action="set-date-preset"
            data-preset="${n.id}"
            data-from="${a.from}"
            data-to="${a.to}"
            ${s?`data-form="${c(s)}"`:""}
            class="min-h-8 inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold transition ${i?"bg-primary text-white shadow-xs":"border border-line bg-white text-muted hover:border-primary/40 hover:text-ink"}"
            aria-pressed="${i}"
          >
            ${c(n.label)}
          </button>
        `}).join("")}
    </div>
  `}function Bt(e,t=300){let s=null;return function(...r){clearTimeout(s),s=setTimeout(()=>{e.apply(this,r)},t)}}const zt=""+new URL("nonthaburi-logo-BUg5neRh.png",import.meta.url).href,mt="#/cleaning-zones",pt="#/waste-types",ut=[{type:"group",id:"cleaning",label:"งานบริการรักษาความสะอาด",icon:"sparkles",children:[{module:"road-washings",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",children:[{module:"cleaning-zones",href:mt,label:"เขตรักษาความสะอาด"}]},{module:"waterway-cleanings",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ"},{module:"road-sweepings",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ"},{module:"outsourced-cleanings",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม"}]},{type:"link",module:"waste-collections",label:"งานบริหารจัดการมูลฝอย",icon:"recycle",children:[{module:"waste-types",href:pt,label:"ประเภทขยะมูลฝอย"}]},{type:"group",id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",icon:"droplet",children:[{module:"drain-cleanings",label:"งานลอกท่อระบายน้ำ"},{module:"septic-pumpings",label:"งานสูบสิ่งปฏิกูล"},{module:"septic-treatments",label:"การบำบัดสิ่งปฏิกูล"}]},{type:"link",module:"waste-management-projects",label:"โครงการต่าง ๆ",icon:"chart"}];let E=!1,N=!1;const ee=new Set;function He(e){E=typeof e=="boolean"?e:!E,ft()}function Ie(){N=!1;const e=document.getElementById("user-menu-dropdown"),t=document.getElementById("user-menu-button");e&&(e.classList.add("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.remove("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!0),t&&(t.setAttribute("aria-expanded","false"),t.classList.remove("border-primary","bg-[#f0f8f2]"),t.querySelector("svg:last-child")?.classList.remove("rotate-180"))}function Nt(){N=!N;const e=document.getElementById("user-menu-dropdown"),t=document.getElementById("user-menu-button");e&&(N?(e.classList.remove("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.add("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!1,e.querySelector("a, button")?.focus()):(e.classList.add("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.remove("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!0,t?.focus())),t&&(t.setAttribute("aria-expanded",String(N)),t.classList.toggle("border-primary",N),t.classList.toggle("bg-[#f0f8f2]",N),t.querySelector("svg:last-child")?.classList.toggle("rotate-180",N))}function te(e){const t=ut.find(s=>s.type==="group"&&s.children.some(r=>r.module===e||r.children?.some(n=>n.module===e)));if((e==="waste-collections"||e==="waste-types")&&ee.add("waste-collections"),t){ee.add(t.id);const s=t.children.find(r=>r.children?.some(n=>n.module===e)||r.module===e&&r.children);s&&ee.add(s.module)}}function Ft(e){ee.has(e)?ee.delete(e):ee.add(e)}function ft(){const e=window.innerWidth<1024;document.body.style.overflow=e&&E?"hidden":"";const t=document.getElementById("sidebar"),s=document.getElementById("mobile-backdrop");s&&(s.classList.toggle("opacity-100",e&&E),s.classList.toggle("pointer-events-auto",e&&E),s.classList.toggle("visible",e&&E),s.classList.toggle("opacity-0",!e||!E),s.classList.toggle("pointer-events-none",!e||!E),s.classList.toggle("invisible",!e||!E)),t&&(t.inert=e&&!E,t.setAttribute("aria-hidden",String(!E&&e)),e?(t.classList.toggle("-translate-x-full",!E),t.classList.toggle("translate-x-0",E),t.classList.toggle("invisible",!E),t.classList.toggle("pointer-events-none",!E),t.classList.toggle("visible",E),t.classList.toggle("pointer-events-auto",E)):(t.classList.remove("-translate-x-full","invisible","pointer-events-none"),t.classList.add("translate-x-0","visible","pointer-events-auto")));const r=document.querySelector('[data-action="open-menu"]');r&&r.setAttribute("aria-expanded",String(E))}function Ot(e,t){if(e.type==="link"){if(!v(`${e.module}.view`))return"";const a=t===e.module;if(!e.children)return`<a href="${se(e.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${a?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${a?'aria-current="page"':""}>${f(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a>`;const i=e.children.filter(d=>v(`${d.module}.view`));if(!i.length)return`<a href="${se(e.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${a?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${a?'aria-current="page"':""}>${f(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a>`;const o=i.some(d=>d.module===t),l=ee.has(e.module);return`<div class="mb-1 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${a?"nav-active":o?"bg-[#f4f9f5] text-primary-dark":"text-[#657772]"}"><a href="${se(e.module)}" class="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-l-xl px-3 py-2.5 text-sm font-semibold leading-5 hover:bg-[#f4f7f4] hover:text-ink" ${a?'aria-current="page"':""}>${f(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${e.module}" aria-expanded="${l}" aria-controls="sidebar-subgroup-${e.module}" aria-label="${l?"ปิด":"เปิด"}เมนูย่อยของ${c(e.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${f("chevronDown",16,`transition-transform ${l?"rotate-180":""}`)}</button></div><div id="sidebar-subgroup-${e.module}" class="ml-5 border-l border-[#dbe9df] pl-3" ${l?"":"hidden"}>${i.map(d=>{const p=t===d.module;return`<a href="${d.href||se(d.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${p?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${p?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(d.label)}</span></a>`}).join("")}</div></div>`}const s=e.children.filter(a=>v(`${a.module}.view`));if(!s.length)return"";const r=ee.has(e.id),n=s.some(a=>a.module===t||a.children?.some(i=>i.module===t&&v(`${i.module}.view`)));return`<div class="mb-1">
    <button type="button" data-action="toggle-sidebar-group" data-group="${e.id}" aria-expanded="${r}" aria-controls="sidebar-group-${e.id}" class="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold leading-5 ${n?"bg-[#f4f9f5] text-primary-dark":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">
      ${f(e.icon,19,"shrink-0")}<span class="min-w-0 flex-1 whitespace-normal break-words">${c(e.label)}</span>${f("chevronDown",16,`shrink-0 transition-transform ${r?"rotate-180":""}`)}
    </button>
    <div id="sidebar-group-${e.id}" class="ml-5 border-l border-[#dbe9df] pl-3" ${r?"":"hidden"}>
      ${s.map(a=>{const i=t===a.module,o=a.href||se(a.module);if(!a.children)return`<a href="${o}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${i?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${i?'aria-current="page"':""}><span class="whitespace-normal break-words">${c(a.label)}</span></a>`;const l=a.children.filter(m=>v(`${m.module}.view`));if(!l.length)return`<a href="${o}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${i?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${i?'aria-current="page"':""}><span class="whitespace-normal break-words">${c(a.label)}</span></a>`;const d=ee.has(a.module),p=a.children.some(m=>m.module===t);return`<div class="my-0.5 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${i?"nav-active":p?"bg-[#f4f9f5] text-primary-dark":"text-[#687b74]"}"><a href="${o}" class="flex min-h-11 min-w-0 flex-1 items-center rounded-l-xl px-3 py-2.5 text-[13px] font-medium leading-5 hover:bg-[#f4f7f4] hover:text-ink ${i?"font-semibold":""}" ${i?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(a.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${a.module}" aria-expanded="${d}" aria-controls="sidebar-subgroup-${a.module}" aria-label="${d?"ปิด":"เปิด"}เมนูย่อยของ${c(a.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${f("chevronDown",16,`transition-transform ${d?"rotate-180":""}`)}</button></div><div id="sidebar-subgroup-${a.module}" class="ml-3 border-l border-[#dbe9df] pl-2" ${d?"":"hidden"}>${l.map(m=>{const u=t===m.module;return`<a href="${m.href||se(m.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${u?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${u?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(m.label)}</span></a>`}).join("")}</div></div>`}).join("")}
    </div>
  </div>`}function Vt(e,t){const s=window.serviceHubUrls?.logo||zt;return`
    <div id="mobile-backdrop" class="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none lg:hidden ${E?"opacity-100 pointer-events-auto visible":"opacity-0 pointer-events-none invisible"}" data-action="close-menu" aria-hidden="true"></div>
    <aside id="sidebar" role="complementary" aria-label="แถบเมนูหลัก" class="fixed inset-y-0 left-0 z-50 flex w-[266px] max-w-[calc(100vw-24px)] flex-col border-r border-line bg-white transition-transform duration-200 motion-reduce:transition-none lg:translate-x-0 lg:visible lg:pointer-events-auto ${E?"translate-x-0 visible pointer-events-auto":"-translate-x-full invisible pointer-events-none"}" ${E?'aria-hidden="false"':'aria-hidden="true"'}>
      <div class="flex h-[72px] items-center gap-3 border-b border-line px-5 sm:px-6">
        <img src="${s}" alt="ตราเทศบาลนครนนทบุรี" class="h-12 w-12 shrink-0 object-contain drop-shadow-sm">
        <div class="min-w-0 flex-1"><div class="text-[15px] font-bold tracking-tight text-ink leading-snug">เทศบาลนครนนทบุรี</div><div class="text-[11px] font-medium tracking-wide text-muted">ฐานข้อมูลฝ่ายบริการ</div></div>
        <button type="button" class="ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-muted lg:hidden" data-action="close-menu" aria-label="ปิดเมนู">${f("close",20)}</button>
      </div>
      <nav aria-label="เมนูหลัก" role="navigation" class="scrollbar-thin flex-1 overflow-y-auto px-4 pb-6 pt-6">
        <a href="#/dashboard" class="mb-2 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${t?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${t?'aria-current="page"':""}>${f("grid",19)}<span>แดชบอร์ดฝ่ายบริการ</span></a>
        ${ut.map(r=>Ot(r,e)).join("")}
        ${!v("road-washings.view")&&v("cleaning-zones.view")?`<a href="${mt}" class="mb-1 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="cleaning-zones"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4]"}">เขตรักษาความสะอาด</a>`:""}
        ${!v("waste-collections.view")&&v("waste-types.view")?`<a href="${pt}" class="mb-1 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="waste-types"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4]"}">ประเภทขยะมูลฝอย</a>`:""}
        <a href="#/reports" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="reports"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="reports"?'aria-current="page"':""}>${f("chart",18)}รายงาน</a>
        ${v("audit-logs.view")?`<a href="#/audit-logs" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="audit-logs"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">${f("info",18)}ประวัติการแก้ไข</a>`:""}
        ${Ae()?`<div class="mt-3 border-t border-line pt-3"><a href="#/users" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="users"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="users"?'aria-current="page"':""}>${f("users",19)}<span>จัดการผู้ใช้งาน</span></a></div>`:""}
        <div class="mt-3 border-t border-line pt-3">
          <a href="#/profile" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="profile"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="profile"?'aria-current="page"':""}>
            ${f("users",19)}<span>โปรไฟล์ของฉัน</span>
          </a>
        </div>
      </nav>
    </aside>
  `}function Zt(e=[]){const t=window.serviceHubUser||{},s=(t.name||t.username||"U").slice(0,1).toUpperCase(),r=(t.name||t.username||"U").slice(0,2).toUpperCase(),n=(t.roles||[])[0]||"staff";return`
    <header role="banner" class="app-header sticky top-0 z-30 flex h-[72px] w-full max-w-full min-w-0 items-center justify-between border-b border-line bg-white/95 px-3.5 backdrop-blur-sm sm:px-7 lg:px-9">
      <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button type="button" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl p-2 text-ink hover:bg-canvas lg:hidden" data-action="open-menu" aria-label="เปิดเมนู" aria-expanded="${E}" aria-controls="sidebar">${f("menu",22)}</button>
        <nav aria-label="เส้นทางหน้า" role="navigation" class="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap text-xs text-muted sm:text-sm">
          <a class="shrink-0 hover:text-primary" href="#/dashboard">หน้าหลัก</a>
          ${e.map(a=>`${f("chevron",14,"shrink-0 text-[#b7c4bd]")}<span class="min-w-0 truncate ${a.current?"font-semibold text-ink":""}">${a.href?`<a href="${a.href}" class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom hover:text-primary">${c(a.label)}</a>`:`<span class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom">${c(a.label)}</span>`}</span>`).join("")}
        </nav>
      </div>
      <div class="ml-2 flex shrink-0 items-center gap-2 sm:gap-3">
        <span class="hidden rounded-full border border-[#cfe9dd] bg-[#f0faf4] px-3 py-1 text-[11px] font-bold text-primary sm:inline-flex">ข้อมูลจริง</span>
        <div id="user-menu-container" class="relative">
          <button type="button" data-action="toggle-user-menu" id="user-menu-button" aria-haspopup="menu" aria-expanded="${N}" aria-controls="user-menu-dropdown" class="flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f0f8f2] focus:outline-none focus:ring-2 focus:ring-primary/20 ${N?"border-primary bg-[#f0f8f2]":""}" aria-label="เมนูผู้ใช้งาน ${c(t.name||t.username)}">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#177a67] to-[#0e6253] text-xs font-bold text-white shadow-sm">${c(s)}</span>
            <span class="hidden max-w-[130px] truncate sm:inline">${c(t.name||t.username)}</span>
            ${f("chevronDown",14,`shrink-0 text-[#687b74] transition-transform duration-150 ${N?"rotate-180":""}`)}
          </button>
          <div id="user-menu-dropdown" class="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-24px)] rounded-2xl border border-line bg-white p-2 shadow-xl z-50 transition-all ${N?"opacity-100 visible translate-y-0 pointer-events-auto":"opacity-0 invisible -translate-y-1 pointer-events-none"}" role="menu" aria-labelledby="user-menu-button" ${N?"":"hidden"}>
            <div class="rounded-xl bg-[#f8faf8] p-3 border border-[#edf3ee]">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#177a67] to-[#0e6253] text-sm font-bold text-white shadow-sm">
                  ${c(r)}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-ink truncate">${c(t.name||t.username)}</div>
                  <div class="text-[11px] text-muted truncate">@${c(t.username)}</div>
                  <div class="mt-1">
                    <span class="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${Ht[n]||"border-gray-200 bg-gray-50 text-gray-700"}">
                      ${c(Dt[n]||n)}
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
  `}function Z(e,t=null,s=[],r=!1){return`
    ${Vt(t,r)}
    <div class="app-shell min-h-screen w-full max-w-full min-w-0 lg:pl-[266px]">
      ${Zt(s)}
      <main id="main-content" role="main" tabindex="-1" class="app-content mx-auto w-full min-w-0 max-w-[1510px] px-3.5 pb-16 pt-5 sm:px-7 sm:pt-7 lg:px-9">
        ${e}
      </main>
      <div id="shell-live-status" role="status" aria-live="polite" class="sr-only"></div>
    </div>
  `}function Gt(){window.addEventListener("resize",ft)}const Wt={distance_km:"กม.",quantity:"ตัน",weight:"ตัน",sediment_quantity:"ลบ.ม.",volume:"ลบ.ม.",fee_amount:"บาท",sludge_quantity:"กก.",fertilizer_remaining_latest:"กก.",communities_count:"ชุมชน",participants_count:"คน"},Kt={fertilizer_remaining_latest:"ปุ๋ยคงเหลือล่าสุด"},pe=e=>new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Bangkok"}).format(new Date(`${String(e).slice(0,10)}T12:00:00+07:00`)),Yt=e=>e?new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"Asia/Bangkok"}).format(new Date(String(e).replace(" ","T")+(String(e).includes("Z")||/[+-]\d\d:\d\d$/.test(String(e))?"":"+00:00"))):"—";function Xt({data:e,loading:t,error:s,params:r,groups:n,modules:a,icon:i,esc:o,number:l,moduleHref:d}){const p=r.get("from")||e?.period?.from||"",m=r.get("to")||e?.period?.to||"",u=!!(p||m),b='<div class="mb-5 sm:mb-6"><p class="text-xs font-bold tracking-[.16em] text-primary">ภาพรวมระบบ</p><h1 class="mt-2 text-2xl font-bold text-ink sm:text-3xl">แดชบอร์ดฝ่ายบริการ</h1><p class="mt-2 text-sm text-muted">ติดตามงานบริการจากฐานข้อมูลจริงตามสิทธิ์ของคุณ</p></div>',g=`
    <section aria-labelledby="dashboard-filter-title" class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h2 id="dashboard-filter-title" class="font-bold text-ink">${u?"ช่วงวันที่ดำเนินงาน":"ข้อมูลสะสมทั้งหมดตั้งแต่เริ่มระบบ"}</h2>
          <p class="text-xs text-muted">${u?"ตัวเลขหลักใช้วันที่ดำเนินงาน รวมวันเริ่มต้นและวันสิ้นสุด":"แสดงภาพรวมและจำนวนรายการสะสมของทุกหมวดงานตั้งแต่เริ่มระบบ"}</p>
        </div>
        ${Ce({from:p,to:m,formId:"dashboard-filter"})}
      </div>
      <form id="dashboard-filter" class="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] sm:items-end">
        <label class="min-w-0 text-sm font-semibold">ตั้งแต่วันที่<input class="field mt-1" type="date" name="from" value="${o(p)}" placeholder="ทั้งหมด"></label>
        <label class="min-w-0 text-sm font-semibold">ถึงวันที่<input class="field mt-1" type="date" name="to" value="${o(m)}" placeholder="ทั้งหมด"></label>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 font-bold text-white hover:bg-primary-dark">กรองข้อมูล</button>
        ${u?'<a href="#/dashboard" class="flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-muted hover:bg-[#f6faf7]" title="คืนค่าเป็นทั้งหมดทุกช่วงเวลา">ดูทั้งหมด</a>':""}
      </form>
      <p id="dashboard-filter-error" role="alert" class="mt-2 hidden text-sm text-red-700"></p>
    </section>
  `;if(t||!e&&!s)return`${b}${g}<div role="status" aria-live="polite" class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted">กำลังโหลดข้อมูลภาพรวม…</div>`;if(s)return`${b}${g}<div role="alert" class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"><p class="font-semibold">โหลดข้อมูลภาพรวมไม่สำเร็จ</p><p class="mt-1">${o(s)}</p><button type="button" data-action="retry-dashboard" class="mt-3 min-h-11 rounded-xl border border-red-300 bg-white px-4 font-semibold">ลองอีกครั้ง</button></div>`;const w=a.filter(x=>Object.hasOwn(e.module_summary,x.id)),k=x=>w.some(y=>y.id===x),$=x=>e.period?.from&&e.period?.to?`${d(x)}?${new URLSearchParams({from:e.period.from,to:e.period.to})}`:d(x),D=e.period.total,T=(x,y,F,I,L=!1)=>`<div class="dashboard-card panel-shadow rounded-2xl border border-line bg-white ${L?"border-l-[3px] border-l-primary":""} p-4 sm:p-5"><p class="text-sm font-semibold text-[#4d655a]">${x}</p><p class="mt-3 text-3xl font-bold leading-tight text-ink">${l(y)} <span class="text-sm font-medium text-muted">${F}</span></p><p class="mt-1 text-xs text-muted">${I}</p></div>`,H=(x,y,F)=>{const I=Kt[y]||x.fields.find(L=>L.name===y)?.label||y;return`<span class="inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-[#f4f8f5] px-2.5 py-1.5 text-xs text-[#435b50]"><span>${o(I)}:</span><strong class="text-ink">${F===null?"ไม่มีข้อมูล":`${l(F)} ${Wt[y]||""}`}</strong></span>`},q=(x,y)=>e.module_summary[x]?.metrics[y]??0,ie={cleaning:[["ระยะทางดำเนินงานรวม",w.filter(x=>x.group==="cleaning").reduce((x,y)=>x+q(y.id,"distance_km"),0),"กม."],...k("waterway-cleanings")?[["ผักตบชวาและมูลฝอยที่กำจัด",q("waterway-cleanings","quantity"),"ตัน"]]:[]],waste:[["น้ำหนักมูลฝอย",q("waste-collections","weight"),"ตัน"]],sanitation:[...k("drain-cleanings")?[["ตะกอนจากงานลอกท่อ",q("drain-cleanings","sediment_quantity"),"ลบ.ม."]]:[],...k("septic-pumpings")?[["สิ่งปฏิกูลที่สูบ",q("septic-pumpings","volume"),"ลบ.ม."]]:[],...k("septic-treatments")?[["ตะกอนสำหรับทำปุ๋ย",q("septic-treatments","sludge_quantity"),"กก."]]:[]],projects:[["ผู้เข้าร่วมโครงการ",q("waste-management-projects","participants_count"),"คน"]]},h=n.filter(x=>w.some(y=>y.group===x.id)).map(x=>`<section class="dashboard-card panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5"><div class="flex items-start gap-3"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf5ef] text-primary">${i(x.icon,19)}</span><div class="min-w-0"><h3 class="break-words text-sm font-bold text-ink">${o(x.label)}</h3><p class="mt-1 text-2xl font-bold text-ink">${l(e.group_summary[x.id]||0)} <span class="text-xs font-medium text-muted">${u?"รายการในช่วงที่เลือก":"รายการสะสม"}</span></p></div></div><dl class="mt-4 space-y-1.5 border-t border-line pt-3">${ie[x.id].map(([y,F,I])=>`<div class="flex flex-wrap justify-between gap-x-2 text-xs"><dt class="text-muted">${y}</dt><dd class="font-bold text-ink">${l(F)} ${I}</dd></div>`).join("")}</dl></section>`).join(""),R=w.map(x=>{const y=e.module_summary[x.id];return`<a href="${$(x.id)}" class="flex min-w-0 flex-col gap-2 rounded-xl border border-line bg-white p-3.5 transition hover:border-[#9fd1b8] hover:bg-[#f9fcfa] focus-visible:outline"><span class="flex min-w-0 items-start justify-between gap-2"><span class="min-w-0 break-words text-sm font-semibold text-ink">${o(x.short)}</span><strong class="shrink-0 text-sm text-primary">${l(y.count)} รายการ</strong></span><span class="flex flex-wrap gap-1.5">${Object.entries(y.metrics).map(([F,I])=>H(x,F,I)).join("")||'<span class="text-xs text-muted">ไม่มีค่าปริมาณ</span>'}</span></a>`}).join(""),V=Math.max(1,...e.trend.map(x=>x.count)),W=e.trend.map(x=>`<li class="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-xs"><span class="min-w-0 break-words text-muted">${pe(x.from)}${x.from===x.to?"":` – ${pe(x.to)}`}</span><strong class="text-ink">${l(x.count)} รายการ</strong><span class="col-span-2 h-2 rounded-full bg-[#eef3ef]"><span class="block h-2 rounded-full bg-primary" style="width:${Math.max(0,Math.round(x.count/V*100))}%"></span></span></li>`).join(""),oe=e.recent.slice(0,6).map(x=>{const y=a.find(F=>F.id===x.module);return y?`<a href="${d(y.id)}/${encodeURIComponent(x.id)}" class="flex min-w-0 flex-col gap-2 border-t border-line px-4 py-3.5 transition hover:bg-[#f9fcfa] sm:flex-row sm:items-center sm:gap-3 sm:px-5"><div class="flex min-w-0 flex-1 items-center gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf5ef] text-primary">${i(y.icon,17)}</span><div class="min-w-0 flex-1"><strong class="block break-words text-sm text-ink">${o(x.title||y.short)}</strong><span class="block break-words text-xs text-muted">${o(y.short)}</span></div></div><div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 pl-12 text-xs sm:flex-col sm:items-end sm:gap-y-0.5 sm:pl-0"><span class="inline-flex items-center gap-1 font-semibold text-primary-dark"><span class="font-normal text-muted">ดำเนินงาน:</span> ${pe(x.service_date)}</span><time class="text-[11px] text-muted" datetime="${o(x.created_at)}">บันทึกเมื่อ ${Yt(x.created_at)}</time></div></a>`:""}).join(""),ve=u?"รายการในช่วงที่เลือก":"รายการสะสมทั้งหมด",le=e.period?.from&&e.period?.to?`${pe(e.period.from)} – ${pe(e.period.to)}`:"ข้อมูลสะสมตั้งแต่เริ่มระบบ";return`${b}${g}<section aria-label="ยอดรวม" class="dashboard-summary mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">${T(ve,D,"รายการ",le,!0)}${T("ยอดสะสมตั้งแต่เริ่มระบบ",e.total,"รายการ","เฉพาะหมวดที่คุณมีสิทธิ์ดู")}${T("ดำเนินงานวันนี้",e.today,"รายการ","อิงวันที่ดำเนินงานตามเวลาไทย")}</section><section aria-labelledby="group-heading" class="mb-6"><h2 id="group-heading" class="mb-3 text-lg font-bold text-ink">ภาพรวมกลุ่มงาน</h2>${w.length?`<div class="dashboard-summary grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">${h}</div>`:'<p class="rounded-xl border border-line bg-white p-5 text-sm text-muted">ไม่มีหมวดงานที่คุณมีสิทธิ์ดู</p>'}</section><section aria-labelledby="module-heading" class="panel-shadow mb-6 rounded-2xl border border-line bg-[#f8faf8] p-4 sm:p-5"><div class="mb-3"><h2 id="module-heading" class="text-lg font-bold text-ink">งานบริการรายหมวด</h2><p class="text-xs text-muted">${u?"จำนวนและปริมาณในช่วงวันที่ที่เลือก; แต่ละค่าระบุหน่วยและความหมายแยกกัน":"จำนวนและปริมาณสะสมทั้งหมด; แต่ละค่าระบุหน่วยและความหมายแยกกัน"}</p></div>${u&&D===0?'<p class="mb-3 rounded-xl border border-[#d8e7dd] bg-white p-4 text-sm text-muted">ยังไม่มีรายการดำเนินงานในช่วงวันที่นี้ ลองเลือกช่วงอื่นเพื่อดูข้อมูล</p>':""}<div class="grid min-w-0 gap-2 sm:grid-cols-2 xl:grid-cols-3">${R}</div></section><div class="dashboard-panels grid grid-cols-1 gap-5 xl:grid-cols-2"><section aria-labelledby="trend-heading" class="panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5"><h2 id="trend-heading" class="text-lg font-bold text-ink">แนวโน้มจำนวนรายการ</h2><p class="mt-1 text-xs text-muted">${u?"แบ่งช่วงภายในวันที่ที่เลือก; แถบยาวขึ้นหมายถึงจำนวนมากขึ้น":"แนวโน้มจำนวนรายการย้อนหลัง; แถบยาวขึ้นหมายถึงจำนวนมากขึ้น"}</p>${D&&e.trend.length>1?`<ol class="mt-5 space-y-4">${W}</ol>`:'<p class="mt-5 text-sm text-muted">ข้อมูลยังไม่เพียงพอสำหรับแสดงแนวโน้ม</p>'}</section><section aria-labelledby="recent-heading" class="panel-shadow overflow-hidden rounded-2xl border border-line bg-white"><div class="p-4 sm:p-5"><h2 id="recent-heading" class="text-lg font-bold text-ink">บันทึกล่าสุด</h2><p class="mt-1 text-xs text-muted">เรียงตามเวลาบันทึก ครอบคลุมข้อมูลทุกช่วงเวลา</p></div>${oe||'<p class="border-t border-line p-5 text-sm text-muted">ยังไม่มีรายการบันทึก</p>'}</section></div>`}let Ee=null;function bt(e,t){if(e.key!=="Tab")return;const s=[...t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(a=>!a.closest("[hidden]")&&a.offsetParent!==null);if(!s.length){e.preventDefault();return}const r=s[0],n=s[s.length-1];e.shiftKey&&document.activeElement===r?(e.preventDefault(),n.focus()):!e.shiftKey&&document.activeElement===n&&(e.preventDefault(),r.focus())}function Qt({title:e="",content:t="",footer:s="",trigger:r=null,onClose:n=null,initialFocusSelector:a="input:not([disabled]), select:not([disabled]), button:not([disabled])",maxWidth:i="max-w-[440px]"}={}){qe();const o=r||document.activeElement,l=document.createElement("div");l.id="accessible-drawer-root",l.className="drawer-container",l.innerHTML=`
    <div id="drawer-backdrop" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-200" aria-hidden="true" data-action="drawer-close"></div>
    <div id="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" class="fixed inset-y-0 right-0 z-50 flex w-full ${c(i)} flex-col bg-white shadow-2xl transition-transform duration-300">
      <div class="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5 sm:px-6">
        <h2 id="drawer-title" class="text-base font-bold text-ink">${c(e)}</h2>
        <button type="button" data-action="drawer-close" class="rounded-xl p-2 text-muted hover:bg-canvas transition" aria-label="ปิด">${f("close",20)}</button>
      </div>
      <div class="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
        ${typeof t=="string"?t:""}
      </div>
      ${s?`
      <div class="flex shrink-0 items-center justify-end gap-3 border-t border-line px-5 py-4 sm:px-6 bg-[#fafbfa]">
        ${s}
      </div>`:""}
    </div>
  `,t instanceof HTMLElement&&l.querySelector(".flex-1").appendChild(t),document.body.appendChild(l),document.body.style.overflow="hidden";const d=m=>{if(m.key==="Escape")m.preventDefault(),qe();else if(m.key==="Tab"){const u=document.getElementById("drawer-panel");u&&bt(m,u)}},p=m=>{m.target.closest('[data-action="drawer-close"]')&&(m.preventDefault(),qe())};return document.addEventListener("keydown",d),l.addEventListener("click",p),Ee={root:l,triggerElement:o,onKeydown:d,onClick:p,onClose:n},requestAnimationFrame(()=>{requestAnimationFrame(()=>{const m=document.getElementById("drawer-panel");if(!m)return;const u=a?m.querySelector(a):null;u&&typeof u.focus=="function"?u.focus():m.querySelector('button[data-action="drawer-close"]')?.focus()})}),l}function qe(){if(!Ee)return;const{root:e,triggerElement:t,onKeydown:s,onClick:r,onClose:n}=Ee;document.removeEventListener("keydown",s),e.removeEventListener("click",r),e.remove(),document.body.style.overflow="",Ee=null,t&&typeof t.focus=="function"&&t.focus(),typeof n=="function"&&n()}function Ye({title:e="ยืนยันการดำเนินการ",message:t="คุณต้องการดำเนินการต่อหรือไม่",confirmText:s="ยืนยัน",cancelText:r="ยกเลิก",variant:n="danger",iconName:a="trash"}={}){return new Promise(i=>{const o=document.activeElement,l=document.createElement("div");l.id="accessible-modal-root",l.className="modal-container fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#0d241e]/55 p-4 backdrop-blur-xs";const d={danger:{iconBg:"bg-[#fff0ed] text-[#b64b43]",btnConfirm:"bg-[#b84d45] hover:bg-[#a43e37] text-white"},warning:{iconBg:"bg-[#fff8eb] text-[#b2721a]",btnConfirm:"bg-[#b2721a] hover:bg-[#9a6214] text-white"},primary:{iconBg:"bg-[#eaf5ef] text-primary",btnConfirm:"bg-primary hover:bg-primary-dark text-white"}}[n]||{iconBg:"bg-[#fff0ed] text-[#b64b43]",btnConfirm:"bg-[#b84d45] hover:bg-[#a43e37] text-white"};l.innerHTML=`
      <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-modal-title" aria-describedby="confirm-modal-desc" class="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${d.iconBg}">
          ${f(a,21)}
        </div>
        <h2 id="confirm-modal-title" class="text-lg font-bold text-ink">${c(e)}</h2>
        <p id="confirm-modal-desc" class="mt-2 text-sm leading-relaxed text-muted">${c(t)}</p>
        <div class="mt-7 flex justify-end gap-2.5">
          <button type="button" id="confirm-modal-cancel" class="min-h-11 rounded-xl border border-line px-4 text-sm font-bold text-ink hover:bg-canvas transition">
            ${c(r)}
          </button>
          <button type="button" id="confirm-modal-confirm" class="min-h-11 rounded-xl px-4 text-sm font-bold transition ${d.btnConfirm}">
            ${c(s)}
          </button>
        </div>
      </div>
    `,document.body.appendChild(l);const p=document.body.style.overflow;document.body.style.overflow="hidden";const m=l.querySelector("#confirm-modal-cancel"),u=l.querySelector("#confirm-modal-confirm"),b=w=>{document.removeEventListener("keydown",g),l.remove(),document.body.style.overflow=p,o&&typeof o.focus=="function"&&o.focus(),i(w)},g=w=>{if(w.key==="Escape")w.preventDefault(),b(!1);else if(w.key==="Tab"){const k=l.querySelector('[role="alertdialog"]');k&&bt(w,k)}};l.addEventListener("click",w=>{w.target===l&&b(!1)}),m?.addEventListener("click",()=>b(!1)),u?.addEventListener("click",()=>b(!0)),document.addEventListener("keydown",g),setTimeout(()=>{m?.focus()},50)})}const ae={"super-admin":{label:"ผู้ดูแลสูงสุด",color:"bg-[#fef2e8] text-[#b25d1a] border-[#f9d4b4]"},admin:{label:"ผู้ดูแลระบบ",color:"bg-[#e8f0fe] text-[#2756b8] border-[#c3d3f9]"},staff:{label:"เจ้าหน้าที่",color:"bg-[#eef7f2] text-[#156e3a] border-[#b7e4ce]"},viewer:{label:"ผู้ดูข้อมูล",color:"bg-[#f3f0fb] text-[#5a469b] border-[#cdc5ef]"},auditor:{label:"ผู้ตรวจสอบ",color:"bg-[#fff4e8] text-[#966020] border-[#f5d9a8]"}};function Jt(e){const t=ae[e]||{label:e,color:"bg-[#f2f4f3] text-[#52665e] border-[#d8e3de]"};return`<span class="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${t.color}">${c(t.label)}</span>`}let z={loading:!1,error:null,users:[],summary:{},meta:{},roles:[]},_={q:"",role:"all",status:"all",sort:"created_at",direction:"desc",page:1},et=null;function es(){return`
    <div id="user-directory-root" class="w-full min-w-0 max-w-full">
      ${xt()}
    </div>
  `}function xt(){const{loading:e,error:t,users:s,summary:r,meta:n}=z,i=Le("users.create")?`<button type="button" data-action="um-open-create" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${f("plus",18)}เพิ่มผู้ใช้งาน</button>`:"";return`
    ${O("การจัดการระบบ","จัดการผู้ใช้งาน","บริหารบัญชีผู้ใช้ สิทธิ์การเข้าถึง และความปลอดภัยของระบบ",i)}
    ${ts(r)}
    ${ss()}
    ${e?`<div role="status" aria-live="polite" class="flex items-center justify-center py-16 text-muted text-sm">${f("filter",20,"animate-spin mr-2")} กำลังโหลดข้อมูลผู้ใช้งาน...</div>`:t?`<div role="alert" class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">${c(t)}</div>`:rs(s,n)}
  `}function ts(e){return`
    <section aria-label="สรุปสถิติผู้ใช้" class="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      ${[{label:"บัญชีผู้ใช้ทั้งหมด",value:e.total_accounts??"—",icon:"users",bg:"bg-[#e6f4ee]",color:"text-primary"},{label:"ใช้งานอยู่",value:e.active_users??"—",icon:"check",bg:"bg-[#e7f3f8]",color:"text-[#3485a5]"},{label:"ผู้ดูแลระบบ",value:e.administrators??"—",icon:"sparkles",bg:"bg-[#fff3e5]",color:"text-[#bb7934]"},{label:"การยืนยันตัวตน 2FA",value:e.two_factor_enrolled??(e.total_accounts!=null?"พร้อมใช้งาน":"—"),icon:"lock",bg:"bg-[#f3f0fb]",color:"text-[#6b4fb8]"}].map(s=>`
        <div class="rounded-2xl border border-line bg-white p-4 sm:p-5 panel-shadow">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.bg} ${s.color}">
              ${f(s.icon,19)}
            </div>
            <p class="text-xs font-medium text-muted">${c(s.label)}</p>
          </div>
          <p class="mt-3 text-[26px] font-bold leading-none text-ink">${c(String(s.value))}</p>
        </div>
      `).join("")}
    </section>
  `}function ss(){const{q:e,role:t,status:s,sort:r,direction:n}=_,a=[{value:"all",label:"ทุกบทบาท"},...Object.entries(ae).map(([o,l])=>({value:o,label:l.label}))],i=[{value:"all",label:"ทุกสถานะ"},{value:"active",label:"ใช้งานอยู่"},{value:"inactive",label:"ระงับแล้ว"}];return`
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
            ${a.map(o=>`<option value="${o.value}"${t===o.value?" selected":""}>${c(o.label)}</option>`).join("")}
          </select>
        </div>
        <div class="w-full min-w-0 sm:w-[160px]">
          <label for="um-status" class="mb-1.5 block text-xs font-bold text-[#52665d]">สถานะ</label>
          <select id="um-status" class="field master-native-select" data-action="um-filter-status">
            ${i.map(o=>`<option value="${o.value}"${s===o.value?" selected":""}>${c(o.label)}</option>`).join("")}
          </select>
        </div>
        <div class="w-full min-w-0 sm:w-[180px]">
          <label for="um-sort" class="mb-1.5 block text-xs font-bold text-[#52665d]">เรียงตาม</label>
          <select id="um-sort" class="field master-native-select" data-action="um-filter-sort">
            <option value="created_at:desc"${r==="created_at"&&n==="desc"?" selected":""}>วันที่สร้าง (ใหม่สุด)</option>
            <option value="created_at:asc"${r==="created_at"&&n==="asc"?" selected":""}>วันที่สร้าง (เก่าสุด)</option>
            <option value="name:asc"${r==="name"&&n==="asc"?" selected":""}>ชื่อ (ก–ฮ)</option>
            <option value="name:desc"${r==="name"&&n==="desc"?" selected":""}>ชื่อ (ฮ–ก)</option>
          </select>
        </div>
        <button type="button" data-action="um-clear-filters" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas sm:w-auto">ล้างตัวกรอง</button>
      </div>
    </section>
  `}function rs(e,t){const s=Le("users.update"),r=Le("users.disable"),n=Le("users.update");if(!e.length)return`
      <div class="panel-shadow flex flex-col items-center rounded-2xl border border-line bg-white px-6 py-16 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f7f2] text-primary">
          ${f("users",27)}
        </div>
        <h3 class="text-base font-bold">ไม่พบผู้ใช้งาน</h3>
        <p class="mt-1 max-w-sm text-sm leading-relaxed text-muted">ลองเปลี่ยนคำค้นหาหรือตัวกรอง หรือเพิ่มผู้ใช้งานใหม่</p>
      </div>
    `;const{current_page:a=1,last_page:i=1,total:o=0,per_page:l=10}=t;return`
    <section aria-labelledby="um-table-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
        <div>
          <h2 id="um-table-title" class="text-sm font-bold">รายการผู้ใช้งาน</h2>
          <p class="mt-0.5 text-xs text-muted">พบ ${S(o)} บัญชี</p>
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
              ${s||r||n?'<th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">การดำเนินการ</th>':""}
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef2ee]">
            ${e.map(d=>{const p=d.role??d.roles?.[0]?.name??d.roles?.[0]??"",m=!!d.is_active,u=String(d.id)===String(window.serviceHubUser?.id);return`
                <tr class="transition hover:bg-[#fafcfa]" data-user-id="${c(String(d.id))}">
                  <td class="px-5 py-3.5">
                    <div class="flex items-center gap-3">
                      <span aria-hidden="true" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e0f0e8] text-[13px] font-bold text-primary-dark">
                        ${c(dt(d.name))}
                      </span>
                      <span class="font-semibold text-ink break-words max-w-[160px]">${c(d.name)}</span>
                    </div>
                  </td>
                  <td class="px-5 py-3.5 text-muted font-mono text-xs">${c(d.username)}</td>
                  <td class="px-5 py-3.5">${p?Jt(p):'<span class="text-muted">—</span>'}</td>
                  <td class="px-5 py-3.5">
                    <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${m?"bg-[#eef7f2] text-[#156e3a]":"bg-[#fef2f2] text-[#b91c1c]"}">
                      <span class="h-1.5 w-1.5 rounded-full ${m?"bg-[#22c55e]":"bg-[#ef4444]"}"></span>
                      ${m?"ใช้งานอยู่":"ระงับแล้ว"}
                    </span>
                  </td>
                  <td class="px-5 py-3.5 text-xs text-muted whitespace-nowrap">${B(d.created_at)}</td>
                  ${s||r||n?`
                  <td class="px-5 py-3.5 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                      ${s?`<button type="button" data-action="um-edit-user" data-id="${c(String(d.id))}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-ink hover:bg-canvas" aria-label="แก้ไข ${c(d.name)}">${f("edit",15)}แก้ไข</button>`:""}
                      ${r&&!u?`<button type="button" data-action="um-toggle-status" data-id="${c(String(d.id))}" data-active="${m?"1":"0"}" data-name="${c(d.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold ${m?"text-[#b91c1c] hover:bg-red-50":"text-[#156e3a] hover:bg-[#eef7f2]"}" aria-label="${m?"ระงับ":"เปิดใช้"} ${c(d.name)}">${f(m?"close":"check",15)}${m?"ระงับ":"เปิดใช้"}</button>`:""}
                      ${n&&!u?`<button type="button" data-action="um-reset-password" data-id="${c(String(d.id))}" data-name="${c(d.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-muted hover:bg-canvas" aria-label="รีเซ็ตรหัสผ่าน ${c(d.name)}">${f("logout",15)}รีเซ็ต</button>`:""}
                    </div>
                  </td>`:""}
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
      ${i>1?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-xs text-muted sm:px-6 sm:py-4">
        <span>แสดง ${S((a-1)*l+1)}–${S(Math.min(a*l,o))} จาก ${S(o)} บัญชี</span>
        <div class="flex items-center gap-2">
          <button type="button" data-action="um-page" data-page="${a-1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${a===1?"opacity-45 cursor-not-allowed":"hover:bg-canvas"}" ${a===1?'disabled aria-disabled="true"':""}>ก่อนหน้า</button>
          <span class="px-1 font-bold text-ink">${a} / ${i}</span>
          <button type="button" data-action="um-page" data-page="${a+1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${a===i?"opacity-45 cursor-not-allowed":"hover:bg-canvas"}" ${a===i?'disabled aria-disabled="true"':""}>ถัดไป</button>
        </div>
      </div>`:""}
    </section>
  `}function ns(){const e="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",t=new Uint8Array(16);return crypto.getRandomValues(t),Array.from(t).map(s=>e[s%e.length]).join("")}async function J(e=M){z.loading=!0,z.error=null,tt(e);const t=new URLSearchParams;_.q&&t.set("q",_.q),_.role&&_.role!=="all"&&t.set("role",_.role),_.status&&_.status!=="all"&&t.set("status",_.status),t.set("sort",_.sort),t.set("direction",_.direction),t.set("page",String(_.page)),t.set("per_page","10");try{const s=window.serviceHubUrls?.apiUsers||"/api/users",r=await A(`${s}?${t}`);z.users=r.data??[],z.summary=r.summary??{},z.meta=r.meta??{}}catch(s){z.error=s.message||"ไม่สามารถโหลดข้อมูลผู้ใช้งานได้"}finally{z.loading=!1,tt(e)}}async function as(){try{const e=window.serviceHubUrls?.apiRoles||"/api/roles",t=await A(e);z.roles=t.data??[]}catch{z.roles=Object.keys(ae).map(e=>({name:e}))}}function tt(e=M){const t=document.getElementById("user-directory-root");t&&(t.innerHTML=xt(),is(t,e))}function is(e,t=M){e.querySelector('[data-action="um-search"]')?.addEventListener("input",s=>{clearTimeout(et),et=setTimeout(()=>{_.q=s.target.value.trim(),_.page=1,J(t)},300)}),e.querySelector('[data-action="um-filter-role"]')?.addEventListener("change",s=>{_.role=s.target.value,_.page=1,J(t)}),e.querySelector('[data-action="um-filter-status"]')?.addEventListener("change",s=>{_.status=s.target.value,_.page=1,J(t)}),e.querySelector('[data-action="um-filter-sort"]')?.addEventListener("change",s=>{const[r,n]=s.target.value.split(":");_.sort=r,_.direction=n,_.page=1,J(t)}),e.querySelector('[data-action="um-clear-filters"]')?.addEventListener("click",()=>{Object.assign(_,{q:"",role:"all",status:"all",sort:"created_at",direction:"desc",page:1}),J(t)}),e.querySelectorAll('[data-action="um-page"]').forEach(s=>{s.addEventListener("click",()=>{_.page=Number(s.dataset.page),J(t)})}),e.querySelector('[data-action="um-open-create"]')?.addEventListener("click",s=>{Pe({mode:"create",trigger:s.currentTarget,toastFn:t})}),e.querySelectorAll('[data-action="um-edit-user"]').forEach(s=>{s.addEventListener("click",r=>{const n=z.users.find(o=>String(o.id)===s.dataset.id);if(!n)return;const a=n.role??n.roles?.[0]?.name??n.roles?.[0]??"",i={...n,role:a};Pe({mode:"edit",user:i,trigger:r.currentTarget,toastFn:t})})}),e.querySelectorAll('[data-action="um-reset-password"]').forEach(s=>{s.addEventListener("click",r=>{const n={id:s.dataset.id,name:s.dataset.name};Pe({mode:"reset",user:n,trigger:r.currentTarget,toastFn:t})})}),e.querySelectorAll('[data-action="um-toggle-status"]').forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.id,n=s.dataset.active==="1",a=s.dataset.name;if(await Ye({title:n?"ยืนยันการระงับการใช้งาน":"ยืนยันการเปิดใช้งาน",message:`คุณต้องการ${n?"ระงับการใช้งาน":"เปิดใช้งาน"}บัญชี "${a}" ใช่หรือไม่? ${n?"ผู้ใช้จะถูกตัดเซสชันการเข้าใช้งานทันที":""}`,confirmText:n?"ระงับการใช้งาน":"เปิดใช้งาน",variant:n?"danger":"primary",iconName:n?"close":"check"})){s.disabled=!0;try{const o=window.serviceHubUrls?.apiUsers||"/api/users";await A(`${o}/${encodeURIComponent(r)}/status`,{method:"PATCH",body:{is_active:!n}}),t(n?"ระงับการใช้งานบัญชีแล้ว":"เปิดใช้งานบัญชีแล้ว"),await J(t)}catch(o){t(o.message||"ไม่สามารถเปลี่ยนสถานะผู้ใช้ได้","error"),s.disabled=!1}}})})}function Pe({mode:e,user:t=null,trigger:s=null,toastFn:r=M}){const n=e==="reset",a=e==="edit",i=n?`รีเซ็ตรหัสผ่าน — ${c(t?.name)}`:a?"แก้ไขข้อมูลผู้ใช้":"เพิ่มผู้ใช้งานใหม่",o=z.roles.length?z.roles:Object.keys(ae).map(u=>({name:u})),l=document.createElement("div");l.innerHTML=`
    <div id="drawer-server-error" class="mb-4 hidden rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert"></div>
    <form id="um-drawer-form" novalidate class="space-y-4">
      ${n?`
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
        ${a?`
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
            ${o.map(u=>`<option value="${c(u.name)}"${t?.role===u.name?" selected":""}>${c(ae[u.name]?.label||u.name)}</option>`).join("")}
          </select>
        </div>
        ${a?"":`
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
      ${n?"รีเซ็ตรหัสผ่าน":a?"บันทึกการแก้ไข":"สร้างผู้ใช้งาน"}
    </button>
  `;l.querySelectorAll('[data-action="toggle-pwd-visibility"]').forEach(u=>{u.addEventListener("click",()=>{const b=l.querySelector(`#${u.dataset.target}`);if(!b)return;const g=b.type==="password";b.type=g?"text":"password",u.innerHTML=f(g?"eyeOff":"eye",18),u.setAttribute("aria-label",g?"ซ่อนรหัสผ่าน":"แสดงรหัสผ่าน"),u.setAttribute("aria-pressed",String(g))})});const p=()=>{const u=ns(),b=l.querySelector("#um-password")||l.querySelector("#um-new-password");if(b){b.value=u,b.type="text";const g=l.querySelector(`[data-target="${b.id}"]`);g&&(g.innerHTML=f("eyeOff",18),g.setAttribute("aria-label","ซ่อนรหัสผ่าน"),g.setAttribute("aria-pressed","true"))}};l.querySelector("#um-gen-pw-btn")?.addEventListener("click",p),l.querySelector("#um-gen-init-pw-btn")?.addEventListener("click",p);const m=l.querySelector("#um-drawer-form");m.addEventListener("submit",async u=>{u.preventDefault();const b=document.getElementById("um-drawer-submit"),g=l.querySelector("#drawer-server-error");g.classList.add("hidden"),g.textContent="",l.querySelectorAll('[aria-invalid="true"]').forEach($=>$.removeAttribute("aria-invalid")),l.querySelectorAll("#um-password-error").forEach($=>{$.textContent="ความยาวอย่างน้อย 15 ตัวอักษร",$.classList.remove("text-red-600"),$.classList.add("text-muted")}),l.querySelectorAll("#um-name-error, #um-username-error").forEach($=>{$.textContent="",$.classList.add("hidden")});const w=new FormData(m),k={};e==="create"?(k.name=String(w.get("name")||"").trim(),k.username=String(w.get("username")||"").trim(),k.password=String(w.get("password")||""),k.role=String(w.get("role")||"")):e==="edit"?(k.name=String(w.get("name")||"").trim(),k.role=String(w.get("role")||"")):e==="reset"&&(k.password=String(w.get("password")||"")),b&&(b.disabled=!0,b.classList.add("opacity-60"));try{const $=window.serviceHubUrls?.apiUsers||"/api/users";let D,T;e==="create"?(D=$,T="POST"):e==="edit"?(D=`${$}/${encodeURIComponent(t.id)}`,T="PUT"):(D=`${$}/${encodeURIComponent(t.id)}/reset-password`,T="POST"),await A(D,{method:T,body:k}),qe(),r(e==="create"?"สร้างผู้ใช้งานเรียบร้อยแล้ว":e==="edit"?"บันทึกการแก้ไขแล้ว":"รีเซ็ตรหัสผ่านเรียบร้อยแล้ว"),await J(r)}catch($){b&&(b.disabled=!1,b.classList.remove("opacity-60")),$.status===422&&$.errors?(Object.entries($.errors).forEach(([D,T])=>{const H=m.querySelector(`[name="${D}"]`),q=m.querySelector(`#um-${D}-error`);H&&H.setAttribute("aria-invalid","true"),q&&(q.textContent=T[0],q.classList.remove("hidden","text-muted"),q.classList.add("text-red-600"))}),m.querySelector('[aria-invalid="true"]')?.focus()):(g.textContent=$.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล",g.classList.remove("hidden"))}}),Qt({title:i,content:l,footer:d,trigger:s,initialFocusSelector:e==="reset"?"#um-new-password":"#um-name"})}function os(e){return setTimeout(()=>{J(M),z.roles.length||as()},0),es()}let gt=[],C={"cleaning-zones":[],"waste-types":[]};const Ne=new Set,st=new Set;let je=null;function ht(e){Ne.delete(e),C[e]=[]}async function Be(e){const t=[...new Set(e.fields.filter(s=>s.type==="reference").map(s=>s.reference))];for(const s of t)Ne.has(s)||!v(`${s}.view`)||(C[s]=await ot(Re(s)),Ne.add(s))}async function ls(e,t=new URLSearchParams){const s=Y.find(a=>a.id===e);if(!s)throw new Error("Unknown activity module");const r=new URLSearchParams({per_page:"6",page:String(Math.max(1,Number.parseInt(t.get("page"),10)||1))});for(const a of["q","from","to","sort",...s.fields.filter(i=>i.type==="reference").map(i=>i.name)])t.get(a)&&r.set(a,t.get(a));const n=await A(`${be(e)}?${r}`);return gt=Array.isArray(n.data)?n.data:[],n}function vt(e,t,s=C){return!e||t==null||t===""?"—":e.type==="reference"?c(s[e.reference]?.find(r=>String(r.id)===String(t))?.name||"ไม่พบข้อมูลอ้างอิง"):e.type==="number"||e.type==="integer"?`${S(t)}${e.unit?` ${c(e.unit)}`:""}`:e.type==="date"?B(t):c(t)}function ds(e,t="",s="",r=C){const n=`field-${e.name}`,a=`id="${n}" name="${e.name}" class="field" ${e.required?"required":""} ${s?'aria-invalid="true"':""} aria-describedby="${n}-help"`;let i;if(e.type==="textarea")i=`<textarea ${a} rows="4" maxlength="10000">${c(t)}</textarea>`;else if(e.type==="reference")i=`
      <select ${a}>
        <option value="" disabled ${t?"":"selected"}>เลือก${c(e.label)}</option>
        ${(r[e.reference]||[]).filter(o=>o.is_active||String(o.id)===String(t)).map(o=>`
          <option value="${c(o.id)}" ${String(t)===String(o.id)?"selected":""}>
            ${c(o.name)}${o.symbol?` (${c(o.symbol)})`:""}
          </option>
        `).join("")}
      </select>
    `;else if(e.type==="select")i=`
      <select ${a}>
        <option value="" disabled ${t?"":"selected"}>ระบุ${c(e.label)}</option>
        ${(e.options||[]).map(o=>`<option value="${c(o)}" ${t===o?"selected":""}>${c(o)}</option>`).join("")}
      </select>
    `;else{const o=e.type==="number"||e.type==="integer",l=e.type==="number"?["distance_km","fee_amount"].includes(e.name)?"0.01":"0.001":"1";i=`<input ${a} type="${o?"number":e.type}" ${o?`step="${l}" min="0"`:""} ${e.type==="text"?`maxlength="${e.name==="project_name"?500:255}"`:""} value="${c(t)}" placeholder="${e.type==="text"?`ระบุ${c(e.label)}`:""}">`}return`
    <div class="${e.type==="textarea"?"sm:col-span-2":""}">
      <label for="${n}" class="mb-1.5 block text-sm font-semibold text-[#41564c]">
        ${c(e.label)} ${e.required?'<span class="text-[#bf5b53]" aria-label="จำเป็น">*</span>':""}
      </label>
      ${i}
      <p id="${n}-help" class="mt-1.5 min-h-4 text-xs ${s?"text-[#b73c35]":"text-muted"}">
        ${s?c(s):e.unit?`หน่วย: ${c(e.unit)}`:"&nbsp;"}
      </p>
    </div>
  `}function cs(e,t,s=C){const r=Object.fromEntries(new FormData(e)),n={};return t.fields.forEach(a=>{const i=String(r[a.name]??"").trim();if(r[a.name]=i,a.required&&!i)n[a.name]=`กรุณาระบุ${a.label}`;else if(i&&(a.type==="number"||a.type==="integer")){const o=Number(i);(!Number.isFinite(o)||o<0||a.type==="integer"&&!Number.isInteger(o))&&(n[a.name]=`กรุณาระบุ${a.label}เป็นจำนวนที่ถูกต้อง`)}else i&&a.type==="date"&&Number.isNaN(new Date(i).getTime())?n[a.name]="กรุณาระบุวันที่ที่ถูกต้อง":a.type==="reference"&&i&&!s[a.reference]?.some(o=>String(o.id)===i&&o.is_active)&&(n[a.name]=`กรุณาเลือก${a.label}จากรายการ`)}),{data:r,errors:n}}function ms({module:e,group:t,params:s,records:r=gt,references:n=C,meta:a=null}){const i=s.get("q")||"",o=s.get("from")||"",l=s.get("to")||"",d=s.get("sort")||"newest",p=6,m=Math.max(0,Number(a?.total??r.length)||0),u=Math.max(1,Number(a?.last_page)||Math.ceil(m/p)||1),b=Math.min(u,Math.max(1,Number(a?.current_page??s.get("page"))||1)),g=r,w=e.fields.filter(h=>h.name!=="service_date").slice(0,3),k=h=>{const R=new URLSearchParams(s);return R.set("page",String(h)),`#/module/${e.id}?${R}`},$=e.fields.filter(h=>h.type==="reference").map(h=>{const R=s.get(h.name)||"";return`
      <div class="w-full min-w-0 sm:w-[170px]">
        <label for="${h.name}-filter" class="mb-1.5 block text-xs font-bold text-[#52665d]">${h.label}</label>
        <select id="${h.name}-filter" name="${h.name}" class="field">
          <option value="">ทั้งหมด</option>
          ${(n[h.reference]||[]).map(V=>`<option value="${c(V.id)}" ${R===String(V.id)?"selected":""}>${c(V.name)}</option>`).join("")}
        </select>
      </div>
    `}).join("");(o||l||d!=="newest"||e.fields.some(h=>h.type==="reference"&&s.get(h.name)))&&st.add(e.id);const T=st.has(e.id),H=[];o&&l?H.push(`ช่วงวันที่ ${B(o)} – ${B(l)}`):o?H.push(`ตั้งแต่วันที่ ${B(o)}`):l&&H.push(`ถึงวันที่ ${B(l)}`),i&&H.push(`ค้นหา "${i}"`),e.fields.filter(h=>h.type==="reference").forEach(h=>{const R=s.get(h.name);if(R){const V=n[h.reference]?.find(W=>String(W.id)===String(R));V&&H.push(`${h.label}: ${V.name}`)}});const q=H.length>0,ie=q?`
    <div class="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#cfe5d6] bg-[#f0f8f3] px-4 py-3 text-xs sm:text-sm text-[#2b4c3c]" role="region" aria-label="สถานะตัวกรองข้อมูล">
      <div class="flex items-center gap-2">
        ${f("filter",16,"shrink-0 text-primary")}
        <div>
          <span class="font-bold">กำลังกรองข้อมูล:</span>
          <span class="text-[#3c594b]">${c(H.join(" · "))}</span>
          <span class="ml-1 text-xs text-muted font-normal">(${m>0?`พบ ${S(m)} รายการ`:"ไม่พบรายการ"})</span>
        </div>
      </div>
      <a href="#/module/${e.id}" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-[#b2dac0] bg-white px-3.5 py-1.5 text-xs font-bold text-primary shadow-xs hover:bg-[#ebf5ee]">
        ${f("close",14)}แสดงข้อมูลทั้งหมดทุกช่วงเวลา
      </a>
    </div>
  `:"";return`
    ${O(t?.label||"",e.label,`จัดการข้อมูล${e.short} ค้นหาและกรองรายการตามช่วงวันที่`,v(`${e.id}.create`)?xe("เพิ่มข้อมูล",`#/module/${e.id}/new`):"")}
    <section aria-label="ตัวกรองรายการ" class="panel-shadow mb-5 w-full max-w-full min-w-0 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองข้อมูล</h2>
        ${Ce({from:o,to:l,formId:"filter-form"})}
      </div>
      <form id="filter-form" data-module="${e.id}" class="flex flex-wrap items-end gap-3">
        <div class="w-full min-w-0 sm:min-w-[180px] sm:flex-1">
          <label for="search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <div class="relative">
            ${f("search",18,"pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]")}
            <input id="search" name="q" class="field pl-10" type="search" placeholder="พิมพ์ค้นหาทันที..." value="${c(i)}" data-action="live-filter" autocomplete="off">
          </div>
        </div>
        <button type="button" data-action="toggle-mobile-filters" data-module="${e.id}" aria-expanded="${T}" aria-controls="advanced-filters-${e.id}" class="inline-flex min-h-11 w-full items-center justify-between rounded-xl border border-line px-4 text-sm font-semibold text-primary-dark md:hidden">
          ตัวกรองเพิ่มเติม ${f("chevronDown",16,T?"rotate-180":"")}
        </button>
        <div id="advanced-filters-${e.id}" class="${T?"flex":"hidden"} w-full flex-wrap items-end gap-3 md:contents">
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label>
            <input id="date-from" class="field" type="date" name="from" value="${c(o)}" data-action="live-filter">
          </div>
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label>
            <input id="date-to" class="field" type="date" name="to" value="${c(l)}" data-action="live-filter">
          </div>
          ${$}
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="sort" class="mb-1.5 block text-xs font-bold text-[#52665d]">เรียงตาม</label>
            <select id="sort" name="sort" class="field" data-action="live-filter">
              <option value="newest" ${d==="newest"?"selected":""}>วันที่ล่าสุด</option>
              <option value="oldest" ${d==="oldest"?"selected":""}>วันที่เก่าสุด</option>
            </select>
          </div>
          <div class="w-full sm:w-auto">
            <a href="#/module/${e.id}" data-action="clear-filters" class="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas sm:w-auto">ล้างตัวกรอง</a>
          </div>
        </div>
      </form>
    </section>

    ${ie}

    <section aria-labelledby="records-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
        <div>
          <h2 id="records-title" class="text-sm font-bold">รายการข้อมูล</h2>
          <p class="mt-0.5 text-xs text-muted">พบ ${S(m)} รายการ</p>
        </div>
        <span class="rounded-full bg-[#f0f7f2] px-2.5 py-1 text-[11px] font-bold text-primary">${c(e.short)}</span>
      </div>
      ${g.length?`
      <div class="data-table-scroll block overflow-x-auto w-full max-w-full min-w-0">
        <table class="w-full min-w-[650px] text-left text-sm" role="table">
          <thead class="bg-[#f9fbf9] text-xs font-semibold text-muted">
            <tr>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">วันที่ดำเนินงาน</th>
              ${w.map(h=>`<th scope="col" class="px-5 py-3.5 whitespace-nowrap">${c(h.label)}</th>`).join("")}
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">ผู้บันทึก</th>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">ดูข้อมูล</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef2ee]">
            ${g.map(h=>`
              <tr class="transition hover:bg-[#fafcfa]">
                <td class="whitespace-nowrap px-5 py-3.5 font-semibold text-ink">${B(h.service_date)}</td>
                ${w.map(R=>`<td class="max-w-[240px] truncate px-5 py-3.5 text-[#53675e]">${vt(R,h[R.name],n)}</td>`).join("")}
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
        <span>แสดง ${S((b-1)*p+1)}–${S(Math.min(b*p,m))} จาก ${S(m)} รายการ</span>
        <div class="flex items-center gap-2">
          <a href="${k(Math.max(1,b-1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${b===1?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${b===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="px-1 font-bold text-ink">${b} / ${u}</span>
          <a href="${k(Math.min(u,b+1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${b===u?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${b===u?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:`
      <div class="flex flex-col items-center px-6 py-14 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${q?"bg-[#fef5e7] text-[#c2782b]":"bg-[#f1f7f2] text-primary"}">${f("empty",27)}</div>
        <h3 class="text-base font-bold text-ink">${q?"ไม่พบรายการข้อมูลตามเงื่อนไขที่เลือก":"ยังไม่มีข้อมูลในหมวดนี้"}</h3>
        <p class="mt-2 max-w-md text-sm leading-relaxed text-muted">
          ${q?`ไม่มีการบันทึกงานบริการ${c(e.short)}${o&&l?` ระหว่างวันที่ ${B(o)} ถึง ${B(l)}`:""} คุณสามารถคลิกปุ่มด้านล่างเพื่อดูข้อมูลทั้งหมดในอดีต หรือเลือกช่วงเวลาอื่น`:`เริ่มต้นด้วยการเพิ่มรายการข้อมูลการดำเนินงานในหมวด${c(e.short)}`}
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          ${q?`
            <a href="#/module/${e.id}" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-sm hover:bg-primary-dark">
              ${f("grid",16)}แสดงข้อมูลทั้งหมดทุกช่วงเวลา
            </a>
          `:""}
          ${v(`${e.id}.create`)?`
            <a href="#/module/${e.id}/new" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl ${q?"border border-line bg-white text-ink hover:bg-canvas":"bg-primary text-white hover:bg-primary-dark"} px-5 text-sm font-bold">
              ${f("plus",16)}เพิ่มข้อมูลใหม่
            </a>
          `:""}
        </div>
      </div>`}
    </section>
  `}function ps({module:e,group:t,record:s,references:r=C}){return`
    ${O(t?.label||"","รายละเอียดข้อมูล",`ข้อมูล${e.short} วันที่ ${B(s.service_date)}`,`
      <div class="flex flex-wrap gap-2">
        ${v(`${e.id}.update`)?ne("แก้ไข",`#/module/${e.id}/${encodeURIComponent(s.id)}/edit`,"edit"):""}
        ${v(`${e.id}.delete`)?`
          <button type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#eed8d5] bg-white px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-activity" data-module="${e.id}" data-id="${c(s.id)}">
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
          ${e.fields.map(n=>`
            <div class="border-b border-[#edf1ed] py-4">
              <dt class="text-xs font-semibold text-muted">${c(n.label)}</dt>
              <dd class="mt-1.5 break-words text-sm font-bold text-ink">${vt(n,s[n.name],r)}</dd>
            </div>
          `).join("")}
        </dl>
      </section>
      <aside class="h-fit rounded-2xl border border-line bg-white p-5">
        <h2 class="text-sm font-bold">ประวัติรายการ</h2>
        <div class="mt-5 space-y-5 border-l-2 border-[#d8eadf] pl-4">
          <div>
            <p class="text-xs font-bold text-primary">บันทึกข้อมูล</p>
            <p class="mt-1 text-xs text-muted">${c(s.created_by||"ไม่ระบุ")}</p>
            <p class="mt-0.5 text-xs text-muted">${B(s.created_at)}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-primary">แก้ไขล่าสุด</p>
            <p class="mt-1 text-xs text-muted">${c(s.updated_by||"ไม่ระบุ")}</p>
            <p class="mt-0.5 text-xs text-muted">${B(s.updated_at)}</p>
          </div>
        </div>
        <div class="mt-5 rounded-xl bg-[#f4f8f4] p-3 text-[11px] leading-relaxed text-muted">
          การเปลี่ยนแปลงถูกบันทึกใน Audit Log ของระบบ
        </div>
      </aside>
    </div>
  `}function Ue({module:e,group:t,record:s=null,errors:r={},values:n=null,references:a=C}){const i=!!s,o={...n||je||s||{}};if(!i&&!o.service_date){const d=new Date,p=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,"0"),u=String(d.getDate()).padStart(2,"0");o.service_date=`${p}-${m}-${u}`}const l=`${i?"แก้ไข":"เพิ่ม"}ข้อมูล${e.short}`;return`
    ${O(t?.label||"",l,i?"ตรวจสอบและแก้ไขรายละเอียดรายการนี้":"กรอกข้อมูลการดำเนินงานให้ครบตามช่องที่กำหนด")}
    <section class="panel-shadow w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-5 py-5 sm:px-7">
        <h2 class="font-bold">รายละเอียดการดำเนินงาน</h2>
        <p class="mt-1 text-xs text-muted">ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p>
      </div>
      <form id="record-form" data-module="${e.id}" data-id="${s?c(s.id):""}" novalidate class="p-5 sm:p-7">
        <div class="grid min-w-0 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          ${e.fields.map(d=>ds(d,o[d.name]??"",r[d.name],a)).join("")}
        </div>
        <div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <a href="${s?`#/module/${e.id}/${encodeURIComponent(s.id)}`:`#/module/${e.id}`}" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold text-[#566a60] hover:bg-canvas">
            ยกเลิก
          </a>
          <button type="submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">
            ${f("check",18)}${i?"บันทึกการแก้ไข":"บันทึกข้อมูล"}
          </button>
        </div>
      </form>
    </section>
  `}async function us(e,t,{navigate:s=j,showToast:r=M}={}){if(await Ye({title:"ยืนยันการลบรายการ",message:"รายการนี้จะถูกลบออกจากฐานข้อมูลอย่างถาวร คุณต้องการดำเนินการต่อหรือไม่?",confirmText:"ลบรายการ",variant:"danger",iconName:"trash"}))try{const a=`${be(e)}/${t}`;await A(a,{method:"DELETE"}),r("ลบรายการเรียบร้อยแล้ว"),s(`/module/${e}`)}catch(a){r(a.message||"ไม่สามารถลบรายการได้","error")}}async function fs(e){const t=e.dataset.module,s=Y.find(i=>i.id===t);if(!s)return;const{data:r,errors:n}=cs(e,s,C),a=e.dataset.id?{id:e.dataset.id}:null;if(Object.keys(n).length){je=r;const i=fe.find(d=>d.id===s.group),o=Ue({module:s,group:i,record:a,errors:n,values:r,references:C}),l=document.querySelector("#main-content");l&&(l.innerHTML=o),document.querySelector('[aria-invalid="true"]')?.focus();return}try{const i=a?`${be(s.id)}/${a.id}`:be(s.id),l=await A(i,{method:a?"PUT":"POST",body:r});je=null,j(`/module/${s.id}/${l.data.id}`),M("บันทึกข้อมูลแล้ว")}catch(i){je=r;const o=i.fieldErrors||Object.fromEntries(Object.entries(i.fields||{}).map(([m,u])=>[m,Array.isArray(u)?u[0]:u]));M(i.message||"ไม่สามารถบันทึกข้อมูลได้","error");const l=fe.find(m=>m.id===s.group),d=Ue({module:s,group:l,record:a,errors:o,values:r,references:C}),p=document.querySelector("#main-content");p&&(p.innerHTML=d),document.querySelector('[aria-invalid="true"]')?.focus()}}async function bs(e){const t=e.parts[1],s=Y.find(o=>o.id===t);if(!s)return'<div class="p-8 text-center text-muted">ไม่พบข้อมูลโมดูลงานบริการ</div>';const r=fe.find(o=>o.id===s.group);if(e.parts.length===2){const[o]=await Promise.all([ls(t,e.params),Be(s)]);if(!e.isCurrent())return null;const l=Math.max(1,Number.parseInt(e.params.get("page"),10)||1),d=Math.max(1,Number(o.meta?.last_page)||1);if(Number(o.meta?.total)>0&&l>d){const p=new URLSearchParams(e.params);return p.set("page",String(d)),j(`/module/${t}?${p}`),null}return ms({module:s,group:r,params:e.params,records:o.data,references:C,meta:o.meta})}if(e.parts.length===3&&e.parts[2]==="new")return v(`${s.id}.create`)?(await Be(s),Ue({module:s,group:r,record:null,references:C})):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์สร้างข้อมูลในหมวดนี้</div>';const n=decodeURIComponent(e.parts[2]||"");let a;try{[a]=await Promise.all([A(`${be(t)}/${encodeURIComponent(n)}`),Be(s)])}catch(o){if(o.status===404)return'<div class="p-8 text-center text-muted">ไม่พบรายการข้อมูลที่ต้องการ</div>';throw o}if(!e.isCurrent())return null;const i=a.data;return e.parts.length===4&&e.parts[3]==="edit"?v(`${s.id}.update`)?Ue({module:s,group:r,record:i,references:C}):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์แก้ไขข้อมูลในหมวดนี้</div>':ps({module:s,group:r,record:i,references:C})}let ge=[],he=[];const wt=new Set;async function De(e){if(!v(`${e}.view`))return;const t=await ot(Re(e));e==="cleaning-zones"&&(ge=t),e==="waste-types"&&(he=t),wt.add(e)}function yt(e){return Number(e.usage_count)||0}function $t(e){return Number(e.usage_count)||0}function xs({params:e,zones:t=ge}){const s=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),r=e.get("sort")==="name"?"name":"code",n=e.get("status")||"all",a=10,i=t.filter(m=>!s||(m.code+" "+m.name).toLocaleLowerCase("th-TH").includes(s)).filter(m=>n==="all"?!0:n==="active"?m.is_active:!m.is_active).sort((m,u)=>String(m[r]).localeCompare(String(u[r]),"th",{numeric:!0})),o=Math.max(1,Math.ceil(i.length/a)),l=Math.min(o,Math.max(1,Number.parseInt(e.get("page"),10)||1)),d=i.slice((l-1)*a,l*a),p=m=>{const u=new URLSearchParams;return e.get("q")&&u.set("q",e.get("q")),n!=="all"&&u.set("status",n),r!=="code"&&u.set("sort",r),m>1&&u.set("page",String(m)),"#/cleaning-zones"+(u.size?"?"+u:"")};return`
    ${O("ข้อมูลพื้นฐาน","เขตรักษาความสะอาด","จัดการรหัสและชื่อเขตสำหรับรายการล้างทำความสะอาดถนน",xe("เพิ่มเขต","#/cleaning-zones/new"))}
    <section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6">
      <form id="zone-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_160px_160px_auto_auto] sm:items-end">
        <div>
          <label for="zone-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label>
          <input id="zone-search" name="q" type="search" class="field" placeholder="พิมพ์ค้นหาทันที..." value="${c(e.get("q")||"")}" data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="zone-status" class="mb-1.5 block text-sm font-semibold">สถานะ</label>
          <select id="zone-status" name="status" class="field master-native-select" data-action="live-filter">
            <option value="all" ${n==="all"?"selected":""}>ทุกสถานะ</option>
            <option value="active" ${n==="active"?"selected":""}>ใช้งานอยู่</option>
            <option value="inactive" ${n==="inactive"?"selected":""}>ระงับแล้ว</option>
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
        <p class="mt-1 text-xs text-muted">พบ ${S(i.length)} รายการ</p>
      </div>
      ${d.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${d.map(m=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/cleaning-zones/${encodeURIComponent(m.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${c(m.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${c(m.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานล้างถนน ${S(yt(m))} รายการ</span>
            ${f("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบเขตรักษาความสะอาด</h3>
        <p class="mt-2 text-sm text-muted">${s?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มเขต"}</p>
        <div class="mt-5">${s?ne("แสดงทั้งหมด","#/cleaning-zones"):xe("เพิ่มเขต","#/cleaning-zones/new")}</div>
      </div>`}
      ${i.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${S((l-1)*a+1)}–${S(Math.min(l*a,i.length))} จาก ${S(i.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===1?"pointer-events-none opacity-45":""}" href="${p(l-1)}" ${l===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${l} / ${o}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===o?"pointer-events-none opacity-45":""}" href="${p(l+1)}" ${l===o?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function gs({zone:e}){const t=yt(e),s=Number(e.referenced_count)||0;return`
    ${O("ข้อมูลพื้นฐาน",e.name,"รายละเอียดเขตรักษาความสะอาด",`
      <div class="flex flex-wrap gap-2">
        ${ne("แก้ไข",`#/cleaning-zones/${encodeURIComponent(e.id)}/edit`,"edit")}
        <button type="button" class="min-h-11 rounded-xl border border-[#eed8d5] px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-reference" data-type="cleaning-zones" data-id="${c(e.id)}" data-name="${c(e.name)}" data-usage="${s}">
          ${f("trash",17)} ลบเขต
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
          <dd class="mt-1 font-bold">${S(t)} รายการ</dd>
        </div>
      </dl>
      ${s?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">เขตนี้ยังมีรายการล้างถนนอ้างอิงอยู่ รวมถึงรายการที่ลบออกจากหน้าจอ จึงไม่สามารถลบเขตได้</p>':""}
    </section>
  `}function Fe(e=null,t={},s=e||{}){const n=!!e?"แก้ไขเขตรักษาความสะอาด":"เพิ่มเขตรักษาความสะอาด",a=(i,o,l)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="zone-${i}">
        ${c(o)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="zone-${i}" name="${i}" type="text" maxlength="${l}" required value="${c(s[i]||"")}" aria-describedby="zone-${i}-error" ${t[i]?'aria-invalid="true"':""}>
      <p id="zone-${i}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${c(t[i]||"")}</p>
    </div>
  `;return`
    ${O("ข้อมูลพื้นฐาน",n,"กรอกรหัสและชื่อเขตเพื่อใช้ในฟอร์มล้างทำความสะอาดถนน")}
    <section class="panel-shadow max-w-2xl rounded-2xl border border-line bg-white p-5 sm:p-7">
      <form id="zone-form" data-id="${c(e?.id||"")}" novalidate>
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
  `}function hs({params:e,wasteTypes:t=he}){const s=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),r=e.get("sort")==="name"?"name":"code",n=e.get("status")||"all",a=10,i=t.filter(m=>!s||(m.code+" "+m.name).toLocaleLowerCase("th-TH").includes(s)).filter(m=>n==="all"?!0:n==="active"?m.is_active:!m.is_active).sort((m,u)=>String(m[r]).localeCompare(String(u[r]),"th",{numeric:!0})),o=Math.max(1,Math.ceil(i.length/a)),l=Math.min(o,Math.max(1,Number.parseInt(e.get("page"),10)||1)),d=i.slice((l-1)*a,l*a),p=m=>{const u=new URLSearchParams;return e.get("q")&&u.set("q",e.get("q")),n!=="all"&&u.set("status",n),r!=="code"&&u.set("sort",r),m>1&&u.set("page",String(m)),"#/waste-types"+(u.size?"?"+u:"")};return`
    ${O("ข้อมูลพื้นฐาน","ประเภทขยะมูลฝอย","จัดการรหัสและชื่อประเภทสำหรับรายการมูลฝอย",xe("เพิ่มประเภท","#/waste-types/new"))}
    <section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6">
      <form id="wasteType-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_160px_160px_auto_auto] sm:items-end">
        <div>
          <label for="wasteType-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label>
          <input id="wasteType-search" name="q" type="search" class="field" placeholder="พิมพ์ค้นหาทันที..." value="${c(e.get("q")||"")}" data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="wasteType-status" class="mb-1.5 block text-sm font-semibold">สถานะ</label>
          <select id="wasteType-status" name="status" class="field master-native-select" data-action="live-filter">
            <option value="all" ${n==="all"?"selected":""}>ทุกสถานะ</option>
            <option value="active" ${n==="active"?"selected":""}>ใช้งานอยู่</option>
            <option value="inactive" ${n==="inactive"?"selected":""}>ระงับแล้ว</option>
          </select>
        </div>
        <div>
          <label for="wasteType-sort" class="mb-1.5 block text-sm font-semibold">เรียงตาม</label>
          <select id="wasteType-sort" name="sort" class="field master-native-select" data-action="live-filter">
            <option value="code" ${r==="code"?"selected":""}>รหัสประเภท</option>
            <option value="name" ${r==="name"?"selected":""}>ชื่อประเภท</option>
          </select>
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        <a href="#/waste-types" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>
      </form>
    </section>

    <section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-4 py-4 sm:px-6">
        <h2 class="text-sm font-bold">รายการประเภท</h2>
        <p class="mt-1 text-xs text-muted">พบ ${S(i.length)} รายการ</p>
      </div>
      ${d.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${d.map(m=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/waste-types/${encodeURIComponent(m.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${c(m.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${c(m.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานบริหารจัดการมูลฝอย ${S($t(m))} รายการ</span>
            ${f("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบประเภทขยะมูลฝอย</h3>
        <p class="mt-2 text-sm text-muted">${s?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มประเภท"}</p>
        <div class="mt-5">${s?ne("แสดงทั้งหมด","#/waste-types"):xe("เพิ่มประเภท","#/waste-types/new")}</div>
      </div>`}
      ${i.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${S((l-1)*a+1)}–${S(Math.min(l*a,i.length))} จาก ${S(i.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===1?"pointer-events-none opacity-45":""}" href="${p(l-1)}" ${l===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${l} / ${o}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===o?"pointer-events-none opacity-45":""}" href="${p(l+1)}" ${l===o?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function vs({wasteType:e}){const t=$t(e),s=Number(e.referenced_count)||0;return`
    ${O("ข้อมูลพื้นฐาน",e.name,"รายละเอียดประเภทขยะมูลฝอย",`
      <div class="flex flex-wrap gap-2">
        ${ne("แก้ไข",`#/waste-types/${encodeURIComponent(e.id)}/edit`,"edit")}
        <button type="button" class="min-h-11 rounded-xl border border-[#eed8d5] px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-reference" data-type="waste-types" data-id="${c(e.id)}" data-name="${c(e.name)}" data-usage="${s}">
          ${f("trash",17)} ลบประเภท
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
          <dd class="mt-1 font-bold">${S(t)} รายการ</dd>
        </div>
      </dl>
      ${s?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">ประเภทนี้ยังมีรายการมูลฝอยอ้างอิงอยู่ รวมถึงรายการที่ลบออกจากหน้าจอ จึงไม่สามารถลบประเภทได้</p>':""}
    </section>
  `}function Oe(e=null,t={},s=e||{}){const n=!!e?"แก้ไขประเภทขยะมูลฝอย":"เพิ่มประเภทขยะมูลฝอย",a=(i,o,l)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="wasteType-${i}">
        ${c(o)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="wasteType-${i}" name="${i}" type="text" maxlength="${l}" required value="${c(s[i]||"")}" aria-describedby="wasteType-${i}-error" ${t[i]?'aria-invalid="true"':""}>
      <p id="wasteType-${i}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${c(t[i]||"")}</p>
    </div>
  `;return`
    ${O("ข้อมูลพื้นฐาน",n,"กรอกรหัสและชื่อประเภทเพื่อใช้ในฟอร์มงานบริหารจัดการมูลฝอย")}
    <section class="panel-shadow max-w-2xl rounded-2xl border border-line bg-white p-5 sm:p-7">
      <form id="wasteType-form" data-id="${c(e?.id||"")}" novalidate>
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
  `}async function ws(e,t,s,r,{navigate:n=j,showToast:a=M,refreshData:i=De}={}){if(r>0){a(`ไม่สามารถลบ "${s}" ได้เนื่องจากมีข้อมูลงานบริการที่อ้างอิงอยู่`,"error");return}const o=e==="cleaning-zones"?"เขต":"ประเภทขยะ";if(await Ye({title:`ยืนยันการลบ${o}`,message:`คุณต้องการลบ "${s}" ออกจากระบบใช่หรือไม่?`,confirmText:`ลบ${o}`,variant:"danger",iconName:"trash"}))try{const d=`${Re(e)}/${t}`;await A(d,{method:"DELETE"}),a(`ลบ${o}เรียบร้อยแล้ว`),await i(e),ht(e),n(`/${e}`)}catch(d){a(d.message||`ไม่สามารถลบ${o}ได้`,"error")}}async function rt(e,t){const s=e.dataset.id,r=Object.fromEntries(new FormData(e));r.is_active=e.elements.namedItem("is_active")?.checked??!0;try{const n=`${Re(t)}${s?`/${s}`:""}`,a=await A(n,{method:s?"PUT":"POST",body:r});await De(t),ht(t),j(`/${t}/${a.data.id}`),M("บันทึกข้อมูลแล้ว")}catch(n){M(n.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล","error");const a=n.fieldErrors||Object.fromEntries(Object.entries(n.fields||{}).map(([p,m])=>[p,Array.isArray(m)?m[0]:m])),o=(t==="cleaning-zones"?ge:he).find(p=>String(p.id)===s)||null,l=t==="cleaning-zones"?Fe(o,a,r):Oe(o,a,r),d=document.querySelector("#main-content");d&&(d.innerHTML=l)}}async function nt(e,t){wt.has(e)||await De(e);const s=e==="cleaning-zones",r=s?ge:he;if(t.parts.length===1)return s?xs({params:t.params,zones:ge}):hs({params:t.params,wasteTypes:he});if(t.parts.length===2&&t.parts[1]==="new")return s?Fe():Oe();const n=decodeURIComponent(t.parts[1]||""),a=r.find(i=>String(i.id)===n);return a?t.parts.length===3&&t.parts[2]==="edit"?s?Fe(a):Oe(a):s?gs({zone:a}):vs({wasteType:a}):'<div class="p-8 text-center text-muted">ไม่พบข้อมูลอ้างอิงที่ต้องการ</div>'}function ys(){const e=window.serviceHubUser||{},t=dt(e.name||e.username||"U"),s=e.roles||[],r=s[0]||"staff",n=ae[r]||{label:r,color:"border-gray-200 bg-gray-50 text-gray-700"};return`
    ${O("โปรไฟล์ส่วนบุคคล","ข้อมูลบัญชีของฉัน","จัดการชื่อที่แสดงและเปลี่ยนรหัสผ่านสำหรับเข้าใช้งานระบบ")}
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
                <span class="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${n.color}">
                  ${c(n.label)}
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
                ${s.map(a=>{const i=ae[a]||{label:a,color:"border-gray-200 bg-gray-50"};return`<span class="rounded-lg border px-2.5 py-1 text-xs font-medium ${i.color}">${c(i.label)}</span>`}).join("")}
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
  `}function $s({toastFn:e=M,onNameUpdated:t}={}){const s=document.getElementById("profile-name-form"),r=document.getElementById("profile-password-form");document.querySelectorAll('[data-action="toggle-pwd"]').forEach(n=>{n.addEventListener("click",()=>{const a=n.dataset.target,i=document.getElementById(a);if(!i)return;const o=i.type==="password";i.type=o?"text":"password",n.innerHTML=f(o?"eyeOff":"eye",18),n.setAttribute("aria-label",o?"ซ่อนรหัสผ่าน":"แสดงรหัสผ่าน"),n.setAttribute("aria-pressed",String(o))})}),document.getElementById("profile-gen-pwd")?.addEventListener("click",()=>{const n="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",a=new Uint8Array(16);crypto.getRandomValues(a);const i=Array.from(a).map(d=>n[d%n.length]).join(""),o=document.getElementById("profile-new-pwd"),l=document.getElementById("profile-confirm-pwd");if(o){o.value=i,o.type="text";const d=document.querySelector('[data-target="profile-new-pwd"]');d&&(d.innerHTML=f("eyeOff",18),d.setAttribute("aria-label","ซ่อนรหัสผ่าน"),d.setAttribute("aria-pressed","true"))}if(l){l.value=i,l.type="text";const d=document.querySelector('[data-target="profile-confirm-pwd"]');d&&(d.innerHTML=f("eyeOff",18),d.setAttribute("aria-label","ซ่อนรหัสผ่าน"),d.setAttribute("aria-pressed","true"))}}),s?.addEventListener("submit",async n=>{n.preventDefault();const a=document.getElementById("profile-name"),i=document.getElementById("profile-name-error"),o=document.getElementById("profile-name-submit"),l=a.value.trim();if(!l){i&&(i.textContent="กรุณาระบุชื่อ-นามสกุล",i.classList.remove("hidden")),a.focus();return}i&&i.classList.add("hidden"),o&&(o.disabled=!0,o.classList.add("opacity-50"));try{const d=window.serviceHubUrls?.apiProfile||"/api/profile",p=await A(d,{method:"PUT",body:{name:l}});window.serviceHubUser&&(window.serviceHubUser.name=p.data?.name||l),e("บันทึกข้อมูลชื่อเรียบร้อยแล้ว"),typeof t=="function"&&t(l)}catch(d){const p=d.errors?.name?.[0]||d.message||"ไม่สามารถบันทึกชื่อได้";i&&(i.textContent=p,i.classList.remove("hidden")),e(p,"error")}finally{o&&(o.disabled=!1,o.classList.remove("opacity-50"))}}),r?.addEventListener("submit",async n=>{n.preventDefault();const a=document.getElementById("profile-current-pwd"),i=document.getElementById("profile-new-pwd"),o=document.getElementById("profile-confirm-pwd"),l=document.getElementById("profile-current-pwd-error"),d=document.getElementById("profile-new-pwd-error"),p=document.getElementById("profile-confirm-pwd-error"),m=document.getElementById("profile-pwd-submit");l.classList.add("hidden"),d.classList.add("hidden"),p.classList.add("hidden");let u=!1;if(a.value||(l.textContent="กรุณาระบุรหัสผ่านปัจจุบัน",l.classList.remove("hidden"),u=!0),(!i.value||i.value.length<15)&&(d.textContent="รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 15 ตัวอักษร",d.classList.remove("hidden"),u=!0),i.value!==o.value&&(p.textContent="รหัสผ่านยืนยันไม่ตรงกับรหัสผ่านใหม่",p.classList.remove("hidden"),u=!0),i.value&&a.value&&i.value===a.value&&(d.textContent="รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านปัจจุบัน",d.classList.remove("hidden"),u=!0),!u){m&&(m.disabled=!0,m.classList.add("opacity-50"));try{const b=window.serviceHubUrls?.apiProfilePassword||"/api/profile/password";await A(b,{method:"PUT",body:{current_password:a.value,password:i.value,password_confirmation:o.value}}),a.value="",i.value="",o.value="",e("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว เซสชันในอุปกรณ์อื่นถูกยกเลิกแล้ว")}catch(b){b.errors?.current_password&&(l.textContent=b.errors.current_password[0],l.classList.remove("hidden")),b.errors?.password&&(d.textContent=b.errors.password[0],d.classList.remove("hidden")),!b.errors?.current_password&&!b.errors?.password&&e(b.message||"เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน","error")}finally{m&&(m.disabled=!1,m.classList.remove("opacity-50"))}}})}function ks(e){return setTimeout(()=>{$s()},0),ys()}let Me=[],Te={current_page:1,last_page:1};function Ss({params:e,auditRows:t=Me,auditMeta:s=Te}){if(!v("audit-logs.view"))return`
      <div class="panel-shadow mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-white p-10 text-center">
        <h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึง</h1>
        <p class="mt-2 text-sm text-muted">คุณไม่มีสิทธิ์ในการดูประวัติการแก้ไขข้อมูลของระบบ</p>
      </div>
    `;const r=e.get("q")||"",n=e.get("action")||"all",a=e.get("from")||"",i=e.get("to")||"",o=d=>{const p=new URLSearchParams;return r&&p.set("q",r),n!=="all"&&p.set("action",n),a&&p.set("from",a),i&&p.set("to",i),p.set("page",String(d)),`#/audit-logs?${p}`},l=!!(r||n!=="all"||a||i);return`
    ${O("การจัดการระบบ","ประวัติการแก้ไข","บันทึกการเพิ่ม แก้ไข และลบข้อมูลการปฏิบัติงานในระบบ")}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 mb-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองประวัติ</h2>
        ${Ce({from:a,to:i,formId:"audit-filter"})}
      </div>
      <form id="audit-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.2fr)_150px_140px_140px_auto_auto] sm:items-end">
        <div>
          <label for="audit-q" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <input id="audit-q" class="field" name="q" value="${c(r)}" placeholder="พิมพ์ค้นหาคำ หรือชื่อผู้ใช้..." data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="audit-action" class="mb-1.5 block text-xs font-bold text-[#52665d]">การกระทำ</label>
          <select id="audit-action" name="action" class="field master-native-select" data-action="live-filter">
            <option value="all" ${n==="all"?"selected":""}>ทุกการกระทำ</option>
            <option value="created" ${n==="created"?"selected":""}>สร้างข้อมูล (create)</option>
            <option value="updated" ${n==="updated"?"selected":""}>แก้ไขข้อมูล (update)</option>
            <option value="deleted" ${n==="deleted"?"selected":""}>ลบข้อมูล (delete)</option>
            <option value="auth" ${n==="auth"?"selected":""}>เข้าสู่ระบบ (auth)</option>
          </select>
        </div>
        <div>
          <label for="audit-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label>
          <input id="audit-from" class="field" type="date" name="from" value="${c(a)}" data-action="live-filter">
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
      ${s.last_page>1?`
      <div class="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>หน้า ${s.current_page} / ${s.last_page}</span>
        <div class="flex gap-2">
          ${s.current_page>1?ne("ก่อนหน้า",o(s.current_page-1)):""}
          ${s.current_page<s.last_page?ne("ถัดไป",o(s.current_page+1)):""}
        </div>
      </div>`:""}
    </section>
  `}async function Ls(e=new URLSearchParams){if(!v("audit-logs.view"))return{data:[],meta:{current_page:1,last_page:1}};try{const t=window.serviceHubUrls?.apiAudit||"/api/audit-logs",s=await A(`${t}?${e.toString()}`);return Me=s.data??[],Te=s.meta??{current_page:1,last_page:1},{data:Me,meta:Te}}catch(t){throw t}}async function _s(e){try{await Ls(e.params)}catch(t){console.error("Error fetching audit logs:",t)}return Ss({params:e.params,auditRows:Me,auditMeta:Te})}function Es({module:e,params:t,data:s,meta:r,loading:n,error:a,modules:i,groups:o,can:l,esc:d,number:p,thaiDate:m,moduleHref:u}){const b=new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Bangkok"}).slice(0,7),g=t.has("from")||t.has("to")?"custom":"month",w=t.get("month")||b,k=new URLSearchParams;g==="custom"?(k.set("from",t.get("from")||""),k.set("to",t.get("to")||"")):t.has("month")&&k.set("month",w);const $=k.size?`?${k}`:"",D=L=>`#/reports/${encodeURIComponent(L)}${$}`,T=e?window.serviceHubUrls.apiReportDetailExport.replace("__MODULE__",encodeURIComponent(e.id))+$:window.serviceHubUrls.apiReportsExport+$,H=e?l(`${e.id}.export`):i.some(L=>l(`${L.id}.export`)),q=e?e.short:"ภาพรวมงานบริการ",ie=r?.period,h=r?.comparison,R=L=>L?`${m(L.from)} – ${m(L.to)}`:"—",V=e?s?.count:r?.total,W=e?s?.previous_count:r?.previous_total,oe=W===0||W==null?null:Math.round((V-W)*1e3/W)/10,ve=(L,we)=>Object.entries(L?.quantities||{}).flatMap(([de,ce])=>ce.map(U=>{const P=we.fields.find(jt=>jt.name===de)?.label||de,me=U.kind==="latest";return`<div class="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-line py-2 text-sm"><span class="text-muted">${d(P)}${me?" (ค่าล่าสุด)":""}</span><strong class="text-ink">${U.total==null?"—":`${p(U.total)} ${d(U.unit||"")}`}</strong>${me&&U.as_of?`<span class="w-full text-xs text-muted">ณ ${m(U.as_of)}</span>`:""}</div>`})).join(""),le=e?s?.trend:r?.trend,x=Math.max(1,...(le||[]).map(L=>L.count)),y=le?.length?`<ol class="mt-4 max-h-[34rem] space-y-3 overflow-y-auto" aria-label="จำนวนรายการตามวันที่ดำเนินงาน">${le.map(L=>`<li class="grid min-w-0 grid-cols-[6.5rem_minmax(0,1fr)_3rem] items-center gap-2 text-xs sm:grid-cols-[8rem_minmax(0,1fr)_4rem]"><time datetime="${d(L.date)}">${m(L.date)}</time><span class="h-3 rounded-full bg-[#e8f0eb]"><span class="block h-3 rounded-full bg-primary" style="width:${Math.max(3,L.count/x*100)}%"></span></span><strong class="text-right">${p(L.count)}</strong></li>`).join("")}</ol>`:'<p class="mt-4 text-sm text-muted">ไม่มีรายการในช่วงที่เลือก</p>',F=`
    <section class="report-controls no-print panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5">
      <form id="report-filter" data-report-module="${d(e?.id||"")}" class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap gap-4">
            <label class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><input type="radio" name="period_mode" value="month" ${g==="month"?"checked":""}>รายเดือน</label>
            <label class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><input type="radio" name="period_mode" value="custom" ${g==="custom"?"checked":""}>กำหนดช่วงวันที่</label>
          </div>
          <div data-report-custom ${g==="month"?"hidden":""}>
            ${Ce({from:t.get("from")||"",to:t.get("to")||"",formId:"report-filter"})}
          </div>
        </div>
        <div data-report-month ${g==="custom"?"hidden":""}>
          <label for="report-month" class="mb-1 block text-sm font-semibold">เดือนที่ดำเนินงาน</label>
          <input id="report-month" class="field max-w-sm" type="month" name="month" value="${d(w)}" ${g==="custom"?"disabled":""} required>
        </div>
        <div data-report-custom class="grid gap-3 sm:grid-cols-2" ${g==="month"?"hidden":""}>
          <div>
            <label for="report-from" class="mb-1 block text-sm font-semibold">ตั้งแต่วันที่</label>
            <input id="report-from" class="field" type="date" name="from" value="${d(t.get("from")||"")}" ${g==="month"?"disabled":""} required>
          </div>
          <div>
            <label for="report-to" class="mb-1 block text-sm font-semibold">ถึงวันที่</label>
            <input id="report-to" class="field" type="date" name="to" value="${d(t.get("to")||"")}" ${g==="month"?"disabled":""} required>
          </div>
        </div>
        <p id="report-filter-error" class="text-sm text-red-700" role="alert"></p>
        <div class="flex flex-wrap gap-2">
          <button class="min-h-11 rounded-xl bg-primary px-5 font-bold text-white hover:bg-primary-dark" type="submit">แสดงรายงาน</button>
          <a href="#/reports${e?`/${encodeURIComponent(e.id)}`:""}" data-action="clear-filters" class="inline-flex min-h-11 items-center rounded-xl border border-line px-4 text-sm font-semibold text-muted hover:bg-[#f6faf7]">ล้างตัวกรอง</a>
          <button class="min-h-11 rounded-xl border border-line px-4 font-semibold" type="button" data-action="print-report">พิมพ์ / บันทึก PDF</button>
          ${H?`<a class="inline-flex min-h-11 items-center rounded-xl border border-line px-4 font-semibold text-primary" href="${d(T)}">ส่งออกสรุป CSV</a>`:""}
        </div>
      </form>
    </section>
  `;let I="";if(n)I='<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังโหลดรายงาน…</section>';else if(a)I=`<section class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-6" role="alert"><p class="font-semibold text-red-700">${d(a)}</p><button type="button" data-action="retry-report" class="no-print mt-3 min-h-11 rounded-xl border border-red-200 bg-white px-4 font-semibold">ลองอีกครั้ง</button></section>`;else if(!r||!s)I='<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังเตรียมรายงาน…</section>';else{const L=`<section class="grid gap-3 sm:grid-cols-3"><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">รายการในช่วงที่เลือก</p><strong class="mt-2 block text-3xl text-ink">${p(V)}</strong><p class="mt-2 text-xs text-muted">${R(ie)}</p></div><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">ช่วงเปรียบเทียบ</p><strong class="mt-2 block text-3xl text-ink">${p(W)}</strong><p class="mt-2 text-xs text-muted">${R(h)}</p></div><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">การเปลี่ยนแปลงจำนวนรายการ</p><strong class="mt-2 block text-2xl text-ink">${oe==null?"เปรียบเทียบเป็นร้อยละไม่ได้":`${oe>0?"+":""}${p(oe)}%`}</strong><p class="mt-2 text-xs text-muted">${W===0?"ช่วงเปรียบเทียบไม่มีรายการ":"เทียบกับช่วงก่อนหน้า"}</p></div></section>`,we=`<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">แนวโน้มตามวันที่ดำเนินงาน</h2><p class="mt-1 text-xs text-muted">ตัวเลขกำกับทุกวัน อ่านได้โดยไม่ต้องอาศัยสี</p>${y}</section>`;if(e){const de=s.breakdown?.length?`<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">แยกตาม${e.id==="road-washings"?"เขตรักษาความสะอาด":"ประเภทขยะมูลฝอย"}</h2><div class="mt-3 divide-y divide-line">${s.breakdown.map(U=>`<div class="grid gap-1 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_auto_auto]"><span>${d(U.name)}</span><span>${p(U.count)} รายการ</span><strong>${p(U.total)} ${d(U.unit)}</strong></div>`).join("")}</div></section>`:"",ce=`<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">รายการล่าสุดตามวันที่ดำเนินงาน</h2>${s.recent?.length?`<ol class="mt-3 divide-y divide-line">${s.recent.map(U=>`<li class="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><div><strong>${d(U.title||"รายการงานบริการ")}</strong><p class="text-xs text-muted">${m(U.service_date)}</p></div><a class="no-print inline-flex min-h-11 items-center font-bold text-primary underline" href="${u(e.id)}/${encodeURIComponent(U.id)}">ดูรายการ</a></li>`).join("")}</ol>`:'<p class="mt-3 text-sm text-muted">ไม่มีรายการในช่วงที่เลือก</p>'}</section>`;I=`${L}<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">ปริมาณงานตามตัวชี้วัด</h2><p class="mt-1 text-xs text-muted">แสดงแต่ละหน่วยแยกกัน; ค่าคงเหลือเป็นค่าล่าสุด</p><div class="mt-3">${ve(s,e)}</div></section>${de}${we}${ce}<a class="no-print inline-flex min-h-11 items-center font-bold text-primary underline" href="${u(e.id)}">ไปหน้ารายการ${d(e.short)}</a>`}else{const ce=`<section><h2 class="mb-3 text-lg font-bold">ภาพรวม 4 กลุ่มงาน</h2><div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">${o.filter(P=>i.some(me=>me.group===P.id&&l(`${me.id}.view`))).map(P=>`<div class="panel-shadow rounded-2xl border border-line bg-white p-5"><h3 class="text-sm font-semibold">${d(P.label)}</h3><strong class="mt-2 block text-2xl">${p(r.groups?.[P.id]||0)}</strong><span class="text-xs text-muted">รายการในช่วงที่เลือก</span></div>`).join("")}</div></section>`,U=i.filter(P=>l(`${P.id}.view`)).map(P=>`<article class="panel-shadow rounded-2xl border border-line bg-white p-5"><h3 class="font-bold">${d(P.short)}</h3><p class="mt-2 text-sm"><strong class="text-xl">${p(s[P.id]?.count||0)}</strong> รายการ</p><div class="mt-3">${ve(s[P.id],P)||'<p class="text-sm text-muted">ไม่มีตัวชี้วัดปริมาณ</p>'}</div><a class="no-print mt-4 inline-flex min-h-11 items-center font-bold text-primary underline" href="${D(P.id)}">ดูรายงานหมวดนี้</a></article>`).join("");I=`${L}${ce}<section><h2 class="mb-3 text-lg font-bold">รายงานครบ 9 หมวด</h2><div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">${U||'<p class="text-muted">ไม่มีหมวดที่ได้รับสิทธิ์ดู</p>'}</div></section>${we}`}}return`<div class="report-page space-y-5"><div class="flex flex-wrap items-start justify-between gap-3"><div><p class="text-xs font-bold tracking-wider text-primary">รายงานงานบริการ</p><h1 class="mt-1 text-2xl font-bold sm:text-3xl">${d(q)}</h1><p class="mt-2 text-sm text-muted">ข้อมูลจริงจากวันที่ดำเนินงาน ตามสิทธิ์ของคุณ</p></div>${e?`<a class="no-print inline-flex min-h-11 items-center font-semibold text-primary underline" href="#/reports${$}">กลับภาพรวม</a>`:""}</div>${F}${I}</div>`}const G=document.querySelector("#app");let kt=null,Ve=!1,Ze="",ke=0,St={},Lt=null,_t=null,Ge=!1,We="",Se=0,Ke=0;async function Et(e=null){const t=++ke,{params:s}=X(),r=()=>e?e.isCurrent():X().parts[0]==="dashboard";Ve=!0,Ze="",r()&&at();try{const n=new URLSearchParams;s.get("from")&&n.set("from",s.get("from")),s.get("to")&&n.set("to",s.get("to"));const a=(window.serviceHubUrls?.apiDashboard||"/api/dashboard")+(n.size?`?${n}`:""),i=await A(a);if(t!==ke||!r())return;kt=i.data}catch(n){if(t!==ke||!r())return;Ze=n.message||"ไม่สามารถโหลดภาพรวมได้"}finally{t===ke&&r()&&(Ve=!1,at())}}function at(){if(X().parts[0]!=="dashboard")return;const{params:e}=X(),t=Xt({data:kt,loading:Ve,error:Ze,params:e,groups:fe,modules:Y,icon:f,esc:c,number:S,moduleHref:se});G.innerHTML=Z(t,null,[{label:"แดชบอร์ดฝ่ายบริการ",current:!0}],!0),re()}async function qt(e,t,s=null){const r=e[1]?Y.find(o=>o.id===e[1]):null,n=++Se,a=X().hash,i=()=>s?s.isCurrent():X().hash===a;Ge=!0,We="",i()&&await it(e,t);try{const o=window.serviceHubUrls?.apiReportDetail||"/api/reports/__MODULE__",l=window.serviceHubUrls?.apiReports||"/api/reports",d=(r?o.replace("__MODULE__",encodeURIComponent(r.id)):l)+(t.size?`?${t}`:""),p=await A(d);if(n!==Se||!i())return;_t=p.meta,r?Lt=p.data:St=p.data}catch(o){if(n!==Se||!i())return;We=o.fields?.to?.[0]||o.fields?.from?.[0]||o.fields?.month?.[0]||o.message||"โหลดรายงานไม่สำเร็จ"}finally{n===Se&&i()&&(Ge=!1,await it(e,t))}}async function it(e,t){if(X().parts[0]!=="reports"||X().parts[1]!==e[1])return;const s=e[1]?Y.find(a=>a.id===e[1]):null,r=Es({module:s,params:t,data:s?Lt:St,meta:_t,loading:Ge,error:We,modules:Y,groups:fe,can:v,esc:c,number:S,thaiDate:B,moduleHref:se}),n=s?[{label:"รายงาน",href:"#/reports"},{label:s.short,current:!0}]:[{label:"รายงาน",current:!0}];G.innerHTML=Z(r,"reports",n),re()}const qs={dashboard:async e=>{te("dashboard"),await Et(e)},users:async e=>{if(!Ae()){j("#/dashboard"),M("คุณไม่มีสิทธิ์เข้าถึงหน้านี้","error");return}te("users"),G.innerHTML=Z(os(),"users",[{label:"จัดการผู้ใช้งาน",current:!0}]),re()},module:async e=>{const t=e.parts[1];if(t&&!v(`${t}.view`)){j("#/dashboard"),M("คุณไม่มีสิทธิ์เข้าถึงหมวดงานบริการนี้","error");return}te(t);const s=Y.find(a=>a.id===t),r=s?[{label:s.short,current:!0}]:[];(document.querySelector("#filter-form")?.dataset.module!==t||e.parts.length>2)&&(G.innerHTML=Z('<section class="panel-shadow rounded-2xl border border-line bg-white p-6" role="status">กำลังโหลดข้อมูล...</section>',t,r));const n=await bs(e);e.isCurrent()&&(G.innerHTML=Z(n,t,r),re())},"cleaning-zones":async e=>{if(!v("cleaning-zones.view")){j("#/dashboard");return}te("cleaning-zones");const t=await nt("cleaning-zones",e);e.isCurrent()&&(G.innerHTML=Z(t,"cleaning-zones",[{label:"เขตรักษาความสะอาด",current:!0}]),re())},"waste-types":async e=>{if(!v("waste-types.view")){j("#/dashboard");return}te("waste-types");const t=await nt("waste-types",e);e.isCurrent()&&(G.innerHTML=Z(t,"waste-types",[{label:"ประเภทขยะมูลฝอย",current:!0}]),re())},profile:async e=>{te("profile"),G.innerHTML=Z(ks(),"profile",[{label:"โปรไฟล์ของฉัน",current:!0}])},"audit-logs":async e=>{if(!v("audit-logs.view")){j("#/dashboard");return}te("audit-logs");const t=await _s(e);e.isCurrent()&&(G.innerHTML=Z(t,"audit-logs",[{label:"ประวัติการแก้ไข",current:!0}]))},reports:async e=>{te("reports"),await qt(e.parts,e.params,e)},"*":()=>{j("#/dashboard")}};function js(){document.addEventListener("keydown",t=>{if(t.key==="Escape"&&(Ie(),He(!1)),t.key==="Tab"&&window.innerWidth<1024){const s=document.getElementById("sidebar");if(s&&s.classList.contains("translate-x-0")){const r=[...s.querySelectorAll("a[href], button:not([disabled])")].filter(n=>!n.closest("[hidden]"));r.length&&(t.shiftKey&&document.activeElement===r[0]?(t.preventDefault(),r[r.length-1]?.focus()):!t.shiftKey&&document.activeElement===r[r.length-1]&&(t.preventDefault(),r[0]?.focus()))}}}),document.addEventListener("click",async t=>{const s=t.target.closest("[data-action]");if(t.target.closest("#user-menu-container")||Ie(),t.target.closest(".relative")||document.querySelectorAll(".custom-select-menu").forEach(n=>n.classList.add("hidden")),!s)return;const r=s.dataset.action;if(r==="open-menu"){He(!0),document.querySelector('#sidebar [data-action="close-menu"]')?.focus();return}if(r==="close-menu"){He(!1),document.querySelector('[data-action="open-menu"]')?.focus();return}if(r==="toggle-user-menu"){Nt();return}if(r==="close-user-menu"){Ie();return}if(r==="toggle-sidebar-group"||r==="toggle-sidebar-subgroup"){Ft(s.dataset.group),s.setAttribute("aria-expanded",String(s.getAttribute("aria-expanded")!=="true"));const n=document.getElementById(s.getAttribute("aria-controls"));n&&(n.hidden=!n.hidden),s.querySelector("svg:last-child")?.classList.toggle("rotate-180");return}if(r==="delete-activity"){const n=s.dataset.module,a=s.dataset.id;await us(n,a,{navigate:j,showToast:M});return}if(r==="delete-reference"){const n=s.dataset.type,a=s.dataset.id,i=s.dataset.name,o=Number(s.dataset.usage)||0;await ws(n,a,i,o,{navigate:j,showToast:M,refreshData:De});return}if(r==="print-report"){window.print();return}if(r==="retry-dashboard"){Et();return}if(r==="retry-report"){const{parts:n,params:a}=X();qt(n,a);return}if(r==="retry-route"){if(Date.now()<Ke){M(`กรุณารออีก ${Math.ceil((Ke-Date.now())/1e3)} วินาทีก่อนลองใหม่`,"error");return}j(X().hash);return}if(r==="toggle-mobile-filters"){const n=s.getAttribute("aria-expanded")==="true",a=document.getElementById(s.getAttribute("aria-controls"));s.setAttribute("aria-expanded",String(!n)),s.querySelector("svg")?.classList.toggle("rotate-180",!n),a?.classList.toggle("hidden",n),a?.classList.toggle("flex",!n);return}if(r==="set-date-preset"){const n=s.dataset.from,a=s.dataset.to,i=s.dataset.form,o=i?document.getElementById(i):s.closest("form");if(o){if(o.elements.period_mode){const l=o.querySelector('input[name="period_mode"][value="custom"]');l&&(l.checked=!0,l.dispatchEvent(new Event("change",{bubbles:!0})))}o.elements.from&&(o.elements.from.value=n),o.elements.to&&(o.elements.to.value=a),o.requestSubmit?o.requestSubmit():o.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0}))}return}}),document.addEventListener("submit",async t=>{if(t.target.id==="record-form"){t.preventDefault(),fs(t.target);return}if(t.target.id==="zone-form"){t.preventDefault(),rt(t.target,"cleaning-zones");return}if(t.target.id==="wasteType-form"){t.preventDefault(),rt(t.target,"waste-types");return}if(t.target.id==="dashboard-filter"){t.preventDefault();const s=t.target,r=s.elements.from.value,n=s.elements.to.value,a=s.parentElement.querySelector("#dashboard-filter-error");if(!r&&!n){a&&a.classList.add("hidden"),j("/dashboard");return}if(!r||!n||r>n){a&&(a.textContent=!r||!n?"กรุณาระบุวันที่เริ่มต้นและสิ้นสุด":"วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น",a.classList.remove("hidden"));return}a&&a.classList.add("hidden"),j(`/dashboard?${new URLSearchParams({from:r,to:n})}`);return}if(t.target.id==="report-filter"){t.preventDefault();const s=t.target,r=s.elements.period_mode?.value,n=new URLSearchParams;if(r==="month"){if(!s.elements.month?.value)return;n.set("month",s.elements.month.value)}else{const i=s.elements.from?.value,o=s.elements.to?.value,l=s.querySelector("#report-filter-error");if(!i||!o||i>o){l&&(l.textContent=!i||!o?"กรุณาระบุวันที่เริ่มต้นและสิ้นสุด":"วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น");return}l&&(l.textContent=""),n.set("from",i),n.set("to",o)}const a=`#/reports${s.dataset.reportModule?`/${s.dataset.reportModule}`:""}?${n}`;j(a.replace("#",""));return}if(t.target.id==="filter-form"){t.preventDefault();const s=t.target,r=new URLSearchParams;new FormData(s).forEach((n,a)=>{n&&!(a==="sort"&&n==="newest")&&r.set(a,n)}),j(`/module/${s.dataset.module}${r.size?`?${r}`:""}`);return}if(t.target.id==="zone-filter"){t.preventDefault();const s=new FormData(t.target),r=new URLSearchParams;String(s.get("q")||"").trim()&&r.set("q",String(s.get("q")).trim()),s.get("status")&&s.get("status")!=="all"&&r.set("status",s.get("status")),s.get("sort")==="name"&&r.set("sort","name"),j(`/cleaning-zones${r.size?`?${r}`:""}`);return}if(t.target.id==="wasteType-filter"){t.preventDefault();const s=new FormData(t.target),r=new URLSearchParams;String(s.get("q")||"").trim()&&r.set("q",String(s.get("q")).trim()),s.get("status")&&s.get("status")!=="all"&&r.set("status",s.get("status")),s.get("sort")==="name"&&r.set("sort","name"),j(`/waste-types${r.size?`?${r}`:""}`);return}if(t.target.id==="audit-filter"){t.preventDefault();const s=new FormData(t.target),r=new URLSearchParams;String(s.get("q")||"").trim()&&r.set("q",String(s.get("q")).trim()),s.get("action")&&s.get("action")!=="all"&&r.set("action",s.get("action")),s.get("from")&&r.set("from",s.get("from")),s.get("to")&&r.set("to",s.get("to")),j(`/audit-logs${r.size?`?${r}`:""}`);return}});const e=Bt(t=>{t&&t.isConnected&&(t.requestSubmit?t.requestSubmit():t.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))},500);document.addEventListener("input",t=>{if(t.target.dataset.action==="live-filter"&&t.target.type!=="date"){const s=t.target.form;s&&e(s)}}),document.addEventListener("change",t=>{if(t.target.dataset.action==="live-filter"){const s=t.target.form;s&&(s.requestSubmit?s.requestSubmit():s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}if(t.target.name==="period_mode"&&t.target.closest("#report-filter")){const s=t.target.form,r=t.target.value==="custom",n=s.querySelector("[data-report-month]"),a=s.querySelector("[data-report-custom]");n&&(n.hidden=r),a&&(a.hidden=!r),s.elements.month&&(s.elements.month.disabled=r),s.elements.from&&(s.elements.from.disabled=!r),s.elements.to&&(s.elements.to.disabled=!r)}})}function Us(){ct(),Gt(),js(),Ct(qs,{onDenied:e=>{if(!e.isCurrent())return;const t='<section class="panel-shadow mx-auto max-w-lg rounded-2xl border border-line bg-white p-6 text-center" role="alert"><h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึงหน้านี้</h1><p class="mt-2 text-sm text-muted">บัญชีนี้ยังไม่ได้รับสิทธิ์ดูข้อมูลในหมวดที่เลือก</p><a href="#/dashboard" class="mt-5 inline-flex min-h-11 items-center font-bold text-primary underline">กลับแดชบอร์ด</a></section>';G.innerHTML=Z(t,null,[{label:"ไม่มีสิทธิ์เข้าถึง",current:!0}])},onError:(e,t)=>{if(!t.isCurrent())return;const s=e.status===429,r=Number(e.retryAfterSeconds)||0;Ke=s&&r>0?Date.now()+r*1e3:0;const n=s?"คำขอถี่เกินกำหนด":e.status===403?"ไม่มีสิทธิ์เข้าถึงข้อมูล":"โหลดหน้าไม่สำเร็จ",a=s?`กรุณารอ${r>0?` ${r} วินาที`:"สักครู่"}ก่อนลองใหม่`:e.status===403?"บัญชีนี้ยังไม่ได้รับสิทธิ์ดูข้อมูลในส่วนที่เลือก":"กรุณาลองใหม่อีกครั้ง หากยังพบปัญหาให้ติดต่อผู้ดูแลระบบ",i=`<section class="panel-shadow mx-auto max-w-lg rounded-2xl border border-red-200 bg-white p-6 text-center" role="alert"><h1 class="text-xl font-bold">${n}</h1><p class="mt-2 text-sm text-muted">${a}</p><button type="button" data-action="retry-route" class="mt-5 min-h-11 rounded-xl border border-line px-4 font-bold text-primary">ลองอีกครั้ง</button></section>`;G.innerHTML=Z(i,null,[{label:"โหลดหน้าไม่สำเร็จ",current:!0}])},afterRender:()=>{re()}})}Us();
