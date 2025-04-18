# Storybook Addon HTML form addon
Addon for work with HTML form elements in Storybook. Wrap it in form and show submitted values.

## Installation

First, install the package.

```sh
npm install --save-dev storybook-html-form-addon
```

Then, register it as an addon in `.storybook/main.js`.

```js
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    '@storybook/addon-essentials',
    'storybook-html-form-addon', // 👈 register the addon here
  ],
};

export default config;
```

## Usage

The primary way to use this addon is to use the `withHtmlForm` decorator. You can do this the
component level, as below, to affect all stories in the file, or you can do it for a single story, or for whole project.

```js
// Button.stories.ts

// Replace your-framework with the name of your framework
import type { Meta } from '@storybook/your-framework';
import { withHtmlForm } from 'storybook-html-form-addon';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  decorators: [withHtmlForm],
};

export default meta;
```