import { useTheme } from "@/contexts/ThemeContext";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
const Header = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.mainColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>My App</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            Add
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Header;
