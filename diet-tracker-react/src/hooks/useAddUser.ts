import { useMutation } from "@tanstack/react-query";
import User from "../entities/User";
import APIClient from "../services/api-cilent";
import { AxiosError } from "axios";

const apiClient = new APIClient<User>('/auth/register');

const useAddUser = () =>{
  return useMutation<unknown,AxiosError,User>({
    mutationFn: (user : User) => apiClient.post(user)
    .then((res) => res.data),
    onError: (error : AxiosError) => {
      if(error.response?.status == 500){
        return "Email already Exist";
      }
    }
    })
}
export default useAddUser;