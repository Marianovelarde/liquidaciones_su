// src/pages/HomePage.tsx

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface User {
  usuario: string;
  role?: string;
}

const mockUser: User = {
  usuario: "admin",
  role: "ADMIN",
};

const canCreateLiquidation = (user: User | null) => {
  return user?.role === "ADMIN";
};

const canAccessAdminPanel = (user: User | null) => {
  return user?.role === "ADMIN";
};

const HomePage = () => {
  const navigate = useNavigate();
  const user: User | null = mockUser;

  const [openModal, setOpenModal] = useState(false);

  // menú hamburguesa




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
        <Box sx={{textAlign: "center"}}>
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

        {/* MENÚ HAMBURGUESA */}
      
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

        {/* NUEVA LIQUIDACIÓN */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardActionArea
              onClick={
                canCreateLiquidation(user)
                  ? () => navigate("/crear")
                  : () => setOpenModal(true)
              }
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

      {/* MODAL */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <DialogTitle>
          Acceso denegado
        </DialogTitle>

        <DialogContent>
          <Typography>
            <strong>{user?.usuario}</strong> no
            tiene permisos para acceder a esta
            función.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setOpenModal(false)}
            variant="contained"
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomePage;