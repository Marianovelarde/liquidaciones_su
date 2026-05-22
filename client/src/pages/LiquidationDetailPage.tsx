// src/pages/LiquidationDetailPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getLiquidationById,
  updateLiquidation,
  changeLiquidationStatus,
} from "../api/liquidation.api";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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

  const auth = JSON.parse(
    localStorage.getItem("auth") || "{}"
  );

  const user = auth?.user || {};

  const isAdmin = user?.role === "ADMIN";

  const canChangeStatus =
    user?.role === "ADMIN" ||
    user?.role === "COBRADOR" ||
    user?.role === "GENERADOR";

  //////////////////////////////////////////////////////
  // NUEVO
  //////////////////////////////////////////////////////

  const canEditPaymentData =
    user?.role === "ADMIN" ||
    user?.role === "COBRADOR" ||
    user?.role === "GENERADOR";

  //////////////////////////////////////////////////////
  // STATES
  //////////////////////////////////////////////////////

  const [form, setForm] = useState<any>(null);

  const [openStatusModal, setOpenStatusModal] =
    useState(false);

  const [pendingStatus, setPendingStatus] =
    useState("");

  const [feedbackModal, setFeedbackModal] =
    useState(false);

  const [feedbackMessage, setFeedbackMessage] =
    useState("");

  const [feedbackType, setFeedbackType] =
    useState<"success" | "error">(
      "success"
    );

  //////////////////////////////////////////////////////
  // LOAD
  //////////////////////////////////////////////////////

  const loadLiquidation = async () => {
    try {
      const res = await getLiquidationById(
        Number(id)
      );

      setForm(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadLiquidation();
  }, []);

  //////////////////////////////////////////////////////
  // HANDLE CHANGE
  //////////////////////////////////////////////////////

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  //////////////////////////////////////////////////////
  // SAVE
  //////////////////////////////////////////////////////

  const handleSave = async () => {
    try {
      await updateLiquidation(
        Number(id),
        form
      );

      setFeedbackType("success");

      setFeedbackMessage(
        "Liquidación actualizada correctamente."
      );

      setFeedbackModal(true);

      loadLiquidation();
    } catch (error) {
      console.error(error);

      setFeedbackType("error");

      setFeedbackMessage(
        "Error actualizando liquidación."
      );

      setFeedbackModal(true);
    }
  };

  //////////////////////////////////////////////////////
  // CHANGE STATUS
  //////////////////////////////////////////////////////

  const handleOpenStatusModal = (
    newStatus: string
  ) => {
    setPendingStatus(newStatus);

    setOpenStatusModal(true);
  };

  //////////////////////////////////////////////////////
  // CONFIRMAR CAMBIO STATUS
  //////////////////////////////////////////////////////

  const handleConfirmStatusChange =
    async () => {
      try {
        await changeLiquidationStatus(
          Number(id),
          pendingStatus
        );

        setForm((prev: any) => ({
          ...prev,
          status: pendingStatus,
        }));

        setOpenStatusModal(false);

        setFeedbackType("success");

        setFeedbackMessage(
          `Estado actualizado correctamente a "${pendingStatus}".`
        );

        setFeedbackModal(true);
      } catch (error) {
        console.error(error);

        setFeedbackType("error");

        setFeedbackMessage(
          "Ocurrió un error al cambiar el estado."
        );

        setFeedbackModal(true);
      }
    };

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (!form) {
    return <Typography>Cargando...</Typography>;
  }

  //////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
      >
        Detalle de Liquidación
      </Typography>

      {!isAdmin && (
        <Typography
          color="warning.main"
          sx={{ mb: 2 }}
        >
          Solo puede modificar el estado
          de la liquidación.
        </Typography>
      )}

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            {/* IDENTIFICACIÓN */}

            <Grid size={{ xs: 12 }}>
              <Typography variant="h6">
                Identificación
              </Typography>

              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Liquidación N°"
                fullWidth
                value={
                  form.emissionNumber || ""
                }
                disabled={!isAdmin}
                name="emissionNumber"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Propietario"
                fullWidth
                value={form.propietario || ""}
                disabled={!isAdmin}
                name="propietario"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Concepto"
                fullWidth
                value={form.concepto || ""}
                disabled={!isAdmin}
                name="concepto"
                onChange={handleChange}
              />
            </Grid>

            {/* EXPEDIENTE */}

            <Grid size={{ xs: 12 }}>
              <Typography
                variant="h6"
                sx={{ mt: 2 }}
              >
                Expediente
              </Typography>

              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Expediente Nº"
                fullWidth
                value={
                  form.expedienteNumero || ""
                }
                disabled={!isAdmin}
                name="expedienteNumero"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Código"
                fullWidth
                value={
                  form.expedienteCodigo || ""
                }
                disabled={!isAdmin}
                name="expedienteCodigo"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Año"
                fullWidth
                value={
                  form.expedienteAnio || ""
                }
                disabled={!isAdmin}
                name="expedienteAnio"
                onChange={handleChange}
              />
            </Grid>

            {/* CARPETA */}

            <Grid size={{ xs: 12 }}>
              <Typography
                variant="h6"
                sx={{ mt: 2 }}
              >
                Carpeta
              </Typography>

              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Carpeta Nº"
                fullWidth
                value={
                  form.carpetaNumero || ""
                }
                disabled={!isAdmin}
                name="carpetaNumero"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Letra"
                fullWidth
                value={
                  form.carpetaLetra || ""
                }
                disabled={!isAdmin}
                name="carpetaLetra"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Año Carpeta"
                fullWidth
                value={
                  form.carpetaAnio || ""
                }
                disabled={!isAdmin}
                name="carpetaAnio"
                onChange={handleChange}
              />
            </Grid>

            {/* PADRÓN */}

            <Grid size={{ xs: 12 }}>
              <Typography
                variant="h6"
                sx={{ mt: 2 }}
              >
                Padrón
              </Typography>

              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Distrito"
                fullWidth
                value={form.distrito || ""}
                disabled={!isAdmin}
                name="distrito"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Zona"
                fullWidth
                value={form.zona || ""}
                disabled={!isAdmin}
                name="zona"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Manzana"
                fullWidth
                value={form.manzana || ""}
                disabled={!isAdmin}
                name="manzana"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Parcela"
                fullWidth
                value={form.parcela || ""}
                disabled={!isAdmin}
                name="parcela"
                onChange={handleChange}
              />
            </Grid>

            {/* OBRA */}

            <Grid size={{ xs: 12 }}>
              <Typography
                variant="h6"
                sx={{ mt: 2 }}
              >
                Datos de la Obra
              </Typography>

              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Ubicación"
                fullWidth
                value={form.ubicacion || ""}
                disabled={!isAdmin}
                name="ubicacion"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Tipo de Obra"
                fullWidth
                value={form.tipoObra || ""}
                disabled={!isAdmin}
                name="tipoObra"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Superficie"
                fullWidth
                value={form.superficie || ""}
                disabled={!isAdmin}
                name="superficie"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Total"
                fullWidth
                value={form.total || ""}
                disabled={!isAdmin}
                name="total"
                onChange={handleChange}
              />
            </Grid>

            {/* STATUS */}

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                label="Estado"
                fullWidth
                value={form.status || ""}
                disabled={!canChangeStatus}
                onChange={(e) =>
                  handleOpenStatusModal(
                    e.target.value
                  )
                }
              >
                {statusOptions.map(
                  (status) => (
                    <MenuItem
                      key={status}
                      value={status}
                    >
                      {status}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Grid>

            {/* NUEVO CAMPO */}

            {form.status === "PAGADO" && (
              <Grid
                size={{ xs: 12, md: 6 }}
              >
                <TextField
                  label="N° de Boleta"
                  fullWidth
                  value={
                    form.receiptNumber || ""
                  }
                  disabled={
  !isAdmin &&
  !!form.receiptNumber
}
                  name="receiptNumber"
                  onChange={handleChange}
                />
              </Grid>
            )}

            {/* OBSERVACIONES */}

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Observaciones"
                fullWidth
                multiline
                rows={4}
                value={
                  form.observations || ""
                }
               disabled={!isAdmin}
                name="observations"
                onChange={handleChange}
              />
            </Grid>

            {/* BOTONES */}

            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 3,
                }}
              >
                {(isAdmin ||
                  canEditPaymentData) && (
                  <Button
                    variant="contained"
                    onClick={handleSave}
                  >
                    Guardar cambios
                  </Button>
                )}

                <Button
                  variant="outlined"
                  onClick={() =>
                    navigate(-1)
                  }
                >
                  Volver
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* MODAL FEEDBACK */}

      <Dialog
        open={feedbackModal}
        onClose={() =>
          setFeedbackModal(false)
        }
      >
        <DialogTitle>
          {feedbackType === "success"
            ? "Operación exitosa"
            : "Error"}
        </DialogTitle>

        <DialogContent>
          <Typography>
            {feedbackMessage}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            color={
              feedbackType === "success"
                ? "primary"
                : "error"
            }
            onClick={() =>
              setFeedbackModal(false)
            }
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

      {/* MODAL STATUS */}

      <Dialog
        open={openStatusModal}
        onClose={() =>
          setOpenStatusModal(false)
        }
      >
        <DialogTitle>
          Confirmar cambio de estado
        </DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            ¿Está seguro de cambiar el
            estado de la liquidación?
          </Typography>

          <Typography>
            Estado actual:
            <strong>
              {" "}
              {form.status}
            </strong>
          </Typography>

          <Typography>
            Nuevo estado:
            <strong>
              {" "}
              {pendingStatus}
            </strong>
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Usuario:
            <strong>
              {" "}
              {user.username}
            </strong>
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setOpenStatusModal(false)
            }
          >
            Cancelar
          </Button>

          <Button
            variant="contained"
            color="warning"
            onClick={
              handleConfirmStatusChange
            }
          >
            Confirmar cambio
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}