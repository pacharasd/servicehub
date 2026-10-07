<?php

namespace Database\Seeders;

use Carbon\CarbonImmutable;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SampleDataSeeder extends Seeder
{
    public function run(): void
    {
        $admin = DB::table('users')->where('username', 'admin')->first();
        $adminId = $admin ? $admin->id : 1;

        $zones = DB::table('cleaning_zones')->pluck('id')->all();
        $wasteTypes = DB::table('waste_types')->pluck('id')->all();

        if (empty($zones)) {
            $now = now();
            foreach (['R-001' => 'เขตรักษาความสะอาดที่ 1', 'R-002' => 'เขตรักษาความสะอาดที่ 2', 'R-003' => 'เขตรักษาความสะอาดที่ 3', 'R-004' => 'เขตรักษาความสะอาดที่ 4'] as $code => $name) {
                $zones[] = DB::table('cleaning_zones')->insertGetId([
                    'code' => $code,
                    'name' => $name,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }

        if (empty($wasteTypes)) {
            $now = now();
            foreach (['2.2.1' => 'มูลฝอยทั่วไป', '2.2.2' => 'มูลฝอยอันตรายและซากอิเล็กทรอนิกส์', '2.2.3' => 'มูลฝอยประเภทโฟม', '2.2.4' => 'มูลฝอยติดเชื้อ', '2.2.5' => 'มูลฝอยอินทรีย์'] as $code => $name) {
                $wasteTypes[] = DB::table('waste_types')->insertGetId([
                    'code' => $code,
                    'name' => $name,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);
            }
        }

        $now = CarbonImmutable::now('Asia/Bangkok');
        $dates = [
            $now->toDateString(),                           // Today (1 Oct 2026)
            $now->subDays(1)->toDateString(),               // 30 Sep 2026
            $now->subDays(2)->toDateString(),               // 29 Sep 2026
            $now->subDays(3)->toDateString(),               // 28 Sep 2026
            $now->subDays(5)->toDateString(),               // 26 Sep 2026
            $now->subDays(7)->toDateString(),               // 24 Sep 2026
            $now->subDays(10)->toDateString(),              // 21 Sep 2026
            $now->subDays(14)->toDateString(),              // 17 Sep 2026
            $now->subDays(18)->toDateString(),              // 13 Sep 2026
            $now->subDays(22)->toDateString(),              // 9 Sep 2026
            $now->subDays(26)->toDateString(),              // 5 Sep 2026
            $now->subDays(30)->toDateString(),              // 1 Sep 2026
            $now->subDays(35)->toDateString(),              // Aug 2026
            $now->subDays(42)->toDateString(),              // Aug 2026
            $now->subDays(50)->toDateString(),              // Aug 2026
        ];

        // 1. Road Washings (การล้างทำความสะอาดถนน)
        $roadWashings = [
            ['location' => 'ถนนติวานนท์ ช่วงแยกแคราย ถึง แยกพระราม 5', 'distance_km' => 4.50],
            ['location' => 'ถนนงามวงศ์วาน ฝั่งขาเข้า หน้าศูนย์การค้าเดอะมอลล์', 'distance_km' => 3.20],
            ['location' => 'ถนนรัตนาธิเบศร์ ช่วงสะพานพระนั่งเกล้า ถึง ศูนย์ราชการนนทบุรี', 'distance_km' => 5.80],
            ['location' => 'ถนนประชาราษฎร์ หน้าตลาดสดเทศบาลนครนนทบุรี', 'distance_km' => 2.10],
            ['location' => 'ถนนพิบูลสงคราม เลียบแม่น้ำเจ้าพระยา ถึง ท่าน้ำนนท์', 'distance_km' => 3.80],
            ['location' => 'ถนนนครอินทร์ ช่วงวงเวียนพระราม 5 ถึง สะพานพระราม 5', 'distance_km' => 6.20],
            ['location' => 'ถนนเลี่ยงเมืองนนทบุรี ช่วงตัดถนนรัตนาธิเบศร์', 'distance_km' => 4.10],
            ['location' => 'ซอยเรวดี ตั้งแต่ปากซอยติวานนท์ ถึง ท้ายซอยเลี่ยงเมือง', 'distance_km' => 3.50],
            ['location' => 'ถนนกรุงเทพ-นนทบุรี ช่วงแยกติวานนท์ ถึง สะพานพระราม 5', 'distance_km' => 4.80],
            ['location' => 'ถนนสนามบินน้ำ หน้ากระทรวงพาณิชย์', 'distance_km' => 5.00],
            ['location' => 'ถนนประชานิเวศน์ 3 ตลอดสายรอบชุมชน', 'distance_km' => 3.60],
            ['location' => 'ถนนพิบูลสงคราม ซอย 22 หน้าโรงเรียนสตรีนนทบุรี', 'distance_km' => 2.40],
        ];
        foreach ($roadWashings as $i => $row) {
            $date = $dates[$i % count($dates)];
            $zoneId = $zones[$i % count($zones)];
            DB::table('road_washings')->updateOrInsert(
                ['location' => $row['location'], 'service_date' => $date],
                [
                    'cleaning_zone_id' => $zoneId,
                    'distance_km' => $row['distance_km'],
                    'created_by' => $adminId,
                    'updated_by' => $adminId,
                    'created_at' => $date.' 08:30:00',
                    'updated_at' => $date.' 16:30:00',
                ]
            );
        }

        // 2. Waterway Cleanings (การกำจัดผักตบชวาและมูลฝอยในคลองสาธารณะ)
        $waterways = [
            ['waterway_name' => 'คลองบางกรวย ช่วงสะพานพระราม 7', 'distance_km' => 2.50, 'quantity' => 14.500],
            ['waterway_name' => 'คลองบางตลาด ช่วงเชื่อมแม่น้ำเจ้าพระยา', 'distance_km' => 3.80, 'quantity' => 18.250],
            ['waterway_name' => 'คลองส้มป่อย หลังตลาดสดเทศบาลนนทบุรี', 'distance_km' => 1.20, 'quantity' => 6.800],
            ['waterway_name' => 'คลองบ้านใหม่ ช่วงรอยต่อหลักสี่', 'distance_km' => 4.10, 'quantity' => 22.100],
            ['waterway_name' => 'คลองบางแพรก ชุมชนวัดลานนาบุญ', 'distance_km' => 1.80, 'quantity' => 8.400],
            ['waterway_name' => 'คลองบางขวาง หลังเรือนจำกลางนนทบุรี', 'distance_km' => 2.20, 'quantity' => 11.200],
            ['waterway_name' => 'คลองบางสีทอง ช่วงประตูระบายน้ำคลอง', 'distance_km' => 3.00, 'quantity' => 15.600],
            ['waterway_name' => 'คลองวัดเฉลิมพระเกียรติ', 'distance_km' => 2.40, 'quantity' => 9.750],
            ['waterway_name' => 'คลองยายส้ม หลังชุมชนเรวดี', 'distance_km' => 1.50, 'quantity' => 5.300],
            ['waterway_name' => 'คลองบางกระสอ เชื่อมสถานีสูบน้ำ', 'distance_km' => 2.80, 'quantity' => 13.400],
        ];
        foreach ($waterways as $i => $row) {
            $date = $dates[$i % count($dates)];
            DB::table('waterway_cleanings')->updateOrInsert(
                ['waterway_name' => $row['waterway_name'], 'service_date' => $date],
                [
                    'distance_km' => $row['distance_km'],
                    'quantity' => $row['quantity'],
                    'created_by' => $adminId,
                    'updated_by' => $adminId,
                    'created_at' => $date.' 09:00:00',
                    'updated_at' => $date.' 17:00:00',
                ]
            );
        }

        // 3. Road Sweepings (การกวาดทำความสะอาดฝุ่นถนนสาธารณะ)
        $roadSweepings = [
            ['road' => 'ถนนรัตนาธิเบศร์ ขาเข้า', 'distance_km' => 6.50],
            ['road' => 'ถนนประชาราษฎร์', 'distance_km' => 3.20],
            ['road' => 'ถนนติวานนท์ ฝั่งมุ่งหน้าปากเกร็ด', 'distance_km' => 5.40],
            ['road' => 'ถนนกรุงเทพ-นนทบุรี', 'distance_km' => 4.20],
            ['road' => 'ถนนงามวงศ์วาน', 'distance_km' => 3.80],
            ['road' => 'ถนนสนามบินน้ำ', 'distance_km' => 4.90],
            ['road' => 'ถนนพิบูลสงคราม', 'distance_km' => 4.00],
            ['road' => 'ถนนเลี่ยงเมืองนนทบุรี', 'distance_km' => 5.10],
            ['road' => 'ถนนนครอินทร์ ฝั่งขาออก', 'distance_km' => 4.60],
            ['road' => 'ซอยเรวดี', 'distance_km' => 3.10],
        ];
        foreach ($roadSweepings as $i => $row) {
            $date = $dates[$i % count($dates)];
            DB::table('road_sweepings')->updateOrInsert(
                ['road' => $row['road'], 'service_date' => $date],
                [
                    'distance_km' => $row['distance_km'],
                    'created_by' => $adminId,
                    'updated_by' => $adminId,
                    'created_at' => $date.' 05:30:00',
                    'updated_at' => $date.' 11:30:00',
                ]
            );
        }

        // 4. Outsourced Cleanings (กิจกรรมจ้างเหมาบุคคลภายนอกรักษาความสะอาด)
        $outsourced = [
            ['location' => 'บริเวณเกาะกลางและแนวต้นไม้ถนนรัตนาธิเบศร์', 'distance_km' => 5.20, 'community' => 'ชุมชนตลาดขวัญ'],
            ['location' => 'พื้นที่รอบศูนย์ราชการจังหวัดนนทบุรี และสวนสาธารณะ', 'distance_km' => 3.80, 'community' => 'ชุมชนท่าทรายร่วมใจ'],
            ['location' => 'แนวเขื่อนริมแม่น้ำเจ้าพระยา ใต้สะพานพระราม 5', 'distance_km' => 2.40, 'community' => 'ชุมชนวัดเขมาภิรตาราม'],
            ['location' => 'ซอยประชาชื่น-นนทบุรี ตลอดแนวคลองประปา', 'distance_km' => 4.50, 'community' => 'ชุมชนประชานิเวศน์ 3'],
            ['location' => 'พื้นที่ใต้สะพานมหาเจษฎาบดินทรานุสรณ์', 'distance_km' => 3.10, 'community' => 'ชุมชนบางศรีเมืองสัมพันธ์'],
            ['location' => 'ทางเท้าและพื้นที่สาธารณะถนนพิบูลสงคราม', 'distance_km' => 3.60, 'community' => 'ชุมชนวัดนครอินทร์'],
            ['location' => 'รอบสนามกีฬาจังหวัดนนทบุรี', 'distance_km' => 2.80, 'community' => 'ชุมชนเรวดีโซนเหนือ'],
            ['location' => 'พื้นที่รอบตลาดสดเทศบาลนนทบุรีและลานกิจกรรม', 'distance_km' => 2.00, 'community' => 'ชุมชนริมน้ำท่าน้ำนนท์'],
        ];
        foreach ($outsourced as $i => $row) {
            $date = $dates[$i % count($dates)];
            DB::table('outsourced_cleanings')->updateOrInsert(
                ['location' => $row['location'], 'service_date' => $date],
                [
                    'distance_km' => $row['distance_km'],
                    'community' => $row['community'],
                    'created_by' => $adminId,
                    'updated_by' => $adminId,
                    'created_at' => $date.' 08:00:00',
                    'updated_at' => $date.' 17:00:00',
                ]
            );
        }

        // 5. Waste Collections (งานบริหารจัดการมูลฝอย)
        $wasteCollections = [
            ['source' => 'ตลาดสดเทศบาลนครนนทบุรี', 'waste_name' => 'เศษผักผลไม้และเศษอาหารจากแผงค้า', 'weight' => 12.800, 'type_index' => 4], // อินทรีย์
            ['source' => 'ศูนย์การค้าเดอะมอลล์งามวงศ์วาน', 'waste_name' => 'กล่องโฟม บรรจุภัณฑ์ และขยะทั่วไป', 'weight' => 18.500, 'type_index' => 0], // ทั่วไป
            ['source' => 'โรงพยาบาลพระนั่งเกล้า', 'waste_name' => 'ขยะติดเชื้อจากแผนกผู้ป่วยนอก', 'weight' => 2.400, 'type_index' => 3], // ติดเชื้อ
            ['source' => 'หมู่บ้านประชานิเวศน์ 3 โซน A', 'waste_name' => 'ขยะในครัวเรือนทั่วไป', 'weight' => 15.200, 'type_index' => 0], // ทั่วไป
            ['source' => 'ตลาดนัดนกฮูก เลี่ยงเมืองนนท์', 'waste_name' => 'ขวดพลาสติก PET และกระป๋องเครื่องดื่ม', 'weight' => 4.350, 'type_index' => 1], // รีไซเคิล/อันตราย
            ['source' => 'ชุมชนซอยเรวดี ซอย 1-20', 'waste_name' => 'เศษอาหารหมักและขยะเปียกชุมชน', 'weight' => 9.600, 'type_index' => 4], // อินทรีย์
            ['source' => 'อาคารสำนักงานและร้านค้าถนนติวานนท์', 'waste_name' => 'หลอดไฟ แบตเตอรี่ และซากเครื่องใช้ไฟฟ้า', 'weight' => 1.850, 'type_index' => 1], // อันตราย
            ['source' => 'ศูนย์พัฒนาเด็กเล็กและโรงเรียนสังกัดเทศบาล', 'waste_name' => 'เศษกล่องนมและบรรจุภัณฑ์กระดาษ', 'weight' => 3.200, 'type_index' => 2], // โฟม/รีไซเคิล
            ['source' => 'ตลาดสดศรีพรสวรรค์ ท่าน้ำนนท์', 'waste_name' => 'เศษปลา เนื้อสัตว์ และเศษพืชผักสด', 'weight' => 8.900, 'type_index' => 4], // อินทรีย์
            ['source' => 'คอนโดมิเนียมแนวถนนรัตนาธิเบศร์', 'waste_name' => 'ขยะทั่วไปและบรรจุภัณฑ์พลาสติก', 'weight' => 22.400, 'type_index' => 0], // ทั่วไป
            ['source' => 'สถานีอนามัยและคลินิกชุมชนแคราย', 'waste_name' => 'ขยะมูลฝอยติดเชื้อบรรจุถุงแดง', 'weight' => 1.150, 'type_index' => 3], // ติดเชื้อ
            ['source' => 'ชุมชนริมคลองบางกรวย', 'waste_name' => 'ขยะตกค้างริมตลิ่งและชุมชน', 'weight' => 6.700, 'type_index' => 0], // ทั่วไป
        ];
        foreach ($wasteCollections as $i => $row) {
            $date = $dates[$i % count($dates)];
            $typeId = $wasteTypes[$row['type_index'] % count($wasteTypes)];
            DB::table('waste_collections')->updateOrInsert(
                ['source' => $row['source'], 'service_date' => $date],
                [
                    'end_date' => $date,
                    'waste_type_id' => $typeId,
                    'waste_name' => $row['waste_name'],
                    'weight' => $row['weight'],
                    'created_by' => $adminId,
                    'updated_by' => $adminId,
                    'created_at' => $date.' 06:00:00',
                    'updated_at' => $date.' 14:00:00',
                ]
            );
        }

        // 6. Drain Cleanings (งานลอกท่อระบายน้ำ)
        $drainCleanings = [
            ['location' => 'ซอยเรวดี ช่วงปากซอย 1 ถึง ซอย 15', 'distance_km' => 1.80, 'sediment_quantity' => 14.500],
            ['location' => 'ถนนติวานนท์ ซอย 3 และ ซอย 5', 'distance_km' => 1.20, 'sediment_quantity' => 9.200],
            ['location' => 'ซอยงามวงศ์วาน 18 (ซอยจุฬาเกษม)', 'distance_km' => 2.10, 'sediment_quantity' => 18.400],
            ['location' => 'ถนนประชาราษฎร์ รอบตลาดสดเทศบาล', 'distance_km' => 1.50, 'sediment_quantity' => 12.800],
            ['location' => 'หมู่บ้านประชานิเวศน์ 3 ซอย 12-18', 'distance_km' => 2.60, 'sediment_quantity' => 21.000],
            ['location' => 'ซอยพิบูลสงคราม 11 ถึง ท่าน้ำนนทบุรี', 'distance_km' => 1.40, 'sediment_quantity' => 10.600],
            ['location' => 'ถนนรัตนาธิเบศร์ ซอย 17 (ซอยร่วมใจ)', 'distance_km' => 1.90, 'sediment_quantity' => 15.300],
            ['location' => 'ซอยเลี่ยงเมืองนนทบุรี 10', 'distance_km' => 1.10, 'sediment_quantity' => 8.700],
        ];
        foreach ($drainCleanings as $i => $row) {
            $date = $dates[$i % count($dates)];
            DB::table('drain_cleanings')->updateOrInsert(
                ['location' => $row['location'], 'service_date' => $date],
                [
                    'distance_km' => $row['distance_km'],
                    'sediment_quantity' => $row['sediment_quantity'],
                    'created_by' => $adminId,
                    'updated_by' => $adminId,
                    'created_at' => $date.' 08:30:00',
                    'updated_at' => $date.' 16:30:00',
                ]
            );
        }

        // 7. Septic Pumpings (งานสูบสิ่งปฏิกูล)
        $septicPumpings = [
            ['location' => 'อาคารพาณิชย์ ตลาดสดศรีพรสวรรค์ ท่าน้ำนนท์', 'volume' => 8.000, 'fee_amount' => 2000.00],
            ['location' => 'บ้านพักอาศัย ซอยพิบูลสงคราม 22 แยก 3', 'volume' => 4.000, 'fee_amount' => 1000.00],
            ['location' => 'โรงเรียนเทศบาล 1 (ตลาดบางศรีเมือง)', 'volume' => 12.000, 'fee_amount' => 3000.00],
            ['location' => 'ชุมชนวัดลานนาบุญ บ้านเลขที่ 45/12', 'volume' => 3.500, 'fee_amount' => 875.00],
            ['location' => 'ศูนย์พัฒนาเด็กเล็กเทศบาลนครนนทบุรี', 'volume' => 6.000, 'fee_amount' => 1500.00],
            ['location' => 'อาคารพักอาศัยรวม ซอยติวานนท์ 18', 'volume' => 10.000, 'fee_amount' => 2500.00],
            ['location' => 'ร้านอาหารและสถานประกอบการ ถนนเลี่ยงเมืองนนท์', 'volume' => 7.500, 'fee_amount' => 1875.00],
            ['location' => 'บ้านพักอาศัย ถนนประชานิเวศน์ 3 ซอย 8', 'volume' => 4.000, 'fee_amount' => 1000.00],
        ];
        foreach ($septicPumpings as $i => $row) {
            $date = $dates[$i % count($dates)];
            DB::table('septic_pumpings')->updateOrInsert(
                ['location' => $row['location'], 'service_date' => $date],
                [
                    'volume' => $row['volume'],
                    'fee_amount' => $row['fee_amount'],
                    'created_by' => $adminId,
                    'updated_by' => $adminId,
                    'created_at' => $date.' 09:15:00',
                    'updated_at' => $date.' 15:45:00',
                ]
            );
        }

        // 8. Septic Treatments (การบำบัดสิ่งปฏิกูล)
        $septicTreatments = [
            ['sludge_quantity' => 3200.000, 'fertilizer_remaining' => 2150.000, 'microbial_note' => 'เติมน้ำหมักชีวภาพสูตร พด.1 จำนวน 60 ลิตร ควบคุมการกวนตะกอน อุณหภูมิเฉลี่ย 54 องศาเซลเซียส กลิ่นลดลงเป็นปกติ'],
            ['sludge_quantity' => 2800.000, 'fertilizer_remaining' => 1950.000, 'microbial_note' => 'เติมจุลินทรีย์ EM ขยายหัวเชื้อ 40 ลิตร เร่งการย่อยสลายของแข็งในบ่อตกตะกอนที่ 2 คุณภาพน้ำทิ้งผ่านเกณฑ์มาตรฐาน'],
            ['sludge_quantity' => 4100.000, 'fertilizer_remaining' => 2800.000, 'microbial_note' => 'รอบการผลิตปุ๋ยอินทรีย์สูตร 2 เติมแกลบดิบและรำละเอียดผสมคลุกเคล้า ความชื้น 45% บ่มในโรงเรือนเปิด'],
            ['sludge_quantity' => 2400.000, 'fertilizer_remaining' => 1650.000, 'microbial_note' => 'เติมกากน้ำตาลและหัวเชื้อจุลินทรีย์บำบัดกลิ่น 50 ลิตร ระบายตะกอนเข้าลานตากแดดชุดที่ 3'],
            ['sludge_quantity' => 3500.000, 'fertilizer_remaining' => 2400.000, 'microbial_note' => 'บำบัดตะกอนชุดใหม่ เติมจุลินทรีย์ย่อยไขมัน ตรวจวัดค่า pH อยู่ที่ 7.2 อยู่ในเกณฑ์มาตรฐานสิ่งแวดล้อม'],
        ];
        foreach ($septicTreatments as $i => $row) {
            $date = $dates[$i % count($dates)];
            DB::table('septic_treatments')->updateOrInsert(
                ['service_date' => $date],
                [
                    'sludge_quantity' => $row['sludge_quantity'],
                    'fertilizer_remaining' => $row['fertilizer_remaining'],
                    'microbial_note' => $row['microbial_note'],
                    'created_by' => $adminId,
                    'updated_by' => $adminId,
                    'created_at' => $date.' 10:00:00',
                    'updated_at' => $date.' 16:00:00',
                ]
            );
        }

        // 9. Waste Management Projects (โครงการพัฒนาระบบจัดการมูลฝอย)
        $projects = [
            ['project_name' => 'โครงการชุมชนปลอดขยะ (Zero Waste Community) ประจำปีงบประมาณ 2569', 'communities_count' => 18, 'participants_count' => 420],
            ['project_name' => 'โครงการคัดแยกขยะต้นทางและธนาคารขยะในโรงเรียนสังกัดเทศบาลนครนนทบุรี', 'communities_count' => 12, 'participants_count' => 650],
            ['project_name' => 'กิจกรรมตลาดนัดขยะรีไซเคิลแลกไข่ไก่และสินค้าอุปโภค ชุมชนท่าทราย', 'communities_count' => 8, 'participants_count' => 280],
            ['project_name' => 'โครงการผลิตปุ๋ยหมักอินทรีย์และน้ำหมักชีวภาพจากเศษอาหารตลาดสดเทศบาล', 'communities_count' => 6, 'participants_count' => 150],
            ['project_name' => 'อบรมเชิงปฏิบัติการการจัดการขยะอันตรายและขยะอิเล็กทรอนิกส์ในครัวเรือน', 'communities_count' => 14, 'participants_count' => 310],
            ['project_name' => 'รณรงค์ลดการใช้ถุงพลาสติกหูหิ้วและโฟมบรรจุอาหารในตลาดนัดชุมชน', 'communities_count' => 10, 'participants_count' => 220],
        ];
        foreach ($projects as $i => $row) {
            $date = $dates[$i % count($dates)];
            DB::table('waste_management_projects')->updateOrInsert(
                ['project_name' => $row['project_name']],
                [
                    'service_date' => $date,
                    'communities_count' => $row['communities_count'],
                    'participants_count' => $row['participants_count'],
                    'created_by' => $adminId,
                    'updated_by' => $adminId,
                    'created_at' => $date.' 09:00:00',
                    'updated_at' => $date.' 15:00:00',
                ]
            );
        }

        // 10. Audit Logs (บันทึกประวัติการดำเนินงาน)
        $actions = [
            ['action' => 'activity.created', 'subject_type' => 'App\\Models\\RoadWashing', 'details' => 'บันทึกการล้างทำความสะอาดถนนติวานนท์'],
            ['action' => 'activity.created', 'subject_type' => 'App\\Models\\WasteCollection', 'details' => 'บันทึกงานเก็บขนมูลฝอยตลาดสดเทศบาล'],
            ['action' => 'activity.created', 'subject_type' => 'App\\Models\\WaterwayCleaning', 'details' => 'บันทึกการกำจัดผักตบชวาคลองบางตลาด'],
            ['action' => 'user.login', 'subject_type' => 'App\\Models\\User', 'details' => 'เข้าสู่ระบบสำเร็จโดย admin'],
            ['action' => 'reference.updated', 'subject_type' => 'App\\Models\\CleaningZone', 'details' => 'ปรับปรุงข้อมูลเขตรักษาความสะอาด'],
            ['action' => 'activity.created', 'subject_type' => 'App\\Models\\DrainCleaning', 'details' => 'บันทึกงานลอกท่อระบายน้ำซอยเรวดี'],
            ['action' => 'activity.created', 'subject_type' => 'App\\Models\\SepticPumping', 'details' => 'บันทึกงานสูบสิ่งปฏิกูลตลาดสดศรีพรสวรรค์'],
            ['action' => 'report.exported', 'subject_type' => null, 'details' => 'ส่งออกรายงานภาพรวมฝ่ายบริการ'],
        ];
        foreach ($actions as $i => $act) {
            $date = $dates[$i % count($dates)];
            DB::table('audit_logs')->insert([
                'actor_id' => $adminId,
                'action' => $act['action'],
                'subject_type' => $act['subject_type'],
                'subject_id' => ($i + 1),
                'before' => null,
                'after' => json_encode(['note' => $act['details']], JSON_UNESCAPED_UNICODE),
                'ip_address' => '127.0.0.1',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ServiceHub/1.0',
                'created_at' => $date.' 11:'.sprintf('%02d', 10 + $i * 5).':00',
            ]);
        }
    }
}
