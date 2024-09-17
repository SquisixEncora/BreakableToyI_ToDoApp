package com.encora.todoback.todo_app.repository;

import com.encora.todoback.todo_app.dto.PaginatedResponse;
import com.encora.todoback.todo_app.model.ToDo;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.Comparator;


@Repository
public class ToDoRepository {

    private List<ToDo> todos = new ArrayList<>();
    
    private static final Map<String, Integer> priorityOrder = Map.of(
    "High", 1,
    "Medium", 2,
    "Low", 3
);

public PaginatedResponse<ToDo> findTodos(int page, int size, String sortBy, String sortDirection, String priority, Boolean done, String name) {
    System.out.println("Sorting by: " + sortBy + " in " + sortDirection + " order");

    List<ToDo> filteredTodos = todos.stream()
        .filter(todo -> priority == null || todo.getPriority().equals(priority))
        .filter(todo -> done == null || todo.isDone() == done)
        .filter(todo -> name == null || todo.getText().toLowerCase().contains(name.toLowerCase()))
        .sorted((todo1, todo2) -> {
            Comparator<ToDo> comparator;

            if (sortBy == null) {
                comparator = Comparator.comparing(ToDo::getCreationDate);
            } else {
                switch (sortBy) {
                    case "priority":
                        comparator = Comparator.comparing(todo -> priorityOrder.get(todo.getPriority()));
                        break;
                    case "dueDate":
                        comparator = Comparator.comparing(ToDo::getDueDate, Comparator.nullsLast(Comparator.naturalOrder()));
                        break;
                    case "creationDate":
                    default:
                        comparator = Comparator.comparing(ToDo::getCreationDate);
                        break;
                }
            }

            // Aplica la dirección de ordenación
            if ("desc".equalsIgnoreCase(sortDirection)) {
                comparator = comparator.reversed();
            }

            return comparator.compare(todo1, todo2);
        })
        .collect(Collectors.toList());

    int totalElements = filteredTodos.size();
    List<ToDo> paginatedTodos = filteredTodos.stream()
        .skip(page * size)
        .limit(size)
        .collect(Collectors.toList());

    return new PaginatedResponse<>(paginatedTodos, page, size, totalElements);
}



    public ToDo save(ToDo toDo) {
        todos.add(toDo);
        return toDo;
    }

    public Optional<ToDo> findById(String id) {
        return todos.stream().filter(todo -> todo.getId().equals(id)).findFirst();
    }

    public void deleteById(String id) {
        todos.removeIf(todo -> todo.getId().equals(id));
    }
}
