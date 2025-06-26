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
    marginHorizontal: 16,
    marginVertical: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default CancelButton;