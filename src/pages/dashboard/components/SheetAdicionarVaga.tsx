import { useCreateVaga, useVagas } from "@/api/hooks"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

interface SheetAdicionarVagaProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  estacionamentoId: number
}

export function SheetAdicionarVaga({ open, onOpenChange, estacionamentoId }: SheetAdicionarVagaProps) {
  const { control, handleSubmit, reset } = useForm<{ tipo: string }>({
    defaultValues: { tipo: "" },
  })

  const createVagaMutation = useCreateVaga()
  const { refetch } = useVagas(estacionamentoId)

  const onSubmit = (data: { tipo: string }) => {
    createVagaMutation.mutate(
      { ...data, estacionamentoId },
      {
        onSuccess: () => {
          toast.success("Vaga criada com sucesso!")
          refetch()
          reset()
          onOpenChange(false)
        },
        onError:  () => {
          toast.error("Falha ao criar a vaga")
        }
      }
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader>
            <SheetTitle>Adicionar Vaga</SheetTitle>
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
          </div>

          <SheetFooter>
            <Button type="submit">Salvar</Button>
            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  )
}
