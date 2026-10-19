-- สำรองฐานก่อนรัน ใช้กับเซิร์ฟเวอร์ที่ยังไม่มีสองคอลัมน์นี้ รันครั้งเดียว
ALTER TABLE `septic_pumpings`
    ADD COLUMN `end_date` DATE NULL,
    ADD COLUMN `service_users_count` INT UNSIGNED NULL;

UPDATE `septic_pumpings`
SET `end_date` = `service_date`
WHERE `end_date` IS NULL;

ALTER TABLE `septic_pumpings`
    MODIFY COLUMN `end_date` DATE NOT NULL;

-- รันส่วนนี้หลังคำสั่งด้านบนสำเร็จทั้งหมดเท่านั้น
INSERT INTO `migrations` (`migration`, `batch`)
SELECT '2026_10_19_000002_add_septic_pumping_service_period_and_users', `next_batch`
FROM (SELECT COALESCE(MAX(`batch`), 0) + 1 AS `next_batch` FROM `migrations`) AS `migration_batch`
WHERE NOT EXISTS (
    SELECT 1 FROM `migrations`
    WHERE `migration` = '2026_10_19_000002_add_septic_pumping_service_period_and_users'
);
