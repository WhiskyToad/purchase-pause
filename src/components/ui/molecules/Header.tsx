import AddModal from "@/components/modals/AddModal";
import SettingsModal from "@/components/modals/SettingsModal";
import { useTheme } from "@/contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type HeaderProps = {
  screen: "current" | "history";
  setScreen: (screen: "current" | "history") => void;
};
const Header = (props: HeaderProps) => {
  const { theme } = useTheme();
  const [isAddVisible, setIsAddVisible] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const toggleAddModal = () => {
    setIsAddVisible((visible) => !visible);
  };

  const toggleSettingModal = () => {
    setIsSettingsVisible(!isSettingsVisible);
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
            {props.screen === "current" ? `History` : `Current`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleAddModal} style={styles.button}>
          <MaterialCommunityIcons
            name="plus"
            size={24}
            color={theme.textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleSettingModal} style={styles.button}>
          <MaterialCommunityIcons
            name="cog"
            size={24}
            color={theme.textColor}
          />
        </TouchableOpacity>
      </View>
      {isAddVisible && (
        <AddModal visible={isAddVisible} toggleModal={toggleAddModal} />
      )}
      <SettingsModal
        visible={isSettingsVisible}
        toggleModal={toggleSettingModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 16,
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
