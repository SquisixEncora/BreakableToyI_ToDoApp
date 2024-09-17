package com.encora.todoback.todo_app.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.encora.todoback.todo_app.model.ToDo;
import com.encora.todoback.todo_app.repository.ToDoRepository;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner loadData(ToDoRepository toDoRepository) {
        return args -> {
            List<String> priorities = Arrays.asList("High", "Medium", "Low");
            Random random = new Random();

            for (int i = 1; i <= 20; i++) {
                ToDo todo = new ToDo();
                todo.setId(String.valueOf(i));
                todo.setText("Task " + i);
                todo.setPriority(priorities.get(random.nextInt(priorities.size())));
                todo.setDone(random.nextBoolean());

                // Crear fecha de creación aleatoria en los últimos 30 días
                LocalDateTime creationDate = LocalDateTime.now().minusDays(random.nextInt(30));
                todo.setCreationDate(creationDate);
                if (todo.isDone()) {
                    LocalDateTime doneDate = creationDate.plusDays(random.nextInt(30));
                    todo.setDoneDate(doneDate);
                }

                // Crear fecha de vencimiento aleatoria dentro del próximo mes
                LocalDateTime dueDate = random.nextBoolean() ?
                        LocalDateTime.now().plusDays(random.nextInt(30)) :
                        null;
                todo.setDueDate(dueDate);

                toDoRepository.save(todo);
            }
        };
    }
}
