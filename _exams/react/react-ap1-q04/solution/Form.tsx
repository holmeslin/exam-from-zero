import { useId } from 'react'

export function Field({ label }: { label: string }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  )
}

export function Form() {
  return (
    <form>
      <Field label="姓名" />
      <Field label="信箱" />
    </form>
  )
}
