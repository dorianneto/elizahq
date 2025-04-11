import { Module } from '@nestjs/common';
import { Validator } from './validator';

@Module({
  providers: [Validator],
  exports: [Validator],
})
export class ValidatorModule {}
