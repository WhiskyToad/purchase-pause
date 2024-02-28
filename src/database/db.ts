import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('test-db.db');

// Execute table creation SQL command
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
      tx => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS Settings (
            id INTEGER PRIMARY KEY,
            defaultCurrency TEXT NOT NULL,
            defaultWaitPeriod INTEGER NOT NULL,
            notificationsEnabled INTEGER NOT NULL,
            notificationsFrequency TEXT NOT NULL
          );`,
          [],
          async () => {
            console.log('Settings table created successfully');
            const isEmpty = await checkSettingsTableIsEmpty(tx);
            if (isEmpty) {
              await seedSettingsTable(tx);
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
      error => {
        console.error('Transaction error:', error);
        reject(error);
      }
    );
  });
};

const checkSettingsTableIsEmpty = (tx: SQLite.SQLTransaction): Promise<boolean> => {
  return new Promise((resolve, reject) => {
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
  });
};

const seedSettingsTable = (tx: SQLite.SQLTransaction): Promise<void> => {
  return new Promise((resolve, reject) => {
    tx.executeSql(
      `INSERT INTO Settings (defaultCurrency, defaultWaitPeriod, notificationsEnabled, notificationsFrequency) VALUES (?, ?, ?, ?)`,
      ['$','4',0,'daily'], // Default values
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
