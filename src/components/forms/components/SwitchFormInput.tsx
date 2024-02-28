import React from "react";
import { Text, Switch, StyleSheet, View } from "react-native";
import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  Control,
} from "react-hook-form";
import { labelStyles } from "@/theme/styles";
import { useTheme } from "@/contexts/ThemeContext";

type SwitchFormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  defaultValue?: PathValue<T, Path<T>>;
};

const SwitchFormInput = <T extends FieldValues>({
  control,
  label,
  name,
  defaultValue,
}: SwitchFormInputProps<T>) => {
  const { theme } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={labelStyles.label}>{label}</Text>
      <Controller
        control={control}
        render={({ field }) => (
          <Switch
            key={field.value}
            value={field.value}
            onValueChange={field.onChange}
            trackColor={{ false: "#767577", true: theme.actionButtonColor }}
            thumbColor={field.value ? "#f5dd4b" : "#f4f3f4"}
          />
        )}
        name={name}
        defaultValue={defaultValue}
      />
    </View>
  );
};

export default SwitchFormInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
