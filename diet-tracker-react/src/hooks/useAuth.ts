import { useMutation } from "@tanstack/react-query";
import User from "../entities/User";
import APIClient from "../services/api-cilent";
import useTokenStore from "./useTokenStore";
import createAxiosConfig from "../services/axios-config";

const apiClient = new APIClient<User>('/auth/authenticate');


const useLoginUser = () =>{

  const {setToken} = useTokenStore();
  
  const axiosConfig = createAxiosConfig(null);

  return useMutation({
    mutationFn: (user : User) => apiClient.post(user,axiosConfig)
    .then( (res) => {
        console.log(res);
        setToken(res.access_token, res.expires_in, res.email, res.token_type);
      })
    })
}
export default useLoginUser;