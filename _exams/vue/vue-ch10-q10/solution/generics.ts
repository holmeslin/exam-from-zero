export type ApiResult<T> = {
  data: T | null;
  error: string | null;
};

export function first<T>(items: T[]): T | undefined {
  return items[0];
}

export function last<T>(items: T[]): T | undefined {
  return items[items.length - 1];
}

export function ok<T>(data: T): ApiResult<T> {
  return { data, error: null };
}

export function fail<T>(error: string): ApiResult<T> {
  return { data: null, error };
}
