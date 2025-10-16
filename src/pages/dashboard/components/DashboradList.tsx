import { useState } from "react"
import { useAssociatedUsers, useAuth, useDeleteEstacionamento, useEstacionamentos, useUsers, useVagas } from "@/api/hooks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertDialogRemove } from "./AlertRemover"
import { ModalVerVagas } from "./modals/ModalVerVagas"
import { CopiarCodigo } from "./CopiarCodigo"
import type { TResponseEstacionamentoSchema } from "@/api/schema/estacionamento.schema"
import { ModalEstacionamento } from "./modals/ModalEstacionamento"
import { UserStar } from "lucide-react"
import { ModalAssociarUsers } from "./modals/ModalAssociarUsers"
import { toast } from "sonner"

interface DashboardListProps {
  currentUser: any
  estacionamentos: any
}

export function DashboardList({currentUser, estacionamentos} : DashboardListProps) {

  const { data: users = [], refetch: refetchUsers } = useUsers()
  const deleteMutation = useDeleteEstacionamento()
  
  const [openAlert, setOpenAlert] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openModalEstacionamento, setOpenModalEstacionamento] = useState(false)
  const [openModalAssociarUsers, setOpenModalAssociarUsers] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  
  const { data: usersAssociated = [], refetch: refetchAssociatedUsers } = useAssociatedUsers(selectedId!)
  const { data: vagas = [], refetch: refetchVagas } = useVagas(selectedId!);

  const handleRemoveClick = (id: number) => {
    setSelectedId(id)
    setOpenAlert(true)
  }

  const handleConfirmDelete = () => {
    if (selectedId !== null) {
      deleteMutation.mutate(selectedId, {
        onSuccess: () => {
          toast.success("Estacionamento removido com sucesso!");
        }, 
        onError: () => {
          toast.error("Falha ao remover esté estacionamento!");
        }
      })
    }
    setOpenAlert(false)
  }

  const handleViewDetails = (id: number) => {
    setSelectedId(id)
    setOpenModal(true)
    setTimeout(() => {
      refetchVagas()
    }, 0)
  }

  const handleVincularUsers = (id: number) => {
    refetchUsers()
    setSelectedId(id)
    setOpenModalAssociarUsers(true)
    setTimeout(() => {
      refetchAssociatedUsers()
    }, 0)
  } 

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {estacionamentos.map((estacionamento: TResponseEstacionamentoSchema) => (
          <Card key={estacionamento.id}>
            <CardHeader>
              <CardTitle>
                <div className="flex justify-between items-center">
                    {estacionamento.nome}
                    
                    { currentUser.role === "admin" && (
                      <>
                        <Button
                        variant="ghost"
                        onClick={() =>  handleVincularUsers(estacionamento.id)}
                        >
                          <UserStar/>
                        </Button>
                      </>
                     )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {estacionamento.endereco}
              <br />
              Vagas Disponíveis: {estacionamento.vagasDisponiveis} / {estacionamento.totalVagas}
            </CardContent>
            <CardFooter className="justify-end space-x-2">
                { currentUser.role === "admin" && (
                 <>
                    <CopiarCodigo codigo={estacionamento.codigo_convite} />
                  </>
                )}
              <Button
                onClick={() => handleViewDetails(estacionamento.id)}
              >
                Ver vagas
              </Button>
              { currentUser.role === "admin" && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => { setSelectedId(estacionamento.id); setOpenModalEstacionamento(true); }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveClick(estacionamento.id)}
                  >
                    Remover
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialogRemove
        open={openAlert}
        onOpenChange={setOpenAlert}
        onConfirm={handleConfirmDelete}
      />

      <ModalVerVagas
        open={openModal}
        onOpenChange={setOpenModal}
        estacionamentos={estacionamentos.find((e: any) => e.id === selectedId)}
        vagas={vagas}
      />

      <ModalEstacionamento
        open={openModalEstacionamento}
        onOpenChange={setOpenModalEstacionamento}
        estacionamento={estacionamentos.find((e: any) => e.id === selectedId)}
      />

      <ModalAssociarUsers
        open={openModalAssociarUsers}
        onOpenChange={setOpenModalAssociarUsers}
        users={users}
        associatedUsers={usersAssociated}
        estacionamentoId={estacionamentos.find((e: any) => e.id === selectedId)}
      />
    </>
  )
}
