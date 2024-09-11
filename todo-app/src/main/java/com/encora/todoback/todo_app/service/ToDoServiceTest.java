// package com.encora.todoback.todo_app.service;

// import com.encora.todoback.todo_app.model.ToDo;
// import com.encora.todoback.todo_app.repository.ToDoRepository;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;

// import java.time.LocalDateTime;
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.Mockito.*;

// class ToDoServiceTest {

//     @Mock
//     private ToDoRepository toDoRepository;

//     @InjectMocks
//     private ToDoService toDoService;

//     @BeforeEach
//     void setUp() {
//         MockitoAnnotations.openMocks(this);
//     }

//     @Test
//     void testCreateToDo() {
//         // Mock the save behavior
//         ToDo todo = new ToDo("Test Task", "Medium", LocalDateTime.now().plusDays(2));
//         when(toDoRepository.save(todo)).thenReturn(todo);

//         // Call the service
//         ToDo createdToDo = toDoService.createToDo(todo);

//         // Verify interactions and assertions
//         assertNotNull(createdToDo);
//         verify(toDoRepository, times(1)).save(todo);
//     }

//     @Test
//     void testMarkAsDone() {
//         ToDo todo = new ToDo("Test Task", "Low", LocalDateTime.now().plusDays(3));
//         when(toDoRepository.findById(todo.getId())).thenReturn(Optional.of(todo));

//         toDoService.markAsDone(todo.getId());

//         assertTrue(todo.isDone());
//         assertNotNull(todo.getDoneDate());
//         verify(toDoRepository, times(1)).save(todo);
//     }

//     @Test
//     void testMarkAsUndone() {
//         ToDo todo = new ToDo("Test Task", "Low", LocalDateTime.now().plusDays(3));
//         todo.setDone(true);
//         todo.setDoneDate(LocalDateTime.now());
//         when(toDoRepository.findById(todo.getId())).thenReturn(Optional.of(todo));

//         toDoService.markAsUndone(todo.getId());

//         assertFalse(todo.isDone());
//         assertNull(todo.getDoneDate());
//         verify(toDoRepository, times(1)).save(todo);
//     }
// }
