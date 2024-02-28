import type { SettingFormData } from "@/components/forms/SettingsForm";
import { db } from "@/database/db";

export const useSetSettings = () => {
  const updateSettings = async (
    formData: SettingFormData
  ): Promise<boolean> => {
    try {
      return await new Promise<boolean>((resolve, reject) => {
        db.transaction(
          (tx) => {
            const query = `
                INSERT OR REPLACE INTO Settings (
                  defaultCurrency, 
                  defaultWaitPeriod, 
                  notificationsEnabled, 
                  notificationsFrequency
                ) VALUES (?, ?, ?, ?)
              `;
            const params = [
              formData.defaultCurrency,
              formData.defaultWaitPeriod,
              formData.notificationsEnabled ? 1 : 0,
              formData.notificationsFrequency,
            ];
            tx.executeSql(
              query,
              params,
              (_, resultSet) => {
                console.log("Settings updated successfully");
                resolve(true); // Resolve with true for successful update
              },
              (_, error) => {
                console.error("Error updating settings:", error);
                resolve(false); // Resolve with false for unsuccessful update
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
    } catch (error) {
      console.error("Error updating settings:", error);
      return false; // Return false for any other errors
    }
  };

  return { updateSettings };
};
