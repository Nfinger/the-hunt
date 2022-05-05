/*
  Warnings:

  - A unique constraint covering the columns `[boldWord]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "boldWord" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "Location_boldWord_key" ON "Location"("boldWord");
