import { useLogout } from "@/api/hooks";
import { Button } from "@/components/ui/button"
import { SquareParking } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom";

export function Header() {

    const queryClient = useQueryClient();
    const logoutMutation = useLogout();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutMutation.mutate(undefined, {
            onSuccess: () => {
                queryClient.removeQueries({ queryKey: ['authUser'] });
                navigate("/login")
            }
        });
    }

  return (
    <header className="border-b bg-white shadow-sm px-6 py-3 flex justify-between items-center">
        <div className="bg-blue-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <SquareParking className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight pl-2">
            <span className="truncate font-medium">Estacionamento</span>
            <span className="truncate text-xs">Gerency</span>
        </div>
        <Button variant="ghost" className="flex items-center space-x-2 border border-zinc-700" onClick={handleLogout}>
            Logout
        </Button>
    </header>
  )
}
