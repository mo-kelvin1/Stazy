import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const OtpScreen = () => {
  const { phoneNumber } = useLocalSearchParams<{ phoneNumber: string }>();
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleVerify = () => {
    if (otp.length < 6) {
      Alert.alert("Invalid OTP", "Please enter the 6-digit code.");
      return;
    }
    // TODO: Verify OTP logic here, then navigate forward
    Alert.alert("Success", "OTP Verified!");
    // Navigate back to main tabs or home screen
    router.replace("/(tabs)");
  };

  const handleResend = () => {
    // TODO: trigger resend OTP logic
    Alert.alert("Resent", `OTP has been resent to ${phoneNumber}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Verify your phone</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code sent to</Text>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>

        <TextInput
          style={styles.otpInput}
          keyboardType="number-pad"
          maxLength={6}
          value={otp}
          onChangeText={setOtp}
          placeholder="______"
          placeholderTextColor="#ccc"
          textAlign="center"
        />

        <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
          <Text style={styles.verifyBtnText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResend} style={styles.resendBtn}>
          <Text style={styles.resendBtnText}>Resend code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 8,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  backButtonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
  },
  phoneNumber: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginVertical: 16,
    color: "#000",
  },
  otpInput: {
    fontSize: 24,
    letterSpacing: 12,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 24,
    backgroundColor: "#fff",
  },
  verifyBtn: {
    backgroundColor: "#e91e63",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  verifyBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  resendBtn: {
    marginTop: 16,
    alignItems: "center",
  },
  resendBtnText: {
    color: "#e91e63",
    fontSize: 16,
  },
});

export default OtpScreen;
