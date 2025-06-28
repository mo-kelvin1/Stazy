import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Experience } from "../../types/Experience";
import { Service } from "../../types/Service";
import { useRouter } from "expo-router";

interface CategoryListingComponentProps {
  category: string;
  properties: any[];
  onBackPress: () => void;
  likedItems: Set<string>;
  onHeartPress: (itemId: string) => void;
  activeTab: string;
  pageName: string;
}

const CategoryListingComponent: React.FC<CategoryListingComponentProps> = ({
  category,
  properties,
  onBackPress,
  likedItems,
  onHeartPress,
  activeTab,
  pageName,
}) => {
  const router = useRouter();

  // Updated item press handler - always route to renderItem page
  const handleItemPress = (item: any) => {
    router.push({
      pathname: "/render/[renderItem]",
      params: {
        renderItem: item.id,
        pageName: pageName,
        activeTab: activeTab,
      },
    });
  };

  const renderProperty = ({ item }: { item: any }) => {
    const priceText =
      "$" +
      item.price +
      " " +
      (item.nights ? "night" + (item.nights > 1 ? "s" : "") : "");
    const totalPriceText =
      "$" + (item.nights ? item.price * item.nights : item.price) + " total";

    return (
      <TouchableOpacity
        style={styles.propertyContainer}
        onPress={() => handleItemPress(item)}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.images
                ? item.images[0]
                : item.image
                ? item.image[0]
                : undefined,
            }}
            style={styles.propertyImage}
          />
          <TouchableOpacity
            style={styles.heartIcon}
            onPress={() => onHeartPress(item.id)}
          >
            <Ionicons
              name={likedItems.has(item.id) ? "heart" : "heart-outline"}
              size={20}
              color={likedItems.has(item.id) ? "#FF385C" : "white"}
            />
          </TouchableOpacity>
          {item.isGuestFavorite && (
            <View style={styles.guestFavoriteTag}>
              <Text style={styles.guestFavoriteText}>Guest favourite</Text>
            </View>
          )}
        </View>
        <View style={styles.propertyInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.propertyTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#222222" />
              <Text style={styles.rating}>
                {item.rating} ({item.rating || 0})
              </Text>
            </View>
          </View>
          <Text style={styles.subtitle} numberOfLines={1}>
            {item.location || item.category}
          </Text>
          <Text style={styles.availability}>{"Free cancellation"}</Text>
          <Text style={styles.dateRange}>{"4-6 Jul"}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{priceText}</Text>
            <Text style={styles.totalPrice}>{totalPriceText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            onBackPress();
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          <Ionicons name="chevron-back" size={24} color="#222222" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{category}</Text>
          <Text style={styles.headerSubtitle}>Any weekend • Add guests</Text>
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={20} color="#222222" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={properties.slice(0, 4)}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#717171",
    marginTop: 2,
  },
  filterButton: {
    padding: 8,
    marginLeft: 8,
  },
  listContainer: {
    padding: 16,
  },
  propertyContainer: {
    marginBottom: 32,
  },
  imageContainer: {
    position: "relative",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  propertyImage: {
    width: "100%",
    height: 320,
    resizeMode: "cover",
  },
  heartIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  guestFavoriteTag: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  guestFavoriteText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#222222",
  },
  propertyInfo: {
    paddingHorizontal: 4,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 2,
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#222222",
    marginLeft: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#717171",
    marginBottom: 2,
  },
  availability: {
    fontSize: 14,
    color: "#717171",
    marginBottom: 2,
  },
  dateRange: {
    fontSize: 14,
    color: "#717171",
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222222",
  },
  totalPrice: {
    fontSize: 14,
    color: "#717171",
    marginLeft: 4,
    textDecorationLine: "underline",
  },
});

export default CategoryListingComponent;
