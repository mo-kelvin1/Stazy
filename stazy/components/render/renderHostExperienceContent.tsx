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
  Dimensions,
  Image,
} from "react-native";
import { Experience } from "../../types/Experience";
import { Ionicons } from "@expo/vector-icons";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

interface RenderHostExperienceContentProps {
  itemId: string;
}

const tokenStore = new SimulatedTokenStore();
const { width } = Dimensions.get("window");

export const renderHostExperienceContent = ({
  itemId,
}: RenderHostExperienceContentProps) => {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Experience>>({});

  useEffect(() => {
    const fetchExperience = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await tokenStore.getToken();
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          `http://10.133.134.146:8080/api/experiences/${itemId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
          );
        }

        const experienceData = await response.json();

        // Transform the backend data to match the frontend Experience interface
        const transformedExperience: Experience = {
          id: experienceData.id.toString(),
          title: experienceData.title || "",
          description: experienceData.description || "",
          location: experienceData.location || "",
          price: experienceData.price || 0,
          duration: experienceData.duration || 0,
          rating: experienceData.rating || 0,
          images: experienceData.images || [],
          hostName: experienceData.hostName || "",
          hostEmail: experienceData.hostEmail || "",
          category: experienceData.category || "adventure",
          experienceType: experienceData.experienceType || "group",
          difficulty: experienceData.difficulty || "easy",
          ageRestriction: {
            minimum: experienceData.minimumAge || 0,
            maximum: experienceData.maximumAge,
          },
          maxParticipants: experienceData.maxParticipants || 1,
          included: experienceData.included || [],
          toBring: experienceData.toBring || [],
          meetingPoint: experienceData.meetingPoint || "",
          languages: experienceData.languages || [],
          availability: {
            days: experienceData.availabilityDays || [],
            timeSlots: experienceData.availabilityTimeSlots || [],
          },
          createdAt: new Date(experienceData.createdAt),
          updatedAt: new Date(experienceData.updatedAt),
        };

        setExperience(transformedExperience);
        setEditData(transformedExperience);
      } catch (err: any) {
        setError(err.message || "Failed to fetch experience");
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [itemId]);

  const handleFieldChange = (field: keyof Experience, value: any) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `http://10.133.134.146:8080/api/experiences/${itemId}`,
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
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      setExperience(editData as Experience);
      setIsEditing(false);
      Alert.alert("Success", "Experience updated successfully!");
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to update experience");
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <View style={styles.loadingCard}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading experience...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <View style={styles.errorCard}>
          <Ionicons name="alert-circle" size={48} color="#FF385C" />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  if (!experience) {
    return (
      <View style={styles.centered}>
        <View style={styles.errorCard}>
          <Ionicons name="search" size={48} color="#007AFF" />
          <Text style={styles.notFoundText}>Experience not found.</Text>
        </View>
      </View>
    );
  }

  const priceText = "$" + (experience.price || 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={{ uri: experience.images[0] }}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              <Ionicons name="compass" size={24} color="#007AFF" />
              <Text style={styles.sectionTitle}>Experience Details</Text>
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
            <Text style={styles.fieldValue}>{experience.id}</Text>
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
              <Text style={styles.fieldValue}>{experience.title}</Text>
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
              <Text style={styles.fieldValue}>{experience.description}</Text>
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
              <Text style={styles.fieldValue}>{experience.location}</Text>
            )}
          </View>
        </View>

        {/* Pricing & Duration */}
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
              <Text style={styles.fieldValue}>{experience.duration} hours</Text>
            )}
          </View>
        </View>

        {/* Experience Details */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings" size={20} color="#FF9800" />
            <Text style={styles.subsectionTitle}>Experience Details</Text>
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
              <Text style={styles.fieldValue}>{experience.category}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#FF9800" />
              <Text style={styles.fieldLabel}>Experience Type:</Text>
            </View>
            <Text style={styles.fieldValue}>{experience.experienceType}</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#FF9800" />
              <Text style={styles.fieldLabel}>Difficulty:</Text>
            </View>
            <Text style={styles.fieldValue}>{experience.difficulty}</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#FF9800" />
              <Text style={styles.fieldLabel}>Host:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.hostName || ""}
                onChangeText={(v) => handleFieldChange("hostName", v)}
              />
            ) : (
              <Text style={styles.fieldValue}>{experience.hostName}</Text>
            )}
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#FF9800" />
              <Text style={styles.fieldLabel}>Meeting Point:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.meetingPoint || ""}
                onChangeText={(v) => handleFieldChange("meetingPoint", v)}
              />
            ) : (
              <Text style={styles.fieldValue}>{experience.meetingPoint}</Text>
            )}
          </View>

          {experience.ageRestriction && (
            <View style={styles.fieldRow}>
              <View style={styles.fieldLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#FF9800" />
                <Text style={styles.fieldLabel}>Age Range:</Text>
              </View>
              <Text style={styles.fieldValue}>
                {experience.ageRestriction.minimum}+
                {experience.ageRestriction.maximum
                  ? ` - ${experience.ageRestriction.maximum}`
                  : ""}
              </Text>
            </View>
          )}

          {experience.languages && experience.languages.length > 0 && (
            <View style={styles.fieldRow}>
              <View style={styles.fieldLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#FF9800" />
                <Text style={styles.fieldLabel}>Languages:</Text>
              </View>
              <Text style={styles.fieldValue}>
                {experience.languages.join(", ")}
              </Text>
            </View>
          )}
        </View>

        {/* Capacity */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={20} color="#E91E63" />
            <Text style={styles.subsectionTitle}>Capacity</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#E91E63" />
              <Text style={styles.fieldLabel}>Max Participants:</Text>
            </View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={editData.maxParticipants?.toString() || ""}
                onChangeText={(v) =>
                  handleFieldChange("maxParticipants", Number(v))
                }
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.fieldValue}>
                {experience.maxParticipants}
              </Text>
            )}
          </View>
        </View>

        {/* Additional Info */}
        <View style={styles.infoSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings" size={20} color="#9C27B0" />
            <Text style={styles.subsectionTitle}>Additional Info</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#9C27B0" />
              <Text style={styles.fieldLabel}>Rating:</Text>
            </View>
            <Text style={styles.fieldValue}>{experience.rating}/5</Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#9C27B0" />
              <Text style={styles.fieldLabel}>Created At:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {experience.createdAt
                ? new Date(experience.createdAt).toLocaleDateString()
                : "Not available"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#9C27B0" />
              <Text style={styles.fieldLabel}>Updated At:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {experience.updatedAt
                ? new Date(experience.updatedAt).toLocaleDateString()
                : "Not available"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#9C27B0" />
              <Text style={styles.fieldLabel}>Images:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {experience.images.length > 0
                ? experience.images.length + " image(s)"
                : "No images"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#9C27B0" />
              <Text style={styles.fieldLabel}>To Bring:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {experience.toBring.length > 0
                ? experience.toBring.join(", ")
                : "No items to bring"}
            </Text>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldLabelContainer}>
              <Ionicons name="ellipse" size={8} color="#9C27B0" />
              <Text style={styles.fieldLabel}>Included:</Text>
            </View>
            <Text style={styles.fieldValue}>
              {experience.included.length > 0
                ? experience.included.join(", ")
                : "No items included"}
            </Text>
          </View>

          {experience.availability && experience.availability.days && (
            <View style={styles.fieldRow}>
              <View style={styles.fieldLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#9C27B0" />
                <Text style={styles.fieldLabel}>Available Days:</Text>
              </View>
              <Text style={styles.fieldValue}>
                {experience.availability.days.join(", ")}
              </Text>
            </View>
          )}

          {experience.availability && experience.availability.timeSlots && (
            <View style={styles.fieldRow}>
              <View style={styles.fieldLabelContainer}>
                <Ionicons name="ellipse" size={8} color="#9C27B0" />
                <Text style={styles.fieldLabel}>Time Slots:</Text>
              </View>
              <Text style={styles.fieldValue}>
                {experience.availability.timeSlots.join(", ")}
              </Text>
            </View>
          )}
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
  loadingCard: {
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorCard: {
    padding: 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
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
