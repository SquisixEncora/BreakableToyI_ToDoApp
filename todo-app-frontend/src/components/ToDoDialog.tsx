import { useState } from "react";
import {
  Dialog,
  Button,
  Typography,
  Select
} from "@material-tailwind/react";
import { Xmark } from "iconoir-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importar estilos
import { ToDo } from "../models/ToDo";
import { useToDoContext } from "../context/ToDoContext";
import "react-datepicker/dist/react-datepicker.css";  // Estilos base del Datepicker
import "../styles/customDatePickerStyles.css";  

export function ToDoDialog({
  isEdit = false,
  todo,
  onClose,
}: {
  isEdit?: boolean;
  todo?: ToDo;
  onClose: () => void;
}) {
  const { addTodo, updateTodo } = useToDoContext();

  const [text, setText] = useState(todo?.text || "");
  const [priority, setPriority] = useState(todo?.priority || "Low");
  const [dueDate, setDueDate] = useState<Date | null>(todo?.dueDate ? new Date(todo.dueDate) : null); // Cambiado a Date | null
  const [error, setError] = useState(""); // Estado para almacenar el error

  const maxLength = 120; // Longitud máxima permitida

  const handleSave = () => {
    // Validación del texto
    if (text.trim() === "") {
      setError("The To-Do text cannot be empty.");
      return;
    } else if (text.length > maxLength) {
      setError("The To-Do text cannot exceed 120 characters.");
      return;
    }

    

    const newToDo: ToDo = {
      id: todo?.id || crypto.randomUUID(),
      text,
      priority,
      done: todo?.done || false,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      creationDate: todo?.creationDate || new Date(),
      doneDate: todo?.doneDate,
    };

    if (isEdit && todo) {
      updateTodo(newToDo);
    } else {
      addTodo(newToDo);
    }

    onClose(); // Solo cierra el diálogo si no hay errores
  };

  return (
    <Dialog size="sm" open>
      <Dialog.Overlay>
        <Dialog.Content>
          <Dialog.DismissTrigger as="button" onClick={onClose} className="absolute right-2 top-2">
            <Xmark className="h-5 w-5" />
          </Dialog.DismissTrigger>

          <Typography type="h6" className="mb-1">
            {isEdit ? "Edit To-Do" : "Add To-Do"}
          </Typography>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault(); // Evita el envío del formulario por defecto
              handleSave();
            }}
          >
            <div className="space-y-1.5">
              <Typography as="label" htmlFor="text" type="small" color="default" className="font-semibold">
                To-Do Text
              </Typography>
              <textarea
                id="text"
                value={text}
                placeholder="Describe your task"
                className="w-full border rounded px-3 py-2 focus:border-blue-500"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setText(e.target.value);
                  setError(""); // Limpiar error al cambiar el texto
                }}
                maxLength={maxLength} // Limitar caracteres
                rows={3} // Número inicial de filas
                
              />
              
              {error && <div>
                {/* Mostrar error si el texto no es válido */}
                {error && <Typography color="error" type="small">{error}</Typography>}
                {/* Contador de caracteres */}
              </div>}
              <Typography type="small" className="text-gray-500">
                {text.length}/{maxLength} characters
              </Typography>
            </div>

            <div className="space-y-1.5">
              <Typography as="label" htmlFor="priority" type="small" color="default" className="font-semibold">
                Priority
              </Typography>
              <Select
                id="priority"
                value={priority}
                onValueChange={(value: string) => setPriority(value as "High" | "Medium" | "Low")}
                className="w-full border rounded px-3 py-2"
              >
                <Select.Trigger className="w-full" >
                  
                </Select.Trigger>
                <Select.List>
                  <Select.Option value="High">High</Select.Option>
                  <Select.Option value="Medium">Medium</Select.Option>
                  <Select.Option value="Low">Low</Select.Option>
                </Select.List>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Typography as="label" htmlFor="dueDate" type="small" color="default" className="font-semibold">
                Due Date
              </Typography>
            </div>

            <div className="space-y-1.5">
              <DatePicker
                selected={dueDate} // Cambiado para aceptar Date | null
                onChange={(date) => setDueDate(date)} // DatePicker trabaja con Date | null
                className="w-full border rounded px-3 py-2"
                placeholderText="Select a date"
                dateFormat="MMM d, yyyy"
                isClearable
              />
            </div>

            <Button type="submit" isFullWidth>
              {isEdit ? "Update To-Do" : "Add To-Do"}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
}
