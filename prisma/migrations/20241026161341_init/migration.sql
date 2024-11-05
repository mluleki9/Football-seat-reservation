/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Users_email_key` ON `users`;

-- CreateIndex
CREATE UNIQUE INDEX `Users_userId_key` ON `Users`(`userId`);
