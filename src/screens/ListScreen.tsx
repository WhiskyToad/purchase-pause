import CustomButton from "@/components/ui/atoms/CustomButton";
import ScrollableContainer from "@/components/ui/atoms/ScrollableContainer";
import Title from "@/components/ui/atoms/Title";
import ItemDisplay from "@/components/ui/molecules/ItemDisplay";
import { useNullStatusItemContext } from "@/contexts/NullStatusItemsContext";
import type { PurchaseItemWithCountdown } from "@/types/item.types";
import { calculateDaysLeft } from "@/utils/utils";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";

export interface ScreenProps {
  toggleScreen: () => void;
}

const ListScreen = (props: ScreenProps) => {
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
    <ScrollableContainer>
      <View style={styles.titleContainer}>
        <Title>Purchase Pauses</Title>
        <CustomButton
          variant="secondary"
          text="History"
          onPress={props.toggleScreen}
        />
      </View>
      {itemsSortedWithCountdown.map((item) => {
        return <ItemDisplay key={item.id} item={item} />;
      })}
    </ScrollableContainer>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
