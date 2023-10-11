import { useMutation, useQuery } from "@tanstack/react-query"
import APIClient from "../services/api-cilent";
import User from "../entities/User";

const apiClient = new APIClient<User>('/user');

const useAddUser = (onAdd: () => void) =>{
  return useMutation({
    mutationFn: (user : User) => apiClient.post(user)
    .then((res) => res.data)
  })
}
export default useAddUser;