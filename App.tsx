import Header from "@/components/ui/molecules/Header";
import { NullStatusItemProvider } from "@/contexts/NullStatusItemsContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { WithStatusItemProvider } from "@/contexts/WithStatusItemsContext";
import { startDb } from "@/database/db";
import HistoryScreen from "@/screens/HistoryScreen";
import ListScreen from "@/screens/ListScreen";
import { useEffect, useState } from "react";

import { SafeAreaView, StyleSheet, View } from "react-native";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [screen, setScreen] = useState<"current" | "history">("current");
  const { theme } = useTheme();
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
    <SettingsProvider>
      <ThemeProvider>
        <NullStatusItemProvider>
          <WithStatusItemProvider>
            {!isLoading && (
              <SafeAreaView
                style={[
                  styles.container,
                  { backgroundColor: theme.mainColorLighter },
                ]}
              >
                <Header screen={screen} setScreen={setScreen} />
                <View style={styles.contentContainer}>
                  {screen === "current" && <ListScreen />}
                  {screen === "history" && <HistoryScreen />}
                </View>
              </SafeAreaView>
            )}
          </WithStatusItemProvider>
        </NullStatusItemProvider>
      </ThemeProvider>
    </SettingsProvider>
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
