import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Mode = "group" | "private_experience" | "online";

type ModeCardProps = {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

const ModeCard: React.FC<ModeCardProps> = ({
  title,
  description,
  selected,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.card, selected && styles.cardSelected]}
    onPress={onPress}
  >
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </TouchableOpacity>
);

const ExperienceModeScreen = () => {
  const [selectedMode, setSelectedMode] = useState<Mode | null>(null);

  const modes: { id: Mode; title: string; description: string }[] = [
    {
      id: "group",
      title: "Group Experience",
      description: "You’ll host multiple guests at a time",
    },
    {
      id: "private_experience",
      title: "Private Experience",
      description: "Just one guest or a private group per booking",
    },
    {
      id: "online",
      title: "Online Experience",
      description: "Host over Zoom from anywhere in the world",
    },
  ];

  const handleBackPress = () => {
    router.back();
  };

  const handleNext = () => {
    console.log("Proceed with:", selectedMode);
    // navigation.navigate("NextScreen", { mode: selectedMode })
    router.push(`../../screens/listings/experience/experience_type`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>How will you host your experience?</Text>
      </View>

      {/* Mode Cards */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {modes.map((mode) => (
            <ModeCard
              key={mode.id}
              title={mode.title}
              description={mode.description}
              selected={selectedMode === mode.id}
              onPress={() => setSelectedMode(mode.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !selectedMode && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!selectedMode}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    lineHeight: 32,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    padding: 20,
    elevation: 1,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: "#000",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000",
  },
  cardDescription: {
    fontSize: 14,
    color: "#444",
  },
  nextButtonContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: "#000",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#aaa",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#000",
    borderRadius: 2.5,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default ExperienceModeScreen;
