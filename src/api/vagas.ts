import api from "./api";

export const getVagas = async (id: number) => {
  const response = await api.get(`/vagas/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const createVaga = async (data: { tipo: string; estacionamentoId: number }) => {
  const response = await api.post('/vagas', data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateVaga = async (id: number, data: { tipo: string; estacionamentoId: number }) => {
  const response = await api.put(`/vagas/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteVaga = async (id: number) => {
  const response = await api.delete(`/vagas/${id}`, {
    withCredentials: true,
  });
  return response.data;
};