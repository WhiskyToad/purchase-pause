import ItemDisplay from "@/components/layout/ItemDisplay";
import { View } from "react-native";

type ListScreenProps = {
  items: any[];
};
const ListScreen = (props: ListScreenProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {props.items.map((item) => {
        return <ItemDisplay item={item} />;
      })}
    </View>
  );
};

export default ListScreen;
