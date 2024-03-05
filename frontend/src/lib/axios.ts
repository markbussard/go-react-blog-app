import Axios, { type InternalAxiosRequestConfig } from "axios";

import { API_URL } from "~/config";
import { firebaseAuth } from ".";

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const firebaseUser = firebaseAuth.currentUser;
  if (firebaseUser && config.headers) {
    const jwtToken = await firebaseUser.getIdToken();
    config.headers.authorization = `${jwtToken}`;
  }
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);
