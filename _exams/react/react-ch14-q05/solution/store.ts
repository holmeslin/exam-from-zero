// 用記憶體裡的陣列代替 JSON 檔（不用修改這個檔案）
export type Message = { name: string; text: string }

let messages: Message[] = []

export async function addMessage(name: string, text: string) {
  messages.push({ name, text })
}

export function getMessages(): Message[] {
  return messages
}

export function resetMessages() {
  messages = []
}
