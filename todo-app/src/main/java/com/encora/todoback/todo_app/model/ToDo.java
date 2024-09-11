package com.encora.todoback.todo_app.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class ToDo {

    private String id;
    private String text;
    private LocalDateTime dueDate;
    private boolean done;
    private LocalDateTime doneDate;
    private String priority;
    private LocalDateTime creationDate;

    // Constructor
    public ToDo(String text, String priority, LocalDateTime dueDate) {
        this.id = UUID.randomUUID().toString();
        this.text = text;
        this.priority = priority;
        this.dueDate = dueDate;
        this.done = false;
        this.creationDate = LocalDateTime.now();
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public boolean isDone() {
        return done;
    }

    public LocalDateTime getDoneDate() {
        return doneDate;
    }

    public String getPriority() {
        return priority;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    // Setters
    public void setText(String text) {
        this.text = text;
    }

    public void setDueDate(LocalDateTime dueDate) {
        this.dueDate = dueDate;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public void setDoneDate(LocalDateTime doneDate) {
        this.doneDate = doneDate;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}

