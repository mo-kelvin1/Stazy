import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function ChatWithGuest() {
  const {
    guestId,
    fullName,
    email,
    status,
    placeName,
    bookingTime,
    bookingDate,
    bookingDuration,
  } = useLocalSearchParams();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList<Message>>(null);

  const storageKey = `chat_${guestId}`;

  useEffect(() => {
    loadChat();
  }, []);

  interface Message {
    id: string;
    text: string;
    from: "host" | "guest";
    timestamp: string;
  }

  interface Contact {
    guestId: string;
    fullName?: string;
    email?: string;
    lastMessage: string;
    timestamp: string;
  }

  const loadChat = async () => {
    const data = await AsyncStorage.getItem(storageKey);
    if (data) setMessages(JSON.parse(data));
  };

  const saveMessage = async (newMessage: Message): Promise<void> => {
    const updatedMessages: Message[] = [...messages, newMessage];
    setMessages(updatedMessages);
    await AsyncStorage.setItem(storageKey, JSON.stringify(updatedMessages));
    await updateRecentContacts(newMessage);
  };

  const updateRecentContacts = async (newMessage: Message) => {
    const stored = await AsyncStorage.getItem("messageContacts");
    let contacts = stored ? JSON.parse(stored) : [];
    const timestamp = moment().format("YYYY-MM-DD HH:mm");

    const index: number = contacts.findIndex(
      (c: Contact) => c.guestId === guestId
    );
    const newContact = {
      guestId,
      fullName,
      email,
      lastMessage: newMessage.text,
      timestamp,
    };

    if (index >= 0) contacts[index] = newContact;
    else contacts.unshift(newContact);

    await AsyncStorage.setItem("messageContacts", JSON.stringify(contacts));
  };
  const handleAttachClicked = async () => {
    // Request permission (especially for Android)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "You need to allow access to photos to use this feature."
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const image = result.assets[0];
        console.log("Selected Image:", image);
        // Now you can use image.uri (upload/send/display)
      }
    } catch (error) {
      console.error("Image Picker Error:", error);
    }
  };
  const handleSend = () => {
    if (!input.trim()) return;
    const message: Message = {
      id: Date.now().toString(),
      text: input,
      from: "host",
      timestamp: moment().format("HH:mm"),
    };
    saveMessage(message);
    setInput("");
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const handleDeleteMessage = async (id: string) => {
    const updatedMessages = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMessages);
    await AsyncStorage.setItem(storageKey, JSON.stringify(updatedMessages));
  };

  const alertDelete = (id: string) => {
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteMessage(id),
        },
      ]
    );
  };

  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    const isHost = item.from === "host";

    return (
      <>
        {index === 0 && messages.length > 0 && (
          <Text style={styles.noticeText}>
            Long press your messages to delete them
          </Text>
        )}
        <TouchableOpacity
          onLongPress={() => {
            if (isHost) alertDelete(item.id);
          }}
          activeOpacity={0.9}
        >
          <View
            style={[
              styles.messageBubble,
              isHost ? styles.hostBubble : styles.guestBubble,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{fullName}</Text>

        {(status ||
          bookingTime ||
          placeName ||
          bookingDate ||
          bookingDuration) && (
          <View style={styles.metaInfo}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {status && <Text style={styles.metaText}>Status: {status}</Text>}
              {bookingTime && (
                <Text style={styles.metaText}>Time: {bookingTime}</Text>
              )}
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {bookingDate && (
                <Text style={styles.metaText}>Date: {bookingDate}</Text>
              )}
              {bookingDuration && (
                <Text style={styles.metaText}>Duration: {bookingDuration}</Text>
              )}
            </View>
            {placeName && (
              <Text style={styles.metaText}>Location: {placeName}</Text>
            )}
          </View>
        )}
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={{ marginRight: 0 }}
            onPress={handleAttachClicked}
          >
            <Ionicons name="attach" size={34} color="#007AFF" />
          </TouchableOpacity>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#aaa"
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },
  header: {
    marginHorizontal: 25,
    borderRadius: 35,
    paddingVertical: 11,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1C1C1E",
    textAlign: "center",
  },
  metaText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
    marginTop: 6,
  },
  noticeText: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 6,
  },
  chatContainer: {
    padding: 12,
    paddingBottom: 90,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  hostBubble: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  guestBubble: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#1C1C1E",
  },
  timestamp: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
  },
  input: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 16,
    color: "#1C1C1E",
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendText: {
    color: "#fff",
    fontWeight: "600",
  },
  metaInfo: {
    marginTop: 6,
    alignItems: "center",
    gap: 2,
  },
});
