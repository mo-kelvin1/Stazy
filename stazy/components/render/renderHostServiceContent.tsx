import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";
import { Service } from "../../types/Service";
import { Ionicons } from "@expo/vector-icons";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

interface RenderHostServiceContentProps {
  itemId: string;
}

const tokenStore = new SimulatedTokenStore();

export const renderHostServiceContent = ({
  itemId,
}: RenderHostServiceContentProps) => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Service>>({});

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await tokenStore.getToken();
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(
          `http://10.30.22.153:8080/api/service-offers/${itemId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch service");
        }

        const data = await response.json();

        // Transform backend service data to match frontend Service interface
        const transformedService: Service = {
          id: data.id.toString(),
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          price: data.price || 0,
          duration: data.duration || 0,
          rating: data.rating || 0,
          images: data.images || [],
          category: data.category || "other",
          serviceType: data.serviceType || "one_time",
          availability: {
            days: data.availabilityDays || [],
            timeSlots: data.availabilityTimeSlots || [],
          },
          requirements: data.requirements || [],
          included: data.included || [],
          maxGuests: data.maxGuests || 1,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
          isGuestFavorite: data.isGuestFavorite || false,
          provider: data.provider || "",
          providerEmail: data.providerEmail || "",
        };

        setService(transformedService);
        setEditData(transformedService);
      } catch (err: any) {
        setError(err.message || "Failed to fetch service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [itemId]);

  const handleFieldChange = (field: keyof Service, value: any) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch(
        `http://10.30.22.153:8080/api/service-offers/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update service");
      }

      const updatedService = await response.json();
      setService(updatedService);
      setIsEditing(false);
      Alert.alert("Success", "Service updated successfully!");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to update service");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading service details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle" size={48} color="#FF385C" />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!service) {
    return (
      <View style={styles.centered}>
        <Ionicons name="construct-outline" size={48} color="#666" />
        <Text style={styles.notFoundText}>Service not found</Text>
      </View>
    );
  }

  const priceText = "$" + service.price;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={{ uri: service.images[0] }}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              <Ionicons name="construct" size={24} color="#007AFF" />
              <Text style={styles.sectionTitle}>Service Details</Text>
            </View>
            <TouchableOpacity
              style={[styles.editBtn, isEditing && styles.editBtnActive]}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Ionicons
                name={isEditing ? "close" : "create-outline"}
                size={20}
                color={isEditing ? "#fff" : "#007AFF"}
              />
              <Text
                style={[
                  styles.editBtnText,
                  isEditing && styles.editBtnTextActive,
                ]}
              >
                {isEditing ? "Cancel" : "Edit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Basic Information */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={20} color="#007AFF" />
            <Text style={styles.subsectionTitle}>Basic Information</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#007AFF" />
              <Text style={styles.fieldLabel}>ID:</Text>
            </View>
            <Text style={styles.fieldValue}>{service.id}</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#007AFF" />
              <Text style={styles.fieldLabel}>Title:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.title || ""}
                onChangeText={(v) => handleFieldChange("title", v)}
              />
            ) : (
              <Text style={styles.fieldValue}>{service.title}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#007AFF" />
              <Text style={styles.fieldLabel}>Description:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={[styles.input, { height: 60 }]}
                value={editData.description || ""}
                onChangeText={(v) => handleFieldChange("description", v)}
                multiline
              />
            ) : (
              <Text style={styles.fieldValue}>{service.description}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#007AFF" />
              <Text style={styles.fieldLabel}>Location:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.location || ""}
                onChangeText={(v) => handleFieldChange("location", v)}
              />
            ) : (
              <Text style={styles.fieldValue}>{service.location}</Text>
            )}
          </View>
        </View>

        {/* Pricing Information */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="card" size={20} color="#4CAF50" />
            <Text style={styles.subsectionTitle}>Pricing & Duration</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#4CAF50" />
              <Text style={styles.fieldLabel}>Price:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.price?.toString() || ""}
                onChangeText={(v) => handleFieldChange("price", Number(v))}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.fieldValue}>{priceText}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#4CAF50" />
              <Text style={styles.fieldLabel}>Duration:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.duration?.toString() || ""}
                onChangeText={(v) => handleFieldChange("duration", Number(v))}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.fieldValue}>{service.duration} hours</Text>
            )}
          </View>
        </View>

        {/* Service Details */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings" size={20} color="#FF9800" />
            <Text style={styles.subsectionTitle}>Service Details</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#FF9800" />
              <Text style={styles.fieldLabel}>Category:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.category || ""}
                onChangeText={(v) => handleFieldChange("category", v)}
              />
            ) : (
              <Text style={styles.fieldValue}>{service.category}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#FF9800" />
              <Text style={styles.fieldLabel}>Service Type:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.serviceType || ""}
                onChangeText={(v) => handleFieldChange("serviceType", v)}
              />
            ) : (
              <Text style={styles.fieldValue}>{service.serviceType}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#FF9800" />
              <Text style={styles.fieldLabel}>Max Guests:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.maxGuests?.toString() || ""}
                onChangeText={(v) => handleFieldChange("maxGuests", Number(v))}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.fieldValue}>{service.maxGuests}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#FF9800" />
              <Text style={styles.fieldLabel}>Provider:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.provider || ""}
                onChangeText={(v) => handleFieldChange("provider", v)}
              />
            ) : (
              <Text style={styles.fieldValue}>{service.provider}</Text>
            )}
          </View>
        </View>

        {/* Requirements & Included */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list" size={20} color="#E91E63" />
            <Text style={styles.subsectionTitle}>Requirements & Included</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#E91E63" />
              <Text style={styles.fieldLabel}>Requirements:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {service.requirements.length > 0
                ? service.requirements.join(", ")
                : "No requirements listed"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#E91E63" />
              <Text style={styles.fieldLabel}>Included:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {service.included.length > 0
                ? service.included.join(", ")
                : "No items included"}
            </Text>
          </View>
        </View>

        {isEditing && (
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        <View style={styles.bottomSpacer} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: "#FF385C",
    textAlign: "center",
  },
  notFoundText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  mainImage: {
    width: "100%",
    height: 300,
    borderRadius: 24,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 15,
  },
  headerSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#222",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editBtnActive: {
    backgroundColor: "#FF385C",
  },
  editBtnText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  editBtnTextActive: {
    color: "#fff",
  },
  infoSection: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
    color: "#222",
  },
  fieldRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  fieldLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginLeft: 8,
  },
  fieldValue: {
    fontSize: 14,
    color: "#666",
    flex: 2,
    textAlign: "right",
    fontWeight: "500",
  },
  input: {
    fontSize: 14,
    color: "#333",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    flex: 2,
    textAlign: "right",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 20,
  },
});
