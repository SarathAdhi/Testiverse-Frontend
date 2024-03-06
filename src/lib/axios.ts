import { SERVER_BASE_URL } from "@utils/my-envs";
import Axios from "axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

const axios = Axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (data?.message) toast.success(data.message);

    return data;
  },
  (error) => {
    const data = error.response?.data;

    if (data?.message) toast.error(data.message);

    return Promise.reject(error.response);
  }
);

axios.interceptors.request.use((config) => {
  let token = getCookie("bearer-token");

  if (token) {
    config!.headers!.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

export default axios;
