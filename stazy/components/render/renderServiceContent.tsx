import React from "react";
import { Text } from "react-native";

interface RenderServiceContentProps {
  item: any;
}

export const renderServiceContent = ({ item }: RenderServiceContentProps) => {
  const serv = item as any;
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
        Service Details
      </Text>
      <Text>Type: {serv.serviceType}</Text>
      <Text>Category: {serv.category}</Text>
      <Text>Duration: {serv.duration} hours</Text>
      <Text>Rating: {serv.rating}</Text>
      <Text>Max Guests: {serv.maxGuests}</Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginTop: 16,
          marginBottom: 8,
          color: "#222",
        }}
      >
        Provider
      </Text>
      <Text>
        {serv.provider} ({serv.providerEmail})
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
        Requirements
      </Text>
      <Text>{serv.requirements.join(", ")}</Text>
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
      <Text>{serv.included.join(", ")}</Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginTop: 16,
          marginBottom: 8,
          color: "#222",
        }}
      >
        Availability
      </Text>
      <Text>
        {serv.availability.days.join(", ")} at{" "}
        {serv.availability.timeSlots.join(", ")}
      </Text>
    </>
  );
};
