# Storybook Addon HTML form addon
Addon for work with HTML from elements in the Storybook. Wrap it in form and show submitted values.

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

The primary way to use this addon is to wrap the component to HTML element <form>. Then addon finds it and catches all "submit" events and displays it. 