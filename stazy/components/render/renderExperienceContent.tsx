import React from "react";
import { Text } from "react-native";

interface RenderExperienceContentProps {
  item: any;
}

export const renderExperienceContent = ({
  item,
}: RenderExperienceContentProps) => {
  const exp = item as any;
  return (
    <>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginTop: 16,
          marginBottom: 8,
          color: "#222",
        }}
      >
        Host
      </Text>
      <Text>
        {exp.hostName} ({exp.hostEmail})
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginTop: 16,
          marginBottom: 8,
          color: "#222",
        }}
      >
        Details
      </Text>
      <Text>Type: {exp.experienceType}</Text>
      <Text>Category: {exp.category}</Text>
      <Text>Difficulty: {exp.difficulty}</Text>
      <Text>Duration: {exp.duration} hours</Text>
      <Text>Rating: {exp.rating}</Text>
      <Text>Max Participants: {exp.maxParticipants}</Text>
      <Text>Meeting Point: {exp.meetingPoint}</Text>
      <Text>Languages: {exp.languages.join(", ")}</Text>
      <Text>
        Availability: {exp.availability.days.join(", ")} at{" "}
        {exp.availability.timeSlots.join(", ")}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginTop: 16,
          marginBottom: 8,
          color: "#222",
        }}
      >
        Included
      </Text>
      <Text>{exp.included.join(", ")}</Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginTop: 16,
          marginBottom: 8,
          color: "#222",
        }}
      >
        To Bring
      </Text>
      <Text>{exp.toBring.join(", ")}</Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginTop: 16,
          marginBottom: 8,
          color: "#222",
        }}
      >
        Age Restriction
      </Text>
      <Text>
        Minimum: {exp.ageRestriction.minimum}
        {exp.ageRestriction.maximum
          ? `, Maximum: ${exp.ageRestriction.maximum}`
          : ""}
      </Text>
    </>
  );
};
