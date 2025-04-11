import { BadRequestException, Injectable } from '@nestjs/common'
import { ZodError, ZodIssue, ZodObject, ZodRawShape } from 'zod'

@Injectable()
export class Validator {
  validate<T extends ZodRawShape>(schema: ZodObject<T>, data: any): ZodIssue[] {
    try {
      schema.parse(data)

      return []
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return error.errors
      }

      throw new BadRequestException('Invalid data')
    }
  }
}
