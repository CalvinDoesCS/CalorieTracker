import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-cilent";
import useTokenStore from "./useTokenStore";
import Token from "../entities/Token";

const apiClient = new APIClient<Token>('/auth/refreshToken');

const useReFreshToken = () =>{
  const {accessToken,setAccessToken} = useTokenStore();

  return useMutation({
    mutationFn: () => apiClient.post({accessToken})
    .then( (res) => {
        setAccessToken(res.access_token);
        return res.data;
      })
    })
}
export default useReFreshToken;