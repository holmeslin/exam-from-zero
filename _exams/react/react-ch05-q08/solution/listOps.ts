export type Item = { id: number; name: string; bought: boolean }

export function addItem(items: Item[], item: Item): Item[] {
  return [...items, item]
}

export function removeItem(items: Item[], id: number): Item[] {
  return items.filter((item) => item.id !== id)
}

export function toggleItem(items: Item[], id: number): Item[] {
  return items.map((item) => (item.id === id ? { ...item, bought: !item.bought } : item))
}

export function sortByName(items: Item[]): Item[] {
  return [...items].sort((a, b) => a.name.localeCompare(b.name))
}
