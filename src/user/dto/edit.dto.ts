import {z} from 'zod';
import {RatingArea} from "@prisma/client";

const ProfileRatingSchema = z.object({
  area: z.nativeEnum(RatingArea),
  value: z.number().min(0).max(10),
})
export const profileSchema = z.object({
  name: z.string().trim().min(1).max(64),
  bio: z.string(),
  rating: z.array(ProfileRatingSchema).superRefine((ratings, ctx) => {
    const seenAreas = new Set();
    ratings.forEach((rating, index) => {
      if (seenAreas.has(rating.area)) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate RatingArea: ${rating.area} for the same profile.`,
          path: [index, "area"], // Point to the specific area that failed validation
        });
      } else {
        seenAreas.add(rating.area);
      }
    })
  }),
  focus: z.array(z.nativeEnum(RatingArea)).min(1).max(3),
});
export const editProfileSchema = profileSchema.partial().superRefine((profile, ctx) => {
   if (!Object.keys(profile).length) {
    ctx.addIssue({
      code: "custom",
      message: `At least one of ${Object.keys(profileSchema.shape).map(key=>`'${key}'`).join(", ")} must be provided.`
    })
  }
});

export type EditProfileDto = z.infer<typeof editProfileSchema>;
