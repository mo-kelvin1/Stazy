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
import { Property } from "../../types/Property";
import { Ionicons } from "@expo/vector-icons";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

interface RenderListingContentProps {
  itemId: string;
}

const tokenStore = new SimulatedTokenStore();

export const renderListingContent = ({ itemId }: RenderListingContentProps) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Property>>({});

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await tokenStore.getToken();
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch(
          `http://10.60.32.210:8080/api/properties/${itemId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch property");
        }

        const data = await response.json();
        setProperty(data);
        setEditData(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch property");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [itemId]);

  const handleFieldChange = (field: keyof Property, value: any) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await fetch(
        `http://10.60.32.210:8080/api/properties/${itemId}`,
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
        throw new Error("Failed to update property");
      }

      const updatedProperty = await response.json();
      setProperty(updatedProperty);
      setIsEditing(false);
      Alert.alert("Success", "Listing updated successfully!");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to update listing");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading listing details...</Text>
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

  if (!property) {
    return (
      <View style={styles.centered}>
        <Ionicons name="home-outline" size={48} color="#666" />
        <Text style={styles.notFoundText}>Listing not found</Text>
      </View>
    );
  }

  const propertyData = property as any;

  // Create price text variable
  const priceText = "$" + propertyData.price;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={{ uri: property.images[0] }}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              <Ionicons name="home" size={24} color="#007AFF" />
              <Text style={styles.sectionTitle}>Listing Details</Text>
            </View>
            <TouchableOpacity
              onPress={() => setIsEditing((v) => !v)}
              style={[styles.editBtn, isEditing && styles.editBtnActive]}
            >
              <Ionicons
                name={isEditing ? "checkmark" : "create-outline"}
                size={20}
                color={isEditing ? "#fff" : "#007AFF"}
              />
              <Text
                style={[
                  styles.editBtnText,
                  isEditing && styles.editBtnTextActive,
                ]}
              >
                {isEditing ? "Save" : "Edit"}
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
            <Text style={styles.fieldValue}>{property.id}</Text>
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
              <Text style={styles.fieldValue}>{property.title}</Text>
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
              <Text style={styles.fieldValue}>{property.description}</Text>
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
              <Text style={styles.fieldValue}>{property.location}</Text>
            )}
          </View>
        </View>

        {/* Pricing Information */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="card" size={20} color="#4CAF50" />
            <Text style={styles.subsectionTitle}>Pricing</Text>
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
              <Text style={styles.fieldLabel}>Weekend Price:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.weekendPrice?.toString() || ""}
                onChangeText={(v) =>
                  handleFieldChange("weekendPrice", Number(v))
                }
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.fieldValue}>
                {property.weekendPrice
                  ? "$" + property.weekendPrice
                  : "Not set"}
              </Text>
            )}
          </View>
        </View>

        {/* Property Details */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="home" size={20} color="#FF9800" />
            <Text style={styles.subsectionTitle}>Property Details</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#FF9800" />
              <Text style={styles.fieldLabel}>Rating:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.rating?.toString() || ""}
                onChangeText={(v) => handleFieldChange("rating", Number(v))}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.fieldValue}>{property.rating}/5</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#FF9800" />
              <Text style={styles.fieldLabel}>Nights:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.nights?.toString() || ""}
                onChangeText={(v) => handleFieldChange("nights", Number(v))}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.fieldValue}>{property.nights}</Text>
            )}
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
              <Text style={styles.fieldValue}>{property.category}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#FF9800" />
              <Text style={styles.fieldLabel}>Property Type:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.propertyType || ""}
                onChangeText={(v) => handleFieldChange("propertyType", v)}
              />
            ) : (
              <Text style={styles.fieldValue}>{property.propertyType}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#FF9800" />
              <Text style={styles.fieldLabel}>Guest Favorite:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {property.isGuestFavorite ? "Yes" : "No"}
            </Text>
          </View>
        </View>

        {/* Capacity Information */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={20} color="#E91E63" />
            <Text style={styles.subsectionTitle}>Capacity</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#E91E63" />
              <Text style={styles.fieldLabel}>Min Guests:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.minGuests?.toString() || ""}
                onChangeText={(v) => handleFieldChange("minGuests", Number(v))}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.fieldValue}>{property.minGuests}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#E91E63" />
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
              <Text style={styles.fieldValue}>{property.maxGuests}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#E91E63" />
              <Text style={styles.fieldLabel}>Bedrooms:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.bedrooms?.toString() || ""}
                onChangeText={(v) => handleFieldChange("bedrooms", Number(v))}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.fieldValue}>{property.bedrooms}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#E91E63" />
              <Text style={styles.fieldLabel}>Beds:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.beds?.toString() || ""}
                onChangeText={(v) => handleFieldChange("beds", Number(v))}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.fieldValue}>{property.beds}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#E91E63" />
              <Text style={styles.fieldLabel}>Bathrooms:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.bathrooms?.toString() || ""}
                onChangeText={(v) => handleFieldChange("bathrooms", Number(v))}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.fieldValue}>{property.bathrooms}</Text>
            )}
          </View>
        </View>

        {/* Additional Information */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings" size={20} color="#9C27B0" />
            <Text style={styles.subsectionTitle}>Additional Info</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#9C27B0" />
              <Text style={styles.fieldLabel}>Available:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {property.is_available ? "Yes" : "No"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#9C27B0" />
              <Text style={styles.fieldLabel}>Created At:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {property.createdAt
                ? new Date(property.createdAt).toLocaleDateString()
                : "Not available"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#9C27B0" />
              <Text style={styles.fieldLabel}>Updated At:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {property.updatedAt
                ? new Date(property.updatedAt).toLocaleDateString()
                : "Not available"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#9C27B0" />
              <Text style={styles.fieldLabel}>Images:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {property.images.length > 0
                ? property.images.length + " image(s)"
                : "No images"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#9C27B0" />
              <Text style={styles.fieldLabel}>Amenities:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {property.amenities.length > 0
                ? property.amenities.join(", ")
                : "No amenities listed"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#9C27B0" />
              <Text style={styles.fieldLabel}>Highlights:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {property.highlights.length > 0
                ? property.highlights.join(", ")
                : "No highlights listed"}
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
    backgroundColor: "#007AFF",
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
