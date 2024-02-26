import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { startDb } from "@/database/db";
import ListScreen from "@/screens/ListScreen";
import { useEffect } from "react";

import { SafeAreaView, StyleSheet, View } from "react-native";

import useFetchItemsWithNullStatus from "@/hooks/useFetchItemsWithNullStatus";

export default function App() {
  const { fetchData, items } = useFetchItemsWithNullStatus();

  useEffect(() => {
    startDb()
      .then(() => {
        fetchData(); // Fetch data only after the database has been initialized
      })
      .catch((error) => {
        console.error("Error starting database:", error);
      });
  }, [startDb]);

  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <Header fetchData={fetchData} />
        <View style={styles.contentContainer}>
          <ListScreen items={items} />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
