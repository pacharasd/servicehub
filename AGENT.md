# AGENT.md — เว็บไซต์ฐานข้อมูลส่วนบริการ

> เอกสารนี้เป็น **Source of Truth** สำหรับ AI Coding Agent และนักพัฒนาที่ทำงานกับโครงการ “เว็บไซต์ฐานข้อมูลส่วนบริการ”
> ทุกการสร้าง/แก้ไขโค้ดต้องยึดข้อกำหนดในไฟล์นี้ก่อนเสมอ หากข้อกำหนดส่วนใดขัดกับ Requirement ที่ได้รับอนุมัติล่าสุด ให้ใช้ Requirement ล่าสุดและปรับเอกสารนี้ตามไปด้วย

---

## 1. เป้าหมายของระบบ

สร้าง Web Application สำหรับบันทึก ค้นหา แก้ไข ติดตาม สรุป และบริหารข้อมูล “ส่วนบริการ” ตามแบบข้อมูลจากไฟล์ต้นทาง โดยระบบต้อง:

- ใช้งานง่ายบน Desktop / Tablet / Mobile
- Front-end ใช้ **Tailwind CSS เป็นหลัก**
- Back-end ใช้ **Laravel เป็นหลัก**
- มีระบบ Authentication: Login / Logout / Forgot Password / Reset Password
- มีระบบ Authorization แบบ **Role-Based Access Control (RBAC)**
- มีระบบ CRUD ทุกโมดูลตามสิทธิ์
- มี Search / Filter / Sort / Pagination
- มี Dashboard สรุปข้อมูลที่สำคัญ
- รองรับ Export ข้อมูลที่ผู้ใช้มีสิทธิ์เข้าถึง
- มี Audit Log สำหรับกิจกรรมสำคัญ
- มี Validation ทั้งฝั่ง Server และ UX ฝั่ง Client
- ออกแบบ Security ตามแนวทาง OWASP
- ออกแบบ Accessibility เป้าหมาย WCAG 2.2 ระดับ AA
- รองรับภาษาไทยและ UTF-8 อย่างถูกต้อง
- ออกแบบ Database ให้มี Referential Integrity และไม่เก็บข้อมูลซ้ำโดยไม่จำเป็น
- มี Automated Tests สำหรับ Authentication, Authorization และ CRUD ที่สำคัญ

---

## 2. Technology Baseline

ใช้เทคโนโลยีต่อไปนี้เป็นค่าเริ่มต้นของโครงการ:

### Backend

- PHP 8.3+
- Laravel 13.x หรือ Stable version ที่โครงการล็อกไว้ใน `composer.lock`
- Eloquent ORM
- Form Request Validation
- Laravel Policies / Gates
- Laravel Events / Listeners เมื่อเหมาะสม
- Laravel Queues สำหรับงานที่ใช้เวลานาน เช่น Export ปริมาณมาก
- Laravel Scheduler สำหรับงานบำรุงรักษาที่ต้องทำตามเวลา

### Authentication

ใช้ Laravel Authentication/Fortify หรือ Official Laravel Starter Kit เป็นฐาน

ต้องรองรับอย่างน้อย:

- Login
- Logout
- Forgot password
- Reset password
- Password confirmation สำหรับ action สำคัญ
- Email verification หากระบบเปิดให้ผู้ใช้สมัครเอง
- Login throttling / rate limiting
- Session invalidation เมื่อเปลี่ยนรหัสผ่านหรือพบความเสี่ยง
- 2FA สำหรับ `super-admin` และ `admin` ควรเปิดใช้งานเมื่อระบบขึ้น Production

> หากระบบเป็นระบบภายในองค์กรและผู้ดูแลเป็นผู้สร้างบัญชีให้ ห้ามเปิด Public Registration โดยไม่มี Requirement ที่อนุมัติ

### Role / Permission

ใช้:

- Laravel Gate / Policy เป็น enforcement layer หลัก
- แนะนำ `spatie/laravel-permission` สำหรับจัดการ Role และ Permission ในฐานข้อมูล

ห้ามตรวจสิทธิ์เฉพาะการซ่อนปุ่มใน UI เพราะผู้ใช้สามารถเรียก URL/API โดยตรงได้

### Frontend

- Blade Templates เป็นค่าเริ่มต้น
- Tailwind CSS v4 เป็น CSS framework หลัก
- Vite เป็น asset bundler
- Alpine.js ใช้เฉพาะ interaction ขนาดเล็ก
- Livewire ใช้ได้เมื่อช่วยลด JavaScript และทำ CRUD ได้ชัดเจนขึ้น
- หลีกเลี่ยงการเพิ่ม React/Vue/Svelte หาก Requirement ไม่จำเป็น

### Database

ค่าเริ่มต้น:

- MySQL 8+ / MariaDB เวอร์ชันที่ Laravel รุ่นปัจจุบันรองรับ
- Engine: InnoDB
- Character Set: `utf8mb4`
- Collation: Unicode-compatible collation
- Foreign Keys ต้องเปิดใช้งาน

