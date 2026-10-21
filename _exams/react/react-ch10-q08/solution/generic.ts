export type ApiResult<T> = {
  data: T | null;
  error: string | null;
};

export function first<T>(items: T[]): T | undefined {
  return items[0];
}

export function toResult<T>(value: T | undefined, error: string): ApiResult<T> {
  if (value === undefined) {
    return { data: null, error };
  }
  return { data: value, error: null };
}
