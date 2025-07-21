import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { Property } from "../../types/Property";
import { Service } from "../../types/Service";
import { Experience } from "../../types/Experience";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { useRouter } from "expo-router";
import HostTypeModal from "../../components/host/HostTypeModal";
import ListingsHeader from "../../components/host/listings/ListingsHeader";
import ListingsTabs from "../../components/host/listings/ListingsTabs";
import ListingsList from "../../components/host/listings/ListingsList";
import ListingsEmptyState from "../../components/host/listings/ListingsEmptyState";
import ListingsError from "../../components/host/listings/ListingsError";
import ListingsLoading from "../../components/host/listings/ListingsLoading";

const tokenStore = new SimulatedTokenStore();

const ListingsScreen = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [properties, setProperties] = useState<Property[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { createRefreshListingsAction } = await import(
        "../../context/actions/refreshListings"
      );
      const refreshListings = createRefreshListingsAction(tokenStore);
      const result = await refreshListings();
      if (result.success && result.listings) {
        setProperties(result.listings);
      }
      const { createRefreshServicesAction } = await import(
        "../../context/actions/refreshServices"
      );
      const refreshServices = createRefreshServicesAction(tokenStore);
      const servicesResult = await refreshServices();
      if (servicesResult.success && servicesResult.services) {
        setServices(servicesResult.services);
      }
      const { createRefreshMyExperiencesAction } = await import(
        "../../context/actions/refreshMyExperiences"
      );
      const refreshMyExperiences = createRefreshMyExperiencesAction(tokenStore);
      const experiencesResult = await refreshMyExperiences();
      if (experiencesResult.success && experiencesResult.experiences) {
        setExperiences(experiencesResult.experiences);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCurrentData = () => {
    switch (activeTab) {
      case "home":
        return properties;
      case "service":
        return services;
      case "experience":
        return experiences;
      default:
        return properties;
    }
  };

  const handleCardPress = (item: any) => {
    // Map the internal tab keys to the expected values in renderItem
    let renderTab = "Homes";
    if (activeTab === "experience") renderTab = "Experiences";
    else if (activeTab === "service") renderTab = "Services";
    // Default is "Homes"
    router.push({
      pathname: "/render/renderItem",
      params: {
        renderItem: item.id,
        pageName: "listings",
        activeTab: renderTab,
      },
    });
  };

  const handleLongPress = (item: any) => {
    if (activeTab !== "home") return; // Only allow deleting properties for now

    Alert.alert(
      "Delete Listing",
      `Are you sure you want to delete "${item.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteListing(item.id),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const deleteListing = async (propertyId: number) => {
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        Alert.alert("Error", "You are not authenticated.");
        return;
      }
      const response = await fetch(
        `http://100.66.192.76:8080/api/properties/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        Alert.alert("Success", "Listing deleted successfully.");
        await fetchData(); // Refresh the list
      } else {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to delete listing.");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      Alert.alert("Error", "An error occurred while deleting the listing.");
    }
  };

  const handleNextType = () => {
    if (selectedType === "home") {
      setModalVisible(false);
      router.push("../../screens/listings/homes/guest-place-type");
    }
    // Add other types as needed
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        Platform.OS === "android" && { paddingTop: StatusBar.currentHeight },
      ]}
    >
      <ListingsHeader
        onSearch={() => {}}
        onDocs={() => {}}
        onAdd={() => setModalVisible(true)}
      />
      <ListingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {loading ? (
        <ListingsLoading />
      ) : error ? (
        <ListingsError message={error} />
      ) : getCurrentData().length === 0 ? (
        <ListingsEmptyState
          message={
            activeTab === "home"
              ? "No properties found."
              : activeTab === "service"
              ? "No services found."
              : activeTab === "experience"
              ? "No experiences found."
              : "No listings found."
          }
        />
      ) : (
        <ListingsList
          data={getCurrentData()}
          onItemPress={handleCardPress}
          onItemLongPress={handleLongPress}
          keyExtractor={(item) => item.id}
        />
      )}
      <HostTypeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectType={setSelectedType}
        selectedType={selectedType}
        onNext={handleNextType}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 24,
    paddingHorizontal: 0,
  },
});

export default ListingsScreen;
