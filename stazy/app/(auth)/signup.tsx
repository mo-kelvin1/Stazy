import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import { defaultStyles } from "@/constants/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";

const signup = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    return emailRegex.test(email);
  };

  const handleContinue = async () => {
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in the email and passwords sections");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup(email, password, confirmPassword);

      if (result.success) {
        // Optionally store token if you need it now
        // Navigate to OTP screen — email is more stable than userId
        router.push({
          pathname: "/(auth)/otpscreen",
          params: { email }, // or pass nothing if not needed
        });
      } else {
        Alert.alert(
          "Signup Failed",
          result.message || "An error occurred during signup"
        );
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert(
        "Signup Failed",
        "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles.title}>Create Account</Text>
        <TouchableOpacity
          onPress={handleClose}
          style={defaultStyles.closeButton}
        >
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
          editable={!isLoading}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!isLoading}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.continueButton,
          (!email || !password || !confirmPassword || isLoading) &&
            styles.continueButtonDisabled,
        ]}
        onPress={handleContinue}
        disabled={!email || !password || !confirmPassword || isLoading}
      >
        <Text style={styles.continueButtonText}>
          {isLoading ? "Creating Account..." : "Create Account"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  icon: {
    height: 250,
    width: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
  },
  content: {
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 54,
    marginTop: 100,
  },
  continueButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 8,
    height: 48,
    alignItems: "center",
    marginBottom: 24,
    marginHorizontal: 20,
  },
  continueButtonDisabled: {
    backgroundColor: "#ccc",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 26,
    backgroundColor: "#fff",
  },
});
