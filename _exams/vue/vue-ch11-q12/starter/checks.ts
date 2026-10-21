import { expect } from "vitest";
import { createPinia, setActivePinia } from "pinia";

export async function checkCartStore(useCartStore: () => any) {
  const cart = useCartStore();
  // TODO：檢查一開始是空的、加入商品後的 items／count／total，以及 clear
}
