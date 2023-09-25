import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./App.css";

function App() {
  interface User {
    userId: string; //Not a simple string but future can change
    username: string;
    password: string;
    email: string;
  }
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-type": "application/json"
    }
  });


  const useUser = () => 
    useQuery({
        queryKey: ['users'],
        queryFn: () => axiosInstance.get<User[]>("/user").then((res) => res.data)
        
    })

  const {data, isLoading} = useUser();

  if (isLoading) {
    return <span>Loading...</span>
  }
  console.log(data)
  return (
    <div className="App">
      {data?.map((user) => <p key={user.userId}>{user.username}</p>)}
    </div>
  );
}

export default App;
