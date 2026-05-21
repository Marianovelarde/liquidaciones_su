"use strict";
// src/repository/auth.repository.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByUsernameRepo = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const findUserByUsernameRepo = async (username) => {
    return await client_1.default.user.findFirst({
        where: {
            username,
            deletedAt: null,
        },
    });
};
exports.findUserByUsernameRepo = findUserByUsernameRepo;
