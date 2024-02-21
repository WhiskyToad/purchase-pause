import { ThemeProvider } from "@/contexts/ThemeContext";
import ListScreen from "@/screens/ListScreen";

import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <ListScreen />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
