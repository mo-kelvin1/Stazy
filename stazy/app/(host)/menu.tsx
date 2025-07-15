import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { router } from "expo-router";
import {
  Ionicons,
  MaterialIcons,
  Feather,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import MenuTopBar from "../../components/host/menu/MenuTopBar";
import MenuList from "../../components/host/menu/MenuList";
import MenuSwitchButton from "../../components/host/menu/MenuSwitchButton";

const MenuScreen = () => {
  const { user, logout } = useAuth();
  const firstInitial = user?.firstName
    ? user.firstName.charAt(0).toUpperCase()
    : "U";

  const handleLogout = async () => {
    await logout();
    router.replace("/(auth)/login");
  };

  const menuItems = [
    {
      label: "Account settings",
      icon: <Ionicons name="settings-outline" size={24} color="#222" />,
      onPress: () => {},
    },
    {
      label: "Hosting resources",
      icon: <Ionicons name="book-outline" size={24} color="#222" />,
      onPress: () => {},
    },
    {
      label: "Get help",
      icon: <Feather name="help-circle" size={24} color="#222" />,
      onPress: () => router.push("/screens/GetHelpScreen"),
    },
    {
      label: "Find a co-host",
      icon: (
        <MaterialCommunityIcons
          name="account-search-outline"
          size={24}
          color="#222"
        />
      ),
      onPress: () => {},
    },
    {
      label: "Create a new listing",
      icon: <Ionicons name="add-circle-outline" size={24} color="#222" />,
      onPress: () => router.push("/(host)/listings"),
    },
    {
      label: "Refer a host",
      icon: <FontAwesome5 name="user-friends" size={22} color="#222" />,
      onPress: () => {},
    },
    {
      label: "Legal",
      icon: <Ionicons name="document-text-outline" size={24} color="#222" />,
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <MenuTopBar
        firstInitial={firstInitial}
        onNotificationsPress={() => router.push("/screens/NotificationScreen")}
        onProfilePress={() => router.push("/screens/ProfileScreen")}
      />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <MenuList menuItems={menuItems} onLogout={handleLogout} />
      </ScrollView>
      <MenuSwitchButton onPress={() => router.replace("/(tabs)")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
  },
});

export default MenuScreen;
