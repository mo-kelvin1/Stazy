import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF", // iOS blue
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "index")
            iconName = focused ? "today" : "today-outline";
          else if (route.name === "calendar")
            iconName = focused ? "calendar" : "calendar-outline";
          else if (route.name === "listings")
            iconName = focused ? "document" : "document-outline";
          else if (route.name === "messages")
            iconName = focused ? "chatbubble" : "chatbubble-outline";
          else if (route.name === "menu")
            iconName = focused ? "menu" : "menu-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ color, fontSize: 10 }}>
            {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
          </Text>
        ),
      })}
    >
      <Tabs.Screen name="today" options={{ title: "Today" }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
      <Tabs.Screen name="listings" options={{ title: "Listings" }} />
      <Tabs.Screen name="messages" options={{ title: "Messages" }} />
      <Tabs.Screen name="menu" options={{ title: "Menu" }} />
    </Tabs>
  );
}
