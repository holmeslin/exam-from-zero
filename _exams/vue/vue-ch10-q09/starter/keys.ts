import type { InjectionKey, Ref } from "vue";

export type Theme = "light" | "dark";

export const themeKey = Symbol() as InjectionKey<Ref<Theme>>;
