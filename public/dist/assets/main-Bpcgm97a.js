const ge=[{id:"cleaning",label:"งานบริการรักษาความสะอาด",short:"รักษาความสะอาด",icon:"sparkles",tone:"mint"},{id:"waste",label:"งานบริการมูลฝอย",short:"บริการมูลฝอย",icon:"recycle",tone:"sky"},{id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",short:"จัดการสิ่งปฏิกูล",icon:"droplet",tone:"amber"},{id:"projects",label:"งานพัฒนาระบบจัดการมูลฝอย",short:"พัฒนาระบบ",icon:"chart",tone:"violet"}],K={name:"service_date",label:"วันที่ดำเนินงาน",type:"date",required:!0},Z=[{id:"road-washings",group:"cleaning",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",short:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",icon:"road",titleField:"location",fields:[K,{name:"cleaning_zone_id",label:"เขตรักษาความสะอาด",type:"reference",reference:"cleaning-zones",required:!0},{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0}]},{id:"waterway-cleanings",group:"cleaning",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",short:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ",icon:"waves",titleField:"waterway_name",fields:[K,{name:"waterway_name",label:"ชื่อแหล่งน้ำ",type:"text",required:!0},{name:"distance_km",label:"ระยะทางปฏิบัติงาน",type:"number",unit:"กม.",required:!0},{name:"quantity",label:"ปริมาณที่กำจัดได้",type:"number",unit:"ตัน",required:!0}]},{id:"road-sweepings",group:"cleaning",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",short:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ",icon:"sparkles",titleField:"road",fields:[K,{name:"road",label:"ถนน",type:"text",required:!0},{name:"storage_location",label:"สถานที่จัดเก็บ",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0}]},{id:"outsourced-cleanings",group:"cleaning",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",short:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม",icon:"users",titleField:"location",fields:[K,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0},{name:"community",label:"ชุมชน",type:"text",required:!0}]},{id:"waste-collections",group:"waste",label:"งานบริหารจัดการมูลฝอย",short:"งานบริหารจัดการมูลฝอย",icon:"recycle",titleField:"waste_name",fields:[K,{name:"source",label:"แหล่งที่เก็บ",type:"text",required:!0},{name:"waste_type_id",label:"ประเภทขยะมูลฝอย",type:"reference",reference:"waste-types",required:!0},{name:"waste_name",label:"ชื่อขยะมูลฝอย",type:"text",required:!0},{name:"weight",label:"น้ำหนัก",type:"number",unit:"ตัน",required:!0}]},{id:"drain-cleanings",group:"sanitation",label:"งานลอกท่อระบายน้ำ",short:"ลอกท่อระบายน้ำ",icon:"droplet",titleField:"location",fields:[K,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"distance_km",label:"ระยะทาง",type:"number",unit:"กม.",required:!0},{name:"sediment_quantity",label:"ปริมาณตะกอน",type:"number",unit:"ลบ.ม.",required:!0}]},{id:"septic-pumpings",group:"sanitation",label:"งานสูบสิ่งปฏิกูล",short:"สูบสิ่งปฏิกูล",icon:"truck",titleField:"location",fields:[K,{name:"location",label:"สถานที่",type:"text",required:!0},{name:"volume",label:"ปริมาตรสิ่งปฏิกูล",type:"number",unit:"ลบ.ม.",required:!0},{name:"fee_amount",label:"ค่าธรรมเนียม",type:"number",unit:"บาท",required:!0}]},{id:"septic-treatments",group:"sanitation",label:"การบำบัดสิ่งปฏิกูล",short:"บำบัดสิ่งปฏิกูล",icon:"flask",titleField:"service_date",fields:[K,{name:"sludge_quantity",label:"ปริมาณตะกอนสำหรับทำปุ๋ย",type:"number",unit:"กก.",required:!0},{name:"fertilizer_remaining",label:"ปุ๋ยอินทรีย์สูตร 2 คงเหลือ",type:"number",unit:"กก.",required:!0},{name:"microbial_note",label:"ข้อมูลการใส่น้ำจุลินทรีย์ชีวภาพ",type:"textarea",required:!0}]},{id:"waste-management-projects",group:"projects",label:"โครงการพัฒนาระบบจัดการมูลฝอย",short:"โครงการพัฒนา",icon:"chart",titleField:"project_name",fields:[K,{name:"project_name",label:"ชื่อโครงการ",type:"text",required:!0},{name:"communities_count",label:"จำนวนชุมชนที่เข้าร่วม",type:"integer",unit:"ชุมชน",required:!0},{name:"participants_count",label:"ผู้เข้าร่วมโครงการ",type:"integer",unit:"คน",required:!0}]}];class $e extends Error{constructor(t,s=0,r=null){super(t),this.name="ApiError",this.status=s,this.data=r,this.errors=r&&typeof r=="object"&&r.errors?r.errors:{}}get fieldErrors(){const t={};if(!this.errors||typeof this.errors!="object")return t;for(const[s,r]of Object.entries(this.errors))t[s]=Array.isArray(r)?r[0]||"":String(r||"");return t}get isValidationError(){return this.status===422}get isRateLimited(){return this.status===429}get isUnauthorized(){return this.status===401||this.status===419}get isForbidden(){return this.status===403}}function jt(){return document.querySelector('meta[name="csrf-token"]')?.content||""}function Ut(){return window.serviceHubUrls?.login||"/login"}function w(e){const t=window.serviceHubUser;return t?(Array.isArray(t.roles)?t.roles:[]).includes("super-admin")?!0:(Array.isArray(t.permissions)?t.permissions:[]).includes(e):!1}const Tt=["super-admin","admin"];function Re(){const e=window.serviceHubUser?.roles??[];return Array.isArray(e)&&e.some(t=>Tt.includes(t))}function _e(e){if(!Re())return!1;if((window.serviceHubUser?.roles??[]).includes("super-admin"))return!0;const s=window.serviceHubUser?.permissions??[];return Array.isArray(s)&&s.includes(e)}function Te(e){return(window.serviceHubUrls?.apiActivities||"/api/activities/__MODULE__").replace("__MODULE__",encodeURIComponent(e))}function ie(e){return(window.serviceHubUrls?.apiReferences||"/api/references/__TYPE__").replace("__TYPE__",encodeURIComponent(e))}async function P(e,t={}){const s=jt(),r={Accept:"application/json","X-Requested-With":"XMLHttpRequest",...s?{"X-CSRF-TOKEN":s}:{},...t.headers||{}};let n=t.body;const a=typeof FormData<"u"&&n instanceof FormData,i=typeof Blob<"u"&&n instanceof Blob,o=typeof URLSearchParams<"u"&&n instanceof URLSearchParams;n&&typeof n=="object"&&!a&&!i&&!o&&(n=JSON.stringify(n),r["Content-Type"]||(r["Content-Type"]="application/json"));let d;try{d=await fetch(e,{credentials:"same-origin",...t,headers:r,body:n})}catch(m){throw m instanceof $e?m:new $e(m.message||"ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง",0)}if(d.status===401||d.status===419){const m=Ut();throw window.location.assign(m),new $e("เซสชันของคุณหมดอายุ กรุณาเข้าสู่ระบบใหม่",d.status)}const l=await d.json().catch(()=>({}));if(!d.ok){let m=l.message;if(d.status===429){const p=d.headers?.get?.("Retry-After");m=p?`คำขอส่งมาถี่เกินไป กรุณารอ ${p} วินาทีแล้วลองใหม่อีกครั้ง`:"คำขอส่งมาถี่เกินไป กรุณารอสักครู่แล้วลองใหม่อีกครั้ง (Too Many Attempts)"}else d.status===403?m=m||"คุณไม่มีสิทธิ์ดำเนินการในส่วนนี้":d.status===422?m=m||"ข้อมูลที่ส่งไม่ถูกต้อง กรุณาตรวจสอบข้อมูลอีกครั้ง":m=m||`เกิดข้อผิดพลาด (${d.status})`;const u=new $e(m,d.status,l);throw u.fields=l.errors||{},u}return l}async function be(e,t={}){let s=1;const r=[];for(;;){const n=e.includes("?")?"&":"?",a=`${e}${n}per_page=100&page=${s}`,i=await P(a,t);Array.isArray(i.data)&&r.push(...i.data);const o=i.meta?.last_page||1;if(s>=o)break;s++}return r}const lt=" — เทศบาลนครนนทบุรี",Oe="/dashboard";function Ee(e=window.location.hash){let t=e||"";if(t.startsWith("#")&&(t=t.slice(1)),t.startsWith("figmacapture="))return{hash:"#/dashboard",path:"/dashboard",parts:["dashboard"],params:new URLSearchParams,query:{}};const[s,r=""]=(t||Oe).split("?"),n=s.startsWith("/")?s:`/${s}`,a=n.split("/").filter(Boolean),i=new URLSearchParams(r),o=Object.fromEntries(i.entries());return{hash:`#${n}${r?`?${r}`:""}`,path:n,parts:a.length?a:["dashboard"],params:i,query:o}}function G(){return Ee()}function Qe(e,t=lt){const s=(e||"แดชบอร์ดฝ่ายบริการ").trim();s.endsWith(t.trim())?document.title=s:document.title=`${s}${t}`}function Mt(e){const[t,s]=e.parts;return t==="dashboard"||!e.parts.length?"แดชบอร์ดฝ่ายบริการ":t==="login"?"เข้าสู่ระบบ":t==="users"?"จัดการผู้ใช้งาน":t==="profile"?"โปรไฟล์ส่วนบุคคล":t==="audit-logs"?"ประวัติการแก้ไข":t==="cleaning-zones"?"เขตรักษาความสะอาด":t==="waste-types"?"ประเภทขยะมูลฝอย":t==="reports"?Z.find(n=>n.id===s)?.short||"รายงาน":t==="module"?Z.find(n=>n.id===s)?.short||"งานบริการ":"แดชบอร์ดฝ่ายบริการ"}class Ct{constructor(t={},s={}){let r={};t&&typeof t=="object"&&!t.defaultRoute&&!t.routes?r={routes:t,...s}:r=t||{},this.routes={},this.options={defaultRoute:Oe,titleSuffix:lt,...r},this.current=Ee(),this.beforeHooks=[],this.afterHooks=[],this.notFoundHandler=null,this.navigationSequence=0,this.options.routes&&this.registerRoutes(this.options.routes)}registerRoutes(t){for(const[s,r]of Object.entries(t))typeof r=="function"?this.routes[s]={handler:r}:this.routes[s]=r}setNotFound(t){this.notFoundHandler=t}beforeEach(t){this.beforeHooks.push(t)}afterEach(t){this.afterHooks.push(t)}navigate(t,s={}){let r=t||Oe;r.startsWith("#")&&(r=r.slice(1)),r.startsWith("/")||(r=`/${r}`);const n=`#${r}`;window.location.hash===n?this.resolve():s.replace?window.location.replace(n):window.location.hash=n,s.noScroll||window.scrollTo({top:0,behavior:"smooth"})}async checkGuards(t,s){if(t.parts[0]==="login"){const n=window.serviceHubUrls?.login||"/login";return window.location.replace(n),!1}for(const n of this.beforeHooks){const a=await n(t);if(a===!1)return!1;if(typeof a=="string")return a}if(s?.guard){const n=await s.guard(t);if(n===!1)return!1;if(typeof n=="string")return n}const r=t.parts[0];if(r==="users"&&!Re()||r==="audit-logs"&&!w("audit-logs.view")||r==="cleaning-zones"&&!w("cleaning-zones.view")||r==="waste-types"&&!w("waste-types.view"))return!1;if(r==="module"&&t.parts[1]){const n=t.parts[1];if(!w(`${n}.view`))return!1}return!0}async resolve(){const t=++this.navigationSequence,s=Ee();s.isCurrent=()=>t===this.navigationSequence&&Ee().hash===s.hash,this.current=s;const r=s.parts[0]||"dashboard",n=this.routes[r]||this.routes["*"],a=await this.checkGuards(s,n);if(!s.isCurrent())return;if(a===!1){typeof this.options.onDenied=="function"?await this.options.onDenied(s):this.notFoundHandler&&await this.notFoundHandler(s),Qe("ไม่พบหน้าหรือไม่มีสิทธิ์เข้าถึง",this.options.titleSuffix);return}if(typeof a=="string"){this.navigate(a);return}let i="";n?.title?i=typeof n.title=="function"?n.title(s):n.title:i=Mt(s),Qe(i,this.options.titleSuffix);try{n?.handler?await n.handler(s):this.notFoundHandler&&await this.notFoundHandler(s)}catch(o){if(!s.isCurrent())return;if(typeof this.options.onError=="function")await this.options.onError(o,s);else throw o;return}if(s.isCurrent()){for(const o of this.afterHooks)o(s);typeof this.options.afterRender=="function"&&this.options.afterRender(s)}}init(){window.addEventListener("hashchange",()=>this.resolve()),this.resolve()}}let xe=null;function At(e={},t={}){return xe=new Ct(e,t),xe.init(),xe}function q(e,t={}){xe?xe.navigate(e,t):(window.location.hash=e.startsWith("#")?e:`#${e}`,window.scrollTo({top:0,behavior:"smooth"}))}const c=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),_=(e,t={})=>new Intl.NumberFormat("th-TH",{maximumFractionDigits:2,...t}).format(Number(e)||0);function te(e){if(!e)return"—";const t=String(e).slice(0,10);return new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Bangkok"}).format(new Date(`${t}T12:00:00+07:00`))}const Rt={"super-admin":"ผู้ดูแลระบบสูงสุด",admin:"ผู้ดูแลระบบ",staff:"เจ้าหน้าที่",viewer:"ผู้ดูข้อมูล",auditor:"ผู้ตรวจสอบระบบ"},Dt={"super-admin":"border-red-200 bg-red-50 text-red-700",admin:"border-amber-200 bg-amber-50 text-amber-700",staff:"border-teal-200 bg-teal-50 text-teal-800",viewer:"border-gray-200 bg-gray-50 text-gray-700",auditor:"border-blue-200 bg-blue-50 text-blue-700"};function dt(e){const t=String(e||"").trim().split(/\s+/);return t.length>=2?(t[0][0]+t[1][0]).toUpperCase():String(e||"?")[0].toUpperCase()}const ee=e=>`#/module/${e}`,Je={grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',sparkles:'<path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 17 .7 1.3L21 19l-1.3.7L19 21l-.7-1.3L17 19l1.3-.7L19 17ZM4 17l.5 1L6 18.5 4.5 19 4 20l-.5-1L2 18.5l1.5-.5L4 17Z"/>',recycle:'<path d="m7 19-2-3.4a2 2 0 0 1 0-2l1-1.7M9 5h5.2a2 2 0 0 1 1.7 1l1.4 2.4M19 11l2 3.5a2 2 0 0 1 0 2l-1.4 2.4a2 2 0 0 1-1.7 1H13"/><path d="m4 12 2.8-.8L7.5 14M17 7.5l.5 3 2.8-.9M11 21l2-2-2-2"/>',droplet:'<path d="M12 22a8 8 0 0 0 8-8c0-4.4-8-12-8-12S4 9.6 4 14a8 8 0 0 0 8 8Z"/>',chart:'<path d="M3 3v18h18"/><path d="m7 16 4-5 3 2 5-7"/>',road:'<path d="M7 3 4 21M17 3l3 18M12 3v3m0 4v4m0 4v3"/>',waves:'<path d="M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',truck:'<path d="M2 5h12v12H2zM14 9h4l4 4v4h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',flask:'<path d="M9 3h6M10 3v7l-5.5 9a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 10V3M8 16h8"/>',search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',plus:'<path d="M12 5v14M5 12h14"/>',arrow:'<path d="m5 12 14 0m-6-6 6 6-6 6"/>',chevron:'<path d="m9 18 6-6-6-6"/>',chevronDown:'<path d="m6 9 6 6 6-6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',close:'<path d="M18 6 6 18M6 6l12 12"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',filter:'<path d="M4 7h16M7 12h10M10 17h4"/>',ellipsis:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',edit:'<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L10 16l-4 1 1-4 9.5-9.5Z"/>',trash:'<path d="M3 6h18M8 6V4h8v2M5 6l1 15h12l1-15M10 10v7M14 10v7"/>',info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7h.01"/>',check:'<path d="m5 12 4 4L19 6"/>',empty:'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 10h8M8 14h5"/>',logout:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',login:'<path d="M10 17l5-5-5-5M15 12H3M13 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',lock:'<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',eye:'<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',eyeOff:'<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>'};function b(e,t=20,s="",r={}){const n=Je[e];n||typeof process>"u"&&console.warn(`[icons] ไม่พบ icon ชื่อ "${e}" — ใช้ "grid" แทน`);const a=n||Je.grid,o=!!(r["aria-label"]||r.title||r.role==="img")?'role="img"':'aria-hidden="true"',d=Object.entries(r).filter(([l])=>l!=="aria-hidden"&&l!=="role").map(([l,m])=>`${l}="${c(m)}"`).join(" ");return`<svg class="${s}" width="${t}" height="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${o} ${d}>${a}</svg>`}function F(e,t,s,r=""){return`<div class="mb-5 flex min-w-0 max-w-full flex-col justify-between gap-3 sm:mb-7 sm:flex-row sm:items-end">
    <div class="min-w-0 max-w-full flex-1">
      <p class="mb-1 text-xs font-bold tracking-[.13em] text-primary sm:mb-1.5">${c(e)}</p>
      <h1 class="break-words text-[22px] sm:text-[32px] font-bold leading-tight tracking-tight text-ink">${c(t)}</h1>
      <p class="mt-1.5 break-words text-xs leading-relaxed text-muted sm:mt-2 sm:text-sm">${c(s)}</p>
    </div>
    ${r?`<div class="w-full shrink-0 sm:w-auto">${r}</div>`:""}
  </div>`}const oe=(e,t,s="plus")=>`<a href="${t}" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${b(s,18)}${c(e)}</a>`,se=(e,t,s="arrow")=>`<a href="${t}" class="inline-flex min-h-11 w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f8fbf8]">${c(e)}${b(s,17)}</a>`;let et=null,N=null;function ct(){return N&&document.body.contains(N)||(N=document.getElementById("toast-container"),N||(N=document.createElement("div"),N.id="toast-container",N.className="fixed inset-x-4 bottom-4 z-[70] flex flex-col gap-2 sm:inset-x-auto sm:bottom-5 sm:right-5 pointer-events-none",document.body.appendChild(N))),N}function T(e,t="success"){const s=ct();s.innerHTML="",clearTimeout(et);const r=t==="error",n=r?"border-red-200 bg-white text-red-700":"border-[#c6e9d8] bg-white text-primary-dark",a=r?"info":"check",i=document.createElement("div");i.role="status",i.setAttribute("aria-live","polite"),i.className=`app-toast pointer-events-auto flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3.5 text-sm font-semibold shadow-xl transition-all duration-200 ${n}`,i.innerHTML=`
    ${b(a,19,"shrink-0")}
    <span class="flex-1">${c(e)}</span>
    <button type="button" class="ml-2 rounded-lg p-1 text-muted hover:bg-canvas transition" aria-label="ปิดข้อความ">
      ${b("close",17)}
    </button>
  `,i.querySelector("button")?.addEventListener("click",()=>{i.remove()}),s.appendChild(i),et=setTimeout(()=>{i.remove()},4200)}function ne(){document.querySelectorAll("select.field:not(.custom-select-applied):not(.master-native-select)").forEach(e=>{e.classList.add("custom-select-applied"),e.style.display="none";const t=document.createElement("div");t.className="relative w-full";const s=document.createElement("button");s.type="button",s.className=e.className.replace("custom-select-applied","").replace("hidden","")+" flex items-center justify-between text-left";const r=()=>'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';s.innerHTML=`<span class="truncate">${e.options[e.selectedIndex]?.text||""}</span>${r()}`,e.getAttribute("aria-invalid")==="true"&&s.setAttribute("aria-invalid","true");const n=document.createElement("div");n.className="absolute left-0 top-[calc(100%+6px)] z-20 hidden w-full overflow-y-auto max-h-60 rounded-xl border border-line bg-white shadow-xl custom-select-menu py-1";const a=()=>{s.innerHTML=`<span class="truncate">${e.options[e.selectedIndex]?.text||""}</span>${r()}`},i=Array.from(e.options).filter(o=>!o.disabled);i.forEach(o=>{const d=document.createElement("div");d.className=`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${o.selected?"bg-[#f0f8f2] font-bold text-primary":""}`,d.textContent=o.text,d.onclick=()=>{e.value=o.value,e.dispatchEvent(new Event("change",{bubbles:!0})),e.dispatchEvent(new Event("input",{bubbles:!0})),n.classList.add("hidden"),a(),Array.from(n.children).forEach((l,m)=>{l.className=`cursor-pointer px-4 py-2.5 text-sm transition hover:bg-[#e9f5ee] ${i[m].selected?"bg-[#f0f8f2] font-bold text-primary":""}`})},n.appendChild(d)}),s.onclick=o=>{o.preventDefault();const d=!n.classList.contains("hidden");document.querySelectorAll(".custom-select-menu").forEach(l=>l.classList.add("hidden")),d||n.classList.remove("hidden")},e.parentNode.insertBefore(t,e),t.appendChild(s),t.appendChild(n),t.appendChild(e)})}function ke(e){const t=e.getFullYear(),s=String(e.getMonth()+1).padStart(2,"0"),r=String(e.getDate()).padStart(2,"0");return`${t}-${s}-${r}`}function Ht(e){const t=new Date,s=ke(t);switch(e){case"today":return{from:s,to:s};case"7d":{const r=new Date(t);return r.setDate(r.getDate()-6),{from:ke(r),to:s}}case"month":{const r=new Date(t.getFullYear(),t.getMonth(),1);return{from:ke(r),to:s}}case"30d":{const r=new Date(t);return r.setDate(r.getDate()-29),{from:ke(r),to:s}}default:return{from:s,to:s}}}const It=[{id:"today",label:"วันนี้"},{id:"7d",label:"7 วันล่าสุด"},{id:"month",label:"เดือนนี้"},{id:"30d",label:"30 วันล่าสุด"}];function De({from:e="",to:t="",formId:s="",cls:r=""}={}){return`
    <div class="flex flex-wrap items-center gap-1.5 ${r}" role="group" aria-label="ช่วงเวลาด่วน">
      <span class="text-xs font-semibold text-muted mr-1">ช่วงด่วน:</span>
      ${It.map(n=>{const a=Ht(n.id),i=e===a.from&&t===a.to;return`
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
  `}function Pt(e,t=300){let s=null;return function(...r){clearTimeout(s),s=setTimeout(()=>{e.apply(this,r)},t)}}const zt=""+new URL("nonthaburi-logo-BUg5neRh.png",import.meta.url).href,mt="#/cleaning-zones",pt="#/waste-types",ut=[{type:"group",id:"cleaning",label:"งานบริการรักษาความสะอาด",icon:"sparkles",children:[{module:"road-washings",label:"การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด",children:[{module:"cleaning-zones",href:mt,label:"เขตรักษาความสะอาด"}]},{module:"waterway-cleanings",label:"การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ"},{module:"road-sweepings",label:"การกวาดทำความสะอาดฝุ่นถนนสาธารณะ"},{module:"outsourced-cleanings",label:"กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม"}]},{type:"link",module:"waste-collections",label:"งานบริหารจัดการมูลฝอย",icon:"recycle",children:[{module:"waste-types",href:pt,label:"ประเภทขยะมูลฝอย"}]},{type:"group",id:"sanitation",label:"งานบริหารจัดการสิ่งปฏิกูล",icon:"droplet",children:[{module:"drain-cleanings",label:"งานลอกท่อระบายน้ำ"},{module:"septic-pumpings",label:"งานสูบสิ่งปฏิกูล"},{module:"septic-treatments",label:"การบำบัดสิ่งปฏิกูล"}]},{type:"link",module:"waste-management-projects",label:"โครงการต่าง ๆ",icon:"chart"}];let E=!1,B=!1;const X=new Set;function Be(e){E=typeof e=="boolean"?e:!E,ft()}function Fe(){B=!1;const e=document.getElementById("user-menu-dropdown"),t=document.getElementById("user-menu-button");e&&(e.classList.add("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.remove("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!0),t&&(t.setAttribute("aria-expanded","false"),t.classList.remove("border-primary","bg-[#f0f8f2]"),t.querySelector("svg:last-child")?.classList.remove("rotate-180"))}function Bt(){B=!B;const e=document.getElementById("user-menu-dropdown"),t=document.getElementById("user-menu-button");e&&(B?(e.classList.remove("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.add("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!1,e.querySelector("a, button")?.focus()):(e.classList.add("opacity-0","invisible","-translate-y-1","pointer-events-none"),e.classList.remove("opacity-100","visible","translate-y-0","pointer-events-auto"),e.hidden=!0,t?.focus())),t&&(t.setAttribute("aria-expanded",String(B)),t.classList.toggle("border-primary",B),t.classList.toggle("bg-[#f0f8f2]",B),t.querySelector("svg:last-child")?.classList.toggle("rotate-180",B))}function J(e){const t=ut.find(s=>s.type==="group"&&s.children.some(r=>r.module===e||r.children?.some(n=>n.module===e)));if((e==="waste-collections"||e==="waste-types")&&X.add("waste-collections"),t){X.add(t.id);const s=t.children.find(r=>r.children?.some(n=>n.module===e)||r.module===e&&r.children);s&&X.add(s.module)}}function Ft(e){X.has(e)?X.delete(e):X.add(e)}function ft(){const e=window.innerWidth<1024;document.body.style.overflow=e&&E?"hidden":"";const t=document.getElementById("sidebar"),s=document.getElementById("mobile-backdrop");s&&(s.classList.toggle("opacity-100",e&&E),s.classList.toggle("pointer-events-auto",e&&E),s.classList.toggle("visible",e&&E),s.classList.toggle("opacity-0",!e||!E),s.classList.toggle("pointer-events-none",!e||!E),s.classList.toggle("invisible",!e||!E)),t&&(t.inert=e&&!E,t.setAttribute("aria-hidden",String(!E&&e)),e?(t.classList.toggle("-translate-x-full",!E),t.classList.toggle("translate-x-0",E),t.classList.toggle("invisible",!E),t.classList.toggle("pointer-events-none",!E),t.classList.toggle("visible",E),t.classList.toggle("pointer-events-auto",E)):(t.classList.remove("-translate-x-full","invisible","pointer-events-none"),t.classList.add("translate-x-0","visible","pointer-events-auto")));const r=document.querySelector('[data-action="open-menu"]');r&&r.setAttribute("aria-expanded",String(E))}function Nt(e,t){if(e.type==="link"){if(!w(`${e.module}.view`))return"";const a=t===e.module;if(!e.children)return`<a href="${ee(e.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${a?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${a?'aria-current="page"':""}>${b(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a>`;const i=e.children.filter(l=>w(`${l.module}.view`));if(!i.length)return`<a href="${ee(e.module)}" class="mb-1 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold leading-5 ${a?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${a?'aria-current="page"':""}>${b(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a>`;const o=i.some(l=>l.module===t),d=X.has(e.module);return`<div class="mb-1 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${a?"nav-active":o?"bg-[#f4f9f5] text-primary-dark":"text-[#657772]"}"><a href="${ee(e.module)}" class="flex min-h-11 min-w-0 flex-1 items-center gap-3 rounded-l-xl px-3 py-2.5 text-sm font-semibold leading-5 hover:bg-[#f4f7f4] hover:text-ink" ${a?'aria-current="page"':""}>${b(e.icon,19,"shrink-0")}<span class="min-w-0 whitespace-normal break-words">${c(e.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${e.module}" aria-expanded="${d}" aria-controls="sidebar-subgroup-${e.module}" aria-label="${d?"ปิด":"เปิด"}เมนูย่อยของ${c(e.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${b("chevronDown",16,`transition-transform ${d?"rotate-180":""}`)}</button></div><div id="sidebar-subgroup-${e.module}" class="ml-5 border-l border-[#dbe9df] pl-3" ${d?"":"hidden"}>${i.map(l=>{const m=t===l.module;return`<a href="${l.href||ee(l.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${m?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${m?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(l.label)}</span></a>`}).join("")}</div></div>`}const s=e.children.filter(a=>w(`${a.module}.view`));if(!s.length)return"";const r=X.has(e.id),n=s.some(a=>a.module===t||a.children?.some(i=>i.module===t&&w(`${i.module}.view`)));return`<div class="mb-1">
    <button type="button" data-action="toggle-sidebar-group" data-group="${e.id}" aria-expanded="${r}" aria-controls="sidebar-group-${e.id}" class="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold leading-5 ${n?"bg-[#f4f9f5] text-primary-dark":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">
      ${b(e.icon,19,"shrink-0")}<span class="min-w-0 flex-1 whitespace-normal break-words">${c(e.label)}</span>${b("chevronDown",16,`shrink-0 transition-transform ${r?"rotate-180":""}`)}
    </button>
    <div id="sidebar-group-${e.id}" class="ml-5 border-l border-[#dbe9df] pl-3" ${r?"":"hidden"}>
      ${s.map(a=>{const i=t===a.module,o=a.href||ee(a.module);if(!a.children)return`<a href="${o}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${i?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${i?'aria-current="page"':""}><span class="whitespace-normal break-words">${c(a.label)}</span></a>`;const d=a.children.filter(u=>w(`${u.module}.view`));if(!d.length)return`<a href="${o}" class="my-0.5 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${i?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${i?'aria-current="page"':""}><span class="whitespace-normal break-words">${c(a.label)}</span></a>`;const l=X.has(a.module),m=a.children.some(u=>u.module===t);return`<div class="my-0.5 min-w-0"><div class="flex min-w-0 items-stretch rounded-xl ${i?"nav-active":m?"bg-[#f4f9f5] text-primary-dark":"text-[#687b74]"}"><a href="${o}" class="flex min-h-11 min-w-0 flex-1 items-center rounded-l-xl px-3 py-2.5 text-[13px] font-medium leading-5 hover:bg-[#f4f7f4] hover:text-ink ${i?"font-semibold":""}" ${i?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(a.label)}</span></a><button type="button" data-action="toggle-sidebar-subgroup" data-group="${a.module}" aria-expanded="${l}" aria-controls="sidebar-subgroup-${a.module}" aria-label="${l?"ปิด":"เปิด"}เมนูย่อยของ${c(a.label)}" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-r-xl hover:bg-[#f4f7f4]">${b("chevronDown",16,`transition-transform ${l?"rotate-180":""}`)}</button></div><div id="sidebar-subgroup-${a.module}" class="ml-3 border-l border-[#dbe9df] pl-2" ${l?"":"hidden"}>${d.map(u=>{const p=t===u.module;return`<a href="${u.href||ee(u.module)}" class="my-0.5 flex min-h-11 min-w-0 items-center rounded-xl px-3 py-2.5 text-[13px] font-medium leading-5 ${p?"nav-active":"text-[#687b74] hover:bg-[#f4f7f4] hover:text-ink"}" ${p?'aria-current="page"':""}><span class="min-w-0 whitespace-normal break-words">${c(u.label)}</span></a>`}).join("")}</div></div>`}).join("")}
    </div>
  </div>`}function Ot(e,t){const s=window.serviceHubUrls?.logo||zt;return`
    <div id="mobile-backdrop" class="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none lg:hidden ${E?"opacity-100 pointer-events-auto visible":"opacity-0 pointer-events-none invisible"}" data-action="close-menu" aria-hidden="true"></div>
    <aside id="sidebar" role="complementary" aria-label="แถบเมนูหลัก" class="fixed inset-y-0 left-0 z-50 flex w-[266px] max-w-[calc(100vw-24px)] flex-col border-r border-line bg-white transition-transform duration-200 motion-reduce:transition-none lg:translate-x-0 lg:visible lg:pointer-events-auto ${E?"translate-x-0 visible pointer-events-auto":"-translate-x-full invisible pointer-events-none"}" ${E?'aria-hidden="false"':'aria-hidden="true"'}>
      <div class="flex h-[72px] items-center gap-3 border-b border-line px-5 sm:px-6">
        <img src="${s}" alt="ตราเทศบาลนครนนทบุรี" class="h-12 w-12 shrink-0 object-contain drop-shadow-sm">
        <div class="min-w-0 flex-1"><div class="text-[15px] font-bold tracking-tight text-ink leading-snug">เทศบาลนครนนทบุรี</div><div class="text-[11px] font-medium tracking-wide text-muted">ฐานข้อมูลฝ่ายบริการ</div></div>
        <button type="button" class="ml-auto flex min-h-11 min-w-11 items-center justify-center rounded-lg p-2 text-muted lg:hidden" data-action="close-menu" aria-label="ปิดเมนู">${b("close",20)}</button>
      </div>
      <nav aria-label="เมนูหลัก" role="navigation" class="scrollbar-thin flex-1 overflow-y-auto px-4 pb-6 pt-6">
        <a href="#/dashboard" class="mb-2 flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${t?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${t?'aria-current="page"':""}>${b("grid",19)}<span>แดชบอร์ดฝ่ายบริการ</span></a>
        ${ut.map(r=>Nt(r,e)).join("")}
        ${!w("road-washings.view")&&w("cleaning-zones.view")?`<a href="${mt}" class="mb-1 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="cleaning-zones"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4]"}">เขตรักษาความสะอาด</a>`:""}
        ${!w("waste-collections.view")&&w("waste-types.view")?`<a href="${pt}" class="mb-1 flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="waste-types"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4]"}">ประเภทขยะมูลฝอย</a>`:""}
        <a href="#/reports" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="reports"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="reports"?'aria-current="page"':""}>${b("chart",18)}รายงาน</a>
        ${w("audit-logs.view")?`<a href="#/audit-logs" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="audit-logs"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}">${b("info",18)}ประวัติการแก้ไข</a>`:""}
        ${Re()?`<div class="mt-3 border-t border-line pt-3"><a href="#/users" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="users"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="users"?'aria-current="page"':""}>${b("users",19)}<span>จัดการผู้ใช้งาน</span></a></div>`:""}
        <div class="mt-3 border-t border-line pt-3">
          <a href="#/profile" class="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${e==="profile"?"nav-active":"text-[#657772] hover:bg-[#f4f7f4] hover:text-ink"}" ${e==="profile"?'aria-current="page"':""}>
            ${b("users",19)}<span>โปรไฟล์ของฉัน</span>
          </a>
        </div>
      </nav>
    </aside>
  `}function Vt(e=[]){const t=window.serviceHubUser||{},s=(t.name||t.username||"U").slice(0,1).toUpperCase(),r=(t.name||t.username||"U").slice(0,2).toUpperCase(),n=(t.roles||[])[0]||"staff";return`
    <header role="banner" class="app-header sticky top-0 z-30 flex h-[72px] w-full max-w-full min-w-0 items-center justify-between border-b border-line bg-white/95 px-3.5 backdrop-blur-sm sm:px-7 lg:px-9">
      <div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
        <button type="button" class="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl p-2 text-ink hover:bg-canvas lg:hidden" data-action="open-menu" aria-label="เปิดเมนู" aria-expanded="${E}" aria-controls="sidebar">${b("menu",22)}</button>
        <nav aria-label="เส้นทางหน้า" role="navigation" class="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap text-xs text-muted sm:text-sm">
          <a class="shrink-0 hover:text-primary" href="#/dashboard">หน้าหลัก</a>
          ${e.map(a=>`${b("chevron",14,"shrink-0 text-[#b7c4bd]")}<span class="min-w-0 truncate ${a.current?"font-semibold text-ink":""}">${a.href?`<a href="${a.href}" class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom hover:text-primary">${c(a.label)}</a>`:`<span class="inline-block max-w-[85px] xs:max-w-[120px] sm:max-w-none truncate align-bottom">${c(a.label)}</span>`}</span>`).join("")}
        </nav>
      </div>
      <div class="ml-2 flex shrink-0 items-center gap-2 sm:gap-3">
        <span class="hidden rounded-full border border-[#cfe9dd] bg-[#f0faf4] px-3 py-1 text-[11px] font-bold text-primary sm:inline-flex">ข้อมูลจริง</span>
        <div id="user-menu-container" class="relative">
          <button type="button" data-action="toggle-user-menu" id="user-menu-button" aria-haspopup="menu" aria-expanded="${B}" aria-controls="user-menu-dropdown" class="flex min-h-11 items-center gap-2 rounded-xl border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-ink transition hover:border-[#afcfc0] hover:bg-[#f0f8f2] focus:outline-none focus:ring-2 focus:ring-primary/20 ${B?"border-primary bg-[#f0f8f2]":""}" aria-label="เมนูผู้ใช้งาน ${c(t.name||t.username)}">
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#177a67] to-[#0e6253] text-xs font-bold text-white shadow-sm">${c(s)}</span>
            <span class="hidden max-w-[130px] truncate sm:inline">${c(t.name||t.username)}</span>
            ${b("chevronDown",14,`shrink-0 text-[#687b74] transition-transform duration-150 ${B?"rotate-180":""}`)}
          </button>
          <div id="user-menu-dropdown" class="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-24px)] rounded-2xl border border-line bg-white p-2 shadow-xl z-50 transition-all ${B?"opacity-100 visible translate-y-0 pointer-events-auto":"opacity-0 invisible -translate-y-1 pointer-events-none"}" role="menu" aria-labelledby="user-menu-button" ${B?"":"hidden"}>
            <div class="rounded-xl bg-[#f8faf8] p-3 border border-[#edf3ee]">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#177a67] to-[#0e6253] text-sm font-bold text-white shadow-sm">
                  ${c(r)}
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-ink truncate">${c(t.name||t.username)}</div>
                  <div class="text-[11px] text-muted truncate">@${c(t.username)}</div>
                  <div class="mt-1">
                    <span class="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${Dt[n]||"border-gray-200 bg-gray-50 text-gray-700"}">
                      ${c(Rt[n]||n)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="my-1.5 border-t border-line"></div>
            <a href="#/profile" data-action="close-user-menu" role="menuitem" class="flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-ink transition hover:bg-[#f0f8f2] hover:text-primary-dark">
              ${b("users",16,"text-primary")}
              <span>โปรไฟล์ของฉัน</span>
            </a>
            <div class="my-1.5 border-t border-line"></div>
            <form method="POST" action="${c(window.serviceHubUrls?.logout||"/logout")}" class="m-0">
              <input type="hidden" name="_token" value="${c(document.querySelector('meta[name="csrf-token"]')?.content)}">
              <button type="submit" role="menuitem" class="flex w-full min-h-11 items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-semibold text-rose-600 transition hover:bg-rose-50 hover:text-rose-700">
                ${b("logout",16,"text-rose-500")}
                <span>ออกจากระบบ</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  `}function O(e,t=null,s=[],r=!1){return`
    ${Ot(t,r)}
    <div class="app-shell min-h-screen w-full max-w-full min-w-0 lg:pl-[266px]">
      ${Vt(s)}
      <main id="main-content" role="main" tabindex="-1" class="app-content mx-auto w-full min-w-0 max-w-[1510px] px-3.5 pb-16 pt-5 sm:px-7 sm:pt-7 lg:px-9">
        ${e}
      </main>
      <div id="shell-live-status" role="status" aria-live="polite" class="sr-only"></div>
    </div>
  `}function Zt(){window.addEventListener("resize",ft)}const Gt={distance_km:"กม.",quantity:"ตัน",weight:"ตัน",sediment_quantity:"ลบ.ม.",volume:"ลบ.ม.",fee_amount:"บาท",sludge_quantity:"กก.",fertilizer_remaining_latest:"กก.",communities_count:"ชุมชน",participants_count:"คน"},Wt={fertilizer_remaining_latest:"ปุ๋ยคงเหลือล่าสุด"},fe=e=>new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Bangkok"}).format(new Date(`${String(e).slice(0,10)}T12:00:00+07:00`)),Kt=e=>e?new Intl.DateTimeFormat("th-TH",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"Asia/Bangkok"}).format(new Date(String(e).replace(" ","T")+(String(e).includes("Z")||/[+-]\d\d:\d\d$/.test(String(e))?"":"+00:00"))):"—";function Yt({data:e,loading:t,error:s,params:r,groups:n,modules:a,icon:i,esc:o,number:d,moduleHref:l}){const m=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Bangkok",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date).map(x=>[x.type,x.value])),u=Number(m.year),p=Number(m.month),f=`${m.year}-${m.month}-01`,v=new Date(Date.UTC(u,p,0)).toISOString().slice(0,10),$=r.get("from")??e?.period?.from??f,S=r.get("to")??e?.period?.to??v,k=$!==f||S!==v,A='<div class="mb-5 sm:mb-6"><p class="text-xs font-bold tracking-[.16em] text-primary">ภาพรวมระบบ</p><h1 class="mt-2 text-2xl font-bold text-ink sm:text-3xl">แดชบอร์ดฝ่ายบริการ</h1><p class="mt-2 text-sm text-muted">ติดตามงานบริการจากฐานข้อมูลจริงตามสิทธิ์ของคุณ</p></div>',U=`
    <section aria-labelledby="dashboard-filter-title" class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h2 id="dashboard-filter-title" class="font-bold text-ink">ช่วงวันที่ดำเนินงาน</h2>
          <p class="text-xs text-muted">ตัวเลขหลักใช้วันที่ดำเนินงาน รวมวันเริ่มต้นและวันสิ้นสุด</p>
        </div>
        ${De({from:$,to:S,formId:"dashboard-filter"})}
      </div>
      <form id="dashboard-filter" class="grid min-w-0 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto] sm:items-end">
        <label class="min-w-0 text-sm font-semibold">ตั้งแต่วันที่<input class="field mt-1" type="date" name="from" value="${o($)}" required></label>
        <label class="min-w-0 text-sm font-semibold">ถึงวันที่<input class="field mt-1" type="date" name="to" value="${o(S)}" required></label>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 font-bold text-white hover:bg-primary-dark">กรองข้อมูล</button>
        ${k?'<a href="#/dashboard" class="flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-muted hover:bg-[#f6faf7]" title="คืนค่าเป็นเดือนปัจจุบัน">ล้างตัวกรอง</a>':'<a href="#/dashboard" class="flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-sm font-semibold text-ink hover:bg-[#f6faf7]">เดือนปัจจุบัน</a>'}
      </form>
      <p id="dashboard-filter-error" role="alert" class="mt-2 hidden text-sm text-red-700"></p>
    </section>
  `;if(t||!e&&!s)return`${A}${U}<div role="status" aria-live="polite" class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted">กำลังโหลดข้อมูลภาพรวม…</div>`;if(s)return`${A}${U}<div role="alert" class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"><p class="font-semibold">โหลดข้อมูลภาพรวมไม่สำเร็จ</p><p class="mt-1">${o(s)}</p><button type="button" data-action="retry-dashboard" class="mt-3 min-h-11 rounded-xl border border-red-300 bg-white px-4 font-semibold">ลองอีกครั้ง</button></div>`;const g=a.filter(x=>Object.hasOwn(e.module_summary,x.id)),y=x=>g.some(h=>h.id===x),R=x=>`${l(x)}?${new URLSearchParams({from:e.period.from,to:e.period.to})}`,re=e.period.total,Q=(x,h,M,z,W=!1)=>`<div class="dashboard-card panel-shadow rounded-2xl border border-line bg-white ${W?"border-l-[3px] border-l-primary":""} p-4 sm:p-5"><p class="text-sm font-semibold text-[#4d655a]">${x}</p><p class="mt-3 text-3xl font-bold leading-tight text-ink">${d(h)} <span class="text-sm font-medium text-muted">${M}</span></p><p class="mt-1 text-xs text-muted">${z}</p></div>`,we=(x,h,M)=>{const z=Wt[h]||x.fields.find(W=>W.name===h)?.label||h;return`<span class="inline-flex max-w-full flex-wrap gap-1 rounded-lg bg-[#f4f8f5] px-2.5 py-1.5 text-xs text-[#435b50]"><span>${o(z)}:</span><strong class="text-ink">${M===null?"ไม่มีข้อมูล":`${d(M)} ${Gt[h]||""}`}</strong></span>`},D=(x,h)=>e.module_summary[x]?.metrics[h]??0,me={cleaning:[["ระยะทางดำเนินงานรวม",g.filter(x=>x.group==="cleaning").reduce((x,h)=>x+D(h.id,"distance_km"),0),"กม."],...y("waterway-cleanings")?[["ผักตบชวาและมูลฝอยที่กำจัด",D("waterway-cleanings","quantity"),"ตัน"]]:[]],waste:[["น้ำหนักมูลฝอย",D("waste-collections","weight"),"ตัน"]],sanitation:[...y("drain-cleanings")?[["ตะกอนจากงานลอกท่อ",D("drain-cleanings","sediment_quantity"),"ลบ.ม."]]:[],...y("septic-pumpings")?[["สิ่งปฏิกูลที่สูบ",D("septic-pumpings","volume"),"ลบ.ม."]]:[],...y("septic-treatments")?[["ตะกอนสำหรับทำปุ๋ย",D("septic-treatments","sludge_quantity"),"กก."]]:[]],projects:[["ผู้เข้าร่วมโครงการ",D("waste-management-projects","participants_count"),"คน"]]},ye=n.filter(x=>g.some(h=>h.group===x.id)).map(x=>`<section class="dashboard-card panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5"><div class="flex items-start gap-3"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf5ef] text-primary">${i(x.icon,19)}</span><div class="min-w-0"><h3 class="break-words text-sm font-bold text-ink">${o(x.label)}</h3><p class="mt-1 text-2xl font-bold text-ink">${d(e.group_summary[x.id]||0)} <span class="text-xs font-medium text-muted">รายการในช่วงที่เลือก</span></p></div></div><dl class="mt-4 space-y-1.5 border-t border-line pt-3">${me[x.id].map(([h,M,z])=>`<div class="flex flex-wrap justify-between gap-x-2 text-xs"><dt class="text-muted">${h}</dt><dd class="font-bold text-ink">${d(M)} ${z}</dd></div>`).join("")}</dl></section>`).join(""),pe=g.map(x=>{const h=e.module_summary[x.id];return`<a href="${R(x.id)}" class="flex min-w-0 flex-col gap-2 rounded-xl border border-line bg-white p-3.5 transition hover:border-[#9fd1b8] hover:bg-[#f9fcfa] focus-visible:outline"><span class="flex min-w-0 items-start justify-between gap-2"><span class="min-w-0 break-words text-sm font-semibold text-ink">${o(x.short)}</span><strong class="shrink-0 text-sm text-primary">${d(h.count)} รายการ</strong></span><span class="flex flex-wrap gap-1.5">${Object.entries(h.metrics).map(([M,z])=>we(x,M,z)).join("")||'<span class="text-xs text-muted">ไม่มีค่าปริมาณ</span>'}</span></a>`}).join(""),Ie=Math.max(1,...e.trend.map(x=>x.count)),Pe=e.trend.map(x=>`<li class="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 text-xs"><span class="min-w-0 break-words text-muted">${fe(x.from)}${x.from===x.to?"":` – ${fe(x.to)}`}</span><strong class="text-ink">${d(x.count)} รายการ</strong><span class="col-span-2 h-2 rounded-full bg-[#eef3ef]"><span class="block h-2 rounded-full bg-primary" style="width:${Math.max(0,Math.round(x.count/Ie*100))}%"></span></span></li>`).join(""),ze=e.recent.slice(0,6).map(x=>{const h=a.find(M=>M.id===x.module);return h?`<a href="${l(h.id)}/${encodeURIComponent(x.id)}" class="flex min-w-0 items-center gap-3 border-t border-line px-4 py-3 hover:bg-[#f9fcfa] sm:px-5"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eaf5ef] text-primary">${i(h.icon,17)}</span><span class="min-w-0 flex-1"><strong class="block break-words text-sm text-ink">${o(x.title||h.short)}</strong><span class="block break-words text-xs text-muted">${o(h.short)} · ดำเนินงาน ${fe(x.service_date)}</span></span><time class="shrink-0 text-right text-xs text-muted" datetime="${o(x.created_at)}">${Kt(x.created_at)}</time></a>`:""}).join("");return`${A}${U}<section aria-label="ยอดรวม" class="dashboard-summary mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">${Q("รายการในช่วงที่เลือก",re,"รายการ",`${fe(e.period.from)} – ${fe(e.period.to)}`,!0)}${Q("ยอดสะสมตั้งแต่เริ่มระบบ",e.total,"รายการ","เฉพาะหมวดที่คุณมีสิทธิ์ดู")}${Q("ดำเนินงานวันนี้",e.today,"รายการ","อิงวันที่ดำเนินงานตามเวลาไทย")}</section><section aria-labelledby="group-heading" class="mb-6"><h2 id="group-heading" class="mb-3 text-lg font-bold text-ink">ภาพรวมกลุ่มงาน</h2>${g.length?`<div class="dashboard-summary grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">${ye}</div>`:'<p class="rounded-xl border border-line bg-white p-5 text-sm text-muted">ไม่มีหมวดงานที่คุณมีสิทธิ์ดู</p>'}</section><section aria-labelledby="module-heading" class="panel-shadow mb-6 rounded-2xl border border-line bg-[#f8faf8] p-4 sm:p-5"><div class="mb-3"><h2 id="module-heading" class="text-lg font-bold text-ink">งานบริการรายหมวด</h2><p class="text-xs text-muted">จำนวนและปริมาณในช่วงวันที่ที่เลือก; แต่ละค่าระบุหน่วยและความหมายแยกกัน</p></div>${re===0?'<p class="mb-3 rounded-xl border border-[#d8e7dd] bg-white p-4 text-sm text-muted">ยังไม่มีรายการดำเนินงานในช่วงวันที่นี้ ลองเลือกช่วงอื่นเพื่อดูข้อมูล</p>':""}<div class="grid min-w-0 gap-2 sm:grid-cols-2 xl:grid-cols-3">${pe}</div></section><div class="dashboard-panels grid grid-cols-1 gap-5 xl:grid-cols-2"><section aria-labelledby="trend-heading" class="panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5"><h2 id="trend-heading" class="text-lg font-bold text-ink">แนวโน้มจำนวนรายการ</h2><p class="mt-1 text-xs text-muted">แบ่งช่วงภายในวันที่ที่เลือก; แถบยาวขึ้นหมายถึงจำนวนมากขึ้น</p>${re&&e.trend.length>1?`<ol class="mt-5 space-y-4">${Pe}</ol>`:'<p class="mt-5 text-sm text-muted">ข้อมูลยังไม่เพียงพอสำหรับแสดงแนวโน้ม</p>'}</section><section aria-labelledby="recent-heading" class="panel-shadow overflow-hidden rounded-2xl border border-line bg-white"><div class="p-4 sm:p-5"><h2 id="recent-heading" class="text-lg font-bold text-ink">บันทึกล่าสุด</h2><p class="mt-1 text-xs text-muted">เรียงตามเวลาบันทึก ครอบคลุมข้อมูลทุกช่วงเวลา</p></div>${ze||'<p class="border-t border-line p-5 text-sm text-muted">ยังไม่มีรายการบันทึก</p>'}</section></div>`}let qe=null;function bt(e,t){if(e.key!=="Tab")return;const s=[...t.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(a=>!a.closest("[hidden]")&&a.offsetParent!==null);if(!s.length){e.preventDefault();return}const r=s[0],n=s[s.length-1];e.shiftKey&&document.activeElement===r?(e.preventDefault(),n.focus()):!e.shiftKey&&document.activeElement===n&&(e.preventDefault(),r.focus())}function Xt({title:e="",content:t="",footer:s="",trigger:r=null,onClose:n=null,initialFocusSelector:a="input:not([disabled]), select:not([disabled]), button:not([disabled])",maxWidth:i="max-w-[440px]"}={}){je();const o=r||document.activeElement,d=document.createElement("div");d.id="accessible-drawer-root",d.className="drawer-container",d.innerHTML=`
    <div id="drawer-backdrop" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-200" aria-hidden="true" data-action="drawer-close"></div>
    <div id="drawer-panel" role="dialog" aria-modal="true" aria-labelledby="drawer-title" class="fixed inset-y-0 right-0 z-50 flex w-full ${c(i)} flex-col bg-white shadow-2xl transition-transform duration-300">
      <div class="flex h-[68px] shrink-0 items-center justify-between border-b border-line px-5 sm:px-6">
        <h2 id="drawer-title" class="text-base font-bold text-ink">${c(e)}</h2>
        <button type="button" data-action="drawer-close" class="rounded-xl p-2 text-muted hover:bg-canvas transition" aria-label="ปิด">${b("close",20)}</button>
      </div>
      <div class="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
        ${typeof t=="string"?t:""}
      </div>
      ${s?`
      <div class="flex shrink-0 items-center justify-end gap-3 border-t border-line px-5 py-4 sm:px-6 bg-[#fafbfa]">
        ${s}
      </div>`:""}
    </div>
  `,t instanceof HTMLElement&&d.querySelector(".flex-1").appendChild(t),document.body.appendChild(d),document.body.style.overflow="hidden";const l=u=>{if(u.key==="Escape")u.preventDefault(),je();else if(u.key==="Tab"){const p=document.getElementById("drawer-panel");p&&bt(u,p)}},m=u=>{u.target.closest('[data-action="drawer-close"]')&&(u.preventDefault(),je())};return document.addEventListener("keydown",l),d.addEventListener("click",m),qe={root:d,triggerElement:o,onKeydown:l,onClick:m,onClose:n},requestAnimationFrame(()=>{requestAnimationFrame(()=>{const u=document.getElementById("drawer-panel");if(!u)return;const p=a?u.querySelector(a):null;p&&typeof p.focus=="function"?p.focus():u.querySelector('button[data-action="drawer-close"]')?.focus()})}),d}function je(){if(!qe)return;const{root:e,triggerElement:t,onKeydown:s,onClick:r,onClose:n}=qe;document.removeEventListener("keydown",s),e.removeEventListener("click",r),e.remove(),document.body.style.overflow="",qe=null,t&&typeof t.focus=="function"&&t.focus(),typeof n=="function"&&n()}function Xe({title:e="ยืนยันการดำเนินการ",message:t="คุณต้องการดำเนินการต่อหรือไม่",confirmText:s="ยืนยัน",cancelText:r="ยกเลิก",variant:n="danger",iconName:a="trash"}={}){return new Promise(i=>{const o=document.activeElement,d=document.createElement("div");d.id="accessible-modal-root",d.className="modal-container fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto bg-[#0d241e]/55 p-4 backdrop-blur-xs";const l={danger:{iconBg:"bg-[#fff0ed] text-[#b64b43]",btnConfirm:"bg-[#b84d45] hover:bg-[#a43e37] text-white"},warning:{iconBg:"bg-[#fff8eb] text-[#b2721a]",btnConfirm:"bg-[#b2721a] hover:bg-[#9a6214] text-white"},primary:{iconBg:"bg-[#eaf5ef] text-primary",btnConfirm:"bg-primary hover:bg-primary-dark text-white"}}[n]||{iconBg:"bg-[#fff0ed] text-[#b64b43]",btnConfirm:"bg-[#b84d45] hover:bg-[#a43e37] text-white"};d.innerHTML=`
      <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-modal-title" aria-describedby="confirm-modal-desc" class="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${l.iconBg}">
          ${b(a,21)}
        </div>
        <h2 id="confirm-modal-title" class="text-lg font-bold text-ink">${c(e)}</h2>
        <p id="confirm-modal-desc" class="mt-2 text-sm leading-relaxed text-muted">${c(t)}</p>
        <div class="mt-7 flex justify-end gap-2.5">
          <button type="button" id="confirm-modal-cancel" class="min-h-11 rounded-xl border border-line px-4 text-sm font-bold text-ink hover:bg-canvas transition">
            ${c(r)}
          </button>
          <button type="button" id="confirm-modal-confirm" class="min-h-11 rounded-xl px-4 text-sm font-bold transition ${l.btnConfirm}">
            ${c(s)}
          </button>
        </div>
      </div>
    `,document.body.appendChild(d);const m=document.body.style.overflow;document.body.style.overflow="hidden";const u=d.querySelector("#confirm-modal-cancel"),p=d.querySelector("#confirm-modal-confirm"),f=$=>{document.removeEventListener("keydown",v),d.remove(),document.body.style.overflow=m,o&&typeof o.focus=="function"&&o.focus(),i($)},v=$=>{if($.key==="Escape")$.preventDefault(),f(!1);else if($.key==="Tab"){const S=d.querySelector('[role="alertdialog"]');S&&bt($,S)}};d.addEventListener("click",$=>{$.target===d&&f(!1)}),u?.addEventListener("click",()=>f(!1)),p?.addEventListener("click",()=>f(!0)),document.addEventListener("keydown",v),setTimeout(()=>{u?.focus()},50)})}const ae={"super-admin":{label:"ผู้ดูแลสูงสุด",color:"bg-[#fef2e8] text-[#b25d1a] border-[#f9d4b4]"},admin:{label:"ผู้ดูแลระบบ",color:"bg-[#e8f0fe] text-[#2756b8] border-[#c3d3f9]"},staff:{label:"เจ้าหน้าที่",color:"bg-[#eef7f2] text-[#156e3a] border-[#b7e4ce]"},viewer:{label:"ผู้ดูข้อมูล",color:"bg-[#f3f0fb] text-[#5a469b] border-[#cdc5ef]"},auditor:{label:"ผู้ตรวจสอบ",color:"bg-[#fff4e8] text-[#966020] border-[#f5d9a8]"}};function Qt(e){const t=ae[e]||{label:e,color:"bg-[#f2f4f3] text-[#52665e] border-[#d8e3de]"};return`<span class="inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${t.color}">${c(t.label)}</span>`}let I={loading:!1,error:null,users:[],summary:{},meta:{},roles:[]},L={q:"",role:"all",status:"all",sort:"created_at",direction:"desc",page:1},tt=null;function Jt(){return`
    <div id="user-directory-root" class="w-full min-w-0 max-w-full">
      ${xt()}
    </div>
  `}function xt(){const{loading:e,error:t,users:s,summary:r,meta:n}=I,i=_e("users.create")?`<button type="button" data-action="um-open-create" class="inline-flex min-h-11 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-[0_5px_16px_rgba(23,122,103,.16)] transition hover:bg-primary-dark">${b("plus",18)}เพิ่มผู้ใช้งาน</button>`:"";return`
    ${F("การจัดการระบบ","จัดการผู้ใช้งาน","บริหารบัญชีผู้ใช้ สิทธิ์การเข้าถึง และความปลอดภัยของระบบ",i)}
    ${es(r)}
    ${ts()}
    ${e?`<div role="status" aria-live="polite" class="flex items-center justify-center py-16 text-muted text-sm">${b("filter",20,"animate-spin mr-2")} กำลังโหลดข้อมูลผู้ใช้งาน...</div>`:t?`<div role="alert" class="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">${c(t)}</div>`:ss(s,n)}
  `}function es(e){return`
    <section aria-label="สรุปสถิติผู้ใช้" class="mb-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      ${[{label:"บัญชีผู้ใช้ทั้งหมด",value:e.total_accounts??"—",icon:"users",bg:"bg-[#e6f4ee]",color:"text-primary"},{label:"ใช้งานอยู่",value:e.active_users??"—",icon:"check",bg:"bg-[#e7f3f8]",color:"text-[#3485a5]"},{label:"ผู้ดูแลระบบ",value:e.administrators??"—",icon:"sparkles",bg:"bg-[#fff3e5]",color:"text-[#bb7934]"},{label:"การยืนยันตัวตน 2FA",value:e.two_factor_enrolled??(e.total_accounts!=null?"พร้อมใช้งาน":"—"),icon:"lock",bg:"bg-[#f3f0fb]",color:"text-[#6b4fb8]"}].map(s=>`
        <div class="rounded-2xl border border-line bg-white p-4 sm:p-5 panel-shadow">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.bg} ${s.color}">
              ${b(s.icon,19)}
            </div>
            <p class="text-xs font-medium text-muted">${c(s.label)}</p>
          </div>
          <p class="mt-3 text-[26px] font-bold leading-none text-ink">${c(String(s.value))}</p>
        </div>
      `).join("")}
    </section>
  `}function ts(){const{q:e,role:t,status:s,sort:r,direction:n}=L,a=[{value:"all",label:"ทุกบทบาท"},...Object.entries(ae).map(([o,d])=>({value:o,label:d.label}))],i=[{value:"all",label:"ทุกสถานะ"},{value:"active",label:"ใช้งานอยู่"},{value:"inactive",label:"ระงับแล้ว"}];return`
    <section aria-label="ค้นหาและกรองผู้ใช้" class="mb-5 panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-end gap-3">
        <div class="w-full min-w-0 sm:min-w-[200px] sm:flex-1">
          <label for="um-search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <div class="relative">
            ${b("search",18,"pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]")}
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
  `}function ss(e,t){const s=_e("users.update"),r=_e("users.disable"),n=_e("users.update");if(!e.length)return`
      <div class="panel-shadow flex flex-col items-center rounded-2xl border border-line bg-white px-6 py-16 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f7f2] text-primary">
          ${b("users",27)}
        </div>
        <h3 class="text-base font-bold">ไม่พบผู้ใช้งาน</h3>
        <p class="mt-1 max-w-sm text-sm leading-relaxed text-muted">ลองเปลี่ยนคำค้นหาหรือตัวกรอง หรือเพิ่มผู้ใช้งานใหม่</p>
      </div>
    `;const{current_page:a=1,last_page:i=1,total:o=0,per_page:d=10}=t;return`
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
              ${s||r||n?'<th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">การดำเนินการ</th>':""}
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef2ee]">
            ${e.map(l=>{const m=l.role??l.roles?.[0]?.name??l.roles?.[0]??"",u=!!l.is_active,p=String(l.id)===String(window.serviceHubUser?.id);return`
                <tr class="transition hover:bg-[#fafcfa]" data-user-id="${c(String(l.id))}">
                  <td class="px-5 py-3.5">
                    <div class="flex items-center gap-3">
                      <span aria-hidden="true" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e0f0e8] text-[13px] font-bold text-primary-dark">
                        ${c(dt(l.name))}
                      </span>
                      <span class="font-semibold text-ink break-words max-w-[160px]">${c(l.name)}</span>
                    </div>
                  </td>
                  <td class="px-5 py-3.5 text-muted font-mono text-xs">${c(l.username)}</td>
                  <td class="px-5 py-3.5">${m?Qt(m):'<span class="text-muted">—</span>'}</td>
                  <td class="px-5 py-3.5">
                    <span class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${u?"bg-[#eef7f2] text-[#156e3a]":"bg-[#fef2f2] text-[#b91c1c]"}">
                      <span class="h-1.5 w-1.5 rounded-full ${u?"bg-[#22c55e]":"bg-[#ef4444]"}"></span>
                      ${u?"ใช้งานอยู่":"ระงับแล้ว"}
                    </span>
                  </td>
                  <td class="px-5 py-3.5 text-xs text-muted whitespace-nowrap">${te(l.created_at)}</td>
                  ${s||r||n?`
                  <td class="px-5 py-3.5 text-right">
                    <div class="flex items-center justify-end gap-1.5">
                      ${s?`<button type="button" data-action="um-edit-user" data-id="${c(String(l.id))}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-ink hover:bg-canvas" aria-label="แก้ไข ${c(l.name)}">${b("edit",15)}แก้ไข</button>`:""}
                      ${r&&!p?`<button type="button" data-action="um-toggle-status" data-id="${c(String(l.id))}" data-active="${u?"1":"0"}" data-name="${c(l.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold ${u?"text-[#b91c1c] hover:bg-red-50":"text-[#156e3a] hover:bg-[#eef7f2]"}" aria-label="${u?"ระงับ":"เปิดใช้"} ${c(l.name)}">${b(u?"close":"check",15)}${u?"ระงับ":"เปิดใช้"}</button>`:""}
                      ${n&&!p?`<button type="button" data-action="um-reset-password" data-id="${c(String(l.id))}" data-name="${c(l.name)}" class="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line px-2.5 text-xs font-semibold text-muted hover:bg-canvas" aria-label="รีเซ็ตรหัสผ่าน ${c(l.name)}">${b("logout",15)}รีเซ็ต</button>`:""}
                    </div>
                  </td>`:""}
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
      ${i>1?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-xs text-muted sm:px-6 sm:py-4">
        <span>แสดง ${_((a-1)*d+1)}–${_(Math.min(a*d,o))} จาก ${_(o)} บัญชี</span>
        <div class="flex items-center gap-2">
          <button type="button" data-action="um-page" data-page="${a-1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${a===1?"opacity-45 cursor-not-allowed":"hover:bg-canvas"}" ${a===1?'disabled aria-disabled="true"':""}>ก่อนหน้า</button>
          <span class="px-1 font-bold text-ink">${a} / ${i}</span>
          <button type="button" data-action="um-page" data-page="${a+1}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${a===i?"opacity-45 cursor-not-allowed":"hover:bg-canvas"}" ${a===i?'disabled aria-disabled="true"':""}>ถัดไป</button>
        </div>
      </div>`:""}
    </section>
  `}function rs(){const e="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",t=new Uint8Array(16);return crypto.getRandomValues(t),Array.from(t).map(s=>e[s%e.length]).join("")}async function Y(e=T){I.loading=!0,I.error=null,st(e);const t=new URLSearchParams;L.q&&t.set("q",L.q),L.role&&L.role!=="all"&&t.set("role",L.role),L.status&&L.status!=="all"&&t.set("status",L.status),t.set("sort",L.sort),t.set("direction",L.direction),t.set("page",String(L.page)),t.set("per_page","10");try{const s=window.serviceHubUrls?.apiUsers||"/api/users",r=await P(`${s}?${t}`);I.users=r.data??[],I.summary=r.summary??{},I.meta=r.meta??{}}catch(s){I.error=s.message||"ไม่สามารถโหลดข้อมูลผู้ใช้งานได้"}finally{I.loading=!1,st(e)}}async function ns(){try{const e=window.serviceHubUrls?.apiRoles||"/api/roles",t=await P(e);I.roles=t.data??[]}catch{I.roles=Object.keys(ae).map(e=>({name:e}))}}function st(e=T){const t=document.getElementById("user-directory-root");t&&(t.innerHTML=xt(),as(t,e))}function as(e,t=T){e.querySelector('[data-action="um-search"]')?.addEventListener("input",s=>{clearTimeout(tt),tt=setTimeout(()=>{L.q=s.target.value.trim(),L.page=1,Y(t)},300)}),e.querySelector('[data-action="um-filter-role"]')?.addEventListener("change",s=>{L.role=s.target.value,L.page=1,Y(t)}),e.querySelector('[data-action="um-filter-status"]')?.addEventListener("change",s=>{L.status=s.target.value,L.page=1,Y(t)}),e.querySelector('[data-action="um-filter-sort"]')?.addEventListener("change",s=>{const[r,n]=s.target.value.split(":");L.sort=r,L.direction=n,L.page=1,Y(t)}),e.querySelector('[data-action="um-clear-filters"]')?.addEventListener("click",()=>{Object.assign(L,{q:"",role:"all",status:"all",sort:"created_at",direction:"desc",page:1}),Y(t)}),e.querySelectorAll('[data-action="um-page"]').forEach(s=>{s.addEventListener("click",()=>{L.page=Number(s.dataset.page),Y(t)})}),e.querySelector('[data-action="um-open-create"]')?.addEventListener("click",s=>{Ne({mode:"create",trigger:s.currentTarget,toastFn:t})}),e.querySelectorAll('[data-action="um-edit-user"]').forEach(s=>{s.addEventListener("click",r=>{const n=I.users.find(o=>String(o.id)===s.dataset.id);if(!n)return;const a=n.role??n.roles?.[0]?.name??n.roles?.[0]??"",i={...n,role:a};Ne({mode:"edit",user:i,trigger:r.currentTarget,toastFn:t})})}),e.querySelectorAll('[data-action="um-reset-password"]').forEach(s=>{s.addEventListener("click",r=>{const n={id:s.dataset.id,name:s.dataset.name};Ne({mode:"reset",user:n,trigger:r.currentTarget,toastFn:t})})}),e.querySelectorAll('[data-action="um-toggle-status"]').forEach(s=>{s.addEventListener("click",async()=>{const r=s.dataset.id,n=s.dataset.active==="1",a=s.dataset.name;if(await Xe({title:n?"ยืนยันการระงับการใช้งาน":"ยืนยันการเปิดใช้งาน",message:`คุณต้องการ${n?"ระงับการใช้งาน":"เปิดใช้งาน"}บัญชี "${a}" ใช่หรือไม่? ${n?"ผู้ใช้จะถูกตัดเซสชันการเข้าใช้งานทันที":""}`,confirmText:n?"ระงับการใช้งาน":"เปิดใช้งาน",variant:n?"danger":"primary",iconName:n?"close":"check"})){s.disabled=!0;try{const o=window.serviceHubUrls?.apiUsers||"/api/users";await P(`${o}/${encodeURIComponent(r)}/status`,{method:"PATCH",body:{is_active:!n}}),t(n?"ระงับการใช้งานบัญชีแล้ว":"เปิดใช้งานบัญชีแล้ว"),await Y(t)}catch(o){t(o.message||"ไม่สามารถเปลี่ยนสถานะผู้ใช้ได้","error"),s.disabled=!1}}})})}function Ne({mode:e,user:t=null,trigger:s=null,toastFn:r=T}){const n=e==="reset",a=e==="edit",i=n?`รีเซ็ตรหัสผ่าน — ${c(t?.name)}`:a?"แก้ไขข้อมูลผู้ใช้":"เพิ่มผู้ใช้งานใหม่",o=I.roles.length?I.roles:Object.keys(ae).map(p=>({name:p})),d=document.createElement("div");d.innerHTML=`
    <div id="drawer-server-error" class="mb-4 hidden rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert"></div>
    <form id="um-drawer-form" novalidate class="space-y-4">
      ${n?`
        <div>
          <label for="um-new-password" class="mb-1.5 block text-sm font-semibold text-ink">รหัสผ่านใหม่ <span class="text-red-500">*</span></label>
          <div class="relative">
            <input id="um-new-password" name="password" type="password" autocomplete="new-password" class="field pr-12 font-mono" required minlength="15" aria-describedby="um-password-error">
            <button type="button" data-action="toggle-pwd-visibility" data-target="um-new-password" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="um-new-password">
              ${b("eye",18)}
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
            ${o.map(p=>`<option value="${c(p.name)}"${t?.role===p.name?" selected":""}>${c(ae[p.name]?.label||p.name)}</option>`).join("")}
          </select>
        </div>
        ${a?"":`
        <div>
          <label for="um-password" class="mb-1.5 block text-sm font-semibold text-ink">รหัสผ่านเริ่มต้น <span class="text-red-500">*</span></label>
          <div class="relative">
            <input id="um-password" name="password" type="password" autocomplete="new-password" class="field pr-12 font-mono" required minlength="15" aria-describedby="um-password-error">
            <button type="button" data-action="toggle-pwd-visibility" data-target="um-password" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="um-password">
              ${b("eye",18)}
            </button>
          </div>
          <p id="um-password-error" class="mt-1 text-xs text-muted" role="alert">ความยาวอย่างน้อย 15 ตัวอักษร</p>
          <button type="button" id="um-gen-init-pw-btn" class="mt-2 text-xs font-semibold text-primary hover:underline">สุ่มรหัสผ่านปลอดภัย</button>
        </div>`}
      `}
    </form>
  `;const l=`
    <button type="button" data-action="drawer-close" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-semibold text-ink hover:bg-canvas">ยกเลิก</button>
    <button type="submit" form="um-drawer-form" id="um-drawer-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">
      ${n?"รีเซ็ตรหัสผ่าน":a?"บันทึกการแก้ไข":"สร้างผู้ใช้งาน"}
    </button>
  `;d.querySelectorAll('[data-action="toggle-pwd-visibility"]').forEach(p=>{p.addEventListener("click",()=>{const f=d.querySelector(`#${p.dataset.target}`);if(!f)return;const v=f.type==="password";f.type=v?"text":"password",p.innerHTML=b(v?"eyeOff":"eye",18),p.setAttribute("aria-label",v?"ซ่อนรหัสผ่าน":"แสดงรหัสผ่าน"),p.setAttribute("aria-pressed",String(v))})});const m=()=>{const p=rs(),f=d.querySelector("#um-password")||d.querySelector("#um-new-password");if(f){f.value=p,f.type="text";const v=d.querySelector(`[data-target="${f.id}"]`);v&&(v.innerHTML=b("eyeOff",18),v.setAttribute("aria-label","ซ่อนรหัสผ่าน"),v.setAttribute("aria-pressed","true"))}};d.querySelector("#um-gen-pw-btn")?.addEventListener("click",m),d.querySelector("#um-gen-init-pw-btn")?.addEventListener("click",m);const u=d.querySelector("#um-drawer-form");u.addEventListener("submit",async p=>{p.preventDefault();const f=document.getElementById("um-drawer-submit"),v=d.querySelector("#drawer-server-error");v.classList.add("hidden"),v.textContent="",d.querySelectorAll('[aria-invalid="true"]').forEach(k=>k.removeAttribute("aria-invalid")),d.querySelectorAll("#um-password-error").forEach(k=>{k.textContent="ความยาวอย่างน้อย 15 ตัวอักษร",k.classList.remove("text-red-600"),k.classList.add("text-muted")}),d.querySelectorAll("#um-name-error, #um-username-error").forEach(k=>{k.textContent="",k.classList.add("hidden")});const $=new FormData(u),S={};e==="create"?(S.name=String($.get("name")||"").trim(),S.username=String($.get("username")||"").trim(),S.password=String($.get("password")||""),S.role=String($.get("role")||"")):e==="edit"?(S.name=String($.get("name")||"").trim(),S.role=String($.get("role")||"")):e==="reset"&&(S.password=String($.get("password")||"")),f&&(f.disabled=!0,f.classList.add("opacity-60"));try{const k=window.serviceHubUrls?.apiUsers||"/api/users";let A,U;e==="create"?(A=k,U="POST"):e==="edit"?(A=`${k}/${encodeURIComponent(t.id)}`,U="PUT"):(A=`${k}/${encodeURIComponent(t.id)}/reset-password`,U="POST"),await P(A,{method:U,body:S}),je(),r(e==="create"?"สร้างผู้ใช้งานเรียบร้อยแล้ว":e==="edit"?"บันทึกการแก้ไขแล้ว":"รีเซ็ตรหัสผ่านเรียบร้อยแล้ว"),await Y(r)}catch(k){f&&(f.disabled=!1,f.classList.remove("opacity-60")),k.status===422&&k.errors?(Object.entries(k.errors).forEach(([A,U])=>{const g=u.querySelector(`[name="${A}"]`),y=u.querySelector(`#um-${A}-error`);g&&g.setAttribute("aria-invalid","true"),y&&(y.textContent=U[0],y.classList.remove("hidden","text-muted"),y.classList.add("text-red-600"))}),u.querySelector('[aria-invalid="true"]')?.focus()):(v.textContent=k.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล",v.classList.remove("hidden"))}}),Xt({title:i,content:d,footer:l,trigger:s,initialFocusSelector:e==="reset"?"#um-new-password":"#um-name"})}function is(e){return setTimeout(()=>{Y(T),I.roles.length||ns()},0),Jt()}let le=[],C={"cleaning-zones":[],"waste-types":[]},gt=!1;const rt=new Set;let Ue=null;function de(){return le}async function ce(){try{const[e,t,...s]=await Promise.all([w("cleaning-zones.view")?be(ie("cleaning-zones")):Promise.resolve([]),w("waste-types.view")?be(ie("waste-types")):Promise.resolve([]),...Z.map(r=>w(`${r.id}.view`)?be(Te(r.id)):Promise.resolve([]))]);C["cleaning-zones"]=e||[],C["waste-types"]=t||[],le=s.flat(),gt=!0}catch(e){throw console.error("Failed to load activity data:",e),e}}function ht(e,t,s=C){return!e||t==null||t===""?"—":e.type==="reference"?c(s[e.reference]?.find(r=>String(r.id)===String(t))?.name||"ไม่พบข้อมูลอ้างอิง"):e.type==="number"||e.type==="integer"?`${_(t)}${e.unit?` ${c(e.unit)}`:""}`:e.type==="date"?te(t):c(t)}function os(e,t="",s="",r=C){const n=`field-${e.name}`,a=`id="${n}" name="${e.name}" class="field" ${e.required?"required":""} ${s?'aria-invalid="true"':""} aria-describedby="${n}-help"`;let i;if(e.type==="textarea")i=`<textarea ${a} rows="4" maxlength="10000">${c(t)}</textarea>`;else if(e.type==="reference")i=`
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
    `;else{const o=e.type==="number"||e.type==="integer",d=e.type==="number"?["distance_km","fee_amount"].includes(e.name)?"0.01":"0.001":"1";i=`<input ${a} type="${o?"number":e.type}" ${o?`step="${d}" min="0"`:""} ${e.type==="text"?`maxlength="${e.name==="project_name"?500:255}"`:""} value="${c(t)}" placeholder="${e.type==="text"?`ระบุ${c(e.label)}`:""}">`}return`
    <div class="${e.type==="textarea"?"sm:col-span-2":""}">
      <label for="${n}" class="mb-1.5 block text-sm font-semibold text-[#41564c]">
        ${c(e.label)} ${e.required?'<span class="text-[#bf5b53]" aria-label="จำเป็น">*</span>':""}
      </label>
      ${i}
      <p id="${n}-help" class="mt-1.5 min-h-4 text-xs ${s?"text-[#b73c35]":"text-muted"}">
        ${s?c(s):e.unit?`หน่วย: ${c(e.unit)}`:"&nbsp;"}
      </p>
    </div>
  `}function ls(e,t,s=C){const r=Object.fromEntries(new FormData(e)),n={};return t.fields.forEach(a=>{const i=String(r[a.name]??"").trim();if(r[a.name]=i,a.required&&!i)n[a.name]=`กรุณาระบุ${a.label}`;else if(i&&(a.type==="number"||a.type==="integer")){const o=Number(i);(!Number.isFinite(o)||o<0||a.type==="integer"&&!Number.isInteger(o))&&(n[a.name]=`กรุณาระบุ${a.label}เป็นจำนวนที่ถูกต้อง`)}else i&&a.type==="date"&&Number.isNaN(new Date(i).getTime())?n[a.name]="กรุณาระบุวันที่ที่ถูกต้อง":a.type==="reference"&&i&&!s[a.reference]?.some(o=>String(o.id)===i&&o.is_active)&&(n[a.name]=`กรุณาเลือก${a.label}จากรายการ`)}),{data:r,errors:n}}function ds({module:e,group:t,params:s,records:r=le,references:n=C}){const a=s.get("q")||"",i=s.get("from")||"",o=s.get("to")||"",d=s.get("sort")||"newest",l=Math.max(1,Number(s.get("page"))||1);let m=r.filter(g=>g.module===e.id);if(a){const g=a.toLocaleLowerCase("th");m=m.filter(y=>e.fields.some(R=>{const re=R.type==="reference"?n[R.reference]?.find(Q=>String(Q.id)===String(y[R.name]))?.name:y[R.name];return String(re??"").toLocaleLowerCase("th").includes(g)}))}i&&(m=m.filter(g=>g.service_date>=i)),o&&(m=m.filter(g=>g.service_date<=o)),e.fields.filter(g=>g.type==="reference").forEach(g=>{const y=s.get(g.name);y&&(m=m.filter(R=>String(R[g.name])===String(y)))}),m.sort((g,y)=>d==="oldest"?g.service_date.localeCompare(y.service_date):y.service_date.localeCompare(g.service_date));const u=6,p=Math.max(1,Math.ceil(m.length/u)),f=Math.min(l,p),v=m.slice((f-1)*u,f*u),$=e.fields.filter(g=>g.name!=="service_date").slice(0,3),S=g=>{const y=new URLSearchParams(s);return y.set("page",String(g)),`#/module/${e.id}?${y}`},k=e.fields.filter(g=>g.type==="reference").map(g=>{const y=s.get(g.name)||"";return`
      <div class="w-full min-w-0 sm:w-[170px]">
        <label for="${g.name}-filter" class="mb-1.5 block text-xs font-bold text-[#52665d]">${g.label}</label>
        <select id="${g.name}-filter" name="${g.name}" class="field">
          <option value="">ทั้งหมด</option>
          ${(n[g.reference]||[]).map(R=>`<option value="${c(R.id)}" ${y===String(R.id)?"selected":""}>${c(R.name)}</option>`).join("")}
        </select>
      </div>
    `}).join("");(i||o||d!=="newest"||e.fields.some(g=>g.type==="reference"&&s.get(g.name)))&&rt.add(e.id);const U=rt.has(e.id);return`
    ${F(t?.label||"",e.label,`จัดการข้อมูล${e.short} ค้นหาและกรองรายการตามช่วงวันที่`,w(`${e.id}.create`)?oe("เพิ่มข้อมูล",`#/module/${e.id}/new`):"")}
    <section aria-label="ตัวกรองรายการ" class="panel-shadow mb-5 w-full max-w-full min-w-0 rounded-2xl border border-line bg-white p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองข้อมูล</h2>
        ${De({from:i,to:o,formId:"filter-form"})}
      </div>
      <form id="filter-form" data-module="${e.id}" class="flex flex-wrap items-end gap-3">
        <div class="w-full min-w-0 sm:min-w-[180px] sm:flex-1">
          <label for="search" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <div class="relative">
            ${b("search",18,"pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9daf9f]")}
            <input id="search" name="q" class="field pl-10" type="search" placeholder="พิมพ์ค้นหาทันที..." value="${c(a)}" data-action="live-filter" autocomplete="off">
          </div>
        </div>
        <button type="button" data-action="toggle-mobile-filters" data-module="${e.id}" aria-expanded="${U}" aria-controls="advanced-filters-${e.id}" class="inline-flex min-h-11 w-full items-center justify-between rounded-xl border border-line px-4 text-sm font-semibold text-primary-dark md:hidden">
          ตัวกรองเพิ่มเติม ${b("chevronDown",16,U?"rotate-180":"")}
        </button>
        <div id="advanced-filters-${e.id}" class="${U?"flex":"hidden"} w-full flex-wrap items-end gap-3 md:contents">
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label>
            <input id="date-from" class="field" type="date" name="from" value="${c(i)}" data-action="live-filter">
          </div>
          <div class="w-full min-w-0 sm:w-[150px]">
            <label for="date-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label>
            <input id="date-to" class="field" type="date" name="to" value="${c(o)}" data-action="live-filter">
          </div>
          ${k}
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

    <section aria-labelledby="records-title" class="panel-shadow overflow-hidden w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3.5 sm:px-6 sm:py-4">
        <div>
          <h2 id="records-title" class="text-sm font-bold">รายการข้อมูล</h2>
          <p class="mt-0.5 text-xs text-muted">พบ ${_(m.length)} รายการ</p>
        </div>
        <span class="rounded-full bg-[#f0f7f2] px-2.5 py-1 text-[11px] font-bold text-primary">${c(e.short)}</span>
      </div>
      ${v.length?`
      <div class="data-table-scroll block overflow-x-auto w-full max-w-full min-w-0">
        <table class="w-full min-w-[650px] text-left text-sm" role="table">
          <thead class="bg-[#f9fbf9] text-xs font-semibold text-muted">
            <tr>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">วันที่ดำเนินงาน</th>
              ${$.map(g=>`<th scope="col" class="px-5 py-3.5 whitespace-nowrap">${c(g.label)}</th>`).join("")}
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap">ผู้บันทึก</th>
              <th scope="col" class="px-5 py-3.5 whitespace-nowrap text-right">ดูข้อมูล</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#eef2ee]">
            ${v.map(g=>`
              <tr class="transition hover:bg-[#fafcfa]">
                <td class="whitespace-nowrap px-5 py-3.5 font-semibold text-ink">${te(g.service_date)}</td>
                ${$.map(y=>`<td class="max-w-[240px] truncate px-5 py-3.5 text-[#53675e]">${ht(y,g[y.name],n)}</td>`).join("")}
                <td class="whitespace-nowrap px-5 py-3.5 text-muted">${c(g.created_by)}</td>
                <td class="whitespace-nowrap px-5 py-3.5 text-right">
                  <a href="#/module/${e.id}/${encodeURIComponent(g.id)}" class="inline-flex items-center gap-1 font-bold text-primary hover:underline">
                    รายละเอียด ${b("arrow",15)}
                  </a>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3.5 text-xs text-muted sm:px-6 sm:py-4">
        <span>แสดง ${_((f-1)*u+1)}–${_(Math.min(f*u,m.length))} จาก ${_(m.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a href="${S(Math.max(1,f-1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${f===1?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${f===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="px-1 font-bold text-ink">${f} / ${p}</span>
          <a href="${S(Math.min(p,f+1))}" class="inline-flex min-h-11 items-center rounded-lg border border-line px-3 py-1.5 ${f===p?"pointer-events-none opacity-45":"hover:bg-canvas"}" ${f===p?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:`
      <div class="flex flex-col items-center px-6 py-16 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f7f2] text-primary">${b("empty",27)}</div>
        <h3 class="text-base font-bold">ไม่พบรายการข้อมูล</h3>
        <p class="mt-1 max-w-sm text-sm leading-relaxed text-muted">${a||i||o?"ลองเปลี่ยนคำค้นหาหรือช่วงวันที่ แล้วค้นหาอีกครั้ง":"เริ่มต้นด้วยการเพิ่มรายการข้อมูลในหมวดนี้"}</p>
        <div class="mt-5">${a||i||o?se("ล้างตัวกรอง",`#/module/${e.id}`):oe("เพิ่มข้อมูล",`#/module/${e.id}/new`)}</div>
      </div>`}
    </section>
  `}function cs({module:e,group:t,record:s,references:r=C}){return`
    ${F(t?.label||"","รายละเอียดข้อมูล",`ข้อมูล${e.short} วันที่ ${te(s.service_date)}`,`
      <div class="flex flex-wrap gap-2">
        ${w(`${e.id}.update`)?se("แก้ไข",`#/module/${e.id}/${encodeURIComponent(s.id)}/edit`,"edit"):""}
        ${w(`${e.id}.delete`)?`
          <button type="button" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#eed8d5] bg-white px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-activity" data-module="${e.id}" data-id="${c(s.id)}">
            ${b("trash",17)}ลบรายการ
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
              <dd class="mt-1.5 break-words text-sm font-bold text-ink">${ht(n,s[n.name],r)}</dd>
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
            <p class="mt-0.5 text-xs text-muted">${te(s.created_at)}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-primary">แก้ไขล่าสุด</p>
            <p class="mt-1 text-xs text-muted">${c(s.updated_by||"ไม่ระบุ")}</p>
            <p class="mt-0.5 text-xs text-muted">${te(s.updated_at)}</p>
          </div>
        </div>
        <div class="mt-5 rounded-xl bg-[#f4f8f4] p-3 text-[11px] leading-relaxed text-muted">
          การเปลี่ยนแปลงถูกบันทึกใน Audit Log ของระบบ
        </div>
      </aside>
    </div>
  `}function Me({module:e,group:t,record:s=null,errors:r={},values:n=null,references:a=C}){const i=!!s,o=n||Ue||s||{},d=`${i?"แก้ไข":"เพิ่ม"}ข้อมูล${e.short}`;return`
    ${F(t?.label||"",d,i?"ตรวจสอบและแก้ไขรายละเอียดรายการนี้":"กรอกข้อมูลการดำเนินงานให้ครบตามช่องที่กำหนด")}
    <section class="panel-shadow w-full max-w-full min-w-0 rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-5 py-5 sm:px-7">
        <h2 class="font-bold">รายละเอียดการดำเนินงาน</h2>
        <p class="mt-1 text-xs text-muted">ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก</p>
      </div>
      <form id="record-form" data-module="${e.id}" data-id="${s?c(s.id):""}" novalidate class="p-5 sm:p-7">
        <div class="grid min-w-0 grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          ${e.fields.map(l=>os(l,o[l.name]??"",r[l.name],a)).join("")}
        </div>
        <div class="mt-7 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <a href="${s?`#/module/${e.id}/${encodeURIComponent(s.id)}`:`#/module/${e.id}`}" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold text-[#566a60] hover:bg-canvas">
            ยกเลิก
          </a>
          <button type="submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-white hover:bg-primary-dark">
            ${b("check",18)}${i?"บันทึกการแก้ไข":"บันทึกข้อมูล"}
          </button>
        </div>
      </form>
    </section>
  `}async function ms(e,t,{navigate:s=q,showToast:r=T,refreshData:n=ce}={}){if(await Xe({title:"ยืนยันการลบรายการ",message:"รายการนี้จะถูกลบออกจากฐานข้อมูลอย่างถาวร คุณต้องการดำเนินการต่อหรือไม่?",confirmText:"ลบรายการ",variant:"danger",iconName:"trash"}))try{const i=`${Te(e)}/${t}`;await P(i,{method:"DELETE"}),r("ลบรายการเรียบร้อยแล้ว"),await n(),s(`/module/${e}`)}catch(i){r(i.message||"ไม่สามารถลบรายการได้","error")}}async function ps(e){const t=e.dataset.module,s=Z.find(i=>i.id===t);if(!s)return;const{data:r,errors:n}=ls(e,s,C),a=e.dataset.id?le.find(i=>String(i.id)===e.dataset.id&&i.module===s.id):null;if(Object.keys(n).length){Ue=r;const i=ge.find(l=>l.id===s.group),o=Me({module:s,group:i,record:a,errors:n,values:r,references:C}),d=document.querySelector("#main-content");d&&(d.innerHTML=o),document.querySelector('[aria-invalid="true"]')?.focus();return}try{const i=a?`${Te(s.id)}/${a.id}`:Te(s.id),d=await P(i,{method:a?"PUT":"POST",body:r});Ue=null,await ce(),q(`/module/${s.id}/${d.data.id}`),T("บันทึกข้อมูลแล้ว")}catch(i){Ue=r;const o=i.fieldErrors||Object.fromEntries(Object.entries(i.fields||{}).map(([u,p])=>[u,Array.isArray(p)?p[0]:p]));T(i.message||"ไม่สามารถบันทึกข้อมูลได้","error");const d=ge.find(u=>u.id===s.group),l=Me({module:s,group:d,record:a,errors:o,values:r,references:C}),m=document.querySelector("#main-content");m&&(m.innerHTML=l),document.querySelector('[aria-invalid="true"]')?.focus()}}async function us(e){gt||await ce();const t=e.parts[1],s=Z.find(i=>i.id===t);if(!s)return'<div class="p-8 text-center text-muted">ไม่พบข้อมูลโมดูลงานบริการ</div>';const r=ge.find(i=>i.id===s.group);if(e.parts.length===2)return ds({module:s,group:r,params:e.params,records:le,references:C});if(e.parts.length===3&&e.parts[2]==="new")return w(`${s.id}.create`)?Me({module:s,group:r,record:null,references:C}):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์สร้างข้อมูลในหมวดนี้</div>';const n=decodeURIComponent(e.parts[2]||""),a=le.find(i=>i.module===s.id&&String(i.id)===n);return a?e.parts.length===4&&e.parts[3]==="edit"?w(`${s.id}.update`)?Me({module:s,group:r,record:a,references:C}):'<div class="p-8 text-center text-red-600">ไม่มีสิทธิ์แก้ไขข้อมูลในหมวดนี้</div>':cs({module:s,group:r,record:a,references:C}):'<div class="p-8 text-center text-muted">ไม่พบรายการข้อมูลที่ต้องการ</div>'}let he=[],ve=[],vt=!1;async function He(){const[e,t]=await Promise.all([w("cleaning-zones.view")?be(ie("cleaning-zones")):Promise.resolve([]),w("waste-types.view")?be(ie("waste-types")):Promise.resolve([])]);he=e||[],ve=t||[],vt=!0}function wt(e,t=de()){return t.filter(s=>s.module==="road-washings"&&s.cleaning_zone===e).length}function yt(e,t=de()){return t.filter(s=>s.module==="waste-collections"&&s.waste_type===e).length}function fs({params:e,zones:t=he,records:s=de()}){const r=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),n=e.get("sort")==="name"?"name":"code",a=e.get("status")||"all",i=10,o=t.filter(p=>!r||(p.code+" "+p.name).toLocaleLowerCase("th-TH").includes(r)).filter(p=>a==="all"?!0:a==="active"?p.is_active:!p.is_active).sort((p,f)=>String(p[n]).localeCompare(String(f[n]),"th",{numeric:!0})),d=Math.max(1,Math.ceil(o.length/i)),l=Math.min(d,Math.max(1,Number.parseInt(e.get("page"),10)||1)),m=o.slice((l-1)*i,l*i),u=p=>{const f=new URLSearchParams;return e.get("q")&&f.set("q",e.get("q")),a!=="all"&&f.set("status",a),n!=="code"&&f.set("sort",n),p>1&&f.set("page",String(p)),"#/cleaning-zones"+(f.size?"?"+f:"")};return`
    ${F("ข้อมูลพื้นฐาน","เขตรักษาความสะอาด","จัดการรหัสและชื่อเขตสำหรับรายการล้างทำความสะอาดถนน",oe("เพิ่มเขต","#/cleaning-zones/new"))}
    <section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6">
      <form id="zone-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_160px_160px_auto_auto] sm:items-end">
        <div>
          <label for="zone-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label>
          <input id="zone-search" name="q" type="search" class="field" placeholder="พิมพ์ค้นหาทันที..." value="${c(e.get("q")||"")}" data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="zone-status" class="mb-1.5 block text-sm font-semibold">สถานะ</label>
          <select id="zone-status" name="status" class="field master-native-select" data-action="live-filter">
            <option value="all" ${a==="all"?"selected":""}>ทุกสถานะ</option>
            <option value="active" ${a==="active"?"selected":""}>ใช้งานอยู่</option>
            <option value="inactive" ${a==="inactive"?"selected":""}>ระงับแล้ว</option>
          </select>
        </div>
        <div>
          <label for="zone-sort" class="mb-1.5 block text-sm font-semibold">เรียงตาม</label>
          <select id="zone-sort" name="sort" class="field master-native-select" data-action="live-filter">
            <option value="code" ${n==="code"?"selected":""}>รหัสเขต</option>
            <option value="name" ${n==="name"?"selected":""}>ชื่อเขต</option>
          </select>
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        <a href="#/cleaning-zones" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>
      </form>
    </section>

    <section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-4 py-4 sm:px-6">
        <h2 class="text-sm font-bold">รายการเขต</h2>
        <p class="mt-1 text-xs text-muted">พบ ${_(o.length)} รายการ</p>
      </div>
      ${m.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${m.map(p=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/cleaning-zones/${encodeURIComponent(p.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${c(p.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${c(p.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานล้างถนน ${_(wt(p.name,s))} รายการ</span>
            ${b("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบเขตรักษาความสะอาด</h3>
        <p class="mt-2 text-sm text-muted">${r?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มเขต"}</p>
        <div class="mt-5">${r?se("แสดงทั้งหมด","#/cleaning-zones"):oe("เพิ่มเขต","#/cleaning-zones/new")}</div>
      </div>`}
      ${o.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${_((l-1)*i+1)}–${_(Math.min(l*i,o.length))} จาก ${_(o.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===1?"pointer-events-none opacity-45":""}" href="${u(l-1)}" ${l===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${l} / ${d}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===d?"pointer-events-none opacity-45":""}" href="${u(l+1)}" ${l===d?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function bs({zone:e,records:t=de()}){const s=wt(e.name,t);return`
    ${F("ข้อมูลพื้นฐาน",e.name,"รายละเอียดเขตรักษาความสะอาด",`
      <div class="flex flex-wrap gap-2">
        ${se("แก้ไข",`#/cleaning-zones/${encodeURIComponent(e.id)}/edit`,"edit")}
        <button type="button" class="min-h-11 rounded-xl border border-[#eed8d5] px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-reference" data-type="cleaning-zones" data-id="${c(e.id)}" data-name="${c(e.name)}" data-usage="${s}">
          ${b("trash",17)} ลบเขต
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
          <dd class="mt-1 font-bold">${_(s)} รายการ</dd>
        </div>
      </dl>
      ${s?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">เขตนี้ถูกใช้ในรายการล้างถนน ต้องเปลี่ยนเขตในรายการเหล่านั้นก่อนจึงจะลบได้</p>':""}
    </section>
  `}function Ve(e=null,t={},s=e||{}){const n=!!e?"แก้ไขเขตรักษาความสะอาด":"เพิ่มเขตรักษาความสะอาด",a=(i,o,d)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="zone-${i}">
        ${c(o)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="zone-${i}" name="${i}" type="text" maxlength="${d}" required value="${c(s[i]||"")}" aria-describedby="zone-${i}-error" ${t[i]?'aria-invalid="true"':""}>
      <p id="zone-${i}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${c(t[i]||"")}</p>
    </div>
  `;return`
    ${F("ข้อมูลพื้นฐาน",n,"กรอกรหัสและชื่อเขตเพื่อใช้ในฟอร์มล้างทำความสะอาดถนน")}
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
  `}function xs({params:e,wasteTypes:t=ve,records:s=de()}){const r=(e.get("q")||"").trim().toLocaleLowerCase("th-TH"),n=e.get("sort")==="name"?"name":"code",a=e.get("status")||"all",i=10,o=t.filter(p=>!r||(p.code+" "+p.name).toLocaleLowerCase("th-TH").includes(r)).filter(p=>a==="all"?!0:a==="active"?p.is_active:!p.is_active).sort((p,f)=>String(p[n]).localeCompare(String(f[n]),"th",{numeric:!0})),d=Math.max(1,Math.ceil(o.length/i)),l=Math.min(d,Math.max(1,Number.parseInt(e.get("page"),10)||1)),m=o.slice((l-1)*i,l*i),u=p=>{const f=new URLSearchParams;return e.get("q")&&f.set("q",e.get("q")),a!=="all"&&f.set("status",a),n!=="code"&&f.set("sort",n),p>1&&f.set("page",String(p)),"#/waste-types"+(f.size?"?"+f:"")};return`
    ${F("ข้อมูลพื้นฐาน","ประเภทขยะมูลฝอย","จัดการรหัสและชื่อประเภทสำหรับรายการมูลฝอย",oe("เพิ่มประเภท","#/waste-types/new"))}
    <section class="panel-shadow mb-5 rounded-2xl border border-line bg-white p-4 sm:p-6">
      <form id="wasteType-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_160px_160px_auto_auto] sm:items-end">
        <div>
          <label for="wasteType-search" class="mb-1.5 block text-sm font-semibold">ค้นหา</label>
          <input id="wasteType-search" name="q" type="search" class="field" placeholder="พิมพ์ค้นหาทันที..." value="${c(e.get("q")||"")}" data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="wasteType-status" class="mb-1.5 block text-sm font-semibold">สถานะ</label>
          <select id="wasteType-status" name="status" class="field master-native-select" data-action="live-filter">
            <option value="all" ${a==="all"?"selected":""}>ทุกสถานะ</option>
            <option value="active" ${a==="active"?"selected":""}>ใช้งานอยู่</option>
            <option value="inactive" ${a==="inactive"?"selected":""}>ระงับแล้ว</option>
          </select>
        </div>
        <div>
          <label for="wasteType-sort" class="mb-1.5 block text-sm font-semibold">เรียงตาม</label>
          <select id="wasteType-sort" name="sort" class="field master-native-select" data-action="live-filter">
            <option value="code" ${n==="code"?"selected":""}>รหัสประเภท</option>
            <option value="name" ${n==="name"?"selected":""}>ชื่อประเภท</option>
          </select>
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        <a href="#/waste-types" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>
      </form>
    </section>

    <section class="panel-shadow min-w-0 overflow-hidden rounded-2xl border border-line bg-white">
      <div class="border-b border-line px-4 py-4 sm:px-6">
        <h2 class="text-sm font-bold">รายการประเภท</h2>
        <p class="mt-1 text-xs text-muted">พบ ${_(o.length)} รายการ</p>
      </div>
      ${m.length?`
      <div class="divide-y divide-[#edf1ed]">
        ${m.map(p=>`
          <a class="flex min-w-0 items-center gap-3 px-4 py-4 hover:bg-[#f8fbf8] sm:px-6" href="#/waste-types/${encodeURIComponent(p.id)}">
            <span class="shrink-0 rounded-lg bg-[#e9f5ef] px-2.5 py-1 text-xs font-bold text-primary-dark">${c(p.code)}</span>
            <span class="min-w-0 flex-1 break-words text-sm font-semibold">${c(p.name)}</span>
            <span class="hidden text-xs text-muted sm:inline">ใช้ในงานบริหารจัดการมูลฝอย ${_(yt(p.name,s))} รายการ</span>
            ${b("chevron",16,"shrink-0 text-muted")}
          </a>
        `).join("")}
      </div>`:`
      <div class="px-5 py-14 text-center">
        <h3 class="font-bold">ไม่พบประเภทขยะมูลฝอย</h3>
        <p class="mt-2 text-sm text-muted">${r?"ลองเปลี่ยนคำค้นหา หรือแสดงทั้งหมด":"เริ่มต้นด้วยการเพิ่มประเภท"}</p>
        <div class="mt-5">${r?se("แสดงทั้งหมด","#/waste-types"):oe("เพิ่มประเภท","#/waste-types/new")}</div>
      </div>`}
      ${o.length?`
      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 py-3 text-xs text-muted sm:px-6">
        <span>แสดง ${_((l-1)*i+1)}–${_(Math.min(l*i,o.length))} จาก ${_(o.length)} รายการ</span>
        <div class="flex items-center gap-2">
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===1?"pointer-events-none opacity-45":""}" href="${u(l-1)}" ${l===1?'aria-disabled="true" tabindex="-1"':""}>ก่อนหน้า</a>
          <span class="font-bold text-ink">${l} / ${d}</span>
          <a class="min-h-11 rounded-lg border border-line px-3 py-3 ${l===d?"pointer-events-none opacity-45":""}" href="${u(l+1)}" ${l===d?'aria-disabled="true" tabindex="-1"':""}>ถัดไป</a>
        </div>
      </div>`:""}
    </section>
  `}function gs({wasteType:e,records:t=de()}){const s=yt(e.name,t);return`
    ${F("ข้อมูลพื้นฐาน",e.name,"รายละเอียดประเภทขยะมูลฝอย",`
      <div class="flex flex-wrap gap-2">
        ${se("แก้ไข",`#/waste-types/${encodeURIComponent(e.id)}/edit`,"edit")}
        <button type="button" class="min-h-11 rounded-xl border border-[#eed8d5] px-4 text-sm font-bold text-[#b45148] hover:bg-[#fff7f6]" data-action="delete-reference" data-type="waste-types" data-id="${c(e.id)}" data-name="${c(e.name)}" data-usage="${s}">
          ${b("trash",17)} ลบประเภท
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
          <dd class="mt-1 font-bold">${_(s)} รายการ</dd>
        </div>
      </dl>
      ${s?'<p class="mt-6 rounded-xl border border-[#d7eadd] bg-[#f0f8f2] p-4 text-sm text-primary-dark">ประเภทนี้ถูกใช้ในรายการมูลฝอย ต้องเปลี่ยนประเภทในรายการเหล่านั้นก่อนจึงจะลบได้</p>':""}
    </section>
  `}function Ze(e=null,t={},s=e||{}){const n=!!e?"แก้ไขประเภทขยะมูลฝอย":"เพิ่มประเภทขยะมูลฝอย",a=(i,o,d)=>`
    <div>
      <label class="mb-1.5 block text-sm font-semibold" for="wasteType-${i}">
        ${c(o)} <span class="text-[#b4473e]" aria-label="จำเป็น">*</span>
      </label>
      <input class="field" id="wasteType-${i}" name="${i}" type="text" maxlength="${d}" required value="${c(s[i]||"")}" aria-describedby="wasteType-${i}-error" ${t[i]?'aria-invalid="true"':""}>
      <p id="wasteType-${i}-error" class="mt-1.5 min-h-4 text-xs text-[#b4473e]">${c(t[i]||"")}</p>
    </div>
  `;return`
    ${F("ข้อมูลพื้นฐาน",n,"กรอกรหัสและชื่อประเภทเพื่อใช้ในฟอร์มงานบริหารจัดการมูลฝอย")}
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
  `}async function hs(e,t,s,r,{navigate:n=q,showToast:a=T,refreshData:i=He}={}){if(r>0){a(`ไม่สามารถลบ "${s}" ได้เนื่องจากมีข้อมูลงานบริการที่อ้างอิงอยู่`,"error");return}const o=e==="cleaning-zones"?"เขต":"ประเภทขยะ";if(await Xe({title:`ยืนยันการลบ${o}`,message:`คุณต้องการลบ "${s}" ออกจากระบบใช่หรือไม่?`,confirmText:`ลบ${o}`,variant:"danger",iconName:"trash"}))try{const l=`${ie(e)}/${t}`;await P(l,{method:"DELETE"}),a(`ลบ${o}เรียบร้อยแล้ว`),await i(),await ce(),n(`/${e}`)}catch(l){a(l.message||`ไม่สามารถลบ${o}ได้`,"error")}}async function nt(e,t){const s=e.dataset.id,r=Object.fromEntries(new FormData(e));r.is_active=e.elements.namedItem("is_active")?.checked??!0;try{const n=`${ie(t)}${s?`/${s}`:""}`,a=await P(n,{method:s?"PUT":"POST",body:r});await He(),await ce(),q(`/${t}/${a.data.id}`),T("บันทึกข้อมูลแล้ว")}catch(n){T(n.message||"เกิดข้อผิดพลาดในการบันทึกข้อมูล","error");const a=n.fieldErrors||Object.fromEntries(Object.entries(n.fields||{}).map(([m,u])=>[m,Array.isArray(u)?u[0]:u])),o=(t==="cleaning-zones"?he:ve).find(m=>String(m.id)===s)||null,d=t==="cleaning-zones"?Ve(o,a,r):Ze(o,a,r),l=document.querySelector("#main-content");l&&(l.innerHTML=d)}}async function at(e,t){vt||await He();const s=e==="cleaning-zones",r=s?he:ve;if(t.parts.length===1)return s?fs({params:t.params,zones:he}):xs({params:t.params,wasteTypes:ve});if(t.parts.length===2&&t.parts[1]==="new")return s?Ve():Ze();const n=decodeURIComponent(t.parts[1]||""),a=r.find(i=>String(i.id)===n);return a?t.parts.length===3&&t.parts[2]==="edit"?s?Ve(a):Ze(a):s?bs({zone:a}):gs({wasteType:a}):'<div class="p-8 text-center text-muted">ไม่พบข้อมูลอ้างอิงที่ต้องการ</div>'}function vs(){const e=window.serviceHubUser||{},t=dt(e.name||e.username||"U"),s=e.roles||[],r=s[0]||"staff",n=ae[r]||{label:r,color:"border-gray-200 bg-gray-50 text-gray-700"};return`
    ${F("โปรไฟล์ส่วนบุคคล","ข้อมูลบัญชีของฉัน","จัดการชื่อที่แสดงและเปลี่ยนรหัสผ่านสำหรับเข้าใช้งานระบบ")}
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
                  ${b("check",12)} ใช้งานอยู่
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
                ${b("check",17)}
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
            ${b("lock",20)}
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
                ${b("eye",18)}
              </button>
            </div>
            <p id="profile-current-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div>
            <div class="mb-1 flex items-center justify-between">
              <label for="profile-new-pwd" class="text-sm font-semibold text-ink">รหัสผ่านใหม่ <span class="text-red-500">*</span></label>
              <button type="button" id="profile-gen-pwd" class="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                ${b("sparkles",13)} สุ่มรหัสผ่านปลอดภัย
              </button>
            </div>
            <div class="relative">
              <input id="profile-new-pwd" name="password" type="password" required minlength="15" autocomplete="new-password" class="field w-full pr-12" placeholder="รหัสผ่านใหม่ไม่น้อยกว่า 15 ตัวอักษร">
              <button type="button" data-action="toggle-pwd" data-target="profile-new-pwd" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="profile-new-pwd">
                ${b("eye",18)}
              </button>
            </div>
            <p id="profile-new-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div>
            <label for="profile-confirm-pwd" class="mb-1 block text-sm font-semibold text-ink">ยืนยันรหัสผ่านใหม่ <span class="text-red-500">*</span></label>
            <div class="relative">
              <input id="profile-confirm-pwd" name="password_confirmation" type="password" required minlength="15" autocomplete="new-password" class="field w-full pr-12" placeholder="กรอกรหัสผ่านใหม่อีกครั้ง">
              <button type="button" data-action="toggle-pwd" data-target="profile-confirm-pwd" class="absolute inset-y-0 right-0 flex min-h-11 min-w-11 items-center justify-center rounded-r-xl text-muted transition hover:text-ink focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="แสดงรหัสผ่าน" aria-pressed="false" aria-controls="profile-confirm-pwd">
                ${b("eye",18)}
              </button>
            </div>
            <p id="profile-confirm-pwd-error" class="mt-1 text-xs text-red-600 hidden" role="alert"></p>
          </div>

          <div class="rounded-xl bg-[#f4f8f5] p-3 text-xs text-[#486358] leading-relaxed">
            <span class="font-bold text-primary-dark">ข้อกำหนดความปลอดภัย:</span> เมื่อเปลี่ยนรหัสผ่านเรียบร้อย ระบบจะตัดเซสชันในอุปกรณ์อื่นทั้งหมดทันที แต่เครื่องนี้จะยังคงใช้งานต่อได้ตามปกติ
          </div>

          <div class="pt-2">
            <button type="submit" id="profile-pwd-submit" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark disabled:opacity-50">
              ${b("lock",17)}
              <span>บันทึกรหัสผ่านใหม่</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  `}function ws({toastFn:e=T,onNameUpdated:t}={}){const s=document.getElementById("profile-name-form"),r=document.getElementById("profile-password-form");document.querySelectorAll('[data-action="toggle-pwd"]').forEach(n=>{n.addEventListener("click",()=>{const a=n.dataset.target,i=document.getElementById(a);if(!i)return;const o=i.type==="password";i.type=o?"text":"password",n.innerHTML=b(o?"eyeOff":"eye",18),n.setAttribute("aria-label",o?"ซ่อนรหัสผ่าน":"แสดงรหัสผ่าน"),n.setAttribute("aria-pressed",String(o))})}),document.getElementById("profile-gen-pwd")?.addEventListener("click",()=>{const n="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!",a=new Uint8Array(16);crypto.getRandomValues(a);const i=Array.from(a).map(l=>n[l%n.length]).join(""),o=document.getElementById("profile-new-pwd"),d=document.getElementById("profile-confirm-pwd");if(o){o.value=i,o.type="text";const l=document.querySelector('[data-target="profile-new-pwd"]');l&&(l.innerHTML=b("eyeOff",18),l.setAttribute("aria-label","ซ่อนรหัสผ่าน"),l.setAttribute("aria-pressed","true"))}if(d){d.value=i,d.type="text";const l=document.querySelector('[data-target="profile-confirm-pwd"]');l&&(l.innerHTML=b("eyeOff",18),l.setAttribute("aria-label","ซ่อนรหัสผ่าน"),l.setAttribute("aria-pressed","true"))}}),s?.addEventListener("submit",async n=>{n.preventDefault();const a=document.getElementById("profile-name"),i=document.getElementById("profile-name-error"),o=document.getElementById("profile-name-submit"),d=a.value.trim();if(!d){i&&(i.textContent="กรุณาระบุชื่อ-นามสกุล",i.classList.remove("hidden")),a.focus();return}i&&i.classList.add("hidden"),o&&(o.disabled=!0,o.classList.add("opacity-50"));try{const l=window.serviceHubUrls?.apiProfile||"/api/profile",m=await P(l,{method:"PUT",body:{name:d}});window.serviceHubUser&&(window.serviceHubUser.name=m.data?.name||d),e("บันทึกข้อมูลชื่อเรียบร้อยแล้ว"),typeof t=="function"&&t(d)}catch(l){const m=l.errors?.name?.[0]||l.message||"ไม่สามารถบันทึกชื่อได้";i&&(i.textContent=m,i.classList.remove("hidden")),e(m,"error")}finally{o&&(o.disabled=!1,o.classList.remove("opacity-50"))}}),r?.addEventListener("submit",async n=>{n.preventDefault();const a=document.getElementById("profile-current-pwd"),i=document.getElementById("profile-new-pwd"),o=document.getElementById("profile-confirm-pwd"),d=document.getElementById("profile-current-pwd-error"),l=document.getElementById("profile-new-pwd-error"),m=document.getElementById("profile-confirm-pwd-error"),u=document.getElementById("profile-pwd-submit");d.classList.add("hidden"),l.classList.add("hidden"),m.classList.add("hidden");let p=!1;if(a.value||(d.textContent="กรุณาระบุรหัสผ่านปัจจุบัน",d.classList.remove("hidden"),p=!0),(!i.value||i.value.length<15)&&(l.textContent="รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 15 ตัวอักษร",l.classList.remove("hidden"),p=!0),i.value!==o.value&&(m.textContent="รหัสผ่านยืนยันไม่ตรงกับรหัสผ่านใหม่",m.classList.remove("hidden"),p=!0),i.value&&a.value&&i.value===a.value&&(l.textContent="รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านปัจจุบัน",l.classList.remove("hidden"),p=!0),!p){u&&(u.disabled=!0,u.classList.add("opacity-50"));try{const f=window.serviceHubUrls?.apiProfilePassword||"/api/profile/password";await P(f,{method:"PUT",body:{current_password:a.value,password:i.value,password_confirmation:o.value}}),a.value="",i.value="",o.value="",e("เปลี่ยนรหัสผ่านเรียบร้อยแล้ว เซสชันในอุปกรณ์อื่นถูกยกเลิกแล้ว")}catch(f){f.errors?.current_password&&(d.textContent=f.errors.current_password[0],d.classList.remove("hidden")),f.errors?.password&&(l.textContent=f.errors.password[0],l.classList.remove("hidden")),!f.errors?.current_password&&!f.errors?.password&&e(f.message||"เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน","error")}finally{u&&(u.disabled=!1,u.classList.remove("opacity-50"))}}})}function ys(e){return setTimeout(()=>{ws()},0),vs()}let Ce=[],Ae={current_page:1,last_page:1};function $s({params:e,auditRows:t=Ce,auditMeta:s=Ae}){if(!w("audit-logs.view"))return`
      <div class="panel-shadow mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-white p-10 text-center">
        <h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึง</h1>
        <p class="mt-2 text-sm text-muted">คุณไม่มีสิทธิ์ในการดูประวัติการแก้ไขข้อมูลของระบบ</p>
      </div>
    `;const r=e.get("q")||"",n=e.get("action")||"all",a=e.get("from")||"",i=e.get("to")||"",o=l=>{const m=new URLSearchParams;return r&&m.set("q",r),n!=="all"&&m.set("action",n),a&&m.set("from",a),i&&m.set("to",i),m.set("page",String(l)),`#/audit-logs?${m}`},d=!!(r||n!=="all"||a||i);return`
    ${F("การจัดการระบบ","ประวัติการแก้ไข","บันทึกการเพิ่ม แก้ไข และลบข้อมูลการปฏิบัติงานในระบบ")}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 mb-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองประวัติ</h2>
        ${De({from:a,to:i,formId:"audit-filter"})}
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
        ${d?'<a href="#/audit-logs" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>':""}
      </form>
      <div class="mt-4 divide-y divide-line">
        ${t.length?t.map(l=>`
          <div class="grid gap-2 py-3.5 text-sm sm:grid-cols-4 items-center">
            <strong class="font-bold text-primary-dark">${c(l.action)}</strong>
            <span class="text-muted font-mono text-xs">${c(l.subject_type||"")} #${c(l.subject_id||"")}</span>
            <span class="text-ink font-medium">${c(l.actor_username||"ระบบ")}</span>
            <time class="text-xs text-muted" datetime="${c(l.created_at)}">${te(l.created_at)}</time>
          </div>
        `).join(""):'<p class="py-8 text-center text-sm text-muted">ไม่มีประวัติการแก้ไขที่ตรงกับเงื่อนไข</p>'}
      </div>
      ${s.last_page>1?`
      <div class="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>หน้า ${s.current_page} / ${s.last_page}</span>
        <div class="flex gap-2">
          ${s.current_page>1?se("ก่อนหน้า",o(s.current_page-1)):""}
          ${s.current_page<s.last_page?se("ถัดไป",o(s.current_page+1)):""}
        </div>
      </div>`:""}
    </section>
  `}async function ks(e=new URLSearchParams){if(!w("audit-logs.view"))return{data:[],meta:{current_page:1,last_page:1}};try{const t=window.serviceHubUrls?.apiAudit||"/api/audit-logs",s=await P(`${t}?${e.toString()}`);return Ce=s.data??[],Ae=s.meta??{current_page:1,last_page:1},{data:Ce,meta:Ae}}catch(t){throw t}}async function Ss(e){try{await ks(e.params)}catch(t){console.error("Error fetching audit logs:",t)}return $s({params:e.params,auditRows:Ce,auditMeta:Ae})}function Ls({module:e,params:t,data:s,meta:r,loading:n,error:a,modules:i,groups:o,can:d,esc:l,number:m,thaiDate:u,moduleHref:p}){const f=new Date().toLocaleDateString("en-CA",{timeZone:"Asia/Bangkok"}).slice(0,7),v=t.has("from")||t.has("to")?"custom":"month",$=t.get("month")||f,S=new URLSearchParams;v==="custom"?(S.set("from",t.get("from")||""),S.set("to",t.get("to")||"")):t.has("month")&&S.set("month",$);const k=S.size?`?${S}`:"",A=h=>`#/reports/${encodeURIComponent(h)}${k}`,U=e?window.serviceHubUrls.apiReportDetailExport.replace("__MODULE__",encodeURIComponent(e.id))+k:window.serviceHubUrls.apiReportsExport+k,g=e?d(`${e.id}.export`):i.some(h=>d(`${h.id}.export`)),y=e?e.short:"ภาพรวมงานบริการ",R=r?.period,re=r?.comparison,Q=h=>h?`${u(h.from)} – ${u(h.to)}`:"—",we=e?s?.count:r?.total,D=e?s?.previous_count:r?.previous_total,me=D===0||D==null?null:Math.round((we-D)*1e3/D)/10,ye=(h,M)=>Object.entries(h?.quantities||{}).flatMap(([z,W])=>W.map(j=>{const H=M.fields.find(qt=>qt.name===z)?.label||z,ue=j.kind==="latest";return`<div class="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-line py-2 text-sm"><span class="text-muted">${l(H)}${ue?" (ค่าล่าสุด)":""}</span><strong class="text-ink">${j.total==null?"—":`${m(j.total)} ${l(j.unit||"")}`}</strong>${ue&&j.as_of?`<span class="w-full text-xs text-muted">ณ ${u(j.as_of)}</span>`:""}</div>`})).join(""),pe=e?s?.trend:r?.trend,Ie=Math.max(1,...(pe||[]).map(h=>h.count)),Pe=pe?.length?`<ol class="mt-4 max-h-[34rem] space-y-3 overflow-y-auto" aria-label="จำนวนรายการตามวันที่ดำเนินงาน">${pe.map(h=>`<li class="grid min-w-0 grid-cols-[6.5rem_minmax(0,1fr)_3rem] items-center gap-2 text-xs sm:grid-cols-[8rem_minmax(0,1fr)_4rem]"><time datetime="${l(h.date)}">${u(h.date)}</time><span class="h-3 rounded-full bg-[#e8f0eb]"><span class="block h-3 rounded-full bg-primary" style="width:${Math.max(3,h.count/Ie*100)}%"></span></span><strong class="text-right">${m(h.count)}</strong></li>`).join("")}</ol>`:'<p class="mt-4 text-sm text-muted">ไม่มีรายการในช่วงที่เลือก</p>',ze=`
    <section class="report-controls no-print panel-shadow rounded-2xl border border-line bg-white p-4 sm:p-5">
      <form id="report-filter" data-report-module="${l(e?.id||"")}" class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap gap-4">
            <label class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><input type="radio" name="period_mode" value="month" ${v==="month"?"checked":""}>รายเดือน</label>
            <label class="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><input type="radio" name="period_mode" value="custom" ${v==="custom"?"checked":""}>กำหนดช่วงวันที่</label>
          </div>
          <div data-report-custom ${v==="month"?"hidden":""}>
            ${De({from:t.get("from")||"",to:t.get("to")||"",formId:"report-filter"})}
          </div>
        </div>
        <div data-report-month ${v==="custom"?"hidden":""}>
          <label for="report-month" class="mb-1 block text-sm font-semibold">เดือนที่ดำเนินงาน</label>
          <input id="report-month" class="field max-w-sm" type="month" name="month" value="${l($)}" ${v==="custom"?"disabled":""} required>
        </div>
        <div data-report-custom class="grid gap-3 sm:grid-cols-2" ${v==="month"?"hidden":""}>
          <div>
            <label for="report-from" class="mb-1 block text-sm font-semibold">ตั้งแต่วันที่</label>
            <input id="report-from" class="field" type="date" name="from" value="${l(t.get("from")||"")}" ${v==="month"?"disabled":""} required>
          </div>
          <div>
            <label for="report-to" class="mb-1 block text-sm font-semibold">ถึงวันที่</label>
            <input id="report-to" class="field" type="date" name="to" value="${l(t.get("to")||"")}" ${v==="month"?"disabled":""} required>
          </div>
        </div>
        <p id="report-filter-error" class="text-sm text-red-700" role="alert"></p>
        <div class="flex flex-wrap gap-2">
          <button class="min-h-11 rounded-xl bg-primary px-5 font-bold text-white hover:bg-primary-dark" type="submit">แสดงรายงาน</button>
          <a href="#/reports${e?`/${encodeURIComponent(e.id)}`:""}" data-action="clear-filters" class="inline-flex min-h-11 items-center rounded-xl border border-line px-4 text-sm font-semibold text-muted hover:bg-[#f6faf7]">ล้างตัวกรอง</a>
          <button class="min-h-11 rounded-xl border border-line px-4 font-semibold" type="button" data-action="print-report">พิมพ์ / บันทึก PDF</button>
          ${g?`<a class="inline-flex min-h-11 items-center rounded-xl border border-line px-4 font-semibold text-primary" href="${l(U)}">ส่งออกสรุป CSV</a>`:""}
        </div>
      </form>
    </section>
  `;let x="";if(n)x='<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังโหลดรายงาน…</section>';else if(a)x=`<section class="panel-shadow rounded-2xl border border-red-200 bg-red-50 p-6" role="alert"><p class="font-semibold text-red-700">${l(a)}</p><button type="button" data-action="retry-report" class="no-print mt-3 min-h-11 rounded-xl border border-red-200 bg-white px-4 font-semibold">ลองอีกครั้ง</button></section>`;else if(!r||!s)x='<section class="panel-shadow rounded-2xl border border-line bg-white p-6 text-sm text-muted" role="status">กำลังเตรียมรายงาน…</section>';else{const h=`<section class="grid gap-3 sm:grid-cols-3"><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">รายการในช่วงที่เลือก</p><strong class="mt-2 block text-3xl text-ink">${m(we)}</strong><p class="mt-2 text-xs text-muted">${Q(R)}</p></div><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">ช่วงเปรียบเทียบ</p><strong class="mt-2 block text-3xl text-ink">${m(D)}</strong><p class="mt-2 text-xs text-muted">${Q(re)}</p></div><div class="panel-shadow rounded-2xl border border-line bg-white p-5"><p class="text-sm text-muted">การเปลี่ยนแปลงจำนวนรายการ</p><strong class="mt-2 block text-2xl text-ink">${me==null?"เปรียบเทียบเป็นร้อยละไม่ได้":`${me>0?"+":""}${m(me)}%`}</strong><p class="mt-2 text-xs text-muted">${D===0?"ช่วงเปรียบเทียบไม่มีรายการ":"เทียบกับช่วงก่อนหน้า"}</p></div></section>`,M=`<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">แนวโน้มตามวันที่ดำเนินงาน</h2><p class="mt-1 text-xs text-muted">ตัวเลขกำกับทุกวัน อ่านได้โดยไม่ต้องอาศัยสี</p>${Pe}</section>`;if(e){const z=s.breakdown?.length?`<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">แยกตาม${e.id==="road-washings"?"เขตรักษาความสะอาด":"ประเภทขยะมูลฝอย"}</h2><div class="mt-3 divide-y divide-line">${s.breakdown.map(j=>`<div class="grid gap-1 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_auto_auto]"><span>${l(j.name)}</span><span>${m(j.count)} รายการ</span><strong>${m(j.total)} ${l(j.unit)}</strong></div>`).join("")}</div></section>`:"",W=`<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">รายการล่าสุดตามวันที่ดำเนินงาน</h2>${s.recent?.length?`<ol class="mt-3 divide-y divide-line">${s.recent.map(j=>`<li class="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><div><strong>${l(j.title||"รายการงานบริการ")}</strong><p class="text-xs text-muted">${u(j.service_date)}</p></div><a class="no-print inline-flex min-h-11 items-center font-bold text-primary underline" href="${p(e.id)}/${encodeURIComponent(j.id)}">ดูรายการ</a></li>`).join("")}</ol>`:'<p class="mt-3 text-sm text-muted">ไม่มีรายการในช่วงที่เลือก</p>'}</section>`;x=`${h}<section class="panel-shadow rounded-2xl border border-line bg-white p-5"><h2 class="font-bold">ปริมาณงานตามตัวชี้วัด</h2><p class="mt-1 text-xs text-muted">แสดงแต่ละหน่วยแยกกัน; ค่าคงเหลือเป็นค่าล่าสุด</p><div class="mt-3">${ye(s,e)}</div></section>${z}${M}${W}<a class="no-print inline-flex min-h-11 items-center font-bold text-primary underline" href="${p(e.id)}">ไปหน้ารายการ${l(e.short)}</a>`}else{const W=`<section><h2 class="mb-3 text-lg font-bold">ภาพรวม 4 กลุ่มงาน</h2><div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">${o.filter(H=>i.some(ue=>ue.group===H.id&&d(`${ue.id}.view`))).map(H=>`<div class="panel-shadow rounded-2xl border border-line bg-white p-5"><h3 class="text-sm font-semibold">${l(H.label)}</h3><strong class="mt-2 block text-2xl">${m(r.groups?.[H.id]||0)}</strong><span class="text-xs text-muted">รายการในช่วงที่เลือก</span></div>`).join("")}</div></section>`,j=i.filter(H=>d(`${H.id}.view`)).map(H=>`<article class="panel-shadow rounded-2xl border border-line bg-white p-5"><h3 class="font-bold">${l(H.short)}</h3><p class="mt-2 text-sm"><strong class="text-xl">${m(s[H.id]?.count||0)}</strong> รายการ</p><div class="mt-3">${ye(s[H.id],H)||'<p class="text-sm text-muted">ไม่มีตัวชี้วัดปริมาณ</p>'}</div><a class="no-print mt-4 inline-flex min-h-11 items-center font-bold text-primary underline" href="${A(H.id)}">ดูรายงานหมวดนี้</a></article>`).join("");x=`${h}${W}<section><h2 class="mb-3 text-lg font-bold">รายงานครบ 9 หมวด</h2><div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">${j||'<p class="text-muted">ไม่มีหมวดที่ได้รับสิทธิ์ดู</p>'}</div></section>${M}`}}return`<div class="report-page space-y-5"><div class="flex flex-wrap items-start justify-between gap-3"><div><p class="text-xs font-bold tracking-wider text-primary">รายงานงานบริการ</p><h1 class="mt-1 text-2xl font-bold sm:text-3xl">${l(y)}</h1><p class="mt-2 text-sm text-muted">ข้อมูลจริงจากวันที่ดำเนินงาน ตามสิทธิ์ของคุณ</p></div>${e?`<a class="no-print inline-flex min-h-11 items-center font-semibold text-primary underline" href="#/reports${k}">กลับภาพรวม</a>`:""}</div>${ze}${x}</div>`}const V=document.querySelector("#app");let $t=null,Ge=!1,We="",Se=0,kt={},St=null,Lt=null,Ke=!1,Ye="",Le=0;async function _t(e=null){const t=++Se,{params:s}=G(),r=()=>e?e.isCurrent():G().parts[0]==="dashboard";Ge=!0,We="",r()&&it();try{const n=new URLSearchParams;s.has("from")&&n.set("from",s.get("from")),s.has("to")&&n.set("to",s.get("to"));const a=(window.serviceHubUrls?.apiDashboard||"/api/dashboard")+(n.size?`?${n}`:""),i=await P(a);if(t!==Se||!r())return;$t=i.data}catch(n){if(t!==Se||!r())return;We=n.message||"ไม่สามารถโหลดภาพรวมได้"}finally{t===Se&&r()&&(Ge=!1,it())}}function it(){if(G().parts[0]!=="dashboard")return;const{params:e}=G(),t=Yt({data:$t,loading:Ge,error:We,params:e,groups:ge,modules:Z,icon:b,esc:c,number:_,moduleHref:ee});V.innerHTML=O(t,null,[{label:"แดชบอร์ดฝ่ายบริการ",current:!0}],!0),ne()}async function Et(e,t,s=null){const r=e[1]?Z.find(o=>o.id===e[1]):null,n=++Le,a=G().hash,i=()=>s?s.isCurrent():G().hash===a;Ke=!0,Ye="",i()&&await ot(e,t);try{const o=window.serviceHubUrls?.apiReportDetail||"/api/reports/__MODULE__",d=window.serviceHubUrls?.apiReports||"/api/reports",l=(r?o.replace("__MODULE__",encodeURIComponent(r.id)):d)+(t.size?`?${t}`:""),m=await P(l);if(n!==Le||!i())return;Lt=m.meta,r?St=m.data:kt=m.data}catch(o){if(n!==Le||!i())return;Ye=o.fields?.to?.[0]||o.fields?.from?.[0]||o.fields?.month?.[0]||o.message||"โหลดรายงานไม่สำเร็จ"}finally{n===Le&&i()&&(Ke=!1,await ot(e,t))}}async function ot(e,t){if(G().parts[0]!=="reports"||G().parts[1]!==e[1])return;const s=e[1]?Z.find(a=>a.id===e[1]):null,r=Ls({module:s,params:t,data:s?St:kt,meta:Lt,loading:Ke,error:Ye,modules:Z,groups:ge,can:w,esc:c,number:_,thaiDate:te,moduleHref:ee}),n=s?[{label:"รายงาน",href:"#/reports"},{label:s.short,current:!0}]:[{label:"รายงาน",current:!0}];V.innerHTML=O(r,"reports",n),ne()}const _s={dashboard:async e=>{J("dashboard"),await _t(e)},users:async e=>{if(!Re()){q("#/dashboard"),T("คุณไม่มีสิทธิ์เข้าถึงหน้านี้","error");return}J("users"),V.innerHTML=O(is(),"users",[{label:"จัดการผู้ใช้งาน",current:!0}]),ne()},module:async e=>{const t=e.parts[1];if(t&&!w(`${t}.view`)){q("#/dashboard"),T("คุณไม่มีสิทธิ์เข้าถึงหมวดงานบริการนี้","error");return}J(t);const s=Z.find(a=>a.id===t),r=s?[{label:s.short,current:!0}]:[],n=await us(e);e.isCurrent()&&(V.innerHTML=O(n,t,r),ne())},"cleaning-zones":async e=>{if(!w("cleaning-zones.view")){q("#/dashboard");return}J("cleaning-zones");const t=await at("cleaning-zones",e);e.isCurrent()&&(V.innerHTML=O(t,"cleaning-zones",[{label:"เขตรักษาความสะอาด",current:!0}]),ne())},"waste-types":async e=>{if(!w("waste-types.view")){q("#/dashboard");return}J("waste-types");const t=await at("waste-types",e);e.isCurrent()&&(V.innerHTML=O(t,"waste-types",[{label:"ประเภทขยะมูลฝอย",current:!0}]),ne())},profile:async e=>{J("profile"),V.innerHTML=O(ys(),"profile",[{label:"โปรไฟล์ของฉัน",current:!0}])},"audit-logs":async e=>{if(!w("audit-logs.view")){q("#/dashboard");return}J("audit-logs");const t=await Ss(e);e.isCurrent()&&(V.innerHTML=O(t,"audit-logs",[{label:"ประวัติการแก้ไข",current:!0}]))},reports:async e=>{J("reports"),await Et(e.parts,e.params,e)},"*":()=>{q("#/dashboard")}};function Es(){document.addEventListener("keydown",t=>{if(t.key==="Escape"&&(Fe(),Be(!1)),t.key==="Tab"&&window.innerWidth<1024){const s=document.getElementById("sidebar");if(s&&s.classList.contains("translate-x-0")){const r=[...s.querySelectorAll("a[href], button:not([disabled])")].filter(n=>!n.closest("[hidden]"));r.length&&(t.shiftKey&&document.activeElement===r[0]?(t.preventDefault(),r[r.length-1]?.focus()):!t.shiftKey&&document.activeElement===r[r.length-1]&&(t.preventDefault(),r[0]?.focus()))}}}),document.addEventListener("click",async t=>{const s=t.target.closest("[data-action]");if(t.target.closest("#user-menu-container")||Fe(),t.target.closest(".relative")||document.querySelectorAll(".custom-select-menu").forEach(n=>n.classList.add("hidden")),!s)return;const r=s.dataset.action;if(r==="open-menu"){Be(!0),document.querySelector('#sidebar [data-action="close-menu"]')?.focus();return}if(r==="close-menu"){Be(!1),document.querySelector('[data-action="open-menu"]')?.focus();return}if(r==="toggle-user-menu"){Bt();return}if(r==="close-user-menu"){Fe();return}if(r==="toggle-sidebar-group"||r==="toggle-sidebar-subgroup"){Ft(s.dataset.group),s.setAttribute("aria-expanded",String(s.getAttribute("aria-expanded")!=="true"));const n=document.getElementById(s.getAttribute("aria-controls"));n&&(n.hidden=!n.hidden),s.querySelector("svg:last-child")?.classList.toggle("rotate-180");return}if(r==="delete-activity"){const n=s.dataset.module,a=s.dataset.id;await ms(n,a,{navigate:q,showToast:T,refreshData:ce});return}if(r==="delete-reference"){const n=s.dataset.type,a=s.dataset.id,i=s.dataset.name,o=Number(s.dataset.usage)||0;await hs(n,a,i,o,{navigate:q,showToast:T,refreshData:He});return}if(r==="print-report"){window.print();return}if(r==="retry-dashboard"){_t();return}if(r==="retry-report"){const{parts:n,params:a}=G();Et(n,a);return}if(r==="retry-route"){q(G().hash);return}if(r==="toggle-mobile-filters"){const n=s.getAttribute("aria-expanded")==="true",a=document.getElementById(s.getAttribute("aria-controls"));s.setAttribute("aria-expanded",String(!n)),s.querySelector("svg")?.classList.toggle("rotate-180",!n),a?.classList.toggle("hidden",n),a?.classList.toggle("flex",!n);return}if(r==="set-date-preset"){const n=s.dataset.from,a=s.dataset.to,i=s.dataset.form,o=i?document.getElementById(i):s.closest("form");if(o){if(o.elements.period_mode){const d=o.querySelector('input[name="period_mode"][value="custom"]');d&&(d.checked=!0,d.dispatchEvent(new Event("change",{bubbles:!0})))}o.elements.from&&(o.elements.from.value=n),o.elements.to&&(o.elements.to.value=a),o.requestSubmit?o.requestSubmit():o.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0}))}return}}),document.addEventListener("submit",async t=>{if(t.target.id==="record-form"){t.preventDefault(),ps(t.target);return}if(t.target.id==="zone-form"){t.preventDefault(),nt(t.target,"cleaning-zones");return}if(t.target.id==="wasteType-form"){t.preventDefault(),nt(t.target,"waste-types");return}if(t.target.id==="dashboard-filter"){t.preventDefault();const s=t.target,r=s.elements.from.value,n=s.elements.to.value,a=s.parentElement.querySelector("#dashboard-filter-error");if(!r||!n||r>n){a&&(a.textContent=!r||!n?"กรุณาระบุวันที่เริ่มต้นและสิ้นสุด":"วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น",a.classList.remove("hidden"));return}a&&a.classList.add("hidden"),q(`/dashboard?${new URLSearchParams({from:r,to:n})}`);return}if(t.target.id==="report-filter"){t.preventDefault();const s=t.target,r=s.elements.period_mode?.value,n=new URLSearchParams;if(r==="month"){if(!s.elements.month?.value)return;n.set("month",s.elements.month.value)}else{const i=s.elements.from?.value,o=s.elements.to?.value,d=s.querySelector("#report-filter-error");if(!i||!o||i>o){d&&(d.textContent=!i||!o?"กรุณาระบุวันที่เริ่มต้นและสิ้นสุด":"วันสิ้นสุดต้องไม่ก่อนวันเริ่มต้น");return}d&&(d.textContent=""),n.set("from",i),n.set("to",o)}const a=`#/reports${s.dataset.reportModule?`/${s.dataset.reportModule}`:""}?${n}`;q(a.replace("#",""));return}if(t.target.id==="filter-form"){t.preventDefault();const s=t.target,r=new URLSearchParams;new FormData(s).forEach((n,a)=>{n&&!(a==="sort"&&n==="newest")&&r.set(a,n)}),q(`/module/${s.dataset.module}${r.size?`?${r}`:""}`);return}if(t.target.id==="zone-filter"){t.preventDefault();const s=new FormData(t.target),r=new URLSearchParams;String(s.get("q")||"").trim()&&r.set("q",String(s.get("q")).trim()),s.get("status")&&s.get("status")!=="all"&&r.set("status",s.get("status")),s.get("sort")==="name"&&r.set("sort","name"),q(`/cleaning-zones${r.size?`?${r}`:""}`);return}if(t.target.id==="wasteType-filter"){t.preventDefault();const s=new FormData(t.target),r=new URLSearchParams;String(s.get("q")||"").trim()&&r.set("q",String(s.get("q")).trim()),s.get("status")&&s.get("status")!=="all"&&r.set("status",s.get("status")),s.get("sort")==="name"&&r.set("sort","name"),q(`/waste-types${r.size?`?${r}`:""}`);return}if(t.target.id==="audit-filter"){t.preventDefault();const s=new FormData(t.target),r=new URLSearchParams;String(s.get("q")||"").trim()&&r.set("q",String(s.get("q")).trim()),s.get("action")&&s.get("action")!=="all"&&r.set("action",s.get("action")),s.get("from")&&r.set("from",s.get("from")),s.get("to")&&r.set("to",s.get("to")),q(`/audit-logs${r.size?`?${r}`:""}`);return}});const e=Pt(t=>{t&&t.isConnected&&(t.requestSubmit?t.requestSubmit():t.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))},300);document.addEventListener("input",t=>{if(t.target.dataset.action==="live-filter"&&t.target.type!=="date"){const s=t.target.form;s&&e(s)}}),document.addEventListener("change",t=>{if(t.target.dataset.action==="live-filter"){const s=t.target.form;s&&(s.requestSubmit?s.requestSubmit():s.dispatchEvent(new Event("submit",{bubbles:!0,cancelable:!0})))}if(t.target.name==="period_mode"&&t.target.closest("#report-filter")){const s=t.target.form,r=t.target.value==="custom",n=s.querySelector("[data-report-month]"),a=s.querySelector("[data-report-custom]");n&&(n.hidden=r),a&&(a.hidden=!r),s.elements.month&&(s.elements.month.disabled=r),s.elements.from&&(s.elements.from.disabled=!r),s.elements.to&&(s.elements.to.disabled=!r)}})}function qs(){ct(),Zt(),Es(),At(_s,{onDenied:e=>{if(!e.isCurrent())return;const t='<section class="panel-shadow mx-auto max-w-lg rounded-2xl border border-line bg-white p-6 text-center" role="alert"><h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึงหน้านี้</h1><p class="mt-2 text-sm text-muted">บัญชีนี้ยังไม่ได้รับสิทธิ์ดูข้อมูลในหมวดที่เลือก</p><a href="#/dashboard" class="mt-5 inline-flex min-h-11 items-center font-bold text-primary underline">กลับแดชบอร์ด</a></section>';V.innerHTML=O(t,null,[{label:"ไม่มีสิทธิ์เข้าถึง",current:!0}])},onError:(e,t)=>{if(!t.isCurrent())return;const s='<section class="panel-shadow mx-auto max-w-lg rounded-2xl border border-red-200 bg-white p-6 text-center" role="alert"><h1 class="text-xl font-bold">โหลดหน้าไม่สำเร็จ</h1><p class="mt-2 text-sm text-muted">กรุณาลองใหม่อีกครั้ง หากยังพบปัญหาให้ติดต่อผู้ดูแลระบบ</p><button type="button" data-action="retry-route" class="mt-5 min-h-11 rounded-xl border border-line px-4 font-bold text-primary">ลองอีกครั้ง</button></section>';V.innerHTML=O(s,null,[{label:"โหลดหน้าไม่สำเร็จ",current:!0}])},afterRender:()=>{ne()}})}qs();
