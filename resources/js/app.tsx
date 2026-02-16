import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

import "./app/globals.css";

createInertiaApp({
  resolve: async (name) => {
    const pages = import.meta.glob("./app/**/*.{tsx,jsx}");

    const page =
      pages[`./app/${name}.tsx`] ||
      pages[`./app/${name}.jsx`];

    if (!page) {
      throw new Error(`Page not found: ${name}`);
    }

    return await page();
  },

  setup({ el, App, props }) {
    const Page = App as any;

    createRoot(el).render(
      Page.layout ? Page.layout(<Page {...props} />) : <Page {...props} />
    );
  },
});
