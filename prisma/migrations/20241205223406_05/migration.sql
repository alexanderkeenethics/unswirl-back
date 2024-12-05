/*
  Warnings:

  - The primary key for the `UserRating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserRating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId,area]` on the table `UserRating` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "UserRating" DROP CONSTRAINT "UserRating_pkey",
DROP COLUMN "id";

-- CreateIndex
CREATE UNIQUE INDEX "UserRating_profileId_area_key" ON "UserRating"("profileId", "area");
