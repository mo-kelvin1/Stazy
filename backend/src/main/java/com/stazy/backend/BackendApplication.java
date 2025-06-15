package com.stazy.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import com.stazy.backend.filter.JwtAuthenticationFilter;
import com.stazy.backend.utils.JsonWebToken;
import com.stazy.backend.repository.AuthenticationUserRepository;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean<JwtAuthenticationFilter> jwtFilter(JsonWebToken jwt,
			AuthenticationUserRepository userRepo) {
		FilterRegistrationBean<JwtAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
		registrationBean.setFilter(new JwtAuthenticationFilter(jwt, userRepo));
		registrationBean.addUrlPatterns("/api/v1/auth/user"); // You can add more patterns here
		return registrationBean;
	}
}
