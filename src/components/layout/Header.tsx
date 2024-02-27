import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AddModal from "./modals/AddModal";

type HeaderProps = {
  screen: "current" | "history";
  setScreen: (screen: "current" | "history") => void;
};
const Header = (props: HeaderProps) => {
  const { theme } = useTheme();
  const [isAddVisible, setIsAddVisible] = useState(false);

  const toggleAddModal = () => {
    setIsAddVisible((visible) => !visible);
  };

  const toggleScreen = () => {
    props.setScreen(props.screen === "current" ? `history` : `current`);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.mainColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>My App</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleScreen} style={styles.button}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            {props.screen === "current" ? `Current` : `History`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleAddModal} style={styles.button}>
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
      <AddModal visible={isAddVisible} toggleModal={toggleAddModal} />
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
