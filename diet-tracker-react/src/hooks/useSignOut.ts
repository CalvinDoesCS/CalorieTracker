import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-cilent";
import useTokenStore from "./useTokenStore";
import Token from "../entities/Token";
import createAxiosConfig from "../services/axios-config";



const apiClient = new APIClient<Token>('/auth/logout');

const useSignOut = () =>{
  const {clearToken} = useTokenStore();

  const axiosConfig = createAxiosConfig(null);

  return useMutation({
    mutationFn: () => apiClient.postEmpty(axiosConfig)
    .then( (res) => {
        clearToken();
        return res;
      })
    })  
}
export default useSignOut;