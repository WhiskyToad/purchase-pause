import { useState } from "react";
import { db } from "@/database/db";
import { AddItemFormData } from "@/components/forms/AddItemForm";

const useEditItemInDb = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const editItemInDb = async (itemId: number, newData: AddItemFormData) => {
    setIsLoading(true);
    try {
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `UPDATE PurchaseItem 
            SET itemName = ?, description = ?, cost = ?, duration = ? 
            WHERE id = ?
            `,
            [
              newData.itemName,
              newData.description,
              newData.cost,
              newData.duration,
              itemId,
            ],
            (_, resultSet) => {
              console.log("Item updated successfully");
              setIsLoading(false);
              resolve();
            },
            (_, error) => {
              console.error("Error updating item:", error);
              setIsLoading(false);
              setError("Error updating item");
              reject();
              return false;
            }
          );
        });
      });
      return true;
    } catch (error) {
      console.error("Error editing item in database:", error);
      setIsLoading(false);
      setError("Error editing item in database");
      return false;
    }
  };

  return { editItemInDb, isLoading, error };
};

export default useEditItemInDb;
