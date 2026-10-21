-- เพิ่มคอลัมน์ end_date สำหรับหมวดงานลอกท่อระบายน้ำ (drain_cleanings)
ALTER TABLE `drain_cleanings`
    ADD COLUMN IF NOT EXISTS `end_date` DATE NULL AFTER `service_date`;

UPDATE `drain_cleanings`
SET `end_date` = `service_date`
WHERE `end_date` IS NULL;

ALTER TABLE `drain_cleanings`
    MODIFY COLUMN `end_date` DATE NOT NULL;

-- บันทึกประวัติ migration เมื่อคำสั่งด้านบนสำเร็จ
INSERT INTO `migrations` (`migration`, `batch`)
SELECT '2026_10_21_000001_add_end_date_to_drain_cleanings', `next_batch`
FROM (SELECT COALESCE(MAX(`batch`), 0) + 1 AS `next_batch` FROM `migrations`) AS `migration_batch`
WHERE NOT EXISTS (
    SELECT 1 FROM `migrations`
    WHERE `migration` = '2026_10_21_000001_add_end_date_to_drain_cleanings'
);
