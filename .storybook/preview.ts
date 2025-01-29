import type { Preview } from "@storybook/react";

import "../src/layouts/Page.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: { width: "375px", height: "812px" },
        },
        tablet: {
          name: "Tablet",
          styles: { width: "768px", height: "1024px" },
        },
        laptop: {
          name: "Laptop",
          styles: { width: "1280px", height: "720px" },
        },
        desktop: {
          name: "Desktop",
          styles: { width: "1366px", height: "768px" },
        },
      },
    },
  },
};

export default preview;
