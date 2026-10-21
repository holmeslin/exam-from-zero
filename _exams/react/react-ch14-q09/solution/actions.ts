export type Deps = {
  addMessage: (name: string, text: string) => Promise<void>
  revalidatePath: (path: string) => void
  redirect: (path: string) => never
}

export async function signThenLeave(formData: FormData, deps: Deps): Promise<void> {
  const name = String(formData.get('name')).trim()
  const text = String(formData.get('text')).trim()
  if (name === '' || text === '') return

  try {
    await deps.addMessage(name, text)
  } catch (error) {
    console.error('寫入留言失敗：', error)
    return
  }

  deps.revalidatePath('/guestbook')
  deps.redirect('/guestbook')
}
