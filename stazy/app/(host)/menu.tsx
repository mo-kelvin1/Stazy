import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PersonalInfoScreen from "../screens/PersonalInfoScreen";
import ProfileMenuScreen from "../screens/ProfileMenuScreen";

const Menu = () => {
  return (
    <View style={{ flex: 1 }}>
      <ProfileMenuScreen />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});
