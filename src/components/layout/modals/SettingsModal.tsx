import { View, Text, Modal } from "react-native";
import React from "react";
import CustomButton from "@/components/ui/CustomButton";

type SettingsModalProps = {
  visible: boolean;
  toggleModal: () => void;
};

const SettingsModal = (props: SettingsModalProps) => {
  return (
    <Modal visible={props.visible}>
      <Text>SettingsModal</Text>

      <CustomButton
        onPress={props.toggleModal}
        variant={"secondary"}
        text={"Cancel"}
      />
    </Modal>
  );
};

export default SettingsModal;
