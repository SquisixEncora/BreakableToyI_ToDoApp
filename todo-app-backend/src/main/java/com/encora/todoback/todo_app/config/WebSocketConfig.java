package com.encora.todoback.todo_app.config;

import com.encora.todoback.todo_app.websocket.ToDoWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new ToDoWebSocketHandler(), "/ws/todos")
                .setAllowedOrigins("*"); // Ajusta los orígenes permitidos según sea necesario
    }
}
