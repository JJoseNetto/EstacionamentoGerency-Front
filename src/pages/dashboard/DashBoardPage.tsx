import { Button } from "@/components/ui/button";
import { DashboardList } from "./components/DashboradList";
import { CirclePlus } from "lucide-react";
import { ModalEstacionamento } from "./components/modals/ModalEstacionamento";
import { useState } from "react";
import { useAuth, useEstacionamentos } from "@/api/hooks";
import OTPPage from "./components/OtpPage";

export default function DashboardPage() {
  
  const [openModal, setOpenModal] = useState(false)
  const { user: currentUser } = useAuth();
  const { data: estacionamentos = [] } = useEstacionamentos()
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Painel de Estacionamentos</h1>
        {currentUser.role === "admin" && (
          <>
            <Button onClick={() => setOpenModal(true)}>Adicionar Estacionamento <CirclePlus/></Button>
          </>
        )}
      </div>
      {estacionamentos.length > 0 ? (
        <>
          <DashboardList currentUser={currentUser} estacionamentos={estacionamentos}/>
        </>
      ): (
        <>
          <OTPPage/>
        </>
      )}
        

        <ModalEstacionamento open={openModal} onOpenChange={setOpenModal} />
    </div>
  );
}
