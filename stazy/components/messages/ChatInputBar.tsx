import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

interface ChatInputBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const ChatInputBar: React.FC<ChatInputBarProps> = ({
  value,
  onChangeText,
  onSend,
  loading,
  disabled,
}) => (
  <View style={styles.inputRowBlurBlue}>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="Type a message..."
      editable={!loading}
      placeholderTextColor="#7ca3e6"
    />
    <TouchableOpacity
      style={[
        styles.sendButton,
        (!value.trim() || loading || disabled) && styles.sendButtonDisabled,
      ]}
      onPress={onSend}
      disabled={loading || !value.trim() || disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.sendButtonText}>➤</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  inputRowBlurBlue: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#dbeafe",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 22,
    paddingHorizontal: 18,
    marginRight: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  sendButtonDisabled: {
    backgroundColor: "#B0C4DE",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default ChatInputBar;
