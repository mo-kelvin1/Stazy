import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../../hooks/useAuth"; // adjust the path if needed

export default function AppleAuth() {
  const router = useRouter();
  const { apple, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    const authenticateWithApple = async () => {
      try {
        await apple(); // Call the Apple auth function
        console.log("User signed in with Apple");
      } catch (error) {
        console.error("Apple authentication failed:", error);
        router.back();
      }
    };

    authenticateWithApple();
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/(tabs)"); // Go to home screen
    }
  }, [isAuthenticated, isLoading]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF385C" />
      <Text style={styles.text}>Signing in with Apple...</Text>
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
