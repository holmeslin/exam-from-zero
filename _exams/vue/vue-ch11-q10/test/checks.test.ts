import { afterEach, expect, test, vi } from "vitest";
import { checkFetchProducts } from "./checks";
import { fetchProducts } from "./products";

afterEach(() => {
  vi.restoreAllMocks();
});

test("正確的 fetchProducts 要通過你的檢查", async () => {
  await checkFetchProducts(fetchProducts);
});

test("沒有檢查 response.ok 的版本，你的檢查要抓到", async () => {
  const bad = async () => {
    const response = await fetch("/api/products");
    return response.json();
  };
  await expect(checkFetchProducts(bad)).rejects.toThrow();
});

test("網址打錯的版本，你的檢查要抓到", async () => {
  const bad = async () => {
    const response = await fetch("/api/product");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  };
  await expect(checkFetchProducts(bad)).rejects.toThrow();
});

test("回傳的資料被弄丟的版本，你的檢查要抓到", async () => {
  const bad = async () => {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return [];
  };
  await expect(checkFetchProducts(bad)).rejects.toThrow();
});
