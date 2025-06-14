package com.stazy.backend.filter;

import com.stazy.backend.model.AuthenticationUser;
import com.stazy.backend.repository.AuthenticationUserRepository;
import com.stazy.backend.utils.JsonWebToken;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter implements Filter {

    private final JsonWebToken jwt;
    private final AuthenticationUserRepository userRepository;

    public JwtAuthenticationFilter(JsonWebToken jwt, AuthenticationUserRepository userRepository) {
        this.jwt = jwt;
        this.userRepository = userRepository;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpReq = (HttpServletRequest) request;
        String authHeader = httpReq.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                String email = jwt.getEmailFromToken(token);
                AuthenticationUser user = userRepository.findByEmail(email).orElse(null);
                if (user != null) {
                    request.setAttribute("authenticateUser", user);
                }
            } catch (Exception e) {
                // Log invalid token or handle it gracefully
            }
        }

        chain.doFilter(request, response);
    }
}
