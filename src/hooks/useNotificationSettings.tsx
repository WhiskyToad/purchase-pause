import { useNullStatusItemContext } from "@/contexts/NullStatusItemsContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useCallback, useEffect } from "react";
import * as Notifications from "expo-notifications";

const useNotificationSettings = () => {
  const { settings } = useSettings();
  const { items: purchaseItems } = useNullStatusItemContext();

  const scheduleNotification = useCallback(async (trigger: object) => {
    try {
      if (!settings) return;

      // Check permission status
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        console.log("Notification permission not granted");
        return;
      }

      // Construct notification content
      const notificationContent = {
        title: "Pause, Reflect, Remember",
        body: `You have ${purchaseItems.length} items on pause`,
      };

      // Schedule the notification
      await Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger,
      });
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  }, []);

  useEffect(() => {
    if (!settings) return;

    const { notificationsFrequency, notificationsEnabled } = settings;

    if (notificationsEnabled) {
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
    } else {
      // Cancel all scheduled notifications if notifications are disabled
      Notifications.cancelAllScheduledNotificationsAsync();
    }
  }, [settings, scheduleNotification]);
};

export default useNotificationSettings;
