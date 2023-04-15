import axios, { AxiosInstance } from "axios";
import config from './config';


export const createFormDataInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.base_url,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return instance;
};

export const createJsonInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: config.base_url,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return instance;
};