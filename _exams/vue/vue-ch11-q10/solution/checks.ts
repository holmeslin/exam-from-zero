import { expect, vi } from "vitest";
import type { Product } from "./products";

export async function checkFetchProducts(fetchProducts: () => Promise<Product[]>) {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    Response.json([{ id: 1, name: "機械鍵盤" }]),
  );
  expect(await fetchProducts()).toEqual([{ id: 1, name: "機械鍵盤" }]);
  expect(fetch).toHaveBeenCalledWith("/api/products");

  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response("找不到", { status: 404 }),
  );
  await expect(fetchProducts()).rejects.toThrow("HTTP 404");

  vi.restoreAllMocks();
}
