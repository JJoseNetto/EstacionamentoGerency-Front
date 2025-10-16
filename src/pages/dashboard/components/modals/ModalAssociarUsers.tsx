import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { vincularSchema, type TResponseEstacionamentoSchema, type VincularFormValues } from "@/api/schema/estacionamento.schema";
import { Button } from "@/components/ui/button";
import { useAssociatedUsers, useAssociateUserToEstacionamento, useDeleteAssociatedUsers } from "@/api/hooks";
import { toast } from "sonner";

interface ModalAssociarUsersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  users?: any[];
  associatedUsers?: any[]; 
  estacionamentoId: TResponseEstacionamentoSchema;
}

export function ModalAssociarUsers({ open, onOpenChange, users, associatedUsers = [], estacionamentoId }: ModalAssociarUsersProps) {
  const associateUserToEstacionamento = useAssociateUserToEstacionamento()
  const deleteAssociatedUsers = useDeleteAssociatedUsers()
  
  const form = useForm<VincularFormValues>({
      resolver: zodResolver(vincularSchema),
      defaultValues: { userId: "" },
    });

    const estacionamento_id = estacionamentoId?.id;
    
    const { refetch: refetchAssociatedUsers } = useAssociatedUsers(estacionamento_id)
    const onSubmit = (data: { userId: string }) => {
    const [userId] = data.userId.split("-");
    associateUserToEstacionamento.mutate({ 
            userId, 
            estacionamentoId: String(estacionamentoId.id) 
        },{ 
        onSuccess: () => {
            toast.success("Usuario vinculado com sucesso")
            refetchAssociatedUsers();
            form.reset();
        },
        onError(err: any){
                toast.error("Falha ao vincular",{
                   description: `${err.response.data.message}` 
                })
            }
        }
    );
  };

  const handleDelete = (userId: number) => {
    deleteAssociatedUsers.mutate({
        userId,
        estacionamentoId: String(estacionamentoId.id) 
    }, {
            onSuccess: () => { 
                toast.success("Usuario removido com sucesso")
                refetchAssociatedUsers(); 
            } 
        }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Vincular Usuário ao Estacionamento</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex justify-between items-center">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        {users?.map((u) => (
                          <SelectItem key={u.id} value={`${u.id}-${u.nome}`}>
                            {u.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <Button type="submit">Vincular</Button>
          </form>
        </Form>

        {associatedUsers.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Usuários Associados</h3>
            <table className="w-full table-auto border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Nome</th>
                  <th className="border px-4 py-2 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {associatedUsers.map((u) => (
                  <tr key={u.id}>
                    <td className="border px-4 py-2">{u.nome}</td>
                    <td className="border px-4 py-2">
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(u.id)}>
                        Remover
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
