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
import { addItemToDb } from "@/database/api";

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
  const { control, handleSubmit } = useForm<AddItemFormData>();
  const { theme } = useTheme();

  const onSubmit = async (data: AddItemFormData) => {
    const dbInsert = await addItemToDb(data);
    console.log(dbInsert, "db insert");
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
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={[styles.closeButtonText, { color: theme.accentColor }]}>
            Submit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={props.toggleModal}>
          <Text style={[styles.closeButtonText, { color: theme.accentColor }]}>
            Close
          </Text>
        </TouchableOpacity>
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
