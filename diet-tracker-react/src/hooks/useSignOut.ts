import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-cilent";
import useTokenStore from "./useTokenStore";
import Token from "../entities/Token";

const apiClient = new APIClient<Token>("/auth/logout");

const useSignOut = () => {
  const { clearToken } = useTokenStore();

  return useMutation({
    mutationFn: () =>
      apiClient.post().then((res) => {
        clearToken();
        return res;
      }),
  });
};
export default useSignOut;
