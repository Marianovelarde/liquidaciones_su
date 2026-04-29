
//schema.prisma: Este modulo lo que hace es configurar la conexión a la base de datos y definir los modelos de datos que se van a usar en la aplicación. Prisma es un ORM (Object-Relational Mapping) que facilita la interacción con la base de datos, permitiendo definir modelos de datos en un archivo schema.prisma y luego generar automáticamente el código necesario para realizar operaciones CRUD (Create, Read, Update, Delete) sobre esos modelos.

//app.ts: Este módulo es el punto de entrada principal de la aplicación Express. Aquí se configura el servidor, se aplican middlewares como CORS y JSON parsing, y se definen las rutas principales de la API. El archivo app.ts importa las rutas desde un módulo separado (routes) y las monta bajo el prefijo "/api". Esto significa que todas las rutas definidas en el módulo routes estarán disponibles bajo la URL base "/api". Finalmente, el archivo exporta la instancia de la aplicación Express para que pueda ser utilizada en otros módulos, como server.ts, donde se inicia el servidor escuchando en un puerto específico.
import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

export default app;