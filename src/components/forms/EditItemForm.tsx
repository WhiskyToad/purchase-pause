import { View, Text, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import CustomButton from "../ui/CustomButton";

import CustomTextInput from "../ui/CustomTextInput";
import { useTheme } from "@/contexts/ThemeContext";
import type { PurchaseItem } from "@/types/item.types";
import useEditItemInDb from "@/hooks/useEditItemInDb";

type EditItemFormProps = {
  item: PurchaseItem;
  toggleModal: () => void;
};

export type EditItemFormData = {
  itemName: string;
  description: string;
  cost: string;
  duration: string;
};

const EditItemForm = (props: EditItemFormProps) => {
  const { control, handleSubmit, reset } = useForm<EditItemFormData>({
    defaultValues: {
      itemName: props.item.itemName,
      description: props.item.description,
      cost: props.item.cost.toString(),
    },
  });
  const { theme } = useTheme();
  const { editItemInDb } = useEditItemInDb();

  const onSubmit = async (data: EditItemFormData) => {
    editItemInDb(props.item.id, data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Item Name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            keyboardType="default"
            multiline={false}
          />
        )}
        name="itemName"
        rules={{ required: true }}
      />

      <Text style={[styles.label, { color: theme.textColor }]}>
        Description
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            keyboardType={"default"}
            multiline
          />
        )}
        name="description"
        defaultValue=""
      />

      <Text style={[styles.label, { color: theme.textColor }]}>Cost</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            keyboardType="numeric"
            multiline={false}
          />
        )}
        name="cost"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text style={[styles.label, { color: theme.textColor }]}>
        Duration (in days)
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <CustomTextInput
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            keyboardType="numeric"
            multiline={false}
          />
        )}
        name="duration"
        rules={{ required: true }}
        defaultValue=""
      />

      <View style={styles.buttonsContainer}>
        <CustomButton
          onPress={handleSubmit(onSubmit)}
          variant="primary"
          text="Submit"
        />
        <CustomButton
          onPress={() => {}}
          variant="secondary"
          text="Remove Item"
        />
        <CustomButton
          onPress={props.toggleModal}
          variant="secondary"
          text="Cancel"
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonsContainer: {
    alignItems: "center",
  },
});

export default EditItemForm;
