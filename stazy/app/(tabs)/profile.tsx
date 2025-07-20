import React from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Platform,
} from "react-native";
import FadeInView from "../../components/cards/FadeInView";
import { useProfileData } from "../../hooks/useProfileData";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileCard from "../../components/profile/ProfileCard";
import FeatureRow from "../../components/profile/FeatureRow";
import HostCard from "../../components/profile/HostCard";
import MenuSection from "../../components/profile/MenuSection";
import SwitchToHostingButton from "../../components/profile/SwitchToHostingButton";

export default function Profile() {
  const {
    user,
    firstName,
    avatarLetter,
    handleSwitchToHosting,
    handleLogout,
    handleViewProfile,
    handleNotifications,
    handleGetHelp,
  } = useProfileData();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F7F7F7",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <FadeInView style={{ flex: 1, paddingTop: 10 }}>
        <ProfileHeader onNotifications={handleNotifications} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ProfileCard
            avatarLetter={avatarLetter}
            firstName={firstName}
            status="Guest"
            onPress={handleViewProfile}
          />
          <FeatureRow onPastTrips={() => {}} onConnections={() => {}} />
          <HostCard onPress={handleSwitchToHosting} />
          <MenuSection
            onViewProfile={handleViewProfile}
            onGetHelp={handleGetHelp}
            onPrivacy={() => {}}
            onLogout={handleLogout}
          />
          <SwitchToHostingButton onPress={handleSwitchToHosting} />
          <View style={{ height: 40 }} />
        </ScrollView>
      </FadeInView>
    </SafeAreaView>
  );
}
