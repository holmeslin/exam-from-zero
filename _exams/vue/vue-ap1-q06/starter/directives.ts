import type { App, Directive } from "vue";

export const vColor: Directive<HTMLElement, string> = (el, binding) => {
  el.style.color = binding.value;
};

export function registerDirectives(app: App) {
  app.directive("v-color", vColor);
}