ห้ามแก้ schema Production ด้วย SQL manual โดยไม่มี Migration

---

## 3. Coding Standards

### PHP / Laravel

- ใช้ PSR-12
- ใช้ Laravel Pint สำหรับ formatting
- ใช้ชื่อ Class, Method, Variable เป็นภาษาอังกฤษ
- ใช้ชื่อ Permission และ Route เป็นภาษาอังกฤษ
- UI Label สามารถเป็นภาษาไทย
- Controller ต้องบาง (Thin Controller)
- Business logic ที่ซับซ้อนให้แยกเป็น Action / Service class
- Validation ต้องอยู่ใน Form Request เมื่อเป็น CRUD หลัก
- Authorization ใช้ Policy / Gate
- ใช้ Resource / DTO เมื่อรูปแบบข้อมูลซับซ้อน
- ใช้ Database Transaction สำหรับ operation ที่ต้องสำเร็จหรือ rollback พร้อมกันหลายขั้นตอน

### Naming

ใช้ convention:

- Tables: `snake_case`, plural
- Models: `PascalCase`, singular
- Controllers: `{Resource}Controller`
- Form Requests: `Store{Resource}Request`, `Update{Resource}Request`
- Policies: `{Resource}Policy`
- Permissions: `{module}.{action}`

ตัวอย่าง:

```text
waste-collections.view
waste-collections.create
waste-collections.update
waste-collections.delete
waste-collections.export
```

---

## 4. Architecture

ใช้แนวทาง Laravel Monolith แบบ Modular เป็นค่าเริ่มต้น

```text
app/
├── Actions/
├── Enums/
├── Http/
│   ├── Controllers/
│   ├── Middleware/
│   └── Requests/
├── Models/
├── Policies/
├── Services/
├── Support/
└── View/

resources/
├── css/
├── js/
└── views/
    ├── components/
    ├── layouts/
    ├── dashboard/
    ├── service-cleaning/
    ├── waste-collections/
    ├── sanitation/
    ├── waste-projects/
    └── admin/
```

ห้ามสร้าง Controller ขนาดใหญ่มากที่รวมหลายโมดูลไว้ในไฟล์เดียว

---

## 5. โมดูลจากข้อมูลต้นทาง

ระบบต้องมีโมดูลหลักตามข้อมูลใน Excel ดังนี้

### 5.1 งานบริการรักษาความสะอาด

#### 5.1.1 การล้างทำความสะอาดถนน ลดฝุ่น และพัฒนาเขตรักษาความสะอาด

ข้อมูลขั้นต่ำ:

- วันที่
- เขตรักษาความสะอาด
- สถานที่
- ระยะทาง

ชื่อโมดูลภายในแนะนำ: `road_washings`

#### 5.1.2 การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ

ข้อมูลขั้นต่ำ:

- วันที่
- ชื่อแหล่งน้ำ
- ระยะทางปฏิบัติงาน
- ปริมาณผักตบชวา/มูลฝอยที่กำจัดได้
- หน่วยปริมาณ (ค่าเริ่มต้นตาม Requirement เช่น ลูกบาศก์เมตร)

ชื่อโมดูลภายในแนะนำ: `waterway_cleanings`

#### 5.1.3 การกวาดทำความสะอาดฝุ่นถนนสาธารณะ

ข้อมูลขั้นต่ำ:

- วันที่
- ถนน
- สถานที่จัดเก็บ
- ระยะทาง

ชื่อโมดูลภายในแนะนำ: `road_sweepings`

#### 5.1.4 กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาดและพัฒนาสิ่งแวดล้อม

ข้อมูลขั้นต่ำ:

- วันที่
- สถานที่
- ระยะทาง
- ชุมชน

ชื่อโมดูลภายในแนะนำ: `outsourced_cleanings`

---

### 5.2 งานบริการมูลฝอย

#### 5.2.1 มูลฝอยทั่วไป

ข้อมูลขั้นต่ำ:

- วันที่
- แหล่งที่เก็บ
- ประเภทขยะมูลฝอย
- ชื่อขยะมูลฝอย
- น้ำหนัก

ชื่อโมดูลภายในแนะนำ: `waste_collections`

---

### 5.3 งานบริหารจัดการสิ่งปฏิกูล

#### 5.3.1 งานลอกท่อระบายน้ำ

ข้อมูลขั้นต่ำ:

- วันที่
- สถานที่
- ระยะทาง
- ปริมาณตะกอน

ชื่อโมดูลภายในแนะนำ: `drain_cleanings`

#### 5.3.2 งานสูบสิ่งปฏิกูล

ข้อมูลขั้นต่ำ:

- วันที่
- สถานที่
- ปริมาตรสิ่งปฏิกูล
- ค่าธรรมเนียม

ชื่อโมดูลภายในแนะนำ: `septic_pumpings`

#### 5.3.3 การบำบัดสิ่งปฏิกูล

ข้อมูลขั้นต่ำตาม Excel:

