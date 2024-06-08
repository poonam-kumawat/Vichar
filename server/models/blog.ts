import { Schema, model } from "mongoose";

interface blog {
  title: string;
  type: string;
  description: string;
  timeStamp:Date;
}

const blogSchema = new Schema<blog>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    timeStamp: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default model<blog>("blog", blogSchema);
