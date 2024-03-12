import { useNullStatusItemContext } from "@/contexts/NullStatusItemsContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useCallback, useEffect, useMemo } from "react";
import * as Notifications from "expo-notifications";

const useNotificationSettings = () => {
  const { settings } = useSettings();
  const { items: purchaseItems } = useNullStatusItemContext();

  const eligibleItems = useMemo(() => {
    const currentDate = new Date();
    purchaseItems.filter(
      (item) =>
        !item.completedAt &&
        currentDate.getTime() - new Date(item.createdAt).getTime() >=
          24 * 60 * 60 * 1000
    );
  }, [purchaseItems]);
  const scheduleNotification = useCallback(async (trigger: object) => {
    try {
      if (!settings) return;
      const { notificationsEnabled } = settings;

      if (notificationsEnabled) {
        // Check permission status
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== "granted") {
          console.log("Notification permission not granted");
          return;
        }

        // Construct notification content
        const notificationContent = {
          title: "Pause, Reflect, Remember",
          body: `You have ${eligibleItems} items on pause`,
        };

        // Schedule the notification
        await Notifications.scheduleNotificationAsync({
          content: notificationContent,
          trigger,
        });
      }
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  }, []);

  useEffect(() => {
    if (!settings) return;

    const { notificationsFrequency } = settings;

    if (notificationsFrequency === "daily") {
      scheduleNotification({
        hour: 10,
        minute: 30,
        repeats: true,
      });
    } else if (notificationsFrequency === "weekly") {
      scheduleNotification({
        weekday: 1, // Monday
        hour: 10, // Adjust this to the desired time for the weekly notification
        minute: 30,
        repeats: true, // Set to true for weekly repetition
      });
    }
  }, [settings, scheduleNotification]);
};

export default useNotificationSettings;
