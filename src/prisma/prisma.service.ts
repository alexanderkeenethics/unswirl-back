import { Injectable } from '@nestjs/common';
import {PrismaClient} from "@prisma/client";
import * as process from "node:process";

@Injectable()
export class PrismaService  extends PrismaClient {
  constructor() {
    super({
      datasources:{
        db: {
          url: process.env.DATABASE_URL,
        }
      }
    });
  }
}
