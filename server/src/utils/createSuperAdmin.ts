import bcrypt from "bcrypt";
import User from "../schemas/user.schema";
import RoleUser from "../enum/role.enum";

const createSuperAdmin = async () => {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "Super Admin";

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
      throw new Error(
        "Environment variables ADMIN_EMAIL or ADMIN_PASSWORD are missing"
      );
    }

    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
      const superAdmin = new User({
        email: ADMIN_EMAIL,
        password: hashedPassword,
        username: ADMIN_USERNAME,
        isApproved: true,
        role: RoleUser.ADMIN,
      });

      await superAdmin.save();
      console.log("Super Admin created");
    } else {
      console.log("Super Admin already exists");
    }
  } catch (error) {
    console.error("Error creating Super Admin:", error);
  }
};

export default createSuperAdmin;
