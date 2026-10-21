export function BuyButtons({ onBuy }: { onBuy: (name: string) => void }) {
  return (
    <div>
      <button onClick={onBuy('鍵盤')}>買鍵盤</button>
      <button onClick={onBuy('滑鼠')}>買滑鼠</button>
    </div>
  )
}
