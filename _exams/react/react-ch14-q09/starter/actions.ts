// Next.js 沒有安裝，所以 addMessage、revalidatePath、redirect 改由 deps 傳進來
export type Deps = {
  addMessage: (name: string, text: string) => Promise<void>
  revalidatePath: (path: string) => void
  redirect: (path: string) => never // 和 Next.js 一樣：用丟出例外的方式運作
}

export async function signThenLeave(formData: FormData, deps: Deps): Promise<void> {
  const name = String(formData.get('name')).trim()
  const text = String(formData.get('text')).trim()
  if (name === '' || text === '') return

  try {
    await deps.addMessage(name, text)
    deps.revalidatePath('/guestbook')
    deps.redirect('/guestbook')
  } catch (error) {
    console.error('寫入留言失敗：', error)
    return
  }
}
