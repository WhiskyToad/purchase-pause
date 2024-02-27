import { Text, StyleSheet } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";

type PickerFormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: Record<string, unknown>;
  defaultValue?: PathValue<T, Path<T>>;
  options: { label: string; value: string }[];
};

const PickerFormInput = <T extends FieldValues>({
  control,
  label,
  name,
  rules,
  defaultValue,
  options,
}: PickerFormInputProps<T>) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Controller
        rules={rules}
        control={control}
        render={({ field }) => (
          <Picker selectedValue={field.value} onValueChange={field.onChange}>
            {options.map((option) => {
              return <Picker.Item label={option.label} value={option.value} />;
            })}
          </Picker>
        )}
        name={name}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default PickerFormInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
});
