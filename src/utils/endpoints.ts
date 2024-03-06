import { SERVER_BASE_URL } from "./my-envs";

const appendServerUrl = (path: string) => SERVER_BASE_URL + path;

export const endpoints = {
  auth: {
    google: {
      login: appendServerUrl("/auth/google/login"),
    },
    github: {
      login: appendServerUrl("/auth/github/login"),
    },
    logout: appendServerUrl("/auth/logout"),
  },
};
