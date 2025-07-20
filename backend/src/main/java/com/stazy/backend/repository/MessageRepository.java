package com.stazy.backend.repository;

import com.stazy.backend.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findBySenderEmailOrRecipientEmailOrderByTimestampAsc(String sender, String recipient);

    List<Message> findBySenderEmailAndRecipientEmailOrRecipientEmailAndSenderEmailOrderByTimestampAsc(
            String sender1, String recipient1, String sender2, String recipient2);

    @Query("SELECT m FROM Message m WHERE (m.senderEmail = :user1 AND m.recipientEmail = :user2) OR (m.senderEmail = :user2 AND m.recipientEmail = :user1) ORDER BY m.timestamp ASC")
    List<Message> findChatHistoryBetweenUsers(@Param("user1") String user1, @Param("user2") String user2);
}