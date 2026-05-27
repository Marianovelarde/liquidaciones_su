import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

import PrintIcon from "@mui/icons-material/Print";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PaidIcon from "@mui/icons-material/Paid";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import {
  useEffect,
  useState,
} from "react";

import {
  getSystemMetrics,
} from "../../api/metrics.api";

interface Metrics {
  totalLiquidations: number;
  totalM2: number;
  totalAmount: number;
  paidLiquidations: number;
  paidAmount: number;
  pendingLiquidations: number;
  averageAmount: number;

  lastLiquidation: {
    id: number;
    emissionNumber: number;
    propietario: string;
    total: number;
    createdAt: string;
  } | null;
}


const MetricCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        height: "100%",
        boxShadow: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{fontWeight:600}}
          >
            {title}
          </Typography>

          <Box>{icon}</Box>
        </Box>

        <Typography
          variant="h4"
          sx={{fontWeight:800}}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};



export default function AdminMetrics() {
  const [metrics, setMetrics] =
    useState<Metrics | null>(null);

  const [loading, setLoading] =
    useState(true);



  const loadMetrics = async () => {
    try {
      setLoading(true);

      const res =
        await getSystemMetrics();

    

      setMetrics(res);

    } catch (error) {
      console.error(
        "Error loading metrics:",
        error
      );

    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    loadMetrics();
  }, []);


  const handlePrint = () => {
    window.print();
  };


  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 10,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!metrics) {
    return null;
  }


  const totalM2 = Number(
    metrics.totalM2 || 0
  ).toFixed(2);

  const totalAmount = Number(
    metrics.totalAmount || 0
  ).toLocaleString();

  const paidAmount = Number(
    metrics.paidAmount || 0
  ).toLocaleString();

  const averageAmount = Number(
    metrics.averageAmount || 0
  ).toLocaleString();

 

  return (
    <Box
      sx={{
        p: {
          xs: 1,
          md: 3,
        },
      }}
    >


      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h3"
           sx={{fontWeight:800}}
          >
            Panel de Métricas
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Resumen general del sistema de liquidaciones
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{
            borderRadius: 3,
            px: 3,
          }}
        >
          Imprimir reporte
        </Button>
      </Box>



      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Total m² registrados"
            value={totalM2}
            icon={<SquareFootIcon />}
          />
        </Grid>

         <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Monto total"
            value={`$ ${totalAmount}`}
            icon={<PaidIcon />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Liquidaciones"
            value={metrics.totalLiquidations}
            icon={<AssessmentIcon />}
          />
        </Grid>

         <Grid size={{ xs: 12, md: 3 }}>
          <MetricCard
            title="Pendientes"
            value={metrics.pendingLiquidations}
            icon={<PendingActionsIcon />}
          />
        </Grid>
      </Grid>


      <Grid
        container
        spacing={3}
        sx={{ mt: 1 }}
      >
         <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard
            title="Liquidaciones pagadas"
            value={metrics.paidLiquidations}
            icon={<PaidIcon />}
          />
        </Grid>

         <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard
            title="Monto recaudado"
            value={`$ ${paidAmount}`}
            icon={<PaidIcon />}
          />
        </Grid>

         <Grid size={{ xs: 12, md: 4 }}>
          <MetricCard
            title="Promedio por liquidación"
            value={`$ ${averageAmount}`}
            icon={<AssessmentIcon />}
          />
        </Grid>
      </Grid>


      <Card
        sx={{
          mt: 4,
          borderRadius: 4,
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{fontWeight: 700}}
            gutterBottom
          >
            Resumen Ejecutivo
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
           <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="body1"
                sx={{ mb: 1 }}
              >
                • El sistema registra actualmente
                un total de
                <strong>
                  {" "}
                  {
                    metrics.totalLiquidations
                  }
                </strong>
                {" "}
                liquidaciones.
              </Typography>

              <Typography
                variant="body1"
                sx={{ mb: 1 }}
              >
                • Se contabilizan
                <strong>
                  {" "}
                  {totalM2} m²
                </strong>
                {" "}
                registrados.
              </Typography>

              <Typography
                variant="body1"
                sx={{ mb: 1 }}
              >
                • El monto total generado es de
                <strong>
                  {" "}
                  $ {totalAmount}
                </strong>
                .
              </Typography>
            </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="body1"
                sx={{ mb: 1 }}
              >
                • Liquidaciones pagadas:
                <strong>
                  {" "}
                  {
                    metrics.paidLiquidations
                  }
                </strong>
                .
              </Typography>

              <Typography
                variant="body1"
                sx={{ mb: 1 }}
              >
                • Monto efectivamente recaudado:
                <strong>
                  {" "}
                  $ {paidAmount}
                </strong>
                .
              </Typography>

              <Typography
                variant="body1"
                sx={{ mb: 1 }}
              >
                • Liquidaciones pendientes:
                <strong>
                  {" "}
                  {
                    metrics.pendingLiquidations
                  }
                </strong>
                .
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

 

      {metrics.lastLiquidation && (
        <Card
          sx={{
            mt: 4,
            borderRadius: 4,
            boxShadow: 2,
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{fontWeight: 700}}
              >
                Última liquidación registrada
              </Typography>

              <Chip
                label="Último movimiento"
                color="primary"
              />
            </Box>

            <Divider sx={{ mb: 3 }} />

            <TableContainer
              component={Paper}
              elevation={0}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Emisión
                    </TableCell>

                    <TableCell>
                      Propietario
                    </TableCell>

                    <TableCell>
                      Total
                    </TableCell>

                    <TableCell>
                      Fecha
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell>
                      #
                      {
                        metrics
                          .lastLiquidation
                          .emissionNumber
                      }
                    </TableCell>

                    <TableCell>
                      {
                        metrics
                          .lastLiquidation
                          .propietario
                      }
                    </TableCell>

                    <TableCell>
                      $
                      {" "}
                      {Number(
                        metrics
                          .lastLiquidation
                          .total || 0
                      ).toLocaleString()}
                    </TableCell>

                    <TableCell>
                      {new Date(
                        metrics
                          .lastLiquidation
                          .createdAt
                      ).toLocaleString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
