import { Schema, model } from "mongoose";

interface blog {
  title: string;
  type: string;
  description: string;
}

const blogSchema = new Schema<blog>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
  },
  { versionKey: false }
);

export default model<blog>("blog", blogSchema);
