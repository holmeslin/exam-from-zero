export type ApiResult<T> = {
  data: T | null;
  error: string | null;
};

export function first<T>(items: T[]): T | undefined {
  return items[0];
}

// TODO：回傳陣列最後一個東西；空陣列回傳 undefined
export function last<T>(items: T[]): T | undefined {
  throw new Error("TODO: last");
}

// TODO：成功的結果，data 是傳進來的資料，error 是 null
export function ok<T>(data: T): ApiResult<T> {
  throw new Error("TODO: ok");
}

// TODO：失敗的結果，data 是 null，error 是傳進來的訊息
export function fail<T>(error: string): ApiResult<T> {
  throw new Error("TODO: fail");
}
