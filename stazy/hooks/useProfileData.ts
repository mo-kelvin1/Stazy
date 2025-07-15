import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

export function useProfileData() {
  const { user, logout, refreshUserData } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Listen for tab refresh
    const interval = setInterval(() => {
      if (
        globalThis.tabRefreshKeys &&
        globalThis.tabRefreshKeys.profile !== undefined
      ) {
        setRefreshKey(globalThis.tabRefreshKeys.profile);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (refreshUserData) refreshUserData();
  }, [refreshKey]);

  function handleSwitchToHosting() {
    router.replace("/(host)/today");
  }

  async function handleLogout() {
    try {
      await logout();
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  }

  const firstName = user?.firstName || "Guest";
  const avatarLetter = firstName.charAt(0).toUpperCase();

  function handleViewProfile(): void {
    router.push("/screens/ProfileScreen");
  }

  function handleNotifications(): void {
    router.push("/screens/NotificationScreen");
  }

  function handleGetHelp(): void {
    router.push("/screens/GetHelpScreen");
  }

  return {
    user,
    firstName,
    avatarLetter,
    handleSwitchToHosting,
    handleLogout,
    handleViewProfile,
    handleNotifications,
    handleGetHelp,
  };
} 