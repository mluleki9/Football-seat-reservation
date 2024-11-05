/*
  Warnings:

  - You are about to alter the column `available_slots` on the `match` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `teams` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `match` ADD COLUMN `teams` VARCHAR(191) NOT NULL,
    MODIFY `available_slots` INTEGER NOT NULL;
