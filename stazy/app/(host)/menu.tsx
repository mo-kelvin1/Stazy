import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const menu = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View>
        <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
          <View style={styles.button}>
            <Text>Switch to Travelling</Text>
          </View>
        </TouchableOpacity>
        <Text>menu</Text>
      </View>
    </SafeAreaView>
  );
};

export default menu;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF385C",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});
