// --------------------------------------------------------------------------
// TypeScript + Express.js를 활용해 간단한 API 서버 구성
// --------------------------------------------------------------------------
//
// 라우팅은 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 어떻게 응답할지 결정하는 것을 말하며,
// 이는 URI(또는 경로)와 특정 HTTP 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)입니다.
// 각 경로에는 하나 이상의 핸들러 함수가 있을 수 있으며, 이 함수는 경로가 일치할 때 실행됩니다.
//
// 이미지, 스타일, 스크립트 파일과 같은 정적 파일을 제공하려면 기본 제공되는 미들웨어 함수를 사용합니다.
// 여러 정적 에셋 디렉토리를 사용하려면 express.static 미들웨어 함수를 여러 번 호출합니다.
//
// --------------------------------------------------------------------------
import "dotenv/config";
import express from "express";
import { resolve } from "node:path";
import type { Express, Request } from "express";
import User, { RequestUser } from "./types/user";
import { readFile, writeFile } from "node:fs/promises";
import { readUsers, writeUsers } from "./lib/users";

/* Application ------------------------------------------------------------------- */
const app: Express = express();

const HOSTNAME = "localhost";
const PORT = Number(process.env.PORT) ?? 4000;
const MESSAGE = `웹 서버 구동 http://${HOSTNAME}:${PORT}`;

/* Middleware ------------------------------------------------------------------- */

// app.use(greetingMessage);
app.use(express.static(resolve(__dirname, "../public")));
app.use(express.json());

/* Routing ------------------------------------------------------------------ */
//
// 라우팅은 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 어떻게 응답할지 결정하는 것을 말하며,
// 이는 URI(또는 경로)와 특정 HTTP 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)입니다.
// 각 경로에는 하나 이상의 핸들러 함수가 있을 수 있으며, 이 함수는 경로가 일치할 때 실행됩니다.
//
// --------------------------------------------------------------------------

// GET, path: `/`, handler
// app.get("/", entryHandler);

// POST
// app.post("/", (req, res) => {
//   // 클라이언트의 요청 URL
//   console.log(req.url);

//   // 서버 -> 클라이언트 응답
//   res.status(201 /* Created */).send({
//     message: "POST 요청이 홈페이지로부터 주어졌습니다.",
//   });
// });

/* Users API ------------------------------------------------------------------ */

// CREATE (POST) -------------------------------------------------------
// `POST /api/users`
app.post("/api/users", async (req: Request<{}, {}, RequestUser>, res) => {
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
    await writeUsers(newUser);

    // 클라이언트에 응답
    // 성공한 경우
    res.status(201).json(newUser);
  } catch (err: unknown) {
    // 실패한 경우
    res.status(401).json({
      message: (err as Error).message,
    });
  }
});

// READ (GET) ------------------------------------------------------------

// `GET /api/users`

app.get("/api/users", async (req, res) => {
  try {
    const users = await readUsers();

    res.status(200).json(users);
  } catch (err: unknown) {
    res.status(500).json({
      message: "알 수 없는 오류가 발생했습니다.",
    });
  }
});

// `GET /api/users/:id`

// UPDATE (PUT / PATCH) -------------------------------------------------------

// `PUT /api/users/:id`

// `PATCH /api/users/:id`

// DELETE (DELETE) -------------------------------------------------------

// `DELETE /api/users/:id`

/* Listening ------------------------------------------------------------------ */

app.listen(PORT, HOSTNAME, () => {
  console.log(MESSAGE);
});
