import { expect, test, vi } from 'vitest'
import { deleteMessage } from './actions.ts'

function idForm(id?: string) {
  const fd = new FormData()
  if (id !== undefined) fd.append('id', id)
  return fd
}

function deps(expected: string | undefined, token: string | undefined) {
  return { expected, token, removeMessage: vi.fn(async () => {}), revalidatePath: vi.fn() }
}

test('沒設定 ADMIN_TOKEN、也沒有 cookie 時要拒絕', async () => {
  const d = deps(undefined, undefined)
  await expect(
    deleteMessage(idForm('m1'), d),
    'expected 與 token 都是 undefined 時，undefined !== undefined 是 false，要另外檢查 !expected',
  ).rejects.toThrow('Unauthorized')
  expect(d.removeMessage, '沒通過身分檢查就不能刪除').not.toHaveBeenCalled()
})

test('cookie 不對時要拒絕', async () => {
  const d = deps('secret', 'guess')
  await expect(deleteMessage(idForm('m1'), d), 'token 不等於 expected 要丟出 Unauthorized').rejects.toThrow('Unauthorized')
  expect(d.removeMessage).not.toHaveBeenCalled()
})

test('管理者送來的 id 不是字串時什麼都不做', async () => {
  const d = deps('secret', 'secret')
  await expect(deleteMessage(idForm(), d)).resolves.toBeUndefined()
  expect(d.removeMessage, '沒有 id 欄位（formData.get 回傳 null）時不應該呼叫 removeMessage').not.toHaveBeenCalled()
})

test('管理者可以刪除，並通知畫面更新', async () => {
  const d = deps('secret', 'secret')
  await deleteMessage(idForm('m1'), d)
  expect(d.removeMessage, '要用表單的 id 呼叫 removeMessage').toHaveBeenCalledWith('m1')
  expect(d.revalidatePath, '刪除後要呼叫 revalidatePath("/guestbook")').toHaveBeenCalledWith('/guestbook')
})
