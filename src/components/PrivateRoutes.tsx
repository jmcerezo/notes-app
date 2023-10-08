import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../utils/useAuth";
import { toast } from "react-toastify";
import { toastInfoOptions } from "../utils/constants";

const PrivateRoutes = () => {
  const token = useAuth();

  if (!token) {
    const message = "Your token has expired. Please login again.";
    toast.info(message, toastInfoOptions);
  }

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
