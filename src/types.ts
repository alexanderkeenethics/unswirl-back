import {User} from "@prisma/client";

export type UserProfile = {
  "id": string,
  "name": string,
  "bio": string|null,
  "user": Omit<User, 'hash'>
}
