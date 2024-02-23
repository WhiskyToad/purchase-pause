import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('test-db.db');

// Execute table creation SQL command
export const startDb = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      db.transaction(
        tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS PurchaseItem (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              itemName TEXT NOT NULL,
              description TEXT,
              cost INTEGER NOT NULL,
              duration INTEGER NOT NULL,
              createdAt TEXT NOT NULL,
              completedAt TEXT,
              status TEXT CHECK (status IN ('purchased', 'not_purchased'))
            );`,
            [],
            () => {
              console.log('Purchase table created successfully');
              resolve(); // Resolve the promise when table creation is successful
            },
            (_, error) => {
              console.error('Error creating Purchase table:', error);
              reject(error); // Reject the promise if there's an error
              return true; // Return true to rollback the transaction
            }
          );
        },
        error => {
          console.error('Transaction error:', error);
          reject(error); // Reject the promise if there's a transaction error
        }
      );
    });
  };
  