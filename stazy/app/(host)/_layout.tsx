import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

export default function TabLayout() {
  if (typeof globalThis.hostTabRefreshKeys === "undefined") {
    globalThis.hostTabRefreshKeys = {
      today: 0,
      calendar: 0,
      listings: 0,
      messages: 0,
      menu: 0,
    };
  }
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
      <Tabs.Screen
        name="today"
        options={{ title: "Today" }}
        listeners={{
          tabPress: () => {
            globalThis.hostTabRefreshKeys.today++;
          },
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{ title: "Calendar" }}
        listeners={{
          tabPress: () => {
            globalThis.hostTabRefreshKeys.calendar++;
          },
        }}
      />
      <Tabs.Screen
        name="listings"
        options={{ title: "Listings" }}
        listeners={{
          tabPress: () => {
            globalThis.hostTabRefreshKeys.listings++;
          },
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{ title: "Messages" }}
        listeners={{
          tabPress: () => {
            globalThis.hostTabRefreshKeys.messages++;
          },
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{ title: "Menu" }}
        listeners={{
          tabPress: () => {
            globalThis.hostTabRefreshKeys.menu++;
          },
        }}
      />
    </Tabs>
  );
}
