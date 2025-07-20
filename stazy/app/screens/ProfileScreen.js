import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import ProfileHeader from '../../components/profile/ProfileHeader.js';
import ProfileAvatar from '../../components/profile/ProfileAvatar';
import ProfileSection from '../../components/profile/ProfileSection';
import CancelButton from '../../components/profile/CancelButton';
import { router } from 'expo-router';

const ProfileScreen = () => {
  const { user } = useAuth();
  const { updateProfile } = useAuth();
  const { refreshUserData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || null,
    lastName: user?.lastName || null,
    dateOfBirth: user?.dateOfBirth || null,
    email: user?.email || null,
    phoneNumber: user?.phoneNumber || null,
    address: user?.address || null,
  });

  const [tempData, setTempData] = useState({ ...profileData });

  const handleEdit = async () => {
    if (isEditing) {
      setProfileData({ ...tempData });
      const result = await updateProfile(tempData.firstName, tempData.lastName, tempData.phoneNumber, tempData.address, tempData.dateOfBirth);
      if(result.success){
        Alert.alert('Success', 'Your profile has been updated successfully!');
        refreshUserData();
      }else{
        Alert.alert('Error', result.message);
      }
    } else {
      setTempData({ ...profileData });
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleBack = () => {
    refreshUserData();
    router.back();
  };

  const handleCameraPress = () => {
    // Add image picker logic here
    console.log('Open camera/image picker');
  };

  const updateTempData = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getInitials = () => {
    if (user?.initials) {
      return user.initials.toUpperCase();
    }
    const firstName = user?.firstName || profileData.firstName;
    const lastName = user?.lastName || profileData.lastName;
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    return 'U';
  };

  const getDisplayName = () => {
    const firstName = tempData.firstName || user?.firstName;
    const lastName = tempData.lastName || user?.lastName;
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    return user?.name || 'User Name';
  };

  // Section data configuration
  const basicInfoItems = [
    {
      label: 'First name',
      value: isEditing ? tempData.firstName : profileData.firstName,
      field: 'firstName',
    },
    {
      label: 'Last name',
      value: isEditing ? tempData.lastName : profileData.lastName,
      field: 'lastName',
    },
    {
      label: 'Date of birth',
      value: isEditing ? tempData.dateOfBirth : profileData.dateOfBirth,
      field: 'dateOfBirth',
    },
  ];

  const contactInfoItems = [
    {
      label: 'Email address',
      value: isEditing ? tempData.email : profileData.email,
      field: 'email',
      keyboardType: 'email-address',
    },
    {
      label: 'Phone number',
      value: isEditing ? tempData.phoneNumber : profileData.phoneNumber,
      field: 'phoneNumber',
      keyboardType: 'phone-pad',
    },
    {
      label: 'Address',
      value: isEditing ? tempData.address : profileData.address,
      field: 'address',
    },
  ];

  return (
    <View style={styles.container}>
      <ProfileHeader
        isEditing={isEditing}
        onEdit={handleEdit}
        onBack={handleBack}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <ProfileAvatar
          initials={getInitials()}
          name={getDisplayName()}
          onCameraPress={handleCameraPress}
        />

        <ProfileSection
          title="Basic Information"
          items={basicInfoItems}
          isEditing={isEditing}
          onFieldChange={updateTempData}
        />

        <ProfileSection
          title="Contact Information"
          items={contactInfoItems}
          isEditing={isEditing}
          onFieldChange={updateTempData}
        />
        <CancelButton
          visible={isEditing}
          onPress={handleCancel}
        />
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    flex: 1,
    paddingBottom: 60,
  },
});

export default ProfileScreen;