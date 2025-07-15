import React, { useState, useEffect } from "react";
import { SafeAreaView, Alert, StyleSheet } from "react-native";
import TodayHeader from "../../components/host/today/TodayHeader";
import TodayTabs from "../../components/host/today/TodayTabs";
import TodayBookingList from "../../components/host/today/TodayBookingList";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";

const tokenStore = new SimulatedTokenStore();

interface Booking {
  id: number;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: string;
  entityTitle?: string;
  entityLocation?: string;
  bookingType?: string;
  hostId?: number;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
}

const TodayScreen = () => {
  const [activeTab, setActiveTab] = useState<"pending" | "confirmed">(
    "pending"
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHostBookings();
  }, []);

  const fetchHostBookings = async () => {
    try {
      const token = await tokenStore.getToken();
      if (!token) {
        Alert.alert("Error", "User not authenticated.");
        return;
      }
      const response = await fetch(
        "http://10.30.22.153:8080/api/bookings/host-bookings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const bookingsData = await response.json();
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const filteredBookings = bookingsData
        .filter((booking: Booking) => {
          const startDate = new Date(booking.startDate);
          return startDate >= currentDate;
        })
        .sort((a: Booking, b: Booking) => {
          const dateA = new Date(a.startDate);
          const dateB = new Date(b.startDate);
          return dateA.getTime() - dateB.getTime();
        });
      setBookings(filteredBookings);
    } catch (error) {
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  const getFilteredBookings = () => {
    return bookings.filter((booking) => {
      if (activeTab === "pending") {
        return booking.status === "PENDING";
      } else {
        return booking.status === "CONFIRMED";
      }
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBookingTypeIcon = (bookingType?: string) => {
    switch (bookingType) {
      case "PROPERTY":
        return "home";
      case "SERVICE":
        return "construct";
      case "EXPERIENCE":
        return "airplane";
      default:
        return "home";
    }
  };

  const getBookingTypeColor = (bookingType?: string) => {
    switch (bookingType) {
      case "PROPERTY":
        return "#007AFF";
      case "SERVICE":
        return "#FF9500";
      case "EXPERIENCE":
        return "#34C759";
      default:
        return "#007AFF";
    }
  };

  const handleBookingAction = async (
    bookingId: number,
    action: "confirm" | "reject"
  ) => {
    const actionText = action === "confirm" ? "confirm" : "reject";
    const actionTitle =
      action === "confirm" ? "Confirm Booking" : "Reject Booking";
    const actionMessage =
      action === "confirm"
        ? "Are you sure you want to confirm this booking? This will notify the guest that their booking has been approved."
        : "Are you sure you want to reject this booking? This will notify the guest that their booking has been declined.";
    Alert.alert(actionTitle, actionMessage, [
      { text: "Cancel", style: "cancel" },
      {
        text: action === "confirm" ? "Confirm" : "Reject",
        style: action === "confirm" ? "default" : "destructive",
        onPress: async () => {
          try {
            const token = await tokenStore.getToken();
            if (!token) {
              Alert.alert("Error", "User not authenticated.");
              return;
            }
            const status = action === "confirm" ? "CONFIRMED" : "REJECTED";
            const response = await fetch(
              "http://10.30.22.153:8080/api/bookings/status",
              {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  bookingId: bookingId,
                  status: status,
                }),
              }
            );
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(
                errorData.message || "Failed to update booking status"
              );
            }
            await fetchHostBookings();
            Alert.alert("Success", `Booking ${actionText}ed successfully!`);
          } catch (error) {
            Alert.alert(
              "Error",
              error instanceof Error
                ? error.message
                : "Failed to update booking status."
            );
          }
        },
      },
    ]);
  };

  const filteredBookings = getFilteredBookings();

  return (
    <SafeAreaView style={styles.container}>
      <TodayHeader
        title="Today"
        subtitle={
          activeTab === "pending" ? "Pending bookings" : "Confirmed bookings"
        }
      />
      <TodayTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
          { key: "pending", label: `Pending` },
          { key: "confirmed", label: `Confirmed` },
        ]}
      />
      <TodayBookingList
        bookings={filteredBookings}
        loading={loading}
        error={error}
        onAction={handleBookingAction}
        formatDate={formatDate}
        formatTime={formatTime}
        getBookingTypeIcon={getBookingTypeIcon}
        getBookingTypeColor={getBookingTypeColor}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
});

export default TodayScreen;
