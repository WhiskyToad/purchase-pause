import type { SettingFormData } from "@/components/forms/SettingsForm";
import { db } from "@/database/db";

export const useSetSettings = () => {
  const updateSettings = async (formData: SettingFormData) => {
    try {
      await new Promise<void>((resolve, reject) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              `
                INSERT OR REPLACE INTO Settings (
                  defaultCurrency, 
                  defaultWaitPeriod, 
                  notificationsEnabled, 
                  notificationsFrequency
                ) VALUES (?, ?, ?, ?)
              `,
              [
                formData.defaultCurrency,
                formData.defaultWaitPeriod,
                formData.notificationsEnabled ? 1 : 0,
                formData.notificationsFrequency,
              ],
              (_, resultSet) => {
                console.log("Settings updated successfully");
                resolve(); // Resolve with true for successful update
              },
              (_, error) => {
                console.error("Error updating settings:", error);
                reject();
                return true; // Return true to rollback the transaction
              }
            );
          },
          (error) => {
            console.error("Transaction error:", error);
            reject(error); // Reject the promise if there's a transaction error
          }
        );
      });
      return true;
    } catch (error) {
      console.error("Error updating settings:", error);
      return false; // Return false for any other errors
    }
  };

  return { updateSettings };
};
