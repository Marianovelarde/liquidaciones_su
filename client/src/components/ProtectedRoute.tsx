import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const token = useSelector(
    (state: any) => state.auth.token
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}