import ScrollableContainer from "@/components/ui/atoms/ScrollableContainer";
import ItemDisplay from "@/components/ui/molecules/ItemDisplay";
import { useWithStatusItemContext } from "@/contexts/WithStatusItemsContext";

const HistoryScreen = () => {
  const { items } = useWithStatusItemContext();
  return (
    <ScrollableContainer>
      {items.map((item) => {
        return <ItemDisplay key={item.id} item={item} isHistory />;
      })}
    </ScrollableContainer>
  );
};

export default HistoryScreen;
