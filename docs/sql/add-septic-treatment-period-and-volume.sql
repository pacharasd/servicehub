-- เพิ่มคอลัมน์ end_date และ treated_volume สำหรับหมวดการบำบัดสิ่งปฏิกูล (septic_treatments)
ALTER TABLE `septic_treatments`
    ADD COLUMN `end_date` DATE NULL AFTER `service_date`,
    ADD COLUMN `treated_volume` DECIMAL(14, 3) NOT NULL DEFAULT 0.000 AFTER `end_date`;

UPDATE `septic_treatments`
SET `end_date` = `service_date`
WHERE `end_date` IS NULL;

ALTER TABLE `septic_treatments`
    MODIFY COLUMN `end_date` DATE NOT NULL;

-- บันทึกประวัติ migration เมื่อคำสั่งด้านบนสำเร็จ
INSERT INTO `migrations` (`migration`, `batch`)
SELECT '2026_10_19_000004_add_septic_treatment_period_and_volume', `next_batch`
FROM (SELECT COALESCE(MAX(`batch`), 0) + 1 AS `next_batch` FROM `migrations`) AS `migration_batch`
WHERE NOT EXISTS (
    SELECT 1 FROM `migrations`
    WHERE `migration` = '2026_10_19_000004_add_septic_treatment_period_and_volume'
);
