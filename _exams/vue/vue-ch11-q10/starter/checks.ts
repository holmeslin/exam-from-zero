import { expect, vi } from "vitest";
import type { Product } from "./products";

export async function checkFetchProducts(fetchProducts: () => Promise<Product[]>) {
  // TODO：用 vi.spyOn(globalThis, "fetch") 換掉 fetch，檢查成功與 404 兩種情況
  // 最後記得用 vi.restoreAllMocks() 還原
}
