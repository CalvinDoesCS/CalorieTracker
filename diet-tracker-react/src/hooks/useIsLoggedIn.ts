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
    const {accessToken,clearToken} = useTokenStore();
    const apiClient = useAuthAPIClient<Token>('/auth/validateAccessToken');


    const refreshAccessToken = async () => {
        try {
          const result = await refreshToken.mutateAsync();
          console.log("Access token refreshed successfully.", result.email);
        } catch (error) {
          // User need to login back in
          console.error("Token refresh failed.", error);
          //Clear Token client side
          clearToken();
          setIsLoggedIn(false);
          navigate("/signin")
        }
    };

    useEffect(() => {
        //Check if access Token is valid
        apiClient.postEmpty()
            .then((res)=>{
                console.log(res);
                setIsLoggedIn(true);
            })
            .catch(()=>{
                refreshAccessToken();
            })
    }, [accessToken]);
    return isLoggedIn;
};
