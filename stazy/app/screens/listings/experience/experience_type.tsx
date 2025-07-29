import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Experience = {
  id: string;
  icon: string;
  title: string;
};

type ExperienceCardProps = {
  icon: string;
  title: string;
  selected: boolean;
  onPress: () => void;
};

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  icon,
  title,
  selected,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.card, selected && styles.cardSelected]}
    onPress={onPress}
  >
    <View style={styles.iconContainer}>
      <Text style={styles.iconText}>{icon}</Text>
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
);

const ExperienceType = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const experiences: Experience[] = [
    { id: "art", icon: "🎨", title: "Art and design" },
    { id: "wellness", icon: "💪", title: "Fitness and wellness" },
    { id: "food_drink", icon: "🍜", title: "Food and drink" },
    { id: "history", icon: "🏛️", title: "History and culture" },
    { id: "nature", icon: "🌿", title: "Nature and outdoors" },
    { id: "adventure", icon: "🧗", title: "Adventure" },
    { id: "cultural", icon: "🎎", title: "Cultural" },
    { id: "sports", icon: "⚽", title: "Sports" },
    { id: "entertainment", icon: "🎭", title: "Entertainment" },
  ];

  const handleCardPress = (id: string) => {
    setSelectedCategory(id);
  };

  const handleNext = () => {
    if (selectedCategory) {
      console.log("Proceeding with:", selectedCategory);
      // Navigation logic here
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What experience will you offer</Text>
        <Text style={styles.title}>to guests?</Text>
      </View>

      {/* Experience Cards */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {Array.from(
            { length: Math.ceil(experiences.length / 2) },
            (_, rowIdx) => (
              <View style={styles.row} key={rowIdx}>
                {experiences.slice(rowIdx * 2, rowIdx * 2 + 2).map((exp) => (
                  <ExperienceCard
                    key={exp.id}
                    icon={exp.icon}
                    title={exp.title}
                    selected={selectedCategory === exp.id}
                    onPress={() => handleCardPress(exp.id)}
                  />
                ))}
              </View>
            )
          )}
        </View>
      </ScrollView>

      {/* Next Button */}
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !selectedCategory && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!selectedCategory}
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
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    lineHeight: 34,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "47%",
    aspectRatio: 1,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 2,
    borderColor: "transparent",
  },
  cardSelected: {
    borderColor: "#000",
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconText: {
    fontSize: 40,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
    lineHeight: 20,
  },
  nextButtonContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
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
    marginBottom: 20,
  },
});

export default ExperienceType;
