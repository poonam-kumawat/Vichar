import mongoose, { Schema, model, ObjectId } from "mongoose";

interface user{
    email:string;
    name:string;
    password:string;
}

const userSchema = new Schema<user>(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String },
  },
  { versionKey: false }
);

export default model<user>("user",userSchema);