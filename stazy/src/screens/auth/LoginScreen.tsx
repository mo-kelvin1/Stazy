// screens/LoginScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { RootStackParamList } from './types';

const COUNTRIES = [
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'Canada', code: '+1' },
  { name: 'Ghana', code: '+233' },
  { name: 'Kenya', code: '+254' },
  { name: 'Saudi Arabia', code: '+966' },
  { name: 'Singapore', code: '+65' },
  { name: 'China', code: '+86' },
  { name: 'Germany', code: '+49' },
  { name: 'France', code: '+33' },
  { name: 'Nigeria', code: '+234' },
  { name: 'India', code: '+91' },
  { name: 'South Africa', code: '+27' },
  { name: 'Brazil', code: '+55' },
  { name: 'Mexico', code: '+52' },
  { name: 'Japan', code: '+81' },
  { name: 'South Korea', code: '+82' },
  { name: 'Australia', code: '+61' },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const socialButtons = [
  {
    name: 'Continue with email',
    icon: <MaterialIcons name="email" size={24} color="black" />,
  },
  {
    name: 'Continue with Apple',
    icon: <FontAwesome name="apple" size={24} color="black" />,
  },
  {
    name: 'Continue with Google',
    icon: <AntDesign name="google" size={24} color="#DB4437" />, // red part of Google color
  },
  {
    name: 'Continue with Facebook',
    icon: <FontAwesome name="facebook-square" size={24} color="#1877F2" />,
  },
];

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[3]); // Default Ghana
  const [modalVisible, setModalVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleContinue = () => {
    if (!phoneNumber.trim()) return;
    navigation.navigate('Otp', {
      phoneNumber: `${selectedCountry.code}${phoneNumber}`,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Log in or sign up</Text>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.dropdown}
      >
        <Text style={styles.dropdownText}>
          {selectedCountry.name} ({selectedCountry.code})
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Phone number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <Text style={styles.infoText}>
        We'll call or text you to confirm your number. Standard message and data
        rates apply.
      </Text>

      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or</Text>
        <View style={styles.divider} />
      </View>

      {socialButtons.map(({ name, icon }, index) => (
        <TouchableOpacity key={index} style={styles.socialBtn}>
          <View style={styles.socialBtnContent}>
            {icon}
            <Text style={styles.socialText}>{name}</Text>
          </View>
        </TouchableOpacity>
      ))}

<Modal visible={modalVisible} animationType="slide">
  <SafeAreaView style={styles.modalSafeArea}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Country/Region</Text>
      <FlatList
        data={COUNTRIES}
        keyExtractor={(item) => `${item.name}-${item.code}`}
        renderItem={({ item }) => (
          <Pressable
            style={styles.countryItem}
            onPress={() => {
              setSelectedCountry(item);
              setModalVisible(false);
            }}
          >
            <Text>
              {item.name} ({item.code})
            </Text>
          </Pressable>
        )}
      />
    </View>
  </SafeAreaView>
</Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  dropdownText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
  },
  infoText: {
    fontSize: 12,
    color: '#777',
    marginBottom: 16,
  },
  continueBtn: {
    backgroundColor: '#e91e63',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
  },
  socialBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  socialBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialText: {
    fontSize: 16,
    marginLeft: 12,
  },
  modalSafeArea: {
  flex: 1,
  backgroundColor: '#fff',
},
modalContent: {
  flex: 1,
  paddingHorizontal: 24,
  paddingTop: 12,
},
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  countryItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default LoginScreen;
