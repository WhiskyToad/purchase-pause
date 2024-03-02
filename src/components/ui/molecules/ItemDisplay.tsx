import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import EditItemModal from "../../modals/EditItemModal";
import type {
  PurchaseItem,
  PurchaseItemWithCountdown,
} from "@/types/item.types";
import CustomButton from "../atoms/CustomButton";
import useUpdateItemStatus from "@/hooks/useUpdateItemStatus";
import { useNullStatusItemContext } from "@/contexts/NullStatusItemsContext";
import { useSettings } from "@/contexts/SettingsContext";
import Title from "../atoms/Title";

type ItemDisplayProps = {
  item: PurchaseItem | PurchaseItemWithCountdown;
  isHistory?: boolean;
};

const ItemDisplay = (props: ItemDisplayProps) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { theme } = useTheme();
  const { updateItemStatus } = useUpdateItemStatus();
  const { fetchData } = useNullStatusItemContext();
  const { settings } = useSettings();

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
      <View style={styles.topRow}>
        <Title>{props.item.itemName}</Title>
        <View>
          <Text style={{ color: theme.textColor }}>
            Cost: {settings?.defaultCurrency}
            {props.item.cost}
          </Text>
          {"daysLeft" in props.item && (
            <Text
              style={[
                {
                  color: theme.textColor,
                  fontWeight: props.item.daysLeft === 0 ? "bold" : "normal",
                },
              ]}
            >
              Days Left: {props.item.daysLeft}
            </Text>
          )}
        </View>
      </View>
      {props.item.description && <Text>{props.item.description}</Text>}

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
    marginVertical: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
