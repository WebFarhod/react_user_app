import mongoose, { Document, Schema } from "mongoose";
import RoleUser from "../enum/role.enum";

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  isApproved: boolean;
  role: RoleUser;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: RoleUser;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(RoleUser),
      default: RoleUser.USER,
    },
    updatedBy: {
      type: String,
      enum: Object.values(RoleUser),
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
