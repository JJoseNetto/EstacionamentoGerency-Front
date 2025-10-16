import { estacionamentoSchema, type TEstacionamentoSchema } from "@/api/schema/estacionamento.schema"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateEstacionamento, useUpdateEstacionamento } from "@/api/hooks"
import { useEffect } from "react"
import { toast } from "sonner"

interface ModalEstacionamentoProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  estacionamento?: any
}


export function ModalEstacionamento({ open, onOpenChange, estacionamento }: ModalEstacionamentoProps) {
  const createEstacionamentoMutation = useCreateEstacionamento();
  const updateEstacionamentoMutation = useUpdateEstacionamento();

  const form = useForm<TEstacionamentoSchema>({
    resolver: zodResolver(estacionamentoSchema),
    defaultValues: {
      nome: estacionamento?.nome || "",
      endereco: estacionamento?.endereco || "",
      cidade: estacionamento?.cidade || "",
      estado: estacionamento?.estado || ""
    }
  })

  useEffect(() => {
    if (estacionamento) {
      form.reset({
        nome: estacionamento.nome,
        endereco: estacionamento.endereco,
        cidade: estacionamento.cidade,
        estado: estacionamento.estado
      });
    } else {
      form.reset({
        nome: "",
        endereco: "",
        cidade: "",
        estado: ""
      });
    }
  }, [estacionamento]);

  const onSubmit = (data: TEstacionamentoSchema) => {
    if (estacionamento?.id) {
      updateEstacionamentoMutation.mutate(
        { id: estacionamento.id, data },
        {
          onSuccess: () => {
            toast.success("Estacionamento atualizado com sucesso!")
            onOpenChange(false)
          },
          onError(){
            toast.error("Falha ao atualizar o estacionamento")
          }
        }
      );
    } else {
      createEstacionamentoMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Estacionamento criado com sucesso!")
          onOpenChange(false)
        },
        onError(){
          toast.error("Falha ao criar o estacionamento")
        }
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Adicionar novo estacionamento</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo estacionamento e clique em salvar.
                </DialogDescription>
              </DialogHeader>
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                      <FormItem className="mb-4 mt-4">
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                              <Input placeholder="Nome do estacionamento" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endereco"
                  render={({ field }) => (
                      <FormItem className="mb-4">
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                              <Input placeholder="Endereço do estacionamento" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cidade"
                  render={({ field }) => (
                      <FormItem className="mb-4">
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                              <Input placeholder="Cidade do estacionamento" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                      <FormItem className="mb-4">
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                              <Input placeholder="Estado do estacionamento" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                  )}
                />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
    </Dialog>
  )
}
