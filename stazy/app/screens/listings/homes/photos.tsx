import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { tokenStore } from "../../../../utils/tokenStore";

const PhotosScreen = () => {
  const [photos, setPhotos] = useState<string[]>([]); // Use string[] for URIs
  const [uploading, setUploading] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { propertyId } = useLocalSearchParams();

  const handleAddPhotos = async () => {
    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsMultipleSelection: true,
        quality: 0.7,
        selectionLimit: 10,
      });
    if (!result.canceled) {
      const assets = result.assets as ImagePicker.ImagePickerAsset[];
      const uris = assets ? assets.map((a) => a.uri) : [];
      for (const uri of uris) {
        await uploadAndSaveImage(uri);
      }
    }
  };

  const handleTakePhotos = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Camera permission is required to take photos."
      );
      return;
    }
    const result: ImagePicker.ImagePickerResult =
      await ImagePicker.launchCameraAsync({
        mediaTypes: "images",
        quality: 0.7,
      });
    if (!result.canceled) {
      const assets = result.assets as ImagePicker.ImagePickerAsset[];
      const uris = assets ? assets.map((a) => a.uri) : [];
      for (const uri of uris) {
        await uploadAndSaveImage(uri);
      }
    }
  };

  // Upload image to Cloudinary and add the returned URL to photos
  const uploadAndSaveImage = async (uri: string) => {
    setUploading(uri);
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: uri.split("/").pop() || "photo.jpg",
      type: "image/jpeg",
    } as any);
    formData.append("upload_preset", "properties"); // Your unsigned preset name
    formData.append("cloud_name", "dassuxqik"); // Your cloud name

    console.log("[DEBUG] Uploading image to Cloudinary...");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dassuxqik/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("[DEBUG] Cloudinary response:", data);
      if (data.secure_url) {
        setPhotos((prev) => [...prev, data.secure_url]);
      } else {
        Alert.alert("Upload failed", "Could not upload image to Cloudinary.");
        console.error("Cloudinary upload error:", data);
      }
    } catch (err) {
      Alert.alert(
        "Upload error",
        "An error occurred while uploading the image."
      );
      console.error("Fetch error:", err);
    } finally {
      setUploading(null);
    }
  };

  const handleNext = async () => {
    if (!propertyId || photos.length < 4) return;

    setLoading(true);
    const token = await tokenStore.getToken();
    if (!token) {
      console.error("No auth token found");
      setLoading(false);
      return;
    }

    const propertyData = {
      images: photos,
    };

    try {
      console.log(
        `[DEBUG] Sending request to update property ${propertyId} with images:`,
        propertyData
      );
      const response = await fetch(
        `http://10.132.119.88:8080/api/properties/${propertyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(propertyData),
        }
      );

      if (response.ok) {
        console.log("[DEBUG] Property updated successfully with images");
        router.push({
          pathname: "./highlights",
          params: { propertyId },
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to update property with images:", errorData);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePhoto = (uri: string) => {
    setPhotos((prev) => prev.filter((p) => p !== uri));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.header}>Add some photos of your house</Text>
        <Text style={styles.subheader}>
          You'll need 4 photos to get started. You can add more or make changes
          later.
        </Text>
        <TouchableOpacity style={styles.photoBtn} onPress={handleAddPhotos}>
          <Ionicons
            name="add"
            size={28}
            color="#222"
            style={{ marginRight: 12 }}
          />
          <Text style={styles.photoBtnText}>Add photos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoBtn} onPress={handleTakePhotos}>
          <Ionicons
            name="camera-outline"
            size={28}
            color="#222"
            style={{ marginRight: 12 }}
          />
          <Text style={styles.photoBtnText}>Take new photos</Text>
        </TouchableOpacity>
        {photos.length > 0 && (
          <View style={styles.previewRow}>
            {photos.map((uri, idx) => (
              <View key={uri} style={styles.photoPreview}>
                {uploading === uri ? (
                  <ActivityIndicator size="small" color="#222" />
                ) : (
                  <>
                    <Image source={{ uri }} style={styles.photoImg} />
                    <TouchableOpacity
                      style={styles.removeBtn}
                      onPress={() => handleRemovePhoto(uri)}
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#dc3545"
                      />
                    </TouchableOpacity>
                  </>
                )}
                <Text style={{ fontSize: 12, color: "#888" }}>
                  Photo {idx + 1}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextBtn,
            (photos.length < 4 || loading) && styles.nextBtnDisabled,
          ]}
          disabled={photos.length < 4 || loading}
          onPress={handleNext}
        >
          <Text
            style={[styles.nextBtnText, photos.length < 4 && { color: "#bbb" }]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 32,
    marginBottom: 8,
  },
  subheader: {
    fontSize: 15,
    color: "#888",
    marginHorizontal: 20,
    marginBottom: 24,
  },
  photoBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginHorizontal: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eee",
  },
  photoBtnText: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
  previewRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 20,
    marginTop: 12,
  },
  photoPreview: {
    width: 64,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginBottom: 12,
    position: "relative",
  },
  photoImg: {
    width: 56,
    height: 56,
    borderRadius: 6,
    marginBottom: 2,
    resizeMode: "cover",
  },
  removeBtn: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 2,
    zIndex: 2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: "#fff",
  },
  backText: {
    color: "#222",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  nextBtn: {
    backgroundColor: "#222",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  nextBtnDisabled: {
    backgroundColor: "#eee",
  },
  nextBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PhotosScreen;
