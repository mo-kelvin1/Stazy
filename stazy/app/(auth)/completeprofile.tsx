import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";

const COUNTRY_CODES = [
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+233", country: "GH", flag: "🇬🇭" },
  { code: "+234", country: "NG", flag: "🇳🇬" },
  { code: "+27", country: "ZA", flag: "🇿🇦" },
  { code: "+254", country: "KE", flag: "🇰🇪" },
  { code: "+256", country: "UG", flag: "🇺🇬" },
  { code: "+255", country: "TZ", flag: "🇹🇿" },
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+55", country: "BR", flag: "🇧🇷" },
  { code: "+52", country: "MX", flag: "🇲🇽" },
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+39", country: "IT", flag: "🇮🇹" },
  { code: "+34", country: "ES", flag: "🇪🇸" },
];

const completeprofile = () => {
  const router = useRouter();
  const { completeProfile } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    COUNTRY_CODES[2]
  ); // Default to Ghana
  const [isLoading, setIsLoading] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);

  const isValidPhoneNumber = (phone: string): boolean => {
    // Basic phone number validation (adjust regex as needed)
    const phoneRegex = /^[0-9]{7,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const handleContinue = async () => {
    if (!firstName.trim()) {
      Alert.alert("Error", "Please enter your first name");
      return;
    }
    if (!lastName.trim()) {
      Alert.alert("Error", "Please enter your last name");
      return;
    }
    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    try {
      const fullPhoneNumber = `${selectedCountryCode.code}${phoneNumber.replace(
        /\s/g,
        ""
      )}`;
      const result = await completeProfile(
        firstName.trim(),
        lastName.trim(),
        fullPhoneNumber
      );

      if (result.success) {
        Alert.alert("Success", "Profile completed successfully!", [
          {
            text: "Continue",
            onPress: () => {
              // Navigation will be handled by the root layout based on auth state
              // The layout will automatically redirect to /(tabs) when isAuthenticated becomes true
            },
          },
        ]);
      } else {
        Alert.alert(
          "Profile Update Failed",
          result.message || "An error occurred while updating your profile"
        );
      }
    } catch (error) {
      console.error("Profile completion error:", error);
      Alert.alert(
        "Profile Update Failed",
        "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountrySelect = (country: (typeof COUNTRY_CODES)[0]) => {
    setSelectedCountryCode(country);
    setShowCountryModal(false);
  };

  const renderCountryItem = ({ item }: { item: (typeof COUNTRY_CODES)[0] }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => handleCountrySelect(item)}
    >
      <Text style={styles.countryFlag}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.country}</Text>
      <Text style={styles.countryCode}>{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Please provide your details to complete your account setup
          </Text>
        </View>

        <View style={styles.content}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
            editable={!isLoading}
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
            editable={!isLoading}
          />

          <Text style={styles.phoneLabel}>Phone Number</Text>
          <View style={styles.phoneContainer}>
            <TouchableOpacity
              style={styles.countrySelector}
              onPress={() => setShowCountryModal(true)}
              disabled={isLoading}
            >
              <Text style={styles.countryFlag}>{selectedCountryCode.flag}</Text>
              <Text style={styles.countryCodeText}>
                {selectedCountryCode.code}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>

            <TextInput
              style={styles.phoneInput}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              editable={!isLoading}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            (!firstName || !lastName || !phoneNumber || isLoading) &&
              styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!firstName || !lastName || !phoneNumber || isLoading}
        >
          <Text style={styles.continueButtonText}>
            {isLoading ? "Completing Profile..." : "Complete Profile"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Country Code Modal */}
      <Modal
        visible={showCountryModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <TouchableOpacity
              onPress={() => setShowCountryModal(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={COUNTRY_CODES}
            renderItem={renderCountryItem}
            keyExtractor={(item) => item.code}
            style={styles.countryList}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default completeprofile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
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
  phoneLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  phoneContainer: {
    flexDirection: "row",
    marginBottom: 26,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginRight: 12,
    backgroundColor: "#f9f9f9",
    minWidth: 100,
  },
  countryFlag: {
    fontSize: 18,
    marginRight: 6,
  },
  countryCodeText: {
    fontSize: 16,
    color: "#333",
    marginRight: 4,
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  continueButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 40,
  },
  continueButtonDisabled: {
    backgroundColor: "#ccc",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  modalCloseButton: {
    padding: 4,
  },
  countryList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  countryName: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  countryCode: {
    fontSize: 16,
    color: "#666",
    marginLeft: 8,
  },
});
