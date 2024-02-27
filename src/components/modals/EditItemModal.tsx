import EditItemForm from "@/components/forms/EditItemForm";
import type {
  PurchaseItem,
  PurchaseItemWithCountdown,
} from "@/types/item.types";
import { Modal } from "react-native";

type EditItemModalProps = {
  visibile: boolean;
  toggleModal: () => void;
  item: PurchaseItem | PurchaseItemWithCountdown;
};

const EditItemModal = (props: EditItemModalProps) => {
  return (
    <Modal visible={props.visibile}>
      <EditItemForm toggleModal={props.toggleModal} item={props.item} />
    </Modal>
  );
};

export default EditItemModal;
