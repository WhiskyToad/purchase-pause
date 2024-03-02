import CustomTextInput from "@/components/ui/atoms/CustomTextInput";
import {
  Controller,
  Control,
  FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";
import type { KeyboardTypeOptions } from "react-native";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  rules?: Record<string, unknown>;
  defaultValue?: PathValue<T, Path<T>>;
  keyboardType?: KeyboardTypeOptions;
  multiline?: boolean;
  placeholder?: string;
};

const TextFormInput = <T extends FieldValues>({
  control,
  name,
  label,
  rules,
  defaultValue,
  keyboardType = "default",
  multiline = false,
  placeholder,
}: FormInputProps<T>) => {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <CustomTextInput
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          keyboardType={keyboardType}
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

export default TextFormInput;
