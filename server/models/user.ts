import { Schema, model} from "mongoose";

interface user {
  email: string;
  name: string;
  password: string;
  timeStamp: Date;
}

const userSchema = new Schema<user>(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String },
    timeStamp: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default model<user>("user",userSchema);