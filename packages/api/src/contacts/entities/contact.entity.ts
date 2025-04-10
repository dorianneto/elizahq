import mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    nickname: String,
    birthdate: Date,
  },
  { timestamps: true, collection: 'contacts' },
);
