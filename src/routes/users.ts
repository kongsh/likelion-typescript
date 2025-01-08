import { Router } from "express";
import { createUserHandler, deleteUserHandler, patchUserHandler, putUserHandler, readAllUsersHandler, readUserByIdHandler } from "../handlers/users";

const usersRouter = Router();

usersRouter.post("/", createUserHandler);
usersRouter.get("/", readAllUsersHandler);
usersRouter.get("/:id", readUserByIdHandler);
usersRouter.put("/:id", putUserHandler);
usersRouter.patch("/:id", patchUserHandler);
usersRouter.delete("/:id", deleteUserHandler);

export default usersRouter;
