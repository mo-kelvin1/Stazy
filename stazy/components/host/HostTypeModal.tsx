import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HostTypeModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectType: (type: string) => void;
  selectedType: string | null;
}

const options = [
  { key: "home", label: "Home", emoji: "🏠" },
  { key: "experience", label: "Experience", emoji: "🎈" },
  { key: "service", label: "Service", emoji: "🛎️" },
];

const HostTypeModal: React.FC<HostTypeModalProps> = ({
  visible,
  onClose,
  onSelectType,
  selectedType,
}) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View style={styles.overlay}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>What would you like to host?</Text>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[
              styles.option,
              selectedType === opt.key && styles.selectedOption,
            ]}
            onPress={() => onSelectType(opt.key)}
            activeOpacity={0.8}
          >
            <Text style={styles.optionLabel}>{opt.label}</Text>
            <Text style={styles.emoji}>{opt.emoji}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.nextBtn, !selectedType && styles.nextBtnDisabled]}
          disabled={!selectedType}
        >
          <Text style={styles.nextBtnText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  closeBtn: {
    position: "absolute",
    top: 18,
    right: 18,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 32,
    marginTop: 8,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 24,
    marginBottom: 18,
    width: 320,
    maxWidth: "100%",
    borderWidth: 1,
    borderColor: "#eee",
  },
  selectedOption: {
    borderColor: "#222",
    backgroundColor: "#f0f0f0",
  },
  optionLabel: {
    fontSize: 18,
    color: "#222",
    fontWeight: "500",
  },
  emoji: {
    fontSize: 36,
    marginLeft: 12,
  },
  nextBtn: {
    backgroundColor: "#eee",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
    width: 320,
    maxWidth: "100%",
  },
  nextBtnDisabled: {
    backgroundColor: "#f5f5f5",
  },
  nextBtnText: {
    color: "#bbb",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HostTypeModal;
