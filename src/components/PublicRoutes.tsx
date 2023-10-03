import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

const PublicRoutes = () => {
  const token = useAuth();

  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
