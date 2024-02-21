import { useTheme } from "@/contexts/ThemeContext";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AddModalProps = {
  visible: boolean;
  toggleModal: () => void;
};

const AddModal = (props: AddModalProps) => {
  const { theme } = useTheme();

  return (
    <Modal visible={props.visible} animationType="slide" transparent>
      <View
        style={[
          styles.modalContainer,
          { backgroundColor: theme.backgroundColor },
        ]}
      >
        <View
          style={[styles.modalContent, { backgroundColor: theme.mainColor }]}
        >
          <Text style={[styles.modalText, { color: theme.textColor }]}>
            This is a modal
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={props.toggleModal}
          >
            <Text
              style={[styles.closeButtonText, { color: theme.accentColor }]}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default AddModal;
