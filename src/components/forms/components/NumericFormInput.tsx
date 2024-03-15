import CustomTextInput from "@/components/ui/atoms/CustomTextInput";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { KeyboardTypeOptions } from "react-native";

type NumberFormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: Record<string, unknown>;
  defaultValue?: PathValue<T, Path<T>>;
  multiline?: boolean;
  placeholder?: string;
};

const NumberFormInput = <T extends FieldValues>({
  control,
  name,
  label,
  rules,
  defaultValue,
  multiline = false,
  placeholder,
}: NumberFormInputProps<T>) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <CustomTextInput
          onBlur={onBlur}
          onChange={(text) => {
            // Remove non-numeric characters before updating the value
            const newValue = text.replace(/[^0-9]/g, "");
            onChange(newValue);
          }}
          value={value}
          keyboardType="numeric"
          multiline={multiline}
          label={label}
          placeholder={placeholder}
        />
      )}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
    />
  );
};

export default NumberFormInput;
