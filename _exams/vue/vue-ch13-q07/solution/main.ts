type Post = { id: number; title: string };
type Comment = { id: number; name: string };

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 模擬兩支 API：文章比較慢（40 毫秒），留言比較快（10 毫秒）
async function fetchPost(): Promise<Post> {
  console.log("開始抓文章");
  await wait(40);
  console.log("文章抓好了");
  return { id: 1, title: "Nuxt 入門" };
}

async function fetchComments(): Promise<Comment[]> {
  console.log("開始抓留言");
  await wait(10);
  console.log("留言抓好了");
  return [
    { id: 1, name: "Amy" },
    { id: 2, name: "Ben" },
  ];
}

// 用 Promise.all 讓兩個請求同時出發
async function loadPage() {
  const [post, comments] = await Promise.all([fetchPost(), fetchComments()]);
  return { post, comments };
}

const data = await loadPage();
console.log(`${data.post.title}：共有 ${data.comments.length} 則留言`);
