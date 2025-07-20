import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ThreadListItemProps {
  email: string;
  onPress: () => void;
  selected?: boolean;
}

const ThreadListItem: React.FC<ThreadListItemProps> = ({
  email,
  onPress,
  selected,
}) => (
  <TouchableOpacity
    style={[styles.threadItem, selected && styles.selectedThreadItem]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{email[0]?.toUpperCase()}</Text>
    </View>
    <Text style={styles.threadEmail}>{email}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
  selectedThreadItem: {
    backgroundColor: "#e0e7ff",
    borderColor: "#007AFF",
    borderWidth: 1,
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
  threadEmail: {
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
    marginLeft: 12,
  },
});

export default ThreadListItem;
