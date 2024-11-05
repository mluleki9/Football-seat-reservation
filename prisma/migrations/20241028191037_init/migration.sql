/*
  Warnings:

  - You are about to alter the column `available_slots` on the `match` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `match` MODIFY `available_slots` INTEGER NOT NULL;
