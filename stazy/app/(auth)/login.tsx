import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";

// API configuration - replace with your actual backend URL
const API_BASE_URL = "http://10.132.154.202:8080/api"; // Update this with your Spring Boot server URL

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    router.back();
  };

  // Backend authentication function
  const authenticateUser = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          password: password,
        }),
      });

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Authentication failed: ${response.status}`
        );
      }

      const data = await response.json();

      // Validate response structure
      if (!data.success && !data.token && !data.user) {
        throw new Error("Invalid response format from server");
      }

      return {
        success: true,
        user: data.user,
        token: data.token,
        message: data.message,
      };
    } catch (error) {
      console.error("Authentication error:", error);

      // Handle different types of errors
      if (
        typeof error === "object" &&
        error !== null &&
        "name" in error &&
        "message" in error &&
        typeof (error as any).name === "string" &&
        typeof (error as any).message === "string" &&
        (error as any).name === "TypeError" &&
        (error as any).message.includes("fetch")
      ) {
        throw new Error(
          "Unable to connect to server. Please check your internet connection."
        );
      }

      throw new Error(
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as any).message === "string"
          ? (error as any).message
          : "Authentication failed. Please try again."
      );
    }
  };

  const handleContinue = async () => {
    // Input validation
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both email and password");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Authenticate with backend
      const authResult = await authenticateUser(email, password);

      if (authResult.success) {
        // Store authentication data and update auth context
        await login(authResult.user, authResult.token);

        // Show success message (optional)
        Alert.alert("Success", "Login successful!", [
          {
            text: "OK",
            onPress: () => {
              // Navigation will be handled by the root layout based on auth state
            },
          },
        ]);
      } else {
        Alert.alert("Login Failed", "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);

      // Show appropriate error message
      Alert.alert(
        "Login Failed",
        typeof error === "object" &&
          error !== null &&
          "message" in error &&
          typeof (error as any).message === "string"
          ? (error as any).message
          : "Please check your credentials and try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign In pressed");
    router.push("/providers/google");
  };

  const handleAppleSignIn = () => {
    console.log("Apple Sign In pressed");
    router.push("/providers/apple");
  };

  const handleFacebookSignIn = () => {
    console.log("Facebook Sign In pressed");
    router.push("/providers/facebook");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Log in or sign up</Text>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TouchableOpacity
          style={[
            styles.continueButton,
            (!email || !password || isLoading) && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!email || !password || isLoading}
        >
          <Text style={styles.continueButtonText}>
            {isLoading ? "Signing in..." : "Continue"}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={[
            styles.providerButton,
            isLoading && styles.providerButtonDisabled,
          ]}
          onPress={handleAppleSignIn}
          disabled={isLoading}
        >
          <Ionicons name="logo-apple" size={20} color="#000" />
          <Text style={styles.providerButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.providerButton,
            isLoading && styles.providerButtonDisabled,
          ]}
          onPress={handleGoogleSignIn}
          disabled={isLoading}
        >
          <Ionicons name="logo-google" size={20} color="#000" />
          <Text style={styles.providerButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.providerButton,
            isLoading && styles.providerButtonDisabled,
          ]}
          onPress={handleFacebookSignIn}
          disabled={isLoading}
        >
          <Ionicons name="logo-facebook" size={20} color="#000" />
          <Text style={styles.providerButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    position: "relative",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  closeButton: {
    position: "absolute",
    right: 20,
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  continueButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  continueButtonDisabled: {
    backgroundColor: "#ccc",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#666",
    fontSize: 14,
  },
  providerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  providerButtonDisabled: {
    opacity: 0.6,
  },
  providerButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
});
