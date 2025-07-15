import { useState, useEffect } from "react";
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
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Listen for tab refresh
    const interval = setInterval(() => {
      if (
        globalThis.tabRefreshKeys &&
        globalThis.tabRefreshKeys.trips !== undefined
      ) {
        setRefreshKey(globalThis.tabRefreshKeys.trips);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [refreshKey]);

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

  const today = new Date();
  const upcomingBookings = bookings.filter((booking) => {
    const startDate = new Date(booking.startDate);
    return startDate > today;
  });
  const pastBookings = bookings.filter((booking) => {
    const endDate = new Date(booking.endDate);
    return endDate < today;
  });
  const currentBookings = selectedTab === "upcoming" ? upcomingBookings : pastBookings;

  const handleCancelBooking = async () => {
    if (!selectedBooking) return;
    try {
      setLoading(true);
      const token = await tokenStore.getToken();
      const res = await fetch(
        `http://10.30.22.153:8080/api/bookings/${selectedBooking.id}`,
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
        setModalVisible(false);
        setSelectedBooking(null);
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

  const handleMessageHost = () => {
    if (!selectedBooking) return;
    setModalVisible(false);
    router.push({
      pathname: "/(tabs)/messages",
      params: {
        hostEmail: selectedBooking.hostEmail,
        hostName: selectedBooking.entityTitle,
        hostId: selectedBooking.hostId,
      },
    });
  };

  return {
    selectedTab,
    setSelectedTab,
    bookings,
    loading,
    error,
    modalVisible,
    setModalVisible,
    selectedBooking,
    setSelectedBooking,
    fetchBookings,
    handleCancelBooking,
    handleMessageHost,
    upcomingBookings,
    pastBookings,
    currentBookings,
  };
} 