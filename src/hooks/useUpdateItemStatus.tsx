import { useState } from "react";
import { db } from "@/database/db";
import { useWithStatusItemContext } from "@/contexts/WithStatusItemsContext";

const useUpdateItemStatus = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchData } = useWithStatusItemContext();

  const updateItemStatus = async (
    itemId: number,
    newStatus: "purchased" | "not_purchased"
  ) => {
    setIsLoading(true);
    try {
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `UPDATE PurchaseItem 
            SET status = ?, completedAt = ? 
            WHERE id = ?
            `,
            [newStatus, new Date().toISOString(), itemId],
            (_, resultSet) => {
              console.log("Item status updated successfully");
              setIsLoading(false);
              resolve();
            },
            (_, error) => {
              console.error("Error updating item status:", error);
              setIsLoading(false);
              setError("Error updating item status");
              reject();
              return false;
            }
          );
        });
      });
      fetchData();
      return true;
    } catch (error) {
      console.error("Error updating item status in database:", error);
      setIsLoading(false);
      setError("Error updating item status in database");
      return false;
    }
  };

  return { updateItemStatus, isLoading, error };
};

export default useUpdateItemStatus;
