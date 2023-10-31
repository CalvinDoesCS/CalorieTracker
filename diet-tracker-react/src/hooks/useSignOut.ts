import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-cilent";
import useTokenStore from "./useTokenStore";
import Token from "../entities/Token";
import createAxiosConfig from "../services/axios-config";



const apiClient = new APIClient<Token>('/auth/logout');

const useReFreshToken = () =>{
  const {accessToken,clearAccessToken} = useTokenStore();

  const axiosConfig = createAxiosConfig(accessToken);

  return useMutation({
    mutationFn: () => apiClient.post({accessToken},axiosConfig)
    .then( (res) => {
        clearAccessToken();
        return res.data;
      })
    })
}
export default useReFreshToken;