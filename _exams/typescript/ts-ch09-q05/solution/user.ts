export type User = {
  name: string;
  email?: string;
};

export function makeUser(name: string, email?: string): User {
  if (email === undefined) {
    return { name }
  }
  return { name, email }
}
