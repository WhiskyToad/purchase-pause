import AddItemForm from "@/components/forms/AddItemForm";
import BaseModal from "./BaseModal";

type AddModalProps = {
  visible: boolean;
  toggleModal: () => void;
};

const AddModal = (props: AddModalProps) => {
  return (
    <BaseModal visible={props.visible}>
      <AddItemForm toggleModal={props.toggleModal} />
    </BaseModal>
  );
};

export default AddModal;
