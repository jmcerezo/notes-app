import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../utils/useAuth";

const PublicRoutes = () => {
  const auth = useAuth();

  return auth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoutes;
