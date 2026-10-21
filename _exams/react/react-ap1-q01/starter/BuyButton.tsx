export function BuyButton({ active }: { active: boolean }) {
  // TODO：Tailwind 掃不到拼接出來的類別名稱，請改成寫出完整的類別名稱
  const color = active ? 'blue' : 'gray'
  return <button className={`rounded px-4 py-2 text-white bg-${color}-600`}>買書</button>
}
