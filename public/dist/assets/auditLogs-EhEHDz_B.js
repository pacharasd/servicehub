import{a as l,p as u,f as s,t as p,o,d as g}from"./view-users-U7I23hSc.js";let i=[],n={current_page:1,last_page:1};function m({params:r,auditRows:e=i,auditMeta:t=n}){if(!l("audit-logs.view"))return`
      <div class="panel-shadow mx-auto mt-10 max-w-lg rounded-2xl border border-line bg-white p-10 text-center">
        <h1 class="text-xl font-bold">ไม่มีสิทธิ์เข้าถึง</h1>
        <p class="mt-2 text-sm text-muted">คุณไม่มีสิทธิ์ในการดูประวัติการแก้ไขข้อมูลของระบบ</p>
      </div>
    `;const d=a=>{const c=r.get("q")||"";return`#/audit-logs?${new URLSearchParams({q:c,page:String(a)})}`};return`
    ${u("การจัดการระบบ","ประวัติการแก้ไข","บันทึกการเพิ่ม แก้ไข และลบข้อมูลการปฏิบัติงานในระบบ")}
    <section class="panel-shadow rounded-2xl border border-line bg-white p-5">
      <form id="audit-filter" class="flex gap-2">
        <label class="sr-only" for="audit-q">ค้นหา</label>
        <input id="audit-q" class="field min-w-0 flex-1" name="q" value="${s(r.get("q")||"")}" placeholder="ค้นหาการกระทำ หมวด หรือชื่อผู้ใช้">
        <button type="submit" class="min-h-11 rounded-xl bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">ค้นหา</button>
      </form>
      <div class="mt-4 divide-y divide-line">
        ${e.length?e.map(a=>`
          <div class="grid gap-2 py-3.5 text-sm sm:grid-cols-4 items-center">
            <strong class="font-bold text-primary-dark">${s(a.action)}</strong>
            <span class="text-muted font-mono text-xs">${s(a.subject_type||"")} #${s(a.subject_id||"")}</span>
            <span class="text-ink font-medium">${s(a.actor_username||"ระบบ")}</span>
            <time class="text-xs text-muted" datetime="${s(a.created_at)}">${p(a.created_at)}</time>
          </div>
        `).join(""):'<p class="py-8 text-center text-sm text-muted">ไม่มีประวัติการแก้ไขที่ตรงกับเงื่อนไข</p>'}
      </div>
      ${t.last_page>1?`
      <div class="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-muted">
        <span>หน้า ${t.current_page} / ${t.last_page}</span>
        <div class="flex gap-2">
          ${t.current_page>1?o("ก่อนหน้า",d(t.current_page-1)):""}
          ${t.current_page<t.last_page?o("ถัดไป",d(t.current_page+1)):""}
        </div>
      </div>`:""}
    </section>
  `}async function x(r=new URLSearchParams){if(!l("audit-logs.view"))return{data:[],meta:{current_page:1,last_page:1}};try{const e=window.serviceHubUrls?.apiAudit||"/api/audit-logs",t=await g(`${e}?${r.toString()}`);return i=t.data??[],n=t.meta??{current_page:1,last_page:1},{data:i,meta:n}}catch(e){throw e}}async function b(r){try{await x(r.params)}catch(e){console.error("Error fetching audit logs:",e)}return m({params:r.params,auditRows:i,auditMeta:n})}export{m as auditPage,x as fetchAuditLogs,b as renderAuditLogsView};
