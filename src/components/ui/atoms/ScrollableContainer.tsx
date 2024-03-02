import { ScrollView } from "react-native";

type ScrollableContainerProps = {
  children: React.ReactNode;
};
const ScrollableContainer = (props: ScrollableContainerProps) => {
  return (
    <ScrollView contentContainerStyle={{ paddingTop: 12 }}>
      {props.children}
    </ScrollView>
  );
};

export default ScrollableContainer;
