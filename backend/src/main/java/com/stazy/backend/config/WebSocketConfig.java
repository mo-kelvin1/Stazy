package com.stazy.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.server.HandshakeInterceptor;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import com.stazy.backend.util.JwtUtil;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Enables a simple in-memory broker for /topic
        config.enableSimpleBroker("/topic"); // For subscribing (receiving messages)
        config.setApplicationDestinationPrefixes("/app"); // For sending (client -> server)
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws/chat")
                .setAllowedOriginPatterns("*") // ⚠️ Allow all origins — for development only
                .addInterceptors(new JwtHandshakeInterceptor(jwtUtil))
                .withSockJS(); // Enables SockJS fallback for browsers without native WebSocket
    }

    // Custom HandshakeInterceptor for JWT authentication
    public static class JwtHandshakeInterceptor implements HandshakeInterceptor {
        private final JwtUtil jwtUtil;

        public JwtHandshakeInterceptor(JwtUtil jwtUtil) {
            this.jwtUtil = jwtUtil;
        }

        @Override
        public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
            String token = null;
            if (request instanceof ServletServerHttpRequest servletRequest) {
                HttpServletRequest httpServletRequest = servletRequest.getServletRequest();
                String authHeader = httpServletRequest.getHeader("Authorization");
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    token = authHeader.substring(7);
                }
                // Check query param as fallback (for SockJS)
                if (token == null) {
                    token = httpServletRequest.getParameter("token");
                }
            }
            if (token != null) {
                try {
                    String email = jwtUtil.getEmailFromToken(token);
                    if (jwtUtil.validateToken(token, email)) {
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                email, null, new ArrayList<>());
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        attributes.put("userEmail", email);
                        return true;
                    }
                } catch (Exception e) {
                    // Invalid token
                }
            }
            response.setStatusCode(org.springframework.http.HttpStatus.FORBIDDEN);
            return false;
        }

        @Override
        public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                WebSocketHandler wsHandler, Exception exception) {
            // No-op
        }
    }
}
