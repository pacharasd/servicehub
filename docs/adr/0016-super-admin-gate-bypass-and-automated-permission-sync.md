# ADR 0016: Super-Admin Gate Bypass and Automated RBAC Permission Synchronization

## สถานะ
ยอมรับ (Accepted) — 2026-10-05

## บริบทและปัญหา (Context)
เมื่อผู้ใช้นำระบบขึ้นสู่ Production Server (`https://servicehub.behn.go.th`) และเข้าใช้งานด้วยบัญชีผู้ดูแลระบบ (`super-admin`):
- ในเครื่อง Localhost สามารถเข้าถึงและจัดการข้อมูลงานบริการได้ตามปกติ
- แต่บน Production Server เมื่อคลิกเข้าสู่หน้างานบริการ (เช่น `#/module/road-washings`) หน้าจอแสดงข้อผิดพลาด:
  > **"ไม่มีสิทธิ์เข้าถึงข้อมูล: บัญชีนี้ยังไม่ได้รับสิทธิ์ดูข้อมูลในส่วนที่เลือก [ลองอีกครั้ง]"**

### การวินิจฉัยเชิงลึก (Root Cause Diagnosis)
1. **ความไม่สอดคล้องระหว่างหน้าบ้านและหลังบ้าน (Frontend vs Backend Discrepancy):**
   - ฝั่ง Frontend (`src/api.js` ฟังก์ชัน `can(permission)`) ได้รับการเขียนดักไว้ว่า:
     ```javascript
     if (roles.includes('super-admin')) return true;
     ```
     ทำให้ฝั่งหน้าบ้านอนุมัติให้แสดงเมนูและเข้าถึงหน้างานบริการได้เสมอ
   - ฝั่ง Backend (`AppServiceProvider.php` / Laravel Gate):
     ไม่ได้ลงทะเบียน `Gate::before` สำหรับ `super-admin` ตามมาตรฐานของ Spatie Laravel Permission
     ส่งผลให้ Laravel ต้องไปค้นหาแถวสิทธิ์ในตาราง `permissions` และ `role_has_permissions` ของฐานข้อมูลจริงทุกครั้งที่ตรวจสอบ `$user->can(...)`
2. **ฐานข้อมูลบนเซิร์ฟเวอร์ยังไม่มีแถวสิทธิ์ (Unseeded Permissions on Server):**
   - กระบวนการ Deploy บนเซิร์ฟเวอร์จริง (เช่น ผ่าน Plesk Git Deployment) มีการรันคำสั่ง `php artisan migrate` ตามปกติ
   - ทว่าสิทธิ์ทั้ง 55 สิทธิ์ และบทบาทผู้ใช้งานเดิมถูกประกาศไว้เฉพาะใน Seeder (`ReferenceDataSeeder`) ซึ่งไม่ได้ถูกรันอัตโนมัติใน Production Migration
   - เมื่อตาราง `permissions` และ `role_has_permissions` บนเซิร์ฟเวอร์ว่างเปล่า Laravel จึงปฏิเสธคำขอ API ทั้งหมดด้วย `403 Forbidden`
3. **การแคชสิทธิ์ของ Spatie (Permission Cache Invalidation):**
   - เมื่อมีการเพิ่มหรือแก้ไขบทบาท หากไม่ได้สั่งรีเซ็ตแคช (`permission:cache-reset`) Laravel จะยังคงใช้แคชสิทธิ์เดิมที่ว่างเปล่า

## การตัดสินใจ (Decision)

### 1. ลงทะเบียน `Gate::before` สำหรับ `super-admin` ใน `AppServiceProvider.php`
- ตามข้อแนะนำมาตรฐานสากลของ Spatie Permission (Super-Admin Pattern):
  ```php
  Gate::before(function ($user, string $ability) {
      if ($ability === 'delete') {
          return null; // สงวนสิทธิ์การลบบัญชีผู้ใช้ถาวรให้เป็นไปตาม UserPolicy (Hard Deletion Protection)
      }

      return $user->hasRole('super-admin') ? true : null;
  });
  ```
- ช่วยให้ผู้ใช้ที่มีบทบาท `super-admin` มีสิทธิ์ครอบคลุมทุกโมดูลและการทำงานโดยสมบูรณ์ ตรงกับพฤติกรรมในฝั่งหน้าบ้าน

### 2. บันทึกการสร้างสิทธิ์และบทบาทลงใน Database Migration
- สร้าง Migration: `database/migrations/2026_10_05_000001_ensure_system_roles_and_permissions.php`
- สั่งรัน `(new ReferenceDataSeeder)->run()` โดยอัตโนมัติเมื่อมีการสั่ง `php artisan migrate`
- รับประกันว่าทุกสภาพแวดล้อม (Local, Staging, Production) จะมีข้อมูลสิทธิ์ 55 สิทธิ์, 5 บทบาทมาตรฐาน (`super-admin`, `admin`, `staff`, `viewer`, `auditor`), และข้อมูลแคตตาล็อกตั้งต้น (`cleaning_zones`, `waste_types`) ครบถ้วนเสมอ

### 3. เพิ่ม Artisan Command สำหรับการตรวจสอบและซิงก์สิทธิ์ (`servicehub:permissions:sync`)
- เพิ่มคำสั่ง CLI:
  ```bash
  php artisan servicehub:permissions:sync
  ```
- เพื่อให้ผู้ดูแลระบบสามารถสั่งตรวจเช็กและซิงก์สิทธิ์ พร้อมล้างแคช Spatie ได้ตลอดเวลาผ่าน Command Line

## ผลลัพธ์ (Consequences)
- **แก้ปัญหา 403 Forbidden ทันที:** ผู้ใช้บทบาท `super-admin` บน Server สามารถเข้าถึงหน้ากิจกรรมทั้งหมดได้ทันที
- **Self-Healing ในตัว:** การ Deploy ผ่าน Plesk ครั้งต่อไปเพียงรัน `php artisan migrate` ระบบจะติดตั้งสิทธิ์และแคตตาล็อกที่จำเป็นโดยอัตโนมัติโดยไม่ต้องพึ่งพาการรัน Seeder แบบ Manual
- **รักษาความปลอดภัยตามมาตรฐาน:** บัญชีผู้ใช้ยังคงได้รับการปกป้องจากการถูก Hard Delete ผ่าน `UserPolicy`
- **ผ่านการทดสอบ 100%:** ทดสอบผ่าน PHPUnit (177/177 tests), Frontend Tests (8/8), Pint Clean
