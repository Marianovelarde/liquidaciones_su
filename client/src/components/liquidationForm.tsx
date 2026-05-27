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
    Dialog,
    DialogContent,
    DialogTitle,
    Stack,
      Snackbar,
  Alert,
  } from "@mui/material";

  import { createLiquidation } from "../api/liquidation.api";
  import { getCategories } from "../api/category.api";
  import { useNavigate } from "react-router-dom";

  interface Category {
    id: number;
    name: string;
    coefficient: number;
    pricePerM2: number;
  }

  export default function LiquidationForm() {
    const navigate = useNavigate();

    const [categories, setCategories] =
      useState<Category[]>([]);

    const [selectedCategory, setSelectedCategory] =
      useState<Category | null>(null);

    const [openModal, setOpenModal] =
      useState(false);

    const [savedLiquidation, setSavedLiquidation] =
      useState<any>(null);

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

    const [snackOpen, setSnackOpen] =
  useState(false);

const [snackMessage, setSnackMessage] =
  useState("");

const [snackSeverity, setSnackSeverity] =
  useState<
    "success" | "error" | "warning" | "info"
  >("error");
    useEffect(() => {
      getCategories().then((res) => {
        setCategories(res.data);
      });
    }, []);

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement
      >
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

    const getErrorMessage = (
  error: any
): string => {

  const backendError =
    error?.response?.data?.error || "";

  //////////////////////////////////////////////////////
  // Prisma - Int/String
  //////////////////////////////////////////////////////

  if (
    backendError.includes(
      "Expected Int, provided String"
    )
  ) {

    const match =
      backendError.match(
        /Argument `(.*?)`/
      );

    const field =
      match?.[1] || "desconocido";

    return `El campo "${field}" debe contener solo números.`;
  }

  //////////////////////////////////////////////////////
  // Unique constraint
  //////////////////////////////////////////////////////

  if (
    backendError.includes(
      "Unique constraint failed"
    )
  ) {
    return "Ya existe un registro con esos datos.";
  }

  //////////////////////////////////////////////////////
  // Required field
  //////////////////////////////////////////////////////

  if (
    backendError.includes(
      "Argument"
    ) &&
    backendError.includes(
      "is missing"
    )
  ) {
    return "Faltan completar campos obligatorios.";
  }

  //////////////////////////////////////////////////////
  // Error servidor
  //////////////////////////////////////////////////////

  if (
    error?.response?.status === 500
  ) {
    return "Error interno del servidor.";
  }

  //////////////////////////////////////////////////////
  // Sin conexión
  //////////////////////////////////////////////////////

  if (
    error?.code === "ERR_NETWORK"
  ) {
    return "No se pudo conectar con el servidor.";
  }

  //////////////////////////////////////////////////////
  // Default
  //////////////////////////////////////////////////////

  return "Ocurrió un error al procesar la solicitud.";
};

    //////////////////////////////////////////////////////
    // CÁLCULOS
    //////////////////////////////////////////////////////

    const subtotal =
      Number(form.superficie || 0) *
      (selectedCategory?.pricePerM2 || 0) *
      (selectedCategory?.coefficient || 0);

    const surchargeValue =
      form.hasSurcharge === "true"
        ? (subtotal *
            Number(form.surchargePercent || 0)) /
          100
        : 0;

    const totalFinal =
      subtotal + surchargeValue;

    //////////////////////////////////////////////////////
    // SUBMIT
    //////////////////////////////////////////////////////

    const handleSubmit = async () => {
      try {
  const auth = JSON.parse(
    localStorage.getItem("auth") || "{}"
  );

  const user = auth.user;

  if (!user?.id) {
    alert("Debes iniciar sesión");
    return;
  }

        const payload = {
          emissionNumber: Number(
            form.emissionNumber
          ),

          expedienteNumero: Number(
            form.expedienteNumero
          ),

          expedienteCodigo: Number(
            form.expedienteCodigo
          ),

          expedienteAnio: Number(
            form.expedienteAnio
          ),

          carpetaNumero: String(
            form.carpetaNumero
          ),

          carpetaLetra: form.carpetaLetra,

          carpetaAnio: String(
            form.carpetaAnio
          ),

          distrito: Number(form.distrito),

          zona: Number(form.zona),

          manzana: Number(form.manzana),

          parcela: String(form.parcela),

          propietario: form.propietario,

          ubicacion: form.ubicacion,

          tipoObra: form.tipoObra,

          concepto: form.concepto,

          superficie: Number(
            form.superficie
          ),

          categoryId: Number(
            form.categoryId
          ),

          createdById: Number(user.id),

          hasSurcharge:
            form.hasSurcharge === "true",

          surchargePercent:
            form.hasSurcharge === "true"
              ? Number(
                  form.surchargePercent
                )
              : null,

          observations: form.observations,

          total: totalFinal,

          status: form.status,
        };

        const response =
          await createLiquidation(payload);

        setSavedLiquidation(response.data);

        setOpenModal(true);
      } catch (error: any) {

  console.error(
    "ERROR COMPLETO:",
    error?.response?.data || error
  );

  setSnackMessage(
    getErrorMessage(error)
  );

  setSnackSeverity("error");

  setSnackOpen(true);
}
    };

    //////////////////////////////////////////////////////
    // IMPRIMIR
    //////////////////////////////////////////////////////

  const handlePrint = async () => {
    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 300)
      );

      window.print();
    } catch (error) {
      console.error(error);
    }
  };

    //////////////////////////////////////////////////////
    // CONTINUAR
    //////////////////////////////////////////////////////

    const handleContinue = () => {
      navigate("/listar");
    };

    const printStyles = `
  @media print {

    body * {
      visibility: hidden;
    }

    #print-area,
    #print-area * {
      visibility: visible;
    }

    #print-area {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 24px;
      background: white;
    }

    #print-buttons {
      display: none !important;
    }

    .MuiDialogTitle-root {
      display: none !important;
    }

    .MuiBackdrop-root {
      display: none !important;
    }

    .MuiDialog-paper {
      box-shadow: none !important;
      overflow: visible !important;
      max-width: 100% !important;
      width: 100% !important;
      margin: 0 !important;
    }
  }
  `;

    return (
      <>
        <style>{printStyles}</style>

        <Box
          sx={{
            maxWidth: "1200px",
            margin: "0 auto",
            p: 3,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
            fontWeight: 600,
            }}
        
          >
            Liquidación de Derechos de
            Edificación
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Dirección de Suelo Urbano —
            Sistema de Liquidaciones
          </Typography>

          {/* IDENTIFICACIÓN */}

          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 1,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
              >
                Identificación
              </Typography>

              <Grid container spacing={2}>
                <Grid size={3}>
                  <TextField
                    size="small"
                    label="Liquidación N°"
                    name="emissionNumber"
                    fullWidth
                    value={form.emissionNumber}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={3}>
                  <TextField
                    size="small"
                    label="Concepto"
                    name="concepto"
                    fullWidth
                    value={form.concepto}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={3}>
                  <TextField
                    size="small"
                    label="Propietario"
                    name="propietario"
                    fullWidth
                    value={form.propietario}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={3}>
                  <TextField
                    select
                    size="small"
                    label="Estado"
                    name="status"
                    fullWidth
                    value={form.status}
                    disabled
                  >
                    <MenuItem value="PENDIENTE_DE_PAGO">
                      Pendiente de Pago
                    </MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* EXPEDIENTE */}

          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 1,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
              >
                Expediente
              </Typography>

              <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
          <Grid size={4}>
              <TextField
                  size="small"
                  label="Expediente Nº"
                  name="expedienteNumero"
                  value={form.expedienteNumero}
                  fullWidth
                  onChange={handleChange}
                />
                </Grid>

                <Grid size={4}>
                  <TextField
                    size="small"
                    label="Código"
                    value={31}
                    fullWidth
                    disabled
                  />
                </Grid>

                <Grid size={4}>
                  <TextField
                    size="small"
                    label="Año"
                    name="expedienteAnio"
                    value={
                      form.expedienteAnio
                    }
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={4}>
                  <TextField
                    size="small"
                    label="Carpeta Nº"
                    name="carpetaNumero"
                    value={
                      form.carpetaNumero
                    }
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={4}>
                  <TextField
                    size="small"
                    label="Letra"
                    name="carpetaLetra"
                    value={
                      form.carpetaLetra
                    }
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={4}>
                  <TextField
                    size="small"
                    label="Año"
                    name="carpetaAnio"
                    value={
                      form.carpetaAnio
                    }
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* PADRÓN */}

          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 1,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
              >
                Padrón
              </Typography>

              <Grid container spacing={2}>
                <Grid size={3}>
                  <TextField
                    size="small"
                    label="Distrito"
                    name="distrito"
                    fullWidth
                    value={form.distrito}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={3}>
                  <TextField
                    size="small"
                    label="Zona"
                    name="zona"
                    fullWidth
                    value={form.zona}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={3}>
                  <TextField
                    size="small"
                    label="Manzana"
                    name="manzana"
                    fullWidth
                    value={form.manzana}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={3}>
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

          {/* DATOS OBRA */}

          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 1,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
              >
                Datos de la Obra
              </Typography>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    size="small"
                    label="Ubicación"
                    name="ubicacion"
                    fullWidth
                    value={form.ubicacion}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    size="small"
                    label="Tipo de Obra"
                    name="tipoObra"
                    fullWidth
                    value={form.tipoObra}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    size="small"
                    label="Superficie (m²)"
                    name="superficie"
                    value={form.superficie}
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    select
                    size="small"
                    label="Categoría"
                    name="categoryId"
                    value={form.categoryId}
                    fullWidth
                    onChange={handleChange}
                    sx={{width: "200px"}}
                  >
                    {categories.map((cat) => (
                      <MenuItem
                        key={cat.id}
                        value={cat.id}
                      >
                        {cat.name} | Coef:{" "}
                        {cat.coefficient}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={6}>
                  <TextField
                    select
                    size="small"
                    label="¿Tiene recargo?"
                    name="hasSurcharge"
                    fullWidth
                    value={form.hasSurcharge}
                    onChange={handleChange}
                    sx={{width: "150px"}}
                  >
                    <MenuItem value="false">
                      No
                    </MenuItem>

                    <MenuItem value="true">
                      Sí
                    </MenuItem>
                  </TextField>
                </Grid>

                {form.hasSurcharge ===
                  "true" && (
                  <Grid size={6}>
                    <TextField
                      size="small"
                      label="Recargo (%)"
                      name="surchargePercent"
                      value={
                        form.surchargePercent
                      }
                      fullWidth
                      onChange={
                        handleChange
                      }
                    />
                  </Grid>
                )}

                <Grid size={12}>
                  <TextField
                    size="small"
                    label="Observaciones"
                    name="observations"
                    value={form.observations}
                    fullWidth
                    multiline
                    rows={3}
                    onChange={handleChange}
                    sx={{width: "700px"}}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* RESUMEN */}

          <Card
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 2,
              border:
                "2px solid #1976d2",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
              >
                Resumen de Liquidación
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid size={6}>
                  <Typography>
                    Coeficiente aplicado:
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography  sx={{
                      fontWeight: 600,
                      }}>
                    {selectedCategory?.coefficient ||
                      "-"}
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography>
                    Precio por m²:
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography  sx={{
            fontWeight: 600,
            }}>
                    $
                    {selectedCategory?.pricePerM2?.toLocaleString() ||
                      "-"}
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography>
                    Subtotal:
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography  sx={{
                    fontWeight: 600,
                    }}>
                    $
                    {subtotal.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography>
                    Recargo:
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography sx={{
                    fontWeight: 600,
                    }}>
                    $
                    {surchargeValue.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid size={12}>
                  <Divider sx={{ my: 1 }} />
                </Grid>

                <Grid size={6}>
                  <Typography
                    variant="h5"
                    sx={{
                    fontWeight: 700,
                    }}>
                  
                    TOTAL FINAL
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography
                    variant="h4"
                    color="primary"
                  sx={{
                    fontWeight: 700,
                    }}>
                    $
                    {totalFinal.toLocaleString()}
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

        {/* MODAL */}

    <Dialog
    open={openModal}
    maxWidth="md"
    fullWidth
    disablePortal
    keepMounted
    sx={{
      "@media print": {
        "& .MuiDialog-paper": {
          boxShadow: "none",
          overflow: "visible",
          maxWidth: "100%",
          width: "100%",
          margin: 0,
        },
      },
    }}
  >
          <DialogTitle
            sx={{
              fontWeight: 700,
              borderBottom:
                "1px solid #ddd",
            }}
          >
            Liquidación Generada
          </DialogTitle>

          <DialogContent
            sx={{
              py: 4,
            }}
          >
            <Box id="print-area">
              {/* MEMBRETE */}

              <Box
                sx={{
                  textAlign: "center",
                  mb: 4,
                  pb: 2,
                  borderBottom:
                    "2px solid #1976d2",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{fontWeight: 700}}
                >
                  Municipalidad de la Capital
                </Typography>

                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: 1,
                  }}
                >
                  Secretaría de Economía
                </Typography>

                <Typography
                  variant="subtitle1"
                >
                  Dirección de Suelo Urbano
                </Typography>
              </Box>

              <Typography
                variant="h5"
                gutterBottom
              sx={{
                    fontWeight: 400,
                    textAlign: "left"
                    }}
              >
                N° de Liquidación  {" "}
                {
                  savedLiquidation?.emissionNumber
                }
              </Typography>



<Grid
  container
  spacing={2}
  sx={{
    mb: 3,
    width: "100%",
  }}
>
  {/* PROPIETARIO */}

  <Grid size={12}>
    <Box
      sx={{
        borderBottom: "1px solid #ddd",
        pb: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "#666",
          mb: 0.5,
          letterSpacing: 1,
        }}
      >
        Propietario
      </Typography>

      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 500,
        }}
      >
        {savedLiquidation?.propietario}
      </Typography>
    </Box>
  </Grid>

  {/* UBICACION */}

  <Grid size={12}>
    <Box
      sx={{
        borderBottom: "1px solid #ddd",
        pb: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "#666",
          mb: 0.5,
          letterSpacing: 1,
        }}
      >
        Ubicación
      </Typography>

      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 500,
        }}
      >
        {savedLiquidation?.ubicacion}
      </Typography>
    </Box>
  </Grid>

  {/* FILA */}

  <Grid size={4}>
    <Box sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "#666",
          mb: 0.5,
        }}
      >
        Expediente
      </Typography>

      <Typography sx={{ fontSize: "16px" }}>
        {savedLiquidation?.expedienteNumero}
      </Typography>
    </Box>
  </Grid>

  <Grid size={4}>
    <Box sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "#666",
          mb: 0.5,
        }}
      >
        Manzana
      </Typography>

      <Typography sx={{ fontSize: "16px" }}>
        {savedLiquidation?.manzana}
      </Typography>
    </Box>
  </Grid>

  <Grid size={4}>
    <Box sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "#666",
          mb: 0.5,
        }}
      >
        Parcela
      </Typography>

      <Typography sx={{ fontSize: "16px" }}>
        {savedLiquidation?.parcela}
      </Typography>
    </Box>
  </Grid>

  {/* FILA */}

  <Grid size={6}>
    <Box sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "#666",
          mb: 0.5,
        }}
      >
        Tipo de Obra
      </Typography>

      <Typography sx={{ fontSize: "16px" }}>
        {savedLiquidation?.tipoObra}
      </Typography>
    </Box>
  </Grid>

  <Grid size={6}>
    <Box sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "#666",
          mb: 0.5,
        }}
      >
        Concepto
      </Typography>

      <Typography sx={{ fontSize: "16px" }}>
        {savedLiquidation?.concepto}
      </Typography>
    </Box>
  </Grid>

  {/* FILA */}

  <Grid size={4}>
    <Box sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "#666",
          mb: 0.5,
        }}
      >
        Superficie
      </Typography>

      <Typography sx={{ fontSize: "16px" }}>
        {savedLiquidation?.superficie} m²
      </Typography>
    </Box>
  </Grid>

  <Grid size={4}>
    <Box sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "#666",
          mb: 0.5,
        }}
      >
        Categoría
      </Typography>

      <Typography sx={{ fontSize: "16px" }}>
        {selectedCategory?.name}
      </Typography>
    </Box>
  </Grid>

  <Grid size={4}>
    <Box sx={{ borderBottom: "1px solid #ddd", pb: 1 }}>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "#666",
          mb: 0.5,
        }}
      >
        Recargo
      </Typography>

      <Typography sx={{ fontSize: "16px" }}>
        {savedLiquidation?.hasSurcharge
          ? `Sí (${savedLiquidation?.surchargePercent}%)`
          : "No"}
      </Typography>
    </Box>
  </Grid>

  {/* OBSERVACIONES */}

  <Grid size={12}>
    <Box
      sx={{
        mt: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 2,
        backgroundColor: "#fafafa",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "12px",
          textTransform: "uppercase",
          color: "#666",
          mb: 1,
        }}
      >
        Observaciones
      </Typography>

      <Typography
        sx={{
          fontSize: "15px",
          lineHeight: 1.7,
          whiteSpace: "pre-line",
        }}
      >
        {savedLiquidation?.observations ||
          "Sin observaciones"}
      </Typography>
    </Box>
  </Grid>
