export type ApiResult<T> = {
  data: T | null;
  error: string | null;
};

export function first<T>(items: T[]): T | undefined {
  throw new Error("TODO: 回傳第一個元素，空陣列回傳 undefined");
}

export function toResult<T>(value: T | undefined, error: string): ApiResult<T> {
  throw new Error("TODO: value 是 undefined 時回傳錯誤，否則回傳資料");
}
