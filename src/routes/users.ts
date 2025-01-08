import { Router } from "express";
import { createUserHandler, readAllUsersHandler, readUserByIdHandler } from "../handlers/users";

const usersRouter = Router();

// CREATE (POST) -------------------------------------------------------

// `POST /api/users`
usersRouter.post("/", createUserHandler);

// READ (GET) ------------------------------------------------------------

// `GET /api/users`

usersRouter.get("/", readAllUsersHandler);

// `GET /api/users/:id`

usersRouter.get("/:id", readUserByIdHandler);

// UPDATE (PUT / PATCH) -------------------------------------------------------

// `PUT /api/users/:id`

// `PATCH /api/users/:id`

// DELETE (DELETE) -------------------------------------------------------

// `DELETE /api/users/:id`

export default usersRouter;
