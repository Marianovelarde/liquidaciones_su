// src/pages/ListLiquidationsPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getLiquidations } from "../api/liquidation.api";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

interface Liquidation {
  id: number;
  propietario: string;
  ubicacion: string;
  superficie: number;
  total: number;
  status: string;
  category?: {
    id: number;
    name: string;
  };
}

export default function ListLiquidationsPage() {
  const [data, setData] = useState<Liquidation[]>([]);
  const navigate = useNavigate();

  const loadLiquidations = async () => {
    try {
      const res = await getLiquidations();
      setData(res.data);
    } catch (error) {
      console.error("Error cargando liquidaciones:", error);
    }
  };

  useEffect(() => {
    loadLiquidations();
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
      >
        Listado de Liquidaciones
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Seleccione una liquidación para ver su detalle
      </Typography>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Propietario</TableCell>
                <TableCell>Ubicación</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Superficie</TableCell>
                <TableCell>Monto</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((l) => (
                <TableRow
                  key={l.id}
                  hover
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(`/liquidacion/${l.id}`)
                  }
                >
                  <TableCell>
                    {l.propietario}
                  </TableCell>

                  <TableCell>
                    {l.ubicacion}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        l.category?.name || "Sin categoría"
                      }
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>

                  <TableCell>
                    {l.superficie} m²
                  </TableCell>

                  <TableCell>
                    $
                    {Number(l.total).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={l.status}
                      size="small"
                      color="success"
                    />
                  </TableCell>
                </TableRow>
              ))}

              {!data.length && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                  >
                    No hay liquidaciones registradas
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}