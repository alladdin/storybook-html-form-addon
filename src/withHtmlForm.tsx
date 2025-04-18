import React, {ReactNode} from "react";
import {makeDecorator, addons} from 'storybook/internal/preview-api';
import {EVENTS, PARAM_KEY} from "./constants";

export const withHtmlForm = makeDecorator({
  name: 'withHtmlForm',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context) => {
    const randomId = Math.random().toString(36).replace('0.', '');
    const formId = `form-${randomId}`;
    const channel = addons.getChannel();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const result: {name: string, value: string}[] = [];
      formData.forEach((value, key: string) => {
        result.push({ name: key, value: value.toString() });
      });
      channel.emit(EVENTS.SUBMIT_RESULT, result);
    }

    channel.removeAllListeners(EVENTS.SUBMIT);
    channel.on(EVENTS.SUBMIT, () => {
      const form = (context.canvasElement as ParentNode).querySelector(`#${formId}`) as HTMLFormElement;
      form.requestSubmit(null);
    });

    channel.emit(EVENTS.FORM_INJECTED, formId);

    const story = getStory(context);
    return (
      <form id={formId} onSubmit={onSubmit}>{story as ReactNode}</form>
    );
  },
});