- วันที่
- ปริมาณตะกอนสำหรับทำปุ๋ย
- ปริมาณปุ๋ยอินทรีย์นครนนท์สูตร 2 คงเหลือ
- ปริมาณ/ข้อมูลการใส่น้ำจุลินทรีย์ชีวภาพ

ชื่อโมดูลภายในแนะนำ: `septic_treatments`

> Excel ต้นทางไม่ได้ระบุหน่วยของบางช่องในหัวข้อนี้อย่างชัดเจน ห้ามเดาหน่วยเองใน Database Schema Production ให้กำหนด `quantity` + `unit` หรือยืนยันหน่วยกับเจ้าของระบบก่อนบังคับใช้ Validation

---

### 5.4 งานพัฒนาระบบจัดการมูลฝอย

#### 5.4.1 โครงการต่าง ๆ

ข้อมูลขั้นต่ำ:

- วันที่
- ชื่อโครงการ
- จำนวนชุมชนที่เข้าร่วมโครงการ
- ผู้เข้าร่วมโครงการ/คน

ชื่อโมดูลภายในแนะนำ: `waste_management_projects`

---

## 6. Database Design

### 6.1 หลักการทั่วไป

ทุกตารางธุรกรรม/กิจกรรมควรมีอย่างน้อย:

```text
id
service_date
created_by
updated_by
created_at
updated_at
deleted_at (เฉพาะกรณีที่อนุญาต Soft Delete)
```

### 6.2 Primary Key

เลือกอย่างใดอย่างหนึ่งให้เหมือนกันทั้งระบบ:

- `BIGINT UNSIGNED` auto increment หรือ
- ULID

ห้ามใช้หลายรูปแบบปะปนโดยไม่มีเหตุผล

### 6.3 Numeric Data

- ระยะทาง: `decimal(10,2)`
- น้ำหนัก/ปริมาตร/ปริมาณ: ใช้ `decimal` ไม่ใช้ float
- เงิน: `decimal(12,2)` หรือขนาดที่เหมาะกับข้อมูลจริง
- จำนวนคน/จำนวนชุมชน: unsigned integer

ค่าจำนวนจริงต้องไม่ติดลบ เว้นแต่มี Requirement เฉพาะ

### 6.4 Master Data

สร้าง Master Table เมื่อข้อมูลถูกใช้ซ้ำและต้องควบคุมค่า เช่น:

```text
communities
locations
cleaning_zones
waste_types
measurement_units
```

Master table ควรมี:

```text
id
code
name
is_active
created_at
updated_at
```

ไม่ควร hard-code รายชื่อชุมชน/ประเภทขยะใน Blade หากผู้ดูแลต้องแก้ไขภายหลัง

### 6.5 Foreign Keys

ตัวอย่าง:

```text
community_id -> communities.id
waste_type_id -> waste_types.id
created_by -> users.id
updated_by -> users.id
```

กำหนด `onDelete` ตามผลกระทบของข้อมูลจริง

- ข้อมูลกิจกรรมสำคัญ: ปกติห้าม cascade delete จาก users
- หากผู้ใช้ถูกปิดบัญชี ประวัติข้อมูลและ Audit Log ต้องยังคงอยู่

### 6.6 Indexes

สร้าง index สำหรับ column ที่ใช้ค้นหา/กรองบ่อย เช่น:

```text
service_date
community_id
waste_type_id
created_by
created_at
```

ใช้ composite index เมื่อ query จริงมี pattern ชัดเจน เช่น `(service_date, community_id)`

ห้ามสร้าง index ทุก column โดยไม่มีเหตุผล

---

## 7. Authentication Requirements

### Login

ต้องมี:

- CSRF protection
- Session-based authentication สำหรับ web
- Rate limiting
- Regenerate session ID หลัง login
- Logout ด้วย POST
- Generic error message เพื่อไม่เปิดเผยว่ามีบัญชี email/username นั้นหรือไม่
- Password hashing ผ่าน Laravel `Hash` เท่านั้น

ห้าม:

- เก็บ password เป็น plain text
- log password
- ส่ง password กลับไปใน response
- เขียน custom encryption สำหรับ password เอง

### Password Policy

อย่างน้อย:

- ใช้ Laravel password validation rules
- รองรับ password manager
- ไม่จำกัดความยาวต่ำเกินไป
- ไม่ trim/เปลี่ยน password ของผู้ใช้แบบเงียบ ๆ
- Admin ไม่สามารถเห็น password เดิมของผู้ใช้

---

## 8. Role-Based Access Control (RBAC)

### 8.1 Default Roles

สร้าง Role เริ่มต้น:

#### `super-admin`

- จัดการทุกระบบ
- จัดการ User / Role / Permission
- ดู Audit Log
- CRUD + Export ทุกโมดูล

#### `admin`

- จัดการข้อมูลส่วนบริการ
- จัดการ Master Data ตาม Permission
- จัดการผู้ใช้ได้เฉพาะเมื่อได้รับ Permission
- ไม่มีสิทธิ์เปลี่ยน Permission ระดับระบบโดยอัตโนมัติ

#### `staff`

