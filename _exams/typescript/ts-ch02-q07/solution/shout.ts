export function shout(name: string | null): string {
  if (name !== null) {
    return name.toUpperCase();
  }
  return "無名氏";
}
