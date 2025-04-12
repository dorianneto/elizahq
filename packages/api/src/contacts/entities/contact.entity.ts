import mongoose from 'mongoose'
import { z } from 'zod'

export const ContactSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    nickname: String,
    birthdate: Date,
  },
  { timestamps: true, collection: 'contacts' },
)

export const CreateContactValidationSchema = z.object({
  first_name: z.string().nonempty('First name is required'),
  last_name: z.string().nonempty('Last name is required'),
  nickname: z.string().optional(),
  birthdate: z.string().optional(),
})
