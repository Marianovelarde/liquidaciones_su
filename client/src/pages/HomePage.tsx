// src/pages/HomePage.tsx

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  role: "ADMIN" | "GENERADOR" | "COBRADOR";
}

// 🔥 obtener usuario real
const getUserFromStorage = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// ✅ permisos
const canCreateLiquidation = (user: User | null) => {
  return (
    user?.role === "ADMIN" ||
    user?.role === "GENERADOR"
  );
};

const HomePage = () => {
  const navigate = useNavigate();

const user = useSelector((state: any) => state.auth.user);
  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            Sistema de Liquidaciones
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Gestión de derechos de edificación –
            Dirección de Suelo Urbano
          </Typography>
        </Box>
      </Box>

      {/* ACCESOS */}
      <Grid container spacing={3}>
        {/* VER LIQUIDACIONES */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardActionArea
              onClick={() => navigate("/listar")}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <DescriptionIcon
                  color="primary"
                  sx={{ fontSize: 40 }}
                />

                <Box>
                  <Typography variant="subtitle1">
                    Ver Liquidaciones
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Listado general de liquidaciones
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

        {/* ✅ SOLO SI TIENE PERMISO */}
        {canCreateLiquidation(user) && (
          <Grid item xs={12} md={4}>
            <Card elevation={2}>
              <CardActionArea
                onClick={() => navigate("/crear")}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <AddCircleIcon
                    color="primary"
                    sx={{ fontSize: 40 }}
                  />

                  <Box>
                    <Typography variant="subtitle1">
                      Nueva Liquidación
                    </Typography>

                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                    >
                      Ingresar nueva liquidación
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        )}

        {/* FILTROS */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardActionArea
              onClick={() => navigate("/filtros")}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <SearchIcon
                  sx={{ fontSize: 40 }}
                  color="primary"
                />

                <Box>
                  <Typography variant="subtitle1">
                    Buscar / Filtrar
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                  >
                    Búsqueda por padrón, expediente,
                    año, etc.
                  </Typography>
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;