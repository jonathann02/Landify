import type { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }: { children: ReactElement }) {
  const location = useLocation();
  const token = typeof window !== "undefined" ? localStorage.getItem("landify_token") : null;

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}