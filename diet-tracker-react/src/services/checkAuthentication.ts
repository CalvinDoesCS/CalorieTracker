import Token from "../entities/Token";
import APIClient from "./api-cilent";

const apiClient = new APIClient<Token>("/auth/validateAccessToken");

export const checkAuthentication = (
  token: string | null,
  setToken: Function,
  clearToken: Function
): Promise<boolean> => {
  return new Promise((resolve) => {
    apiClient.setAccessToken(token);
    apiClient
      .post()
      .then(() => {
        console.log("Valid Access Token");
        resolve(true); // Resolve the promise with true if access token is valid
      })
      .catch(() => {
        console.log("Invalid Access Token", "Trying to Refresh Token...");
        resolve(handleRefreshToken(setToken, clearToken));
      })
      .finally(() => {
        apiClient.setEndPoint("/auth/validateAccessToken");
      });
  });
};
export const handleRefreshToken = (
  setToken: Function,
  clearToken: Function
): Promise<boolean> => {
  return new Promise((resolve) => {
    apiClient.setEndPoint("/auth/refreshToken");
    apiClient.setAccessToken(null);
    apiClient
      .post()
      .then((res) => {
        console.log("Refresh Token Successfully");
        setToken(res.access_token, res.expires_in, res.email, res.token_type);
        resolve(true); // Resolve the promise with true after token refresh
      })
      .catch(() => {
        console.log("Failed to Refresh Token");
        clearToken();
        resolve(false);
      });
  });
};
