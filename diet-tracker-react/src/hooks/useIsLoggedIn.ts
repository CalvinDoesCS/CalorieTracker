import { useEffect, useState } from "react";
import useTokenStore from "./useTokenStore";

import {
  checkAuthentication,
  handleRefreshToken,
} from "../services/checkAuthentication";
import { useNavigate } from "react-router-dom";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { accessToken, setToken, expiresIn, clearToken } = useTokenStore();
  useEffect(() => {
    const checkAccessTokenValidity = async () => {
      const authenticated = await checkAuthentication(
        accessToken,
        setToken,
        clearToken
      );
      setIsLoggedIn(authenticated);
      if (!authenticated) {
        navigate("/signin");
      }
    };

    checkAccessTokenValidity();

    let tokenTimer: number | undefined;
    if (accessToken && expiresIn) {
      // Calculate the time to token expiration in milliseconds
      tokenTimer = setTimeout(() => {
        handleRefreshToken(setToken, clearToken);
      }, expiresIn * 1000 - 5 * 1000); // Refresh token 1 minute before expiration
    }

    // Clean up the timer when the component unmounts or when the access token changes
    return () => {
      clearTimeout(tokenTimer);
    };
  }, [accessToken]);

  return isLoggedIn;
};
