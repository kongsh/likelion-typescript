import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { RequestUser, User } from "../types/user";

const filePath: string = resolve(__dirname, "../data/users.json");

// data/users.json 파일 읽기
export async function readUsers(): Promise<User[]> {
  const usersString = await readFile(filePath, { encoding: "utf-8" });

  return await JSON.parse(usersString);
}
// data/users.json 파일에 쓰기
export async function writeUsers(updatedUsers: User[]) {
  await writeFile(filePath, JSON.stringify(updatedUsers, null, 2), { encoding: "utf-8" });
}

export function isUser(data: any) {
  const keys: (keyof RequestUser)[] = ["name", "gender", "age"];

  return keys.every((key) => key in data);
}
