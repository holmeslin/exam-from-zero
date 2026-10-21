export type HasId = { id: number };
export type HasTimestamps = { createdAt: string; updatedAt: string };

export type Post = HasId & HasTimestamps & {
  title: string;
};

// 建立一篇文章：createdAt 和 updatedAt 都是 now
export function createPost(id: number, title: string, now: string): Post {
  throw new Error("TODO：實作 createPost");
}

// 回傳一篇新的文章：只把 updatedAt 換成 now，其他屬性保持不變，也不要改到原本的 post
export function touch(post: Post, now: string): Post {
  throw new Error("TODO：實作 touch");
}
