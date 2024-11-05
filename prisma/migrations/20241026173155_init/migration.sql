/*
  Warnings:

  - You are about to drop the column `eventId` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `reservedAt` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `match_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reserved_seats` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_eventId_fkey`;

-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `eventId`,
    DROP COLUMN `reservedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `match_id` INTEGER NOT NULL,
    ADD COLUMN `reservation_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `reserved_seats` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `event`;

-- CreateTable
CREATE TABLE `Match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `match_name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `available_slots` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Reservation_match_id_idx` ON `Reservation`(`match_id`);

-- CreateIndex
CREATE INDEX `Reservation_user_id_idx` ON `Reservation`(`user_id`);

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_match_id_fkey` FOREIGN KEY (`match_id`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
