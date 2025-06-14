// package com.stazy.backend.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.config.Customizer;
// import
// org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.web.SecurityFilterChain;
// import
// org.springframework.security.config.annotation.web.builders.HttpSecurity;

// @Configuration
// @EnableWebSecurity
// public class SecurityConfig {

// @Bean
// public SecurityFilterChain securityFilterChain(HttpSecurity http) throws
// Exception {
// http
// .csrf(csrf -> csrf.disable()) // Use lambda instead of deprecated
// csrf().disable()
// .authorizeHttpRequests(auth -> auth
// .requestMatchers(HttpMethod.POST, "/api/v1/auth/login").permitAll()
// .requestMatchers(HttpMethod.POST, "/api/v1/auth/register").permitAll()
// .anyRequest().authenticated())
// .httpBasic(Customizer.withDefaults()); // Replaces .httpBasic() for clarity

// return http.build();
// }
// }
