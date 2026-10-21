export function Ticket({ number }: { number: number }) {
  return <p>號碼牌 {number}</p>
}

export default function App() {
  return (
    <div>
      {[1, 2, 3].map((n) => (
        <Ticket key={n} number={n} />
      ))}
    </div>
  )
}
