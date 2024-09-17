package com.encora.todoback.todo_app.service;

import com.encora.todoback.todo_app.dto.PaginatedResponse;
import com.encora.todoback.todo_app.dto.ToDoDTO;
import com.encora.todoback.todo_app.exception.ToDoNotFoundException;
import com.encora.todoback.todo_app.model.ToDo;
import com.encora.todoback.todo_app.repository.ToDoRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

import java.util.Optional;

@Service
public class ToDoService {

    private final ToDoRepository toDoRepository;

    public ToDoService(ToDoRepository toDoRepository) {
        this.toDoRepository = toDoRepository;
    }

    public PaginatedResponse<ToDo> getTodos(int page, int size, String sortBy, String sortDirection, String priority, Boolean done, String name) {
        return toDoRepository.findTodos(page, size, sortBy, sortDirection, priority, done, name);
    }

    public ToDo createToDo(ToDoDTO toDoDTO) {
        ToDo toDo = new ToDo(toDoDTO.getText(), toDoDTO.getPriority(), toDoDTO.getDueDate());
        return toDoRepository.save(toDo);
    }

    // Implementación de actualización de tarea con DTO
    public ToDo updateToDo(String id, ToDoDTO updatedToDoDTO) {
        Optional<ToDo> toDoOpt = toDoRepository.findById(id);
        if (toDoOpt.isPresent()) {
            ToDo toDo = toDoOpt.get();
            toDo.setText(updatedToDoDTO.getText());
            toDo.setPriority(updatedToDoDTO.getPriority());
            toDo.setDueDate(updatedToDoDTO.getDueDate());
            return toDo;
        }
        throw new ToDoNotFoundException(id);
    }

    public ToDo markAsDoneOrUndone(String id, boolean done) {
        Optional<ToDo> toDoOpt = toDoRepository.findById(id);
        if (toDoOpt.isPresent()) {
            ToDo toDo = toDoOpt.get();
            toDo.setDone(done);
            toDo.setDoneDate(done ? LocalDateTime.now() : null);
            return toDo;
        }
        throw new ToDoNotFoundException(id);
    }

    public void deleteToDoById(String id) {
        Optional<ToDo> toDoOpt = toDoRepository.findById(id);
        if (toDoOpt.isPresent()) {
            toDoRepository.deleteById(id);
        } else {
            throw new ToDoNotFoundException(id);
        }
    }

    

    
}
