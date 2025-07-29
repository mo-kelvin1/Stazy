import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  Platform,
  StatusBar,
  Modal,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import TodayHeader from "../../components/host/today/TodayHeader";
import TodayTabs from "../../components/host/today/TodayTabs";
import TodayBookingList from "../../components/host/today/TodayBookingList";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import { useRouter } from "expo-router";

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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"pending" | "confirmed">(
    "pending"
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
        "http://172.20.10.2:8080/api/bookings/host-bookings",
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
              "http://172.20.10.2:8080/api/bookings/status",
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

  const handleBookingPress = (booking: Booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const handleMessageUser = () => {
    if (selectedBooking && selectedBooking.userEmail) {
      setModalVisible(false);
      setSelectedBooking(null);
      router.push({
        pathname: "/(host)/messages",
        params: { user: selectedBooking.userEmail },
      });
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBooking(null);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHostBookings();
    setRefreshing(false);
  };

  const filteredBookings = getFilteredBookings();

  return (
    <SafeAreaView
      style={[
        styles.container,
        Platform.OS === "android" && { paddingTop: StatusBar.currentHeight },
      ]}
    >
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
        onBookingPress={handleBookingPress}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 20,
              width: 320,
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
            >
              Booking Options
            </Text>
            {selectedBooking && (
              <Text
                style={{ marginBottom: 16, color: "#444", textAlign: "center" }}
              >
                Guest: {selectedBooking.userFirstName || ""}{" "}
                {selectedBooking.userLastName || ""}
                {"\n"}Email: {selectedBooking.userEmail || "N/A"}
              </Text>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: "#007AFF",
                padding: 12,
                borderRadius: 8,
                width: "100%",
                alignItems: "center",
                marginBottom: 12,
              }}
              onPress={handleMessageUser}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                Message User
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={{ marginTop: 8 }}
            >
              <Text style={{ color: "#007AFF" }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
