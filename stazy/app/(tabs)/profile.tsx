import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FadeInView from "../../components/cards/FadeInView";

const ProfileOption = ({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <View style={styles.optionLeft}>
      <Ionicons
        name={icon as any}
        size={24}
        color="#666"
        style={styles.optionIcon}
      />
      <View>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#ccc" />
  </TouchableOpacity>
);

export default function profile() {
  return (
    <SafeAreaView style={styles.container}>
      <FadeInView style={styles.FadeInView}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.profileSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>JD</Text>
              </View>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.email}>john.doe@example.com</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <ProfileOption
              icon="person-outline"
              title="Personal Information"
              subtitle="Update your details"
            />
            <ProfileOption
              icon="card-outline"
              title="Payment Methods"
              subtitle="Manage your cards"
            />
            <ProfileOption
              icon="shield-checkmark-outline"
              title="Privacy & Security"
              subtitle="Control your privacy"
            />
            <ProfileOption
              icon="person-add-outline"
              title="Become A Host"
              subtitle="Host your homes and services"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <ProfileOption
              icon="notifications-outline"
              title="Notifications"
              subtitle="Push, email, SMS"
            />
            <ProfileOption
              icon="language-outline"
              title="Language"
              subtitle="English"
            />
            <ProfileOption
              icon="moon-outline"
              title="Dark Mode"
              subtitle="System default"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <ProfileOption
              icon="help-circle-outline"
              title="Help Center"
              subtitle="Get support"
            />
            <ProfileOption
              icon="chatbubble-outline"
              title="Contact Us"
              subtitle="Send feedback"
            />
            <ProfileOption
              icon="document-text-outline"
              title="Terms & Privacy"
              subtitle="Legal information"
            />
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.signOutButton}>
              <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>
        </ScrollView>
      </FadeInView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  FadeInView: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingTop: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  editButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 20,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: "#333",
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  optionIcon: {
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  signOutText: {
    fontSize: 16,
    color: "#FF3B30",
    fontWeight: "600",
    marginLeft: 8,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  version: {
    fontSize: 14,
    color: "#999",
  },
});