- ดูข้อมูลที่ได้รับสิทธิ์
- เพิ่ม/แก้ไขข้อมูลตาม Permission
- ลบได้เฉพาะเมื่อได้รับ Permission
- ไม่มีสิทธิ์ Role Management

#### `viewer`

- View only
- Search / Filter / Dashboard
- Export เฉพาะเมื่อได้รับ Permission

#### `auditor`

- View records
- View Audit Log ตามขอบเขตที่ได้รับอนุญาต
- ห้าม Create/Update/Delete ข้อมูลปฏิบัติงาน

### 8.2 Permission Pattern

ทุกโมดูลต้องมี Permission แยก action อย่างน้อย:

```text
{module}.view
{module}.create
{module}.update
{module}.delete
{module}.export
```

ระบบผู้ใช้:

```text
users.view
users.create
users.update
users.disable
roles.view
roles.manage
audit-logs.view
```

### 8.3 Enforcement

ทุก route ที่เป็นข้อมูลภายในต้อง:

1. ใช้ `auth` middleware
2. ตรวจ permission ผ่าน Policy / Gate
3. ตรวจซ้ำใน server-side action
4. UI ใช้ `@can` เพื่อซ่อน action ที่ผู้ใช้ไม่มีสิทธิ์

ห้ามเชื่อ permission ที่ส่งมาจาก client

---

## 9. CRUD Standard

ทุกโมดูล CRUD ต้องมีรูปแบบสม่ำเสมอ

### Index

ต้องรองรับ:

- Search
- Filter ช่วงวันที่
- Filter ตาม Master Data ที่เกี่ยวข้อง
- Sort
- Pagination
- Preserve query string เมื่อเปลี่ยนหน้า
- Empty state
- Permission-aware buttons

### Create

ต้องมี:

- Label ชัดเจน
- Required indicator
- Server-side validation
- Validation error ใกล้ field
- Old input หลัง validation fail
- ปุ่ม Save / Cancel
- ป้องกัน double-submit เมื่อเหมาะสม

### Show

แสดง:

- ข้อมูลรายการ
- ผู้บันทึก
- วันที่สร้าง
- ผู้แก้ไขล่าสุด
- วันที่แก้ไขล่าสุด

### Edit

- โหลดข้อมูลเดิม
- Validation เหมือน Create และเหมาะกับ Update
- ตรวจ Policy ก่อนแก้ไข
- บันทึก Audit Log เมื่อมีการเปลี่ยนแปลงสำคัญ

### Delete

- ต้องมี confirmation
- ตรวจ `delete` permission
- ใช้ Soft Delete สำหรับข้อมูลกิจกรรมที่ต้องรักษาประวัติ เว้นแต่ Requirement ระบุเป็นอย่างอื่น
- Hard Delete ใช้เฉพาะข้อมูลที่ได้รับอนุมัติว่าไม่ต้องเก็บประวัติ

---

## 10. UI / UX Standard

### Layout

ใช้โครงสร้างหลัก:

- Top bar
- Sidebar navigation
- Breadcrumb
- Page title
- Main content
- Flash message / toast

### Tailwind

- ใช้ utility classes เป็นหลัก
- สร้าง Blade Component สำหรับ UI ที่ใช้ซ้ำ
- หลีกเลี่ยง class ยาวซ้ำจำนวนมาก ให้สร้าง component ก่อนสร้าง custom CSS
- Custom CSS ใช้เฉพาะกรณีที่ Tailwind ไม่เหมาะสม

### Components ที่ควรมี

```text
<x-button>
<x-input>
<x-select>
<x-textarea>
<x-form-error>
<x-modal>
<x-table>
<x-pagination>
<x-badge>
<x-alert>
<x-confirm-dialog>
<x-empty-state>
```

### Responsive

ทุกหน้าต้อง usable ที่:

- Mobile
- Tablet
- Desktop

Table บน Mobile ต้องไม่ทำให้หน้าพัง ใช้ horizontal scroll หรือ responsive card view ตามความเหมาะสม

### Accessibility

เป้าหมาย WCAG 2.2 AA:

- Semantic HTML
- `<label>` ผูกกับ form control
- Keyboard navigation
- Visible focus state
- Contrast ที่อ่านได้
- ไม่ใช้สีเพียงอย่างเดียวเพื่อสื่อสถานะ
- Modal ต้องจัดการ focus
- Icon button ต้องมี accessible name
- Error message ต้องอ่านและเข้าใจได้

---

## 11. Validation Rules

Validation ต้องอยู่ฝั่ง Laravel เสมอ แม้มี validation ฝั่ง browser แล้ว

ตัวอย่างแนวทาง:

```php
return [
    'service_date' => ['required', 'date'],
    'location_id' => ['nullable', 'exists:locations,id'],
    'distance_km' => ['nullable', 'numeric', 'min:0'],
    'weight_kg' => ['nullable', 'numeric', 'min:0'],
    'fee_amount' => ['nullable', 'numeric', 'min:0'],
];
```

