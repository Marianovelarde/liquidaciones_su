import {
    createUserController,
    getAllUsersController,
    getUserByIdController,
    updateUserController,
    deleteUserController
} from "../controllers/user.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/requireAdmin";
import { requireRoles } from "../middlewares/requireRoles";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/", authMiddleware, requireAdmin,  createUserController);
userRouter.get("/", authMiddleware, requireAdmin, getAllUsersController);
userRouter.get("/:id", authMiddleware, requireAdmin, getUserByIdController);
userRouter.put("/:id", authMiddleware, requireAdmin, updateUserController);
userRouter.delete("/:id", authMiddleware, requireAdmin, deleteUserController);

export default userRouter;