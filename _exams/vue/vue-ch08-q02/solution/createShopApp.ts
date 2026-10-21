import { createApp, type Component } from "vue";
import { createPinia } from "pinia";

export function createShopApp(root: Component) {
  const app = createApp(root);
  app.use(createPinia());

  return app;
}
