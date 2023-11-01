import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-cilent";
import useTokenStore from "./useTokenStore";
import Token from "../entities/Token";
import createAxiosConfig from "../services/axios-config";

const apiClient = new APIClient<Token>('/auth/refreshToken');

const useRefreshToken = () =>{
  const {setToken} = useTokenStore();
  const axiosConfig = createAxiosConfig(null);
  return useMutation({
    mutationFn: () => apiClient.postEmpty(axiosConfig)
    .then( (res) => {
        setToken(res.access_token, res.expires_in, res.email, res.tokenType);
        return res;
      }).catch( (error) => {throw error}),
    })
}

export default useRefreshToken;