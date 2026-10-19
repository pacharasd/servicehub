import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { drainTypeListPage, drainTypeFormPage, drainTypeDetailPage } from '../../src/views/drainWorkTypes.js';
import { formPage, listPage, detailPage, validateForm } from '../../src/views/activities.js';
import { modules, groups } from '../../src/data.js';

const module = modules.find(row => row.id === 'drain-cleanings');
const group = groups.find(row => row.id === module.group);
const refs = {'drain-work-types': [{id:1,code:'001',name:'ลอกท่อ'.repeat(30)+'<script>',is_active:true},{id:2,code:'002',name:'ประเภทระงับ',is_active:false}]};
const record = {id:'3',service_date:'2026-10-19',location:'ถนน',drain_work_type_id:1,distance_km:100,sediment_quantity:3.8};
function mount(html) {
  const dom = new JSDOM(html,{url:'http://localhost/Servicehub'});
  globalThis.window = dom.window; globalThis.document = dom.window.document; globalThis.FormData = dom.window.FormData;
  window.serviceHubUser = {roles:['super-admin']};
  return dom.window.document;
}

test('drain form requires a type, preserves old inactive selection and rejects new inactive selection',()=>{
  mount('');
  let doc=mount(formPage({module,group,record,references:refs}));
  assert.equal(doc.querySelector('[name="drain_work_type_id"]').required,true);
  assert.equal(doc.querySelector('[value="2"]'),null);
  assert.match(doc.body.textContent,/หน่วย: เมตร/);
  let result=validateForm(doc.querySelector('form'),module,refs);
  assert.deepEqual(result.errors,{});
  doc=mount(formPage({module,group,record:{...record,drain_work_type_id:2},references:refs}));
  assert.deepEqual(validateForm(doc.querySelector('form'),module,refs).errors,{});
  doc.querySelector('form').dataset.originalDrainType='';
  assert.ok(validateForm(doc.querySelector('form'),module,refs).errors.drain_work_type_id);
  doc=mount(formPage({module,group,references:{'drain-work-types':[]}}));
  assert.match(doc.body.textContent,/ยังไม่มีประเภทงาน/);
  assert.ok(doc.querySelector('a[href="#/drain-work-types/new"]'));
  assert.ok(validateForm(doc.querySelector('form'),module,refs).errors.drain_work_type_id);
  doc=mount(formPage({module,group,record,values:{...record,location:'ค่าที่กรอก'},errors:{location:'ผิดพลาด'},references:refs}));
  assert.equal(doc.querySelector('[name="drain_work_type_id"]').value,'1');
  assert.equal(doc.querySelector('[name="location"]').value,'ค่าที่กรอก');
});

test('drain list preserves all columns, units and legacy types without adding a filter',()=>{
  mount('');
  const html=listPage({module,group,params:new URLSearchParams(),records:[record],references:refs});
  const doc=mount(html);
  for(const label of ['ประเภทงาน','ระยะทาง','ปริมาณตะกอน']) assert.match(doc.querySelector('thead').textContent,new RegExp(label));
  assert.match(doc.body.textContent,/100 เมตร/);
  assert.match(doc.body.textContent,/3.8 ลูกบาศก์เมตร/);
  assert.equal(doc.querySelector('select[name="drain_work_type_id"]'),null);
  assert.match(detailPage({module,group,record:{...record,drain_work_type_id:null},references:refs}),/ยังไม่ระบุประเภทงาน/);
  assert.equal(doc.querySelector('script'),null);
});

test('drain reference pages support pagination, search, status, escaping and permission controls',()=>{
  mount('');
  const rows=Array.from({length:12},(_,i)=>({id:i+1,code:String(i+1).padStart(3,'0'),name:'ประเภท '+i,is_active:true,usage_count:0}));
  let doc=mount(drainTypeListPage(new URLSearchParams(),rows));
  assert.equal(doc.querySelectorAll('a[href^="#/drain-work-types/"]').length,11);
  assert.ok(doc.querySelector('.max-w-\\[400px\\]'));
  doc=mount(drainTypeListPage(new URLSearchParams({q:'012'}),rows));
  assert.match(doc.body.textContent,/พบ 1 รายการ/);
  assert.match(drainTypeListPage(new URLSearchParams({q:'ไม่พบ'}),rows),/ไม่พบประเภทงาน/);
  doc=mount(drainTypeFormPage({...rows[0],is_active:false},{name:'ชื่อซ้ำ'},{code:'001',name:'<script>',is_active:false}));
  assert.equal(doc.querySelector('[name="is_active"]').checked,false);
  assert.equal(doc.querySelector('script'),null);
  window.serviceHubUser={roles:['viewer'],permissions:['drain-work-types.view']};
  assert.doesNotMatch(drainTypeDetailPage(rows[0]),/data-action="delete-reference"|\/edit/);
});
