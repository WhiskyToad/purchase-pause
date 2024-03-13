import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const useNotificationPermissions = () => {
  useEffect(() => {
    const askForNotificationPermission = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      try {
        if (status === "granted") return;

        if (status !== "undetermined") {
          // Permissions have been denied previously, show a prompt to the user
          // Save in db and ask monthly
          return;
        }

        // On iOS, the user will be prompted automatically when requesting for the first time
        // On Android, we need to request permissions explicitly
        if (Platform.OS === "android") {
          const { status: newStatus } =
            await Notifications.requestPermissionsAsync();
          if (newStatus !== "granted") {
            // Permissions have been denied, handle this case
            return;
          }
        }
      } catch (error) {
        console.error("Error asking for notification permission:", error);
      }
    };
    askForNotificationPermission();
  }, []);

  return null; // This component doesn't render anything
};

export default useNotificationPermissions;
