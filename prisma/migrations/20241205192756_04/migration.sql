-- DropIndex
DROP INDEX "UserRating_area_key";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "focus" "RatingArea"[];

-- AlterTable
ALTER TABLE "UserRating" ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "UserRating_pkey" PRIMARY KEY ("id");
