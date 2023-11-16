import Token from "../entities/Token";
import APIClient from "./api-cilent";

const apiClient = new APIClient<Token>("/auth/validateAccessToken");

export const checkAuthentication = (
  token: string | null,
  setToken: Function
): Promise<boolean> => {
  return new Promise((resolve) => {
    const handleTokenRefreshError = (error: any) => {
      console.log("Failed to Refresh Token");
      resolve(false);
    };

    const handleTokenValidationOrRequestError = (error: any) => {
      console.log("Invalid Access Token", "Trying to Refresh Token...");
      apiClient.setEndPoint("/auth/refreshToken");
      apiClient.setAccessToken(null);
      apiClient
        .post()
        .then((res) => {
          console.log("Refresh Token Successfully");
          setToken(res.access_token, res.expires_in, res.email, res.token_type);
          resolve(true); // Resolve the promise with true after token refresh
        })
        .catch(handleTokenRefreshError);
    };

    apiClient.setAccessToken(token);
    apiClient
      .post()
      .then((res) => {
        console.log("Access Token Valid", res);
        resolve(true); // Resolve the promise with true if access token is valid
      })
      .catch(handleTokenValidationOrRequestError)
      .finally(() => {
        apiClient.setEndPoint("/auth/validateAccessToken");
      });
  });
};
