import { useTheme } from "@/contexts/ThemeContext";
import { Text, TouchableOpacity } from "react-native";

type Item = {
  name: string;
  cost: number;
  daysLeft: number;
};

type ItemDisplayProps = {
  item: Item;
};

const ItemDisplay = (props: ItemDisplayProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        padding: 10,
        backgroundColor: theme.backgroundColor,
        borderColor: theme.textColor,
        borderWidth: 2,
        borderRadius: 4,
        width: "100%",
      }}
    >
      <Text style={{ color: theme.textColor, fontSize: 16, marginBottom: 5 }}>
        {props.item.name}
      </Text>
      <Text style={{ color: theme.textColor }}>Cost: {props.item.cost}</Text>
      <Text style={{ color: theme.textColor }}>
        Days Left: {props.item.daysLeft}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemDisplay;
