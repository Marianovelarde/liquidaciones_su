// src/pages/admin/AuditAdmin.tsx

import { useEffect, useState } from "react";

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
  CircularProgress,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { getAuditLogs } from "../api/audit.api";

interface AuditLog {
  id: number;

  action: string;

  field: string | null;

  oldValue: string | null;

  newValue: string | null;

  ipAddress: string | null;

  createdAt: string;

  user: {
    id: number;
    username: string;
    role: string;
  };

  liquidation: {
    id: number;
    emissionNumber: number;
    propietario: string;
    ubicacion: string;
    status: string;
  };
}

const getActionColor = (action: string) => {
  switch (action) {
    case "CREATE":
      return "success";

    case "UPDATE":
      return "info";

    case "DELETE":
      return "error";

    case "STATUS_CHANGE":
      return "warning";

    default:
      return "default";
  }
};

const isJson = (value: string | null) => {
  if (!value) return false;

  try {
    JSON.parse(value);

    return true;
  } catch {
    return false;
  }
};

export default function AuditAdmin() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] = useState("");

  const [actionFilter, setActionFilter] =
    useState("ALL");

  //////////////////////////////////////////////////////
  // LOAD AUDIT
  //////////////////////////////////////////////////////

  const loadAuditLogs = async () => {
    try {
      setLoading(true);

      const res = await getAuditLogs();

      setLogs(res.data);
    } catch (error) {
      console.error(
        "Error cargando auditoría:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuditLogs();
  }, []);

  //////////////////////////////////////////////////////
  // FILTERS
  //////////////////////////////////////////////////////

  const filteredLogs = logs.filter(
    (log) => {
      const matchesSearch =
        log.user.username
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        log.liquidation.propietario
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        log.liquidation.emissionNumber
          .toString()
          .includes(search);

      const matchesAction =
        actionFilter === "ALL" ||
        log.action === actionFilter;

      return (
        matchesSearch && matchesAction
      );
    }
  );

  //////////////////////////////////////////////////////
  // RENDER DETAILS
  //////////////////////////////////////////////////////

  const renderDetail = (log: AuditLog) => {
    //////////////////////////////////////////////////////
    // UPDATE DETALLADO
    //////////////////////////////////////////////////////

    if (
      log.action === "UPDATE" &&
      isJson(log.oldValue) &&
      isJson(log.newValue)
    ) {
      const oldData = JSON.parse(
        log.oldValue as string
      );

      const newData = JSON.parse(
        log.newValue as string
      );

      const changes = Object.keys(
        newData
      ).filter(
        (key) =>
          JSON.stringify(oldData[key]) !==
          JSON.stringify(newData[key])
      );

      return (
        <Accordion
          sx={{
            boxShadow: "none",
            border: "1px solid #eee",
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon />
            }
          >
            <Typography
              variant="body2"
              sx={{fontWeight: 600}}
            >
              Ver cambios
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            {changes.map((field) => (
              <Box
                key={field}
                sx={{
                  mb: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{fontWeight:600}}
                >
                  {field}
                </Typography>

                <Typography
                  variant="body2"
                  color="error"
                >
                  Antes:{" "}
                  {String(
                    oldData[field]
                  )}
                </Typography>

                <Typography
                  variant="body2"
                  color="success.main"
                >
                  Después:{" "}
                  {String(
                    newData[field]
                  )}
                </Typography>

                <Divider
                  sx={{ mt: 1 }}
                />
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      );
    }

    //////////////////////////////////////////////////////
    // STATUS CHANGE
    //////////////////////////////////////////////////////

    if (
      log.action ===
      "STATUS_CHANGE"
    ) {
      return (
        <Box>
          <Typography
            variant="body2"
            color="error"
          >
            {log.oldValue}
          </Typography>

          <Typography
            variant="body2"
            color="success.main"
           sx={{fontWeight: 700}}
          >
            {log.newValue}
          </Typography>
        </Box>
      );
    }

    //////////////////////////////////////////////////////
    // CREATE / DELETE
    //////////////////////////////////////////////////////

    return (
      <Box>
        {log.oldValue && (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {log.oldValue}
          </Typography>
        )}

        {log.newValue && (
          <Typography
            variant="body2"
            sx={{fontWeight: 600}}
          >
            {log.newValue}
          </Typography>
        )}
      </Box>
    );
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
        Auditoría del Sistema
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Registro completo de acciones
        realizadas por los usuarios
      </Typography>


      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Buscar"
          size="small"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Usuario, propietario o emisión"
        />

        <TextField
          select
          label="Acción"
          size="small"
          value={actionFilter}
          onChange={(e) =>
            setActionFilter(
              e.target.value
            )
          }
          sx={{
            minWidth: 180,
          }}
        >
          <MenuItem value="ALL">
            Todas
          </MenuItem>

          <MenuItem value="CREATE">
            CREATE
          </MenuItem>

          <MenuItem value="UPDATE">
            UPDATE
          </MenuItem>

          <MenuItem value="DELETE">
            DELETE
          </MenuItem>

          <MenuItem value="STATUS_CHANGE">
            STATUS_CHANGE
          </MenuItem>
        </TextField>
      </Box>

    

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 1,
        }}
      >
        <CardContent>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "center",
                py: 6,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Fecha
                  </TableCell>

                  <TableCell>
                    Usuario
                  </TableCell>

                  <TableCell>
                    Rol
                  </TableCell>

                  <TableCell>
                    Acción
                  </TableCell>

                  <TableCell>
                    Liquidación
                  </TableCell>

                  <TableCell>
                    Detalle
                  </TableCell>

                  <TableCell>
                    IP
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredLogs.map(
                  (log) => (
                    <TableRow
                      key={log.id}
                    >
                      <TableCell>
                        {new Date(
                          log.createdAt
                        ).toLocaleString()}
                      </TableCell>

                      <TableCell>
                        {
                          log.user
                            .username
                        }
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={
                            log.user.role
                          }
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={
                            log.action
                          }
                          size="small"
                          color={
                            getActionColor(
                              log.action
                            ) as any
                          }
                        />
                      </TableCell>

                      <TableCell>
                        #
                        {
                          log
                            .liquidation
                            .emissionNumber
                        }
                      </TableCell>

                      <TableCell
                        sx={{
                          minWidth: 350,
                        }}
                      >
                        {renderDetail(
                          log
                        )}
                      </TableCell>

                      <TableCell>
                        {log.ipAddress ||
                          "-"}
                      </TableCell>
                    </TableRow>
                  )
                )}

                {!filteredLogs.length && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      align="center"
                    >
                      No hay registros
                      de auditoría
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}