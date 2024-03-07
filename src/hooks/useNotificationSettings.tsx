import { useNullStatusItemContext } from "@/contexts/NullStatusItemsContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useEffect } from "react";

const useNotificationSettings = () => {
  const { settings } = useSettings();
  const { items: purchaseItems } = useNullStatusItemContext();

  useEffect(() => {
    if (!settings) return;
    const { notificationsEnabled, notificationsFrequency } = settings;

    if (notificationsEnabled) {
      if (notificationsFrequency === "daily") {
        const currentDate = new Date();

        // Filter purchase items that are not completed and were created more than 24 hours ago
        const eligibleItems = purchaseItems.filter(
          (item) =>
            !item.completedAt &&
            currentDate.getTime() - new Date(item.createdAt).getTime() >=
              24 * 60 * 60 * 1000
        );

        console.log(
          `Trigger daily notification for items: ${eligibleItems.length}`
        );
        // Your notification logic here...
      } else if (notificationsFrequency === "weekly") {
        // Logic for triggering weekly notifications
        console.log("Trigger weekly notification");
      }
    }
  }, [settings]);
};

export default useNotificationSettings;
