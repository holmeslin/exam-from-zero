export function BuyButton({ active }: { active: boolean }) {
  return (
    <button className={`rounded px-4 py-2 text-white ${active ? 'bg-blue-600' : 'bg-gray-400'}`}>
      買書
    </button>
  )
}
