import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { pageHeading, primaryButton, outlinedButton } from '../../src/utils/layout.js';
import { formPage, listPage } from '../../src/views/activities.js';
import { modules, groups } from '../../src/data.js';

test('LINE Seed uses original weights, OFL license, measured fallback metrics and only Regular preloads', async()=>{
 const css=await readFile(new URL('../../src/typography.css',import.meta.url),'utf8');
 const base=await readFile(new URL('../../src/style.css',import.meta.url),'utf8');
 const metadata=JSON.parse(await readFile(new URL('../../src/assets/fonts/line-seed/metadata.json',import.meta.url),'utf8'));
 assert.deepEqual(metadata.map(font=>font.weight).sort(),[400,700]);
 assert.ok(metadata.every(font=>font.unitsPerEm===1000&&font.ascent===1144&&font.descent===-440));
 assert.match(css,/font-synthesis: none/);assert.match(css,/font-display: swap/);
 assert.doesNotMatch(base,/font-weight: (500|600)/);
 assert.match(base,/ascent-override: 114\.4%/);
 for(const filename of ['LINESeedSansTH_W_Rg.woff2','LINESeedSansTH_W_Bd.woff2']) {
   const data=await readFile(new URL('../../src/assets/fonts/line-seed/'+filename,import.meta.url));
   assert.equal(data.toString('ascii',0,4),'wOF2');
 }
 const license=await readFile(new URL('../../src/assets/fonts/line-seed/OFL.txt',import.meta.url),'utf8');
 assert.match(license,/SIL OPEN FONT LICENSE/);assert.match(license,/LY Corporation/);
 for(const page of ['app.blade.php','auth/layout.blade.php']) {
   const view=await readFile(new URL('../../resources/views/'+page,import.meta.url),'utf8');
   assert.equal((view.match(/as="font"/g)||[]).length,1);
   assert.match(view,/LINESeedSansTH_W_Rg\.woff2/);
   assert.doesNotMatch(view,/fonts\.google|preload[^\n]*_Bd\.woff2/);
 }
});

test('shared typography roles preserve mixed content, control dimensions and semantic form/table markup', async()=>{
 const dom=new JSDOM('');globalThis.window=dom.window;
 window.serviceHubUser={roles:['super-admin']};
 const title='ข้อมูลบริการ ServiceHub 2569 — ทดสอบสระและวรรณยุกต์ ผู้ปฏิบัติงาน ฎู ญู';
 const heading=new JSDOM(pageHeading('ข้อมูลจริง',title,'รายละเอียดภาษาไทยและ English')).window.document;
 assert.equal(heading.querySelector('h1').textContent,title);
 assert.ok(heading.querySelector('h1').classList.contains('type-page-title'));
 assert.match(primaryButton('บันทึกข้อมูล','#/dashboard'),/type-primary-action/);
 assert.match(outlinedButton('ยกเลิก','#/dashboard'),/type-body/);
 const module=modules.find(m=>m.id==='waste-collections');
 const record={id:1,service_date:'2026-10-15',end_date:'2026-10-15',source:title,waste_type_id:1,weight:1234567.89};
 const references={'waste-types':[{id:1,code:'001',name:'ประเภทขยะ Waste',is_active:true}]};
 const form=new JSDOM(formPage({module,record,references,errors:{source:'กรุณาตรวจข้อมูล'}})).window.document;
 assert.equal(form.querySelector('[name="source"]').value,title);
 assert.equal(form.querySelector('[name="source"]').getAttribute('aria-invalid'),'true');
 const list=new JSDOM(listPage({module,group:groups.find(g=>g.id===module.group),params:new URLSearchParams(),references,records:[record,{...record,id:2,weight:0}],meta:{total:2,current_page:1,last_page:1}})).window.document;
 assert.match(list.body.textContent,/1,234,567.89/);assert.match(list.body.textContent,/0 กิโลกรัม/);
 assert.ok(list.querySelector('.data-table-scroll'));
 const css=await readFile(new URL('../../src/typography.css',import.meta.url),'utf8');
 assert.match(css,/--type-body-size: \.875rem/);assert.match(css,/--type-kpi-size: 2rem/);
 assert.match(css,/min-height: 44px/);assert.match(css,/letter-spacing: normal/);
 assert.doesNotMatch(css,/break-all|overflow:\s*hidden/);
 for(const width of [320,768,1024,1440]) {
   dom.window.innerWidth=width;
   assert.equal(new JSDOM(pageHeading('กลุ่ม',title,'รายละเอียด')).window.document.querySelector('h1').textContent,title);
 }
 dom.window.close();
});
