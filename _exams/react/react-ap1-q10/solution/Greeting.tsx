export function Greeting({ name = '訪客' }: { name?: string }) {
  return <p>你好，{name}</p>
}
