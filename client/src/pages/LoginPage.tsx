import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Avatar,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginRequest } from "../api/auth.api";
import { setCredentials } from "../api/slice/authSlice";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await loginRequest(form);

      // IMPORTANTE:
      // actualizar Redux + localStorage
      dispatch(
        setCredentials({
          user: res.data.user,
          token: res.data.token,
        })
      );

      navigate("/");
    } catch (error: any) {
      alert(
        error?.response?.data?.error ||
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
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Avatar
              sx={{
                width: 70,
                height: 70,
                margin: "0 auto",
              }}
            >
              M
            </Avatar>

            <Typography variant="h5" mt={2}>
              Sistema de Liquidaciones
            </Typography>

            <Typography variant="body2">
              Dirección de Suelo Urbano
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

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