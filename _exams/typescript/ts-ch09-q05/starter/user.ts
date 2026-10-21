// 專案打開了 exactOptionalPropertyTypes
export type User = {
  name: string;
  email?: string;
};

export function makeUser(name: string, email?: string): User {
  return { name, email }
}
