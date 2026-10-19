-- สำรองฐานก่อนรัน คงคอลัมน์และสถานที่เก่าไว้ ไม่ต้อง DROP COLUMN
ALTER TABLE `septic_pumpings`
    MODIFY COLUMN `location` VARCHAR(500) NULL;

-- บันทึกเมื่อคำสั่งด้านบนสำเร็จแล้วเท่านั้น
INSERT INTO `migrations` (`migration`, `batch`)
SELECT '2026_10_19_000003_make_septic_pumping_location_optional', `next_batch`
FROM (SELECT COALESCE(MAX(`batch`), 0) + 1 AS `next_batch` FROM `migrations`) AS `migration_batch`
WHERE NOT EXISTS (
    SELECT 1 FROM `migrations`
    WHERE `migration` = '2026_10_19_000003_make_septic_pumping_location_optional'
);
