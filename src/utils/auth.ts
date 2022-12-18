import { IViewLoginModel } from "api/axios-client";
import axios from "axios";
import jwt_decode from "jwt-decode";
const tokenKey = "token";
const refreshTokenKey = "refreshToken";
const userEmailKey = "userEmail";
const actualUserIdKey = "actualUserIdKey";
const userQueryMailKey = "userQueryMailKey";
const getToken = async () => localStorage.getItem(tokenKey) as string;
const getRefreshToken = async () =>
  localStorage.getItem(refreshTokenKey) as string;
const getUserEmail = async () => localStorage.getItem(userEmailKey) as string;

const login = ({ email, password }: IViewLoginModel) =>
  axios
    .post<string>("/Auth/Login", { email, password })
    .then(({ data }) => {
      const decoded = jwt_decode<{ email: string }>(data);
      console.log(decoded);
      localStorage.setItem(tokenKey, data);
      localStorage.setItem(userEmailKey, decoded.email);
      localStorage.setItem(
        userQueryMailKey,
        "Email eq " + `'` + decoded.email + `'`
      );
      console.log(decoded.email);
      console.log(localStorage.getItem(userEmailKey));
      axios.defaults.headers.common.Authorization = `Bearer ${data}`;
      return decoded.email;
    })
    .then(() => {
      axios
        .get(`/User/GetAll?filter=${localStorage.getItem(userQueryMailKey)}`)
        .then((res) => {
          localStorage.setItem(
            actualUserIdKey,
            "UserId eq " + `'` + res.data.data?.[0].id + `'`
          );
        });
    });

const logout = async () => {
  axios.defaults.headers.common.Authorization = `Bearer`;
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(refreshTokenKey);
  localStorage.removeItem(userEmailKey);
  localStorage.removeItem(actualUserIdKey);
  localStorage.removeItem(userQueryMailKey);
};

export {
  getToken,
  getRefreshToken,
  login,
  logout,
  tokenKey,
  refreshTokenKey,
  getUserEmail,
  userEmailKey,
  actualUserIdKey,
  userQueryMailKey,
};
