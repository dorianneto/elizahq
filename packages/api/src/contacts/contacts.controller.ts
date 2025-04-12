import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common'
import { ContactsService } from './contacts.service'
import { CreateContactDto } from './dto/create-contact.dto'
import { UpdateContactDto } from './dto/update-contact.dto'
import { Validator } from 'src/validator/validator'
import { CreateContactValidationSchema } from './entities/contact.entity'

@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
    private validator: Validator,
  ) {}

  @Post()
  create(@Body() payload: CreateContactDto) {
    this.validator.validate(CreateContactValidationSchema, payload)

    if (this.validator.hasErrors()) {
      throw new BadRequestException(this.validator.getErrors())
    }

    const contact = new CreateContactDto()
    contact.first_name = payload.first_name
    contact.last_name = payload.last_name
    contact.nickname = payload.nickname
    contact.birthdate = payload.birthdate

    return this.contactsService.create(contact)
  }

  @Get()
  async findAll(@Query('page') page: number) {
    const result = await this.contactsService.findAll(page);
    return result[0];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(id, updateContactDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id)
  }
}
