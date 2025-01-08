export interface User {
  id: number;
  name: string;
  gender: string;
  age: number;
}

export type RequestUser = Omit<User, "id">;
