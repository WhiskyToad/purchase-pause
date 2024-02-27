import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EditItemModal from "./modals/EditItemModal";
import type { PurchaseItem } from "@/types/item.types";
import CustomButton from "../ui/CustomButton";
import useUpdateItemStatus from "@/hooks/useUpdateItemStatus";
import { useNullStatusItemContext } from "@/contexts/NullStatusItemsContext";

type ItemDisplayProps = {
  item: PurchaseItem;
  isHistory?: boolean;
};

const ItemDisplay = (props: ItemDisplayProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { theme } = useTheme();
  const { updateItemStatus } = useUpdateItemStatus();
  const { fetchData } = useNullStatusItemContext();

  const toggleModal = () => {
    setShowEditModal(!showEditModal);
  };

  const markAsPurchased = async () => {
    //TODO - have a date picker for this?
    const updateResult = await updateItemStatus(props.item.id, "purchased");
    if (updateResult) {
      fetchData();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundColor,
          borderColor: theme.textColor,
        },
      ]}
    >
      <Text style={{ color: theme.textColor, fontSize: 16, marginBottom: 5 }}>
        {props.item.itemName}
      </Text>
      <Text style={{ color: theme.textColor }}>Cost: {props.item.cost}</Text>
      <Text style={{ color: theme.textColor }}>Days Left: {1}</Text>

      {!Boolean(props.isHistory) && (
        <>
          <CustomButton onPress={toggleModal} variant="primary" text="Edit" />
          <CustomButton
            onPress={markAsPurchased}
            variant="secondary"
            text="Purchased"
          />
        </>
      )}

      {showEditModal && (
        <EditItemModal
          visibile={showEditModal}
          toggleModal={toggleModal}
          item={props.item}
        />
      )}
    </View>
  );
};

export default ItemDisplay;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 4,
    width: "100%",
  },
});
