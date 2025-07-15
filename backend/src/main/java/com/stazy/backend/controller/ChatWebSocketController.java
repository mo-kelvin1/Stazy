package com.stazy.backend.controller;

import com.stazy.backend.dto.ChatMessage;
import com.stazy.backend.model.Message;
import com.stazy.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
public class ChatWebSocketController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private MessageRepository messageRepository;

    @MessageMapping("/chat.send")
    public void sendMessage(@Payload ChatMessage chatMessage) {
        // Save message to DB
        Message message = new Message();
        message.setSenderEmail(chatMessage.getSenderEmail());
        message.setRecipientEmail(chatMessage.getRecipientEmail());
        message.setContent(chatMessage.getContent());
        message.setTimestamp(LocalDateTime.now());
        messageRepository.save(message);

        // Send to recipient (and sender for echo)
        messagingTemplate.convertAndSend(
                "/topic/messages/" + chatMessage.getRecipientEmail(),
                chatMessage);
        messagingTemplate.convertAndSend(
                "/topic/messages/" + chatMessage.getSenderEmail(),
                chatMessage);
    }
}