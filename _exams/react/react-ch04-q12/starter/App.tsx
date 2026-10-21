let orderNumber = 0

// 這個元件不純：渲染時改了外面的變數 orderNumber。
// 在 <StrictMode> 底下畫面會變成 2、4、6。
// 請改成由 props 傳入號碼，讓 App 畫出號碼牌 1、2、3。
export function Ticket() {
  orderNumber += 1
  return <p>號碼牌 {orderNumber}</p>
}

export default function App() {
  return (
    <div>
      <Ticket />
      <Ticket />
      <Ticket />
    </div>
  )
}
