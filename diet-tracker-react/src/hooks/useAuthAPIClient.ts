import { useEffect } from "react";
import APIClient from "../services/api-cilent";
import useTokenStore from "./useTokenStore";

// Define a type for the generic object type of apiClients
type ApiClientObject<T> = Record<string, APIClient<T>>;

// Create an object to store instances of APIClient for different endpoints and generic types
const apiClients: ApiClientObject<any> = {};

const useAuthAPIClient = <T>(endpoint: string) => {
  if (!apiClients[endpoint]) {
    apiClients[endpoint] = new APIClient<T>(endpoint);
  }

  const { accessToken } = useTokenStore();

  useEffect(() => {
    if (accessToken == null) {
      apiClients[endpoint]?.setAccessToken(null);
    } else {
      apiClients[endpoint]?.setAccessToken(accessToken);
    }
  }, [accessToken, endpoint]);

  return apiClients[endpoint];
};

export default useAuthAPIClient;
