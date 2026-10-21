export type Deps = {
  expected: string | undefined
  token: string | undefined
  removeMessage: (id: string) => Promise<void>
  revalidatePath: (path: string) => void
}

export async function deleteMessage(formData: FormData, deps: Deps): Promise<void> {
  if (!deps.expected || deps.token !== deps.expected) {
    throw new Error('Unauthorized')
  }

  const id = formData.get('id')
  if (typeof id !== 'string') return

  await deps.removeMessage(id)
  deps.revalidatePath('/guestbook')
}
