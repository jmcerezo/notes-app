import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

const PrivateRoutes = () => {
  const token = useAuth();

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
