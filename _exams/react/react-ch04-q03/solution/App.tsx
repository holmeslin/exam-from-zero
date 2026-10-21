function Greeting() {
  return <p>歡迎來到我的第一個 React 網頁。</p>
}

function App() {
  return (
    <div>
      <h1>哈囉，React！</h1>
      <Greeting />
      <Greeting />
    </div>
  )
}

export default App
