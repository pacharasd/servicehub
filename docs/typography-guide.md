# ระบบตัวอักษร ServiceHub

## ฟอนต์และใบอนุญาต

ฟอนต์หลัก LINE Seed Sans TH รุ่น 1.003 ใช้น้ำหนักจริง Regular 400 และ Bold 700 เท่านั้น ตามการเลือกของผู้ใช้ที่ยกเว้นน้ำหนัก 500/600 ไม่สร้าง bold/italic ปลอม (`font-synthesis: none`) ไฟล์ WOFF2 เก็บใน src/assets/fonts/line-seed พร้อม SIL Open Font License 1.1 ของ LY Corporation และ metadata ที่อ่านจากชุด TTF ทางการ

แหล่งทางการ: https://seed.line.me/index_th.html
WOFF2: https://seed.line.me/src/fonts/LINESeedSansTH_W_Rg.woff2 และ https://seed.line.me/src/fonts/LINESeedSansTH_W_Bd.woff2
ชุดต้นฉบับ: https://seed.line.me/src/images/fonts/LINE_Seed_Sans_TH.zip
ใบอนุญาตฉบับเต็ม: https://github.com/line/seed/blob/main/OFL.txt

ระบบไม่เรียกฟอนต์ภายนอกขณะใช้งาน preload เฉพาะ Regular บนหน้าแอปและ auth ผ่าน Vite manifest น้ำหนัก Bold โหลดเมื่อต้องใช้ ไม่ preload ฟอนต์สำรอง

Fallback: IBM Plex Sans Thai → Leelawadee UI → Segoe UI → sans-serif โดย IBM ใช้เฉพาะ 400/700 แยก Thai/Latin ไฟล์ 500/600 เดิมไม่ถูกอ้างจาก CSS และไม่รวมใน build

## Typography tokens และบทบาท

กำหนดใน src/typography.css และใช้ font family ส่วนกลางใน src/style.css

| บทบาท | ขนาด | น้ำหนัก | Line height | class |
|---|---|---|---|---|
| ชื่อหน้า | 24px มือถือ / 28px ตั้งแต่ 768px | 700 | 1.4 | type-page-title |
| ชื่อส่วน | 18px | 700 | 1.5 | type-section-title |
| ชื่อการ์ด | 15px | 700 | 1.5 | type-card-title |
| เนื้อหา/ตาราง | 14px | 400 | 1.6 | type-body |
| เมนู | 14px | 400 | 1.5 | type-navigation |
| KPI หลัก | 32px | 700 | 1.25 | type-kpi |
| ข้อความช่วย | 13px | 400 | 1.6 | type-helper |
| ข้อมูลรองสั้น | 12px | 400 | 1.6 | type-caption |

ป้ายฟอร์ม เมนู คำอธิบาย และปุ่มรองใช้ Regular หัวข้อ ยอดสำคัญ และปุ่มหลักใช้ Bold ชั้น typography ปรับ utilities medium/semibold เป็น 400 ตามข้อตกลง และลด bold ในบทบาทเนื้อหาโดยไม่เปลี่ยนความหมายของ bold สำหรับหัวข้อ ไม่ขยายช่องไฟตัวอักษรภาษาไทยหรือใช้ break-all

## การโหลดและตัวเลข

unitsPerEm=1000, hhea ascent=1144, descent=-440, lineGap=0 ของทั้งสองน้ำหนัก ใช้ ascent-override 114.4%, descent-override 44%, line-gap-override 0% กับ IBM fallback เพื่อลดความต่างของแนวตั้ง ไม่ปรับความกว้างโดยเดา และไม่รับรองว่าจะไม่มี layout shift

คง tabular-nums เป็นคำขอ OpenType และจัดตัวเลขชิดขวาในตาราง แต่ไม่พบฟีเจอร์ tnum ใน GSUB/GPOS ของชุด LINE Seed ที่ตรวจ จึงไม่รับรองความกว้างตัวเลขเท่ากัน ข้อมูล ตัวเลข หน่วย และการคำนวณเดิมไม่เปลี่ยน

เว็บและ PDF ผ่านหน้าพิมพ์ใช้ฟอนต์ใหม่ Excel ยังคง Tahoma ใน ReportWorkbook เพราะไฟล์ต้องอาศัยฟอนต์ที่ติดตั้งบนเครื่องผู้รับ

## ไฟล์ที่ปรับในงาน typography

- src/typography.css, src/style.css: ระบบตัวอักษร ฟอนต์และ fallback metrics
- src/utils/layout.js, src/dashboard.js, src/reports.js: บทบาทชื่อหน้า ปุ่ม และ KPI
- resources/views/app.blade.php, resources/views/auth/layout.blade.php: preload Regular ผ่าน manifest
- src/assets/fonts/line-seed/: ฟอนต์ต้นฉบับ ใบอนุญาต และ metadata
- tests/frontend/typography.test.mjs, tests/frontend/enterpriseUi.test.mjs: ตรวจ assets น้ำหนัก scale และ markup
- public/dist/: ผล build ที่ XAMPP ใช้งาน

## ตรวจรับและข้อจำกัด

ทดสอบไทย/อังกฤษผสม สระวรรณยุกต์ วันที่ พ.ศ. ชื่อยาว ตัวเลขใหญ่ ศูนย์ ทศนิยม และ validation error ผ่านชุดทดสอบ JSDOM ตรวจ breakpoint 320/768/1024/1440px จากโค้ดและโครงสร้าง ไม่มีการวัดขนาดอักษรหรือ layout จริงด้วย JSDOM เพราะไม่มี layout engine

รัน JavaScript tests, node --check, PHPUnit, Pint และ build ตรวจ JavaScript/CSS/WOFF2 และ preload ผ่าน HTTP/CLI โดยไม่ใช้เบราว์เซอร์ ไม่เปลี่ยนสี grid API ฐานข้อมูล query auth หรือฟอนต์ Excel

ต้องยืนยันการ wrap การวางวรรณยุกต์ fallback เมื่อฟอนต์โหลดไม่ได้ layout shift การซูม และโปรแกรมอ่านหน้าจอบนอุปกรณ์จริงภายหลัง การตรวจนี้ไม่ใช่การรับรอง WCAG 2.2 AA เต็มรูปแบบ
