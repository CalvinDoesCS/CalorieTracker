import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class APIClient<T> {
  endpoint: string;
  static accessToken: string | null;
  axiosInstance: AxiosInstance;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
    APIClient.accessToken = null;
    this.axiosInstance = axios.create({
      withCredentials: true,
      baseURL: "http://localhost:8080/api",
    });
    // Set up request interceptor to add Authorization header when accessToken is not null
    this.axiosInstance.interceptors.request.use((config) => {
      if (APIClient.accessToken !== null) {
        config.headers.Authorization = `Bearer ${APIClient.accessToken}`;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    });
  }
  setEndPoint = (endpoint: string) => {
    this.endpoint = endpoint;
  };
  setAccessToken = (token: string | null) => {
    if (token == null) {
      APIClient.accessToken = null;
    } else {
      APIClient.accessToken = token;
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
  post = (object?: T, config?: AxiosRequestConfig) => {
    return this.axiosInstance
      .post(this.endpoint, object || null, config)
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
