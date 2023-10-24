import { useMutation } from "@tanstack/react-query";
import User from "../entities/User";
import APIClient from "../services/api-cilent";

const apiClient = new APIClient<User>('/auth/authenticate');

const useLoginUser = () =>{
  return useMutation({
    mutationFn: (user : User) => apiClient.post(user)
    .then( (res) => {
        localStorage.setItem("user-token", res.access_token);
      })
    })
}
export default useLoginUser;