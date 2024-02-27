import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@/contexts/ThemeContext";
import CustomButton from "../ui/atoms/CustomButton";
import useAddItemToDb from "@/hooks/useAddItemToDb";
import CustomTextInput from "../ui/atoms/CustomTextInput";
import { useNullStatusItemContext } from "@/contexts/NullStatusItemsContext";

type AddItemFormProps = {
  toggleModal: () => void;
};

export type AddItemFormData = {
  itemName: string;
  description: string;
  cost: string;
  duration: string;
};
const AddItemForm = (props: AddItemFormProps) => {
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
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            keyboardType={"default"}
            multiline={false}
            label={"Item Name"}
          />
        )}
        name="itemName"
        rules={{ required: true }}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            keyboardType={"default"}
            multiline
            label={"Description"}
          />
        )}
        name="description"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            keyboardType="numeric"
            multiline={false}
            label={"Cost"}
          />
        )}
        name="cost"
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            keyboardType="numeric"
            multiline={false}
            label={"Duration (in days)"}
          />
        )}
        name="duration"
        rules={{ required: true }}
        defaultValue=""
      />
      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          variant={"primary"}
          text={"Submit"}
        />
        <CustomButton
          onPress={props.toggleModal}
          variant={"secondary"}
          text={"Cancel"}
        />
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
