package com.stazy.backend.controller;

import com.stazy.backend.model.Message;
import com.stazy.backend.repository.MessageRepository;
import com.stazy.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/chats")
@CrossOrigin(origins = "*")
public class ChatRestController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // Get all chat threads for the current user
    @GetMapping("/threads")
    public List<String> getChatThreads(@RequestHeader("Authorization") String authorization) {
        String token = authorization.replace("Bearer ", "");
        String userEmail = jwtUtil.getEmailFromToken(token);

        List<Message> messages = messageRepository.findBySenderEmailOrRecipientEmailOrderByTimestampAsc(userEmail);

        Set<String> threads = new HashSet<>();
        for (Message msg : messages) {
            if (!msg.getSenderEmail().equals(userEmail)) {
                threads.add(msg.getSenderEmail());
            }
            if (!msg.getRecipientEmail().equals(userEmail)) {
                threads.add(msg.getRecipientEmail());
            }
        }
        return new ArrayList<>(threads);
    }

    // Get chat history with a specific user
    @GetMapping("/{otherEmail}")
    public List<Message> getChatHistory(@RequestHeader("Authorization") String authorization,
            @PathVariable String otherEmail) {
        String token = authorization.replace("Bearer ", "");
        String userEmail = jwtUtil.getEmailFromToken(token);

        return messageRepository.findChatHistoryBetweenUsers(userEmail, otherEmail);
    }
}