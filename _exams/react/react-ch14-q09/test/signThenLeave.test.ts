import { afterEach, expect, test, vi } from 'vitest'
import { signThenLeave } from './actions.ts'

function form(name: string, text: string) {
  const fd = new FormData()
  fd.append('name', name)
  fd.append('text', text)
  return fd
}

function makeDeps(addMessage = vi.fn(async () => {})) {
  const calls: string[] = []
  return {
    calls,
    deps: {
      addMessage: vi.fn(async (name: string, text: string) => {
        calls.push('addMessage')
        await addMessage(name, text)
      }),
      revalidatePath: vi.fn((path: string) => {
        calls.push(`revalidatePath ${path}`)
      }),
      redirect: vi.fn((path: string): never => {
        calls.push(`redirect ${path}`)
        throw new Error('NEXT_REDIRECT')
      }),
    },
  }
}

afterEach(() => vi.restoreAllMocks())

test('成功時 redirect 丟出的 NEXT_REDIRECT 不能被 catch 吃掉', async () => {
  vi.spyOn(console, 'error').mockImplementation(() => {})
  const { deps, calls } = makeDeps()
  await expect(
    signThenLeave(form('小明', '你好'), deps),
    'redirect 丟出的例外要傳出函式外，Next.js 才收得到「請導向」：把 redirect 移到 try/catch 外面',
  ).rejects.toThrow('NEXT_REDIRECT')
  expect(calls, '順序要是 addMessage → revalidatePath → redirect').toEqual([
    'addMessage',
    'revalidatePath /guestbook',
    'redirect /guestbook',
  ])
})

test('寫入失敗時要接住錯誤，不更新也不導向', async () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
  const { deps } = makeDeps(vi.fn(async () => {
    throw new Error('disk full')
  }))
  await expect(signThenLeave(form('小明', '你好'), deps), '寫檔失敗的錯誤要被 catch 接住').resolves.toBeUndefined()
  expect(deps.revalidatePath, '寫入失敗時不應該呼叫 revalidatePath').not.toHaveBeenCalled()
  expect(deps.redirect, '寫入失敗時不應該呼叫 redirect').not.toHaveBeenCalled()
  expect(spy, '寫入失敗要用 console.error 印出來').toHaveBeenCalled()
})

test('欄位空白時什麼都不做', async () => {
  const { deps } = makeDeps()
  await signThenLeave(form('  ', '你好'), deps)
  expect(deps.addMessage, '名字空白時不應該存檔').not.toHaveBeenCalled()
  expect(deps.redirect, '名字空白時不應該導向').not.toHaveBeenCalled()
})
