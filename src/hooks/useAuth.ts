import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const getAccessToken = () => {
    return Cookies.get("accessToken");
  };

  const loginCompanyAuth = (token: any, refreshToken: any) => {
    Cookies.set("accessToken", token, { expires: 8 });
    Cookies.set("refreshToken", refreshToken, {
      expires: 7,
    });
    setIsAuthenticated(true);
    router.push("/products");
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsAuthenticated(false);
    router.push("/");
  };

  return {
    isAuthenticated,
    loginCompanyAuth,
    logout,
    getAccessToken,
  };
};
