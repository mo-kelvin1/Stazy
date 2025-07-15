import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useAuth } from "@/hooks/useAuth";
export default function TabLayout() {
  const { refreshUserData } = useAuth();

  if (typeof globalThis.tabRefreshKeys === "undefined") {
    globalThis.tabRefreshKeys = {
      home: 0,
      wishlist: 0,
      trips: 0,
      messages: 0,
      profile: 0,
    };
  }

  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };
  const handleProfilePress = () => {
    refreshUserData();
  };
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>["name"];

          switch (route.name) {
            case "index":
              iconName = focused ? "home" : "home-outline";
              break;
            case "wishlist":
              iconName = focused ? "heart" : "heart-outline";
              break;
            case "trips":
              iconName = focused ? "airplane" : "airplane-outline";
              break;
            case "messages":
              iconName = focused ? "chatbubble" : "chatbubble-outline";
              break;
            case "profile":
              iconName = focused ? "person" : "person-outline";
              break;
            default:
              iconName = "ellipse";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home" }}
        listeners={{
          tabPress: () => {
            globalThis.tabRefreshKeys.home++;
          },
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{ title: "Wishlist" }}
        listeners={{
          tabPress: () => {
            globalThis.tabRefreshKeys.wishlist++;
          },
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{ title: "Trips" }}
        listeners={{
          tabPress: () => {
            globalThis.tabRefreshKeys.trips++;
          },
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{ title: "Messages" }}
        listeners={{
          tabPress: () => {
            globalThis.tabRefreshKeys.messages++;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile" }}
        listeners={{
          tabPress: () => {
            globalThis.tabRefreshKeys.profile++;
            refreshUserData();
          },
        }}
      />
    </Tabs>
  );
}
