import axios, { AxiosRequestConfig } from 'axios';

export const AXIOS_INSTANCE = axios.create({
  baseURL: process.env.API_URL,
});

// Orval から呼ばれるカスタム関数
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const token = process.env.TOKEN;

  return AXIOS_INSTANCE({
    ...config,
    headers: {
      ...config.headers,
      Authorization: `Bearer ${token}`, // ここで Token を付与
    },
  }).then((res) => res.data);
};
