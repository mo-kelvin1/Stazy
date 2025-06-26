import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const OtpScreen = () => {
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const { verifyOTP } = useAuth();
  const { resendVerification } = useAuth();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit code.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await verifyOTP(otp, userId as string);

      if (result.success) {
        Alert.alert("Success", "OTP verified successfully!");

        // Delay navigation slightly to avoid conflict with Alert
        setTimeout(() => {
          router.push("/(auth)/completeprofile");
        }, 500);
      } else {
        Alert.alert(
          "Verification Failed",
          result.message || "Invalid OTP. Please try again."
        );
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      Alert.alert(
        "Verification Failed",
        "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  const handleResendOTP = async () => {
    const { resendVerification } = useAuth(); // get from context

    const { success, message } = await resendVerification();

    if (success) {
      Alert.alert("Success", message || "Verification code resent.");
    } else {
      Alert.alert("Error", message || "Could not resend verification code.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <Text style={styles.subtitle}>
        We've sent a 6-digit verification code to your email
      </Text>

      <TextInput
        style={styles.otpInput}
        placeholder="6-digit code"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        editable={!isLoading}
      />

      <TouchableOpacity
        style={[
          styles.verifyButton,
          (otp.length !== 6 || isLoading) && styles.buttonDisabled,
        ]}
        onPress={handleVerify}
        disabled={isLoading || otp.length !== 6}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.verifyText}>Verify</Text>
        )}
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn't receive the code?</Text>
        <TouchableOpacity onPress={handleResendOTP} disabled={isLoading}>
          <Text
            style={[styles.resendLink, isLoading && styles.resendLinkDisabled]}
          >
            Resend OTP
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: "#007AFF",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    color: "#666",
    lineHeight: 22,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    fontSize: 20,
    padding: 14,
    textAlign: "center",
    letterSpacing: 12,
    marginBottom: 24,
    backgroundColor: "#f9f9f9",
  },
  verifyButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resendContainer: {
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  resendLink: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  resendLinkDisabled: {
    color: "#aaa",
  },
});
