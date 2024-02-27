import { Text, StyleSheet } from "react-native";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <Text style={styles.header}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
