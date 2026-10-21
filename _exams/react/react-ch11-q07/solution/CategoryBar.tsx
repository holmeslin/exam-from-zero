// 要測的元件（不用改）
const categories = ["all", "keyboard", "mouse"];

export default function CategoryBar({ current }: { current: string }) {
  return (
    <div>
      <h1>商品</h1>
      <p>
        {categories.map((category) => (
          <button key={category} disabled={category === current}>
            {category}
          </button>
        ))}
      </p>
    </div>
  );
}
