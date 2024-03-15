import React from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../ui/atoms/CustomButton";
import useAddItemToDb from "@/hooks/useAddItemToDb";
import { useNullStatusItemContext } from "@/contexts/NullStatusItemsContext";
import TextFormInput from "./components/TextFormInput";
import Title from "../ui/atoms/Title";
import { useSettings } from "@/contexts/SettingsContext";
import StackButtonContainer from "../ui/atoms/StackedButtonContainer";

type AddItemFormProps = {
  toggleModal: () => void;
};

export type AddItemFormData = {
  itemName: string;
  description: string;
  cost: string;
  duration: string;
};

const AddItemForm = ({ toggleModal }: AddItemFormProps) => {
  const { control, handleSubmit, reset } = useForm<AddItemFormData>();
  const { addItemToDb } = useAddItemToDb();
  const { fetchData } = useNullStatusItemContext();
  const { settings } = useSettings();

  const onSubmit = async (data: AddItemFormData) => {
    const dbInsert = await addItemToDb(data);
    if (dbInsert) {
      fetchData();
      reset();
      toggleModal();
    }
  };

  return (
    <>
      <Title>Add Item</Title>
      <TextFormInput
        control={control}
        name="itemName"
        label="Item Name"
        rules={{ required: true }}
        defaultValue=""
        placeholder="What do you want to buy?"
      />

      <TextFormInput
        control={control}
        name="description"
        label="Description"
        defaultValue=""
        multiline
        placeholder="Why do you want to buy this?"
      />

      <TextFormInput
        control={control}
        name="cost"
        label="Cost"
        rules={{ required: true }}
        defaultValue=""
        keyboardType="numeric"
        placeholder={settings?.defaultCurrency}
      />

      <TextFormInput
        control={control}
        name="duration"
        label="Duration (in days)"
        rules={{ required: true }}
        defaultValue={settings?.defaultWaitPeriod.toString() ?? ""}
        keyboardType="numeric"
      />
      <StackButtonContainer>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          variant="primary"
          text="Submit"
        />
        <CustomButton onPress={toggleModal} variant="secondary" text="Cancel" />
      </StackButtonContainer>
    </>
  );
};

export default AddItemForm;
