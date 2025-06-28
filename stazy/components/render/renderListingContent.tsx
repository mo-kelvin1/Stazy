import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Property } from "../../types/Property";
import { Ionicons } from "@expo/vector-icons";

interface RenderListingContentProps {
  property: Property;
  editable?: boolean;
  onSave?: (updated: Partial<Property>) => void;
}

export const RenderListingContent: React.FC<RenderListingContentProps> = ({
  property,
  editable = false,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Property>>({ ...property });

  const handleFieldChange = (field: keyof Property, value: any) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (onSave) onSave(editData);
    setIsEditing(false);
    Alert.alert("Success", "Listing updated successfully!");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Listing Details</Text>
        {editable && (
          <TouchableOpacity
            onPress={() => setIsEditing((v) => !v)}
            style={styles.editBtn}
          >
            <Ionicons
              name={isEditing ? "checkmark" : "create-outline"}
              size={22}
              color="#007AFF"
            />
            <Text style={styles.editBtnText}>
              {isEditing ? "Save" : "Edit"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{property.id}</Text>
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
          <Text style={styles.value}>{property.title}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Description:</Text>
        {isEditing ? (
          <TextInput
            style={[styles.input, { height: 60 }]}
            value={editData.description || ""}
            onChangeText={(v) => handleFieldChange("description", v)}
            multiline
          />
        ) : (
          <Text style={styles.value}>{property.description}</Text>
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
          <Text style={styles.value}>{property.location}</Text>
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
          <Text style={styles.value}>${property.price}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Weekend Price:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.weekendPrice?.toString() || ""}
            onChangeText={(v) => handleFieldChange("weekendPrice", Number(v))}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.value}>
            {property.weekendPrice ? `$${property.weekendPrice}` : "Not set"}
          </Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Rating:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.rating?.toString() || ""}
            onChangeText={(v) => handleFieldChange("rating", Number(v))}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.value}>{property.rating}/5</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Nights:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.nights?.toString() || ""}
            onChangeText={(v) => handleFieldChange("nights", Number(v))}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.value}>{property.nights}</Text>
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
          <Text style={styles.value}>{property.category}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Property Type:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.propertyType || ""}
            onChangeText={(v) => handleFieldChange("propertyType", v)}
          />
        ) : (
          <Text style={styles.value}>{property.propertyType}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Guest Favorite:</Text>
        <Text style={styles.value}>
          {property.isGuestFavorite ? "Yes" : "No"}
        </Text>
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Amenities:</Text>
        <Text style={styles.value}>
          {property.amenities.length > 0
            ? property.amenities.join(", ")
            : "No amenities listed"}
        </Text>
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Highlights:</Text>
        <Text style={styles.value}>
          {property.highlights.length > 0
            ? property.highlights.join(", ")
            : "No highlights listed"}
        </Text>
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Min Guests:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.minGuests?.toString() || ""}
            onChangeText={(v) => handleFieldChange("minGuests", Number(v))}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.value}>{property.minGuests}</Text>
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
          <Text style={styles.value}>{property.maxGuests}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Bedrooms:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.bedrooms?.toString() || ""}
            onChangeText={(v) => handleFieldChange("bedrooms", Number(v))}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.value}>{property.bedrooms}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Beds:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.beds?.toString() || ""}
            onChangeText={(v) => handleFieldChange("beds", Number(v))}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.value}>{property.beds}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Bathrooms:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editData.bathrooms?.toString() || ""}
            onChangeText={(v) => handleFieldChange("bathrooms", Number(v))}
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.value}>{property.bathrooms}</Text>
        )}
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Available:</Text>
        <Text style={styles.value}>{property.is_available ? "Yes" : "No"}</Text>
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Created At:</Text>
        <Text style={styles.value}>
          {property.createdAt
            ? new Date(property.createdAt).toLocaleDateString()
            : "Not available"}
        </Text>
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Updated At:</Text>
        <Text style={styles.value}>
          {property.updatedAt
            ? new Date(property.updatedAt).toLocaleDateString()
            : "Not available"}
        </Text>
      </View>

      <View style={styles.fieldRow}>
        <Text style={styles.label}>Images:</Text>
        <Text style={styles.value}>
          {property.images.length > 0
            ? `${property.images.length} image(s)`
            : "No images"}
        </Text>
      </View>

      {isEditing && (
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F7",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  editBtnText: {
    color: "#007AFF",
    fontWeight: "600",
    marginLeft: 4,
  },
  fieldRow: {
    marginBottom: 14,
  },
  label: {
    fontWeight: "600",
    color: "#444",
    marginBottom: 2,
  },
  value: {
    color: "#222",
    fontSize: 16,
    marginTop: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
    marginTop: 2,
  },
  saveBtn: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
