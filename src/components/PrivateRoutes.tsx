import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";

const PrivateRoutes = () => {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
