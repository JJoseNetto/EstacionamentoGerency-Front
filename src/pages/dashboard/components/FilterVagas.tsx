import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface FilterVagasProps {
  onStatusChange: (status: string) => void;
  onSearchChange: (term: string) => void;
}

export function FilterVagas({ onStatusChange, onSearchChange }: FilterVagasProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onStatusChange(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Tabs value={status} onValueChange={handleStatusChange}>
        <TabsList>
          <TabsTrigger value="">Todas</TabsTrigger>
          <TabsTrigger value="livre">Livre</TabsTrigger>
          <TabsTrigger value="ocupada">Ocupada</TabsTrigger>
          <TabsTrigger value="bloqueada">Bloqueada</TabsTrigger>
        </TabsList>
      </Tabs>

      <InputGroup>
        <InputGroupInput
          placeholder="Buscar..."
          value={search}
          onChange={handleSearchChange}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupButton>Buscar</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
