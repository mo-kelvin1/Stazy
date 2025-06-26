import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import { defaultStyles } from "@/constants/styles";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    router.back();
  };

  // Make sure this is imported

  const handleContinue = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in both email and password");
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (result.message == "Please complete your profile") {
        Alert.alert(
          "Please complete your profile in the profile Section after Logging in"
        );
      } else if (result.success) {
        // Authenticated: navigation handled by root layout
      } else {
        Alert.alert(
          "Login Failed",
          result.message || "Invalid email or password. Please try again."
        );
      }
    } catch (error: any) {
      console.error("Login error:", error);

      let message = "An unexpected error occurred. Please try again.";

      if (error.response) {
        const backendMessage = error.response.data?.message;

        if (backendMessage === "Account does not exist, Please Sign up") {
          // Redirect to signup screen and skip alert
          router.push("/signup");
          return;
        }

        if (error.response.status === 401) {
          message = backendMessage || "Invalid email or password.";
        } else if (backendMessage) {
          message = backendMessage;
        }
      }

      Alert.alert("Login Failed", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.signInBox}>
        <Text style={styles.signInText}>Log In</Text>
      </View>
      <View style={styles.content}>
        <TextInput
          style={defaultStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />

        <TextInput
          style={defaultStyles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
        />
        <View style={styles.forgotPasswordContainer}>
          <Link href="/(auth)/forgotpassword" style={styles.forgotPasswordLink}>
            Forgot Password?
          </Link>
        </View>
        <TouchableOpacity
          style={[
            styles.continueButton,
            (!email || !password || isLoading) && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!email || !password || isLoading}
        >
          <Text style={styles.continueButtonText}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Don't have an account?</Text>
          <Link href="./signup" style={styles.signupLink}>
            Sign Up
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 24,
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
  providerButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  signupLink: {
    color: "#007AFF",
    marginLeft: 10,
    fontSize: 14,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1,
  },
  forgotPasswordContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  forgotPasswordLink: {
    color: "#007AFF",
    fontSize: 14,
  },
  signInText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#007AFF",
  },
  signInBox: {
    alignItems: "center",
    marginTop: 90,
    marginBottom: -200,
  },
});
