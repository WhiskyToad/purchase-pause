import Header from "@/components/ui/molecules/Header";
import { NullStatusItemProvider } from "@/contexts/NullStatusItemsContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { WithStatusItemProvider } from "@/contexts/WithStatusItemsContext";
import { startDb } from "@/database/db";
import useNotificationPermissions from "@/hooks/useNotificationPermissions";
import useNotificationSettings from "@/hooks/useNotificationSettings";
import HistoryScreen from "@/screens/HistoryScreen";
import ListScreen from "@/screens/ListScreen";
import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [screen, setScreen] = useState<"current" | "history">("current");

  const { theme } = useTheme();

  const toggleScreen = () => {
    setScreen((currentScreen) =>
      currentScreen === "current" ? "history" : "current"
    );
  };

  useNotificationSettings();
  useNotificationPermissions();

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await startDb();
        setIsLoading(false);
      } catch (error) {
        console.error("Error starting database:", error);
      }
    };

    initializeDatabase();
  }, []);

  if (isLoading) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.mainColorLighter }]}
      >
        <ActivityIndicator size="large" color={theme.mainColor} />
      </View>
    );
  }

  return (
    <SettingsProvider>
      <ThemeProvider>
        <NullStatusItemProvider>
          <WithStatusItemProvider>
            <SafeAreaView
              style={[
                styles.container,
                { backgroundColor: theme.mainColorLighter },
              ]}
            >
              <Header />
              <View style={styles.contentContainer}>
                {screen === "current" && (
                  <ListScreen toggleScreen={toggleScreen} />
                )}
                {screen === "history" && (
                  <HistoryScreen toggleScreen={toggleScreen} />
                )}
              </View>
            </SafeAreaView>
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
