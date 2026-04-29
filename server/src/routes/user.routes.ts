import {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController
} from "../controllers/user.controllers";

import { Router } from "express";

const userRouter = Router();

userRouter.post("/", createUserController);
userRouter.get("/", getAllUsersController);
userRouter.get("/:id", getUserByIdController);
userRouter.put("/:id", updateUserController);
userRouter.delete("/:id", deleteUserController);

export default userRouter;