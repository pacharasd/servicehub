# ADR 0007: สถาปัตยกรรมโมดูลาร์หน้าบ้านแบบไร้เฟรมเวิร์ก (Modular Vanilla Frontend Architecture)

- **สถานะ:** ยอมรับ (Accepted)
- **วันที่:** 2026-10-01
- **บริบท:** ระบบ ServiceHub เติบโตจนมี 9 หมวดงานบริการ 2 ชุดข้อมูลอ้างอิง และระบบบริหารผู้ใช้งาน ทำให้โค้ดฝั่งไคลเอนต์ใน `src/main.js` รวมกันเกือบ 1,800 บรรทัด การบำรุงรักษาและการทดสอบในอนาคตจำเป็นต้องปรับสู่มาตรฐานสากลระดับ Enterprise

## การตัดสินใจ (Decision)
1. **คงแนวทาง Vanilla JS + Vite (Zero Runtime Framework):** ไม่เพิ่มน้ำหนักของ External Framework (เช่น React หรือ Vue) เพื่อรักษาความเร็วในการโหลด (Zero Overhead) และประสิทธิภาพ Core Web Vitals สูงสุด
2. **แยกโมดูลตามหน้าที่และโดเมน (Feature/Domain-driven ES Modules):**
   - `src/router.js`: บริหารจัดการ Hash-based routing, Route Parameters, Navigation Guards และการเปลี่ยน Document Title
   - `src/api.js`: ตัวจัดการเรียก API กลาง (Centralized Fetch Client), CSRF Token injection, และ Error Interceptor
   - `src/views/activities.js`: หน้ารายการและแบบฟอร์มของงานบริการทั้ง 9 หมวด
   - `src/views/users.js`: หน้าสมุดรายนามผู้ใช้งาน (User Directory)
   - `src/views/references.js`: หน้าข้อมูลอ้างอิงเขตรักษาความสะอาดและประเภทขยะ
   - `src/components/drawer.js`: โมดอลสไลด์จัดการข้อมูลและโฟกัสแทรป (Focus Trap)
3. **การเข้ากันได้แบบไร้รอยต่อ:** ฟังก์ชันและหน้าจอเดิมยังคงทำงานร่วมกันได้อย่างสมบูรณ์

## ผลลัพธ์ (Consequences)
- **ข้อดี:**
  - โค้ดแต่ละส่วนมีขนาดกะทัดรัด แยกส่วนการพัฒนาและการดีบักชัดเจน (Separation of Concerns)
  - รองรับการทำ Code-splitting ผ่าน Rollup ใน Vite เพื่อลด Initial Bundle Size
  - เพิ่มคะแนน Lighthouse ทั้งด้าน Performance และ Maintainability
- **ข้อพิจารณา:**
  - การสื่อสารระหว่างโมดูลใช้ State Object และ Dispatch Event แบบ Vanilla JS
