import axios, { AxiosError, AxiosResponse } from 'axios';

const baseURL = `https://staging.polarista.ai/api`;

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
