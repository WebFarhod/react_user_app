export interface IUser {
  user: {
    sub: string;
    email: string;
    username: string;
    role: string;
  };
  accessToken: string | null;
}
