export const messages: { name: string; text: string }[] = []

export async function action({ request }: { request: Request }) {
  // TODO: 從 request.formData() 取出 name 與 text，去掉前後空白後驗證
  throw new Error('TODO: 還沒實作 action')
}
