import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const resetpassword = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const { resetPassword } = useAuth();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    if (!email || !code || !newPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const result = await resetPassword(email as string, code, newPassword);

    if (!result.success && result.message === "Password reset successfully") {
      Alert.alert("Success", result.message || "Password reset successfully");
      router.replace("/(auth)/login");
    } else {
      Alert.alert("Error", result.message || "Could not reset password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <Text style={styles.emailText}>Email: {email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        value={code}
        maxLength={6}
        keyboardType="number-pad"
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        secureTextEntry
        onChangeText={setNewPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default resetpassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  emailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4e8ef7",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