- ใช้ `exists`, `unique`, `Rule::enum`, `Rule::in` ตามประเภทข้อมูล
- จำกัด `max` ของ string ทุก field ที่เหมาะสม
- ห้าม mass assign field ที่ผู้ใช้ไม่ควรแก้ได้ เช่น `created_by`
- ใช้ `$fillable` หรือ guarded strategy ที่ชัดเจน

---

## 12. Security Standard

อ้างอิง OWASP ASVS และ Laravel security controls

### ต้องทำ

- CSRF protection
- XSS prevention ผ่าน Blade escaping (`{{ }}`)
- ห้ามใช้ `{!! !!}` กับ user-generated content เว้นแต่ sanitize อย่างถูกต้อง
- SQL Injection prevention ผ่าน Eloquent / Query Builder parameter binding
- Authorization ทุก protected action
- Login rate limiting
- Secure session cookies ใน Production
- `APP_DEBUG=false` ใน Production
- Secrets อยู่ใน environment/secret manager ไม่ commit ลง Git
- HTTPS only ใน Production
- Security headers ที่เหมาะสม
- File upload ต้อง validate MIME/type/size และเก็บนอก executable path
- Log security events ที่สำคัญ
- Dependency update เป็นประจำ

### ห้าม

- ต่อ SQL ด้วย string จาก user input
- เชื่อ `role`, `user_id`, `created_by` จาก hidden input
- แสดง stack trace ใน Production
- เก็บ token/password/API key ใน source code
- commit `.env`
- ใช้ default credentials

---

## 13. Audit Log

Audit Log เป็นข้อมูลสำคัญและต้องแก้ไขย้อนหลังได้ยาก

บันทึกอย่างน้อย:

```text
id
user_id
actor_name_snapshot
event
subject_type
subject_id
old_values
new_values
ip_address
user_agent
request_id
created_at
```

Event อย่างน้อย:

```text
login_success
login_failed
logout
record_created
record_updated
record_deleted
record_restored
user_created
user_updated
user_disabled
role_changed
permission_changed
export_requested
```

ข้อกำหนด:

- ผู้ใช้ทั่วไปห้ามแก้ไข Audit Log
- Audit Log ไม่ควรใช้ Soft Delete แบบที่ Admin ลบเองได้
- ห้ามเก็บ password, reset token, session secret หรือข้อมูลลับใน old/new values
- การดู Audit Log ต้องมี permission เฉพาะ

---

## 14. Dashboard

Dashboard ต้องแสดงข้อมูลตาม Permission ของผู้ใช้เท่านั้น

องค์ประกอบเริ่มต้น:

- จำนวนรายการของเดือนปัจจุบัน
- จำนวนกิจกรรมแยกตามกลุ่มงาน
- ปริมาณมูลฝอยรวมตามช่วงเวลา
- ปริมาณงานด้านสิ่งปฏิกูลตามช่วงเวลา
- จำนวนโครงการและผู้เข้าร่วม
- กราฟแนวโน้มรายเดือนเมื่อข้อมูลเพียงพอ
- Recent activities ตามสิทธิ์

ห้ามคำนวณตัวเลข Dashboard ด้วยการดึงทุก record เข้า PHP memory หาก SQL aggregate ทำได้

---

## 15. Search / Filter / Export

### Search / Filter

- Validate query parameters
- ใช้ whitelist สำหรับ sortable columns
- ห้ามส่งชื่อ column จาก request เข้า `orderBy()` โดยตรงโดยไม่ validate
- ใช้ query scopes เมื่อ filter ถูกใช้ซ้ำ

### Export

รองรับอย่างน้อย CSV/XLSX ตาม Requirement

- Export ต้องใช้ query/filter เดียวกับหน้ารายการ
- ตรวจ permission ก่อน export
- ข้อมูลจำนวนมากให้ Queue
- Audit การ export เมื่อข้อมูลมีความสำคัญ
- ชื่อไฟล์ต้องไม่มี user input ที่ไม่ sanitize

---

## 16. Logging / Error Handling

### User-facing

- แสดงข้อความที่เข้าใจง่าย
- ไม่แสดง exception trace
- ไม่เปิดเผย SQL, path server หรือ secret

### Application Log

Log อย่างเหมาะสม:

- exception
- failed jobs
- security events
- integration failures

ห้าม log:

- password
- session cookie
- bearer token
- secret key
- reset token

ใช้ Correlation/Request ID สำหรับ trace request เมื่อเหมาะสม

---

## 17. Performance

- ป้องกัน N+1 ด้วย eager loading
- Pagination สำหรับ list ที่โตได้
- Index field ที่ query บ่อย
- Cache เฉพาะข้อมูลที่เหมาะสม
- ห้าม cache ข้อมูลที่อาจทำให้ข้าม authorization
- ใช้ Queue สำหรับ export/report หนัก
- ใช้ aggregate SQL สำหรับ summary
- ตรวจ query count ในหน้าหลักก่อน merge

---

## 18. Testing Requirements

ใช้ Pest หรือ PHPUnit ให้เป็นมาตรฐานเดียวทั้งโครงการ

