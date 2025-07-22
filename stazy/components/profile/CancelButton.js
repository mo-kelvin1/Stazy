import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CancelButton = ({ onPress, visible }) => {
  if (!visible) return null;
  
  return (
    <TouchableOpacity style={styles.cancelButton} onPress={onPress}>
      <Text style={styles.cancelButtonText}>Cancel</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cancelButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 30,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default CancelButton;