import { db } from "@/database/db";
import type { PurchaseItem } from "@/types/item.types";
import { useCallback, useState } from "react";

const useFetchItemsWithNullStatus = () => {
  const [items, setItems] = useState<PurchaseItem[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const fetchedItems = await new Promise<PurchaseItem[]>(
        (resolve, reject) => {
          db.transaction((tx) => {
            tx.executeSql(
              `SELECT * FROM PurchaseItem WHERE status IS NULL`,
              [],
              (_, resultSet) => {
                const items: any[] = [];
                for (let i = 0; i < resultSet.rows.length; i++) {
                  items.push(resultSet.rows.item(i));
                }
                resolve(items);
              },
              (_, error) => {
                reject(error);
                return false;
              }
            );
          });
        }
      );
      console.log("Items with null status:", fetchedItems);
      setItems(fetchedItems); // Update state with fetched items
    } catch (error) {
      console.error("Error fetching items with null status:", error);
    }
  }, []);

  return { fetchData, items };
};

export default useFetchItemsWithNullStatus;
