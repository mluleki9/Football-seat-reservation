/*
  Warnings:

  - You are about to drop the column `auth0Id` on the `user` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_auth0Id_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `auth0Id`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
