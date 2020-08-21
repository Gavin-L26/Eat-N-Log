import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

export default function FormButton({
  title,
  color = "primary",
  textColor = "secondary",
}) {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      title={title}
      color={color}
      textColor={textColor}
      onPress={handleSubmit}
    />
  );
}
