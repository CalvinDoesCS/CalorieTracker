import { useMutation } from "@tanstack/react-query";
import User from "../entities/User";
import APIClient from "../services/api-cilent";

const apiClient = new APIClient<User>('/auth/signup');

const useAddUser = () =>{
  return useMutation<User,Error,User>({
    mutationFn: (user : User) => apiClient.post(user)
    .then((res) => res.data),
  })
}
export default useAddUser;