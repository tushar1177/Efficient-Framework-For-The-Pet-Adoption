// import mongoose from 'mongoose';

// const petSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//   },
//   breed: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
// });

// const Pet = mongoose.model('Pet', petSchema);
// export default Pet;

import mongoose, { Schema } from "mongoose";

const petSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    category: { type: String, required: true },
    sex: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number },
    phone: { type: String, required: true },
    image: { type: String }, // Add image field
  },
  { timestamps: true }
);

export const Pet = mongoose.model("Pet", petSchema);
export default Pet;