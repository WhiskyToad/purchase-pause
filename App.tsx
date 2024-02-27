import Header from "@/components/layout/Header";
import { NullStatusItemProvider } from "@/contexts/NullStatusItemsContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { startDb } from "@/database/db";
import ListScreen from "@/screens/ListScreen";
import { useEffect, useState } from "react";

import { SafeAreaView, StyleSheet, View } from "react-native";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    startDb()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error starting database:", error);
      });
  }, [startDb]);

  return (
    <ThemeProvider>
      <NullStatusItemProvider>
        {!isLoading && (
          <SafeAreaView style={styles.container}>
            <Header />
            <View style={styles.contentContainer}>
              <ListScreen />
            </View>
          </SafeAreaView>
        )}
      </NullStatusItemProvider>
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
