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

  async findAll(page: number) {
    const skip = (page - 1) * 10

    const contacts: { data: Contact[]; pagination: { count: number }[] }[] =
      await this.contactsModel.aggregate([
        {
          $facet: {
            data: [{ $match: {} }, { $skip: skip }, { $limit: 10 }],
            pagination: [
              {
                $group: {
                  _id: null,
                  count: { $sum: 1 },
                },
              },
            ],
          },
        },
      ])

    return contacts
  }

  async findOne(id: string) {
    return await this.contactsModel.findOne({ _id: new Types.ObjectId(id) })
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    return await this.contactsModel.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateContactDto,
    )
  }

  async remove(id: number) {
    return await this.contactsModel.deleteOne({ id })
  }
}
