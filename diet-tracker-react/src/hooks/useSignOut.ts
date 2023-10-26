import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-cilent";
import useTokenStore from "./useTokenStore";


interface Token{
    accessToken: string | null;
}
const apiClient = new APIClient<Token>('/auth/refreshtoken');

const useSignOut = () =>{
  const {accessToken,clearAccessToken} = useTokenStore();

  return useMutation({
    mutationFn: () => apiClient.post({accessToken})
    .then( (res) => {
        //clearAccessToken();
        console.log(res.data);
        return res.data;
      })
    })
}
export default useSignOut;