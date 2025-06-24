import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HostProfileCard = ({ host }) => {
  if (!host) return null;

  const { name, email, id, serviceIds } = host;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={48} color="#4F8EF7" />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.label}>Host ID:</Text>
        <Text style={styles.value}>{id}</Text>

        <Text style={styles.label}>Services:</Text>
        {serviceIds.length > 0 ? (
          serviceIds.map((svcId) => (
            <Text key={svcId} style={styles.serviceItem}>
              • {svcId}
            </Text>
          ))
        ) : (
          <Text style={styles.noServices}>No services listed.</Text>
        )}
      </View>
    </View>
  );
};

export default HostProfileCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    margin: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  info: {
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  body: {
    marginTop: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
  },
  value: {
    fontSize: 14,
    color: "#444",
  },
  serviceItem: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
  noServices: {
    fontSize: 14,
    color: "#999",
    marginLeft: 8,
  },
});
