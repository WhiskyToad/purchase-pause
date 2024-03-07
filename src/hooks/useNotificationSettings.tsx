import { useSettings } from "@/contexts/SettingsContext";
import { useEffect } from "react";

const useNotificationSettings = () => {
  const { settings } = useSettings();

  useEffect(() => {
    if (!settings) return;
    const { notificationsEnabled, notificationsFrequency } = settings;

    if (notificationsEnabled) {
      if (notificationsFrequency === "daily") {
        // Logic for triggering daily notifications
        console.log("Trigger daily notification");
      } else if (notificationsFrequency === "weekly") {
        // Logic for triggering weekly notifications
        console.log("Trigger weekly notification");
      }
    }
  }, [settings]);
};

export default useNotificationSettings;
