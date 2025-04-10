import { Inject, Injectable } from '@nestjs/common'
import { CreateContactDto } from './dto/create-contact.dto'
import { UpdateContactDto } from './dto/update-contact.dto'
import { Model, Types } from 'mongoose'
import { Contact } from './interfaces/contact.interface'

@Injectable()
export class ContactsService {
  constructor(
    @Inject('CONTACTS_MODEL') private contactsModel: Model<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    return await this.contactsModel.insertOne(createContactDto)
  }

  async findAll() {
    return await this.contactsModel.find({})
  }

  async findOne(id: string) {
    return await this.contactsModel.findOne({ _id: new Types.ObjectId(id) })
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    return await this.contactsModel.findOneAndUpdate({ id }, updateContactDto)
  }

  async remove(id: number) {
    return await this.contactsModel.deleteOne({ id })
  }
}
