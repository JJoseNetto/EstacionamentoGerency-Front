import z from "zod";

export const estacionamentoSchema = z.object({
  nome: z.string().min(2, "Nome e obrigatorio").max(100),
  endereco: z.string().min(2, "Endereco e obrigatorio").max(200),
  cidade: z.string().min(2, "Cidade e obrigatoria").max(100),
  estado: z.string().min(2, "Estado e obrigatorio").max(100),
});

export const responseEstacionamentoSchema = estacionamentoSchema.extend({
  id: z.number(),
  codigo_convite: z.string(),
  totalVagas: z.number().default(0),
  vagasDisponiveis: z.number().default(0),
});

export const vincularSchema = z.object({
  userId: z.string().min(1, "Selecione um usuário"),
});

export type VincularFormValues = z.infer<typeof vincularSchema>;
export type TEstacionamentoSchema = z.infer<typeof estacionamentoSchema>;
export type TResponseEstacionamentoSchema = z.infer<typeof responseEstacionamentoSchema>;