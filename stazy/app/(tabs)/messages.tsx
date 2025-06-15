import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FadeInView from "../../components/cards/FadeInView";
import React from "react";

const MessageItem = ({
  name,
  message,
  time,
  unread,
}: {
  name: string;
  message: string;
  time: string;
  unread?: boolean;
}) => (
  <TouchableOpacity style={styles.messageItem}>
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{name.charAt(0)}</Text>
    </View>
    <View style={styles.messageContent}>
      <View style={styles.messageHeader}>
        <Text style={[styles.name, unread && styles.unreadText]}>{name}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <Text
        style={[styles.message, unread && styles.unreadMessage]}
        numberOfLines={2}
      >
        {message}
      </Text>
    </View>
    {unread && <View style={styles.unreadDot} />}
  </TouchableOpacity>
);

export default function messages() {
  const messages = [
    {
      name: "Sarah Johnson",
      message:
        "Thanks for the great trip recommendations! The hotel was perfect.",
      time: "2h",
      unread: true,
    },
    {
      name: "Travel Support",
      message:
        "Your booking confirmation for Paris has been sent to your email.",
      time: "5h",
      unread: false,
    },
    {
      name: "Mike Chen",
      message: "Are you still planning to visit Tokyo next month?",
      time: "1d",
      unread: true,
    },
    {
      name: "Emma Wilson",
      message: "The photos from our Bali trip look amazing!",
      time: "2d",
      unread: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.FadeInView}>
        <View style={styles.header}>
          <Text style={styles.title}>Messages</Text>
          <TouchableOpacity>
            <Ionicons name="create-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.messagesList}>
          {messages.map((msg, index) => (
            <MessageItem
              key={index}
              name={msg.name}
              message={msg.message}
              time={msg.time}
              unread={msg.unread}
            />
          ))}
        </ScrollView>
      </FadeInView>
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
    justifyContent: "space-between",
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
  messagesList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  unreadText: {
    fontWeight: "bold",
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
  message: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  unreadMessage: {
    color: "#333",
    fontWeight: "500",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginLeft: 8,
  },
  FadeInView: {
    flex: 1,
  },
});
