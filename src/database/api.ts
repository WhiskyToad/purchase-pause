import type { AddItemFormData } from "@/components/forms/AddItemForm";
import { db } from "./db";

export const addItemToDb = (data: AddItemFormData) => {
    return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO PurchaseItem (itemName, description, cost, duration, durationLeft) VALUES (?, ?, ?, ?, ?)`,
          [data.itemName, data.description, data.cost, data.duration, data.duration],
          (_, resultSet) => {
            console.log('Item added successfully');
            resolve(true)
          },
          (_, error) => {
            console.error('Error inserting item:', error);
            reject(false)
            return false
          }
        );
      });
    })
}

export const fetchItemsWithNullStatus = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
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
    });
  };
  
  