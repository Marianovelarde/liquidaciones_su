// src/components/Navbar.tsx

import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../api/slice/authSlice";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";

interface User {
  usuario: string;
  role?: string;
}

// mock temporal (luego irá desde auth real)
const mockUser: User = {
  usuario: "admin",
  role: "ADMIN",
};

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = mockUser;

  // SOLO UN MENÚ (izquierda)
  const [anchorNav, setAnchorNav] =
    React.useState<null | HTMLElement>(null);

  const openNav = Boolean(anchorNav);

  const handleOpenNav = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorNav(event.currentTarget);
  };

  const handleCloseNav = () => {
    setAnchorNav(null);
  };

  const handleLogout = () => {
    handleCloseNav();

    // logout real
    dispatch(logout());

    // redirección al login
    navigate("/login");
  };

  const goTo = (path: string) => {
    navigate(path);
    handleCloseNav();
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={2}
        sx={{
          backgroundColor: "#1976d2",
        }}
      >
        <Toolbar>
          {/* MENÚ HAMBURGUESA */}
          <IconButton
            color="inherit"
            onClick={handleOpenNav}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* TÍTULO */}
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
            }}
          >
            Sistema de Liquidaciones
          </Typography>
        </Toolbar>
      </AppBar>

      {/* ========================= */}
      {/* ÚNICO MENÚ */}
      {/* ========================= */}

      <Menu
        anchorEl={anchorNav}
        open={openNav}
        onClose={handleCloseNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            elevation: 3,
            sx: {
              minWidth: 250,
              mt: 1,
            },
          },
        }}
      >
        {/* INFO USUARIO */}
        <MenuItem disabled>
          <Avatar sx={{ mr: 1 }}>
            {user.usuario.charAt(0).toUpperCase()}
          </Avatar>

          <Box>
            <Typography
              variant="body2"
              fontWeight={600}
            >
              {user.usuario}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {user.role}
            </Typography>
          </Box>
        </MenuItem>

        <MenuItem onClick={() => goTo("/")}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          Inicio
        </MenuItem>

        <MenuItem onClick={() => goTo("/crear")}>
          <ListItemIcon>
            <AddCircleIcon fontSize="small" />
          </ListItemIcon>
          Nueva Liquidación
        </MenuItem>

        <MenuItem onClick={() => goTo("/listar")}>
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          Ver Liquidaciones
        </MenuItem>

        <MenuItem onClick={() => goTo("/filtros")}>
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          Buscar / Filtros
        </MenuItem>

        {user.role === "ADMIN" && (
          <MenuItem onClick={() => goTo("/admin")}>
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            Panel Admin
          </MenuItem>
        )}

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
}