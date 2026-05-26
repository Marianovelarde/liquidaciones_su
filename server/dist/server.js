"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = 3002;
app_1.default.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor corriendo en:
  
  http://localhost:${PORT}
  http://192.168.1.7:${PORT}
  `);
});
