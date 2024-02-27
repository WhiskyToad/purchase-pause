import ItemDisplay from "@/components/layout/ItemDisplay";
import { useNullStatusItemContext } from "@/contexts/NullStatusItemsContext";
import type {
  PurchaseItem,
  PurchaseItemWithCountdown,
} from "@/types/item.types";
import { calculateDaysLeft } from "@/utils/utils";
import { useMemo } from "react";
import { View } from "react-native";

const ListScreen = () => {
  const { items } = useNullStatusItemContext();

  const itemsSortedWithCountdown = useMemo(() => {
    const itemsWithCountdown: PurchaseItemWithCountdown[] = items.map(
      (item) => ({
        ...item,
        daysLeft: calculateDaysLeft(item),
      })
    );
    // Sort the items based on days left
    itemsWithCountdown.sort((a, b) => a.daysLeft - b.daysLeft);
    return itemsWithCountdown;
  }, [items]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {itemsSortedWithCountdown.map((item) => {
        return <ItemDisplay key={item.id} item={item} />;
      })}
    </View>
  );
};

export default ListScreen;
