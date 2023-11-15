import { useEffect, useState } from "react";
import useTokenStore from "./useTokenStore";
import APIClient from "../services/api-cilent";
import Token from "../entities/Token";
import useRefreshToken from "./useRefreshToken";
import { useNavigate } from "react-router-dom";
import useAuthAPIClient from "./useAuthAPIClient";

export const useIsLoggedIn = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const refreshToken = useRefreshToken();
  const { accessToken, expiresIn, clearToken } = useTokenStore();
  const apiClient = useAuthAPIClient<Token>("/auth/validateAccessToken");

  const refreshAccessToken = async () => {
    try {
      const result = await refreshToken.mutateAsync();
    } catch (error) {
      // User need to login back in
      console.error("Token refresh failed.", error);
      //Clear Token client side
      clearToken();
      setIsLoggedIn(false);
      navigate("/signin");
    }
  };

  useEffect(() => {
    const checkAccessTokenValidity = async () => {
      try {
        // Check if access token is valid
        await apiClient.postEmpty();
        console.log("Access Token is Valid");
        setIsLoggedIn(true);
      } catch (error) {
        // If the access token is expired or invalid, refresh it
        refreshAccessToken();
      }
    };
    checkAccessTokenValidity();
    // Set up a timeout to periodically get a new token before it expires.
    const timeoutId = setInterval(
      checkAccessTokenValidity,
      expiresIn * 1000 * 0.9
    );

    // Clean up the timeout when the component unmounts
    return () => clearInterval(timeoutId);
  }, [accessToken]);
  return isLoggedIn;
};
