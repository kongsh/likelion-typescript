import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { Request, Response, NextFunction } from "express";

async function entryHandler(req: Request, res: Response, nextFunction: NextFunction) {
  // 서버 애플리케이션의 로컬 저장소 위치의 파일 비동기 방식으로 읽기
  // readFile()
  try {
    const entryFilePath = resolve(__dirname, "../index.html");
    const entryFileCode = await readFile(entryFilePath, { encoding: "utf-8" });

    // 서버 -> 클라이언트 응답(response)
    res.status(200 /* OK */).send(entryFileCode);
  } catch (err: unknown) {
    res.status(500 /* Internal Server Error */).send({
      message: (err as Error).message,
    });
  }
}

export default entryHandler;
