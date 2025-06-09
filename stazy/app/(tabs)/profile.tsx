import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { signOut, isSignedIn } = useAuth();
  return (
    <SafeAreaView>
      <View>
        <Button title="Log out" onPress={() => signOut} />
        {!isSignedIn && (
          <Link href={"/(modals)/login"}>
            <Text>Log in</Text>
          </Link>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Profile;
