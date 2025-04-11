import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common'
import { ContactsService } from './contacts.service'
import { CreateContactDto } from './dto/create-contact.dto'
import { UpdateContactDto } from './dto/update-contact.dto'
import { z } from 'zod'
import { Validator } from 'src/validator/validator'

@Controller('contacts')
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly validator: Validator,
  ) {}

  @Post()
  create(@Body() payload: CreateContactDto) {
    const CreateContactSchema = z.object({
      first_name: z.string(),
      last_name: z.string(),
      nickname: z.string(),
      birthdate: z.string(),
    })

    const errors = this.validator.validate(CreateContactSchema, payload)

    if (errors.length > 0) {
      throw new BadRequestException(errors)
    }

    const contact = new CreateContactDto()
    contact.first_name = payload.first_name
    contact.last_name = payload.last_name
    contact.nickname = payload.nickname
    contact.birthdate = payload.birthdate

    return this.contactsService.create(contact)
  }

  @Get()
  findAll() {
    return this.contactsService.findAll()
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
