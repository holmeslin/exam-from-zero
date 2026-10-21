import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'

export default function Contact() {
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    navigate('/thanks')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>聯絡我們</h1>
      <label>
        訊息 <input name="message" />
      </label>
      <button>送出</button>
      <button type="button" onClick={() => navigate(-1)}>
        回上一頁
      </button>
    </form>
  )
}
