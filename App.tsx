import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { startDb } from "@/database/db";
import ListScreen from "@/screens/ListScreen";
import { useEffect, useState } from "react";

import { SafeAreaView, StyleSheet } from "react-native";

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
        <ListScreen items={items} />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
