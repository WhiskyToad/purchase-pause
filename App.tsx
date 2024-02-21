import ListScreen from "@/screens/ListScreen";

import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <ListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
