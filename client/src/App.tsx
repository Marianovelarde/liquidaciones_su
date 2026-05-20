import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";

import { useEffect } from "react";


import { useSelector, useDispatch } from "react-redux";

import { Container } from "@mui/material";

import Navbar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./pages/HomePage";
import CreateLiquidationPage from "./pages/CreateLiquidationPage";
import ListLiquidationsPage from "./pages/ListLiquidationsPage";
import AdminPanel from "./pages/AdminPanel";
import LiquidationDetailPage from "./pages/LiquidationDetailPage";
import FiltersPage from "./pages/FilterPage";
import LoginPage from "./pages/LoginPage";
import AuditAdmin from "./pages/AuditAdmin";
import AdminMetrics from "./pages/admin/AdminMetrics";
import Footer from "./components/Footer";
import { logout } from "./api/slice/authSlice";


function App() {

  const token = useSelector(
    (state: any) => state.auth.token
  );

  const dispatch = useDispatch();

const expiresAt = useSelector(
  (state: any) => state.auth.expiresAt
);

useEffect(() => {
  const interval = setInterval(() => {
    if (
      expiresAt &&
      Date.now() > expiresAt
    ) {
      dispatch(logout());
    }
  }, 1000);

  return () => clearInterval(interval);
}, [expiresAt]);

  return (
    <BrowserRouter>
      {token && <Navbar />}

      <Container sx={{ mt: 4 }}>
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />

          {/* CREAR */}
          <Route
            path="/crear"
            element={
              <ProtectedRoute
                roles={[
                  "ADMIN",
                  "GENERADOR",
                ]}
              >
                <CreateLiquidationPage />
              </ProtectedRoute>
            }
          />

          {/* LISTAR */}
          <Route
            path="/listar"
            element={
              <ProtectedRoute>
                <ListLiquidationsPage />
              </ProtectedRoute>
            }
          />

          {/* FILTROS */}
          <Route
            path="/filtros"
            element={
              <ProtectedRoute>
                <FiltersPage />
              </ProtectedRoute>
            }
          />

          {/* DETALLE */}
          <Route
            path="/liquidacion/:id"
            element={
              <ProtectedRoute>
                <LiquidationDetailPage />
              </ProtectedRoute>
            }
          />

          {/* PANEL ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                roles={["ADMIN"]}
              >
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          {/* AUDITORÍA */}
          <Route
            path="/admin/auditoria"
            element={
              <ProtectedRoute
                roles={["ADMIN"]}
              >
                <AuditAdmin />
              </ProtectedRoute>
            }
          />
        {/* METRICAS */}

        <Route
        path="/admin/metricas"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <AdminMetrics/>
          </ProtectedRoute>
        }/>
          {/* LOGIN */}
          <Route
            path="/login"
            element={<LoginPage />}
          />
        </Routes>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;