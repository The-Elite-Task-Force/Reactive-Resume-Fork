import { defineConfig } from "vite";

export default defineConfig({
  // @ts-ignore
  test: {
    globals: true,
    environment: "jsdom",
    alias: {
      // @ts-ignore
      "@/artboard/*": new URL("./apps/artboard/src*", import.meta.url).pathname,
      // @ts-ignore
      "@/client/*": new URL("./apps/client/src/*", import.meta.url).pathname,
      // @ts-ignore
      "@/server/*": new URL("./apps/server/src/*", import.meta.url).pathname,
      // @ts-ignore
      "@reactive-resume/dto": new URL("./libs/dto/src", import.meta.url).pathname,
      // @ts-ignore
      "@reactive-resume/utils": new URL("./libs/utils/src", import.meta.url).pathname,
      // @ts-ignore
      "@reactive-resume/schema": new URL("./libs/schema/src", import.meta.url).pathname,
      // @ts-ignore
      "@/server/user/decorators/user.decorator": new URL("./apps/server/src/user/decorators/user.decorator", import.meta.url).pathname,
      // @ts-ignore
      "@reactive-resume/hooks": new URL("./libs/hooks/src", import.meta.url).pathname,
      // @ts-ignore
      "@reactive-resume/parser": new URL("./libs/parser/src", import.meta.url).pathname,
      // @ts-ignore
      "@reactive-resume/ui": new URL("./libs/ui/src", import.meta.url).pathname,
    },
  },
});
