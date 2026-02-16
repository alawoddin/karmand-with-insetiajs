import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

import "./app/globals.css";

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob("./app/**/*.tsx");

    const page = pages[`./app/${name}.tsx`];

    if (!page) {
      throw new Error(`Page not found: ${name}`);
    }

    return page();
  },

  setup({ el, App, props }) {
    const Page = App as any;

    createRoot(el).render(
      Page.layout ? Page.layout(<Page {...props} />) : <Page {...props} />
    );
  },
});
