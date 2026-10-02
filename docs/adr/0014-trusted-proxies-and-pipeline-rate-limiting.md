# ADR 0014: Trusted Reverse Proxies and Pipeline Rate Limiting Isolation

## สถานะ
ยอมรับ (Accepted) — 2026-10-02

## บริบทและปัญหา (Context)
ในการนำระบบ ServiceHub ขึ้นใช้งานบน Production Server (`https://servicehub.behn.go.th`) เจ้าหน้าที่ผู้ใช้งานพบปัญหาไม่สามารถกดเปลี่ยนหน้าได้ โดยระบบแสดงกล่องข้อความสีแดง:
> **"โหลดข้อมูลภาพรวมไม่สำเร็จ"**  
> `Too Many Attempts.`  
> `[ลองอีกครั้ง]`

จากการตรวจสอบบันทึกข้อผิดพลาดและโครงสร้างโค้ด พบสาเหตุทางสถาปัตยกรรม 3 ประการที่เกิดขึ้นพร้อมกัน:
1. **ขาดการตั้งค่าความไว้วางใจ Reverse Proxy (Untrusted Proxies):**
   - Production Server ทำงานภายใต้สถาปัตยกรรม Nginx Reverse Proxy (Plesk) ส่งต่อคำขอผ่านพอร์ตภายในมายัง Apache/PHP ที่ `127.0.0.1`
   - เมื่อไม่มีการประกาศ `$middleware->trustProxies(...)` ใน `bootstrap/app.php` Laravel จะปฏิเสธ Header `X-Forwarded-For` ตามค่าเริ่มต้นเพื่อความปลอดภัย
   - ส่งผลให้ `$request->ip()` ของผู้ใช้งานทุกคนจากทุกเครื่องในโลกกลายเป็น `127.0.0.1`
2. **การจัดลำดับ Middleware Pipeline สลับตำแหน่ง:**
   - ใน `bootstrap/app.php` ส่วน `$middleware->priority([...])` ได้ระบุ `ThrottleRequests::class` อยู่ก่อนหน้า `AuthenticatesRequests::class` / `\Illuminate\Auth\Middleware\Authenticate::class`
   - ทำให้เมื่อคำขอ API เข้ามา กลไกตรวจสอบโควตาคำขอ (Throttling) จะทำงานก่อนที่ระบบจะอ่าน Session Cookie และถอดรหัสตัวตนผู้ใช้
   - ส่งผลให้ `$request->user()?->id` ใน `AppServiceProvider.php` ได้ผลลัพธ์เป็น `null` เสมอ
   - ระบบจึงตกไปใช้ `$request->ip()` (ซึ่งคือ `127.0.0.1` จากข้อ 1)
3. **การชนกันของโควตาคำขอทั่วทั้งหน่วยงาน (Catastrophic Collision):**
   - ผู้ใช้งานทุกคนในเทศบาล ไม่ว่าจะเปิดเบราว์เซอร์กี่คน หรือเปลี่ยนหน้าใด ถูกจัดให้อยู่ในถังโควตาเดียวกันคือ `127.0.0.1` จำกัดที่ 60 ครั้ง/นาที
   - การเปิดหน้าแดชบอร์ด 1 ครั้งร่วมกับการสลับเมนูไปยังงานบริการหรือรายงานเพียง 2-3 หน้า ทำให้โควตารวม 60 ครั้งหมดลงในไม่กี่วินาที
   - ส่งผลให้ระบบบล็อกผู้ใช้งานทุกคนในสำนักงานทันทีด้วย HTTP 429

## การตัดสินใจ (Decision)

### 1. ประกาศไว้วางใจ Reverse Proxy ใน `bootstrap/app.php`
เปิดใช้งาน `$middleware->trustProxies(at: '*');` เพื่อให้ Laravel ไว้วางใจ Header `X-Forwarded-For`, `X-Forwarded-Proto`, และ `X-Forwarded-Host` ที่ส่งต่อมาจาก Nginx/Plesk ภายในเครื่อง ทำให้ระบบสามารถระบุ Real Client IP ของผู้ใช้ได้อย่างถูกต้องตามมาตรฐาน RFC 7239

