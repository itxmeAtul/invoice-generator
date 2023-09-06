// models/user.ts
import mongoose, { Document, Schema, model, models } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// export default mongoose.model<UserDocument>("User", userSchema);
const UserModel = models.User || model<UserDocument>("User", userSchema);
export default UserModel;
