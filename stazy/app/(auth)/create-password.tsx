import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";

export default function CreatePassword() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { authenticate } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: string[];
  }>({
    score: 0,
    feedback: [],
  });

  const { firstName, lastName, dateOfBirth, email, optOutMarketing } = params;

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  const checkPasswordStrength = (pwd: string | any[]) => {
    const feedback = [];
    let score = 0;
    const pwdStr = String(pwd);

    if (pwdStr.length >= 8) {
      score += 1;
    } else {
      feedback.push("At least 8 characters");
    }

    if (/[A-Z]/.test(pwdStr)) {
      score += 1;
    } else {
      feedback.push("One uppercase letter");
    }

    if (/[a-z]/.test(pwdStr)) {
      score += 1;
    } else {
      feedback.push("One lowercase letter");
    }

    if (/\d/.test(pwdStr)) {
      score += 1;
    } else {
      feedback.push("One number");
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwdStr)) {
      score += 1;
    } else {
      feedback.push("One special character");
    }

    setPasswordStrength({ score, feedback });
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return "Very Weak";
      case 2:
        return "Weak";
      case 3:
        return "Fair";
      case 4:
        return "Good";
      case 5:
        return "Strong";
      default:
        return "";
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return "#ff4757";
      case 2:
        return "#ffa502";
      case 3:
        return "#ffb142";
      case 4:
        return "#2ed573";
      case 5:
        return "#1dd1a1";
      default:
        return "#ccc";
    }
  };

  const handleBack = () => {
    router.back();
  };

  const validateForm = () => {
    if (!password) {
      Alert.alert("Error", "Please enter a password");
      return false;
    }

    if (passwordStrength.score < 3) {
      Alert.alert("Error", "Please choose a stronger password");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords don't match");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        dateOfBirth: dateOfBirth.toString().split("T")[0],
        optOutMarketing: optOutMarketing === "true",
      };

      // Make API call to Spring Boot backend
      const response = await fetch(
        "http://10.132.154.202:8080/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const result = await response.json();

      Alert.alert(
        "Success",
        "Account created successfully! A verification email has been sent.",
        [
          {
            text: "OK",
            onPress: () => {
              authenticate();
              // Navigate to homepage
              router.replace("/(tabs)");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert(
        "Registration Failed",
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create password</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.emailDisplay}>
            Creating account for: <Text style={styles.emailText}>{email}</Text>
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Create a password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {password.length > 0 && (
            <View style={styles.passwordStrengthContainer}>
              <View style={styles.strengthHeader}>
                <Text style={styles.strengthText}>
                  Password strength:{" "}
                  <Text
                    style={[
                      styles.strengthScore,
                      { color: getPasswordStrengthColor() },
                    ]}
                  >
                    {getPasswordStrengthText()}
                  </Text>
                </Text>
              </View>

              <View style={styles.strengthBar}>
                {[1, 2, 3, 4, 5].map((level) => (
                  <View
                    key={level}
                    style={[
                      styles.strengthBarSegment,
                      {
                        backgroundColor:
                          passwordStrength.score >= level
                            ? getPasswordStrengthColor()
                            : "#e0e0e0",
                      },
                    ]}
                  />
                ))}
              </View>

              {passwordStrength.feedback.length > 0 && (
                <View style={styles.feedback}>
                  <Text style={styles.feedbackTitle}>
                    Password must include:
                  </Text>
                  {passwordStrength.feedback.map((item, index) => (
                    <Text key={index} style={styles.feedbackItem}>
                      • {item}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Confirm password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.passwordInput,
                confirmPassword.length > 0 &&
                  password !== confirmPassword &&
                  styles.inputError,
              ]}
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          {confirmPassword.length > 0 && password !== confirmPassword && (
            <Text style={styles.errorText}>Passwords don't match</Text>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.signUpButton,
            (!password ||
              !confirmPassword ||
              password !== confirmPassword ||
              passwordStrength.score < 3 ||
              isLoading) &&
              styles.signUpButtonDisabled,
          ]}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={styles.signUpButtonText}>Creating account...</Text>
            </View>
          ) : (
            <Text style={styles.signUpButtonText}>Create account</Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginSection}>
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    marginRight: 16,
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  emailDisplay: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  emailText: {
    fontWeight: "600",
    color: "#000",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ff4757",
  },
  eyeButton: {
    padding: 12,
  },
  passwordStrengthContainer: {
    marginTop: 12,
  },
  strengthHeader: {
    marginBottom: 8,
  },
  strengthText: {
    fontSize: 14,
    color: "#666",
  },
  strengthScore: {
    fontWeight: "600",
  },
  strengthBar: {
    flexDirection: "row",
    marginBottom: 8,
  },
  strengthBarSegment: {
    flex: 1,
    height: 4,
    marginRight: 4,
    borderRadius: 2,
  },
  feedback: {
    marginTop: 8,
  },
  feedbackTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
  },
  feedbackItem: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#ff4757",
    marginTop: 8,
  },
  signUpButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
  },
  signUpButtonDisabled: {
    backgroundColor: "#ccc",
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  loginText: {
    fontSize: 16,
    color: "#666",
  },
  loginLink: {
    color: "#007AFF",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
