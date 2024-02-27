import ItemDisplay from "@/components/layout/ItemDisplay";
import { useNullStatusItemContext } from "@/contexts/NullStatusItemsContext";
import type { PurchaseItem } from "@/types/item.types";
import { View } from "react-native";

const ListScreen = () => {
  const { items } = useNullStatusItemContext();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {items.map((item) => {
        return <ItemDisplay key={item.id} item={item} />;
      })}
    </View>
  );
};

export default ListScreen;
