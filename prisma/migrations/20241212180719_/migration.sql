/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "sessionId" TEXT;

-- CreateTable
CREATE TABLE "UserTask" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "profileId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "area" "RatingArea",
    "parentId" UUID,

    CONSTRAINT "UserTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_sessionId_key" ON "Profile"("sessionId");

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTask" ADD CONSTRAINT "UserTask_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "UserTask"("id") ON DELETE SET NULL ON UPDATE CASCADE;
