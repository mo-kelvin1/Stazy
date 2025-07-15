import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { AuthProvider } from "../context/AuthProvider";
import { useAuth } from "../hooks/useAuth";

function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const { refreshUserData } = useAuth();
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // User is not authenticated and not in auth screens, redirect to userchecker
      router.replace("./(auth)/userchecker");
    } else if (isAuthenticated && inAuthGroup) {
      // User is authenticated but still in auth screens, redirect to home
      router.replace("/(tabs)");
      refreshUserData();
    }
  }, [isAuthenticated, segments, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FF385C" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(auth)" options={{ presentation: "card" }} />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(host)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
