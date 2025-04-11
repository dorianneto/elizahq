import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { contactsProviders } from './contacts.providers';
import { DatabaseModule } from 'src/database/database.module';
import { ValidatorModule } from 'src/validator/validator.module';

@Module({
  imports: [DatabaseModule, ValidatorModule],
  controllers: [ContactsController],
  providers: [ContactsService, ...contactsProviders],
})
export class ContactsModule {}
