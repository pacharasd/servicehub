import test from 'node:test';
import assert from 'node:assert/strict';
import { parseThaiDate, formatThaiDate, validIso, moveCalendarDate } from '../../src/components/thaiDatePicker.js';

test('Thai Buddhist date and month round-trip without changing the stored date', () => {
  for (const [thai, iso] of [['09/10/2569', '2026-10-09'], ['29/02/2567', '2024-02-29'], ['31/12/2569', '2026-12-31']]) {
    assert.equal(parseThaiDate(thai), iso);
    assert.equal(formatThaiDate(iso), thai);
  }
  assert.equal(parseThaiDate('10/2569', 'month'), '2026-10');
  assert.equal(formatThaiDate('2026-10', 'month'), '10/2569');
  assert.equal(parseThaiDate(''), '');
});

test('invalid and incomplete dates are rejected rather than normalized', () => {
  for (const text of ['29/02/2569', '31/04/2569', '00/10/2569', '09/13/2569', '09/10/25', '2026-10-09', '09/10/0543']) assert.equal(parseThaiDate(text), null, text);
  assert.equal(parseThaiDate('13/2569', 'month'), null);
  assert.equal(formatThaiDate('2026-02-29'), '');
  assert.equal(validIso('2026-10-09'), true);
});

test('keyboard navigation crosses month/year boundaries and clamps leap days', () => {
  assert.equal(moveCalendarDate('2026-12-31', 'ArrowRight'), '2027-01-01');
  assert.equal(moveCalendarDate('2026-10-09', 'ArrowUp'), '2026-10-02');
  assert.equal(moveCalendarDate('2026-10-09', 'Home'), '2026-10-04');
  assert.equal(moveCalendarDate('2026-10-09', 'End'), '2026-10-10');
  assert.equal(moveCalendarDate('2026-01-31', 'PageDown'), '2026-02-28');
  assert.equal(moveCalendarDate('2024-02-29', 'PageDown', true), '2025-02-28');
});
