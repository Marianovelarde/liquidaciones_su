// src/pages/admin/AdminPanel.tsx

import { Box, Button, Typography } from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import HistoryIcon from "@mui/icons-material/History";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CategoryAdmin from "../pages/admin/CategoryAdmin";
import UserAdmin from "../pages/admin/UserAdmin";
import LiquidationAdmin from "../pages/LiquidationAdmin";

// futuros módulos
// import LiquidationAdmin from "./LiquidationAdmin";
// import AuditAdmin from "./AuditAdmin";
// import MetricsAdmin from "./MetricsAdmin";

const AdminPanel = () => {
  const [section, setSection] = useState("categories");
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f7f9fc",
      }}
    >
      {/* SIDEBAR */}
      <Box
        sx={{
          width: 260,
          backgroundColor: "#e3edf7",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          borderRight: "1px solid #d7e2ee",
        }}
      >
        <Button
          size="small"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            justifyContent: "flex-start",
          }}
        >
          Volver
        </Button>

        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 700 }}
        >
          Panel Admin
        </Typography>

        {/* CATEGORÍAS */}
        <Button
          fullWidth
          startIcon={<CategoryIcon />}
          variant={
            section === "categories"
              ? "contained"
              : "text"
          }
          onClick={() => setSection("categories")}
          sx={{
            justifyContent: "flex-start",
          }}
        >
          Categorías
        </Button>

        {/* USUARIOS */}
        <Button
          fullWidth
          startIcon={<PeopleIcon />}
          variant={
            section === "users"
              ? "contained"
              : "text"
          }
          onClick={() => setSection("users")}
          sx={{
            justifyContent: "flex-start",
          }}
        >
          Usuarios
        </Button>

        {/* LIQUIDACIONES */}
        <Button
          fullWidth
          startIcon={<ReceiptLongIcon />}
          variant={
            section === "liquidations"
              ? "contained"
              : "text"
          }
          onClick={() => setSection("liquidations")}
          sx={{
            justifyContent: "flex-start",
          }}
        >
          Liquidaciones
        </Button>

        {/* AUDITORÍA */}
     <Button
  fullWidth
  startIcon={<HistoryIcon />}
  onClick={() =>
    navigate("/admin/auditoria")
  }
  sx={{
    justifyContent: "flex-start",
  }}
>
  Auditoría
</Button>

        {/* MÉTRICAS */}
        <Button
          fullWidth
          startIcon={<AnalyticsIcon />}
          onClick={() => navigate("/admin/metricas")}
          sx={{
            justifyContent: "flex-start",
          }}
        >
          Métricas
        </Button>
      </Box>

      {/* CONTENIDO */}
      <Box
        sx={{
          flex: 1,
          p: 4,
        }}
      >
        {/* CATEGORY MODULE */}
        {section === "categories" && (
          <CategoryAdmin />
        )}

        {/* USER MODULE */}
        {section === "users" && (
          <UserAdmin />
        )}

        {/* FUTURE MODULES */}

        {section === "liquidations" && (
          <LiquidationAdmin />
        )}

        {section === "audit" && (
          <Typography variant="h6">
            Auditoría (próximo módulo)
          </Typography>
        )}

        {section === "metrics" && (
          <Typography variant="h6">
            Métricas (próximo módulo)
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AdminPanel;