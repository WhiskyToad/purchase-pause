import { useTheme } from "@/contexts/ThemeContext";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type CustomButtonProps = {
  variant: "primary" | "secondary";
  onPress: () => void;
  text: string;
};
const CustomButton = (props: CustomButtonProps) => {
  const { theme } = useTheme();
  // Define button variants
  const buttonVariants = {
    primary: {
      backgroundColor: theme.mainColorLighter,
      textColor: theme.textColor,
    },
    secondary: {
      backgroundColor: theme.actionButtonColor,
      textColor: theme.textColor,
    },
    // Add more variants as needed
  };

  const { backgroundColor, textColor } =
    buttonVariants[props.variant] || buttonVariants.primary; // Default to primary variant

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={props.onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{props.text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default CustomButton;