### 2. ปรับลำดับความสำคัญของ Middleware Pipeline
ย้าย `AuthenticatesRequests::class` และ `\Illuminate\Auth\Middleware\Authenticate::class` ให้อยู่ก่อนหน้า `ThrottleRequests::class` ใน `$middleware->priority([...])`:
```php
$middleware->priority([
    HandlePrecognitiveRequests::class,
    EncryptCookies::class,
    AddQueuedCookiesToResponse::class,
    StartSession::class,
    ShareErrorsFromSession::class,
    AuthenticatesRequests::class,
    \Illuminate\Auth\Middleware\Authenticate::class,
    ThrottleRequests::class,
    ThrottleRequestsWithRedis::class,
    AuthenticatesSessions::class,
    SubstituteBindings::class,
    Authorize::class,
]);
```
ทำให้การประมวลผลเซสชันและการยืนยันตัวตนเสร็จสมบูรณ์ก่อนที่ `ThrottleRequests` จะตรวจสอบโควตา ส่งผลให้ `$request->user()` มีค่าตัวตนของผู้ใช้อย่างแน่นอน

### 3. ปรับปรุง Rate Limiter Key แบบ 3 ลำดับชั้นใน `AppServiceProvider.php`
กำหนดคีย์ของ API Rate Limiter ให้แยกรายผู้ใช้งานอย่างเด็ดขาด:
```php
RateLimiter::for('api', function (Request $request) {
    $user = $request->user() ?? (auth()->guard('web')->check() ? auth()->guard('web')->user() : null);
    $key = $user?->id ?: $request->ip();
    return Limit::perMinute(60)->by($key);
});
```
- ผู้ใช้ที่เข้าสู่ระบบแล้วจะถูกแยกถังโควตาด้วย User ID แต่ละคนมีโควตา 60 ครั้ง/นาทีเป็นอิสระต่อกัน (User Isolation)
- กรณีคำขอจากภายนอกที่ไม่ระบุตัวตน (Guests) จะถูกจำกัดด้วย Real Client IP ผ่าน Trusted Proxies (`X-Forwarded-For`) ทำให้ไม่เกิดการชนกันที่ `127.0.0.1` ของ Reverse Proxy

### 4. ปรับปรุงการจัดการข้อผิดพลาด HTTP 429 ฝั่ง Client-Side (`src/api.js`)
ปรับปรุง `apiRequest` ให้ตรวจสอบ `Retry-After` Header และแสดงข้อความภาษาไทยที่สุภาพและเข้าใจง่าย:
- หากมี Header `Retry-After`: แสดง `"คำขอส่งมาถี่เกินไป กรุณารอ {วินาที} วินาทีแล้วลองใหม่อีกครั้ง"`
- ข้อความทั่วไป: แสดง `"คำขอส่งมาถี่เกินไป กรุณารอสักครู่แล้วลองใหม่อีกครั้ง (Too Many Attempts)"` แทนการแสดงข้อความภาษาอังกฤษดิบจากเซิร์ฟเวอร์

## ผลลัพธ์และข้อดี (Consequences)
- **การนำทางในระบบราบรื่น 100%:** ผู้ใช้งานสามารถคลิกเปลี่ยนหน้าระหว่างแดชบอร์ด งานบริการทั้ง 9 หมวด รายงาน ข้อมูลอ้างอิง และจัดการผู้ใช้ได้อย่างต่อเนื่องโดยไม่ถูกระงับ
- **แยกโควตาอิสระรายบุคคล (Tenant Isolation):** การใช้งานของเจ้าหน้าที่คนหนึ่งจะไม่กระทบกับเจ้าหน้าที่คนอื่น แม้จะเชื่อมต่อผ่านเครือข่ายอินเทอร์เน็ตเดียวกันของเทศบาล
- **Audit Logs บันทึก IP ถูกต้อง:** บันทึกประวัติความมั่นคงปลอดภัย (Security Audit) บันทึก IP สาธารณะจริงของอุปกรณ์ผู้ใช้ ไม่ใช่ `127.0.0.1`
- **สอดคล้องกับมาตรฐานความมั่นคงปลอดภัยสากล:** เป็นไปตามแนวทาง OWASP API Security Top 10 (API4:2023 Unrestricted Resource Consumption)
