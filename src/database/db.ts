import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('test-db.db');

const createPurchaseTable = (): Promise<void> => {
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
            resolve();
          },
          (_, error) => {
            console.error('Error creating Purchase table:', error);
            reject(error);
            return true;
          }
        );
      },
      error => {
        console.error('Transaction error:', error);
        reject(error);
      }
    );
  });
};

const createSettingsTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      async (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            defaultCurrency TEXT NOT NULL,
            defaultWaitPeriod INTEGER NOT NULL,
            notificationsEnabled INTEGER NOT NULL,
            notificationsFrequency TEXT NOT NULL
          );`,
          [],
          async () => {
            console.log('Settings table created successfully');
            const isEmpty = await checkSettingsTableIsEmpty();
            if (isEmpty) {
              await seedSettingsTable();
            }
            resolve();
          },
          (_, error) => {
            console.error('Error creating Settings table:', error);
            reject(error);
            return true;
          }
        );
      },
      (error) => {
        console.error('Transaction error:', error);
        reject(error);
      }
    );
  });
};

const checkSettingsTableIsEmpty = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `SELECT COUNT(*) FROM Settings`,
          [],
          (_, resultSet) => {
            const count = resultSet.rows.item(0)['COUNT(*)'];
            resolve(count === 0);
          },
          (_, error) => {
            console.error('Error checking Settings table:', error);
            reject(error);
            return true;
          }
        );
      },
      (error) => {
        console.error('Transaction error:', error);
        reject(error);
      }
    );
  });
};

export const seedSettingsTable = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          `INSERT INTO Settings (defaultCurrency, defaultWaitPeriod, notificationsEnabled, notificationsFrequency)
          VALUES (?, ?, ?, ?)`,
          ['$', 4, 0, 'daily'], // Default values
          () => {
            console.log('Settings table seeded successfully');
            resolve();
          },
          (_, error) => {
            console.error('Error seeding Settings table:', error);
            reject(error);
            return true;
          }
        );
      },
      (error) => {
        console.error('Transaction error:', error);
        reject(error);
      }
    );
  });
};

export const startDb = async (): Promise<void> => {
  try {
    await createPurchaseTable();
    await createSettingsTable();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};
