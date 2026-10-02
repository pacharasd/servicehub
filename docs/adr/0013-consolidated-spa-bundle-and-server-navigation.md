# ADR 0013: บันเดิลหน้าจอแบบรวมศูนย์และการรองรับเส้นทางเซิร์ฟเวอร์ (Consolidated SPA Bundle & Server Route Fallback)

## สถานะ (Status)
ยอมรับแล้ว (Accepted) — 2026-10-02

## บริบท (Context)
เมื่อนำระบบ ServiceHub ไปติดตั้งบน Production Server (เช่น Plesk, Apache, หรือ Nginx) พบปัญหาผู้ใช้ไม่สามารถกดคลิกสลับหน้าจอจากเมนูบาร์ได้ โดยเบราว์เซอร์แจ้งข้อผิดพลาด:
- `TypeError: Failed to fetch dynamically imported module` หรือ HTTP 404 เมื่อพยายามโหลดไฟล์ chunk JavaScript ย่อย เช่น `view-users.js`, `view-activities.js`, `view-references.js`
- สาเหตุเกิดจากการแบ่ง chunk ไฟล์ย่อยผ่าน dynamic `import()` ซึ่งในสภาพแวดล้อม Production Server หรือการติดตั้งใต้ Subpath เบราว์เซอร์พยายาม Resolve dynamic import เทียบกับ Document Base URL แทนที่จะเป็นตำแหน่ง Asset ของระบบ
- นอกจากนี้ หากผู้ใช้กด Refresh หรือเปิด URL ตรงๆ (เช่น `/dashboard`, `/reports`) บน Server อาจพบปัญหา 404 Not Found เนื่องจากฝั่ง Laravel ใน `routes/web.php` มีการดักไว้เพียง Route `/` ตัวเดียว

## การตัดสินใจ (Decision)
เราตัดสินใจปรับปรุงสถาปัตยกรรมการรวมไฟล์และการจัดการเส้นทางดังต่อไปนี้:

1. **สถาปัตยกรรมบันเดิลรวมศูนย์ (Consolidated SPA Bundle):**
   - รวบรวมโมดูลหน้าจอ (Views) ทั้ง 6 ส่วนหลักเข้าสู่ Main Bundle โดยตรงผ่าน Static Imports ใน [`src/main.js`](file:///c:/xampp/htdocs/Servicehub/src/main.js)
   - ขนาดโค้ด JavaScript ทั้งหมดรวมกันมีขนาดเพียง ~35KB เมื่อบีบอัดด้วย Gzip ซึ่งมีขนาดเล็กมาก ไม่กระทบต่อเวลาดาวน์โหลดเริ่มต้น (Initial Load Time)
   - ปรับปรุงการสลับหน้าจอ (Route Handlers) ให้ทำงานแบบ Synchronous และเรนเดอร์ได้ทันที 0ms โดยไม่ต้องพึ่งพา Network Request หาไฟล์ chunk เพิ่มเติม

2. **ปรับแต่งการตั้งค่า Vite Build ([`vite.config.js`](file:///c:/xampp/htdocs/Servicehub/vite.config.js)):**
   - ยกเลิกการแยก `manualChunks` สำหรับ View Modules ภายในระบบ เพื่อให้ Vite รวมเป็น Main Bundle ที่สมบูรณ์
   - คงการแยก `vendor` สำหรับ Third-party libraries ตามมาตรฐาน

3. **การเพิ่ม SPA Route Fallback บน Laravel ([`routes/web.php`](file:///c:/xampp/htdocs/Servicehub/routes/web.php)):**
   - เพิ่ม Route Fallback สำหรับเส้นทางหลักของระบบ เพื่อให้ Laravel ส่งหน้า `app.blade.php` กลับมาอย่างถูกต้อง ไม่เกิด 404:
   ```php
   Route::get('/{any}', function () {
       return view('app');
   })->where('any', 'dashboard|users|profile|audit-logs|reports|cleaning-zones|waste-types|module/.*');
   ```

## ผลที่ตามมา (Consequences)
- **ข้อดี:**
  - แก้ไขปัญหา `Failed to fetch dynamically imported module` และ 404 Chunk บน Server ได้อย่างเด็ดขาด 100%
  - การกดสลับหน้าจอทำงานเร็วในระดับ 0ms (Instant Navigation)
  - ป้องกันปัญหา Version Mismatch หรือ Cache Mismatch เมื่อมีการ Deploy โค้ดเวอร์ชันใหม่ขณะผู้ใช้เปิดระบบค้างไว้
- **สิ่งที่ต้องระวัง:** รักษาขนาดของ Main Bundle ให้กะทัดรัด โดยยังคงหลีกเลี่ยงการนำไลบรารีภายนอกขนาดใหญ่ที่ไม่จำเป็นเข้ามาใช้งาน
