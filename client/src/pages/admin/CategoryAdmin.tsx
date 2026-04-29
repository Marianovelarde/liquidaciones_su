// src/pages/admin/CategoryAdmin.tsx

import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/category.api";

interface Category {
  id: number;
  name: string;
  coefficient: number;
  pricePerM2: number;
  deletedAt?: string | null;
}

const CategoryAdmin = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [form, setForm] = useState({
    name: "",
    coefficient: "",
    pricePerM2: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  //////////////////////////////////////////////////////
  // CARGAR CATEGORÍAS
  //////////////////////////////////////////////////////

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  //////////////////////////////////////////////////////
  // FORM
  //////////////////////////////////////////////////////

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      name: "",
      coefficient: "",
      pricePerM2: "",
    });

    setEditingId(null);
  };

  //////////////////////////////////////////////////////
  // EDITAR
  //////////////////////////////////////////////////////

  const handleEdit = (category: Category) => {
    setEditingId(category.id);

    setForm({
      name: category.name,
      coefficient: String(category.coefficient),
      pricePerM2: String(category.pricePerM2),
    });
  };

  //////////////////////////////////////////////////////
  // GUARDAR (CREATE / UPDATE)
  //////////////////////////////////////////////////////

  const handleSave = async () => {
    try {
      const payload = {
        name: form.name.trim(),
        coefficient: Number(form.coefficient),
        pricePerM2: Number(form.pricePerM2),
      };

      if (
        !payload.name ||
        isNaN(payload.coefficient) ||
        isNaN(payload.pricePerM2)
      ) {
        alert("Complete correctamente todos los campos");
        return;
      }

      if (editingId) {
        await updateCategory(editingId, payload);
      } else {
        await createCategory(payload);
      }

      resetForm();
      loadCategories();
    } catch (error) {
      console.error("Error guardando categoría:", error);
      alert("Error al guardar la categoría");
    }
  };

  //////////////////////////////////////////////////////
  // DELETE LÓGICO
  //////////////////////////////////////////////////////

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Desea eliminar esta categoría?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.error("Error eliminando categoría:", error);
      alert("Error al eliminar la categoría");
    }
  };

  //////////////////////////////////////////////////////
  // UI
  //////////////////////////////////////////////////////

  return (
    <Box>
      {/* TÍTULO */}
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
      >
        Administración de Categorías
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Gestión de categorías, coeficientes y valor por m²
      </Typography>

      {/* FORMULARIO */}
      <Card
        sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
          >
            {editingId
              ? "Editar categoría"
              : "Nueva categoría"}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Nombre"
                name="name"
                fullWidth
                size="small"
                value={form.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Coeficiente"
                name="coefficient"
                fullWidth
                size="small"
                value={form.coefficient}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                label="Precio por m²"
                name="pricePerM2"
                fullWidth
                size="small"
                value={form.pricePerM2}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                >
                  {editingId
                    ? "Actualizar"
                    : "Guardar"}
                </Button>

                {editingId && (
                  <Button
                    variant="outlined"
                    onClick={resetForm}
                  >
                    Cancelar
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* TABLA */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
          >
            Categorías registradas
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Coeficiente</TableCell>
                <TableCell>Precio/m²</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    {category.id}
                  </TableCell>

                  <TableCell>
                    {category.name}
                  </TableCell>

                  <TableCell>
                    {category.coefficient}
                  </TableCell>

                  <TableCell>
                    $
                    {Number(
                      category.pricePerM2
                    ).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        category.deletedAt
                          ? "Inactiva"
                          : "Activa"
                      }
                      color={
                        category.deletedAt
                          ? "default"
                          : "success"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      onClick={() =>
                        handleEdit(category)
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        handleDelete(category.id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {!categories.length && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                  >
                    No hay categorías registradas
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CategoryAdmin;