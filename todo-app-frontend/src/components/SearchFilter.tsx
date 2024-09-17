import { SetStateAction, useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Button,
  Textarea,
  Select
} from "@material-tailwind/react";
import { useToDoContext } from '../context/ToDoContext';

export function SearchFilter() {
  const { handleSearch } = useToDoContext(); // Añadir setTodos si se quiere actualizar el estado
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('All');
  const [state, setState] = useState('All');

  
  

  return (
    <Card>
      <CardBody>
        <Typography variant="h1" className="text-lg font-semibold text-gray-800 mb-2">
          Search - Filter
        </Typography>

        {/* Contenedor en forma de grid para textos y campos de input */}
        <div className="grid grid-cols-[1fr,8fr] gap-2 items-center">
          
          {/* Texto y Textarea en columnas separadas */}
          <Typography>Name:</Typography>
          <Textarea
            rows={1}
            className="w-full"
            value={name}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setName(e.target.value)}
          />

          {/* Texto y Select para Priority */}
          <Typography>Priority:</Typography>
          <Select
            className="w-full"
            value={priority}
            onValueChange={(value: string) => setPriority(value)}
          >
            <Select.Trigger placeholder="Select priority" />
            <Select.List>
              <Select.Option value="All">All</Select.Option>
              <Select.Option value="High">High</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="Low">Low</Select.Option>
            </Select.List>
          </Select>

          {/* Texto y Select para State */}
          <Typography>State:</Typography>
          <Select
            className="w-full"
            value={state}
            onValueChange={(value: string) => setState(value)}
          >
            <Select.Trigger placeholder="Select state" />
            <Select.List>
              <Select.Option value="All">All</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
              <Select.Option value="Undone">Undone</Select.Option>
            </Select.List>
          </Select>
        </div>

       
        <div className="flex justify-end mt-4">
          <Button onClick={() => {
    
    handleSearch(name, priority, state);
  }}>Search</Button>
        </div>
      </CardBody>
    </Card>
  );
}
