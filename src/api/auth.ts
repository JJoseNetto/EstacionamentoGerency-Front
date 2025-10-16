import api from "./api";
import type { TLoginSchema, TRegisterSchema } from "./schema/auth.schema";


export const login = async (data: TLoginSchema) => {
  const response = await api.post('auth/login', data,{
     withCredentials: true,
  });
  return response.data;
};

export const register = async (data: TRegisterSchema) => {
  const response = await api.post('auth/register', data);
  return response.data;
};

export const logout = async () => {
  const response = await api.post('auth/logout', {}, {
    withCredentials: true,
  });
  return response.data;
}
