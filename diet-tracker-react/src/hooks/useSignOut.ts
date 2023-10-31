import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-cilent";
import useTokenStore from "./useTokenStore";
import Token from "../entities/Token";



const apiClient = new APIClient<Token>('/auth/logout');

const useReFreshToken = () =>{
  const {accessToken,clearAccessToken} = useTokenStore();

  const headers = { 
    'Authorization': `Bearer ${accessToken}`,
  };
  const axiosConfig = {
    headers: headers,
    withCredentials: true // Set the 'withCredentials' option here
};

  return useMutation({
    mutationFn: () => apiClient.post({accessToken},axiosConfig)
    .then( (res) => {
        clearAccessToken();
        return res.data;
      })
    })
}
export default useReFreshToken;