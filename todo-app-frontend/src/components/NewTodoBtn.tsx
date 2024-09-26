import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { ToDoDialog } from "./ToDoDialog"; // Importar el diálogo

export function NewTodoBtn() {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar si el diálogo está abierto

  // Función para abrir el diálogo
  const openDialog = () => setIsDialogOpen(true);

  // Función para cerrar el diálogo
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      {/* Botón para abrir el diálogo */}
      <Button onClick={openDialog} className={"w-2/12"}>
        + New To Do
      </Button>

      {/* Renderizar el diálogo si está abierto */}
      {isDialogOpen && (
        <ToDoDialog isEdit={false} onClose={closeDialog} /> // if the default value of isEdit is false why you need to specified here? it's not necessary
      )}
    </>
  );
}
