import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { startDb } from "@/database/db";
import ListScreen from "@/screens/ListScreen";
import { useEffect, useState } from "react";

import { SafeAreaView, StyleSheet } from "react-native";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startDb().then(() => {
      setIsLoading(false); // Set isLoading to false when startDb finishes
    });
  }, []);

  if (isLoading) return null;
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
