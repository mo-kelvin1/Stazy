// src/main/java/com/stazy/backend/dto/ChatMessage.java
package com.stazy.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessage {
    private String senderEmail;
    private String recipientEmail;
    private String content;
}