### Authentication Tests

อย่างน้อย:

- login success
- login failure
- unauthenticated cannot access protected pages
- logout
- password reset flow ตาม feature ที่เปิด
- login throttling

### Authorization Tests

ทุกโมดูลหลักต้อง test ว่า:

- user ที่ไม่มี `view` เข้า index/show ไม่ได้
- user ที่ไม่มี `create` สร้างไม่ได้
- user ที่ไม่มี `update` แก้ไม่ได้
- user ที่ไม่มี `delete` ลบไม่ได้
- user ที่ไม่มี `export` export ไม่ได้

ห้าม test แค่ปุ่มหาย ต้อง test HTTP response ฝั่ง server

### CRUD Tests

อย่างน้อย:

- valid data creates record
- invalid data rejected
- update works
- unauthorized update blocked
- delete/soft delete works ตาม Requirement
- database contains expected values

### Quality Gate

ก่อนถือว่างานเสร็จต้องผ่าน:

```bash
php artisan test
./vendor/bin/pint --test
npm run build
```

หากโครงการมี static analysis ให้ผ่าน PHPStan/Larastan ด้วย

---

## 19. Routes

ใช้ Resource Routes เมื่อเหมาะสม:

```php
Route::middleware(['auth'])->group(function () {
    Route::resource('waste-collections', WasteCollectionController::class);
});
```

ใช้ `authorizeResource()` / Policy หรือ authorization ที่เทียบเท่า

Admin routes:

```text
/admin/users
/admin/roles
/admin/permissions
/admin/audit-logs
/admin/master-data/...
```

ห้ามใช้ route protection แค่ prefix `/admin` โดยไม่มี authorization

---

## 20. Recommended Permission Matrix

| Module | super-admin | admin | staff | viewer | auditor |
|---|---:|---:|---:|---:|---:|
| Dashboard | Full | View | View | View | View |
| Road Washings | CRUD+Export | ตามสิทธิ์ | ตามสิทธิ์ | View | View |
| Waterway Cleanings | CRUD+Export | ตามสิทธิ์ | ตามสิทธิ์ | View | View |
| Road Sweepings | CRUD+Export | ตามสิทธิ์ | ตามสิทธิ์ | View | View |
| Outsourced Cleanings | CRUD+Export | ตามสิทธิ์ | ตามสิทธิ์ | View | View |
| Waste Collections | CRUD+Export | ตามสิทธิ์ | ตามสิทธิ์ | View | View |
| Drain Cleanings | CRUD+Export | ตามสิทธิ์ | ตามสิทธิ์ | View | View |
| Septic Pumpings | CRUD+Export | ตามสิทธิ์ | ตามสิทธิ์ | View | View |
| Septic Treatments | CRUD+Export | ตามสิทธิ์ | ตามสิทธิ์ | View | View |
| Waste Projects | CRUD+Export | ตามสิทธิ์ | ตามสิทธิ์ | View | View |
| Master Data | Full | ตามสิทธิ์ | Read | Read | Read |
| Users | Full | ตามสิทธิ์ | No | No | No |
| Roles/Permissions | Full | No by default | No | No | No |
| Audit Log | Full | ตามสิทธิ์ | No | No | View |

> ตารางนี้เป็นค่าเริ่มต้น Permission จริงต้องสร้างแบบ granular และ assign ผ่าน Seeder/หน้าจัดการสิทธิ์

---

## 21. Seeder Requirements

ต้องมี Seeder สำหรับ:

- Roles
- Permissions
- Role-Permission mapping
- Initial super-admin (Production ต้องอ่าน credential จาก secure environment หรือสร้างผ่าน CLI ที่ปลอดภัย)
- Master data ขั้นต้นที่ได้รับการยืนยันแล้ว

Seeder ต้องรันซ้ำได้โดยไม่สร้างข้อมูลซ้ำโดยไม่จำเป็น

ใช้ `firstOrCreate`, `updateOrCreate` หรือ `syncPermissions` ตามกรณี

---

## 22. Migration Rules

- ทุก schema change ต้องผ่าน Migration
- ห้ามแก้ migration ที่รัน Production แล้วเพื่อเปลี่ยนโครงสร้างย้อนหลัง ให้สร้าง migration ใหม่
- Foreign key ต้องมีชนิดตรงกับ primary key
- Column ที่ required จริงต้องไม่ nullable
- Column ที่ยังไม่ยืนยันหน่วย/รูปแบบห้ามกำหนด constraint แบบเดา
- เพิ่ม index ตาม query pattern
- Migration ต้อง rollback ได้เมื่อเป็นไปได้

---

## 23. Data Integrity

- ใช้ DB constraint ควบคู่กับ application validation
- `service_date` ต้องเป็น date จริง ไม่เก็บเป็น varchar
- เงิน/น้ำหนัก/ระยะทางไม่เก็บเป็นข้อความ
- ผู้ใช้ที่ถูก disable ยังต้องเชื่อมกับประวัติข้อมูลเดิมได้
- ห้ามแก้ `created_by` หลังสร้าง record
- `updated_by` ต้องอัปเดตจาก authenticated user ฝั่ง server

