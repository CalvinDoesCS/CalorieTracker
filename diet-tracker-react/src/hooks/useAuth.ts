import { useMutation } from "@tanstack/react-query";
import User from "../entities/User";
import APIClient from "../services/api-cilent";
import useTokenStore from "./useTokenStore";

const apiClient = new APIClient<User>("/auth/authenticate");

const useLoginUser = () => {
  const { setToken } = useTokenStore();

  return useMutation({
    mutationFn: (user: User) =>
      apiClient.post(user).then((res) => {
        setToken(res.access_token, res.expires_in, res.email, res.token_type);
      }),
  });
};
export default useLoginUser;
