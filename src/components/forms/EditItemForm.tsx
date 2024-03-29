import React from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../ui/atoms/CustomButton";
import { useNullStatusItemContext } from "@/contexts/NullStatusItemsContext";
import useEditItemInDb from "@/hooks/useEditItemInDb";
import useUpdateItemStatus from "@/hooks/useUpdateItemStatus";
import type {
  PurchaseItem,
  PurchaseItemWithCountdown,
} from "@/types/item.types";
import TextFormInput from "./components/TextFormInput";
import Title from "../ui/atoms/Title";
import StackButtonContainer from "../ui/atoms/StackedButtonContainer";
import NumberFormInput from "./components/NumericFormInput";

type EditItemFormProps = {
  item: PurchaseItem | PurchaseItemWithCountdown;
  toggleModal: () => void;
};

type EditItemFormData = {
  itemName: string;
  description: string;
  cost: string;
  duration: string;
};

const EditItemForm = ({ item, toggleModal }: EditItemFormProps) => {
  const { control, handleSubmit } = useForm<EditItemFormData>({
    defaultValues: {
      itemName: item.itemName,
      description: item.description ?? "",
      cost: item.cost.toString(),
      duration: item.duration.toString(),
    },
  });
  const { fetchData } = useNullStatusItemContext();
  const { editItemInDb } = useEditItemInDb();
  const { updateItemStatus } = useUpdateItemStatus();

  const onSubmit = async (data: EditItemFormData) => {
    const editResult = await editItemInDb(item.id, data);
    if (editResult) {
      fetchData();
      toggleModal();
    }
  };

  const markAsNotPurchased = async () => {
    const updateResult = await updateItemStatus(item.id, "not_purchased");
    if (updateResult) {
      fetchData();
      toggleModal();
    }
  };

  return (
    <>
      <Title>Edit Item</Title>
      <TextFormInput
        control={control}
        name="itemName"
        label="Item Name"
        rules={{ required: true }}
      />

      <TextFormInput
        control={control}
        name="description"
        label="Description"
        multiline
      />

      <NumberFormInput
        control={control}
        name="cost"
        label="Cost"
        rules={{ required: true }}
      />

      <NumberFormInput
        control={control}
        name="duration"
        label="Duration (in days)"
        rules={{ required: true }}
      />
      <StackButtonContainer>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          variant="primary"
          text="Submit"
        />
        <CustomButton
          onPress={markAsNotPurchased}
          variant="secondary"
          text="Remove Item"
        />
        <CustomButton onPress={toggleModal} variant="secondary" text="Cancel" />
      </StackButtonContainer>
    </>
  );
};

export default EditItemForm;
