// 要測的元件（不用改）
import { useState } from "react";
import type { FormEvent } from "react";

export type SearchBoxProps = {
  onSearch: (keyword: string) => void;
};

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [keyword, setKeyword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(keyword);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        搜尋
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </label>
      <button>送出</button>
    </form>
  );
}
