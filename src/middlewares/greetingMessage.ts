import type { NextFunction, Request, Response } from "express";

function greetingMessage(req: Request, res: Response, next: NextFunction) {
  const date = new Date();
  console.log(`Happy New Year!! ${date.getFullYear()}`);

  // ....

  next();
}

export default greetingMessage;
