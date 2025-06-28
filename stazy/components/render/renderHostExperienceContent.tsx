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
} from "react-native";
import { Experience } from "../../types/Experience";
import { Ionicons } from "@expo/vector-icons";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

interface RenderHostExperienceContentProps {
  itemId: string;
}

const tokenStore = new SimulatedTokenStore();

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
        // For now, we'll use mock data since experiences don't have a backend endpoint yet
        // This can be updated when the backend endpoint is available
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
          {
            id: "2",
            title: "Cooking Class",
            description: "Learn to cook authentic local cuisine",
            location: "Culinary District",
            price: 75,
            duration: 3,
            rating: 4.9,
            images: [
              "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136",
            ],
            hostName: "Chef Maria",
            hostEmail: "maria@example.com",
            category: "food_drink",
            experienceType: "group",
            difficulty: "moderate",
            ageRestriction: {
              minimum: 16,
            },
            maxParticipants: 8,
            included: ["All ingredients", "Recipe book", "Meal to enjoy"],
            toBring: ["No cooking experience needed", "Appetite for learning"],
            meetingPoint: "Cooking Studio",
            languages: ["English", "Italian"],
            availability: {
              days: ["Tuesday", "Thursday", "Saturday"],
              timeSlots: ["10:00", "15:00"],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];

        const foundExperience = mockExperiences.find((e) => e.id === itemId);
        if (foundExperience) {
          setExperience(foundExperience);
          setEditData(foundExperience);
        } else {
          throw new Error("Experience not found");
        }
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
      // For now, just update the local state since there's no backend endpoint
      // This can be updated when the backend endpoint is available
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
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Loading experience...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "#FF385C", textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  if (!experience) {
    return (
      <View style={styles.centered}>
        <Text>Experience not found.</Text>
      </View>
    );
  }

  const experienceData = experience as any;

  // Create price text variable
  const priceText = "$" + experienceData.price;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Experience Details</Text>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Ionicons
            name={isEditing ? "close" : "create-outline"}
            size={20}
            color="#007AFF"
          />
          <Text style={styles.editBtnText}>
            {isEditing ? "Cancel" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{experienceData.id}</Text>
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Title:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.title || ""}
            onChangeText={(v) => handleFieldChange("title", v)}
          />
        ) : (
          <Text style={styles.value}>{experienceData.title}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Description:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.description || ""}
            onChangeText={(v) => handleFieldChange("description", v)}
            multiline
          />
        ) : (
          <Text style={styles.value}>{experienceData.description}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Location:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.location || ""}
            onChangeText={(v) => handleFieldChange("location", v)}
          />
        ) : (
          <Text style={styles.value}>{experienceData.location}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Price:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.price?.toString() || ""}
            onChangeText={(v) => handleFieldChange("price", Number(v))}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.value}>{priceText}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Duration:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.duration?.toString() || ""}
            onChangeText={(v) => handleFieldChange("duration", Number(v))}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.value}>{experienceData.duration} hours</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Category:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.category || ""}
            onChangeText={(v) => handleFieldChange("category", v)}
          />
        ) : (
          <Text style={styles.value}>{experienceData.category}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Guide:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.hostName || ""}
            onChangeText={(v) => handleFieldChange("hostName", v)}
          />
        ) : (
          <Text style={styles.value}>{experienceData.hostName}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Max Participants:</Text>
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
          <Text style={styles.value}>{experienceData.maxParticipants}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Meeting Point:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.meetingPoint || ""}
            onChangeText={(v) => handleFieldChange("meetingPoint", v)}
          />
        ) : (
          <Text style={styles.value}>{experienceData.meetingPoint}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>To Bring:</Text>
        <Text style={styles.value}>
          {experienceData.toBring.length > 0
            ? experienceData.toBring.join(", ")
            : "No items to bring"}
        </Text>
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Included:</Text>
        <Text style={styles.value}>
          {experienceData.included.length > 0
            ? experienceData.included.join(", ")
            : "No items included"}
        </Text>
      </View>

      {isEditing && (
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editBtnText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  fieldRow: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#666",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
  },
  input: {
    fontSize: 16,
    color: "#333",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
