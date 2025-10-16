import { useUpdateVaga, useDeleteVaga, useVagas } from "@/api/hooks"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Controller, useForm } from "react-hook-form"
import { useEffect } from "react"
import { toast } from "sonner"

interface SheetEditarVagaProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  estacionamentoId: number
  vaga: {
    id: number
    tipo: string
    status: string
  }
}

export function SheetEditarVaga({ open, onOpenChange, estacionamentoId, vaga }: SheetEditarVagaProps) {
  const { control, handleSubmit, reset } = useForm<{ tipo: string; status: string }>({
    defaultValues: { tipo: vaga.tipo, status: vaga.status },
  })

  const updateVagaMutation = useUpdateVaga()
  const deleteVagaMutation = useDeleteVaga()
  const { refetch } = useVagas(estacionamentoId)

  useEffect(() => {
    reset({ tipo: vaga.tipo, status: vaga.status })
  }, [vaga, reset])

  const onSubmit = (data: { tipo: string; status: string }) => {
    updateVagaMutation.mutate(
        { id: vaga.id, data: { ...data, estacionamentoId } },
        { 
            onSuccess: () => { 
                toast.success("Vaga atualizada com sucesso!")
                refetch(); 
                onOpenChange(false) 
            },
            onError: (err: any) => {
                toast.error("Erro ao atualizar a vaga",{
                    description: `${err.response.data.message}`
                })
            }
        }
    )
  }

  const handleDelete = () => {
    deleteVagaMutation.mutate(vaga.id, { 
      onSuccess: () => { 
        toast.success("Vaga removida com sucesso!")
        refetch(); 
        onOpenChange(false) 
      },
      onError: () => {
        toast.error("Falha ao remover essa vaga!")
      } 
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader>
            <SheetTitle>Editar Vaga</SheetTitle>
          </SheetHeader>

          <div className="grid gap-3 px-4">
            <Label>Tipo da Vaga</Label>
            <Controller
              name="tipo"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="carro">Carro</SelectItem>
                    <SelectItem value="moto">Moto</SelectItem>
                    <SelectItem value="deficiente">Deficiente</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            <Label>Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="livre">Livre</SelectItem>
                    <SelectItem value="ocupada">Ocupada</SelectItem>
                    <SelectItem value="bloqueada">Bloqueada</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <SheetFooter className="flex justify-between">
            <Button type="submit">Salvar Alterações</Button>
            <Button type="button" variant="destructive" onClick={handleDelete}>Excluir</Button>
            <SheetClose asChild>
                <Button variant="outline">Fechar</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
