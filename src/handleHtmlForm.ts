import {makeDecorator, addons, useEffect} from 'storybook/internal/preview-api';
import {EVENTS, PARAM_KEY} from "./constants";

export const handleHtmlForm = makeDecorator({
  name: 'withHtmlForm',
  parameterName: PARAM_KEY,
  skipIfNoParametersOrOptions: false,
  wrapper: (getStory, context) => {
    const channel = addons.getChannel();

    const onSubmit = (event: any) => {
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
      const form = (context.canvasElement as ParentNode).querySelector('form') as HTMLFormElement;
      form.requestSubmit(null);
    });

    useEffect(() => {
      const form = (context.canvasElement as ParentNode).querySelector('form') as HTMLFormElement;
      if (form) {
        form.addEventListener('submit', onSubmit);
        channel.emit(EVENTS.FORM_FOUND, true);
      }
    }, []);

    return getStory(context);
  },
});
