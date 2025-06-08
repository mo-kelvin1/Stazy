import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../../hooks/useAuth";

export default function FacebookAuth() {
  const router = useRouter();
  const { facebook, isLoading } = useAuth();

  useEffect(() => {
    const authenticateWithFacebook = async () => {
      try {
        await facebook(); // call the shared Facebook login function
        console.log("Facebook Authentication successful");
        router.replace("/(tabs)");
      } catch (error) {
        console.error("Facebook authentication failed:", error);
        router.back();
      }
    };

    authenticateWithFacebook();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#1877F2" />
      <Text style={styles.text}>Signing in with Facebook...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
});
