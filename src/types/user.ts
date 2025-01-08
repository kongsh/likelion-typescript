interface User {
  id: number | string;
  name: string;
  gender: string;
  age: number;
}

export type RequestUser = Omit<User, "id">;

export default User;
