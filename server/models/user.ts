import mongoose, { ObjectId, Schema, model} from "mongoose";

interface user {
  email: string;
  name: string;
  password: string;
  timeStamp: Date;
  profilePicture:string;
  blogs:[ObjectId];
  about:string;
}

const userSchema = new Schema<user>(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String },
    timeStamp: { type: Date, default: Date.now },
    profilePicture: { type: String },
    about: { type: String },
    blogs: { type: [mongoose.Types.ObjectId], ref: "Blog" },
  },
  { versionKey: false }
);

export default model<user>("user",userSchema);