import React from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../ui/atoms/CustomButton";
import TextFormInput from "./components/TextFormInput";
import PickerFormInput from "./components/PickerFormInput";
import SwitchFormInput from "./components/SwitchFormInput";
import Title from "../ui/atoms/Title";
import { useSetSettings } from "@/hooks/useSetSettings";

type SettingsFormProps = {
  toggleModal: () => void;
};

export type SettingFormData = {
  defaultCurrency: string;
  defaultWaitPeriod: string;
  notificationsEnabled: boolean;
  notificationsFrequency: string;
};
const SettingsForm = (props: SettingsFormProps) => {
  const { control, handleSubmit } = useForm<SettingFormData>();
  const { updateSettings } = useSetSettings();

  const onSubmit = async (data: SettingFormData) => {
    const updateResult = await updateSettings(data);
    if (updateResult) {
      props.toggleModal();
    }
  };

  return (
    <>
      <Title>Preferences</Title>

      <PickerFormInput
        control={control}
        name={"defaultCurrency"}
        label={"Default Currency"}
        options={[
          { label: "$", value: "$" },
          { label: "€", value: "€" },
          { label: "£", value: "£" },
        ]}
        defaultValue={"$"}
      />

      <TextFormInput
        keyboardType="numeric"
        control={control}
        label={"Default Wait Period (Days)"}
        name="defaultWaitPeriod"
        defaultValue="4"
      />
      <Title>Notifications</Title>
      <SwitchFormInput
        control={control}
        name={"notificationsEnabled"}
        label={"Enable Notifications"}
        defaultValue={false}
      />
      <PickerFormInput
        control={control}
        name={"notificationsFrequency"}
        label={"Notification Frequency"}
        options={[
          { label: "Daily", value: "daily" },
          { label: "Weekly", value: "weekly" },
          { label: "When countdown is 0", value: "countdownZero" },
        ]}
        defaultValue={"daily"}
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
    </>
  );
};

export default SettingsForm;
