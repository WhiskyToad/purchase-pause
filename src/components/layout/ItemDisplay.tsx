import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import EditItemModal from "./modals/EditItemModal";
import type { PurchaseItem } from "@/types/item.types";

type ItemDisplayProps = {
  item: PurchaseItem;
};

const ItemDisplay = (props: ItemDisplayProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { theme } = useTheme();

  const toggleModal = () => {
    setShowEditModal(!showEditModal);
  };

  return (
    <TouchableOpacity
      onPress={toggleModal}
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
        {props.item.itemName}
      </Text>
      <Text style={{ color: theme.textColor }}>Cost: {props.item.cost}</Text>
      <Text style={{ color: theme.textColor }}>Days Left: {1}</Text>
      <EditItemModal
        visibile={showEditModal}
        toggleModal={toggleModal}
        item={props.item}
      />
    </TouchableOpacity>
  );
};

export default ItemDisplay;
