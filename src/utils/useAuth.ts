import jwtDecode from "jwt-decode";

export const useAuth = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const { exp } = Object(jwtDecode(token));
    const expirationTime = exp * 1000;

    if (expirationTime < Date.now()) {
      localStorage.removeItem("token");
    }

    return true;
  }

  return false;
};
