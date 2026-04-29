// src/pages/LiquidationDetailPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getLiquidationById,
  updateLiquidation,
  changeLiquidationStatus,
} from "../api/liquidation.api";;

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

const statusOptions = [
  "PENDIENTE_DE_PAGO",
  "EN_REVISION",
  "PAGADO",
  "OBSERVADO",
  "ANULADO",
];

export default function LiquidationDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<any>(null);

  const loadLiquidation = async () => {
    try {
      const res = await getLiquidationById(Number(id));
      setForm(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLiquidation();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateLiquidation(Number(id), form);

      alert("Liquidación actualizada");
      loadLiquidation();
    } catch (error) {
      console.error(error);
      alert("Error actualizando");
    }
  };

  const handleStatusChange = async (
    newStatus: string
  ) => {
    try {
      await changeLiquidationStatus(
        Number(id),
        newStatus
      );

      setForm((prev: any) => ({
        ...prev,
        status: newStatus,
      }));
    } catch (error) {
      console.error(error);
      alert("Error cambiando estado");
    }
  };

  if (!form) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
      >
        Detalle de Liquidación
      </Typography>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Propietario"
                name="propietario"
                fullWidth
                value={form.propietario}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Ubicación"
                name="ubicacion"
                fullWidth
                value={form.ubicacion}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Superficie"
                name="superficie"
                fullWidth
                value={form.superficie}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Total"
                name="total"
                fullWidth
                value={form.total}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                select
                label="Estado"
                fullWidth
                value={form.status}
                onChange={(e) =>
                  handleStatusChange(e.target.value)
                }
              >
                {statusOptions.map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                  >
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 2,
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleSave}
                >
                  Guardar cambios
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate(-1)}
                >
                  Volver
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}