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
): Promise<{ data?: T; error?: string }> => {
  const headers = getHeaders();

  try {
    const response = await fetch(`${getServerBaseUrl()}${url}`, {
      method,
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData?.message || errorData;
    }

    const responseData = await response.json();

    if (returnFullResponse) {
      return { data: responseData };
    }

    return { data: responseData.data };
  } catch (error) {
    return {
      error:
        (error as { message: string })?.message ||
        (error as { detail: string })?.detail ||
        "Unknown error occurred",
    };
  }
};

export const fetchFunc = {
  get: async <T>(
    url: string,
    options?: RequestInit
  ): Promise<{ data?: T; error?: string }> => _fetch<T>(url, "GET", options),

  post: async <T>(
    url: string,
    body: any,
    options?: RequestInit,
    returnFullResponse: boolean = false
  ): Promise<{ data?: T; error?: string }> =>
    _fetch<T>(
      url,
      "POST",
      { ...options, body: JSON.stringify(body) },
      returnFullResponse
    ),

  delete: async <T>(
    url: string,
    options?: RequestInit
  ): Promise<{ data?: T; error?: string }> =>
    _fetch<T>(url, "DELETE", options, true),
};
