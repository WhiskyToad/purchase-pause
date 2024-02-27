import React from "react";
import SettingsForm from "@/components/forms/SettingsForm";
import BaseModal from "./BaseModal";

type SettingsModalProps = {
  visible: boolean;
  toggleModal: () => void;
};

const SettingsModal = (props: SettingsModalProps) => {
  return (
    <BaseModal visible={props.visible}>
      <SettingsForm toggleModal={props.toggleModal} />
    </BaseModal>
  );
};

export default SettingsModal;
