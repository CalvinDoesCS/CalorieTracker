import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class APIClient<T> {
  endpoint: string;
  accessToken: string | null;
  axiosInstance: AxiosInstance;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.accessToken = null;
    this.axiosInstance = axios.create({
      withCredentials: true,
      baseURL: "http://localhost:8080/api",
    });
    // Set up request interceptor to add Authorization header when accessToken is not null
    this.axiosInstance.interceptors.request.use((config) => {
      if (this.accessToken !== null) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      } else {
        console.log("Delete Header");
        delete config.headers.Authorization;
      }
      return config;
    });
  }
  setAccessToken = (token: string | null) => {
    if (token == null) {
      this.accessToken = null;
    } else {
      this.accessToken = token;
    }
  };
  getAll = (config: AxiosRequestConfig) => {
    return this.axiosInstance
      .get(this.endpoint, config)
      .then((res) => res.data);
  };
  get = (id: number | string) => {
    return this.axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data);
  };
  postEmpty = (config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .post(this.endpoint, null, config)
      .then((res) => res.data);
  };
  post = (object: T, config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .post(this.endpoint, object, config)
      .then((res) => res.data);
  };
  delete = (id: string | number, config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .delete(this.endpoint + "/" + id, config)
      .then((res) => res.data);
  };
  put = (id: string | number, object: T, config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .put(this.endpoint + "/" + id, object, config)
      .then((res) => res.data);
  };
}

export default APIClient;
