"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserService = exports.updateUserService = exports.getUserByIdService = exports.getAllUsersService = exports.createUserService = void 0;
const user_repository_1 = require("../repository/user.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserService = async (data) => {
    const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
    return await (0, user_repository_1.createUserRepo)({
        ...data,
        password: hashedPassword,
    });
};
exports.createUserService = createUserService;
const getAllUsersService = async () => {
    return await (0, user_repository_1.getAllUsersRepo)();
};
exports.getAllUsersService = getAllUsersService;
const getUserByIdService = async (id) => {
    return await (0, user_repository_1.getUserByIdRepo)(id);
};
exports.getUserByIdService = getUserByIdService;
const updateUserService = async (id, data) => {
    // si viene password nueva → hashear
    if (data.password) {
        data.password = await bcrypt_1.default.hash(data.password, 10);
    }
    return await (0, user_repository_1.updateUserRepo)(id, data);
};
exports.updateUserService = updateUserService;
const deleteUserService = async (id) => {
    return await (0, user_repository_1.deleteUserRepo)(id);
};
exports.deleteUserService = deleteUserService;
