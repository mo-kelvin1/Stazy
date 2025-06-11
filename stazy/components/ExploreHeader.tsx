import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link } from "expo-router";

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const [activeTab, setActiveTab] = useState("Homes");
  const handleTabPress = (tab: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log("HomePage: Tab pressed:", tab);
    setActiveTab(tab);
    onCategoryChanged(tab);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href="/(modals)/booking" style={styles.searchBtn} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <MaterialIcons name="search" size={24} color={Colors.grey} />
              <View>
                <Text style={styles.categoryTextActive}>Where to?</Text>
                <Text style={styles.categoryText}>Home away from home</Text>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => handleTabPress("Homes")}
            style={[
              styles.categoriesBtn,
              activeTab === "Homes" && styles.categoriesBtnActive,
            ]}
          >
            <Ionicons name="home-outline" size={30} />
            <Text
              style={[
                styles.categoryText,
                activeTab === "Homes" && styles.categoryTextActive,
              ]}
            >
              Homes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabPress("Experiences")}
            style={[
              styles.categoriesBtn,
              activeTab === "Experiences" && styles.categoriesBtnActive,
            ]}
          >
            <Ionicons name="balloon-outline" size={30} />
            <Text
              style={[
                styles.categoryText,
                activeTab === "Experiences" && styles.categoryTextActive,
              ]}
            >
              Experiences
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleTabPress("Services")}
            style={[
              styles.categoriesBtn,
              activeTab === "Services" && styles.categoriesBtnActive,
            ]}
          >
            <MaterialCommunityIcons name="room-service-outline" size={30} />
            <Text
              style={[
                styles.categoryText,
                activeTab === "Services" && styles.categoryTextActive,
              ]}
            >
              Services
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 130,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 20,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
  },

  searchBtn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
    padding: 14,
    alignItems: "center",
    width: 280,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c2c2c2",
    borderRadius: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  filterBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#A2A0A2",
    borderRadius: 24,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: "#000",
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 5,
    paddingBottom: 8,
  },
});

export default ExploreHeader;
