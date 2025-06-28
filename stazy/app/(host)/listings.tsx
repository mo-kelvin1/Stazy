import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { Property } from "../../types/Property";
import { Service } from "../../types/Service";
import { Experience } from "../../types/Experience";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const tokenStore = new SimulatedTokenStore();

const listings = () => {
  const [activeTab, setActiveTab] = useState("Homes");
  const [properties, setProperties] = useState<Property[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch properties (user's listings)
        const { createRefreshListingsAction } = await import(
          "../../context/actions/refreshListings"
        );
        const refreshListings = createRefreshListingsAction(tokenStore);
        const result = await refreshListings();
        if (result.success && result.listings) {
          setProperties(result.listings);
        }

        // Fetch services (user's services)
        const { createRefreshServicesAction } = await import(
          "../../context/actions/refreshServices"
        );
        const refreshServices = createRefreshServicesAction(tokenStore);
        const servicesResult = await refreshServices();
        if (servicesResult.success && servicesResult.services) {
          setServices(servicesResult.services);
        }

        // For experiences, we'll use mock data for now
        const mockExperiences: Experience[] = [
          {
            id: "1",
            title: "City Walking Tour",
            description:
              "Explore the historic downtown area with our expert guide",
            location: "Downtown",
            price: 25,
            duration: 2,
            rating: 4.8,
            images: [
              "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
            ],
            hostName: "Sarah Johnson",
            hostEmail: "sarah@example.com",
            category: "cultural",
            experienceType: "group",
            difficulty: "easy",
            ageRestriction: {
              minimum: 12,
            },
            maxParticipants: 15,
            included: [
              "Professional guide",
              "Historical insights",
              "Photo opportunities",
            ],
            toBring: ["Comfortable walking shoes", "Water bottle"],
            meetingPoint: "Central Square",
            languages: ["English", "Spanish"],
            availability: {
              days: ["Monday", "Wednesday", "Friday"],
              timeSlots: ["09:00", "14:00"],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
        setExperiences(mockExperiences);
      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCurrentData = () => {
    switch (activeTab) {
      case "Homes":
        return properties;
      case "Services":
        return services;
      case "Experiences":
        return experiences;
      default:
        return properties;
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/render/[renderItem]",
          params: {
            renderItem: item.id,
            pageName: "listings",
            activeTab: activeTab,
          },
        })
      }
    >
      <View style={styles.statusBadgeContainer}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>In progress</Text>
      </View>
      <Image
        source={{
          uri:
            item.images && item.images.length > 0 ? item.images[0] : undefined,
        }}
        style={styles.image}
      />
      <Text style={styles.title} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderEmptyState = () => {
    switch (activeTab) {
      case "Homes":
        return <Text style={styles.empty}>No properties found.</Text>;
      case "Services":
        return <Text style={styles.empty}>No services found.</Text>;
      case "Experiences":
        return <Text style={styles.empty}>No experiences found.</Text>;
      default:
        return <Text style={styles.empty}>No listings found.</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Your listings</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search" size={24} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="document-text-outline" size={24} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="add" size={24} color="#222" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {["Homes", "Experiences", "Services"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <View style={styles.tabWithBadge}>
              <Ionicons
                name={
                  tab === "Homes"
                    ? "home"
                    : tab === "Experiences"
                    ? "balloon"
                    : "restaurant"
                }
                size={20}
                color={activeTab === tab ? "#222222" : "#717171"}
              />
            </View>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 40 }}
        />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : getCurrentData().length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={getCurrentData()}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

export default listings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 24,
    paddingHorizontal: 0,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#222",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 24,
    padding: 8,
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: "#f0f0f0",
  },
  tabWithBadge: {
    alignItems: "center",
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    color: "#717171",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#222222",
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#E5E5E7",
    borderRadius: 24,
    marginBottom: 32,
    padding: 0,
    alignItems: "flex-start",
    minHeight: 260,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    position: "relative",
  },
  statusBadgeContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    zIndex: 2,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF9900",
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    color: "#222",
    fontWeight: "500",
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginBottom: 8,
    backgroundColor: "#ccc",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#222",
    marginTop: 8,
    marginLeft: 16,
    marginBottom: 16,
  },
  error: {
    color: "#FF385C",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
  empty: {
    color: "#888",
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
  },
});
