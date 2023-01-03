import { ResponseType } from "../apiHelperWithCache/apiHelperWithCache";
import axios, { AxiosError } from "axios";
import { defaultConfig } from "next/dist/server/config-shared";

const createConfig = () => ({
  headers: {
    Accept: "application/json",
  },
});

export const apiHelper = async <T = any, U = any>(
  url: string,
  method: string,
  data = {},
  redirectOnError = true,
  config = {}
): Promise<ResponseType<T | U>> => {
  const defaultConfig = createConfig();
  const params =
    method === "GET"
      ? { method, ...defaultConfig, ...config }
      : { method, ...defaultConfig, ...config, data };
  try {
    const response = await axios(url, params);
    if (response.data || response.statusText || response.status) {
      return {
        isSuccess: true,
        data: response?.data || response,
        headers: response?.headers,
      } as ResponseType<T>;
    }
  } catch (error: any) {
    throw error?.response?.data?.error || {};
  }
  return {
    isSuccess: false,
    data: {},
  } as ResponseType<U>;
};
