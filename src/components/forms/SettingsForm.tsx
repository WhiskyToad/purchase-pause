import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "../ui/atoms/CustomButton";
import TextFormInput from "./components/TextFormInput";
import PickerFormInput from "./components/PickerFormInput";
import SwitchFormInput from "./components/SwitchFormInput";

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

      <PickerFormInput
        control={control}
        name={"defaultCurrency"}
        label={"Default Currency"}
        options={[
          { label: "$", value: "$" },
          { label: "€", value: "€" },
          { label: "£", value: "£" },
        ]}
      />

      <TextFormInput
        keyboardType="numeric"
        control={control}
        label={"Default Wait Period (Days)"}
        name="defaultWaitPeriod"
        defaultValue="7"
      />
      <SwitchFormInput
        control={control}
        name={"notificationsEnabled"}
        label={"Enable Notifications"}
      />

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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
});

export default SettingsForm;
