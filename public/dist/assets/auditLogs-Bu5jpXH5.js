import{a as m,p as g,o as f,d as b}from"./view-users-DB_OcK_G.js";import{r as v,e as o,t as h}from"./view-analytics-BMG2sQy1.js";let c=[],u={current_page:1,last_page:1};function $({params:e,auditRows:a=c,auditMeta:t=u}){if(!m("audit-logs.view"))return`
      <div class="panel-shadow mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-white p-10 text-center">
        <h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึง</h1>
        <p class="mt-2 text-sm text-muted">คุณไม่มีสิทธิ์ในการดูประวัติการแก้ไขข้อมูลของระบบ</p>
      </div>
    `;const n=e.get("q")||"",i=e.get("action")||"all",d=e.get("from")||"",r=e.get("to")||"",p=s=>{const l=new URLSearchParams;return n&&l.set("q",n),i!=="all"&&l.set("action",i),d&&l.set("from",d),r&&l.set("to",r),l.set("page",String(s)),`#/audit-logs?${l}`},x=!!(n||i!=="all"||d||r);return`
    ${g("การจัดการระบบ","ประวัติการแก้ไข","บันทึกการเพิ่ม แก้ไข และลบข้อมูลการปฏิบัติงานในระบบ")}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5 mb-5">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">ตัวกรองประวัติ</h2>
        ${v({from:d,to:r,formId:"audit-filter"})}
      </div>
      <form id="audit-filter" class="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1.2fr)_150px_140px_140px_auto_auto] sm:items-end">
        <div>
          <label for="audit-q" class="mb-1.5 block text-xs font-bold text-[#52665d]">ค้นหา</label>
          <input id="audit-q" class="field" name="q" value="${o(n)}" placeholder="พิมพ์ค้นหาคำ หรือชื่อผู้ใช้..." data-action="live-filter" autocomplete="off">
        </div>
        <div>
          <label for="audit-action" class="mb-1.5 block text-xs font-bold text-[#52665d]">การกระทำ</label>
          <select id="audit-action" name="action" class="field master-native-select" data-action="live-filter">
            <option value="all" ${i==="all"?"selected":""}>ทุกการกระทำ</option>
            <option value="created" ${i==="created"?"selected":""}>สร้างข้อมูล (create)</option>
            <option value="updated" ${i==="updated"?"selected":""}>แก้ไขข้อมูล (update)</option>
            <option value="deleted" ${i==="deleted"?"selected":""}>ลบข้อมูล (delete)</option>
            <option value="auth" ${i==="auth"?"selected":""}>เข้าสู่ระบบ (auth)</option>
          </select>
        </div>
        <div>
          <label for="audit-from" class="mb-1.5 block text-xs font-bold text-[#52665d]">ตั้งแต่วันที่</label>
          <input id="audit-from" class="field" type="date" name="from" value="${o(d)}" data-action="live-filter">
        </div>
        <div>
          <label for="audit-to" class="mb-1.5 block text-xs font-bold text-[#52665d]">ถึงวันที่</label>
          <input id="audit-to" class="field" type="date" name="to" value="${o(r)}" data-action="live-filter">
        </div>
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
        ${x?'<a href="#/audit-logs" data-action="clear-filters" class="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-xs font-semibold text-muted hover:bg-canvas">ล้างตัวกรอง</a>':""}
      </form>
      <div class="mt-4 divide-y divide-line">
        ${a.length?a.map(s=>`
          <div class="grid gap-2 py-3.5 text-sm sm:grid-cols-4 items-center">
            <strong class="font-bold text-primary-dark">${o(s.action)}</strong>
            <span class="text-muted font-mono text-xs">${o(s.subject_type||"")} #${o(s.subject_id||"")}</span>
            <span class="text-ink font-medium">${o(s.actor_username||"ระบบ")}</span>
            <time class="text-xs text-muted" datetime="${o(s.created_at)}">${h(s.created_at)}</time>
          </div>
        `).join(""):'<p class="py-8 text-center text-sm text-muted">ไม่มีประวัติการแก้ไขที่ตรงกับเงื่อนไข</p>'}
      </div>
      ${t.last_page>1?`
      <div class="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>หน้า ${t.current_page} / ${t.last_page}</span>
        <div class="flex gap-2">
          ${t.current_page>1?f("ก่อนหน้า",p(t.current_page-1)):""}
          ${t.current_page<t.last_page?f("ถัดไป",p(t.current_page+1)):""}
        </div>
      </div>`:""}
    </section>
  `}async function _(e=new URLSearchParams){if(!m("audit-logs.view"))return{data:[],meta:{current_page:1,last_page:1}};try{const a=window.serviceHubUrls?.apiAudit||"/api/audit-logs",t=await b(`${a}?${e.toString()}`);return c=t.data??[],u=t.meta??{current_page:1,last_page:1},{data:c,meta:u}}catch(a){throw a}}async function k(e){try{await _(e.params)}catch(a){console.error("Error fetching audit logs:",a)}return $({params:e.params,auditRows:c,auditMeta:u})}export{$ as auditPage,_ as fetchAuditLogs,k as renderAuditLogsView};
