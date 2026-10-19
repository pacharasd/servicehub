import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { modules, groups } from '../../src/data.js';
import { formPage, listPage, detailPage, validateForm } from '../../src/views/activities.js';
import { dashboardContent } from '../../src/dashboard.js';
import { reportBody } from '../../src/reports.js';
import { esc, number, thaiDate } from '../../src/utils/format.js';
import { icon } from '../../src/utils/icons.js';

const module = modules.find(item => item.id === 'septic-pumpings');
const group = groups.find(item => item.id === module.group);
const record = {id:'1',service_date:'2026-10-01',end_date:'2026-11-02',location:'สถานที่'.repeat(50),service_users_count:1250,volume:3.8,fee_amount:100};
function mount(html='') {
  const dom=new JSDOM(html,{url:'http://localhost/Servicehub'});
  globalThis.window=dom.window;globalThis.document=dom.window.document;globalThis.FormData=dom.window.FormData;
  window.serviceHubUser={roles:['super-admin']};
  window.serviceHubUrls={apiReportsExport:'/api/reports/export',apiReportDetailExport:'/api/reports/__MODULE__/export'};
  return dom.window.document;
}

test('septic form dates and users validate and retain values with errors',()=>{
  mount();
  let doc=mount(formPage({module,group,record}));
  assert.deepEqual([...doc.querySelectorAll('input[name]')].map(input=>input.name),['service_date','end_date','service_users_count','volume','fee_amount']);
  assert.equal(doc.querySelector('[name="service_users_count"]').min,'1');
  assert.equal(doc.querySelector('[name="service_users_count"]').step,'1');
  const form=doc.querySelector('form');
  assert.deepEqual(validateForm(form,module).errors,{});
  for(const value of ['',0,-1,1.5,4294967296]) {
    form.elements.service_users_count.value=value;
    assert.ok(validateForm(form,module).errors.service_users_count);
  }
  form.elements.service_users_count.value='1';
  for(const value of ['','2026-02-30','2026-09-30']) {
    form.elements.end_date.value=value;
    assert.ok(validateForm(form,module).errors.end_date);
  }
  form.elements.end_date.value='2026-10-01';
  assert.deepEqual(validateForm(form,module).errors,{});
  doc=mount(formPage({module,group,record,values:{...record,service_users_count:8},errors:{end_date:'วันที่ผิด'}}));
  assert.equal(doc.querySelector('[name="service_users_count"]').value,'8');
  assert.equal(doc.querySelector('[name="end_date"]').value,'2026-11-02');
  assert.equal(doc.querySelector('[name="end_date"]').getAttribute('aria-invalid'),'true');
});

test('septic table retains every column, numeric values and unknown legacy users',()=>{
  mount();
  let doc=mount(listPage({module,group,params:new URLSearchParams(),records:[record]}));
  assert.deepEqual([...doc.querySelectorAll('th')].slice(0,5).map(th=>th.textContent.trim()),['วันเริ่ม','วันที่สิ้นสุด','จำนวนผู้ใช้บริการ','ปริมาตรสิ่งปฏิกูล','ค่าธรรมเนียม']);
  assert.doesNotMatch(doc.body.textContent,/สถานที่/);
  assert.match(doc.body.textContent,/1,250 คน/);
  assert.match(doc.body.textContent,/3.8 ลูกบาศก์เมตร/);
  assert.match(doc.body.textContent,/100 บาท/);
  assert.ok(doc.querySelector('.data-table-scroll.overflow-x-auto'));
  assert.match(detailPage({module,group,record:{...record,service_users_count:null}}),/ไม่ระบุ/);
  doc=mount(formPage({module,group}));
  assert.equal(doc.querySelector('[name="end_date"]').value,'');
  assert.match(doc.querySelector('[name="service_date"]').value,/^\d{4}-\d{2}-\d{2}$/);
});

test('dashboard and reports expose coverage without turning unknown counts into zero',()=>{
  mount();
  const item={group:'sanitation',count:2,previous_count:0,metrics:{volume:3.8,service_users_count:null},service_users_coverage:{recorded:0,missing:2},quantities:{service_users_count:[{total:null,unit:'คน',kind:'sum',note:'ยังไม่ระบุจำนวน 2 รายการ'}]}};
  const data={module_summary:{'septic-pumpings':item},period:{from:'2026-10-01',to:'2026-10-31',total:2},total:2,today:0,group_summary:{sanitation:2},recent:[]};
  const renderDashboard=()=>dashboardContent({data,params:new URLSearchParams(),groups,modules,icon,esc,number,moduleHref:id=>'#/module/'+id});
  let html=renderDashboard();
  assert.match(html,/ยังไม่มีข้อมูลจำนวนผู้ใช้บริการ/);
  assert.match(html,/ยังไม่ระบุจำนวน 2 รายการ/);
  assert.doesNotMatch(html,/0 คน/);
  item.metrics.service_users_count=1250;item.service_users_coverage={recorded:1,missing:1};
  assert.match(renderDashboard(),/1,250 คน/);
  const meta={period:data.period,comparison:{from:'2026-09-01',to:'2026-09-30'},total:2,previous_total:0};
  const opts={params:new URLSearchParams('month=2026-10'),meta,loading:false,error:'',modules,groups,can:()=>true,esc,number,thaiDate,moduleHref:id=>'#/module/'+id};
  html=reportBody({...opts,module,data:item});
  assert.match(html,/ยังไม่มีข้อมูลจำนวนผู้ใช้บริการ/);
  assert.match(html,/ยังไม่ระบุจำนวน 2 รายการ/);
  assert.match(reportBody({...opts,module:null,data:{'septic-pumpings':item}}),/ยังไม่ระบุจำนวน 2 รายการ/);
  delete data.module_summary['septic-pumpings'];
  assert.doesNotMatch(renderDashboard(),/ผู้ใช้บริการงานสูบสิ่งปฏิกูล|ยังไม่ระบุจำนวน/);
});
