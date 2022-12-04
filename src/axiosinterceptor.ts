import axios from "axios";
import { tokenKey, userEmailKey } from "utils/auth";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  tokenKey
)}`;

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status >= 500) {
      // alert(">= 500");
      return Promise.reject(error);
    }
    if (error.response?.status <= 450) {
      console.log("error.response?.status", error.response?.status);
    }

    if (!error.response) return;

    const errorMessage = error.response.data.Message;
    if (errorMessage) {
      console.log("interceptor", errorMessage);
    }

    if (error.config?.url.includes("refresh")) {
      if (error.response.statys === 400) {
        window.location.reload();
        // logoute()
      }
    }

    const originalRequest = error.config;
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const keyForRefreshToken = localStorage.getItem(userEmailKey);
      return new Promise((resolve, reject) => {
        axios
          .post("auth/refreshToken", { email: keyForRefreshToken })
          .then(({ data }) => {
            window.localStorage.setItem(tokenKey, data.token);
            axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
              tokenKey
            )}`;
            originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
              tokenKey
            )}`;
            processQueue(null, data.token);
            resolve(axios(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            reject(err);
          })
          .finally(() => (isRefreshing = false));
      });
    }
    return Promise.reject(error);
  }
);
