import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FadeInView from "../../components/cards/FadeInView";
import { useTripsData } from "../../hooks/useTripsData";
import TripsHeader from "../../components/trips/TripsHeader";
import TripsTabBar from "../../components/trips/TripsTabBar";
import TripsList from "../../components/trips/TripsList";
import TripsEmptyState from "../../components/trips/TripsEmptyState";
import TripsLoading from "../../components/trips/TripsLoading";
import TripsError from "../../components/trips/TripsError";
import TripsModal from "../../components/trips/TripsModal";

export default function TripsScreen() {
  const {
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
    refreshing,
    onRefresh,
  } = useTripsData();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <FadeInView style={{ flex: 1 }}>
        <TripsHeader onAdd={() => {}} />
        <TripsTabBar
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          upcomingCount={upcomingBookings.length}
          pastCount={pastBookings.length}
        />
        {loading ? (
          <TripsLoading />
        ) : error ? (
          <TripsError error={error} onRetry={fetchBookings} />
        ) : currentBookings.length > 0 ? (
          <TripsList
            bookings={currentBookings}
            onOptions={(booking) => {
              setSelectedBooking(booking);
              setModalVisible(true);
            }}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        ) : (
          <TripsEmptyState selectedTab={selectedTab} />
        )}
        <TripsModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onCancel={handleCancelBooking}
          onMessage={handleMessageHost}
        />
      </FadeInView>
    </SafeAreaView>
  );
}
