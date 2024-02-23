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
import CustomButton from "../ui/CustomButton";
import useAddItemToDb from "@/hooks/useAddItemToDb";

type AddItemFormProps = {
  toggleModal: () => void;
  fetchData: () => void;
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

  const onSubmit = async (data: AddItemFormData) => {
    const dbInsert = await addItemToDb(data);
    if (dbInsert) {
      props.fetchData();
      reset();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.textColor }]}>Item Name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, { borderColor: theme.mainColor }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="itemName"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text style={[styles.label, { color: theme.textColor }]}>
        Description
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, { borderColor: theme.mainColor }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
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
          <TextInput
            style={[styles.input, { borderColor: theme.mainColor }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
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
          <TextInput
            style={[styles.input, { borderColor: theme.mainColor }]}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
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
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 16,
  },
  buttonsContainer: {
    alignItems: "center",
  },
  button: {
    marginTop: 10,
  },
});

export default AddItemForm;
