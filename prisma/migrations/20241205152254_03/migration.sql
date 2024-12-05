-- CreateEnum
CREATE TYPE "RatingArea" AS ENUM ('SELF_IMAGE', 'CAREER', 'FINANCE', 'HEALTH', 'LIFESTYLE', 'FAMILY', 'ROMANCE', 'RECREATION', 'CONTRIBUTION', 'PERSONAL_GROWTH', 'RELIGION');

-- CreateTable
CREATE TABLE "UserRating" (
    "profileId" UUID NOT NULL,
    "area" "RatingArea" NOT NULL,
    "value" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRating_area_key" ON "UserRating"("area");

-- AddForeignKey
ALTER TABLE "UserRating" ADD CONSTRAINT "UserRating_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
