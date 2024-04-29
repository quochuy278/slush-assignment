import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  canAccess: boolean;
  children?: React.ReactNode;
  redirectTo?: string;
};

const ProtectedRoute = ({
  canAccess = false,
  children,
  redirectTo = "/signin",
}: ProtectedRouteProps) => {
  if (!canAccess) {
    return <Navigate to={redirectTo} replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
