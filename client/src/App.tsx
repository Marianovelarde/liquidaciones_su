import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import { useSelector} from 'react-redux';
import HomePage from "./pages/HomePage";
import CreateLiquidationPage from "./pages/CreateLiquidationPage";
import ListLiquidationsPage from "./pages/ListLiquidationsPage";
import AdminPanel from "./pages/AdminPanel";
import LiquidationDetailPage from "./pages/LiquidationDetailPage";
import FiltersPage from "./pages/FilterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Container } from "@mui/material";
function App() {

  const token = useSelector(
    (state: any) => state.auth.token
  );

  return (
    <BrowserRouter>
    {token && <Navbar />}
      <Container sx={{ mt: 4 }}>
        <Routes>
          //HomePage es la página de inicio
          <Route path="/" element={  <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>} />

          <Route path="/crear" element={<ProtectedRoute>
            <CreateLiquidationPage />
          </ProtectedRoute>} />
          <Route path="/listar" element={<ProtectedRoute>
            <ListLiquidationsPage />
          </ProtectedRoute>} />
          <Route path="/filtros" element={<ProtectedRoute>
            <FiltersPage />
          </ProtectedRoute>} />
          <Route path="/admin/" element={<ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>} />
          <Route
path="/liquidacion/:id"
  element={<ProtectedRoute><LiquidationDetailPage /></ProtectedRoute>}
/>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;