import { useState, useEffect, useCallback } from "react";
import { mockProperties, Property } from "../data/mockProperties";
import { mockExperiences } from "../data/mockExperiences";
import { mockServices } from "../data/mockServices";

export const useHomeData = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("Homes");

  const loadDataForTab = useCallback((tab: string) => {
    setLoading(true);
    let data: Property[] = [];

    switch (tab) {
      case "Homes":
        data = mockProperties;
        break;
      case "Experiences":
        data = mockExperiences.map((exp) => ({
          ...exp,
          image: [exp.image],
        }));
        break;
      case "Services":
        data = mockServices.map((service) => ({
          ...service,
          image: [service.image],
        }));
        break;
      default:
        data = mockProperties;
    }

    setProperties(data);
    setLoading(false);
  }, []);

  const fetchProperties = useCallback(async () => {
    try {
      throw new Error("Network request failed");
    } catch (error) {
      setProperties(mockProperties);
    } finally {
      setLoading(false);
    }
  }, []);

  const categorizedProperties = properties.reduce((acc, property) => {
    if (!acc[property.category]) {
      acc[property.category] = [];
    }
    acc[property.category].push(property);
    return acc;
  }, {} as Record<string, Property[]>);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    loadDataForTab(activeTab);
  }, [activeTab, loadDataForTab]);

  return {
    properties,
    loading,
    activeTab,
    setActiveTab,
    categorizedProperties,
  };
};
