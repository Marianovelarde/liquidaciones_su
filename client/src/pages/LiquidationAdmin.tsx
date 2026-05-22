// src/pages/admin/LiquidationAdmin.tsx

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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  getLiquidations,
  deleteLiquidation,
} from "../api/liquidation.api";

import {
  useEffect,
  useState,
} from "react";

interface Liquidation {
  id: number;
  propietario: string;
  ubicacion: string;
  superficie: number;
  total: number;
  status: string;

  category?: {
    name: string;
  };
}

export default function LiquidationAdmin() {
  const [data, setData] = useState<
    Liquidation[]
  >([]);

  const [selectedId, setSelectedId] =
    useState<number | null>(null);

  const [openDelete, setOpenDelete] =
    useState(false);

  const loadLiquidations = async () => {
    try {
      const res =
        await getLiquidations();

      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLiquidations();
  }, []);

  const handleOpenDelete = (
    id: number
  ) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    try {
      if (!selectedId) return;

      await deleteLiquidation(
        selectedId
      );

      setData((prev) =>
        prev.filter(
          (l) => l.id !== selectedId
        )
      );

      setOpenDelete(false);

      alert(
        "Liquidación eliminada"
      );
    } catch (error) {
      console.error(error);
      alert(
        "Error eliminando liquidación"
      );
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{fontWeight: 700}}
        gutterBottom
      >
        Gestión de Liquidaciones
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Administración completa de
        liquidaciones
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
                <TableCell>
                  ID
                </TableCell>

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
                  Total
                </TableCell>

                <TableCell>
                  Estado
                </TableCell>

                <TableCell align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((l) => (
                <TableRow key={l.id}>
                  <TableCell>
                    {l.id}
                  </TableCell>

                  <TableCell>
                    {l.propietario}
                  </TableCell>

                  <TableCell>
                    {l.ubicacion}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        l.category
                          ?.name ||
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
                      color="success"
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      color="error"
                      variant="contained"
                      startIcon={
                        <DeleteIcon />
                      }
                      sx={{
                        height: 30,
                        width: "100%",
                      }}
                      onClick={() =>
                        handleOpenDelete(
                          l.id
                        )
                      }
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {!data.length && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                  >
                    No hay liquidaciones
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* MODAL DELETE */}

      <Dialog
        open={openDelete}
        onClose={() =>
          setOpenDelete(false)
        }
      >
        <DialogTitle>
          Confirmar eliminación
        </DialogTitle>

        <DialogContent>
          ¿Está seguro que desea
          eliminar esta liquidación?
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setOpenDelete(false)
            }
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}