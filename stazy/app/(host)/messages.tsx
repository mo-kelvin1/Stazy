import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { useLocalSearchParams } from "expo-router";
import { Client } from "@stomp/stompjs";
import { useAuth } from "../../hooks/useAuth";
import SockJS from "sockjs-client";
import { SafeAreaView as SafeAreaViewRN } from "react-native-safe-area-context";
import ChatHeader from "../../components/messages/ChatHeader";
import ChatInputBar from "../../components/messages/ChatInputBar";
import ChatList from "../../components/messages/ChatList";
import ThreadList from "../../components/messages/ThreadList";

const tokenStore = new SimulatedTokenStore();
const WS_URL = "ws://10.30.22.161:8080/ws/chat";

function formatTimestamp(ts: string) {
  if (!ts) return "";
  const date = new Date(ts);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const ChatScreen = ({
  recipientEmail,
  onBack,
}: {
  recipientEmail: string;
  onBack: () => void;
}) => {
  const { user } = useAuth();
  const userEmail = user?.email || "";
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipientName, setRecipientName] = useState<string>("");
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!user?.email || !recipientEmail) return;
    fetchMessages();
    fetchRecipientName();
    let client: Client | null = null;
    const setupWebSocket = async () => {
      try {
        const token = await tokenStore.getToken();
        if (!token) return;
        const sockJsUrl = `${WS_URL.replace(
          "ws://",
          "http://"
        )}?token=${token}`;
        const socket = new SockJS(sockJsUrl);
        client = new Client({
          webSocketFactory: () => socket,
          reconnectDelay: 5000,
          debug: (str) => {},
          onConnect: () => {
            client!.subscribe(`/topic/messages/${user.email}`, () => {
              fetchMessages();
            });
          },
        });
        client.activate();
        stompClientRef.current = client;
      } catch {}
    };
    setupWebSocket();
    return () => {
      if (client) client.deactivate();
    };
  }, [user?.email, recipientEmail]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const token = await tokenStore.getToken();
      const res = await fetch(
        `http://10.30.22.161:8080/api/chats/${recipientEmail}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRecipientName = async () => {
    try {
      const token = await tokenStore.getToken();
      const res = await fetch(
        `http://10.30.22.161:8080/api/auth/profile-by-email?email=${encodeURIComponent(
          recipientEmail
        )}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setRecipientName(
            `${data.data.firstName} ${data.data.lastName}`.trim()
          );
        } else {
          setRecipientName(recipientEmail);
        }
      } else {
        setRecipientName(recipientEmail);
      }
    } catch {
      setRecipientName(recipientEmail);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !recipientEmail || !user?.email) return;
    setLoading(true);
    try {
      const client = stompClientRef.current;
      if (client && client.connected) {
        const messagePayload = {
          senderEmail: user.email,
          recipientEmail,
          content: input,
        };
        client.publish({
          destination: "/app/chat.send",
          body: JSON.stringify(messagePayload),
        });
        setInput("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaViewRN style={styles.headerSafeArea} edges={["top"]}>
      <ChatHeader title={recipientName || recipientEmail} onBack={onBack} />
      <ChatList messages={messages} userEmail={userEmail} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={80}
      >
        <ChatInputBar
          value={input}
          onChangeText={setInput}
          onSend={sendMessage}
          loading={loading}
        />
      </KeyboardAvoidingView>
    </SafeAreaViewRN>
  );
};

const HostMessagesTab = () => {
  const params = useLocalSearchParams();
  const initialThread =
    (params.user as string) || (params.hostEmail as string) || undefined;
  const [threads, setThreads] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedThread, setSelectedThread] = useState<string | null>(
    initialThread || null
  );

  useEffect(() => {
    fetchThreads();
  }, []);

  useEffect(() => {
    if (initialThread) setSelectedThread(initialThread);
  }, [initialThread]);

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const token = await tokenStore.getToken();
      const res = await fetch(`http://10.30.22.161:8080/api/chats/threads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setThreads(data);
      }
    } finally {
      setLoading(false);
    }
  };

  if (selectedThread) {
    return (
      <ChatScreen
        recipientEmail={selectedThread}
        onBack={() => setSelectedThread(null)}
      />
    );
  }

  return (
    <SafeAreaViewRN style={styles.headerSafeArea} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      <ThreadList
        threads={threads}
        selectedThread={selectedThread}
        onSelect={setSelectedThread}
        loading={loading}
      />
    </SafeAreaViewRN>
  );
};

export default HostMessagesTab;

const styles = StyleSheet.create({
  headerSafeArea: {
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  threadsList: {
    flexGrow: 1,
    padding: 16,
  },
  threadItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  threadEmail: {
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
    marginLeft: 12,
  },
  loadingText: {
    color: "#888",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  emptyStateBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  emptyText: {
    color: "#888",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    marginTop: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    marginBottom: 2,
    backgroundColor: "#000",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  messagesList: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 24,
  },
});
