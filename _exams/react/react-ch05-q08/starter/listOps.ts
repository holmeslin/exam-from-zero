export type Item = { id: number; name: string; bought: boolean }

export function addItem(items: Item[], item: Item): Item[] {
  items.push(item)
  return items
}

export function removeItem(items: Item[], id: number): Item[] {
  const index = items.findIndex((item) => item.id === id)
  items.splice(index, 1)
  return items
}

export function toggleItem(items: Item[], id: number): Item[] {
  const item = items.find((item) => item.id === id)
  if (item) item.bought = !item.bought
  return items
}

export function sortByName(items: Item[]): Item[] {
  return items.sort((a, b) => a.name.localeCompare(b.name))
}
