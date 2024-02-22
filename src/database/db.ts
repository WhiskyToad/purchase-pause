import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('test-db.db');

// Execute table creation SQL command
export const startDb = () => 
{db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS PurchaseItem (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        itemName TEXT NOT NULL,
        description TEXT,
        cost REAL NOT NULL,
        duration INTEGER NOT NULL
      );`,
      [],
      () => {
        console.log('Purchase table created successfully');
      },
      (_, error) => {
        console.error('Error creating Purchase table:', error);
        return true; // Return true to rollback the transaction
      }
    );
  })}