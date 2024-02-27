import React from "react";
import { View, StyleSheet } from "react-native";
import { useForm } from "react-hook-form";
import CustomButton from "../ui/atoms/CustomButton";
import TextFormInput from "./components/TextFormInput";
import PickerFormInput from "./components/PickerFormInput";
import SwitchFormInput from "./components/SwitchFormInput";
import Title from "../ui/atoms/Title";

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
      <Title>Settings</Title>

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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
});

export default SettingsForm;
