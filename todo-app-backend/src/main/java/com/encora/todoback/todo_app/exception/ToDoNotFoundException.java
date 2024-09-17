package com.encora.todoback.todo_app.exception;

public class ToDoNotFoundException extends RuntimeException {
    public ToDoNotFoundException(String id) {
        super("ToDo with id " + id + " not found");
    }
}
