import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import ThreadListItem from "./ThreadListItem";

interface ThreadListProps {
  threads: string[];
  selectedThread?: string | null;
  onSelect: (email: string) => void;
  loading?: boolean;
}

const ThreadList: React.FC<ThreadListProps> = ({
  threads,
  selectedThread,
  onSelect,
  loading,
}) => (
  <View style={styles.threadsList}>
    <FlatList
      data={threads}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <ThreadListItem
          email={item}
          onPress={() => onSelect(item)}
          selected={selectedThread === item}
        />
      )}
      ListEmptyComponent={
        loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <View style={styles.emptyStateBox}>
            <Text style={styles.emptyText}>No conversations yet.</Text>
          </View>
        )
      }
    />
  </View>
);

const styles = StyleSheet.create({
  threadsList: {
    flexGrow: 1,
    padding: 16,
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
});

export default ThreadList;
