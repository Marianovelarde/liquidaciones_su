import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../api/slice/authSlice";

interface Props {
  children: JSX.Element;
  roles?: string[];
}

export default function ProtectedRoute({
  children,
  roles,
}: Props) {
  const dispatch = useDispatch();

  const {
    token,
    user,
    expiresAt,
  } = useSelector(
    (state: any) => state.auth
  );

  //////////////////////////////////////////////////////
  // SESIÓN EXPIRADA
  //////////////////////////////////////////////////////

  if (
    expiresAt &&
    Date.now() > expiresAt
  ) {
    dispatch(logout());

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  //////////////////////////////////////////////////////
  // NO LOGUEADO
  //////////////////////////////////////////////////////

  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  //////////////////////////////////////////////////////
  // SIN PERMISOS
  //////////////////////////////////////////////////////

  if (
    roles &&
    !roles.includes(user?.role)
  ) {
    return (
      <Navigate to="/" replace />
    );
  }

  return children;
}