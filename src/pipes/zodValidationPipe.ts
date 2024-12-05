import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import {ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata): any {
    const parsedValue = this.schema.safeParse(value);
    if (parsedValue.success) return parsedValue.data;

    throw new BadRequestException(parsedValue.error.format());
  }
}
