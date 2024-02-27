import ItemDisplay from "@/components/layout/ItemDisplay";
import { useWithStatusItemContext } from "@/contexts/WithStatusItemsContext";
import { View } from "react-native";

const HistoryScreen = () => {
  const { items } = useWithStatusItemContext();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {items.map((item) => {
        return <ItemDisplay key={item.id} item={item} isHistory />;
      })}
    </View>
  );
};

export default HistoryScreen;
