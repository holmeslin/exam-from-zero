import type { FormEvent } from 'react'

export default function Contact() {
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    // TODO: 換到 /thanks
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>聯絡我們</h1>
      <label>
        訊息 <input name="message" />
      </label>
      <button>送出</button>
      <button>回上一頁</button>
    </form>
  )
}
