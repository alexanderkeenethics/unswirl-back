import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {EditProfileDto} from "./dto";


@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  getProfileById(profileId: string, userId: string) {
    return this.prisma.profile.findUnique({
      where: {id: profileId, userId: userId},
      select: {
        id: true,
        name: true,
        bio: true,
        rating: true,
        focus: true,
        user: {
          select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          }
        }
      }
    });
  }

  async updateProfileById(profileId: string, updData: EditProfileDto) {
    const data = {} as Omit<EditProfileDto, "rating">;
    Object.keys(updData).forEach(key => {
      if (key !== "rating") {
        data[key] = updData[key];
      }
    })

    const operations = []
    operations.push(this.prisma.profile.update({where: {id: profileId}, data}));

    if (updData.hasOwnProperty("rating")) {
      updData.rating.forEach(rating => operations.push(this.prisma.userRating.upsert({
        where: {
          profileId_area:{profileId, area: rating.area}
        },
        create: {profileId, area: rating.area, value: rating.value},
        update: {value: rating.value}
      })));
    }

    return await Promise.all(operations);
  }
}
