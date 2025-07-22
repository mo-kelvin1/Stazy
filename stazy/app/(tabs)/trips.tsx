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
import { useLocalSearchParams } from "expo-router";

export default function TripsScreen() {
  const params = useLocalSearchParams();
  const initialTab = typeof params.tab === "string" ? params.tab : undefined;
  const {
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
  } = useTripsData();

  // Set initial tab from query param
  React.useEffect(() => {
    if (initialTab && (initialTab === "upcoming" || initialTab === "past")) {
      setSelectedTab(initialTab);
    }
    // Only run on mount or when initialTab changes
  }, [initialTab]);

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
            onCancelBooking={handleCancelBooking}
            onMessageHost={handleMessageHost}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        ) : (
          <TripsEmptyState selectedTab={selectedTab} />
        )}
      </FadeInView>
    </SafeAreaView>
  );
}
