import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ToDo } from '../models/ToDo';

// Define el tipo de contexto
interface ToDoContextType {
  todos: ToDo[];
  addTodo: (todo: ToDo) => void;
  updateTodo: (id: string, updatedToDo: Partial<ToDo>) => void;
  markAsDone: (id: string) => void;
  markAsUndone: (id: string) => void;
  deleteTodo: (id: string) => void;
}

// Crear contexto
const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

// Hook para usar el contexto
export const useToDoContext = () => {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error('useToDoContext debe usarse dentro de un ToDoProvider');
  }
  return context;
};

// Proveedor del contexto
export const ToDoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<ToDo[]>([]);

  const addTodo = (todo: ToDo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (id: string, updatedToDo: Partial<ToDo>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedToDo } : todo))
    );
  };

  const markAsDone = (id: string) => {
    updateTodo(id, { done: true, doneDate: new Date() });
  };

  const markAsUndone = (id: string) => {
    updateTodo(id, { done: false, doneDate: undefined });
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <ToDoContext.Provider value={{ todos, addTodo, updateTodo, markAsDone, markAsUndone, deleteTodo }}>
      {children}
    </ToDoContext.Provider>
  );
};
