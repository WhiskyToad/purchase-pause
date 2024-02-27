import EditItemForm from "@/components/forms/EditItemForm";

import type {
  PurchaseItem,
  PurchaseItemWithCountdown,
} from "@/types/item.types";
import BaseModal from "./BaseModal";

type EditItemModalProps = {
  visibile: boolean;
  toggleModal: () => void;
  item: PurchaseItem | PurchaseItemWithCountdown;
};

const EditItemModal = (props: EditItemModalProps) => {
  return (
    <BaseModal visible={props.visibile}>
      <EditItemForm toggleModal={props.toggleModal} item={props.item} />
    </BaseModal>
  );
};

export default EditItemModal;
