import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { tokenStore } from "../../../../utils/tokenStore";

const MAX_DESCRIPTION_LENGTH = 500;
const MAX_LOCATION_LENGTH = 100;

const DescriptionLocationScreen = () => {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { propertyId } = useLocalSearchParams();

  const isValid = description.trim().length > 0 && location.trim().length > 0;

  const handleNext = async () => {
    if (!isValid || !propertyId) return;

    setLoading(true);
    const token = await tokenStore.getToken();
    if (!token) {
      console.error("No auth token found");
      setLoading(false);
      return;
    }

    const propertyData = {
      description: description.trim(),
      location: location.trim(),
    };

    try {
      console.log(
        `[DEBUG] Sending request to update property ${propertyId} with description/location:`,
        propertyData
      );
      const response = await fetch(
        `http://172.20.10.2:8080/api/properties/${propertyId}`,
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
        console.log(
          "[DEBUG] Property updated successfully with description/location"
        );
        router.replace("../../../(host)/listings");
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to update property with description/location:",
          errorData
        );
      }
    } catch (error) {
      console.error("Error sending request:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.header}>Describe your property</Text>
        <Text style={styles.subheader}>
          Share what makes your place special. You can add more details later.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            maxLength={MAX_DESCRIPTION_LENGTH}
            multiline
            placeholder="Enter a description..."
          />
          <Text style={styles.charCount}>
            {description.length}/{MAX_DESCRIPTION_LENGTH}
          </Text>
        </View>
        <Text style={styles.header2}>Where is your property located?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            maxLength={MAX_LOCATION_LENGTH}
            placeholder="Enter the location..."
          />
          <Text style={styles.charCount}>
            {location.length}/{MAX_LOCATION_LENGTH}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextBtn,
            (!isValid || loading) && styles.nextBtnDisabled,
          ]}
          disabled={!isValid || loading}
          onPress={handleNext}
        >
          <Text style={[styles.nextBtnText, !isValid && { color: "#bbb" }]}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    marginBottom: 8,
  },
  topBtn: {
    backgroundColor: "#fafafa",
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#eee",
  },
  topBtnText: {
    color: "#222",
    fontWeight: "500",
    fontSize: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 32,
    marginBottom: 8,
  },
  header2: {
    fontSize: 18,
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
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 12,
    backgroundColor: "#fafafa",
    minHeight: 60,
    padding: 12,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: "#222",
    minHeight: 40,
    textAlignVertical: "top",
  },
  charCount: {
    color: "#888",
    fontSize: 13,
    alignSelf: "flex-end",
    marginTop: 4,
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

export default DescriptionLocationScreen;
