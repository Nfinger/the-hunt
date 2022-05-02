/*
  Warnings:

  - You are about to drop the column `userId` on the `Progress` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_userId_fkey";

-- DropIndex
DROP INDEX "Progress_userId_key";

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "userId";
