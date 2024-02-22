import type { AddItemFormData } from "@/components/forms/AddItemForm";
import { db } from "./db";

export const addItemToDb = (data: AddItemFormData) => {
    return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO PurchaseItem (itemName, description, cost, duration) VALUES (?, ?, ?, ?)`,
          [data.itemName, data.description, data.cost, data.duration],
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