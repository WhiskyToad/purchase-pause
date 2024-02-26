import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import EditItemModal from "./modals/EditItemModal";

type Item = {
  name: string;
  cost: number;
  daysLeft: number;
};

type ItemDisplayProps = {
  item: Item;
};

const ItemDisplay = (props: ItemDisplayProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => setShowEditModal(true)}
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
      <EditItemModal visibile={showEditModal} />
    </TouchableOpacity>
  );
};

export default ItemDisplay;
