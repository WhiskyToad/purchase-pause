import type { SettingsFormData } from "@/components/forms/SettingsForm";
import { db } from "@/database/db";

interface UpdateSettingsData extends SettingsFormData {
  id: number;
}

export const useSetSettings = () => {
  const updateSettings = async (formData: UpdateSettingsData) => {
    try {
      await new Promise<void>((resolve, reject) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              `UPDATE Settings 
              SET defaultCurrency = ?, defaultWaitPeriod = ?, notificationsEnabled = ?, notificationsFrequency = ?
              WHERE id = ?
              `,
              [
                formData.defaultCurrency,
                formData.defaultWaitPeriod,
                formData.notificationsEnabled ? 1 : 0,
                formData.notificationsFrequency,
                formData.id,
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
