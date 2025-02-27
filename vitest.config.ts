import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    alias: {
      "@reactive-resume/dto": new URL("./libs/dto/src", import.meta.url).pathname,
      "@reactive-resume/utils": new URL("./libs/utils/src", import.meta.url).pathname,
      "@reactive-resume/schema": new URL("./libs/schema/src", import.meta.url).pathname,
      "@/server/user/decorators/user.decorator": new URL(
        "./apps/server/src/user/decorators/user.decorator",
        import.meta.url,
      ).pathname,
    },
  },
});
