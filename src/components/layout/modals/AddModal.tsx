import AddItemForm from "@/components/forms/AddItemForm";
import { useTheme } from "@/contexts/ThemeContext";
import { Modal, StyleSheet, View } from "react-native";

type AddModalProps = {
  visible: boolean;
  toggleModal: () => void;
  fetchData: () => void;
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
          <AddItemForm
            toggleModal={props.toggleModal}
            fetchData={props.fetchData}
          />
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
});

export default AddModal;
