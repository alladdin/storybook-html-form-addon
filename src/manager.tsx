import React from "react";
import { addons, types } from "storybook/internal/manager-api";

import { FormSubmitPanel } from "./components/FormSubmitPanel";
import { FormSubmitToolButton } from "./components/FormSubmitToolButton";
import { ADDON_ID, PANEL_ID, TOOL_ID } from "./constants";

/**
 * Note: if you want to use JSX in this file, rename it to `manager.tsx`
 * and update the entry prop in tsup.config.ts to use "src/manager.tsx",
 */

// Register the addon
addons.register(ADDON_ID, (api) => {
  // Register a tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Form submit tool button",
    match: ({ viewMode }) =>
      !!((viewMode && viewMode.match(/^(story)$/))),
    render: () => <FormSubmitToolButton api={api} />,
  });

  // Register a panel
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Form submit result",
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active }) => <FormSubmitPanel active={active} />,
  });
});
