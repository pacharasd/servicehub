import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { modules } from '../../src/data.js';
import { formPage, detailPage, listPage, syncHazardousWasteInput, validateForm } from '../../src/views/activities.js';

test('hazardous waste optional input follows type code, retains errors and clears on switch', () => {
  const dom = new JSDOM('<main></main>');
  globalThis.window = dom.window;
  window.serviceHubUser = { roles: ['super-admin'], permissions: [] };
  const originalFormData = globalThis.FormData;
  globalThis.FormData = dom.window.FormData;
  const module = modules.find(item => item.id === 'waste-collections');
  const references = { 'waste-types': [
    { id: 91, code: 'WASTE-004', name: 'ชื่อเปลี่ยนได้', is_active: true },
    { id: 92, code: '2.2.2', name: 'มูลฝอยอันตรายและซากอิเล็กทรอนิกส์', is_active: true },
  ] };
  const record = { id: '7', service_date: '2026-10-12', end_date: '2026-10-12', source: 'จุดเก็บ', waste_type_id: '91', weight: 3.8, hazardous_waste_name: 'ถ่านไฟฉาย' };
  try {
    const main = dom.window.document.querySelector('main');
    main.innerHTML = formPage({ module, record, references, errors: { hazardous_waste_name: 'ข้อผิดพลาด' } });
    const form = main.querySelector('form');
    const input = form.elements.hazardous_waste_name;
    const wrapper = form.querySelector('[data-hazardous-waste-field]');
    const grid = form.querySelector('.grid');
    assert.equal(grid.children.length, 6);
    assert.equal(grid.children[4].querySelector('input').name, 'weight');
    assert.equal(grid.children[5], wrapper);
    assert.equal(wrapper.hidden, false);
    assert.equal(input.value, 'ถ่านไฟฉาย');
    assert.equal(input.required, false);
    assert.equal(input.maxLength, 255);
    assert.equal(input.getAttribute('aria-invalid'), 'true');
    assert.equal(validateForm(form, module, references).data.hazardous_waste_name, 'ถ่านไฟฉาย');
    input.value = 'ก'.repeat(256);
    assert.ok(validateForm(form, module, references).errors.hazardous_waste_name);
    form.elements.waste_type_id.value = '92';
    syncHazardousWasteInput(form);
    assert.equal(wrapper.hidden, true);
    assert.equal(input.disabled, true);
    assert.equal(input.value, '');
    assert.equal(validateForm(form, module, references).data.hazardous_waste_name, null);
    form.elements.waste_type_id.value = '91';
    syncHazardousWasteInput(form);
    assert.equal(wrapper.hidden, false);
    assert.deepEqual(validateForm(form, module, references).errors, {});
    assert.match(detailPage({ module, record, references }), /ถ่านไฟฉาย/);
    assert.doesNotMatch(detailPage({ module, record: { ...record, waste_type_id: '92' }, references }), /ชื่อขยะอันตราย/);
    assert.doesNotMatch(listPage({ module, references, params: new URLSearchParams(), records: [record] }), /ชื่อขยะอันตราย/);
    assert.match(main.innerHTML, /grid-cols-1/);
  } finally {
    globalThis.FormData = originalFormData;
    dom.window.close();
  }
});
