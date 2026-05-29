"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://192.168.1.7:5173",
        "http://192.168.1.7:3000"
    ],
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS"
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]
}));
app.use(express_1.default.json());
app.use("/api", routes_1.default);
exports.default = app;
// import express from "express";
// import cors from "cors";
// import routes from "./routes";
// const app = express();
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "*"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "*"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,POST,PUT,PATCH,DELETE,OPTIONS"
//   );
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });
// app.use(express.json());
// app.use("/api", routes);
// export default app;
