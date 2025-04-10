import mongoose from 'mongoose';

export const ContactSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
  },
  { timestamps: true, collection: 'contacts' },
);
