// Next.js 沒有安裝：cookie 的值、環境變數與要呼叫的函式改由 deps 傳進來
export type Deps = {
  expected: string | undefined // process.env.ADMIN_TOKEN
  token: string | undefined // (await cookies()).get("admin")?.value
  removeMessage: (id: string) => Promise<void>
  revalidatePath: (path: string) => void
}

export async function deleteMessage(formData: FormData, deps: Deps): Promise<void> {
  if (deps.token !== deps.expected) {
    throw new Error('Unauthorized')
  }

  const id = formData.get('id')
  await deps.removeMessage(String(id))
  deps.revalidatePath('/guestbook')
}
