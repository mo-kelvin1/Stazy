import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function SignUp() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [email, setEmail] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [optOutMarketing, setOptOutMarketing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateAge = (birthDate: string | number | Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === "ios");
    setDateOfBirth(currentDate);
  };

  const handleAgreeAndContinue = () => {
    // Validation
    if (!firstName.trim()) {
      Alert.alert("Error", "Please enter your first name");
      return;
    }

    if (!lastName.trim()) {
      Alert.alert("Error", "Please enter your last name");
      return;
    }

    if (calculateAge(dateOfBirth) < 18) {
      Alert.alert("Error", "You must be at least 18 years old to sign up");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!agreeToTerms) {
      Alert.alert("Error", "Please agree to the terms and conditions");
      return;
    }

    // Navigate to password page with user data
    router.push({
      pathname: "/(auth)/create-password",
      params: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dateOfBirth: dateOfBirth.toISOString(),
        email: email.trim().toLowerCase(),
        optOutMarketing: optOutMarketing.toString(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Finish signing up</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal name</Text>
          <TextInput
            style={styles.input}
            placeholder="First name on ID"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            maxLength={50}
          />
          <TextInput
            style={styles.input}
            placeholder="Last name on ID"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            maxLength={50}
          />
          <Text style={styles.helperText}>
            Make sure this matches the name on your government ID. If you go by
            another name, you can add a{" "}
            <Text style={styles.linkText}>preferred first name</Text>.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date of birth</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateInputText}>{formatDate(dateOfBirth)}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateOfBirth}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}

          <Text style={styles.helperText}>
            To sign up, you need to be at least 18. Your birthday won't be
            shared with other people who use Airbnb.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email</Text>
          <TextInput
            style={[
              styles.input,
              !validateEmail(email) && email.length > 0 && styles.inputError,
            ]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={255}
          />
          {!validateEmail(email) && email.length > 0 && (
            <Text style={styles.errorText}>
              Please enter a valid email address
            </Text>
          )}
          <Text style={styles.helperText}>
            We'll email you trip confirmations and receipts.
          </Text>
        </View>

        <View style={styles.termsSection}>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
          >
            <View
              style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
            >
              {agreeToTerms && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
            <Text style={styles.termsText}>
              By selecting Agree and continue, I agree to Airbnb's{" "}
              <Text style={styles.linkText}>Terms of Service</Text>,{" "}
              <Text style={styles.linkText}>Payments Terms of Service</Text> and{" "}
              <Text style={styles.linkText}>Nondiscrimination Policy</Text> and
              acknowledge the{" "}
              <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.agreeButton,
            (!firstName.trim() ||
              !lastName.trim() ||
              !validateEmail(email) ||
              !agreeToTerms ||
              calculateAge(dateOfBirth) < 18 ||
              isLoading) &&
              styles.agreeButtonDisabled,
          ]}
          onPress={handleAgreeAndContinue}
          disabled={isLoading}
        >
          <Text style={styles.agreeButtonText}>
            {isLoading ? "Processing..." : "Agree and continue"}
          </Text>
        </TouchableOpacity>

        <View style={styles.marketingSection}>
          <Text style={styles.marketingText}>
            Airbnb will send you members-only deals, inspiration, marketing
            emails, and push notifications. You can opt out of receiving these
            at any time in your account settings or directly from the marketing
            notification.
          </Text>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setOptOutMarketing(!optOutMarketing)}
          >
            <View
              style={[
                styles.checkbox,
                optOutMarketing && styles.checkboxChecked,
              ]}
            >
              {optOutMarketing && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
            <Text style={styles.checkboxText}>
              I don't want to receive marketing messages from Airbnb.
            </Text>
          </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#ff4757",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  dateInputText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  helperText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 14,
    color: "#ff4757",
    marginTop: -4,
    marginBottom: 8,
  },
  linkText: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  termsSection: {
    marginTop: 32,
    marginBottom: 24,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  agreeButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  agreeButtonDisabled: {
    backgroundColor: "#ccc",
  },
  agreeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  marketingSection: {
    marginBottom: 40,
  },
  marketingText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: "#000",
    lineHeight: 20,
  },
});
