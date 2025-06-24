import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import FadeInView from "../../components/cards/FadeInView";
import { ColorProperties } from "react-native-reanimated/lib/typescript/Colors";
import { router } from "expo-router";
import { useAuth } from "../../hooks/useAuth"; // Adjust path as needed
import FloatingButton from "@/components/ProfileMenu/FloatingButton";

type FeatureCardProps = {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  isNew?: boolean;
  onPress: () => void;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  subtitle,
  icon,
  isNew = false,
  onPress,
}) => (
  <TouchableOpacity style={styles.featureCard} onPress={onPress}>
    {isNew && (
      <View style={styles.newBadge}>
        <Text style={styles.newBadgeText}>NEW</Text>
      </View>
    )}
    <View style={styles.featureIcon}>{icon}</View>
    <Text style={styles.featureTitle}>{title}</Text>
    {subtitle && <Text style={styles.featureSubtitle}>{subtitle}</Text>}
  </TouchableOpacity>
);

type MenuOptionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  showChevron?: boolean;
};

const MenuOption: React.FC<MenuOptionProps> = ({
  icon,
  title,
  onPress,
  showChevron = true,
}) => (
  <TouchableOpacity style={styles.menuOption} onPress={onPress}>
    <View style={styles.menuLeft}>
      <View style={styles.menuIconContainer}>
        <Ionicons name={icon} size={24} color="#484848" />
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </View>
    {showChevron && (
      <Ionicons name="chevron-forward" size={20} color="#ADADAD" />
    )}
  </TouchableOpacity>
);

export default function Profile() {
  const { user, isAuthenticated } = useAuth();

  // Handler for switching to hosting
  const handleSwitchToHosting = () => {
    router.replace("/(host)/today");
  };

  // Get user's first name and first letter for avatar
  const firstName = user?.firstName || "Guest";
  const avatarLetter = firstName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <FadeInView style={styles.fadeInView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#484848" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{avatarLetter}</Text>
            </View>
            <Text style={styles.name}>{firstName}</Text>
            <Text style={styles.status}>
              {isAuthenticated ? "Member" : "Guest"}
            </Text>
          </View>

          {/* Feature Cards Row */}
          <View style={styles.featureRow}>
            <FeatureCard
              onPress={() => router.push("/(tabs)/trips?tab=past")}
              title="Past trips"
              isNew={true}
              icon={
                <View style={styles.suitcaseIcon}>
                  <Text style={styles.suitcaseEmoji}>🧳</Text>
                </View>
              }
              subtitle={undefined}
            />

            <FeatureCard
              title="Connections"
              isNew={true}
              icon={
                <View style={styles.connectionsIcon}>
                  <Text style={styles.connectionsEmoji}>👥</Text>
                </View>
              }
              onPress={() => {}}
              subtitle={undefined}
            />
          </View>

          {/* Become a host section */}
          <TouchableOpacity
            style={styles.hostCard}
            onPress={() => router.replace("/(host)/today")}
          >
            <View style={styles.hostIcon}>
              <Text style={styles.hostEmoji}>🏠</Text>
            </View>
            <View style={styles.hostText}>
              <Text style={styles.hostTitle}>Become a host</Text>
              <Text style={styles.hostSubtitle}>
                It's easy to start hosting and earn extra income.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Menu Options */}
          <View style={styles.menuSection}>
            <MenuOption
              icon="settings-outline"
              title="Account settings"
              onPress={() => {}}
            />
            <MenuOption
              icon="help-circle-outline"
              title="Get help"
              onPress={() => router.push("../screens/GetHelpScreen")}
            />
            <MenuOption
              icon="person-outline"
              title="View profile"
              onPress={() => router.push("/screens/PersonalInfoScreen")}
            />
            <MenuOption
              icon="hand-left-outline"
              title="Privacy"
              onPress={() => {}}
            />
            <MenuOption
              icon="log-out-outline"
              title="Log out"
              onPress={() => {}}
              showChevron={false}
            />
          </View>
          <View style={{ height: 80 }} />
        </ScrollView>
        {/* Switch to hosting button */}
        <FloatingButton
          onPress={handleSwitchToHosting}
          text="Switch to Hosting"
          icon="swap-horizontal"
        />
      </FadeInView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  fadeInView: {
    flex: 1,
    marginBottom: -34,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "white",
    marginHorizontal: 24,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "600",
    color: "#222222",
  },
  notificationButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F7F7F7",
  },
  profileCard: {
    backgroundColor: "white",
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 16,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "white",
    fontSize: 32,
    fontWeight: "600",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    color: "#717171",
  },
  featureRow: {
    flexDirection: "row",
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 12,
  },
  featureCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
  },
  newBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#4A90E2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  newBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  featureIcon: {
    marginBottom: 12,
  },
  suitcaseIcon: {
    alignItems: "center",
  },
  suitcaseEmoji: {
    fontSize: 40,
  },
  connectionsIcon: {
    alignItems: "center",
  },
  connectionsEmoji: {
    fontSize: 40,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222222",
    textAlign: "center",
  },
  featureSubtitle: {
    fontSize: 14,
    color: "#717171",
    textAlign: "center",
    marginTop: 4,
  },
  hostCard: {
    backgroundColor: "white",
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  hostIcon: {
    marginRight: 16,
  },
  hostEmoji: {
    fontSize: 32,
  },
  hostText: {
    flex: 1,
  },
  hostTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 4,
  },
  hostSubtitle: {
    fontSize: 14,
    color: "#717171",
    lineHeight: 20,
  },
  menuSection: {
    backgroundColor: "white",
    marginHorizontal: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconContainer: {
    marginRight: 16,
  },
  menuTitle: {
    fontSize: 16,
    color: "#222222",
  },
  hostingButton: {
    backgroundColor: "#222222",
    marginHorizontal: 80,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  hostingButtonIcon: {
    marginRight: 8,
  },
  hostingButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomSpacing: {
    height: 10,
  },
});
