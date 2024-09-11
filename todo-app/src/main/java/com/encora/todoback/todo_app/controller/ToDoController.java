package com.encora.todoback.todo_app.controller;

import com.encora.todoback.todo_app.model.ToDo;
import com.encora.todoback.todo_app.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    // GET /todos - Pagination, sorting, and filtering
    @GetMapping
    public List<ToDo> getTodos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String priority,
            @RequestParam(required = false) Boolean done,
            @RequestParam(required = false) String name
    ) {
        return toDoService.getTodos(page, size, sortBy, priority, done, name);
    }

    // POST /todos - Task creation with validation
    @PostMapping
    public ToDo createToDo(@RequestBody ToDo toDo) {
        return toDoService.createToDo(toDo);
    }

    // PUT /todos/{id} - Task updates
    @PutMapping("/{id}")
    public ToDo updateToDo(@PathVariable String id, @RequestBody ToDo updatedToDo) {
        return toDoService.updateToDo(id, updatedToDo);
    }

    // POST /todos/{id}/done - Mark task as done
    @PostMapping("/{id}/done")
    public ToDo markAsDone(@PathVariable String id) {
        return toDoService.markAsDone(id);
    }

    // PUT /todos/{id}/undone - Mark task as undone
    @PutMapping("/{id}/undone")
    public ToDo markAsUndone(@PathVariable String id) {
        return toDoService.markAsUndone(id);
    }
}
