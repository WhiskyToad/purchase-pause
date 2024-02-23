import { useState } from "react";
import { db } from "@/database/db";
import type { AddItemFormData } from "@/components/forms/AddItemForm";

const useAddItemToDb = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addItemToDb = async (data: AddItemFormData) => {
    setIsLoading(true);
    try {
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            `INSERT INTO PurchaseItem (itemName, description, cost, duration, createdAt, completedAt, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
              data.itemName,
              data.description,
              data.cost,
              data.duration,
              new Date().toISOString(),
              null,
              null,
            ],
            (_, resultSet) => {
              console.log("Item added successfully");
              setIsLoading(false);
              resolve();
            },
            (_, error) => {
              console.error("Error inserting item:", error);
              setIsLoading(false);
              setError("Error inserting item");
              reject();
              return false;
            }
          );
        });
      });
      return true;
    } catch (error) {
      console.error("Error adding item to database:", error);
      setIsLoading(false);
      setError("Error adding item to database");
      return false;
    }
  };

  return { addItemToDb, isLoading, error };
};

export default useAddItemToDb;
