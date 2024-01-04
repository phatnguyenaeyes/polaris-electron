import axios, { AxiosError, AxiosResponse } from 'axios';

const baseURL = `http://localhost:8082/api`;

const httpClient = axios.create({
  baseURL,
  timeout: 300000,
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  function (err: AxiosError) {
    return Promise.reject(err);
  },
);
export default httpClient;
