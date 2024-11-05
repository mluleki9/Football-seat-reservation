-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_user_id_fkey`;

-- AlterTable
ALTER TABLE `reservation` MODIFY `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
