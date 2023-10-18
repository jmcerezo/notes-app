import Cookies from "js-cookie";

export const useAuth = () => {
  const token = Cookies.get("token");

  if (token) {
    return true;
  }

  return false;
};
