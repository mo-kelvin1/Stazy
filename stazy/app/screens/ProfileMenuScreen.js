// screens/ProfileMenuScreen.js
import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import MenuHeader from "../../components/ProfileMenu/MenuHeader";
import MenuItem from "../../components/ProfileMenu/MenuItem";
import FloatingButton from "../../components/ProfileMenu/FloatingButton";

const ProfileMenuScreen = () => {
  const navigation = useNavigation();

  const handleCreateListing = () => {
    router.push("/(host)/listings");
  };

  const handleSwitchToTravelling = () => {
    router.replace("/(tabs)");
  };

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleNotificationPress = () => {
    router.push("/screens/NotificationScreen");
  };

  const menuItems = [
    {
      id: "personal",
      title: "Personal information",
      icon: "person-outline",
      onPress: () => router.push("/screens/PersonalInfoScreen"),
    },
    {
      id: "help",
      title: "Get help",
      icon: "help-circle-outline",
      onPress: () => router.push("/screens/GetHelpScreen"),
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: "notifications-outline",
      onPress: () => router.push("/screens/NotificationScreen"),
    },
    {
      id: "payments",
      title: "Payments",
      icon: "card-outline",
      onPress: () => alert("Payments feature coming soon!"),
    },
    {
      id: "listing",
      title: "Create a new listing",
      icon: "home-outline",
      onPress: handleCreateListing,
    },
    {
      id: "translation",
      title: "Translation",
      icon: "globe-outline",
      onPress: () => alert("Translation feature coming soon!"),
    },
    {
      id: "accessibility",
      title: "Accessibility",
      icon: "accessibility-outline",
    },
    {
      id: "legal",
      title: "Legal",
      icon: "document-text-outline",
    },
  ];

  const logoutItem = {
    id: "logout",
    title: "Log out",
    icon: "log-out-outline",
    onPress: handleLogout,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <MenuHeader
        onBackPress={() => navigation.goBack()}
        onNotificationPress={handleNotificationPress}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
          <MenuItem item={logoutItem} showChevron={false} />
        </View>
        <View style={styles.bottomPadding} />
      </ScrollView>

      <FloatingButton
        style={{textAlign: "center"}}
        onPress={handleSwitchToTravelling}
        text="Switch to travelling"
        icon="swap-horizontal"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  menuContainer: {
    paddingTop: 10,
  },
  bottomPadding: {
    height: 100,
  },
});

export default ProfileMenuScreen;
