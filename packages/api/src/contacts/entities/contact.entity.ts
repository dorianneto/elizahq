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
  first_name: z.string(),
  last_name: z.string(),
  nickname: z.string(),
  birthdate: z.string(),
})
