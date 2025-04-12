import { Injectable, Scope } from '@nestjs/common'
import { ZodError, ZodIssue, ZodObject, ZodRawShape } from 'zod'

@Injectable({ scope: Scope.REQUEST })
export class Validator {
  private errors: ZodIssue[] = []

  validate<T extends ZodRawShape>(schema: ZodObject<T>, data: any): void {
    try {
      schema.parse(data)
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        this.errors = error.errors
      }
    }
  }

  getErrors(): ZodIssue[] {
    return this.errors
  }

  hasErrors(): boolean {
    return this.errors.length > 0
  }
}
