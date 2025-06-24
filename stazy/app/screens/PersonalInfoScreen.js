import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth"; // Adjust path as needed
import AppHeader from "../../components/shared/AppHeader";
import ProfileSection from "../../components/PersonalInfo/ProfileSection";
import SectionHeader from "../../components/PersonalInfo/SectionHeader";
import InfoItem from "../../components/PersonalInfo/InfoItem";
import GovernmentIdItem from "../../components/PersonalInfo/GovernmentIdItem";
import AdditionalMenuItem from "../../components/PersonalInfo/AdditionalMenuItem";
import EditControls from "../../components/PersonalInfo/EditControls";
import * as ImagePicker from "expo-image-picker";

const PersonalInfoScreen = () => {
  const navigation = useNavigation();
  const { user, refreshUserData, updateUser, isAuthenticated } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated || !user) {
    Alert.alert("Error", "User not authenticated");
    navigation.goBack();
    return null;
  }

  // Initialize state with user data from useAuth hook
  const [userInfo, setUserInfo] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phone: user.phoneNumber || "",
    dateOfBirth: user.dateOfBirth || "",
    address: user.address || "",
    emergencyContact: user.emergencyContact || "",
    preferredLanguage: "English", // Default value as it's not in User interface
    currency: "GHS", // Default value as it's not in User interface
    profilePicture: null, // Default value as it's not in User interface
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(userInfo);

  // Update local state when user data changes from useAuth hook
  useEffect(() => {
    if (user) {
      const updatedUserInfo = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        dateOfBirth: user.dateOfBirth || "",
        address: user.address || "",
        emergencyContact: user.emergencyContact || "",
        preferredLanguage: userInfo.preferredLanguage, // Keep existing preference
        currency: userInfo.currency, // Keep existing preference
        profilePicture: userInfo.profilePicture, // Keep existing profile picture
      };
      setUserInfo(updatedUserInfo);
      setEditedInfo(updatedUserInfo);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      // Prepare the data to update (map local field names to User interface)
      const updateData = {
        firstName: editedInfo.firstName,
        lastName: editedInfo.lastName,
        email: editedInfo.email,
        phoneNumber: editedInfo.phone, // Map phone to phoneNumber
        dateOfBirth: editedInfo.dateOfBirth,
        address: editedInfo.address,
        emergencyContact: editedInfo.emergencyContact,
        // Note: preferredLanguage, currency, and profilePicture are not part of User interface
        // You might want to extend the User interface to include these fields
      };

      // Call the updateUser method from useAuth hook
      const result = await updateUser(updateData);

      if (result.success) {
        setUserInfo(editedInfo);
        setIsEditing(false);
        
        // Refresh user data from the hook to ensure sync
        await refreshUserData();
        
        Alert.alert("Success", result.message || "Personal information updated successfully!");
      } else {
        Alert.alert("Error", result.message || "Failed to update personal information.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      Alert.alert("Error", "Failed to update personal information. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditedInfo(userInfo);
    setIsEditing(false);
  };

  const handleValueChange = (key, value) => {
    setEditedInfo({ ...editedInfo, [key]: value });
  };

  const handleCameraPress = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission denied", "You need to give permission to access photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      const uri = result.assets ? result.assets[0].uri : result.uri;
      const updated = { ...editedInfo, profilePicture: uri };
      setEditedInfo(updated);
      if (!isEditing) {
        setUserInfo(updated);
      }
    }
  };

  const handleGovernmentIdPress = () => {
    // Navigate to government ID screen
    // navigation.navigate('GovernmentIdScreen');
  };

  const handleIdentityVerification = () => {
    // Navigate to identity verification
    // navigation.navigate('IdentityVerificationScreen');
  };

  const handlePrivacySettings = () => {
    // Navigate to privacy settings
    // navigation.navigate('PrivacySettingsScreen');
  };

  const rightComponent = (
    <TouchableOpacity
      onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
    >
      <Text style={styles.editButton}>{isEditing ? "Save" : "Edit"}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <AppHeader
        title="Personal information"
        onBackPress={() => navigation.goBack()}
        rightComponent={rightComponent}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ProfileSection
          firstName={userInfo.firstName}
          lastName={userInfo.lastName}
          onCameraPress={handleCameraPress}
          profileImageUri={isEditing ? editedInfo.profilePicture : userInfo.profilePicture}
        />

        <SectionHeader title="Basic Information" />
        <View style={styles.section}>
          <InfoItem
            label="First name"
            value={isEditing ? editedInfo.firstName : userInfo.firstName}
            keyName="firstName"
            isEditing={isEditing}
            onValueChange={handleValueChange}
          />
          <InfoItem
            label="Last name"
            value={isEditing ? editedInfo.lastName : userInfo.lastName}
            keyName="lastName"
            isEditing={isEditing}
            onValueChange={handleValueChange}
          />
          <InfoItem
            label="Date of birth"
            value={isEditing ? editedInfo.dateOfBirth : userInfo.dateOfBirth}
            keyName="dateOfBirth"
            isEditing={isEditing}
            onValueChange={handleValueChange}
          />
        </View>

        <SectionHeader title="Contact Information" />
        <View style={styles.section}>
          <InfoItem
            label="Email address"
            value={isEditing ? editedInfo.email : userInfo.email}
            keyName="email"
            isEditing={isEditing}
            onValueChange={handleValueChange}
          />
          <InfoItem
            label="Phone number"
            value={isEditing ? editedInfo.phone : userInfo.phone}
            keyName="phone"
            isEditing={isEditing}
            onValueChange={handleValueChange}
          />
          <InfoItem
            label="Address"
            value={isEditing ? editedInfo.address : userInfo.address}
            keyName="address"
            isEditing={isEditing}
            onValueChange={handleValueChange}
          />
        </View>

        <SectionHeader title="Emergency Contact" />
        <View style={styles.section}>
          <InfoItem
            label="Emergency contact"
            value={isEditing ? editedInfo.emergencyContact : userInfo.emergencyContact}
            keyName="emergencyContact"
            isEditing={isEditing}
            onValueChange={handleValueChange}
          />
        </View>

        <SectionHeader title="Preferences" />
        <View style={styles.section}>
          <InfoItem
            label="Preferred language"
            value={isEditing ? editedInfo.preferredLanguage : userInfo.preferredLanguage}
            keyName="preferredLanguage"
            isEditing={isEditing}
            onValueChange={handleValueChange}
          />
          <InfoItem
            label="Currency"
            value={isEditing ? editedInfo.currency : userInfo.currency}
            keyName="currency"
            isEditing={isEditing}
            onValueChange={handleValueChange}
          />
        </View>

        <SectionHeader title="Government ID" />
        <View style={styles.section}>
          <GovernmentIdItem onPress={handleGovernmentIdPress} />
        </View>

        <View style={styles.additionalSection}>
          <AdditionalMenuItem
            icon="shield-checkmark-outline"
            title="Identity verification"
            onPress={handleIdentityVerification}
          />
          <AdditionalMenuItem
            icon="eye-outline"
            title="Privacy settings"
            onPress={handlePrivacySettings}
          />
        </View>

        <EditControls
          isEditing={isEditing}
          onSave={handleSave}
          onCancel={handleCancel}
          onEdit={() => setIsEditing(true)}
        />

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginBottom: 1,
  },
  additionalSection: {
    marginTop: 20,
  },
  editButton: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007AFF",
  },
  bottomPadding: {
    height: 30,
  },
});

export default PersonalInfoScreen;