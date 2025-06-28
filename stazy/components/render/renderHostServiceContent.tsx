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
          `http://100.66.107.9:8080/api/service-offers/${itemId}`,
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
        `http://100.66.107.9:8080/api/service-offers/${itemId}`,
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
        <Text style={{ marginTop: 10 }}>Loading service...</Text>
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

  if (!service) {
    return (
      <View style={styles.centered}>
        <Text>Service not found.</Text>
      </View>
    );
  }

  const priceText = "$" + service.price;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: service.images[0] }}
        style={styles.image}
        resizeMode="stretch"
      />
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Service Details</Text>
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
        <Text style={styles.value}>{service.id}</Text>
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
          <Text style={styles.value}>{service.title}</Text>
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
          <Text style={styles.value}>{service.description}</Text>
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
          <Text style={styles.value}>{service.location}</Text>
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
          <Text style={styles.value}>{service.duration} hours</Text>
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
          <Text style={styles.value}>{service.category}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Service Type:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.serviceType || ""}
            onChangeText={(v) => handleFieldChange("serviceType", v)}
          />
        ) : (
          <Text style={styles.value}>{service.serviceType}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Max Guests:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.maxGuests?.toString() || ""}
            onChangeText={(v) => handleFieldChange("maxGuests", Number(v))}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.value}>{service.maxGuests}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Provider:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.provider || ""}
            onChangeText={(v) => handleFieldChange("provider", v)}
          />
        ) : (
          <Text style={styles.value}>{service.provider}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Requirements:</Text>
        <Text style={styles.value}>
          {service.requirements.length > 0
            ? service.requirements.join(", ")
            : "No requirements listed"}
        </Text>
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Included:</Text>
        <Text style={styles.value}>
          {service.included.length > 0
            ? service.included.join(", ")
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
  image: {
    width: "100%",
    height: "30%",
    marginBottom: 20,
  },
});
