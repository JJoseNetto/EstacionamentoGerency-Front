import api from "./api";

export const getCurrentUsers = async () => {
  try {
    const response = await api.get('/users/me', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error('Não autenticado');
  }
};

export const getUsers = async () => {
  const response = await api.get('/users', {
    withCredentials: true,
  });
  return response.data;
}