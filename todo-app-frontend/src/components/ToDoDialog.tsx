import { useState } from "react";
import {
  Dialog,
  Button,
  Input,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import { Xmark } from "iconoir-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Importar estilos
import { ToDo } from "../models/ToDo";
import { useToDoContext } from "../context/ToDoContext";
import "react-datepicker/dist/react-datepicker.css";  // Estilos base del Datepicker
import "../styles/customDatePickerStyles.css";  

// Diálogo para agregar o editar un To-Do
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
  const [done, setDone] = useState(todo?.done || false);

  const handleSave = () => {
    const newToDo: ToDo = {
      id: todo?.id || crypto.randomUUID(),
      text,
      priority,
      done,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      creationDate: todo?.creationDate || new Date(),
      doneDate: done ? new Date() : undefined,
    };

    if (isEdit && todo) {
      updateTodo(todo.id, newToDo);
    } else {
      addTodo(newToDo);
    }

    onClose(); // Cierra el diálogo después de guardar
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

          <form className="mt-6 space-y-4">
            <Input className="space-y-1.5">
              <Typography as="label" htmlFor="text" type="small" color="default" className="font-semibold">
                To-Do Text
              </Typography>
              <Input.Field
                id="text"
                value={text}
                placeholder="Describe your task"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
              />
            </Input>

            <Input className="space-y-1.5">
              <Typography as="label" htmlFor="priority" type="small" color="default" className="font-semibold">
                Priority
              </Typography>
              <select
                id="priority"
                value={priority}
                className="w-full border rounded px-3 py-2"
                onChange={(e) => setPriority(e.target.value as "High" | "Medium" | "Low")}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </Input>

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

            <div className="mb-4 flex items-center gap-2">
              <Checkbox
                id="done"
                checked={done}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDone(e.target.checked)}
              >
                <Checkbox.Indicator />
              </Checkbox>
              <Typography as="label" htmlFor="done" className="text-foreground">
                Done
              </Typography>
            </div>

            <Button isFullWidth onClick={handleSave}>
              {isEdit ? "Update To-Do" : "Add To-Do"}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
}
