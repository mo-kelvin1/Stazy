import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface ChatHeaderProps {
  title: string;
  onBack?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title, onBack }) => (
  <View style={styles.headerRow}>
    {onBack ? (
      <TouchableOpacity
        onPress={onBack}
        style={styles.backButtonCircle}
        activeOpacity={0.8}
      >
        <Text style={styles.backButtonArrow}>{"<"}</Text>
      </TouchableOpacity>
    ) : (
      <View style={{ width: 36 }} />
    )}
    <Text style={styles.title}>{title}</Text>
    <View style={{ width: 36 }} />
  </View>
);

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 18,
    paddingHorizontal: 24,
    paddingBottom: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    flex: 1,
    textAlign: "center",
  },
  backButtonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  backButtonArrow: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 2,
  },
});

export default ChatHeader;
