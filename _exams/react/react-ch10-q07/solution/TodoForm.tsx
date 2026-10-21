import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Todo = { id: number; text: string };

export function TodoForm() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = text.trim();
    if (trimmed !== "") {
      setTodos([...todos, { id: todos.length + 1, text: trimmed }]);
    }
    setText("");
    inputRef.current?.focus();
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
