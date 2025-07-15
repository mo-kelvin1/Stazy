import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface MenuSwitchButtonProps {
  onPress: () => void;
}

const MenuSwitchButton = ({ onPress }: MenuSwitchButtonProps) => (
  <TouchableOpacity style={styles.switchBtn} onPress={onPress}>
    <Text style={styles.switchBtnText}>Switch to travelling</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  switchBtn: {
    backgroundColor: "#222",
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: "center",
    margin: 24,
    marginBottom: 32,
  },
  switchBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MenuSwitchButton;
