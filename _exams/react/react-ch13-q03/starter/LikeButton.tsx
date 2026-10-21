// TODO: 這個元件需要狀態和事件，記得它要是 Client Component
export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  return <button>👍 {initialLikes}</button>
}
