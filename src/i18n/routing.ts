import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
