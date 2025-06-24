import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const supportEmail = "stazyapp@gmail.com";
const supportPhones = ["+233257464983", "+233509651902"];

const GetHelpScreen = () => {
  const handleEmailPress = async () => {
    const emailUrl = `mailto:${supportEmail}`;
    const supported = await Linking.canOpenURL(emailUrl);
    if (supported) {
      Linking.openURL(emailUrl);
    } else {
      Alert.alert("Error", "Email app not available.");
    }
  };

  const handlePhonePress = async (phone) => {
    const telUrl = `tel:${phone}`;
    const supported = await Linking.canOpenURL(telUrl);
    if (supported) {
      Linking.openURL(telUrl);
    } else {
      Alert.alert("Error", "Calling not supported on this device.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Ionicons name="help-circle-outline" size={100} color="#007AFF" />
        <Text style={styles.title}>Need Help?</Text>
        <Text style={styles.subtitle}>
          We're here to assist you. Reach out via email or phone.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📧 Contact Email</Text>
          <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
            <Ionicons name="mail-outline" size={22} color="#FF5A5F" />
            <Text style={styles.contactText}>{supportEmail}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>📞 Phone Numbers</Text>
          {supportPhones.map((phone, index) => (
            <TouchableOpacity
              key={index}
              style={styles.contactItem}
              onPress={() => handlePhonePress(phone)}
            >
              <Ionicons name="call-outline" size={22} color="#FF5A5F" />
              <Text style={styles.contactText}>{phone}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 16,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 12,
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#444",
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});

export default GetHelpScreen;
