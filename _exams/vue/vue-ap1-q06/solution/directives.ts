import type { App, Directive } from "vue";

export const vColor: Directive<HTMLElement, string> = (el, binding) => {
  if (binding.arg === "background") {
    el.style.backgroundColor = binding.value;
  } else {
    el.style.color = binding.value;
  }
};

export function registerDirectives(app: App) {
  app.directive("color", vColor);
}
