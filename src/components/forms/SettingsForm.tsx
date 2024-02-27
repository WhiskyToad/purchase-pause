import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import CustomTextInput from "../ui/CustomTextInput";
import CustomButton from "../ui/CustomButton";

type SettingsFormProps = {
  toggleModal: () => void;
};
const SettingsForm = (props: SettingsFormProps) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // You can handle form submission here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Default Currency</Text>
        <Controller
          control={control}
          render={({ field }) => (
            <Picker selectedValue={field.value} onValueChange={field.onChange}>
              <Picker.Item label="$" value="$" />
              <Picker.Item label="€" value="€" />
              <Picker.Item label="£" value="£" />
            </Picker>
          )}
          name="defaultCurrency"
          defaultValue="$"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Default Wait Period (Days)</Text>
        <Controller
          control={control}
          render={({ field }) => (
            <CustomTextInput
              value={field.value}
              onChange={field.onChange}
              keyboardType="numeric"
              onBlur={field.onChange}
              multiline={false}
            />
          )}
          name="defaultWaitPeriod"
          defaultValue="7"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Notification Settings</Text>
        <Controller
          control={control}
          render={({ field }) => (
            <Switch value={field.value} onValueChange={field.onChange} />
          )}
          name="notificationsEnabled"
          defaultValue={true}
        />
        <Text>Enable Notifications</Text>
      </View>

      <CustomButton
        onPress={handleSubmit(onSubmit)}
        text={"Save"}
        variant={"primary"}
      />
      <CustomButton
        onPress={props.toggleModal}
        variant={"secondary"}
        text={"Cancel"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
});

export default SettingsForm;
