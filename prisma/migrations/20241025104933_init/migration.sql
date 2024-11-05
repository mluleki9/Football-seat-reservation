/*
  Warnings:

  - Added the required column `userId` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `userId` VARCHAR(191) NOT NULL;
