import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors({
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

app.use(express.json());

app.use("/api", routes);

export default app;
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