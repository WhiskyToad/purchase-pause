import ItemDisplay from "@/components/layout/ItemDisplay";
import type { PurchaseItem } from "@/types/item.types";
import { View } from "react-native";

type ListScreenProps = {
  items: PurchaseItem[];
};
const ListScreen = (props: ListScreenProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {props.items.map((item) => {
        return <ItemDisplay key={item.id} item={item} />;
      })}
    </View>
  );
};

export default ListScreen;
