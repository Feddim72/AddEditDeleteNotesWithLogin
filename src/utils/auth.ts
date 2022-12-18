import { IViewLoginModel } from "api/axios-client";
import axios from "axios";
import jwt_decode from "jwt-decode";
const tokenKey = "token";
const refreshTokenKey = "refreshToken";
const userEmailKey = "userEmail";
const userQueryIdKey = "userQueryIdKey";
const actualUserId = "actualUserId";
const userQueryMailKey = "userQueryMailKey";
const getActualUserId = async () =>
  localStorage.getItem(actualUserId) as string;
const getToken = async () => localStorage.getItem(tokenKey) as string;
const getRefreshToken = async () =>
  localStorage.getItem(refreshTokenKey) as string;
const getUserEmail = async () => localStorage.getItem(userEmailKey) as string;

const login = ({ email, password }: IViewLoginModel) =>
  axios.post<string>("/Auth/Login", { email, password }).then(({ data }) => {
    const decoded = jwt_decode<{ email: string }>(data);
    localStorage.setItem(tokenKey, data);
    localStorage.setItem(userEmailKey, decoded.email);
    localStorage.setItem(
      userQueryMailKey,
      "Email eq " + `'` + decoded.email + `'`
    );
    axios.defaults.headers.common.Authorization = `Bearer ${data}`;
    return decoded.email;
  });

const logout = async () => {
  axios.defaults.headers.common.Authorization = `Bearer`;
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(refreshTokenKey);
  localStorage.removeItem(userEmailKey);
  localStorage.removeItem(userQueryIdKey);
  localStorage.removeItem(userQueryMailKey);
  localStorage.removeItem(actualUserId);
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
  userQueryIdKey,
  userQueryMailKey,
  actualUserId,
  getActualUserId,
};
