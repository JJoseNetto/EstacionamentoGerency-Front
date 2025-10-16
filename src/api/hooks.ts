import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { login, logout, register } from './auth';
import { associarViaCode, associateUserToEstacionamento, createEstacionamento, deleteEstacionamento, deleterAssociatedUsers, getAssociatedUsers, getEstacionamentos, updateEstacionamento } from './estacionamentos';
import { createVaga, deleteVaga, getVagas, updateVaga } from './vagas';
import { getCurrentUsers, getUsers } from './users';
import type { TEstacionamentoSchema } from './schema/estacionamento.schema';

export const useAuth = () => {
   const { data: user, isLoading, isError } = useQuery({
    queryKey: ['authUser'],
    queryFn: () => getCurrentUsers(),
    retry: false,
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    isError,
  };
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
    enabled: false,
  });
}

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};

export const useEstacionamentos = () => {
    return useQuery({
        queryKey: ['estacionamentos'],
        queryFn: getEstacionamentos,
    });
};

export const useCreateEstacionamento = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TEstacionamentoSchema) => createEstacionamento(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['estacionamentos'] }),
  });
};

export const useUpdateEstacionamento = () => { 
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TEstacionamentoSchema }) => updateEstacionamento(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['estacionamentos'] }),
  });
}

export const useDeleteEstacionamento = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteEstacionamento(String(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['estacionamentos'] }),
  });
};

export const useAssociateUserToEstacionamento = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { userId: string; estacionamentoId: string }) => associateUserToEstacionamento(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['estacionamentos'] }),
  });
}

export const useAssociatedUsers = (estacionamentoId: number) => {
  return useQuery({
    queryKey: ['associatedUsers', estacionamentoId],
    queryFn: () => getAssociatedUsers(estacionamentoId),
    enabled: false,
  });
};

export const useDeleteAssociatedUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => deleterAssociatedUsers(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estacionamentos'] });
    },
  });
}

export const useAssociarViaCode = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => associarViaCode(code),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['estacionamentos'] }),
  });
}

export const useVagas = (id: number) => {
    return useQuery({
        queryKey: ['vagas', id],
        queryFn: () => getVagas(id),
        enabled: false,
    });
};

export const useCreateVaga = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { tipo: string; estacionamentoId: number }) => createVaga(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estacionamentos'] });
    },
  });
};

export const useUpdateVaga = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { tipo: string; status?: string; estacionamentoId: number } }) =>
      updateVaga(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estacionamentos'] });
    },
  });
};

export const useDeleteVaga = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteVaga(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['estacionamentos'] });
    },
  });
}