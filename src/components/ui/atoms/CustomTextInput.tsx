import { useTheme } from "@/contexts/ThemeContext";
import { labelStyles } from "@/theme/styles";
import {
  StyleSheet,
  Text,
  TextInput,
  type KeyboardTypeOptions,
} from "react-native";

type CustomTextInputProps = {
  onBlur: () => void;
  onChange: () => void;
  value: string;
  keyboardType: KeyboardTypeOptions;
  multiline: boolean;
  label: string;
  placeholder?: string;
};
const CustomTextInput = (props: CustomTextInputProps) => {
  const { theme } = useTheme();
  return (
    <>
      <Text style={labelStyles.label}>{props.label}</Text>
      <TextInput
        style={[styles.input, { borderColor: theme.mainColor }]}
        onBlur={props.onBlur}
        onChangeText={props.onChange}
        value={props.value}
        keyboardType={props.keyboardType}
        multiline={props.multiline}
        placeholder={props.placeholder}
        returnKeyType="done"
      />
    </>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
});
