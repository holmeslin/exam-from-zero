export function SubmitButton() {
  // TODO：用 react-dom 的 useFormStatus 取得表單是否送出中
  const pending = false
  return (
    <button type="submit" disabled={pending}>
      {pending ? '送出中……' : '送出'}
    </button>
  )
}
