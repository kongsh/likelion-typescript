import { Request, Response } from "express";
import { readUsers, writeUsers } from "../lib/users";
import { RequestUser, User } from "../types/user";

// CREATE ----------------------------------------------------------------------------------------------------
// `POST /api/users`
export const createUserHandler = async (req: Request<{}, {}, RequestUser>, res: Response) => {
  // 클라이언트 요청(JSON) 받기
  // console.log(req.body.gender);

  // 서버 프로그래밍
  // 1. 데이터 파일 읽기
  const users: User[] = await readUsers();

  // 새롭게 생성될 사용자(User) 객체
  // const newId = crypto.randomUUID();
  const newId = users.length + 1;
  const newUser: User = {
    id: newId,
    ...req.body,
  };

  // 2. 데이터 파일 쓰기
  // 기존의 Users 배열에 새 Users 추가

  try {
    users.push(newUser);
    await writeUsers(users);

    // 클라이언트에 응답
    // 성공한 경우
    res.status(201).json(newUser);
  } catch (err: unknown) {
    // 실패한 경우
    res.status(401).json({
      message: (err as Error).message,
    });
  }
};

// READ ----------------------------------------------------------------------------------------------------
// `GET /api/users`
export const readAllUsersHandler = async (req: Request, res: Response<User[] | { message: string } | void>) => {
  try {
    const users = await readUsers();

    res.status(200).json(users);
  } catch (err: unknown) {
    res.status(500).json({
      message: "알 수 없는 오류가 발생했습니다.",
    });
  }
};

// `GET /api/users/:id`
export const readUserByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const users = await readUsers();

    // 요청된 ID 값과 일치하는 사용자가 존재하는지 검토
    const requestedUser = users.find((user) => user.id === Number(id));
    if (requestedUser) {
      // 요청한 사용자 정보가 있을 경우

      res.status(200).json(requestedUser);
    } else {
      // 요청한 사용자 정보가 없을 경우
      res.status(404).json({
        message: "요청한 사용자 정보가 존재하지 않습니다.",
      });
    }
  } catch (err: unknown) {
    res.status(500).json({
      message: "알 수 없는 오류가 발생했습니다.",
    });
  }
};

// UPDATE ----------------------------------------------------------------------------------------------------

export const putUserHandler = async (req: Request, res: Response) => {};
export const patchUserHandler = async (req: Request, res: Response) => {};

// DELETE ----------------------------------------------------------------------------------------------------

export const deleteUserHandler = async (req: Request, res: Response) => {
  // REQUEST
  const { id } = req.params;
  // READ
  const users = await readUsers();

  try {
    // find user
    const user = users.find((user) => user.id === Number(id));

    if (user) {
      // WRITE
      const willUpdateUsers = users.filter((user) => user.id !== Number(id));
      await writeUsers(willUpdateUsers);
      // RESPONSE
      res.status(200).json({});
    } else {
      // RESPONSE
      res.status(404).json({
        message: "요청한 ID ${id} 사용자 정보를 찾을 수 없습니다..",
      });
    }
  } catch (err: unknown) {
    res.status(500).json({
      message: "알 수 없는 오류가 발생했습니다.",
    });
  }
};
