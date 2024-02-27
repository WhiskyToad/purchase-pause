import { Modal } from "react-native";
import React from "react";
import SettingsForm from "@/components/forms/SettingsForm";

type SettingsModalProps = {
  visible: boolean;
  toggleModal: () => void;
};

const SettingsModal = (props: SettingsModalProps) => {
  return (
    <Modal visible={props.visible}>
      <SettingsForm toggleModal={props.toggleModal} />
    </Modal>
  );
};

export default SettingsModal;
