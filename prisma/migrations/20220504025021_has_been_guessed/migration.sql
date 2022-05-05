/*
  Warnings:

  - You are about to drop the column `hasVisited` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `lattitude` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "hasVisited",
DROP COLUMN "lattitude",
DROP COLUMN "longitude",
ADD COLUMN     "hasBeenGuessed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasBeenVisited" BOOLEAN NOT NULL DEFAULT false;
