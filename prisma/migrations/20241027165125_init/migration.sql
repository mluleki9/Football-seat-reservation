/*
  Warnings:

  - You are about to drop the column `reserved_seats` on the `reservation` table. All the data in the column will be lost.
  - Added the required column `email` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `reserved_seats`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
