import RoleUser from "../enum/role.enum";

type IJwtUser = {
  sub: string;
  username: string;
  email: string;
  role: RoleUser;
};
export default IJwtUser;
