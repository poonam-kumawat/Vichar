import mongoose, { ObjectId, Schema, model } from "mongoose";

interface blog {
  title: string;
  type: string;
  description: string;
  timeStamp: Date;
  creator: ObjectId;
  images: string[];
  subtitle: string;
}

const blogSchema = new Schema<blog>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String },
    timeStamp: { type: Date, default: Date.now },
    creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    images: [{ type: String }],
    subtitle: { type: String },
  },
  { versionKey: false }
);
blogSchema.pre("save", function (next) {
  const blog = this as any;
  const descriptionText = blog.description
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " "); 
  blog.subtitle = descriptionText.split(/\s+/).slice(0, 80).join(" ");
  next();
});

export default model<blog>("blog", blogSchema);
