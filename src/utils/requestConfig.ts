import Cookies from "js-cookie";

const requestConfig = () => {
  const token = Cookies.get("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

export default requestConfig;
