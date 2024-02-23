import { fetchItemsWithNullStatus } from "@/database/api";
import { useCallback, useEffect } from "react";
import { Text } from "react-native";

const ListScreen = () => {
  //TODO - put into a hook
  const fetchData = useCallback(async () => {
    try {
      const items = await fetchItemsWithNullStatus();
      console.log("Items with null status:", items);
      return items;
    } catch (error) {
      console.error("Error fetching items with null status:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <Text>ListScreen</Text>;
};

export default ListScreen;
