import bcrypt from "bcrypt";
import User, { IUser } from "../schemas/user.schema";
import BaseError from "../utils/base.error";
import jwt from "../utils/jwt";
import IJwtUser from "../types/user";

class AuthService {
  async register(email: string, password: string, username: string) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw BaseError.BadRequest("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });
    await newUser.save();
    return "User registered successfully.";
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    const isMatched = await bcrypt.compare(password, user?.password || "");
    if (!user || !isMatched) {
      throw BaseError.BadRequest("Invalid email or password");
    }
    if (!user.isApproved) {
      throw BaseError.BadRequest("User not approved");
    }
    const userDto: IJwtUser = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(userDto);
    return { user: userDto, ...token };
  }

  async getUser(tokenUser: IJwtUser) {
    const user = await User.findById(tokenUser.sub);
    if (!user) {
      throw BaseError.UnauthorizedError();
    }
    const userDto: IJwtUser = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    return { user: userDto };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw BaseError.UnauthorizedError();
    }

    const userPayload = jwt.validateRefreshToken(refreshToken);
    if (!userPayload) {
      throw BaseError.UnauthorizedError();
    }

    const user = await User.findById(userPayload.sub);
    if (!user) {
      throw BaseError.BadRequest("User not found");
    }
    const userDto: IJwtUser = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };
    const accessToken = jwt.signrefresh(userDto);
    return { user: userDto, accessToken };
  }
}

export default new AuthService();
