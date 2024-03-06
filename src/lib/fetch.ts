import { SERVER_BASE_URL } from "@utils/my-envs";
import { cookies } from "next/headers";

const getServerBaseUrl = () => {
  return SERVER_BASE_URL || "http://127.0.0.1:8000";
};

const getHeaders = () => {
  let token = cookies().get("bearer-token")?.value;

  return new Headers({
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  });
};

const _fetch = async <T>(
  url: string,
  method: string,
  options?: RequestInit,
  returnFullResponse: boolean = false
): Promise<T> => {
  const response = await fetch(`${getServerBaseUrl()}${url}`, {
    method,
    ...options,
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();

    throw errorData?.message || errorData;
  }

  const responseData = await response.json();

  if (returnFullResponse) return responseData;

  return responseData.data as T;
};

export const fetchFunc = {
  get: <T>(url: string, options?: RequestInit): Promise<T> =>
    _fetch<T>(url, "GET", options),

  post: <T>(url: string, body: any, options?: RequestInit): Promise<T> =>
    _fetch<T>(url, "POST", { ...options, body: JSON.stringify(body) }),

  delete: <T>(url: string, options?: RequestInit): Promise<T> =>
    _fetch<T>(url, "DELETE", options, true),
};
