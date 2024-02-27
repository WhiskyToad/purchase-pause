import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { PurchaseItem } from "@/types/item.types";
import { db } from "@/database/db";

type NullStatusItemContextType = {
  items: PurchaseItem[];
  setItems: (items: PurchaseItem[]) => void;
  fetchData: () => void;
};

const NullStatusItemContext = createContext<NullStatusItemContextType>({
  items: [],
  setItems: () => {},
  fetchData: () => {},
});

export const useNullStatusItemContext = () => useContext(NullStatusItemContext);

type ItemProviderProps = {
  children: ReactNode;
};

export const NullStatusItemProvider = ({ children }: ItemProviderProps) => {
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
      setItems(fetchedItems); // Update state with fetched items
    } catch (error) {
      console.error("Error fetching items with null status:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const value: NullStatusItemContextType = { items, setItems, fetchData };

  return (
    <NullStatusItemContext.Provider value={value}>
      {children}
    </NullStatusItemContext.Provider>
  );
};
