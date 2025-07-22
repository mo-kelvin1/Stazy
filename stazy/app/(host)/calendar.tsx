import React, { useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { SimulatedTokenStore } from "../../services/SimulatedTokenStore";
import CalendarHeader from "../../components/host/calendar/CalendarHeader";
import CalendarBookingModal from "../../components/host/calendar/CalendarBookingModal";
import CalendarLoading from "../../components/host/calendar/CalendarLoading";

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

interface MarkedDates {
  [date: string]: {
    marked: boolean;
    dotColor: string;
  };
}

const CalendarScreen = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDateBookings, setSelectedDateBookings] = useState<Booking[]>(
    []
  );
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHostBookings();
  }, []);

  const fetchHostBookings = async () => {
    try {
      const token = await tokenStore.getToken();
      if (!token) return;
      const response = await fetch(
        "http://10.30.22.161:8080/api/bookings/host-bookings",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const bookingsData = await response.json();
      setBookings(bookingsData);
      createMarkedDates(bookingsData);
    } catch (error) {
      setBookings([]);
      setMarkedDates({});
    } finally {
      setLoading(false);
    }
  };

  const createMarkedDates = (bookingsData: Booking[]) => {
    const marked: MarkedDates = {};
    bookingsData.forEach((booking) => {
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        const dateString = currentDate.toISOString().split("T")[0];
        marked[dateString] = {
          marked: true,
          dotColor: "#007AFF",
        };
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    setMarkedDates(marked);
  };

  const onDayPress = (day: DateData) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    const dateBookings = bookings.filter((booking) => {
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      const selectedDate = new Date(dateString);
      return selectedDate >= startDate && selectedDate <= endDate;
    });
    setSelectedDateBookings(dateBookings);
    setShowBookingModal(true);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <CalendarLoading />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        Platform.OS === "android" && { paddingTop: StatusBar.currentHeight },
      ]}
    >
      <CalendarHeader />
      <Calendar
        style={styles.calendar}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          selectedDayBackgroundColor: "#007AFF",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#007AFF",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          dotColor: "#007AFF",
          selectedDotColor: "#ffffff",
          arrowColor: "#007AFF",
          monthTextColor: "#2d4150",
          indicatorColor: "#007AFF",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 13,
        }}
        markedDates={markedDates}
        onDayPress={onDayPress}
        markingType="dot"
      />
      <CalendarBookingModal
        visible={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        selectedDate={selectedDate}
        bookings={selectedDateBookings}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  calendar: {
    marginBottom: 20,
  },
});

export default CalendarScreen;
