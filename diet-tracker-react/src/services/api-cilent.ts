import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8080/api"
});
class APIClient<T> {
  endpoint: string;
  accessToken: string | null;
  constructor(endpoint: string){
    this.endpoint = endpoint;
    this.accessToken = null;

  // Set up request interceptor to add Authorization header when accessToken is not null
    axiosInstance.interceptors.request.use((config) => {
      if (this.accessToken !== null) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }
      return config;
    });
  }
  setAccessToken = (accessToken: string | null) => { 
    if(accessToken == null){
      this.accessToken == null
    }else{
      this.accessToken = accessToken;
    }
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
  delete = (id: string | number, config?: AxiosRequestConfig) => {
    
    return axiosInstance
      .delete(this.endpoint + "/" + id, config)
      .then(res=>res.data)
  }
  put = (id: string | number, object: T, config?: AxiosRequestConfig) => {
    return axiosInstance
      .put(this.endpoint + "/" + id, object, config)
      .then(res=>res.data)
  }
}

export default APIClient