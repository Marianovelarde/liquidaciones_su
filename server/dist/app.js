"use strict";
//schema.prisma: Este modulo lo que hace es configurar la conexión a la base de datos y definir los modelos de datos que se van a usar en la aplicación. Prisma es un ORM (Object-Relational Mapping) que facilita la interacción con la base de datos, permitiendo definir modelos de datos en un archivo schema.prisma y luego generar automáticamente el código necesario para realizar operaciones CRUD (Create, Read, Update, Delete) sobre esos modelos.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//app.ts: Este módulo es el punto de entrada principal de la aplicación Express. Aquí se configura el servidor, se aplican middlewares como CORS y JSON parsing, y se definen las rutas principales de la API. El archivo app.ts importa las rutas desde un módulo separado (routes) y las monta bajo el prefijo "/api". Esto significa que todas las rutas definidas en el módulo routes estarán disponibles bajo la URL base "/api". Finalmente, el archivo exporta la instancia de la aplicación Express para que pueda ser utilizada en otros módulos, como server.ts, donde se inicia el servidor escuchando en un puerto específico.
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", routes_1.default);
exports.default = app;
