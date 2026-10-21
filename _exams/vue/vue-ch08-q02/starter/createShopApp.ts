import { createApp, type Component } from "vue";

export function createShopApp(root: Component) {
  const app = createApp(root);
  // TODO: 在這裡啟用 Pinia

  return app;
}
