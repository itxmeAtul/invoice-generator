// models/user.ts
import mongoose, { Document, Schema, model, models } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  password: string;
  email:string;
  mobileNo:number;
  firstName:string;
  lastName:string;
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  mobileNo: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

// export default mongoose.model<UserDocument>("User", userSchema);
const UserModel = models.User || model<UserDocument>("User", userSchema);
export default UserModel;
