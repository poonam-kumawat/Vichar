import mongoose, { ObjectId, Schema, model } from "mongoose";

interface blog {
  title: string;
  type: string;
  description: string;
  timeStamp:Date;
  creator:ObjectId
}

const blogSchema = new Schema<blog>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    timeStamp: { type: Date, default: Date.now },
    creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { versionKey: false }
);

export default model<blog>("blog", blogSchema);
