export function Field({ label }: { label: string }) {
  // TODO：同一個元件用兩次，id 就重複了
  const id = 'field'
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
