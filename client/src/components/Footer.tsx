// src/components/Footer.tsx

import {
  Box,
  Typography,
  Divider,
  Container,
} from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 3,
        borderTop: "1px solid",
        borderColor: "divider",
        backgroundColor: "#fafafa",
      }}
    >
      <Container maxWidth="xl">
        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{fontWeight: 700}}
            >
              Sistema de Liquidaciones
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Municipalidad de la Capital -
              Dirección de Suelo Urbano
            </Typography>
          </Box>

          <Box
            sx={{
              textAlign: {
                xs: "left",
                md: "right",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{fontWeight: 600}}
            >
              Desarrollado por Mariano
              Velarde    © 2026 
            </Typography>

           
          </Box>
        </Box>
      </Container>
    </Box>
  );
}