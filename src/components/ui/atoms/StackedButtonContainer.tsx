import React from "react";
import { View, StyleSheet } from "react-native";

const StackButtonContainer = ({ children }: { children: React.ReactNode }) => {
  const childrenArray = React.Children.toArray(children);
  return (
    <View style={styles.container}>
      {childrenArray.map((child, index) => (
        <View key={index} style={styles.child}>
          {child}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: "column",
    alignItems: "stretch",
  },
  child: {
    marginBottom: 12,
  },
});

export default StackButtonContainer;