---

## 24. Date / Time / Locale

- Business date เช่น `service_date` เก็บเป็นชนิด `DATE`
- Timestamp ของระบบเก็บตามแนวทางที่โครงการกำหนดอย่างสม่ำเสมอ
- UI แสดง timezone ประเทศไทย (`Asia/Bangkok`) หากระบบใช้งานในประเทศไทย
- รองรับปี พ.ศ. ใน UI ได้ แต่ Database ต้องไม่เก็บปี พ.ศ. เป็น string แทนวันที่มาตรฐาน
- Locale หลัก: `th`
- Encoding: UTF-8 / utf8mb4

---

## 25. API Rules (ถ้ามี API)

หากมี API:

- ใช้ `/api/v1/...`
- Authentication ใช้ Laravel Sanctum หรือ mechanism ที่ Requirement กำหนด
- ใช้ API Resource
- ใช้ Policy เดียวกับ Web
- Validate ทุก input
- Rate limit endpoint สำคัญ
- Response format ต้อง consistent
- ห้าม expose internal exception

ตัวอย่าง:

```json
{
  "data": {},
  "meta": {},
  "message": "สำเร็จ"
}
```

---

## 26. Privacy / Data Protection

ระบบต้องเก็บข้อมูลส่วนบุคคลเท่าที่จำเป็น

- กำหนด purpose ของข้อมูลผู้ใช้
- จำกัดผู้เห็นข้อมูลตาม Role/Permission
- ไม่แสดงข้อมูลส่วนบุคคลใน log โดยไม่จำเป็น
- มี retention policy สำหรับข้อมูลและ log
- Backup ต้องเข้าถึงเฉพาะผู้มีสิทธิ์
- หากเก็บข้อมูลส่วนบุคคลของประชาชน ต้องตรวจ Requirement ด้าน PDPA ของหน่วยงานก่อน Production

---

## 27. Backup / Recovery

Production ต้องมี:

- Database backup อัตโนมัติ
- Backup file storage หากมีไฟล์แนบ
- Encryption / access control ของ backup ตามความเหมาะสม
- Retention policy
- Restore test เป็นระยะ

Backup ที่ restore ไม่ได้ถือว่าไม่ผ่านมาตรฐาน

---

## 28. Git / Environment

ต้องมี:

```text
.env.example
.gitignore
README.md
AGENT.md
```

ห้าม commit:

```text
.env
vendor/
node_modules/
production backup
private keys
real credentials
```

Environment อย่างน้อย:

```text
local
staging
production
```

ห้ามใช้ Production database ใน automated test

---

## 29. Definition of Done

งานหนึ่งชิ้นถือว่าเสร็จเมื่อ:

1. Requirement ครบ
2. UI responsive
3. Validation ครบ
4. Authorization ครบทั้ง UI และ Server
5. Audit event ที่จำเป็นถูกบันทึก
6. ไม่มี N+1 ที่เห็นได้ชัด
7. Test ผ่าน
8. Pint ผ่าน
9. Frontend build ผ่าน
10. ไม่มี secret ใน source code
11. Migration/Seeder พร้อม
12. Error state / Empty state / Permission denied state ใช้งานได้
13. ชื่อ field และ label สอดคล้องกับข้อมูลส่วนบริการ
14. Code review แล้วไม่มี issue ระดับ Critical/High ด้าน Security

---

## 30. Agent Implementation Workflow

เมื่อ AI Agent ได้รับงาน ให้ทำตามลำดับนี้:

1. อ่าน `AGENT.md`
2. อ่าน Requirement ที่เกี่ยวข้อง
3. ตรวจ Migration / Model / Policy / Route เดิมก่อนสร้างของใหม่
4. ห้ามสร้าง table/field ซ้ำเพราะไม่ตรวจของเดิม
5. วางโครงสร้าง Model + Migration + Request + Policy + Controller + View + Test
6. ทำ authorization ก่อนเปิด route ใช้งาน
7. ทำ validation
8. ทำ CRUD UI
9. เพิ่ม Audit Log
10. เพิ่ม Feature Tests
11. รัน test / lint / build
12. สรุปไฟล์ที่แก้และข้อจำกัดที่ยังต้องยืนยัน

---

## 31. Agent Safety Rules

AI Agent ต้องไม่:

- ลบฐานข้อมูลเพื่อแก้ปัญหาโดยไม่จำเป็น
- ใช้ `migrate:fresh` กับ Production
- hard-code password
- ปิด CSRF เพื่อให้ form ทำงาน
- ปิด authorization เพื่อให้ test ผ่าน
- เปลี่ยน `APP_DEBUG=true` บน Production
- ใช้ `chmod 777` เป็นวิธีแก้ permission แบบถาวร
- disable SSL verification
- ใช้ raw SQL จาก user input
- ลบ Audit Log
- hard delete ข้อมูลกิจกรรมเพียงเพราะ UI มีปุ่ม Delete
- เพิ่ม package จำนวนมากโดยไม่จำเป็น
- เปลี่ยน Framework หลักออกจาก Laravel/Tailwind โดยไม่ได้รับอนุมัติ

