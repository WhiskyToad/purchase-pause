import { Modal } from "react-native";

type EditItemModalProps = {
  visibile: boolean;
};

const EditItemModal = (props: EditItemModalProps) => {
  return <Modal visible={props.visibile}></Modal>;
};

export default EditItemModal;
