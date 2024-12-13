import {User, Profile} from "@prisma/client";

export type UserProfile = Omit<Profile, "userId"> & {user:  Omit<User, 'hash'>};
