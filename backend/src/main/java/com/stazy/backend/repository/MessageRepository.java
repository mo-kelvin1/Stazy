package com.stazy.backend.repository;

import com.stazy.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderEmailOrRecipientEmailOrderByTimestampAsc(String sender, String recipient);

    List<Message> findBySenderEmailAndRecipientEmailOrRecipientEmailAndSenderEmailOrderByTimestampAsc(
            String sender1, String recipient1, String sender2, String recipient2);
}