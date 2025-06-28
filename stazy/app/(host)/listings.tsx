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
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const tokenStore = new SimulatedTokenStore();

const listings = () => {
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      try {
        const { createRefreshListingsAction } = await import(
          "../../context/actions/refreshListings"
        );
        const refreshListings = createRefreshListingsAction(tokenStore);
        const result = await refreshListings();
        if (result.success && result.listings) {
          setListings(result.listings);
        } else {
          setError(result.message || "Failed to fetch listings");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const renderListing = ({ item }: { item: Property }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: "/render/[renderItem]",
          params: { renderItem: item.id },
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
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 40 }}
        />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : listings.length === 0 ? (
        <Text style={styles.empty}>No listings found.</Text>
      ) : (
        <FlatList
          data={listings}
          renderItem={renderListing}
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
