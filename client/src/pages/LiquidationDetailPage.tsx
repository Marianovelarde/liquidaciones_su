// src/pages/LiquidationDetailPage.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../api/category.api";
import LiquidationPrint from "./LiquidationPrint";
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

  const canEditLiquidation =
  user?.role === "ADMIN" ||
  user?.role === "GENERADOR";


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

  const [categories, setCategories] = useState<any[]>([]);

  const [openPrint, setOpenPrint] = useState(false);
  
const [selectedCategory, setSelectedCategory] =
  useState<any>(null);

  const [openStatusModal, setOpenStatusModal] =
    useState(false);

  const [pendingStatus, setPendingStatus] =
    useState("");

  const [feedbackModal, setFeedbackModal] =
    useState(false);

    const [originalReceiptNumber, setOriginalReceiptNumber] =
  useState("");

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
    const res = await getLiquidationById(Number(id));

setForm(res.data);

const categoriesResponse = await getCategories();

setCategories(categoriesResponse.data);

const category = categoriesResponse.data.find(
  (c: any) => c.id === res.data.categoryId
);

setSelectedCategory(category || null);

setOriginalReceiptNumber(
  res.data.receiptNumber || ""
);
    } catch (error) {
      console.error(error);
    }
  };

useEffect(() => {
  loadLiquidation();

  getCategories().then((res) => {
    setCategories(res.data);
  });

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


  const subtotal =
  (form.superficie || 0) *
  (selectedCategory?.coefficient || 0) *
  (selectedCategory?.pricePerM2 || 0);

  const surchargeBase =
  form.isFullSurcharge
    ? form.superficie
    : form.surchargeSurface || 0;

    const surchargeSubtotal =
  surchargeBase *
  (selectedCategory?.coefficient || 0) *
  (selectedCategory?.pricePerM2 || 0);


  const surchargeValue =
  form.hasSurcharge
    ? surchargeSubtotal *
      ((form.surchargePercent || 0) / 100)
    : 0;

    const totalFinal =
  subtotal + surchargeValue;


  return (
    <Box>
      <Typography
        variant="h4"
        sx={{fontWeight: 700}}
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
                disabled={!canEditLiquidation}
                name="emissionNumber"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Propietario"
                fullWidth
                value={form.propietario || ""}
                disabled={!canEditLiquidation}
                name="propietario"
                onChange={handleChange}
              />
            </Grid>

             <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="cuil"
                fullWidth
                value={form.cuil || ""}
                disabled={!canEditLiquidation}
                name="cuil"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Concepto"
                fullWidth
                value={form.concepto || ""}
                disabled={!canEditLiquidation}
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
                disabled={!canEditLiquidation}
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
                disabled={!canEditLiquidation}
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
                disabled={!canEditLiquidation}
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
                disabled={!canEditLiquidation}
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
                disabled={!canEditLiquidation}
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
                disabled={!canEditLiquidation}
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
                disabled={!canEditLiquidation}
                name="distrito"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Zona"
                fullWidth
                value={form.zona || ""}
                disabled={!canEditLiquidation}
                name="zona"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Manzana"
                fullWidth
                value={form.manzana || ""}
                disabled={!canEditLiquidation}
                name="manzana"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                label="Parcela"
                fullWidth
                value={form.parcela || ""}
                disabled={!canEditLiquidation}
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
                disabled={!canEditLiquidation}
                name="ubicacion"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Tipo de Obra"
                fullWidth
                value={form.tipoObra || ""}
                disabled={!canEditLiquidation}
                name="tipoObra"
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Superficie"
                fullWidth
                value={form.superficie || ""}
                disabled={!canEditLiquidation}
                name="superficie"
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
  <TextField
    select
    label="Categoría"
    fullWidth
    name="categoryId"
    value={form.categoryId || ""}
    disabled={!canEditLiquidation}
    onChange={(e) => {
      const value = Number(e.target.value);

      setForm((prev: any) => ({
        ...prev,
        categoryId: value,
      }));

      const cat = categories.find(
        (c: any) => c.id === value
      );

      setSelectedCategory(cat || null);
    }}
  >
    {categories.map((cat: any) => (
      <MenuItem key={cat.id} value={cat.id}>
        {cat.name} | Coef. {cat.coefficient}
      </MenuItem>
    ))}
  </TextField>
</Grid>
   <Grid size={{ xs: 12, md: 4 }}>
  <TextField
    select
    label="¿Tiene recargo?"
    fullWidth
    name="hasSurcharge"
    value={form.hasSurcharge ? "SI" : "NO"}
    disabled={!canEditLiquidation}
    onChange={(e) => {
      const hasSurcharge = e.target.value === "SI";

      setForm((prev: any) => ({
        ...prev,
        hasSurcharge,

        // Limpiar los datos si deja de tener recargo
        surchargePercent: hasSurcharge
          ? prev.surchargePercent
          : "",

        isFullSurcharge: hasSurcharge
          ? prev.isFullSurcharge
          : false,

        surchargeSurface: hasSurcharge
          ? prev.surchargeSurface
          : "",
      }));
    }}
  >
    <MenuItem value="NO">No</MenuItem>
    <MenuItem value="SI">Sí</MenuItem>
  </TextField>
</Grid>

{form.hasSurcharge && (
  <>
    <Grid size={{ xs: 12, md: 4 }}>
      <TextField
        label="Recargo (%)"
        fullWidth
        name="surchargePercent"
        value={form.surchargePercent ?? ""}
        disabled={!canEditLiquidation}
        onChange={handleChange}
      />
    </Grid>

    <Grid size={{ xs: 12, md: 4 }}>
      <TextField
        select
        label="¿El recargo aplica sobre toda la superficie?"
        fullWidth
        value={form.isFullSurcharge ? "SI" : "NO"}
        disabled={!canEditLiquidation}
        onChange={(e) => {
          const full = e.target.value === "SI";

          setForm((prev: any) => ({
            ...prev,
            isFullSurcharge: full,
            surchargeSurface: full
              ? prev.superficie
              : prev.surchargeSurface ?? "",
          }));
        }}
      >
        <MenuItem value="SI">Sí</MenuItem>
        <MenuItem value="NO">No</MenuItem>
      </TextField>
    </Grid>

    {!form.isFullSurcharge && (
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          label="Superficie con recargo (m²)"
          name="surchargeSurface"
          fullWidth
          value={form.surchargeSurface ?? ""}
          disabled={!canEditLiquidation}
          onChange={handleChange}
        />
      </Grid>
    )}
  </>
)}

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="Total"
                fullWidth
                value={form.total || ""}
                disabled={!canEditLiquidation}
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
  value={form.receiptNumber || ""}
  disabled={
    !canEditLiquidation &&
    !!originalReceiptNumber
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
               disabled={!canEditLiquidation}
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
                {(canEditLiquidation ||
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
            <Button
  variant="outlined"
  onClick={() => setOpenPrint(true)}
>
  Imprimir
</Button>

<LiquidationPrint
  open={openPrint}
  onClose={() => setOpenPrint(false)}
  liquidation={form}
  category={selectedCategory}
  subtotal={subtotal}
  surchargeValue={surchargeValue}
  totalFinal={totalFinal}
/>
    </Box>
  );
}