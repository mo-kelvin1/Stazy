import { useState, useEffect, useCallback } from "react";
import { mockProperties, Property } from "../data/mockProperties";
import { mockExperiences, Experience } from "../data/mockExperiences";
import { mockServices, Service } from "../data/mockServices";

// Discriminated Union
export type HomeItem =
  | (Property & { type: "property" })
  | (Service & { type: "service" })
  | (Experience & { type: "experience" });

export const useHomeData = () => {
  const [items, setItems] = useState<HomeItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("Homes");

  const loadDataForTab = useCallback((tab: string) => {
    setLoading(true);

    let data: HomeItem[] = [];

    switch (tab) {
      case "Homes":
        data = mockProperties.map((p) => ({
          ...p,
          type: "property" as const,
          image: Array.isArray(p.images) ? p.images : [p.images], // normalize
        }));
        break;

      case "Experiences":
        data = mockExperiences.map((exp) => ({
          ...exp,
          type: "experience" as const,
          image: Array.isArray(exp.images) ? exp.images : [exp.images],
        }));
        break;

      case "Services":
        data = mockServices.map((service) => ({
          ...service,
          type: "service" as const,
          image: Array.isArray(service.images) ? service.images : [service.images],
        }));
        break;

      default:
        data = mockProperties.map((p) => ({
          ...p,
          type: "property" as const,
          images: Array.isArray(p.images) ? p.images : [p.images],
        }));
    }

    setItems(data);
    setLoading(false);
  }, []);

  // Categorized grouping (defensive against undefined categories)
  const categorizedProperties = items.reduce((acc, item) => {
    const category = item.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, HomeItem[]>);

  // Load items on tab change
  useEffect(() => {
    loadDataForTab(activeTab);
  }, [activeTab, loadDataForTab]);

  return {
    properties: items,
    loading,
    activeTab,
    setActiveTab,
    categorizedProperties: categorizedProperties ?? {}, // defensive default
  };
};
