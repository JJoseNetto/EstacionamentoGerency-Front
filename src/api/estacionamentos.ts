import api from "./api";
import type { TEstacionamentoSchema } from "./schema/estacionamento.schema";

export const getEstacionamentos = async () => {
  const response = await api.get('/estacionamentos', {
    withCredentials: true,
  });
  return response.data;
};

export const createEstacionamento = async (data: TEstacionamentoSchema) => {
  const response = await api.post('/estacionamentos', data, {
    withCredentials: true,
  });
  return response.data;
};

export const updateEstacionamento = async (id: string, data: TEstacionamentoSchema) => {
  const response = await api.put(`/estacionamentos/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deleteEstacionamento = async (id: string) => {
  const response = await api.delete(`/estacionamentos/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const associateUserToEstacionamento = async (data: { userId: string; estacionamentoId: string }) => {
  const response = await api.post(`usuarios-estacionamentos/associar`, data, {
    withCredentials: true,
  });
  return response.data;
}

export const getAssociatedUsers = async (estacionamentoId: number) => {
  const response = await api.get(`/usuarios-estacionamentos/estacionamento/${estacionamentoId}`, {
    withCredentials: true,
  });
  return response.data;
}

export const deleterAssociatedUsers = async (data: any) => {
  const response = await api.delete('/usuarios-estacionamentos', {
    data,
    withCredentials: true,
  })
  return response.data
}

export const associarViaCode = async (code: string)  => {
    const response = await api.post('usuarios-estacionamentos/associarViaCode', { codigo:code }, {
    withCredentials: true,
  });
  return response.data;
}