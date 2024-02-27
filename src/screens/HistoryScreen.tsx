import ItemDisplay from "@/components/ui/molecules/ItemDisplay";
import { useWithStatusItemContext } from "@/contexts/WithStatusItemsContext";
import { View } from "react-native";

const HistoryScreen = () => {
  const { items } = useWithStatusItemContext();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 8,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {items.map((item) => {
        return <ItemDisplay key={item.id} item={item} isHistory />;
      })}
    </View>
  );
};

export default HistoryScreen;
