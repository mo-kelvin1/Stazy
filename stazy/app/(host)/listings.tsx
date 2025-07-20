import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
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
  const [activeTab, setActiveTab] = useState("Homes");
  const [properties, setProperties] = useState<Property[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  useEffect(() => {
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
        const refreshMyExperiences =
          createRefreshMyExperiencesAction(tokenStore);
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

  const handleCardPress = (item: any) => {
    router.push({
      pathname: "/render/renderItem",
      params: {
        renderItem: item.id,
        pageName: "listings",
        activeTab: activeTab,
      },
    });
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
            activeTab === "Homes"
              ? "No properties found."
              : activeTab === "Services"
              ? "No services found."
              : activeTab === "Experiences"
              ? "No experiences found."
              : "No listings found."
          }
        />
      ) : (
        <ListingsList
          data={getCurrentData()}
          onItemPress={handleCardPress}
          keyExtractor={(item) => item.id}
        />
      )}
      <HostTypeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelectType={setSelectedType}
        selectedType={selectedType}
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
