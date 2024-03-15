import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../ui/atoms/CustomButton";
import TextFormInput from "./components/TextFormInput";
import PickerFormInput from "./components/PickerFormInput";
import SwitchFormInput from "./components/SwitchFormInput";
import Title from "../ui/atoms/Title";
import { useSetSettings } from "@/hooks/useSetSettings";
import { useSettings } from "@/contexts/SettingsContext";
import { seedSettingsTable } from "@/database/db";
import StackButtonContainer from "../ui/atoms/StackedButtonContainer";

type SettingsFormProps = {
  toggleModal: () => void;
};

export interface SettingsFormData {
  defaultCurrency: string;
  defaultWaitPeriod: string;
  notificationsEnabled: boolean;
  notificationsFrequency: string;
}
const SettingsForm = (props: SettingsFormProps) => {
  const { settings, fetchSettings } = useSettings();
  const { control, handleSubmit, setValue } = useForm<SettingsFormData>();
  const { updateSettings } = useSetSettings();

  useEffect(() => {
    if (settings) {
      setValue("defaultCurrency", settings.defaultCurrency);
      setValue("defaultWaitPeriod", settings.defaultWaitPeriod.toString());
      setValue("notificationsEnabled", settings.notificationsEnabled);
      setValue("notificationsFrequency", settings.notificationsFrequency);
    }
  }, [settings, setValue]);

  useEffect(() => {
    fetchSettings();
  }, []);

  const onSubmit = async (data: SettingsFormData) => {
    const updateResult = await updateSettings({
      ...data,
      id: settings?.id || 1,
    });
    if (updateResult) {
      fetchSettings();
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
      />

      <TextFormInput
        keyboardType="numeric"
        control={control}
        label={"Default Wait Period (Days)"}
        name="defaultWaitPeriod"
      />
      <Title>Notifications</Title>
      <SwitchFormInput
        control={control}
        name={"notificationsEnabled"}
        label={"Enable Notifications"}
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
      />
      <StackButtonContainer>
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
      </StackButtonContainer>
    </>
  );
};

export default SettingsForm;
