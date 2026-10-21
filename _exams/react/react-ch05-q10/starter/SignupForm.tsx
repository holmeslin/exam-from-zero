import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'

export type Form = { name: string; email: string; plan: string; agreed: boolean }

const initialForm: Form = { name: '', email: '', plan: 'free', agreed: false }

export function SignupForm({ onSubmit }: { onSubmit: (form: Form) => void }) {
  const [form, setForm] = useState(initialForm)

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target
    // TODO: 依輸入框的 name 更新對應的屬性；核取方塊要取 checked
    setForm({ ...form, name: value })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit(form)
    // TODO: 送出後把表單重設成初始值
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        姓名
        <input name="name" value={form.name} onChange={handleChange} />
      </label>
      <label>
        信箱
        <input name="email" value={form.email} onChange={handleChange} />
      </label>
      <label>
        方案
        <select name="plan" value={form.plan} onChange={handleChange}>
          <option value="free">免費方案</option>
          <option value="pro">專業方案</option>
        </select>
      </label>
      <label>
        <input type="checkbox" name="agreed" checked={form.agreed} onChange={handleChange} />
        我同意使用條款
      </label>
      <button type="submit" disabled={!form.agreed}>
        註冊
      </button>
    </form>
  )
}
