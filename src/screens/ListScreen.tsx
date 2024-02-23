import useFetchItemsWithNullStatus from "@/hooks/useFetchItemsWithNullStatus";
import { useEffect } from "react";
import { Text } from "react-native";

const ListScreen = () => {
  const { fetchData, items } = useFetchItemsWithNullStatus();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <Text>ListScreen</Text>;
};

export default ListScreen;
