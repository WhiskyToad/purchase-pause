import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../database/db";

export type SettingsData = {
  defaultCurrency: string;
  defaultWaitPeriod: number;
  notificationsEnabled: boolean;
  notificationsFrequency: string;
};

type SettingsContextType = {
  settings: SettingsData | null;
  isLoading: boolean;
  fetchSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  isLoading: true,
  fetchSettings: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      await new Promise<void>((resolve, reject) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              `SELECT * FROM Settings`,
              [],
              (_, resultSet) => {
                const rows = resultSet.rows;
                if (rows.length > 0) {
                  const settingsData: SettingsData = {
                    defaultCurrency: rows.item(0).defaultCurrency,
                    defaultWaitPeriod: rows.item(0).defaultWaitPeriod,
                    notificationsEnabled: !!rows.item(0).notificationsEnabled,
                    notificationsFrequency: rows.item(0).notificationsFrequency,
                  };
                  setSettings(settingsData);
                }
                setIsLoading(false);
                resolve();
              },
              (_, error) => {
                console.error("Error fetching settings:", error);
                setIsLoading(false);
                reject();
                return true;
              }
            );
          },
          (error) => {
            console.error("Transaction error:", error);
            setIsLoading(false);
            reject(error);
          }
        );
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, isLoading, fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
