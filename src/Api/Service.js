import {
  deleteApi,
  getApi,
  postApi,
  putApi,
  patchApi,
  postFormApi,
  patchFormApi,
} from "./axiosService";

export const registerApi = (data) => {
  return postApi("register", data);
};
export const loginApi = (data) => {
  return postApi("login", data);
};
export const submitOrderApi = (data) => {
  return postApi("submitOrder", data);
};
export const submitMessageApi = (data) => {
  return postApi("submitMessage", data);
};
export const logoutApi = (data) => {
  return getApi("logout", data);
};
