// src/pages/admin/UserAdmin.tsx

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
  MenuItem,
  Chip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

import { useEffect, useState } from "react";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../api/user.api";

interface User {
  id: number;
  username: string;
  role: "ADMIN" | "GENERADOR" | "COBRADOR";
  createdAt?: string;
  deletedAt?: string | null;
}

const UserAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "GENERADOR",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  //////////////////////////////////////////////////////
  // LOAD USERS
  //////////////////////////////////////////////////////

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  //////////////////////////////////////////////////////
  // HANDLE CHANGE
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

  //////////////////////////////////////////////////////
  // EDIT
  //////////////////////////////////////////////////////

  const handleEdit = (user: User) => {
    setEditingId(user.id);

    setForm({
      username: user.username,
      password: "",
      role: user.role,
    });
  };

  //////////////////////////////////////////////////////
  // CANCEL EDIT
  //////////////////////////////////////////////////////

  const handleCancelEdit = () => {
    setEditingId(null);

    setForm({
      username: "",
      password: "",
      role: "GENERADOR",
    });
  };

  //////////////////////////////////////////////////////
  // SAVE
  //////////////////////////////////////////////////////

  const handleSave = async () => {
    try {
      if (!form.username || (!editingId && !form.password)) {
        alert("Completa los campos obligatorios");
        return;
      }

      if (editingId) {
        await updateUser(editingId, {
          username: form.username,
          ...(form.password && {
            password: form.password,
          }),
          role: form.role,
        });
      } else {
        await createUser({
          username: form.username,
          password: form.password,
          role:  "ADMIN" as "ADMIN" | "GENERADOR" | "COBRADOR"
        });
      }

      handleCancelEdit();
      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Error guardando usuario");
    }
  };

  //////////////////////////////////////////////////////
  // DELETE (lógico luego)
  //////////////////////////////////////////////////////

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Error eliminando usuario");
    }
  };

  //////////////////////////////////////////////////////
  // RENDER
  //////////////////////////////////////////////////////

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{fontWeight: 700}}
        gutterBottom
      >
        Administración de Usuarios
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Crear usuarios, cambiar contraseña y gestionar roles
      </Typography>

      {/* FORM */}
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
              ? "Editar usuario"
              : "Nuevo usuario"}
          </Typography>

          <Grid container spacing={2}>
            <Grid size={4}>
              <TextField
                label="Usuario"
                name="username"
                fullWidth
                size="small"
                value={form.username}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={4}>
              <TextField
                label={
                  editingId
                    ? "Nueva contraseña (opcional)"
                    : "Contraseña"
                }
                name="password"
                type="password"
                fullWidth
                size="small"
                value={form.password}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={4}>
              <TextField
                select
                label="Rol"
                name="role"
                fullWidth
                size="small"
                value={form.role}
                onChange={handleChange}
              >
                <MenuItem value="ADMIN">
                  ADMIN
                </MenuItem>

                <MenuItem value="GENERADOR">
                  GENERADOR
                </MenuItem>

                <MenuItem value="COBRADOR">
                  COBRADOR
                </MenuItem>
              </TextField>
            </Grid>

            <Grid size={12}>
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
                    onClick={handleCancelEdit}
                  >
                    Cancelar
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* TABLE */}
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
            Usuarios registrados
          </Typography>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {user.id}
                  </TableCell>

                  <TableCell>
                    {user.username}
                  </TableCell>

                  <TableCell>
                    {user.role}
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={
                        user.deletedAt
                          ? "Inactivo"
                          : "Activo"
                      }
                      color={
                        user.deletedAt
                          ? "default"
                          : "success"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      onClick={() =>
                        handleEdit(user)
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        handleDelete(user.id)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {!users.length && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                  >
                    No hay usuarios registrados
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

export default UserAdmin;