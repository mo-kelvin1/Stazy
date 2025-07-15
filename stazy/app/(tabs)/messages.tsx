import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

const TabMessages = () => {
  const params = useLocalSearchParams();
  const hostEmail = params.hostEmail as string | undefined;
  const hostName = params.hostName as string | undefined;
  const hostId = params.hostId as string | undefined;

  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        globalThis.tabRefreshKeys &&
        globalThis.tabRefreshKeys.messages !== undefined
      ) {
        setRefreshKey(globalThis.tabRefreshKeys.messages);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {}, [refreshKey]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      {hostEmail ? (
        <View style={styles.centeredContent}>
          <Text style={styles.chatTitle}>
            Chat with {hostName || hostEmail}
          </Text>
          <Text style={styles.chatEmail}>Email: {hostEmail}</Text>
          <View style={styles.chatPlaceholder}>
            <Text style={styles.chatPlaceholderText}>[Chat UI goes here]</Text>
          </View>
        </View>
      ) : (
        <View style={styles.centeredContent}>
          <Text style={styles.noChatText}>
            No chat selected. Please select a user or host to chat with.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TabMessages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: "#fff",
    minHeight: 80,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    letterSpacing: 0.5,
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  chatEmail: {
    color: "#888",
    marginBottom: 16,
  },
  chatPlaceholder: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 24,
    width: 320,
    alignItems: "center",
  },
  chatPlaceholderText: {
    color: "#aaa",
  },
  noChatText: {
    color: "#888",
    fontSize: 18,
    padding: 10,
    textAlign: "center",
  },
});
