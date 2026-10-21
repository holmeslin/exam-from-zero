type Author = {
  name: string;
  country?: string;
};

type Book = {
  readonly isbn: string;
  title: string;
  author: Author;
  tags: string[];
};

type Library = {
  readonly name: string;
  books: Book[];
  loans: Record<string, number>;
};

const library: Library = {
  name: "城市圖書館",
  books: [
    {
      isbn: "978-986-1",
      title: "小王子",
      author: { name: "聖修伯里", country: "法國" },
      tags: ["經典", "童話"],
    },
    {
      isbn: "978-986-2",
      title: "TypeScript 入門",
      author: { name: "王小明" },
      tags: ["程式"],
    },
  ],
  loans: { "978-986-1": 3 },
};

function describe(book: Book) {
  const country = book.author.country ?? "未知";
  return `${book.title}（${book.author.name}，${country}）`;
}

library.loans["978-986-2"] = 1;
library.books.push({
  isbn: "978-986-3",
  title: "新書",
  author: { name: "林小華", country: "台灣" },
  tags: [],
});

for (const book of library.books) {
  console.log(describe(book));
}
console.log(library.loans);
