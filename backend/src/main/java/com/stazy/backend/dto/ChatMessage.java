// src/main/java/com/stazy/backend/dto/ChatMessage.java
package com.stazy.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    @NotBlank
    private String senderEmail;
    @NotBlank
    private String recipientEmail;
    @NotBlank
    private String content;
}