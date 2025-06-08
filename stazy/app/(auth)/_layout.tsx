import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal",
        animation: "slide_from_bottom",
      }}
    >
      <Stack.Screen name="userchecker" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="create-password" />
      <Stack.Screen name="providers/google" />
      <Stack.Screen name="providers/facebook" />
      <Stack.Screen name="providers/apple" />
    </Stack>
  );
}
