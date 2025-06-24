import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Animated,
  Easing,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useAuth } from "../../hooks/useAuth"; // Ensure your useAuth is properly exported

type Booking = {
  id: string;
  date: string;
  service: string;
  guestName: string;
  // Add other fields if needed
};

export default function CalendarScreen() {
  const { getBookings } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const allBookings = getBookings();
    setBookings(allBookings);

    const marks: Record<string, any> = {};
    allBookings.forEach((booking) => {
      if (!marks[booking.date]) {
        marks[booking.date] = {
          marked: true,
          dots: [{ color: "#FF5A5F" }],
        };
      }
    });

    setMarkedDates(marks);
  }, []);

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const bookingsForSelectedDate = selectedDate
    ? bookings.filter((b) => b.date === selectedDate)
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Calendar</Text>

      <View style={styles.calendarWrapper}>
        <Calendar
          markedDates={{
            ...markedDates,
            ...(selectedDate && {
              [selectedDate]: {
                selected: true,
                selectedColor: "#007AFF",
                marked: markedDates[selectedDate]?.marked,
                dots: markedDates[selectedDate]?.dots,
              },
            }),
          }}
          onDayPress={onDayPress}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#007AFF",
            selectedDayBackgroundColor: "#007AFF",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#007AFF",
            dayTextColor: "#2d4150",
            arrowColor: "#007AFF",
            monthTextColor: "#222",
            indicatorColor: "#007AFF",
            textDayFontWeight: "500",
            textMonthFontWeight: "bold",
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
          style={styles.calendar}
        />
      </View>

      {selectedDate && (
        <Animated.View style={[styles.detailsSection, { opacity: fadeAnim }]}>
          <Text style={styles.subHeader}>
            {bookingsForSelectedDate.length > 0
              ? `Bookings on ${selectedDate}`
              : `No bookings on ${selectedDate}`}
          </Text>

          <FlatList
            data={bookingsForSelectedDate}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.bookingList}
            renderItem={({ item }) => (
              <View style={styles.bookingCard}>
                <Text style={styles.bookingTitle}>{item.service}</Text>
                <Text style={styles.bookingSubtitle}>
                  Guest: {item.guestName}
                </Text>
              </View>
            )}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    paddingHorizontal: 24,
    marginBottom: 16,
    color: "#222",
  },
  calendarWrapper: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  calendar: {
    borderRadius: 16,
  },
  detailsSection: {
    marginTop: 28,
    paddingHorizontal: 24,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    color: "#444",
  },
  bookingList: {
    paddingBottom: 24,
  },
  bookingCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  bookingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
  },
  bookingSubtitle: {
    fontSize: 14,
    color: "#777",
  },
});
