import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../../hooks/useAuth";

export default function GoogleAuth() {
  const router = useRouter();
  const { google, isLoading } = useAuth();

  useEffect(() => {
    const authenticateWithGoogle = async () => {
      try {
        await google(); // call the shared Google login function
        console.log("Google Authentication successful");
        router.replace("/(tabs)");
      } catch (error) {
        console.error("Google authentication failed:", error);
        router.back();
      }
    };

    authenticateWithGoogle();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4285F4" />
      <Text style={styles.text}>Signing in with Google...</Text>
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
