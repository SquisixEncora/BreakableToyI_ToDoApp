package com.encora.todoback.todo_app.repository;

import com.encora.todoback.todo_app.model.ToDo;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class ToDoRepository {

    private List<ToDo> todos = new ArrayList<>();

    public List<ToDo> findTodos(int page, int size, String sortBy, String priority, Boolean done, String name) {
        // Filtrar y paginar la lista de ToDo según los parámetros recibidos
        // Por simplicidad, se omite la implementación real de filtrado y paginación
        return todos;
    }

    public ToDo save(ToDo toDo) {
        todos.add(toDo);
        return toDo;
    }

    public Optional<ToDo> findById(String id) {
        return todos.stream().filter(todo -> todo.getId().equals(id)).findFirst();
    }
}
