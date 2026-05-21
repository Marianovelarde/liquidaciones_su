import {
  Box,
  Typography,
  Grid,
  Divider,
} from "@mui/material";

interface Props {
  liquidation: any;
  category?: any;

  subtotal: number;
  surchargeValue: number;
  totalFinal: number;
}

export default function LiquidationPrint({
  liquidation,
  category,
  subtotal,
  surchargeValue,
  totalFinal,
}: Props) {
  return (
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
          fontWeight={700}
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

        <Typography variant="subtitle1">
          Dirección de Suelo Urbano
        </Typography>
      </Box>

      <Typography
        variant="h5"
        fontWeight={700}
        gutterBottom
      >
        Liquidación Nº{" "}
        {liquidation?.emissionNumber}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Documento de liquidación
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Grid item xs={6}>
          <Typography fontWeight={700}>
            Propietario
          </Typography>

          <Typography>
            {liquidation?.propietario}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={700}>
            Ubicación
          </Typography>

          <Typography>
            {liquidation?.ubicacion}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={700}>
            Tipo de Obra
          </Typography>

          <Typography>
            {liquidation?.tipoObra}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={700}>
            Concepto
          </Typography>

          <Typography>
            {liquidation?.concepto}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={700}>
            Superficie
          </Typography>

          <Typography>
            {liquidation?.superficie} m²
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={700}>
            Categoría
          </Typography>

          <Typography>
            {category?.name}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={700}>
            Recargo
          </Typography>

          <Typography>
            {liquidation?.hasSurcharge
              ? `Sí (${liquidation?.surchargePercent}%)`
              : "No"}
          </Typography>
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
        <Grid item xs={6}>
          <Typography>
            Coeficiente aplicado
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={700}>
            {category?.coefficient}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>
            Precio por m²
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={700}>
            $
            {category?.pricePerM2?.toLocaleString()}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>
            Subtotal
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={700}>
            $
            {subtotal.toLocaleString()}
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography>
            Recargo
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={700}>
            $
            {surchargeValue.toLocaleString()}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        <Grid item xs={6}>
          <Typography
            variant="h5"
            fontWeight={700}
          >
            TOTAL
          </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography
            variant="h4"
            color="primary"
            fontWeight={700}
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
          No válido como comprobante
          de pago
        </Typography>
      </Box>
    </Box>
  );
}