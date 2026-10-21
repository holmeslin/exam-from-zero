export function Greeting({ name }: { name?: string }) {
  return <p>你好，{String(name)}</p>
}
// TODO：React 19 會忽略函式元件的 defaultProps
Greeting.defaultProps = { name: '訪客' }
