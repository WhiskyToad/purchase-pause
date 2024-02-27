import React from "react";
import { View, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import { useTheme } from "@/contexts/ThemeContext";
import CustomButton from "../ui/atoms/CustomButton";
import useAddItemToDb from "@/hooks/useAddItemToDb";
import { useNullStatusItemContext } from "@/contexts/NullStatusItemsContext";
import TextFormInput from "./components/TextFormInput";

type AddItemFormProps = {
  toggleModal: () => void;
};

type AddItemFormData = {
  itemName: string;
  description: string;
  cost: string;
  duration: string;
};

const AddItemForm = ({ toggleModal }: AddItemFormProps) => {
  const { control, handleSubmit, reset } = useForm<AddItemFormData>();
  const { theme } = useTheme();
  const { addItemToDb } = useAddItemToDb();
  const { fetchData } = useNullStatusItemContext();

  const onSubmit = async (data: AddItemFormData) => {
    const dbInsert = await addItemToDb(data);
    if (dbInsert) {
      fetchData();
      reset();
    }
  };

  return (
    <View style={styles.container}>
      <TextFormInput
        control={control}
        name="itemName"
        label="Item Name"
        rules={{ required: true }}
        defaultValue=""
      />

      <TextFormInput
        control={control}
        name="description"
        label="Description"
        defaultValue=""
        multiline
      />

      <TextFormInput
        control={control}
        name="cost"
        label="Cost"
        rules={{ required: true }}
        defaultValue=""
        keyboardType="numeric"
      />

      <TextFormInput
        control={control}
        name="duration"
        label="Duration (in days)"
        rules={{ required: true }}
        defaultValue=""
        keyboardType="numeric"
      />

      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          variant="primary"
          text="Submit"
        />
        <CustomButton onPress={toggleModal} variant="secondary" text="Cancel" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  buttonsContainer: {
    alignItems: "center",
  },
});

export default AddItemForm;
