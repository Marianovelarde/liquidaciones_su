// src/pages/ListLiquidationsPage.tsx

import { useEffect, useMemo, useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
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

const statusOrder = {
  PENDIENTE_DE_PAGO: 1,
  EN_REVISION: 2,
  OBSERVADO: 3,
  PAGADO: 4,
  ANULADO: 5,
};

export default function ListLiquidationsPage() {
  const [data, setData] = useState<Liquidation[]>([]);

  const [sortBy, setSortBy] =
    useState("propietario_asc");

  const navigate = useNavigate();

  //////////////////////////////////////////////////////
  // LOAD
  //////////////////////////////////////////////////////

  const loadLiquidations = async () => {
    try {
      const res = await getLiquidations();

      setData(res.data);
    } catch (error) {
      console.error(
        "Error cargando liquidaciones:",
        error
      );
    }
  };

  useEffect(() => {
    loadLiquidations();
  }, []);

  //////////////////////////////////////////////////////
  // SORT
  //////////////////////////////////////////////////////

  const sortedData = useMemo(() => {
    const cloned = [...data];

    switch (sortBy) {
      //////////////////////////////////////////////////
      // PROPIETARIO
      //////////////////////////////////////////////////

      case "propietario_asc":
        return cloned.sort((a, b) =>
          a.propietario.localeCompare(
            b.propietario
          )
        );

      case "propietario_desc":
        return cloned.sort((a, b) =>
          b.propietario.localeCompare(
            a.propietario
          )
        );

      //////////////////////////////////////////////////
      // MONTO
      //////////////////////////////////////////////////

      case "total_asc":
        return cloned.sort(
          (a, b) => a.total - b.total
        );

      case "total_desc":
        return cloned.sort(
          (a, b) => b.total - a.total
        );

      //////////////////////////////////////////////////
      // SUPERFICIE
      //////////////////////////////////////////////////

      case "superficie_asc":
        return cloned.sort(
          (a, b) =>
            a.superficie - b.superficie
        );

      case "superficie_desc":
        return cloned.sort(
          (a, b) =>
            b.superficie - a.superficie
        );

      //////////////////////////////////////////////////
      // STATUS
      //////////////////////////////////////////////////

      case "status_asc":
        return cloned.sort(
          (a, b) =>
            statusOrder[
              a.status as keyof typeof statusOrder
            ] -
            statusOrder[
              b.status as keyof typeof statusOrder
            ]
        );

      case "status_desc":
        return cloned.sort(
          (a, b) =>
            statusOrder[
              b.status as keyof typeof statusOrder
            ] -
            statusOrder[
              a.status as keyof typeof statusOrder
            ]
        );

      default:
        return cloned;
    }
  }, [data, sortBy]);

  //////////////////////////////////////////////////////
  // CHIP COLOR
  //////////////////////////////////////////////////////

  const getStatusColor = (
    status: string
  ):
    | "default"
    | "success"
    | "warning"
    | "error"
    | "info" => {
    switch (status) {
      case "PAGADO":
        return "success";

      case "PENDIENTE_DE_PAGO":
        return "warning";

      case "EN_REVISION":
        return "info";

      case "OBSERVADO":
        return "error";

      case "ANULADO":
        return "default";

      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{fontWeight: 700}}
        gutterBottom
      >
        Listado de Liquidaciones
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Seleccione una liquidación para ver
        su detalle
      </Typography>

      {/* ================================= */}
      {/* FILTRO ORDEN */}
      {/* ================================= */}

      <Grid
        container
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth size="small">
            <InputLabel>
              Ordenar por
            </InputLabel>

            <Select
              value={sortBy}
              label="Ordenar por"
              onChange={(e) =>
                setSortBy(e.target.value)
              }
            >
              <MenuItem value="propietario_asc">
                Propietario A-Z
              </MenuItem>

              <MenuItem value="propietario_desc">
                Propietario Z-A
              </MenuItem>

              <MenuItem value="total_asc">
                Monto menor a mayor
              </MenuItem>

              <MenuItem value="total_desc">
                Monto mayor a menor
              </MenuItem>

              <MenuItem value="superficie_asc">
                Superficie menor a mayor
              </MenuItem>

              <MenuItem value="superficie_desc">
                Superficie mayor a menor
              </MenuItem>

              <MenuItem value="status_asc">
                Estado:
                Pendiente → Pagado
              </MenuItem>

              <MenuItem value="status_desc">
                Estado:
                Pagado → Pendiente
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* ================================= */}
      {/* TABLA */}
      {/* ================================= */}

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
                <TableCell>
                  Propietario
                </TableCell>

                <TableCell>
                  Ubicación
                </TableCell>

                <TableCell>
                  Categoría
                </TableCell>

                <TableCell>
                  Superficie
                </TableCell>

                <TableCell>
                  Monto
                </TableCell>

                <TableCell>
                  Estado
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sortedData.map((l) => (
                <TableRow
                  key={l.id}
                  hover
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate(
                      `/liquidacion/${l.id}`
                    )
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
                        l.category?.name ||
                        "Sin categoría"
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
                    {Number(
                      l.total
                    ).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={l.status}
                      size="small"
                      color={getStatusColor(
                        l.status
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}

              {!sortedData.length && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                  >
                    No hay liquidaciones
                    registradas
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