---

## 32. Initial Build Order

ลำดับพัฒนาที่แนะนำ:

### Phase 1 — Foundation

1. Laravel project setup
2. Database connection
3. Tailwind + Vite
4. Authentication
5. User management
6. Role / Permission
7. Base layout / navigation
8. Audit Log foundation

### Phase 2 — Master Data

1. Communities
2. Locations
3. Cleaning zones
4. Waste types
5. Measurement units

### Phase 3 — Service CRUD

1. Road Washings
2. Waterway Cleanings
3. Road Sweepings
4. Outsourced Cleanings
5. Waste Collections
6. Drain Cleanings
7. Septic Pumpings
8. Septic Treatments
9. Waste Management Projects

### Phase 4 — Reporting

1. Dashboard
2. Search/filter optimization
3. Export
4. Summary reports

### Phase 5 — Production Readiness

1. Security review
2. Accessibility review
3. Performance review
4. Backup/restore test
5. Logging/monitoring
6. Deployment checklist

---

## 33. Proposed Core Tables

```text
users
roles
permissions
model_has_roles
model_has_permissions
role_has_permissions

audit_logs

communities
locations
cleaning_zones
waste_types
measurement_units

road_washings
waterway_cleanings
road_sweepings
outsourced_cleanings
waste_collections
drain_cleanings
septic_pumpings
septic_treatments
waste_management_projects
```

หาก Requirement ยืนยันว่าบาง Master Data ไม่จำเป็นจึงค่อยลดตาราง ไม่ควรรวมทุกอย่างไว้ใน table เดียวด้วย JSON/EAV เพื่อความเร็วในการเริ่มต้น

---

## 34. Example Migration Pattern

```php
Schema::create('waste_collections', function (Blueprint $table) {
    $table->id();
    $table->date('service_date')->index();
    $table->foreignId('location_id')->nullable()->constrained()->nullOnDelete();
    $table->foreignId('waste_type_id')->nullable()->constrained()->nullOnDelete();
    $table->string('waste_name', 255);
    $table->decimal('weight_kg', 12, 2)->nullable();
    $table->foreignId('created_by')->constrained('users')->restrictOnDelete();
    $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
    $table->timestamps();
    $table->softDeletes();
});
```

> ตัวอย่างนี้เป็น pattern ไม่ใช่ schema final หากหน่วยของน้ำหนักในระบบจริงไม่ใช่กิโลกรัม ให้ใช้ field/unit design ที่ยืนยันแล้วก่อนสร้าง Production migration

---

## 35. Example Controller Pattern

```php
public function store(StoreWasteCollectionRequest $request)
{
    $this->authorize('create', WasteCollection::class);

    $data = $request->validated();
    $data['created_by'] = $request->user()->id;
    $data['updated_by'] = $request->user()->id;

    $record = WasteCollection::create($data);

    return redirect()
        ->route('waste-collections.show', $record)
        ->with('success', 'บันทึกข้อมูลเรียบร้อยแล้ว');
}
```

ห้ามนำ `$request->all()` เข้า `create()` โดยตรง

---

## 36. Example Policy Pattern

```php
public function viewAny(User $user): bool
{
    return $user->can('waste-collections.view');
}

public function create(User $user): bool
{
    return $user->can('waste-collections.create');
}

public function update(User $user, WasteCollection $record): bool
{
    return $user->can('waste-collections.update');
}

public function delete(User $user, WasteCollection $record): bool
{
    return $user->can('waste-collections.delete');
}
```

---

## 37. Example UI Permission Pattern

```blade
@can('create', App\Models\WasteCollection::class)
    <a href="{{ route('waste-collections.create') }}"
       class="inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500">
        เพิ่มข้อมูล
    </a>
@endcan
```

การซ่อนปุ่มเป็นเพียง UX; Server-side Policy ยังเป็นข้อบังคับ

---

## 38. References

ใช้เอกสารทางการเป็นหลักเมื่อต้องตรวจ implementation detail:

- Laravel Documentation: https://laravel.com/docs
- Laravel Authentication: https://laravel.com/docs/authentication
- Laravel Authorization: https://laravel.com/docs/authorization
- Laravel Validation: https://laravel.com/docs/validation
- Tailwind CSS: https://tailwindcss.com/docs
- Spatie Laravel Permission: https://spatie.be/docs/laravel-permission
- OWASP ASVS: https://owasp.org/projects/asvs
- WCAG 2.2: https://www.w3.org/TR/WCAG22/

---

## 39. Final Rule

**Security, Authorization, Data Integrity และ Auditability สำคัญกว่าความเร็วในการเขียน CRUD**

หากต้องเลือกระหว่าง “ทำให้เสร็จเร็ว” กับ “ทำให้ข้อมูลและสิทธิ์ถูกต้อง” ให้เลือกความถูกต้องเสมอ
