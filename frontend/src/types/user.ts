type User = {
  id: string,
  name: string;
}

export type UserData = User & {
  email: string;
  token: string;
};