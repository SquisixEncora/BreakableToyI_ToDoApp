import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axiosInstance from '../api/axiosConfig';
import { ToDo } from '../models/ToDo';

interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
}

interface ToDoContextType {
  todos: ToDo[];
  setTodos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchTodos: (page?: number, sortConfig?: { key: string; direction: 'asc' | 'desc' }) => void;
  handlePageChange: (newPage: number) => void;
  handleSort: (key: string) => void;
  addTodo: (todo: ToDo) => void;
  updateTodo: (todo: ToDo) => void;
  markAsDone: (id: string) => void;
  markAsUndone: (id: string) => void;
  deleteTodo: (id: string) => void;
  setFilters: React.Dispatch<React.SetStateAction<{ name?: string; priority?: string; done?: boolean }>>;
  handleSearch: (name: string, priority: string, state: string) => void;
}



const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export const useToDoContext = () => {
  const context = useContext(ToDoContext);
  if (!context) {
    throw new Error('useToDoContext debe usarse dentro de un ToDoProvider');
  }
  return context;
};

export const ToDoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); // Página actual
  const [totalPages, setTotalPages] = useState<number>(1); // Número total de páginas
  const [pageSize, setPageSize] = useState<number>(10); // Tamaño de página
  const [sortConfig, setSortConfig] = useState<{ sortBy: string | undefined; sortDirection: 'asc' | 'desc' } | undefined>(undefined);
  const [filters, setFilters] = useState<{ name?: string; priority?: string; done?: boolean }>({});

  
  const fetchTodos = async (page: number = currentPage) => {
    try {
      const response = await axiosInstance.get<PaginatedResponse<ToDo>>('', {
        params: {
          page: page - 1, // Backend usa paginación basada en 0
          size: pageSize,
          ...filters, // Aplica los filtros
          ...sortConfig, // Aplica la ordenación
        },
      });
      
      setTodos(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };
  

  useEffect(() => {
    fetchTodos(currentPage);
  }, [filters, currentPage, pageSize, sortConfig]);

  const addTodo = async (todo: ToDo) => {
    try {
      await axiosInstance.post('', todo);
      fetchTodos(currentPage); // Refrescar la lista con la paginación actual
    } catch (error) {
      console.error('Error al crear una nueva tarea:', error);
    }
  };

  const updateTodo = async (updatedToDo: ToDo) => {
    try {
      await axiosInstance.put(`/${updatedToDo.id}`, updatedToDo);
      fetchTodos(currentPage); // Refrescar la lista con la paginación actual
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  const markAsDone = async (id: string) => {
    try {
      await axiosInstance.put(`/${id}/done`);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, done: true, doneDate: new Date() } : todo))
      );
    } catch (error) {
      console.error('Error al marcar la tarea como realizada:', error);
    }
  };

  const markAsUndone = async (id: string) => {
    try {
      await axiosInstance.put(`/${id}/undone`);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, done: false, doneDate: undefined } : todo))
      );
    } catch (error) {
      console.error('Error al marcar la tarea como no realizada:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await axiosInstance.delete(`/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  // Función para manejar el cambio de página
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchTodos(newPage);
  };

  // Función para manejar la ordenación
  const handleSort = (sortBy: string) => {
    let sortDirection: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.sortBy === sortBy && sortConfig.sortDirection === 'asc') {
      sortDirection = 'desc';
    }
    
    setSortConfig({ sortBy, sortDirection });
    
  };

  const handleSearch = (name: string, priority: string, state: string) => {
    const filters = {
      name: name || undefined,
      priority: priority !== 'All' ? priority : undefined,
      done: state !== 'All' ? (state === 'Done') : undefined,
    };
    setFilters(filters);
  };

  

  return (
    <ToDoContext.Provider
      value={{
        todos,
        setTodos,
        currentPage,
        totalPages,
        pageSize,
        setPageSize,
        setCurrentPage,
        fetchTodos,
        handlePageChange, 
        handleSort,
        handleSearch,
        setFilters, 
        addTodo,
        updateTodo,
        markAsDone,
        markAsUndone,
        deleteTodo,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};