</Grid>

              <Divider sx={{ mb: 3 }} />

              <Typography
                variant="h6"
                gutterBottom
              >
                Resumen Económico
              </Typography>

              <Grid container spacing={2}>
                <Grid size={6}>
                  <Typography>
                    Coeficiente aplicado
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography  sx={{fontWeight: 700}}>
                    {
                      selectedCategory?.coefficient
                    } %
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography>
                    Precio por m²
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography sx={{fontWeight: 700}}>
                    $
                    {selectedCategory?.pricePerM2?.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography>
                    Subtotal
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography sx={{fontWeight: 700}}>
                    $
                    {subtotal.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography>
                    Recargo
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography sx={{fontWeight: 700}}>
                    $
                    {surchargeValue.toLocaleString()}
                  </Typography>
                </Grid>

                <Grid size={12}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid size={6}>
                  <Typography
                    variant="h5"
                    sx={{fontWeight: 700}}
                  >
                    TOTAL
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography
                    variant="h4"
                    color="primary"
                  sx={{fontWeight: 700}}
                  >
                    $
                    {totalFinal.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>

              {/* AVISO */}

              <Box
                sx={{
                  mt: 6,
                  pt: 2,
                  borderTop:
                    "1px dashed #999",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  No válido como comprobante de
                  pago
                </Typography>
              </Box>
            </Box>

            <Stack
              id="print-buttons"
              direction="row"
              spacing={2}
              sx={{ mt: 4 }}
            >
          <Button
    type="button"
    variant="outlined"
    fullWidth
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();

      handlePrint();
    }}
  >
    Imprimir
  </Button>

              <Button
                variant="contained"
                fullWidth
                onClick={handleContinue}
              >
                Continuar
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
        <Snackbar
  open={snackOpen}
  autoHideDuration={5000}
  onClose={() => setSnackOpen(false)}
  anchorOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
>
  <Alert
    severity={snackSeverity}
    variant="filled"
    onClose={() => setSnackOpen(false)}
    sx={{
      width: "100%",
      fontWeight: 500,
    }}
  >
    {snackMessage}
  </Alert>
</Snackbar>
      </>
    );
  }