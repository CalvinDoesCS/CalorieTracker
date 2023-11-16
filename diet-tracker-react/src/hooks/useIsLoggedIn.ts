import { useEffect, useState } from "react";
import useTokenStore from "./useTokenStore";

import { checkAuthentication } from "../services/checkAuthentication";
import { useNavigate } from "react-router-dom";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { accessToken, setToken, expiresIn, clearToken } = useTokenStore();
  useEffect(() => {
    const checkAccessTokenValidity = async () => {
      const authenticated = await checkAuthentication(accessToken, setToken);
      setIsLoggedIn(authenticated);
      if (!authenticated) {
        navigate("/signin");
      }
    };
    checkAccessTokenValidity();
  }, [accessToken]);

  return isLoggedIn;
};
