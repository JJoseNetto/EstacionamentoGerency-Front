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
import { Accessibility, Car, CirclePlus, Motorbike } from "lucide-react"
import { useState } from "react"
import { SheetAdicionarVaga } from "../SheetAdicionarVaga"
import { SheetEditarVaga } from "../SheetEditarVaga"
import { FilterVagas } from "../FilterVagas"

interface ModalVerVagasProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  estacionamentos: any
  vagas: any[]
}

export function ModalVerVagas({ open, onOpenChange, estacionamentos, vagas }: ModalVerVagasProps) {
  const [openSheet, setOpenSheet] = useState(false)
  const [selectedVaga, setSelectedVaga] = useState<any>(null)
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  
  const handleAddVagas = () => {
    setSelectedVaga(null) 
    setOpenSheet(true)
  }
  
  const handleEditVaga = (vaga: any) => {
    setSelectedVaga(vaga)
    setOpenSheet(true)
  }

  const getIcon = (tipo: string) => {
    switch (tipo) {
      case 'carro': return <Car className="w-4 h-4 mt-1" />;
      case 'moto': return <Motorbike className="w-4 h-4 mt-1" />;
      case 'deficiente': return <Accessibility className="w-4 h-4 mt-1" />;
      default: return null;
    }
  };
  
  const filteredVagas = vagas.filter(vaga => {
    const matchesStatus = statusFilter ? vaga.status === statusFilter : true;
    const matchesSearch = searchTerm ? vaga.numero.toString().includes(searchTerm) : true;
    return matchesStatus && matchesSearch;
  });

  const useSidebar = Math.ceil(filteredVagas.length / 5) > 3; 

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{estacionamentos?.nome}</DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-col gap-2">
              {estacionamentos?.endereco}<br />
              {estacionamentos?.cidade} - {estacionamentos?.estado}
              <div className="flex justify-end mt-2">
                <Button onClick={handleAddVagas}>Adicionar Vaga <CirclePlus /></Button>
              </div>
              <FilterVagas
                onStatusChange={setStatusFilter}
                onSearchChange={setSearchTerm}
              />
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className={`grid grid-cols-5 gap-2 mt-2 ${useSidebar ? "max-h-[300px] overflow-y-auto pr-2" : ""}`}>
          {filteredVagas.map((vaga) => {
            let bgColor = 'bg-gray-200'
            if (vaga.status === 'livre') bgColor = 'bg-green-400'
            else if (vaga.status === 'ocupada') bgColor = 'bg-red-400'

            return (
              <div
                key={vaga.id}
                className={`${bgColor} flex flex-col items-center justify-center h-20 w-12 rounded shadow cursor-pointer hover:scale-105 transition-transform`}
                onClick={() => handleEditVaga(vaga)}
              >
                <span>{vaga.numero}</span>
                <span className="flex justify-center items-center">{getIcon(vaga.tipo)}</span>
              </div>
            )
          })}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>

      {selectedVaga ? (
        <SheetEditarVaga
          open={openSheet}
          onOpenChange={setOpenSheet}
          estacionamentoId={estacionamentos?.id}
          vaga={selectedVaga}
        />
      ) : (
        <SheetAdicionarVaga
          open={openSheet}
          onOpenChange={setOpenSheet}
          estacionamentoId={estacionamentos?.id}
        />
      )}
    </Dialog>
  )
}
