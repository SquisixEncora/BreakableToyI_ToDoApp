// package com.encora.todoback.todo_app.model;

// import org.junit.jupiter.api.Test;
// import java.time.LocalDateTime;
// import static org.junit.jupiter.api.Assertions.*;

// class ToDoTest {

//     @Test
//     void testToDoCreation() {
//         String text = "Test task";
//         String priority = "High";
//         LocalDateTime dueDate = LocalDateTime.now().plusDays(1);

//         ToDo todo = new ToDo(text, priority, dueDate);

//         assertNotNull(todo.getId());
//         assertEquals(text, todo.getText());
//         assertEquals(priority, todo.getPriority());
//         assertEquals(dueDate, todo.getDueDate());
//         assertEquals(false, todo.isDone());
//         assertNotNull(todo.getCreationDate());
//     }

//     @Test
//     void testSetters() {
//         ToDo todo = new ToDo("Old task", "Low", null);

//         todo.setText("New task");
//         todo.setPriority("High");
//         LocalDateTime dueDate = LocalDateTime.now().plusDays(3);
//         todo.setDueDate(dueDate);
//         todo.setDone(true);
//         todo.setDoneDate(LocalDateTime.now());

//         assertEquals("New task", todo.getText());
//         assertEquals("High", todo.getPriority());
//         assertEquals(dueDate, todo.getDueDate());
//         assertTrue(todo.isDone());
//         assertNotNull(todo.getDoneDate());
//     }
// }
