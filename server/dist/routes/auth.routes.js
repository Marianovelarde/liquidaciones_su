"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = require("../controllers/auth.controller");
const express_1 = require("express");
const authRouter = (0, express_1.Router)();
authRouter.post("/", auth_controller_1.loginController);
exports.default = authRouter;
