import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ChatBubbleProps {
  content: string;
  timestamp: string;
  sentByUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  content,
  timestamp,
  sentByUser,
}) => (
  <View style={styles.messageRow}>
    <View
      style={[
        styles.messageBubble,
        sentByUser ? styles.messageRight : styles.messageLeft,
        sentByUser ? { alignSelf: "flex-end" } : { alignSelf: "flex-start" },
      ]}
    >
      <Text style={styles.messageTextSmall}>{content}</Text>
      <Text style={styles.messageMeta}>{timestamp}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  messageRow: {
    marginBottom: 8,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 12,
    borderRadius: 18,
    marginBottom: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  messageLeft: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  messageRight: {
    backgroundColor: "lightblue",
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  messageTextSmall: {
    color: "#22wh2",
    fontSize: 13,
    fontWeight: "400",
  },
  messageMeta: {
    color: "#888",
    fontSize: 10,
    marginTop: 4,
    textAlign: "right",
  },
});

export default ChatBubble;
