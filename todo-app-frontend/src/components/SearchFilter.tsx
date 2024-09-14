import {
    Card,
    CardBody,
    Typography,
    Button,
    Textarea,
    Select,
    
  } from "@material-tailwind/react";
   
  export function SearchFilter() {
    return (
        <Card>
        <CardBody>
    <Typography variant="h5" className="mb-2">
      Search - Filter
    </Typography>

    {/* Contenedor en forma de grid para textos y campos de input */}
    <div className="grid grid-cols-[1fr,8fr] gap-2 items-center">
      
      {/* Texto y Textarea en columnas separadas */}
      <Typography>Name:</Typography>
      <Textarea rows={1} className="w-full"></Textarea> {/* Ajustando el ancho a full dentro de su columna */}

      {/* Texto y Select para Priority */}
      <Typography>Priority:</Typography>
      <Select className="w-full"> {/* Alineando el Select */}
        <Select.Trigger placeholder="" />
        <Select.List>
          <Select.Option>All</Select.Option>
          <Select.Option>High</Select.Option>
          <Select.Option>Medium</Select.Option>
          <Select.Option>Low</Select.Option>
        </Select.List>
      </Select>

      {/* Texto y Select para State */}
      <Typography>State:</Typography>
      <Select className="w-full"> {/* Alineando el Select */}
        <Select.Trigger placeholder="" />
        <Select.List>
          <Select.Option>All</Select.Option>
          <Select.Option>Done</Select.Option>
          <Select.Option>Undone</Select.Option>                    
        </Select.List>
      </Select>
    </div>

    {/* Botón alineado a la derecha */}
    <div className="flex justify-end mt-4">
      <Button>Search</Button>
    </div>
  </CardBody>
      </Card>
      
    );
  }