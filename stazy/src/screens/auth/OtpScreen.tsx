import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Otp'>;

const OtpScreen: React.FC<Props> = ({ route, navigation }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    if (otp.length < 6) {
      Alert.alert('Invalid OTP', 'Please enter the 6-digit code.');
      return;
    }
    // TODO: Verify OTP logic here, then navigate forward
    Alert.alert('Success', 'OTP Verified!');
    // navigation.navigate('NextScreen');
  };

  const handleResend = () => {
    // TODO: trigger resend OTP logic
    Alert.alert('Resent', `OTP has been resent to ${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your phone</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to</Text>
      <Text style={styles.phoneNumber}>{phoneNumber}</Text>

      <TextInput
        style={styles.otpInput}
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        placeholder="______"
        placeholderTextColor="#ccc"
      />

      <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
        <Text style={styles.verifyBtnText}>Verify</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResend} style={styles.resendBtn}>
        <Text style={styles.resendBtnText}>Resend code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#444', textAlign: 'center' },
  phoneNumber: { fontSize: 18, fontWeight: '500', textAlign: 'center', marginVertical: 16 },
  otpInput: {
    fontSize: 24,
    letterSpacing: 12,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 24,
  },
  verifyBtn: {
    backgroundColor: '#FF385C', // Airbnb pink-red
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  verifyBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  resendBtn: {
    marginTop: 16,
    alignItems: 'center',
  },
  resendBtnText: {
    color: '#FF385C',
    fontSize: 16,
  },
});

export default OtpScreen;
