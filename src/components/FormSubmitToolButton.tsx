import React, {memo, useCallback, useState} from "react";
import {addons, type API} from "storybook/internal/manager-api";
import {IconButton} from "storybook/internal/components";
import {EVENTS, TOOL_ID} from "../constants";
import {FormIcon} from "@storybook/icons";
import { STORY_PREPARED } from 'storybook/internal/core-events';

export const FormSubmitToolButton = memo(function MyAddonSelector({}: { api: API }) {
  let [isEnabled, setEnabled] = useState(false);

  const channel = addons.getChannel();
  const click = useCallback(() => {
    channel.emit(EVENTS.SUBMIT);
  }, []);

  channel.on(EVENTS.FORM_INJECTED, (formId: string) => {
    setEnabled(formId !== null);
  });
  channel.on(STORY_PREPARED, () => {
    setEnabled(false);
  });

  return (
    <IconButton
      key={TOOL_ID}
      disabled={!isEnabled}
      title="Submit form"
      onClick={click}
    >
      <FormIcon />
      Submit
    </IconButton>
  );
});
