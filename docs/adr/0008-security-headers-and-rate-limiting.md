# ADR 0008: การบังคับใช้ Security Headers และการป้องกัน Brute-Force (Security Headers & Rate Limiting)

- **สถานะ:** ยอมรับ (Accepted)
- **วันที่:** 2026-10-01
- **บริบท:** ระบบจัดเก็บข้อมูลงานบริการและสถิติของเทศบาลจำเป็นต้องมีเกราะป้องกันตามมาตรฐาน OWASP Top 10 เพื่อป้องกันภัยคุกคามประเภท Cross-Site Scripting (XSS), Clickjacking, MIME Sniffing และการโจมตีแบบเดารหัสผ่าน (Brute-Force Attack)

## การตัดสินใจ (Decision)
1. **ติดตั้ง Security Middleware กลาง (`App\Http\Middleware\SecurityHeaders.php`):**
   - `Content-Security-Policy (CSP)`: กำหนดนโยบายให้โหลดสคริปต์และสไตล์เฉพาะจาก `'self'`, Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`), และ data URIs สำหรับ inline SVGs
   - `X-Frame-Options: SAMEORIGIN`: ป้องกันการถูกนำไปฝังใน iframe ภายนอก (Clickjacking Defense)
   - `X-Content-Type-Options: nosniff`: ป้องกันเบราว์เซอร์จากการเดา MIME type
   - `Referrer-Policy: strict-origin-when-cross-origin`: คุ้มครองข้อมูลอ้างอิงของเส้นทาง URL
   - `Permissions-Policy: geolocation=(), camera=(), microphone=()`: ปิดการเข้าถึงฮาร์ดแวร์ที่ไม่เกี่ยวข้อง
2. **การจำกัดอัตราการส่งคำขอ (Rate Limiting & Throttling):**
   - เส้นทางยืนยันตัวตน (`POST /login`): จำกัดไม่เกิน 5 ครั้งต่อนาทีต่อ IP/บัญชี ป้องกันการสุ่มรหัสผ่าน
   - เส้นทาง API ทั้งหมด: จำกัด 60 ครั้งต่อนาทีต่อผู้ใช้ เพื่อรักษาเสถียรภาพของเซิร์ฟเวอร์

## ผลลัพธ์ (Consequences)
- ระบบผ่านการตรวจประเมินความมั่นคงปลอดภัยตามมาตรฐานสากล
- ป้องกันการเข้าถึงโดยมิชอบและการโจมตีด้วยเครื่องมืออัตโนมัติได้อย่างมีประสิทธิภาพ
