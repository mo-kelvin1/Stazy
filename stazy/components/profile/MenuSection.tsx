import React from "react";
import { View, StyleSheet } from "react-native";
import MenuOption from "./MenuOption";

const MenuSection = ({
  onViewProfile,
  onGetHelp,
  onPrivacy,
  onLogout,
}: {
  onViewProfile: () => void;
  onGetHelp: () => void;
  onPrivacy: () => void;
  onLogout: () => void;
}) => (
  <View style={styles.menuSection}>
    <MenuOption
      icon="settings-outline"
      title="Account settings"
      onPress={() => {}}
    />
    <MenuOption
      icon="help-circle-outline"
      title="Get help"
      onPress={onGetHelp}
    />
    <MenuOption
      icon="person-outline"
      title="View profile"
      onPress={onViewProfile}
    />
    <MenuOption icon="hand-left-outline" title="Privacy" onPress={onPrivacy} />
    <MenuOption
      icon="log-out-outline"
      title="Log out"
      onPress={onLogout}
      showChevron={false}
    />
  </View>
);

const styles = StyleSheet.create({
  menuSection: {
    backgroundColor: "white",
    marginHorizontal: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
});

export default MenuSection;
