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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../api/slice/authSlice";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 🔥 USUARIO REAL DESDE REDUX
  const user = useSelector((state: any) => state.auth.user);

  // MENÚ
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

    dispatch(logout());
    navigate("/login");
  };

  const goTo = (path: string) => {
    navigate(path);
    handleCloseNav();
  };

  // =========================
  // 🔐 PERMISOS
  // =========================

  const canCreate =
    user?.role === "ADMIN" ||
    user?.role === "GENERADOR";

  const canAccessAdmin =
    user?.role === "ADMIN";

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
          <IconButton
            color="inherit"
            onClick={handleOpenNav}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

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
        {/* USUARIO */}
        <MenuItem disabled>
          <Avatar sx={{ mr: 1 }}>
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </Avatar>

          <Box>
            <Typography variant="body2" sx={{fontWeight: 600}}>
              {user?.username || "Usuario"}
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              {user?.role || "-"}
            </Typography>
          </Box>
        </MenuItem>

        {/* HOME */}
        <MenuItem onClick={() => goTo("/")}>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          Inicio
        </MenuItem>

        {/* 🔥 CREAR (RESTRINGIDO) */}
        {canCreate && (
          <MenuItem onClick={() => goTo("/crear")}>
            <ListItemIcon>
              <AddCircleIcon fontSize="small" />
            </ListItemIcon>
            Nueva Liquidación
          </MenuItem>
        )}

        {/* LISTAR */}
        <MenuItem onClick={() => goTo("/listar")}>
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          Ver Liquidaciones
        </MenuItem>

        {/* FILTROS */}
        <MenuItem onClick={() => goTo("/filtros")}>
          <ListItemIcon>
            <SearchIcon fontSize="small" />
          </ListItemIcon>
          Buscar / Filtros
        </MenuItem>

        {/* 🔥 ADMIN */}
        {canAccessAdmin && (
          <MenuItem onClick={() => goTo("/admin")}>
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            Panel Admin
          </MenuItem>
        )}

        {/* LOGOUT */}
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