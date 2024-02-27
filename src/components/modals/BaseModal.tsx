import { Modal, StyleSheet, View } from "react-native";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

type BaseModalProps = {
  visible: boolean;
  children: React.ReactNode;
};

const BaseModal = (props: BaseModalProps) => {
  const { theme } = useTheme();
  return (
    <Modal visible={props.visible} animationType="slide" transparent>
      <View style={[modalStyles.modalContainer]}>
        <View
          style={[
            modalStyles.modalContent,
            { backgroundColor: theme.mainColor },
          ]}
        >
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

export default BaseModal;

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  modalContent: {
    width: "80%",
    padding: 40,
    borderRadius: 10,
    elevation: 5,
  },
});
