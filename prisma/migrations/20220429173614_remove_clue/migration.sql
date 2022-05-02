/*
  Warnings:

  - You are about to drop the `Clue` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clue]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clue` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Clue" DROP CONSTRAINT "Clue_locationId_fkey";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "clue" TEXT NOT NULL;

-- DropTable
DROP TABLE "Clue";

-- CreateIndex
CREATE UNIQUE INDEX "Location_clue_key" ON "Location"("clue");
