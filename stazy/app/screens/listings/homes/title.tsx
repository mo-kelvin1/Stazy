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

const MAX_TITLE_LENGTH = 32;

const TitleScreen = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { propertyId } = useLocalSearchParams();

  const isValid = title.trim().length > 0 && title.length <= MAX_TITLE_LENGTH;

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
      title: title.trim(),
    };

    try {
      console.log(
        `[DEBUG] Sending request to update property ${propertyId} with title:`,
        propertyData
      );
      const response = await fetch(
        `http://100.66.192.76:8080/api/properties/${propertyId}`,
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
        console.log("[DEBUG] Property updated successfully with title");
        router.push({
          pathname: "./pricing",
          params: { propertyId },
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to update property with title:", errorData);
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
        <Text style={styles.header}>Now, let's give your house a title</Text>
        <Text style={styles.subheader}>
          Short titles work best. Have fun with it – you can always change it
          later.
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            maxLength={MAX_TITLE_LENGTH}
            multiline
            placeholder="Enter a title..."
          />
          <Text style={styles.charCount}>
            {title.length}/{MAX_TITLE_LENGTH}
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
    minHeight: 100,
    padding: 12,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: "#222",
    minHeight: 60,
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

export default TitleScreen;
