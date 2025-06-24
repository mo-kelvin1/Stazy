import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MessageItem = {
  guestId: string;
  fullName: string;
  email: string;
  lastMessage?: string;
  timestamp?: string;
};

export default function MessagesScreen() {
  const [recentMessages, setRecentMessages] = useState<MessageItem[]>([]);

  const loadMessages = async () => {
    const stored = await AsyncStorage.getItem("messageContacts");
    if (stored) {
      const parsed = JSON.parse(stored);
      setRecentMessages(parsed);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadMessages();
    }, [])
  );

  const deleteSingleMessage = async (guestId: string) => {
    const updated = recentMessages.filter((msg) => msg.guestId !== guestId);
    setRecentMessages(updated);
    await AsyncStorage.setItem("messageContacts", JSON.stringify(updated));
    await AsyncStorage.removeItem(`chat_${guestId}`);
  };

  const confirmDelete = (guestId: string) => {
    Alert.alert(
      "Delete Chat",
      "Are you sure you want to delete this conversation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteSingleMessage(guestId),
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: MessageItem }) => (
    <View style={styles.messageCard}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() =>
          router.push({
            pathname: "/messages/[guestId]",
            params: {
              guestId: item.guestId,
              fullName: item.fullName,
              email: item.email,
            },
          })
        }
      >
        <View style={styles.messageRow}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{item.fullName.charAt(0)}</Text>
          </View>
          <View style={styles.messageInfo}>
            <Text style={styles.name}>{item.fullName}</Text>
            <Text style={styles.lastMessage}>
              {item.lastMessage || "Say hello!"}
            </Text>
          </View>
          <Text style={styles.timestamp}>{item.timestamp || ""}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => confirmDelete(item.guestId)}
        style={styles.deleteIcon}
      >
        <Ionicons name="create-outline" size={22} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>

      {recentMessages.length > 0 ? (
        <FlatList
          data={recentMessages}
          keyExtractor={(item) => item.guestId}
          renderItem={renderItem}
          contentContainerStyle={styles.messageList}
        />
      ) : (
        <ScrollView
          contentContainerStyle={styles.emptyContainer}
          showsVerticalScrollIndicator={false}
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={64}
            color="#C7C7CC"
          />
          <Text style={styles.emptyTitle}>No Messages Yet</Text>
          <Text style={styles.emptyText}>
            There are no messages currently being displayed to you.
          </Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  messageList: {
    padding: 16,
  },
  messageCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
    borderRadius: 28,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
  },
  messageInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
  },
  bookingMeta: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  lastMessage: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginLeft: 8,
  },
  deleteIcon: {
    paddingHorizontal: 10,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    color: "#555",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    lineHeight: 22,
  },
});
