import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Todo = { id: number; text: string };

export function TodoForm() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    // TODO: 把輸入的內容存進 text
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: 去掉頭尾空白後，不是空字串才新增；新增後清空輸入框，並讓輸入框重新取得焦點
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} aria-label="待辦事項" value={text} onChange={handleChange} />
      <button>新增</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
      <p>共 {todos.length} 項</p>
    </form>
  );
}
