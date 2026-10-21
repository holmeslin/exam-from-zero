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

// 下面三行各有一個型別錯誤，請改對
library.name = "市立圖書館";
library.loans["978-986-2"] = "一次";
library.books.push({ isbn: "978-986-3", title: "新書" });

for (const book of library.books) {
  console.log(describe(book));
}
console.log(library.loans);
