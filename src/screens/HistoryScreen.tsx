import CustomButton from "@/components/ui/atoms/CustomButton";
import ScrollableContainer from "@/components/ui/atoms/ScrollableContainer";
import Title from "@/components/ui/atoms/Title";
import ItemDisplay from "@/components/ui/molecules/ItemDisplay";
import { useWithStatusItemContext } from "@/contexts/WithStatusItemsContext";
import { StyleSheet, View } from "react-native";
import { ScreenProps } from "./ListScreen";

const HistoryScreen = (props: ScreenProps) => {
  const { items } = useWithStatusItemContext();
  return (
    <ScrollableContainer>
      <View style={styles.titleContainer}>
        <Title>Purchase History</Title>
        <CustomButton
          variant="secondary"
          text="Current"
          onPress={props.toggleScreen}
        />
      </View>
      {items.map((item) => {
        return <ItemDisplay key={item.id} item={item} isHistory />;
      })}
    </ScrollableContainer>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});
