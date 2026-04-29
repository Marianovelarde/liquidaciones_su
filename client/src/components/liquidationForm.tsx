// src/pages/LiquidationForm.tsx
import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

import { createLiquidation } from "../api/liquidation.api";
import { getCategories } from "../api/category.api";

interface Category {
  id: number;
  name: string;
  coefficient: number;
  pricePerM2: number;
}

export default function LiquidationForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const [form, setForm] = useState({
    emissionNumber: "",

    expedienteNumero: "",
    expedienteCodigo: 31,
    expedienteAnio: "",

    carpetaNumero: "",
    carpetaLetra: "",
    carpetaAnio: "",

    distrito: "",
    zona: "",
    manzana: "",
    parcela: "",

    propietario: "",
    ubicacion: "",
    tipoObra: "",
    concepto: "",

    superficie: "",
    categoryId: "",

    hasSurcharge: "false",
    surchargePercent: "",

    observations: "",

    status: "PENDIENTE_DE_PAGO",
  });

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "categoryId") {
      const cat = categories.find(
        (c) => c.id === Number(value)
      );
      setSelectedCategory(cat || null);
    }
  };

  // =========================
  // CÁLCULOS
  // =========================

  const subtotal =
    Number(form.superficie || 0) *
    (selectedCategory?.pricePerM2 || 0) *
    (selectedCategory?.coefficient || 0);

  const surchargeValue =
    form.hasSurcharge === "true"
      ? (subtotal * Number(form.surchargePercent || 0)) / 100
      : 0;

  const totalFinal = subtotal + surchargeValue;

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async () => {
    try {
      // usuario logueado
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      if (!user?.id) {
        alert("Debes iniciar sesión");
        return;
      }

      const payload = {
        emissionNumber: Number(form.emissionNumber),

        expedienteNumero: Number(form.expedienteNumero),
        expedienteCodigo: Number(form.expedienteCodigo),
        expedienteAnio: Number(form.expedienteAnio),

        carpetaNumero: Number(form.carpetaNumero),
        carpetaLetra: form.carpetaLetra,
        carpetaAnio: Number(form.carpetaAnio),

        distrito: Number(form.distrito),
        zona: Number(form.zona),
        manzana: Number(form.manzana),
        parcela: Number(form.parcela),

        propietario: form.propietario,
        ubicacion: form.ubicacion,
        tipoObra: form.tipoObra,
        concepto: form.concepto,

        superficie: Number(form.superficie),
        categoryId: Number(form.categoryId),

        // RELACIÓN CON USER (IMPORTANTE)
        createdById: Number(user.id),

        hasSurcharge: form.hasSurcharge === "true",

        surchargePercent:
          form.hasSurcharge === "true"
            ? Number(form.surchargePercent)
            : null,

        observations: form.observations,

        total: totalFinal,

        status: form.status,
      };

      console.log("PAYLOAD ENVIADO:", payload);

      await createLiquidation(payload);

      alert("Liquidación creada correctamente");
    } catch (error: any) {
      console.error(
        "ERROR COMPLETO:",
        error?.response?.data || error
      );

      alert(
        error?.response?.data?.error ||
          "Error al guardar la liquidación"
      );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        p: 3,
      }}
    >
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Liquidación de Derechos de Edificación
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Dirección de Suelo Urbano — Sistema de Liquidaciones
      </Typography>

      {/* ========================= */}
      {/* IDENTIFICACIÓN */}
      {/* ========================= */}

      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Identificación
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                size="small"
                label="Liquidación N°"
                name="emissionNumber"
                fullWidth
                value={form.emissionNumber}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                size="small"
                label="Concepto"
                name="concepto"
                fullWidth
                value={form.concepto}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                size="small"
                label="Propietario"
                name="propietario"
                fullWidth
                value={form.propietario}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                select
                size="small"
                label="Estado"
                name="status"
                fullWidth
                value={form.status}
                onChange={handleChange}
                disabled
              >
                <MenuItem value="PENDIENTE_DE_PAGO">
                  Pendiente de Pago
                </MenuItem>
                <MenuItem value="EN_REVISION">
                  En Revisión
                </MenuItem>
                <MenuItem value="PAGADO">
                  Pagado
                </MenuItem>
                <MenuItem value="OBSERVADO">
                  Observado
                </MenuItem>
                <MenuItem value="ANULADO">
                  Anulado
                </MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ========================= */}
      {/* EXPEDIENTE */}
      {/* ========================= */}

      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Expediente
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                size="small"
                label="Expediente Nº"
                name="expedienteNumero"
                value={form.expedienteNumero}
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                label="Código"
                value={31}
                fullWidth
                disabled
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                label="Año"
                name="expedienteAnio"
                value={form.expedienteAnio}
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                label="Carpeta Nº"
                name="carpetaNumero"
                value={form.carpetaNumero}
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                label="Letra"
                name="carpetaLetra"
                value={form.carpetaLetra}
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                size="small"
                label="Año"
                name="carpetaAnio"
                value={form.carpetaAnio}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ========================= */}
      {/* PADRÓN */}
      {/* ========================= */}

      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Padrón
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField
                size="small"
                label="Distrito"
                name="distrito"
                fullWidth
                value={form.distrito}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                size="small"
                label="Zona"
                name="zona"
                fullWidth
                value={form.zona}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                size="small"
                label="Manzana"
                name="manzana"
                fullWidth
                value={form.manzana}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                size="small"
                label="Parcela"
                name="parcela"
                value={form.parcela}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ========================= */}
      {/* DATOS DE OBRA */}
      {/* ========================= */}

      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Datos de la Obra
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                size="small"
                label="Ubicación"
                name="ubicacion"
                fullWidth
                value={form.ubicacion}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                size="small"
                label="Tipo de Obra"
                name="tipoObra"
                fullWidth
                value={form.tipoObra}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                size="small"
                label="Superficie (m²)"
                name="superficie"
                value={form.superficie}
                fullWidth
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                size="small"
                label="Categoría"
                name="categoryId"
                value={form.categoryId}
                fullWidth
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name} | Coef: {cat.coefficient}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                select
                size="small"
                label="¿Tiene recargo?"
                name="hasSurcharge"
                fullWidth
                value={form.hasSurcharge}
                onChange={handleChange}
              >
                <MenuItem value="false">No</MenuItem>
                <MenuItem value="true">Sí</MenuItem>
              </TextField>
            </Grid>

            {form.hasSurcharge === "true" && (
              <Grid item xs={6}>
                <TextField
                  size="small"
                  label="Recargo (%)"
                  name="surchargePercent"
                  value={form.surchargePercent}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                size="small"
                label="Observaciones"
                name="observations"
                value={form.observations}
                fullWidth
                multiline
                rows={3}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* ========================= */}
      {/* RESUMEN FINAL */}
      {/* ========================= */}

      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          boxShadow: 2,
          border: "2px solid #1976d2",
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Resumen de Liquidación
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Coeficiente aplicado:</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography fontWeight={600}>
                {selectedCategory?.coefficient || "-"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Precio por m²:</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography fontWeight={600}>
                $
                {selectedCategory?.pricePerM2?.toLocaleString() || "-"}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Subtotal:</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography fontWeight={600}>
                ${subtotal.toLocaleString()}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Recargo:</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography fontWeight={600}>
                ${surchargeValue.toLocaleString()}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
            </Grid>

            <Grid item xs={6}>
              <Typography variant="h5" fontWeight={700}>
                TOTAL FINAL
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography
                variant="h4"
                color="primary"
                fontWeight={700}
              >
                ${totalFinal.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{
          height: 56,
          borderRadius: 2,
          fontWeight: 600,
        }}
        onClick={handleSubmit}
      >
        Guardar Liquidación
      </Button>
    </Box>
  );
}