import User, { IUser } from "../schemas/user.schema";
import BaseError from "../utils/base.error";
import mongoose from "mongoose";
import RoleUser from "../enum/role.enum";

class UserService {
  async findUserById(id: string): Promise<IUser> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw BaseError.BadRequest("Invalid ID format");
    }

    const user = await User.findById(id).select("-password -__v");
    if (!user) {
      throw BaseError.BadRequest("User not found");
    }
    return user;
  }

  async findAll(): Promise<IUser[]> {
    const users = await User.find().select("-password -__v");
    if (!users) {
      throw BaseError.BadRequest("User not found");
    }
    return users;
  }

  async delete(id: string, updaterId: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw BaseError.BadRequest("Invalid user ID format");
    }

    const user = await User.findById(id);
    if (!user) {
      throw BaseError.BadRequest("User not found");
    }

    const updateUser = await User.findById(updaterId);
    if (!updateUser) {
      throw BaseError.UnauthorizedError();
    }

    if (user.role == RoleUser.ADMIN) {
      throw BaseError.BadRequest("Cannot delete ADMIN");
    }

    if (
      user.role === RoleUser.SUPERUSER &&
      updateUser.role === RoleUser.SUPERUSER
    ) {
      throw BaseError.BadRequest(
        "A SUPERUSER cannot delete another SUPERUSER."
      );
    }
    await User.findByIdAndDelete(id);
    return "User deleted successfully";
  }

  async approvUser(id: string, updaterId: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw BaseError.BadRequest("Invalid user ID format");
    }

    const user = await User.findById(id);
    if (!user) {
      throw BaseError.BadRequest("User not found");
    }

    if (user.isApproved) {
      throw BaseError.BadRequest("User already approved");
    }

    const updateUser = await User.findById(updaterId);
    if (!updateUser) {
      throw BaseError.UnauthorizedError();
    }

    if (user.updatedBy) {
      if (user.updatedBy == RoleUser.ADMIN && user.role == updateUser.role) {
        throw BaseError.BadRequest(
          "Disabled on the admin side, Only admins can approve users"
        );
      }
    }
    user.isApproved = true;
    user.updatedBy = updateUser.role;
    user.role = RoleUser.SUPERUSER;
    await user.save();

    return "User approved successfully";
  }

  async disableUserByAdmin(userId: string, updater: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw BaseError.BadRequest("Invalid ID format");
    }

    const adminUser = await User.findById(updater);
    if (!adminUser || adminUser.role !== RoleUser.ADMIN) {
      throw BaseError.BadRequest("Only admins can disable users");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw BaseError.BadRequest("User not found");
    }
    if (user.role == RoleUser.ADMIN) {
      throw BaseError.BadRequest("Cannot delete admin");
    }

    if (!user.isApproved) {
      throw BaseError.BadRequest("User already disabled");
    }

    user.isApproved = false;
    user.updatedBy = adminUser.role;
    await user.save();

    return "User disabled successfully";
  }
}

export default new UserService();
