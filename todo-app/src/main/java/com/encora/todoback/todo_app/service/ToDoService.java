package com.encora.todoback.todo_app.service;

import com.encora.todoback.todo_app.exception.ToDoNotFoundException;
import com.encora.todoback.todo_app.model.ToDo;
import com.encora.todoback.todo_app.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.time.LocalDateTime;


@Service
public class ToDoService {

    @Autowired
    private ToDoRepository toDoRepository;

    // Implementación del endpoint GET con paginación, filtrado y ordenamiento
    public List<ToDo> getTodos(int page, int size, String sortBy, String priority, Boolean done, String name) {
        // Lógica para obtener tareas con los filtros y la paginación
        return toDoRepository.findTodos(page, size, sortBy, priority, done, name);
    }

    // Implementación de creación de tarea
    public ToDo createToDo(ToDo toDo) {
        return toDoRepository.save(toDo);
    }

    // Implementación de actualización de tarea
    public ToDo updateToDo(String id, ToDo updatedToDo) {
        Optional<ToDo> toDoOpt = toDoRepository.findById(id);
        if (toDoOpt.isPresent()) {
            ToDo toDo = toDoOpt.get();
            toDo.setText(updatedToDo.getText());
            toDo.setPriority(updatedToDo.getPriority());
            toDo.setDueDate(updatedToDo.getDueDate());
            return toDoRepository.save(toDo);
        }
        throw new ToDoNotFoundException(id);
    }

    // Marcar tarea como realizada
    public ToDo markAsDone(String id) {
        Optional<ToDo> toDoOpt = toDoRepository.findById(id);
        if (toDoOpt.isPresent()) {
            ToDo toDo = toDoOpt.get();
            toDo.setDone(true);
            toDo.setDoneDate(LocalDateTime.now());
            return toDoRepository.save(toDo);
        }
        throw new ToDoNotFoundException(id);
    }

    // Marcar tarea como no realizada
    public ToDo markAsUndone(String id) {
        Optional<ToDo> toDoOpt = toDoRepository.findById(id);
        if (toDoOpt.isPresent()) {
            ToDo toDo = toDoOpt.get();
            toDo.setDone(false);
            toDo.setDoneDate(null);
            return toDoRepository.save(toDo);
        }
        throw new ToDoNotFoundException(id);
    }
}
