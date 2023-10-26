import { useMutation } from "@tanstack/react-query";
import User from "../entities/User";
import APIClient from "../services/api-cilent";
import useTokenStore from "./useTokenStore";

const apiClient = new APIClient<User>('/auth/authenticate');


const useLoginUser = () =>{

  const {setAccessToken} = useTokenStore();

  return useMutation({
    mutationFn: (user : User) => apiClient.post(user)
    .then( (res) => {
        setAccessToken(res.access_token);
      })
    })
}
export default useLoginUser;