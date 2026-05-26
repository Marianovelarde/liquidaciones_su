import app from "./app";

const PORT = 3002;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en:
  
  http://localhost:${PORT}
  http://192.168.1.7:${PORT}
  `);
});