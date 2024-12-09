import {z} from 'zod';
import {profileSchema} from "@/user/dto";

export const initialChatSchema = profileSchema.omit({name: true, bio: true}).extend({
  sessionId: z.string().uuid().optional(),
  message: z.string().trim().min(1).optional().default("hi there!"),
});
export type InitialChatDto  = z.infer<typeof initialChatSchema>;
