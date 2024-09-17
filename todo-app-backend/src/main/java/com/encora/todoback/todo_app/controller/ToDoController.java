package com.encora.todoback.todo_app.controller;

import com.encora.todoback.todo_app.dto.PaginatedResponse;
import com.encora.todoback.todo_app.dto.ToDoDTO;
import com.encora.todoback.todo_app.model.ToDo;
import com.encora.todoback.todo_app.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/todos")
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping
    public PaginatedResponse<ToDo> getTodos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDirection,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Boolean done,
            @RequestParam(required = false) String name
    ) { 
        return toDoService.getTodos(page, size, sortBy, sortDirection, priority, done, name);
    }

    @PostMapping
    public ToDo createToDo(@Valid @RequestBody ToDoDTO toDoDTO) {
        return toDoService.createToDo(toDoDTO);
    }

    @PutMapping("/{id}")
    public ToDo updateToDo(@PathVariable String id, @Valid @RequestBody ToDoDTO updatedToDoDTO) {
        return toDoService.updateToDo(id, updatedToDoDTO);
    }

    @PutMapping("/{id}/done")
    public ToDo markAsDone(@PathVariable String id) {
        return toDoService.markAsDoneOrUndone(id, true);
    }

    @PutMapping("/{id}/undone")
    public ToDo markAsUndone(@PathVariable String id) {
        return toDoService.markAsDoneOrUndone(id, false);
    }

    @DeleteMapping("/{id}")
    public void deleteToDoById(@PathVariable String id) {
        toDoService.deleteToDoById(id);
    }
}
