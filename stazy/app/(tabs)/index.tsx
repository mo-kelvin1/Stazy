import {
  Animated,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import FadeInView from "../../components/cards/FadeInView";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";

import React, { useState } from "react";

export default function TabOneScreen() {
  const [activeTab, setActiveTab] = useState<
    "Homes" | "Experiences" | "Services"
  >("Homes");
  // TODO: Replace this with your actual wishlist count logic or state
  const wishlistCount = 0;

  function handleTabPress(tab: "Homes" | "Experiences" | "Services"): void {
    setActiveTab(tab);
    // Optionally, you can add navigation or analytics logic here
  }

  // Define missing variables for headerHeight, searchBarOpacity, inputRef, searchQuery, setSearchQuery, and handleSearchSubmit
  const [headerHeight] = useState(120); // Example static height, adjust as needed
  const [searchBarOpacity] = useState(1); // Example static opacity, adjust as needed
  const inputRef = React.useRef<TextInput>(null);
  const [searchQuery, setSearchQuery] = useState("");
  function handleSearchSubmit() {
    // Implement your search logic here
    console.log("Search submitted:", searchQuery);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.View
          style={[styles.searchContainer, { opacity: searchBarOpacity }]}
        >
          <View style={styles.searchBar}>
            <Ionicons
              name="search"
              size={20}
              color="#717171"
              style={styles.searchIcon}
            />
            <TextInput
              ref={inputRef}
              style={styles.searchText}
              placeholder="Start your search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="search"
            />
          </View>

          {/* Wishlist counter */}
          {wishlistCount > 0 && (
            <TouchableOpacity
              style={styles.wishlistButton}
              onPress={() => {
                // Navigate to wishlist screen
                router.push("/wishlist");
                console.log("Navigate to wishlist");
              }}
            >
              <Ionicons name="heart" size={16} color="white" />
              <Text
                style={{ color: "white", fontWeight: "bold", marginLeft: 4 }}
              >
                {wishlistCount}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Homes" && styles.activeTab]}
            onPress={() => handleTabPress("Homes")}
          >
            <Ionicons
              name="home"
              size={20}
              color={activeTab === "Homes" ? "#222222" : "#717171"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "Homes" && styles.activeTabText,
              ]}
            >
              Homes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "Experiences" && styles.activeTab,
            ]}
            onPress={() => handleTabPress("Experiences")}
          >
            <View style={styles.tabWithBadge}>
              <Ionicons
                name="balloon"
                size={20}
                color={activeTab === "Experiences" ? "#222222" : "#717171"}
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === "Experiences" && styles.activeTabText,
              ]}
            >
              Experiences
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "Services" && styles.activeTab]}
            onPress={() => handleTabPress("Services")}
          >
            <View style={styles.tabWithBadge}>
              <Ionicons
                name="restaurant"
                size={20}
                color={activeTab === "Services" ? "#222222" : "#717171"}
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === "Services" && styles.activeTabText,
              ]}
            >
              Services
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e9e9e9",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchText: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabWithBadge: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  tabText: {
    marginLeft: 4,
    color: "#717171",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007AFF",
  },
  activeTabText: {
    color: "#007AFF",
  },
  wishlistButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 8,
  },
  wishlistButtonText: {
    color: "white",
    marginLeft: 4,
  },
  wishlistBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "red",
    borderRadius: 8,
    padding: 4,
  },
  wishlistBadgeText: {
    color: "white",
    fontWeight: "bold",
  },
  wishlistModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  wishlistModalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
  },
  wishlistModalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  wishlistModalButton: {
    marginTop: 10,
  },
});
