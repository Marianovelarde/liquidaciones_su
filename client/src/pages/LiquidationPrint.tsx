import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  Divider,
  Stack,
  Grid
} from "@mui/material";

interface LiquidationPrintProps {
  open: boolean;
  onClose: () => void;

  liquidation: any;
  category: any;

  subtotal: number;
  surchargeValue: number;
  totalFinal: number;
}

export default function LiquidationPrint({
  open,
  onClose,
  liquidation,
  category,
  subtotal,
  surchargeValue,
  totalFinal,
}: LiquidationPrintProps) {


  const handlePrint = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  window.print();
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
    padding: 12px;
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

  <Dialog
    open={open}
        onClose={onClose}
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
                  mb: 2,
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
                  liquidation?.emissionNumber
                }
              </Typography>

<Typography
  variant="body1"
  sx={{
    mb: 2,
    fontWeight: 500,
  }}
>
  Fecha:{" "}
  {new Date(
    liquidation?.createdAt
  ).toLocaleDateString("es-AR")}
</Typography>

<Grid
  container
  spacing={1}
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
          fontSize: "16px",
          fontWeight: 500,
        }}
      >
        {liquidation?.propietario}
      </Typography>
    </Box>
  </Grid>


    {/*Cuil*/}

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
        Cuil
      </Typography>

      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 500,
        }}
      >
        {liquidation?.cuil}
      </Typography>
    </Box>
  </Grid>

  {/* UBICACION */}

  <Grid size={12}>
    <Box
      sx={{
        borderBottom: "1px solid #ddd",
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
          fontSize: "16px",
          fontWeight: 500,
        }}
      >
        {liquidation?.ubicacion}
      </Typography>
    </Box>
  </Grid>

{/* EXPEDIENTE */}

<Grid size={12}>
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

    <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
      {liquidation?.expedienteNumero} - {liquidation?.expedienteCodigo} - {liquidation?.expedienteAnio}
    </Typography>
  </Box>
</Grid>

{/* CARPETA */}

<Grid size={12}>
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
      Carpeta
    </Typography>

    <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
      {liquidation?.carpetaNumero} - {liquidation?.carpetaLetra} - {liquidation?.carpetaAnio}
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
        {liquidation?.tipoObra}
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
        {liquidation?.concepto}
      </Typography>
    </Box>
  </Grid>

  {/* FILA */}

  <Grid size={4}>
    <Box sx={{ borderBottom: "1px solid #ddd", pb: 3.8 }}>
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
        {liquidation?.superficie} m²
      </Typography>
    </Box>
  </Grid>

  <Grid size={4}>
    <Box sx={{ borderBottom: "1px solid #ddd", pb: 3.8 }}>
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
        {category?.name}
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
      {liquidation?.hasSurcharge
        ? `(${liquidation.surchargePercent}%)`
        : "No"}
    </Typography>

  {liquidation?.hasSurcharge && (
  <>
    

    <Typography sx={{ fontSize: "14px", color: "#666" }}>
      {liquidation.isFullSurcharge
        ? "Aplicado sobre toda la superficie"
        : `Aplicado sobre ${liquidation.surchargeSurface} m²`}
    </Typography>
  </>
)}
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
        {liquidation?.observations ||
          "Sin observaciones"}
      </Typography>
    </Box>
  </Grid>
</Grid>

              <Divider sx={{ mb: 1 }} />

              <Typography
                variant="h6"
                gutterBottom
              >
                Resumen Económico
              </Typography>

              <Grid container spacing={1}>
                <Grid size={6}>
                  <Typography>
                    Coeficiente aplicado
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography  sx={{fontWeight: 700}}>
                    {
                      category?.coefficient
                    } 
                    
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
                    {category?.pricePerM2?.toLocaleString()}
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

                <Grid size={8}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid size={6}>
                  <Typography
                    variant="h6"
                    sx={{fontWeight: 600}}
                  >
                    TOTAL
                  </Typography>
                </Grid>

                <Grid size={6}>
                  <Typography
                    variant="h5"
                    color="primary"
                  sx={{fontWeight: 600}}
                  >
                    $
                    {totalFinal.toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>

              {/* AVISO */}
<Box
  sx={{
    mt: 3,
    pt: 2,
    borderTop: "1px dashed #999",
  }}
>
  <Divider sx={{ my: 3 }} />
             <Box
  sx={{
    display: "flex",
    justifyContent: "flex-end",
  }}
>

<Box
  sx={{
    width: 220,
    textAlign: "center",
    borderTop: "1px solid black",
    pt: 0.5,
  }}
>
  <Typography
    sx={{
      fontSize: 14,
      fontWeight: 600,
    }}
  >
    Firma Responsable
  </Typography>
</Box>

</Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
    display:"block",
    mt:0.5,
    fontSize:10
}}
                >
                  No válido como comprobante de
                  pago
                </Typography>
              </Box>
            </Box>

            <Stack
              id="print-buttons"
              direction="row"
              spacing={1}
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
                onClick={onClose}
              >
                Continuar
              </Button>
            </Stack>
          </DialogContent>
        </Dialog>
        </>
  );

}