import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  Method,
  ResponseType,
} from "axios";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import process from "process";

export interface Props {
  url?: string;
  firstFetch?: boolean;
  method?: Method;
  body?: any;
  headers?: AxiosRequestHeaders;
  responseType?: ResponseType;
}

const baseURL = process.env.REACT_APP_BASE_URL;

export const Api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function useFetch({
  url = "",
  firstFetch = true,
  method = "GET",
  body,
  headers,
  responseType = "json",
}: Props) {
  const [cookies] = useCookies();
  const [data, setData] = useState<AxiosResponse>();
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(
    (config?: AxiosRequestConfig<any>) => {
      return new Promise((resolve, reject) => {
        Api({
          method,
          url,
          data: body,
          headers: { ...headers, "x-auth-token": cookies.token },
          ...config,
          responseType,
        })
          .then((data: any) => {
            setData(data);
            resolve(data);
            return data;
          })
          .catch((error: Error) => {
            setError(error.message);
            reject(error);
            return error;
          });
      });
    },
    [body, cookies.token, headers, method, url]
  );

  useEffect(() => {
    if (firstFetch) fetch();
  }, [firstFetch, fetch]);

  return { fetch, data, error };
}
