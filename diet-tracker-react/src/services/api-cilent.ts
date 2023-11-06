import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api"
  });
class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string){
    this.endpoint = endpoint;
  }
  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get(this.endpoint, config) 
      .then(res=>res.data)
  }
  get = (id: number | string) =>{
    return axiosInstance.get<T>(this.endpoint + '/' + id).then(res=>res.data)
  }
  postEmpty = (config?: AxiosRequestConfig) => {
    return axiosInstance
      .post(this.endpoint,null,config)
      .then(res=>res.data)
  }
  post = (object: T,config?: AxiosRequestConfig) => {
    return axiosInstance
      .post(this.endpoint,object,config)
      .then(res=>res.data)
  }
  delete = (name: string, config?: AxiosRequestConfig) => {
    
    return axiosInstance
      .delete(this.endpoint + "/" + name, config)
      .then(res=>res.data)
  }
}

export default APIClient