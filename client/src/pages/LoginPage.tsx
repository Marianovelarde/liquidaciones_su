import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
} from "@mui/material";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginRequest } from "../api/auth.api";
import { setCredentials } from "../api/slice/authSlice";

// ✅ IMPORTAR IMAGEN
import muniLogo from "../assets/munilogo.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state: any) => state.auth);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  //////////////////////////////////////////////////////
  // REDIRECT SI YA ESTÁ LOGUEADO
  //////////////////////////////////////////////////////

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  //////////////////////////////////////////////////////
  // HANDLE CHANGE
  //////////////////////////////////////////////////////

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //////////////////////////////////////////////////////
  // LOGIN
  //////////////////////////////////////////////////////

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await loginRequest(form);

      console.log(
        "LOGIN RESPONSE:",
        res.data
      );

      if (
        !res.data?.token ||
        !res.data?.user
      ) {
        throw new Error(
          "Respuesta inválida del servidor"
        );
      }

     const expiresAt =
  Date.now() + 10 * 60 * 1000;

dispatch(
  setCredentials({
    user: res.data.user,
    token: res.data.token,
    expiresAt,
  })
);

      navigate("/");
    } catch (error: any) {
      console.log(
        "LOGIN ERROR:",
        error
      );

      alert(
        error?.response?.data?.error ||
          error?.message ||
          "Error al iniciar sesión"
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f7fb",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              textAlign: "center",
              mb: 3,
            }}
          >
            {/* LOGO */}
            <Box
              component="img"
              src={muniLogo}
              alt="Municipalidad"
              sx={{
                width: 90,
                height: 90,
                objectFit: "contain",
                display: "block",
                margin: "0 auto",
                mb: 2,
                borderRadius: "50%",
              }}
            />

            <Typography
              variant="h5"
              mt={2}
            >
              Sistema de Liquidaciones
            </Typography>

            <Typography variant="body2">
              Dirección de Suelo Urbano
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />
<Typography sx={{marginBottom: "10px"}}>
  Acceso al sistema
</Typography>
          <TextField
            label="Usuario"
            name="username"
            fullWidth
            size="small"
            value={form.username}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Contraseña"
            name="password"
            type="password"
            fullWidth
            size="small"
            value={form.password}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
          >
            Ingresar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}