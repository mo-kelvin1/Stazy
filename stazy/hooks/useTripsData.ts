import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { SimulatedTokenStore } from "../services/SimulatedTokenStore";
import {
  createRefreshBookingsAction,
  Booking,
} from "../context/actions/refreshBookings";

const tokenStore = new SimulatedTokenStore();
const refreshBookings = createRefreshBookingsAction(tokenStore);

export function useTripsData() {
  const [selectedTab, setSelectedTab] = useState("upcoming");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await refreshBookings();
      if (result.success && result.bookings) {
        setBookings(result.bookings);
      } else {
        setError(result.message || "Failed to fetch bookings");
      }
    } catch (err) {
      setError("An error occurred while fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchBookings();
    setRefreshing(false);
  }, []);

  const today = new Date();
  const upcomingBookings = bookings.filter((booking) => {
    const startDate = new Date(booking.startDate);
    return startDate > today;
  });
  const pastBookings = bookings.filter((booking) => {
    const endDate = new Date(booking.endDate);
    return endDate < today;
  });
  const currentBookings =
    selectedTab === "upcoming" ? upcomingBookings : pastBookings;

  const handleCancelBooking = async (booking: Booking) => {
    if (!booking) return;
    try {
      setLoading(true);
      const token = await tokenStore.getToken();
      const res = await fetch(
        `http://10.132.119.88:8080/api/bookings/${booking.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        Alert.alert("Booking deleted");
        fetchBookings();
      } else {
        let data = {};
        try {
          data = await res.json();
        } catch (jsonErr) {
          // ignore
        }
        Alert.alert(
          "Error",
          (data as any).message || "Failed to delete booking"
        );
      }
    } catch (e) {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMessageHost = (booking: Booking) => {
    if (!booking) return;
    router.push({
      pathname: "/(tabs)/messages",
      params: {
        hostEmail: booking.hostEmail,
        hostName: booking.entityTitle,
        hostId: booking.hostId,
      },
    });
  };

  return {
    selectedTab,
    setSelectedTab,
    bookings,
    loading,
    error,
    fetchBookings,
    handleCancelBooking,
    handleMessageHost,
    upcomingBookings,
    pastBookings,
    currentBookings,
    refreshing,
    onRefresh,
  };
}
