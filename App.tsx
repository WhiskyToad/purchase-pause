import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ListScreen from "@/screens/ListScreen";

import { SafeAreaView, StyleSheet } from "react-native";

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <ListScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
