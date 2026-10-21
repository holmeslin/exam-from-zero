type Post = { title: string; summary: string }

export function BlogPost({ post }: { post: Post }) {
  // TODO：讓網頁標題是文章標題，<meta name="description"> 的內容是摘要
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.summary}</p>
    </article>
  )
}
