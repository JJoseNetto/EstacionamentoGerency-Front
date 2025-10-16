import { Outlet } from "react-router-dom"
import { Header } from "@/components/header"

export function AppLayout() {
  return (
      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex-1 p-6 ">
          <Outlet />
        </main>
      </div>
  )
}
