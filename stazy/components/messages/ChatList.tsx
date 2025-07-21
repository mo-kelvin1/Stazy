import React, { useRef, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import ChatBubble from "./ChatBubble";

interface Message {
  id?: string | number;
  senderEmail: string;
  content: string;
  timestamp: string;
}

interface ChatListProps {
  messages: Message[];
  userEmail: string;
}

const ChatList: React.FC<ChatListProps> = ({ messages, userEmail }) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <View style={styles.chatAreaBlue}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <ChatBubble
            id={item.id || item.timestamp}
            content={item.content}
            timestamp={item.timestamp}
            sentByUser={item.senderEmail === userEmail}
          />
        )}
        keyExtractor={(item, idx) => item.id?.toString() || idx.toString()}
        contentContainerStyle={styles.messagesList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chatAreaBlue: {
    flex: 1,
    backgroundColor: "#e8f0fe",
  },
  messagesList: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 24,
  },
});

export default ChatList;
